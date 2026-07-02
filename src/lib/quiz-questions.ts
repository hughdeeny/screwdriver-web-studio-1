export interface QuestionOption {
  label: string;
  score: number;
}

export interface ScoredQuestion {
  id: keyof import("./quiz-types").QuizAnswers;
  question: string;
  options: QuestionOption[];
}

export interface SituationQuestion {
  id: keyof import("./quiz-types").QuizAnswers;
  question: string;
  options: { label: string }[];
}

export const SCORED_QUESTIONS: ScoredQuestion[] = [
  {
    id: "q1",
    question:
      "Do you have a consistent process for asking happy customers for Google reviews after a job is completed?",
    options: [
      { label: "Yes, it happens automatically", score: 10 },
      { label: "Yes, but manually", score: 7 },
      { label: "Sometimes", score: 4 },
      { label: "No process currently", score: 0 },
    ],
  },
  {
    id: "q2",
    question: "Are review requests usually sent while the customer experience is still fresh?",
    options: [
      { label: "Yes, same day or next day", score: 10 },
      { label: "Usually within a week", score: 7 },
      { label: "Sometimes later", score: 4 },
      { label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "q3",
    question: "Do you make it easy for customers to leave a review with a direct Google review link?",
    options: [
      { label: "Yes, every time", score: 10 },
      { label: "Sometimes", score: 7 },
      { label: "Not consistently", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q4",
    question:
      "Do you follow up with happy customers who said they would leave a review but never did?",
    options: [
      { label: "Yes, automatically", score: 10 },
      { label: "Yes, manually", score: 7 },
      { label: "Sometimes", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q5",
    question: "Do you reply to new Google reviews in a professional and timely way?",
    options: [
      { label: "Yes, every review", score: 10 },
      { label: "Most reviews", score: 7 },
      { label: "Sometimes", score: 4 },
      { label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "q6",
    question:
      "Do your review replies sound personal and specific instead of copied and pasted?",
    options: [
      { label: "Yes, always", score: 10 },
      { label: "Usually", score: 7 },
      { label: "Sometimes", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q7",
    question: "Do you have a calm, professional process for handling negative reviews?",
    options: [
      { label: "Yes, we have a clear process", score: 10 },
      { label: "Somewhat", score: 7 },
      { label: "Not really", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q8",
    question:
      "Do you regularly turn positive reviews into social proof for Facebook, Instagram, or your website?",
    options: [
      { label: "Yes, consistently", score: 10 },
      { label: "Sometimes", score: 7 },
      { label: "Rarely", score: 4 },
      { label: "Never", score: 0 },
    ],
  },
  {
    id: "q9",
    question:
      "Do you track whether your Google profile is getting more reviews, recent activity, and customer actions over time?",
    options: [
      { label: "Yes, regularly", score: 10 },
      { label: "Sometimes", score: 7 },
      { label: "Rarely", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q10",
    question:
      "Is your reputation process automatic enough that it still works when you are busy?",
    options: [
      { label: "Yes, it runs in the background", score: 10 },
      { label: "Partly", score: 7 },
      { label: "Not really", score: 4 },
      { label: "No, it depends on us remembering", score: 0 },
    ],
  },
];

export const SITUATION_QUESTIONS: SituationQuestion[] = [
  {
    id: "q11",
    question: "Which best describes your current situation?",
    options: [
      { label: "We get work mostly through word-of-mouth" },
      { label: "We get some leads from Google" },
      { label: "Competitors seem stronger online" },
      { label: "We are not sure where leads come from" },
    ],
  },
  {
    id: "q12",
    question: "What outcome would be most valuable for your business right now?",
    options: [
      { label: "More Google reviews" },
      { label: "More calls from Google" },
      { label: "Looking more trusted than competitors" },
      { label: "Less manual follow-up" },
    ],
  },
  {
    id: "q13",
    question: "What have you already tried to improve your reviews or online reputation?",
    options: [
      { label: "Asked customers manually" },
      { label: "Posted on social media" },
      { label: "Worked with a marketer" },
      { label: "Nothing consistently yet" },
    ],
  },
  {
    id: "q14",
    question: "What usually gets in the way of collecting more reviews?",
    options: [
      { label: "Forgetting to ask" },
      { label: "Customers say they will but don't" },
      { label: "No clear process" },
      { label: "Too busy" },
      { label: "Not sure what to say" },
    ],
  },
  {
    id: "q15",
    question: "What type of help would suit you best?",
    options: [
      { label: "Set it up for me" },
      { label: "Give me the system and guidance" },
      { label: "I just want to understand the opportunity first" },
      { label: "Not sure yet" },
    ],
  },
];
