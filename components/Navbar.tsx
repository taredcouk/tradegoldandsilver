"use client";

import { useState } from "react";
import OpenAccountButton from "./OpenAccountButton";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Comparison", href: "#comparison" },
  { name: "Charts", href: "#charts" },
  { name: "Calculator", href: "#tools" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="text-2xl font-bold tracking-tight">
          <span className="text-white">Trade</span>
          <span className="text-amber-500">Gold</span>
          <span className="text-white">&</span>
          <span className="text-slate-300">Silver</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-md px-2 py-1 text-sm font-medium text-slate-300 transition-colors hover:text-amber-500"
            >
              {link.name}
            </a>
          ))}
          <OpenAccountButton />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-900 md:hidden">
          <div className="container mx-auto space-y-2 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <OpenAccountButton className="w-full justify-center rounded-md bg-amber-600 px-4 py-3 text-base font-bold text-white hover:bg-amber-500" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
