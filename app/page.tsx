import { ContactForm } from "./components/ContactForm";

const services = [
  {
    title: "Web design",
    tag: "Blueprint",
    description:
      "We cut through the fluff and give you a site that tells your story clearly — looks sharp on phones, reads well, and nudges people toward a call, booking, or sale.",
    highlights: [
      "Easy for anyone to use — no guesswork",
      "Looks great on a phone and on a desk",
      "Words that sound like you, not a robot",
    ],
  },
  {
    title: "Hosting & care",
    tag: "Always on",
    description:
      "We keep your site online, looked after, and quietly updated in the background — so you’re not troubleshooting at 9pm after a long day on the tools.",
    highlights: [
      "Stays up when customers go looking",
      "Looked after so odd surprises are rare",
      "Real people when you need a hand",
    ],
  },
  {
    title: "AI integrations",
    tag: "Smart layer",
    description:
      "Friendly helpers that answer common questions, capture leads, and save your team from repeating the same spiel — helpful for customers, not a gimmick.",
    highlights: [
      "Answers the repeat questions for you",
      "Hands off to a real person when it matters",
      "Keeps your site feeling quick and light",
    ],
  },
  {
    title: "Marketing support",
    tag: "Amplify",
    description:
      "When you want more people to find you, remember you, or come back: search-friendly foundations, emails that get opened, and launch plans that match your site.",
    highlights: [
      "Show up when locals search for what you do online",
      "Launch plans you can actually follow",
      "Simple numbers so you know what’s working",
    ],
  },
];

