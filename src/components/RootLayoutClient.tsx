"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    // Dashboard layouts handle their own layout, sidebars, headers, and custom scrolling
    return <div className="min-h-screen bg-cyber-black text-white">{children}</div>;
  }

  // Public website layout
  return (
    <>
      <Navbar />
      <SmoothScrolling>
        <main className="pt-24 flex-1 flex flex-col relative">
          {children}
        </main>
      </SmoothScrolling>
    </>
  );
}
