"use client";

import React, { useState } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";
import { TiltCard } from "@/components/ui/TiltCard";
import { projectsData } from "./data";

// ==========================================
// 📐 CUSTOM SYSTEM ARCHITECTURE SVGS (BLUEPRINTS)
// ==========================================

// Visual Schematic 1: Amolnama Ingestion Pipeline
const AmolnamaSchematic = () => (
  <svg viewBox="0 0 200 180" className="w-full h-full text-cyan-400 opacity-90 fill-none stroke-current" strokeWidth="1">
    <circle cx="100" cy="90" r="70" strokeDasharray="3 6" className="opacity-15 text-cyan-500" />
    <circle cx="100" cy="90" r="50" strokeDasharray="2 4" className="opacity-10 text-cyan-500" />

    {/* Central Database Buffer Node */}
    <g className="animate-pulse">
      <rect x="75" y="75" width="50" height="30" rx="6" className="fill-cyan-950/20 text-cyan-500" strokeWidth="1.5" />
      <text x="100" y="93" textAnchor="middle" className="font-mono text-[7px] fill-cyan-400 stroke-none font-bold">BUFFER</text>
    </g>
    
    {/* Scraper bot nodes */}
    <g className="text-cyan-500/70">
      {/* Bot 1 */}
      <circle cx="45" cy="50" r="8" className="fill-cyan-950/10 text-cyan-500" strokeWidth="1" />
      <text x="45" y="53" textAnchor="middle" className="font-mono text-[6px] fill-zinc-400 stroke-none font-bold">B1</text>
      <path d="M 53,55 L 75,75" strokeDasharray="2 2" strokeWidth="1" />
      
      {/* Bot 2 */}
      <circle cx="45" cy="130" r="8" className="fill-cyan-950/10 text-cyan-500" strokeWidth="1" />
      <text x="45" y="133" textAnchor="middle" className="font-mono text-[6px] fill-zinc-400 stroke-none font-bold">B2</text>
      <path d="M 53,125 L 75,105" strokeDasharray="2 2" strokeWidth="1" />
      
      {/* Bot 3 */}
      <circle cx="155" cy="50" r="8" className="fill-cyan-950/10 text-cyan-500" strokeWidth="1" />
      <text x="155" y="53" textAnchor="middle" className="font-mono text-[6px] fill-zinc-400 stroke-none font-bold">B3</text>
      <path d="M 147,55 L 125,75" strokeDasharray="2 2" strokeWidth="1" />
      
      {/* Bot 4 */}
      <circle cx="155" cy="130" r="8" className="fill-cyan-950/10 text-cyan-500" strokeWidth="1" />
      <text x="155" y="133" textAnchor="middle" className="font-mono text-[6px] fill-zinc-400 stroke-none font-bold">B4</text>
      <path d="M 147,125 L 125,105" strokeDasharray="2 2" strokeWidth="1" />
    </g>
    
    {/* Flow Indicators */}
    <circle cx="63" cy="63" r="2.5" className="fill-cyan-400 animate-ping" />
    <circle cx="137" cy="117" r="2.5" className="fill-cyan-400 animate-ping" />
    
    {/* Ingest Stats HUD */}
    <text x="100" y="145" textAnchor="middle" className="font-mono text-[6.5px] fill-cyan-400/60 stroke-none font-bold">RATE: 4.8K REQS/S</text>
    <text x="100" y="155" textAnchor="middle" className="font-mono text-[5.5px] fill-emerald-400/80 stroke-none font-bold">STATUS: INGESTING</text>
  </svg>
);

