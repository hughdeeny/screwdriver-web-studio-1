"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/track";

const inputClass =
  "w-full rounded-xl border border-[var(--border)] bg-bg-deep/80 px-4 py-3 text-cream placeholder:text-muted outline-none ring-signal/40 transition focus-visible:ring-2 min-h-[48px]";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();
    const help = String(data.get("help") ?? "").trim();

    if (!name || !business || !email || !phone || !help) {
      setStatus("Please fill in all required fields (name, business, email, phone, and what you need help with).");
      return;
    }

    trackEvent("form_submit", { form: "website_audit" });

    const subject = encodeURIComponent(`Website audit request — ${business}`);
    const body = encodeURIComponent(
      `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website || "(not provided)"}\n\nWhat they need help with:\n${help}`,
    );
    window.location.href = `mailto:hello@screwdrivermarketing.com.au?subject=${subject}&body=${body}`;
    setStatus(null);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate id="audit">
      <h3 className="font-display text-xl font-bold text-cream">Request my website audit</h3>
      <p className="text-sm text-muted">
        Tell us a bit about your business. We&apos;ll reply with plain-English notes on what to tighten
        first — no obligation.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-name" className="mb-1.5 block text-sm font-medium text-cream">
            Your name <span className="text-accent">*</span>
          </label>
          <input
            id="audit-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="audit-business" className="mb-1.5 block text-sm font-medium text-cream">
            Business name <span className="text-accent">*</span>
          </label>
          <input
            id="audit-business"
            name="business"
            type="text"
            required
            autoComplete="organization"
            placeholder="Smith Plumbing"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-email" className="mb-1.5 block text-sm font-medium text-cream">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="audit-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourbusiness.com.au"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="audit-phone" className="mb-1.5 block text-sm font-medium text-cream">
            Phone <span className="text-accent">*</span>
          </label>
          <input
            id="audit-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="04xx xxx xxx"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="audit-website" className="mb-1.5 block text-sm font-medium text-cream">
          Website URL <span className="text-muted">(optional)</span>
        </label>
        <input
          id="audit-website"
          name="website"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="audit-help" className="mb-1.5 block text-sm font-medium text-cream">
          What do you want help with? <span className="text-accent">*</span>
        </label>
        <textarea
          id="audit-help"
          name="help"
          rows={4}
          required
          placeholder="e.g. More quote calls from Google, clearer services on mobile, not sure if our site is costing us leads..."
          className={`${inputClass} min-h-[120px] resize-y py-3`}
        />
      </div>

      {status ? (
        <p className="text-sm text-accent" role="alert">
          {status}
        </p>
      ) : null}

      <p className="text-xs text-muted">
        Opens your email with everything filled in. We usually reply within one business day.
      </p>

      <button
        type="submit"
        className="w-full min-h-[52px] rounded-full bg-gradient-to-r from-accent to-accent-glow px-6 text-base font-bold text-bg-deep shadow-lg shadow-accent/25 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
      >
        Request my website audit
      </button>
    </form>
  );
}
