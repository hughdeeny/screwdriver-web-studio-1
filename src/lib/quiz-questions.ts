export interface QuestionOption {
  label: string;
  score: number;
}

export interface ScoredQuestion {
  id: "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8" | "q9" | "q10";
  question: string;
  options: QuestionOption[];
}

export interface SituationQuestion {
  id: "q11" | "q12" | "q13" | "q14";
  question: string;
  options: { label: string }[];
}

export const SCORED_QUESTIONS: ScoredQuestion[] = [
  {
    id: "q1",
    question: "Do you ask happy customers for a Google review after a job is completed?",
    options: [
      { label: "Yes, automatically", score: 10 },
      { label: "Yes, manually", score: 7 },
      { label: "Sometimes", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q2",
    question: "Are review requests sent while the customer experience is still fresh?",
    options: [
      { label: "Yes, same day or next day", score: 10 },
      { label: "Usually within a week", score: 7 },
      { label: "Sometimes later", score: 4 },
      { label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "q3",
    question: "Do you make it easy for customers to leave a review with a Google review link?",
    options: [
      { label: "Yes, every time", score: 10 },
      { label: "Sometimes", score: 7 },
      { label: "Not consistently", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q4",
    question: "Do happy customers usually get a reminder if they forget to leave a review?",
    options: [
      { label: "Yes, automatically", score: 10 },
      { label: "Yes, manually", score: 7 },
      { label: "Sometimes", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q5",
    question: "Do you reply to Google reviews in a way that makes future customers trust you more?",
    options: [
      { label: "Yes, every review gets a personal and professional reply", score: 10 },
      { label: "Most reviews get a good reply", score: 7 },
      { label: "Some reviews get replied to", score: 4 },
      { label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "q6",
    question: "Do you have a list of past happy customers you could contact for a review request?",
    options: [
      { label: "Yes, with names, phone numbers, and emails", score: 10 },
      { label: "Yes, but it would need cleaning up", score: 7 },
      { label: "Some, but it is not organised", score: 4 },
      { label: "No", score: 0 },
      { label: "Not sure", score: 0 },
    ],
  },
  {
    id: "q7",
    question: "If you received a negative or unfair review, would you know exactly how to respond?",
    options: [
      { label: "Yes, we have a clear response process", score: 10 },
      { label: "Mostly, but it depends on the situation", score: 7 },
      { label: "Not really", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q8",
    question: "Do you use positive reviews or customer feedback as social proof on your website or social media?",
    options: [
      { label: "Yes, consistently", score: 10 },
      { label: "Sometimes", score: 7 },
      { label: "Rarely", score: 4 },
      { label: "Never", score: 0 },
    ],
  },
  {
    id: "q9",
    question: "Do you know whether your Google Business Profile is generating calls, website visits, or enquiries?",
    options: [
      { label: "Yes, we check this regularly", score: 10 },
      { label: "Sometimes", score: 7 },
      { label: "Rarely", score: 4 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q10",
    question: "Does your review process still happen when the business gets busy?",
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
      { label: "We get enough work, but our reviews don't reflect how good we are" },
      { label: "We get enquiries, but customers often compare us with competitors first" },
      { label: "We want more consistent calls and booked jobs from Google" },
      { label: "We are too busy to manually chase reviews or follow-ups" },
      { label: "We are not sure where our enquiries are coming from" },
    ],
  },
  {
    id: "q12",
    question: "What outcome would be most valuable in the next 90 days?",
    options: [
      { label: "Get more calls and enquiries from Google" },
      { label: "Turn more happy customers into Google reviews" },
      { label: "Look more trusted when customers compare us with competitors" },
      { label: "Save time by automating review requests and follow-ups" },
      { label: "Understand what is costing us trust, visibility, or revenue online" },
    ],
  },
  {
    id: "q13",
    question: "What do you think is the biggest obstacle getting in your way?",
    options: [
      { label: "We forget to ask when things get busy" },
      { label: "Customers say they will leave a review but don't" },
      { label: "We don't have a clear process" },
      { label: "We don't have time to follow up manually" },
      { label: "We're not sure what to say" },
    ],
  },
  {
    id: "q14",
    question: "Which type of solution would suit you best?",
    options: [
      { label: "An automated system that handles review requests and follow-ups automatically" },
      { label: "Guidance, templates, and a clear process we can follow ourselves" },
      { label: "A one-off audit so we can understand the opportunity first" },
      { label: "Not sure yet — we'd like to see what would make the biggest difference" },
    ],
  },
];

export const OPEN_QUESTION = {
  id: "q15" as const,
  question: "Is there anything else you think we should know about?",
  placeholder: "Optional — share anything that would help us understand your business",
};
