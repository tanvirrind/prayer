import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";
import { getMajorCities } from "@/lib/cities";
import { getCitiesBySlug } from "@/lib/cities";
import PaginatedGrid from "@/components/PaginatedGrid";

const countryData: Record<string, { name: string; flag: string }> = {
  "pakistan": { name: "Pakistan", flag: "🇵🇰" },
  "saudi-arabia": { name: "Saudi Arabia", flag: "🇸🇦" },
  "united-arab-emirates": { name: "United Arab Emirates", flag: "🇦🇪" },
  "united-kingdom": { name: "United Kingdom", flag: "🇬🇧" },
  "united-states": { name: "United States", flag: "🇺🇸" },
  "canada": { name: "Canada", flag: "🇨🇦" },
  "australia": { name: "Australia", flag: "🇦🇺" },
  "turkey": { name: "Turkey", flag: "🇹🇷" },
  "malaysia": { name: "Malaysia", flag: "🇲🇾" },
  "indonesia": { name: "Indonesia", flag: "🇮🇩" },
  "bangladesh": { name: "Bangladesh", flag: "🇧🇩" },
  "egypt": { name: "Egypt", flag: "🇪🇬" },
  "india": { name: "India", flag: "🇮🇳" },
  "qatar": { name: "Qatar", flag: "🇶🇦" },
  "kuwait": { name: "Kuwait", flag: "🇰🇼" },
  "oman": { name: "Oman", flag: "🇴🇲" },
  "bahrain": { name: "Bahrain", flag: "🇧🇭" },
  "iraq": { name: "Iraq", flag: "🇮🇶" },
  "jordan": { name: "Jordan", flag: "🇯🇴" },
  "lebanon": { name: "Lebanon", flag: "🇱🇧" },
  "syria": { name: "Syria", flag: "🇸🇾" },
  "yemen": { name: "Yemen", flag: "🇾🇪" },
  "libya": { name: "Libya", flag: "🇱🇾" },
  "tunisia": { name: "Tunisia", flag: "🇹🇳" },
  "morocco": { name: "Morocco", flag: "🇲🇦" },
  "algeria": { name: "Algeria", flag: "🇩🇿" },
  "afghanistan": { name: "Afghanistan", flag: "🇦🇫" },
  "palestine": { name: "Palestine", flag: "🇵🇸" },
  "iran": { name: "Iran", flag: "🇮🇷" },
  "israel": { name: "Israel", flag: "🇮🇱" },
  "south-africa": { name: "South Africa", flag: "🇿🇦" },
  "namibia": { name: "Namibia", flag: "🇳🇦" },
  "botswana": { name: "Botswana", flag: "🇧🇼" },
  "lesotho": { name: "Lesotho", flag: "🇱🇸" },
  "swaziland": { name: "Swaziland", flag: "🇸🇿" },
  "kenya": { name: "Kenya", flag: "🇰🇪" },
  "tanzania": { name: "Tanzania", flag: "🇹🇿" },
  "uganda": { name: "Uganda", flag: "🇺🇬" },
  "rwanda": { name: "Rwanda", flag: "🇷🇼" },
  "burundi": { name: "Burundi", flag: "🇧🇮" },
  "mozambique": { name: "Mozambique", flag: "🇲🇿" },
  "zambia": { name: "Zambia", flag: "🇿🇲" },
  "zimbabwe": { name: "Zimbabwe", flag: "🇿🇼" },
  "angola": { name: "Angola", flag: "🇦🇴" },
  "cameroon": { name: "Cameroon", flag: "🇨🇲" },
  "congo": { name: "Congo", flag: "🇨🇬" },
  "gabon": { name: "Gabon", flag: "🇬🇦" },
  "ghana": { name: "Ghana", flag: "🇬🇭" },
  "guinea": { name: "Guinea", flag: "🇬🇳" },
  "guinea-bissau": { name: "Guinea-Bissau", flag: "🇬🇼" },
  "ivory-coast": { name: "Ivory Coast", flag: "🇨🇮" },
  "liberia": { name: "Liberia", flag: "🇱🇷" },
  "mali": { name: "Mali", flag: "🇲🇱" },
  "mauritania": { name: "Mauritania", flag: "🇲🇷" },
  "mauritius": { name: "Mauritius", flag: "🇲🇺" },
  "niger": { name: "Niger", flag: "🇳🇪" },
  "nigeria": { name: "Nigeria", flag: "🇳🇬" },
  "senegal": { name: "Senegal", flag: "🇸🇳" },
  "sierra-leone": { name: "Sierra Leone", flag: "🇸🇱" },
  "somalia": { name: "Somalia", flag: "🇸🇴" },
  "south-sudan": { name: "South Sudan", flag: "🇸🇸" },
  "sudan": { name: "Sudan", flag: "🇸🇩" },
  "benin": { name: "Benin", flag: "🇧🇯" },
  "burkina-faso": { name: "Burkina Faso", flag: "🇧🇫" },
  "cape-verde": { name: "Cape Verde", flag: "🇨🇻" },
  "central-african-republic": { name: "Central African Republic", flag: "🇨🇫" },
  "chad": { name: "Chad", flag: "🇹🇩" },
  "comoros": { name: "Comoros", flag: "🇰🇲" },
  "democratic-republic-of-congo": { name: "Democratic Republic of Congo", flag: "🇨🇩" },
  "djibouti": { name: "Djibouti", flag: "🇩🇯" },
  "equatorial-guinea": { name: "Equatorial Guinea", flag: "🇬🇶" },
  "eritrea": { name: "Eritrea", flag: "🇪🇷" },
  "ethiopia": { name: "Ethiopia", flag: "🇪🇹" },
  "gambia": { name: "Gambia", flag: "🇬🇲" },
  "madagascar": { name: "Madagascar", flag: "🇲🇬" },
  "malawi": { name: "Malawi", flag: "🇲🇼" },
  "sao-tome-and-principe": { name: "São Tomé and Príncipe", flag: "🇸🇹" },
  "seychelles": { name: "Seychelles", flag: "🇸🇨" },
  "togo": { name: "Togo", flag: "🇹🇬" },
  "armenia": { name: "Armenia", flag: "🇦🇲" },
  "azerbaijan": { name: "Azerbaijan", flag: "🇦🇿" },
  "brunei": { name: "Brunei", flag: "🇧🇳" },
  "cambodia": { name: "Cambodia", flag: "🇰🇭" },
  "china": { name: "China", flag: "🇨🇳" },
  "georgia": { name: "Georgia", flag: "🇬🇪" },
  "hong-kong": { name: "Hong Kong", flag: "🇭🇰" },
  "japan": { name: "Japan", flag: "🇯🇵" },
  "kazakhstan": { name: "Kazakhstan", flag: "🇰🇿" },
  "kyrgyzstan": { name: "Kyrgyzstan", flag: "🇰🇬" },
  "laos": { name: "Laos", flag: "🇱🇦" },
  "maldives": { name: "Maldives", flag: "🇲🇻" },
  "mongolia": { name: "Mongolia", flag: "🇲🇳" },
  "myanmar": { name: "Myanmar", flag: "🇲🇲" },
  "nepal": { name: "Nepal", flag: "🇳🇵" },
  "north-korea": { name: "North Korea", flag: "🇰🇵" },
  "philippines": { name: "Philippines", flag: "🇵🇭" },
  "singapore": { name: "Singapore", flag: "🇸🇬" },
  "south-korea": { name: "South Korea", flag: "🇰🇷" },
  "sri-lanka": { name: "Sri Lanka", flag: "🇱🇰" },
  "taiwan": { name: "Taiwan", flag: "🇹🇼" },
  "tajikistan": { name: "Tajikistan", flag: "🇹🇯" },
  "thailand": { name: "Thailand", flag: "🇹🇭" },
  "timor-leste": { name: "Timor-Leste", flag: "🇹🇱" },
  "turkmenistan": { name: "Turkmenistan", flag: "🇹🇲" },
  "uzbekistan": { name: "Uzbekistan", flag: "🇺🇿" },
  "vietnam": { name: "Vietnam", flag: "🇻🇳" },
  "albania": { name: "Albania", flag: "🇦🇱" },
  "austria": { name: "Austria", flag: "🇦🇹" },
  "belgium": { name: "Belgium", flag: "🇧🇪" },
  "bosnia-and-herzegovina": { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  "bulgaria": { name: "Bulgaria", flag: "🇧🇬" },
  "croatia": { name: "Croatia", flag: "🇭🇷" },
  "cyprus": { name: "Cyprus", flag: "🇨🇾" },
  "czech-republic": { name: "Czech Republic", flag: "🇨🇿" },
  "denmark": { name: "Denmark", flag: "🇩🇰" },
  "finland": { name: "Finland", flag: "🇫🇮" },
  "france": { name: "France", flag: "🇫🇷" },
  "germany": { name: "Germany", flag: "🇩🇪" },
  "greece": { name: "Greece", flag: "🇬🇷" },
  "hungary": { name: "Hungary", flag: "🇭🇺" },
  "ireland": { name: "Ireland", flag: "🇮🇪" },
  "italy": { name: "Italy", flag: "🇮🇹" },
  "kosovo": { name: "Kosovo", flag: "🇽🇰" },
  "latvia": { name: "Latvia", flag: "🇱🇻" },
  "lithuania": { name: "Lithuania", flag: "🇱🇹" },
  "luxembourg": { name: "Luxembourg", flag: "🇱🇺" },
  "malta": { name: "Malta", flag: "🇲🇹" },
  "moldova": { name: "Moldova", flag: "🇲🇩" },
  "montenegro": { name: "Montenegro", flag: "🇲🇪" },
  "netherlands": { name: "Netherlands", flag: "🇳🇱" },
  "north-macedonia": { name: "North Macedonia", flag: "🇲🇰" },
  "norway": { name: "Norway", flag: "🇳🇴" },
  "poland": { name: "Poland", flag: "🇵🇱" },
  "portugal": { name: "Portugal", flag: "🇵🇹" },
  "romania": { name: "Romania", flag: "🇷🇴" },
  "russia": { name: "Russia", flag: "🇷🇺" },
  "serbia": { name: "Serbia", flag: "🇷🇸" },
  "slovakia": { name: "Slovakia", flag: "🇸🇰" },
  "slovenia": { name: "Slovenia", flag: "🇸🇮" },
  "spain": { name: "Spain", flag: "🇪🇸" },
  "sweden": { name: "Sweden", flag: "🇸🇪" },
  "switzerland": { name: "Switzerland", flag: "🇨🇭" },
  "ukraine": { name: "Ukraine", flag: "🇺🇦" },
  "argentina": { name: "Argentina", flag: "🇦🇷" },
  "bolivia": { name: "Bolivia", flag: "🇧🇴" },
  "brazil": { name: "Brazil", flag: "🇧🇷" },
  "chile": { name: "Chile", flag: "🇨🇱" },
  "colombia": { name: "Colombia", flag: "🇨🇴" },
  "costa-rica": { name: "Costa Rica", flag: "🇨🇷" },
  "cuba": { name: "Cuba", flag: "🇨🇺" },
  "dominican-republic": { name: "Dominican Republic", flag: "🇩🇴" },
  "ecuador": { name: "Ecuador", flag: "🇪🇨" },
  "el-salvador": { name: "El Salvador", flag: "🇸🇻" },
  "guatemala": { name: "Guatemala", flag: "🇬🇹" },
  "guyana": { name: "Guyana", flag: "🇬🇾" },
  "haiti": { name: "Haiti", flag: "🇭🇹" },
  "honduras": { name: "Honduras", flag: "🇭🇳" },
  "jamaica": { name: "Jamaica", flag: "🇯🇲" },
  "mexico": { name: "Mexico", flag: "🇲🇽" },
  "nicaragua": { name: "Nicaragua", flag: "🇳🇮" },
  "panama": { name: "Panama", flag: "🇵🇦" },
  "paraguay": { name: "Paraguay", flag: "🇵🇾" },
  "peru": { name: "Peru", flag: "🇵🇪" },
  "suriname": { name: "Suriname", flag: "🇸🇷" },
  "trinidad-and-tobago": { name: "Trinidad and Tobago", flag: "🇹🇹" },
  "uruguay": { name: "Uruguay", flag: "🇺🇾" },
  "venezuela": { name: "Venezuela", flag: "🇻🇪" },
  "fiji": { name: "Fiji", flag: "🇫🇯" },
  "new-zealand": { name: "New Zealand", flag: "🇳🇿" },
  "papua-new-guinea": { name: "Papua New Guinea", flag: "🇵🇬" },
  "solomon-islands": { name: "Solomon Islands", flag: "🇸🇧" },
  "vanuatu": { name: "Vanuatu", flag: "🇻🇺" },
};

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const data = countryData[country];
  if (!data) return {};
  const cities = getCitiesBySlug(country);
  return {
    title: `Prayer Times ${data.name} | Namaz Timings All Cities`,
    description: `Accurate Islamic prayer times for all cities in ${data.name}. Get today's Fajr, Dhuhr, Asr, Maghrib and Isha timings for ${cities.slice(0, 5).join(", ")} and more.`,
    keywords: `prayer times ${data.name}, namaz timings ${data.name}, salah times ${data.name}, ${cities.slice(0, 4).map(c => `prayer times ${c}`).join(", ")}`,
    alternates: { canonical: `https://prayer.souqalmadina.com.pk/${country}` },
  };
}

