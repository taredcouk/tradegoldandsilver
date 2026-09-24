"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-24 bg-slate-950 py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Common <span className="text-amber-500">Questions</span>
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-amber-500" />
        </div>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className="rounded-xl border border-slate-800 bg-slate-900/30 overflow-hidden transition-colors duration-200 hover:border-slate-700"
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
                      <div className="px-6 pb-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/40">
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
