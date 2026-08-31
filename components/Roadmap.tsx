"use client";

import { motion } from "framer-motion";
import { BookOpen, Gift, ShieldCheck, TrendingUp, UserPlus, Wallet } from "lucide-react";

const steps = [
  {
    title: "Open Account",
    description: "Create your account to access secure global bullion markets.",
    icon: UserPlus,
  },
  {
    title: "Get Welcome Benefit",
    description: "Start with referral benefits and platform onboarding guidance.",
    icon: Gift,
  },
  {
    title: "Verify Identity",
    description: "Complete verification to activate secure account operations.",
    icon: ShieldCheck,
  },
  {
    title: "Fund Account",
    description: "Deposit funds via supported methods and prepare to trade.",
    icon: Wallet,
  },
  {
    title: "Learn the Market",
    description: "Use educational resources and market insights to plan entries.",
    icon: BookOpen,
  },
  {
    title: "Start Trading",
    description: "Buy and sell precious metals with real-time pricing and liquidity.",
    icon: TrendingUp,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-24 relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-amber-500 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-amber-500 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h3 className="text-4xl font-bold text-white md:text-5xl">
            Roadmap Of <span className="text-amber-500">Platform</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2 text-amber-500">
                  <step.icon size={22} />
                </div>
                <span className="font-mono text-xs text-amber-500/60">Step {String(index + 1).padStart(2, "0")}</span>
              </div>
              <h4 className="mb-2 text-xl font-bold text-white">{step.title}</h4>
              <p className="text-slate-400">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
