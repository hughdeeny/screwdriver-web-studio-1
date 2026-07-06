import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const webhookUrl = import.meta.env.GHL_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("GHL_WEBHOOK_URL is not set — quiz webhook skipped");
      return new Response(
        JSON.stringify({
          ok: false,
          webhook: "skipped",
          error: "GHL webhook URL not configured",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } },
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GHL webhook failed:", response.status, errorText);
      return new Response(
        JSON.stringify({
          ok: false,
          webhook: "failed",
          ghlStatus: response.status,
          error: "GHL webhook rejected the payload",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    console.log("GHL webhook sent successfully:", response.status);

    return new Response(
      JSON.stringify({ ok: true, webhook: "sent", ghlStatus: response.status }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Quiz submission error:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        webhook: "failed",
        error: "Server error while sending webhook",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
