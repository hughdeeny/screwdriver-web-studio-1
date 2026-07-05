import ScoreGauge from "./ScoreGauge";
import type { QuizResults } from "../../lib/quiz-types";

const BOOKING_URL =
  "https://links.screwdrivermarketing.com.au/widget/booking/fndvYKV1tve0cVC5F2iM";

interface ResultsSectionProps {
  results: QuizResults;
  businessName: string;
}

export default function ResultsSection({ results, businessName }: ResultsSectionProps) {
  const { scores } = results;

  return (
    <div className="transition-opacity duration-500">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Your results are ready
        </p>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
          Your Reputation Health Score
        </h2>
        <p className="mt-2 text-lg font-medium text-muted">{results.scoreCategory}</p>
      </div>

      <div className="mt-10 flex justify-center">
        <ScoreGauge score={scores.total} max={100} label="Overall score" color="var(--accent)" size="lg" />
      </div>

      <p className="mt-8 text-center leading-relaxed text-muted">{results.resultIntro}</p>

      <div className="mt-10">
        <h3 className="text-lg font-bold text-navy">Your current system</h3>
        <div className="mt-4 space-y-4">
          {results.analysisPoints.map((point) => (
            <div key={point.title} className="rounded-xl border border-border bg-page p-5">
              <h4 className="font-semibold text-navy">{point.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-bold text-navy">Recommended next steps</h3>
        <ul className="mt-4 space-y-3">
          {results.nextSteps.map((step) => (
            <li
              key={step}
              className="flex gap-3 rounded-xl border border-border bg-page px-5 py-4 text-sm leading-relaxed text-muted"
            >
              <span className="mt-0.5 shrink-0 font-bold text-accent" aria-hidden="true">
                →
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 p-6">
        <h3 className="font-bold text-navy">Recommended solution</h3>
        <p className="mt-3 leading-relaxed text-muted">{results.recommendedSolution}</p>
        <div className="mt-6 text-center sm:text-left">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover"
          >
            {results.recommendedCTA}
          </a>
        </div>
      </div>

      {businessName && (
        <p className="mt-6 text-center text-sm text-muted">
          Results prepared for <strong className="text-navy">{businessName}</strong>
        </p>
      )}
    </div>
  );
}
