import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";
import { getSingleCityCoords, getMajorCities, getCountryCode } from "@/lib/cities";
import PrayerCardsLive from "@/components/PrayerCardsLive";
import LiveClockBox from "@/components/LiveClockBox";
import { generateDailyTimings, generateMonthlyCalendar } from "@/lib/prayerCalculation";

function toTitleCase(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; city: string }> }): Promise<Metadata> {
  const { country, city } = await params;
  const citySlug = city.replace('prayer-times-', '');
  const cityName = toTitleCase(citySlug);
  const countryName = toTitleCase(country);
  return {
    title: `Today Prayer Times in ${cityName} | Fajr, Dhuhr, Asr, Maghrib, Isha in ${cityName} ${countryName}`,
    description: `Today's accurate prayer timings for ${cityName}, ${countryName}. Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha prayer times with Hijri date. Updated daily.`,
    keywords: `prayer times ${cityName}, namaz timing ${cityName} today, ${cityName} prayer schedule, fajr time ${cityName}, isha time ${cityName}`,
    alternates: { canonical: `https://noor.souqalmadina.com.pk/prayer-times/${country}/${city}` },
    openGraph: {
      title: `Prayer Timings ${cityName} — Today`,
      description: `Accurate Fajr, Dhuhr, Asr, Maghrib & Isha times for ${cityName}, ${countryName}.`,
      type: "website",
    },
  };
}

export const dynamic = "force-static";

