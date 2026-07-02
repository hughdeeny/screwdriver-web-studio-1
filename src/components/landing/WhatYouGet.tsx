const items = [
  "Free setup",
  "Customer list review reactivation",
  "Automated SMS/email review requests",
  "Google review link setup",
  "AI-assisted review replies",
  "Review-to-social content automation",
  "Basic tracking",
  "Ongoing support",
  "30-day money-back guarantee",
];

export default function WhatYouGet() {
  return (
    <section id="what-you-get" className="bg-card py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          What&apos;s included
        </h2>

        <ul className="mx-auto mt-8 max-w-lg text-left">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-green text-xs text-white">
                ✓
              </span>
              <span className="text-navy">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
