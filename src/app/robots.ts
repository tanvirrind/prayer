import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://prayer.souqalmadina.com.pk/sitemap.xml",
  };
}