export default async function CityPage({ params }: { params: Promise<{ country: string; city: string }> }) {
  const { country, city } = await params;
  
  const decodedCountry = decodeURIComponent(country);
  const decodedCity = decodeURIComponent(city);

  const citySlug = decodedCity.replace('prayer-times-', '');
  
  const countryCode = getCountryCode(decodedCountry.toLowerCase()) || "";
  const cleanCityName = citySlug.replace(/-/g, ' ');
  const coords = countryCode ? getSingleCityCoords(countryCode, cleanCityName) : null;
  
  if (!coords || !coords.lat || !coords.lng || !coords.timezone) notFound();

  const cityName = toTitleCase(citySlug);
  const countryName = toTitleCase(country);

  const data = generateDailyTimings(coords.lat, coords.lng, coords.timezone, country);
  const monthData = generateMonthlyCalendar(coords.lat, coords.lng, coords.timezone, country);

  const { timings, meta } = data;

  const dateObj = new Date();
  const date = {
    readable: dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    hijri: { 
      day: new Intl.DateTimeFormat('en-US-u-ca-islamic', { day: 'numeric' }).format(dateObj), 
      month: { en: new Intl.DateTimeFormat('en-US-u-ca-islamic', { month: 'long' }).format(dateObj) }, 
      year: new Intl.DateTimeFormat('en-US-u-ca-islamic', { year: 'numeric' }).format(dateObj).replace(/[^0-9]/g, '') 
    }
  };

  const mainPrayers = [
    { name: "Fajr", time: timings.Fajr, icon: "🌅", desc: "Pre-dawn prayer" },
    { name: "Dhuhr", time: timings.Dhuhr, icon: "☀️", desc: "Midday prayer" },
    { name: "Asr", time: timings.Asr, icon: "🌤", desc: "Afternoon prayer" },
    { name: "Maghrib", time: timings.Maghrib, icon: "🌆", desc: "Sunset prayer" },
    { name: "Isha", time: timings.Isha, icon: "🌙", desc: "Night prayer" },
  ];

  const extraTimings = [
    { name: "Midnight", time: timings.Midnight },
    { name: "Tahajjud", time: timings.Tahajjud },
    { name: "Sunrise", time: timings.Sunrise },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Prayer Times in ${cityName}, ${countryName}`,
    description: `Islamic prayer timings for ${cityName}. Fajr: ${timings.Fajr}, Maghrib: ${timings.Maghrib}.`,
    url: `https://noor.souqalmadina.com.pk/prayer-times/${country}/${city}`,
    publisher: {
      "@type": "Organization",
      name: "Souq Al Madina",
      url: "https://souqalmadina.com.pk",
    },
    mainEntity: {
      "@type": "Place",
      name: cityName,
      address: { "@type": "PostalAddress", addressLocality: cityName, addressCountry: countryName },
    },
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const calendarJsonLd = monthData ? monthData.map((day) => {
    const mIndex = monthNames.indexOf(day.date.gregorian.month.en) + 1;
    const mStr = mIndex.toString().padStart(2, '0');
    const dStr = day.date.gregorian.day.padStart(2, '0');
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": `Prayer Times in ${cityName} - ${day.date.gregorian.day} ${day.date.gregorian.month.en}`,
      "startDate": `${day.date.gregorian.year}-${mStr}-${dStr}`,
      "location": {
        "@type": "Place",
        "name": cityName,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressCountry": countryName
        }
      },
      "description": `Fajr: ${day.timings.Fajr}, Dhuhr: ${day.timings.Dhuhr}, Asr: ${day.timings.Asr}, Maghrib: ${day.timings.Maghrib}, Isha: ${day.timings.Isha}`
    };
  }) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {calendarJsonLd.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calendarJsonLd) }} />
      )}
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 pt-5 text-xs text-white/45 font-bold uppercase tracking-wider flex items-center gap-2">
        <Link href="/prayer-times" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/prayer-times/${country}`} className="hover:text-white transition-colors">{countryName}</Link>
        <span>/</span>
        <span className="text-white/75">{cityName}</span>
      </div>

      <section className="max-w-4xl mx-auto px-4 pt-5 pb-4 w-full">
        <div
          className="rounded-[28px] p-7 md:p-10 relative overflow-hidden"
          style={{ background: "rgba(10,61,46,0.85)", border: "1px solid rgba(201,168,76,0.25)", backdropFilter: "blur(16px)" }}
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>
                📍 {cityName}, {countryName}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-6" style={{ letterSpacing: "-1px" }}>
                Prayer Timings in {cityName}, {countryName}
              </h1>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2" style={{ letterSpacing: "-1.5px" }}>
                {date.readable}
              </h2>
              <p className="text-lg md:text-xl font-black text-white/70 tracking-widest" style={{ letterSpacing: "-0.5px" }}>
                {new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())}
              </p>
              <p className="italic text-white/60" style={{ fontFamily: "'Playfair Display',serif" }}>
                {date.hijri.day} {date.hijri.month.en} {date.hijri.year} AH
              </p>
            </div>
            <LiveClockBox timezone={meta.timezone} />
          </div>
          <div className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(201,168,76,0.06), transparent)" }} />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(201,168,76,0.08)", filter: "blur(50px)" }} />
        </div>
      </section>

      <PrayerCardsLive
        mainPrayers={mainPrayers}
        extraTimings={extraTimings}
        timezone={meta.timezone}
      />

      {/* --- START OF NEW SUHOOR & IFTAR CARDS --- */}
      <section className="max-w-4xl mx-auto px-4 pb-8 w-full">
        {/* Changed from flex-col to flex-col md:flex-row to allow side-by-side on desktop */}
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Suhoor Card - Added w-full so they share equal space */}
          <div 
            className="w-full flex items-center justify-between p-5 md:p-6 rounded-2xl transition-all hover:scale-[1.01]" 
            style={{ background: "rgba(10,61,46,0.85)", border: "1px solid rgba(201,168,76,0.25)", backdropFilter: "blur(16px)" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full shrink-0" style={{ background: "rgba(201,168,76,0.15)" }}>
                <span className="text-2xl">🌙</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white tracking-tight">Suhoor Time</h3>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50 mt-1">Ends at Imsak</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl md:text-3xl font-black text-yellow-400">{timings.Imsak}</div>
            </div>
          </div>

          {/* Iftar Card - Added w-full so they share equal space */}
          <div 
            className="w-full flex items-center justify-between p-5 md:p-6 rounded-2xl transition-all hover:scale-[1.01]" 
            style={{ background: "rgba(10,61,46,0.85)", border: "1px solid rgba(201,168,76,0.25)", backdropFilter: "blur(16px)" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full shrink-0" style={{ background: "rgba(201,168,76,0.15)" }}>
                <span className="text-2xl">🍽️</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white tracking-tight">Iftar Time</h3>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50 mt-1">Starts at Maghrib</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl md:text-3xl font-black text-yellow-400">{timings.Maghrib}</div>
            </div>
          </div>
          
        </div>
      </section>
      {/* --- END OF NEW SUHOOR & IFTAR CARDS --- */}

      <section className="max-w-4xl mx-auto px-4 pb-8 w-full">
        <div className="p-5 rounded-2xl bg-white/90 flex items-center gap-4">
          <div className="text-2xl">ℹ️</div>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: "#0a3d2e" }}>Calculation Method</div>
            <div className="text-xs text-gray-500">{meta.method.name}</div>
          </div>
          <div className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white" style={{ background: "#0a3d2e" }}>
            Verified ✓
          </div>
        </div>
      </section>

      {monthData && (
        <section className="max-w-4xl mx-auto px-4 pt-12 pb-8 w-full">
          <div className="bg-white/10 border border-white/20 rounded-3xl overflow-hidden backdrop-blur-md" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="p-6 border-b border-white/20" style={{ background: "rgba(255,255,255,0.04)" }}>
              <h3 className="text-xl font-bold text-white">30 Days {cityName} Prayer Calendar</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-white">
                <thead className="text-white/80 font-bold uppercase text-[10px] tracking-widest" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-4 py-4">Fajr</th>
                    <th className="px-4 py-4">Sunrise</th>
                    <th className="px-4 py-4">Dhuhr</th>
                    <th className="px-4 py-4">Asr</th>
                    <th className="px-4 py-4">Maghrib</th>
                    <th className="px-4 py-4">Isha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {monthData.map((day, idx) => {
                    const now = new Date();
                    // Generate a real Date object for this specific row's day
                    const rowDate = new Date(now.getFullYear(), now.getMonth(), idx + 1);
                    const isToday = idx + 1 === now.getDate();

                    // Calculate Hijri for this specific row
                    const hijriDay = new Intl.DateTimeFormat('en-US-u-ca-islamic', { day: 'numeric' }).format(rowDate);
                    const hijriMonth = new Intl.DateTimeFormat('en-US-u-ca-islamic', { month: 'short' }).format(rowDate);

                    return (
                      <tr 
                        key={idx} 
                        className="transition-colors"
                        style={{ backgroundColor: isToday ? "rgba(10,61,46,0.8)" : "transparent" }}
                      >
                        <td className={`px-6 py-4 whitespace-nowrap ${isToday ? "font-bold text-white" : "text-gray-100"}`}>
                          <div>
                            {day.date.gregorian.day} {day.date.gregorian.month.en.substring(0, 3)}
                          </div>
                          {/* Appended Hijri Date Below */}
                          <div className={`text-[10px] mt-0.5 uppercase tracking-wider ${isToday ? "text-yellow-400" : "text-white/50"}`}>
                            {hijriDay} {hijriMonth}
                          </div>
                        </td>
                        <td className={`px-4 py-4 ${isToday ? "font-bold text-white" : "text-gray-100"}`}>{day.timings.Fajr}</td>
                        <td className="px-4 py-4 text-white/70">{day.timings.Sunrise}</td>
                        <td className={`px-4 py-4 ${isToday ? "font-bold text-white" : "text-gray-100"}`}>{day.timings.Dhuhr}</td>
                        <td className={`px-4 py-4 ${isToday ? "font-bold text-white" : "text-gray-100"}`}>{day.timings.Asr}</td>
                        <td className="px-4 py-4 font-bold" style={{ color: "#eab308" }}>{day.timings.Maghrib}</td>
                        <td className={`px-4 py-4 ${isToday ? "font-bold text-white" : "text-gray-100"}`}>{day.timings.Isha}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <div className="bg-white py-2">
        <ProductAds />
      </div>

      <section className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div
          className="p-8 rounded-[28px] text-white"
          style={{ background: "rgba(10,61,46,0.7)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(16px)" }}
        >
          <p className="text-white/90 leading-relaxed text-sm">
            Today's prayer times for <strong className="text-white">{cityName}</strong> are calculated using precise astronomical data. Fajr begins at <strong className="text-yellow-400">{timings.Fajr}</strong> and Isha starts at <strong className="text-yellow-400">{timings.Isha}</strong>. Calculation method: <em>{meta.method.name}</em>. Timezone: <em>{meta.timezone}</em>. Times are updated automatically.
          </p>
        </div>
      </section>

      {(() => {
        const majorCities = getMajorCities(country).filter(
          (c) => c.toLowerCase() !== cityName.toLowerCase()
        );
        return majorCities.length > 0 ? (
          <section className="max-w-4xl mx-auto px-4 pb-8 w-full">
            <div
              className="p-8 rounded-[28px]"
              style={{ background: "rgba(10,61,46,0.7)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(16px)" }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Prayer Timings in Other {countryName} Cities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {majorCities.map((otherCity) => {
                  const citySlug = otherCity.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={citySlug}
                      href={`/prayer-times/${country}/${citySlug}`}
                      className="px-4 py-3 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all hover:scale-[1.02]"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      🕌 {otherCity}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null;
      })()}

      <div className="max-w-4xl mx-auto px-4 pb-12">
        <Link
          href={`/prayer-times/${country}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors"
        >
          ← All cities in {countryName}
        </Link>
      </div>
    </div>
  );
}