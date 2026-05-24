import React from "react";

// Fallback Icons (Dumber recreation to avoid missing dependencies)
export const FileTextIcon = () => <span className="text-xl">📄</span>;
export const BellIcon = () => <span className="text-xl">🔔</span>;
export const Share2Icon = () => <span className="text-xl">🔗</span>;
export const CalendarIcon = () => <span className="text-xl">📅</span>;
export const CodeIcon = () => (
  <svg className="w-4 h-4 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

export const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

export const features = [
  {
    Icon: FileTextIcon,
    name: "Real-time Data Scraping",
    description: "Amolnama tracks national events with 10+ active scraper bots.",
    href: "#",
    cta: "Explore Case Study",
    className: "lg:col-span-2 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <svg className="w-full h-32" viewBox="0 0 400 100">
          <path d="M 10,80 Q 100,20 200,70 T 390,30" fill="none" stroke="currentColor" strokeWidth="2" className="text-neon-cyan" />
          <path d="M 10,80 Q 100,20 200,70 T 390,30" fill="none" stroke="currentColor" strokeWidth="6" className="text-neon-cyan blur-md opacity-50" />
          <circle cx="200" cy="70" r="4" fill="var(--neon-cyan)" />
          <circle cx="200" cy="70" r="8" fill="none" stroke="var(--neon-cyan)" strokeWidth="1" className="animate-ping" />
        </svg>
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Component Registry Analytics",
    description: "Componeo monitors component usage across organizations.",
    href: "#",
    cta: "View Registry",
    className: "lg:col-span-2 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-3/4 space-y-2 font-mono text-xs">
          <div className="flex justify-between border-b border-white/10 pb-1">
            <span className="text-white">Component</span>
            <span className="text-white">Usage</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Buttons.tsx</span>
            <span className="text-neon-cyan">1.2k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Card.tsx</span>
            <span className="text-neon-cyan">850</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Navbar.tsx</span>
            <span className="text-neon-cyan">420</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Secure Cloud Infrastructure",
    description: "Vortexa provides encrypted database management.",
    href: "#",
    cta: "Read Documentation",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="relative">
          <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full" />
          <svg className="w-16 h-16 text-neon-cyan relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "E-Commerce Ecosystem",
    description: "Izzan Store connects payment gateways and shipping.",
    href: "#",
    cta: "Visit Store",
    className: "lg:col-span-3 lg:row-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="relative w-full h-full max-w-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyber-charcoal border border-white/10 px-4 py-2 rounded-full z-20 text-xs font-bold">
            Izzan
          </div>
          <div className="absolute top-1/4 left-1/4 bg-white/5 border border-white/10 p-2 rounded-full z-20 text-[11px]">Stripe</div>
          <div className="absolute top-1/4 right-1/4 bg-white/5 border border-white/10 p-2 rounded-full z-20 text-[11px]">PayPal</div>
          <div className="absolute bottom-1/4 left-1/4 bg-white/5 border border-white/10 p-2 rounded-full z-20 text-[11px]">FedEx</div>
          <div className="absolute bottom-1/4 right-1/4 bg-white/5 border border-white/10 p-2 rounded-full z-20 text-[11px]">Shopify</div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
            <path d="M 100,50 Q 200,100 200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
            <path d="M 300,50 Q 200,100 200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
            <path d="M 100,150 Q 200,100 200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
            <path d="M 300,150 Q 200,100 200,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
          </svg>
        </div>
      </div>
    ),
  },
];