export const dynamic = "force-dynamic";

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const data = countryData[country];
  if (!data) notFound();

  const cities = getCitiesBySlug(country);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-5 text-xs text-white/45 font-bold uppercase tracking-wider flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/countries" className="hover:text-white transition-colors">Countries</Link>
        <span>/</span>
        <span className="text-white/75">{data.name}</span>
      </div>

      {/* Hero */}
      <section className="pt-10 pb-10 px-4 text-center">
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
            Accurate Namaz timings for {cities.length} cities in {data.name}. Updated daily.
          </p>
        </div>
      </section>

      {/* City Grid */}
      <main className="max-w-4xl mx-auto px-4 pb-14 w-full flex-1">
  <PaginatedGrid
    type="cities"
    items={cities.map((city) => ({
      name: city,
      href: `/${country}/${city.toLowerCase().replace(/ /g, "-")}`,
    }))}
    perPage={30}
  />

  {/* SEO Article */}
  <article className="mt-12 p-8 bg-white/90 rounded-3xl">
    <h2 className="text-2xl font-black mb-4" style={{ color: "#0a3d2e" }}>
      Islamic Prayer Times in {data.name}
    </h2>
    <p className="text-gray-600 leading-relaxed mb-4">
      Finding accurate prayer times in {data.name} is essential for Muslims who wish to perform
      their daily Salah on time. Our platform provides the most precise and up-to-date Namaz
      timings for all {cities.length} cities including {cities.slice(0, 4).join(", ")}, and many more.
    </p>
    <p className="text-gray-600 leading-relaxed">
      Whether you are a local resident or a traveler in {data.name}, our Prayer Times platform
      ensures you never miss Fajr, Dhuhr, Asr, Maghrib or Isha. Our data is sourced from the
      globally trusted Aladhan API.
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