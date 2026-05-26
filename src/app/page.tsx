import Image from "next/image";
import Link from "next/link";

import { BentoGrid, BentoCard } from "@/components/magicui/BentoGrid";
import { Marquee } from "@/components/magicui/Marquee";
import Loader from "@/components/Loader";
import AutotypingText from "@/components/ui/AutotypingText";

// Static data imports
import { files, features, CodeIcon } from "@/data/homeData";

// Statically imported UI components (RSC handles these perfectly)
import { headers } from "next/headers";
import DynamicThreeDCarouselClient from "@/components/DynamicThreeDCarouselClient";


import PricingCards from "@/components/PricingCards";
import CyberButton from "@/components/CyberButton";
import AngledGallery from "@/components/AngledGallery";
import FeaturedWork from "@/components/featured-work/FeaturedWork";
import StickyStackCards from "@/components/StickyStackCards";
import AboutSection from "@/components/AboutSection";
import FaqAccordion from "@/components/FaqAccordion";
import ClientReviews from "@/components/ClientReviews";
import CyberCoreShowcase from "@/components/CyberCoreShowcase";
import ContactVideo from "@/components/ContactVideo";

// Dynamic wrappers with ssr: false for heavy background animations
import DynamicConstellation from "@/components/DynamicConstellation";
import DynamicRain from "@/components/DynamicRain";
import DynamicMatrix from "@/components/DynamicMatrix";

