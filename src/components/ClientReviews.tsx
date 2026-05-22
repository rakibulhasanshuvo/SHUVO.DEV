"use client";

import React from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";

const reviews = [
  {
    id: 1,
    quote: "Shuvo delivered an exceptional project. The attention to detail and performance optimization was outstanding.",
    initials: "JD",
    name: "John Doe",
    title: "CEO, TechCorp",
    glowColor: "rgba(0, 240, 255, 0.4)",
    borderColor: "hover:border-neon-cyan/30",
    bgAccent: "bg-neon-cyan/5",
    hoverBgAccent: "group-hover:bg-neon-cyan/10",
    avatarBg: "bg-neon-cyan/20",
    avatarText: "text-neon-cyan",
    avatarBorder: "border-neon-cyan/30",
    avatarShadow: "shadow-[0_0_10px_rgba(0,240,255,0.2)]"
  },
  {
    id: 2,
    quote: "The Cyber-Luxury aesthetic was exactly what we needed for our brand. Highly recommended.",
    initials: "AS",
    name: "Alice Smith",
    title: "Founder, DesignAgency",
    glowColor: "rgba(147, 51, 234, 0.4)",
    borderColor: "hover:border-electric-purple/30",
    bgAccent: "bg-electric-purple/5",
    hoverBgAccent: "group-hover:bg-electric-purple/10",
    avatarBg: "bg-electric-purple/20",
    avatarText: "text-electric-purple",
    avatarBorder: "border-electric-purple/30",
    avatarShadow: "shadow-[0_0_10px_rgba(147,51,234,0.2)]"
  }
];

export default function ClientReviews() {
  return (
    <section id="reviews" className="scroll-mt-24 mb-40 max-w-[1440px] mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-cabinet font-bold text-3xl mb-12 text-white">Client Reviews</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Summary */}
        <motion.div
          className="glass p-6 rounded-2xl h-fit border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl relative overflow-hidden group"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Glowing accent */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon-cyan/5 blur-3xl rounded-full" />

          <div className="flex items-center mb-5 relative z-10">
            <p className="bg-neon-cyan/20 text-neon-cyan text-sm font-semibold inline-flex items-center p-1.5 rounded-md shadow-[0_0_10px_rgba(0,240,255,0.2)]">8.7</p>
            <p className="ms-2 font-medium text-white">Excellent</p>
            <span className="w-1 h-1 mx-2 rounded-full bg-text-muted"></span>
            <p className="text-sm font-medium text-text-muted">376 reviews</p>
          </div>

          <div className="space-y-4 relative z-10">
            <dl>
              <dt className="text-sm font-medium text-text-muted mb-1">Quality of Work</dt>
              <dd className="flex items-center">
                <div className="w-full bg-white/10 rounded-full h-2.5 me-2 overflow-hidden">
                  <motion.div
                    className="bg-neon-cyan h-2.5 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '88%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-sm font-medium text-white">8.8</span>
              </dd>
            </dl>
            <dl>
              <dt className="text-sm font-medium text-text-muted mb-1">Communication</dt>
              <dd className="flex items-center">
                <div className="w-full bg-white/10 rounded-full h-2.5 me-2 overflow-hidden">
                  <motion.div
                    className="bg-electric-purple h-2.5 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                  />
                </div>
                <span className="text-sm font-medium text-white">9.2</span>
              </dd>
            </dl>
          </div>
        </motion.div>

        {/* Individual Reviews */}
        <div className="md:col-span-2 space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
            >
              <TiltCard className="w-full h-full" glowColor={review.glowColor}>
                <div className={`p-6 h-full flex flex-col justify-center rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group transition-all duration-500`}>

                  {/* Glowing background accent */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 ${review.bgAccent} blur-3xl rounded-full ${review.hoverBgAccent} transition-colors duration-500`} />

                  {/* Large background quote */}
                  <span className="absolute top-2 right-4 text-8xl font-cabinet text-white/5 select-none">"</span>

                  <p className="text-zinc-300 text-base mb-6 font-light relative z-10 leading-relaxed">
                    "{review.quote}"
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${review.avatarBg} rounded-full flex items-center justify-center ${review.avatarText} text-sm font-bold border ${review.avatarBorder} ${review.avatarShadow}`}>
                        {review.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{review.name}</p>
                        <p className="text-xs text-text-muted">{review.title}</p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < 5 ? review.avatarText : 'text-zinc-600'} drop-shadow-md`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
