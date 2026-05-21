"use client";

import React from "react";
import { motion } from "framer-motion";
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
  return (
    <main className="w-full min-h-screen bg-black text-white px-4 md:px-8 py-12 relative overflow-hidden">
      {/* Dynamic Background Grid and Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#A100FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* Title / Hero section */}
        <section className="text-center md:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#00F0FF] font-mono text-xs uppercase tracking-widest px-3 py-1 bg-[#00F0FF]/10 rounded-full border border-[#00F0FF]/20">
              The Developer Behind the Canvas
            </span>
            <h1 className="font-cabinet font-bold text-4xl md:text-6xl text-white mt-4 tracking-tight leading-tight">
              Muhammad Rakibul Hasan Shuvo
            </h1>
            <p className="text-gray-400 font-satoshi text-base md:text-xl font-light mt-4 max-w-2xl leading-relaxed">
              Bridging extreme design aesthetics with technical execution. As a software engineer and former graphic designer, I build custom digital experiences that look elite and execute with raw, optimized speed.
            </p>
          </motion.div>
        </section>

        {/* Dynamic Sandbox Section */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#A100FF] font-mono text-xs uppercase tracking-widest">Interactive Engine</span>
              <h2 className="font-cabinet font-bold text-2xl md:text-3xl text-white mt-1">Core Tech Stack Inventory</h2>
            </div>
            <p className="text-gray-400 font-satoshi text-xs md:text-sm font-light max-w-md">
              A high-performance physics-based playground representing the technologies I utilize to compile, run, and scale applications.
            </p>
          </div>
          <TechPhysicsSandbox />
        </section>

        {/* Scroll timeline section */}
        <section className="space-y-12">
          <div className="text-center md:text-left">
            <span className="text-[#00F0FF] font-mono text-xs uppercase tracking-widest">My Chronology</span>
            <h2 className="font-cabinet font-bold text-2xl md:text-3xl text-white mt-1">Career & Academic Path</h2>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12 py-4">
            {timelineData.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Glowing Dot on timeline */}
                <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-[#00F0FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-[#00F0FF] group-hover:scale-125 transition-all duration-300" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                  {/* Year */}
                  <span className="text-[#A100FF] font-mono text-xs md:text-sm font-bold pt-1 tracking-wider">
                    {item.year}
                  </span>

                  {/* Body Content */}
                  <div className="lg:col-span-3 space-y-3">
                    <h3 className="font-cabinet font-bold text-xl text-white group-hover:text-[#00F0FF] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <h4 className="text-gray-400 font-satoshi text-xs font-semibold uppercase tracking-wider">
                      {item.subtitle}
                    </h4>
                    <p className="text-gray-400 font-satoshi text-sm md:text-base font-light leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] uppercase tracking-wider py-1 px-2.5 rounded bg-white/5 border border-white/5 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PC Workstation Hardware section */}
        <section className="space-y-6">
          <HardwareShowroom />
        </section>

      </div>
    </main>
  );
}
