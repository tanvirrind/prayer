import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Prayer Times Pakistan | Namaz Timings | Souq Al Madina",
    template: "%s | Souq Al Madina Prayer Times"
  },
  description: "Accurate Islamic prayer times (Namaz timings) for all cities in Pakistan and worldwide. Fajr, Dhuhr, Asr, Maghrib, Isha times. Powered by Souq Al Madina.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://prayer.souqalmadina.com.pk"),
  openGraph: {
    siteName: "Souq Al Madina Prayer Times",
    type: "website",
    locale: "en_PK",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
