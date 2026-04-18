import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#072a1f", borderTop: "1px solid rgba(201,168,76,0.2)" }} className="py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🕌</span>
            <div>
              <div className="font-black text-white">Souq Al Madina</div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#c9a84c" }}>
                Prayer Times
              </div>
            </div>
          </div>
          <p className="text-sm text-white/50 max-w-xs leading-relaxed">
            Accurate Namaz timings for Muslims worldwide. Powered by Souq Al Madina — your trusted Islamic essentials store.
          </p>
        </div>
        <div className="flex gap-12">
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">Prayer Times</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/pakistan" className="hover:text-white transition-colors">Pakistan</Link></li>
              <li><Link href="/saudi-arabia" className="hover:text-white transition-colors">Saudi Arabia</Link></li>
              <li><Link href="/united-arab-emirates" className="hover:text-white transition-colors">UAE</Link></li>
              <li><Link href="/united-kingdom" className="hover:text-white transition-colors">UK</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/tasbih" className="hover:text-white transition-colors">Tasbih Counter</Link></li>
              <li><Link href="/qibla" className="hover:text-white transition-colors">Qibla Finder</Link></li>
              <li>
                <a href="https://souqalmadina.com.pk" className="hover:text-white transition-colors">
                  Shop Islamic Essentials
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/35 font-bold uppercase tracking-wider">
        <p>© 2026 Souq Al Madina. All rights reserved.</p>
        <a href="https://souqalmadina.com.pk" className="hover:text-white transition-colors">
          souqalmadina.com.pk →
        </a>
      </div>
    </footer>
  );
}
