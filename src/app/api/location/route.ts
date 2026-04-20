export async function GET(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const rawIP = forwarded ? forwarded.split(",")[0].trim() : "";

    const isLocalIP =
      !rawIP ||
      rawIP === "::1" ||
      rawIP === "127.0.0.1" ||
      rawIP.startsWith("192.168.") ||
      rawIP.startsWith("10.") ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(rawIP);

    const ip = isLocalIP ? "" : rawIP;

    const providers = [
      () => fetchIPAPI(ip),
      () => fetchIPWhoIs(ip),
      () => fetchIPInfo(ip),
    ];

    for (const provider of providers) {
      try {
        const result = await provider();
        if (result) return Response.json(result);
      } catch {
        continue;
      }
    }

    return Response.json({ error: "All providers failed" }, { status: 500 });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

async function fetchIPAPI(ip: string) {
  const url = ip ? `http://ip-api.com/json/${ip}` : `http://ip-api.com/json/`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  if (data.status !== "success") return null;
  // Return country only — city will be resolved client-side
  return { country: data.country, countryCode: data.countryCode };
}

async function fetchIPWhoIs(ip: string) {
  const url = ip ? `https://ipwho.is/${ip}` : `https://ipwho.is/`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  if (!data.success) return null;
  return { country: data.country, countryCode: data.country_code };
}

async function fetchIPInfo(ip: string) {
  const url = ip ? `https://ipinfo.io/${ip}/json` : `https://ipinfo.io/json`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  if (!data.country) return null;

  let countryName = data.country;
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    countryName = regionNames.of(data.country) || data.country;
  } catch (error) {
    // Fallback to the country code if the mapping fails
  }

  return { country: countryName, countryCode: data.country };
}