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
    stat: "65%",
    headline: "of consumers write a review after being asked",
    description:
      "Many happy customers do not leave reviews on their own. A simple review request system helps turn real customer experiences into visible proof.",
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
      <header className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5 sm:px-8">
        <BrandLogo href="/landing" />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
          <a href="#contact" className="transition hover:text-navy">
            Contact
          </a>
        </nav>
        <a
          href="/landing/quiz"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover sm:hidden"
        >
          Start the quiz
        </a>
      </header>

      <div className="mx-auto max-w-4xl px-5 pb-16 pt-6 text-center sm:px-8 lg:pb-24 lg:pt-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Are You Ready To Stop Losing Customers To Your Competitors Online?
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted">
            Answer 15 questions so we can measure and improve your
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {pillars.map((pillar) => (
              <span
                key={pillar.label}
                className={`rounded-lg border px-5 py-2.5 text-sm font-medium ${pillar.color} ${pillar.textColor}`}
              >
                {pillar.label}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            Why Your Online Reputation Decides Who Gets The Call
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            When 71% of consumers use Google, 49% use Facebook, and 45% use AI
            tools for local business recommendations, your reviews, replies, and
            recent activity can decide whether your business feels like the
            trusted choice.
          </p>

          <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.stat}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="mt-2 text-3xl font-bold text-navy">
                  {item.stat}
                </p>
                <p className="mt-2 font-semibold leading-snug text-navy">
                  {item.headline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
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

        <div className="mx-auto mt-10 max-w-2xl">
          <a
            href="/landing/quiz"
            className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover"
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
