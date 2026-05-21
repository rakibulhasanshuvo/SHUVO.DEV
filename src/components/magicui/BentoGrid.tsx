import { ReactNode } from "react";

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
}

export function BentoCard({
  Icon,
  name,
  description,
  href,
  cta,
  background,
  className,
}: {
  Icon: React.ElementType;
  name: string;
  description: string;
  href: string;
  cta: string;
  background?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-300 hover:border-neon-cyan/30 ${className}`}>
      {/* Background Glow Effect on Hover */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.15),transparent_70%)]" />
      
      {background && <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-40 transition-opacity">{background}</div>}
      
      <div className="relative z-10">
        <div className="bg-zinc-800/80 p-2 rounded-lg inline-block border border-white/5">
          <Icon className="h-6 w-6 text-neon-cyan" />
        </div>
        <h3 className="text-xl font-bold text-white mt-4">{name}</h3>
        <p className="text-zinc-400 text-sm mt-1">{description}</p>
      </div>
      
      <div className="relative z-10 mt-4">
        <a href={href} className="text-sm font-medium text-neon-cyan hover:underline inline-flex items-center gap-1">
          {cta} <span>→</span>
        </a>
      </div>
    </div>
  );
}


