"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    BullionVaultChart?: new (options: Record<string, unknown>, containerId: string) => void;
  }
}

export default function LiveChartSection() {
  const containerId = "bvChartContainer";
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const chartRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if script is already present
    const existingScript = document.querySelector(
      'script[src*="bullionvaultchart.js"]'
    );

    if (existingScript) {
      if (window.BullionVaultChart) {
        setScriptLoaded(true);
      } else {
        existingScript.addEventListener("load", () => setScriptLoaded(true));
      }
    } else {
      const script = document.createElement("script");
      script.src = "https://www.bullionvault.com/chart/bullionvaultchart.js?v=1";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (scriptLoaded && window.BullionVaultChart && !chartRef.current) {
      chartRef.current = true;
      const options = {
        bullion: "gold",
        currency: "USD",
        timeframe: "1w",
        chartType: "line",
        miniChartModeAxis: "both",
        referrerID: "taredcouk",
        containerDefinedSize: true,
        miniChartMode: false,
        displayLatestPriceLine: true,
        switchBullion: true,
        switchCurrency: true,
        switchTimeframe: true,
        switchChartType: true,
        exportButton: true,
      };

      try {
        new window.BullionVaultChart(options, containerId);
      } catch (err) {
        console.error("Failed to initialize BullionVaultChart:", err);
      }
    }
  }, [scriptLoaded]);

  return (
    <section id="charts" className="scroll-mt-24 bg-slate-950 py-16 border-b border-slate-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Live Market <span className="text-amber-500">Charts</span>
          </h2>
          <p className="text-lg text-slate-400">
            Real-time bullion price analysis for Gold, Silver, Platinum, and Palladium.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 shadow-2xl backdrop-blur">
          <div
            id={containerId}
            className="w-full min-h-[420px] h-[500px] overflow-hidden rounded-xl bg-white/95"
          />
        </div>
      </div>
    </section>
  );
}