const stats = [
  { value: "Adelaide", label: "Local team that speaks your language" },
  { value: "Always on", label: "Your shop window open while you’re off the clock" },
  { value: "Peace of mind", label: "We handle the fiddly bits behind the scenes" },
];

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <div
        className="pointer-events-none fixed -left-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px] animate-float-orb"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-signal/15 blur-[100px] animate-float-orb-delayed"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-dim/10 blur-[140px]"
        aria-hidden
      />

      <header className="relative z-10 border-b border-[var(--border)] bg-bg-deep/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <a href="#" className="group flex items-center gap-2">
            <span
              className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-glow text-lg font-extrabold text-bg-deep shadow-lg shadow-accent/25 transition group-hover:scale-105"
              aria-hidden
            >
              S
            </span>
            <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
              Screwdriver <span className="text-accent">Web Studio</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex xl:gap-8">
            <a href="#services" className="transition hover:text-cream" title="What we can do for you">
              Services
            </a>
            <a href="#ai" className="transition hover:text-cream" title="Helpful assistants for your site">
              Smart help
            </a>
            <a href="#process" className="transition hover:text-cream" title="How we work with you">
              Process
            </a>
            <a href="#contact" className="transition hover:text-cream" title="Say hello">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-bg-deep transition hover:bg-white sm:inline-block"
            >
              Book a call
            </a>

            <details className="relative lg:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[var(--border)] bg-bg-elevated px-4 py-2 text-sm font-medium text-cream">
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Menu
              </summary>
              <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-2xl border border-[var(--border)] bg-bg-elevated p-2 shadow-2xl">
                <a href="#services" className="block rounded-xl px-4 py-3 text-sm hover:bg-white/5">
                  Services
                </a>
                <a href="#ai" className="block rounded-xl px-4 py-3 text-sm hover:bg-white/5">
                  Smart help
                </a>
                <a href="#process" className="block rounded-xl px-4 py-3 text-sm hover:bg-white/5">
                  Process
                </a>
                <a
                  href="#contact"
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-accent hover:bg-white/5"
                >
                  Contact
                </a>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main>
        <section className="relative z-10 px-5 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="hero-animate flex max-w-4xl flex-col gap-6">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-bg-elevated/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_#38bdf8]" />
                Adelaide · Websites · Care · Helpful extras
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Websites built{" "}
                <span className="gradient-text animate-shimmer bg-gradient-to-r from-cream via-accent-glow to-signal">
                  tight
                </span>
                — so visitors turn into enquiries.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                Screwdriver Web Studio helps South Australian businesses look the part online and win more
                conversations — clear websites, reliable care so nothing falls over, and smart helpers
                that save your team time. Want a nudge on marketing too? We do that as well.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-glow px-8 py-4 text-base font-bold text-bg-deep shadow-xl shadow-accent/30 transition hover:brightness-110"
                >
                  Talk about your project
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-8 py-4 text-base font-semibold text-cream transition hover:border-signal/40 hover:bg-white/5"
                >
                  See what we offer
                </a>
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-4 border-t border-[var(--border)] pt-10 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label} className="glass rounded-2xl px-5 py-4">
                    <dt className="font-display text-2xl font-bold text-cream sm:text-3xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-[var(--border)] bg-bg-elevated/50 py-10">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              For South Aussie businesses that want more customers — not more jargon
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-muted/80">
              {[
                "Retail & hospitality",
                "Professional services",
                "Creators & startups",
              ].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-signal" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Everything you need online —{" "}
                <span className="text-accent">without the fluff.</span>
              </h2>
              <p className="mt-4 text-lg text-muted">
                Start with one piece or the full build — we stay with you as more people find you and
                your plans grow.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {services.map((svc, i) => (
                <article
                  key={svc.title}
                  className={`glass group relative overflow-hidden rounded-3xl p-8 transition hover:border-signal/20 ${
                    i === 0 ? "md:col-span-2 md:flex md:gap-10" : ""
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition group-hover:opacity-100 ${
                      i === 2 ? "bg-signal/20 opacity-60" : "bg-accent/15 opacity-40"
                    }`}
                    aria-hidden
                  />
                  <div className={i === 0 ? "relative md:max-w-md" : "relative"}>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                      {svc.tag}
                    </span>
                    <h3 className="font-display mt-2 text-2xl font-bold sm:text-3xl">{svc.title}</h3>
                    <p className="mt-3 text-muted leading-relaxed">{svc.description}</p>
                  </div>
                  <ul
                    className={`relative mt-6 space-y-2 text-sm ${i === 0 ? "md:mt-0 md:flex-1 md:self-end" : ""}`}
                  >
                    {svc.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-cream/90">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal">
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="ai"
          className="relative z-10 scroll-mt-24 border-y border-[var(--border)] bg-gradient-to-b from-bg-elevated/80 to-bg-deep px-5 py-24 sm:px-6"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Smart help that runs{" "}
                <span className="text-signal">in the background</span> — not all over your brand.
              </h2>
              <p className="mt-5 text-lg text-muted leading-relaxed">
                We set up helpers that answer common questions, capture leads, and free your staff from
                repeating the same answers — so every visit feels easy, not overwhelming.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Sounds like your business — not a stranger",
                  "Passes people to you when it&apos;s time for a real conversation",
                  "Keeps the experience quick — no clunky add-ons in the way",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-cream/90">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-accent to-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-accent/60" />
                    <span className="h-3 w-3 rounded-full bg-muted/40" />
                    <span className="h-3 w-3 rounded-full bg-signal/60" />
                  </div>
                  <span className="text-xs font-medium text-muted">Example chat · your business, your words</span>
                </div>
                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3 text-muted">
                    Quick one — after we go live, do you stick around or do we get left on read?
                  </div>
                  <div className="rounded-2xl rounded-tr-sm border border-signal/20 bg-signal/10 px-4 py-3 text-cream">
                    We stay involved: we keep your site online, store safe copies, and give it the odd
                    tune-up so it keeps looking sharp — not forgotten in a drawer. Want the simple
                    version of what that includes?
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3 text-muted">
                    Perfect. Let&apos;s book a call before the week fills up.
                  </div>
                </div>
                <p className="mt-6 text-center text-xs text-muted">
                  Example only — we shape this around how you actually talk to customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">
              From first chat to launch —{" "}
              <span className="text-muted">clear steps, no surprises.</span>
            </h2>
            <ol className="mt-16 grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Brief",
                  body: "Who you serve, what you sell, and what a win looks like — more calls, bookings, or sales.",
                },
                {
                  step: "02",
                  title: "Shape",
                  body: "Look, feel, and layout that guide people straight to the action you want.",
                },
                {
                  step: "03",
                  title: "Build",
                  body: "We build it properly, help you show up when people search for what you do, and walk you through the basics in plain English.",
                },
                {
                  step: "04",
                  title: "Grow",
                  body: "Keep it running smoothly, add smart helpers if you like, and market in bursts when you&apos;re ready.",
                },
              ].map((p) => (
                <li key={p.step} className="relative glass rounded-2xl p-6">
                  <span className="font-display text-4xl font-extrabold text-accent/40">{p.step}</span>
                  <h3 className="font-display mt-3 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="relative z-10 px-5 pb-24 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <blockquote className="font-display text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl">
              &ldquo;Our new site pulls serious enquiries, and the helper answers the repeat questions
              so we can focus on real customers. Straightforward team, solid result.&rdquo;
            </blockquote>
            <footer className="mt-8 text-sm text-muted">
              — A satisfied client <span className="text-signal">·</span> Adelaide metro
            </footer>
          </div>
        </section>

        <section id="contact" className="relative z-10 scroll-mt-8 px-5 pb-24 sm:px-6">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-accent/20 via-bg-elevated to-signal-dim/20 p-px">
            <div className="rounded-[2rem] bg-bg-deep/95 px-6 py-14 sm:px-12 sm:py-16">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                    Ready to tighten up your online presence?
                  </h2>
                  <p className="mt-4 text-lg text-muted">
                    Tell us what you sell, who it&apos;s for, and what you want visitors to do. We&apos;ll
                    reply with straight talk — if we&apos;re not the right fit, we&apos;ll say so.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-cream/80">
                    <li className="flex items-center gap-2">
                      <span className="text-signal">✓</span> Free 20-minute chat — no pressure
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-signal">✓</span> You&apos;ll know what you&apos;re getting,
                      when, and what it costs — before you spend a dollar
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-signal">✓</span> Plain English — no corporate waffle
                    </li>
                  </ul>
                </div>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--border)] px-5 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold">
              Screwdriver <span className="text-accent">Web Studio</span>
            </span>
          </div>
          <p className="text-center text-sm text-muted sm:text-right">
            © {new Date().getFullYear()} Screwdriver Web Studio — Adelaide, Australia.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Websites, online care, smart helpers &amp; marketing support.
          </p>
        </div>
      </footer>
    </div>
  );
}
