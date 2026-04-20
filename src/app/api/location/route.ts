export async function GET() {
  try {
    const res = await fetch(
      "http://ip-api.com/json/?fields=lat,lon,city,country,timezone",
      { cache: "no-store" }
    );
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}