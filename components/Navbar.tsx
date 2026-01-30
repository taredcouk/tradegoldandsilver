"use client";

import { useState } from "react";
import Link from "next/link";
import OpenAccountButton from "./OpenAccountButton";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Guide", href: "/guide" },
    { name: "Blog", href: "/blog" },
    { name: "Charts", href: "/charts" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-white">Trade</span>
              <span className="text-amber-500">Gold</span>
              <span className="text-slate-300">&</span>
              <span className="text-slate-300">Silver</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <OpenAccountButton showTooltipOnHover={true} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-amber-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex justify-center">
              <OpenAccountButton
                className="block w-full text-center bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-md text-base font-bold"
                showTooltipOnHover={true}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
