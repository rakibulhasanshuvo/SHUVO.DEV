"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sparkles, Terminal, Code, Cpu, Award, Zap } from "lucide-react";

export default function AboutSection({ isMobileServer }: { isMobileServer?: boolean }) {
  const isMobileClient = useIsMobile();
  const isMobile = isMobileServer ?? isMobileClient;

  const getVariants = (delay: number): any => {
    if (isMobile === undefined || isMobile) {
      return {
        hidden: { fill: "rgba(21, 21, 21, 1)", stroke: "rgba(0, 240, 255, 0)", strokeWidth: 0, pathLength: 1 },
        visible: { fill: "rgba(21, 21, 21, 1)", stroke: "rgba(0, 240, 255, 0)", strokeWidth: 0, pathLength: 1 }
      };
    }
    return {
      hidden: { pathLength: 0, fill: "rgba(21, 21, 21, 0)", stroke: "#00f0ff", strokeWidth: 1 },
      visible: {
        pathLength: 1,
        fill: "rgba(21, 21, 21, 1)",
        stroke: "rgba(0, 240, 255, 0)",
        transition: {
          pathLength: { duration: 2, ease: "easeInOut", delay },
          fill: { duration: 1, delay: delay + 1.5, ease: "easeOut" },
          stroke: { duration: 1, delay: delay + 1.5, ease: "easeOut" }
        }
      }
    };
  };

  const stats = [
    { label: "Design & Dev", value: "5+ Years", desc: "Pixel-perfect layouts & frontend engineering", icon: Award },
    { label: "Performance", value: "99%", desc: "PageSpeed optimization & quick loads", icon: Zap },
    { label: "Deliveries", value: "40+ Projects", desc: "Premium case studies & custom apps", icon: Code }
  ];

  const techStack = ["React 19", "Next.js 15", "Supabase", "Cloudinary", "Tailwind CSS v4", "Framer Motion"];

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-transparent overflow-hidden px-6 py-20 scroll-mt-24 mb-20 md:mb-28 flex items-center justify-center"
    >
      {/* Dynamic Ambient cyber dot background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,240,255,0.02)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />
      
      {/* 1. Stretched Background Text "SHUVO" (Moved to z-0, opacity controlled) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center select-none pointer-events-none z-0 opacity-[0.25] sm:opacity-40">
        <m.svg
          className="w-full h-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* S */}
          <m.path
            d="M 30,0 L 190,0 L 190,140 L 140,140 L 140,50 L 80,50 L 80,175 L 190,175 L 190,400 L 30,400 L 30,260 L 80,260 L 80,350 L 140,350 L 140,225 L 30,225 Z"
            variants={getVariants(0.0)}
          />
          
          {/* H */}
          <m.path
            d="M 220,0 L 270,0 L 270,175 L 330,175 L 330,0 L 380,0 L 380,400 L 330,400 L 330,225 L 270,225 L 270,400 L 220,400 Z"
            variants={getVariants(0.2)}
          />
          
          {/* U */}
          <m.path
            d="M 410,0 L 460,0 L 460,350 L 520,350 L 520,0 L 570,0 L 570,400 L 410,400 Z"
            variants={getVariants(0.4)}
          />
          
          {/* V */}
          <m.path
            d="M 600,0 L 650,0 L 680,270 L 710,0 L 760,0 L 700,400 L 660,400 Z"
            variants={getVariants(0.6)}
          />
          
          {/* O */}
          <m.path
            fillRule="evenodd"
            d="M 790,0 L 950,0 L 950,400 L 790,400 Z M 840,50 L 840,350 L 900,350 L 900,50 Z"
            variants={getVariants(0.8)}
          />
        </m.svg>
      </div>
 
      {/* Main Grid Container */}
      <div className="relative w-full max-w-[1440px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* 2. Left Column: Sleek Description, Stats & Tech chips */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left"
        >
          {/* Section Indicator Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-xs font-bold text-neon-cyan uppercase tracking-widest font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Who is Shuvo?
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase text-neon-cyan font-bold tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
              Dhaka, BD
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-cabinet font-black text-4xl sm:text-5xl text-white tracking-tight leading-none">
            Engineering{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyan-200 to-white">
              High-Performance
            </span>{" "}
            UIs.
          </h2>

          {/* Bio Description */}
          <p className="text-[#86868B] text-base sm:text-lg font-light leading-relaxed font-satoshi max-w-2xl">
            My journey started in graphic design, focusing on pixel-perfect layouts. After a gap dedicated to self-taught upskilling, I wanted to build the actual logic behind the designs. Today, I use a &ldquo;Vibe Coding&rdquo; workflow to engineer state-of-the-art React components, ultra-responsive storefronts, and premium serverless dashboard infrastructures.
          </p>

          {/* Stats Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <m.div
                  key={stat.label}
                  whileHover={{ y: -4, borderColor: "rgba(0, 240, 255, 0.2)" }}
                  className="bg-gradient-to-br from-[#0e0e10]/80 to-[#050506]/90 border border-white/5 p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden group text-left"
                >
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-neon-cyan/5 rounded-full blur-xl group-hover:bg-neon-cyan/10 transition-colors" />
                  <div className="w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center text-neon-cyan mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-cabinet font-black text-xl text-white tracking-tight leading-none">{stat.value}</h4>
                  <p className="text-xs text-white/95 font-bold uppercase tracking-wider font-mono mt-1">{stat.label}</p>
                  <p className="text-[10px] text-darkpan-slate font-medium leading-normal mt-1 max-w-[150px]">{stat.desc}</p>
                </m.div>
              );
            })}
          </div>

          {/* Tech stack tags */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] uppercase font-bold text-darkpan-slate tracking-wider block font-mono">Specialized Core Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white/90 font-semibold font-satoshi hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-8 py-3.5 bg-neon-cyan hover:bg-cyan-400 text-black font-cabinet font-bold rounded-full overflow-hidden hover:scale-[1.03] transition-all shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(0,240,255,0.45)] group/btn text-center"
            >
              <span className="text-sm tracking-wide uppercase">Hire Me</span>
              <span className="ml-2 w-4 h-4 flex items-center justify-center group-hover/btn:translate-x-0.5 transition-transform duration-300">
                <svg className="w-4 h-4 stroke-black" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
            
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-cabinet font-bold rounded-full hover:scale-[1.03] transition-all backdrop-blur-md text-center group/btn2"
            >
              <span className="text-sm tracking-wide uppercase">Download Resume</span>
              <span className="ml-2 w-4 h-4 flex items-center justify-center group-hover/btn2:translate-y-0.5 transition-transform duration-300">
                <svg className="w-4 h-4 stroke-white" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </span>
            </a>
          </div>
        </m.div>

        {/* 3. Right Column: Beautifully Framed Cyber Avatar */}
        <m.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          {/* Cyber Circular Glow Backdrop */}
          <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-neon-cyan/5 rounded-full blur-[80px] pointer-events-none z-0 animate-pulse" />

          {/* Avatar container */}
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] group">
            {/* User Portrait Image */}
            <Image
              src="/portrait.png"
              alt="Muhammad Rakibul Hasan Shuvo"
              width={480}
              height={600}
              sizes="(max-w-768px) 420px, 480px"
              priority
              fetchPriority="high"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 pointer-events-auto filter drop-shadow-[0_0_30px_rgba(0,240,255,0.15)]"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80";
              }}
            />
          </div>
        </m.div>

      </div>
    </section>
  );
}
