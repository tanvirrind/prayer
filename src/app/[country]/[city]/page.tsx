import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";
import { getSingleCityCoords, getMajorCities } from "@/lib/cities";
import { getCityDescription } from "@/lib/cityDescription";
import PrayerCardsLive from "@/components/PrayerCardsLive";
import LiveClockBox from "@/components/LiveClockBox";


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

interface AladhanDay {
  timings: Timings;
  date: { 
    gregorian: { day: string; month: { en: string }; year: string };
  };
}

// 1. Slug to ISO Code Mapping Utility
const countryCodeMap: Record<string, string> = {
  "pakistan": "PK",
  "germany": "DE",
  "saudi-arabia": "SA",
  "united-arab-emirates": "AE",
  "united-kingdom": "GB",
  "india": "IN",
  "indonesia": "ID",
  "nigeria": "NG"
};
// imports...

function getMethodByCountry(countrySlug: string): number {
  const methods: Record<string, number> = {
    "saudi-arabia": 4,
    "united-states": 2,
    "canada": 2,
    "united-kingdom": 1,
    "pakistan": 1,
    "india": 1,
    "bangladesh": 1,
    "egypt": 5,
    "turkey": 9,
    "malaysia": 3,
    "indonesia": 11,
  };
  return methods[countrySlug] ?? 3;
}

// ✅ New — with method
async function getPrayerTimes(city: string, country: string): Promise<AladhanData | null> {
  try {
    const cityName = city.replace(/-/g, " ");
    const countryName = country.replace(/-/g, " ");
    const method = getMethodByCountry(country); // ← add this
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryName)}&method=${method}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.code === 200 ? json.data : null;
  } catch {
    return null;
  }
}

async function getMonthlyCalendar(city: string, country: string): Promise<AladhanDay[] | null> {
  try {
    const cityName = city.replace(/-/g, " ");
    const countryName = country.replace(/-/g, " ");
    const method = getMethodByCountry(country); // ← add this
    const now = new Date();
    const res = await fetch(
      `https://api.aladhan.com/v1/calendarByCity/${now.getFullYear()}/${now.getMonth() + 1}?city=${encodeURIComponent(cityName)}&country=${encodeURIComponent(countryName)}&method=${method}`,
      { next: { revalidate: 86400 } }
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
    title: `Prayer Times ${cityName} Today | Prayer Timings ${cityName} ${countryName}`,
    description: `Today's accurate prayer timings for ${cityName}, ${countryName}. Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha prayer times with Hijri date. Updated daily.`,
    keywords: `prayer times ${cityName}, namaz timing ${cityName} today, ${cityName} prayer schedule, fajr time ${cityName}, isha time ${cityName}`,
    alternates: { canonical: `https://prayer.souqalmadina.com.pk/${country}/${city}` },
    openGraph: {
      title: `Prayer Timings ${cityName} — Today`,
      description: `Accurate Fajr, Dhuhr, Asr, Maghrib & Isha times for ${cityName}, ${countryName}.`,
      type: "website",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function CityPage({ params }: { params: Promise<{ country: string; city: string }> }) {
  const { country, city } = await params;
  
  // 2. Coordinate Resolution
  const countryCode = countryCodeMap[country.toLowerCase()] || "";
  const cleanCityName = city.replace(/-/g, ' ');
  const coords = countryCode ? getSingleCityCoords(countryCode, cleanCityName) : null;
  
 // Move these up so getCityDescription can use them
const cityName = toTitleCase(city);
const countryName = toTitleCase(country);

// 3. Concurrent Data Fetching (Includes Mosques & Description)
const [data, monthData, cityDescription] = await Promise.all([
  getPrayerTimes(city, country),
  getMonthlyCalendar(city, country),
  getCityDescription(cityName, countryName, country, city),
]);


if (!data) notFound();
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

  const faqs = [
    {
      q: `What is the Fajr time in ${cityName}?`,
      a: `Today, Fajr prayer in ${cityName} starts at ${timings.Fajr}.`
    },
    {
      q: `When is Maghrib time in ${cityName}?`,
      a: `The Maghrib prayer time in ${cityName} today starts at ${timings.Maghrib}. It marks the beginning of the sunset prayer.`
    },
    {
      q: `How many prayers are there in a day?`,
      a: `There are five daily prayers: Fajr (Dawn), Dhuhr (Noon), Asr (Afternoon), Maghrib (Sunset), and Isha (Night).`
    }
  ];

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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
  const prayerScheduleSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": `Prayer Times ${cityName} Today`,
  "startDate": new Date().toISOString().split("T")[0],
  "location": {
    "@type": "Place",
    "name": cityName,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": countryName
    }
  },
  "offers": [
    { "@type": "Offer", "name": "Fajr", "description": timings.Fajr },
    { "@type": "Offer", "name": "Dhuhr", "description": timings.Dhuhr },
    { "@type": "Offer", "name": "Asr", "description": timings.Asr },
    { "@type": "Offer", "name": "Maghrib", "description": timings.Maghrib },
    { "@type": "Offer", "name": "Isha", "description": timings.Isha },
  ]
};

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-6" style={{ letterSpacing: "-1px" }}>
            Prayer Timings in {cityName}, {countryName}
          </h1>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2" style={{ letterSpacing: "-1.5px" }}>
                {date.readable}
              </h2>
              <p className="text-lg md:text-xl font-black text-white/70 tracking-widest" style={{ letterSpacing: "-0.5px" }}>
                {new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())}
              </p>
              <p className="italic text-white/60" style={{ fontFamily: "'Playfair Display',serif" }}>
                {date.hijri.day} {date.hijri.month.en} {date.hijri.year} AH
              </p>
            </div>
            <LiveClockBox timezone={meta.timezone} />
            </div>
          <div className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(201,168,76,0.06), transparent)" }} />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(201,168,76,0.08)", filter: "blur(50px)" }} />
        </div>
      </section>

    {/* DELETE these two sections: */}
{/* Main Prayers */}
{/* Extra timings */}

