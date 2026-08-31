import OpenAccountButton from "./OpenAccountButton";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
        <div>
          <p className="text-sm">Copyright © {new Date().getFullYear()} TradeGold&Silver</p>
          <p className="mt-1 text-xs italic">*Referral Ad: Tared Ltd earns a commission.</p>
        </div>
        <OpenAccountButton className="inline-flex items-center justify-center rounded-md bg-amber-600 px-5 py-3 text-sm font-bold text-white hover:bg-amber-500" />
      </div>
    </footer>
  );
}
