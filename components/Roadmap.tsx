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
    description: "Receive FREE (4g) of silver to get you started",
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
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-500/30 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/20 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 border border-amber-500/20">
            Step-by-Step Guide
          </span>
          <h3 className="text-4xl font-bold text-white md:text-5xl">
            Roadmap Of <span className="text-amber-500">Platform</span>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400 text-sm md:text-base">
            Follow our streamlined onboarding roadmap to claim your welcome benefits and start trading.
          </p>
        </div>

        {/* Roadmap Grid with Visual Connection Flow */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            {steps.map((step, index) => {
              const isFirst = index === 0;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group"
                >
                  {/* Step 1 Highlighted Card */}
                  {isFirst ? (
                    <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-b from-amber-400 via-amber-500/70 to-amber-600/40 shadow-[0_0_30px_-5px_rgba(245,158,11,0.35)] hover:shadow-[0_0_45px_0px_rgba(245,158,11,0.5)] transition-all duration-300">
                      {/* Top Glowing Pill Tag for Step 1 */}
                      <div className="absolute -top-3.5 right-6 z-20 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-md">
                        Start Here
                      </div>

                      <div className="h-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 p-7 backdrop-blur-xl relative overflow-hidden">
                        {/* Soft inner radial gradient glow */}
                        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-500/20 blur-2xl group-hover:bg-amber-500/30 transition-all duration-500" />

                        <div className="mb-5 flex items-center justify-between">
                          <div className="rounded-xl bg-amber-500 p-3 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                            <step.icon size={24} className="stroke-[2.5]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                              Step 01
                            </span>
                          </div>
                        </div>

                        <h4 className="mb-2 text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-sm">{step.description}</p>
                      </div>
                    </div>
                  ) : (
                    /* Steps 2-6 Standard Cards */
                    <div className="h-full rounded-2xl border border-slate-800/80 bg-slate-900/60 p-7 backdrop-blur-md hover:border-amber-500/40 hover:bg-slate-900/80 transition-all duration-300 relative overflow-hidden">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="rounded-xl bg-slate-800/90 p-3 text-amber-400 border border-slate-700/50 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all">
                          <step.icon size={22} />
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-500 group-hover:text-amber-400/80 transition-colors">
                          Step {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h4 className="mb-2 text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
                    </div>
                  )}

                  {/* Connecting indicator between cards (for mobile/tablet flow indicator) */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-2 text-amber-500/30">
                      <div className="h-4 w-0.5 bg-gradient-to-b from-amber-500/40 to-transparent" />
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
