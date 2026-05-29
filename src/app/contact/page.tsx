"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { GlowingInput, GlowingTextArea } from "@/components/GlowingInput";
import QuoteConfigurator from "@/components/QuoteConfigurator";
import PricingCards from "@/components/PricingCards";
import ClientReviews from "@/components/ClientReviews";
import FaqAccordion from "@/components/FaqAccordion";

const subjectMap: Record<string, string> = {
  general: "General Inquiry / Question",
  hello: "Saying Hello / Networking",
  project: "Custom Project Scoping",
  bug: "Bug Report / Site Issue",
};

function ContactPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Mode state: blueprint (stepper) vs general (simple form)
  const [mode, setMode] = useState<"blueprint" | "general">("general");
  const [preselectedTier, setPreselectedTier] = useState<number | undefined>(undefined);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("general");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [quoteSummary, setQuoteSummary] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  // Sync mode from searchParams (?mode=blueprint or ?mode=general)
  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "blueprint") {
      setMode("blueprint");
    } else if (urlMode === "general") {
      setMode("general");
    }
  }, [searchParams]);

  const handleSelectTier = (tierIndex: number) => {
    setMode("blueprint");
    setPreselectedTier(tierIndex);

    // Sync search parameter in URL silently
    const params = new URLSearchParams(window.location.search);
    params.set("mode", "blueprint");
    router.replace(`/contact?${params.toString()}`, { scroll: false });

    // Smooth scroll to builder constructor
    setTimeout(() => {
      const builderSection = document.getElementById("builder-section");
      if (builderSection) {
        builderSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const handleModeChange = (newMode: "blueprint" | "general") => {
    setMode(newMode);
    setStatus("idle");
    setResponseMsg("");

    const params = new URLSearchParams(window.location.search);
    params.set("mode", newMode);
    router.replace(`/contact?${params.toString()}`, { scroll: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const finalQuoteSummary = mode === "blueprint"
      ? quoteSummary
      : `General Inquiry | Subject: ${subjectMap[subject]}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          quoteSummary: finalQuoteSummary,
          website_url: honeypot, // Honeypot field
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setResponseMsg(data.message || "Transmission compiled successfully!");
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
    <main className="w-full min-h-screen bg-black text-white px-6 md:px-12 py-10 relative overflow-hidden font-satoshi">
      {/* Background Grids and Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#A100FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
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
            <h1 className="font-clash font-extrabold text-5xl sm:text-7xl text-white tracking-tight leading-none">
              Let&apos;s Build <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-500 to-electric-purple animate-gradient drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                Something Elite
              </span>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/5 flex flex-col justify-center h-full text-left pt-4 lg:pt-0">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold block mb-2">
              ESTIMATOR & TRANSMISSION TUNNEL
            </span>
            <p className="text-zinc-400 font-satoshi text-base font-normal leading-relaxed">
              Translate your custom layout designs, deploy fully encapsulated APIs, or optimize web architectures. Use my pricing selector and dynamic blueprint builder to establish project milestones.
            </p>
          </div>
        </section>

        {/* ==========================================
            💰 SERVICE TIERS & PRICING
           ========================================== */}
        <section id="pricing" className="space-y-4 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-bold">01 // ESTIMATE ARCHITECTURES</span>
            <h2 className="font-cabinet font-bold text-3xl sm:text-5xl text-white">Service Packages</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-light">
              Hover on cards to inspect standard scopes. Click any tier below to automatically scroll and pre-select values in the blueprint configurator.
            </p>
          </div>
          
          <div className="relative">
            <PricingCards onSelectTier={handleSelectTier} />
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
              },
              {
                num: "02",
                title: "Database Modeling",
                desc: "Design strict schemas (PostgreSQL/Supabase), security keys, auth routes, and query logic.",
              },
              {
                num: "03",
                title: "Elite Production",
                desc: "Write premium, type-safe Next.js code optimized using modern styling layers and responsive viewports.",
              },
              {
                num: "04",
                title: "Handover & Deploy",
                desc: "Validate 100/100 Lighthouse specs, hook up search schemas, and deploy live pipelines on Vercel.",
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
                  <p className="text-zinc-400 font-satoshi text-xs leading-relaxed font-light font-satoshi">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            🎛️ DYNAMIC HUB MODE SWITCHER
           ========================================== */}
        <section id="builder-section" className="max-w-4xl mx-auto text-center space-y-6 pt-12 scroll-mt-24">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#00F0FF] uppercase font-bold block">03 // DYNAMIC BRIEF CONFIGURATION</span>
          <h2 className="font-cabinet font-bold text-3xl sm:text-5xl text-white">Choose Interaction Pipeline</h2>
          
          <div className="inline-flex p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md relative z-10 select-none">
            <button
              type="button"
              onClick={() => handleModeChange("general")}
              className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                mode === "general" ? "text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              {mode === "general" && (
                <m.div
                  layoutId="active-mode-glider"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              General Message
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("blueprint")}
              className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                mode === "blueprint" ? "text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              {mode === "blueprint" && (
                <m.div
                  layoutId="active-mode-glider"
                  className="absolute inset-0 bg-gradient-to-r from-neon-cyan/40 to-neon-cyan rounded-full border border-neon-cyan/20 shadow-[0_0_15px_rgba(0,240,255,0.2)] z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              Project Blueprint Builder
            </button>
          </div>
        </section>

        {/* ==========================================
            💻 INTERACTION ROW: 2-COLUMN HUB
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Column 1: Configurator Stepper OR Custom Info Deck */}
          <div className="flex flex-col h-full min-h-[300px]">
            <AnimatePresence mode="wait">
              {mode === "blueprint" ? (
                <m.div
                  key="blueprint-stepper"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <QuoteConfigurator
                    onSelectSummary={setQuoteSummary}
                    preselectedTier={preselectedTier}
                  />
                </m.div>
              ) : (
                <m.div
                  key="general-infodeck"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="glass p-6 md:p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-[#0B0B0D] to-[#040405] relative overflow-hidden flex flex-col justify-between h-full min-h-[320px] shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#A100FF]/5 rounded-full blur-[60px] pointer-events-none" />
                  
                  <div className="space-y-6">
                    <h3 className="font-cabinet font-bold text-xl text-white flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#A100FF] animate-pulse"></span>
                      Let&apos;s Connect
                    </h3>
                    <p className="text-zinc-400 font-satoshi text-sm leading-relaxed font-light">
                      Want to say hello, propose networking opportunities, inquire about custom scripts, or report a bug on this platform? Toggle this quick message desk. 
                    </p>
                    
                    <div className="space-y-4 font-mono text-[11px] text-zinc-500">
                      <div className="flex items-center gap-3 py-2 border-b border-white/5">
                        <span className="text-sm select-none">⚡</span>
                        <span>AVERAGE RESPONSE TIME: &lt; 24 HOURS</span>
                      </div>
                      <div className="flex items-center gap-3 py-2 border-b border-white/5">
                        <span className="text-sm select-none">💬</span>
                        <span>DIRECT LINE: contact@rakibulhasanshuvo.com</span>
                      </div>
                      <div className="flex items-center gap-3 py-2 border-b border-white/5">
                        <span className="text-sm select-none">🗺️</span>
                        <span>OPERATOR REGION: Dhaka, Bangladesh (UTC+6)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 font-mono text-[10px] text-zinc-600 block mt-auto uppercase tracking-widest">
                    SYS INQUIRY PROTOCOL // ACTIVE
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Column 2: Details Transmission Form (Dynamic according to mode) */}
          <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-3xl border border-white/5 bg-[#060608]/90 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[350px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div>
              <h3 className="font-clash font-bold text-xl text-white mb-5 flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full animate-pulse ${mode === "blueprint" ? "bg-[#00F0FF]" : "bg-[#A100FF]"}`}></span>
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

                {mode === "general" && (
                  <div className="flex flex-col gap-1.5 text-left">
                    <label htmlFor="client-subject" className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                      Reason for Reach-out
                    </label>
                    <div className="relative w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 font-mono text-xs text-white focus-within:border-[#A100FF] transition-colors">
                      <select
                        id="client-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-transparent focus:outline-none appearance-none cursor-pointer pr-8"
                      >
                        <option value="general" className="bg-[#0c0d0e]">General Inquiry / Question</option>
                        <option value="hello" className="bg-[#0c0d0e]">Saying Hello / Networking</option>
                        <option value="project" className="bg-[#0c0d0e]">Custom Project Scoping</option>
                        <option value="bug" className="bg-[#0c0d0e]">Bug Report / Site Issue</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 font-mono text-[9px]">
                        ▼
                      </div>
                    </div>
                  </div>
                )}

                {mode === "blueprint" && quoteSummary && (
                  <div className="p-5 rounded-2xl border border-[#00F0FF]/20 bg-[#00F0FF]/[0.02] shadow-[0_0_25px_rgba(0,240,255,0.02)] relative overflow-hidden space-y-3">
                    {/* Dynamic Background diagonal lines grid watermark */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,240,255,0.015)_25%,transparent_25%,transparent_50%,rgba(0,240,255,0.015)_50%,rgba(0,240,255,0.015)_75%,transparent_75%,transparent)] bg-[size:8px_8px] pointer-events-none" />
                    
                    <div className="flex items-center gap-1.5 relative z-10">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00F0FF]"></span>
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#00F0FF] font-bold">Active Estimator Telemetry</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                      {quoteSummary.split(" | ").map((part, idx) => {
                        const firstColon = part.indexOf(":");
                        if (firstColon === -1) {
                          return (
                            <div key={idx} className="col-span-2 p-2.5 rounded-xl border border-white/5 bg-black/40 font-mono text-[10px] text-zinc-300">
                              {part}
                            </div>
                          );
                        }
                        const label = part.substring(0, firstColon).trim();
                        const val = part.substring(firstColon + 1).trim();
                        const isPrice = label.toLowerCase().includes("investment") || val.startsWith("$");

                        return (
                          <div 
                            key={idx} 
                            className={`p-3 rounded-xl border transition-all duration-300 hover:border-white/10 ${
                              isPrice 
                                ? "border-emerald-500/25 bg-emerald-500/[0.03] col-span-2 shadow-[0_0_15px_rgba(16,185,129,0.02)]" 
                                : "border-white/5 bg-black/45"
                            }`}
                          >
                            <span className={`block text-[8px] font-mono uppercase tracking-widest text-zinc-500 font-bold mb-1 ${
                              isPrice ? "text-emerald-500/70" : ""
                            }`}>
                              {label}
                            </span>
                            <span className={`font-mono text-[11px] font-bold text-white tracking-tight ${
                              isPrice ? "text-emerald-400 text-sm font-cabinet font-extrabold" : ""
                            }`}>
                              {val}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <GlowingTextArea
                  id="client-message"
                  label={mode === "blueprint" ? "Case Specifications" : "Your Message"}
                  placeholder={mode === "blueprint" ? "Outline your application requirements, database details, timeline milestones, or design structures…" : "Enter your message here, including as many details as possible…"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={3}
                />
              </div>
            </div>

            {/* Honeypot Input: Hidden from legitimate users */}
            <div 
              style={{ position: "absolute", left: "-9999px", top: "-9999px" }} 
              aria-hidden="true"
            >
              <input
                type="text"
                id="website_url"
                name="website_url"
                placeholder="Leave this empty"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 mt-6 border-t border-white/5">
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className={`group relative w-full sm:w-auto px-9 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-white border shadow-[0_0_25px_rgba(0,240,255,0.05)] ${
                  mode === "blueprint" ? "border-[#00F0FF]/30" : "border-[#A100FF]/30"
                }`}
              >
                {/* Glowing Laser hover border overlays */}
                <div className={`absolute inset-0 bg-gradient-to-r opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${
                  mode === "blueprint"
                    ? "from-neon-cyan via-blue-500 to-electric-purple"
                    : "from-electric-purple via-pink-500 to-neon-cyan"
                }`} />
                <div className={`absolute -inset-0.5 rounded-xl blur-md opacity-30 group-hover:opacity-75 transition-opacity duration-300 bg-gradient-to-r ${
                  mode === "blueprint" ? "from-neon-cyan to-electric-purple" : "from-electric-purple to-neon-cyan"
                }`} />
                <div className="absolute inset-[1.5px] bg-[#060608] rounded-[10px] group-hover:bg-[#060608]/40 transition-colors duration-300" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-mono">
                  {status === "loading" ? "Compiling Submission…" : "Transmit Payload"}
                  <svg className={`w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300 ${
                    mode === "blueprint" ? "text-neon-cyan" : "text-[#A100FF]"
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
                
                {/* Holographic light sweep shimmer */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
              </m.button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <m.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={`text-xs font-mono font-bold ${mode === "blueprint" ? "text-[#00F0FF]" : "text-[#A100FF]"}`}
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
                href="https://linkedin.com/in/rakibulhasanshuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-[#A100FF] hover:bg-[#A100FF]/5 transition-colors duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm select-none">💼</span>
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">LinkedIn Profile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-500 group-hover:text-[#A100FF] font-mono">/rakibulhasanshuvo</span>
                  <span className="text-zinc-600 group-hover:text-[#A100FF] transition-colors font-mono text-xs">→</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* ==========================================
            🤝 SOCIAL PROOF & REVIEWS
           ========================================== */}
        <section className="space-y-4">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#A100FF] uppercase font-bold">04 // TELEMETRY REVIEWS</span>
            <h2 className="font-cabinet font-bold text-3xl sm:text-5xl text-white">Client Testimonials</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-light font-satoshi">
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
            <p className="text-zinc-400 max-w-xl mx-auto text-sm font-light font-satoshi">
              Got specific licensing, maintenance, or revision questions? Inspect options below.
            </p>
          </div>

          <FaqAccordion />
        </section>

      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-black text-white flex items-center justify-center font-mono text-sm">
        BOOTING TRANSMISSION PIPELINE…
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}
