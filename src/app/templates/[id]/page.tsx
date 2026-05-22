import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import TASLProvenanceCard from "@/components/ui/TASLProvenanceCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface TemplateDetails {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
  posterUrl: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  specs: string[];
  iframePlaceholderUrl: string;
}

const templatesDetailsData: Record<string, TemplateDetails> = {
  zenith: {
    id: "zenith",
    title: "Zenith Agency Portfolio",
    category: "Creative Agency",
    price: "$59.00",
    description: "Zenith is a premium landing page template designed specifically for creative agencies and freelance professionals. Built with clean, path-aware slider elements and beautiful linear text highlights to present high-end digital agency portfolios.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS v4"],
    posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/rakibulhasanshuvo/zenith-agency-template",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    specs: ["100/100 Core Web Vitals Score", "Dark & Light CSS themes", "Fully responsive layout grids"],
    iframePlaceholderUrl: "https://rakibulhasanshuvo.com",
  },
  nova: {
    id: "nova",
    title: "Nova SaaS Dashboard Grid",
    category: "SaaS & Dashboard",
    price: "$79.00",
    description: "Nova is a highly responsive dashboard structure optimized for SaaS metrics tracking. Featuring automated container metrics, active JSS rates tracking, and a series of dynamic glowing canvas cards.",
    tags: ["React 19", "Recharts", "Supabase Backend"],
    posterUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/rakibulhasanshuvo/nova-saas-dashboard",
    license: "Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by-nd/4.0/",
    specs: ["Wasm-powered esbuild bundling", "Automated container status check", "Zero-latency Redis edge cache"],
    iframePlaceholderUrl: "https://rakibulhasanshuvo.com",
  },
  ethereal: {
    id: "ethereal",
    title: "Ethereal Commerce Web3",
    category: "Full-Stack Commerce",
    price: "$99.00",
    description: "Ethereal is a full-stack transactional template designed to handle concurrent visitors gracefully. Built with version-locked optimistic locking layers to guarantee safe, double-sell free checkout cycles.",
    tags: ["Next.js 16", "Stripe Checkout", "Prisma Postgres"],
    posterUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    sourceUrl: "https://github.com/rakibulhasanshuvo/ethereal-commerce",
    license: "Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    specs: ["Race condition prevention layers", "Prisma PostgreSQL schemas", "Secure Stripe stepper workflows"],
    iframePlaceholderUrl: "https://rakibulhasanshuvo.com",
  },
};

export async function generateStaticParams() {
  return Object.keys(templatesDetailsData).map((id) => ({
    id: id,
  }));
}

export default async function TemplateDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const template = templatesDetailsData[id];

  if (!template) {
    notFound();
  }

  // Combined Product and SoftwareApplication JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://rakibulhasanshuvo.com/templates/${template.id}#product`,
        "name": template.title,
        "description": template.description,
        "image": template.posterUrl,
        "offers": {
          "@type": "Offer",
          "price": template.price.replace("$", ""),
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `https://rakibulhasanshuvo.com/templates/${template.id}#software`,
        "name": template.title,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "description": template.description,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white py-20 px-6 font-satoshi relative overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Structured schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/templates"
            className="group inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors font-medium font-mono"
          >
            <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←</span>
            <span>BACK TO SHELF</span>
          </Link>
        </div>

        {/* Layout splits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Interactive viewframe simulator */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-3xl border border-white/5 bg-[#08080A]/40 overflow-hidden shadow-2xl">
              {/* Header Toggles */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>

                {/* Viewport Toggles (Simulated mock buttons) */}
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
                  <button className="px-3 py-1 bg-white/10 rounded-md text-[11px] font-bold uppercase tracking-wider text-white border border-white/10">
                    Desktop
                  </button>
                  <button className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-text-muted hover:text-white">
                    Tablet
                  </button>
                  <button className="px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-text-muted hover:text-white">
                    Mobile
                  </button>
                </div>
              </div>

              {/* Viewport Simulator Frame */}
              <div className="relative bg-[#0F0F12] aspect-[16/10] flex items-center justify-center p-8 transition-all">
                {/* Simulated frame content */}
                <div className="w-full h-full rounded-2xl border border-white/10 bg-[#070709] overflow-hidden relative shadow-inner group">
                  <img
                    src={template.posterUrl}
                    alt={template.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8">
                    <span className="text-[11px] font-mono text-neon-cyan tracking-widest uppercase mb-2">LIVE SANDBOX READY</span>
                    <h3 className="text-2xl font-bold font-cabinet text-white mb-2">{template.title}</h3>
                    <p className="text-xs text-text-muted max-w-md font-light leading-relaxed">
                      Click the live preview command to trigger full sandbox instances mapped on pre-warmed clusters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Template descriptions & spec */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-cabinet text-white tracking-tight">Overview</h2>
                <p className="text-zinc-300 text-base font-light leading-relaxed mt-3">
                  {template.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold font-cabinet text-white uppercase tracking-wider mb-3">
                  Key Technical Specifications
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-muted font-light font-satoshi">
                  {template.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-neon-cyan select-none">✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & CC TASL block */}
          <aside className="space-y-8 lg:sticky lg:top-24">
            <div className="glass p-8 rounded-3xl border border-white/5 bg-[#0B0B0E]/60 backdrop-blur-xl shadow-xl space-y-6">
              <div>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-widest block mb-1">Single License Pricing</span>
                <span className="text-4xl font-bold font-cabinet text-white tracking-tight">{template.price}</span>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-gradient-to-r from-neon-cyan/80 to-neon-cyan text-cyber-black text-sm font-extrabold uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  Add to Cart
                </button>
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-bold uppercase tracking-widest rounded-2xl transition-all cursor-pointer">
                  Live Preview
                </button>
              </div>

              <div className="pt-6 border-t border-white/5 text-[11px] text-text-muted font-light leading-relaxed font-satoshi">
                Includes 6 months of active technical maintenance, secure file checkouts, and complete CC attribution templates files.
              </div>
            </div>

            {/* CC attribution cert widget */}
            <TASLProvenanceCard
              title={template.title}
              author="Muhammad Rakibul Hasan Shuvo"
              sourceUrl={template.sourceUrl}
              license={template.license.split(" (")[0]}
              licenseUrl={template.licenseUrl}
              certId={`CERT-2026-${template.id.toUpperCase()}`}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
