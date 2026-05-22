"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

import { ReactNode } from "react";
import { BentoGrid, BentoCard } from "@/components/magicui/BentoGrid";
import { Marquee } from "@/components/magicui/Marquee";
import Loader from "@/components/Loader";
import HoneycombLoader from "@/components/HoneycombLoader";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";

import MatrixBackground from "@/components/MatrixBackground";
import LinkCards from "@/components/LinkCards";
import ThreeDCarousel from "@/components/ThreeDCarousel";
import PricingCards from "@/components/PricingCards";
import CyberCore from "@/components/CyberCore";
import RainBackground from "@/components/RainBackground";
import CyberButton from "@/components/CyberButton";
import AngledGallery from "@/components/AngledGallery";
import FeaturedWork from "@/components/featured-work/FeaturedWork";
import StickyStackCards from "@/components/StickyStackCards";
import AboutSection from "@/components/AboutSection";
import AutotypingText from "@/components/ui/AutotypingText";
import FaqAccordion from "@/components/FaqAccordion";














// Fallback Icons (Dumber recreation to avoid missing dependencies)
const FileTextIcon = () => <span className="text-xl">📄</span>;
const BellIcon = () => <span className="text-xl">🔔</span>;
const Share2Icon = () => <span className="text-xl">🔗</span>;
const CalendarIcon = () => <span className="text-xl">📅</span>;
const CodeIcon = () => (
  <svg className="w-4 h-4 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Real-time Data Scraping",
    description: "Amolnama tracks national events with 10+ active scraper bots.",
    href: "#",
    cta: "Explore Case Study",
    className: "lg:col-span-2 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <svg className="w-full h-32" viewBox="0 0 400 100">
          <path d="M 10,80 Q 100,20 200,70 T 390,30" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-cyan" />
          <path d="M 10,80 Q 100,20 200,70 T 390,30" fill="none" stroke="currentColor" strokeWidth="6" className="text-neon-cyan blur-md opacity-50" />
          <circle cx="200" cy="70" r="4" fill="var(--neon-cyan)" />
          <circle cx="200" cy="70" r="8" fill="none" stroke="var(--neon-cyan)" strokeWidth="1" className="animate-ping" />
        </svg>
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Component Registry Analytics",
    description: "Componeo monitors component usage across organizations.",
    href: "#",
    cta: "View Registry",
    className: "lg:col-span-2 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-3/4 space-y-2 font-mono text-xs">
          <div className="flex justify-between border-b border-white/10 pb-1">
            <span className="text-white">Component</span>
            <span className="text-white">Usage</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Buttons.tsx</span>
            <span className="text-neon-cyan">1.2k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Card.tsx</span>
            <span className="text-neon-cyan">850</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Navbar.tsx</span>
            <span className="text-neon-cyan">420</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Secure Cloud Infrastructure",
    description: "Vortexa provides encrypted database management.",
    href: "#",
    cta: "Read Documentation",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="relative">
          <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full" />
          <svg className="w-16 h-16 text-neon-cyan relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "E-Commerce Ecosystem",
    description: "Izzan Store connects payment gateways and shipping.",
    href: "#",
    cta: "Visit Store",
    className: "lg:col-span-3 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="relative w-full h-full max-w-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyber-charcoal border border-white/10 px-4 py-2 rounded-full z-20 text-xs font-bold">
            Izzan
          </div>
          <div className="absolute top-1/4 left-1/4 bg-white/5 border border-white/10 p-2 rounded-full z-20 text-[11px]">Stripe</div>
          <div className="absolute top-1/4 right-1/4 bg-white/5 border border-white/10 p-2 rounded-full z-20 text-[11px]">PayPal</div>
          <div className="absolute bottom-1/4 left-1/4 bg-white/5 border border-white/10 p-2 rounded-full z-20 text-[11px]">FedEx</div>
          <div className="absolute bottom-1/4 right-1/4 bg-white/5 border border-white/10 p-2 rounded-full z-20 text-[11px]">Shopify</div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
            <path d="M 100,50 Q 200,100 200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
            <path d="M 300,50 Q 200,100 200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
            <path d="M 100,150 Q 200,100 200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
            <path d="M 300,150 Q 200,100 200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
          </svg>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'VIDEO' || target.closest('a') || target.closest('video')) {
        setIsPageLoading(true);
        setTimeout(() => setIsPageLoading(false), 1000); // Show for 1 second
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);


  return (
    <div className="relative min-h-screen bg-transparent text-white font-satoshi">
      {/* Background Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] -z-10" />

      {/* Dynamic Quantum Constellation & Matrix Rain Canvas Background */}
      <InteractiveGridBackground />

      {/* Dynamic Glowing Orbs - wrapped to prevent horizontal bleed without breaking position:sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-100px] right-1/4 w-[600px] h-[600px] bg-electric-purple/15 rounded-full blur-3xl"
        />
      </div>
      <div className="relative z-10 pt-12 pb-4">
        {/* Full-width Hero Backdrop Wrapper */}
        <div className="relative w-full">
          <section className="relative mb-40 pt-10 max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


          {/* Hero Glow */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-neon-cyan/10 to-electric-purple/10 rounded-full blur-3xl pointer-events-none" />
          </div>


          <div className="max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-cabinet font-bold text-6xl sm:text-8xl mb-6 leading-[0.9] tracking-tight">
                Engineering{" "}
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple animate-gradient drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                  style={{ textShadow: "0 0 35px rgba(0, 240, 255, 0.35), 0 0 65px rgba(161, 0, 255, 0.25)" }}
                >
                  Digital Luxury
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-text-muted text-lg sm:text-xl max-w-xl mb-10 font-light"
            >
              Full-stack developer focused on <AutotypingText />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              {/* Primary CTA: View My Work */}
              <a
                href="#work"
                className="group relative inline-flex items-center justify-center px-9 py-4 font-cabinet font-bold rounded-full overflow-hidden transition-all duration-300 scale-100 hover:scale-[1.04] active:scale-[0.98] text-center"
              >
                {/* Glowing border/background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-blue-500 to-electric-purple opacity-90 transition-opacity duration-300 group-hover:opacity-100 rounded-full" />
                
                {/* Subtle border-lit glow layer */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-full blur-md opacity-50 group-hover:opacity-90 transition-opacity duration-300 z-0" />
                
                {/* Inner button surface: deep charcoal backplate */}
                <div className="absolute inset-[1.5px] bg-cyber-black rounded-full group-hover:bg-cyber-charcoal transition-colors duration-300 z-10" />
                
                {/* Text & Icon content */}
                <span className="relative z-20 text-white text-sm uppercase tracking-wider flex items-center gap-2 font-bold">
                  View My Work
                  <svg className="w-4 h-4 text-neon-cyan transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
                
                {/* Scanning horizontal neon accent bar on hover */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
              </a>

              {/* Secondary CTA: Get in Touch */}
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-9 py-4 font-cabinet font-bold rounded-full overflow-hidden transition-all duration-300 scale-100 hover:scale-[1.04] active:scale-[0.98] text-center"
              >
                {/* Outer light border */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 rounded-full transition-colors duration-300 z-0" />
                
                {/* Glass backplate with light blur */}
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 backdrop-blur-md rounded-full transition-colors duration-300 z-10" />
                
                {/* Inner glow accent */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 to-electric-purple/0 group-hover:from-neon-cyan/5 group-hover:to-electric-purple/5 rounded-full transition-all duration-500 z-10" />
                
                {/* Text Content */}
                <span className="relative z-20 text-zinc-300 group-hover:text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  Get in Touch
                  <svg className="w-4 h-4 text-zinc-400 group-hover:text-electric-purple group-hover:translate-y-[-1px] group-hover:translate-x-[1px] transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>


          {/* Column 2: 3D Carousel */}
          <div className="hidden lg:flex justify-center items-center relative z-10">
            <ThreeDCarousel />
          </div>
        </section>
        </div>{/* END hero wrapper */}

        {/* Cyber Core Showcase */}
        <section className="relative flex flex-col items-center justify-center py-24 my-20 z-10 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-cyber-black/50 backdrop-blur-3xl -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[100px] -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-electric-purple/10 rounded-full blur-[80px] -z-10" />

          {/* Decorative rotating rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite] -z-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/5 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse] -z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-cabinet font-bold text-white tracking-tight mb-4">
              System <span className="text-neon-cyan glow-cyan-text">Core</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto font-light">
              The central hub of our digital infrastructure. Monitoring vital stats and ensuring peak performance across all nodes in the network.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="relative"
          >
            {/* Ambient glow behind the core */}
            <div className="absolute inset-0 bg-neon-cyan/20 blur-[60px] rounded-full -z-10 animate-pulse pointer-events-none" />

            <CyberCore />

            {/* Status indicators */}
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse glow-cyan" />
                <span className="text-[11px] font-jetbrains text-neon-cyan tracking-widest">SYS_ONLINE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-electric-purple animate-pulse glow-purple" />
                <span className="text-[11px] font-jetbrains text-electric-purple tracking-widest">DATA_SYNC</span>
              </div>
            </div>

            <div className="absolute -left-32 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 items-end">
               <div className="flex items-center gap-3">
                <span className="text-[11px] font-jetbrains text-zinc-400 tracking-widest">MEM: 42%</span>
                <div className="w-12 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan w-[42%]" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-jetbrains text-zinc-400 tracking-widest">CPU: 18%</span>
                <div className="w-12 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-electric-purple w-[18%]" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>


        {/* Featured Work (3D Sticky Stack Cards) */}
        <section id="work" className="scroll-mt-24">
          <StickyStackCards />
        </section>

        {/* Endless Object Moving (Marquee) */}
        <div className="relative w-full overflow-hidden">
        <section className="mb-0 overflow-hidden py-32 relative">
          {/* Gradient Masks to hide vertical cropping */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-cyber-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-cyber-black to-transparent z-10 pointer-events-none" />

          <div className="transform -rotate-6 scale-125 space-y-6">
            {/* Row 1 */}
            <div className="flex overflow-hidden select-none gap-8">
              <div className="flex flex-shrink-0 justify-around min-w-full gap-8 animate-marquee [--duration:25s]">
                {["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "PostgreSQL", "Docker", "AWS"].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-3 glass px-4 py-2 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-colors">
                    <CodeIcon />
                    <span className="font-cabinet font-bold text-sm text-white">{tech}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-shrink-0 justify-around min-w-full gap-8 animate-marquee [--duration:25s]">
                {["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "PostgreSQL", "Docker", "AWS"].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-3 glass px-4 py-2 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-colors">
                    <CodeIcon />
                    <span className="font-cabinet font-bold text-sm text-white">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex overflow-hidden select-none gap-8">
              <div className="flex flex-shrink-0 justify-around min-w-full gap-8 animate-marquee-reverse [--duration:30s]">
                {["UI/UX", "Optimization", "Database", "Cloud", "Analytics", "Security", "Scalability", "E-Commerce", "Scraping", "API"].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-3 glass px-4 py-2 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-colors">
                    <CodeIcon />
                    <span className="font-cabinet font-bold text-sm text-white">{tech}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-shrink-0 justify-around min-w-full gap-8 animate-marquee-reverse [--duration:30s]">
                {["UI/UX", "Optimization", "Database", "Cloud", "Analytics", "Security", "Scalability", "E-Commerce", "Scraping", "API"].map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-3 glass px-4 py-2 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-colors">
                    <CodeIcon />
                    <span className="font-cabinet font-bold text-sm text-white">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </div>

        {/* Angled Scrolling Gallery */}
        <AngledGallery />

        {/* About Section */}
        <section id="about" className="scroll-mt-24 mt-40 mb-40">
          <AboutSection />
        </section>

        {/* Work Process (Timeline Flow) */}
        <section id="process" className="scroll-mt-24 mb-40 w-full relative">
          {/* Rain Background */}
          <div className="absolute inset-0 -z-10 opacity-30 overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            <RainBackground />
          </div>
          <div className="text-center mb-16 relative z-10 max-w-5xl mx-auto px-6">

            <h2 className="font-cabinet font-bold text-4xl md:text-5xl mb-4 text-white">The Process</h2>
            <p className="text-text-muted max-w-2xl mx-auto font-light">
              How I transform ideas into high-performance digital products.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto px-6">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan to-electric-purple opacity-30 hidden md:block" />

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center justify-between relative">
                <div className="md:w-1/2 pr-12 text-right hidden md:block">
                  <div className="font-cabinet font-bold text-5xl text-neon-cyan/30">01</div>
                </div>
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-cyan rounded-full border-2 border-cyber-black hidden md:block" />
                <div className="md:w-1/2 pl-12">
                  <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-xl">
                    <div className="font-cabinet font-bold text-3xl text-neon-cyan/30 mb-2 md:hidden">01</div>
                    <h3 className="font-bold text-lg mb-2 text-white font-cabinet">Planning & Strategy</h3>
                    <p className="text-zinc-300 text-base font-light">Understanding goals, audience, and technical requirements before touching code.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center justify-between relative">
                <div className="md:w-1/2 pl-12 text-left hidden md:block">
                  <div className="font-cabinet font-bold text-5xl text-electric-purple/30">02</div>
                </div>
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-electric-purple rounded-full border-2 border-cyber-black hidden md:block" />
                <div className="md:w-1/2 pr-12">
                  <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-xl">
                    <div className="font-cabinet font-bold text-3xl text-electric-purple/30 mb-2 md:hidden">02</div>
                    <h3 className="font-bold text-lg mb-2 text-white font-cabinet">Architecture</h3>
                    <p className="text-zinc-300 text-base font-light">Designing database schemas, API routes, and component structures for scale.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center justify-between relative">
                <div className="md:w-1/2 pr-12 text-right hidden md:block">
                  <div className="font-cabinet font-bold text-5xl text-neon-cyan/30">03</div>
                </div>
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-cyan rounded-full border-2 border-cyber-black hidden md:block" />
                <div className="md:w-1/2 pl-12">
                  <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-xl">
                    <div className="font-cabinet font-bold text-3xl text-neon-cyan/30 mb-2 md:hidden">03</div>
                    <h3 className="font-bold text-lg mb-2 text-white font-cabinet">Development</h3>
                    <p className="text-zinc-300 text-base font-light mb-4">Writing clean, type-safe code with Next.js and Tailwind CSS.</p>
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Interactive Link Cards */}
        <section className="mb-40 max-w-[1440px] mx-auto px-6 overflow-hidden">
          <div className="flex justify-center items-center py-10">
            <LinkCards />
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="mb-40 max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-cabinet font-bold text-3xl mb-2">Service Tiers</h2>
            <p className="text-text-muted">Choose the perfect plan for your project.</p>
          </div>
          <PricingCards />
        </section>

        {/* Reviews Section */}


        <section id="reviews" className="scroll-mt-24 mb-40 max-w-[1440px] mx-auto px-6">
          <h2 className="font-cabinet font-bold text-3xl mb-12 text-white">Client Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Summary */}
            <div className="glass p-6 rounded-2xl h-fit border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl relative overflow-hidden group">
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
                      <div className="bg-neon-cyan h-2.5 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]" style={{ width: '88%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-white">8.8</span>
                  </dd>
                </dl>
                <dl>
                  <dt className="text-sm font-medium text-text-muted mb-1">Communication</dt>
                  <dd className="flex items-center">
                    <div className="w-full bg-white/10 rounded-full h-2.5 me-2 overflow-hidden">
                      <div className="bg-electric-purple h-2.5 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-white">9.2</span>
                  </dd>
                </dl>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="md:col-span-2 space-y-6">
              {/* Review 1 */}
              <div className="glass p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl relative overflow-hidden group hover:border-neon-cyan/30 transition-all duration-500">
                {/* Glowing background accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-cyan/5 blur-3xl rounded-full group-hover:bg-neon-cyan/10 transition-colors duration-500" />

                {/* Large background quote */}
                <span className="absolute top-2 right-4 text-8xl font-cabinet text-white/5 select-none">"</span>

                <p className="text-zinc-300 text-base mb-4 font-light relative z-10">"Shuvo delivered an exceptional project. The attention to detail and performance optimization was outstanding."</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 bg-neon-cyan/20 rounded-full flex items-center justify-center text-neon-cyan text-sm font-bold border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]">JD</div>
                  <div>
                    <p className="text-sm font-bold text-white">John Doe</p>
                    <p className="text-xs text-text-muted">CEO, TechCorp</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="glass p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl relative overflow-hidden group hover:border-electric-purple/30 transition-all duration-500">
                {/* Glowing background accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-electric-purple/5 blur-3xl rounded-full group-hover:bg-electric-purple/10 transition-colors duration-500" />

                {/* Large background quote */}
                <span className="absolute top-2 right-4 text-8xl font-cabinet text-white/5 select-none">"</span>

                <p className="text-zinc-300 text-base mb-4 font-light relative z-10">"The Cyber-Luxury aesthetic was exactly what we needed for our brand. Highly recommended."</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 bg-electric-purple/20 rounded-full flex items-center justify-center text-electric-purple text-sm font-bold border border-electric-purple/30 shadow-[0_0_10px_rgba(147,51,234,0.2)]">AS</div>
                  <div>
                    <p className="text-sm font-bold text-white">Alice Smith</p>
                    <p className="text-xs text-text-muted">Founder, DesignAgency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-24 mt-40 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <MatrixBackground />
          </div>
          <div className="text-center mb-16">

            <h2 className="font-cabinet font-bold text-4xl md:text-5xl mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-text-muted max-w-2xl mx-auto font-light">
              Got questions? I&apos;ve got answers. If you don&apos;t find what you're looking for, feel free to reach out.
            </p>
          </div>

          <FaqAccordion />
        </section>

        {/* Blog Section */}
        <section id="blog" className="scroll-mt-24 mt-40">
          <div className="text-center mb-16">
            <h2 className="font-cabinet font-bold text-4xl md:text-5xl mb-4 text-white">Latest Insights</h2>
            <p className="text-text-muted max-w-2xl mx-auto font-light">
              Thoughts on design, engineering, and the future of the web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <a href="#" aria-label="Read Article" className="block rounded-2xl glass p-6 border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl hover:border-neon-cyan transition-colors group">
              <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                  <img width={64} height={64} alt="Blog" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1160" className="size-16 rounded-full object-cover sm:size-18" />
                </div>

                <div className="mt-4 sm:mt-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors font-cabinet">
                    How I built my first website with Nuxt, Tailwind CSS and Vercel
                  </h3>

                  <p className="mt-1 text-xs text-text-muted">By M.R.H. Shuvo</p>

                  <p className="mt-4 line-clamp-2 text-sm text-text-muted font-light">
                    A deep dive into my journey of building a modern portfolio using Next.js, Tailwind CSS, and Vercel for the first time.
                  </p>
                </div>
              </div>

              <dl className="mt-6 flex gap-4 lg:gap-6 text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"></path>
                  </svg>
                  <span>30/06/2025</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"></path>
                  </svg>
                  <span>12 minutes</span>
                </div>
              </dl>
            </a>

            {/* Added Blog Card 2 */}
            <a href="#" aria-label="Read Article" className="block rounded-2xl glass p-6 border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl hover:border-electric-purple transition-colors group">
              <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                  <img width={64} height={64} alt="Blog" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1160" className="size-16 rounded-full object-cover sm:size-18" />
                </div>

                <div className="mt-4 sm:mt-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-electric-purple transition-colors font-cabinet">
                    The Art of Cyber-Luxury: Aesthetics in Modern Web Design
                  </h3>

                  <p className="mt-1 text-xs text-text-muted">By M.R.H. Shuvo</p>

                  <p className="mt-4 line-clamp-2 text-sm text-text-muted font-light">
                    Exploring how to combine high-tech cyber elements with minimalist luxury design principles to create stunning interfaces.
                  </p>
                </div>
              </div>

              <dl className="mt-6 flex gap-4 lg:gap-6 text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"></path>
                  </svg>
                  <span>15/07/2025</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"></path>
                  </svg>
                  <span>8 minutes</span>
                </div>
              </dl>
            </a>
          </div>
        </section>
        <section id="contact" className="scroll-mt-24 overflow-hidden glass rounded-3xl sm:grid sm:grid-cols-2 sm:items-center mt-32 border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center sm:text-left">
              <h2 className="text-3xl font-cabinet font-bold text-white md:text-4xl mb-4">
                Let&apos;s Build Something Extraordinary Together
              </h2>

              <p className="text-zinc-300 md:mt-4 md:block font-light text-base">
                Ready to elevate your digital presence? Let&apos;s collaborate to create a high-performance, visually stunning experience for your brand.
              </p>

              <div className="mt-4 md:mt-8">
                <a href="mailto:contact@example.com" className="inline-flex items-center justify-center bg-cyber-black border border-neon-cyan text-neon-cyan px-8 py-3 rounded-full text-sm font-semibold hover:bg-neon-cyan/10 transition-all glow-cyan-subtle">
                  Get Started Today
                </a>
              </div>
            </div>
          </div>

          <div className="h-full w-full relative sm:h-[calc(100%-2rem)] sm:self-end">
            <div className="absolute inset-0 bg-gradient-to-l from-cyber-black to-transparent z-10 hidden sm:block" />
            <img
              width={1160} height={700} alt="Cyber Luxury"
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1160"
              className="h-full w-full object-cover opacity-40 sm:rounded-ss-[30px] md:rounded-ss-[60px]"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-40 border-t border-white/5 pt-16 pb-4 relative overflow-hidden max-w-[1440px] mx-auto px-6 w-full">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-electric-purple/5 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="font-cabinet font-bold text-3xl tracking-tight mb-4">
                SHUVO<span className="text-neon-cyan">.</span>
              </div>
              <p className="text-text-muted text-sm max-w-sm mb-6 font-light">
                Engineering high-performance, visually stunning web applications that bridge the gap between design and engineering.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="GitHub" className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-colors font-jetbrains text-xs">GH</a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-colors font-jetbrains text-xs">TW</a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-colors font-jetbrains text-xs">LI</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-cabinet font-bold text-sm uppercase tracking-wider mb-6 text-white">Navigation</h3>
              <ul className="space-y-3 text-sm text-text-muted">
                <li><a href="#work" className="hover:text-neon-cyan transition-colors">Work</a></li>
                <li><a href="#about" className="hover:text-neon-cyan transition-colors">About</a></li>
                <li><a href="#process" className="hover:text-neon-cyan transition-colors">Process</a></li>
                <li><a href="#reviews" className="hover:text-neon-cyan transition-colors">Reviews</a></li>
                <li><a href="#contact" className="hover:text-neon-cyan transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-cabinet font-bold text-sm uppercase tracking-wider mb-6 text-white">Services</h3>
              <ul className="space-y-3 text-sm text-text-muted">
                <li><a href="#" className="hover:text-electric-purple transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-electric-purple transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-electric-purple transition-colors">Performance Optimization</a></li>
                <li><a href="#" className="hover:text-electric-purple transition-colors">Custom Integration</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-text-muted text-xs font-jetbrains border-t border-white/5 pt-8">
            <p>© 2026 M.R.H. Shuvo. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/admin" className="hover:text-white transition-colors">Admin Dashboard</a>
            </div>
          </div>
        </footer>
      </div>


      {/* Global Page Loader Overlay */}
      {isPageLoading && (

        <div className="fixed inset-0 bg-cyber-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <HoneycombLoader />
        </div>
      )}
    </div>
  );
}

