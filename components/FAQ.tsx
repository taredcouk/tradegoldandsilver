"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What Are The Benefits Of Online Trading?",
    answer: "Online trading offers unparalleled convenience, allowing you to manage your portfolio from anywhere in the world. It provides real-time access to global markets, lower transaction costs compared to traditional brokerage, and the ability to execute trades instantly.",
  },
  {
    question: "How To Create A Trading Account?",
    answer: "Creating an account is simple: click the 'Open Account' button, fill in your personal details, and complete the identity verification process. Once your account is approved and funded, you can start trading immediately.",
  },
  {
    question: "What Are The Disadvantages Of Online Trading?",
    answer: "The primary risks include market volatility and the potential for technical issues. Additionally, the ease of trading can sometimes lead to over-trading or emotional decision-making without proper research and a disciplined strategy.",
  },
  {
    question: "Which App Is Best For Online Trading?",
    answer: "The 'best' app depends on your specific needs, such as the assets you wish to trade and your experience level. We recommend platforms that offer low fees, robust security, a user-friendly interface, and comprehensive market analysis tools.",
  },
  {
    question: "Is Online Trading Safe?",
    answer: "Yes, when using regulated and reputable platforms. Modern trading platforms use advanced encryption and multi-factor authentication to protect your assets and personal information. Always ensure your chosen platform is licensed by relevant financial authorities.",
  },
  {
    question: "What Is Online Trading, And How Does It Work?",
    answer: "Online trading is the act of buying and selling financial instruments through an internet-based platform. You place orders through a broker's software, which are then executed on the market. It allows individual investors to participate in markets once reserved for institutional players.",
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "bg-slate-900/50 border-amber-500/30" : "bg-slate-900/20 hover:bg-slate-900/40"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
      >
        <span className={`font-semibold text-lg ${isOpen ? "text-amber-400" : "text-slate-200"}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 p-1 rounded-full border transition-colors ${
          isOpen ? "bg-amber-500 border-amber-500 text-slate-950" : "border-slate-700 text-slate-400"
        }`}>
          {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-slate-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Most Common <span className="text-amber-500">FAQ</span>
          </h2>
          <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
