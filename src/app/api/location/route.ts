export async function GET() {
  try {
    const res = await fetch(
      "https://freeipapi.com/api/json",
      { cache: "no-store" }
    );
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}