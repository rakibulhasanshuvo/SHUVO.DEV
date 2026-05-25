"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import PricingCards from "@/components/PricingCards";
import QuoteConfigurator from "@/components/QuoteConfigurator";
import FaqAccordion from "@/components/FaqAccordion";
import ClientReviews from "@/components/ClientReviews";
import { GlowingInput, GlowingTextArea } from "@/components/GlowingInput";

export default function HireMePage() {
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
        setResponseMsg(data.message || "Onboarding brief transmitted successfully!");
        // Reset inputs
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Brief transmission failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setResponseMsg("Transmission compile timeout.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white px-6 md:px-12 py-10 relative overflow-hidden font-satoshi">
      {/* Dynamic Cyber background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Glowing luxury gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#A100FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* ==========================================
            📣 COMMAND TELEMETRY HERO SECTION
           ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-white/5">
          <div className="lg:col-span-8 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-[0.22em] text-[#00F0FF] uppercase px-3 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full">
                SYS STATUS: accepting select projects q3 2026
              </span>
            </div>
            
            <h1 className="font-clash font-extrabold text-5xl sm:text-7xl text-white tracking-tight leading-none">
              Let&apos;s Build <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-500 to-electric-purple animate-gradient drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                Something Elite
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-white/5 flex flex-col justify-center h-full text-left pt-4 lg:pt-0">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold block mb-2">
              COMMISSION SCOPING CHANNEL
            </span>
            <p className="text-zinc-400 font-satoshi text-base font-normal leading-relaxed">
              Translate your premium designs, launch fully scaled dynamic applications, or engineer complex web animations. Utilize the compiler brief estimator below to establish custom metrics.
            </p>
          </div>
        </section>

        {/* ==========================================
            💰 SERVICE TIERS & PRICING
           ========================================== */}
        <section className="space-y-4">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-bold">01 // ESTIMATE ARCHITECTURES</span>
            <h2 className="font-cabinet font-bold text-3xl sm:text-5xl text-white">Service Packages</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-light">
              Hover on cards to inspect standard scopes. Click any tier below to load pre-set values in the project constructor checklist.
            </p>
          </div>
          
          <div className="relative">
            <PricingCards />
          </div>
        </section>

        {/* ==========================================
            📈 WORKFLOW TIMELINE PIPELINE
           ========================================== */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#A100FF] uppercase font-bold">02 // STRATEGIC PIPELINE</span>
            <h2 className="font-cabinet font-bold text-3xl sm:text-5xl text-white">The Engineering Cycle</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-light">
              Rigorous execution structure from initial layout strategy directly to zero-downtime deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                num: "01",
                title: "Brief & Strategy",
                desc: "Establish functional layout scopes, wireframe benchmarks, data structures, and tech specs.",
                glow: "group-hover:border-[#00F0FF]/30",
              },
              {
                num: "02",
                title: "Database Modeling",
                desc: "Design strict schemas (PostgreSQL/Supabase), security keys, auth routes, and query logic.",
                glow: "group-hover:border-[#A100FF]/30",
              },
              {
                num: "03",
                title: "Elite Production",
                desc: "Write premium, type-safe Next.js code optimized using modern styling layers and responsive viewports.",
                glow: "group-hover:border-[#00F0FF]/30",
              },
              {
                num: "04",
                title: "Handover & Deploy",
                desc: "Validate 100/100 Lighthouse specs, hook up search schemas, and deploy live pipelines on Vercel.",
                glow: "group-hover:border-[#A100FF]/30",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.01] to-[#040405] relative overflow-hidden group hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-cabinet font-extrabold text-3xl text-zinc-700 block mb-4 group-hover:text-white/20 transition-colors">
                    {step.num}
                  </span>
                  <h4 className="font-cabinet font-bold text-lg text-white mb-2">{step.title}</h4>
                  <p className="text-zinc-400 font-satoshi text-xs leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            🛠️ ESTIMATOR CONFIGURATOR & BRIEF FORM
           ========================================== */}
        <section id="brief" className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase font-bold">03 // DYNAMIC BRIEF CONFIGURATION</span>
            <h2 className="font-cabinet font-bold text-3xl sm:text-5xl text-white">Project Blueprint Builder</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-light">
              Use our live scoping dashboard to compute custom investments and instantly transmit structural specifications to the compiler terminal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Scoping Configurator Panel */}
            <div className="lg:col-span-6 flex flex-col h-full">
              <QuoteConfigurator onSelectSummary={setQuoteSummary} />
            </div>

            {/* Transmission Form */}
            <div className="lg:col-span-6">
              <form
                onSubmit={handleSubmit}
                className="glass p-6 md:p-8 rounded-3xl border border-white/5 bg-[#060608]/90 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                <div className="space-y-6">
                  <h3 className="font-clash font-bold text-xl text-white flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
                    Transmission Logs
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <GlowingInput
                        id="onboard-name"
                        label="Your Name"
                        placeholder="e.g. Satoshi Nakamoto"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      
                      <GlowingInput
                        id="onboard-email"
                        label="Corporate Email"
                        type="email"
                        placeholder="e.g. satoshi@bitcoin.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    {quoteSummary && (
                      <div className="p-3 bg-[#00F0FF]/5 border border-[#00F0FF]/20 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-1 bg-[#00F0FF]" />
                        <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#00F0FF] block font-bold">
                          Active Telemetry Configuration
                        </span>
                        <p className="text-zinc-200 text-xs font-mono mt-1 font-medium leading-relaxed">
                          {quoteSummary}
                        </p>
                      </div>
                    )}

                    <GlowingTextArea
                      id="onboard-message"
                      label="Application Specifications"
                      placeholder="Detail your requirements, milestones, scraper systems, design wireframes, or custom admin boards…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                    />
                  </div>
                </div>

                {/* Honeypot Input: Hidden from humans */}
                <div className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none -z-50">
                  <input
                    type="text"
                    id="confirm_corporate_website"
                    name="confirm_corporate_website"
                    placeholder="Do not fill"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 mt-6 border-t border-white/5">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00F0FF] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00F0FF]/90 active:bg-[#00F0FF]/85 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-300 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                  >
                    {status === "loading" ? "Compiling Submission…" : "Transmit Payload"}
                  </button>

                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <m.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xs font-mono text-[#00F0FF] font-bold"
                      >
                        ✓ {responseMsg}
                      </m.span>
                    )}
                    {status === "error" && (
                      <m.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xs font-mono text-red-500 font-bold"
                      >
                        ⚠ {responseMsg}
                      </m.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>

          </div>
        </section>

        {/* ==========================================
            🤝 SOCIAL PROOF & REVIEWS
           ========================================== */}
        <section className="space-y-4">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#A100FF] uppercase font-bold">04 // TELEMETRY REVIEWS</span>
            <h2 className="font-cabinet font-bold text-3xl sm:text-5xl text-white">Client Testimonials</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-light">
              Verified outcomes from organizations and clients worldwide.
            </p>
          </div>
          
          <ClientReviews />
        </section>

        {/* ==========================================
            💬 RESOLVE DILEMMAS // FAQ ACCORDION
           ========================================== */}
        <section className="space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase font-bold">05 // RESOLVE CONSTRAINTS</span>
            <h2 className="font-cabinet font-bold text-3xl sm:text-5xl text-white">Frequently Asked Questions</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-light">
              Got specific licensing, maintenance, or revision questions? Inspect options below.
            </p>
          </div>

          <FaqAccordion />
        </section>

      </div>
    </main>
  );
}