// Visual Schematic 2: Componeo Component Registry Tree
const ComponeoSchematic = () => (
  <svg viewBox="0 0 200 180" className="w-full h-full text-purple-400 opacity-90 fill-none stroke-current" strokeWidth="1">
    <line x1="20" y1="10" x2="180" y2="10" strokeDasharray="2 2" className="opacity-15 text-purple-500" />
    <line x1="20" y1="170" x2="180" y2="170" strokeDasharray="2 2" className="opacity-15 text-purple-500" />
    
    {/* Main Root directory node */}
    <rect x="25" y="25" width="45" height="18" rx="4" className="fill-purple-950/20 text-purple-500" strokeWidth="1.5" />
    <text x="32" y="37" className="font-mono text-[7.5px] fill-purple-300 stroke-none font-bold">src/components</text>
    
    {/* Node trunk trees */}
    <path d="M 47,43 L 47,150" strokeWidth="1.2" className="text-purple-500/70" />
    <path d="M 47,65 L 75,65" strokeWidth="1.2" className="text-purple-500/70" />
    <path d="M 47,100 L 75,100" strokeWidth="1.2" className="text-purple-500/70" />
    <path d="M 47,135 L 75,135" strokeWidth="1.2" className="text-purple-500/70" />
    
    {/* Registry layout nodes */}
    <rect x="75" y="55" width="55" height="18" rx="4" className="fill-purple-950/10 text-purple-500/70" strokeWidth="1" />
    <text x="82" y="67" className="font-mono text-[6.5px] fill-zinc-300 stroke-none font-medium">loader.tsx</text>
    <circle cx="122" cy="64" r="2" className="fill-purple-400" />

    <rect x="75" y="90" width="55" height="18" rx="4" className="fill-purple-950/10 text-purple-500/70" strokeWidth="1" />
    <text x="82" y="102" className="font-mono text-[6.5px] fill-zinc-300 stroke-none font-medium">button.tsx</text>
    <circle cx="122" cy="99" r="2" className="fill-emerald-400" />
    
    {/* Dynamic compilation node */}
    <rect x="75" y="125" width="55" height="18" rx="4" className="fill-purple-950/30 text-purple-500" strokeWidth="1.5" />
    <text x="80" y="137" className="font-mono text-[6.5px] fill-purple-300 stroke-none font-bold">esbuild.ts</text>
    
    {/* Dynamic output bundle */}
    <path d="M 130,134 L 145,134" strokeWidth="1.2" className="text-purple-500" strokeDasharray="2 2" />
    <rect x="145" y="125" width="45" height="18" rx="4" className="fill-purple-950/10 text-purple-500/60" strokeWidth="1" />
    <text x="149" y="137" className="font-mono text-[5.5px] fill-zinc-300 stroke-none">bundle.js</text>

    {/* Metric Badge */}
    <text x="145" y="40" className="font-mono text-[6.5px] fill-purple-400/80 stroke-none font-bold">BUILD: 32MS</text>
    <circle cx="180" cy="25" r="1.5" className="fill-purple-400" />
  </svg>
);

