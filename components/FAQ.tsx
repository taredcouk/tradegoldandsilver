const faqs = [
  {
    question: "What Are The Benefits Of Online Precious Metals Trading?",
    answer:
      "You get fast access to global markets, transparent pricing, and the flexibility to manage your positions online.",
  },
  {
    question: "How Can I Start?",
    answer:
      "Use the Open Account referral button, complete registration, verify identity, and fund your account to begin trading.",
  },
  {
    question: "Is Online Trading Safe?",
    answer:
      "Reputable platforms use strong encryption, account protections, and operational security controls.",
  },
  {
    question: "What Assets Can I Trade?",
    answer:
      "Gold and silver are the primary focus, with additional metals often available depending on platform support.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 bg-slate-950 py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Common <span className="text-amber-500">Questions</span>
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-amber-500" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
              <h3 className="mb-3 text-lg font-semibold text-slate-100">{faq.question}</h3>
              <p className="leading-relaxed text-slate-400">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
