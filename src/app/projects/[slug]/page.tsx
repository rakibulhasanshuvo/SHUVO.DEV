import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData } from "../data";
import CodeBlock from "@/components/ui/CodeBlock";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";
import BrowserMockup from "@/components/ui/BrowserMockup";
import TechStackTelemetry from "@/components/ui/TechStackTelemetry";
import { createClient } from "@supabase/supabase-js";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug: slug,
  }));
}

// Dynamic styling configuration for each project
const projectsStyleConfig = {
  amolnama: {
    spotlightColor: "rgba(0, 240, 255, 0.12)",
    glowColor: "rgba(0, 240, 255, 0.2)",
    borderColor: "border-[#00F0FF]/15",
    borderHover: "hover:border-[#00F0FF]/40",
    gradientText: "from-[#00F0FF] via-white to-zinc-400",
    textColor: "text-[#00F0FF]",
    bgColor: "bg-[#00F0FF]",
    dotColor: "bg-[#00F0FF]",
    dotGlow: "shadow-[0_0_12px_#00F0FF]",
    badgeBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    textColorRaw: "#00F0FF"
  },
  componeo: {
    spotlightColor: "rgba(161, 0, 255, 0.12)",
    glowColor: "rgba(161, 0, 255, 0.2)",
    borderColor: "border-[#A100FF]/15",
    borderHover: "hover:border-[#A100FF]/40",
    gradientText: "from-[#A100FF] via-white to-zinc-400",
    textColor: "text-[#A100FF]",
    bgColor: "bg-[#A100FF]",
    dotColor: "bg-[#A100FF]",
    dotGlow: "shadow-[0_0_12px_#A100FF]",
    badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    textColorRaw: "#A100FF"
  },
  izzan: {
    spotlightColor: "rgba(16, 185, 129, 0.12)",
    glowColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "border-emerald-500/15",
    borderHover: "hover:border-emerald-500/40",
    gradientText: "from-emerald-400 via-white to-zinc-400",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-400",
    dotColor: "bg-emerald-400",
    dotGlow: "shadow-[0_0_12px_#10B981]",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    textColorRaw: "#10B981"
  },
  vortexa: {
    spotlightColor: "rgba(239, 68, 68, 0.12)",
    glowColor: "rgba(239, 68, 68, 0.2)",
    borderColor: "border-red-500/15",
    borderHover: "hover:border-red-500/40",
    gradientText: "from-red-400 via-white to-zinc-400",
    textColor: "text-red-400",
    bgColor: "bg-red-500",
    dotColor: "bg-red-500",
    dotGlow: "shadow-[0_0_12px_#EF4444]",
    badgeBg: "bg-red-500/10 border-red-500/20 text-red-400",
    textColorRaw: "#EF4444"
  },
};

