"use client";

import React from "react";
import dynamic from 'next/dynamic';
import { useIsMobile } from "@/hooks/use-mobile";

const InteractiveGridBackground = dynamic(() => import('./InteractiveGridBackground'), { ssr: false });

export default function DynamicConstellation() {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return <InteractiveGridBackground />;
}
