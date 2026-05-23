"use client";

import React from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";

const reviews = [
  {
    id: 1,
    quote: "Shuvo delivered an exceptional project. The attention to detail and performance optimization was outstanding. Our load times dropped by 60% and the aesthetics are world-class.",
    initials: "JD",
    name: "John Doe",
    title: "CEO, TechCorp",
    glowColor: "rgba(0, 240, 255, 0.25)"
  },
  {
    id: 2,
    quote: "The Cyber-Luxury aesthetic was exactly what we needed for our brand. Shuvo's ability to bridge high-end design with stable engineering is rare. Highly recommended.",
    initials: "AS",
    name: "Alice Smith",
    title: "Founder, DesignAgency",
    glowColor: "rgba(161, 0, 255, 0.25)"
  },
  {
    id: 3,
    quote: "Working with Shuvo was a masterclass in collaboration. He designed and engineered our SaaS platform's dashboard from the ground up, delivering ahead of schedule.",
    initials: "MV",
    name: "Marcus Vance",
    title: "VP of Product, Vortexa",
    glowColor: "rgba(0, 240, 255, 0.2)"
  }
];

export default function ClientReviews() {
  return (
    <section id="reviews" className="scroll-mt-24 mb-28 md:mb-36 max-w-[1440px] mx-auto px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-neon-cyan/5 rounded-full blur-[180px] -z-10 pointer-events-none" />
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full"
        >
          CLIENT TESTIMONIALS
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-cabinet font-black text-white tracking-tight mt-6"
        >
          Valued <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple animate-gradient drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">Feedback</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-muted max-w-xl mx-auto font-light mt-4 text-sm sm:text-base leading-relaxed"
        >
          Read reviews from global product leaders and creators who have collaborated with SHUVO.DEV to engineer high-end web applications.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bento Cell 1: Overall Score Badge (Left Column) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent shadow-xl relative overflow-hidden group flex flex-col justify-between min-h-[220px]"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/5 rounded-full blur-2xl group-hover:bg-neon-cyan/10 transition-colors" />
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse glow-cyan"></span>
              <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest font-bold">Verified Success</span>
            </div>
            <h3 className="font-cabinet font-black text-6xl text-white tracking-tighter">
              4.9<span className="text-neon-cyan text-4xl">/5.0</span>
            </h3>
            <div className="flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-text-muted">
            <span className="font-medium">Upwork Job Success</span>
            <span className="font-mono text-white font-bold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">100%</span>
          </div>
        </motion.div>

        {/* Bento Cell 2: Primary Testimonial (Center-Right Span 2 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <TiltCard className="w-full h-full" glowColor={reviews[0].glowColor}>
            <div className="p-8 h-full flex flex-col justify-between rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-neon-cyan/5 blur-3xl rounded-full group-hover:bg-neon-cyan/10 transition-all duration-500" />
              <span className="absolute top-2 right-6 text-9xl font-cabinet text-white/5 select-none font-bold">"</span>
              
              <div>
                <span className="text-[10px] font-mono text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20 px-3 py-1 rounded-full font-bold uppercase tracking-widest inline-block mb-6">
                  Featured Review
                </span>
                <p className="text-zinc-200 text-lg sm:text-xl font-light leading-relaxed relative z-10 italic">
                  "{reviews[0].quote}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan text-base font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                    {reviews[0].initials}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-base leading-tight font-cabinet">{reviews[0].name}</h5>
                    <p className="text-xs text-text-muted mt-0.5">{reviews[0].title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Project Completed
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Bento Cell 3: Second Testimonial (Left Column) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TiltCard className="w-full h-full" glowColor={reviews[2].glowColor}>
            <div className="p-8 h-full flex flex-col justify-between rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent relative overflow-hidden group min-h-[280px]">
              <div className="absolute -top-20 -right-20 w-36 h-36 bg-neon-cyan/5 blur-3xl rounded-full" />
              <span className="absolute top-2 right-4 text-8xl font-cabinet text-white/5 select-none font-bold">"</span>
              
              <p className="text-zinc-300 text-sm font-light leading-relaxed relative z-10">
                "{reviews[2].quote}"
              </p>

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5 relative z-10">
                <div className="w-10 h-10 rounded-full bg-neon-cyan/25 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan text-sm font-bold">
                  {reviews[2].initials}
                </div>
                <div>
                  <h6 className="font-bold text-white text-sm font-cabinet">{reviews[2].name}</h6>
                  <p className="text-[10px] text-text-muted mt-0.5">{reviews[2].title}</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Bento Cell 4: Third Testimonial (Center Column) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <TiltCard className="w-full h-full" glowColor={reviews[1].glowColor}>
            <div className="p-8 h-full flex flex-col justify-between rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent relative overflow-hidden group min-h-[280px]">
              <div className="absolute -top-20 -right-20 w-36 h-36 bg-electric-purple/5 blur-3xl rounded-full" />
              <span className="absolute top-2 right-4 text-8xl font-cabinet text-white/5 select-none font-bold">"</span>
              
              <p className="text-zinc-300 text-sm font-light leading-relaxed relative z-10">
                "{reviews[1].quote}"
              </p>

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5 relative z-10">
                <div className="w-10 h-10 rounded-full bg-electric-purple/20 border border-electric-purple/30 flex items-center justify-center text-electric-purple text-sm font-bold">
                  {reviews[1].initials}
                </div>
                <div>
                  <h6 className="font-bold text-white text-sm font-cabinet">{reviews[1].name}</h6>
                  <p className="text-[10px] text-text-muted mt-0.5">{reviews[1].title}</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Bento Cell 5: Stats Rating Breakdown (Right Column) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent shadow-xl relative overflow-hidden group flex flex-col justify-between min-h-[280px]"
        >
          <div className="absolute -top-20 -left-20 w-36 h-36 bg-electric-purple/5 blur-3xl rounded-full" />
          
          <div>
            <h4 className="font-cabinet font-extrabold text-sm uppercase tracking-wider text-white mb-6">Metrics Breakdown</h4>
            <div className="space-y-5 relative z-10">
              <dl>
                <dt className="text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Quality of Work</dt>
                <dd className="flex items-center justify-between gap-3">
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-neon-cyan h-2 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '96%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white font-mono">96%</span>
                </dd>
              </dl>
              <dl>
                <dt className="text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Communication</dt>
                <dd className="flex items-center justify-between gap-3">
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-electric-purple h-2 rounded-full shadow-[0_0_12px_rgba(161,0,255,0.4)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white font-mono">100%</span>
                </dd>
              </dl>
              <dl>
                <dt className="text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">On-Time Delivery</dt>
                <dd className="flex items-center justify-between gap-3">
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-neon-cyan to-electric-purple h-2 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '98%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white font-mono">98%</span>
                </dd>
              </dl>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 text-center text-[10px] font-mono text-darkpan-slate uppercase tracking-widest font-bold mt-4">
            Audited May 2026
          </div>
        </motion.div>

      </div>
    </section>
  );
}
