import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Roadmap from "@/components/Roadmap";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

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
        <FAQ />
        <Subscribe />
      </main>

      <Footer />
    </div>
  );
}
