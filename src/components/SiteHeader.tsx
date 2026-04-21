"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronLeft } from "lucide-react";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isSubPage = pathname !== "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Prayer Times", href: "/prayer-times" },
    { name: "Tasbih", href: "/tasbih" },
    { name: "Qibla", href: "/qibla" },
    { name: "Community", href: "/community" },
    { name: "Journal", href: "/journal" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(10,61,46,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.25)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left Section: Back Button + Logo */}
        <div className="flex items-center gap-3">
          {isSubPage && (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-8 h-8 rounded border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(201,168,76,0.4)", color: "#c9a84c" }}
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.4)" }}
            >
              <img src="/favicon.png" alt="Souq Al Madina" width={34} height={34} />
            </div>
            <div className="leading-tight">
              <div className="text-2xl font-black tracking-tight text-white">Noor </div>
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#c9a84c" }}>
                by Souq Al Madina
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section: Desktop CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://souqalmadina.com.pk"
            target="_blank"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-opacity hover:opacity-85"
            style={{ background: "#c9a84c", color: "#0a3d2e" }}
          >
            🛒 Shop Now
          </a>
          
          {/* Mobile Menu Toggle */}
<button 
  className="md:hidden p-2 text-white/80 hover:text-white"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden absolute top-16 left-0 w-full border-b shadow-2xl"
          style={{
            background: "rgba(10,61,46,0.98)",
            backdropFilter: "blur(20px)",
            borderBottomColor: "rgba(201,168,76,0.25)",
          }}
        >
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white p-3 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://souqalmadina.com.pk"
              target="_blank"
              className="mt-4 flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-sm font-black uppercase tracking-wider transition-opacity hover:opacity-85"
              style={{ background: "#c9a84c", color: "#0a3d2e" }}
            >
              🛒 Shop Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}