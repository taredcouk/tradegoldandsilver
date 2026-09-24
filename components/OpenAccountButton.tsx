"use client";

interface OpenAccountButtonProps {
  className?: string;
}

const REFERRAL_URL = "https://www.bullionvaultaffiliate.com/taredcouk/en";

export default function OpenAccountButton({ className }: OpenAccountButtonProps) {
  const trackClick = (placement: string) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "open_account_click", {
        event_category: "engagement",
        event_label: placement,
        transport_type: "beacon",
      });
    }
  };

  return (
    <span className="group relative inline-flex">
      <a
        href={REFERRAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick("landing")}
        className={
          className ||
          "inline-flex items-center justify-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-amber-500"
        }
      >
        Open Account*
      </a>
      <span className="pointer-events-none absolute right-0 top-full z-30 mt-2 w-48 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-center text-[10px] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
        *Referral Ad: Tared Ltd earns a commission.
      </span>
    </span>
  );
}
