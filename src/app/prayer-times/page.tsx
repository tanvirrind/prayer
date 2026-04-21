import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";
import { Compass, Moon, Users } from "lucide-react";
import LocationPrayerTimes from "@/components/LocationPrayerTimes";


const features = [
  { 
    title: "Qibla Finder", 
    desc: "Precision compass for accurate prayer direction.", 
    href: "prayer-times/qibla", 
    icon: <Compass className="w-8 h-8" />
  },
  { 
    title: "Tasbih Counter", 
    desc: "Digital counter for daily remembrance.", 
    href: "prayer-times/tasbih", 
    icon: <Moon className="w-8 h-8" />
  },
  { 
    title: "Prayer Companion", 
    desc: "Track and share your spiritual journey.", 
    href: "prayer-times/community", 
    icon: <Users className="w-8 h-8" />
  },
];

export const metadata: Metadata = {
  title: "Global Prayer Times Today | Accurate Namaz Timings Worldwide | Souq Al Madina",
  description:
    "Get accurate prayer times worldwide for today. Fajr, Dhuhr, Asr, Maghrib, and Isha timings for all countries and cities. Reliable Islamic Namaz schedule, updated daily.",
  keywords:
    "prayer timings Global, prayer times Karachi, prayer times Lahore, prayer time today, salah times Pakistan, Islamic prayer times",
  alternates: { canonical: "https://noor.souqalmadina.com.pk/prayer-times" },
};

const countries = [
  {
    name: "Pakistan",
    slug: "/prayer-times/pakistan",
    flag: "🇵🇰",
    cities: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Peshawar", "Quetta", "Rawalpindi", "Sialkot", "Gujranwala", "Hyderabad", "Sukkur"],
    priority: true,
  },
  {
    name: "Saudi Arabia",
    slug: "prayer-times/saudi-arabia",
    flag: "🇸🇦",
    cities: ["Mecca", "Medina", "Riyadh", "Jeddah", "Dammam", "Taif"],
    priority: true,
  },
  {
    name: "United Arab Emirates",
    slug: "prayer-times/united-arab-emirates",
    flag: "🇦🇪",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Al Ain"],
    priority: false,
  },
  {
    name: "United Kingdom",
    slug: "prayer-times/united-kingdom",
    flag: "🇬🇧",
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Bradford", "Glasgow"],
    priority: false,
  },
  {
    name: "United States",
    slug: "prayer-times/united-states",
    flag: "🇺🇸",
    cities: ["New York", "Chicago", "Houston", "Los Angeles", "Dallas", "Detroit"],
    priority: false,
  },
  {
    name: "Canada",
    slug: "prayer-times/canada",
    flag: "🇨🇦",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    priority: false,
  },
  {
    name: "Australia",
    slug: "prayer-times/australia",
    flag: "🇦🇺",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    priority: false,
  },
  {
    name: "Turkey",
    slug: "prayer-times/turkey",
    flag: "🇹🇷",
    cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
    priority: false,
  },
  {
    name: "Malaysia",
    slug: "prayer-times/malaysia",
    flag: "🇲🇾",
    cities: ["Kuala Lumpur", "Penang", "Johor Bahru", "Kota Kinabalu"],
    priority: false,
  },
  {
    name: "Indonesia",
    slug: "prayer-times/indonesia",
    flag: "🇮🇩",
    cities: ["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar"],
    priority: false,
  },
  {
    name: "Bangladesh",
    slug: "prayer-times/bangladesh",
    flag: "🇧🇩",
    cities: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"],
    priority: false,
  },
  {
    name: "Egypt",
    slug: "prayer-times/egypt",
    flag: "🇪🇬",
    cities: ["Cairo", "Alexandria", "Giza", "Sharm el-Sheikh"],
    priority: false,
  },
];

export const dynamic = "force-dynamic";

export default function HomePage() {
  const pakistanCountry = countries.find((c) => c.slug === "/prayer-times/pakistan")!;
  const otherCountries = countries.filter((c) => c.slug !== "/prayer-times/pakistan");

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
            Live prayer timings for 125,000+ cities
          </div>

          <h1
            className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white"
            style={{ letterSpacing: "-2px" }}
          >
            Your Daily
            <br />
            <span
              className="text-yellow-300 italic font-light"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Prayer Times
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg text-white/65 leading-relaxed">
            A high-precision companion for the modern Muslim.  Trusted Salah times for 125,000 cities and towns across the globe.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="prayer-times/pakistan"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-opacity hover:opacity-85"
              style={{ background: "#c9a84c", color: "#0a3d2e" }}
            >
              🇵🇰 Pakistan Prayer Times →
            </Link>
            <Link
              href="prayer-times/countries"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 text-white transition-colors hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              🌐 Explore All Countries
            </Link>
          </div>
        </div>
      </section>
<LocationPrayerTimes />

{/* Quick Pakistan city links */}
<section className="max-w-5xl mx-auto px-4 pb-10 w-full">
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
                Prayer Timings in Pakistan's Top Cities
              </h2>
              <p className="text-xs text-white/50 font-bold uppercase tracking-wider">
                Most searched cities
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pakistanCountry?.cities?.map((city) => (
              <Link
                key={city}
                href={`/prayer-times/pakistan/${city.toLowerCase().replace(/ /g, "-")}`}
                className="group flex items-center justify-between p-4 rounded-2xl text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div>
                  <div className="font-bold text-sm">{city}</div>
                  <div className="text-[10px] text-white/45 font-bold uppercase tracking-wider mt-0.5">
                    Prayer Timings
                  </div>
                </div>
                <span className="text-white/30 group-hover:text-yellow-400 transition-colors text-lg">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Pills Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group p-8 rounded-[32px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col gap-6"
              style={{
                background: "rgba(10,61,46,0.5)",
                border: "1px solid rgba(201,168,76,0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: "rgba(201,168,76,0.15)",
                  color: "#c9a84c"
                }}
              >
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight text-white">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#c9a84c" }}>
                <span>Launch →</span>
              </div>
            </Link>
          ))}
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
              About Prayer Times
            </h2>
            <div className="prose prose-stone max-w-none text-gray-600 leading-relaxed space-y-4">
              <p>
                Performing the five daily prayers (Salah) on time is one of the most important obligations for every Muslim. Our platform provides the most accurate <strong>Namaz timings for Fajr, Dhuhr, Asr, Maghrib, and Isha </strong> for 125,000 cities and towns across the world.
              </p>
              <p>
                Every time displayed on Noor is calculated using globally verified Islamic methodologies, cross-referenced for accuracy and adjusted to your exact location and local timezone — automatically, every single day.
              </p>
              <p>
                Whether you are in Pakistan or traveling abroad to Saudi Arabia, UAE, UK, USA or anywhere in the world, Noor by Souq Al Madina Prayer Timings keeps you connected to your daily Salah.
              </p>
            </div>
          </article>
        </div>
      </section>

    </div>
  );
}
