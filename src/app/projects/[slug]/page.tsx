import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData } from "../data";
import CodeBlock from "@/components/ui/CodeBlock";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug: slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) {
    notFound();
  }

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
      {/* Background neon accent glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[180px] pointer-events-none" />

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
            className="group inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors font-medium font-mono"
          >
            <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←</span>
            <span>BACK TO PROJECTS</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full">
            {project.category}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-cabinet mt-6 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-text-muted font-light leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>
        </header>

        {/* Key Performance Metrics Bento Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
            >
              <span className="text-xs text-text-muted font-mono font-light block mb-2">{metric.label}</span>
              <span className="text-2xl sm:text-3xl font-bold font-cabinet text-white tracking-tight">
                {metric.value}
              </span>
            </div>
          ))}
        </section>

        {/* Dynamic Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-start">
          {/* Problem & Solution Columns */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-lg font-bold font-cabinet text-white mb-3 tracking-wide">The Challenge</h3>
              <p className="text-zinc-300 text-base font-light leading-relaxed font-satoshi">
                {project.problem}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold font-cabinet text-white mb-3 tracking-wide">The Engineered Solution</h3>
              <p className="text-zinc-300 text-base font-light leading-relaxed font-satoshi">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Business ROI Card */}
          <div className="glass p-8 rounded-3xl border border-neon-cyan/20 bg-neon-cyan/[0.02] shadow-[0_0_40px_rgba(0,240,255,0.02)]">
            <h3 className="text-xs font-mono font-bold tracking-widest text-neon-cyan uppercase mb-4">
              PERFORMANCE GAIN (ROI)
            </h3>
            <p className="text-lg font-bold font-cabinet text-white leading-snug">
              {project.roi}
            </p>
          </div>
        </div>

        {/* Architecture Diagram Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold font-cabinet text-white tracking-tight">Pipeline Architecture</h2>
              <p className="text-xs text-text-muted font-satoshi font-light mt-1">
                Visualizing the dynamic execution thread and transactional lock controls.
              </p>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 bg-white/5 rounded-full">
              Schema Map V2.6
            </span>
          </div>
          <ArchitectureDiagram />
        </section>

        {/* ADR Decisions Section */}
        <section className="mb-20">
          <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 bg-[#0B0B0E]/60 backdrop-blur-xl relative">
            <div className="absolute top-6 right-8 text-xs font-mono font-bold text-emerald-400 border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 rounded-full uppercase">
              {project.adr.status}
            </div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase mb-4">
              ARCHITECTURAL DECISION RECORD
            </h3>
            <h2 className="text-xl sm:text-2xl font-bold font-cabinet text-white mb-6">
              {project.adr.title}
            </h2>
            <div className="space-y-6 text-sm text-zinc-300 font-satoshi font-light leading-relaxed">
              <div>
                <strong className="text-white font-medium block mb-1">Context</strong>
                <p>{project.adr.context}</p>
              </div>
              <div>
                <strong className="text-white font-medium block mb-1">Decision</strong>
                <p>{project.adr.decision}</p>
              </div>
              <div>
                <strong className="text-white font-medium block mb-1">Consequences</strong>
                <p>{project.adr.consequences}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Code snippet showcase */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-cabinet text-white tracking-tight">Production Code Segment</h2>
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
      </div>
    </div>
  );
}
