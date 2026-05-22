"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Structure representing the registry units or projects
interface CardItem {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  border: string;
}

const cards: CardItem[] = [
  { 
    id: 1, 
    title: "System Architecture", 
    subtitle: "High-level system orchestrations and server blueprints",
    color: "from-blue-600/10 via-purple-600/5 to-transparent", 
    border: "border-blue-500/20" 
  },
  { 
    id: 2, 
    title: "Real-time Engine", 
    subtitle: "Sub-millisecond data scraping pipelines and stream relays",
    color: "from-emerald-600/10 via-teal-600/5 to-transparent", 
    border: "border-emerald-500/20" 
  },
  { 
    id: 3, 
    title: "Motion Engineering", 
    subtitle: "Fluid vector physics calculations and canvas interpolation",
    color: "from-orange-600/10 via-rose-600/5 to-transparent", 
    border: "border-orange-500/20" 
  },
  { 
    id: 4, 
    title: "Cloud Infrastructure", 
    subtitle: "Isolated cluster allocations and continuous edge deployment",
    color: "from-purple-600/10 via-pink-600/5 to-transparent", 
    border: "border-purple-500/20" 
  },
];

export default function StickyStackGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Captures the complete viewport progression of the layout section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full bg-[#030303] pb-[15vh]">
      {cards.map((card, index) => {
        // Calculates a progressive scale reduction factor based on relative deck layer depth
        const depthFactor = cards.length - index;
        const targetScale = 1 - depthFactor * 0.04;
        
        // Dynamically segments the unified 0-1 scroll progress timeline for each card index
        const startInterval = index * (1 / cards.length);
        
        return (
          <Card 
            key={card.id} 
            card={card} 
            index={index} 
            progress={scrollYProgress} 
            range={[startInterval, 1]} 
            targetScale={targetScale} 
          />
        );
      })}
    </div>
  );
}

import { MotionValue } from "framer-motion";

interface CardProps {
  card: CardItem;
  index: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({ card, index, progress, range, targetScale }) => {
  // Linearly maps scroll position to aesthetic depth variables
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.35]);
  const blurValue = useTransform(progress, range, ["blur(0px)", "blur(4px)"]);

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0 pt-12 px-4 md:px-8">
      <motion.div 
        style={{ scale, opacity, filter: blurValue }}
        className={`
          relative w-full max-w-5xl h-[70vh] md:h-[75vh] rounded-[2.5rem] 
          bg-[#0a0a0c]/60 backdrop-blur-2xl border ${card.border}
          flex flex-col items-center justify-center overflow-hidden
          shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] origin-top
          transition-shadow duration-500 hover:shadow-[0_30px_70px_-10px_rgba(255,255,255,0.02)]
        `}
      >
        {/* Core Ambient Illumination Backdrops */}
        <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
        
        {/* Decorative Grid Mesh overlay to intensify systemic look */}
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Component Interactive Content Structure */}
        <div className="relative z-10 text-center max-w-md px-6">
          <span className="text-xs font-mono text-white/40 tracking-[0.25em] uppercase bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
            Registry Unit 0{card.id}
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white/90 tracking-tight leading-none font-cabinet">
            {card.title}
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/50 font-normal leading-relaxed">
            {card.subtitle}
          </p>
        </div>

        {/* Lower Terminal Accent Accent Lines */}
        <div className="absolute bottom-8 left-10 right-10 flex justify-between items-center z-10 pointer-events-none opacity-40">
          <div className="w-12 h-[1px] bg-white/20" />
          <div className="w-2 h-2 rounded-full border border-white/30" />
          <div className="w-12 h-[1px] bg-white/20" />
        </div>
      </motion.div>
    </div>
  );
};
