"use client";

import Link from "next/link";
import { User, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <Link href="/" className="text-3xl font-bold tracking-tight">
          <span className="text-white">Trade</span>
          <span className="text-amber-500">Gold</span>
          <span className="text-slate-300">&</span>
          <span className="text-slate-300">Silver</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 text-center uppercase tracking-wider">Welcome Back</h1>
          <p className="text-slate-400 text-center text-sm">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-11 pr-4 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Link href="#" className="text-xs text-amber-500 hover:text-amber-400 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 pl-11 pr-4 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-600/10 flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/open-account" className="text-amber-500 font-semibold hover:text-amber-400 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Footer info */}
      <div className="mt-8 text-slate-500 text-xs text-center">
        <p>© 2026 TradeGold&Silver. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
