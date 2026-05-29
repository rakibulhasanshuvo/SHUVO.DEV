"use client";

import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage from left
  y: number; // percentage from top
  spec: string;
  purpose: string;
  performanceMetric: string;
}

const hotspots: Hotspot[] = [
  {
    id: "cpu",
    name: "AMD Ryzen 3 2200G",
    x: 42,
    y: 30.67,
    spec: "4 Cores / 4 Threads @ 3.7GHz Boost",
    purpose: "Symmetric local development sandbox and low-overhead API compilations.",
    performanceMetric: "Optimized 4-core thermal stability",
  },
  {
    id: "gpu",
    name: "AMD Radeon Vega 8",
    x: 46,
    y: 57.87,
    spec: "8 Graphics Cores @ 1100 MHz",
    purpose: "Integrated graphic rasterization, lightweight UI canvas testing, and browser acceleration.",
    performanceMetric: "Power-efficient hardware acceleration",
  },
  {
    id: "ram",
    name: "16GB DDR4 @ 2400MHz",
    x: 56,
    y: 29.33,
    spec: "2400MHz Dual-Channel (14GB Usable)",
    purpose: "Responsive multi-tab development workspaces and efficient background task loops.",
    performanceMetric: "Low-latency memory execution",
  },
  {
    id: "ssd",
    name: "256GB TRM S100 SSD",
    x: 79,
    y: 28,
    spec: "SATA III 6Gb/s Interface",
    purpose: "Rapid operating system boot-ups and responsive IDE project workspace indexing.",
    performanceMetric: "Zero disk-queue compilation speeds",
  },
  {
    id: "cooling",
    name: "AMD Wraith Stealth Cooler",
    x: 14,
    y: 30.67,
    spec: "Silent High-Efficiency Air Cooler",
    purpose: "Maintains reliable operating temperatures during continuous local testing.",
    performanceMetric: "Under 72°C at full CPU utilization",
  },
];

