"use client";

import React from "react";
import { m } from "framer-motion";

interface TASLProps {
  title: string;
  author: string;
  authorUrl?: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  certId?: string;
}

export default function TASLProvenanceCard({
  title,
  author,
  authorUrl = "https://rakibulhasanshuvo.com",
  sourceUrl,
  license,
  licenseUrl,
  certId = "CERT-2026-SHUVO-00X"
}: TASLProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full rounded-2xl border border-neon-cyan/20 bg-cyber-black backdrop-blur-xl p-6 shadow-none overflow-hidden"
    >
      {/* Dynamic Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Cyber Corner Marks */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-cyan/30" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-cyan/30" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neon-cyan/30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-cyan/30" />

      {/* Certification Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
            VERIFIED PROVENANCE
          </span>
        </div>
        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{certId}</span>
      </div>

      {/* TASL Content */}
      <div className="space-y-4 relative z-10">
        <div>
          <span className="text-[11px] text-text-muted font-mono uppercase block mb-1">Asset Title</span>
          <h4 className="text-sm font-bold font-cabinet text-white tracking-wide">{title}</h4>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[11px] text-text-muted font-mono uppercase block mb-1">Author</span>
            {authorUrl ? (
              <a
                href={authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-white hover:text-neon-cyan hover:underline transition-colors leading-tight"
              >
                {author}
              </a>
            ) : (
              <span className="text-xs font-semibold text-white">{author}</span>
            )}
          </div>

          <div>
            <span className="text-[11px] text-text-muted font-mono uppercase block mb-1">License</span>
            <a
              href={licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-neon-cyan hover:underline transition-colors leading-tight"
            >
              {license}
            </a>
          </div>
        </div>

        <div>
          <span className="text-[11px] text-text-muted font-mono uppercase block mb-1">Source Repository</span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-white/50 hover:text-white transition-colors truncate block leading-none"
          >
            {sourceUrl.replace("https://", "")}
          </a>
        </div>
      </div>

      {/* Decorative seal watermark */}
      <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-neon-cyan/5 rounded-full border border-neon-cyan/10 flex items-center justify-center rotate-12 pointer-events-none select-none">
        <span className="text-[11px] font-mono text-neon-cyan/20 tracking-wider font-bold">CC ORIGINAL</span>
      </div>
    </m.div>
  );
}
