import { SCORED_QUESTIONS, SITUATION_QUESTIONS } from "./quiz-questions";
import {
  calculateScores,
  getBiggestOpportunityCopy,
  getLowestCategory,
  getScoreCategory,
} from "./quiz-scoring";
import type { Category, QuizAnswers, QuizResults, QuizSubmission } from "./quiz-types";

function getAnswerLabel(
  questionId: keyof QuizAnswers,
  index: number | null
): string {
  if (index === null) return "";

  const scored = SCORED_QUESTIONS.find((q) => q.id === questionId);
  if (scored) return scored.options[index]?.label ?? "";

  const situation = SITUATION_QUESTIONS.find((q) => q.id === questionId);
  if (situation) return situation.options[index]?.label ?? "";

  return "";
}

function getStrongestCategory(scores: ReturnType<typeof calculateScores>): Category {
  const categories: { name: Category; percent: number }[] = [
    { name: "Trust", percent: scores.trustPercent },
    { name: "Visibility", percent: scores.visibilityPercent },
    { name: "Conversion", percent: scores.conversionPercent },
  ];
  return categories.reduce((best, current) =>
    current.percent > best.percent ? current : best
  ).name;
}

function generateWhatIsWorking(
  scores: ReturnType<typeof calculateScores>,
  answers: QuizAnswers
): string {
  const strongest = getStrongestCategory(scores);
  const parts: string[] = [];

  if (scores.total >= 60) {
    parts.push("You already have some reputation habits in place.");
  }

  if (strongest === "Trust" && scores.trustPercent >= 50) {
    parts.push(
      "Your review replies and customer-facing responses help build confidence before people call."
    );
  } else if (strongest === "Visibility" && scores.visibilityPercent >= 50) {
    parts.push(
      "You are starting to turn customer feedback into visible proof online."
    );
  } else if (strongest === "Conversion" && scores.conversionPercent >= 50) {
    parts.push(
      "You have elements of a review collection process that can be strengthened with automation."
    );
  }

  const situation = getAnswerLabel("q11", answers.q11);
  if (situation.includes("word-of-mouth")) {
    parts.push(
      "Word-of-mouth is clearly working for your business — that is a strong foundation to build on."
    );
  }

  if (parts.length === 0) {
    parts.push(
      "You are taking the right first step by reviewing how your reputation system works today."
    );
  }

  return parts.join(" ");
}

function generateWhatIsHoldingBack(
  lowest: Category,
  answers: QuizAnswers
): string {
  const parts: string[] = [];

  if (lowest === "Trust") {
    parts.push(
      "Inconsistent review replies or missing responses may be making your business look less responsive than it really is."
    );
  } else if (lowest === "Visibility") {
    parts.push(
      "Positive customer experiences may not be showing up as fresh reviews and social proof where new customers compare you."
    );
  } else {
    parts.push(
      "Happy customers may not be converting into Google reviews and follow-up enquiries reliably enough."
    );
  }

  const barrier = getAnswerLabel("q14", answers.q14);
  if (barrier.includes("Forgetting")) {
    parts.push("Forgetting to ask is a common issue — and exactly what automation solves.");
  } else if (barrier.includes("say they will")) {
    parts.push(
      "Customers often intend to leave a review but need a simple reminder at the right time."
    );
  } else if (barrier.includes("Too busy")) {
    parts.push(
      "When you are busy on jobs, manual follow-up is usually the first thing that gets dropped."
    );
  } else if (barrier.includes("No clear process")) {
    parts.push("Without a clear process, review collection depends on whoever remembers on the day.");
  }

  const situation = getAnswerLabel("q11", answers.q11);
  if (situation.includes("Competitors")) {
    parts.push(
      "Competitors with stronger review activity can close the trust gap even when your work is better."
    );
  }

  return parts.join(" ");
}

function generateFastestNextStep(answers: QuizAnswers, lowest: Category): string {
  const base =
    "Run a review reactivation campaign using past customers, then set up automated SMS/email review requests for future jobs.";

  const outcome = getAnswerLabel("q12", answers.q12);
  const help = getAnswerLabel("q15", answers.q15);

  const extras: string[] = [];

  if (outcome.includes("Less manual follow-up")) {
    extras.push("Prioritise automation so the system keeps running when you are on site.");
  }
  if (outcome.includes("More calls from Google")) {
    extras.push("Focus on fresh reviews and professional replies to improve call-through from your profile.");
  }
  if (outcome.includes("Looking more trusted")) {
    extras.push("Reactivate past happy customers first to close the trust gap quickly.");
  }
  if (lowest === "Trust") {
    extras.push("Set up consistent, professional review replies alongside new review requests.");
  }
  if (lowest === "Visibility") {
    extras.push("Turn new positive reviews into simple Facebook and Instagram posts automatically.");
  }

  if (help.includes("Set it up for me")) {
    return `${base} We can handle setup for you — claim your free setup to get started.`;
  }
  if (help.includes("understand the opportunity")) {
    return `${base} Book a quick review call if you would like to walk through what this looks like for your business.`;
  }

  if (extras.length > 0) {
    return `${base} ${extras[0]}`;
  }

  return base;
}

function generateRecommendedSolution(answers: QuizAnswers): string {
  const help = getAnswerLabel("q15", answers.q15);

  if (help.includes("Set it up for me")) {
    return "Based on your results, we recommend claiming your free setup so we can install automated review collection, professional replies, and social proof content for your business.";
  }
  if (help.includes("understand the opportunity")) {
    return "Based on your results, a short review call is the best next step to see how the system would work for your business before committing.";
  }
  return "Based on your results, the fastest way to improve your reputation health is to install a system that collects reviews consistently, replies professionally, and turns positive feedback into social proof automatically.";
}

export function generateResults(answers: QuizAnswers): QuizResults {
  const scores = calculateScores(answers);
  const biggestOpportunity = getLowestCategory(scores);

  return {
    scores,
    scoreCategory: getScoreCategory(scores.total),
    biggestOpportunity,
    biggestOpportunityCopy: getBiggestOpportunityCopy(biggestOpportunity),
    whatIsWorking: generateWhatIsWorking(scores, answers),
    whatIsHoldingBack: generateWhatIsHoldingBack(biggestOpportunity, answers),
    fastestNextStep: generateFastestNextStep(answers, biggestOpportunity),
    recommendedSolution: generateRecommendedSolution(answers),
  };
}

export function buildSubmission(
  contact: import("./quiz-types").ContactDetails,
  answers: QuizAnswers
): QuizSubmission {
  const results = generateResults(answers);

  const answerLabels: Record<string, string> = {};
  for (let i = 1; i <= 15; i++) {
    const key = `q${i}` as keyof QuizAnswers;
    answerLabels[key] = getAnswerLabel(key, answers[key]);
  }

  return {
    ...contact,
    answers,
    answerLabels,
    results,
    timestamp: new Date().toISOString(),
  };
}
