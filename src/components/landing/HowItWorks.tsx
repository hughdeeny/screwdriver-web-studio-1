const steps = [
  {
    number: "1",
    title: "Reactivate past happy customers",
    description:
      "We help you use your existing customer list to request genuine Google reviews from completed jobs.",
  },
  {
    number: "2",
    title: "Automate future review requests",
    description:
      "New customers receive an SMS and/or email review request after a job is completed.",
  },
  {
    number: "3",
    title: "Reply professionally",
    description:
      "AI-assisted replies help new reviews get answered quickly in your business's tone of voice.",
  },
  {
    number: "4",
    title: "Turn reviews into social proof",
    description:
      "Positive reviews can be repurposed into simple Facebook and Instagram content.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-page py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        <h2 className="text-xl font-bold leading-snug text-navy sm:text-3xl">
          How the system works
        </h2>

        <div className="mt-8 grid gap-4 text-left sm:mt-10 sm:grid-cols-2 sm:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-3 rounded-xl border border-border bg-card p-4 sm:gap-4 sm:p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {step.number}
              </span>
              <div>
                <h3 className="font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
