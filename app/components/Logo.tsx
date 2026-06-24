// AES Services wordmark, rebuilt as scalable markup so it follows the theme and
// stays crisp at any size. Faithful to the brand logo (bold "AES." charcoal,
// sage dot + sage underline, tracked "SERVICES"). Scale via the `size` prop
// (drives the cap-height font size in px).
export function Logo({
  size = 22,
  tone = "dark",
  className = "",
}: {
  size?: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  const wordmark = tone === "light" ? "text-bg" : "text-ink";
  const sub = tone === "light" ? "text-bg/70" : "text-ink-soft";
  return (
    <span
      className={`inline-flex select-none flex-col leading-none ${className}`}
      aria-label="AES Services"
    >
      <span
        className={`flex items-baseline font-sans font-extrabold tracking-tight ${wordmark}`}
        style={{ fontSize: size }}
      >
        AES
        <span className="text-sage" style={{ marginLeft: size * 0.04 }}>
          .
        </span>
      </span>
      <span className="mt-[0.18em] flex items-center gap-[0.4em]">
        <span
          className="block rounded-full bg-sage"
          style={{ height: Math.max(2, size * 0.1), width: size * 1.05 }}
        />
        <span
          className={`font-sans font-semibold uppercase ${sub}`}
          style={{ fontSize: size * 0.34, letterSpacing: size * 0.06 }}
        >
          Services
        </span>
      </span>
    </span>
  );
}
