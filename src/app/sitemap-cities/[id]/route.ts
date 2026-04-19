import { getCitiesBySlug } from "@/lib/cities";
import { countrySlugs } from "@/lib/countrySlugs";
import { NextRequest } from "next/server";

const BASE = "https://prayer.souqalmadina.com.pk";
const CHUNK_SIZE = 5000;

function sanitizeCitySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/'/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function getAllCityUrls() {
  const urls: { url: string; countrySlug: string }[] = [];
  for (const countrySlug of countrySlugs) {
    const cities = getCitiesBySlug(countrySlug);
    for (const city of cities) {
      urls.push({
        url: `${BASE}/${countrySlug}/${sanitizeCitySlug(city)}`,
        countrySlug,
      });
    }
  }
  return urls;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = parseInt(id);
  const allUrls = getAllCityUrls();
  const totalChunks = Math.ceil(allUrls.length / CHUNK_SIZE);

  if (isNaN(index) || index < 0 || index >= totalChunks) {
    return new Response("Not found", { status: 404 });
  }

  const slice = allUrls.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE);
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${slice.map(({ url, countrySlug }) => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${countrySlug === "pakistan" ? "0.9" : "0.7"}</priority>
    <lastmod>${today}</lastmod>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}