// Visual Schematic 3: Izzan DB Relational Schema Diagram
const IzzanSchematic = () => (
  <svg viewBox="0 0 200 180" className="w-full h-full text-emerald-400 opacity-90 fill-none stroke-current" strokeWidth="1">
    {/* PostgreSQL Table 1 */}
    <rect x="18" y="25" width="70" height="90" rx="6" className="fill-emerald-950/10 text-emerald-500" strokeWidth="1.5" />
    <path d="M 18,43 L 88,43" strokeWidth="1.2" className="text-emerald-500/50" />
    <text x="24" y="37" className="font-mono text-[8px] fill-emerald-300 stroke-none font-bold">t_orders</text>
    
    <text x="24" y="55" className="font-mono text-[5.5px] fill-emerald-400 stroke-none font-medium">🔑 id (uuid)</text>
    <text x="24" y="67" className="font-mono text-[5.5px] fill-zinc-400 stroke-none">💵 total (numeric)</text>
    <text x="24" y="79" className="font-mono text-[5.5px] fill-zinc-500 stroke-none">👤 stripe_id (str)</text>
    <text x="24" y="91" className="font-mono text-[5.5px] fill-zinc-500 stroke-none">🔗 user_id (uuid)</text>
    <text x="24" y="103" className="font-mono text-[5.5px] fill-zinc-500 stroke-none">🕒 created_at</text>
    
    {/* PostgreSQL Table 2 */}
    <rect x="112" y="45" width="70" height="80" rx="6" className="fill-emerald-950/10 text-emerald-500" strokeWidth="1.5" />
    <path d="M 112,63 L 182,63" strokeWidth="1.2" className="text-emerald-500/50" />
    <text x="118" y="57" className="font-mono text-[8px] fill-emerald-300 stroke-none font-bold">t_users</text>
    
    <text x="118" y="75" className="font-mono text-[5.5px] fill-emerald-400 stroke-none font-medium">🔑 id (uuid)</text>
    <text x="118" y="87" className="font-mono text-[5.5px] fill-zinc-300 stroke-none">✉ email (varchar)</text>
    <text x="118" y="99" className="font-mono text-[5.5px] fill-zinc-500 stroke-none">🔐 pass_hash (str)</text>
    <text x="118" y="111" className="font-mono text-[5.5px] fill-zinc-500 stroke-none">🕒 updated_at</text>
    
    {/* Relationship connecting paths */}
    <path d="M 88,91 C 102,91 98,75 112,75" strokeWidth="1.5" className="text-emerald-400 animate-pulse" />
    <circle cx="88" cy="91" r="1.5" className="fill-emerald-400" />
    <circle cx="112" cy="75" r="1.5" className="fill-emerald-400" />
    
    <text x="100" y="145" textAnchor="middle" className="font-mono text-[6.5px] fill-emerald-400/60 stroke-none font-bold">OPTIMISTIC CONCURRENCY ON</text>
    <text x="100" y="155" textAnchor="middle" className="font-mono text-[5.5px] fill-emerald-400/40 stroke-none font-medium">RELATION: ONE_TO_MANY</text>
  </svg>
);

// Visual Schematic 4: Vortexa Docker Pre-warming Orchestrator
const VortexaSchematic = () => (
  <svg viewBox="0 0 200 180" className="w-full h-full text-red-400 opacity-90 fill-none stroke-current" strokeWidth="1">
    <rect x="15" y="25" width="170" height="120" rx="8" className="fill-red-950/15 text-red-500" strokeWidth="1.5" strokeDasharray="4 2" />
    
    {/* Container Slot 1 */}
    <g>
      <rect x="28" y="40" width="60" height="42" rx="4" className="fill-red-950/20 text-red-500/70" strokeWidth="1" />
      <text x="33" y="52" className="font-mono text-[6px] fill-red-300 stroke-none font-bold">CONTAINER 01</text>
      <text x="33" y="62" className="font-mono text-[5px] fill-zinc-400 stroke-none font-medium">redis:7-alpine</text>
      <rect x="33" y="70" width="25" height="3" rx="1" className="fill-red-400/20" />
      <rect x="33" y="70" width="18" height="3" rx="1" className="fill-red-400 animate-pulse" />
    </g>
    
    {/* Container Slot 2 */}
    <g>
      <rect x="112" y="40" width="60" height="42" rx="4" className="fill-red-950/20 text-red-500/70" strokeWidth="1" />
      <text x="117" y="52" className="font-mono text-[6px] fill-red-300 stroke-none font-bold">CONTAINER 02</text>
      <text x="117" y="62" className="font-mono text-[5px] fill-zinc-400 stroke-none font-medium">postgres:16</text>
      <rect x="117" y="70" width="25" height="3" rx="1" className="fill-red-400/20" />
      <rect x="117" y="70" width="12" height="3" rx="1" className="fill-red-400 animate-pulse" />
    </g>

    {/* Metric Telemetry Panel */}
    <g>
      <rect x="28" y="95" width="144" height="38" rx="4" className="fill-red-950/5 text-red-500/50" strokeWidth="1" />
      <text x="34" y="107" className="font-mono text-[6.5px] fill-zinc-300 stroke-none font-semibold">PRE-WARM POOL: 10 POOLED</text>
      <text x="34" y="119" className="font-mono text-[6.5px] fill-zinc-300 stroke-none font-semibold">ALLOCATION SPEED: 1.2s</text>
      <circle cx="154" cy="113" r="4.5" className="fill-red-500 animate-pulse" />
      <circle cx="154" cy="113" r="9" className="fill-none text-red-400/40" strokeWidth="0.8" />
    </g>
  </svg>
);

