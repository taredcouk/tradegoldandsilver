import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Roadmap from "@/components/Roadmap";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "Trading Gold and Silver Online | Buy & Sell Precious Metals",
  description: "Experience the best place to buy and sell gold and silver online. Secure, professional-grade bullion trading for everyone with BullionVault.",
  keywords: ["trading gold", "buy silver online", "gold bullion", "precious metals trading", "BullionVault affiliate"],
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Roadmap />
      </main>

      {/* Footer Placeholder */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Trade Gold & Silver. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
