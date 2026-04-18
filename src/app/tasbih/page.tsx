"use client";
import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const PRESETS = [
  { phrase: "SubhanAllah", arabic: "سُبْحَانَ اللَّه", goal: 33 },
  { phrase: "Alhamdulillah", arabic: "الْحَمْدُ لِلَّه", goal: 33 },
  { phrase: "Allahu Akbar", arabic: "اللَّهُ أَكْبَر", goal: 34 },
];

export default function TasbihPage() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(33);
  const [preset, setPreset] = useState(PRESETS[0]);
  const done = count >= goal;

  function tap() {
    if (!done) setCount((c) => c + 1);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>
          Tasbih Counter
        </div>
        <h1 className="text-3xl font-black text-white mb-1 tracking-tight">{preset.phrase}</h1>
        <div className="text-xl mb-8 text-white/60" style={{ fontFamily: "'Playfair Display',serif" }}>
          {preset.arabic}
        </div>

        {/* Count display */}
        <div className="text-8xl font-black text-white mb-2 tracking-tighter" style={{ letterSpacing: "-4px" }}>
          {count}
        </div>
        <div className="text-sm text-white/50 mb-8 font-bold">
          {done ? "✅ Complete! Mashallah!" : `${goal - count} remaining`}
        </div>

        {/* Tap button */}
        <button
          onClick={tap}
          disabled={done}
          className="w-44 h-44 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-150 active:scale-95 mb-8 disabled:opacity-50"
          style={{
            background: done ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.12)",
            border: `3px solid ${done ? "#c9a84c" : "rgba(255,255,255,0.25)"}`,
            color: "white",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 60px rgba(201,168,76,0.15)",
          }}
        >
          {done ? "🎉 Done!" : "TAP"}
        </button>

        {/* Progress bar */}
        <div className="w-64 h-2 rounded-full bg-white/10 mb-6 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min((count / goal) * 100, 100)}%`, background: "#c9a84c" }}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => { setCount(0); }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Reset
          </button>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-3 justify-center">
          {PRESETS.map((p) => (
            <button
              key={p.phrase}
              onClick={() => { setPreset(p); setGoal(p.goal); setCount(0); }}
              className="px-4 py-2 rounded-full text-xs font-black transition-all duration-200"
              style={{
                background: preset.phrase === p.phrase ? "#c9a84c" : "rgba(255,255,255,0.1)",
                color: preset.phrase === p.phrase ? "#0a3d2e" : "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {p.phrase} × {p.goal}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
