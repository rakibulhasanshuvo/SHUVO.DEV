"use client";

import React from "react";
import { m } from "framer-motion";
import TechPhysicsSandbox from "@/components/TechPhysicsSandbox";
import HardwareShowroom from "@/components/HardwareShowroom";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: "2020 — 2022",
    title: "Graphic Design Foundations",
    subtitle: "Aesthetic Discipline & Pixel Precision",
    description: "Began my career focusing on layout composition, typographic grid structures, and brand identities. Learned the principles of high-end visual balance that now guide my front-end engineering style.",
    tags: ["UI/UX", "Adobe Suite", "Visual Hierarchy", "Typography"],
  },
  {
    year: "2022 — 2024",
    title: "Academic Focus & Self-Taught Gap",
    subtitle: "Computer Science at BOU & Deep-Dive Upskilling",
    description: "Enrolled in Bachelor of Computer Science and Engineering at Bangladesh Open University (BOU). Dedicated the study gap to an intensive, self-driven curriculum mastering TypeScript, React compiler behaviors, database engines, and web architectures.",
    tags: ["Data Structures", "TypeScript", "Next.js", "PostgreSQL"],
  },
  {
    year: "2024 — 2025",
    title: "Community & Open-Source Contributions",
    subtitle: "Orchestrating High-Performance Bot Pipelines",
    description: "Contributed code and assets to local tech initiatives. Created custom high-performance web-crawlers and robust scraper networks, laying the foundation for complex data-intensive projects like Amolnama.",
    tags: ["Web Scrapers", "Docker", "Supabase", "Node.js Pipelines"],
  },
  {
    year: "April 2026",
    title: "Full-Time Engineering Transition",
    subtitle: "Professional Software Engineer & System Builder",
    description: "Successfully secured a full-time software engineering role, culminating an intensive professional sprint. Actively building next-generation responsive systems and robust API integrations under a unified Vibe Coding workflow.",
    tags: ["Next.js App Router", "Full-Stack Dev", "Production Architect"],
  },
];

