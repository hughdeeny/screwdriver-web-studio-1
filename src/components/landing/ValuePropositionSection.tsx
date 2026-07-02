const pillars = [
  {
    title: "Trust",
    color: "border-trust/30 bg-trust/5",
    titleColor: "text-trust",
    description: "Make customers feel confident before they contact you.",
  },
  {
    title: "Visibility",
    color: "border-visibility/30 bg-visibility/5",
    titleColor: "text-visibility",
    description: "Strengthen the signals that help your business stand out on Google.",
  },
  {
    title: "Conversion",
    color: "border-conversion/30 bg-conversion/5",
    titleColor: "text-conversion",
    description: "Turn more profile visitors into calls, enquiries, and booked jobs.",
  },
];

export default function ValuePropositionSection() {
  return (
    <section className="bg-navy py-14 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="mx-auto max-w-2xl text-2xl font-bold sm:text-3xl">
          Make your business look as trusted online as it is in real life.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-white/75 leading-relaxed">
          Screwdriver Marketing helps local service businesses turn happy
          customers into Google reviews, professional review replies, and social
          proof content automatically.
        </p>

        <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-white/50">
          The system improves
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className={`rounded-xl border p-5 ${pillar.color}`}
            >
              <h3 className={`text-lg font-bold ${pillar.titleColor}`}>
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
