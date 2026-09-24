"use client";

export default function LiveChartSection() {
  const iframeHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          #chartContainer {
            width: 100%;
            height: 100%;
          }
        </style>
        <script type="text/javascript" src="https://www.bullionvault.com/chart/bullionvaultchart.js?v=1"></script>
      </head>
      <body>
        <div id="chartContainer"></div>
        <script type="text/javascript">
          window.addEventListener('DOMContentLoaded', function() {
            var options = {
              bullion: 'gold',
              currency: 'USD',
              timeframe: '1w',
              chartType: 'line',
              miniChartModeAxis: 'both',
              referrerID: 'taredcouk',
              containerDefinedSize: true,
              miniChartMode: false,
              displayLatestPriceLine: true,
              switchBullion: true,
              switchCurrency: true,
              switchTimeframe: true,
              switchChartType: true,
              exportButton: true
            };
            if (typeof BullionVaultChart !== 'undefined') {
              new BullionVaultChart(options, 'chartContainer');
            }
          });
        </script>
      </body>
    </html>
  `;

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
          <iframe
            srcDoc={iframeHtml}
            title="BullionVault Live Price Chart"
            className="w-full h-[500px] rounded-xl border-0 bg-white"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
