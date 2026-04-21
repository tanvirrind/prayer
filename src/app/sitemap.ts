import { MetadataRoute } from 'next';

const BASE_URL = "https://noor.souqalmadina.com.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/quran`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prayer-times`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tasbih`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/qibla`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/community`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];
}