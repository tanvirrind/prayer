import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import FirebaseProvider from "@/components/FirebaseProvider"; // Adjust import path

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png',
  },
  title: {
    default: "Global Prayer Times Today | Accurate Namaz Timings Worldwide",
    template: "%s | Souq Al Madina Prayer Times"
  },
  description: "Get accurate prayer times worldwide for today. Fajr, Dhuhr, Asr, Maghrib, and Isha timings for all countries and cities. Reliable Islamic Namaz schedule, updated daily.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://noor.souqalmadina.com.pk/prayer-times"),
  openGraph: {
    siteName: "Noor by Souq Al Madina – Prayer Times Worldwide",
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
    <html lang="en" data-scroll-behavior="smooth">
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
