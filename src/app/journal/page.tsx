"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, Sparkles, X, Plus 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SiteHeader from "@/components/SiteHeader";

export const dynamic = 'force-dynamic';

interface JournalEntry {
  id: string;
  text: string;
  date: string;
  tags: string[];
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newText, setNewText] = useState("");
  const [mounted, setMounted] = useState(false);

  // Initialize and load local data
  useEffect(() => {
    setMounted(true);
    const savedEntries = localStorage.getItem("journal_entries");
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error("Failed to load journal entries from local storage:", error);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      text: newText.trim(),
      date: new Date().toISOString(),
      tags: ["Spirituality"],
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("journal_entries", JSON.stringify(updatedEntries));
    
    setNewText("");
    setIsModalOpen(false);
  };

  if (!mounted) return (
     <div className="min-h-screen flex flex-col" style={{ background: "#0a3d2e" }}>
       <SiteHeader />
     </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-5 text-xs text-white/45 font-bold uppercase tracking-wider flex items-center gap-2 w-full">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white/75">Spiritual Journal</span>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-5 space-y-8 pb-12">
        {/* Banner */}
        <section className="w-full">
          <div 
            className="rounded-[28px] p-7 md:p-10 relative overflow-hidden"
            style={{ background: "rgba(10,61,46,0.85)", border: "1px solid rgba(201,168,76,0.25)", backdropFilter: "blur(16px)" }}
          >
            <div className="relative z-10 space-y-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.15)" }}
              >
                 <Sparkles className="w-6 h-6 text-[#c9a84c]" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight" style={{ letterSpacing: "-1px" }}>
                Daily Reflection
              </h1>
              <p className="text-white/70 leading-relaxed italic font-serif text-lg md:text-xl">
                "Indeed, in the remembrance of Allah do hearts find rest."
              </p>
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(201,168,76,0.06), transparent)" }} />
            <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(201,168,76,0.08)", filter: "blur(50px)" }} />
          </div>
        </section>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
               My Entries
               <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />
             </h3>
             <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-[#0a3d2e]"
              style={{ background: "#c9a84c" }}
             >
                <Plus className="w-4 h-4" />
                <span>Add Reflection</span>
             </button>
          </div>

          <div className="grid gap-4">
            {entries.map(entry => (
              <div 
                key={entry.id} 
                className="p-6 md:p-8 rounded-2xl transition-all hover:scale-[1.01]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">
                  <Calendar className="w-3 h-3 text-[#c9a84c]" />
                  <span>{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <p className="text-xl text-white/90 leading-relaxed italic font-serif mb-6 whitespace-pre-wrap">
                  "{entry.text}"
                </p>
                <div className="flex gap-2 pt-4 border-t border-white/10 border-dashed">
                  {entry.tags.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full text-[#c9a84c]"
                      style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {entries.length === 0 && (
              <div 
                className="text-center py-20 rounded-[28px] border-dashed border border-white/20"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                 <p className="text-white/60 italic font-serif">Your spiritual journey starts with the first reflection.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* New Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-[28px] p-8 z-[70] shadow-2xl space-y-6"
              style={{ background: "rgba(10,61,46,0.95)", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black tracking-tight text-white">New Reflection</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <textarea 
                    autoFocus
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Reflect on your day, your prayers, and your connection with the Divine..."
                    className="w-full p-6 rounded-2xl outline-none min-h-[200px] resize-none transition-all text-lg font-serif italic text-white placeholder:text-white/30 focus:border-[#c9a84c]"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!newText.trim()}
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all active:scale-95 text-[#0a3d2e]"
                  style={{ background: "#c9a84c" }}
                >
                  Save Reflection
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}