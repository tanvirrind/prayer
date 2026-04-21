import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";
import Footer from "@/components/Footer";
import { Compass, Moon, Users, BookOpen, Star, Clock, ScrollText, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Noor — Your Daily Spirtual Companion | Souq Al Madina",
  description:
    "Noor by Souq Al Madina. One app for Prayer Times, Quran, Hadith, Islamic Names, Qibla, Tasbih and more. Your complete daily spiritual companion.",
  keywords:
    "Noor app, Islamic app, prayer times, Quran app, Hadith, Islamic names, Qibla finder, Muslim app Pakistan",
  alternates: { canonical: "https://noor.souqalmadina.com.pk" },
};

// ── LIVE features ──────────────────────────────────────────────────────────────
const liveApps = [
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Prayer Times",
    tag: "Worldwide · Offline",
    desc: "Accurate Fajr, Dhuhr, Asr, Maghrib & Isha for 50,000+ cities across 160+ countries. Monthly calendar included.",
    href: "/prayer-times",
    cta: "View Prayer Times →",
  },
  {
    icon: <Compass className="w-7 h-7" />,
    title: "Qibla Finder",
    tag: "GPS · Compass",
    desc: "Precision Qibla direction from anywhere in the world using your device GPS and compass.",
    href: "/qibla",
    cta: "Open Qibla →",
  },
  {
    icon: <Moon className="w-7 h-7" />,
    title: "Tasbih Counter",
    tag: "Digital · Free",
    desc: "Digital tasbih counter for your daily dhikr and remembrance of Allah. Simple and distraction-free.",
    href: "/tasbih",
    cta: "Open Tasbih →",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Community",
    tag: "Journal · Tracking",
    desc: "Track your prayers, share your spiritual journey and stay connected with your community.",
    href: "/community",
    cta: "Join Community →",
  },
];

// ── COMING SOON features ───────────────────────────────────────────────────────
const comingApps = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Quran",
    tag: "Arabic · Translation · Audio",
    desc: "Read, listen and reflect on the complete Quran with multiple translations and tafsir.",
  },
  {
    icon: <ScrollText className="w-7 h-7" />,
    title: "Hadith",
    tag: "Bukhari · Muslim · More",
    desc: "Browse authentic hadith collections from the most trusted Islamic scholars worldwide.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Islamic Names",
    tag: "Meanings · Origins",
    desc: "Discover beautiful Islamic names with Arabic meanings, origins and linguistic roots for your family.",
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Dua Collection",
    tag: "Adhkar · Supplications",
    desc: "Morning/evening adhkar, travel duas and daily supplications in one beautifully organised place.",
  },
  {
    icon: <Moon className="w-7 h-7" />,
    title: "Ramadan Tracker",
    tag: "Suhoor · Iftar · Goals",
    desc: "Suhoor & Iftar times, Quran reading plan and daily goals throughout the blessed month.",
  },
  {
    icon: <Compass className="w-7 h-7" />,
    title: "Hajj & Umrah Guide",
    tag: "Step-by-step · Maps",
    desc: "Step-by-step rituals, duas and maps for every pilgrim making the journey to Makkah.",
  },
];

const stats = [
  { num: "125,000+", label: "Cities and Towns" },
  { num: "170+", label: "Countries" },
  { num: "6,236", label: "Quran Verses" },
  { num: "5", label: "Daily Prayers" },
];

