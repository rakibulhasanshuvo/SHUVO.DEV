"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const nodes = [
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
];

const nodesById = nodes.reduce((acc, node) => {
  acc[node.id] = node;
  return acc;
}, {} as Record<string, typeof nodes[0]>);

export default function ArchitectureDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

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
        {/* Scrapers -> Queue */}
        <path
          d="M 175,100 L 275,100"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <motion.path
          d="M 175,100 L 275,100"
          fill="none"
          stroke="url(#cyanPurpleGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 15"
          animate={{ strokeDashoffset: [-50, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Queue -> DB */}
        <path
          d="M 425,100 L 525,100"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <motion.path
          d="M 425,100 L 525,100"
          fill="none"
          stroke="url(#purpleGreenGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="12 18"
          animate={{ strokeDashoffset: [-60, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Dynamic Gradients */}
        <defs>
          <linearGradient id="cyanPurpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#A100FF" />
          </linearGradient>
          <linearGradient id="purpleGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A100FF" />
            <stop offset="100%" stopColor="#10B981" />
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
              <motion.circle
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
              <motion.circle
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
                fontSize="11"
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
                fontSize="9"
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
        {activeNode ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5"
          >
            <h4
              className="text-sm font-bold tracking-wide flex items-center gap-2"
              style={{ color: nodes.find((n) => n.id === activeNode)?.color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: nodes.find((n) => n.id === activeNode)?.color }} />
              {nodes.find((n) => n.id === activeNode)?.label}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed font-satoshi font-light">
              {nodes.find((n) => n.id === activeNode)?.info}
            </p>
          </motion.div>
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
