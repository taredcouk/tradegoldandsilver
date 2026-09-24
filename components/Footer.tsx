import OpenAccountButton from "./OpenAccountButton";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <p className="text-sm font-medium text-slate-300">
              Copyright © {new Date().getFullYear()} TradeGold&Silver
            </p>
            <p className="mt-1 text-xs italic text-slate-500">
              *Referral Ad: Tared Ltd earns a commission.
            </p>
          </div>
          <OpenAccountButton className="inline-flex items-center justify-center rounded-md bg-amber-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-500" />
        </div>

        <div className="mt-8 border-t border-slate-800/60 pt-6 text-center text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto">
          The content on this website is for informational purposes only and does not constitute financial advice. Investing in precious metals involves risk.
        </div>
      </div>
    </footer>
  );
}
