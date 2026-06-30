import type { Metadata } from "next";
import "./globals.css";
import { site } from "./lib/site";
import { asset } from "./lib/asset";
import { baseUrl } from "./lib/seo";
import { Analytics } from "./components/Analytics";
import { ScrollProgress } from "./components/ScrollProgress";

const title = `${site.name} — ${site.trade}${
  site.city && !site.city.startsWith("<") ? ` à ${site.city}` : ""
}`;
const description = `${site.trade} : peinture intérieure et extérieure, ravalement de façade, décoration. Devis gratuit, artisan local de confiance. ${
  site.city && !site.city.startsWith("<") ? `Intervention à ${site.city} et dans le Cher.` : ""
}`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "peintre en bâtiment",
    "peinture intérieure",
    "peinture extérieure",
    "ravalement façade",
    "décoration murale",
    site.city,
  ].filter((k) => k && !k.startsWith("<")),
  // metadataBase already carries the basePath, so absolute metadata URLs use
  // plain "/…" paths (Next joins them to metadataBase). Only on-page asset
  // links (icons, <img>) use asset().
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.trade}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: asset("/icon.png"),
    apple: asset("/apple-touch-icon.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
