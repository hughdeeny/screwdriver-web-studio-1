import type { Category, QuizAnswers, QuizScores } from "./quiz-types";

const TRUST_QUESTIONS: (keyof QuizAnswers)[] = ["q3", "q5", "q7"];
const VISIBILITY_QUESTIONS: (keyof QuizAnswers)[] = ["q8", "q9"];
const REVENUE_QUESTIONS: (keyof QuizAnswers)[] = ["q1", "q2", "q4", "q6", "q10"];

function sumQuestions(answers: QuizAnswers, keys: (keyof QuizAnswers)[]): number {
  return keys.reduce((sum, key) => {
    const value = answers[key];
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
}

function toPercent(score: number, max: number): number {
  return Math.round((score / max) * 100);
}

export function calculateScores(answers: QuizAnswers): QuizScores {
  const trust = sumQuestions(answers, TRUST_QUESTIONS);
  const visibility = sumQuestions(answers, VISIBILITY_QUESTIONS);
  const revenue = sumQuestions(answers, REVENUE_QUESTIONS);

  const scoredKeys = [
    "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10",
  ] as const;
  const total = scoredKeys.reduce((sum, key) => sum + (answers[key] ?? 0), 0);

  return {
    total,
    trust,
    visibility,
    revenue,
    trustPercent: toPercent(trust, 30),
    visibilityPercent: toPercent(visibility, 20),
    revenuePercent: toPercent(revenue, 50),
  };
}

export function getScoreCategory(total: number): string {
  if (total >= 80) return "Strong reputation system";
  if (total >= 60) return "Good foundation, but room to improve";
  if (total >= 40) return "Clear reputation growth opportunity";
  return "Reputation system needs attention";
}

export function getLowestCategory(scores: QuizScores): Category {
  const categories: { name: Category; percent: number }[] = [
    { name: "Trust", percent: scores.trustPercent },
    { name: "Visibility", percent: scores.visibilityPercent },
    { name: "Revenue", percent: scores.revenuePercent },
  ];

  return categories.reduce((lowest, current) =>
    current.percent < lowest.percent ? current : lowest,
  ).name;
}

export function getStrongestCategory(scores: QuizScores): Category {
  const categories: { name: Category; percent: number }[] = [
    { name: "Trust", percent: scores.trustPercent },
    { name: "Visibility", percent: scores.visibilityPercent },
    { name: "Revenue", percent: scores.revenuePercent },
  ];

  return categories.reduce((best, current) =>
    current.percent > best.percent ? current : best,
  ).name;
}
