import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";

export const metadata: Metadata = {
  title: "Namaz Timings Pakistan | Prayer Times All Cities | Souq Al Madina",
  description:
    "Accurate Namaz timings for all cities in Pakistan — Karachi, Lahore, Islamabad, Faisalabad and 50+ cities. Also covers UAE, UK, USA, Saudi Arabia. Fajr, Dhuhr, Asr, Maghrib, Isha times updated daily.",
  keywords:
    "namaz timings Pakistan, prayer times Karachi, prayer times Lahore, namaz time today, salah times Pakistan, Islamic prayer times",
  alternates: { canonical: "https://prayer.souqalmadina.com.pk" },
};

const countries = [
  {
    name: "Pakistan",
    slug: "pakistan",
    flag: "🇵🇰",
    cities: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Peshawar", "Quetta", "Rawalpindi", "Sialkot", "Gujranwala", "Hyderabad", "Sukkur"],
    priority: true,
  },
  {
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    flag: "🇸🇦",
    cities: ["Mecca", "Medina", "Riyadh", "Jeddah", "Dammam", "Taif"],
    priority: true,
  },
  {
    name: "United Arab Emirates",
    slug: "united-arab-emirates",
    flag: "🇦🇪",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Al Ain"],
    priority: false,
  },
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    flag: "🇬🇧",
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Bradford", "Glasgow"],
    priority: false,
  },
  {
    name: "United States",
    slug: "united-states",
    flag: "🇺🇸",
    cities: ["New York", "Chicago", "Houston", "Los Angeles", "Dallas", "Detroit"],
    priority: false,
  },
  {
    name: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    priority: false,
  },
  {
    name: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    priority: false,
  },
  {
    name: "Turkey",
    slug: "turkey",
    flag: "🇹🇷",
    cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
    priority: false,
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    flag: "🇲🇾",
    cities: ["Kuala Lumpur", "Penang", "Johor Bahru", "Kota Kinabalu"],
    priority: false,
  },
  {
    name: "Indonesia",
    slug: "indonesia",
    flag: "🇮🇩",
    cities: ["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar"],
    priority: false,
  },
  {
    name: "Bangladesh",
    slug: "bangladesh",
    flag: "🇧🇩",
    cities: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"],
    priority: false,
  },
  {
    name: "Egypt",
    slug: "egypt",
    flag: "🇪🇬",
    cities: ["Cairo", "Alexandria", "Giza", "Sharm el-Sheikh"],
    priority: false,
  },
];

export const dynamic = "force-dynamic";

export default function HomePage() {
  const pakistanCountry = countries.find((c) => c.slug === "pakistan")!;
  const otherCountries = countries.filter((c) => c.slug !== "pakistan");

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-20 pb-12 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest"
            style={{
              background: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.35)",
              color: "#c9a84c",
            }}
          >
            <span className="pulse-gold w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            Live Namaz Timings — Updated Daily
          </div>

          <h1
            className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white"
            style={{ letterSpacing: "-2px" }}
          >
            Namaz Timings
            <br />
            <span
              className="italic font-light"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#c9a84c",
              }}
            >
              for Every City.
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg text-white/65 leading-relaxed">
            Accurate Fajr, Dhuhr, Asr, Maghrib &amp; Isha timings for Pakistan and 190+ countries. Verified data from Aladhan API. Completely free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/pakistan"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-opacity hover:opacity-85"
              style={{ background: "#c9a84c", color: "#0a3d2e" }}
            >
              🇵🇰 Pakistan Prayer Times →
            </Link>
            <Link
              href="/saudi-arabia"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 text-white transition-colors hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              🕋 Makkah & Madinah
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Pakistan city links — high SEO value */}
      <section className="max-w-5xl mx-auto px-4 pb-10 w-full">
        <div
          className="rounded-3xl p-6 md:p-10"
          style={{
            background: "rgba(10,61,46,0.7)",
            border: "1px solid rgba(201,168,76,0.25)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🇵🇰</span>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Pakistan Namaz Timings
              </h2>
              <p className="text-xs text-white/50 font-bold uppercase tracking-wider">
                Most searched cities
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pakistanCountry.cities.map((city) => (
              <Link
                key={city}
                href={`/pakistan/${city.toLowerCase().replace(/ /g, "-")}`}
                className="group flex items-center justify-between p-4 rounded-2xl text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div>
                  <div className="font-bold text-sm">{city}</div>
                  <div className="text-[10px] text-white/45 font-bold uppercase tracking-wider mt-0.5">
                    Namaz Timings
                  </div>
                </div>
                <span className="text-white/30 group-hover:text-yellow-400 transition-colors text-lg">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Ads */}
      <div className="bg-white/95 backdrop-blur py-2">
        <ProductAds />
      </div>

      {/* All Countries */}
      <section className="max-w-5xl mx-auto px-4 py-14 w-full">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>
            🌐 Global Coverage
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ letterSpacing: "-1.5px" }}>
            Prayer Times by{" "}
            <span className="italic font-light" style={{ fontFamily: "'Playfair Display',serif", color: "#c9a84c" }}>
              Country.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherCountries.map((country) => (
            <Link
              key={country.slug}
              href={`/${country.slug}`}
              className="group p-6 rounded-[28px] transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{country.flag}</span>
                <span className="text-white/30 group-hover:text-yellow-400 text-xl transition-colors">→</span>
              </div>
              <div className="text-white font-black text-lg tracking-tight mb-1">{country.name}</div>
              <div className="text-xs text-white/45 font-bold uppercase tracking-wider mb-4">
                {country.cities.length} cities available
              </div>
              <div className="flex flex-wrap gap-1.5">
                {country.cities.slice(0, 3).map((city) => (
                  <span
                    key={city}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="bg-white/95 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <article>
            <h2 className="text-3xl font-black mb-6" style={{ color: "#0a3d2e", letterSpacing: "-1px" }}>
              About Namaz Timings in Pakistan
            </h2>
            <div className="prose prose-stone max-w-none text-gray-600 leading-relaxed space-y-4">
              <p>
                Performing the five daily prayers (Salah) on time is one of the most important obligations for every Muslim. Our platform provides the most accurate <strong>Namaz timings for Pakistan</strong> including Karachi, Lahore, Islamabad, Faisalabad, Multan, Peshawar and all major cities.
              </p>
              <p>
                We use the <strong>Aladhan API</strong> — a globally trusted source for Islamic prayer time calculations — to ensure you always have the correct <strong>Fajr, Dhuhr, Asr, Maghrib and Isha</strong> times for your city. Times are updated daily and adjusted for your local timezone.
              </p>
              <p>
                Whether you are in Pakistan or traveling abroad to Saudi Arabia, UAE, UK, USA or anywhere in the world, Souq Al Madina Prayer Times keeps you connected to your daily Salah.
              </p>
            </div>
          </article>
        </div>
      </section>

    </div>
  );
}
