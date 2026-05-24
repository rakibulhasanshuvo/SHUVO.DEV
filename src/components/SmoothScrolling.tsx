"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.07,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.2
    }}>
      {children}
    </ReactLenis>
  );
}
