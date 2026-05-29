"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

// Comprehensive database of technical footprint telemetry for each project tech stack
const techTelemetryDatabase: Record<string, Record<string, { role: string; latency: string; limit: string; description: string }>> = {
  amolnama: {
    "Next.js": {
      role: "Client & SSR Router",
      latency: "40ms TTFB",
      limit: "Edge Functions standard boundary",
      description: "Serves static dynamic dashboards, executes telemetry endpoints, and handles on-demand scraper triggers."
    },
    "Puppeteer": {
      role: "Headless Web Scraper",
      latency: "1.2s execution",
      limit: "Max 10 concurrent browser threads",
      description: "Spins up serverless Chrome instances dynamically to evaluate complex target JS tables and extract raw data."
    },
    "Redis": {
      role: "FIFO Ingestion Queue",
      latency: "< 1.5ms read/write",
      limit: "Max 125MB standard memory limit",
      description: "Throttles high density event peaks and queues parsed records asynchronously to prevent DB pool exhaust."
    },
    "PostgreSQL": {
      role: "Durable Data Store",
      latency: "< 12ms transaction locks",
      limit: "Max 100 pool connections",
      description: "Secures structured national metrics data with version concurrency verification."
    },
    "Tailwind CSS": {
      role: "Styling Framework",
      latency: "0ms runtime overhead",
      limit: "None",
      description: "Enables sub-pixel responsive layouts and premium glassmorphic dark-theme variables."
    }
  },
  componeo: {
    "Next.js": {
      role: "Core Framework",
      latency: "35ms TTFB",
      limit: "Serverless runtime limits",
      description: "Handles edge compilation routes and dynamic dashboard render frames."
    },
    "Supabase": {
      role: "Dynamic BaaS & Storage",
      latency: "45ms API response",
      limit: "Standard tier connection pool limits",
      description: "Powers real-time user session persistence and stores pre-compiled component TSX binaries."
    },
    "TypeScript": {
      role: "Type Enforcement",
      latency: "0ms runtime overhead",
      limit: "None",
      description: "Secures registry type integrity and ensures safe ESM component parsing on upload."
    },
    "Tailwind CSS": {
      role: "Styling Engine",
      latency: "0ms runtime",
      limit: "None",
      description: "Drives futuristic visual cues, neon focus outlines, and responsive layouts."
    },
    "esbuild": {
      role: "In-Memory ESM Compiler",
      latency: "32ms bundle build",
      limit: "Wasm memory boundary constraints",
      description: "Compiles uploaded code on-the-fly inside Node edge functions, removing disk I/O bottlenecks completely."
    }
  },
  izzan: {
    "Next.js": {
      role: "SSR Application Layer",
      latency: "40ms execution",
      limit: "Serverless concurrency limits",
      description: "Drives transactional user accounts, Stripe payment sessions, and real-time shipment updates."
    },
    "Prisma": {
      role: "Database ORM Layer",
      latency: "15ms query maps",
      limit: "Max 50 active pool connections",
      description: "Applies isolated schema queries and transactional locks directly in database-agnostic formats."
    },
    "PostgreSQL": {
      role: "ACID Transactional Storage",
      latency: "12ms update cycles",
      limit: "Version tracking checking locks",
      description: "Maintains inventory consistency under intense flash-sale stress via optimistic locking constraints."
    },
    "Stripe": {
      role: "Payment Integration",
      latency: "120ms webhook callback",
      limit: "Rate-limited API requests",
      description: "Executes end-to-end checkout transactions securely, triggering stock decrement upon webhook confirmation."
    },
    "Framer Motion": {
      role: "Animation Engine",
      latency: "60fps hardware acceleration",
      limit: "Main thread execution bounds",
      description: "Renders optimistic cart syncs and slick sliding page transitions."
    }
  },
  vortexa: {
    "React": {
      role: "Client Visual HUD",
      latency: "< 5ms state updates",
      limit: "Virtual DOM diffing loops",
      description: "Renders real-time CPU utilization rings and database sandbox control panels."
    },
    "Node.js": {
      role: "Hosting API Orchestrator",
      latency: "50ms orchestration",
      limit: "Event loop process limits",
      description: "Interfaces linux daemons, parses metrics, and triggers sandbox allocations."
    },
    "Docker": {
      role: "Database Container Sandboxing",
      latency: "< 1.2s pre-warmed spin-up",
      limit: "Max 50 memory-capped active containers",
      description: "Spins up isolated database runtimes on-demand using local Unix socket bridges."
    },
    "Redis": {
      role: "Pre-warmed Container Pool",
      latency: "< 1.2ms pops",
      limit: "In-memory standby limits",
      description: "Maintains a list of standby unassigned containers, popping them instantly to clicking users."
    },
    "MongoDB": {
      role: "Cluster Logs Store",
      latency: "20ms logs pipeline",
      limit: "Dynamic sharding limits",
      description: "Stores real-time cluster utilization records, tracking resource constraints dynamically."
    }
  }
};

