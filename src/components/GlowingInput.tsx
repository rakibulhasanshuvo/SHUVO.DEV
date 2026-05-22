"use client";

import React, { useRef, useState } from "react";

interface GlowingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function GlowingInput({ label, id, ...props }: GlowingInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    setCoords({
      x: e.clientX - rectRef.current.left,
      y: e.clientY - rectRef.current.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full group"
    >
      <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-wider text-gray-500 mb-2">
        {label}
      </label>
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#111115] to-[#08080a] border border-white/5 transition-colors duration-300">
        
        {/* Dynamic Coordinate Spotlight Glow overlay */}
        {(isHovered || isFocused) && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(0, 240, 255, 0.08), transparent 70%)`,
            }}
          />
        )}
        
        {/* Active border color coordinator glow */}
        <div
          className={`absolute inset-0 pointer-events-none border rounded-xl z-10 transition-colors duration-300 ${
            isFocused ? "border-[#00F0FF]/30" : "border-transparent group-hover:border-white/10"
          }`}
        />

        <input
          id={id}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="relative z-20 w-full px-4 py-3 bg-transparent text-white font-satoshi text-sm outline-none placeholder:text-gray-700"
          {...props}
        />
      </div>
    </div>
  );
}

interface GlowingTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function GlowingTextArea({ label, id, ...props }: GlowingTextAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    setCoords({
      x: e.clientX - rectRef.current.left,
      y: e.clientY - rectRef.current.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full group"
    >
      <label htmlFor={id} className="block font-mono text-[11px] uppercase tracking-wider text-gray-500 mb-2">
        {label}
      </label>
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#111115] to-[#08080a] border border-white/5 transition-colors duration-300">
        
        {/* Dynamic Spotlight Glow */}
        {(isHovered || isFocused) && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(161, 0, 255, 0.08), transparent 70%)`,
            }}
          />
        )}
        
        {/* Border glow */}
        <div
          className={`absolute inset-0 pointer-events-none border rounded-xl z-10 transition-colors duration-300 ${
            isFocused ? "border-[#A100FF]/30" : "border-transparent group-hover:border-white/10"
          }`}
        />

        <textarea
          id={id}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={5}
          className="relative z-20 w-full px-4 py-3 bg-transparent text-white font-satoshi text-sm outline-none placeholder:text-gray-700 resize-none"
          {...props}
        />
      </div>
    </div>
  );
}
