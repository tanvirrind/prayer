import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(10,61,46,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.25)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden"
            style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.4)" }}
          >
            <Image src="/favicon.png" alt="Souq Al Madina" width={34} height={34} />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-black tracking-tight text-white">Prayer Times</div>
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#c9a84c" }}>
              Souq Al Madina
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/countries" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
            All Countries
          </Link>
          <Link href="/tasbih" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
            Tasbih
          </Link>
          <Link href="/qibla" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
            Qibla
          </Link>
        </nav>

        {/* CTA */}
        <a
          href="https://souqalmadina.com.pk"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-opacity hover:opacity-85"
          style={{ background: "#c9a84c", color: "#0a3d2e" }}
        >
          🛒 Shop Now
        </a>
      </div>
    </header>
  );
}
