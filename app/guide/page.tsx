import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ShieldCheck, TrendingUp, Wallet } from "lucide-react";

export default function GuidePage() {
  const guides = [
    {
      title: "Getting Started with Gold",
      description: "Learn the fundamentals of investing in physical gold, from understanding purity to choosing between coins and bars.",
      icon: <Wallet className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Silver Investment Strategies",
      description: "Explore why silver is often called the 'poor man's gold' and how to leverage its industrial demand for profit.",
      icon: <TrendingUp className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Storage and Security",
      description: "A comprehensive guide on how to keep your precious metals safe, including vaulting options and home insurance.",
      icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
    },
    {
      title: "Market Analysis 101",
      description: "How to read market charts and understand the global economic factors that influence precious metal prices.",
      icon: <BookOpen className="w-8 h-8 text-amber-500" />,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <Hero
        title={
          <>
            <span className="text-amber-500">Gold</span> and <span className="text-slate-300">Silver</span> Guide
          </>
        }
        description="Your comprehensive resource for mastering precious metals investment and wealth protection."
        backgroundImage="https://images.unsplash.com/photo-1589753123714-c9c8827405b3?q=80&w=2070&auto=format&fit=crop"
        showButtons={true}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Essential Investor Guides</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Whether you're a first-time buyer or an experienced investor, our expert-crafted guides provide
              the knowledge you need to navigate the gold and silver markets with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-amber-500/50 transition-all group"
              >
                <div className="mb-6 p-3 bg-slate-800 rounded-xl w-fit group-hover:bg-amber-500/10 transition-colors">
                  {guide.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {guide.description}
                </p>
                <button className="text-amber-500 font-bold flex items-center hover:text-amber-400 transition-colors">
                  Read Guide
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Need Personalized Advice?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Our specialists are available to discuss your investment goals and help you build a
              portfolio that matches your risk profile.
            </p>
            <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-amber-900/20">
              Speak with a Consultant
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
