"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

const MotionImage = m(Image);

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

  return (
    <section
      id="about"
      className="relative w-full min-h-[600px] md:min-h-[750px] lg:min-h-[850px] bg-transparent overflow-hidden flex flex-col justify-end px-6 py-12 md:py-20 lg:px-16 scroll-mt-24 mb-28 md:mb-36"
    >
      {/* 1. Stretched Background Text "SHUVO" */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center select-none pointer-events-none z-0">
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

      {/* 2. User Portrait (Absolute overlay on the right) */}
      <div className="absolute right-0 bottom-0 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[620px] h-[75%] sm:h-[85%] md:h-[95%] lg:h-full z-10 flex items-end justify-end pointer-events-none">
        <MotionImage width={764} height={1024}
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.1,
          }}
          src="/portrait.png" fetchPriority="high"
          alt="Muhammad Rakibul Hasan Shuvo" priority={true}
          className="h-full w-auto object-contain object-bottom pointer-events-auto filter drop-shadow-[0_0_30px_rgba(0,240,255,0.15)]"
        />
      </div>

      {/* 3. Sleek Floating Description Card (Rectangle on the bottom-left) */}
      <div className="relative w-full max-w-xl z-20 mt-auto md:mb-6">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 15,
            delay: 0.2,
          }}
          className="glass p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0e10]/95 to-[#050506]/98 md:from-[#0e0e10]/90 md:to-[#050506]/95 backdrop-blur-2xl md:backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(0,240,255,0.03)] group hover:border-neon-cyan/20 transition-all duration-500"
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="font-cabinet font-bold text-3xl md:text-4xl text-white mb-6 tracking-tight leading-tight">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
              High-Performance UIs.
            </span>
          </h2>
          
          <p className="text-[#86868B] text-base md:text-lg font-light leading-relaxed font-satoshi space-y-4">
            My journey started in graphic design, focusing on pixel-perfect layouts. 
            After a gap dedicated to self-taught upskilling, I wanted to build the actual 
            logic behind the designs. Today, I use a &ldquo;Vibe Coding&rdquo; workflow to 
            build high-performance React components.
          </p>

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
        </m.div>
      </div>

      {/* Dynamic Ambient neon cyan glow behind portrait */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none z-0" />
    </section>
  );
}