// ==========================================
// 🚀 DYNAMIC STYLING MAP
// ==========================================

const projectsStyleConfig = {
  amolnama: {
    spotlightColor: "rgba(0,240,255,0.14)",
    glowColor: "rgba(0, 240, 255, 0.2)",
    borderColor: "border-[#00F0FF]/15 hover:border-[#00F0FF]/40",
    gradientText: "from-[#00F0FF] to-white",
    textColor: "text-[#00F0FF]",
    dotColor: "bg-[#00F0FF]",
    dotGlow: "shadow-[0_0_12px_#00F0FF]",
    number: "01",
    schematic: <AmolnamaSchematic />,
  },
  componeo: {
    spotlightColor: "rgba(161,0,255,0.14)",
    glowColor: "rgba(161, 0, 255, 0.2)",
    borderColor: "border-[#A100FF]/15 hover:border-[#A100FF]/40",
    gradientText: "from-[#A100FF] to-white",
    textColor: "text-[#A100FF]",
    dotColor: "bg-[#A100FF]",
    dotGlow: "shadow-[0_0_12px_#A100FF]",
    number: "02",
    schematic: <ComponeoSchematic />,
  },
  izzan: {
    spotlightColor: "rgba(16,185,129,0.14)",
    glowColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "border-emerald-500/15 hover:border-emerald-500/40",
    gradientText: "from-emerald-400 to-white",
    textColor: "text-emerald-400",
    dotColor: "bg-emerald-400",
    dotGlow: "shadow-[0_0_12px_#10B981]",
    number: "03",
    schematic: <IzzanSchematic />,
  },
  vortexa: {
    spotlightColor: "rgba(239,68,68,0.14)",
    glowColor: "rgba(239, 68, 68, 0.2)",
    borderColor: "border-red-500/15 hover:border-red-500/40",
    gradientText: "from-red-400 to-white",
    textColor: "text-red-400",
    dotColor: "bg-red-500",
    dotGlow: "shadow-[0_0_12px_#EF4444]",
    number: "04",
    schematic: <VortexaSchematic />,
  },
};

const miniProjects = [
  {
    year: "2026",
    title: "Quantum Dashboard",
    category: "UI Experiment",
    desc: "A futuristic administrative panel featuring low-latency real-time canvas widgets.",
    tech: ["Next.js", "Framer Motion", "CSS-in-JS"],
    link: "#",
  },
  {
    year: "2025",
    title: "Neuro API",
    category: "Data Pipeline",
    desc: "A highly parallelized data crawler pipeline optimized for serverless ingestion.",
    tech: ["TypeScript", "Node.js", "Redis"],
    link: "#",
  },
  {
    year: "2025",
    title: "Cyberpunk Component Library",
    category: "Design System",
    desc: "A modern visual component package built on custom neon design tokens.",
    tech: ["React", "PostCSS", "Tailwind"],
    link: "#",
  },
  {
    year: "2024",
    title: "FinTech App Redesign",
    category: "Freelance Sprint",
    desc: "Refactored transactional locking schemas to scale e-commerce checkout checkouts.",
    tech: ["Prisma", "PostgreSQL", "React"],
    link: "#",
  },
];

