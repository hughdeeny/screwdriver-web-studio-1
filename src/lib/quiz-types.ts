export interface ContactDetails {
  firstName: string;
  businessName: string;
  email: string;
  phone: string;
  role: string;
}

export type Category = "Trust" | "Visibility" | "Revenue";

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
  q15: string | null;
}

export interface QuizScores {
  total: number;
  trust: number;
  visibility: number;
  revenue: number;
  trustPercent: number;
  visibilityPercent: number;
  revenuePercent: number;
}

export interface AnalysisPoint {
  title: string;
  body: string;
}

export interface QuizResults {
  scores: QuizScores;
  scoreCategory: string;
  lowestPillar: Category;
  strongestPillar: Category;
  resultIntro: string;
  analysisPoints: AnalysisPoint[];
  nextSteps: string[];
  recommendedSolution: string;
  recommendedCTA: string;
  leadType: string;
}

export interface QuizSubmission extends ContactDetails {
  answers: QuizAnswers;
  answerLabels: Record<string, string>;
  results: QuizResults;
  timestamp: string;
}
