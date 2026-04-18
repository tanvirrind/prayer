"use client";
import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";

export default function QiblaPage() {
  const [angle, setAngle] = useState<number | null>(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function calculate() {
    setLoading(true); setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat1 = pos.coords.latitude * Math.PI / 180;
        const lng1 = pos.coords.longitude;
        const mLat = 21.4225 * Math.PI / 180;
        const mLng = 39.8262;
        const dLng = (mLng - lng1) * Math.PI / 180;
        const y = Math.sin(dLng) * Math.cos(mLat);
        const x = Math.cos(lat1) * Math.sin(mLat) - Math.sin(lat1) * Math.cos(mLat) * Math.cos(dLng);
        const b = ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
        setAngle(Math.round(b * 10) / 10);
        setLocation(`${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`);
        setLoading(false);
      },
      () => { setError("Location access denied. Please allow location."); setLoading(false); }
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>Qibla Finder</div>
        <h1 className="text-3xl font-black text-white mb-1 tracking-tight">Direction to Makkah</h1>
        <p className="text-white/55 mb-10 text-sm">Find the Qibla direction from your current location</p>

        {/* Compass */}
        <div
          className="w-56 h-56 rounded-full flex items-center justify-center mb-8 relative"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "2px solid rgba(201,168,76,0.35)",
            transform: angle ? `rotate(${angle}deg)` : "none",
            transition: "transform 1.2s cubic-bezier(0.4,2,0.6,1)",
            boxShadow: "0 0 80px rgba(201,168,76,0.1)",
          }}
        >
          <div className="absolute top-3 text-xs font-black" style={{ color: "#c9a84c" }}>N</div>
          <div className="absolute bottom-3 text-xs font-bold text-white/40">S</div>
          <div className="absolute right-3 text-xs font-bold text-white/40">E</div>
          <div className="absolute left-3 text-xs font-bold text-white/40">W</div>
          <div className="text-5xl">🕋</div>
        </div>

        {angle !== null && (
          <>
            <div className="text-6xl font-black text-white mb-1 tracking-tighter">{angle}°</div>
            <div className="text-sm text-white/55 mb-2">{angle}° from North</div>
            {location && <div className="text-xs text-white/35 mb-8">Your location: {location}</div>}
          </>
        )}

        {error && <div className="text-red-400 text-sm mb-6">{error}</div>}

        <button
          onClick={calculate}
          disabled={loading}
          className="px-8 py-4 rounded-2xl font-bold text-sm transition-opacity hover:opacity-85 disabled:opacity-50"
          style={{ background: "#c9a84c", color: "#0a3d2e" }}
        >
          {loading ? "Detecting…" : "📍 Find My Qibla Direction"}
        </button>
        <p className="text-xs text-white/35 mt-4">Requires location permission in your browser</p>
      </main>
    </div>
  );
}
