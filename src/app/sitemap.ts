import { MetadataRoute } from "next";

const countries: Record<string, string[]> = {
  pakistan: ["Karachi","Lahore","Islamabad","Faisalabad","Multan","Peshawar","Quetta","Rawalpindi","Sialkot","Gujranwala","Hyderabad","Sukkur","Bahawalpur","Sargodha","Dera Ghazi Khan","Sheikhupura","Jhang","Gujrat","Sahiwal","Larkana","Mardan","Abbottabad","Mirpur","Nawabshah","Mingora"],
  "saudi-arabia": ["Mecca","Medina","Riyadh","Jeddah","Dammam","Taif","Tabuk","Abha","Khobar","Jubail","Yanbu","Najran"],
  "united-arab-emirates": ["Dubai","Abu Dhabi","Sharjah","Ajman","Al Ain","Ras Al Khaimah","Fujairah"],
  "united-kingdom": ["London","Manchester","Birmingham","Leeds","Bradford","Glasgow","Sheffield","Liverpool","Edinburgh","Coventry","Leicester"],
  "united-states": ["New York","Chicago","Houston","Los Angeles","Dallas","Detroit","Philadelphia","Phoenix"],
  canada: ["Toronto","Vancouver","Montreal","Calgary","Ottawa","Edmonton","Winnipeg"],
  australia: ["Sydney","Melbourne","Brisbane","Perth","Adelaide","Gold Coast","Canberra"],
  turkey: ["Istanbul","Ankara","Izmir","Bursa","Antalya","Adana","Konya"],
  malaysia: ["Kuala Lumpur","Penang","Johor Bahru","Kota Kinabalu","Kuching","Ipoh"],
  indonesia: ["Jakarta","Surabaya","Bandung","Medan","Makassar","Semarang"],
  bangladesh: ["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Comilla"],
  egypt: ["Cairo","Alexandria","Giza","Port Said","Luxor","Suez"],
};

const BASE = "https://prayer.souqalmadina.com.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/tasbih`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/qibla`, changeFrequency: "monthly", priority: 0.5 },
  ];

  for (const [countrySlug, cities] of Object.entries(countries)) {
    urls.push({ url: `${BASE}/${countrySlug}`, changeFrequency: "daily", priority: 0.8 });
    for (const city of cities) {
      urls.push({
        url: `${BASE}/${countrySlug}/${city.toLowerCase().replace(/ /g, "-")}`,
        changeFrequency: "daily",
        priority: countrySlug === "pakistan" ? 0.9 : 0.7,
        lastModified: new Date(),
      });
    }
  }
  return urls;
}
