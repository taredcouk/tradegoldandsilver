import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-slate-950 overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070&auto=format&fit=crop')",
          opacity: 0.3
        }}
      />

      {/* Trading charts pattern or secondary overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            The best place to <span className="text-green-600">Buy</span> and <span className="text-red-600">Sell</span> <span className="text-amber-500">gold and silver</span> online
          </h1>

          <p className="text-xl lg:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
            Experience the world&apos;s most popular gold investment service.
            Secure, professional-grade bullion trading for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/open-account"
              className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-xl shadow-amber-900/30"
            >
              Open Account
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/trade-guide"
              className="inline-flex items-center justify-center bg-transparent border-2 border-slate-700 hover:border-slate-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              How it Works
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 text-slate-400">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-700 opacity-80" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">
              Join <span className="text-white">100,000+</span> active traders worldwide
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
