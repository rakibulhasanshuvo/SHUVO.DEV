"use client";
import Image from "next/image";

import React, { useState, useMemo, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Template {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
  posterUrl: string;
  videoUrl: string;
  features: string[];
}

const templatesData: Template[] = [
  {
    id: "zenith",
    title: "Zenith Agency Portfolio",
    category: "Creative Agency",
    price: "$59",
    description: "An ultra-minimalist HSL dark portfolio featuring custom 3D carousel arrays, dynamic slide sliders, and path aware line gliders.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS v4"],
    posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41851-large.mp4",
    features: ["100/100 Core Web Vitals", "Complete HSL design tokens", "Custom Markdown cases"],
  },
  {
    id: "nova",
    title: "Nova SaaS Dashboard Grid",
    category: "SaaS & Dashboard",
    price: "$79",
    description: "A neon cyber bento dashboard with linear charts, active server threat pulse bars, and multi-threaded container playgrounds.",
    tags: ["React 19", "Recharts", "Supabase Backend"],
    posterUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-blue-neon-lights-loop-41747-large.mp4",
    features: ["Pre-warmed Container APIs", "Upwork JSS tracker panel", "Silent bot honeypots"],
  },
  {
    id: "ethereal",
    title: "Ethereal Commerce Web3",
    category: "Full-Stack Commerce",
    price: "$99",
    description: "A luxurious Web3-themed transactional storefront equipped with secure Stripe steppers and inventory race-safe locks.",
    tags: ["Next.js 16", "Stripe Checkout", "Prisma Postgres"],
    posterUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-particles-in-blue-and-purple-loop-43285-large.mp4",
    features: ["Optimistic OCC inventory locking", "cc Attribution Provenance certs", "Device previews sandbox Frame"],
  },
];

const templatesStyleConfig = {
  zenith: {
    glowColor: "rgba(0, 240, 255, 0.25)",
    borderColor: "group-hover:border-[#00F0FF]/40 border-white/5",
    textColor: "text-[#00F0FF]",
    dotColor: "bg-[#00F0FF]",
    dotGlow: "shadow-[0_0_10px_#00F0FF]",
  },
  nova: {
    glowColor: "rgba(161, 0, 255, 0.25)",
    borderColor: "group-hover:border-[#A100FF]/40 border-white/5",
    textColor: "text-[#A100FF]",
    dotColor: "bg-[#A100FF]",
    dotGlow: "shadow-[0_0_10px_#A100FF]",
  },
  ethereal: {
    glowColor: "rgba(16, 185, 129, 0.25)",
    borderColor: "group-hover:border-emerald-500/40 border-white/5",
    textColor: "text-emerald-400",
    dotColor: "bg-emerald-400",
    dotGlow: "shadow-[0_0_10px_#10B981]",
  },
};

const categories = ["All", "Creative Agency", "SaaS & Dashboard", "Full-Stack Commerce"];

