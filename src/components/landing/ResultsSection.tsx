import ScoreGauge from "./ScoreGauge";
import type { QuizResults } from "../../lib/quiz-types";

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
          Congratulations — your results are ready.
        </p>
        <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
          Your Reputation Health Score: {scores.total}/100
        </h2>
        <p className="mt-2 text-lg font-medium text-muted">{results.scoreCategory}</p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
        <ScoreGauge score={scores.total} label="Overall" color="var(--accent)" size="lg" />
        <div className="flex gap-6 sm:gap-8">
          <ScoreGauge
            score={scores.trustPercent}
            label="Trust"
            color="var(--trust)"
          />
          <ScoreGauge
            score={scores.visibilityPercent}
            label="Visibility"
            color="var(--visibility)"
          />
          <ScoreGauge
            score={scores.conversionPercent}
            label="Conversion"
            color="var(--conversion)"
          />
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 p-6">
        <h3 className="font-bold text-navy">Your biggest opportunity</h3>
        <p className="mt-2 leading-relaxed text-muted">{results.biggestOpportunityCopy}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-page p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent-green">
            What is working
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {results.whatIsWorking}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-page p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent">
            What is holding you back
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {results.whatIsHoldingBack}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-page p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-trust">
            Fastest next step
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {results.fastestNextStep}
          </p>
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
