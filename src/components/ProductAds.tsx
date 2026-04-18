import Link from "next/link";

const products = [
  {
    name: "Ihram Kit – Hajj & Umrah",
    desc: "Complete Ihram set with belt, towel & essentials. Sunnah-compliant quality.",
    price: "PKR 2,499",
    emoji: "🕋",
    url: "https://souqalmadina.com.pk/shop",
    tag: "Best Seller"
  },
  {
    name: "Premium Islamic Books",
    desc: "Quran, Hadith collections, Islamic literature. Free delivery over PKR 3000.",
    price: "From PKR 350",
    emoji: "📖",
    url: "https://souqalmadina.com.pk/shop",
    tag: "New Arrivals"
  },
  {
    name: "Imama (Islamic Turban)",
    desc: "Authentic Sunnah-style Imama in multiple colors. Premium cotton fabric.",
    price: "From PKR 599",
    emoji: "🎩",
    url: "https://souqalmadina.com.pk/shop",
    tag: "Popular"
  },
  {
    name: "Kafan Set",
    desc: "Pure white cotton Kafan sets. Prepared with care and respect.",
    price: "PKR 1,200",
    emoji: "🤍",
    url: "https://souqalmadina.com.pk/shop",
    tag: ""
  },
];

export default function ProductAds() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black"
          style={{ background: "#0a3d2e" }}
        >
          سا
        </div>
        <div>
          <div className="text-xs font-black uppercase tracking-widest" style={{ color: "#c9a84c" }}>
            Souq Al Madina
          </div>
          <div className="text-sm font-bold" style={{ color: "#0a3d2e" }}>
            Islamic Essentials — Shop Now
          </div>
        </div>
        <a
          href="https://souqalmadina.com.pk"
          target="_blank"
          className="ml-auto text-xs font-bold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-80"
          style={{ background: "#0a3d2e" }}
        >
          Visit Store →
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            className="group block bg-white border border-gray-100 rounded-2xl p-4 hover:border-yellow-400 hover:shadow-lg transition-all duration-200"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
              style={{ background: "#f0f4f0" }}
            >
              {p.emoji}
            </div>
            {p.tag && (
              <span
                className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white mb-2 inline-block"
                style={{ background: "#c9a84c" }}
              >
                {p.tag}
              </span>
            )}
            <div className="text-sm font-bold leading-tight mb-1" style={{ color: "#0a3d2e" }}>
              {p.name}
            </div>
            <div className="text-xs text-gray-500 leading-snug mb-2">{p.desc}</div>
            <div className="text-sm font-black" style={{ color: "#c9a84c" }}>
              {p.price}
            </div>
          </a>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        Free delivery over PKR 3,000 •{" "}
        <a href="https://souqalmadina.com.pk" className="underline hover:text-gray-600">
          souqalmadina.com.pk
        </a>
      </p>
    </section>
  );
}
