import { ContactForm } from "./components/ContactForm";
import { TrackedLink } from "./components/TrackedLink";

const STRATEGY_MAIL =
  "mailto:hello@screwdrivermarketing.com.au?subject=Free%20strategy%20call%20request";

const serviceCards = [
  {
    title: "Conversion-focused websites",
    body: "Clear services, strong trust signals, and phone, quote, and booking paths that work on mobile — so visitors know what you do and how to reach you fast.",
  },
  {
    title: "SEO landing pages",
    body: "Targeted pages for the searches that actually bring you work — written for humans first, structured so Google can understand what you offer locally.",
  },
  {
    title: "Google Business Profile support",
    body: "Keep your Profile aligned with your website: categories, services, photos, and posts — so people who find you on Maps get the same story as on your site.",
  },
  {
    title: "Lead tracking and reporting",
    body: "See which clicks and pages lead to calls, forms, and quote requests — so you stop guessing which marketing is paying off.",
  },
  {
    title: "AI tools and automations",
    body: "Less admin: draft replies, organise enquiries, nudge follow-ups, and trim repetitive questions — practical tools, not gimmicks.",
  },
  {
    title: "Website care plans",
    body: "Security updates, backups, small fixes, and content tweaks — your lead system stays online and up to date while you run the business.",
  },
];

const packages = [
  {
    name: "Starter Website",
    blurb: "For businesses that need a clean, professional site and obvious ways to get in touch.",
    outcomes: [
      "Mobile-friendly layout and fast contact paths",
      "Clear services and service areas",
      "Foundations ready for tracking when you are",
    ],
    note: "Pricing after a quick scope call — no pricing surprises.",
  },
  {
    name: "Lead System Website",
    blurb: "For businesses that want the site built around enquiries, not just a brochure.",
    outcomes: [
      "Conversion-led structure and stronger CTAs",
      "Tracking on calls, forms, quote clicks, and key pages",
      "Google Business Profile and landing page alignment where it matters",
    ],
    note: "Ideal when you want to know what actually drives leads.",
  },
  {
    name: "Care + Growth Plan",
    blurb: "For businesses that want ongoing updates, reporting, and steady improvements.",
    outcomes: [
      "Monthly care, backups, and security hygiene",
      "Light reporting on lead actions and trends",
      "Iterative tweaks to pages, offers, and tracking",
    ],
    note: "Keeps the system tightening month to month.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need a new website or can you improve my current one?",
    a: "Often we can improve what you have — clearer pages, better CTAs, tracking, and speed fixes. If the foundation is holding you back, we&apos;ll say so and map a rebuild only if it makes sense.",
  },
  {
    q: "Can you track how many leads my website creates?",
    a: "Yes. We set up tracking for phone taps, email taps, form submissions, quote or booking buttons, and thank-you page visits — then summarise what matters in plain English.",
  },
  {
    q: "Do you work with Google Business Profile?",
    a: "Yes. We help keep your Profile consistent with your website and offers, so people get one clear story whether they find you on Maps or in search.",
  },
  {
    q: "Do you run Google Ads?",
    a: "We&apos;re not a full-time ads agency. We can advise, set up basic tracking for ads traffic, and work with your ads specialist — our core work is the website, SEO pages, Google Business Profile, and lead systems.",
  },
  {
    q: "What types of businesses do you work with?",
    a: "Local service businesses: tradies, cleaners, landscapers, home services, allied health, and similar — anyone who relies on calls, quotes, bookings, and local Google.",
  },
  {
    q: "Do you offer monthly support?",
    a: "Yes, through our Care + Growth Plan — updates, fixes, reporting, and small improvements so the system keeps working after launch.",
  },
  {
    q: "How quickly can a website be built?",
    a: "Depends on size and how fast you can feed us content and approvals. A focused starter site is often weeks, not months — we&apos;ll give a realistic timeline up front.",
  },
  {
    q: "What makes this different from a normal web designer?",
    a: "We build around lead flow: how people find you, trust you, contact you, and how you see what worked. The site is one part of a simple digital system — not just a pretty homepage.",
  },
];

