import React from "react";

interface ComparisonColumn {
  title: string;
  subtitle: string;
  highlighted?: boolean;
  badge?: string;
}

interface ComparisonRow {
  criterion: string;
  vaulting: string;
  homeDelivery: string;
  etf: string;
  cfdFutures: string;
}

const columns: ComparisonColumn[] = [
  {
    title: "Allocated Physical Vaulting",
    subtitle: "Direct Ownership in High-Security Vaults",
    highlighted: true,
    badge: "Recommended",
  },
  {
    title: "Home Physical Delivery",
    subtitle: "Physical Coins & Bars at Home",
  },
  {
    title: "Precious Metal ETFs",
    subtitle: "Paper Metal Stock Exchange Traded",
  },
  {
    title: "CFDs & Futures",
    subtitle: "Leveraged Synthetic Derivatives",
  },
];

const rows: ComparisonRow[] = [
  {
    criterion: "Asset Type",
    vaulting: "Direct legal title to physical, allocated metal bars.",
    homeDelivery: "Direct physical possession of coins or bullion bars.",
    etf: "Uncertificated shares representing trust fund claims.",
    cfdFutures: "Synthetic derivative contract tracking market spot price.",
  },
  {
    criterion: "Counterparty Risk",
    vaulting: "Low risk. Out-of-balance-sheet ownership with independent audit.",
    homeDelivery: "Zero financial counterparty risk. High personal theft risk.",
    etf: "Moderate risk dependent on fund sponsor, custodian, and brokers.",
    cfdFutures: "High counterparty risk tied to broker solvency and clearinghouses.",
  },
  {
    criterion: "Storage & Holding Costs",
    vaulting: "Low annual percentage fee including wholesale insurance.",
    homeDelivery: "High upfront dealer premiums, retail shipping, and home safe costs.",
    etf: "Low to moderate annual management expense ratio (MER).",
    cfdFutures: "High ongoing financing charges, overnight swaps, and rollover fees.",
  },
  {
    criterion: "Physical Delivery Available",
    vaulting: "Direct physical withdrawal and delivery available upon request.",
    homeDelivery: "Already held physically by owner.",
    etf: "Rarely available; restricted to institutional authorized participants.",
    cfdFutures: "Cash-settled only for retail investors; standard physical settlement rare.",
  },
  {
    criterion: "Ideal Investor Profile",
    vaulting: "Long-term wealth preservation and institutional-grade security.",
    homeDelivery: "Privacy-focused investors preferring personal physical possession.",
    etf: "Short to medium-term portfolio allocation via stock accounts.",
    cfdFutures: "Active short-term traders and speculative market hedgers.",
  },
];

export default function PreciousMetalsComparisonTable() {
  return (
    <section id="comparison" className="scroll-mt-24 bg-slate-900 py-20 text-slate-100">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Precious Metals <span className="text-amber-500">Investment Comparison</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            Compare legal ownership structure, counterparty risk, ongoing holding expenses, and physical accessibility across the primary bullion acquisition methods.
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-2xl">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <caption className="sr-only">
              Comparison of 4 precious metals investment methods: Allocated Physical Vaulting, Home Physical Delivery, Precious Metal ETFs, and CFDs & Futures across key financial criteria.
            </caption>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950">
                <th scope="col" className="w-1/5 p-5 text-base font-semibold text-slate-300 align-bottom">
                  Comparison Criteria
                </th>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className={`w-1/5 p-5 align-top transition-colors ${
                      col.highlighted
                        ? "bg-amber-500/10 border-x-2 border-t-2 border-amber-500/50 rounded-t-xl"
                        : ""
                    }`}
                  >
                    {col.badge && (
                      <span className="mb-2 inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-950">
                        {col.badge}
                      </span>
                    )}
                    <div className="text-base font-bold text-white">{col.title}</div>
                    <div className="mt-1 text-xs font-normal text-slate-400">{col.subtitle}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-900/50 transition-colors">
                  <th scope="row" className="p-5 font-semibold text-slate-200 bg-slate-950/60 align-top">
                    {row.criterion}
                  </th>
                  <td className="p-5 text-slate-300 bg-amber-500/5 border-x-2 border-amber-500/50 align-top font-medium">
                    {row.vaulting}
                  </td>
                  <td className="p-5 text-slate-300 align-top">{row.homeDelivery}</td>
                  <td className="p-5 text-slate-300 align-top">{row.etf}</td>
                  <td className="p-5 text-slate-300 align-top">{row.cfdFutures}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
