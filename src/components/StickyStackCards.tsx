"use client";

import React, { useRef, useState, useEffect } from "react";
import { m, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tech: string[];
  gradient: string;
  glowColor: string;
  borderColor: string;
  initialRotate: number;
}

const PROJECTS: Project[] = [
  {
    id: "amolnama",
    title: "Amolnama",
    subtitle: "Real-time Data Scraping",
    description:
      "Tracks national events with 10+ active scraper bots. Built with crawlers processing thousands of daily data points for real-time dashboards.",
    icon: "📊",
    tech: ["Next.js", "Python", "Puppeteer", "PostgreSQL"],
    gradient: "from-slate-950 via-cyan-950/40 to-slate-950",
    glowColor: "rgba(0, 240, 255, 0.2)",
    borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
    initialRotate: -1.5,
  },
  {
    id: "componeo",
    title: "Componeo",
    subtitle: "Component Registry Analytics",
    description:
      "Monitors component usage across organizations. Tracks adoption metrics, rendering usage charts, and design system governance at scale.",
    icon: "🧩",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
    gradient: "from-slate-950 via-purple-950/40 to-slate-950",
    glowColor: "rgba(161, 0, 255, 0.2)",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
    initialRotate: 1.2,
  },
  {
    id: "izzan",
    title: "Izzan",
    subtitle: "E-Commerce Ecosystem",
    description:
      "Connects payment gateways and shipping providers into a unified storefront. Supports multi-currency checkout and low latency inventory.",
    icon: "🛒",
    tech: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    gradient: "from-slate-950 via-emerald-950/40 to-slate-950",
    glowColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
    initialRotate: -0.8,
  },
  {
    id: "vortexa",
    title: "Vortexa",
    subtitle: "Secure Cloud Infrastructure",
    description:
      "Provides encrypted database management with zero-knowledge architecture. Scales with built-in compliance and audit controls.",
    icon: "🔒",
    tech: ["React", "Node.js", "Docker", "MongoDB"],
    gradient: "from-slate-950 via-rose-950/40 to-slate-950",
    glowColor: "rgba(239, 68, 68, 0.2)",
    borderColor: "border-red-500/20 hover:border-red-500/40",
    initialRotate: 1.6,
  },
];

import { useIsMobile } from "@/hooks/use-mobile";

