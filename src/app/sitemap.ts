import type { MetadataRoute } from "next";
import { countrySlugs } from "@/lib/countrySlugs";

const BASE = "https://prayer.souqalmadina.com.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/countries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tasbih`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/qibla`, changeFrequency: "monthly", priority: 0.5 },
  ];

  for (const countrySlug of countrySlugs) {
    urls.push({
      url: `${BASE}/${countrySlug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return urls;
}