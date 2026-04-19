"use client";
import { useEffect, useState } from "react";

export default function LiveClockBox({ timezone }: { timezone: string }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const clockStr = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  return (
    <div
      className="text-center px-6 py-4 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        minWidth: "160px",
      }}
    >
      {/* "Current Time" styled like the Next badge */}
      <div
        className="inline-block text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full mb-3"
        style={{ background: "#c9a84c", color: "#0a3d2e" }}
      >
        Current Time
      </div>
      <div
        className="text-2xl font-black text-white tabular-nums mb-3"
        style={{ letterSpacing: "-0.5px" }}
      >
        {clockStr}
      </div>
      <div className="text-xs font-black uppercase tracking-widest text-white/45 mb-1">
        Timezone
      </div>
      <div className="font-bold text-white text-sm">{timezone}</div>
    </div>
  );
}