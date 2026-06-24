import { site } from "./lib/site";

// Baseline landing page — full sections (hero, services, gallery, FAQ…) are
// built in step 3 once the business info is confirmed.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold text-ink">{site.name}</h1>
      <p className="text-lg text-ink-soft">{site.trade}</p>
      <p className="text-sm text-muted">
        Site en cours de construction — contenu en cours de validation.
      </p>
    </main>
  );
}
