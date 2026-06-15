"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    if (!name || !email || !details) {
      setStatus("Please fill in every field so we can get back to you.");
      return;
    }

    const subject = encodeURIComponent(`New enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nWhat we'd love to know more about:\n${details}`,
    );
    window.location.href = `mailto:hello@screwdriverwebstudio.com.au?subject=${subject}&body=${body}`;
    setStatus(null);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className="w-full rounded-xl border border-[var(--border)] bg-bg-deep/80 px-4 py-3 text-cream placeholder:text-muted outline-none ring-signal/40 transition focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email we can reply to"
          className="w-full rounded-xl border border-[var(--border)] bg-bg-deep/80 px-4 py-3 text-cream placeholder:text-muted outline-none ring-signal/40 transition focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="details" className="sr-only">
          Project details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          required
          placeholder="What does your business do, what would you like the site to achieve, and when are you hoping to go live? (Rough spend is fine if you have one in mind.)"
          className="w-full resize-none rounded-xl border border-[var(--border)] bg-bg-deep/80 px-4 py-3 text-cream placeholder:text-muted outline-none ring-signal/40 transition focus:ring-2"
        />
      </div>
      {status ? <p className="text-sm text-accent">{status}</p> : null}
      <p className="text-xs text-muted">
        Opens your email with everything filled in. We usually reply within one business day — sooner
        when things are quiet.
      </p>
      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-accent to-accent-glow py-4 text-base font-bold text-bg-deep shadow-lg shadow-accent/25 transition hover:brightness-110"
      >
        Send it to Screwdriver Web Studio
      </button>
    </form>
  );
}
