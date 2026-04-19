import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

function getCacheFilePath(countrySlug: string, citySlug: string): string {
  const cacheDir = path.join(process.cwd(), "src", "data", "city-descriptions");
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  return path.join(cacheDir, `${countrySlug}-${citySlug}.txt`);
}

export async function getCityDescription(
  cityName: string,
  countryName: string,
  countrySlug: string,
  citySlug: string
): Promise<string> {
  const cacheFile = getCacheFilePath(countrySlug, citySlug);

  // Return static version if it exists
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, "utf-8");
  }

  // Initialize Groq only when needed, avoiding errors if not configured but static file exists
  if (!process.env.GROQ_API_KEY) {
    console.warn(`GROQ_API_KEY is missing. Cannot generate description for ${cityName}.`);
    return "";
  }
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `Write a 3-paragraph SEO-optimized description about ${cityName}, ${countryName} for a prayer times website. 

Cover these topics naturally across the 3 paragraphs:
1. General overview — location, population, significance
2. Muslim community and Islamic life in the city — mosques, Islamic culture, Muslim population
3. Climate and best times to visit

Requirements:
- Tone: informative, factual, helpful
- Length: 150-200 words total
- No bullet points, no headers, just 3 clean paragraphs
- Naturally mention prayer times and Muslim community where relevant
- Do not start with the city name as the first word
- Do not use phrases like "Nestled" or "Vibrant"
- Write in plain text only, no markdown`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
      });

      const text = result.choices[0].message.content?.trim() ?? "";

      // Save statically
      fs.writeFileSync(cacheFile, text, "utf-8");

      return text;
    } catch (error: any) {
      if (error?.status === 429 && attempt < 3) {
        console.warn(`Rate limited, retrying in ${attempt * 2}s... (attempt ${attempt}/3)`);
        await new Promise((res) => setTimeout(res, attempt * 2000));
        continue;
      }
      console.error(`Failed to generate description for ${cityName}:`, error);
      return "";
    }
  }

  return "";
}