export default function NoorHomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-14 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest"
            style={{
              background: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.35)",
              color: "#c2ab2b",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            Your daily Spirtual companion
          </div>

          <h1
            className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-white"
            style={{ letterSpacing: "-2px" }}
          >
            Noor
            <br />
            <span
              className="italic font-light"
              style={{ fontFamily: "'Playfair Display', serif", color: "#c9a84c" }}
            >
              By Souq Al Madina
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg text-white/65 leading-relaxed">
            A high-precision companion for the modern Muslim. Verified Salah times, spiritual tracking, and community features in one place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/prayer-times"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-opacity hover:opacity-85"
              style={{ background: "#c9a84c", color: "#0a3d2e" }}
            >
              🕌 Prayer Times →
            </Link>
            {/* FIX: was also linking to /prayer-times — now scrolls to features */}
            <a
              href="#features"
              className="px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 text-white transition-colors hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Explore All Features
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-4xl mx-auto px-4 pb-12 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center py-5 px-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-3xl font-black mb-1" style={{ color: "#c9a84c" }}>
                {s.num}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/45">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-4xl mx-auto px-4 pb-14 w-full">

        {/* Available Now */}
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>
            🌙 Available Now
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
            style={{ letterSpacing: "-1.5px" }}
          >
            Everything a Muslim{" "}
            <span
              className="italic font-light"
              style={{ fontFamily: "'Playfair Display',serif", color: "#c9a84c" }}
            >
              needs daily.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-14">
          {liveApps.map((app) => (
            <div
              key={app.title}
              className="group p-6 rounded-[28px] flex flex-col transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(10,61,46,0.5)",
                border: "1px solid rgba(201,168,76,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}
              >
                {app.icon}
              </div>
              <div className="text-lg font-black text-white tracking-tight mb-1">{app.title}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">{app.tag}</div>
              <p className="text-sm text-white/55 leading-relaxed flex-1 mb-4">{app.desc}</p>
              <Link
                href={app.href}
                className="text-xs font-black uppercase tracking-widest transition-colors"
                style={{ color: "#c9a84c" }}
              >
                {app.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Coming Soon — separated visually from live features */}
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>
            🚀 Coming Soon
          </p>
          <h2
            className="text-3xl md:text-4xl font-black text-white tracking-tight"
            style={{ letterSpacing: "-1px" }}
          >
            We're just{" "}
            <span
              className="italic font-light"
              style={{ fontFamily: "'Playfair Display',serif", color: "#c9a84c" }}
            >
              getting started.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {comingApps.map((app) => (
            <div
              key={app.title}
              className="group p-6 rounded-[28px] flex flex-col"
              style={{
                background: "rgba(10,61,46,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                opacity: 0.75,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.08)", color: "rgba(201,168,76,0.5)" }}
                >
                  {app.icon}
                </div>
                <span
                  className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full self-start"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    color: "rgba(201,168,76,0.6)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  Soon
                </span>
              </div>
              <div className="text-lg font-black text-white/60 tracking-tight mb-1">{app.title}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/25 mb-3">{app.tag}</div>
              <p className="text-sm text-white/35 leading-relaxed flex-1">{app.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product Ads ── */}
      <div className="bg-white py-2">
        <ProductAds />
      </div>

      {/* ── About Noor ── */}
      <section className="max-w-4xl mx-auto px-4 py-14 w-full">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>
            ✨ About Noor
          </p>
          <h2
            className="text-4xl font-black text-white tracking-tight"
            style={{ letterSpacing: "-1.5px" }}
          >
            Built for Muslims. {" "}
            <span
              className="italic font-light"
              style={{ fontFamily: "'Playfair Display',serif", color: "#c9a84c" }}
            >
               Free forever.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article
            className="p-8 rounded-[28px] text-white"
            style={{
              background: "rgba(10,61,46,0.7)",
              border: "1px solid rgba(201,168,76,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="text-3xl mb-4">🌙</div>
            <h3 className="text-xl font-black mb-3 tracking-tight">Our Mission</h3>
            <p className="text-white/65 leading-relaxed text-sm mb-4">
              Noor — meaning <em style={{ color: "#c9a84c" }}>"light"</em> in Arabic — was built
              with one purpose: to make it effortless for every Muslim to practice their faith in
              today's busy world.
            </p>
            <p className="text-white/65 leading-relaxed text-sm">
              Whether you're checking Fajr time before sunrise, looking up a hadith, or teaching
              your child an Islamic name — Noor is your quiet, always-available companion. No
              subscriptions. No ads hiding your prayer times. Just pure, focused Islamic utility.
            </p>
          </article>

          <article
            className="p-8 rounded-[28px] text-white"
            style={{
              background: "rgba(10,61,46,0.7)",
              border: "1px solid rgba(201,168,76,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="text-3xl mb-4">🛍️</div>
            <h3 className="text-xl font-black mb-3 tracking-tight">About Souq Al Madina</h3>
            <p className="text-white/65 leading-relaxed text-sm mb-4">
              Souq Al Madina is a Pakistani Islamic lifestyle brand dedicated to building products
              that help Muslims live their faith with ease and beauty. From digital tools to halal
              products — everything under one trusted name.
            </p>
            <p className="text-white/65 leading-relaxed text-sm">
              Noor is our flagship digital platform, bringing together all of Souq Al Madina's
              Islamic tools in one place. We are based in Pakistan and proudly serve Muslims across
              the globe.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {["Prayer Apps", "Islamic Content", "Halal Products", "Pakistan"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(201,168,76,0.15)",
                    color: "#c9a84c",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-4xl mx-auto px-4 pb-16 w-full text-center">
        <div
          className="p-12 rounded-[28px]"
          style={{
            background: "rgba(10,61,46,0.7)",
            border: "1px solid rgba(201,168,76,0.25)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="text-4xl mb-4">🌙</div>
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight"
            style={{ letterSpacing: "-1px" }}
          >
            Start with Prayer Times.
            <br />
            <span
              className="italic font-light"
              style={{ fontFamily: "'Playfair Display',serif", color: "#c9a84c" }}
            >
              Explore everything else.
            </span>
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Noor is completely free. No account needed to check prayer times. Begin your journey
            with accurate Salah timings for your city.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/prayer-times"
              className="px-8 py-4 rounded-2xl font-bold text-sm transition-opacity hover:opacity-85"
              style={{ background: "#c9a84c", color: "#0a3d2e" }}
            >
              🕌 Open Prayer Times
            </Link>
            {/* FIX: was /prayer-times/countries — aligned to correct route */}
            <Link
              href="/prayer-times/countries"
              className="px-8 py-4 rounded-2xl font-bold text-sm text-white transition-colors hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Browse All Countries
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
}