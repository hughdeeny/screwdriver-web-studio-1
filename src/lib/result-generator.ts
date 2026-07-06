import { SCORED_QUESTIONS, SITUATION_QUESTIONS } from "./quiz-questions";
import {
  calculateScores,
  getLowestCategory,
  getScoreCategory,
  getStrongestCategory,
} from "./quiz-scoring";
import type {
  AnalysisPoint,
  Category,
  ContactDetails,
  QuizAnswers,
  QuizResults,
  QuizSubmission,
} from "./quiz-types";

function getSituationLabel(id: "q11" | "q12" | "q13" | "q14", index: number | null): string {
  if (index === null) return "";
  const question = SITUATION_QUESTIONS.find((q) => q.id === id);
  return question?.options[index]?.label ?? "";
}

function getScoredLabel(id: keyof QuizAnswers, score: number | null): string {
  if (score === null) return "";
  const question = SCORED_QUESTIONS.find((q) => q.id === id);
  return question?.options.find((o) => o.score === score)?.label ?? "";
}

export function buildAnswerLabels(answers: QuizAnswers): Record<string, string> {
  const labels: Record<string, string> = {};
  for (const q of SCORED_QUESTIONS) {
    labels[q.id] = getScoredLabel(q.id, answers[q.id]);
  }
  for (const q of SITUATION_QUESTIONS) {
    labels[q.id] = getSituationLabel(q.id, answers[q.id] as number | null);
  }
  labels.q15 = answers.q15?.trim() ?? "";
  return labels;
}

const Q11_APPEND: Record<string, string> = {
  "We get enough work, but our reviews don't reflect how good we are":
    "The good news is that you likely already have happy customers — the gap is getting that proof to show up online.",
  "We get enquiries, but customers often compare us with competitors first":
    "When people compare businesses, stronger reviews, better replies, and fresher proof can influence who they contact first.",
  "We are too busy to manually chase reviews or follow-ups":
    "The system needs to work even when the team is busy, not only when someone remembers.",
  "We are not sure where our enquiries are coming from":
    "Tracking calls, website visits, and enquiries from your Google profile will make it clearer what is actually working.",
};

function buildResultIntro(total: number, q11Label: string): string {
  let intro: string;
  if (total >= 80) {
    intro =
      "Your reputation system is already strong. The main opportunity is to make it more consistent, easier to track, and better connected to calls, enquiries, and booked jobs.";
  } else if (total >= 40) {
    intro =
      "You already have a decent foundation, but there are still gaps that may be costing you trust, visibility, or enquiries when customers compare you online.";
  } else {
    intro =
      "Your current review process may be too manual, inconsistent, or unclear. That can make it harder for future customers to trust you before they contact you.";
  }

  const append = Q11_APPEND[q11Label];
  if (append) {
    intro += ` ${append}`;
  }
  return intro;
}

const LOWEST_PILLAR_POINTS: Record<Category, AnalysisPoint> = {
  Trust: {
    title: "Trust may be leaking before customers contact you",
    body: "Your business may do great work, but future customers need to see enough proof, reassurance, and professional responses before they feel confident choosing you.",
  },
  Visibility: {
    title: "Your happy customers may not be visible enough",
    body: "Positive customer experiences are more valuable when they show up clearly on Google, your website, and social media. If they stay hidden, competitors can look more active and trusted.",
  },
  Revenue: {
    title: "Completed jobs may not be turning into future enquiries",
    body: "Happy customers are one of your best sources of reviews and trust. If there is no consistent follow-up process, good jobs can finish without creating any public proof.",
  },
};

const Q13_POINTS: Record<string, AnalysisPoint> = {
  "We forget to ask when things get busy": {
    title: "The process depends too much on memory",
    body: "When asking for reviews relies on someone remembering, it usually gets missed during busy periods. That means strong customer experiences can disappear without becoming reviews.",
  },
  "Customers say they will leave a review but don't": {
    title: "Happy customers often need a reminder",
    body: "Many customers intend to leave a review but forget. A simple reminder at the right time can recover reviews that would otherwise be missed.",
  },
  "We don't have a clear process": {
    title: "There is no clear review system yet",
    body: "Without a repeatable process, review collection becomes inconsistent. The business may only get reviews when someone happens to ask.",
  },
  "We don't have time to follow up manually": {
    title: "Manual follow-up is easy to drop",
    body: "When the team is busy, manual follow-up usually gets pushed aside. That is why the review process needs to run in the background.",
  },
  "We're not sure what to say": {
    title: "The message may be slowing you down",
    body: "If the team is unsure what to say, review requests can feel awkward or get delayed. Clear wording makes the process easier and more professional.",
  },
};

