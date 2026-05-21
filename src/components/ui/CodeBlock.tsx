"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language: string;
  highlightedLines?: number[];
  filename?: string;
  pulseStatus?: string;
}

export default function CodeBlock({
  code,
  language,
  highlightedLines = [],
  filename = "source.ts",
  pulseStatus = "Thread Executing [0ms]"
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#0A0A0C]/90 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-sm leading-relaxed group">
      {/* File Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-70" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-70" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-70" />
          </div>
          <span className="text-white/40 text-xs select-none">|</span>
          <span className="text-white/60 text-xs font-semibold tracking-wide">{filename}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Thread Pulse Status */}
          <div className="flex items-center gap-2 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
            <span className="text-[10px] text-neon-cyan uppercase font-bold tracking-widest">{pulseStatus}</span>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center justify-center p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/15 hover:border-white/20 transition-all cursor-pointer focus:outline-none"
            aria-label="Copy code snippet"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <m.svg
                  key="check"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-4 h-4 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </m.svg>
              ) : (
                <m.svg
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </m.svg>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="relative py-6 overflow-x-auto select-text select-all-text-block">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightedLines.includes(lineNum);
              return (
                <tr
                  key={idx}
                  className={`group/row transition-colors duration-200 ${
                    isHighlighted ? "bg-neon-cyan/[0.04] border-l-2 border-neon-cyan" : "border-l-2 border-transparent"
                  }`}
                >
                  {/* Line Number */}
                  <td className="w-12 text-right pr-4 text-white/20 select-none text-xs font-light font-mono leading-relaxed">
                    {lineNum}
                  </td>
                  {/* Line Content */}
                  <td className={`px-4 text-white/85 font-mono leading-relaxed break-keep whitespace-pre`}>
                    <span className={isHighlighted ? "text-white font-medium" : ""}>
                      {line || " "}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
