"use client";

import Link from "next/link";
import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    "Quick links": [
      { name: "About Us", href: "/" },
      { name: "Teams", href: "/" },
      { name: "Services", href: "/" },
      { name: "Features", href: "/" },
    ],
    Support: [
      { name: "Terms & Conditions", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "FAQs", href: "/" },
      { name: "Support Center", href: "/" },
    ],
    Company: [
      { name: "Careers", href: "/" },
      { name: "Updates", href: "/" },
      { name: "Job", href: "/" },
      { name: "Announce", href: "/" },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Youtube size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tight mb-6 inline-block">
              <span className="text-white">Trade</span>
              <span className="text-amber-500">Gold</span>
              <span className="text-slate-300">&</span>
              <span className="text-slate-300">Silver</span>
            </Link>
            <p className="text-slate-500 mb-8 max-w-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold text-lg mb-6">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-amber-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-900 text-center">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} designed by <span className="text-white font-medium">Thetork</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
