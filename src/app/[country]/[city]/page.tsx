import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";

interface Timings {
  Fajr: string; Sunrise: string; Dhuhr: string;
  Asr: string; Maghrib: string; Isha: string;
  Imsak: string; Midnight: string;
}
interface AladhanData {
  timings: Timings;
  date: { readable: string; hijri: { day: string; month: { en: string }; year: string } };
  meta: { method: { name: string }; timezone: string };
}

async function getPrayerTimes(city: string, country: string): Promise<AladhanData | null> {
  try {
    const cityName = city.replace(/-/g, " ");
    const countryName = country.replace(/-/g, " ");
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryName)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.code === 200 ? json.data : null;
  } catch {
    return null;
  }
}

function toTitleCase(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; city: string }> }): Promise<Metadata> {
  const { country, city } = await params;
  const cityName = toTitleCase(city);
  const countryName = toTitleCase(country);
  return {
    title: `Prayer Times ${cityName} Today | Namaz Timings ${cityName} ${countryName}`,
    description: `Today's accurate Namaz timings for ${cityName}, ${countryName}. Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha prayer times with Hijri date. Updated daily.`,
    keywords: `prayer times ${cityName}, namaz timing ${cityName} today, ${cityName} prayer schedule, fajr time ${cityName}, isha time ${cityName}`,
    alternates: { canonical: `https://prayer.souqalmadina.com.pk/${country}/${city}` },
    openGraph: {
      title: `Namaz Timings ${cityName} — Today`,
      description: `Accurate Fajr, Dhuhr, Asr, Maghrib & Isha times for ${cityName}, ${countryName}.`,
      type: "website",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function CityPage({ params }: { params: Promise<{ country: string; city: string }> }) {
  const { country, city } = await params;
  const data = await getPrayerTimes(city, country);
  if (!data) notFound();

  const cityName = toTitleCase(city);
  const countryName = toTitleCase(country);
  const { timings, date, meta } = data;

  const mainPrayers = [
    { name: "Fajr", time: timings.Fajr, icon: "🌅", desc: "Pre-dawn prayer" },
    { name: "Dhuhr", time: timings.Dhuhr, icon: "☀️", desc: "Midday prayer" },
    { name: "Asr", time: timings.Asr, icon: "🌤", desc: "Afternoon prayer" },
    { name: "Maghrib", time: timings.Maghrib, icon: "🌆", desc: "Sunset prayer" },
    { name: "Isha", time: timings.Isha, icon: "🌙", desc: "Night prayer" },
  ];

  const extraTimings = [
    { name: "Sunrise", time: timings.Sunrise },
    { name: "Imsak", time: timings.Imsak },
    { name: "Midnight", time: timings.Midnight },
  ];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Prayer Times in ${cityName}, ${countryName}`,
    description: `Islamic prayer timings for ${cityName}. Fajr: ${timings.Fajr}, Maghrib: ${timings.Maghrib}.`,
    url: `https://prayer.souqalmadina.com.pk/${country}/${city}`,
    publisher: {
      "@type": "Organization",
      name: "Souq Al Madina",
      url: "https://souqalmadina.com.pk",
    },
    mainEntity: {
      "@type": "Place",
      name: cityName,
      address: { "@type": "PostalAddress", addressLocality: cityName, addressCountry: countryName },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-5 text-xs text-white/45 font-bold uppercase tracking-wider flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${country}`} className="hover:text-white transition-colors">{countryName}</Link>
        <span>/</span>
        <span className="text-white/75">{cityName}</span>
      </div>

      {/* Hero Card */}
      <section className="max-w-4xl mx-auto px-4 pt-5 pb-4 w-full">
        <div
          className="rounded-[28px] p-7 md:p-10 relative overflow-hidden"
          style={{ background: "rgba(10,61,46,0.85)", border: "1px solid rgba(201,168,76,0.25)", backdropFilter: "blur(16px)" }}
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>
                📍 {cityName}, {countryName}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2" style={{ letterSpacing: "-1.5px" }}>
                {date.readable}
              </h1>
              <p className="italic text-white/60" style={{ fontFamily: "'Playfair Display',serif" }}>
                {date.hijri.day} {date.hijri.month.en} {date.hijri.year} AH
              </p>
            </div>
            <div className="text-center px-6 py-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="text-xs font-black uppercase tracking-widest text-white/45 mb-1">Timezone</div>
              <div className="font-bold text-white">{meta.timezone}</div>
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(201,168,76,0.06), transparent)" }} />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(201,168,76,0.08)", filter: "blur(50px)" }} />
        </div>
      </section>

      {/* Main Prayers */}
      <section className="max-w-4xl mx-auto px-4 pb-4 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {mainPrayers.map((p) => (
            <div
              key={p.name}
              className="p-5 rounded-2xl text-white transition-all hover:scale-[1.02]"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
            >
              <div className="text-2xl mb-4">{p.icon}</div>
              <div className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">{p.name}</div>
              <div className="text-2xl font-black tracking-tight">{p.time}</div>
              <div className="text-xs text-white/35 mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra timings */}
      <section className="max-w-4xl mx-auto px-4 pb-6 w-full">
        <div className="grid grid-cols-3 gap-3">
          {extraTimings.map((t) => (
            <div key={t.name} className="p-4 rounded-2xl text-center bg-white/90">
              <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{t.name}</div>
              <div className="text-xl font-black" style={{ color: "#0a3d2e" }}>{t.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Method */}
      <section className="max-w-4xl mx-auto px-4 pb-8 w-full">
        <div className="p-5 rounded-2xl bg-white/90 flex items-center gap-4">
          <div className="text-2xl">ℹ️</div>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: "#0a3d2e" }}>Calculation Method</div>
            <div className="text-xs text-gray-500">{meta.method.name}</div>
          </div>
          <div className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white" style={{ background: "#0a3d2e" }}>
            Verified ✓
          </div>
        </div>
      </section>

      {/* Product Ads */}
      <div className="bg-white py-2">
        <ProductAds />
      </div>

      {/* SEO Article */}
      <section className="max-w-4xl mx-auto px-4 py-10 w-full">
        <article
          className="p-8 md:p-12 rounded-[28px] text-white"
          style={{ background: "rgba(10,61,46,0.7)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(16px)" }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6" style={{ letterSpacing: "-1px" }}>
            Namaz Timings in {cityName}, {countryName}
          </h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              Today's prayer times for <strong className="text-white">{cityName}</strong> are calculated using precise astronomical data. Fajr begins at <strong className="text-yellow-400">{timings.Fajr}</strong> and Isha starts at <strong className="text-yellow-400">{timings.Isha}</strong>.
            </p>
            <p>
              Muslims in {cityName} can use this page daily to check accurate Fajr, Dhuhr, Asr, Maghrib and Isha times. The Hijri date today is {date.hijri.day} {date.hijri.month.en} {date.hijri.year} AH.
            </p>
            <p>
              Calculation method: <em>{meta.method.name}</em>. Timezone: <em>{meta.timezone}</em>. Times are updated every day automatically.
            </p>
          </div>
        </article>
      </section>

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <Link
          href={`/${country}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors"
        >
          ← All cities in {countryName}
        </Link>
      </div>
    </div>
  );
}
