import Image from "next/image";

const services = [
  {
    titleMetal: "Gold",
    description:
      "Trade allocated physical gold on a globally trusted platform with transparent spot market pricing and low spreads.",
  },
  {
    titleMetal: "Silver",
    description:
      "Access deep liquid silver markets and execute physical bullion trades in a secure online trading environment.",
  },
  {
    titleMetal: "Platinum",
    description:
      "Diversify your holdings with physical platinum using easy, professional-grade execution and live chart analytics.",
  },
  {
    titleMetal: "Palladium",
    description:
      "Expand portfolio exposure with real-time palladium trading opportunities and global vault secure storage.",
  },
];

export default function Services() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: `Buy and Sell ${service.titleMetal}`,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: "Tared Ltd",
          url: "https://tradegoldandsilver.online",
        },
      },
    })),
  };

  return (
    <section id="services" className="scroll-mt-24 bg-slate-900 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Trade Physical Gold, Silver, Platinum &amp; Palladium Online
          </h2>
          <p className="text-lg text-slate-400">
            Build and diversify your precious metals portfolio with simple tools and secure execution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.titleMetal}
              className="group flex flex-col items-center rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8 text-center transition-all hover:border-slate-600 hover:bg-slate-800/60"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 border border-slate-700/60 shadow-lg group-hover:border-amber-500/50 transition-colors">
                <Image
                  src="/precious-metal-icon.png"
                  alt={`Buy and Sell ${service.titleMetal} icon`}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">
                <span className="text-green-500">Buy</span> and{" "}
                <span className="text-red-500">Sell</span> {service.titleMetal}
              </h3>
              <p className="leading-relaxed text-slate-400">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