// Engineering reflections and post-mortem console database
const postMortemDataMap = {
  amolnama: {
    lessons: "Decoupling scraper runtimes from core user-facing API threads is critical to maintain low latency. High density concurrent scrapers can otherwise cause main thread starvation.",
    bottleneck: "PostgreSQL row locks during deduplication under high write density was initially causing worker timeouts. Resolved by indexing MD5 transaction hashes.",
    limits: "Edge Chromium instances are restricted to an 8s execution timeout window, requiring optimistic retries on dynamic site structures."
  },
  componeo: {
    lessons: "Wasm-based compilers running entirely in memory achieve serverless builds in <35ms, side-stepping filesystem bottlenecks completely.",
    bottleneck: "Recursive ESM package dependency resolution cascades were resolved by implementing smart, path-independent Redis CDN cache maps.",
    limits: "Dynamic TypeScript parsing requires sandbox isolation and strict Content-Security-Policy parameters to mitigate upload execution risks."
  },
  izzan: {
    lessons: "Optimistic concurrency locking (OCC) scales much better than standard table locks for e-commerce, ensuring zero double-sale anomalies.",
    bottleneck: "Stripe webhook callbacks occasionally suffered from out-of-order execution, which we solved by enforcing versioned transaction locks.",
    limits: "Optimistic retry attempts are capped at 5 cycles, past which carts gracefully fallback to a pending reservation lock."
  },
  vortexa: {
    lessons: "Pre-warming unassigned container pools allows serverless cluster orchestration speeds to drop to a blistering <1.5s globally.",
    bottleneck: "Docker dynamic network socket bridges occasionally suffered from race conditions under load, resolved with port registries in Redis.",
    limits: "Standby pre-warmed database runtimes are constrained to 10 instances to keep resource consumption within micro-host bounds."
  }
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // 1. Attempt to fetch project dynamic metadata from Supabase
  let dbProject = null;
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Supabase env vars missing");
    }
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();
      
    if (data && !error) {
      dbProject = data;
    }
  } catch (err) {
    console.warn("Supabase connection unconfigured or failed, bypassing to local registry:", err);
  }

  // 2. Fetch project with local fallback
  const fallbackProject = projectsData[slug];
  const project = dbProject ? {
    ...fallbackProject,
    ...dbProject,
    codeSnippet: dbProject.codeSnippet || {
      code: dbProject.code_snippet?.code || "",
      language: dbProject.code_snippet?.language || "typescript",
      highlightedLines: dbProject.code_snippet?.highlightedLines || [],
    }
  } : fallbackProject;

  if (!project) {
    notFound();
  }

  // Dynamic branding style
  const style = projectsStyleConfig[slug as keyof typeof projectsStyleConfig] || projectsStyleConfig.amolnama;

  // Post-Mortem data
  const postMortem = postMortemDataMap[slug as keyof typeof postMortemDataMap] || postMortemDataMap.amolnama;

  // Infinite Visual Loop Navigator calculations
  const projectOrder = ["amolnama", "componeo", "izzan", "vortexa"];
  const currentIndex = projectOrder.indexOf(slug);
  const nextIndex = (currentIndex + 1) % projectOrder.length;
  const nextSlug = projectOrder[nextIndex];
  const nextProject = projectsData[nextSlug];
  const nextStyle = projectsStyleConfig[nextSlug as keyof typeof projectsStyleConfig] || projectsStyleConfig.amolnama;

  // Structured Data Schema for Software Application
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "description": project.description,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
    },
    "featureList": project.tech.join(", "),
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white py-20 px-6 font-satoshi relative overflow-hidden">
      {/* Background Interactive Ambient Spotlight */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[150px] pointer-events-none opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${style.glowColor} 0%, transparent 80%)`
        }}
      />

      {/* JSON-LD Rich Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2.5 text-xs text-text-muted hover:text-white transition-colors font-medium font-mono tracking-widest"
          >
            <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←</span>
            <span>BACK TO PROJECTS</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${style.dotColor} ${style.dotGlow}`} />
            <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full ${style.badgeBg} border`}>
              {project.category}
            </span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-bold font-cabinet mt-4 mb-4 text-transparent bg-clip-text bg-gradient-to-r ${style.gradientText} tracking-tight leading-none`}>
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-text-muted font-light leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>
        </header>

        {/* Immersive Browser Mockup Hero Showcase */}
        <div className="w-full flex justify-center mb-20 relative">
          <div className="w-full max-w-4xl relative">
            {/* Ambient Back Glow */}
            <div 
              className="absolute -inset-6 rounded-[2.5rem] opacity-25 blur-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${style.glowColor} 0%, transparent 70%)`
              }}
            />
            <BrowserMockup
              videoSrc={project.videoSrc}
              imageSrc={project.imageSrc}
              posterSrc={project.posterSrc}
              glowColor={style.spotlightColor}
              borderColor={style.borderColor}
              dotColor={style.dotColor}
              dotGlow={style.dotGlow}
              projectTitle={project.title}
              className="!max-w-none w-full"
            />
          </div>
        </div>

        {/* Dynamic Glowing Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {project.metrics.map((metric: any, idx: number) => (
            <div
              key={idx}
              className="glass p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden group select-none"
            >
              <span className="text-[10px] text-text-muted font-mono font-bold tracking-widest block mb-2 uppercase">{metric.label}</span>
              <span className="text-2xl sm:text-3xl font-bold font-cabinet text-white tracking-tight">
                {metric.value}
              </span>
              {/* Custom Glowing Bottom Hover Underline */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-[2.5px] w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${style.bgColor} ${style.dotGlow}`} 
              />
            </div>
          ))}
        </section>

        {/* Dynamic Interactive Tech Stack Telemetry Panel */}
        <section className="mb-20">
          <div className="mb-6">
            <h2 className="text-lg font-bold font-cabinet text-white tracking-tight">Technical Footprint Audit</h2>
            <p className="text-xs text-text-muted font-satoshi font-light mt-1">
              Select any stack module below to audit its architectural role, latency profile, and scaling constraints.
            </p>
          </div>
          <TechStackTelemetry techList={project.tech} slug={slug} style={style} />
        </section>

        {/* Bento Grid: Challenge, Solution & Value Realization Split */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {/* Challenge Bento Block */}
          <div className="lg:col-span-1 glass p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all duration-300 relative flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-base select-none">⚠️</span>
                <h3 className="text-sm font-mono font-bold tracking-wider text-white uppercase">The Challenge</h3>
              </div>
              <p className="text-zinc-300 text-sm font-light leading-relaxed font-satoshi">
                {project.problem}
              </p>
            </div>
            {/* Custom Dynamic Colored Left Indicator strip */}
            <div className={`absolute left-0 top-1/4 bottom-1/4 w-[3.5px] rounded-r-full transition-all duration-300 group-hover:top-6 group-hover:bottom-6 ${style.bgColor} ${style.dotGlow}`} />
          </div>

          {/* Solution Bento Block */}
          <div className="lg:col-span-1 glass p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all duration-300 relative flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-base select-none">🛠️</span>
                <h3 className="text-sm font-mono font-bold tracking-wider text-white uppercase">Engineered Solution</h3>
              </div>
              <p className="text-zinc-300 text-sm font-light leading-relaxed font-satoshi">
                {project.solution}
              </p>
            </div>
            {/* Custom Dynamic Colored Left Indicator strip */}
            <div className={`absolute left-0 top-1/4 bottom-1/4 w-[3.5px] rounded-r-full transition-all duration-300 group-hover:top-6 group-hover:bottom-6 ${style.bgColor} ${style.dotGlow}`} />
          </div>

          {/* Value Realization Bento Block (Premium HUD HUD design) */}
          <div 
            className={`lg:col-span-1 glass p-8 rounded-3xl border ${style.borderColor} bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-500`}
            style={{ 
              boxShadow: `inset 0 0 30px rgba(255,255,255,0.01), 0 0 40px ${style.spotlightColor}`
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-white/[0.01] rounded-full pointer-events-none" />
            <div>
              <span className={`text-[10px] font-mono font-bold tracking-widest ${style.textColor} uppercase block mb-4`}>
                PERFORMANCE GAIN (ROI)
              </span>
              <p className="text-xl sm:text-2xl font-bold font-cabinet text-white leading-snug tracking-tight">
                {project.roi}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-[10px] font-mono text-zinc-500 font-bold uppercase select-none">
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.bgColor} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${style.bgColor}`}></span>
              </span>
              <span>Deduplicated Ledger Sync Active</span>
            </div>
          </div>
        </section>

        {/* Dynamic interactive System Architecture Diagram Section */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-cabinet text-white tracking-tight">Pipeline Architecture</h2>
              <p className="text-xs text-text-muted font-satoshi font-light mt-1">
                Visualizing the dynamic execution thread and transactional lock controls.
              </p>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 bg-white/5 rounded-full font-bold">
              Schema Map V2.6
            </span>
          </div>
          <ArchitectureDiagram slug={slug} />
        </section>

        {/* Architectural Decision Record (ADR) - Bento Document Grid */}
        <section className="mb-20">
          <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all duration-300 relative overflow-hidden group">
            {/* Dynamic Subtle Accent background light */}
            <div 
              className="absolute -right-24 -top-24 w-48 h-48 rounded-full filter blur-[80px] pointer-events-none opacity-20 transition-all duration-500"
              style={{ backgroundColor: style.textColorRaw || "#00F0FF" }}
            />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-white/5">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase block mb-1">
                  ARCHITECTURAL DECISION RECORD
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-cabinet text-white tracking-tight">
                  {project.adr.title}
                </h3>
              </div>
              
              <div className={`inline-flex items-center gap-2 text-[10px] font-mono font-bold border px-3 py-1 rounded-full uppercase select-none ${
                project.adr.status === "Approved" 
                  ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" 
                  : "text-amber-400 border-amber-400/20 bg-amber-400/10"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  project.adr.status === "Approved" ? "bg-emerald-400 shadow-[0_0_8px_#34D399]" : "bg-amber-400 shadow-[0_0_8px_#FBBF24]"
                }`} />
                {project.adr.status}
              </div>
            </div>

            {/* 3-Column Bento Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Context Block */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-extrabold block">01 / Context</span>
                <p className="text-zinc-300 text-sm font-light leading-relaxed font-satoshi">
                  {project.adr.context}
                </p>
              </div>
              
              {/* Decision Block */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-extrabold block">02 / Decision</span>
                <p className="text-zinc-300 text-sm font-light leading-relaxed font-satoshi">
                  {project.adr.decision}
                </p>
              </div>

              {/* Consequences Block */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-extrabold block">03 / Consequences</span>
                <p className="text-zinc-300 text-sm font-light leading-relaxed font-satoshi">
                  {project.adr.consequences}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Reflections & Takeaways Console */}
        <section className="mb-20">
          <div className="w-full glass p-8 md:p-10 rounded-3xl border border-white/5 bg-[#070709]/90 relative overflow-hidden group select-none">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Terminal Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6 text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-zinc-400">ENGINEERING_POST_MORTEM.LOG</span>
              </div>
              <span className={style.textColor}>SHUVO.DEV // ARCHITECT STATE</span>
            </div>

            {/* Takeaways Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Takeaway 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-500 uppercase">
                  <span className={style.textColor}>[01]</span>
                  <span>Architectural Lesson</span>
                </div>
                <p className="text-zinc-300 text-sm font-light leading-relaxed font-satoshi">
                  {postMortem.lessons}
                </p>
              </div>

              {/* Takeaway 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-500 uppercase">
                  <span className={style.textColor}>[02]</span>
                  <span>Resolved Bottleneck</span>
                </div>
                <p className="text-zinc-300 text-sm font-light leading-relaxed font-satoshi">
                  {postMortem.bottleneck}
                </p>
              </div>

              {/* Takeaway 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-zinc-500 uppercase">
                  <span className={style.textColor}>[03]</span>
                  <span>Operational Limit</span>
                </div>
                <p className="text-zinc-300 text-sm font-light leading-relaxed font-satoshi">
                  {postMortem.limits}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Production Code segment */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold font-cabinet text-white tracking-tight">Production Code Segment</h2>
            <p className="text-xs text-text-muted font-satoshi font-light mt-1">
              Analyzing core asynchronous concurrency layers executing dynamic lock checks.
            </p>
          </div>
          <CodeBlock
            code={project.codeSnippet.code}
            language={project.codeSnippet.language}
            highlightedLines={project.codeSnippet.highlightedLines}
            filename={`${project.slug}_controller.ts`}
            pulseStatus="Ingestion Node | Active Thread [200ms]"
          />
        </section>

        {/* Loop Navigation: Up Next Dynamic Case Study Navigator Loop */}
        <section className="mt-24 pt-20 border-t border-white/5">
          <Link
            href={`/projects/${nextSlug}`}
            className="group relative block w-full rounded-3xl overflow-hidden glass border border-white/5 hover:border-white/10 transition-all duration-500 bg-white/[0.01]"
          >
            {/* Dynamic ambient backdrop hover glow */}
            <div 
              className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full filter blur-[100px] pointer-events-none opacity-0 group-hover:opacity-20 transition-all duration-700"
              style={{ backgroundColor: nextStyle.textColorRaw }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 md:p-12 relative z-10">
              {/* Left Side: Next Case Study Pitch */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">UP NEXT CASE STUDY</span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${nextStyle.bgColor} ${nextStyle.dotGlow}`} />
                </div>
                
                <h3 className={`text-3xl md:text-5xl font-bold font-cabinet text-transparent bg-clip-text bg-gradient-to-r ${nextStyle.gradientText} tracking-tight leading-none`}>
                  {nextProject.title}
                </h3>
                
                <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md font-satoshi">
                  {nextProject.subtitle}
                </p>
                
                <div className="pt-2 flex items-center gap-2.5 text-xs font-mono font-bold text-white group-hover:text-neon-cyan transition-colors">
                  <span>DISCOVER CASE STUDY</span>
                  <svg className="w-3.5 h-3.5 stroke-current fill-none group-hover:translate-x-1.5 transition-transform duration-300" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>

              {/* Right Side: Next Project Mockup Thumbnail */}
              <div className="md:col-span-5 flex justify-center md:justify-end">
                <div className="w-full max-w-[320px] aspect-[16/10] overflow-hidden rounded-xl border border-white/5 scale-[0.98] group-hover:scale-100 transition-all duration-700 shadow-2xl">
                  <BrowserMockup
                    videoSrc={nextProject.videoSrc}
                    imageSrc={nextProject.imageSrc}
                    posterSrc={nextProject.posterSrc}
                    glowColor={nextStyle.spotlightColor}
                    borderColor={nextStyle.borderColor}
                    dotColor={nextStyle.dotColor}
                    dotGlow={nextStyle.dotGlow}
                    projectTitle={nextProject.title}
                    className="!max-w-none w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Link>
        </section>

      </div>
    </div>
  );
}
