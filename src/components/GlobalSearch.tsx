"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type CountryItem = { slug: string; name: string; flag: string; cities: number };

export default function GlobalSearch({ countries }: { countries: CountryItem[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return countries.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, countries]);

  return (
    <div className="relative w-full mx-auto">
      <input
        type="text"
        placeholder="Search any country…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-5 py-4 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-yellow-400 transition-all"
        style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
      />

      {results.length > 0 && (
        <ul
          className="absolute z-50 left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "#0a3d2e", border: "1px solid rgba(201,168,76,0.3)" }}
        >
          {results.map((country) => (
            <li key={country.slug}>
              <Link
                href={`/prayer-times/${country.slug}`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-white/10 transition-colors"
                onClick={() => setQuery("")}
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="text-left">
                  <div className="font-bold text-white text-sm">{country.name}</div>
                  <div className="text-xs text-yellow-400/70">{country.cities}+ cities</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query.trim() && results.length === 0 && (
        <div
          className="absolute z-50 left-0 right-0 mt-2 rounded-2xl px-5 py-4 text-sm font-bold text-white/40 text-center"
          style={{ background: "#0a3d2e", border: "1px solid rgba(201,168,76,0.3)" }}
        >
          No countries found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}