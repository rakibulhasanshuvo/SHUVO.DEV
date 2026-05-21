"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const TiltCard = ({ children, className = "", glowColor = "rgba(0, 240, 255, 0.4)" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spotlight mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Setup Framer Motion values for the tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse position to rotation angles (adjust range for more/less tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    // Spotlight coordinate update
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl group ${className}`}
    >
      {/* Interactive Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`
          ),
        }}
      />
      {/* Content wrapper with base glass styling, preserving 3d transform for inner elements */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-colors group-hover:bg-white/[0.04]"
        style={{ transform: "translateZ(0)" }}
      />
      <div className="relative h-full z-20" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};
