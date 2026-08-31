import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trading Gold and Silver Online | Buy & Sell Precious Metals",
  description:
    "Experience the best place to buy and sell gold and silver online.",
  keywords: [
    "trading gold",
    "buy silver online",
    "gold bullion",
    "precious metals trading",
    "BullionVault affiliate",
  ],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Roadmap />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
