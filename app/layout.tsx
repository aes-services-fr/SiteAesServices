import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "./lib/site";
import { asset } from "./lib/asset";
import { Analytics } from "./components/Analytics";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl =
  site.domain && site.domain.startsWith("http")
    ? site.domain
    : "https://nyokaa.github.io/siteaesservices";

const title = `${site.name} — ${site.trade}${
  site.city && !site.city.startsWith("<") ? ` à ${site.city}` : ""
}`;
const description = `${site.trade} : peinture intérieure et extérieure, ravalement de façade, décoration. Devis gratuit, artisan certifié. ${
  site.city && !site.city.startsWith("<") ? `Intervention à ${site.city} et alentours.` : ""
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
        url: asset("/og.jpg"),
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
    images: [asset("/og.jpg")],
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
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