function LeadFlowVisual() {
  return (
    <div
      className="glass relative overflow-hidden rounded-2xl border border-[var(--border)] p-5 sm:p-6"
      aria-label="Lead flow: visitor to tracked lead"
    >
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
        Simple lead flow
      </p>
      <div className="mt-4 flex flex-col items-stretch gap-3 text-sm">
        {[
          { label: "Visitor", sub: "Finds you on Google or Maps" },
          { label: "Trust", sub: "Clear offer + proof" },
          { label: "Enquiry", sub: "Call, form, or quote tap" },
          { label: "Tracked lead", sub: "You see what worked" },
        ].map((step, i) => (
          <div key={step.label} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20 font-display text-xs font-bold text-accent">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-bg-deep/60 px-3 py-2">
              <p className="font-semibold text-cream">{step.label}</p>
              <p className="text-xs text-muted">{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <div
        className="pointer-events-none fixed -left-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[120px] animate-float-orb"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-signal/10 blur-[100px] animate-float-orb-delayed"
        aria-hidden
      />

      <header className="relative z-10 border-b border-[var(--border)] bg-bg-deep/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <a href="#top" className="group flex items-center gap-2">
            <span
              className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-glow text-lg font-extrabold text-bg-deep shadow-lg shadow-accent/20 transition group-hover:scale-105"
              aria-hidden
            >
              S
            </span>
            <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
              Screwdriver <span className="text-accent">Marketing</span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-5 text-sm font-medium text-muted lg:flex"
            aria-label="Primary"
          >
            <a href="#services" className="transition hover:text-cream">
              Services
            </a>
            <a href="#how-it-works" className="transition hover:text-cream">
              How it works
            </a>
            <a href="#packages" className="transition hover:text-cream">
              Packages
            </a>
            <a href="#faq" className="transition hover:text-cream">
              FAQ
            </a>
            <a href="#contact" className="transition hover:text-cream">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <TrackedLink
              href={STRATEGY_MAIL}
              eventName="cta_click"
              eventData={{ cta: "header_book_call" }}
              className="hidden min-h-[44px] items-center justify-center rounded-full bg-cream px-4 py-2.5 text-sm font-semibold text-bg-deep transition hover:bg-white sm:inline-flex"
            >
              Book a free strategy call
            </TrackedLink>

            <details className="relative lg:hidden">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 rounded-full border border-[var(--border)] bg-bg-elevated px-4 py-2 text-sm font-medium text-cream">
                <span className="sr-only">Open menu</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Menu
              </summary>
              <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-2xl border border-[var(--border)] bg-bg-elevated p-2 shadow-2xl">
                <a href="#services" className="block min-h-[44px] rounded-xl px-4 py-3 text-sm hover:bg-white/5">
                  Services
                </a>
                <a href="#how-it-works" className="block min-h-[44px] rounded-xl px-4 py-3 text-sm hover:bg-white/5">
                  How it works
                </a>
                <a href="#packages" className="block min-h-[44px] rounded-xl px-4 py-3 text-sm hover:bg-white/5">
                  Packages
                </a>
                <a href="#faq" className="block min-h-[44px] rounded-xl px-4 py-3 text-sm hover:bg-white/5">
                  FAQ
                </a>
                <TrackedLink
                  href="#contact"
                  eventName="cta_click"
                  eventData={{ cta: "mobile_nav_contact" }}
                  className="block min-h-[44px] rounded-xl px-4 py-3 text-sm font-semibold text-accent hover:bg-white/5"
                >
                  Contact
                </TrackedLink>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative z-10 px-5 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20" aria-labelledby="hero-heading">
          <div className="mx-auto max-w-6xl">
            <div className="hero-animate grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="flex max-w-xl flex-col gap-5 lg:max-w-none">
                <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-bg-elevated/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-signal">
                  We help you find customers · You focus on the job
                </p>
                <h1
                  id="hero-heading"
                  className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl"
                >
                  More customers,{" "}
                  <span className="gradient-text animate-shimmer bg-gradient-to-r from-cream via-accent-glow to-signal">
                    less headaches
                  </span>
                  .
                </h1>
                <p className="text-lg leading-relaxed text-muted sm:text-xl">
                  Screwdriver Marketing helps tradies, cleaners, landscapers, clinics, and local pros get
                  found online and turn visitors into calls, quotes, and bookings — so you spend less
                  time chasing leads and guessing what worked, and more time getting the job done. We
                  handle the website, SEO pages, Google Business Profile, tracking, AI helpers, and ongoing care
                  as one practical system.
                </p>
                <ul className="flex flex-col gap-2 text-sm text-cream/90 sm:text-base">
                  <li className="flex gap-2">
                    <span className="text-signal" aria-hidden>
                      ✓
                    </span>
                    We help bring the right enquiries in — you stay on the tools or with clients
                  </li>
                  <li className="flex gap-2">
                    <span className="text-signal" aria-hidden>
                      ✓
                    </span>
                    Track calls, forms, and quote clicks — so you know what creates enquiries
                  </li>
                  <li className="flex gap-2">
                    <span className="text-signal" aria-hidden>
                      ✓
                    </span>
                    Websites, SEO pages, AI helpers, Google Business Profile support, and ongoing care
                  </li>
                </ul>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <TrackedLink
                    href={STRATEGY_MAIL}
                    eventName="cta_click"
                    eventData={{ cta: "hero_book_strategy_call" }}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-glow px-8 text-base font-bold text-bg-deep shadow-lg shadow-accent/25 transition hover:brightness-110"
                  >
                    Book a free strategy call
                  </TrackedLink>
                  <TrackedLink
                    href="#audit"
                    eventName="audit_request_click"
                    eventData={{ cta: "hero_request_audit" }}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[var(--border)] px-8 text-base font-semibold text-cream transition hover:border-signal/50 hover:bg-white/5"
                  >
                    Request a website audit
                  </TrackedLink>
                </div>
                <p className="text-sm text-muted">
                  <TrackedLink
                    href="#how-it-works"
                    eventName="cta_click"
                    eventData={{ cta: "hero_see_system" }}
                    className="font-medium text-signal underline-offset-4 hover:underline"
                  >
                    See how the system works
                  </TrackedLink>{" "}
                  — or scroll for the honest problem-and-solution breakdown.
                </p>
              </div>
              <LeadFlowVisual />
            </div>
          </div>
        </section>

        {/* Who we help */}
        <section className="relative z-10 border-y border-[var(--border)] bg-bg-elevated/50 py-10" aria-label="Industries we help">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Who we work with
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
              {[
                "Tradies & builders",
                "Landscapers & gardeners",
                "Cleaners & home services",
                "Allied health clinics",
                "Local professional services",
              ].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="relative z-10 scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Most local businesses don&apos;t need more traffic first — they need to stop losing good
              leads.
            </h2>
            <p className="mt-4 text-lg text-muted">
              You&apos;re busy. If the digital side is unclear, slow, or disconnected from Google, you
              pay for it in wasted calls, confused customers, and marketing you can&apos;t trust.
            </p>
            <ul className="mt-8 space-y-3 text-cream/95">
              {[
                "The site looks dated or vague — visitors aren&apos;t sure what you actually do.",
                "Phone and quote buttons are buried, especially on mobile.",
                "Your Google Business Profile and website tell different stories.",
                "You don&apos;t know which clicks turn into real enquiries.",
                "Admin piles up: the same questions, manual follow-ups, and lost messages.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" className="relative z-10 scroll-mt-24 border-y border-[var(--border)] bg-bg-elevated/40 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              The fix is a simple system: get found, earn trust, make contact easy, then track what
              matters.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              We&apos;re not selling &quot;a beautiful website&quot; as the prize. We tighten the digital system so
              more of the right people find you, believe you, and reach out — and you can see what&apos;s
              working. That way you&apos;re not the marketing department after hours; you&apos;re free
              to focus on getting the job done.
            </p>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { step: "1", title: "Get found", text: "Your site, landing pages, and Google Business Profile aligned for local search." },
                { step: "2", title: "Build trust", text: "Clear services, proof, and a professional first impression." },
                { step: "3", title: "Make contact easy", text: "Calls, forms, quotes, and bookings obvious on mobile." },
                { step: "4", title: "Track what matters", text: "Know which pages and actions create real leads." },
                { step: "5", title: "Improve over time", text: "Care, reporting, and small wins that compound." },
              ].map((s) => (
                <li key={s.title} className="glass rounded-2xl p-5">
                  <span className="font-display text-2xl font-extrabold text-accent/80">{s.step}</span>
                  <h3 className="font-display mt-2 text-lg font-bold text-cream">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative z-10 scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">What we build and fix</h2>
              <p className="mt-3 text-lg text-muted">
                Same goal for every piece: more qualified enquiries, less admin — so you can focus on
                the work, not the website.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((card) => (
                <article key={card.title} className="glass rounded-2xl border border-[var(--border)] p-6">
                  <h3 className="font-display text-lg font-bold text-cream">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="relative z-10 scroll-mt-24 border-y border-[var(--border)] px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
              Four practical steps — diagnose first, then build, track, and improve.
            </p>
            <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Diagnose",
                  body: "We review your website, Google presence, offer, CTAs, and how leads actually come in today.",
                },
                {
                  title: "Build",
                  body: "We create or improve the site, landing pages, structure, and conversion paths — mobile-first.",
                },
                {
                  title: "Track",
                  body: "We set up tracking for calls, forms, quote buttons, email taps, and other lead actions you care about.",
                },
                {
                  title: "Improve",
                  body: "Monthly support, reporting, and updates so the system keeps getting clearer and stronger.",
                },
              ].map((p, i) => (
                <li key={p.title} className="relative glass rounded-2xl p-6">
                  <span className="font-display text-3xl font-extrabold text-accent/40">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-2 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Lead tracking */}
        <section id="tracking" className="relative z-10 scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Know what&apos;s actually creating enquiries
              </h2>
              <p className="mt-4 text-lg text-muted">
                Without basic tracking, you&apos;re flying blind — you can&apos;t tell whether Google, a
                flyer, or word-of-mouth drove that job. We wire up simple, privacy-conscious event
                tracking so you can see which parts of your site earn calls and forms.
              </p>
            </div>
            <ul className="mt-8 space-y-3 text-cream/95 lg:mt-0 glass rounded-2xl border border-[var(--border)] p-6">
              <li className="font-display text-sm font-bold uppercase tracking-wide text-accent">
                Trackable actions (examples)
              </li>
              {[
                "Phone number taps",
                "Email address taps",
                "Form submissions",
                "Quote or estimate button clicks",
                "Booking button clicks",
                "Thank-you / confirmation page views",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="text-signal" aria-hidden>
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* AI */}
        <section
          id="ai-tools"
          className="relative z-10 scroll-mt-24 border-y border-[var(--border)] bg-bg-elevated/40 px-5 py-20 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:max-w-3xl">
              AI and automation — practical, not flashy
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Used well, AI means less admin, faster replies, and cleaner systems — not chatbots that
              annoy your customers.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Organise and label enquiries so nothing gets lost",
                "Draft reply starters your team can edit and send",
                "Reminders for follow-ups on quotes and callbacks",
                "Speed up quote-request workflows with structured questions",
                "Simple on-site FAQ or chat to cut repeat questions",
                "Trim repetitive admin so you stay on the tools or with clients",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[var(--border)] bg-bg-deep/50 px-4 py-3 text-sm text-cream/95">
                  <span className="text-accent" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Case study */}
        <section id="case-study" className="relative z-10 scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Example project</p>
            <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">Green Theory Turf &amp; Garden Care</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Early client project — we&apos;re careful not to overclaim results. Here&apos;s what we
              focused on together: a professional website launch, clearer service positioning, a stronger
              link between the Google Business Profile and the site, lead actions set up and ready to track,
              and a mobile-first path from search to quote request. Where Profile-driven traffic showed
              up early, we used it as one signal among others — the main win was a cleaner customer
              journey and a site that matched how they actually win work.
            </p>
            <TrackedLink
              href="#audit"
              eventName="quote_click"
              eventData={{ source: "case_study_green_theory" }}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--border)] px-6 text-sm font-semibold text-cream transition hover:border-signal/50 hover:bg-white/5"
            >
              Get more qualified enquiries
            </TrackedLink>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="relative z-10 scroll-mt-24 border-y border-[var(--border)] bg-bg-elevated/40 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">Packages</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
              Outcomes first. We&apos;ll confirm scope and pricing on a short call — no cookie-cutter
              surprises.
            </p>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {packages.map((pkg) => (
                <article
                  key={pkg.name}
                  className="flex flex-col rounded-2xl border border-[var(--border)] bg-bg-deep/60 p-6 sm:p-8"
                >
                  <h3 className="font-display text-xl font-bold text-cream">{pkg.name}</h3>
                  <p className="mt-2 text-sm text-muted">{pkg.blurb}</p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-cream/90">
                    {pkg.outcomes.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span className="text-signal" aria-hidden>
                          ✓
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-muted">{pkg.note}</p>
                  <TrackedLink
                    href="#audit"
                    eventName="quote_click"
                    eventData={{ package: pkg.name }}
                    className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-sm font-semibold text-accent transition hover:bg-accent/20"
                  >
                    Discuss this option
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative z-10 scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">FAQ</h2>
            <div className="mt-8 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-bg-elevated/30">
              {faqs.map((faq) => (
                <details key={faq.q} className="px-5 py-4 first:rounded-t-2xl last:rounded-b-2xl">
                  <summary className="cursor-pointer list-none font-semibold text-cream marker:content-[''] [&::-webkit-details-marker]:hidden">
                    {faq.q}
                  </summary>
                  <p className="mt-3 pb-1 text-sm leading-relaxed text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact + final CTA */}
        <section id="contact" className="relative z-10 scroll-mt-8 px-5 pb-24 sm:px-6" aria-labelledby="contact-heading">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-accent/15 via-bg-elevated to-signal-dim/15 p-px">
            <div className="rounded-[2rem] bg-bg-deep/95 px-6 py-12 sm:px-10 sm:py-16">
              <div className="mx-auto max-w-2xl text-center">
                <h2 id="contact-heading" className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                  Want more of the right customers finding and contacting you?
                </h2>
                <p className="mt-4 text-lg text-muted">
                  Let&apos;s look at your website, Google presence, and lead flow, then tighten the
                  simplest things first — so more of the right people reach out while you stay focused on
                  the job. No fluff, no obligation to proceed.
                </p>
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <TrackedLink
                    href={STRATEGY_MAIL}
                    eventName="cta_click"
                    eventData={{ cta: "footer_book_strategy_call" }}
                    className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-glow px-8 text-base font-bold text-bg-deep shadow-lg shadow-accent/20 transition hover:brightness-110 sm:flex-none"
                  >
                    Book a free strategy call
                  </TrackedLink>
                  <TrackedLink
                    href="#audit"
                    eventName="audit_request_click"
                    eventData={{ cta: "footer_request_audit" }}
                    className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full border border-[var(--border)] px-8 text-base font-semibold text-cream transition hover:border-signal/50 hover:bg-white/5 sm:flex-none"
                  >
                    Request a website audit
                  </TrackedLink>
                </div>
              </div>

              <div className="mx-auto mt-14 max-w-xl border-t border-[var(--border)] pt-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--border)] px-5 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="font-display text-lg font-bold">
              Screwdriver <span className="text-accent">Marketing</span>
            </span>
            <p className="mt-2 max-w-sm text-sm text-muted">
              We help you find customers and fix the digital side — so you can focus on getting the job
              done. More customers, less headaches.
            </p>
          </div>
          <div className="text-sm text-muted">
            <p className="font-medium text-cream">Get in touch</p>
            <TrackedLink
              href="mailto:hello@screwdrivermarketing.com.au"
              eventName="email_click"
              eventData={{ location: "footer" }}
              className="mt-2 block text-signal underline-offset-2 hover:underline"
            >
              hello@screwdrivermarketing.com.au
            </TrackedLink>
          </div>
          <p className="text-sm text-muted sm:text-right">
            © {new Date().getFullYear()} Screwdriver Marketing — Adelaide, Australia.
          </p>
        </div>
      </footer>
    </div>
  );
}
