import React from "react";
import GoldSilverCalculatorClient from "./GoldSilverCalculatorClient";

interface GoldSilverCalculatorProps {
  initialGoldPrice?: number;
  initialSilverPrice?: number;
  initialInvestmentAmount?: number;
}

export default function GoldSilverCalculator({
  initialGoldPrice = 2650.0,
  initialSilverPrice = 31.5,
  initialInvestmentAmount = 10000,
}: GoldSilverCalculatorProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Gold to Silver Ratio Calculator",
    "alternateName": "XAU/XAG Ratio Calculator & Purchasing Power Tool",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Calculate live Gold to Silver ratios (XAU/XAG), analyze purchasing power in Troy Ounces and metric units, and evaluate historical valuation signals.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <section id="tools" className="scroll-mt-24 relative overflow-hidden bg-slate-950 py-24">
      {/* JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute left-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-500/25 blur-[140px]" />
        <div className="absolute right-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-slate-400/20 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 border border-amber-500/20">
            Interactive Tools
          </span>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Gold vs. Silver <span className="text-amber-500">Ratio Calculator</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400 text-sm md:text-base">
            Compare physical bullion purchasing power, monitor historical valuation ratios, and analyze weight distributions for your precious metals allocation.
          </p>
        </div>

        {/* Interactive Client Calculator Tool */}
        <GoldSilverCalculatorClient
          initialGoldPrice={initialGoldPrice}
          initialSilverPrice={initialSilverPrice}
          initialInvestmentAmount={initialInvestmentAmount}
        />

        {/* SEO Educational Content Section */}
        <div className="mt-20 border-t border-slate-800/80 pt-16 text-slate-300 space-y-12">
          {/* Article 1 */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              How the Gold to Silver Ratio Works
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              The Gold to Silver ratio (XAU/XAG) represents the exact number of Troy ounces of silver required to purchase one Troy ounce of physical gold at current spot prices. Investors use this dynamic metric to assess relative value between the two primary precious metals and determine strategic entry points for portfolio rebalancing.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              When gold trades at $2,650 per ounce and silver trades at $31.50 per ounce, the resulting ratio is approximately <strong>84.1:1</strong>. This implies that 84.1 ounces of silver possess equal nominal purchasing power to a single ounce of fine gold.
            </p>
          </div>

          {/* Article 2 */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Historical Gold to Silver Ratio Averages & Trading Signals
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              Over modern financial history, the gold to silver ratio has fluctuated significantly around long-term averages. Understanding these historical ranges helps investors identify macro cyclical trends:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-amber-400">Ratios Above 80:1 (Silver Undervalued Signal):</strong> Historically, when the ratio exceeds 80 ounces of silver per ounce of gold, silver is considered historically cheap relative to gold. Many precious metals strategists interpret this high ratio as a sign that silver may outperform gold during subsequent bull markets due to its higher industrial demand and lower market cap.
              </li>
              <li>
                <strong className="text-slate-200">Historical Equilibrium Zone (50:1 to 75:1):</strong> Represents the modern baseline range observed across standard macroeconomic cycles, balancing monetary demand with industrial output requirements.
              </li>
              <li>
                <strong className="text-amber-400">Ratios Below 50:1 (Gold Strength Signal):</strong> Lower ratios indicate silver has appreciated rapidly relative to gold, favoring gold for capital preservation and monetary risk mitigation.
              </li>
            </ul>
          </div>

          {/* Article 3 */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              How to Calculate Gold vs. Silver Weight (Troy Ounces vs. Grams)
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              Precious metals are quoted internationally in <strong>Troy Ounces</strong>, which differ from standard avoirdupois ounces used for everyday grocery items:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="text-lg font-bold text-white mb-2">Standard Conversion Constants</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• 1 Troy Ounce = <strong>31.1035 Grams</strong></li>
                  <li>• 1 Troy Ounce = 1.09714 Standard (Avoirdupois) Ounces</li>
                  <li>• 1 Kilogram (kg) = <strong>32.1507 Troy Ounces</strong></li>
                  <li>• 1 Metric Ton = 32,150.7 Troy Ounces</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="text-lg font-bold text-white mb-2">Vaulting & Storage Cost Considerations</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Because silver is far less dense by dollar value than gold, storing $10,000 worth of physical silver requires roughly 84 times more vault volume and weight capacity than the equivalent gold value. Allocated vault fees reflect this weight difference, averaging ~0.12% per year for gold vs ~0.48% for silver in high-security, insured facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