{/* REPLACE WITH: */}
<PrayerCardsLive
  mainPrayers={mainPrayers}
  extraTimings={extraTimings}
  timezone={meta.timezone}
/>

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

      {/* 30 Days Calendar Section */}
      {monthData && (
        <section className="max-w-4xl mx-auto px-4 pt-12 pb-8 w-full">
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="p-6 border-b border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 className="text-xl font-bold text-white">30 Days {cityName} Prayer Calendar</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-white">
                <thead className="text-white/50 font-bold uppercase text-[10px] tracking-widest" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-4 py-4">Fajr</th>
                    <th className="px-4 py-4">Sunrise</th>
                    <th className="px-4 py-4">Dhuhr</th>
                    <th className="px-4 py-4">Asr</th>
                    <th className="px-4 py-4">Maghrib</th>
                    <th className="px-4 py-4">Isha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {monthData.map((day, idx) => {
                    const isToday = idx + 1 === new Date().getDate();
                    return (
                      <tr 
                        key={idx} 
                        className="transition-colors"
                        style={{ backgroundColor: isToday ? "rgba(10,61,46,0.5)" : "transparent" }}
                      >
                        <td className={`px-6 py-4 whitespace-nowrap ${isToday ? "font-bold" : ""}`}>
                          {day.date.gregorian.day} {day.date.gregorian.month.en.substring(0, 3)}
                        </td>
                        <td className={`px-4 py-4 ${isToday ? "font-bold" : ""}`}>{day.timings.Fajr.split(' ')[0]}</td>
                        <td className="px-4 py-4 text-white/40">{day.timings.Sunrise.split(' ')[0]}</td>
                        <td className={`px-4 py-4 ${isToday ? "font-bold" : ""}`}>{day.timings.Dhuhr.split(' ')[0]}</td>
                        <td className={`px-4 py-4 ${isToday ? "font-bold" : ""}`}>{day.timings.Asr.split(' ')[0]}</td>
                        <td className="px-4 py-4 font-bold" style={{ color: "#c9a84c" }}>{day.timings.Maghrib.split(' ')[0]}</td>
                        <td className={`px-4 py-4 ${isToday ? "font-bold" : ""}`}>{day.timings.Isha.split(' ')[0]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 pb-8 w-full">
        <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
        <div className="grid gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
              <h4 className="font-bold text-white mb-2">{faq.q}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
      {/* SEO Article */}
      <section className="max-w-4xl mx-auto px-4 py-10 w-full">
        <article
          className="p-8 md:p-12 rounded-[28px] text-white"
          style={{ background: "rgba(10,61,46,0.7)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(16px)" }}
        >
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
{/* City Description */}
{cityDescription && (
  <section className="max-w-4xl mx-auto px-4 pb-8 w-full">
    <div
      className="p-8 md:p-10 rounded-[28px] text-white"
      style={{
        background: "rgba(10,61,46,0.7)",
        border: "1px solid rgba(201,168,76,0.2)",
        backdropFilter: "blur(16px)",
      }}
    >
      <h2 className="text-2xl font-black mb-6 text-white">
        About {cityName}
      </h2>
      <div className="space-y-4">
        {cityDescription.split("\n\n").filter(Boolean).map((para, i) => (
          <p key={i} className="text-white/70 leading-relaxed text-sm">
            {para}
          </p>
        ))}
      </div>
    </div>
  </section>
)}
{/* Other Cities Section */}
{(() => {
  const majorCities = getMajorCities(country).filter(
    (c) => c.toLowerCase() !== cityName.toLowerCase()
  );
  return majorCities.length > 0 ? (
    <section className="max-w-4xl mx-auto px-4 pb-8 w-full">
      <div
        className="p-8 rounded-[28px]"
        style={{ background: "rgba(10,61,46,0.7)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(16px)" }}
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Prayer Timings in Other {countryName} Cities
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {majorCities.map((otherCity) => {
            const citySlug = otherCity.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                key={citySlug}
                href={`/${country}/${citySlug}`}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                🕌 {otherCity}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;
})()}
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
