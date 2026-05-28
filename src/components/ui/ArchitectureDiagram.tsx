"use client";

import React, { useState } from "react";
import { m } from "framer-motion";

export interface NodeData {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  color: string;
  glow: string;
  info: string;
}

const nodeConfigMap: Record<string, NodeData[]> = {
  amolnama: [
    {
      id: "scrapers",
      label: "Puppeteer Workers",
      sub: "Serverless Ingest",
      x: 100,
      y: 100,
      color: "#00F0FF",
      glow: "rgba(0, 240, 255, 0.4)",
      info: "10+ concurrent Puppeteer worker instances executing scrape routines on serverless Edge functions.",
    },
    {
      id: "queue",
      label: "Redis Queue",
      sub: "In-Memory buffer",
      x: 350,
      y: 100,
      color: "#A100FF",
      glow: "rgba(161, 0, 255, 0.4)",
      info: "Fast, concurrent in-memory Redis LPUSH/RPOP worker queue throttling high density traffic spikes.",
    },
    {
      id: "db",
      label: "PostgreSQL",
      sub: "Transactional Lock",
      x: 600,
      y: 100,
      color: "#10B981",
      glow: "rgba(16, 185, 129, 0.4)",
      info: "Durable database tier storing version-locked tables, analytics datasets, and index ledger transactions.",
    },
  ],
  componeo: [
    {
      id: "uploader",
      label: "ESM Parser",
      sub: "Upload Handler",
      x: 100,
      y: 100,
      color: "#A100FF",
      glow: "rgba(161, 0, 255, 0.4)",
      info: "Upload trigger performing semantic structural validation and size threshold audits on TSX assets.",
    },
    {
      id: "compiler",
      label: "esbuild Compiler",
      sub: "In-Memory Bundler",
      x: 350,
      y: 100,
      color: "#00F0FF",
      glow: "rgba(0, 240, 255, 0.4)",
      info: "High-performance esbuild-wasm runtime converting standard code into minified, zero-dependency ESM components in 32ms.",
    },
    {
      id: "cache",
      label: "Redis Cache",
      sub: "Edge CDN Cache",
      x: 600,
      y: 100,
      color: "#10B981",
      glow: "rgba(16, 185, 129, 0.4)",
      info: "Redis caches storing bundled components directly at edge points, eliminating standard hard disk file system bottlenecks.",
    },
  ],
  izzan: [
    {
      id: "router",
      label: "Checkout Router",
      sub: "Concurrency Gate",
      x: 100,
      y: 100,
      color: "#10B981",
      glow: "rgba(16, 185, 129, 0.4)",
      info: "API gateway routing dense transactional payloads and flash-sale checkout queues.",
    },
    {
      id: "tx",
      label: "Prisma Transaction",
      sub: "Optimistic Lock",
      x: 350,
      y: 100,
      color: "#00F0FF",
      glow: "rgba(0, 240, 255, 0.4)",
      info: "Active prisma database transactions performing version checking on target inventory tables.",
    },
    {
      id: "db",
      label: "PostgreSQL DB",
      sub: "Durable Storage",
      x: 600,
      y: 100,
      color: "#A100FF",
      glow: "rgba(161, 0, 255, 0.4)",
      info: "PostgreSQL database tier locking rows, committing transactions with zero cart double-sale anomalies.",
    },
  ],
  vortexa: [
    {
      id: "orchestrator",
      label: "API Orchestrator",
      sub: "Request Handler",
      x: 100,
      y: 100,
      color: "#EF4444",
      glow: "rgba(239, 68, 68, 0.4)",
      info: "Clustering agent executing Unix socket queries to assign DB runtimes globally in <1.5s.",
    },
    {
      id: "pool",
      label: "Pre-warm Pool",
      sub: "Standby Containers",
      x: 350,
      y: 100,
      color: "#00F0FF",
      glow: "rgba(0, 240, 255, 0.4)",
      info: "A pool of 10 standby, unassigned database containers kept warm with minimized memory limits.",
    },
    {
      id: "daemon",
      label: "Docker Daemon",
      sub: "Container Socket",
      x: 600,
      y: 100,
      color: "#A100FF",
      glow: "rgba(161, 0, 255, 0.4)",
      info: "Standard socket layer binding networks dynamically to live container nodes, securing top-tier playground response times.",
    },
  ],
};

