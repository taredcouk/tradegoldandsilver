import OpenAccountButton from "./OpenAccountButton";

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[78vh] items-center overflow-hidden bg-slate-950">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')", opacity: 0.3 }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            The Best Place to Trade &amp; Store Physical{" "}
            <span className="text-amber-500">Gold</span> and{" "}
            <span className="text-slate-300">Silver</span> Online
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-300 lg:text-2xl">
            Bridge the gap between digital convenience and physical security. Trade allocated fractional Gold, Silver, Platinum, and Palladium with 24/7 global liquidity.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <OpenAccountButton className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-amber-500" />
            <a
              href="#roadmap"
              className="inline-flex items-center justify-center rounded-lg border-2 border-slate-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-slate-500"
            >
              How it Works
            </a>
          </div>

          <p className="mt-4 text-sm italic text-slate-400">
            *Referral Ad: Tared Ltd earns a commission.
          </p>

          <div className="mt-12 flex items-center gap-5 text-slate-400">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 border-slate-950 bg-slate-800">
                  <div className="h-full w-full bg-gradient-to-br from-amber-400 to-amber-700 opacity-90" />
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
}
