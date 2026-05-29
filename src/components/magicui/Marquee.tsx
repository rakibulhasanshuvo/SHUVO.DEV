import { ReactNode } from "react";

export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={`flex overflow-hidden gap-4 ${className}`}>
      <div className={`will-change-transform flex gap-4 min-w-full shrink-0 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}>
        {children}
        {children} {/* Duplicate for seamless loop */}
      </div>
    </div>
  );
}
