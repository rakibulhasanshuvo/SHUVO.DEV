# Angled Endless Scrolling Gallery

**Stack:** Next.js, Tailwind CSS, Framer Motion, TypeScript
**Aesthetic:** Cyber-Luxury (Dark mode, glassmorphism, neon glows)

## Dimensional Refinements & Architecture

To make this component more robust across different devices and screen sizes, the following dimension adjustments have been made compared to the static 1000px version:

1. **Responsive Bounding Box (`min-h-[80vh]`):** Instead of a hardcoded `1000px` height, the wrapper now uses viewport height (`vh`). This ensures the gallery scales beautifully whether it's viewed on a laptop or a massive ultrawide monitor, acting as a perfect hero or break section.
2. **Aggressive Scaling (`scale-[1.75]`):** When rotating a container 60 degrees, standard aspect ratios (like 16:9 monitors) will expose the hidden corners faster than square containers. Bumping the scale from `1.5` to `1.75` guarantees the illusion never breaks on ultra-wide displays.
3. **Responsive Cards (`w-48 md:w-64`):** The image containers scale down slightly on smaller screens to prevent the 4-column grid from becoming too cramped.

## Component Code

```tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Placeholder data for the gallery
const galleryItems = [
  { id: 1, color: "from-purple-500/20 to-blue-500/20", border: "border-purple-500/30" },
  { id: 2, color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/30" },
  { id: 3, color: "from-rose-500/20 to-orange-500/20", border: "border-rose-500/30" },
  { id: 4, color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/30" },
];

export default function AngledGallery() {
  const [isHovered, setIsHovered] = useState(false);

  const GalleryColumn = ({ 
    items, 
    reverse = false, 
    duration = 20 
  }: { 
    items: typeof galleryItems, 
    reverse?: boolean, 
    duration?: number 
  }) => {
    const yAnimation = reverse ? ["-50%", "0%"] : ["0%", "-50%"];

    return (
      <motion.div
        className="flex flex-col gap-4 md:gap-6"
        animate={{ y: yAnimation }}
        transition={{ ease: "linear", duration: duration, repeat: Infinity }}
        style={{ animationPlayState: isHovered ? "paused" : "running" }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`
              w-48 h-72 md:w-64 md:h-96 rounded-2xl backdrop-blur-md bg-white/5 
              border border-white/10 relative overflow-hidden group
              transition-all duration-500 hover:scale-105 hover:z-10
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50`} />
            <div className={`absolute inset-0 border ${item.border} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="absolute bottom-0 left-0 p-4 md:p-6">
              <div className="w-24 md:w-32 h-3 md:h-4 bg-white/20 rounded-full mb-2 md:mb-3" />
              <div className="w-16 md:w-24 h-2 md:h-3 bg-white/10 rounded-full" />
            </div>
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <section 
      className="relative w-full min-h-[80vh] overflow-hidden bg-[#050505] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-90" />
      
      {/* 
        scale-[1.75] ensures no background clipping on 16:9 or ultrawide displays.
        rotate-[60deg] creates the architectural tilt.
      */}
      <div className="absolute flex gap-4 md:gap-6 rotate-[60deg] scale-[1.75] origin-center">
        <GalleryColumn items={galleryItems} reverse={false} duration={25} />
        <GalleryColumn items={galleryItems} reverse={true} duration={30} />
        <GalleryColumn items={galleryItems} reverse={false} duration={20} />
        <GalleryColumn items={galleryItems} reverse={true} duration={35} />
      </div>
    </section>
  );
}