interface ArchitectureDiagramProps {
  slug: string;
}

export default function ArchitectureDiagram({ slug }: ArchitectureDiagramProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Fallback to amolnama if slug mismatch
  const targetSlug = slug in nodeConfigMap ? slug : "amolnama";
  const nodes = nodeConfigMap[targetSlug];

  const nodesById = React.useMemo(() => {
    return nodes.reduce((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {} as Record<string, NodeData>);
  }, [nodes]);

  const activeNodeData = activeNode ? nodesById[activeNode] : null;

  return (
    <div className="relative w-full glass rounded-3xl border border-white/10 p-6 md:p-8 bg-[#0D0D10]/50 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col items-center select-none">
      {/* Background Neon Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* SVG Canvas */}
      <svg
        className="w-full max-w-3xl h-[200px] md:h-[220px] relative z-10"
        viewBox="0 0 700 200"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Animated Paths */}
        {/* Node 1 -> Node 2 */}
        <path
          d="M 175,100 L 275,100"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <m.path
          d="M 175,100 L 275,100"
          fill="none"
          stroke={`url(#${targetSlug}_grad1)`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 15"
          animate={{ strokeDashoffset: [-50, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Node 2 -> Node 3 */}
        <path
          d="M 425,100 L 525,100"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <m.path
          d="M 425,100 L 525,100"
          fill="none"
          stroke={`url(#${targetSlug}_grad2)`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="12 18"
          animate={{ strokeDashoffset: [-60, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Dynamic Gradients Definitions */}
        <defs>
          {/* Amolnama Gradients */}
          <linearGradient id="amolnama_grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#A100FF" />
          </linearGradient>
          <linearGradient id="amolnama_grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A100FF" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Componeo Gradients */}
          <linearGradient id="componeo_grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A100FF" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <linearGradient id="componeo_grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Izzan Gradients */}
          <linearGradient id="izzan_grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <linearGradient id="izzan_grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#A100FF" />
          </linearGradient>

          {/* Vortexa Gradients */}
          <linearGradient id="vortexa_grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <linearGradient id="vortexa_grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#A100FF" />
          </linearGradient>
        </defs>

        {/* Render Interactive Nodes */}
        {nodes.map((node) => {
          const isHovered = activeNode === node.id;
          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Outer Glow Circle */}
              <m.circle
                cx={node.x}
                cy={node.y}
                r="46"
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                animate={{
                  scale: isHovered ? [1, 1.08, 1] : 1,
                  strokeWidth: isHovered ? 2 : 1,
                  opacity: isHovered ? 1 : 0.4,
                }}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
                style={{ filter: `drop-shadow(0 0 8px ${node.color})` }}
              />

              {/* Solid Inner Body */}
              <circle
                cx={node.x}
                cy={node.y}
                r="40"
                fill="#0E0E12"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
              />

              {/* Hotspot Pulse */}
              <m.circle
                cx={node.x}
                cy={node.y}
                r="3"
                fill={node.color}
                animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Text Labels */}
              <text
                x={node.x}
                y={node.y - 6}
                textAnchor="middle"
                fill="#FFF"
                fontSize="10"
                fontWeight="bold"
                className="font-cabinet tracking-wide pointer-events-none"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 12}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="8"
                className="font-mono tracking-widest uppercase pointer-events-none"
              >
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Explanatory Details Box */}
      <div className="w-full min-h-[90px] mt-6 px-4 py-4 rounded-2xl border border-white/5 bg-white/[0.01] transition-all duration-300">
        {activeNodeData ? (
          <m.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5 text-left"
          >
            <h4
              className="text-sm font-bold tracking-wide flex items-center gap-2"
              style={{ color: activeNodeData.color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeNodeData.color }} />
              {activeNodeData.label}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed font-satoshi font-light">
              {activeNodeData.info}
            </p>
          </m.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-2">
            <p className="text-xs text-white/30 font-satoshi font-light">
              Hover over diagram modules to audit transaction packet pathways & queue behaviors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
