"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LiveClockBox from "@/components/LiveClockBox";

interface Timings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

interface LocationData {
  city: string;
  country: string;
  countrySlug: string;
  citySlug: string;
  timings: Timings;
  timezone: string;
  method: string;
}

function to12h(t: string) {
  const clean = t.split(" ")[0];
  const [h, m] = clean.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function toMins(t: string) {
  const clean = t.split(" ")[0];
  const [h, m] = clean.split(":").map(Number);
  return h * 60 + m;
}

function getCurrentMinsInTZ(tz: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const h = parseInt(parts.find((p) => p.type === "hour")!.value);
  const m = parseInt(parts.find((p) => p.type === "minute")!.value);
  return h * 60 + m;
}

const PRAYERS = [
  { key: "Fajr",    label: "Fajr",    icon: "🌅", desc: "Pre-dawn prayer"   },
  { key: "Dhuhr",   label: "Dhuhr",   icon: "☀️",  desc: "Midday prayer"     },
  { key: "Asr",     label: "Asr",     icon: "🌤",  desc: "Afternoon prayer"  },
  { key: "Maghrib", label: "Maghrib", icon: "🌆",  desc: "Sunset prayer"     },
  { key: "Isha",    label: "Isha",    icon: "🌙",  desc: "Night prayer"      },
];

export default function LocationPrayerTimes() {
  type StateType = "loading" | "success" | "error";
  const [state, setState] = useState<StateType>("loading");
  const [data, setData] = useState<LocationData | null>(null);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    async function detectByIP() {
      try {
        const res = await fetch("https://freeipapi.com/api/json");
        const json = await res.json();
        if (!json.city) throw new Error();
        const { lat, lon, city, country } = json;
        const prayerRes = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=3`
        );
        const prayerJson = await prayerRes.json();
        if (prayerJson.code !== 200) throw new Error();
        setData({
          city,
          country,
          countrySlug: country.toLowerCase().replace(/\s+/g, "-"),
          citySlug: city.toLowerCase().replace(/\s+/g, "-"),
          timings: prayerJson.data.timings,
          timezone: prayerJson.data.meta.timezone,
          method: prayerJson.data.meta.method.name,
        });
        setState("success");
      } catch {
        setState("error");
        setError("Could not detect your location.");
      }
    }
    detectByIP();
  }, []);

  useEffect(() => {
    if (!data) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [data]);

  const nextIdx = data
    ? (() => {
        const cur = getCurrentMinsInTZ(data.timezone);
        let lastPassed = -1;
        PRAYERS.forEach((p, i) => {
          if (cur >= toMins(data.timings[p.key as keyof Timings])) lastPassed = i;
        });
        const next = lastPassed + 1;
        return next < PRAYERS.length ? next : 0;
      })()
    : 0;

  const today = new Date();
  const readableDate = today.toLocaleDateString("en-US", {
    day: "numeric", month: "short", year: "numeric",
  });
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="max-w-4xl mx-auto px-4 pt-5 pb-4 w-full">
      <div
        className="rounded-[28px] p-7 md:p-10 relative overflow-hidden"
        style={{
          background: "rgba(10,61,46,0.85)",
          border: "1px solid rgba(201,168,76,0.25)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Same decorative overlays as city page */}
        <div
          className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(201,168,76,0.06), transparent)" }}
        />
        <div
          className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "rgba(201,168,76,0.08)", filter: "blur(50px)" }}
        />

        <div className="relative z-10">

          {/* LOADING */}
          {state === "loading" && (
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>
                  📍 Detecting your location…
                </div>
                <div className="text-3xl md:text-5xl font-black text-white/20 mb-2" style={{ letterSpacing: "-1.5px" }}>
                  {readableDate}
                </div>
                <p className="text-lg font-black text-white/30">{weekday}</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 mt-2">
                <div
                  className="w-8 h-8 rounded-full border-2 animate-spin"
                  style={{ borderColor: "#c9a84c", borderTopColor: "transparent" }}
                />
              </div>
            </div>
          )}

          {/* ERROR */}
          {state === "error" && (
            <div className="py-6">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>
                📍 Location unavailable
              </div>
              <p className="text-white/40 text-sm">{error}</p>
            </div>
          )}

          {/* SUCCESS — exact city page hero layout */}
          {state === "success" && data && (
            <>
              {/* Hero top row — identical to city page */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                  {/* Gold location label */}
                  <div
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-3"
                    style={{ color: "#c9a84c" }}
                  >
                    📍 {data.city}, {data.country}
                  </div>

                  {/* Title — same as h1 on city page */}
                  <h2
                    className="text-2xl md:text-3xl font-black text-white tracking-tight mb-6"
                    style={{ letterSpacing: "-1px" }}
                  >
                    Prayer Timings in {data.city}, {data.country}
                  </h2>

                  {/* Large date */}
                  <div
                    className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2"
                    style={{ letterSpacing: "-1.5px" }}
                  >
                    {readableDate}
                  </div>

                  {/* Weekday */}
                  <p
                    className="text-lg md:text-xl font-black text-white/70"
                    style={{ letterSpacing: "-0.5px" }}
                  >
                    {weekday}
                  </p>
                </div>

                {/* LiveClockBox — exact same component as city page */}
                <LiveClockBox timezone={data.timezone} />
              </div>

              {/* Prayer Cards — exact same as city page */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {PRAYERS.map((p, i) => {
                  const time = data.timings[p.key as keyof Timings];
                  const cur = getCurrentMinsInTZ(data.timezone);
                  const isPast = cur >= toMins(time) && i !== nextIdx;
                  const isNext = i === nextIdx;
                  return (
                    <div
                      key={p.key}
                      className="relative p-5 rounded-2xl text-white transition-all hover:scale-[1.02]"
                      style={{
                        background: isNext ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.1)",
                        border: isNext
                          ? "2px solid rgba(201,168,76,0.7)"
                          : "1px solid rgba(255,255,255,0.15)",
                        backdropFilter: "blur(12px)",
                        opacity: isPast ? 0.45 : 1,
                      }}
                    >
                      {isNext && (
                        <div
                          className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full whitespace-nowrap"
                          style={{ background: "#c9a84c", color: "#0a3d2e" }}
                        >
                          Next
                        </div>
                      )}
                      <div className="text-2xl mb-4">{p.icon}</div>
                      <div className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">
                        {p.label}
                      </div>
                      <div
                        className="text-2xl font-black tracking-tight tabular-nums"
                        style={{ color: isNext ? "#c9a84c" : "white" }}
                      >
                        {to12h(time)}
                      </div>
                      <div className="text-xs text-white/35 mt-1">{p.desc}</div>
                    </div>
                  );
                })}
              </div>

              {/* Full page link */}
              <div className="flex justify-end">
                <Link
                  href={`/${data.countrySlug}/${data.citySlug}`}
                  className="text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-opacity hover:opacity-80"
                  style={{
                    background: "rgba(201,168,76,0.2)",
                    color: "#c9a84c",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                >
                  View Full Page →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
