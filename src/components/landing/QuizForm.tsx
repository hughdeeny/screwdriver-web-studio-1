import { useCallback, useEffect, useRef, useState } from "react";
import { OPEN_QUESTION, SCORED_QUESTIONS, SITUATION_QUESTIONS } from "../../lib/quiz-questions";
import { buildSubmission, buildWebhookPayload, isWebhookContactValid, normalizeContact } from "../../lib/result-generator";
import { postQuizWebhook } from "../../lib/submit-quiz-client";
import {
  META_QUIZ_CONTENT,
  META_STORAGE_KEYS,
  trackMetaCustomEventOnce,
  trackMetaEvent,
} from "../../lib/meta-pixel";
import type { ContactDetails, QuizAnswers, QuizResults } from "../../lib/quiz-types";
import ResultsSection from "./ResultsSection";

const SITUATION_STEP_COUNT = SITUATION_QUESTIONS.length + 1;

const EMPTY_ANSWERS: QuizAnswers = {
  q1: null, q2: null, q3: null, q4: null, q5: null,
  q6: null, q7: null, q8: null, q9: null, q10: null,
  q11: null, q12: null, q13: null, q14: null, q15: null,
};

const STEP_LABELS = ["Reputation health", "Your goals", "Your business"];
const AUTO_ADVANCE_MS = 3000;

type Phase = "contact" | "scored" | "situation" | "results";

function QuizStepPanel({ stepKey, children }: { stepKey: string; children: React.ReactNode }) {
  return (
    <div key={stepKey} className="quiz-step-enter">
      {children}
    </div>
  );
}

interface QuizFormProps {
  onComplete?: () => void;
}

