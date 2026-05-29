"use client";

import React from "react";
import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

const TechPhysicsSandbox = dynamic(() => import("@/components/TechPhysicsSandbox"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-[#0A0A0C]/50 animate-pulse rounded-3xl border border-white/5 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-zinc-500">
      Loading Skills Sandbox...
    </div>
  )
});

const HardwareShowroom = dynamic(() => import("@/components/HardwareShowroom"), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full bg-gradient-to-b from-[#0b0b0d] to-[#040405] animate-pulse rounded-3xl border border-white/10 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-[#c266ff]/50">
      Loading Hardware Showroom...
    </div>
  )
});

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
  const shouldReduceMotion = useReducedMotion();
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

          {/* Left Column: Premium Cyber-Framed Portrait */}
          <div className="lg:col-span-6 relative group w-full z-10" style={{ aspectRatio: "4 / 3" }}>
            {/* 3D Pulsing Ambient Backdrop Shadow Glow */}
            <div
              className="absolute -inset-2 rounded-[2rem] opacity-35 group-hover:opacity-60 blur-3xl transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-[#00F0FF]/35 to-[#A100FF]/35"
            />

            {/* Main Cyber Frame */}
            <div className="h-full w-full rounded-3xl border border-[#00F0FF]/25 bg-gradient-to-br from-[#0B0B0E]/95 to-[#040405]/98 backdrop-blur-2xl p-3.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden transition-[transform,border-color] duration-500 hover:scale-[1.02]">
              {/* Dynamic Grid Background Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Cyber Corner Marks */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00F0FF] z-20" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF] z-20" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00F0FF] z-20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00F0FF] z-20" />

              {/* Image Inner Wrapper */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-[#050505]">
                <Image
                  src="/portrait-new.png"
                  alt="Muhammad Rakibul Hasan Shuvo"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 576px"
                  className="object-cover opacity-100 group-hover:scale-[1.04] transition-transform duration-700 select-none"
                />

                {/* Visual grid shading reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

                {/* HUD Telemetry Plate Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-xl border border-white/5 bg-[#030303]/85 backdrop-blur-md flex items-center justify-between font-mono text-[9px] text-zinc-300 select-none">
                  <div>
                    <span className="text-zinc-400 uppercase tracking-widest block text-[8px] font-extrabold">Ident Confirmed</span>
                    <span className="text-white font-extrabold font-mono tracking-wide">R. HASAN SHUVO</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-400 uppercase tracking-widest block text-[8px] font-extrabold">Sys Registry</span>
                    <span className="text-[#00F0FF] font-extrabold font-mono">NODE // ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio details */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00F0FF] uppercase px-4 py-1.5 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-full w-fit">
              The Developer Behind the Canvas
            </span>
            <h1 className="font-clash font-extrabold text-5xl sm:text-6xl text-white tracking-tight leading-none text-balance">
              Muhammad Rakibul Hasan Shuvo
            </h1>
            <p className="text-zinc-200 font-satoshi text-base sm:text-lg font-medium leading-relaxed text-pretty">
              Bridging extreme design aesthetics with technical execution. As a software engineer and former graphic designer, I build custom digital experiences that look elite and execute with raw, optimized speed.
            </p>
            <div className="pt-6">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-cabinet font-bold rounded-full hover:scale-[1.03] transition-[transform,background-color,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-black backdrop-blur-md text-center group/btn2 cursor-pointer"
              >
                <span className="text-sm tracking-wide uppercase">Download CV</span>
                <span className="ml-2 w-4 h-4 flex items-center justify-center group-hover/btn2:translate-y-0.5 transition-transform duration-300">
                  <svg className="w-4 h-4 stroke-white" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ==========================================
            ⚡ GRAVITY SIMULATOR CONSOLE
           ========================================== */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#A100FF] uppercase block mb-1">Interactive Engine</span>
              <h2 className="font-clash font-extrabold text-3xl text-white text-balance">Core Tech Stack Inventory</h2>
            </div>
            <p className="text-zinc-200 font-satoshi text-sm font-medium max-w-md md:text-right text-pretty">
              A high-performance physics-based playground representing the technologies I utilize to compile, run, and scale applications.
            </p>
          </div>

          {/* Gravity Simulator Console */}
          <div className="relative rounded-3xl border border-white/5 bg-[#0A0A0C]/40 p-4 sm:p-6 shadow-2xl">
            {/* Console Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-5 font-satoshi text-[11px] sm:text-[12px] text-zinc-300 uppercase tracking-wider font-extrabold">
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
            <h2 className="font-clash font-extrabold text-3xl text-white text-balance">Career & Academic Path</h2>
          </div>

          <div className="relative ml-4 md:ml-0 py-6 space-y-16">

            {/* Core Vertical Neon Pipeline Track */}
            <div className="absolute left-[9px] md:left-24 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#A100FF] to-transparent opacity-30 pointer-events-none" />

            {timelineData.map((item, idx) => (
              <m.div
                key={item.title}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-10 md:pl-48 group"
              >
                {/* Visual Pipeline Node Connectors */}
                <div className="absolute left-[9px] md:left-24 top-6 md:top-8 -translate-x-1/2 w-5 h-5 rounded-full bg-cyber-black border-2 border-zinc-700 flex items-center justify-center transition-[transform,border-color] duration-300 group-hover:border-neon-cyan group-hover:scale-110 shadow-lg z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-[#00F0FF] group-hover:shadow-[0_0_8px_#00F0FF] transition-[background-color,box-shadow]" />
                </div>

                {/* Left Year Badge (Only visible on larger screens) */}
                <span className="absolute left-0 top-7 font-mono text-xs md:text-sm text-[#c266ff] font-extrabold tracking-widest hidden md:block text-right w-20">
                  {item.year.split(" — ")[0]}
                </span>

                {/* Main Milestone content card */}
                <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0B0B0E]/40 hover:border-white/10 hover:bg-[#0B0B0E]/60 transition-[border-color,background-color,box-shadow] duration-300 shadow-lg group-hover:shadow-2xl relative overflow-hidden">

                  {/* Mobile responsive Year label */}
                  <span className="inline-block md:hidden text-[#c266ff] font-mono text-[11px] font-extrabold tracking-widest mb-2">
                    {item.year}
                  </span>

                  <div className="space-y-3">
                    <h3 className="font-clash font-bold text-xl md:text-2xl text-white group-hover:text-neon-cyan transition-colors duration-300 leading-snug text-balance">
                      {item.title}
                    </h3>
                    <h4 className="text-zinc-300 font-satoshi text-[12px] font-extrabold uppercase tracking-wider block pb-2 border-b border-white/5 w-fit">
                      {item.subtitle}
                    </h4>
                    <p className="text-zinc-200 font-satoshi text-[13px] sm:text-[14px] font-medium leading-relaxed text-pretty">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-satoshi text-[11px] tracking-wider font-extrabold px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-zinc-200 select-none group-hover:text-zinc-100 group-hover:border-white/20 transition-colors"
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
