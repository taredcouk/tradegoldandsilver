import OpenAccountButton from "./OpenAccountButton";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 pt-12 pb-8 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl text-left">
            <p className="text-xs italic text-slate-400 font-medium">
              *Referral Ad: Tared Ltd earns a commission.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              The content on this website is for informational purposes only and does not constitute financial advice. Investing in precious metals involves risk.
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-start lg:justify-end">
            <OpenAccountButton className="inline-flex items-center justify-center rounded-md bg-amber-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-500" />
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
          Copyright © {new Date().getFullYear()} Tared Ltd
        </div>
      </div>
    </footer>
  );
}
