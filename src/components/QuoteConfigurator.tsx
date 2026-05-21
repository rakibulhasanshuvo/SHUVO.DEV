"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

interface Option {
  id: string;
  name: string;
  price: number;
  multiplier?: number;
  description: string;
}

const serviceTiers: Option[] = [
  {
    id: "conversion",
    name: "Tier 1: Figma/HTML to Next.js",
    price: 1500,
    description: "Converting static layouts or templates into high-performance React code styled via Tailwind CSS.",
  },
  {
    id: "fullstack",
    name: "Tier 2: Full-Stack Integration",
    price: 3500,
    description: "Complete design implementation, custom database integration via Supabase, and Refine admin consoles.",
  },
  {
    id: "experience",
    name: "Tier 3: High-End Motion & Data Pipelines",
    price: 6000,
    description: "Premium motion interfaces (Framer Motion), complex custom data crawls, and absolute optimization.",
  },
];

const timelines: Option[] = [
  {
    id: "standard",
    name: "Standard Lifecycle (4-6 Weeks)",
    price: 0,
    multiplier: 1.0,
    description: "Careful architecture planning, complete testing suite coverage, and secure deployments.",
  },
  {
    id: "expedited",
    name: "Expedited Sprint (2-3 Weeks)",
    price: 0,
    multiplier: 1.3,
    description: "Accelerated development lifecycle with parallel build orchestrations and quickened feedback loops.",
  },
  {
    id: "critical",
    name: "Critical Runway (Sub-7 Days)",
    price: 0,
    multiplier: 1.6,
    description: "Immediate dedicated attention, high-velocity developer commits, and priority deployment schedules.",
  },
];

const scaleOptions: Option[] = [
  {
    id: "small",
    name: "Compact Blueprint (Single Page / Small App)",
    price: 0,
    description: "Optimized landing pages or targeted micro-services with up to 5 custom components.",
  },
  {
    id: "medium",
    name: "Standard Registry (Medium Product / Dashboard)",
    price: 1200,
    description: "Comprehensive multi-page builds, dashboard integrations, and custom database schemas.",
  },
  {
    id: "large",
    name: "Enterprise Multi-Tenant (Massive Platform)",
    price: 3000,
    description: "Highly scalable portal architectures, federated authentication, and custom data processing logs.",
  },
];

interface QuoteConfiguratorProps {
  onSelectSummary: (summary: string) => void;
}

export default function QuoteConfigurator({ onSelectSummary }: QuoteConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Option>(serviceTiers[0]);
  const [selectedTimeline, setSelectedTimeline] = useState<Option>(timelines[0]);
  const [selectedScale, setSelectedScale] = useState<Option>(scaleOptions[0]);
  const [estimatedCost, setEstimatedCost] = useState(1500);

  // Live Price Calculator
  useEffect(() => {
    const base = selectedService.price + selectedScale.price;
    const multiplier = selectedTimeline.multiplier || 1.0;
    const finalPrice = Math.round(base * multiplier);
    setTimeout(() => setEstimatedCost(finalPrice), 0);

    const summaryText = `Service: ${selectedService.name} | Scale: ${selectedScale.name} | Timeline: ${selectedTimeline.name} | Estimated Investment: $${finalPrice}`;
    onSelectSummary(summaryText);
  }, [selectedService, selectedTimeline, selectedScale, onSelectSummary]);

  return (
    <div className="w-full glass rounded-2xl border border-white/10 p-6 md:p-8 bg-gradient-to-b from-[#0b0b0d] to-[#040405] relative overflow-hidden shadow-2xl">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#00F0FF]/5 rounded-full blur-[60px] pointer-events-none" />

      {/* Header Tracker */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#00F0FF]">
          Step {step} of 3: {step === 1 ? "Category Selection" : step === 2 ? "Scale Blueprint" : "Timeline Criticality"}
        </span>
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`w-4 h-1 rounded-full transition-colors duration-300 ${
                s <= step ? "bg-[#00F0FF]" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Option Select Grid */}
      <div className="min-h-[220px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <m.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-cabinet font-bold text-lg text-white mb-2">Select Project Category</h4>
              <div className="grid grid-cols-1 gap-3">
                {serviceTiers.map((tier) => {
                  const isSelected = selectedService.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedService(tier)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#00F0FF]/5 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.05)]"
                          : "bg-white/[0.02] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-satoshi font-semibold text-white text-sm">{tier.name}</span>
                        <span className="font-mono text-xs text-[#00F0FF] font-bold">Base ${tier.price}</span>
                      </div>
                      <p className="text-gray-400 font-satoshi text-xs font-light mt-1.5 leading-relaxed">
                        {tier.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </m.div>
          )}

          {step === 2 && (
            <m.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-cabinet font-bold text-lg text-white mb-2">Select Project Scale</h4>
              <div className="grid grid-cols-1 gap-3">
                {scaleOptions.map((opt) => {
                  const isSelected = selectedScale.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedScale(opt)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#A100FF]/5 border-[#A100FF] shadow-[0_0_20px_rgba(161,0,255,0.05)]"
                          : "bg-white/[0.02] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-satoshi font-semibold text-white text-sm">{opt.name}</span>
                        {opt.price > 0 ? (
                          <span className="font-mono text-xs text-[#A100FF] font-bold">+{opt.price} USD</span>
                        ) : (
                          <span className="font-mono text-xs text-gray-500 font-bold">Standard</span>
                        )}
                      </div>
                      <p className="text-gray-400 font-satoshi text-xs font-light mt-1.5 leading-relaxed">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </m.div>
          )}

          {step === 3 && (
            <m.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-cabinet font-bold text-lg text-white mb-2">Select Timeline & Urgency</h4>
              <div className="grid grid-cols-1 gap-3">
                {timelines.map((time) => {
                  const isSelected = selectedTimeline.id === time.id;
                  return (
                    <button
                      key={time.id}
                      onClick={() => setSelectedTimeline(time)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#00F0FF]/5 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.05)]"
                          : "bg-white/[0.02] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-satoshi font-semibold text-white text-sm">{time.name}</span>
                        <span className="font-mono text-xs text-[#00F0FF] font-bold">x{time.multiplier} multiplier</span>
                      </div>
                      <p className="text-gray-400 font-satoshi text-xs font-light mt-1.5 leading-relaxed">
                        {time.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button Controls and Dynamic Price Board */}
      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Navigation Step buttons */}
        <div className="flex gap-2">
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white font-mono text-xs hover:bg-white/10 active:scale-95 transition-all"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 rounded-lg bg-[#00F0FF] text-black font-mono text-xs font-bold hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] active:scale-95 transition-all"
            >
              Continue
            </button>
          ) : (
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 py-2 px-3 border border-white/5 bg-white/[0.01] rounded-lg">
              Steppers Completed
            </span>
          )}
        </div>

        {/* Investment Counter Frame */}
        <div className="text-right">
          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">
            Estimated Investment
          </span>
          <span className="font-mono text-3xl font-bold text-white tracking-tight">
            ${estimatedCost}{" "}
            <span className="text-xs text-gray-500 font-satoshi font-light font-normal">USD</span>
          </span>
        </div>
      </div>
    </div>
  );
}
