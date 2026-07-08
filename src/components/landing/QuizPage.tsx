import { useState } from "react";
import BrandLogo from "./BrandLogo";
import { QuizSection } from "./QuizForm";
import MetaViewContentTracker from "./MetaViewContentTracker";
import ValuePropositionSection from "./ValuePropositionSection";
import RecommendedSolution from "./RecommendedSolution";
import HowItWorks from "./HowItWorks";
import WhatYouGet from "./WhatYouGet";
import Footer from "./Footer";

export default function QuizPage() {
  const [quizComplete, setQuizComplete] = useState(false);

  return (
    <>
      <MetaViewContentTracker />
      <header className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
        <BrandLogo href="/landing" className="min-w-0 shrink" />
        <a
          href="#contact"
          className="inline-flex min-h-11 shrink-0 items-center text-sm font-medium text-muted transition hover:text-navy"
        >
          Contact
        </a>
      </header>
      <QuizSection onComplete={() => setQuizComplete(true)} />
      {quizComplete && (
        <>
          <section className="bg-card py-10 sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-8">
              <h2 className="text-center text-xl font-bold leading-snug text-navy sm:text-3xl">
                Where customers discover local businesses today
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
                Most local recommendations still start online. This is why reputation,
                review activity, and visibility can directly impact who gets the call.
              </p>
              <div className="mt-5 overflow-hidden rounded-xl border border-border bg-white p-1.5 shadow-sm sm:mt-6 sm:p-2">
                <img
                  src="/local-recommendation-sources-2026.png"
                  alt="Top sources consumers use for local business recommendations in 2026: Google 71%, Facebook 49%, ChatGPT or other generative AI tools 45%"
                  className="h-auto max-w-full rounded-lg"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-xs text-muted">
                Source: BrightLocal, Local Consumer Review Survey 2026
              </p>
            </div>
          </section>
          <ValuePropositionSection />
          <RecommendedSolution />
          <HowItWorks />
          <WhatYouGet />
        </>
      )}
      <Footer />
    </>
  );
}
