"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

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
    name: "AMD Ryzen 9 7950X",
    x: 48,
    y: 38,
    spec: "16 Cores / 32 Threads @ 5.7GHz Boost",
    purpose: "Parallel bot scraper orchestrations and ultra-fast Next.js production builds.",
    performanceMetric: "2.4x build compiler speedup",
  },
  {
    id: "gpu",
    name: "NVIDIA RTX 4090 24GB",
    x: 45,
    y: 65,
    spec: "24GB GDDR6X / 16,384 CUDA Cores",
    purpose: "Edge-based Satori OG image renders, local LLM experiments, and 3D WebGPU canvas processing.",
    performanceMetric: "0.1ms render latency per frame",
  },
  {
    id: "ram",
    name: "64GB DDR5 G.Skill Trident Z5",
    x: 62,
    y: 38,
    spec: "6400MT/s CL32 Dual Channel",
    purpose: "Smooth multi-container Docker development environments and high-density local database caching.",
    performanceMetric: "Zero micro-stutter compilation loops",
  },
  {
    id: "ssd",
    name: "2TB Samsung 990 Pro PCIe 5.0",
    x: 65,
    y: 52,
    spec: "7,450 MB/s Sequential Reads",
    purpose: "Sub-millisecond access times for massive web scraping log parsing and git workspace indexes.",
    performanceMetric: "14.2 GB/s cached read throughput",
  },
  {
    id: "cooling",
    name: "Custom Liquid Loop & Lian Li Fans",
    x: 32,
    y: 22,
    spec: "360mm Radiator + Silent Static Pressure Fans",
    purpose: "Sustained high compute loads during heavy web crawling without thermal throttling.",
    performanceMetric: "Under 68°C at 100% full CPU utilization",
  },
];

