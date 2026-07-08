import ScoreGauge from "./ScoreGauge";
import type { QuizResults } from "../../lib/quiz-types";
import { BOOKING_URL, trackMeetingClicked } from "../../lib/booking";

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
        <h2 className="mt-3 text-xl font-bold leading-snug text-navy sm:text-3xl">
          Your Reputation Health Score
        </h2>
        <p className="mt-2 text-base font-medium leading-relaxed text-muted sm:text-lg">{results.scoreCategory}</p>
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <ScoreGauge score={scores.total} max={100} label="Reputation Health Score" color="var(--accent)" size="lg" />
      </div>

      <p className="mt-6 text-center text-sm leading-relaxed text-muted sm:mt-8">{results.resultIntro}</p>

      <div className="mt-8 sm:mt-10">
        <h3 className="text-base font-bold text-navy sm:text-lg">Your current system</h3>
        <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
          {results.analysisPoints.map((point) => (
            <div key={point.title} className="rounded-xl border border-border bg-page p-4 sm:p-5">
              <h4 className="font-semibold text-navy">{point.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <h3 className="text-base font-bold text-navy sm:text-lg">Recommended next steps</h3>
        <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
          {results.nextSteps.map((step) => (
            <li
              key={step}
              className="flex gap-3 rounded-xl border border-border bg-page px-4 py-3.5 text-sm leading-relaxed text-muted sm:px-5 sm:py-4"
            >
              <span className="mt-0.5 shrink-0 font-bold text-accent" aria-hidden="true">
                →
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-4 sm:mt-10 sm:p-6">
        <h3 className="font-bold text-navy">Recommended solution</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{results.recommendedSolution}</p>
        <div className="mt-5 text-center sm:mt-6 sm:text-left">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMeetingClicked(results.recommendedCTA)}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover sm:w-auto sm:text-lg"
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
