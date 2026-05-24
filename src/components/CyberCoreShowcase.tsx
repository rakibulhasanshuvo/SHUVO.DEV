"use client";

import React from "react";
import { motion } from "framer-motion";
import CyberCore from "./CyberCore";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CyberCoreShowcase() {
  const isMobile = useIsMobile();

  return (
    <section className="relative flex flex-col items-center justify-center py-24 mb-28 md:mb-36 z-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-cyber-black/50 backdrop-blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-electric-purple/10 rounded-full blur-[80px] -z-10" />

      {/* Decorative rotating rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/5 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-cabinet font-bold text-white tracking-tight mb-4">
          System <span className="text-neon-cyan glow-cyan-text">Core</span>
        </h2>
        <p className="text-text-muted max-w-xl mx-auto font-light text-sm sm:text-base">
          The central hub of our digital infrastructure. Monitoring vital stats and ensuring peak performance across all nodes in the network.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
        className="relative"
      >
        {/* Ambient glow behind the core */}
        <div className="absolute inset-0 bg-neon-cyan/20 blur-[60px] rounded-full -z-10 animate-pulse pointer-events-none" />

        {isMobile === true ? (
          <div className="flex justify-center items-center h-[280px] w-[280px] relative">
            <div className="absolute inset-0 bg-neon-cyan/5 rounded-full blur-[40px] pointer-events-none" />
            <svg width="240" height="240" viewBox="0 0 344 344" className="opacity-90 fill-none stroke-neon-cyan" strokeWidth="1.5">
              <circle cx="172" cy="172" r="100" strokeDasharray="5 5" className="opacity-30" />
              <circle cx="172" cy="172" r="80" className="opacity-20" />
              <circle cx="172" cy="172" r="68" strokeDasharray="15 5" className="opacity-50" />
              <circle cx="172" cy="172" r="30" className="fill-neon-cyan/10 opacity-70" />
              <circle cx="172" cy="172" r="5" className="fill-neon-cyan opacity-90 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <circle cx="172" cy="172" r="5" className="fill-neon-cyan" />
            </svg>
          </div>
        ) : (
          <CyberCore />
        )}

        {/* Status indicators */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse glow-cyan" />
            <span className="text-[11px] font-jetbrains text-neon-cyan tracking-widest">SYS_ONLINE</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-electric-purple animate-pulse glow-purple" />
            <span className="text-[11px] font-jetbrains text-electric-purple tracking-widest">DATA_SYNC</span>
          </div>
        </div>

        <div className="absolute -left-32 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 items-end">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-jetbrains text-zinc-400 tracking-widest">MEM: 42%</span>
            <div className="w-12 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-neon-cyan w-[42%]" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-jetbrains text-zinc-400 tracking-widest">CPU: 18%</span>
            <div className="w-12 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-electric-purple w-[18%]" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