export default function AboutPage() {
  const style = {
    borderColor: "border-white/5",
  };

  return (
    <main className="w-full min-h-screen bg-cyber-black text-white px-6 md:px-12 py-20 relative overflow-hidden font-satoshi">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-28 relative z-10">
        
        {/* ==========================================
            📣 HERO BIOGRAPHY GRID CONSOLE
           ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bento Data-Matrix Card */}
          <div className="lg:col-span-5 relative w-full rounded-3xl border border-[#00F0FF]/25 bg-gradient-to-br from-[#0B0B0E]/90 to-[#040405]/95 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(0,240,255,0.02)] overflow-hidden">
            {/* Dynamic Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Cyber Corner Marks */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-cyan/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-cyan/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neon-cyan/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-cyan/40" />

            {/* Diagnostic Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5 relative z-10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  OPERATOR DIAGNOSTIC
                </span>
              </div>
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">SYS ACTIVE</span>
            </div>

            {/* Core Stats Inventory */}
            <div className="space-y-4 font-mono text-xs relative z-10">
              <div>
                <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Ident Registered</span>
                <span className="text-white font-bold text-sm">MUHAMMAD RAKIBUL HASAN SHUVO</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Stack Engine</span>
                  <span className="text-[#00F0FF] font-bold">NEXT.JS // REACT 19</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Build Compile</span>
                  <span className="text-emerald-400 font-bold">&lt; 8.4s // SUCCESS</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Design Latency</span>
                  <span className="text-[#A100FF] font-bold">0ms // PERFECT</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Primary Role</span>
                  <span className="text-white font-bold">FULL-STACK ARCHITECT</span>
                </div>
              </div>
              <div className="pb-4 border-b border-white/5">
                <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Current Geolocation</span>
                <span className="text-white block mt-0.5">DHAKA, BANGLADESH (UTC+6)</span>
              </div>
            </div>

            {/* High-tech Operator Visual badge */}
            <div className="relative h-28 w-full bg-black/40 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden mt-5">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
              <svg className="w-full h-full text-neon-cyan/15 absolute inset-0" viewBox="0 0 300 120" fill="none">
                <circle cx="150" cy="60" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="150" cy="60" r="30" stroke="currentColor" strokeWidth="1" />
                <path d="M 60,60 L 240,60 M 150,10 L 150,110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                <rect x="135" y="45" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="1" />
              </svg>
              <div className="relative z-10 text-center font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-bold leading-normal">
                BIOMETRIC IDENTITY VERIFIED<br />
                <span className="text-[#00F0FF] text-[10px] font-bold mt-1 inline-block">SECURE NODE // SHUVO.DEV</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio details */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00F0FF] uppercase px-4 py-1.5 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full w-fit">
              The Developer Behind the Canvas
            </span>
            <h1 className="font-clash font-extrabold text-5xl sm:text-6xl text-white tracking-tight leading-none">
              Muhammad Rakibul Hasan Shuvo
            </h1>
            <p className="text-zinc-400 font-satoshi text-base sm:text-lg font-normal leading-relaxed">
              Bridging extreme design aesthetics with technical execution. As a software engineer and former graphic designer, I build custom digital experiences that look elite and execute with raw, optimized speed.
            </p>
          </div>
        </section>

        {/* ==========================================
            ⚡ GRAVITY SIMULATOR CONSOLE
           ========================================== */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#A100FF] uppercase block mb-1">Interactive Engine</span>
              <h2 className="font-clash font-extrabold text-3xl text-white">Core Tech Stack Inventory</h2>
            </div>
            <p className="text-zinc-400 font-satoshi text-sm font-normal max-w-md md:text-right">
              A high-performance physics-based playground representing the technologies I utilize to compile, run, and scale applications.
            </p>
          </div>
          
          {/* Gravity Simulator Console */}
          <div className="relative rounded-3xl border border-white/5 bg-[#0A0A0C]/40 p-4 sm:p-6 shadow-2xl">
            {/* Console Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-5 font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>GRAVITY VECTOR SIMULATOR v1.2 // ENGINE ACTIVE</span>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <span>COLLISIONS: ELASTIC</span>
                <span>PARTICLES: 08 ACTIVE</span>
              </div>
            </div>
            
            <TechPhysicsSandbox />
          </div>
        </section>

        {/* ==========================================
            📅 ALTERNATING CHRONOLOGY PIPELINE
           ========================================== */}
        <section className="space-y-12 relative">
          <div className="text-center md:text-left space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00F0FF] uppercase block">My Chronology</span>
            <h2 className="font-clash font-extrabold text-3xl text-white">Career & Academic Path</h2>
          </div>

          <div className="relative ml-4 md:ml-0 py-6 space-y-16">
            
            {/* Core Vertical Neon Pipeline Track */}
            <div className="absolute left-[9px] md:left-24 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#A100FF] to-transparent opacity-30 pointer-events-none" />

            {timelineData.map((item, idx) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-10 md:pl-48 group"
              >
                {/* Visual Pipeline Node Connectors */}
                <div className="absolute left-[9px] md:left-24 top-6 md:top-8 -translate-x-1/2 w-5 h-5 rounded-full bg-cyber-black border-2 border-zinc-700 flex items-center justify-center transition-all duration-300 group-hover:border-neon-cyan group-hover:scale-110 shadow-lg z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-[#00F0FF] group-hover:shadow-[0_0_8px_#00F0FF] transition-all" />
                </div>

                {/* Left Year Badge (Only visible on larger screens) */}
                <span className="absolute left-0 top-7 font-mono text-xs md:text-sm text-[#A100FF] font-bold tracking-widest hidden md:block text-right w-20">
                  {item.year.split(" — ")[0]}
                </span>

                {/* Main Milestone content card */}
                <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0B0B0E]/40 hover:border-white/10 hover:bg-[#0B0B0E]/60 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative overflow-hidden">
                  
                  {/* Mobile responsive Year label */}
                  <span className="inline-block md:hidden text-[#A100FF] font-mono text-[11px] font-bold tracking-widest mb-2">
                    {item.year}
                  </span>
                  
                  <div className="space-y-3">
                    <h3 className="font-clash font-bold text-xl md:text-2xl text-white group-hover:text-neon-cyan transition-colors duration-300 leading-snug">
                      {item.title}
                    </h3>
                    <h4 className="text-zinc-500 font-mono text-[10px] font-bold uppercase tracking-[0.15em] block pb-2 border-b border-white/5 w-fit">
                      {item.subtitle}
                    </h4>
                    <p className="text-zinc-400 font-satoshi text-[13px] sm:text-[14px] font-normal leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] tracking-wider font-semibold px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-lg text-zinc-500 select-none group-hover:text-zinc-300 group-hover:border-white/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </section>

        {/* ==========================================
            🖥️ PC WORKSTATION BLUEPRINT
           ========================================== */}
        <section className="space-y-6">
          <HardwareShowroom />
        </section>

      </div>
    </main>
  );
}
