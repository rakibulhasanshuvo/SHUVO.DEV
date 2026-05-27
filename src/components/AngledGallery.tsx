"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Terminal, 
  ShoppingBag, 
  Database,
  ArrowRight 
} from "lucide-react";

// Preconfigured default style palettes to map dynamically onto fetched projects
const DEFAULT_STYLES = [
  {
    icon: "Terminal" as const,
    color: "from-purple-500/10 via-purple-950/20 to-blue-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]",
    border: "group-hover:border-purple-500/40",
    textGlow: "text-purple-400"
  },
  {
    icon: "Sparkles" as const,
    color: "from-emerald-500/10 via-emerald-950/20 to-teal-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]",
    border: "group-hover:border-emerald-500/40",
    textGlow: "text-emerald-400"
  },
  {
    icon: "ShoppingBag" as const,
    color: "from-rose-500/10 via-rose-950/20 to-orange-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(244,63,94,0.2)]",
    border: "group-hover:border-rose-500/40",
    textGlow: "text-rose-400"
  },
  {
    icon: "Database" as const,
    color: "from-cyan-500/10 via-cyan-950/20 to-blue-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]",
    border: "group-hover:border-cyan-500/40",
    textGlow: "text-cyan-400"
  }
];

// Content-rich static fallbacks to guarantee robust local preview rendering
const STATIC_FALLBACK_ITEMS = [
  {
    id: "amolnama",
    title: "Amolnama",
    category: "DATA PIPELINE",
    icon: "Terminal" as const,
    metric: "99.9% Accuracy",
    metricLabel: "Deduplicated stream sync",
    tech: ["Next.js", "Puppeteer", "Redis"],
    color: "from-purple-500/10 via-purple-950/20 to-blue-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]",
    border: "group-hover:border-purple-500/40",
    textGlow: "text-purple-400",
    coverUrl: ""
  },
  {
    id: "componeo",
    title: "Componeo",
    category: "CORE DEVTOOL",
    icon: "Sparkles" as const,
    metric: "32ms Server-Ship",
    metricLabel: "In-memory ESM bundler",
    tech: ["Supabase", "TypeScript", "esbuild"],
    color: "from-emerald-500/10 via-emerald-950/20 to-teal-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]",
    border: "group-hover:border-emerald-500/40",
    textGlow: "text-emerald-400",
    coverUrl: ""
  },
  {
    id: "izzan",
    title: "Izzan",
    category: "E-COMMERCE CORE",
    icon: "ShoppingBag" as const,
    metric: "0.00% Sync Fail",
    metricLabel: "Optimistic flash sales",
    tech: ["Prisma", "PostgreSQL", "Stripe"],
    color: "from-rose-500/10 via-rose-950/20 to-orange-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(244,63,94,0.2)]",
    border: "group-hover:border-rose-500/40",
    textGlow: "text-rose-400",
    coverUrl: ""
  },
  {
    id: "vortexa",
    title: "Vortexa",
    category: "CLOUD ORCHESTRATION",
    icon: "Database" as const,
    metric: "< 1.5s Deploy",
    metricLabel: "Pre-warmed container allocation",
    tech: ["Docker", "Redis", "MongoDB"],
    color: "from-cyan-500/10 via-cyan-950/20 to-blue-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]",
    border: "group-hover:border-cyan-500/40",
    textGlow: "text-cyan-400",
    coverUrl: ""
  }
];

const ICONS = {
  Terminal,
  Sparkles,
  ShoppingBag,
  Database
};

interface GalleryColumnProps {
  items: any[];
  reverse?: boolean;
  duration?: number;
}

