"use client";

import React, { useState } from "react";

// Minimal decorative gallery items with elegant gradient parameters
const galleryItems = [
  { id: 1, color: "from-purple-500/20 to-blue-500/20", border: "border-purple-500/30" },
  { id: 2, color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/30" },
  { id: 3, color: "from-rose-500/20 to-orange-500/20", border: "border-rose-500/30" },
  { id: 4, color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/30" },
];

interface GalleryColumnProps {
  items: typeof galleryItems;
  reverse?: boolean;
  duration?: number;
}

const GalleryColumn = ({ 
  items, 
  reverse = false, 
  duration = 20 
}: GalleryColumnProps) => {
  const [columnHovered, setColumnHovered] = useState(false);
  return (
    <div
      className={`flex flex-col will-change-transform ${reverse ? 'animate-scroll-reverse' : 'animate-scroll'}`}
      style={{ 
        animationDuration: `${duration}s`,
        animationPlayState: columnHovered ? "paused" : "running" 
      }}
      onMouseEnter={() => setColumnHovered(true)}
      onMouseLeave={() => setColumnHovered(false)}
    >
      {[...items, ...items].map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className={`
            w-48 h-[432px] md:w-64 md:h-[576px] rounded-2xl backdrop-blur-md bg-white/5 
            border border-white/10 relative overflow-hidden group
            transition-all duration-500 hover:scale-105 hover:z-10
            mb-4 md:mb-6
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
    </div>
  );
};

export default function AngledGallery() {
  return (
    <section 
      className="relative w-full min-h-[100vh] overflow-hidden bg-transparent flex items-center justify-center mb-28 md:mb-36"
    >
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0) translateZ(0); }
          100% { transform: translateY(-50%) translateZ(0); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateY(-50%) translateZ(0); }
          100% { transform: translateY(0) translateZ(0); }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-90" />
      
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
