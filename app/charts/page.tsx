import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default function ChartsPage() {
  return (
    <main className="min-h-screen bg-[#050B18]">
      <Navbar />
      <Hero
        title="Market"
        highlight="Charts"
        description="Real-time gold and silver price tracking and historical data analysis."
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0A1227] border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Live Price Data</h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Our advanced charting tools provide real-time insights into the precious metals market.
              Track Gold and Silver prices against major currencies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0D182E] p-10 rounded-xl border border-white/5 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-amber-500 text-2xl font-bold">XAU</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Gold / USD</h3>
                  <p className="text-gray-500 italic">Chart loading...</p>
                </div>
              </div>

              <div className="bg-[#0D182E] p-10 rounded-xl border border-white/5 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-slate-400 text-2xl font-bold">XAG</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Silver / USD</h3>
                  <p className="text-gray-500 italic">Chart loading...</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl inline-block">
              <p className="text-amber-200">
                <strong>Pro Tip:</strong> Use our advanced dashboard to access historical data up to 10 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