// Custom video hover crossfade component
const VideoHoverCard = ({ videoUrl, posterUrl, title }: { videoUrl: string; posterUrl: string; title: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl border-none select-none bg-[#09090b]"
    >
      {/* Static cover image */}
      <Image
        src={posterUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`absolute inset-0 object-cover transition-all duration-500 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-80"
        }`}
      />

      {/* Looping abstract video preview */}
      {isHovered && (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500 ease-in-out"
        />
      )}
    </div>
  );
};

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = useMemo(() => {
    return templatesData.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(search.toLowerCase()) ||
        template.description.toLowerCase().includes(search.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || template.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-cyber-black text-white py-20 px-6 font-satoshi relative overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* ==========================================
            📣 HEADER SECTION
           ========================================== */}
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neon-cyan uppercase px-4 py-1.5 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full">
            PREMIUM DIGITAL SHELF
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold font-clash tracking-tight text-white leading-none">
            Developer Templates
          </h1>
          <p className="text-zinc-400 text-base sm:text-[17px] font-normal leading-relaxed font-satoshi max-w-2xl mx-auto">
            Beautifully designed, highly performant templates engineered with Next.js, Framer Motion, and elite CSS aesthetics.
          </p>

          {/* ==========================================
              📊 PLATFORM DIAGNOSTICS HUD PANEL
             ========================================== */}
          <div className="pt-6 grid grid-cols-3 gap-4 max-w-xl mx-auto font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-zinc-500 uppercase">
            <div className="py-3 rounded-2xl border border-white/5 bg-[#0A0A0C]/50">
              <span className="block text-white text-[13px] sm:text-[14px] font-bold tracking-tight mb-0.5">03 Active</span>
              SHELF ASSETS
            </div>
            <div className="py-3 rounded-2xl border border-[#00F0FF]/10 bg-[#00F0FF]/[0.02]">
              <span className="block text-[#00F0FF] text-[13px] sm:text-[14px] font-bold tracking-tight mb-0.5">&lt; 32ms</span>
              EDGE LATENCY
            </div>
            <div className="py-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02]">
              <span className="block text-emerald-400 text-[13px] sm:text-[14px] font-bold tracking-tight mb-0.5">100% UP</span>
              SANDBOXES
            </div>
          </div>
        </header>

        {/* ==========================================
            🔍 SEARCH & FILTERS PANEL
           ========================================== */}
        <section className="flex flex-col md:flex-row gap-6 justify-between items-center bg-[#0B0B0E]/60 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
          {/* Category Tabs with slide-highlight active backdrop */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto relative">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2.5 rounded-xl text-[11px] font-bold font-mono tracking-widest uppercase transition-colors duration-300 cursor-pointer z-10 ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {selectedCategory === category && (
                  <m.div
                    layoutId="activeCategoryBackdrop"
                    className="absolute inset-0 bg-white/10 border border-white/15 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>

          {/* Dynamic Search Box */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search assets…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[12px] font-mono tracking-wide text-white placeholder-white/20 focus:outline-none focus:border-neon-cyan/40 focus:bg-white/[0.08] transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 font-mono text-[9px] uppercase tracking-wider">CMD+K</span>
          </div>
        </section>

        {/* ==========================================
            💎 TEMPLATES BENTO GRID
           ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredTemplates.map((template) => {
              const style = templatesStyleConfig[template.id as keyof typeof templatesStyleConfig];

              return (
                <m.div
                  key={template.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col justify-between rounded-3xl border border-white/5 bg-[#0B0B0E]/45 overflow-hidden hover:border-neon-cyan/20 transition-all duration-300 shadow-xl"
                  style={{
                    boxShadow: `0 15px 35px -5px rgba(0,0,0,0.5)`,
                  }}
                >
                  {/* Visual Video Preview Frame */}
                  <Link href={`/templates/${template.id}`} className="block relative overflow-hidden select-none cursor-pointer">
                    <VideoHoverCard
                      videoUrl={template.videoUrl}
                      posterUrl={template.posterUrl}
                      title={template.title}
                    />
                    <div className="absolute top-4 right-4 bg-cyber-black/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[12px] font-bold text-neon-cyan font-mono border border-neon-cyan/35 shadow-lg tracking-tight select-none">
                      {template.price}
                    </div>
                  </Link>

                  {/* Meta details */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[9px] font-mono font-bold tracking-[0.18em] text-zinc-500 uppercase">
                          {template.category}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${style?.dotColor} ${style?.dotGlow}`} />
                      </div>
                      <Link href={`/templates/${template.id}`} className="block cursor-pointer">
                        <h3 className="text-[21px] font-bold font-clash tracking-tight text-white group-hover:text-neon-cyan transition-colors leading-snug">
                          {template.title}
                        </h3>
                      </Link>
                      <p className="text-[13px] text-zinc-400 leading-relaxed font-normal font-satoshi">
                        {template.description}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {template.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono tracking-wider font-semibold px-2.5 py-1 bg-white/[0.03] border border-white/5 hover:border-white/15 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors select-none"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* View Details CTAs */}
                      <Link
                        href={`/templates/${template.id}`}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all cursor-pointer font-mono"
                      >
                        <span>Explore Sandbox</span>
                        <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                      </Link>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-24 bg-[#0B0B0E]/40 border border-dashed border-white/10 rounded-3xl">
            <p className="text-sm text-white/30 font-satoshi font-light">
              No developer templates found matching search parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}