export default async function Home() {
  const headersList = await headers();
  const deviceType = headersList.get("x-device-type") || "desktop";
  const isMobile = deviceType === "mobile";

  return (
    <div className="relative min-h-screen bg-transparent text-white font-satoshi">
      {/* Background Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] -z-10" />

      {/* Dynamic Quantum Constellation Background (Omitted entirely on server if mobile device) */}
      {!isMobile && (
        <div className="hidden lg:block">
          <DynamicConstellation />
        </div>
      )}

      {/* Dynamic Glowing Orbs — CSS hardware-accelerated loops for absolute performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-[-100px] right-1/4 w-[600px] h-[600px] bg-electric-purple/15 rounded-full blur-3xl animate-orb-2 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-12 pb-4">
        {/* Hero Section */}
        <div className="relative w-full">
          <section className="relative mb-28 md:mb-36 pt-10 max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Ambient Backdrop */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-neon-cyan/10 to-electric-purple/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            <div className="max-w-4xl relative z-10">
              <div className="animate-fade-up">
                <h1 className="font-cabinet font-bold text-5xl sm:text-6xl md:text-8xl mb-6 leading-[0.9] tracking-tight text-balance">
                  Engineering{" "}
                  <span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple animate-gradient drop-shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                    style={{ textShadow: "0 0 35px rgba(0, 240, 255, 0.35), 0 0 65px rgba(161, 0, 255, 0.25)" }}
                  >
                    Digital Luxury
                  </span>
                </h1>
              </div>

              <p className="text-text-muted text-lg sm:text-xl max-w-xl mb-10 font-light animate-fade-up animation-delay-200">
                Full-stack developer focused on <AutotypingText />
              </p>

              <div className="flex flex-col sm:flex-row gap-5 animate-fade-up animation-delay-300">
                {/* Primary CTA */}
                <a
                  href="#work"
                  className="group relative inline-flex items-center justify-center px-9 py-4 font-cabinet font-bold rounded-full overflow-hidden transition-all duration-300 scale-100 hover:scale-[1.04] active:scale-[0.98] text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-blue-500 to-electric-purple opacity-90 transition-opacity duration-300 group-hover:opacity-100 rounded-full" />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-full blur-md opacity-50 group-hover:opacity-90 transition-opacity duration-300 z-0" />
                  <div className="absolute inset-[1.5px] bg-cyber-black rounded-full group-hover:bg-cyber-charcoal transition-colors duration-300 z-10" />
                  
                  <span className="relative z-20 text-white text-sm uppercase tracking-wider flex items-center gap-2 font-bold">
                    View My Work
                    <svg className="w-4 h-4 text-neon-cyan transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                </a>

                {/* Secondary CTA */}
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-9 py-4 font-cabinet font-bold rounded-full overflow-hidden transition-all duration-300 scale-100 hover:scale-[1.04] active:scale-[0.98] text-center"
                >
                  <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 rounded-full transition-colors duration-300 z-0" />
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 backdrop-blur-md rounded-full transition-colors duration-300 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 to-electric-purple/0 group-hover:from-neon-cyan/5 group-hover:to-electric-purple/5 rounded-full transition-all duration-500 z-10" />
                  
                  <span className="relative z-20 text-zinc-300 group-hover:text-white text-sm uppercase tracking-wider flex items-center gap-2">
                    Get in Touch
                    <svg className="w-4 h-4 text-zinc-400 group-hover:text-electric-purple group-hover:translate-y-[-1px] group-hover:translate-x-[1px] transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            {/* Carousel display, encapsulated in responsive wrapper */}
            <div className="hidden lg:flex justify-center items-center relative z-10">
              {isMobile ? (
                <div className="w-full h-[600px] bg-gradient-to-b from-neutral-950 to-black rounded-3xl border border-white/5" />
              ) : (
                <DynamicThreeDCarouselClient />
              )}
            </div>
          </section>
        </div>

        {/* Dynamic Cyber Core section isolated to a performance Client boundary */}
        <CyberCoreShowcase isMobileServer={isMobile} />

        {/* Featured Work section */}
        <section id="work" className="scroll-mt-24 mb-28 md:mb-36">
          <StickyStackCards isMobileServer={isMobile} />
        </section>

        {/* Technical Marquee */}
        <div className="relative w-full overflow-hidden mb-28 md:mb-36">
          <section className="mb-0 overflow-hidden py-32 relative">
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

        {/* Angled scrolling showcase */}
        {!isMobile && <AngledGallery />}

        {/* Professional About narrative */}
        <AboutSection isMobileServer={isMobile} />

        {/* Process flow section */}
        <section id="process" className="scroll-mt-24 mb-28 md:mb-36 w-full relative">
          <div className="absolute inset-0 -z-10 opacity-30 overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
            {!isMobile && (
              <div className="hidden lg:block w-full h-full">
                <DynamicRain />
              </div>
            )}
          </div>
          <div className="text-center mb-16 relative z-10 max-w-5xl mx-auto px-6">
            <h2 className="font-cabinet font-bold text-4xl md:text-5xl mb-4 text-white">The Process</h2>
            <p className="text-text-muted max-w-2xl mx-auto font-light">
              How I transform ideas into high-performance digital products.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto px-6">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan to-electric-purple opacity-30 hidden md:block" />

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center justify-between relative">
                <div className="md:w-1/2 pr-12 text-right hidden md:block">
                  <div aria-hidden="true" className="font-cabinet font-bold text-5xl text-neon-cyan/30">01</div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-cyan rounded-full border-2 border-cyber-black hidden md:block" />
                <div className="md:w-1/2 pl-12">
                  <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-xl">
                    <div aria-hidden="true" className="font-cabinet font-bold text-3xl text-neon-cyan/30 mb-2 md:hidden">01</div>
                    <h3 className="font-bold text-lg mb-2 text-white font-cabinet">Planning & Strategy</h3>
                    <p className="text-zinc-300 text-base font-light">Understanding goals, audience, and technical requirements before touching code.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center justify-between relative">
                <div className="md:w-1/2 pl-12 text-left hidden md:block">
                  <div aria-hidden="true" className="font-cabinet font-bold text-5xl text-electric-purple/30">02</div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-electric-purple rounded-full border-2 border-cyber-black hidden md:block" />
                <div className="md:w-1/2 pr-12">
                  <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-xl">
                    <div aria-hidden="true" className="font-cabinet font-bold text-3xl text-electric-purple/30 mb-2 md:hidden">02</div>
                    <h3 className="font-bold text-lg mb-2 text-white font-cabinet">Architecture</h3>
                    <p className="text-zinc-300 text-base font-light">Designing database schemas, API routes, and component structures for scale.</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center justify-between relative">
                <div className="md:w-1/2 pr-12 text-right hidden md:block">
                  <div aria-hidden="true" className="font-cabinet font-bold text-5xl text-neon-cyan/30">03</div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-neon-cyan rounded-full border-2 border-cyber-black hidden md:block" />
                <div className="md:w-1/2 pl-12">
                  <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-xl">
                    <div aria-hidden="true" className="font-cabinet font-bold text-3xl text-neon-cyan/30 mb-2 md:hidden">03</div>
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

        {/* Pricing options */}
        <section className="scroll-mt-24 mb-28 md:mb-36 max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-cabinet font-bold text-3xl mb-2">Service Tiers</h2>
            <p className="text-text-muted">Choose the perfect plan for your project.</p>
          </div>
          <PricingCards />
        </section>

        {/* Verification Reviews */}
        <ClientReviews />

        {/* FAQs */}
        <section id="faq" className="scroll-mt-24 mb-28 md:mb-36 relative overflow-hidden">
          {!isMobile && (
            <div className="absolute inset-0 z-0 opacity-20 hidden lg:block">
              <DynamicMatrix />
            </div>
          )}
          <div className="text-center mb-16">
            <h2 className="font-cabinet font-bold text-4xl md:text-5xl mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-zinc-200 max-w-2xl mx-auto font-medium relative z-10 drop-shadow-sm">
              Got questions? I&apos;ve got answers. If you don&apos;t find what you're looking for, feel free to reach out.
            </p>
          </div>

          <FaqAccordion />
        </section>

        {/* Blog section */}
        <section id="blog" className="scroll-mt-24 mb-28 md:mb-36">
          <div className="text-center mb-16">
            <h2 className="font-cabinet font-bold text-4xl md:text-5xl mb-4 text-white">Latest Insights</h2>
            <p className="text-text-muted max-w-2xl mx-auto font-light">
              Thoughts on design, engineering, and the future of the web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <a href="#" className="block rounded-2xl glass p-6 border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl hover:border-neon-cyan transition-colors group">
              <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                  <Image width={64} height={64} alt="Blog" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=128" className="size-16 rounded-full object-cover sm:size-18" />
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

              <div className="mt-6 flex gap-4 lg:gap-6 text-xs text-text-muted">
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
              </div>
            </a>

            {/* Blog Card 2 */}
            <a href="#" className="block rounded-2xl glass p-6 border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-xl hover:border-electric-purple transition-colors group">
              <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                <div className="sm:order-last sm:shrink-0">
                  <Image width={64} height={64} alt="Blog" src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=128" className="size-16 rounded-full object-cover sm:size-18" />
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

              <div className="mt-6 flex gap-4 lg:gap-6 text-xs text-text-muted">
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
              </div>
            </a>
          </div>
        </section>

        {/* Lead/Contact capture */}
        <section id="contact" className="scroll-mt-24 overflow-hidden glass rounded-3xl sm:grid sm:grid-cols-2 sm:items-center border border-white/10 bg-gradient-to-br from-white/5 via-black to-black shadow-xl relative mb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/15 via-black to-black -z-10 pointer-events-none" />
          <div className="p-8 md:p-12 lg:px-16 lg:py-24 relative z-20">
            <div className="mx-auto max-w-xl text-center sm:text-left">
              <h2 className="text-3xl font-cabinet font-bold text-white md:text-4xl mb-4 animate-fade-up">
                Let&apos;s Build Something Extraordinary Together
              </h2>

              <p className="text-zinc-300 md:mt-4 md:block font-light text-base animate-fade-up animation-delay-100">
                Ready to elevate your digital presence? Let&apos;s collaborate to create a high-performance, visually stunning experience for your brand.
              </p>

              <div className="mt-4 md:mt-8 animate-fade-up animation-delay-200">
                <a href="mailto:contact@example.com" className="inline-flex items-center justify-center glass backdrop-blur-md bg-cyan-500/10 border border-cyan-500/30 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all glow-cyan-subtle">
                  Get Started Today
                </a>
              </div>
            </div>
          </div>

          <div className="h-full w-full relative sm:h-[calc(100%-2rem)] sm:self-end">
            <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-l from-transparent via-black/50 to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 z-10" />
            <ContactVideo isMobileServer={isMobile} />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-40 border-t border-white/5 pt-16 pb-4 relative overflow-hidden max-w-[1440px] mx-auto px-6 w-full">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-electric-purple/5 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="font-cabinet font-bold text-3xl tracking-tight mb-4">
                SHUVO<span className="text-neon-cyan">.</span>
              </div>
              <p className="text-zinc-300 text-sm max-w-sm mb-6 font-medium leading-relaxed">
                Engineering high-performance, visually stunning web applications that bridge the gap between design and engineering.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/rakibulhasanshuvo"
                  aria-label="GitHub"
                  className="w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
                >
                  <svg className="w-5 h-5 text-zinc-200 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
                >
                  <svg className="w-5 h-5 text-zinc-200 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
                >
                  <svg className="w-5 h-5 text-zinc-200 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-cabinet font-bold text-sm uppercase tracking-wider mb-6 text-white">Navigation</h3>
              <ul className="space-y-3 text-sm text-text-muted">
                <li><Link href="/projects" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">Work</Link></li>
                <li><Link href="/about" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">About</Link></li>
                <li><Link href="/#process" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">Process</Link></li>
                <li><Link href="/#reviews" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">Reviews</Link></li>
                <li><Link href="/contact" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-cabinet font-bold text-sm uppercase tracking-wider mb-6 text-white">Services</h3>
              <ul className="space-y-3 text-sm text-text-muted">
                <li><a href="#" className="hover:text-electric-purple transition-colors focus-visible:text-electric-purple focus:outline-none rounded block py-2">Web Development</a></li>
                <li><a href="#" className="hover:text-electric-purple transition-colors focus-visible:text-electric-purple focus:outline-none rounded block py-2">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-electric-purple transition-colors focus-visible:text-electric-purple focus:outline-none rounded block py-2">Performance Optimization</a></li>
                <li><a href="#" className="hover:text-electric-purple transition-colors focus-visible:text-electric-purple focus:outline-none rounded block py-2">Custom Integration</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-text-muted text-xs font-satoshi border-t border-white/5 pt-8">
            <p>© 2026 M.R.H. Shuvo. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0 items-center">
              <Link href="/dashboard" className="text-neon-cyan hover:underline font-bold transition-all focus-visible:ring-1 focus-visible:ring-neon-cyan rounded px-1">Admin Dashboard</Link>
              <span className="text-white/10">|</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
