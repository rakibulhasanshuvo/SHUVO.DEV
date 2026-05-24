"use client";

import React from "react";

export default function ContactVideo() {


  return (
    <>
      <div 
        className="h-full w-full bg-cover bg-center opacity-60 sm:rounded-ss-[30px] md:rounded-ss-[60px] lg:hidden"
        style={{ 
          backgroundImage: "url('/portrait.png')",
          minHeight: "300px"
        }}
      />
      <video
      autoPlay
      muted
      loop
      playsInline
      poster="/portrait.png"
      preload="none"
      className="hidden lg:block h-full w-full object-cover opacity-60 sm:rounded-ss-[30px] md:rounded-ss-[60px]"
    >
      <source src="/videos/abstract-data-flows.webm" type="video/webm" />
      <source src="/videos/abstract-data-flows.mp4" type="video/mp4" />
    </video>
    </>
  );
}
