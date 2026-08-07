import BrandLogo from "./BrandLogo";

const pillars = [
  { label: "trust", color: "border-trust/30 bg-trust/5", textColor: "text-trust" },
  { label: "visibility", color: "border-visibility/30 bg-visibility/5", textColor: "text-visibility" },
  { label: "revenue", color: "border-conversion/30 bg-conversion/5", textColor: "text-conversion" },
];

const STATS_SOURCE = {
  label: "BrightLocal, Local Consumer Review Survey (2026)",
  url: "https://www.brightlocal.com/research/local-consumer-review-survey/",
};

const stats = [
  {
    stat: "97%",
    headline: "of consumers read reviews for local businesses",
    description:
      "Reviews are now part of the normal buying process. If your profile has too few reviews, old reviews, or looks unmanaged, customers may lose trust before they ever call.",
  },
  {
    stat: "71%",
    headline: "of consumers use Google, 49% Facebook, and 45% AI for local recommendations",
    description:
      "So your reviews, replies, and recent activity can decide whether your business feels like the trusted choice. 65% of customers leave a review when asked.",
  },
  {
    stat: "47%",
    headline: "of consumers won't use a business that has fewer than 20 reviews",
    description:
      "Review volume is a credibility threshold. If your profile looks thin compared to competitors, many customers may rule you out before they ever read a single comment.",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-page">
      <header className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-8 sm:py-5">
        <BrandLogo href="/landing" className="min-w-0 shrink" />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
          <a href="#contact" className="transition hover:text-navy">
            Contact
          </a>
        </nav>
        <a
          href="/landing/quiz"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-none bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover sm:hidden"
        >
          Start the quiz
        </a>
      </header>

      <div className="mx-auto max-w-4xl px-4 pb-12 pt-4 text-center sm:px-8 sm:pb-16 sm:pt-6 lg:pb-24 lg:pt-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-[1.625rem] font-bold leading-[1.2] tracking-tight text-navy sm:text-4xl sm:leading-tight lg:text-[2.75rem] lg:leading-[1.15]">
            Ready To Stop Losing Customers To Your Competitors Online?
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
            Answer 15 questions so we can measure and improve your
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {pillars.map((pillar) => (
              <span
                key={pillar.label}
                className={`rounded-lg border px-4 py-2 text-sm font-medium sm:px-5 sm:py-2.5 ${pillar.color} ${pillar.textColor}`}
              >
                {pillar.label}
              </span>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <a
              href="/landing/quiz"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-none bg-accent px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover"
            >
              Start the quiz
            </a>
            <ul className="mt-3 flex flex-col items-center gap-1 text-sm leading-relaxed text-muted">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Takes 3 minutes · Free · Immediate recommendations
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl sm:mt-12">
          <h2 className="text-xl font-bold leading-snug text-navy sm:text-3xl">
            Why Your Online Reputation Decides Who Gets The Call
          </h2>

          <div className="mt-6 grid gap-3 text-left sm:mt-8 sm:grid-cols-3 sm:gap-4">
            {stats.map((item) => (
              <div
                key={item.stat}
                className="rounded-xl border border-border bg-card p-4 sm:p-5"
              >
                <p className="text-2xl font-bold text-navy sm:mt-2 sm:text-3xl">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-navy sm:text-base">
                  {item.headline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-muted">
            Source:{" "}
            <a
              href={STATS_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-2 transition hover:text-navy"
            >
              {STATS_SOURCE.label}
            </a>
          </p>
        </div>

        <div className="mx-auto mt-8 hidden max-w-2xl sm:mt-10 sm:block">
          <p className="mb-4 text-lg font-semibold text-navy sm:text-xl">
            Start your free digital reputation audit
          </p>
          <a
            href="/landing/quiz"
            className="inline-flex min-h-12 items-center justify-center rounded-none bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover"
          >
            Start the quiz
          </a>

          <ul className="mt-3 flex flex-col items-center gap-1.5 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Takes 3 minutes.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Completely free.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Immediate recommendations.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
