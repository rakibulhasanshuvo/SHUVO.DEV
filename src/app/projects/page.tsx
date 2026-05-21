"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";
import { TiltCard } from "@/components/ui/TiltCard";

const projects = [
  {
    id: 1,
    title: "Amolnama",
    description: "Digital ledger & data pipeline utilizing 10+ scraper bots tracking national events.",
    tech: ["Next.js", "Python", "Puppeteer", "PostgreSQL"],
    spotlightColor: "rgba(0,240,255,0.15)",
    borderClass: "group-hover:border-[#00F0FF]/40 border-white/5",
    dotColor: "bg-[#00F0FF]",
    dotGlow: "shadow-[0_0_10px_#00F0FF]",
  },
  {
    id: 2,
    title: "Componeo",
    description: "High-performance React component registry with a Next.js and Supabase backend.",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
    spotlightColor: "rgba(161,0,255,0.15)",
    borderClass: "group-hover:border-[#A100FF]/40 border-white/5",
    dotColor: "bg-[#A100FF]",
    dotGlow: "shadow-[0_0_10px_#A100FF]",
  },
  {
    id: 3,
    title: "Izzan",
    description: "Full-stack e-commerce architecture with secure checkout and inventory management.",
    tech: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    spotlightColor: "rgba(16,185,129,0.15)",
    borderClass: "group-hover:border-emerald-500/40 border-white/5",
    dotColor: "bg-emerald-500",
    dotGlow: "shadow-[0_0_10px_#10B981]",
  },
  {
    id: 4,
    title: "Vortexa",
    description: "Cloud hosting dashboard and backend database management system.",
    tech: ["React", "Node.js", "Docker", "MongoDB"],
    spotlightColor: "rgba(239,68,68,0.15)",
    borderClass: "group-hover:border-red-500/40 border-white/5",
    dotColor: "bg-red-500",
    dotGlow: "shadow-[0_0_10px_#EF4444]",
  },
];


const miniProjects = [
  {
    year: "2024",
    title: "Quantum Dashboard",
    category: "UI Experiment",
    link: "#",
  },
  {
    year: "2023",
    title: "Neuro API",
    category: "Data Pipeline",
    link: "#",
  },
  {
    year: "2023",
    title: "Cyberpunk Component Library",
    category: "Design System",
    link: "#",
  },
  {
    year: "2022",
    title: "FinTech App Redesign",
    category: "Freelance Sprint",
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <InteractiveGridBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-[#A100FF] animate-gradient">
            Deep-Dive Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-satoshi">
            Showcasing major technical builds, architecture decisions, and data pipelines.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <TiltCard
              key={project.id}
              glowColor={project.spotlightColor}
              className={`flex flex-col justify-between h-[320px]`}
            >
              <div className={`p-10 md:p-12 h-full flex flex-col justify-between rounded-2xl border transition-colors duration-500 bg-white/5 backdrop-blur-md border-white/10 ${project.borderClass}`}>
                <div className="w-full md:w-[60%] flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <h3 className="text-2xl font-bold font-cabinet text-white/90">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed font-satoshi">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/40 group-hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Absolute positioned dot to be at top right of the whole card */}
                <div className={`absolute top-10 right-10 md:top-12 md:right-12 w-3 h-3 rounded-full ${project.dotColor} ${project.dotGlow}`} />
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Other Explorations Section */}
        <section className="mt-32 border-t border-white/10 pt-20">
          <header className="mb-12">
            <h2 className="text-3xl font-bold font-cabinet text-white">
              Other Explorations
            </h2>
            <p className="text-gray-400 mt-2 font-satoshi">
              Smaller builds, freelance sprint deliverables, and UI experiments.
            </p>
          </header>

          <div className="flex flex-col border-t border-white/10">
            {miniProjects.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-lg"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-white/40 font-mono text-sm">{item.year}</span>
                  <span className="text-white/90 font-cabinet font-semibold text-lg group-hover:text-[#00F0FF] transition-colors">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 md:mt-0">
                  <span className="text-white/50 text-sm font-satoshi mr-8 md:mr-0 md:w-48 text-left md:text-right">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 group-hover:border-[#00F0FF]/30 hidden md:flex">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#00F0FF] -rotate-45"
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

        {/* Architecture CTA Section */}
        <section className="mt-32 mb-20 text-center flex flex-col items-center">
          <div className="max-w-2xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <h2 className="text-2xl md:text-3xl font-bold font-cabinet text-white mb-4">
              Interested in the architecture behind these builds?
            </h2>
            <p className="text-gray-400 font-satoshi mb-8">
              Let's discuss data pipelines, infrastructure scaling, and performance optimization.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 hover:bg-[#00F0FF]/20 hover:border-[#00F0FF]/50 transition-all rounded-full font-cabinet font-bold tracking-wide"
            >
              Contact Me
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
