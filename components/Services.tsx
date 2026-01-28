import { Coins, CircleDot, Diamond, Gem } from "lucide-react";

const services = [
  {
    title: "Buy and Sell Gold",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante ornare sed iaculis turpis aenean. Neque viverra adipiscing.",
    icon: <Coins className="w-8 h-8 text-slate-900" />,
  },
  {
    title: "Buy and Sell Silver",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante ornare sed iaculis turpis aenean. Neque viverra adipiscing.",
    icon: <CircleDot className="w-8 h-8 text-slate-900" />,
  },
  {
    title: "Buy and Sell Platinum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante ornare sed iaculis turpis aenean. Neque viverra adipiscing.",
    icon: <Diamond className="w-8 h-8 text-slate-900" />,
  },
  {
    title: "Buy and Sell Palladium",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante ornare sed iaculis turpis aenean. Neque viverra adipiscing.",
    icon: <Gem className="w-8 h-8 text-slate-900" />,
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Services <span className="text-amber-500">We Offer</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Lorem ipsum dolor sit amet consectetur. Ante ornare sed iaculis
            turpis aenean. Neque viverra adipiscing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl flex flex-col items-center text-center transition-all hover:bg-slate-800/60 hover:border-slate-600 group"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
