export async function GET(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIP = forwarded ? forwarded.split(",")[0].trim() : "";

    const res = await fetch(
      `https://freeipapi.com/api/json/${realIP}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}