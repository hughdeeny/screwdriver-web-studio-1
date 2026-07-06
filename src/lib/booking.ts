import { trackMetaCustomEvent } from "./meta-pixel";

export const BOOKING_URL =
  "https://links.screwdrivermarketing.com.au/widget/booking/fndvYKV1tve0cVC5F2iM";

export function trackMeetingClicked(ctaLabel: string) {
  trackMetaCustomEvent("MeetingClicked", {
    content_name: "Reputation Health Check",
    content_category: "Free Audit / Enquiry",
    cta_label: ctaLabel,
  });
}
