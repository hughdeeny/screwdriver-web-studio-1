import { useEffect } from "react";

export default function CustomerReviews() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://reputationhub.site/reputation/assets/review-widget.js"]',
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://reputationhub.site/reputation/assets/review-widget.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="reviews" className="border-t border-border bg-page px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          What our customers say
        </h2>
        <div className="mt-8 w-full">
          <iframe
            className="lc_reviews_widget"
            src="https://reputationhub.site/reputation/widgets/review_widget/bmGaavXSqDZZy5mf1DCh"
            frameBorder="0"
            scrolling="no"
            style={{ minWidth: "100%", width: "100%" }}
            title="What our customers say"
          />
        </div>
      </div>
    </section>
  );
}
