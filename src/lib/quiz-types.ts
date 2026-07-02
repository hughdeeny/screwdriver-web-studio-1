export interface ContactDetails {
  firstName: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
}

export type Category = "Trust" | "Visibility" | "Conversion";

export interface QuizAnswers {
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number | null;
  q5: number | null;
  q6: number | null;
  q7: number | null;
  q8: number | null;
  q9: number | null;
  q10: number | null;
  q11: number | null;
  q12: number | null;
  q13: number | null;
  q14: number | null;
  q15: number | null;
}

export interface QuizScores {
  total: number;
  trust: number;
  visibility: number;
  conversion: number;
  trustPercent: number;
  visibilityPercent: number;
  conversionPercent: number;
}

export interface QuizResults {
  scores: QuizScores;
  scoreCategory: string;
  biggestOpportunity: Category;
  biggestOpportunityCopy: string;
  whatIsWorking: string;
  whatIsHoldingBack: string;
  fastestNextStep: string;
  recommendedSolution: string;
}

export interface QuizSubmission extends ContactDetails {
  answers: QuizAnswers;
  answerLabels: Record<string, string>;
  results: QuizResults;
  timestamp: string;
}
