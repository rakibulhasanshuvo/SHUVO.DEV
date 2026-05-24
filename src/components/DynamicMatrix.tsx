"use client";

import React from "react";
import dynamic from 'next/dynamic';
import { useIsMobile } from "@/hooks/use-mobile";

const MatrixBackground = dynamic(() => import('./MatrixBackground'), { ssr: false });

export default function DynamicMatrix() {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return <MatrixBackground />;
}
