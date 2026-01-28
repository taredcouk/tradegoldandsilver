"use client";

import React from "react";
import { UserPlus, Gift, ShieldCheck, Wallet, BookOpen, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Open Account",
    description: "Initiate your professional bullion trading experience. Establish a secure, institutional-grade account to access global markets.",
    icon: UserPlus,
  },
  {
    title: "Free Gift",
    description: "Receive a complimentary allocation of physical silver or gold upon account opening to experience our vaulting and trading system firsthand.",
    icon: Gift,
  },
  {
    title: "Validate",
    description: "Confirm your identity through our secure verification protocol, ensuring compliance and the highest standards of account security.",
    icon: ShieldCheck,
  },
  {
    title: "Fund",
    description: "Capitalize your account via secure bank transfer or card payment. Funds are held in dedicated client accounts for maximum transparency.",
    icon: Wallet,
  },
  {
    title: "Learn",
    description: "Utilize our comprehensive suite of market analysis tools and educational modules designed for both novice and professional investors.",
    icon: BookOpen,
  },
  {
    title: "Trade",
    description: "Buy and sell physical gold, silver, and platinum 24/7 on our live exchange with ultra-low commissions and instant liquidity.",
    icon: TrendingUp,
  },
];

const Roadmap = () => {
  return (
    <section className="bg-slate-950 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-3">Roadmap</h2>
          <h3 className="text-white text-4xl md:text-5xl font-bold">
            Roadmap Of <span className="text-amber-500">Platform</span>
          </h3>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block relative py-20">
          {/* Central Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-amber-500/30 -translate-y-1/2" />

          <div className="grid grid-cols-6 gap-4">
            {steps.map((step, index) => {
              const isTop = index % 2 === 0;
              const isFirst = index === 0;

              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <motion.div
                    initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl bg-slate-900 border border-slate-800 relative z-20
                      ${isTop ? "mb-24" : "mt-24"}
                      ${isFirst ? "shadow-[0_0_30px_rgba(251,191,36,0.2)] border-amber-500/50" : ""}`}
                  >
                    {isFirst && (
                      <div className="absolute -inset-1 bg-amber-500/20 blur-xl rounded-2xl -z-10" />
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${isFirst ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-amber-500"}`}>
                        <step.icon size={24} />
                      </div>
                      <span className="text-amber-500/50 font-mono text-sm">Step 0{index + 1}</span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  </motion.div>

                  {/* Dot on line */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 z-30
                    ${isFirst ? "shadow-[0_0_10px_rgba(251,191,36,1)]" : ""}`}
                  />

                  {/* Vertical connector to card */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-amber-500/30 h-12 z-10
                    ${isTop ? "top-1/2 mt-2" : "bottom-1/2 mb-2"}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden relative space-y-12">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-amber-500/30" />

          {steps.map((step, index) => {
            const isFirst = index === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-20"
              >
                {/* Dot on line */}
                <div className={`absolute left-[30px] top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 z-20
                  ${isFirst ? "shadow-[0_0_10px_rgba(251,191,36,1)]" : ""}`}
                />

                <div className={`p-6 rounded-2xl bg-slate-900 border border-slate-800 relative
                  ${isFirst ? "shadow-[0_0_25px_rgba(251,191,36,0.15)] border-amber-500/40" : ""}`}
                >
                  {isFirst && (
                    <div className="absolute -inset-1 bg-amber-500/10 blur-xl rounded-2xl -z-10" />
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${isFirst ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-amber-500"}`}>
                      <step.icon size={24} />
                    </div>
                    <span className="text-amber-500/50 font-mono text-sm">Step 0{index + 1}</span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
