import { useCallback, useRef, useState } from "react";
import { SCORED_QUESTIONS, SITUATION_QUESTIONS } from "../../lib/quiz-questions";
import { buildSubmission } from "../../lib/result-generator";
import type { ContactDetails, QuizAnswers, QuizResults } from "../../lib/quiz-types";
import ResultsSection from "./ResultsSection";

const EMPTY_ANSWERS: QuizAnswers = {
  q1: null, q2: null, q3: null, q4: null, q5: null,
  q6: null, q7: null, q8: null, q9: null, q10: null,
  q11: null, q12: null, q13: null, q14: null, q15: null,
};

const STEP_LABELS = ["Your business", "Reputation health", "Your goals"];

type Phase = "contact" | "scored" | "situation" | "results";

interface QuizFormProps {
  onComplete?: () => void;
}

export default function QuizForm({ onComplete }: QuizFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("contact");
  const [scoredIndex, setScoredIndex] = useState(0);
  const [situationIndex, setSituationIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [contact, setContact] = useState<ContactDetails>({
    firstName: "",
    businessName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const [results, setResults] = useState<QuizResults | null>(null);

  const scrollToContainer = useCallback(() => {
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const getStepNumber = (): number => {
    if (phase === "contact") return 1;
    if (phase === "scored") return 2;
    return 3;
  };

  const getProgress = (): number => {
    if (phase === "contact") return 5;
    if (phase === "scored") return 10 + ((scoredIndex + 1) / SCORED_QUESTIONS.length) * 55;
    if (phase === "situation") return 65 + ((situationIndex + 1) / SITUATION_QUESTIONS.length) * 30;
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
    contact.businessName.trim() &&
    contact.email.trim() &&
    contact.phone.trim() &&
    contact.location.trim();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isContactValid()) return;
    setPhase("scored");
    setScoredIndex(0);
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
    } else {
      setPhase("contact");
      scrollToContainer();
    }
  };

  const handleSituationNext = async () => {
    const current = SITUATION_QUESTIONS[situationIndex];
    if (answers[current.id] === null) return;

    if (situationIndex < SITUATION_QUESTIONS.length - 1) {
      setSituationIndex((i) => i + 1);
      scrollToContainer();
    } else {
      await submitQuiz();
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
    setResults(submission.results);
    setPhase("results");
    onComplete?.();
    scrollToContainer();

    try {
      await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: contact.firstName,
          businessName: contact.businessName,
          email: contact.email,
          phone: contact.phone,
          location: contact.location,
          answers: submission.answerLabels,
          totalScore: submission.results.scores.total,
          trustScore: submission.results.scores.trustPercent,
          visibilityScore: submission.results.scores.visibilityPercent,
          conversionScore: submission.results.scores.conversionPercent,
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
            Tell us about your business so we can personalise your results.
          </p>
          {(
            [
              { id: "firstName", label: "First name", type: "text", placeholder: "John" },
              { id: "businessName", label: "Business name", type: "text", placeholder: "Smith Plumbing" },
              { id: "email", label: "Email", type: "email", placeholder: "john@smithplumbing.com" },
              { id: "phone", label: "Phone", type: "tel", placeholder: "0400 000 000" },
              { id: "location", label: "Location / service area", type: "text", placeholder: "Melbourne's eastern suburbs" },
            ] as const
          ).map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="mb-1.5 block text-sm font-semibold text-navy">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                required
                value={contact[field.id]}
                onChange={(e) => updateContact(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-border bg-page px-4 py-3.5 text-navy outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={!isContactValid()}
            className="mt-4 w-full rounded-xl bg-accent px-6 py-4 text-lg font-bold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue To Reputation Check
          </button>
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
            <button
              type="button"
              onClick={handleScoredBack}
              className="rounded-xl border border-border px-6 py-3.5 font-semibold text-muted transition hover:bg-page"
            >
              Back
            </button>
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
              disabled={answers[currentSituation.id] === null || submitting}
              className="flex-1 rounded-xl bg-accent px-6 py-3.5 font-bold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {situationIndex === SITUATION_QUESTIONS.length - 1
                ? submitting
                  ? "Calculating..."
                  : "See My Results"
                : "Continue"}
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
  return (
    <section id="quiz" className="bg-page py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
            Get Your Free Reputation Health Score
          </h2>
          <p className="mt-3 text-center text-muted">
            Answer a few quick questions and get immediate recommendations for
            improving your online reputation.
          </p>
          <div className="mt-8">
            <QuizForm onComplete={onComplete} />
          </div>
        </div>
      </div>
    </section>
  );
}
