"use client";
import { useEffect, useState } from "react";

interface Prayer {
  name: string;
  time: string;
  icon: string;
  desc: string;
}

interface ExtraTiming {
  name: string;
  time: string;
}

interface Props {
  mainPrayers: Prayer[];
  extraTimings: ExtraTiming[];
  timezone: string;
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

function getNextPrayerIndex(cur: number, prayers: Prayer[]) {
  let lastPassed = -1;
  for (let i = 0; i < prayers.length; i++) {
    if (cur >= toMins(prayers[i].time)) lastPassed = i;
  }
  const next = lastPassed + 1;
  return next < prayers.length ? next : 0;
}

// Convert "04:31" (24h) → "4:31 AM"
function to12h(t: string) {
  const clean = t.split(" ")[0];
  const [h, m] = clean.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function PrayerCardsLive({ mainPrayers, extraTimings, timezone }: Props) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const cur = getCurrentMinsInTZ(timezone);
  const nextIdx = getNextPrayerIndex(cur, mainPrayers);

  const clockStr = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());

  return (
    <>
      {/* Prayer Cards */}
      <section className="max-w-4xl mx-auto px-4 pb-4 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {mainPrayers.map((p, i) => {
            const isPast = cur >= toMins(p.time) && i !== nextIdx;
            const isNext = i === nextIdx;
            return (
              <div
                key={p.name}
                className="relative p-5 rounded-2xl text-white transition-all hover:scale-[1.02]"
                style={{
                  background: isNext ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.07)",
                  border: isNext ? "2px solid rgba(201,168,76,0.7)" : "1px solid rgba(255,255,255,0.12)",
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
                  {p.name}
                </div>
                <div
                  className="text-2xl font-black tracking-tight tabular-nums"
                  style={{ color: isNext ? "#c9a84c" : "white" }}
                >
                  {to12h(p.time)}
                </div>
                <div className="text-xs text-white/35 mt-1">{p.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Extra Timings */}
      <section className="max-w-4xl mx-auto px-4 pb-6 w-full">
        <div className="grid grid-cols-3 gap-3">
          {extraTimings.map((t) => (
            <div key={t.name} className="p-4 rounded-2xl text-center bg-white/90">
              <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">
                {t.name}
              </div>
              <div className="text-xl font-black" style={{ color: "#0a3d2e" }}>
                {to12h(t.time)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}