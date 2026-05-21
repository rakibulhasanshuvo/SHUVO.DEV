"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
}

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  hasActiveHover: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
}

export default function ProjectCard({
  project,
  isHovered,
  hasActiveHover,
  onHover,
  onHoverEnd
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number>(0);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Cache client rectangle once on mouse enter to avoid layout thrashing
  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    onHover();
  };

  // rAF-batched mouse spotlight — coalesces rapid mousemove events into
  // a single DOM write per animation frame, preventing redundant style recalcs
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!rectRef.current || !cardRef.current) return;
      const x = clientX - rectRef.current.left;
      const y = clientY - rectRef.current.top;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    });
  }, []);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 25 };

  // WCAG 2.4.7 compliant opacity logic:
  // - Never fully invisible (minimum 0.05 for visible card borders)
  // - Keyboard focus (isFocusedWithin) restores full opacity
  // - Reduced motion disables all opacity changes
  const contentOpacity = shouldReduceMotion
    ? 1
    : (isHovered || isFocusedWithin)
      ? 1
      : hasActiveHover
        ? 0.05
        : 1;

  return (
    <motion.div
      ref={cardRef}
      role="listitem"
      onMouseMove={onMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverEnd}
      onFocus={() => setIsFocusedWithin(true)}
      onBlur={() => setIsFocusedWithin(false)}
      layout
      className={`
        group relative overflow-hidden rounded-2xl bg-[#0a0a0c]/60 backdrop-blur-xl
        border border-white/5 cursor-pointer h-full
        [contain:paint]
        transition-colors duration-500 group-hover:border-white/10
        has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neon-cyan has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-black
        /* Pseudo-element Spotlight */
        before:absolute before:inset-0 before:pointer-events-none before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
        before:bg-[radial-gradient(150px_circle_at_var(--mouse-x)_var(--mouse-y),var(--glow-color),transparent)]
      `}
      style={{
        ['--glow-color' as string]: project.glowColor
      }}
      transition={transition}
    >
      {/* Ambient Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

      {/* Semantic card content with animated opacity */}
      <motion.article
        animate={{ opacity: contentOpacity }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col justify-between h-full w-full p-8"
      >
        <div>
          <div 
            className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-[filter] duration-500"
            aria-hidden="true"
          >
            {project.icon}
          </div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{project.subtitle}</span>
          <h3 className="text-2xl font-bold mt-2 text-white/90 text-pretty">
            {/* Heading-link + ::after stretch pattern (Heydon Pickering recommended):
                The link wraps the title text and its ::after pseudo-element
                stretches to cover the entire card for full click coverage.
                Screen readers naturally announce the project title. */}
            <Link 
              href={`/projects#${project.id}`}
              className="after:absolute after:inset-0 after:z-20 after:content-[''] focus:outline-none focus-visible:outline-none"
            >
              {project.title}
              <span className="sr-only"> — {project.subtitle}. {project.description}</span>
            </Link>
          </h3>
          <p className="text-sm text-white/60 mt-2 font-light">{project.description}</p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-neon-cyan group-hover:text-cyan-300 transition-colors font-mono tracking-wider">
            Explore Case Study &rarr;
          </span>
        </div>
      </motion.article>
    </motion.div>
  );
}
