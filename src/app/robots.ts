import { MetadataRoute } from 'next';

const BASE_URL = "https://noor.souqalmadina.com.pk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/prayer-times/sitemap-index`
    ],
  };
}