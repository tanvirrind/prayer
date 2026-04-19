import { getCitiesBySlug } from "@/lib/cities";
import { countrySlugs } from "@/lib/countrySlugs";

const BASE = "https://prayer.souqalmadina.com.pk";
const CHUNK_SIZE = 5000;

export async function GET() {
  let totalCities = 0;
  for (const slug of countrySlugs) {
    totalCities += getCitiesBySlug(slug).length;
  }

  const totalChunks = Math.ceil(totalCities / CHUNK_SIZE);
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
${Array.from({ length: totalChunks }, (_, i) => `  <sitemap>
    <loc>${BASE}/sitemap-cities/${i}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}