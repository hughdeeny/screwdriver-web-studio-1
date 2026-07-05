import { useCallback, useRef, useState } from "react";
import { SCORED_QUESTIONS, SITUATION_QUESTIONS } from "../../lib/quiz-questions";
import { buildSubmission } from "../../lib/result-generator";
import type { ContactDetails, QuizAnswers, QuizResults } from "../../lib/quiz-types";
import ResultsSection from "./ResultsSection";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const EMPTY_ANSWERS: QuizAnswers = {
  q1: null, q2: null, q3: null, q4: null, q5: null,
  q6: null, q7: null, q8: null, q9: null, q10: null,
  q11: null, q12: null, q13: null, q14: null, q15: null,
};

const STEP_LABELS = ["Reputation health", "Your goals", "Your business"];

type Phase = "contact" | "scored" | "situation" | "results";

interface QuizFormProps {
  onComplete?: () => void;
}

export default function QuizForm({ onComplete }: QuizFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("scored");
  const [scoredIndex, setScoredIndex] = useState(0);
  const [situationIndex, setSituationIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [contact, setContact] = useState<ContactDetails>({
    firstName: "",
    businessName: "",
    email: "",
    phone: "",
    role: "",
  });

  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const [results, setResults] = useState<QuizResults | null>(null);

  const scrollToContainer = useCallback(() => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const getStepNumber = (): number => {
    if (phase === "scored") return 1;
    if (phase === "situation") return 2;
    return 3;
  };

  const getProgress = (): number => {
    if (phase === "scored") return 5 + ((scoredIndex + 1) / SCORED_QUESTIONS.length) * 55;
    if (phase === "situation") return 60 + ((situationIndex + 1) / SITUATION_QUESTIONS.length) * 25;
    if (phase === "contact") return 90;
    return 100;
  };

  const updateContact = (field: keyof ContactDetails, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const selectAnswer = (questionId: keyof QuizAnswers, optionIndex: number, score?: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score !== undefined ? score : optionIndex,
    }));
  };

  const isContactValid = () =>
    contact.firstName.trim() &&
    contact.email.trim() &&
    contact.phone.trim();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isContactValid()) return;
    await submitQuiz();
  };

  const handleContactBack = () => {
    setPhase("situation");
    setSituationIndex(SITUATION_QUESTIONS.length - 1);
    scrollToContainer();
  };

  const handleScoredNext = () => {
    const current = SCORED_QUESTIONS[scoredIndex];
    if (answers[current.id] === null) return;

    if (scoredIndex < SCORED_QUESTIONS.length - 1) {
      setScoredIndex((i) => i + 1);
      scrollToContainer();
    } else {
      setPhase("situation");
      setSituationIndex(0);
      scrollToContainer();
    }
  };

  const handleScoredBack = () => {
    if (scoredIndex > 0) {
      setScoredIndex((i) => i - 1);
      scrollToContainer();
    }
  };

  const handleSituationNext = () => {
    const current = SITUATION_QUESTIONS[situationIndex];
    if (answers[current.id] === null) return;

    if (situationIndex < SITUATION_QUESTIONS.length - 1) {
      setSituationIndex((i) => i + 1);
      scrollToContainer();
    } else {
      setPhase("contact");
      scrollToContainer();
    }
  };

  const handleSituationBack = () => {
    if (situationIndex > 0) {
      setSituationIndex((i) => i - 1);
      scrollToContainer();
    } else {
      setPhase("scored");
      setScoredIndex(SCORED_QUESTIONS.length - 1);
      scrollToContainer();
    }
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    const submission = buildSubmission(contact, answers);

    let suburb: string | undefined;
    try {
      const geoRes = await fetch("/api/visitor-location");
      const geo = await geoRes.json();
      suburb = geo.suburb ?? undefined;
    } catch {
      /* suburb detection is optional */
    }

    setResults(submission.results);
    setPhase("results");
    onComplete?.();
    scrollToContainer();

    // Meta Pixel: quiz completion is the funnel conversion
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: "Reputation Health Check",
        content_category: "Free Audit / Enquiry",
      });
    }

    try {
      await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contact.firstName,
          businessName: contact.businessName.trim() || undefined,
          email: contact.email,
          phone: contact.phone,
          role: contact.role.trim() || undefined,
          suburb,
          answers: submission.answerLabels,
          totalScore: submission.results.scores.total,
          trustScore: submission.results.scores.trustPercent,
          visibilityScore: submission.results.scores.visibilityPercent,
          revenueScore: submission.results.scores.conversionPercent,
          scoreCategory: submission.results.scoreCategory,
          biggestOpportunity: submission.results.biggestOpportunity,
          whatIsWorking: submission.results.whatIsWorking,
          whatIsHoldingBack: submission.results.whatIsHoldingBack,
          fastestNextStep: submission.results.fastestNextStep,
          recommendedSolution: submission.results.recommendedSolution,
          timestamp: submission.timestamp,
        }),
      });
    } catch {
      // Results still shown even if webhook fails
    } finally {
      setSubmitting(false);
    }
  };

  const currentScored = SCORED_QUESTIONS[scoredIndex];
  const currentSituation = SITUATION_QUESTIONS[situationIndex];

  return (
    <div ref={containerRef}>
      {phase !== "results" && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-medium text-muted">
            <span>
              Step {getStepNumber()} of 3: {STEP_LABELS[getStepNumber() - 1]}
            </span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      )}

      {phase === "contact" && (
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <p className="mb-6 text-sm text-muted">
            Almost done — tell us about your business so we can personalise your results.
          </p>
          {(
            [
              { id: "firstName", label: "First name", type: "text", placeholder: "John", optional: false },
              { id: "businessName", label: "Business name", type: "text", placeholder: "Smith Plumbing", optional: true },
              { id: "email", label: "Email", type: "email", placeholder: "john@smithplumbing.com", optional: false },
              { id: "phone", label: "Phone", type: "tel", placeholder: "0400 000 000", optional: false },
            ] as const
          ).map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="mb-1.5 block text-sm font-semibold text-navy">
                {field.label}
                {field.optional && (
                  <span className="font-normal text-muted"> (optional)</span>
                )}
              </label>
              <input
                id={field.id}
                type={field.type}
                required={!field.optional}
                value={contact[field.id]}
                onChange={(e) => updateContact(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-border bg-page px-4 py-3.5 text-navy outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
          ))}
          <div>
            <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-navy">
              Describe your role <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="role"
              type="text"
              value={contact.role}
              onChange={(e) => updateContact("role", e.target.value)}
              placeholder="Owner, marketing team, other, etc."
              className="w-full rounded-xl border border-border bg-page px-4 py-3.5 text-navy outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={handleContactBack}
              disabled={submitting}
              className="rounded-xl border border-border px-6 py-3.5 font-semibold text-muted transition hover:bg-page disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isContactValid() || submitting}
              className="flex-1 rounded-xl bg-accent px-6 py-4 text-lg font-bold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Calculating..." : "See My Results"}
            </button>
          </div>
        </form>
      )}

      {phase === "scored" && currentScored && (
        <div>
          <p className="mb-2 text-sm font-medium text-muted">
            Question {scoredIndex + 1} of {SCORED_QUESTIONS.length}
          </p>
          <h3 className="text-xl font-bold leading-snug text-navy sm:text-2xl">
            {currentScored.question}
          </h3>
          <div className="mt-6 space-y-3">
            {currentScored.options.map((option, i) => {
              const selected = answers[currentScored.id] === option.score;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => selectAnswer(currentScored.id, i, option.score)}
                  className={`w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition ${
                    selected
                      ? "border-accent bg-accent/5 text-navy"
                      : "border-border bg-card text-navy hover:border-accent/40 hover:bg-page"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex gap-3">
            {scoredIndex > 0 ? (
              <button
                type="button"
                onClick={handleScoredBack}
                className="rounded-xl border border-border px-6 py-3.5 font-semibold text-muted transition hover:bg-page"
              >
                Back
              </button>
            ) : (
              <div className="hidden sm:block sm:w-[88px]" aria-hidden="true" />
            )}
            <button
              type="button"
              onClick={handleScoredNext}
              disabled={answers[currentScored.id] === null}
              className="flex-1 rounded-xl bg-accent px-6 py-3.5 font-bold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {phase === "situation" && currentSituation && (
        <div>
          <p className="mb-2 text-sm font-medium text-muted">
            Question {situationIndex + 11} of 15
          </p>
          <h3 className="text-xl font-bold leading-snug text-navy sm:text-2xl">
            {currentSituation.question}
          </h3>
          <div className="mt-6 space-y-3">
            {currentSituation.options.map((option, i) => {
              const selected = answers[currentSituation.id] === i;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => selectAnswer(currentSituation.id, i)}
                  className={`w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition ${
                    selected
                      ? "border-accent bg-accent/5 text-navy"
                      : "border-border bg-card text-navy hover:border-accent/40 hover:bg-page"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={handleSituationBack}
              className="rounded-xl border border-border px-6 py-3.5 font-semibold text-muted transition hover:bg-page"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSituationNext}
              disabled={answers[currentSituation.id] === null}
              className="flex-1 rounded-xl bg-accent px-6 py-3.5 font-bold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {phase === "results" && results && (
        <ResultsSection results={results} businessName={contact.businessName} />
      )}
    </div>
  );
}

export function QuizSection({ onComplete }: { onComplete?: () => void }) {
  const [completed, setCompleted] = useState(false);

  return (
    <section id="quiz" className="bg-page py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          {!completed && (
            <>
              <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
                Get Your Free Reputation Health Score
              </h2>
              <p className="mt-3 text-center text-muted">
                Answer a few quick questions and get immediate recommendations for
                improving your online reputation.
              </p>
            </>
          )}
          <div className={completed ? "" : "mt-8"}>
            <QuizForm
              onComplete={() => {
                setCompleted(true);
                onComplete?.();
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
