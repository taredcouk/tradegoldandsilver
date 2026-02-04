"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2 } from "lucide-react";

const Subscribe = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    acceptedTerms: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.acceptedTerms === true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setFormData({ firstName: "", lastName: "", email: "", acceptedTerms: false });
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-amber-500 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl shadow-amber-500/20"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-amber-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-amber-600/30 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left side: Graphic */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-slate-950 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${i * 60}deg) translate(80px) rotate(-${i * 60}deg)`,
                    }}
                  />
                ))}
              </motion.div>
              <div className="relative bg-slate-950 p-6 rounded-full shadow-inner shadow-amber-500/50">
                <Mail size={64} className="text-amber-500" />
              </div>
            </div>

            {/* Right side: Content */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-4 uppercase tracking-tighter">
                Subscribe <span className="opacity-80">TO OUR AWESOME NEWS</span>
              </h2>
              <p className="text-slate-900 font-medium mb-8 max-w-md">
                Hey! Are you tired of missing out on our updates? Subscribe to our news now and stay in the loop!
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white text-slate-950 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950/50 font-medium placeholder:text-slate-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white text-slate-950 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950/50 font-medium placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow relative">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white text-slate-950 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-950/50 font-medium placeholder:text-slate-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!isFormValid || status === "loading"}
                      className={`px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap ${
                        isFormValid && status !== "loading"
                          ? "bg-slate-950 text-amber-500 hover:bg-slate-900"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {status === "loading" ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>Submit <Send size={18} /></>
                      )}
                    </button>
                  </div>

                  {/* Checkbox and Label */}
                  <div className="flex items-start gap-3 mt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      checked={formData.acceptedTerms}
                      onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-slate-900 text-slate-950 focus:ring-slate-950"
                    />
                    <label htmlFor="terms" className="text-sm font-medium text-slate-900 leading-tight">
                      *By submit this form you accept our terms and conditions
                    </label>
                  </div>
                </div>

                {status === "success" && (
                  <p className="text-slate-950 font-bold text-sm bg-white/30 p-3 rounded-lg border border-white/50">
                    {message}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-800 font-bold text-sm bg-red-100/50 p-3 rounded-lg border border-red-200">
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscribe;
