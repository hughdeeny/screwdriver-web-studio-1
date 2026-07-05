import type { APIRoute } from "astro";

export const prerender = false;

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip") ?? request.headers.get("cf-connecting-ip");
}

export const GET: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);

  if (!ip || ip === "127.0.0.1" || ip.startsWith("::1")) {
    return new Response(JSON.stringify({ suburb: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const geoRes = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,city`,
    );
    const geo = await geoRes.json();

    if (geo.status !== "success" || !geo.city) {
      return new Response(JSON.stringify({ suburb: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ suburb: geo.city }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ suburb: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