export default function QuizForm({ onComplete }: QuizFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("scored");
  const [scoredIndex, setScoredIndex] = useState(0);
  const [situationIndex, setSituationIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [contact, setContact] = useState<ContactDetails>({
    firstName: "",
    businessName: "",
    email: "",
    phone: "",
    role: "",
  });

  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const [results, setResults] = useState<QuizResults | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearAdvanceTimer(), [clearAdvanceTimer]);

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
    if (phase === "situation") return 60 + ((situationIndex + 1) / SITUATION_STEP_COUNT) * 25;
    if (phase === "contact") return 90;
    return 100;
  };

  const getQuestionStepKey = (): string => {
    if (phase === "scored") return `scored-${scoredIndex}`;
    if (phase === "situation") return `situation-${situationIndex}`;
    if (phase === "contact") return "contact";
    return "results";
  };

  const scheduleAutoAdvance = useCallback(
    (advance: () => void) => {
      clearAdvanceTimer();
      advanceTimerRef.current = window.setTimeout(() => {
        advanceTimerRef.current = null;
        advance();
      }, AUTO_ADVANCE_MS);
    },
    [clearAdvanceTimer],
  );

  const updateContact = (field: keyof ContactDetails, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const advanceScoredQuestion = useCallback(() => {
    if (scoredIndex < SCORED_QUESTIONS.length - 1) {
      setScoredIndex((i) => i + 1);
    } else {
      setPhase("situation");
      setSituationIndex(0);
    }
    scrollToContainer();
  }, [scoredIndex, scrollToContainer]);

  const advanceSituationQuestion = useCallback(() => {
    if (situationIndex < SITUATION_STEP_COUNT - 1) {
      setSituationIndex((i) => i + 1);
    } else {
      trackMetaCustomEventOnce(META_STORAGE_KEYS.section2Complete, "Section2Complete", {
        ...META_QUIZ_CONTENT,
      });
      setPhase("contact");
    }
    scrollToContainer();
  }, [situationIndex, scrollToContainer]);

  const selectAnswer = (questionId: keyof QuizAnswers, optionIndex: number, score?: number) => {
    if (score !== undefined) {
      trackMetaCustomEventOnce(META_STORAGE_KEYS.quizStarted, "QuizStarted", {
        ...META_QUIZ_CONTENT,
        question_id: questionId,
      });
    }

    setAnswers((prev) => ({
      ...prev,
      [questionId]: score !== undefined ? score : optionIndex,
    }));

    if (score !== undefined) {
      scheduleAutoAdvance(advanceScoredQuestion);
    } else if (questionId !== "q15") {
      scheduleAutoAdvance(advanceSituationQuestion);
    }
  };

  const updateOpenAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, q15: value.trim() || null }));
  };

  const collectContactFromForm = (form: HTMLFormElement): ContactDetails => {
    const data = new FormData(form);
    return normalizeContact({
      firstName: String(data.get("first_name") ?? ""),
      businessName: String(data.get("business_name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      role: String(data.get("role") ?? ""),
    });
  };

  const isContactValid = (details: ContactDetails = contact) => isWebhookContactValid(details);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    const contactData = collectContactFromForm(e.currentTarget);
    if (!isContactValid(contactData)) {
      setSubmitError("Please fill in your first name, business name, email, and phone.");
      return;
    }

    setContact(contactData);
    await submitQuiz(contactData);
  };

  const handleContactBack = () => {
    clearAdvanceTimer();
    setPhase("situation");
    setSituationIndex(SITUATION_STEP_COUNT - 1);
    scrollToContainer();
  };

  const handleScoredNext = () => {
    clearAdvanceTimer();
    const current = SCORED_QUESTIONS[scoredIndex];
    if (answers[current.id] === null) return;
    advanceScoredQuestion();
  };

  const handleScoredBack = () => {
    clearAdvanceTimer();
    if (scoredIndex > 0) {
      setScoredIndex((i) => i - 1);
      scrollToContainer();
    }
  };

  const isOnOpenQuestion = situationIndex === SITUATION_QUESTIONS.length;

  const handleSituationNext = () => {
    clearAdvanceTimer();
    if (!isOnOpenQuestion) {
      const current = SITUATION_QUESTIONS[situationIndex];
      if (answers[current.id] === null) return;
    }
    advanceSituationQuestion();
  };

  const handleSituationBack = () => {
    clearAdvanceTimer();
    if (situationIndex > 0) {
      setSituationIndex((i) => i - 1);
      scrollToContainer();
    } else {
      setPhase("scored");
      setScoredIndex(SCORED_QUESTIONS.length - 1);
      scrollToContainer();
    }
  };

  const submitQuiz = async (contactData: ContactDetails) => {
    setSubmitting(true);
    setSubmitError(null);

    if (!isWebhookContactValid(contactData)) {
      setSubmitting(false);
      setSubmitError("Please fill in your first name, business name, email, and phone.");
      return;
    }

    const submission = buildSubmission(contactData, answers);

    let suburb = "";
    try {
      const geoRes = await fetch("/api/visitor-location");
      const geo = await geoRes.json();
      suburb = geo.suburb ?? "";
    } catch {
      /* suburb detection is optional */
    }

    const payload = buildWebhookPayload(contactData, answers, suburb);
    const result = await postQuizWebhook(payload);

    if (!result.ok || result.webhook !== "sent") {
      setSubmitting(false);
      setSubmitError(
        result.webhook === "skipped"
          ? "We could not save your details — server configuration issue. Please try again shortly or contact us directly."
          : "We could not save your details. Please check your connection and tap See My Results again.",
      );
      return;
    }

    setResults(submission.results);
    setPhase("results");
    onComplete?.();
    scrollToContainer();
    trackMetaEvent("Lead", META_QUIZ_CONTENT);
    setSubmitting(false);
  };

  const currentScored = SCORED_QUESTIONS[scoredIndex];
  const currentSituation = isOnOpenQuestion ? null : SITUATION_QUESTIONS[situationIndex];

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
              className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      )}

      {phase === "contact" && (
        <QuizStepPanel stepKey={getQuestionStepKey()}>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <p className="mb-6 text-sm text-muted">
            Almost done — tell us about your business so we can personalise your results.
          </p>
          {(
            [
              { id: "firstName", name: "first_name", label: "First name", type: "text", placeholder: "John", optional: false },
              { id: "businessName", name: "business_name", label: "Business name", type: "text", placeholder: "Smith Plumbing", optional: false },
              { id: "email", name: "email", label: "Email", type: "email", placeholder: "john@smithplumbing.com", optional: false },
              { id: "phone", name: "phone", label: "Phone", type: "tel", placeholder: "0400 000 000", optional: false },
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
                name={field.name}
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
              name="role"
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
              {submitting ? "Saving your results..." : "See My Results"}
            </button>
          </div>
          {submitError && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              {submitError}
            </p>
          )}
        </form>
        </QuizStepPanel>
      )}

      {phase === "scored" && currentScored && (
        <QuizStepPanel stepKey={getQuestionStepKey()}>
        <div>
          <p className="mb-2 text-sm font-medium text-muted">
            Question {scoredIndex + 1} of {SCORED_QUESTIONS.length}
          </p>
          <h3 className="text-xl font-bold leading-snug text-navy sm:text-2xl">
            {currentScored.question}
          </h3>
          <div className="mt-6 space-y-3">
            {currentScored.options.map((option) => {
              const selected = answers[currentScored.id] === option.score;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => selectAnswer(currentScored.id, 0, option.score)}
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
        </QuizStepPanel>
      )}

      {phase === "situation" && isOnOpenQuestion && (
        <QuizStepPanel stepKey={getQuestionStepKey()}>
        <div>
          <p className="mb-2 text-sm font-medium text-muted">Question 15 of 15</p>
          <h3 className="text-xl font-bold leading-snug text-navy sm:text-2xl">
            {OPEN_QUESTION.question}
          </h3>
          <p className="mt-2 text-sm text-muted">Optional</p>
          <textarea
            id="q15"
            value={answers.q15 ?? ""}
            onChange={(e) => updateOpenAnswer(e.target.value)}
            placeholder={OPEN_QUESTION.placeholder}
            rows={4}
            className="mt-6 w-full rounded-xl border border-border bg-page px-4 py-3.5 text-navy outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
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
              className="flex-1 rounded-xl bg-accent px-6 py-3.5 font-bold text-white transition hover:bg-accent-hover"
            >
              Continue
            </button>
          </div>
        </div>
        </QuizStepPanel>
      )}

      {phase === "situation" && currentSituation && (
        <QuizStepPanel stepKey={getQuestionStepKey()}>
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
        </QuizStepPanel>
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
