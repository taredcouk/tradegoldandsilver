"use client";

import { motion } from "framer-motion";
import { Coins, Send } from "lucide-react";

const Subscribe = () => {
  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-amber-500 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl shadow-amber-500/20"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-amber-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-amber-600/30 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left side: Graphic */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-slate-950 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 60}deg) translate(80px) rotate(-${i * 60}deg)`,
                    }}
                  />
                ))}
              </motion.div>
              <div className="relative bg-slate-950 p-6 rounded-full shadow-inner shadow-amber-500/50">
                <Coins size={64} className="text-amber-500" />
              </div>
            </div>

            {/* Right side: Content */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-4 uppercase tracking-tighter">
                Subscribe <span className="opacity-80">Our News</span>
              </h2>
              <p className="text-slate-900 font-medium mb-8 max-w-md">
                Hey! Are you tired of missing out on our updates? Subscribe to our news now and stay in the loop!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                <div className="flex-grow relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white text-slate-950 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950/50 font-medium placeholder:text-slate-400"
                  />
                </div>
                <button
                  className="bg-slate-950 text-amber-500 px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-slate-900 transition-colors shadow-lg flex items-center justify-center gap-2"
                  onClick={(e) => e.preventDefault()}
                >
                  Submit <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscribe;
