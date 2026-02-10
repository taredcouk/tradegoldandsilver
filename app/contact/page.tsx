"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <Hero
        title={
          <>
            Contact <span className="text-amber-500">Us</span>
          </>
        }
        description="Have questions about gold and silver trading? Our team is here to help you every step of the way."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2070&auto=format&fit=crop"
        showButtons={false}
      />

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                Whether you're looking for account assistance, market insights, or technical support,
                our specialists are ready to assist you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-amber-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                    <p className="text-slate-400">support@tradegoldandsilver.online</p>
                    <p className="text-slate-400">info@tared.co.uk</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-amber-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                    <p className="text-slate-400">+44 (0) 20 1234 5678</p>
                    <p className="text-slate-500 text-sm mt-1">Mon-Fri: 9am - 6pm GMT</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-amber-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Visit Us</h3>
                    <p className="text-slate-400">123 Bullion Plaza, City of London</p>
                    <p className="text-slate-400">London, EC1A 1BB, United Kingdom</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 p-8 bg-amber-600/10 border border-amber-600/20 rounded-2xl">
                <h4 className="text-amber-500 font-bold mb-2">Institutional Inquiries</h4>
                <p className="text-slate-400 text-sm">
                  For corporate partnerships and high-net-worth individual services, please contact our
                  private wealth team at <span className="text-white font-medium">private@tared.co.uk</span>.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-900 p-8 lg:p-12 rounded-3xl border border-slate-800">
              {status === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-slate-400 mb-8">
                    Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-amber-500 font-bold hover:text-amber-400 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-400">Full Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-400">Email Address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-400">Subject</label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-400">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                        placeholder="Your message here..."
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-3"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
