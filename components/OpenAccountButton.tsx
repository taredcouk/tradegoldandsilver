"use client";

import Link from "next/link";
import { useState } from "react";

interface OpenAccountButtonProps {
  className?: string;
  showTooltipOnHover?: boolean;
}

const OpenAccountButton = ({ className, showTooltipOnHover = false }: OpenAccountButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => showTooltipOnHover && setShowTooltip(true)}
      onMouseLeave={() => showTooltipOnHover && setShowTooltip(false)}
    >
      <Link
        href="/open-account"
        className={className || "bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-amber-900/20 flex items-center justify-center"}
      >
        Open Account*
        {/* Only show icon if it looks like a hero button (large) */}
        {className?.includes("py-4") && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </Link>

      {showTooltip && (
        <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-xl border border-slate-700 pointer-events-none">
          *Referral Ad: Tared Ltd earns a commission.
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-slate-800" />
        </div>
      )}
    </div>
  );
};

export default OpenAccountButton;
