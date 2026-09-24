"use client";

import { useState, useMemo } from "react";
import { Scale, ArrowLeftRight, Info, Coins, ShieldCheck, Zap } from "lucide-react";

interface GoldSilverCalculatorClientProps {
  initialGoldPrice?: number;
  initialSilverPrice?: number;
  initialInvestmentAmount?: number;
}

const TROY_OZ_TO_GRAMS = 31.1035;
const PRESET_AMOUNTS = [1000, 5000, 10000, 50000];

export default function GoldSilverCalculatorClient({
  initialGoldPrice = 2650.0,
  initialSilverPrice = 31.5,
  initialInvestmentAmount = 10000,
}: GoldSilverCalculatorClientProps) {
  const [goldPrice, setGoldPrice] = useState<number>(initialGoldPrice);
  const [silverPrice, setSilverPrice] = useState<number>(initialSilverPrice);
  const [investmentAmount, setInvestmentAmount] = useState<number>(initialInvestmentAmount);
  const [unitMode, setUnitMode] = useState<"oz" | "metric">("oz");

  // Calculations
  const ratio = useMemo(() => {
    if (!silverPrice || silverPrice <= 0) return 0;
    return goldPrice / silverPrice;
  }, [goldPrice, silverPrice]);

  const goldOunces = useMemo(() => {
    if (!goldPrice || goldPrice <= 0) return 0;
    return investmentAmount / goldPrice;
  }, [investmentAmount, goldPrice]);

  const silverOunces = useMemo(() => {
    if (!silverPrice || silverPrice <= 0) return 0;
    return investmentAmount / silverPrice;
  }, [investmentAmount, silverPrice]);

  const goldGrams = useMemo(() => goldOunces * TROY_OZ_TO_GRAMS, [goldOunces]);
  const silverGrams = useMemo(() => silverOunces * TROY_OZ_TO_GRAMS, [silverOunces]);
  const silverKg = useMemo(() => silverGrams / 1000, [silverGrams]);

  // Annual estimated vault storage fee (~0.12% for gold, ~0.48% for silver annually in secure vaults)
  const goldVaultFeeAnnual = useMemo(() => Math.max(investmentAmount * 0.0012, 48), [investmentAmount]);
  const silverVaultFeeAnnual = useMemo(() => Math.max(investmentAmount * 0.0048, 48), [investmentAmount]);

  // Dynamic valuation insight based on historical average (~60:1)
  const valuationInsight = useMemo(() => {
    if (ratio > 80) {
      return {
        tag: "Silver Undervalued",
        message: `Current ratio is ${ratio.toFixed(1)}:1. Historically (avg ~60:1), ratios above 80:1 indicate Silver may be undervalued relative to Gold, presenting potential leverage upside.`,
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      };
    } else if (ratio < 50) {
      return {
        tag: "Gold Undervalued",
        message: `Current ratio is ${ratio.toFixed(1)}:1. Ratios below 50:1 indicate Gold is historically stronger relative to Silver, favoring long-term monetary stability.`,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      };
    } else {
      return {
        tag: "Balanced Ratio",
        message: `Current ratio is ${ratio.toFixed(1)}:1, trading within the historical equilibrium zone (~50:1 to 75:1).`,
        color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      };
    }
  }, [ratio]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
      {/* Top Ratio Gauge & Dynamic Insight Banner */}
      <div className="mb-10 flex flex-col items-center gap-6 md:flex-row md:justify-between rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-3.5 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <Scale size={28} className="stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Current Gold / Silver Ratio
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400 md:text-4xl">
                {ratio.toFixed(1)}:1
              </span>
              <span className="text-xs text-slate-400">(XAU / XAG)</span>
            </div>
          </div>
        </div>

        {/* Insight Badge */}
        <div className={`flex items-start gap-3 rounded-xl border p-4 max-w-xl text-xs md:text-sm ${valuationInsight.color}`}>
          <Info size={20} className="mt-0.5 shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wide block mb-0.5">
              {valuationInsight.tag}
            </span>
            <p className="opacity-90 leading-relaxed">{valuationInsight.message}</p>
          </div>
        </div>
      </div>

      {/* User Controls Panel */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10 pb-10 border-b border-slate-800">
        {/* Gold Spot Price Input */}
        <div>
          <label htmlFor="gold-price-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Gold Spot Price (USD / oz)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 font-bold">$</span>
            <input
              id="gold-price-input"
              type="number"
              min="1"
              step="0.01"
              value={goldPrice || ""}
              onChange={(e) => setGoldPrice(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-8 pr-4 text-white font-semibold focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
              aria-label="Gold Spot Price in USD per ounce"
            />
          </div>
        </div>

        {/* Silver Spot Price Input */}
        <div>
          <label htmlFor="silver-price-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Silver Spot Price (USD / oz)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              id="silver-price-input"
              type="number"
              min="0.1"
              step="0.01"
              value={silverPrice || ""}
              onChange={(e) => setSilverPrice(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-8 pr-4 text-white font-semibold focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
              aria-label="Silver Spot Price in USD per ounce"
            />
          </div>
        </div>

        {/* Investment Amount Input & Presets */}
        <div>
          <label htmlFor="investment-amount-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Investment Amount ($ USD)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 font-bold">$</span>
            <input
              id="investment-amount-input"
              type="number"
              min="1"
              step="100"
              value={investmentAmount || ""}
              onChange={(e) => setInvestmentAmount(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-8 pr-4 text-white font-semibold focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
              aria-label="Investment Amount in USD"
            />
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setInvestmentAmount(amt)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  investmentAmount === amt
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                ${amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Unit Toggle Bar */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <h4 className="text-lg font-bold text-white flex items-center gap-2">
          <Coins size={20} className="text-amber-500" />
          Purchasing Power Comparison
        </h4>

        {/* Unit Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setUnitMode("oz")}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              unitMode === "oz"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Troy Ounces (oz)
          </button>
          <button
            type="button"
            onClick={() => setUnitMode("metric")}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              unitMode === "metric"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Metric (g / kg)
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: Gold */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-7 relative overflow-hidden group hover:border-amber-500/60 transition-all shadow-xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/20 p-2.5 text-amber-400 border border-amber-500/30">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h5 className="text-xl font-bold text-white">Gold (XAU)</h5>
                <span className="text-xs text-amber-400/80 font-mono">Monetary Anchor</span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-400">
              <Zap size={12} /> Wealth Preservation
            </span>
          </div>

          {/* Main Acquired Output */}
          <div className="mb-6 rounded-xl bg-slate-950/70 p-5 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
              Total Acquired Quantity
            </span>
            {unitMode === "oz" ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-400">
                  {goldOunces.toFixed(3)}
                </span>
                <span className="text-sm font-semibold text-slate-300">Troy Ounces</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-400">
                  {goldGrams.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-slate-300">Grams (g)</span>
              </div>
            )}
          </div>

          {/* Stats Breakdown */}
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Spot Price / oz:</span>
              <span className="font-semibold text-white">${goldPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Physical Weight (Metric):</span>
              <span className="font-semibold text-white">{goldGrams.toFixed(2)} grams</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Est. Annual Vault Storage:</span>
              <span className="font-semibold text-amber-400">~${goldVaultFeeAnnual.toFixed(2)} / yr</span>
            </div>
          </div>
        </div>

        {/* Right Card: Silver */}
        <div className="rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-7 relative overflow-hidden group hover:border-slate-500 transition-all shadow-xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-slate-400/10 blur-2xl group-hover:bg-slate-400/20 transition-all" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-800 p-2.5 text-slate-300 border border-slate-700">
                <ArrowLeftRight size={24} />
              </div>
              <div>
                <h5 className="text-xl font-bold text-white">Silver (XAG)</h5>
                <span className="text-xs text-slate-400 font-mono">Industrial & Monetary</span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-[11px] font-bold text-slate-300">
              <Zap size={12} className="text-slate-400" /> High Leverage Potential
            </span>
          </div>

          {/* Main Acquired Output */}
          <div className="mb-6 rounded-xl bg-slate-950/70 p-5 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
              Total Acquired Quantity
            </span>
            {unitMode === "oz" ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-200">
                  {silverOunces.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-slate-400">Troy Ounces</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-200">
                  {silverKg.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-slate-400">Kilograms (kg)</span>
              </div>
            )}
          </div>

          {/* Stats Breakdown */}
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Spot Price / oz:</span>
              <span className="font-semibold text-white">${silverPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Physical Weight (Metric):</span>
              <span className="font-semibold text-white">
                {silverKg.toFixed(2)} kg ({silverGrams.toFixed(0)} g)
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Est. Annual Vault Storage:</span>
              <span className="font-semibold text-slate-300">~${silverVaultFeeAnnual.toFixed(2)} / yr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
