"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import CyberCore from "./CyberCore";
import { useIsMobile } from "@/hooks/use-mobile";

const systemLogs = [
  "INGESTING crawler data from Amolnama node-07...",
  "WRITING 142 parsed records to Supabase buffer",
  "SYNCED Componeo registry cache successfully",
  "HEARTBEAT signal verified (SSL_v3 OK in 16ms)",
  "IZZAN secure token checked [Race-Safe OCC]",
  "EDGE ROUTER calculated database latency: 28ms",
  "REFRESHING developer sandbox sandbox-v2.60",
  "CLEANING socket buffer for active crawler threads",
  "PARSING dynamic political analytics datasets",
  "INITIALIZING quantum database replication layer...",
  "VORTEXA server core CPU load refreshed [18%]",
  "SUSPENDING idle connections to conserve thread locks",
];

export default function CyberCoreShowcase({ isMobileServer }: { isMobileServer?: boolean }) {
  const isMobileClient = useIsMobile();
  const isMobile = isMobileServer ?? isMobileClient;

  // Real-time scrolling terminal logs state
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Populate initial logs
    const initialLogs = [
      `[${new Date(Date.now() - 6000).toLocaleTimeString()}] INGESTING crawler data from Amolnama node-06...`,
      `[${new Date(Date.now() - 4000).toLocaleTimeString()}] SYNCED Componeo registry cache successfully`,
      `[${new Date(Date.now() - 2000).toLocaleTimeString()}] HEARTBEAT signal verified (SSL_v3 OK in 14ms)`,
    ];
    setLogs(initialLogs);

    // 1. Establish live telemetry broadcast pipeline via Supabase Realtime Channels
    let channel: any = null;
    const connectRealtime = async () => {
      try {
        if (
          !process.env.NEXT_PUBLIC_SUPABASE_URL || 
          !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
          process.env.NEXT_PUBLIC_SUPABASE_URL.includes("rrxqdawevybapiufatei")
        ) {
          console.warn("Realtime subscription bypassed: Supabase environment variables missing or pointing to the paused project.");
          return;
        }

        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        
        channel = supabase
          .channel("system-telemetry")
          .on("broadcast", { event: "log" }, (payload: any) => {
            const timestamp = new Date().toLocaleTimeString();
            const logText = payload.payload?.message || "Secure transaction trace captured.";
            setLogs((prev) => [...prev.slice(-5), `[${timestamp}] REALTIME // ${logText}`]);
          })
          .subscribe();
      } catch (err) {
        console.warn("Realtime subscription bypassed, running standard system simulations:", err);
      }
    };

    connectRealtime();

    // 2. Fallback system simulations interval
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLogText = systemLogs[Math.floor(Math.random() * systemLogs.length)];
        const timestamp = new Date().toLocaleTimeString();
        const formattedLog = `[${timestamp}] ${nextLogText}`;
        // Keep the last 6 lines in view
        return [...prev.slice(-5), formattedLog];
      });
    }, 3200);

    return () => {
      clearInterval(interval);
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);


  // System diagnostic interactions to engage the user
  const handleDiagnostics = (action: string) => {
    let message = "";
    if (action === "cores") {
      message = "CORE_DIAG: Re-warming diagnostic cores... cycle count reset.";
    } else if (action === "cache") {
      message = "CACHE_MGMT: Flushed 512KB database replication cache.";
    } else if (action === "reboot") {
      message = "THREAD_CTRL: Restarted ingestion queue successfully [0 ACTIVE].";
    }
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-5), `[${timestamp}] >> ${message}`]);
  };

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 py-24 mb-28 md:mb-36 z-10 overflow-hidden">
      
      {/* HUD Styles Block for Masterclass CAD and CRT Phosphor Visuals */}
      <style>{`
        .hud-border {
          position: relative;
          background: rgba(11, 11, 12, 0.45);
          backdrop-filter: blur(24px);
        }
        
        /* Flawless Glowing Border Trace */
        .hud-border::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(90deg, rgba(0, 240, 255, 0.35), rgba(161, 0, 255, 0.35), rgba(0, 240, 255, 0.05));
          border-radius: 24px;
          z-index: -1;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }

        /* Blueprint CAD Corner Clamps */
        .hud-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 1.5px solid rgba(0, 240, 255, 0.6);
          pointer-events: none;
        }
        .hud-corner-tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .hud-corner-tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .hud-corner-bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
        .hud-corner-br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

        /* CRT Terminal Glowing Phosphor Filter */
        .crt-glow {
          text-shadow: 0 0 5px rgba(0, 240, 255, 0.6);
        }
        .crt-flicker {
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 4px, 6px 100%;
        }
      `}</style>

      {/* 1. Section Header block */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-cabinet font-bold text-white tracking-tight mb-4">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple animate-gradient drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]">Core</span>
        </h2>
        <p className="text-text-muted max-w-xl mx-auto font-light text-sm sm:text-base">
          The central hub of our digital infrastructure. Monitoring vital stats and ensuring peak performance across all nodes in the network.
        </p>
      </m.div>

      {/* 2. Glassmorphic Blueprint HUD Console Panel */}
      <div className="hud-border w-full p-6 md:p-12 rounded-3xl relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_60px_rgba(0,240,255,0.03)] group">
        
        {/* CAD Blueprint Blueprint Grids & Decals */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10" />
        <div className="absolute top-4 left-4 font-mono text-[9px] text-white/25 select-none pointer-events-none">[ + ] CORE DIAGNOSTIC MATRIX</div>
        <div className="absolute top-4 right-4 font-mono text-[9px] text-white/25 select-none pointer-events-none">NODE_SYS_V2.60</div>
        <div className="absolute bottom-4 left-4 font-mono text-[9px] text-[#00F0FF]/30 select-none pointer-events-none">INGESTION_FLOW_ACTIVE</div>
        <div className="absolute bottom-4 right-4 font-mono text-[9px] text-electric-purple/30 select-none pointer-events-none">SECURE_SSL_SYNC</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* COLUMN 1: SYSTEM TELEMETRY (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full relative z-10 order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping shadow-[0_0_8px_#00F0FF]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#00F0FF]">
                System Telemetry
              </h3>
            </div>

            {/* Glowing Corner Scope Container */}
            <div className="bg-black/35 border border-white/5 p-6 rounded-2xl relative shadow-inner space-y-5">
              <div className="hud-corner hud-corner-tl !w-2.5 !h-2.5 !border-neon-cyan/45" />
              <div className="hud-corner hud-corner-tr !w-2.5 !h-2.5 !border-neon-cyan/45" />
              <div className="hud-corner hud-corner-bl !w-2.5 !h-2.5 !border-neon-cyan/45" />
              <div className="hud-corner hud-corner-br !w-2.5 !h-2.5 !border-neon-cyan/45" />

              {/* Metric 1 */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                  <span className="font-bold">MEM USED: 42%</span>
                  <span className="text-white/60">64MB / 128MB</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <m.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "42%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-blue-500 rounded-full shadow-[0_0_8px_#00F0FF]" 
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                  <span className="font-bold">CPU LOAD: 18%</span>
                  <span className="text-white/60">Core_01 [4.8GHz]</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <m.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "18%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-electric-purple to-purple-500 rounded-full shadow-[0_0_8px_#A100FF]" 
                  />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                  <span className="font-bold">EDGE LATENCY: 28ms</span>
                  <span className="text-white/60">BD-Dhaka Server</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <m.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "28%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-electric-purple rounded-full shadow-[0_0_8px_#00F0FF]" 
                  />
                </div>
              </div>

              {/* Metric 4 */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-zinc-400">
                  <span className="font-bold">INGESTION SPEED: 120/s</span>
                  <span className="text-white/60">Race-Safe OCC</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <m.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-[0_0_8px_#10B981]" 
                  />
                </div>
              </div>
            </div>

            {/* Diagnostic Toggles */}
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleDiagnostics("cores")}
                className="py-3 rounded-lg border border-neon-cyan/20 hover:border-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/15 text-[9px] font-mono text-neon-cyan hover:text-white uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer font-bold text-center"
              >
                [ WARM CORES ]
              </button>
              <button 
                onClick={() => handleDiagnostics("cache")}
                className="py-3 rounded-lg border border-electric-purple/20 hover:border-electric-purple bg-electric-purple/5 hover:bg-electric-purple/15 text-[9px] font-mono text-electric-purple hover:text-white uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer font-bold text-center"
              >
                [ FLUSH CACHE ]
              </button>
              <button 
                onClick={() => handleDiagnostics("reboot")}
                className="py-3 rounded-lg border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 text-[9px] font-mono text-zinc-400 hover:text-white uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer font-bold text-center"
              >
                [ REBOOT TRD ]
              </button>
            </div>
          </div>

          {/* COLUMN 2: VOLUMETRIC CYBER CORE (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center relative order-1 lg:order-2">
            
            {/* Heavy Volumetric Neon ambient glow background */}
            <div className="absolute w-[240px] h-[240px] bg-gradient-to-tr from-neon-cyan/20 to-electric-purple/10 blur-[60px] rounded-full animate-pulse pointer-events-none" />
            <div className="absolute w-[180px] h-[180px] bg-electric-purple/5 blur-[45px] rounded-full pointer-events-none" />
            
            {/* Blueprint mechanical concentric rotating rings */}
            <div className="absolute w-[320px] h-[320px] border border-white/[0.03] rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[280px] h-[280px] border border-[#00F0FF]/10 border-dashed rounded-full animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute w-[220px] h-[220px] border border-electric-purple/5 rounded-full animate-[spin_15s_linear_infinite]" />
            
            {/* Blueprint lock brackets wrapping the core */}
            <div className="absolute w-[340px] h-[340px] border border-white/5 rounded-full pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-neon-cyan/20 border-x border-b border-neon-cyan/40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-electric-purple/20 border-x border-t border-electric-purple/40" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1.5 bg-neon-cyan/20 border-y border-r border-neon-cyan/40" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1.5 bg-electric-purple/20 border-y border-l border-electric-purple/40" />
            </div>

            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", stiffness: 50 }}
              className="relative z-10"
            >
              {isMobile === undefined || isMobile === true ? (
                <div className="flex justify-center items-center h-[280px] w-[280px] relative">
                  <svg width="240" height="240" viewBox="0 0 344 344" className="opacity-90 fill-none stroke-neon-cyan animate-[spin_60s_linear_infinite]" strokeWidth="1.5">
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
            </m.div>
          </div>

          {/* COLUMN 3: INGESTION LOGS & SYSTEM CONSOLE (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full relative z-10 order-3">
            <div className="flex items-center gap-2 mb-1 justify-start lg:justify-end">
              <span className="w-2 h-2 rounded-full bg-electric-purple animate-ping shadow-[0_0_8px_#A100FF]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-electric-purple">
                Active Ingestion Feed
              </h3>
            </div>

            {/* Phosphorous Glowing CRT Terminal console */}
            <div className="bg-[#03080e]/90 border border-[#00f0ff]/15 p-5 rounded-2xl h-[240px] flex flex-col gap-3 font-mono text-[10px] leading-relaxed shadow-[inset_0_0_25px_rgba(0,0,0,0.95)] overflow-hidden relative group/console select-none">
              <div className="hud-corner hud-corner-tl !w-2.5 !h-2.5 !border-[#00F0FF]/40" />
              <div className="hud-corner hud-corner-tr !w-2.5 !h-2.5 !border-[#00F0FF]/40" />
              <div className="hud-corner hud-corner-bl !w-2.5 !h-2.5 !border-[#00F0FF]/40" />
              <div className="hud-corner hud-corner-br !w-2.5 !h-2.5 !border-[#00F0FF]/40" />
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-1 select-none pointer-events-none">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/60 shadow-[0_0_4px_#ef4444]" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60 shadow-[0_0_4px_#eab308]" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60 shadow-[0_0_4px_#22c55e]" />
                </div>
                <span className="text-[8px] text-zinc-500 tracking-wider font-mono">shuvo@aether-core:~</span>
              </div>

              {/* Scrolling Terminal lines with glow effects */}
              <div className="flex-1 flex flex-col gap-2.5 overflow-hidden text-[#00F0FF] font-mono crt-glow">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, idx) => (
                    <m.div
                      key={log}
                      initial={{ opacity: 0, x: -10, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`truncate flex items-center ${
                        idx === logs.length - 1 
                          ? "text-white font-bold" 
                          : "text-zinc-500 font-light"
                      }`}
                    >
                      <span>{log}</span>
                      {idx === logs.length - 1 && (
                        <span className="ml-1 w-1.5 h-3.5 bg-[#00F0FF] animate-[pulse_0.8s_infinite] inline-block shadow-[0_0_8px_#00F0FF]" />
                      )}
                    </m.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Holographic grid sweep and CRT scanning effects */}
              <div className="crt-flicker absolute inset-0 pointer-events-none rounded-2xl opacity-60" />
            </div>

            {/* HUD Status tags */}
            <div className="flex gap-4 justify-start lg:justify-end">
              <div className="flex items-center gap-2 border border-[#00F0FF]/15 bg-[#00F0FF]/[0.03] px-4 py-2 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse glow-cyan shadow-[0_0_8px_#00F0FF]" />
                <span className="text-[9px] font-mono text-neon-cyan tracking-widest uppercase font-bold">SYS_ONLINE</span>
              </div>
              <div className="flex items-center gap-2 border border-electric-purple/15 bg-electric-purple/[0.03] px-4 py-2 rounded-full shadow-[0_0_15px_rgba(161,0,255,0.05)]">
                <div className="w-2 h-2 rounded-full bg-electric-purple animate-pulse glow-purple shadow-[0_0_8px_#A100FF]" />
                <span className="text-[9px] font-mono text-electric-purple tracking-widest uppercase font-bold">DATA_SYNC</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