const Q12_POINTS: Record<string, AnalysisPoint> = {
  "Get more calls and enquiries from Google": {
    title: "Google should be treated as an enquiry channel",
    body: "The goal is not just more reviews. The goal is making your profile look active and trusted enough that more people call, click, or enquire.",
  },
  "Turn more happy customers into Google reviews": {
    title: "There may be untapped reviews in your customer base",
    body: "If you already have happy customers, the opportunity is to make it easier and more consistent for them to leave a Google review.",
  },
  "Look more trusted when customers compare us with competitors": {
    title: "Comparison matters before the first call",
    body: "Future customers often compare reviews, replies, photos, and proof before contacting a business. A stronger reputation can help you win trust earlier.",
  },
  "Save time by automating review requests and follow-ups": {
    title: "Automation could remove the manual chasing",
    body: "A simple automated process can ask at the right time, follow up when needed, and keep working while the business is busy.",
  },
  "Understand what is costing us trust, visibility, or revenue online": {
    title: "You need clearer visibility on what is working",
    body: "Without tracking and diagnosis, it is hard to know whether your Google profile, reviews, website, or follow-up process is costing you enquiries.",
  },
};

const Q11_POINTS: Record<string, AnalysisPoint> = {
  "We get enough work, but our reviews don't reflect how good we are": {
    title: "Your reputation may not reflect your real quality",
    body: "If the business already does good work, the main issue may be that enough of that proof is not showing up publicly.",
  },
  "We get enquiries, but customers often compare us with competitors first": {
    title: "Competitors may be winning the trust battle",
    body: "When customers compare options, the business with stronger visible proof can feel like the safer choice.",
  },
  "We want more consistent calls and booked jobs from Google": {
    title: "Your Google profile could work harder",
    body: "Reviews, replies, recent activity, and tracking can all help turn your Google profile into a more reliable source of calls and enquiries.",
  },
  "We are too busy to manually chase reviews or follow-ups": {
    title: "The system needs to survive busy periods",
    body: "A good review process should not stop when the business gets busy. It should keep working without adding more admin.",
  },
  "We are not sure where our enquiries are coming from": {
    title: "Attribution is currently unclear",
    body: "If you are not sure where enquiries come from, it is harder to know which parts of your online presence are producing results.",
  },
};

const STRONGEST_PILLAR_POINTS: Record<Category, AnalysisPoint> = {
  Trust: {
    title: "You already have some trust-building habits",
    body: "Some parts of your review and response process are already helping customers feel more confident. The next step is making that more consistent.",
  },
  Visibility: {
    title: "You already have some visible proof",
    body: "Some customer feedback is already being used publicly. The opportunity is to make that proof fresher, clearer, and more consistent.",
  },
  Revenue: {
    title: "You already have part of the follow-up process working",
    body: "There are signs that completed jobs are sometimes being turned into review opportunities. The next step is making that process more reliable.",
  },
};

const FALLBACK_ANALYSIS_POINTS: AnalysisPoint[] = [
  {
    title: "Reviews may not be happening consistently",
    body: "Without a repeatable process, review collection often depends on who remembers to ask and when.",
  },
  {
    title: "Your Google presence could be stronger",
    body: "Active reviews, replies, and visible proof help future customers feel confident before they call.",
  },
  {
    title: "There may be untapped proof in past jobs",
    body: "Happy customers from completed work can still be turned into reviews and online trust with the right follow-up.",
  },
];

const FALLBACK_NEXT_STEPS = [
  "Review your past customer list and identify happy customers who could be asked for a genuine review.",
  "Make your Google review link easy to access and include it in follow-up messages.",
  "Check your Google Business Profile performance so you know whether it is generating calls, website visits, and enquiries.",
];

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "to", "and", "or", "your", "you", "that", "when",
  "if", "it", "in", "on", "for", "with", "may", "not", "be", "can", "more", "have",
  "has", "this", "they", "their", "our", "we", "as", "at", "by", "from", "into",
  "before", "after", "who", "what", "how", "without", "still", "need", "needs",
]);

function keywordSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !STOP_WORDS.has(word)),
  );
}

function overlapRatio(a: string, b: string): number {
  const setA = keywordSet(a);
  const setB = keywordSet(b);
  if (setA.size === 0 || setB.size === 0) return 0;

  let overlap = 0;
  for (const word of setA) {
    if (setB.has(word)) overlap++;
  }
  return overlap / Math.min(setA.size, setB.size);
}

function isNearDuplicateText(text: string, existing: string[], threshold = 0.45): boolean {
  return existing.some((item) => overlapRatio(text, item) >= threshold);
}

function pointText(point: AnalysisPoint): string {
  return `${point.title} ${point.body}`;
}

function isNearDuplicatePoint(point: AnalysisPoint, picked: AnalysisPoint[]): boolean {
  const text = pointText(point);
  return isNearDuplicateText(text, picked.map(pointText));
}

