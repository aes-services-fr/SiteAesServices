// Image optimization pass run automatically before every build (prebuild).
// Walks public/images/**, skips files under 250 KB, otherwise resizes to a
// max width of 1600px and recompresses: JPEG via mozjpeg q82, PNG kept as a
// palette PNG when it has an alpha channel, otherwise flattened to JPEG.
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "public", "images");
const MIN_SIZE_BYTES = 250 * 1024; // skip anything smaller than 250 KB
const MAX_WIDTH = 1600;

const EXTS = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function optimize(file) {
  const stat = await fs.stat(file);
  if (stat.size < MIN_SIZE_BYTES) {
    return { file, skipped: true };
  }

  const ext = path.extname(file).toLowerCase();
  const input = await fs.readFile(file);
  const image = sharp(input);
  const meta = await image.metadata();

  const pipeline = image.rotate();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let output;
  let outFile = file;
  const hasAlpha = Boolean(meta.hasAlpha);

  if (ext === ".png") {
    if (hasAlpha) {
      output = await pipeline.png({ palette: true, quality: 82 }).toBuffer();
    } else {
      // No transparency: JPEG is much smaller.
      output = await pipeline
        .flatten({ background: "#ffffff" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();
      outFile = file.replace(/\.png$/i, ".jpg");
    }
  } else {
    output = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  }

  // Only write if we actually shrank the file.
  if (output.length < stat.size || outFile !== file) {
    await fs.writeFile(outFile, output);
    if (outFile !== file) {
      await fs.unlink(file);
    }
    return {
      file,
      outFile,
      before: stat.size,
      after: output.length,
    };
  }
  return { file, skipped: true, reason: "no-gain" };
}

async function main() {
  const files = await walk(IMAGES_DIR);
  if (files.length === 0) {
    console.log("[optimize-images] No images found under public/images — skipping.");
    return;
  }

  let optimized = 0;
  let savedBytes = 0;
  for (const file of files) {
    try {
      const result = await optimize(file);
      const rel = path.relative(ROOT, file);
      if (result.skipped) {
        console.log(`[optimize-images] skip  ${rel}`);
      } else {
        optimized += 1;
        savedBytes += result.before - result.after;
        const saved = ((1 - result.after / result.before) * 100).toFixed(0);
        console.log(
          `[optimize-images] done  ${rel}  ${(result.before / 1024).toFixed(0)}KB -> ${(result.after / 1024).toFixed(0)}KB (-${saved}%)`,
        );
      }
    } catch (err) {
      console.warn(`[optimize-images] error ${file}: ${err.message}`);
    }
  }

  console.log(
    `[optimize-images] ${optimized} optimized, ${(savedBytes / 1024).toFixed(0)}KB saved.`,
  );
}

main().catch((err) => {
  console.error("[optimize-images] fatal:", err);
  process.exit(0); // never block the build
});
