"use client";

import React, { useState, startTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

// Enriched project data with expanded descriptions for SEO content depth
const projects = [
  {
    id: "amolnama",
    title: "Amolnama",
    subtitle: "Real-time Data Scraping",
    description: "Tracks national events with 10+ active scraper bots. Built with intelligent crawlers processing thousands of data points daily for real-time political analytics dashboards.",
    icon: "📊",
    color: "from-cyan-500/20 to-blue-500/20",
    glowColor: "rgba(0, 240, 255, 0.15)",
  },
  {
    id: "componeo",
    title: "Componeo",
    subtitle: "Component Registry Analytics",
    description: "Monitors component usage across organizations. Tracks adoption metrics and provides actionable insights for design system governance at scale.",
    icon: "🧩",
    color: "from-purple-500/20 to-pink-500/20",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: "vortexa",
    title: "Vortexa",
    subtitle: "Secure Cloud Infrastructure",
    description: "Provides encrypted database management with zero-knowledge architecture. Scales to handle enterprise workloads with built-in compliance and audit controls.",
    icon: "🔒",
    color: "from-emerald-500/20 to-teal-500/20",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: "izzan",
    title: "Izzan",
    subtitle: "E-Commerce Ecosystem",
    description: "Connects payment gateways and shipping providers into a unified storefront. Supports multi-currency checkout and real-time inventory management.",
    icon: "🛒",
    color: "from-orange-500/20 to-rose-500/20",
    glowColor: "rgba(249, 115, 22, 0.15)",
  },
];

// Schema.org JSON-LD structured data for SEO rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Featured Work — Shuvo's Portfolio",
  "description": "A curated selection of featured projects by Shuvo.",
  "hasPart": projects.map((p) => ({
    "@type": "CreativeWork",
    "name": p.title,
    "description": p.description,
    "creator": {
      "@type": "Person",
      "name": "Shuvo",
    },
  })),
};

export default function FeaturedWork() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Determine grid template based on hovered ID
  // WCAG 2.3.3: Disable layout shift entirely when user prefers reduced motion
  const getGridTemplate = () => {
    if (shouldReduceMotion || !hoveredId) {
      return {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      };
    }

    const index = projects.findIndex((p) => p.id === hoveredId);
    const isTop = index === 0 || index === 1;
    const isLeft = index === 0 || index === 2;

    return {
      gridTemplateColumns: isLeft ? "0.85fr 0.15fr" : "0.15fr 0.85fr",
      gridTemplateRows: isTop ? "0.85fr 0.15fr" : "0.15fr 0.85fr",
    };
  };

  return (
    <section
      id="work"
      className="mb-0 max-w-[1440px] mx-auto px-6"
      aria-labelledby="featured-work-heading"
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 700px' } as React.CSSProperties}
    >
      {/* Schema.org JSON-LD for search engine rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex justify-between items-baseline mb-12">
        <h2 id="featured-work-heading" className="font-cabinet font-bold text-3xl text-pretty">Featured Work</h2>
        <Link 
          href="/projects" 
          className="text-sm text-neon-cyan hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-sm transition-shadow duration-300"
        >
          All Projects&nbsp;&rarr;
        </Link>
      </div>

      {/* Liquid Bento Grid — Desktop */}
      <motion.div
        role="list"
        aria-label="Featured projects"
        className="hidden md:grid gap-6 min-h-[600px]"
        style={getGridTemplate()}
        animate={getGridTemplate()}
        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isHovered={hoveredId === project.id}
            hasActiveHover={hoveredId !== null}
            onHover={() => startTransition(() => setHoveredId(project.id))}
            onHoverEnd={() => startTransition(() => setHoveredId(null))}
          />
        ))}
      </motion.div>

      {/* Mobile Fallback: Stacked Layout with full semantic structure */}
      <div role="list" aria-label="Featured projects" className="grid md:hidden grid-cols-1 gap-6">
        {projects.map((project) => (
          <div role="listitem" key={project.id}>
            <Link
              href={`/projects#${project.id}`}
              className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-shadow duration-300"
            >
              <article className="relative overflow-hidden bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl flex flex-col justify-between h-full transition-colors duration-500 group-hover:border-white/10 [contain:paint]">
                {/* Ambient Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div 
                    className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                    aria-hidden="true"
                  >
                    {project.icon}
                  </div>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{project.subtitle}</span>
                  <h3 className="text-2xl font-bold mt-2 text-white/90 text-pretty font-cabinet">{project.title}</h3>
                  <p className="text-sm text-white/60 mt-2 font-light">{project.description}</p>
                </div>

                <div className="relative z-10 mt-6 flex justify-between items-center">
                  <span className="text-sm text-neon-cyan group-hover:text-cyan-300 transition-colors font-mono tracking-wider">
                    Explore Case Study &rarr;
                  </span>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
