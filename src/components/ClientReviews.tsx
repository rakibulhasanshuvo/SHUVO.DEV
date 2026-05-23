"use client";

import React from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";
import { Marquee } from "./magicui/Marquee";

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
  },
  {
    id: 3,
    quote: "A true professional who understands both design and engineering. The end result exceeded all expectations.",
    initials: "MW",
    name: "Michael Wright",
    title: "CTO, FutureWeb",
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
    id: 4,
    quote: "His ability to translate complex requirements into seamless user experiences is unmatched.",
    initials: "SL",
    name: "Sarah Lee",
    title: "Product Manager, Innovate",
    glowColor: "rgba(147, 51, 234, 0.4)",
    borderColor: "hover:border-electric-purple/30",
    bgAccent: "bg-electric-purple/5",
    hoverBgAccent: "group-hover:bg-electric-purple/10",
    avatarBg: "bg-electric-purple/20",
    avatarText: "text-electric-purple",
    avatarBorder: "border-electric-purple/30",
    avatarShadow: "shadow-[0_0_10px_rgba(147,51,234,0.2)]"
  },
  {
    id: 5,
    quote: "Working with Shuvo was a game-changer for our startup. Fast, reliable, and incredibly talented.",
    initials: "RJ",
    name: "Robert Johnson",
    title: "Co-founder, LaunchPad",
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
    id: 6,
    quote: "We needed a complete overhaul of our platform, and he delivered a masterpiece.",
    initials: "EK",
    name: "Emma Knight",
    title: "Director, Visionary Partners",
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

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
  return (
    <TiltCard className="w-[350px] shrink-0 h-full" glowColor={review.glowColor}>
      <div className={`p-6 h-full flex flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group transition-all duration-500`}>

        {/* Glowing background accent */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 ${review.bgAccent} blur-3xl rounded-full ${review.hoverBgAccent} transition-colors duration-500`} />

        {/* Large background quote */}
        <span className="absolute top-2 right-4 text-8xl font-cabinet text-white/5 select-none">"</span>

        <p className="text-zinc-300 text-base mb-6 font-light relative z-10 leading-relaxed">
          "{review.quote}"
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto relative z-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 shrink-0 ${review.avatarBg} rounded-full flex items-center justify-center ${review.avatarText} text-sm font-bold border ${review.avatarBorder} ${review.avatarShadow}`}>
              {review.initials}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{review.name}</p>
              <p className="text-xs text-text-muted">{review.title}</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 shrink-0">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < 5 ? review.avatarText : 'text-zinc-600'} drop-shadow-md`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default function ClientReviews() {
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section id="reviews" className="scroll-mt-24 mb-40 max-w-[1440px] mx-auto px-6">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-cabinet font-bold text-3xl md:text-5xl mb-6 text-white">Client Reviews</h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto font-light">
            Don't just take my word for it. Here's what some of my clients have to say about working together.
          </p>
        </motion.div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-black py-16">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s] mt-8">
          {secondRow.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Marquee>

        {/* Gradient fades on left and right for seamless Marquee effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/80 to-transparent"></div>
      </div>
    </section>
  );
}
