"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import TASLProvenanceCard from "@/components/ui/TASLProvenanceCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface TemplateDetails {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
  posterUrl: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  specs: string[];
  iframePlaceholderUrl: string;
}

const templatesDetailsData: Record<string, TemplateDetails> = {
  zenith: {
    id: "zenith",
    title: "Zenith Agency Portfolio",
    category: "Creative Agency",
    price: "$59.00",
    description: "Zenith is a premium landing page template designed specifically for creative agencies and freelance professionals. Built with clean, path-aware slider elements and beautiful linear text highlights to present high-end digital agency portfolios.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS v4"],
    posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/rakibulhasanshuvo/zenith-agency-template",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    specs: ["100/100 Core Web Vitals Score", "Dark & Light CSS themes", "Fully responsive layout grids"],
    iframePlaceholderUrl: "https://rakibulhasanshuvo.com",
  },
  nova: {
    id: "nova",
    title: "Nova SaaS Dashboard Grid",
    category: "SaaS & Dashboard",
    price: "$79.00",
    description: "Nova is a highly responsive dashboard structure optimized for SaaS metrics tracking. Featuring automated container metrics, active JSS rates tracking, and a series of dynamic glowing canvas cards.",
    tags: ["React 19", "Recharts", "Supabase Backend"],
    posterUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/rakibulhasanshuvo/nova-saas-dashboard",
    license: "Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by-nd/4.0/",
    specs: ["Wasm-powered esbuild bundling", "Automated container status check", "Zero-latency Redis edge cache"],
    iframePlaceholderUrl: "https://rakibulhasanshuvo.com",
  },
  ethereal: {
    id: "ethereal",
    title: "Ethereal Commerce Web3",
    category: "Full-Stack Commerce",
    price: "$99.00",
    description: "Ethereal is a full-stack transactional template designed to handle concurrent visitors gracefully. Built with version-locked optimistic locking layers to guarantee safe, double-sell free checkout cycles.",
    tags: ["Next.js 16", "Stripe Checkout", "Prisma Postgres"],
    posterUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/rakibulhasanshuvo/ethereal-commerce",
    license: "Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    specs: ["Race condition prevention layers", "Prisma PostgreSQL schemas", "Secure Stripe stepper workflows"],
    iframePlaceholderUrl: "https://rakibulhasanshuvo.com",
  },
};

const templatesStyleConfig = {
  zenith: {
    spotlightColor: "rgba(0,240,255,0.15)",
    glowColor: "rgba(0, 240, 255, 0.2)",
    borderColor: "border-[#00F0FF]/15 hover:border-[#00F0FF]/40",
    textColor: "text-[#00F0FF]",
  },
  nova: {
    spotlightColor: "rgba(161,0,255,0.15)",
    glowColor: "rgba(161, 0, 255, 0.2)",
    borderColor: "border-[#A100FF]/15 hover:border-[#A100FF]/40",
    textColor: "text-[#A100FF]",
  },
  ethereal: {
    spotlightColor: "rgba(16,185,129,0.15)",
    glowColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "border-emerald-500/15 hover:border-emerald-500/40",
    textColor: "text-emerald-400",
  },
};

