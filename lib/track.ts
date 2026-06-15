/**
 * Placeholder analytics — swap for GA4 / Plausible / etc. when ready.
 */
export function trackEvent(name: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.log("Tracking event:", name, data);
}
