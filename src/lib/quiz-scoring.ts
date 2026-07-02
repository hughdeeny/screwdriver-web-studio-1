import type { Category, QuizAnswers, QuizScores } from "./quiz-types";

const TRUST_QUESTIONS: (keyof QuizAnswers)[] = ["q3", "q5", "q6", "q7"];
const VISIBILITY_QUESTIONS: (keyof QuizAnswers)[] = ["q8", "q9"];
const CONVERSION_QUESTIONS: (keyof QuizAnswers)[] = ["q1", "q2", "q4", "q10"];

function sumQuestions(answers: QuizAnswers, keys: (keyof QuizAnswers)[]): number {
  return keys.reduce((sum, key) => sum + (answers[key] ?? 0), 0);
}

function toPercent(score: number, max: number): number {
  return Math.round((score / max) * 100);
}

export function calculateScores(answers: QuizAnswers): QuizScores {
  const trust = sumQuestions(answers, TRUST_QUESTIONS);
  const visibility = sumQuestions(answers, VISIBILITY_QUESTIONS);
  const conversion = sumQuestions(answers, CONVERSION_QUESTIONS);

  const scoredKeys: (keyof QuizAnswers)[] = [
    "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10",
  ];
  const total = scoredKeys.reduce((sum, key) => sum + (answers[key] ?? 0), 0);

  return {
    total,
    trust,
    visibility,
    conversion,
    trustPercent: toPercent(trust, 40),
    visibilityPercent: toPercent(visibility, 20),
    conversionPercent: toPercent(conversion, 40),
  };
}

export function getScoreCategory(total: number): string {
  if (total >= 80) return "Strong reputation system";
  if (total >= 60) return "Good foundation, but room to improve";
  if (total >= 40) return "Clear reputation growth opportunity";
  return "Weak online trust system";
}

export function getLowestCategory(scores: QuizScores): Category {
  const categories: { name: Category; percent: number }[] = [
    { name: "Trust", percent: scores.trustPercent },
    { name: "Visibility", percent: scores.visibilityPercent },
    { name: "Conversion", percent: scores.conversionPercent },
  ];

  return categories.reduce((lowest, current) =>
    current.percent < lowest.percent ? current : lowest
  ).name;
}

export function getBiggestOpportunityCopy(category: Category): string {
  const copy: Record<Category, string> = {
    Trust:
      "Your biggest opportunity is Trust. Your business may do great work, but your online presence may not be giving customers enough confidence before they contact you.",
    Visibility:
      "Your biggest opportunity is Visibility. You may have happy customers, but your reputation may not be creating enough fresh, visible proof online.",
    Conversion:
      "Your biggest opportunity is Conversion. Your profile may be getting attention, but you may not have a strong enough system to turn happy customers into reviews and enquiries.",
  };
  return copy[category];
}
