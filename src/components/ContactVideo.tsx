"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ContactVideo({ isMobileServer }: { isMobileServer?: boolean }) {
  const isMobileClient = useIsMobile();
  const isMobile = isMobileServer ?? isMobileClient;

  if (isMobile) {
    return (
      <div 
        className="h-full w-full bg-cover bg-center opacity-60 sm:rounded-ss-[30px] md:rounded-ss-[60px]"
        style={{ 
          backgroundImage: "url('/portrait-new.png')",
          minHeight: "300px"
        }}
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/portrait-new.png"
      preload="none"
      className="h-full w-full object-cover opacity-60 sm:rounded-ss-[30px] md:rounded-ss-[60px]"
    >
      <source src="/videos/abstract-data-flows.webm" type="video/webm" />
      <source src="/videos/abstract-data-flows.mp4" type="video/mp4" />
    </video>
  );
}
