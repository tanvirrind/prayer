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
  isExact: boolean; // true = GPS, false = IP fallback
}

// Most populous/famous city per country code
const COUNTRY_DEFAULT_CITY: Record<string, { city: string; lat: number; lon: number }> = {
  "Pakistan": { city: "Karachi",        lat: 24.8607,  lon: 67.0011  },
  "United Arab Emirates": { city: "Dubai",          lat: 25.2048,  lon: 55.2708  },
  "India": { city: "Mumbai",         lat: 19.0760,  lon: 72.8777  },
  "Saudi Arabia": { city: "Riyadh",         lat: 24.7136,  lon: 46.6753  },
  "United States": { city: "New York",       lat: 40.7128,  lon: -74.0060 },
  "United Kingdom": { city: "London",         lat: 51.5074,  lon: -0.1278  },
  "Bangladesh": { city: "Dhaka",          lat: 23.8103,  lon: 90.4125  },
  "Turkey": { city: "Istanbul",       lat: 41.0082,  lon: 28.9784  },
  "Egypt": { city: "Cairo",          lat: 30.0444,  lon: 31.2357  },
  "Indonesia": { city: "Jakarta",        lat: -6.2088,  lon: 106.8456 },
  "Malaysia": { city: "Kuala Lumpur",   lat: 3.1390,   lon: 101.6869 },
  "Nigeria": { city: "Lagos",          lat: 6.5244,   lon: 3.3792   },
  "Iran": { city: "Tehran",         lat: 35.6892,  lon: 51.3890  },
  "Iraq": { city: "Baghdad",        lat: 33.3152,  lon: 44.3661  },
  "Morocco": { city: "Casablanca",     lat: 33.5731,  lon: -7.5898  },
  "Qatar": { city: "Doha",           lat: 25.2854,  lon: 51.5310  },
  "Kuwait": { city: "Kuwait City",    lat: 29.3759,  lon: 47.9774  },
  "Oman": { city: "Muscat",         lat: 23.5880,  lon: 58.3829  },
  "Jordan": { city: "Amman",          lat: 31.9454,  lon: 35.9284  },
  "Germany": { city: "Berlin",         lat: 52.5200,  lon: 13.4050  },
  "France": { city: "Paris",          lat: 48.8566,  lon: 2.3522   },
  "Canada": { city: "Toronto",        lat: 43.6532,  lon: -79.3832 },
  "Australia": { city: "Sydney",         lat: -33.8688, lon: 151.2093 },
  "Singapore": { city: "Singapore",      lat: 1.3521,   lon: 103.8198 },
};

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
  { key: "Fajr",    label: "Fajr",    icon: "🌅", desc: "Pre-dawn prayer"  },
  { key: "Dhuhr",   label: "Dhuhr",   icon: "☀️",  desc: "Midday prayer"    },
  { key: "Asr",     label: "Asr",     icon: "🌤",  desc: "Afternoon prayer" },
  { key: "Maghrib", label: "Maghrib", icon: "🌆",  desc: "Sunset prayer"    },
  { key: "Isha",    label: "Isha",    icon: "🌙",  desc: "Night prayer"     },
];

async function fetchPrayerTimes(lat: number, lon: number) {
  const res = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=3`
  );
  const json = await res.json();
  if (json.code !== 200) throw new Error("Prayer API failed");
  return json.data;
}

export default function LocationPrayerTimes() {
  type StateType = "loading" | "requesting" | "success" | "error";
  const [state, setState] = useState<StateType>("loading");
  const [data, setData] = useState<LocationData | null>(null);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    async function init() {
      // Step 1: Ask for GPS permission
      setState("requesting");

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          // ✅ GPS granted
          async (pos) => {
            try {
              const { latitude: lat, longitude: lon } = pos.coords;

              // Reverse geocode to get city name
              const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
              );
              const geoJson = await geoRes.json();
              const city =
                geoJson.address?.city ||
                geoJson.address?.town ||
                geoJson.address?.village ||
                geoJson.address?.county ||
                "Your Location";
              const country = geoJson.address?.country || "";

              const prayerData = await fetchPrayerTimes(lat, lon);

              setData({
                city,
                country,
                countrySlug: country.toLowerCase().replace(/\s+/g, "-"),
                citySlug: city.toLowerCase().replace(/\s+/g, "-"),
                timings: prayerData.timings,
                timezone: prayerData.meta.timezone,
                method: prayerData.meta.method.name,
                isExact: true,
              });
              setState("success");
            } catch {
              setState("error");
              setError("Could not load prayer times for your location.");
            }
          },
          // ❌ GPS denied — fall back to IP → country → major city
          async () => {
            try {
              const res = await fetch("/api/location");
              const json = await res.json();

              if (!json.countryCode) throw new Error("No country from IP");

              const countryCode: string = json.countryCode;
              const countryName: string = json.country || countryCode;

              const fallback = COUNTRY_DEFAULT_CITY[countryName] ?? {
                city: "Karachi",
                lat: 21.3891,
                lon: 39.8579,
              };

              const prayerData = await fetchPrayerTimes(fallback.lat, fallback.lon);

              setData({
                city: fallback.city,
                country: countryName,
                countrySlug: countryName.toLowerCase().replace(/\s+/g, "-"),
                citySlug: fallback.city.toLowerCase().replace(/\s+/g, "-"),
                timings: prayerData.timings,
                timezone: prayerData.meta.timezone,
                method: prayerData.meta.method.name,
                isExact: false,
              });
              setState("success");
            } catch {
              setState("error");
              setError("Could not determine your location.");
            }
          },
          // Geolocation options
          { timeout: 100, maximumAge: 300 }
        );
      } else {
        // Browser doesn't support geolocation — go straight to IP fallback
        setState("error");
        setError("Geolocation is not supported by your browser.");
      }
    }

    init();
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
        {/* decorative glows — unchanged */}
        <div
          className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(201,168,76,0.06), transparent)" }}
        />
        <div
          className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "rgba(201,168,76,0.08)", filter: "blur(50px)" }}
        />

        <div className="relative z-10">

          {/* LOADING / REQUESTING */}
          {(state === "loading" || state === "requesting") && (
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>
                  📍 {state === "requesting" ? "Requesting location access…" : "Loading…"}
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

          {/* SUCCESS */}
          {state === "success" && data && (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                  <div
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-3"
                    style={{ color: "#c9a84c" }}
                  >
                    {data.isExact ? "📍" : "🌐"} {data.city}, {data.country}
                    {!data.isExact && (
                      <span className="text-white/30 normal-case font-normal tracking-normal text-xs ml-1">
                        (approximate)
                      </span>
                    )}
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-black text-white tracking-tight mb-6"
                    style={{ letterSpacing: "-1px" }}
                  >
                    Prayer Timings in {data.city}, {data.country}
                  </h2>
                  <div
                    className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2"
                    style={{ letterSpacing: "-1.5px" }}
                  >
                    {readableDate}
                  </div>
                  <p className="text-lg md:text-xl font-black text-white/70" style={{ letterSpacing: "-0.5px" }}>
                    {weekday}
                  </p>
                </div>
                <LiveClockBox timezone={data.timezone} />
              </div>

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
                        border: isNext ? "2px solid rgba(201,168,76,0.7)" : "1px solid rgba(255,255,255,0.15)",
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