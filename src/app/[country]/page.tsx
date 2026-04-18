import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";

const countryData: Record<string, { name: string; flag: string; cities: string[] }> = {
  pakistan: {
    name: "Pakistan", flag: "🇵🇰",
    cities: ["Karachi","Lahore","Islamabad","Faisalabad","Multan","Peshawar","Quetta","Rawalpindi","Sialkot","Gujranwala","Hyderabad","Sukkur","Bahawalpur","Sargodha","Dera Ghazi Khan","Sheikhupura","Jhang","Gujrat","Sahiwal","Larkana","Mardan","Abbottabad","Mirpur","Nawabshah","Mingora"],
  },
  "saudi-arabia": {
    name: "Saudi Arabia", flag: "🇸🇦",
    cities: ["Mecca","Medina","Riyadh","Jeddah","Dammam","Taif","Tabuk","Abha","Khobar","Jubail","Yanbu","Najran"],
  },
  "united-arab-emirates": {
    name: "United Arab Emirates", flag: "🇦🇪",
    cities: ["Dubai","Abu Dhabi","Sharjah","Ajman","Al Ain","Ras Al Khaimah","Fujairah","Umm Al Quwain"],
  },
  "united-kingdom": {
    name: "United Kingdom", flag: "🇬🇧",
    cities: ["London","Manchester","Birmingham","Leeds","Bradford","Glasgow","Sheffield","Liverpool","Edinburgh","Coventry","Leicester","Nottingham"],
  },
  "united-states": {
    name: "United States", flag: "🇺🇸",
    cities: ["New York","Chicago","Houston","Los Angeles","Dallas","Detroit","Philadelphia","Phoenix","San Antonio","San Diego","Jacksonville","Columbus"],
  },
  canada: {
    name: "Canada", flag: "🇨🇦",
    cities: ["Toronto","Vancouver","Montreal","Calgary","Ottawa","Edmonton","Winnipeg","Hamilton","Quebec City","Brampton"],
  },
  australia: {
    name: "Australia", flag: "🇦🇺",
    cities: ["Sydney","Melbourne","Brisbane","Perth","Adelaide","Gold Coast","Canberra","Newcastle","Wollongong","Hobart"],
  },
  turkey: {
    name: "Turkey", flag: "🇹🇷",
    cities: ["Istanbul","Ankara","Izmir","Bursa","Antalya","Adana","Konya","Gaziantep","Kayseri","Mersin"],
  },
  malaysia: {
    name: "Malaysia", flag: "🇲🇾",
    cities: ["Kuala Lumpur","Penang","Johor Bahru","Kota Kinabalu","Kuching","Ipoh","Shah Alam","Petaling Jaya"],
  },
  indonesia: {
    name: "Indonesia", flag: "🇮🇩",
    cities: ["Jakarta","Surabaya","Bandung","Medan","Makassar","Semarang","Palembang","Tangerang","Bekasi","Depok"],
  },
  bangladesh: {
    name: "Bangladesh", flag: "🇧🇩",
    cities: ["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Comilla","Narayanganj","Gazipur","Mymensingh"],
  },
  egypt: {
    name: "Egypt", flag: "🇪🇬",
    cities: ["Cairo","Alexandria","Giza","Shubra El Kheima","Port Said","Suez","Luxor","Asyut","Sharm el-Sheikh","Hurghada"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const data = countryData[country];
  if (!data) return {};
  return {
    title: `Prayer Times ${data.name} | Namaz Timings All Cities`,
    description: `Accurate Islamic prayer times for all cities in ${data.name}. Get today's Fajr, Dhuhr, Asr, Maghrib and Isha timings for ${data.cities.slice(0, 5).join(", ")} and more.`,
    keywords: `prayer times ${data.name}, namaz timings ${data.name}, salah times ${data.name}, ${data.cities.slice(0, 4).map(c => `prayer times ${c}`).join(", ")}`,
    alternates: { canonical: `https://prayer.souqalmadina.com.pk/${country}` },
  };
}

export const dynamic = "force-dynamic";

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const data = countryData[country];
  if (!data) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-14 pb-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">{data.flag}</div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-3" style={{ letterSpacing: "-2px" }}>
            Prayer Times
            <br />
            <span className="italic font-light" style={{ fontFamily: "'Playfair Display',serif", color: "#c9a84c" }}>
              {data.name}
            </span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-lg mx-auto">
            Accurate Namaz timings for {data.cities.length} cities in {data.name}. Updated daily.
          </p>
        </div>
      </section>

      {/* City Grid */}
      <main className="max-w-4xl mx-auto px-4 pb-14 w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.cities.map((city) => (
            <Link
              key={city}
              href={`/${country}/${city.toLowerCase().replace(/ /g, "-")}`}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white/90 border border-white/30 hover:border-yellow-400 hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <div>
                <div className="font-bold text-base" style={{ color: "#0a3d2e" }}>
                  {city}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-0.5">
                  Namaz Timings Today
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-yellow-500 transition-colors text-xl">→</span>
            </Link>
          ))}
        </div>

        {/* SEO text */}
        <article className="mt-12 p-8 bg-white/90 rounded-3xl">
          <h2 className="text-2xl font-black mb-4" style={{ color: "#0a3d2e" }}>
            Islamic Prayer Times in {data.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Finding accurate prayer times in {data.name} is essential for Muslims who wish to perform their daily Salah on time. Our platform provides the most precise and up-to-date timings for all major cities including {data.cities.slice(0, 4).join(", ")}, and many more.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are a local resident or a traveler in {data.name}, Souq Al Madina Prayer Times ensures you never miss Fajr, Dhuhr, Asr, Maghrib or Isha. Our data is sourced from the globally trusted Aladhan API.
          </p>
        </article>
      </main>

      {/* Product Ads */}
      <div className="bg-white py-2">
        <ProductAds />
      </div>
    </div>
  );
}
