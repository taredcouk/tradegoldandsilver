"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I buy physical gold and silver online?",
    answer:
      "Buying physical gold and silver online is done through secure trading portals that connect individual investors directly to wholesale bullion markets. You can create an account, deposit funds via bank transfer or card, and instantly purchase fully allocated physical gold, silver, platinum, or palladium at live spot market prices 24/7.",
  },
  {
    question: "What is the difference between allocated and unallocated gold storage?",
    answer:
      "Allocated gold storage means you own specific, physically segregated bullion bars or coins stored in a professional vault under your exact legal name. Unallocated gold represents a financial claim against a bank's general balance sheet. Fully allocated storage removes counterparty bank default risk because the physical metal remains 100% your property at all times.",
  },
  {
    question: "Where are the physical precious metals stored?",
    answer:
      "Bullion is stored in ultra-secure, institutional-grade vaults located in major global financial centers, including London, Zurich, New York, Singapore, and Toronto. You can select your preferred vault location to diversify jurisdiction risk across global borders.",
  },
  {
    question: "Are my gold and silver holdings insured against loss or theft?",
    answer:
      "Yes. All precious metals held in accredited international vaults are fully insured against physical loss, damage, and theft by specialist underwriters, such as Lloyd's of London. Insurance costs are included directly within standard, low-cost annual storage fees.",
  },
  {
    question: "Can I take physical delivery of my bullion?",
    answer:
      "Yes. While most investors prefer low-cost vault storage for liquidity, direct physical withdrawal and delivery of standard bars or coins to your address is available upon request, subject to standard transit, handling, and security protocol fees.",
  },
  {
    question: "What are the fees for buying and storing gold and silver online?",
    answer:
      "Online bullion exchanges operate at wholesale institutional rates, offering trade commission spreads typically starting as low as 0.05% to 0.5%. Annual physical vault storage fees generally range between 0.12% and 0.48% per year (including full insurance), making it significantly cheaper than holding physical gold ETFs or buying through retail coin dealers.",
  },
  {
    question: "Is there a minimum investment amount required to start?",
    answer:
      "No. Thanks to fractional ownership access, you can begin investing in physical precious metals with small amounts, such as $100 or 1 gram of gold, while still benefiting from institutional wholesale market pricing.",
  },
  {
    question: "How quickly can I sell my gold or silver and withdraw funds?",
    answer:
      "Physical metals stored in global liquidity vaults can be sold instantly 24/7 at live spot rates. Once sold, proceeds are available immediately in your account currency (USD, EUR, GBP) and can be transferred back to your linked personal bank account within standard wire settlement times.",
  },
  {
    question: "How do I know my physical metal is actually in the vault?",
    answer:
      "Independent third-party auditors conduct regular physical bar counts and reconciliation audits inside all vault locations. Daily audit logs, bar list serial numbers, and public ledger reconciliations are published online daily so you can independently verify your holdings anytime.",
  },
  {
    question: "How are online precious metal exchanges different from Gold ETFs?",
    answer:
      "Gold ETFs represent paper shares in a financial fund and carry fund management fees and broker counterparty risks. Buying physical precious metals through a vault gateway gives you direct legal ownership of actual physical metal with 24/7 liquidity and direct delivery rights.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-24 bg-slate-950 py-24 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Frequently Asked <span className="text-amber-500">Questions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Everything you need to know about trading, storing, and securing physical precious metals online.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden transition-colors duration-200 hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-lg font-semibold text-slate-100 pr-4">
                    {faq.question}
                  </h3>
                  <div
                    className={`shrink-0 rounded-lg p-1.5 text-slate-400 bg-slate-800/60 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-300 leading-relaxed border-t border-slate-800/40">
                        <p className="pt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