const GalleryColumn = ({ 
  items, 
  reverse = false, 
  duration = 20 
}: GalleryColumnProps) => {
  const [columnHovered, setColumnHovered] = useState(false);
  return (
    <div
      className={`flex flex-col will-change-transform ${reverse ? 'animate-scroll-reverse' : 'animate-scroll'}`}
      style={{ 
        animationDuration: `${duration}s`,
        animationPlayState: columnHovered ? "paused" : "running" 
      }}
      onMouseEnter={() => setColumnHovered(true)}
      onMouseLeave={() => setColumnHovered(false)}
    >
      {[...items, ...items].map((item, index) => {
        const IconComponent = ICONS[item.icon as keyof typeof ICONS] || Terminal;
        return (
          <div
            key={`${item.id}-${index}`}
            className={`
              w-48 h-[432px] md:w-64 md:h-[576px] rounded-[2rem] backdrop-blur-xl bg-black/45 
              border border-white/5 relative overflow-hidden group
              transition-all duration-700 hover:scale-[1.03] hover:z-20
              hover:border-white/20 mb-4 md:mb-6 flex flex-col p-5 md:p-8 justify-between
              shadow-2xl ${item.glow}
            `}
          >
            {/* Dynamic Project Cover Screenshot Background (Supabase Storage served) */}
            {item.coverUrl && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] z-0">
                <img
                  src={item.coverUrl}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-15 mix-blend-luminosity filter blur-[0.5px] group-hover:opacity-30 group-hover:scale-[1.05] transition-all duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/80 to-transparent" />
              </div>
            )}

            {/* Dynamic Glowing Mesh Background Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 mix-blend-color-dodge transition-opacity duration-700 group-hover:opacity-60 z-0`} />
            
            {/* Glass Reflection Sweep Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0">
              <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            </div>

            {/* Interactive Hover Border Glow */}
            <div className={`absolute inset-0 border-2 border-transparent ${item.border} rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-10`} />

            {/* Card Top: Window Controls & Category */}
            <div className="z-10 flex flex-col space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[8px] md:text-[9px] font-mono tracking-[0.25em] font-extrabold text-white/40 uppercase">
                  {item.category}
                </span>
                <div className="flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                  <span className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse ${item.textGlow}`}></span>
                </div>
              </div>
              <h3 className="font-cabinet font-black text-lg md:text-2xl tracking-tight text-white mt-1 group-hover:translate-x-1 transition-transform duration-500 flex items-center gap-2">
                <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${item.textGlow}`} />
                {item.title}
              </h3>
            </div>

            {/* Card Body: Interactive Neon Metrics */}
            <div className="z-10 space-y-1.5 md:space-y-2.5 my-auto">
              <span className={`font-cabinet font-extrabold text-2xl md:text-4xl tracking-tight block ${item.textGlow}`}>
                {item.metric}
              </span>
              <span className="text-[8px] md:text-[9px] font-mono tracking-widest font-black uppercase text-white/35 block">
                {item.metricLabel}
              </span>
            </div>

            {/* Card Bottom: Tech stack pills & link action */}
            <div className="z-10 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {item.tech.map((t: string) => (
                  <span 
                    key={t} 
                    className="text-[8px] md:text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
              <a 
                href={`/projects/${item.id}`}
                className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-mono font-extrabold tracking-wider text-white/30 group-hover:text-white/70 transition-colors duration-500 pt-3 border-t border-white/5 cursor-pointer decoration-transparent outline-none"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-500" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function AngledGallery() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchGalleryShowcases = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("title", { ascending: true })
          .limit(8);

        if (data && data.length > 0 && !error) {
          const mapped = data.map((dbProj: any, index: number) => {
            const style = DEFAULT_STYLES[index % DEFAULT_STYLES.length];
            
            // Derive a core performance metric dynamically
            let metricVal = "99.9% Success";
            let metricLbl = "Execution telemetries";
            
            if (dbProj.metrics && Array.isArray(dbProj.metrics) && dbProj.metrics.length > 0) {
              metricVal = dbProj.metrics[0].value || metricVal;
              metricLbl = dbProj.metrics[0].label || metricLbl;
            } else if (dbProj.roi) {
              metricVal = dbProj.roi;
              metricLbl = "Deduplicated stream sync";
            }

            return {
              id: dbProj.slug,
              title: dbProj.title,
              category: dbProj.category ? dbProj.category.toUpperCase() : "CASE STUDY",
              coverUrl: dbProj.cover_url,
              metric: metricVal,
              metricLabel: metricLbl,
              tech: dbProj.tech || [],
              ...style
            };
          });
          setGalleryItems(mapped);
          return;
        }
      } catch (err) {
        console.warn("Supabase projects query unconfigured, using static fallbacks.", err);
      }
      
      // Fallback
      setGalleryItems(STATIC_FALLBACK_ITEMS);
    };
    fetchGalleryShowcases();
  }, []);

  if (galleryItems.length === 0) return null;

  return (
    <section 
      className="relative w-full min-h-[100vh] overflow-hidden bg-transparent flex items-center justify-center mb-28 md:mb-36"
    >
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0) translateZ(0); }
          100% { transform: translateY(-50%) translateZ(0); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateY(-50%) translateZ(0); }
          100% { transform: translateY(0) translateZ(0); }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-95" />
      
      {/* 
        scale-[1.75] ensures no background clipping on 16:9 or ultrawide displays.
        rotate-[60deg] creates the architectural tilt.
      */}
      <div className="absolute flex gap-4 md:gap-6 rotate-[60deg] scale-[1.75] origin-center">
        <GalleryColumn items={galleryItems} reverse={false} duration={25} />
        <GalleryColumn items={galleryItems} reverse={true} duration={30} />
        <GalleryColumn items={galleryItems} reverse={false} duration={20} />
        <GalleryColumn items={galleryItems} reverse={true} duration={35} />
      </div>
    </section>
  );
}
