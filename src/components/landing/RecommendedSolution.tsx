const components = [
  {
    title: "Past customer review reactivation",
    description:
      "Use your existing customer list to request genuine Google reviews from completed jobs.",
  },
  {
    title: "Automated SMS/email review requests",
    description:
      "Send review requests after future jobs are completed so the process keeps running in the background.",
  },
  {
    title: "AI-assisted Google review replies",
    description:
      "Reply to reviews quickly and professionally in your business's tone of voice.",
  },
  {
    title: "Review-to-social content automation",
    description:
      "Turn positive reviews into simple trust-building posts for Facebook and Instagram.",
  },
];

interface RecommendedSolutionProps {
  onClaimSetup?: () => void;
}

export default function RecommendedSolution({ onClaimSetup }: RecommendedSolutionProps) {
  const handleClaim = () => {
    if (onClaimSetup) {
      onClaimSetup();
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-navy py-14 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Your recommended next step</h2>
        <p className="mx-auto mt-4 max-w-3xl text-white/75 leading-relaxed">
          Based on your results, the fastest way to improve your reputation
          health is to install a system that collects reviews consistently,
          replies professionally, and turns positive feedback into social proof
          automatically.
        </p>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
          {components.map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <span className="text-sm font-bold text-accent">
                {i + 1}
              </span>
              <h3 className="mt-1 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleClaim}
            className="w-full rounded-xl bg-accent-green px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-accent-green-hover sm:w-auto"
          >
            Claim Free Setup
          </button>
          <p className="mt-3 text-sm text-white/50">
            Includes free setup, basic tracking, ongoing support, and a 30-day
            money-back guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
