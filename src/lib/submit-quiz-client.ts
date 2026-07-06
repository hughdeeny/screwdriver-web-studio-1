export type SubmitQuizResponse = {
  ok: boolean;
  webhook?: "sent" | "skipped" | "failed";
  ghlStatus?: number;
  error?: string;
};

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function postQuizWebhook(
  payload: Record<string, unknown>,
): Promise<SubmitQuizResponse> {
  console.log("Webhook payload:", payload);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      const data = (await response.json()) as SubmitQuizResponse;
      console.log("Webhook response:", response.status, data);

      if (response.ok && data.ok && data.webhook === "sent") {
        return data;
      }

      if (attempt < MAX_ATTEMPTS) {
        console.warn(`Webhook attempt ${attempt} unsuccessful, retrying...`);
        await wait(RETRY_DELAY_MS);
      }
    } catch (error) {
      console.error(`Webhook attempt ${attempt} failed:`, error);
      if (attempt < MAX_ATTEMPTS) {
        await wait(RETRY_DELAY_MS);
      }
    }
  }

  return {
    ok: false,
    webhook: "failed",
    error: "All webhook attempts failed",
  };
}
