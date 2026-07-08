import { BOOKING_URL, trackMeetingClicked } from "../../lib/booking";

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

export default function RecommendedSolution() {
  return (
    <section className="bg-navy py-10 text-white sm:py-14 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        <h2 className="text-xl font-bold leading-snug sm:text-3xl">Your recommended next step</h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-base">
          Based on your results, the fastest way to improve your reputation
          health is to install a system that collects reviews consistently,
          replies professionally, and turns positive feedback into social proof
          automatically.
        </p>

        <div className="mt-8 grid gap-3 text-left sm:mt-10 sm:grid-cols-2 sm:gap-4">
          {components.map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5"
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

        <div className="mt-8 text-center sm:mt-10">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMeetingClicked("Claim Free Setup")}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent-green px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-accent-green-hover sm:w-auto sm:text-lg"
          >
            Claim Free Setup
          </a>
          <p className="mt-3 text-sm text-white/50">
            Includes free setup, basic tracking, ongoing support, and a 30-day
            money-back guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