interface TechStackTelemetryProps {
  techList: string[];
  slug: string;
  style: {
    bgColor: string;
    textColor: string;
    borderColor: string;
    dotGlow: string;
    spotlightColor: string;
  };
}

export default function TechStackTelemetry({ techList, slug, style }: TechStackTelemetryProps) {
  const projectTelemetry = techTelemetryDatabase[slug] || techTelemetryDatabase.amolnama;
  const [selectedTech, setSelectedTech] = useState<string>(techList[0] || "Next.js");

  const telemetry = projectTelemetry[selectedTech] || {
    role: "System Module",
    latency: "N/A",
    limit: "N/A",
    description: "Core architecture build component executing in secure sandboxed layers."
  };

  return (
    <div className="w-full space-y-6 select-none">
      {/* Clickable Tech Stack Badges */}
      <div className="flex flex-wrap gap-2.5">
        {techList.map((tech) => {
          const isActive = selectedTech === tech;
          return (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`text-xs font-mono font-bold px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                isActive
                  ? `bg-white/5 ${style.textColor} ${style.borderColor} ${style.dotGlow}`
                  : "bg-white/[0.01] border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
              }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      {/* Cyberpunk Diagnostic Console Screen */}
      <div 
        className={`glass p-6 rounded-2xl border ${style.borderColor} bg-[#0A0A0C]/80 relative overflow-hidden transition-all duration-300`}
        style={{ boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px ${style.spotlightColor}` }}
      >
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Diagnostic Banner Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4 text-[10px] font-mono font-bold tracking-widest text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.bgColor} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${style.bgColor}`}></span>
            </span>
            <span className={style.textColor}>SYSTEM AUDIT: {selectedTech.toUpperCase()} {"// ACTIVE"}</span>
          </div>
          <span>LOGS PORT: {selectedTech.slice(0, 3).toUpperCase()}-990</span>
        </div>

        {/* Telemetry Readout Grid */}
        <AnimatePresence mode="wait">
          <m.div
            key={selectedTech}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Column 1: Core Role */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-extrabold block">FUNCTIONAL ROLE</span>
              <span className="text-sm font-bold font-cabinet text-white tracking-wide block">
                {telemetry.role}
              </span>
            </div>

            {/* Column 2: Latency Benchmark */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-extrabold block">LATENCY PROFILE</span>
              <span className="text-sm font-bold font-mono text-white tracking-wide block">
                {telemetry.latency}
              </span>
            </div>

            {/* Column 3: Scaling Limits */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-extrabold block">OPERATIONAL CONSTRAINT</span>
              <span className="text-sm font-bold font-mono text-white tracking-wide block">
                {telemetry.limit}
              </span>
            </div>

            {/* Full Width Description Row */}
            <div className="md:col-span-3 border-t border-white/5 pt-4 mt-2">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest font-extrabold block mb-1">MODULE DESCRIPTION</span>
              <p className="text-xs text-zinc-400 font-satoshi font-light leading-relaxed">
                {telemetry.description}
              </p>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
