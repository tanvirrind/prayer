"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, MessageSquare, Send, Users, Shield, Loader2 
} from "lucide-react";
import { 
  collection, addDoc, onSnapshot, 
  query, orderBy, limit, serverTimestamp, 
  updateDoc, doc, increment
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType, signInWithGoogle } from "@/lib/firebase";
import { useAuth } from "@/components/FirebaseProvider";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";

export const dynamic = 'force-dynamic';

export default function CommunityPage() {
  const { user, isAuthReady } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [newRequest, setNewRequest] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isAuthReady) return;

    const q = query(collection(db, "prayerRequests"), orderBy("createdAt", "desc"), limit(50));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "prayerRequests");
    });

    return () => unsubscribe();
  }, [isAuthReady, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      if (confirm("You need to be signed in to submit a request. Sign in with Google?")) {
        await signInWithGoogle();
      }
      return;
    }
    if (!newRequest.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "prayerRequests"), {
        authorUid: user.uid,
        authorName: isAnonymous ? "Anonymous User" : user.displayName || "Unknown",
        text: newRequest.trim(),
        prayersCount: 0,
        isAnonymous,
        createdAt: serverTimestamp(),
      });
      setNewRequest("");
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "prayerRequests");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePray = async (requestId: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "prayerRequests", requestId), {
        prayersCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `prayerRequests/${requestId}`);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-5 text-xs text-white/45 font-bold uppercase tracking-wider flex items-center gap-2 w-full">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-white/75">Community Support</span>
      </div>

      <main className="flex-1 w-full pb-12">
        {/* Community Banner */}
        <section className="max-w-4xl mx-auto px-4 pt-5 pb-4 w-full">
          <div
            className="rounded-[28px] p-7 md:p-10 relative overflow-hidden"
            style={{ background: "rgba(10,61,46,0.85)", border: "1px solid rgba(201,168,76,0.25)", backdropFilter: "blur(16px)" }}
          >
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#0a3d2e] bg-[#c9a84c]">
                  <Users className="w-3 h-3" />
                  {requests.length}+ Prayers Shared
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight" style={{ letterSpacing: "-1px" }}>
                  Prayers in <span style={{ color: "#c9a84c", fontFamily: "'Playfair Display',serif" }} className="italic font-light">Unity.</span>
                </h1>
                <p className="text-lg text-white/70 tracking-wide max-w-md">
                  Submit a prayer request or join others in their Duas. A community built on empathy and spiritual support.
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(201,168,76,0.06), transparent)" }} />
            <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(201,168,76,0.08)", filter: "blur(50px)" }} />
          </div>
        </section>

        {/* Submit Request */}
        <section className="max-w-4xl mx-auto px-4 pb-4 w-full">
          <div 
            className="p-8 rounded-[28px] space-y-6"
            style={{ background: "rgba(10,61,46,0.7)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(16px)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(201,168,76,0.15)" }}>
                <Send className="w-5 h-5 text-[#c9a84c]" />
              </div>
              <h3 className="text-xl font-bold text-white">Ask for Duas</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea 
                  value={newRequest}
                  onChange={(e) => setNewRequest(e.target.value)}
                  placeholder="What would you like the community to pray for?"
                  className="w-full p-6 rounded-3xl outline-none min-h-[120px] resize-none transition-all text-white font-medium placeholder:text-white/30"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>
              <div className="flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className="flex items-center gap-2 text-xs text-white/60 font-bold hover:text-white transition-colors"
                >
                  <div className="w-4 h-4 rounded border flex items-center justify-center transition-colors" 
                       style={{ background: isAnonymous ? "#c9a84c" : "rgba(255,255,255,0.05)", borderColor: isAnonymous ? "#c9a84c" : "rgba(255,255,255,0.2)" }}>
                    {isAnonymous && <Shield className="w-3 h-3 text-[#0a3d2e]" />}
                  </div>
                  <span>Anonymous Support</span>
                </button>
                <button 
                  type="submit"
                  disabled={submitting || !newRequest.trim()}
                  className="px-8 py-3 rounded-2xl font-bold hover:opacity-90 disabled:opacity-50 transition-all active:scale-95 text-[#0a3d2e]"
                  style={{ background: "#c9a84c" }}
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Product Ads */}
        <div className="bg-white py-2 my-8">
          <ProductAds />
        </div>

        {/* Request Feed */}
        <section className="max-w-4xl mx-auto px-4 pb-24 w-full space-y-6">
          <h3 className="text-2xl font-black tracking-tight flex items-center gap-2 text-white">
            Active Requests
            <span className="w-2 h-2 rounded-full bg-[#c9a84c]" />
          </h3>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/40 gap-4">
               <Loader2 className="w-8 h-8 animate-spin" />
               <p className="text-sm font-bold uppercase tracking-widest">Loading community feed...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {requests.map(req => (
                <div key={req.id} className="p-6 md:p-8 rounded-2xl border border-white/10 transition-all hover:scale-[1.01]" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="space-y-6 relative z-10 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm uppercase text-white" style={{ background: "rgba(10,61,46,0.8)", border: "1px solid rgba(201,168,76,0.3)" }}>
                          {req.authorName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{req.authorName}</p>
                          <p className="text-[10px] uppercase font-black text-white/40 tracking-widest">
                            {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'Just now'}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <MessageSquare className="w-4 h-4 text-[#c9a84c]" />
                      </button>
                    </div>
                    <p className="text-xl text-white/90 leading-relaxed" style={{ fontFamily: "'Playfair Display',serif" }}>
                      "{req.text}"
                    </p>
                    <div className="pt-4 flex items-center justify-between border-t border-white/10 border-dashed">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a3d2e] bg-[#c9a84c]/20" />
                          ))}
                        </div>
                        <p className="text-[10px] font-black text-white/50 uppercase ml-2 tracking-widest">
                          {req.prayersCount || 0} People Prayed
                        </p>
                      </div>
                      <button 
                        onClick={() => handlePray(req.id)}
                        className="flex items-center gap-2 px-6 py-2 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-[#0a3d2e]"
                        style={{ background: "#c9a84c" }}
                      >
                        <Heart className="w-3 h-3 fill-current" />
                        <span>I Prayed</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <div className="text-center py-20 rounded-[28px] border-dashed border border-white/20" style={{ background: "rgba(255,255,255,0.02)" }}>
                   <p className="text-white/60 italic font-serif">Be the first to share a prayer request.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}