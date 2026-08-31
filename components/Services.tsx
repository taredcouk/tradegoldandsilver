import { CircleDot, Coins, Diamond, Gem } from "lucide-react";

const services = [
  {
    title: "Buy and Sell Gold",
    description:
      "Trade physical gold on a globally trusted platform with transparent market pricing.",
    icon: <Coins className="h-8 w-8 text-slate-900" />,
  },
  {
    title: "Buy and Sell Silver",
    description:
      "Access liquid silver markets and execute trades in a secure online environment.",
    icon: <CircleDot className="h-8 w-8 text-slate-900" />,
  },
  {
    title: "Buy and Sell Platinum",
    description:
      "Diversify your holdings with platinum using easy, professional-grade tools.",
    icon: <Diamond className="h-8 w-8 text-slate-900" />,
  },
  {
    title: "Buy and Sell Palladium",
    description:
      "Expand portfolio exposure with real-time palladium trading opportunities.",
    icon: <Gem className="h-8 w-8 text-slate-900" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-slate-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Services <span className="text-amber-500">We Offer</span>
          </h2>
          <p className="text-lg text-slate-400">
            Build and diversify your precious metals portfolio with simple tools and secure execution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group flex flex-col items-center rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8 text-center transition-all hover:border-slate-600 hover:bg-slate-800/60"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                {service.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold text-white transition-colors group-hover:text-amber-500">
                {service.title}
              </h3>
              <p className="leading-relaxed text-slate-400">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