export default function StickyStackCards({ isMobileServer }: { isMobileServer?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isMobileClient = useIsMobile();
  const isMobile = isMobileServer ?? isMobileClient;

  // Verify client mount for Next.js SSR safety
  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  // Track the scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Render Mobile Fallback: beautiful natural vertical scroll cards with subtle sticky stacked offsets
  if (isMobile) {
    return (
      <section
        ref={containerRef}
        className="relative w-full bg-transparent py-20 px-4 overflow-visible flex flex-col gap-10"
      >
        <div className="text-center mb-8 px-2">
          <span className="text-xs uppercase tracking-widest text-neon-cyan font-bold bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">
            Featured Works
          </span>
          <h2 className="font-cabinet font-bold text-3xl mt-4 mb-2 text-white">
            Featured Projects
          </h2>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col gap-12 w-full">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              style={{
                position: "relative",
                zIndex: index * 10,
              }}
              className={`w-full rounded-[2rem] p-6 border ${project.borderColor} bg-gradient-to-b ${project.gradient} max-md:bg-[#070709] max-md:bg-opacity-95 backdrop-blur-xl max-md:backdrop-blur-none flex flex-col justify-between text-white shadow-xl h-[420px]`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono text-neon-cyan uppercase tracking-widest bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                  {project.subtitle}
                </span>
                <span className="text-3xl select-none">{project.icon}</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-cabinet font-bold text-2xl text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-zinc-300 font-light text-xs leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/projects#${project.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-semibold rounded-full w-full justify-center shadow-md"
                >
                  <span>Explore Case Study</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Render Desktop: Spectacular Viewport-Pinned 3D Sticky Stack Deck
  return (
    <section
      ref={containerRef}
      id="projects-stack"
      className="relative w-full h-[360vh] bg-transparent overflow-visible"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 overflow-hidden">

        {/* Section Header */}
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          <span className="text-xs uppercase tracking-widest text-neon-cyan font-bold bg-neon-cyan/10 px-4 py-1.5 rounded-full border border-neon-cyan/20">
            Featured Works
          </span>
          <h2 className="font-cabinet font-bold text-5xl md:text-6xl mt-4 mb-2 text-white tracking-tight">
            Deep-Dive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-indigo-400 to-electric-purple animate-gradient">
              Engineering
            </span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto font-light text-sm mt-2">
            Explore architectural blueprints, secure stacks, and production data pipelines.
          </p>
        </div>

        {/* 3D Stack Deck Canvas */}
        <div 
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          className="flex-1 w-full max-w-5xl mx-auto relative flex items-center justify-center px-4 md:px-8 z-10"
        >
          {!mounted ? (
            /* SSR Skeleton Placeholder matching the desktop stack bounds and position */
            <div className="relative w-full max-w-4xl h-[460px] md:h-[500px] bg-slate-950/20 rounded-[2.5rem] border border-white/5 flex items-center justify-center">
              <span className="text-zinc-600 font-mono text-xs animate-pulse">Initializing 3D Deck Canvas…</span>
            </div>
          ) : (
            PROJECTS.map((project, index) => (
              <Card
                key={project.id}
                i={index}
                project={project}
                progress={scrollYProgress}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  i: number;
  project: Project;
  progress: MotionValue<number>;
}

function Card({ i, project, progress }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Slide-in translation: from offscreen (1000px) to its final deck alignment index shift
  const finalDeckY = i * 20;

  // Explicit, mathematically perfect ranges for each card to prevent division by zero or interpolation bugs.
  // We specify exactly what happens to each card at every scroll milestone.
  // Milestone progress points:
  // 0.0 - Hero section scrolling out, stack section entering viewport
  // 0.1 - Card 0 active, Card 1 starts sliding up
  // 0.35 - Card 1 fully slid up, stack pauses
  // 0.4 - Card 1 active, Card 2 starts sliding up, Card 0 recedes further
  // 0.65 - Card 2 fully slid up, stack pauses
  // 0.7 - Card 2 active, Card 3 starts sliding up, Card 1 and 0 recede further
  // 0.95 - Card 3 fully slid up, stack completes
  // 1.0 - Section scrolls away
  
  let progressRange: number[];
  let yVals: number[];
  let scaleVals: number[];
  let rotateXVals: number[];
  let zVals: number[];
  let darkenVals: number[];

  if (i === 0) {
    progressRange = [0, 0.1, 0.35, 0.4, 0.65, 0.7, 0.95, 1.0];
    yVals        = [0,   0,    0,   0,    0,   0,    0,   0]; // Always stays pinned at top in its stack position
    scaleVals    = [1,   1, 0.94, 0.94, 0.88, 0.88, 0.82, 0.82];
    rotateXVals  = [0,   0,   -8,   -8,  -12,  -12,  -16,  -16];
    zVals        = [0,   0,  -60,  -60, -120, -120, -180, -180];
    darkenVals   = [0,   0,  0.3,  0.3,  0.6,  0.6,  0.8,  0.8];
  } else if (i === 1) {
    progressRange = [0, 0.1, 0.35, 0.4, 0.65, 0.7, 0.95, 1.0];
    yVals        = [1000, 1000, finalDeckY, finalDeckY, finalDeckY, finalDeckY, finalDeckY, finalDeckY];
    scaleVals    = [1,   1,    1,   1, 0.94, 0.94, 0.88, 0.88];
    rotateXVals  = [0,   0,    0,   0,   -8,   -8,  -12,  -12];
    zVals        = [0,   0,    0,   0,  -60,  -60, -120, -120];
    darkenVals   = [0,   0,    0,   0,  0.3,  0.3,  0.6,  0.6];
  } else if (i === 2) {
    progressRange = [0, 0.4, 0.65, 0.7, 0.95, 1.0];
    yVals        = [1000, 1000, finalDeckY, finalDeckY, finalDeckY, finalDeckY];
    scaleVals    = [1,   1,    1,   1, 0.94, 0.94];
    rotateXVals  = [0,   0,    0,   0,   -8,   -8];
    zVals        = [0,   0,    0,   0,  -60,  -60];
    darkenVals   = [0,   0,    0,   0,  0.3,  0.3];
  } else { // i === 3
    progressRange = [0, 0.7, 0.95, 1.0];
    yVals        = [1000, 1000, finalDeckY, finalDeckY];
    scaleVals    = [1,   1,    1,    1];
    rotateXVals  = [0,   0,    0,    0];
    zVals        = [0,   0,    0,    0];
    darkenVals   = [0,   0,    0,    0];
  }

  // Create the motion values with explicit clamping to prevent out-of-bounds jumps
  const y = useTransform(progress, progressRange, yVals, { clamp: true });
  const scale = useTransform(progress, progressRange, scaleVals, { clamp: true });
  const rotateX = useTransform(progress, progressRange, rotateXVals, { clamp: true });
  const translateZ = useTransform(progress, progressRange, zVals, { clamp: true });
  const darken = useTransform(progress, progressRange, darkenVals, { clamp: true });

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const rafRef = useRef<number>(0);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!rectRef.current) return;
      const x = clientX - rectRef.current.left;
      const y = clientY - rectRef.current.top;
      setCoords({ x, y });
    });
  };

  return (
    <m.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        y,
        scale,
        rotateX,
        z: translateZ,
        rotateZ: project.initialRotate,
        zIndex: i * 10,
        boxShadow: isHovered
          ? `0 20px 50px -10px ${project.glowColor}, 0 0 2px 1px ${project.glowColor}`
          : "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        transformStyle: "preserve-3d",
      }}
      className={`absolute w-full max-w-4xl h-[460px] md:h-[500px] rounded-[2.5rem] p-8 md:p-12 border ${project.borderColor} bg-gradient-to-b ${project.gradient} backdrop-blur-xl flex flex-col justify-between text-white transition-[border-color,box-shadow] duration-500 ease-out overflow-hidden group origin-top`}
    >
      {/* Light spotlight shine reflection */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.04), transparent 60%)`,
        }}
      />

      {/* Dynamic border spotlight shine */}
      <div
        className="absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.15), transparent 80%)`,
          maskImage: "linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black)",
          maskClip: "content-box",
          WebkitMaskClip: "content-box",
        }}
      />

      {/* Outer ambient blur backplate glow */}
      <div
        className="absolute -inset-10 bg-radial from-transparent via-transparent to-transparent group-hover:to-cyan-500/5 -z-10 blur-3xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, ${project.glowColor}, transparent 70%)`,
        }}
      />

      {/* Dim overlay behind active card to increase contrast of front card */}
      <m.div
        style={{ opacity: darken }}
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 z-20"
      />

      {/* Top Header details */}
      <div className="flex justify-between items-start relative z-10">
        <span className="text-xs font-mono text-neon-cyan uppercase tracking-widest bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
          {project.subtitle}
        </span>
        <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-500 select-none z-10">
          {project.icon}
        </span>
      </div>

      {/* Main card copy details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-cabinet font-bold text-3xl md:text-5xl text-white tracking-tight leading-none">
            {project.title}
          </h3>
          <p className="text-zinc-300 font-light text-sm md:text-base leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-start lg:justify-end">
          <Link
            href={`/projects#${project.id}`}
            className="group/btn relative inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black font-semibold rounded-full overflow-hidden hover:scale-105 transition-all shadow-md z-30"
          >
            <span className="text-xs tracking-wider">Explore Case Study</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </m.div>
  );
}
