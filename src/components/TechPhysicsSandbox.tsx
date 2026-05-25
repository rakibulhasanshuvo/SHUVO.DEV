"use client";

import React, { useRef, useState, useEffect } from "react";
import { m } from "framer-motion";

interface TechPill {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  glow: string;
}

const techSkills = [
  { text: "Next.js", color: "#00F0FF", glow: "rgba(0, 240, 255, 0.4)" },
  { text: "React", color: "#A100FF", glow: "rgba(161, 0, 255, 0.4)" },
  { text: "Supabase", color: "#10B981", glow: "rgba(16, 185, 129, 0.4)" },
  { text: "TypeScript", color: "#3178C6", glow: "rgba(49, 120, 198, 0.4)" },
  { text: "Tailwind", color: "#38BDF8", glow: "rgba(56, 189, 248, 0.4)" },
  { text: "Node.js", color: "#22C55E", glow: "rgba(34, 197, 94, 0.4)" },
  { text: "Docker", color: "#1D63ED", glow: "rgba(29, 99, 237, 0.4)" },
  { text: "Python", color: "#FBBF24", glow: "rgba(251, 191, 36, 0.4)" },
];

import { useIsMobile } from "@/hooks/use-mobile";

export default function TechPhysicsSandbox({ isMobileServer }: { isMobileServer?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isMobileClient = useIsMobile();
  const isMobile = isMobileServer ?? isMobileClient;
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setTimeout(() => setReducedMotion(mediaQuery.matches), 0);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Handle Resize
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: 400,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const showFallback = reducedMotion || isMobile === undefined || isMobile === true;

  // Main Canvas Physics Loop
  useEffect(() => {
    if (showFallback || dimensions.width === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale canvas for high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Initialize pill objects
    const pills: TechPill[] = techSkills.map((tech, idx) => {
      const textWidth = ctx.measureText(tech.text).width + 30; // Approx width
      return {
        text: tech.text,
        color: tech.color,
        glow: tech.glow,
        x: 50 + idx * 70,
        y: 50 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 2,
        width: textWidth,
        height: 32,
      };
    });

    let animationId: number;
    let grabbedPillIdx: number | null = null;
    let mouseX = 0;
    let mouseY = 0;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    // Simulation Parameters
    const gravity = 0.2;
    const friction = 0.98;
    const bounce = -0.6;

    const isInsidePill = (mx: number, my: number, pill: TechPill) => {
      const rx = pill.x - pill.width / 2;
      const ry = pill.y - pill.height / 2;
      return mx >= rx && mx <= rx + pill.width && my >= ry && my <= ry + pill.height;
    };

    // Physics Engine Loop
    const tick = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 1. Update Positions and check collisions
      pills.forEach((p, idx) => {
        if (idx === grabbedPillIdx) {
          // Dragging states
          p.x = mouseX - dragOffsetX;
          p.y = mouseY - dragOffsetY;
          p.vx = 0;
          p.vy = 0;
        } else {
          // Standard physics integration
          p.vy += gravity;
          p.vx *= friction;
          p.vy *= friction;

          p.x += p.vx;
          p.y += p.vy;

          // Wall Collisions
          const rx = p.width / 2;
          const ry = p.height / 2;

          if (p.x - rx < 0) {
            p.x = rx;
            p.vx *= bounce;
          } else if (p.x + rx > dimensions.width) {
            p.x = dimensions.width - rx;
            p.vx *= bounce;
          }

          if (p.y - ry < 0) {
            p.y = ry;
            p.vy *= bounce;
          } else if (p.y + ry > dimensions.height) {
            p.y = dimensions.height - ry;
            p.vy *= bounce;
            p.vx *= 0.95; // Ground friction
          }
        }
      });

      // 2. Inter-pill spatial partitioning collision fallback
      const cellSize = 120; // Grid cell size roughly max pill width
      const cols = Math.ceil(dimensions.width / cellSize) + 1;
      const rows = Math.ceil(dimensions.height / cellSize) + 1;

      // Initialize spatial grid
      const grid: TechPill[][] = Array.from({ length: cols * rows }, () => []);

      // Populate grid
      for (let i = 0; i < pills.length; i++) {
        const p = pills[i];
        const cx = Math.max(0, Math.min(cols - 1, Math.floor(p.x / cellSize)));
        const cy = Math.max(0, Math.min(rows - 1, Math.floor(p.y / cellSize)));
        grid[cy * cols + cx].push(p);
      }

      // Check collisions within adjacent cells
      for (let i = 0; i < pills.length; i++) {
        const pi = pills[i];
        const cx = Math.max(0, Math.min(cols - 1, Math.floor(pi.x / cellSize)));
        const cy = Math.max(0, Math.min(rows - 1, Math.floor(pi.y / cellSize)));

        const minX = Math.max(0, cx - 1);
        const maxX = Math.min(cols - 1, cx + 1);
        const minY = Math.max(0, cy - 1);
        const maxY = Math.min(rows - 1, cy + 1);

        for (let ny = minY; ny <= maxY; ny++) {
          const rowOffset = ny * cols;
          for (let nx = minX; nx <= maxX; nx++) {
            const cell = grid[rowOffset + nx];
            for (let j = 0; j < cell.length; j++) {
              const pj = cell[j];

              // Using string comparison on text as unique identifier to avoid double processing,
              // since index inside grid cell doesn't map to global index easily
              if (pi === pj || pi.text > pj.text) continue;

              const dx = pj.x - pi.x;
              const dy = pj.y - pi.y;
              const minDist = (pi.width + pj.width) * 0.25 + 10;

              // Fast AABB bounding box pre-check
              if (Math.abs(dx) > minDist || Math.abs(dy) > minDist) continue;

              const distSq = dx * dx + dy * dy;
              if (distSq < minDist * minDist && distSq > 0) {
                const dist = Math.sqrt(distSq);

                // Collision response using normalized vectors instead of atan2/cos/sin
                const nxDir = dx / dist;
                const nyDir = dy / dist;

                const targetX = pi.x + nxDir * minDist;
                const targetY = pi.y + nyDir * minDist;

                const ax = (targetX - pj.x) * 0.1;
                const ay = (targetY - pj.y) * 0.1;

                pi.vx -= ax;
                pi.vy -= ay;
                pj.vx += ax;
                pj.vy += ay;
              }
            }
          }
        }
      }

      // 3. Render Canvas Bodies
      pills.forEach((p) => {
        const rx = p.x - p.width / 2;
        const ry = p.y - p.height / 2;

        ctx.save();
        // Pill Glow Border
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = "#0A0A0C";
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;

        // Rounded pill path
        const radius = p.height / 2;
        ctx.beginPath();
        ctx.moveTo(rx + radius, ry);
        ctx.lineTo(rx + p.width - radius, ry);
        ctx.quadraticCurveTo(rx + p.width, ry, rx + p.width, ry + radius);
        ctx.quadraticCurveTo(rx + p.width, ry + p.height, rx + p.width - radius, ry + p.height);
        ctx.lineTo(rx + radius, ry + p.height);
        ctx.quadraticCurveTo(rx, ry + p.height, rx, ry + p.height - radius);
        ctx.quadraticCurveTo(rx, ry, rx + radius, ry);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Pill text
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.text, p.x, p.y + 1);
        ctx.restore();
      });

      animationId = requestAnimationFrame(tick);
    };

    let isIntersecting = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animationId) {
          tick();
        } else if (!isIntersecting && animationId) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      },
      { threshold: 0 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    if (isIntersecting) {
      tick();
    }

    // Event Listeners for Clicking/Dragging
    let cachedRect: DOMRect | null = null;
    const getCoordinates = (e: MouseEvent | TouchEvent, refreshRect = false) => {
      if (!cachedRect || refreshRect) {
        cachedRect = canvas.getBoundingClientRect();
      }
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - cachedRect.left,
        y: clientY - cachedRect.top,
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      const pos = getCoordinates(e, true);
      mouseX = pos.x;
      mouseY = pos.y;

      pills.forEach((p, idx) => {
        if (isInsidePill(mouseX, mouseY, p)) {
          grabbedPillIdx = idx;
          dragOffsetX = mouseX - p.x;
          dragOffsetY = mouseY - p.y;
        }
      });
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const pos = getCoordinates(e, false);
      mouseX = pos.x;
      mouseY = pos.y;
    };

    const handleEnd = () => {
      if (grabbedPillIdx !== null) {
        // Tossing velocity calculations
        const p = pills[grabbedPillIdx];
        p.vx = (Math.random() - 0.5) * 6;
        p.vy = -3 - Math.random() * 4;
      }
      grabbedPillIdx = null;
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [showFallback, dimensions]);

  if (showFallback) {
    // Accessible fallback: static grid list
    return (
      <div className="w-full glass rounded-3xl border border-white/5 p-8 bg-[#0A0A0C]/50 backdrop-blur-md">
        <h3 className="text-sm font-mono font-bold tracking-widest text-text-muted uppercase mb-6 text-center">
          TECH STACK INVENTORY
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techSkills.map((tech) => (
            <div
              key={tech.text}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-sm font-semibold hover:border-neon-cyan/50 hover:bg-neon-cyan/[0.02] transition-all"
              style={{ boxShadow: `0 0 15px ${tech.glow}` }}
            >
              <span style={{ color: tech.color }}>{tech.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl border border-white/10 bg-[#070709] overflow-hidden shadow-2xl"
    >
      <div className="absolute top-4 left-6 z-20 pointer-events-none">
        <span className="text-[9px] font-mono font-bold tracking-widest text-neon-cyan uppercase">
          SKILLS SANDBOX v1.2
        </span>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: `${dimensions.height}px`,
          display: "block",
          cursor: "grab",
        }}
        className="active:cursor-grabbing"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <span className="text-[11px] text-white/30 font-satoshi font-light">
          Click and toss technology pills to simulate elastic gravitational collisions.
        </span>
      </div>
    </div>
  );
}
