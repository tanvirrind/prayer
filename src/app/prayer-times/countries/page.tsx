import PaginatedGrid from "@/components/PaginatedGrid";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProductAds from "@/components/ProductAds";

export const metadata: Metadata = {
  title: "Prayer Times Worldwide | Namaz Timings All Countries",
  description: "Accurate Islamic prayer times for all countries and cities worldwide. Get today's Fajr, Dhuhr, Asr, Maghrib and Isha timings for Pakistan, Saudi Arabia, UAE, UK, USA and more.",
  keywords: "prayer times, namaz timings, salah times, islamic prayer schedule, fajr time, isha time, muslim prayer",
  alternates: { canonical: "https://noor.souqalmadina.com.pk/prayer-times" },
};

const countries = [
  { slug: "pakistan", name: "Pakistan", flag: "🇵🇰", cities: 25 },
  { slug: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦", cities: 12 },
  { slug: "united-arab-emirates", name: "United Arab Emirates", flag: "🇦🇪", cities: 8 },
  { slug: "united-kingdom", name: "United Kingdom", flag: "🇬🇧", cities: 12 },
  { slug: "united-states", name: "United States", flag: "🇺🇸", cities: 12 },
  { slug: "canada", name: "Canada", flag: "🇨🇦", cities: 10 },
  { slug: "australia", name: "Australia", flag: "🇦🇺", cities: 10 },
  { slug: "turkey", name: "Turkey", flag: "🇹🇷", cities: 10 },
  { slug: "malaysia", name: "Malaysia", flag: "🇲🇾", cities: 8 },
  { slug: "indonesia", name: "Indonesia", flag: "🇮🇩", cities: 10 },
  { slug: "bangladesh", name: "Bangladesh", flag: "🇧🇩", cities: 9 },
  { slug: "egypt", name: "Egypt", flag: "🇪🇬", cities: 10 },
  { slug: "india", name: "India", flag: "🇮🇳", cities: 20 },
  { slug: "qatar", name: "Qatar", flag: "🇶🇦", cities: 8 },
  { slug: "kuwait", name: "Kuwait", flag: "🇰🇼", cities: 7 },
  { slug: "oman", name: "Oman", flag: "🇴🇲", cities: 9 },
  { slug: "bahrain", name: "Bahrain", flag: "🇧🇭", cities: 5 },
  { slug: "iraq", name: "Iraq", flag: "🇮🇶", cities: 10 },
  { slug: "jordan", name: "Jordan", flag: "🇯🇴", cities: 10 },
  { slug: "lebanon", name: "Lebanon", flag: "🇱🇧", cities: 10 },
  { slug: "syria", name: "Syria", flag: "🇸🇾", cities: 10 },
  { slug: "yemen", name: "Yemen", flag: "🇾🇪", cities: 10 },
  { slug: "libya", name: "Libya", flag: "🇱🇾", cities: 10 },
  { slug: "tunisia", name: "Tunisia", flag: "🇹🇳", cities: 10 },
  { slug: "morocco", name: "Morocco", flag: "🇲🇦", cities: 10 },
  { slug: "algeria", name: "Algeria", flag: "🇩🇿", cities: 10 },
  { slug: "afghanistan", name: "Afghanistan", flag: "🇦🇫", cities: 10 },
  { slug: "palestine", name: "Palestine", flag: "🇵🇸", cities: 10 },
  { slug: "south-africa", name: "South Africa", flag: "🇿🇦", cities: 10 },
  { slug: "namibia", name: "Namibia", flag: "🇳🇦", cities: 10 },
  { slug: "botswana", name: "Botswana", flag: "🇧🇼", cities: 10 },
  { slug: "lesotho", name: "Lesotho", flag: "🇱🇸", cities: 10 },
  { slug: "swaziland", name: "Swaziland", flag: "🇸🇿", cities: 10 },
  { slug: "kenya", name: "Kenya", flag: "🇰🇪", cities: 10 },
  { slug: "tanzania", name: "Tanzania", flag: "🇹🇿", cities: 10 },
  { slug: "uganda", name: "Uganda", flag: "🇺🇬", cities: 10 },
  { slug: "rwanda", name: "Rwanda", flag: "🇷🇼", cities: 10 },
  { slug: "burundi", name: "Burundi", flag: "🇧🇮", cities: 10 },
  { slug: "mozambique", name: "Mozambique", flag: "🇲🇿", cities: 10 },
  { slug: "zambia", name: "Zambia", flag: "🇿🇲", cities: 10 },
  { slug: "zimbabwe", name: "Zimbabwe", flag: "🇿🇼", cities: 10 },
  { slug: "angola", name: "Angola", flag: "🇦🇴", cities: 10 },
  { slug: "cameroon", name: "Cameroon", flag: "🇨🇲", cities: 10 },
  { slug: "congo", name: "Congo", flag: "🇨🇬", cities: 10 },
  { slug: "gabon", name: "Gabon", flag: "🇬🇦", cities: 10 },
  { slug: "ghana", name: "Ghana", flag: "🇬🇭", cities: 10 },
  { slug: "guinea", name: "Guinea", flag: "🇬🇳", cities: 10 },
  { slug: "guinea-bissau", name: "Guinea-Bissau", flag: "🇬🇼", cities: 10 },
  { slug: "ivory-coast", name: "Ivory Coast", flag: "🇨🇮", cities: 10 },
  { slug: "liberia", name: "Liberia", flag: "🇱🇷", cities: 10 },
  { slug: "mali", name: "Mali", flag: "🇲🇱", cities: 10 },
  { slug: "mauritania", name: "Mauritania", flag: "🇲🇷", cities: 10 },
  { slug: "mauritius", name: "Mauritius", flag: "🇲🇺", cities: 10 },
  { slug: "niger", name: "Niger", flag: "🇳🇪", cities: 10 },
  { slug: "nigeria", name: "Nigeria", flag: "🇳🇬", cities: 10 },
  { slug: "senegal", name: "Senegal", flag: "🇸🇳", cities: 10 },
  { slug: "sierra-leone", name: "Sierra Leone", flag: "🇸🇱", cities: 10 },
  { slug: "somalia", name: "Somalia", flag: "🇸🇴", cities: 10 },
  { slug: "south-sudan", name: "South Sudan", flag: "🇸🇸", cities: 10 },
  { slug: "sudan", name: "Sudan", flag: "🇸🇩", cities: 10 },
  { slug: "benin", name: "Benin", flag: "🇧🇯", cities: 5 },
  { slug: "burkina-faso", name: "Burkina Faso", flag: "🇧🇫", cities: 5 },
  { slug: "cape-verde", name: "Cape Verde", flag: "🇨🇻", cities: 5 },
  { slug: "central-african-republic", name: "Central African Republic", flag: "🇨🇫", cities: 5 },
  { slug: "chad", name: "Chad", flag: "🇹🇩", cities: 5 },
  { slug: "comoros", name: "Comoros", flag: "🇰🇲", cities: 5 },
  { slug: "democratic-republic-of-congo", name: "Democratic Republic of Congo", flag: "🇨🇩", cities: 8 },
  { slug: "djibouti", name: "Djibouti", flag: "🇩🇯", cities: 5 },
  { slug: "equatorial-guinea", name: "Equatorial Guinea", flag: "🇬🇶", cities: 5 },
  { slug: "eritrea", name: "Eritrea", flag: "🇪🇷", cities: 5 },
  { slug: "ethiopia", name: "Ethiopia", flag: "🇪🇹", cities: 8 },
  { slug: "gambia", name: "Gambia", flag: "🇬🇲", cities: 5 },
  { slug: "madagascar", name: "Madagascar", flag: "🇲🇬", cities: 5 },
  { slug: "malawi", name: "Malawi", flag: "🇲🇼", cities: 5 },
  { slug: "sao-tome-and-principe", name: "São Tomé and Príncipe", flag: "🇸🇹", cities: 3 },
  { slug: "seychelles", name: "Seychelles", flag: "🇸🇨", cities: 3 },
  { slug: "togo", name: "Togo", flag: "🇹🇬", cities: 5 },
  { slug: "armenia", name: "Armenia", flag: "🇦🇲", cities: 5 },
  { slug: "azerbaijan", name: "Azerbaijan", flag: "🇦🇿", cities: 6 },
  { slug: "brunei", name: "Brunei", flag: "🇧🇳", cities: 5 },
  { slug: "cambodia", name: "Cambodia", flag: "🇰🇭", cities: 5 },
  { slug: "china", name: "China", flag: "🇨🇳", cities: 15 },
  { slug: "georgia", name: "Georgia", flag: "🇬🇪", cities: 5 },
  { slug: "hong-kong", name: "Hong Kong", flag: "🇭🇰", cities: 5 },
  { slug: "iran", name: "Iran", flag: "🇮🇷", cities: 12 },
  { slug: "japan", name: "Japan", flag: "🇯🇵", cities: 10 },
  { slug: "kazakhstan", name: "Kazakhstan", flag: "🇰🇿", cities: 8 },
  { slug: "kyrgyzstan", name: "Kyrgyzstan", flag: "🇰🇬", cities: 5 },
  { slug: "laos", name: "Laos", flag: "🇱🇦", cities: 5 },
  { slug: "maldives", name: "Maldives", flag: "🇲🇻", cities: 5 },
  { slug: "mongolia", name: "Mongolia", flag: "🇲🇳", cities: 5 },
  { slug: "myanmar", name: "Myanmar", flag: "🇲🇲", cities: 6 },
  { slug: "nepal", name: "Nepal", flag: "🇳🇵", cities: 6 },
  { slug: "north-korea", name: "North Korea", flag: "🇰🇵", cities: 5 },
  { slug: "philippines", name: "Philippines", flag: "🇵🇭", cities: 10 },
  { slug: "singapore", name: "Singapore", flag: "🇸🇬", cities: 5 },
  { slug: "south-korea", name: "South Korea", flag: "🇰🇷", cities: 8 },
  { slug: "sri-lanka", name: "Sri Lanka", flag: "🇱🇰", cities: 6 },
  { slug: "taiwan", name: "Taiwan", flag: "🇹🇼", cities: 6 },
  { slug: "tajikistan", name: "Tajikistan", flag: "🇹🇯", cities: 5 },
  { slug: "thailand", name: "Thailand", flag: "🇹🇭", cities: 8 },
  { slug: "timor-leste", name: "Timor-Leste", flag: "🇹🇱", cities: 3 },
  { slug: "turkmenistan", name: "Turkmenistan", flag: "🇹🇲", cities: 5 },
  { slug: "uzbekistan", name: "Uzbekistan", flag: "🇺🇿", cities: 8 },
  { slug: "vietnam", name: "Vietnam", flag: "🇻🇳", cities: 8 },
  { slug: "albania", name: "Albania", flag: "🇦🇱", cities: 5 },
  { slug: "austria", name: "Austria", flag: "🇦🇹", cities: 6 },
  { slug: "belgium", name: "Belgium", flag: "🇧🇪", cities: 6 },
  { slug: "bosnia-and-herzegovina", name: "Bosnia and Herzegovina", flag: "🇧🇦", cities: 6 },
  { slug: "bulgaria", name: "Bulgaria", flag: "🇧🇬", cities: 5 },
  { slug: "croatia", name: "Croatia", flag: "🇭🇷", cities: 5 },
  { slug: "cyprus", name: "Cyprus", flag: "🇨🇾", cities: 5 },
  { slug: "czech-republic", name: "Czech Republic", flag: "🇨🇿", cities: 5 },
  { slug: "denmark", name: "Denmark", flag: "🇩🇰", cities: 5 },
  { slug: "finland", name: "Finland", flag: "🇫🇮", cities: 5 },
  { slug: "france", name: "France", flag: "🇫🇷", cities: 10 },
  { slug: "germany", name: "Germany", flag: "🇩🇪", cities: 12 },
  { slug: "greece", name: "Greece", flag: "🇬🇷", cities: 6 },
  { slug: "hungary", name: "Hungary", flag: "🇭🇺", cities: 5 },
  { slug: "ireland", name: "Ireland", flag: "🇮🇪", cities: 5 },
  { slug: "italy", name: "Italy", flag: "🇮🇹", cities: 10 },
  { slug: "kosovo", name: "Kosovo", flag: "🇽🇰", cities: 5 },
  { slug: "latvia", name: "Latvia", flag: "🇱🇻", cities: 4 },
  { slug: "lithuania", name: "Lithuania", flag: "🇱🇹", cities: 4 },
  { slug: "luxembourg", name: "Luxembourg", flag: "🇱🇺", cities: 3 },
  { slug: "malta", name: "Malta", flag: "🇲🇹", cities: 3 },
  { slug: "moldova", name: "Moldova", flag: "🇲🇩", cities: 4 },
  { slug: "montenegro", name: "Montenegro", flag: "🇲🇪", cities: 4 },
  { slug: "netherlands", name: "Netherlands", flag: "🇳🇱", cities: 8 },
  { slug: "north-macedonia", name: "North Macedonia", flag: "🇲🇰", cities: 5 },
  { slug: "norway", name: "Norway", flag: "🇳🇴", cities: 5 },
  { slug: "poland", name: "Poland", flag: "🇵🇱", cities: 8 },
  { slug: "portugal", name: "Portugal", flag: "🇵🇹", cities: 5 },
  { slug: "romania", name: "Romania", flag: "🇷🇴", cities: 6 },
  { slug: "russia", name: "Russia", flag: "🇷🇺", cities: 12 },
  { slug: "serbia", name: "Serbia", flag: "🇷🇸", cities: 5 },
  { slug: "slovakia", name: "Slovakia", flag: "🇸🇰", cities: 4 },
  { slug: "slovenia", name: "Slovenia", flag: "🇸🇮", cities: 4 },
  { slug: "spain", name: "Spain", flag: "🇪🇸", cities: 10 },
  { slug: "sweden", name: "Sweden", flag: "🇸🇪", cities: 6 },
  { slug: "switzerland", name: "Switzerland", flag: "🇨🇭", cities: 6 },
  { slug: "ukraine", name: "Ukraine", flag: "🇺🇦", cities: 8 },
  { slug: "argentina", name: "Argentina", flag: "🇦🇷", cities: 8 },
  { slug: "bolivia", name: "Bolivia", flag: "🇧🇴", cities: 5 },
  { slug: "brazil", name: "Brazil", flag: "🇧🇷", cities: 10 },
  { slug: "chile", name: "Chile", flag: "🇨🇱", cities: 6 },
  { slug: "colombia", name: "Colombia", flag: "🇨🇴", cities: 8 },
  { slug: "costa-rica", name: "Costa Rica", flag: "🇨🇷", cities: 5 },
  { slug: "cuba", name: "Cuba", flag: "🇨🇺", cities: 5 },
  { slug: "dominican-republic", name: "Dominican Republic", flag: "🇩🇴", cities: 5 },
  { slug: "ecuador", name: "Ecuador", flag: "🇪🇨", cities: 5 },
  { slug: "el-salvador", name: "El Salvador", flag: "🇸🇻", cities: 5 },
  { slug: "guatemala", name: "Guatemala", flag: "🇬🇹", cities: 5 },
  { slug: "guyana", name: "Guyana", flag: "🇬🇾", cities: 4 },
  { slug: "haiti", name: "Haiti", flag: "🇭🇹", cities: 4 },
  { slug: "honduras", name: "Honduras", flag: "🇭🇳", cities: 5 },
  { slug: "jamaica", name: "Jamaica", flag: "🇯🇲", cities: 4 },
  { slug: "mexico", name: "Mexico", flag: "🇲🇽", cities: 10 },
  { slug: "nicaragua", name: "Nicaragua", flag: "🇳🇮", cities: 5 },
  { slug: "panama", name: "Panama", flag: "🇵🇦", cities: 5 },
  { slug: "paraguay", name: "Paraguay", flag: "🇵🇾", cities: 5 },
  { slug: "peru", name: "Peru", flag: "🇵🇪", cities: 6 },
  { slug: "suriname", name: "Suriname", flag: "🇸🇷", cities: 4 },
  { slug: "trinidad-and-tobago", name: "Trinidad and Tobago", flag: "🇹🇹", cities: 4 },
  { slug: "uruguay", name: "Uruguay", flag: "🇺🇾", cities: 5 },
  { slug: "venezuela", name: "Venezuela", flag: "🇻🇪", cities: 6 },
  { slug: "fiji", name: "Fiji", flag: "🇫🇯", cities: 4 },
  { slug: "new-zealand", name: "New Zealand", flag: "🇳🇿", cities: 6 },
  { slug: "papua-new-guinea", name: "Papua New Guinea", flag: "🇵🇬", cities: 4 },
  { slug: "solomon-islands", name: "Solomon Islands", flag: "🇸🇧", cities: 3 },
  { slug: "vanuatu", name: "Vanuatu", flag: "🇻🇺", cities: 3 },
];

const countryGroups = [
  {
    region: "Middle East", icon: "🕌",
    countries: countries.filter(c => ["saudi-arabia","united-arab-emirates","qatar","kuwait","oman","bahrain","iraq","jordan","lebanon","syria","yemen","palestine","iran"].includes(c.slug)),
  },
  {
    region: "South Asia", icon: "🌏",
    countries: countries.filter(c => ["pakistan","india","bangladesh","afghanistan","sri-lanka","nepal","maldives","bhutan"].includes(c.slug)),
  },
  {
    region: "Southeast Asia", icon: "🌴",
    countries: countries.filter(c => ["indonesia","malaysia","philippines","thailand","vietnam","myanmar","cambodia","laos","singapore","brunei","timor-leste"].includes(c.slug)),
  },
  {
    region: "East & Central Asia", icon: "🏔️",
    countries: countries.filter(c => ["china","japan","south-korea","north-korea","mongolia","taiwan","hong-kong","kazakhstan","uzbekistan","tajikistan","kyrgyzstan","turkmenistan","azerbaijan","georgia","armenia"].includes(c.slug)),
  },
  {
    region: "North Africa", icon: "🏜️",
    countries: countries.filter(c => ["egypt","morocco","algeria","tunisia","libya","sudan","south-sudan","mauritania"].includes(c.slug)),
  },
  {
    region: "West Africa", icon: "🌍",
    countries: countries.filter(c => ["nigeria","ghana","senegal","mali","niger","guinea","ivory-coast","burkina-faso","benin","togo","sierra-leone","liberia","gambia","guinea-bissau","cape-verde","mauritius"].includes(c.slug)),
  },
  {
    region: "East Africa", icon: "🦁",
    countries: countries.filter(c => ["kenya","tanzania","ethiopia","uganda","somalia","rwanda","burundi","mozambique","madagascar","djibouti","eritrea","comoros","seychelles"].includes(c.slug)),
  },
  {
    region: "Central & Southern Africa", icon: "🌿",
    countries: countries.filter(c => ["south-africa","angola","zambia","zimbabwe","namibia","botswana","congo","democratic-republic-of-congo","cameroon","gabon","chad","central-african-republic","equatorial-guinea","sao-tome-and-principe","lesotho","swaziland","malawi"].includes(c.slug)),
  },
  {
    region: "Europe", icon: "🏛️",
    countries: countries.filter(c => ["united-kingdom","germany","france","italy","spain","netherlands","belgium","sweden","norway","denmark","finland","poland","russia","ukraine","turkey","austria","switzerland","portugal","greece","czech-republic","hungary","romania","bulgaria","serbia","croatia","bosnia-and-herzegovina","albania","kosovo","north-macedonia","montenegro","slovenia","slovakia","latvia","lithuania","luxembourg","malta","moldova","cyprus","ireland","georgia","armenia","azerbaijan"].includes(c.slug)),
  },
  {
    region: "North America", icon: "🗽",
    countries: countries.filter(c => ["united-states","canada","mexico","cuba","dominican-republic","jamaica","haiti","trinidad-and-tobago","costa-rica","panama","guatemala","honduras","el-salvador","nicaragua"].includes(c.slug)),
  },
  {
    region: "South America", icon: "🌎",
    countries: countries.filter(c => ["brazil","argentina","colombia","chile","peru","venezuela","ecuador","bolivia","paraguay","uruguay","guyana","suriname"].includes(c.slug)),
  },
  {
    region: "Oceania", icon: "🐨",
    countries: countries.filter(c => ["australia","new-zealand","fiji","papua-new-guinea","solomon-islands","vanuatu"].includes(c.slug)),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-14 pb-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🕌</div>
          <h1
            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-3"
            style={{ letterSpacing: "-2px" }}
          >
            Prayer Times
            <br />
            <span
              className="italic font-light"
              style={{ fontFamily: "'Playfair Display',serif", color: "#c9a84c" }}
            >
              Worldwide
            </span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-lg mx-auto mb-8">
            Accurate Prayer timings for {countries.length} countries and hundreds of cities.
            Updated daily.
          </p>

          {/* ── Global search bar ── */}
          <GlobalSearch countries={countries} />
        </div>
      </section>

      {/* Countries Grid — search is handled globally, so hideSearch=true */}
      <main className="max-w-4xl mx-auto px-4 pb-14 w-full flex-1">
        <div className="space-y-10">
          {countryGroups.map((group) => (
            <div key={group.region}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{group.icon}</span>
                <h2 className="text-lg font-black text-white uppercase tracking-widest">
                  {group.region}
                </h2>
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.25)" }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#c9a84c" }}>
                  {group.countries.length} countries
                </span>
              </div>

              <PaginatedGrid
                type="countries"
                items={group.countries}
                perPage={24}
                hideSearch
              />
            </div>
          ))}
        </div>

        {/* SEO text */}
        <article className="mt-12 p-8 bg-white/90 rounded-3xl">
          <h2 className="text-2xl font-black mb-4" style={{ color: "#0a3d2e" }}>
            Accurate Islamic Prayer Times Worldwide
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Find precise Prayer timings for any city in the world. Whether you are in Pakistan,
            Saudi Arabia, the UAE, or anywhere else, our platform provides daily updated Fajr,
            Dhuhr, Asr, Maghrib and Isha prayer times based on trusted astronomical calculations.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our prayer times are sourced from the globally trusted Aladhan API, used by millions
            of Muslims worldwide. Select your country above to find accurate timings for your city.
          </p>
        </article>
      </main>

      <div className="bg-white py-2">
        <ProductAds />
      </div>
    </div>
  );
}

// ── Inline client component for the global search ────────────────────────────
// (kept in this file so page.tsx stays self-contained; Next.js supports
//  mixing server/client boundaries via a leaf "use client" component)

import GlobalSearch from "@/components/GlobalSearch";