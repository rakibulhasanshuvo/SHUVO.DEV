import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";

import type { Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibulhasanshuvo.com"),
  title: "Rakibul Hasan Shuvo | Cyber-Luxury Full-Stack Web Developer & Designer",
  description: "Portfolio of Muhammad Rakibul Hasan Shuvo, a Full-Stack Web Developer & Graphic Designer engineering high-performance, visually stunning Next.js and Supabase experiences.",
  keywords: ["Rakibul Hasan Shuvo", "Full-Stack Developer", "Next.js", "Tailwind CSS v4", "Supabase", "Cyber-Luxury Design", "React Developer", "Bangladesh Developer"],
  authors: [{ name: "Muhammad Rakibul Hasan Shuvo" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Website JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Rakibul Hasan Shuvo — Full-Stack Developer",
    "description": "Engineering high-performance, visually stunning custom web platforms with custom interactive graphics, custom scrapers, and Refine admin panels.",
    "url": "https://rakibulhasanshuvo.com", // Fallback URL
    "image": "https://rakibulhasanshuvo.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD"
    },
    "sameAs": [
      "https://github.com/rakibulhasanshuvo",
      "https://linkedin.com", // Fallback
      "https://upwork.com" // Fallback
    ],
    "priceRange": "$$"
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        {/* Preload Fontshare stylesheet for Satoshi, Cabinet Grotesk, and Clash Display with display=swap */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&f[]=cabinet-grotesk@300,400,500,700,800&f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="preload"
          as="style"
        />
        <link 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&f[]=cabinet-grotesk@300,400,500,700,800&f[]=clash-display@200,300,400,500,600,700&display=swap" 
          rel="stylesheet" 
        />
        {/* Preconnect and load JetBrains Mono from Google Fonts for developer typography */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cyber-black text-white font-satoshi selection:bg-neon-cyan/30 selection:text-white overflow-x-hidden">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

