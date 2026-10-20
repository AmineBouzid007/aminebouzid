import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const title = "Amine Bouzid, développeur web";
const description =
  "Développeur web en Tunisie : sites, boutiques en ligne, réservation et tableaux de bord pour commerces, marques locales et établissements de soins.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Archivo:wdth,wght@62..125,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ctext y=%27.9em%27 font-size=%2790%27%3E%F0%9F%92%BB%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Script src="/projects.js" strategy="beforeInteractive" />
        <Script src="/portfolio.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
