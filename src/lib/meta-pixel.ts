declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

type MetaParams = Record<string, string | number | boolean | undefined | null>;

function cleanParams(params: MetaParams = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  );
}

export const META_STORAGE_KEYS = {
  viewContent: "meta_viewcontent",
  quizStarted: "meta_quiz_started",
  sandbox: "meta_sandbox",
} as const;

/** Persist sandbox mode from the URL for the tab session. Does not affect any pixel events. */
export function captureMetaSandboxMode(): void {
  if (typeof window === "undefined") return;

  const fromUrl = new URLSearchParams(window.location.search).get("sandbox") === "true";
  if (!fromUrl) return;

  try {
    sessionStorage.setItem(META_STORAGE_KEYS.sandbox, "1");
  } catch {
    /* sessionStorage unavailable */
  }

  console.log("Sandbox mode active");
}

function isMetaLeadSandbox(): boolean {
  if (typeof window === "undefined") return false;

  const fromUrl = new URLSearchParams(window.location.search).get("sandbox") === "true";
  if (fromUrl) return true;

  try {
    return sessionStorage.getItem(META_STORAGE_KEYS.sandbox) === "1";
  } catch {
    return false;
  }
}

export function trackMetaLeadEvent(params: MetaParams = {}) {
  if (isMetaLeadSandbox()) {
    console.log("Meta Lead event skipped");
    return;
  }

  trackMetaEvent("Lead", params);
  console.log("Meta Lead event fired");
}

export function trackMetaEvent(eventName: string, params: MetaParams = {}) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", eventName, cleanParams(params));
}

export function trackMetaCustomEvent(eventName: string, params: MetaParams = {}) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("trackCustom", eventName, cleanParams(params));
}

export function trackMetaEventOnce(
  storageKey: string,
  eventName: string,
  params: MetaParams = {},
) {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(storageKey)) return;
    trackMetaEvent(eventName, params);
    sessionStorage.setItem(storageKey, "1");
  } catch {
    trackMetaEvent(eventName, params);
  }
}

export function trackMetaCustomEventOnce(
  storageKey: string,
  eventName: string,
  params: MetaParams = {},
) {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(storageKey)) return;
    trackMetaCustomEvent(eventName, params);
    sessionStorage.setItem(storageKey, "1");
  } catch {
    trackMetaCustomEvent(eventName, params);
  }
}

export const META_QUIZ_CONTENT = {
  content_name: "Reputation Health Check",
  content_category: "Free Audit / Enquiry",
} as const;
