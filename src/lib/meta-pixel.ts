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

export const META_STORAGE_KEYS = {
  viewContent: "meta_viewcontent",
  quizStarted: "meta_quiz_started",
  section2Complete: "meta_section2_complete",
} as const;
