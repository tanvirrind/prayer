export async function getLocalMosques(lat: number, lng: number): Promise<string[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="place_of_worship"]["religion"="muslim"](around:10000,${lat},${lng});
      way["amenity"="place_of_worship"]["religion"="muslim"](around:10000,${lat},${lng});
    );
    out 10;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "PrayerTimesApp/1.0",
      },
      next: { revalidate: 2592000 },
    });

    if (!res.ok) {
      console.error("Overpass API error:", res.status);
      return [];
    }

    const data = await res.json();
    return data.elements
      .map((e: any) => e.tags?.name)
      .filter(Boolean);

  } catch (err) {
    console.error("Mosque fetch error:", err);
    return [];
  }
}