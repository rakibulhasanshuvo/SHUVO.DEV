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
    <main className="w-full min-h-screen bg-black text-white px-6 md:px-12 py-20 relative overflow-hidden font-satoshi">
      {/* Background Grids and Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#A100FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* ==========================================
            📣 ASYMMETRICAL COMMAND HERO GRID
           ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-white/5">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00F0FF] uppercase px-3 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full">
                SYS CONNECTION: SECURE // OPERATOR ONLINE
              </span>
            </div>
            <h1 className="font-clash font-extrabold text-5xl sm:text-6xl text-white tracking-tight leading-none">
              Let&apos;s Build Something Elite
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/5 flex flex-col justify-center h-full text-left">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold block mb-2">
              ESTIMATOR & TRANSMISSION TUNNEL
            </span>
            <p className="text-zinc-400 font-satoshi text-base font-normal leading-relaxed">
              Have a high-end application or conversion workflow? Use my dynamic quote stepper or contact form to initiate a direct pipeline review.
            </p>
          </div>
        </section>

        {/* ==========================================
            💻 TOP ROW: 2-COLUMN SYMMETRIC INTERACTION
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Column 1: Stepper Configurator (Generous 50% width) */}
          <div className="flex flex-col h-full">
            <QuoteConfigurator onSelectSummary={setQuoteSummary} />
          </div>

          {/* Column 2: Details Transmission Form (Generous 50% width) */}
          <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-3xl border border-white/5 bg-[#060608]/90 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div>
              <h3 className="font-clash font-bold text-xl text-white mb-5 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
                Transmission Details
              </h3>
              
              <div className="space-y-4">
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

                {quoteSummary && (
                  <div className="p-3 bg-[#00F0FF]/5 border border-[#00F0FF]/25 rounded-xl">
                    <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#00F0FF] block font-bold">Active Estimator Configuration</span>
                    <p className="text-white text-xs font-mono mt-1 font-semibold leading-relaxed">{quoteSummary}</p>
                  </div>
                )}

                <GlowingTextArea
                  id="client-message"
                  label="Case Specifications"
                  placeholder="Outline your application requirements, database details, timeline milestones, or design structures…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={3}
                />
              </div>
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

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 mt-6">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00F0FF] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00F0FF]/90 active:bg-[#00F0FF]/85 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-300 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
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

        {/* ==========================================
            📊 BOTTOM ROW: 3-COLUMN METRICS BENTO ROW
           ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          
          {/* Card 1: Upwork JSS Certificate */}
          <div className="glass p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0C0C0E]/90 to-[#040405]/95 relative overflow-hidden shadow-xl group hover:border-[#FBBF24]/20 transition-all duration-300 flex flex-col justify-between min-h-[180px]">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#FBBF24]/5 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FBBF24] to-[#D97706] flex items-center justify-center text-xl shadow-[0_0_20px_rgba(251,191,36,0.15)] select-none">
                🎖️
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] block">Upwork Verified</span>
                <span className="text-white text-base font-clash font-bold block mt-0.5">100% Job Success Score</span>
              </div>
            </div>
            <p className="text-zinc-400 font-satoshi text-xs font-normal leading-relaxed mt-4 relative z-10">
              Maintained an impeccable rating executing Next.js builds, Figma translations, and reliable back-end workflows for clients.
            </p>
          </div>

          {/* Card 2: GitHub Telemetry Pulse */}
          <div className="glass p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0C0C0E]/90 to-[#040405]/95 relative overflow-hidden shadow-xl group hover:border-[#00F0FF]/15 transition-all duration-300 flex flex-col justify-between min-h-[180px]">
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div>
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] block">Open Source Pulse</span>
                <span className="text-white text-base font-clash font-bold block mt-0.5">Active Commit Pipelines</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[8px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </div>
            </div>
            
            {/* Matrix Heatmap */}
            <div className="grid grid-cols-12 gap-1 bg-black/60 p-2.5 rounded-xl border border-white/5 relative z-10">
              {Array.from({ length: 24 }).map((_, idx) => {
                const states = [
                  "bg-white/5 border border-white/5",
                  "bg-emerald-950/40 border border-emerald-950/50",
                  "bg-emerald-800/40 border border-emerald-800/50",
                  "bg-emerald-500/40 border border-emerald-500/60 shadow-[0_0_4px_rgba(16,185,129,0.1)]",
                  "bg-emerald-400/60 border border-emerald-400/80 shadow-[0_0_6px_rgba(52,211,153,0.2)]",
                ];
                const stateIdx = (idx * 23 + 19) % states.length;
                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-[2px] ${states[stateIdx]} transition-colors duration-300 hover:bg-[#00F0FF] hover:border-[#00F0FF] cursor-crosshair`}
                  />
                );
              })}
            </div>
            
            <div className="flex justify-between items-center pt-2.5 border-t border-white/5 font-mono text-[8px] text-zinc-500 uppercase tracking-widest font-bold relative z-10">
              <span>TEL INDEX: 100% OK</span>
              <span className="text-[#00F0FF]">2,412 STABLE COMMITS</span>
            </div>
          </div>

          {/* Card 3: Alternate Hotlinks */}
          <div className="glass p-6 rounded-3xl border border-white/5 bg-[#060608] shadow-xl flex flex-col justify-between min-h-[180px]">
            <h4 className="font-clash font-bold text-sm text-white uppercase tracking-widest px-1">Alternate Hotlinks</h4>
            
            <div className="space-y-2 mt-3">
              <a
                href="https://github.com/rakibulhasanshuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-[#00F0FF] hover:bg-[#00F0FF]/5 transition-colors duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm select-none">🌐</span>
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">GitHub Profile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-500 group-hover:text-[#00F0FF] font-mono">/rakibulhasanshuvo</span>
                  <span className="text-zinc-600 group-hover:text-[#00F0FF] transition-colors font-mono text-xs">→</span>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-[#A100FF] hover:bg-[#A100FF]/5 transition-colors duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm select-none">💼</span>
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">LinkedIn Profile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-500 group-hover:text-[#A100FF] font-mono">Verify</span>
                  <span className="text-zinc-600 group-hover:text-[#A100FF] transition-colors font-mono text-xs">→</span>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
