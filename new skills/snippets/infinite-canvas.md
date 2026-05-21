---
name: Infinite Canvas Component
description: A pannable, zoomable workspace for exploratory UI layouts in Next.js and Framer Motion.
tags: [nextjs, tailwindcss, framer-motion, canvas]
---

# Infinite Canvas Component

**Stack:** Next.js, Tailwind CSS, Framer Motion, TypeScript
**Aesthetic:** Cyber-Luxury (Grid meshes, floating glass nodes, vast spatial layout)

## Mechanical Overview

The Infinite Canvas component breaks the traditional vertical scrolling paradigm. It creates a vast virtual space that users can explore by clicking and dragging (panning). This is ideal for portfolios, mind maps, or exploratory data visualizations.

1. **Draggable Canvas:** Uses Framer Motion's `drag` property on a massive container.
2. **Spatial Layout:** Elements are positioned using absolute coordinates on the canvas, creating a sense of a physical space.
3. **Parallax Depth (Optional):** By applying different drag coefficients or using scroll-driven transforms relative to the canvas origin, you can create a 3D depth effect.

## Implementation Code

```tsx
"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

// Interface for Canvas Items
interface CanvasNode {
  id: number;
  x: number;
  y: number;
  title: string;
  description: string;
  glow: string;
}

const nodes: CanvasNode[] = [
  { id: 1, x: 1500, y: 1500, title: "Origin Node", description: "The central hub of the system.", glow: "shadow-[0_0_50px_rgba(59,130,246,0.3)]" },
  { id: 2, x: 1000, y: 1800, title: "Neural Net", description: "Processing data streams.", glow: "shadow-[0_0_50px_rgba(16,185,129,0.3)]" },
  { id: 3, x: 2000, y: 1300, title: "Edge Gateway", description: "Connecting external vectors.", glow: "shadow-[0_0_50px_rgba(239,68,68,0.3)]" },
  { id: 4, x: 2200, y: 2000, title: "Quantum Core", description: "Sub-atomic computation.", glow: "shadow-[0_0_50px_rgba(168,85,247,0.3)]" },
];

export default function InfiniteCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef} 
      className="relative w-screen h-screen overflow-hidden bg-[#030303] cursor-grab active:cursor-grabbing"
    >
      {/* Background Grid Pattern - Fixed to viewport for contrast */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#030303_80%)] pointer-events-none" />

      {/* The Pannable Canvas */}
      <motion.div
        drag
        // Large constraints to allow wide exploration
        dragConstraints={{ left: -2000, right: 2000, top: -2000, bottom: 2000 }}
        dragElastic={0.05}
        dragTransition={{ power: 0.2, timeConstant: 200 }}
        className="absolute w-[4000px] h-[4000px]"
        style={{
          // Center the canvas initially (assuming viewport is small relative to 4000px)
          x: -1000,
          y: -1000,
        }}
      >
        {/* Subtle grid that moves with the canvas */}
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:100px_100px]" />

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
            }}
            whileHover={{ scale: 1.05 }}
            className={`
              w-72 p-6 rounded-2xl
              bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/5
              flex flex-col gap-3
              ${node.glow}
              transition-shadow duration-500
            `}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-white/30">Node_0{node.id}</span>
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <h3 className="text-xl font-bold text-white/90">{node.title}</h3>
            <p className="text-sm text-white/50">{node.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* HUD Overlay - Fixed to screen */}
      <div className="absolute bottom-8 left-8 text-white/40 font-mono text-sm pointer-events-none">
        DRAG TO EXPLORE CANVAS
      </div>
    </div>
  );
}
```

## Production Directory Integration

Since this is a layout or full-section component, it should be placed in a directory for large compositions.

```
src/
└── components/
    └── canvas/
        └── InfiniteSpace.tsx
```