export default function HardwareShowroom() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gradient-to-b from-[#0b0b0d] to-[#040405] rounded-3xl border border-white/10 p-6 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(161,0,255,0.02)] overflow-hidden">
      {/* Absolute Glow Backgrounds */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#00F0FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#A100FF]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-8 relative z-10 text-center md:text-left">
        <span className="text-[#A100FF] font-mono text-xs uppercase tracking-widest px-3 py-1 bg-[#A100FF]/10 rounded-full border border-[#A100FF]/20">
          Hardware Showroom
        </span>
        <h3 className="font-cabinet font-bold text-3xl md:text-4xl text-white mt-4 tracking-tight">
          Workstation & Schematic Design
        </h3>
        <p className="text-gray-400 font-satoshi text-sm md:text-base mt-2 max-w-xl font-light">
          My custom-engineered setup optimized for extreme compiling workloads, data crawling bottlenecks, and low-latency asset generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
        {/* Left/Middle Column: SVG Chassis Blueprint */}
        <div className="lg:col-span-3 relative bg-black/60 rounded-2xl border border-white/5 p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
          {/* Neon Grid Mesh background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Main Chassis SVG */}
          <svg
            className="w-full h-full text-gray-800"
            viewBox="0 0 500 375"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Chassis Outer Shell */}
            <rect x="50" y="30" width="400" height="315" rx="16" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="6 4" />
            <rect x="47" y="27" width="406" height="321" rx="18" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            
            {/* Power Supply Basement */}
            <rect x="50" y="295" width="220" height="50" rx="4" fill="rgba(20,20,22,0.6)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="80" y1="295" x2="80" y2="345" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="110" y1="295" x2="110" y2="345" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="140" y1="295" x2="140" y2="345" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="60" y="325" fill="rgba(255,255,255,0.3)" className="font-mono text-[9px]">1200W PSU</text>
            
            {/* Motherboard Tray Outline */}
            <rect x="120" y="60" width="280" height="220" rx="8" fill="rgba(12,12,14,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {/* CPU Socket & Cooler */}
            <rect x="220" y="110" width="60" height="60" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(0,240,255,0.2)" strokeWidth="1" />
            <circle cx="250" cy="140" r="24" stroke="rgba(0,240,255,0.3)" strokeWidth="2" strokeDasharray="40 10" className="animate-spin" style={{ animationDuration: '20s' }} />
            
            {/* RAM Slots */}
            <rect x="295" y="105" width="8" height="70" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(161,0,255,0.2)" strokeWidth="1" />
            <rect x="307" y="105" width="8" height="70" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(161,0,255,0.2)" strokeWidth="1" />
            <rect x="319" y="105" width="8" height="70" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(161,0,255,0.2)" strokeWidth="1" />
            <rect x="331" y="105" width="8" height="70" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(161,0,255,0.2)" strokeWidth="1" />

            {/* M.2 SSD Cover */}
            <rect x="300" y="188" width="45" height="15" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="304" y="199" fill="rgba(255,255,255,0.4)" className="font-mono text-[6px]">PCIe 5.0 M.2</text>
            
            {/* GPU (RTX 4090) Giant Block */}
            <rect x="140" y="210" width="220" height="60" rx="6" fill="rgba(20,20,22,0.9)" stroke="rgba(161,0,255,0.3)" strokeWidth="1.5" />
            {/* Fan circular cuts */}
            <circle cx="190" cy="240" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="250" cy="240" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="310" cy="240" r="18" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="155" y="243" fill="rgba(255,255,255,0.5)" className="font-mono text-[9px] tracking-widest font-bold">RTX 4090</text>
            
            {/* Liquid Cooling Tubes (flowing layout) */}
            <path d="M 230,120 C 230,80 140,80 140,110 L 140,180" fill="none" stroke="rgba(0,240,255,0.2)" strokeWidth="4" />
            <path d="M 270,120 C 270,80 150,80 150,110 L 150,180" fill="none" stroke="rgba(0,240,255,0.1)" strokeWidth="2" />
            <rect x="120" y="180" width="40" height="20" rx="2" fill="rgba(10,10,12,0.8)" stroke="rgba(0,240,255,0.3)" strokeWidth="1" />
            <text x="124" y="192" fill="rgba(0,240,255,0.8)" className="font-mono text-[7px]">PUMP</text>
            
            {/* Radiator on Top */}
            <rect x="120" y="40" width="240" height="15" rx="2" fill="rgba(20,20,22,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx="160" cy="47" r="12" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="240" cy="47" r="12" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="320" cy="47" r="12" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </svg>

          {/* Interactive Hotspot Buttons */}
          {hotspots.map((hs) => {
            const isActive = activeHotspot?.id === hs.id;
            return (
              <button
                key={hs.id}
                onClick={() => setActiveHotspot(hs)}
                onMouseEnter={() => setActiveHotspot(hs)}
                className="absolute w-8 h-8 flex items-center justify-center group focus:outline-none transition-all duration-300 z-20"
                style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: "translate(-50%, -50%)" }}
                aria-label={`Show ${hs.name} detail`}
              >
                {/* Glowing Pulsing Ring */}
                <span className={`absolute inset-0 rounded-full border transition-all duration-500 scale-100 ${
                  isActive 
                    ? "bg-[#00F0FF]/20 border-[#00F0FF] animate-ping" 
                    : "bg-[#A100FF]/10 border-[#A100FF]/40 group-hover:scale-125 group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF]/10"
                }`} />
                {/* Internal Dot */}
                <span className={`w-3.5 h-3.5 rounded-full shadow-lg transition-all duration-300 ${
                  isActive ? "bg-[#00F0FF] scale-110" : "bg-[#A100FF] group-hover:bg-[#00F0FF]"
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Spec Information display */}
        <div className="lg:col-span-2 min-h-[280px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeHotspot ? (
              <m.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="glass p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0c0e] to-[#040405] backdrop-blur-xl relative overflow-hidden"
              >
                {/* Small indicator light */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#00F0FF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  Live Spec
                </div>
                
                <h4 className="font-cabinet font-bold text-xl text-white mr-12 leading-snug">
                  {activeHotspot.name}
                </h4>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#A100FF] block">Technical Specification</span>
                    <span className="text-white text-sm font-satoshi font-medium block mt-0.5">{activeHotspot.spec}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Workspace Application</span>
                    <p className="text-gray-300 text-xs font-satoshi font-light leading-relaxed mt-0.5">{activeHotspot.purpose}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-wider text-[#00F0FF] block">Benchmarked Index</span>
                      <span className="text-white text-xs font-mono font-semibold block mt-0.5">{activeHotspot.performanceMetric}</span>
                    </div>
                    
                    <span className="text-xs bg-white/5 text-gray-400 font-mono py-1 px-2.5 rounded-md border border-white/5">
                      100% OK
                    </span>
                  </div>
                </div>
              </m.div>
            ) : (
              <m.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center lg:text-left p-6 border border-white/5 rounded-2xl bg-white/[0.01]"
              >
                <div className="text-4xl mb-4 select-none">🔬</div>
                <h4 className="font-cabinet font-bold text-lg text-white mb-2">Interactive Blueprint</h4>
                <p className="text-gray-400 font-satoshi text-xs leading-relaxed max-w-sm mx-auto lg:mx-0 font-light">
                  Click or hover over any glowing hotspot pin inside the workstation schematic to inspect structural processor configurations, cooling performance profiles, and active workspace latency indexes.
                </p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