function pickUniquePoints(candidates: AnalysisPoint[], count: number): AnalysisPoint[] {
  const picked: AnalysisPoint[] = [];

  for (const point of candidates) {
    if (isNearDuplicatePoint(point, picked)) continue;
    picked.push(point);
    if (picked.length === count) break;
  }

  for (const point of FALLBACK_ANALYSIS_POINTS) {
    if (picked.length === count) break;
    if (isNearDuplicatePoint(point, picked)) continue;
    picked.push(point);
  }

  return picked.slice(0, count);
}

function pickUniqueSteps(candidates: string[], count: number): string[] {
  const picked: string[] = [];

  for (const step of candidates) {
    if (isNearDuplicateText(step, picked)) continue;
    picked.push(step);
    if (picked.length === count) break;
  }

  if (picked.length < count) {
    for (const step of FALLBACK_NEXT_STEPS) {
      if (picked.length === count) break;
      if (isNearDuplicateText(step, picked)) continue;
      picked.push(step);
    }
  }

  return picked.slice(0, Math.max(2, Math.min(count, picked.length)));
}

function pickAnalysisPoints(
  lowestPillar: Category,
  strongestPillar: Category,
  q11Label: string,
  q12Label: string,
  q13Label: string,
): AnalysisPoint[] {
  const candidates: AnalysisPoint[] = [
    LOWEST_PILLAR_POINTS[lowestPillar],
  ];

  if (q13Label && Q13_POINTS[q13Label]) {
    candidates.push(Q13_POINTS[q13Label]);
  }

  if (q12Label && Q12_POINTS[q12Label]) {
    candidates.push(Q12_POINTS[q12Label]);
  }

  if (q11Label && Q11_POINTS[q11Label]) {
    candidates.push(Q11_POINTS[q11Label]);
  }

  if (strongestPillar !== lowestPillar) {
    candidates.push(STRONGEST_PILLAR_POINTS[strongestPillar]);
  }

  candidates.push(...FALLBACK_ANALYSIS_POINTS);

  return pickUniquePoints(candidates, 3);
}

const Q12_NEXT_STEPS: Record<string, string> = {
  "Get more calls and enquiries from Google":
    "Improve your Google Business Profile so it looks more active and trusted, then track calls, website visits, and enquiries.",
  "Turn more happy customers into Google reviews":
    "Start with a review reactivation campaign using past happy customers, then request reviews automatically after future jobs.",
  "Look more trusted when customers compare us with competitors":
    "Improve the proof customers see before contacting you: recent reviews, professional replies, strong website proof, and visible customer feedback.",
  "Save time by automating review requests and follow-ups":
    "Set up automated SMS/email review requests and reminders so the process keeps running without manual chasing.",
  "Understand what is costing us trust, visibility, or revenue online":
    "Run a reputation audit to find where reviews, replies, Google visibility, website proof, or tracking may be costing you enquiries.",
};

const Q13_NEXT_STEPS: Record<string, string> = {
  "We forget to ask when things get busy":
    "Create a simple trigger so every completed job gets a review request without relying on memory.",
  "Customers say they will leave a review but don't":
    "Add one polite reminder for customers who said they were happy but did not leave a review.",
  "We don't have a clear process":
    "Create a clear review request process with timing, message templates, follow-up rules, and ownership.",
  "We don't have time to follow up manually":
    "Remove manual follow-up by automating the request and reminder sequence.",
  "We're not sure what to say":
    "Use simple review request templates so the message feels professional, natural, and easy to send.",
};

const LOWEST_PILLAR_NEXT_STEPS: Record<Category, string> = {
  Trust:
    "Reply to reviews in a way that reassures future customers, answers doubts, and shows the business is professional.",
  Visibility:
    "Turn strong reviews and customer feedback into visible proof on your website, social media, and Google profile.",
  Revenue:
    "Build a repeatable system that turns completed jobs into reviews, trust, and future enquiries.",
};

function pickNextSteps(
  q12Label: string,
  q13Label: string,
  lowestPillar: Category,
): string[] {
  const candidates: string[] = [];

  if (q12Label && Q12_NEXT_STEPS[q12Label]) {
    candidates.push(Q12_NEXT_STEPS[q12Label]);
  }
  if (q13Label && Q13_NEXT_STEPS[q13Label]) {
    candidates.push(Q13_NEXT_STEPS[q13Label]);
  }
  candidates.push(LOWEST_PILLAR_NEXT_STEPS[lowestPillar]);
  candidates.push(...FALLBACK_NEXT_STEPS);

  return pickUniqueSteps(candidates, 3);
}

const Q14_SOLUTIONS: Record<
  string,
  { recommendedSolution: string; recommendedCTA: string; leadType: string }
