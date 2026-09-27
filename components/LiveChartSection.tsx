"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    BullionVaultChart?: new (
      options: Record<string, string | boolean>,
      containerId: string,
    ) => unknown;
  }
}

const CHART_SCRIPT_ID = "bullionvault-chart-script";
const CHART_CONTAINER_ID = "bullionvault-live-chart";

export default function LiveChartSection({ nonce }: { nonce: string }) {
  const chartContainer = useRef<HTMLDivElement>(null);
  const [chartState, setChartState] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const container = chartContainer.current;
    if (!container) return;

    let cancelled = false;
    let script = document.getElementById(
      CHART_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    const showError = () => {
      if (!cancelled) setChartState("error");
    };

    const initializeChart = () => {
      if (cancelled) return;

      if (!window.BullionVaultChart) {
        showError();
        return;
      }

      try {
        new window.BullionVaultChart(
          {
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
            // BullionVault's optional popup/export control can throw when its
            // responsive control group is hidden or too narrow.
            exportButton: false,
          },
          CHART_CONTAINER_ID,
        );
        setChartState("ready");
      } catch {
        showError();
      }
    };

    const markScriptLoaded = () => {
      if (script) script.dataset.loaded = "true";
      initializeChart();
    };

    const markScriptFailed = () => showError();

    if (window.BullionVaultChart) {
      initializeChart();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.id = CHART_SCRIPT_ID;
        script.src = "https://www.bullionvault.com/chart/bullionvaultchart.js?v=1";
        script.async = true;
        script.nonce = nonce;
      }

      script.addEventListener("load", markScriptLoaded);
      script.addEventListener("error", markScriptFailed);

      if (script.dataset.loaded === "true") {
        initializeChart();
      } else if (!script.isConnected) {
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", markScriptLoaded);
      script?.removeEventListener("error", markScriptFailed);
      container.replaceChildren();
    };
  }, [nonce]);

  return (
    <section id="charts" className="scroll-mt-24 border-b border-slate-800/80 bg-slate-950 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Live Market <span className="text-amber-500">Charts</span>
          </h2>
          <p className="text-lg text-slate-400">
            Real-time bullion price analysis for Gold, Silver, Platinum, and Palladium.
          </p>
        </div>

        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl backdrop-blur sm:p-6">
          <div className="relative h-[500px] overflow-hidden rounded-xl bg-white sm:h-[560px]">
            <div
              id={CHART_CONTAINER_ID}
              ref={chartContainer}
              className="absolute inset-0"
            />
            {chartState !== "ready" && (
              <div
                className="absolute inset-0 grid place-items-center bg-white px-6 text-center text-sm text-slate-600"
                role={chartState === "error" ? "alert" : "status"}
              >
                {chartState === "error"
                  ? "The live chart is temporarily unavailable. Please try again shortly."
                  : "Loading live market chart…"}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
