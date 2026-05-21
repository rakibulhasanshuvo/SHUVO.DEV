"use client";

import React from "react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/magicui/Marquee";

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Tailwind CSS v4",
  "Supabase", "Framer Motion", "Anime.js", "Vercel",
  "Refine", "Shadcn/ui", "Magic UI", "Aceternity UI"
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-[700px] md:min-h-[850px] lg:min-h-[950px] bg-transparent overflow-hidden flex flex-col justify-end px-6 py-12 md:py-20 lg:px-16"
    >
      {/* 1. Stretched Background Text "SHUVO" */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center select-none pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          fill="#111111"
        >
          {/* S */}
          <path d="M 30,0 L 190,0 L 190,140 L 140,140 L 140,50 L 80,50 L 80,175 L 190,175 L 190,400 L 30,400 L 30,260 L 80,260 L 80,350 L 140,350 L 140,225 L 30,225 Z" />
          {/* H */}
          <path d="M 220,0 L 270,0 L 270,175 L 330,175 L 330,0 L 380,0 L 380,400 L 330,400 L 330,225 L 270,225 L 270,400 L 220,400 Z" />
          {/* U */}
          <path d="M 410,0 L 460,0 L 460,350 L 520,350 L 520,0 L 570,0 L 570,400 L 410,400 Z" />
          {/* V */}
          <path d="M 600,0 L 650,0 L 680,270 L 710,0 L 760,0 L 700,400 L 660,400 Z" />
          {/* O */}
          <path fillRule="evenodd" d="M 790,0 L 950,0 L 950,400 L 790,400 Z M 840,50 L 840,350 L 900,350 L 900,50 Z" />
        </svg>
      </div>

      {/* 2. User Portrait */}
      <div className="absolute right-0 bottom-0 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[620px] h-[75%] sm:h-[85%] md:h-[95%] lg:h-full z-10 flex items-end justify-end pointer-events-none">
        <motion.img
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.1,
          }}
          src="/portrait.png"
          alt="Muhammad Rakibul Hasan Shuvo"
          className="h-full w-auto object-contain object-bottom pointer-events-auto filter drop-shadow-[0_0_30px_rgba(0,240,255,0.15)]"
        />
      </div>

      {/* 3. Tech Stack Marquee (Cyber-Luxury Style) */}
      <div className="absolute top-10 left-0 w-full z-10 overflow-hidden opacity-40 hover:opacity-80 transition-opacity duration-500">
        <Marquee className="py-2" pauseOnHover>
          {TECH_STACK.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-2 mx-4">
              <span className="text-neon-cyan font-mono text-xs opacity-70">{"//"}</span>
              <span className="text-white font-jetbrains text-sm uppercase tracking-widest">{tech}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 4. Sleek Floating Description Card */}
      <div className="relative w-full max-w-xl xl:max-w-2xl z-20 mt-auto md:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 15,
            delay: 0.2,
          }}
          className="glass rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e10]/95 to-[#050506]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(0,240,255,0.03)] group hover:border-neon-cyan/20 transition-all duration-500 overflow-hidden"
        >
          {/* Terminal-like Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-70" />
            </div>
            <span className="text-white/40 font-jetbrains text-[10px] uppercase tracking-widest">sys.identity.reveal</span>
          </div>

          <div className="p-8 md:p-10">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="font-cabinet font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-tight leading-tight">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
                High-Performance UIs.
              </span>
            </h2>

            <div className="space-y-4">
              <p className="text-[#86868B] text-sm md:text-base font-light leading-relaxed font-satoshi">
                My journey started in graphic design, focusing on pixel-perfect layouts.
                After a dedicated self-taught upskilling phase, I bridged the gap to build the actual
                logic behind the designs. Now, as a BSc. CSE student at BOU and an IsDB Scholarship applicant,
                I bring an academic rigor to my engineering.
              </p>

              <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed font-satoshi">
                Today, I use a <span className="text-neon-cyan font-medium">&ldquo;Vibe Coding&rdquo;</span> workflow—focusing on high-level architecture and AI-assisted implementation to build high-performance, visually stunning React components and robust Supabase backends.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-jetbrains text-white/70">UI/UX Design</span>
              <span className="px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-xs font-jetbrains text-neon-cyan">Full-Stack Dev</span>
              <span className="px-3 py-1 rounded-full border border-electric-purple/20 bg-electric-purple/5 text-xs font-jetbrains text-electric-purple">Motion Engineering</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-jetbrains text-white/70">Data Pipelines</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
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
          </div>
        </motion.div>
      </div>

      {/* Dynamic Ambient neon cyan glow behind portrait */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none z-0" />
    </section>
  );
}
