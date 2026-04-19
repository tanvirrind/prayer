"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────
type CountryItem = {
  slug: string;
  name: string;
  flag: string;
  cities: number;
};

type CityItem = {
  name: string;
  href: string;
};

type Props =
  | { type: "countries"; items: CountryItem[]; perPage?: number }
  | { type: "cities"; items: CityItem[]; perPage?: number };

// ── Component ──────────────────────────────────────────
export default function PaginatedGrid(props: Props) {
  const { type, items, perPage = type === "countries" ? 24 : 30 } = props;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handlePage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={type === "countries" ? "Search countries..." : "Search cities..."}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-yellow-400 transition-all"
          style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
        />
        {search && (
          <p className="text-white/40 text-xs mt-2 font-bold uppercase tracking-wider">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="text-center py-16 text-white/40 font-bold">
          No results found for &ldquo;{search}&rdquo;
        </div>
      ) : type === "countries" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(visible as CountryItem[]).map((country) => (
            <Link
              key={country.slug}
              href={`/${country.slug}`}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white/90 border border-white/30 hover:border-yellow-400 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <div className="font-bold text-base" style={{ color: "#0a3d2e" }}>
                    {country.name}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-0.5">
                    {country.cities}+ Cities
                  </div>
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-yellow-500 transition-colors text-xl">→</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(visible as CityItem[]).map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white/90 border border-white/30 hover:border-yellow-400 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <div>
                <div className="font-bold text-base" style={{ color: "#0a3d2e" }}>
                  {city.name}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-0.5">
                  Prayer Timings Today
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-yellow-500 transition-colors text-xl">→</span>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {/* Prev */}
          <button
            onClick={() => handlePage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider transition-all disabled:opacity-30"
            style={{
              background: page === 1 ? "rgba(255,255,255,0.05)" : "rgba(201,168,76,0.15)",
              color: "#c9a84c",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
          >
            ← Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | "...")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === "..." ? (
                <span key={`ellipsis-${idx}`} className="text-white/30 font-bold px-1">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePage(p as number)}
                  className="w-10 h-10 rounded-xl text-sm font-black transition-all"
                  style={{
                    background: page === p ? "#c9a84c" : "rgba(255,255,255,0.08)",
                    color: page === p ? "#0a3d2e" : "rgba(255,255,255,0.6)",
                    border: page === p ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {p}
                </button>
              )
            )}

          {/* Next */}
          <button
            onClick={() => handlePage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider transition-all disabled:opacity-30"
            style={{
              background: page === totalPages ? "rgba(255,255,255,0.05)" : "rgba(201,168,76,0.15)",
              color: "#c9a84c",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
          >
            Next →
          </button>
        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <p className="text-center text-white/30 text-xs font-bold uppercase tracking-wider mt-3">
          Page {page} of {totalPages} · {filtered.length} total
        </p>
      )}
    </div>
  );
}