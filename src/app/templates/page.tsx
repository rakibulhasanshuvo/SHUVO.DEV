"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LazyVideoPreview from "@/components/ui/LazyVideoPreview";

interface Template {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
  posterUrl: string;
  videoUrl: string;
  features: string[];
}

const templatesData: Template[] = [
  {
    id: "zenith",
    title: "Zenith Agency Portfolio",
    category: "Creative Agency",
    price: "$59",
    description: "An ultra-minimalist HSL dark portfolio featuring custom 3D carousel arrays, dynamic slide sliders, and path aware line gliders.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS v4"],
    posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-loop-41851-large.mp4", // High speed looping test asset
    features: ["100/100 Core Web Vitals", "Complete HSL design tokens", "Custom Markdown cases"],
  },
  {
    id: "nova",
    title: "Nova SaaS Dashboard Grid",
    category: "SaaS & Dashboard",
    price: "$79",
    description: "A neon cyber bento dashboard with linear charts, active server threat pulse bars, and multi-threaded container playgrounds.",
    tags: ["React 19", "Recharts", "Supabase Backend"],
    posterUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-blue-neon-lights-loop-41747-large.mp4", // High speed looping test asset
    features: ["Pre-warmed Container APIs", "Upwork JSS tracker panel", "Silent bot honeypots"],
  },
  {
    id: "ethereal",
    title: "Ethereal Commerce Web3",
    category: "Full-Stack Commerce",
    price: "$99",
    description: "A luxurious Web3-themed transactional storefront equipped with secure Stripe steppers and inventory race-safe locks.",
    tags: ["Next.js 16", "Stripe Checkout", "Prisma Postgres"],
    posterUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-particles-in-blue-and-purple-loop-43285-large.mp4", // High speed looping test asset
    features: ["Optimistic OCC inventory locking", "cc Attribution Provenance certs", "Device previews sandbox Frame"],
  },
];

const categories = ["All", "Creative Agency", "SaaS & Dashboard", "Full-Stack Commerce"];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isGalleryOpen]);

  const filteredTemplates = useMemo(() => {
    return templatesData.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(search.toLowerCase()) ||
        template.description.toLowerCase().includes(search.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || template.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-cyber-black text-white py-20 px-6 font-satoshi relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-16 text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full">
            PREMIUM DIGITAL SHELF
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-cabinet mt-6 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
            Developer Templates
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Beautifully designed, highly performant templates engineered with Next.js, Framer Motion, and elite CSS aesthetics.
          </p>
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="mt-8 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-full font-mono text-sm tracking-widest hover:bg-neon-cyan/20 transition-all shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] uppercase cursor-pointer"
          >
            View All Templates
          </button>
        </header>

        {/* Search and Category Filters */}
        <section className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-[#0B0B0E]/60 border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-text-muted hover:text-white border border-transparent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search assets…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/[0.08] transition-all"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 font-mono text-[11px]">CMD+K</span>
          </div>
        </section>

        {/* High Density templates Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template) => (
              <motion.div
                layout
                key={template.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between rounded-3xl border border-white/5 bg-[#0B0B0E]/45 overflow-hidden hover:border-neon-cyan/20 transition-colors shadow-xl"
              >
                {/* Visual Video Preview Frame */}
                <Link href={`/templates/${template.id}`} className="block relative overflow-hidden select-none cursor-pointer">
                  <LazyVideoPreview
                    src={template.videoUrl}
                    poster={template.posterUrl}
                    className="border-none rounded-none aspect-[16/10]"
                  />
                  <div className="absolute top-4 right-4 bg-cyber-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-neon-cyan font-mono border border-neon-cyan/20 shadow-md">
                    {template.price}
                  </div>
                </Link>

                {/* Meta details */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-text-muted uppercase">
                        {template.category}
                      </span>
                    </div>
                    <Link href={`/templates/${template.id}`} className="block cursor-pointer">
                      <h3 className="text-xl font-bold font-cabinet text-white group-hover:text-neon-cyan transition-colors mb-2">
                        {template.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-text-muted leading-relaxed font-light font-satoshi">
                      {template.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {template.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* View Details CTAs */}
                    <Link
                      href={`/templates/${template.id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                    >
                      <span>Explore Sandbox</span>
                      <span className="font-mono">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Search State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-20 bg-[#0B0B0E]/40 border border-dashed border-white/10 rounded-3xl">
            <p className="text-sm text-white/30 font-satoshi font-light">
              No developer templates found matching search or filter parameters.
            </p>
          </div>
        )}
      </div>

      {/* Full-Screen Overlay Gallery */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]/90 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-6 border-b border-white/10 bg-[#0B0B0E]/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold font-cabinet text-white">All Templates</h2>
                <span className="text-[11px] font-mono font-bold tracking-widest text-neon-cyan uppercase px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full">
                  {templatesData.length} ITEMS
                </span>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="text-xs font-mono font-bold text-text-muted hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                CLOSE <span className="text-lg leading-none">&times;</span>
              </button>
            </div>

            {/* Grid Layout */}
            <div className="p-6 max-w-[1600px] mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {templatesData.map((template) => (
                  <Link key={template.id} href={`/templates/${template.id}`} onClick={() => setIsGalleryOpen(false)} className="block group relative rounded-2xl border border-white/10 bg-[#0B0B0E]/60 overflow-hidden hover:border-neon-cyan/30 transition-all cursor-pointer aspect-[3/4]">
                    <LazyVideoPreview src={template.videoUrl} poster={template.posterUrl} className="absolute inset-0 w-full h-full object-cover rounded-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-neon-cyan uppercase mb-1 block">{template.category}</span>
                      <h3 className="text-sm font-bold font-cabinet text-white leading-tight group-hover:text-neon-cyan transition-colors">{template.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
