"use client";

import React from "react";
import dynamic from 'next/dynamic';
import { useIsMobile } from "@/hooks/use-mobile";

const RainBackground = dynamic(() => import('./RainBackground'), { ssr: false });

export default function DynamicRain() {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return <RainBackground />;
}