export default function ProjectsPage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [projectsList, setProjectsList] = useState<any[]>(Object.values(projectsData));

  React.useEffect(() => {
    const fetchDynamicProjects = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data, error } = await supabase.from("projects").select("*");
        if (data && data.length > 0 && !error) {
          const merged = data.map((dbProj: any) => {
            const localProj = projectsData[dbProj.slug] || {};
            return {
              ...localProj,
              ...dbProj,
              codeSnippet: dbProj.codeSnippet || {
                code: dbProj.code_snippet?.code || "",
                language: dbProj.code_snippet?.language || "typescript",
                highlightedLines: dbProj.code_snippet?.highlightedLines || [],
              }
            };
          });
          setProjectsList(merged);
        }
      } catch (err) {
        console.warn("Supabase database inactive, defaulting to high-fidelity static cases:", err);
      }
    };
    
    fetchDynamicProjects();
  }, []);

  // Combine static styling details with rich database entries
  const mappedProjects = projectsList.map((project) => {
    const config = projectsStyleConfig[project.slug as keyof typeof projectsStyleConfig];
    return {
      ...project,
      ...config,
    };
  });


  return (
    <div className="min-h-screen bg-[#000000] text-white py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden font-satoshi">
      {/* Background Interactive Grid (Self-gates on mobile for smooth performance) */}
      <InteractiveGridBackground />

      <div className="max-w-7xl mx-auto relative z-10 space-y-36">
        
        {/* ==========================================
            📣 HEADER SECTION
           ========================================== */}
        <header className="mb-24 text-center max-w-3xl mx-auto space-y-6">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase px-4 py-1.5 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full"
          >
            SYSTEM ARCHITECTURES
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-cabinet tracking-tight text-white leading-none"
          >
            Deep-Dive Projects
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg font-light leading-relaxed"
          >
            Explore actual case studies of robust data pipelines, scalable PostgreSQL relations, Pre-warmed container allocations, and ESBuild registries.
          </m.p>
        </header>

        {/* ==========================================
            💎 PROJECTS ALTERNATING SHOWCASE
           ========================================== */}
        <section className="space-y-48">
          {mappedProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24`}
                id={project.slug}
              >
                {/* 1. Left/Right Content Block */}
                <div
                  className={`lg:col-span-6 space-y-8 flex flex-col justify-center ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Categorization & Index */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${project.dotColor} ${project.dotGlow}`} />
                      <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                        {project.category}
                      </span>
                    </div>
                    <span className="font-cabinet text-3xl font-extrabold text-white/10 font-mono tracking-tighter">
                      {project.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-3">
                    <h2 className={`text-3xl md:text-5xl font-bold font-cabinet tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${project.gradientText}`}>
                      {project.title}
                    </h2>
                    <p className="text-[#86868B] font-cabinet font-semibold text-sm uppercase tracking-wide">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key ROI Callout */}
                  <div className={`p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4 shadow-md`}>
                    <span className="text-2xl select-none">📈</span>
                    <div>
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-0.5">Value Realization</h4>
                      <p className="text-sm font-semibold text-white">{project.roi}</p>
                    </div>
                  </div>

                  {/* Detailed Performance Metrics Subgrid */}
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((metric: any) => (
                      <div
                        key={metric.label}
                        className="p-4 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent text-left"
                      >
                        <span className="block text-2xl font-bold font-cabinet text-white font-mono leading-none tracking-tight">
                          {metric.value}
                        </span>
                        <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold mt-2 leading-none">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech: any) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Action Button */}
                  <div className="pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/btn relative inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black font-cabinet font-bold rounded-full overflow-hidden hover:scale-[1.04] active:scale-[0.98] transition-all shadow-md"
                    >
                      <span className="text-xs tracking-wider uppercase font-extrabold">Explore Case Study</span>
                      <svg className="w-3.5 h-3.5 stroke-black stroke-[2.5] fill-none group-hover/btn:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      {/* Hover laser horizontal shine effect */}
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-[shimmer_2s_infinite]" />
                    </Link>
                  </div>
                </div>

                {/* 2. Left/Right Visual Blueprint Card */}
                <div
                  className={`lg:col-span-6 flex justify-center items-center ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <TiltCard
                    glowColor={project.spotlightColor}
                    className="w-full max-w-[500px] h-[340px] md:h-[380px]"
                  >
                    <div className={`p-8 md:p-10 h-full w-full rounded-[2.5rem] border ${project.borderColor} bg-gradient-to-br from-[#0c0c0e]/90 to-[#040405]/95 backdrop-blur-xl flex items-center justify-center relative overflow-hidden transition-all duration-500`}>
                      {/* Ambient corner light shadow reflection */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      {/* Embed dynamic Custom high-fidelity system SVG blueprint */}
                      <div className="w-full max-w-[280px] md:max-w-[320px] aspect-square flex items-center justify-center relative z-10">
                        {project.schematic}
                      </div>

                      {/* Top right target locator dot */}
                      <div className={`absolute top-8 right-8 w-2 h-2 rounded-full ${project.dotColor} ${project.dotGlow}`} />
                    </div>
                  </TiltCard>
                </div>
              </div>
            );
          })}
        </section>

        {/* ==========================================
            📅 OTHER EXPLORATIONS (TIMELINE ROW LIST)
           ========================================== */}
        <section className="mt-48 border-t border-white/5 pt-32 space-y-16">
          <header className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#A100FF] uppercase">CHRONOLOGICAL LOGS</span>
            <h2 className="text-3xl md:text-5xl font-bold font-cabinet text-white tracking-tight">
              Other Explorations
            </h2>
            <p className="text-gray-400 font-satoshi text-base font-light max-w-xl">
              A timeline breakdown of experimental design sandboxes, backend pipelines, and minor creations.
            </p>
          </header>

          <div className="relative flex flex-col border-t border-white/5">
            {miniProjects.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/5 px-6 -mx-6 transition-all duration-300 select-none overflow-hidden"
              >
                {/* Dynamic hover backplate highlight */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-white/[0.025] to-transparent z-0 transition-opacity duration-500 pointer-events-none ${
                    hoveredRow === idx ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Left block (Year, Title, Tech Badges) */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 relative z-10 flex-1">
                  <span className="text-zinc-500 font-mono text-sm tracking-widest font-extrabold w-12 sm:w-16">
                    {item.year}
                  </span>
                  <div className="space-y-1 flex-1 max-w-lg">
                    <span className="block text-white font-cabinet font-bold text-lg md:text-xl group-hover:text-neon-cyan transition-colors duration-300">
                      {item.title}
                    </span>
                    <p className="text-zinc-400 font-satoshi text-xs font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Right block (Category, Action tag/Arrow) */}
                <div className="flex items-center justify-between mt-4 md:mt-0 relative z-10 md:w-[350px] justify-end gap-12">
                  {/* Tech stack used tags */}
                  <div className="flex gap-1.5 max-sm:hidden">
                    {item.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/5 text-zinc-500 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-zinc-500 group-hover:text-zinc-300 text-xs font-mono font-bold tracking-widest uppercase text-left md:text-right md:w-36">
                    {item.category}
                  </span>
                  
                  {/* Cyber circle arrow */}
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all duration-300 bg-white/5 group-hover:border-[#00F0FF]/40">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white group-hover:text-neon-cyan group-hover:rotate-45 transition-all duration-300"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ==========================================
            ⚡️ FUTURISTIC CTA BANNER
           ========================================== */}
        <section className="mt-48 mb-24 w-full relative z-20">
          <div className="w-full rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0c0c0e]/80 via-black to-black p-10 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Ambient Background Glow Orbs */}
            <div className="absolute top-[-100px] left-1/4 w-[350px] h-[350px] bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-[-100px] right-1/4 w-[350px] h-[350px] bg-electric-purple/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            
            <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20 px-3.5 py-1.5 rounded-full uppercase">
                ARCHITECTURAL DIALOGUE
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-cabinet text-white tracking-tight leading-tight">
                Interested in the architecture behind these builds?
              </h2>
              <p className="text-gray-400 font-satoshi text-base md:text-lg font-light max-w-xl">
                Let's discuss automated pipeline triggers, secure microservices encapsulation, database concurrency, and custom performance optimization strategies.
              </p>
              <div className="pt-4 w-full flex justify-center">
                <Link
                  href="/contact"
                  className="group/btn relative inline-flex items-center gap-2.5 px-9 py-4 bg-transparent text-white border border-white/10 hover:border-neon-cyan/40 hover:bg-neon-cyan/[0.02] transition-all rounded-full font-cabinet font-bold uppercase tracking-wider text-xs tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.5)] glow-cyan-subtle"
                >
                  <span>Get in Touch</span>
                  <svg className="w-3.5 h-3.5 stroke-white group-hover/btn:stroke-neon-cyan group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-[-0.5px] transition-all duration-300" viewBox="0 0 24 24" strokeWidth="2.5" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
