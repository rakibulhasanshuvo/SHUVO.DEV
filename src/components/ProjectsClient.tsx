"use client";

import React from "react";
import { m } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";

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
    glowClass: "hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]",
    borderClass: "border-red-500/20",
    dotColor: "bg-red-500",
    dotGlow: "shadow-[0_0_10px_#EF4444]",
  },
];

export default function ProjectsClient() {
  return (
    <div className="min-h-screen bg-[#000000] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-cabinet mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
            Deep-Dive Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-satoshi">
            Showcasing major technical builds, architecture decisions, and data pipelines.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <m.div
              key={project.id}
              whileHover={{ y: -10 }}
              className="h-[320px]"
            >
              <TiltCard
                className={`
                  glass rounded-2xl p-8
                  transition-all duration-500
                  flex flex-col justify-between h-full
                  ${project.glowClass}
                  border ${project.borderClass}
                `}
                spotlightColor="rgba(255,255,255,0.1)"
              >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold font-cabinet text-white/90">
                    {project.title}
                  </h3>
                  <div className={`w-3 h-3 rounded-full ${project.dotColor} ${project.dotGlow}`} />
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
                      className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              </TiltCard>
              </m.div>
          ))}
        </div>
      </div>
    </div>
  );
}