export default function HardwareShowroom() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gradient-to-b from-[#0b0b0d] to-[#040405] rounded-3xl border border-white/10 p-6 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(161,0,255,0.02)] overflow-hidden">
      {/* Absolute Glow Backgrounds */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#00F0FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#A100FF]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-8 relative z-10 text-center md:text-left">
        <span className="text-[10px] font-mono font-extrabold tracking-[0.2em] text-[#c266ff] uppercase px-4 py-1.5 bg-[#A100FF]/10 border border-[#A100FF]/30 rounded-full w-fit">
          Hardware Showroom
        </span>
        <h3 className="font-clash font-extrabold text-3xl md:text-4xl text-white mt-4 tracking-tight leading-none text-balance">
          Workstation & Schematic Design
        </h3>
        <p className="text-zinc-200 font-satoshi text-sm md:text-base mt-3 max-w-xl font-medium leading-relaxed text-pretty">
          My custom-engineered setup optimized for extreme compiling workloads, data crawling bottlenecks, and low-latency asset generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
        {/* Left/Middle Column: SVG Chassis Blueprint */}
        <div className="lg:col-span-3 relative bg-black/60 rounded-2xl border border-white/5 p-4 flex items-center justify-center overflow-hidden">
          {/* Neon Grid Mesh background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Main Chassis SVG */}
          <div className="relative w-full aspect-[4/3] max-w-[500px]">
            <svg
              className="absolute inset-0 w-full h-full text-white/80"
              viewBox="0 0 500 375"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glowing effects */}
                <filter id="glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-purple" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="5.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                {/* Gradients */}
                <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#25252B" />
                  <stop offset="40%" stopColor="#131317" />
                  <stop offset="100%" stopColor="#08080A" />
                </linearGradient>
                <linearGradient id="gpuGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#111114" />
                  <stop offset="35%" stopColor="#2A2A33" />
                  <stop offset="65%" stopColor="#18181E" />
                  <stop offset="100%" stopColor="#0A0A0C" />
                </linearGradient>
                <linearGradient id="rgbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="50%" stopColor="#A100FF" />
                  <stop offset="100%" stopColor="#FF007A" />
                </linearGradient>
                <linearGradient id="glassReflection1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="25%" stopColor="rgba(255,255,255,0.03)" />
                  <stop offset="26%" stopColor="rgba(255,255,255,0.0)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
                </linearGradient>
                <linearGradient id="glassReflection2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
                  <stop offset="55%" stopColor="rgba(255,255,255,0.0)" />
                  <stop offset="65%" stopColor="rgba(255,255,255,0.03)" />
                  <stop offset="80%" stopColor="rgba(255,255,255,0.06)" />
                  <stop offset="81%" stopColor="rgba(255,255,255,0.0)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
                </linearGradient>
                <radialGradient id="cpuGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 240, 255, 0.4)" />
                  <stop offset="60%" stopColor="rgba(161, 0, 255, 0.12)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>

              <style>{`
                @keyframes color-breath {
                  0%, 100% { stroke: #00F0FF; filter: drop-shadow(0 0 2px rgba(0,240,255,0.5)); }
                  50% { stroke: #A100FF; filter: drop-shadow(0 0 6px rgba(161,0,255,0.7)); }
                }
                @keyframes psu-breathing {
                  0%, 100% { fill: #00F0FF; opacity: 0.8; }
                  50% { fill: #A100FF; opacity: 0.4; }
                }
                .rgb-breath-ring {
                  ${shouldReduceMotion ? "" : "animation: color-breath 8s ease-in-out infinite;"}
                }
                .psu-led {
                  ${shouldReduceMotion ? "" : "animation: psu-breathing 4s ease-in-out infinite;"}
                }
                @media (max-width: 1023px) {
                  /* Turn off expensive pixel convolutions and high-frequency repaints on mobile viewports */
                  .rgb-breath-ring, .psu-led, [filter^="url(#glow-"] {
                    filter: none !important;
                    animation: none !important;
                  }
                }
              `}</style>

              {/* PC Chassis Outer Shell (Futuristic Chamfered Bezel) */}
              <rect x="35" y="15" width="430" height="345" rx="18" fill="url(#caseGradient)" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
              <rect x="32" y="12" width="436" height="351" rx="21" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Beveled Chassis Joints */}
              <line x1="32" y1="33" x2="43" y2="33" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <line x1="32" y1="342" x2="43" y2="342" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

              {/* Back / Top Mesh Exhaust Pattern */}
              <line x1="35" y1="35" x2="35" y2="330" stroke="rgba(255,255,255,0.2)" strokeWidth="3.5" strokeDasharray="2 5" />
              <line x1="60" y1="15" x2="430" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="3.5" strokeDasharray="5 5" />

              {/* Tempered Glass Side Window Border */}
              <rect x="43" y="23" width="414" height="329" rx="14" fill="#040405" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

              {/* Motherboard Tray Black PCB */}
              <rect x="95" y="40" width="320" height="240" rx="8" fill="#070709" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              
              {/* Motherboard Copper/Cyan PCB Trace Lines */}
              <path d="M 120,60 L 180,60 L 200,80" stroke="rgba(0,240,255,0.18)" strokeWidth="1" fill="none" />
              <path d="M 120,70 L 150,70 L 160,80 L 160,120" stroke="rgba(161,0,255,0.18)" strokeWidth="1" fill="none" />
              <path d="M 320,60 L 370,60 L 390,80" stroke="rgba(0,240,255,0.12)" strokeWidth="1" fill="none" />
              <path d="M 350,140 L 350,190 L 320,190" stroke="rgba(161,0,255,0.1)" strokeWidth="1" fill="none" />
              
              {/* Motherboard VRM Power Phase Components */}
              <rect x="160" y="52" width="65" height="14" fill="url(#gpuGradient)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="170" y1="52" x2="170" y2="66" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="180" y1="52" x2="180" y2="66" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="190" y1="52" x2="190" y2="66" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="200" y1="52" x2="200" y2="66" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="210" y1="52" x2="210" y2="66" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              
              <rect x="142" y="70" width="14" height="60" fill="url(#gpuGradient)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <g fill="#1F1F27" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5">
                <circle cx="163" cy="78" r="3.2" />
                <circle cx="163" cy="88" r="3.2" />
                <circle cx="163" cy="98" r="3.2" />
                <circle cx="163" cy="108" r="3.2" />
                <circle cx="163" cy="118" r="3.2" />
                <circle cx="163" cy="128" r="3.2" />
              </g>

              {/* Power Supply Shroud Basement */}
              <rect x="43" y="290" width="414" height="62" rx="4" fill="#09090B" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              {/* PSU Hexagonal Mesh Grill cutout */}
              <pattern id="hexMesh" width="8" height="14" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
                <path d="M 4 0 L 8 2.5 L 8 7.5 L 4 10 L 0 7.5 L 0 2.5 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
              </pattern>
              <rect x="250" y="296" width="190" height="50" fill="url(#hexMesh)" />

              {/* PSU Unit & Shroud Logo Window */}
              <rect x="65" y="302" width="130" height="38" rx="6" fill="#030304" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x="75" y="325" fill="#ffffff" className="font-mono text-[9px] font-extrabold tracking-widest uppercase">1200W PLATINUM</text>
              <circle cx="175" cy="321" r="3" className="psu-led" />

              {/* Sleeved Custom PSU Stranded Cables */}
              <g strokeWidth="1.8" fill="none" strokeLinecap="round">
                <path d="M 282,302 C 282,274 316,264 316,252" stroke="#A100FF" />
                <path d="M 286,302 C 286,272 320,262 320,250" stroke="#00F0FF" />
                <path d="M 290,302 C 290,270 324,260 324,248" stroke="#1C1C24" />
                <path d="M 294,302 C 294,268 328,258 328,246" stroke="#A100FF" />
                
                <path d="M 370,116 C 382,116 392,132 392,150" stroke="#00F0FF" strokeWidth="2.2" />
                <path d="M 374,116 C 386,116 396,132 396,150" stroke="#1C1C24" strokeWidth="2.2" />
                <path d="M 378,116 C 390,116 400,132 400,150" stroke="#A100FF" strokeWidth="2.2" />
              </g>
              
              {/* CPU Ambient Heatsink Cooler Shadow Glow */}
              <circle cx="210" cy="115" r="50" fill="url(#cpuGlow)" />

              {/* Wraith Stealth Air Cooler Block */}
              <circle cx="210" cy="115" r="44" fill="#131317" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
              {/* AMD Circular Dynamic RGB Breathing Ring */}
              <circle cx="210" cy="115" r="36" fill="none" strokeWidth="3" className="rgb-breath-ring" />
              {/* Fan Blades (Concentric & Rotated) */}
              <circle cx="210" cy="115" r="28" fill="#070709" />
              <g className={shouldReduceMotion ? "" : "animate-spin"} style={{ animationDuration: '20s', transformOrigin: '210px 115px' }}>
                <path d="M 210,115 C 210,95 200,90 195,95 C 190,100 200,110 210,115 Z" fill="rgba(255,255,255,0.06)" />
                <path d="M 210,115 C 230,115 235,105 230,100 C 225,95 215,105 210,115 Z" fill="rgba(255,255,255,0.06)" />
                <path d="M 210,115 C 210,135 220,140 225,135 C 230,130 220,120 210,115 Z" fill="rgba(255,255,255,0.06)" />
                <path d="M 210,115 C 190,115 185,125 190,130 C 195,135 205,125 210,115 Z" fill="rgba(255,255,255,0.06)" />
              </g>
              {/* Central Core Cap */}
              <circle cx="210" cy="115" r="12" fill="#1B1B20" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <path d="M 205,115 L 215,115 M 210,110 L 210,120" stroke="rgba(0,240,255,0.3)" strokeWidth="1" />

              {/* Rear Chassis Exhaust Fan (With RGB Halo) */}
              <circle cx="70" cy="115" r="26" fill="#131317" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <circle cx="70" cy="115" r="22" stroke="#A100FF" strokeWidth="1.5" filter="url(#glow-purple)" className={`opacity-70 ${shouldReduceMotion ? "" : "rgb-breath-ring"}`} />
              <g className={shouldReduceMotion ? "" : "animate-spin"} style={{ animationDuration: '10s', transformOrigin: '70px 115px' }}>
                <circle cx="70" cy="115" r="6" fill="#25252D" />
                <line x1="70" y1="100" x2="70" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
                <line x1="55" y1="115" x2="85" y2="115" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
              </g>

              {/* Glowing RAM Slots (with addressable RGB tops) */}
              <rect x="272" y="72" width="5" height="85" rx="1" fill="#131316" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <rect x="282" y="72" width="5" height="85" rx="1" fill="#131316" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              {/* RAM RGB Bars with breathing cycles */}
              <rect x="272" y="70" width="5" height="28" rx="1" fill="url(#rgbGradient)" filter="url(#glow-cyan)" className="opacity-85" />
              <rect x="282" y="70" width="5" height="28" rx="1" fill="url(#rgbGradient)" filter="url(#glow-cyan)" className="opacity-85" />

              {/* SATA III SSD Showcase Mounted Module */}
              <rect x="360" y="80" width="48" height="60" rx="4" fill="url(#gpuGradient)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <rect x="365" y="85" width="38" height="50" rx="2" fill="#060608" />
              <text x="372" y="102" fill="rgba(255,255,255,0.85)" className="font-mono text-[7px] font-extrabold tracking-wider">TRM S100</text>
              <line x1="370" y1="110" x2="398" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <rect x="370" y="118" width="6" height="4" fill="#00F0FF" />
              <text x="379" y="122" fill="#00F0FF" className="font-mono text-[5px] font-bold">ACTIVE</text>

              {/* Heavy Duty GPU Expansion Block (AMD Radeon Vega 8 Horizontal Shroud) */}
              <rect x="120" y="195" width="235" height="62" rx="8" fill="url(#gpuGradient)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              
              {/* GPU Heatsink Exposed Fins on Top */}
              <line x1="130" y1="195" x2="340" y2="195" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="3 2" />
              
              {/* GPU Twin Cooling Fan Assemblies */}
              <circle cx="175" cy="226" r="22" fill="#08080A" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <g className={shouldReduceMotion ? "" : "animate-spin"} style={{ animationDuration: '12s', transformOrigin: '175px 226px' }}>
                <circle cx="175" cy="226" r="5" fill="#25252D" />
                <path d="M 175,226 C 175,212 168,208 164,212 C 160,216 168,222 175,226 Z" fill="rgba(255,255,255,0.08)" />
                <path d="M 175,226 C 189,226 193,219 189,215 C 185,211 179,219 175,226 Z" fill="rgba(255,255,255,0.08)" />
                <path d="M 175,226 C 175,240 182,244 186,240 C 190,236 182,230 175,226 Z" fill="rgba(255,255,255,0.08)" />
                <path d="M 175,226 C 161,226 157,233 161,237 C 165,241 171,233 175,226 Z" fill="rgba(255,255,255,0.08)" />
              </g>

              <circle cx="280" cy="226" r="22" fill="#08080A" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <g className={shouldReduceMotion ? "" : "animate-spin"} style={{ animationDuration: '12s', transformOrigin: '280px 226px' }}>
                <circle cx="280" cy="226" r="5" fill="#25252D" />
                <path d="M 280,226 C 280,212 273,208 269,212 C 265,216 273,222 280,226 Z" fill="rgba(255,255,255,0.08)" />
                <path d="M 280,226 C 294,226 298,219 294,215 C 290,211 284,219 280,226 Z" fill="rgba(255,255,255,0.08)" />
                <path d="M 280,226 C 280,240 287,244 291,240 C 295,236 287,230 280,226 Z" fill="rgba(255,255,255,0.08)" />
                <path d="M 280,226 C 266,226 262,233 266,237 C 270,241 276,233 280,226 Z" fill="rgba(255,255,255,0.08)" />
              </g>

              {/* Glowing GPU Logo Accent Plate */}
              <rect x="210" y="202" width="60" height="11" rx="2" fill="#040405" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <text x="217" y="210" fill="#00F0FF" className="font-mono text-[7px] font-extrabold tracking-widest rgb-breath-ring" filter="url(#glow-cyan)">VEGA 8 APU</text>

              {/* Tempered Glass Elegant Multi-Angled Light Reflections */}
              <path d="M 45,23 L 260,23 L 130,349 L 45,349 Z" fill="url(#glassReflection1)" className="pointer-events-none" />
              <path d="M 45,23 L 380,23 L 190,349 L 45,349 Z" fill="url(#glassReflection2)" className="pointer-events-none" />
            </svg>

            {/* Interactive Hotspot Buttons with Radar Waves */}
            {hotspots.map((hs) => {
              const isActive = activeHotspot?.id === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspot(hs)}
                  onMouseEnter={() => setActiveHotspot(hs)}
                  className="absolute w-8 h-8 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full z-20 cursor-pointer"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: "translate(-50%, -50%)" }}
                  aria-label={`Show ${hs.name} detail`}
                >
                  {/* Expanding Radar Wave Ring */}
                  {!shouldReduceMotion && (
                    <span className="absolute w-6 h-6 rounded-full border border-[#00F0FF]/30 animate-ping opacity-60 pointer-events-none hidden lg:block" />
                  )}
                  
                  {/* Glowing Ring */}
                  <span className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
                    isActive 
                      ? "bg-[#00F0FF]/20 border-[#00F0FF]" 
                      : "bg-[#A100FF]/10 border-[#A100FF]/40 group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF]/10"
                  }`} />
                  {/* Internal Dot */}
                  <span className={`w-3.5 h-3.5 rounded-full shadow-lg transition-colors duration-300 ${
                    isActive ? "bg-[#00F0FF]" : "bg-[#A100FF] group-hover:bg-[#00F0FF]"
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Spec Information display (Snaps instantly on hover) */}
        <div className="lg:col-span-2 min-h-[280px] flex flex-col justify-center font-satoshi">
          {activeHotspot ? (
            <div className="glass p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0c0e] to-[#040405] backdrop-blur-xl relative overflow-hidden">
              {/* Small indicator light */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#00F0FF] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                Live Spec
              </div>
              
              <h4 className="font-clash font-bold text-lg text-white mr-12 leading-snug text-balance">
                {activeHotspot.name}
              </h4>
              
              <div className="mt-4 space-y-4">
                <div>
                  <span className="text-[11px] uppercase font-satoshi tracking-wider text-[#c266ff] block font-extrabold">Technical Specification</span>
                  <span className="text-white text-xs font-mono font-bold block mt-0.5 break-words">{activeHotspot.spec}</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-satoshi tracking-wider text-zinc-200 block font-extrabold">Workspace Application</span>
                  <p className="text-zinc-100 text-sm font-medium leading-relaxed mt-0.5 break-words text-pretty">{activeHotspot.purpose}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-satoshi tracking-wider text-[#00F0FF] block font-extrabold">Benchmarked Index</span>
                    <span className="text-[#00F0FF] text-[11px] font-mono font-bold block mt-0.5">{activeHotspot.performanceMetric}</span>
                  </div>
                  
                  <span className="text-[11px] bg-white/5 text-zinc-300 font-satoshi py-1 px-2.5 rounded-md border border-white/5 uppercase tracking-wider font-extrabold">
                    100% OK
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center lg:text-left p-6 border border-white/5 rounded-2xl bg-white/[0.01]">
              <div className="text-4xl mb-4 select-none">🔬</div>
              <h4 className="font-clash font-bold text-lg text-white mb-2 uppercase tracking-wider text-balance">Interactive Blueprint</h4>
              <p className="text-zinc-100 font-satoshi text-sm leading-relaxed max-w-sm mx-auto lg:mx-0 font-medium break-words text-pretty">
                Click or hover over any glowing hotspot pin inside the workstation schematic to inspect structural processor configurations, cooling performance profiles, and active workspace latency indexes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
