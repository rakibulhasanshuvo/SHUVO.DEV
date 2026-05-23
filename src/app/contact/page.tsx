"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowingInput, GlowingTextArea } from "@/components/GlowingInput";
import QuoteConfigurator from "@/components/QuoteConfigurator";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [quoteSummary, setQuoteSummary] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          quoteSummary,
          confirm_corporate_website: honeypot, // Honeypot field
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setResponseMsg(data.message);
        // Reset form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Submission rejected.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setResponseMsg("Network compilation timeout.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white px-4 md:px-8 py-12 relative overflow-hidden">
      {/* Background Grids and Accent Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#A100FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Title Block */}
        <section className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="text-[#A100FF] font-mono text-xs uppercase tracking-widest px-3 py-1 bg-[#A100FF]/10 rounded-full border border-[#A100FF]/20">
              Open a Secure Connection
            </span>
            <h1 className="font-cabinet font-bold text-4xl md:text-6xl text-white mt-4 tracking-tight leading-tight">
              Let&apos;s Build Something Elite
            </h1>
            <p className="text-gray-400 font-satoshi text-base md:text-xl font-light mt-4 max-w-2xl leading-relaxed">
              Have a high-end application or conversion workflow? Use my dynamic quote stepper or contact form to initiate a direct pipeline review.
            </p>
          </motion.div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Column: Form & Stepper (span 3) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stepper calculator (Moved to top for better UX flow) */}
            <div className="relative">
              <QuoteConfigurator onSelectSummary={setQuoteSummary} />
              {/* Visual connector to form */}
              <div className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2 flex-col items-center justify-center pointer-events-none">
                 <div className="w-px h-8 bg-gradient-to-b from-[#00F0FF]/40 to-transparent"></div>
                 <div className="w-2 h-2 rounded-full bg-[#00F0FF]/50 blur-[2px] mt-[-2px]"></div>
                 <div className="w-1 h-1 rounded-full bg-[#00F0FF] absolute bottom-0"></div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-3xl border border-white/10 bg-[#060608] space-y-6 relative">
              <h3 className="font-cabinet font-bold text-xl text-white mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>Transmission Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlowingInput
                  id="client-name"
                  label="Your Name"
                  placeholder="e.g. Satoshi Nakamoto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                
                <GlowingInput
                  id="client-email"
                  label="Corporate Email"
                  type="email"
                  placeholder="e.g. satoshi@bitcoin.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Honeypot Input: Hidden from legitimate users */}
              <div className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none -z-50">
                <input
                  type="text"
                  id="confirm_corporate_website"
                  name="confirm_corporate_website"
                  placeholder="Leave this empty"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {quoteSummary && (
                <div className="p-3 bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-xl">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#00F0FF] block">Active Estimator Configuration</span>
                  <p className="text-white text-xs font-mono mt-1 font-light leading-relaxed">{quoteSummary}</p>
                </div>
              )}

              <GlowingTextArea
                id="client-message"
                label="Case Specifications"
                placeholder="Outline your application requirements, database details, timeline milestones, or design structures…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00F0FF] text-black font-cabinet font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Compiling Submission…" : "Transmit Payload"}
                </button>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-xs font-mono text-[#00F0FF]"
                    >
                      ✓ {responseMsg}
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="text-xs font-mono text-red-500"
                    >
                      ⚠ {responseMsg}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>

          </div>

          {/* Right Column: High-End Metrics / Status indicators (span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upwork JSS Certificate Card */}
            <div className="glass p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0c0e] to-[#040405] relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#FBBF24]/5 rounded-full blur-[50px] pointer-events-none" />
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FBBF24] to-[#F59E0B]/80 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  🎖️
                </div>
                <div>
                  <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest block">Upwork Verified</span>
                  <span className="text-white text-base font-cabinet font-bold block mt-0.5">100% Job Success Score</span>
                </div>
              </div>
              <p className="text-gray-400 font-satoshi text-xs font-light leading-relaxed mt-4">
                Maintained an impeccable performance rating executing custom Next.js configurations, pixel-perfect Figma translations, and reliable back-end workflows for worldwide clients.
              </p>
            </div>

            {/* GitHub Contributions Card */}
            <div className="glass p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0c0e] to-[#040405] relative overflow-hidden shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest block">Open Source Pulse</span>
                  <span className="text-white text-base font-cabinet font-bold block mt-0.5">Active Commit Pipelines</span>
                </div>
                <span className="text-[11px] bg-green-500/10 text-green-400 font-mono py-0.5 px-2 rounded border border-green-500/20">
                  Online
                </span>
              </div>
              
              {/* Fake aesthetic heat map of commits */}
              <div className="grid grid-cols-12 gap-1 bg-black/40 p-3 rounded-lg border border-white/5 pointer-events-none">
                {Array.from({ length: 48 }).map((_, idx) => {
                  const states = ["bg-white/5", "bg-green-950", "bg-green-800", "bg-green-600", "bg-green-400"];
                  const stateIdx = (idx * 7 + 13) % states.length;
                  return (
                    <div
                      key={idx}
                      className={`aspect-square rounded-sm ${states[stateIdx]} transition-all duration-300 hover:scale-125`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-gray-600 mt-3 px-1">
                <span>Less Commits</span>
                <span>More Neon Commits</span>
              </div>
            </div>

            {/* Direct Channels list */}
            <div className="glass p-6 rounded-2xl border border-white/10 bg-[#060608] space-y-4">
              <h4 className="font-cabinet font-bold text-sm text-white uppercase tracking-wider mb-2">Alternate Hotlinks</h4>
              
              <a
                href="https://github.com/rakibulhasanshuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#00F0FF] hover:bg-[#00F0FF]/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base select-none">🌐</span>
                  <span className="text-xs font-mono text-gray-300 group-hover:text-white transition-colors">GitHub profile</span>
                </div>
                <span className="text-xs text-gray-600 group-hover:text-[#00F0FF] font-mono">/rakibulhasanshuvo</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#A100FF] hover:bg-[#A100FF]/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base select-none">💼</span>
                  <span className="text-xs font-mono text-gray-300 group-hover:text-white transition-colors">LinkedIn profile</span>
                </div>
                <span className="text-xs text-gray-600 group-hover:text-[#A100FF] font-mono">Verify credentials</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
