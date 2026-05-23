"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function InteractiveGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll-driven opacity: 100% at top → 5% at 100vh
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, typeof window !== "undefined" ? window.innerHeight : 900], [1, 0.05], { clamp: true });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Retina high-DPI rendering support using full viewport dimensions
    const handleResize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse tracking across the entire window for robust interactive physics
    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Constellation Particles (Neural/Database nodes theme with 3D Depth Layering)
    const particleCount = 75;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      z: number; // 3D depth parameter (0.4 to 1.6) for Parallax
      baseRadius: number;
      color: string;
      label?: string; // Optional technical telemetry tag
      labelTimer: number;
    }> = [];

    const colors = [
      "rgba(0, 240, 255,",   // Cyan
      "rgba(161, 0, 255,",   // Electric Purple
      "rgba(100, 180, 255,", // Soft Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 1.2 + 0.4; // depth layer
      // Only attach technical HUD labels to a few foreground particles
      const hasLabel = i < 7 && z > 1.0;
      const label = hasLabel 
        ? "SYS_" + Math.floor(Math.random() * 900 + 100) + "_OK" 
        : undefined;

      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        z,
        baseRadius: z * (Math.random() * 0.75 + 0.5), // Radius scaled by depth
        color: colors[Math.floor(Math.random() * colors.length)],
        label,
        labelTimer: Math.random() * 100,
      });
    }

    // Matrix Code Rain Columns
    const fontSize = 10;
    const columns = Math.floor(window.innerWidth / 36);
    const rainDrops: number[] = [];
    const rainSpeeds: number[] = [];
    const chars = "0101<>/{}[];:?!@#$%&*+=_".split("");

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -120;
      rainSpeeds[x] = Math.random() * 0.8 + 0.4;
    }

    // Spatial hash grid arrays (reused per frame)
    const maxThreadDist = 110;
    let gridCols = Math.ceil(window.innerWidth / maxThreadDist);
    let gridRows = Math.ceil(window.innerHeight / maxThreadDist);
    let grid = new Int32Array(gridCols * gridRows);
    const particleNext = new Int32Array(particleCount);

    // Draw Loop
    const draw = () => {
      // Semi-transparent overlay to create smooth trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      ctx.fillRect(0, 0, width, height);

      // Update grid dimensions if canvas was resized
      const currentCols = Math.ceil(width / maxThreadDist);
      const currentRows = Math.ceil(height / maxThreadDist);
      if (currentCols !== gridCols || currentRows !== gridRows) {
        gridCols = currentCols;
        gridRows = currentRows;
        grid = new Int32Array(gridCols * gridRows);
      }

      // Clear spatial hash grid
      grid.fill(-1);
      particleNext.fill(-1);

      // Populate spatial hash grid
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        const col = Math.floor(p.x / maxThreadDist);
        const row = Math.floor(p.y / maxThreadDist);
        if (col >= 0 && col < gridCols && row >= 0 && row < gridRows) {
          const idx = row * gridCols + col;
          particleNext[i] = grid[idx];
          grid[idx] = i;
        }
      }

      // 1. Draw Spotlight Cursor Lens (ambient backdrop)
      if (mouse.active) {
        const spotlightRadius = 220;
        const glowGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, spotlightRadius
        );
        glowGrad.addColorStop(0, "rgba(0, 240, 255, 0.05)");   // Cyan neon core
        glowGrad.addColorStop(0.4, "rgba(161, 0, 255, 0.025)"); // Purple accent
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");           // Falloff
        
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Constellation Network Pass (Depth Parallax physics & threads)
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Drift particles according to speed and 3D depth scale (nearer moves faster)
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        // Interactive mouse lens repulsion (physically scaled by depth)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          const activeRadius = 180;
          if (dist < activeRadius) {
            const force = (activeRadius - dist) / activeRadius;
            // Foreground particles (higher z) repel much more dynamically
            const pushForce = force * 10 * 0.12 * p.z;
            p.x -= (dx / dist) * pushForce;
            p.y -= (dy / dist) * pushForce;
          }
        }

        // Boundary wrapping based on canvas offset dimensions
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw Node with depth-based opacity
        const nodeOpacity = 0.06 * p.z;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + ` ${nodeOpacity})`;
        ctx.fill();

        // Efficient neighborhood search using spatial hash grid
        const col = Math.floor(p.x / maxThreadDist);
        const row = Math.floor(p.y / maxThreadDist);

        for (let dRow = -1; dRow <= 1; dRow++) {
          for (let dCol = -1; dCol <= 1; dCol++) {
            const c = col + dCol;
            const r = row + dRow;
            if (c >= 0 && c < gridCols && r >= 0 && r < gridRows) {
              let curr = grid[r * gridCols + c];
              while (curr !== -1) {
                if (curr > i) {
                  const p2 = particles[curr];
                  const dist = Math.hypot(p2.x - p.x, p2.y - p.y);
                  if (dist < maxThreadDist) {
                    const alpha = ((maxThreadDist - dist) / maxThreadDist) * 0.035 * Math.min(p.z, p2.z);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 0.6 * Math.min(p.z, p2.z);
                    ctx.stroke();
                  }
                }
                curr = particleNext[curr];
              }
            }
          }
        }

        // 3. Technical Telemetry HUD overlay for labeled nodes
        if (p.label) {
          p.labelTimer += 0.01;
          const blink = Math.sin(p.labelTimer) > 0;
          
          if (blink) {
            ctx.save();
            ctx.font = "6px monospace";
            ctx.fillStyle = "rgba(0, 240, 255, 0.12)";
            
            // Draw a tiny HUD coordinate target mark
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.baseRadius + 4, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(0, 240, 255, 0.06)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
            
            // Draw horizontal crosshair ticks
            ctx.beginPath();
            ctx.moveTo(p.x - 7, p.y);
            ctx.lineTo(p.x + 7, p.y);
            ctx.moveTo(p.x, p.y - 7);
            ctx.lineTo(p.x, p.y + 7);
            ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
            ctx.stroke();

            // Renders scientific tag next to the tracking node
            ctx.fillText(p.label, p.x + 8, p.y + 2);
            ctx.restore();
          }
        }
      }

      // 4. Matrix Code Rain Pass with Authentic Leading Highlight & Fading Trails
      ctx.font = `bold ${fontSize}px monospace`;
      
      for (let i = 0; i < columns; i++) {
        const xPos = i * 36;
        const leadingY = rainDrops[i] * fontSize;
        const trailLength = 10;

        if (leadingY > -100 && leadingY < height + 100) {
          // Render character trail backwards from leading position
          for (let j = 0; j < trailLength; j++) {
            const charY = leadingY - j * fontSize;
            
            // Skip characters outside render viewport
            if (charY <= 0 || charY >= height) continue;

            const baseOpacity = Math.max(0.01, 0.09 * (1 - charY / height));
            const trailFactor = (trailLength - j) / trailLength;
            const opacity = baseOpacity * trailFactor;

            // Generate characters dynamically
            const char = chars[Math.floor((charY + i) % chars.length)];

            if (j === 0) {
              // High-fidelity leader character: Pure white with custom cyber-drop shadows
              ctx.save();
              ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.5})`;
              ctx.shadowColor = i % 3 === 0 ? "rgba(161, 0, 255, 0.8)" : "rgba(0, 240, 255, 0.8)";
              ctx.shadowBlur = 6;
              ctx.fillText(char, xPos, charY);
              ctx.restore();
            } else {
              // Standard tail character in electric purple or cyan
              ctx.fillStyle = i % 3 === 0
                ? `rgba(161, 0, 255, ${opacity * 0.75})` // Purple
                : `rgba(0, 240, 255, ${opacity})`;       // Cyan
              ctx.fillText(char, xPos, charY);
            }
          }
        }

        // Increment raindrop coordinate position
        rainDrops[i] += rainSpeeds[i] * 0.12;

        // Reset code rain track when offscreen
        if (leadingY > height && Math.random() > 0.985) {
          rainDrops[i] = -15;
          rainSpeeds[i] = Math.random() * 0.8 + 0.4;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ opacity, mixBlendMode: "screen" }}
      className="fixed inset-0 w-screen h-screen pointer-events-none -z-20"
    />
  );
}
