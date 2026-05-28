"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";

export interface BrowserMockupProps {
  videoSrc?: string;
  imageSrc?: string;
  posterSrc?: string;
  glowColor: string;
  borderColor: string;
  dotColor: string;
  dotGlow: string;
  projectTitle: string;
  className?: string;
}

export default function BrowserMockup({
  videoSrc,
  imageSrc,
  posterSrc,
  glowColor,
  borderColor,
  dotColor,
  dotGlow,
  projectTitle,
  className = "",
}: BrowserMockupProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative group w-full max-w-[650px] aspect-[16/10] z-10 ${className}`}>
      {/* 3D Pulsing Ambient Backdrop Shadow Glow */}
      <div 
        className="absolute -inset-2 rounded-[2rem] opacity-35 group-hover:opacity-60 blur-3xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`
        }}
      />

      {/* Main Glass Frame Card */}
      <div className={`h-full w-full rounded-2xl border ${borderColor} bg-gradient-to-br from-[#0c0c0e]/95 to-[#040405]/98 backdrop-blur-2xl flex flex-col relative overflow-hidden transition-all duration-500 hover:scale-[1.01] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]`}>
        {/* Browser Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          {/* Red, Yellow, Green macOS Control Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
          </div>

          {/* Translucent Address Bar */}
          <div className="flex items-center justify-center bg-white/[0.04] border border-white/5 rounded-lg px-4 py-1.5 w-1/2 text-center text-[10px] font-mono text-zinc-500 truncate selection:bg-transparent">
            {projectTitle.toLowerCase()}.dev
          </div>

          {/* Glowing Status Locator Dot */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dotColor} ${dotGlow} animate-pulse`} />
          </div>
        </div>

        {/* Media Container Box */}
        <div className="flex-1 relative overflow-hidden w-full h-full bg-[#030303] select-none">
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              muted
              playsInline
              autoPlay
              loop
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
            />
          ) : imageSrc ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={imageSrc}
                alt={`${projectTitle} Showcase`}
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                priority
                className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
              />
              {/* Sleek overlay grid reflection */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-zinc-500 font-mono text-xs">
              No Preview Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