export default function TemplateDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [template, setTemplate] = useState<TemplateDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Viewport states
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  // CLI Sandbox Terminal states
  const [sandboxStatus, setSandboxStatus] = useState<"idle" | "booting" | "ready">("idle");
  const [cliLogs, setCliLogs] = useState<string[]>([]);

  // Template Request Modal states
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState("");

  const handleTriggerRequest = () => {
    if (!template) return;
    setRequestName("");
    setRequestEmail("");
    setRequestMessage(`Hi Shuvo, I would like to request the commercial license and zip files for the "${template.title}" template. Please email me the bundle!`);
    setHoneypot("");
    setRequestError("");
    setRequestSuccess(false);
    setIsRequestModalOpen(true);
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName.trim() || !requestEmail.trim() || !requestMessage.trim()) {
      setRequestError("All fields are required.");
      return;
    }

    setRequestLoading(true);
    setRequestError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: requestName.trim(),
          email: requestEmail.trim(),
          message: requestMessage.trim(),
          quoteSummary: `Template Request: ${template?.id} (${template?.title})`,
          confirm_corporate_website: honeypot, // Honeypot bot trap
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setRequestSuccess(true);
      } else {
        setRequestError(data.error || "Failed to submit request.");
      }
    } catch (err: any) {
      setRequestError("Network error occurred. Please try again.");
    } finally {
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    const fetchTemplateDetails = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data, error } = await supabase
          .from("templates")
          .select("*")
          .eq("id", id)
          .single();
          
        if (data && !error) {
          setTemplate({
            id: data.id,
            title: data.title,
            category: data.category,
            price: typeof data.price === 'number' ? `$${Math.round(data.price)}.00` : `$${data.price}`,
            description: data.description,
            tags: data.tags || [],
            posterUrl: data.poster_url || data.posterUrl,
            sourceUrl: data.source_url || data.sourceUrl || `https://github.com/rakibulhasanshuvo/${data.id}-template`,
            license: data.license || "Creative Commons Attribution 4.0 International (CC BY 4.0)",
            licenseUrl: data.license_url || data.licenseUrl || "https://creativecommons.org/licenses/by/4.0/",
            specs: data.features || data.specs || [],
            iframePlaceholderUrl: data.iframe_placeholder_url || data.iframePlaceholderUrl || "https://rakibulhasanshuvo.com",
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Could not retrieve template from database, utilizing static resource fallback:", err);
      }
      
      // Fallback to static
      setTemplate(templatesDetailsData[id] || null);
      setLoading(false);
    };

    fetchTemplateDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black text-white flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse mr-2" />
        Synchronizing assets...
      </div>
    );
  }

  if (!template) {
    notFound();
  }


  const style = templatesStyleConfig[template.id as keyof typeof templatesStyleConfig];


  // Trigger CLI Sandbox boot sequence
  const startSandbox = () => {
    if (sandboxStatus !== "idle") return;
    setSandboxStatus("booting");
    setCliLogs([]);

    const logSequence = [
      "[SYS] CONNECTING TO SERVERLESS CONTAINER CLUSTER...",
      `[SYS] ALLOCATED STANDBY IMAGE INSTANCE: prewarm-node-${template.id}`,
      `[SYS] MOUNTING DIRECTORY STRUCTURES... OK`,
      "[SYS] COMPILING REACT COMPILER & ESM BLUEPRINTS...",
      `[SYS] COMPILING Next.js BUILD (esbuild-wasm in 32ms) ... SUCCESS`,
      "[SYS] PORT FORWARDING SECURE ENCRYPTED UNIX SOCKET...",
      `[SYS] MAPPING TUNNEL BRIDGE TO PORT: 3000... ACTIVE`,
      "[SYS] INTEGRITY CHECKS: 100/100 CORE WEB VITALS",
      "[SYS] SANDBOX ENVIRONMENT SPIN-UP COMPLETE!"
    ];

    logSequence.forEach((log, idx) => {
      setTimeout(() => {
        setCliLogs((prev) => [...prev, log]);
        if (idx === logSequence.length - 1) {
          setTimeout(() => {
            setSandboxStatus("ready");
          }, 600);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white py-20 px-6 font-satoshi relative overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/templates"
            className="group inline-flex items-center gap-2 text-[11px] text-zinc-500 hover:text-white transition-colors font-bold font-mono tracking-widest"
          >
            <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←</span>
            <span>BACK TO SHELF</span>
          </Link>
        </div>

        {/* Layout splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ==========================================
              🖥️ LEFT COLUMN: RESPONSIVE VIEWPORT SANDBOX
             ========================================== */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass rounded-3xl border border-white/5 bg-[#08080A]/40 overflow-hidden shadow-2xl">
              
              {/* Header simulator bar */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>

                {/* Viewport size triggers */}
                <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/5 relative">
                  {(["desktop", "tablet", "mobile"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewport(mode)}
                      className={`relative px-4 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer z-10 ${
                        viewport === mode ? "text-white" : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      {viewport === mode && (
                        <m.div
                          layoutId="activeViewport"
                          className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport Simulator Frame */}
              <div className="relative bg-[#0b0b0d] p-8 flex items-center justify-center min-h-[380px] md:min-h-[440px]">
                
                {/* Simulated browser frame (Snaps instantly with zero animation) */}
                <div
                  className={`w-full h-[280px] sm:h-[350px] md:h-[400px] rounded-2xl border ${style?.borderColor} bg-[#070709] overflow-hidden relative shadow-inner`}
                  style={{
                    maxWidth: viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px"
                  }}
                >
                  {/* State 1: Sandbox Terminal is booting */}
                  {sandboxStatus === "booting" && (
                    <div className="absolute inset-0 z-20 bg-black p-6 font-mono text-[9px] sm:text-xs text-neon-cyan leading-relaxed flex flex-col justify-end overflow-hidden select-none">
                      <div className="space-y-1.5">
                        {cliLogs.map((log, index) => (
                          <div key={index}>
                            {log}
                          </div>
                        ))}
                        <span className="inline-block w-1.5 h-3 bg-neon-cyan animate-pulse ml-1" />
                      </div>
                    </div>
                  )}

                  {/* State 2: Sandbox is Ready / Loaded (Renders direct interactive iframe preview) */}
                  {sandboxStatus === "ready" && (
                    <div className="absolute inset-0 z-20 bg-black w-full h-full relative group">
                      {/* Floating high-tech overlay controller */}
                      <div className="absolute top-4 right-4 z-30 opacity-80 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSandboxStatus("idle")}
                          className="px-4.5 py-2.5 rounded-xl bg-black/90 hover:bg-black text-white font-mono text-[9px] font-extrabold uppercase tracking-widest border border-white/10 hover:border-neon-cyan/40 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                          Reset Sandbox
                        </button>
                      </div>

                      {/* Live preview iframe */}
                      <iframe 
                        src={template.iframePlaceholderUrl} 
                        className="w-full h-full border-none bg-black relative z-10" 
                        title={`${template.title} Live Preview`}
                        sandbox="allow-scripts allow-same-origin allow-popups"
                      />
                    </div>
                  )}

                  {/* State 3: Static Preview state (Default) */}
                  {sandboxStatus === "idle" && (
                    <div className="absolute inset-0 font-satoshi">
                      <Image
                        src={template.posterUrl}
                        alt={template.title}
                        fill
                        className="object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-8">
                        <span className="text-[11px] font-mono text-neon-cyan tracking-[0.2em] uppercase mb-2 font-bold">LIVE SANDBOX READY</span>
                        <h3 className="text-2xl md:text-3xl font-bold font-clash tracking-tight text-white mb-2 leading-none">{template.title}</h3>
                        <p className="text-[13px] text-zinc-400 max-w-md font-normal leading-relaxed">
                          Click the live preview command to trigger full sandbox instances mapped on pre-warmed clusters.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Template descriptions & spec */}
            <div className="space-y-12 font-satoshi">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold font-clash text-white tracking-tight">Overview</h2>
                <p className="text-zinc-300 text-base sm:text-[17px] font-normal leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Reworked: Technical specs structured as premium HUD cards */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold font-clash text-zinc-500 uppercase tracking-[0.2em] mb-4">
                  Key Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {template.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-white/5 bg-[#09090B]/50 flex items-start gap-3.5 shadow-md hover:border-white/10 transition-colors"
                    >
                      <span className="text-neon-cyan text-sm select-none mt-0.5 font-bold">✓</span>
                      <div>
                        <h4 className="text-[13px] font-bold text-white leading-tight font-clash uppercase tracking-wider mb-1">
                          {spec.split(" Score")[0].split(" API")[0].split(" Locking")[0]}
                        </h4>
                        <p className="text-[11px] font-mono text-zinc-500 leading-relaxed font-semibold">
                          {spec}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              🛒 RIGHT COLUMN: STICKY CHECKOUT & PROVENANCE
             ========================================== */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            
            {/* Elegant glassmorphic purchase stack */}
            <div className="glass p-8 rounded-3xl border border-white/5 bg-[#0B0B0E]/60 backdrop-blur-xl shadow-xl space-y-6 font-satoshi">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] block mb-2 font-bold">Single License Pricing</span>
                <span className="text-5xl sm:text-6xl font-bold font-clash text-white tracking-tight font-mono">{template.price}</span>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleTriggerRequest}
                  className="w-full py-4 bg-gradient-to-r from-neon-cyan via-blue-500 to-electric-purple text-white text-xs font-mono font-extrabold uppercase tracking-widest rounded-2xl hover:opacity-90 active:opacity-80 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.15)] flex items-center justify-center gap-2"
                >
                  Get Blueprint Bundle
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={startSandbox}
                    className="flex-1 py-3.5 bg-white hover:bg-zinc-100 active:bg-zinc-200 text-cyber-black text-[10px] font-mono font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    {sandboxStatus === "idle" ? "Warm Sandbox" : sandboxStatus === "booting" ? "Booting..." : "Online"}
                  </button>
                  <button
                    onClick={startSandbox}
                    className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Live Preview
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 text-[11px] text-zinc-400 font-normal leading-relaxed">
                Sends template ZIP bundle directly to your email. Includes 6 months of manual technical support & updates.
              </div>
            </div>

            {/* CC attribution provenance cert card */}
            <TASLProvenanceCard
              title={template.title}
              author="Muhammad Rakibul Hasan Shuvo"
              sourceUrl={template.sourceUrl}
              license={template.license.split(" (")[0]}
              licenseUrl={template.licenseUrl}
              certId={`CERT-2026-${template.id.toUpperCase()}`}
            />
          </aside>
        </div>
      </div>

      {/* ==========================================
          📬 CLIENT DIRECT REQUEST MODAL
         ========================================== */}
      <AnimatePresence>
        {isRequestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRequestModalOpen(false)}
              className="fixed inset-0 bg-black cursor-pointer"
            />

            {/* Modal Box */}
            <m.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0B0B0E] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-lg z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {requestSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <span className="text-5xl">✉️</span>
                  <h3 className="font-clash font-extrabold text-2xl text-white">Request Placed!</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
                    Thank you! Your request for the **{template.title}** bundle has been securely logged. 
                    Shuvo will manually email you the commercial license and ZIP file at **{requestEmail}** shortly.
                  </p>
                  <button
                    onClick={() => setIsRequestModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-mono font-extrabold uppercase tracking-widest transition-all cursor-pointer mt-4"
                  >
                    Close Portal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendRequest} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h3 className="font-clash font-extrabold text-lg text-white">Request Blueprint</h3>
                      <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-1">Manual Email Delivery Setup</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsRequestModalOpen(false)}
                      className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-white cursor-pointer transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {requestError && (
                    <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg font-bold">
                      {requestError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono font-extrabold">Your Name</label>
                    <input
                      type="text"
                      required
                      value={requestName}
                      onChange={(e) => setRequestName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 focus:border-neon-cyan/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono font-extrabold">Delivery Email Address</label>
                    <input
                      type="email"
                      required
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      placeholder="e.g. john@yourcompany.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-neon-cyan/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                    />
                  </div>

                  {/* Honeypot field (hidden from users, bot trap) */}
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono font-extrabold">Message Prompt</label>
                    <textarea
                      rows={4}
                      required
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-neon-cyan/40 rounded-xl p-3 text-xs text-white focus:outline-none transition-all resize-none font-satoshi"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsRequestModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-xs cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={requestLoading}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-500 text-white font-mono font-extrabold text-xs uppercase tracking-widest cursor-pointer transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.15)] disabled:opacity-50"
                    >
                      {requestLoading ? "SENDING..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
