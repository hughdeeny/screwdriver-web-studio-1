import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const webhookUrl = import.meta.env.GHL_WEBHOOK_URL;

    if (!webhookUrl) {
      return new Response(JSON.stringify({ ok: true, webhook: "skipped" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("GHL webhook failed:", response.status, await response.text());
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return new Response(JSON.stringify({ ok: true, webhook: "failed" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
