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
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="roadmap" className="scroll-mt-24 relative overflow-hidden bg-slate-950 py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-500/30 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/20 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <span className="mb-3 inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 border border-amber-500/20">
            Step-by-Step Guide
          </span>
          <h3 className="text-4xl font-bold text-white md:text-5xl">
            Roadmap Of <span className="text-amber-500">Platform</span>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400 text-sm md:text-base">
            Follow our interactive zigzag roadmap to claim your welcome benefits and start trading.
          </p>
        </div>

        {/* Zigzag Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Golden Pathway Line (Desktop/Tablet) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-amber-500/80 to-amber-600/40 shadow-[0_0_15px_rgba(245,158,11,0.6)] z-0" />

          {/* Left Vertical Line (Mobile) */}
          <div className="md:hidden absolute left-6 top-4 bottom-4 w-1 bg-gradient-to-b from-amber-400 via-amber-500/80 to-amber-600/40 shadow-[0_0_12px_rgba(245,158,11,0.5)] z-0" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const isFirst = index === 0;
              const isEven = index % 2 === 0;

              return (
                <div key={step.title} className="relative z-10">
                  {/* Timeline Node Point (Desktop Center / Mobile Left) */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                    <div
                      className={`h-9 w-9 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all shadow-lg ${
                        isFirst
                          ? "bg-amber-500 border-amber-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-110"
                          : "bg-slate-900 border-amber-500/60 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className="md:hidden absolute left-6 top-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                    <div
                      className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all shadow-md ${
                        isFirst
                          ? "bg-amber-500 border-amber-300 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                          : "bg-slate-900 border-amber-500/60 text-amber-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Card Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Column Slot */}
                    <div className={`pl-14 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12 md:text-left"}`}>
                      <motion.article
                        initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        onClick={isFirst ? scrollToTop : undefined}
                        className={`relative group ${isFirst ? "cursor-pointer" : ""}`}
                      >
                        {isFirst ? (
                          /* Step 1 Highlighted Card */
                          <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-b from-amber-400 via-amber-500/80 to-amber-600/50 shadow-[0_0_35px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_0px_rgba(245,158,11,0.6)] transition-all duration-300">
                            {/* Top Glowing Pill Tag */}
                            <div className="absolute -top-3.5 right-6 z-20 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-md">
                              Start Here • Tap to Scroll Up
                            </div>

                            <div className="h-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 p-7 backdrop-blur-xl relative overflow-hidden">
                              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-500/20 blur-2xl group-hover:bg-amber-500/35 transition-all duration-500" />

                              <div className={`mb-5 flex items-center justify-between gap-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
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
                            <div className={`mb-5 flex items-center justify-between gap-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
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
                      </motion.article>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