> = {
  "An automated system that handles review requests and follow-ups automatically": {
    recommendedSolution:
      "Based on your answers, the best fit is an automated review system. This would help you request reviews after completed jobs, send reminders to happy customers, and create a more consistent process without relying on manual follow-up.",
    recommendedCTA: "Claim Your Free Setup",
    leadType: "Hot — Wants Automation",
  },
  "Guidance, templates, and a clear process we can follow ourselves": {
    recommendedSolution:
      "Based on your answers, the best fit is a clear review growth process with templates and guidance. This would give your team a simple way to ask for reviews, follow up professionally, and use positive feedback as proof.",
    recommendedCTA: "Get The Review Growth Plan",
    leadType: "Warm — Wants DIY Process",
  },
  "A one-off audit so we can understand the opportunity first": {
    recommendedSolution:
      "Based on your answers, the best fit is a one-off reputation audit. This would show where your Google profile, reviews, replies, and online proof may be costing you trust, visibility, or enquiries.",
    recommendedCTA: "Book A Quick Reputation Review",
    leadType: "Warm — Wants Audit First",
  },
  "Not sure yet — we'd like to see what would make the biggest difference": {
    recommendedSolution:
      "Based on your answers, the best fit is a quick review of your current reputation system. This will help identify the biggest opportunity before deciding whether automation, templates, or an audit makes the most sense.",
    recommendedCTA: "Show Me What's Missing",
    leadType: "Nurture — Needs Diagnosis",
  },
};

const DEFAULT_SOLUTION = Q14_SOLUTIONS[
  "Not sure yet — we'd like to see what would make the biggest difference"
];

export function buildSubmission(
  contact: ContactDetails,
  answers: QuizAnswers,
): QuizSubmission {
  const results = generateResults(answers);
  const answerLabels = buildAnswerLabels(answers);
  return {
    ...contact,
    answers,
    answerLabels,
    results,
    timestamp: new Date().toISOString(),
  };
}

export function generateResults(answers: QuizAnswers): QuizResults {
  const scores = calculateScores(answers);
  const scoreCategory = getScoreCategory(scores.total);
  const lowestPillar = getLowestCategory(scores);
  const strongestPillar = getStrongestCategory(scores);

  const q11Label = getSituationLabel("q11", answers.q11);
  const q12Label = getSituationLabel("q12", answers.q12);
  const q13Label = getSituationLabel("q13", answers.q13);
  const q14Label = getSituationLabel("q14", answers.q14);

  const resultIntro = buildResultIntro(scores.total, q11Label);
  const analysisPoints = pickAnalysisPoints(
    lowestPillar,
    strongestPillar,
    q11Label,
    q12Label,
    q13Label,
  );
  const nextSteps = pickNextSteps(q12Label, q13Label, lowestPillar);

  const solution = Q14_SOLUTIONS[q14Label] ?? DEFAULT_SOLUTION;

  return {
    scores,
    scoreCategory,
    lowestPillar,
    strongestPillar,
    resultIntro,
    analysisPoints,
    nextSteps,
    recommendedSolution: solution.recommendedSolution,
    recommendedCTA: solution.recommendedCTA,
    leadType: solution.leadType,
  };
}

export function buildWebhookPayload(
  contact: ContactDetails,
  answers: QuizAnswers,
  suburb: string,
): Record<string, unknown> {
  const results = generateResults(answers);
  const labels = buildAnswerLabels(answers);
  const { scores } = results;

  return {
    firstName: contact.firstName,
    businessName: contact.businessName,
    email: contact.email,
    phone: contact.phone,
    role: contact.role,
    suburb,

    totalScore: scores.total,
    scoreCategory: results.scoreCategory,

    trustScore: scores.trust,
    visibilityScore: scores.visibility,
    revenueScore: scores.revenue,
    trustPercent: scores.trustPercent,
    visibilityPercent: scores.visibilityPercent,
    revenuePercent: scores.revenuePercent,
    lowestPillar: results.lowestPillar,
    strongestPillar: results.strongestPillar,

    resultIntro: results.resultIntro,
    analysisPoints: results.analysisPoints,
    nextSteps: results.nextSteps,
    recommendedSolution: results.recommendedSolution,
    recommendedCTA: results.recommendedCTA,

    currentSituation: labels.q11,
    desiredOutcome: labels.q12,
    biggestObstacle: labels.q13,
    solutionPreference: labels.q14,
    extraNotes: labels.q15,

    leadType: results.leadType,
    timestamp: new Date().toISOString(),
    source: "Reputation Health Check Quiz",

    q1: labels.q1,
    q2: labels.q2,
    q3: labels.q3,
    q4: labels.q4,
    q5: labels.q5,
    q6: labels.q6,
    q7: labels.q7,
    q8: labels.q8,
    q9: labels.q9,
    q10: labels.q10,
    q11: labels.q11,
    q12: labels.q12,
    q13: labels.q13,
    q14: labels.q14,
    q15: labels.q15,
  };
}
