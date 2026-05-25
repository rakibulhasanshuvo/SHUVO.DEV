"use client";

import React from 'react';
import styles from './ThreeDCarousel.module.css';


const ThreeDCarousel = () => {



  // Array of 10 high-fidelity cyber-luxury cards representing Shuvo's engineering and design stack
  const cards = [
    {
      index: 0,
      color: '142, 249, 252',
      tag: 'SYS.UNIT.00',
      title: 'App Router Blueprint',
      subtitle: 'React Server Components',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-cyan-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Grid lines */}
          <line x1="20" y1="10" x2="180" y2="10" strokeDasharray="2 2" className="opacity-20" />
          <line x1="20" y1="170" x2="180" y2="170" strokeDasharray="2 2" className="opacity-20" />
          
          {/* Main Directory nodes */}
          <rect x="25" y="25" width="45" height="18" rx="4" className="fill-cyan-950/20" strokeWidth="1.5" />
          <text x="32" y="37" className="font-mono text-[8px] fill-cyan-400 stroke-none font-bold">src/app</text>
          
          {/* Connecting Trunk lines */}
          <path d="M 47,43 L 47,150" strokeWidth="1.5" />
          <path d="M 47,65 L 75,65" strokeWidth="1.2" />
          <path d="M 47,100 L 75,100" strokeWidth="1.2" />
          <path d="M 47,135 L 75,135" strokeWidth="1.2" />
          
          {/* Layout node */}
          <rect x="75" y="55" width="55" height="18" rx="4" className="fill-cyan-950/10" />
          <text x="82" y="67" className="font-mono text-[7px] fill-zinc-300 stroke-none">layout.tsx</text>
          <circle cx="122" cy="64" r="2.5" className="fill-cyan-400" />

          {/* Page node */}
          <rect x="75" y="90" width="55" height="18" rx="4" className="fill-cyan-950/10" />
          <text x="82" y="102" className="font-mono text-[7px] fill-zinc-300 stroke-none">page.tsx</text>
          <circle cx="122" cy="99" r="2.5" className="fill-emerald-400" />
          
          {/* Dynamic route folder */}
          <rect x="75" y="125" width="55" height="18" rx="4" className="fill-cyan-950/30" strokeWidth="1.5" />
          <text x="80" y="137" className="font-mono text-[7px] fill-cyan-400 stroke-none font-bold">[slug]</text>
          
          {/* Dynamic route subpage */}
          <path d="M 130,134 L 145,134" strokeWidth="1.2" />
          <rect x="145" y="125" width="45" height="18" rx="4" className="fill-cyan-950/10" />
          <text x="149" y="137" className="font-mono text-[6px] fill-zinc-300 stroke-none">page.tsx</text>
          
          {/* Cyber accents */}
          <path d="M 170,25 L 180,25 L 180,35" strokeWidth="1.5" />
          <circle cx="180" cy="25" r="1.5" className="fill-cyan-400" />
        </svg>
      )
    },
    {
      index: 1,
      color: '142, 252, 204',
      tag: 'FLOW.UNIT.01',
      title: 'Scraper Pipeline',
      subtitle: '10+ Active Bots Engine',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-emerald-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Network grid background */}
          <circle cx="100" cy="90" r="70" strokeDasharray="3 6" className="opacity-15" />
          <circle cx="100" cy="90" r="50" strokeDasharray="2 4" className="opacity-10" />

          {/* Central DB node */}
          <g className="animate-pulse">
            <rect x="80" y="75" width="40" height="30" rx="6" className="fill-emerald-950/20" strokeWidth="1.5" />
            <text x="92" y="93" className="font-mono text-[8px] fill-emerald-400 stroke-none font-bold">BUFFER</text>
          </g>
          
          {/* Scraper bots nodes sending data */}
          <g>
            {/* Bot 1 */}
            <circle cx="45" cy="50" r="8" className="fill-emerald-950/10" />
            <text x="42" y="53" className="font-mono text-[6px] fill-zinc-400 stroke-none">B1</text>
            <path d="M 53,55 L 80,75" strokeDasharray="3 3" />
            
            {/* Bot 2 */}
            <circle cx="45" cy="130" r="8" className="fill-emerald-950/10" />
            <text x="42" y="133" className="font-mono text-[6px] fill-zinc-400 stroke-none">B2</text>
            <path d="M 53,125 L 80,105" strokeDasharray="3 3" />
            
            {/* Bot 3 */}
            <circle cx="155" cy="50" r="8" className="fill-emerald-950/10" />
            <text x="152" y="53" className="font-mono text-[6px] fill-zinc-400 stroke-none">B3</text>
            <path d="M 147,55 L 120,75" strokeDasharray="3 3" />
            
            {/* Bot 4 */}
            <circle cx="155" cy="130" r="8" className="fill-emerald-950/10" />
            <text x="152" y="133" className="font-mono text-[6px] fill-zinc-400 stroke-none">B4</text>
            <path d="M 147,125 L 120,105" strokeDasharray="3 3" />
          </g>
          
          {/* Data packet flows */}
          <circle cx="63" cy="63" r="2.5" className="fill-emerald-400" />
          <circle cx="137" cy="117" r="2.5" className="fill-emerald-400" />
          
          {/* Tech Spec Info */}
          <text x="75" y="150" className="font-mono text-[6px] fill-zinc-500 stroke-none">RATE: 4.8k P/S</text>
        </svg>
      )
    },
    {
      index: 2,
      color: '142, 252, 157',
      tag: 'DATA.UNIT.02',
      title: 'Database Architecture',
      subtitle: 'PostgreSQL Relational DB',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-green-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Table 1: Users */}
          <rect x="20" y="30" width="65" height="85" rx="6" className="fill-green-950/10" strokeWidth="1.5" />
          <path d="M 20,48 L 85,48" strokeWidth="1.2" />
          <text x="25" y="42" className="font-mono text-[8px] fill-green-400 stroke-none font-bold">t_users</text>
          
          <text x="25" y="60" className="font-mono text-[6px] fill-zinc-400 stroke-none">🔑 id (uuid)</text>
          <text x="25" y="72" className="font-mono text-[6px] fill-zinc-500 stroke-none">✉ email (varchar)</text>
          <text x="25" y="84" className="font-mono text-[6px] fill-zinc-500 stroke-none">👤 role (enum)</text>
          <text x="25" y="96" className="font-mono text-[6px] fill-zinc-500 stroke-none">🕒 created_at</text>
          
          {/* Table 2: Projects */}
          <rect x="115" y="55" width="65" height="75" rx="6" className="fill-green-950/10" strokeWidth="1.5" />
          <path d="M 115,73 L 180,73" strokeWidth="1.2" />
          <text x="120" y="67" className="font-mono text-[8px] fill-green-400 stroke-none font-bold">t_projects</text>
          
          <text x="120" y="85" className="font-mono text-[6px] fill-zinc-400 stroke-none">🔑 id (uuid)</text>
          <text x="120" y="97" className="font-mono text-[6px] fill-zinc-300 stroke-none">🔗 user_id (uuid)</text>
          <text x="120" y="109" className="font-mono text-[6px] fill-zinc-500 stroke-none">📁 title (text)</text>
          
          {/* Relation connecting line */}
          <path d="M 85,60 C 100,60 100,97 115,97" strokeWidth="1.5" className="opacity-80" />
          <circle cx="85" cy="60" r="2" className="fill-green-400" />
          <circle cx="115" cy="97" r="2" className="fill-green-400" />
          
          <text x="20" y="150" className="font-mono text-[6px] fill-zinc-500 stroke-none">RELATION: ONE_TO_MANY</text>
        </svg>
      )
    },
    {
      index: 3,
      color: '215, 252, 142',
      tag: 'DSGN.UNIT.03',
      title: 'Vector Physics Canvas',
      subtitle: 'Math & Bezier Curves',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-lime-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Rulers and Grid */}
          <line x1="15" y1="20" x2="15" y2="160" strokeDasharray="1 3" className="opacity-40" />
          <line x1="15" y1="160" x2="185" y2="160" strokeDasharray="1 3" className="opacity-40" />
          
          {/* Complex Bezier curve */}
          <path d="M 30,130 C 50,30 140,50 170,120" strokeWidth="2.5" className="opacity-95" />
          
          {/* Control point 1 */}
          <circle cx="50" cy="30" r="4.5" className="fill-lime-950" strokeWidth="1.5" />
          <line x1="30" y1="130" x2="50" y2="30" strokeDasharray="2 2" className="opacity-50" />
          
          {/* Control point 2 */}
          <circle cx="140" cy="50" r="4.5" className="fill-lime-950" strokeWidth="1.5" />
          <line x1="170" y1="120" x2="140" y2="50" strokeDasharray="2 2" className="opacity-50" />

          {/* Anchor Nodes */}
          <rect x="25" y="125" width="10" height="10" rx="1" className="fill-lime-950" strokeWidth="2" />
          <rect x="165" y="115" width="10" height="10" rx="1" className="fill-lime-950" strokeWidth="2" />
          
          {/* Bezier math typography */}
          <text x="35" y="150" className="font-mono text-[7px] fill-zinc-400 stroke-none">B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃</text>
        </svg>
      )
    },
    {
      index: 4,
      color: '252, 252, 142',
      tag: 'API.UNIT.04',
      title: 'E-Commerce Integrations',
      subtitle: 'Webhook Pipelines',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-yellow-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* API Client interface */}
          <rect x="20" y="25" width="70" height="110" rx="6" className="fill-yellow-950/10" strokeWidth="1.5" />
          <circle cx="35" cy="40" r="3.5" className="fill-red-400" />
          <circle cx="45" cy="40" r="3.5" className="fill-yellow-400" />
          <circle cx="55" cy="40" r="3.5" className="fill-green-400" />
          
          {/* Simplified card interface */}
          <rect x="28" y="60" width="54" height="22" rx="3" className="fill-yellow-950/30" />
          <rect x="34" y="66" width="12" height="8" rx="1.5" className="fill-zinc-600/30" />
          <circle cx="70" cy="71" r="3" className="fill-yellow-400" />
          
          <line x1="28" y1="95" x2="82" y2="95" className="opacity-30" />
          <line x1="28" y1="107" x2="62" y2="107" className="opacity-30" strokeWidth="2" />
          
          {/* Flow vector arrows */}
          <path d="M 98,65 L 125,65 C 135,65 135,90 145,90" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="107" cy="65" r="2.5" className="fill-yellow-400" />
          
          {/* Webhook server */}
          <rect x="125" y="90" width="55" height="45" rx="6" className="fill-yellow-950/20" strokeWidth="1.5" />
          <text x="130" y="103" className="font-mono text-[7px] fill-yellow-400 stroke-none font-bold">WEBHOOK</text>
          <text x="130" y="115" className="font-mono text-[5.5px] fill-emerald-400 stroke-none font-bold">200 SUCCESS</text>
          <text x="130" y="125" className="font-mono text-[5.5px] fill-zinc-500 stroke-none">stripe_hook.ts</text>
        </svg>
      )
    },
    {
      index: 5,
      color: '252, 208, 142',
      tag: 'CLD.UNIT.05',
      title: 'Cloud Orchestration',
      subtitle: 'Docker Containers Node',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-orange-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Main cluster enclosure */}
          <rect x="20" y="25" width="160" height="120" rx="8" className="fill-orange-950/10" strokeWidth="1.5" strokeDasharray="4 2" />
          
          {/* Container Node 1 */}
          <g>
            <rect x="35" y="40" width="55" height="42" rx="4" className="fill-orange-950/25" strokeWidth="1.5" />
            <text x="40" y="52" className="font-mono text-[7px] fill-orange-400 stroke-none font-bold">CONTAINER 01</text>
            <text x="40" y="62" className="font-mono text-[6px] fill-zinc-400 stroke-none">nginx:latest</text>
            <rect x="40" y="70" width="25" height="4" rx="2" className="fill-orange-400/20" />
            <rect x="40" y="70" width="18" height="4" rx="2" className="fill-orange-400" />
          </g>
          
          {/* Container Node 2 */}
          <g>
            <rect x="110" y="40" width="55" height="42" rx="4" className="fill-orange-950/25" strokeWidth="1.5" />
            <text x="115" y="52" className="font-mono text-[7px] fill-orange-400 stroke-none font-bold">CONTAINER 02</text>
            <text x="115" y="62" className="font-mono text-[6px] fill-zinc-400 stroke-none">node:18-alpine</text>
            <rect x="115" y="70" width="25" height="4" rx="2" className="fill-orange-400/20" />
            <rect x="115" y="70" width="12" height="4" rx="2" className="fill-orange-400" />
          </g>

          {/* Infrastructure metrics */}
          <g>
            <rect x="35" y="95" width="130" height="38" rx="4" className="fill-orange-950/5" strokeWidth="1.2" />
            <text x="40" y="108" className="font-mono text-[7px] fill-zinc-400 stroke-none">CPU AVERAGE: 18.2%</text>
            <text x="40" y="119" className="font-mono text-[7px] fill-zinc-400 stroke-none">MEMORY TOTAL: 402 MB</text>
            <circle cx="150" cy="113" r="5" className="fill-emerald-500" />
            <circle cx="150" cy="113" r="10" className="fill-none" stroke="currentColor" strokeWidth="0.8" />
          </g>
        </svg>
      )
    },
    {
      index: 6,
      color: '252, 142, 142',
      tag: 'SEC.UNIT.06',
      title: 'Zero-Knowledge Security',
      subtitle: 'SHA-256 Key Exchange',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-red-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Cyber matrix background */}
          <g className="opacity-15 font-mono text-[6px] fill-current stroke-none">
            <text x="25" y="35">01001100 10101111 11000101</text>
            <text x="25" y="47">11100010 00100101 10100010</text>
            <text x="25" y="140">10100110 01101010 11001100</text>
            <text x="25" y="152">00100011 11010101 10101010</text>
          </g>
          
          {/* Futuristic Padlock Enclosure */}
          <g>
            <rect x="75" y="70" width="50" height="40" rx="8" className="fill-red-950/20" strokeWidth="2" />
            <path d="M 85,70 L 85,55 C 85,42 115,42 115,55 L 115,70" strokeWidth="2" />
            
            {/* Padlock center target core */}
            <circle cx="100" cy="90" r="6" className="fill-red-950" strokeWidth="1.5" />
            <line x1="100" y1="96" x2="100" y2="104" strokeWidth="1.5" />
            
            {/* Ring of scanning arc */}
            <path d="M 85,90 A 15 15 0 0 1 115,90" strokeWidth="1.2" className="opacity-70" />
          </g>

          <text x="63" y="125" className="font-mono text-[6.5px] fill-red-400 stroke-none font-bold">ENCRYPTED AES_256</text>
        </svg>
      )
    },
    {
      index: 7,
      color: '252, 142, 239',
      tag: 'PRF.UNIT.07',
      title: 'Lighthouse Performance',
      subtitle: 'Core Web Vitals 100/100',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-pink-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Target circle gauge */}
          <circle cx="100" cy="85" r="55" className="opacity-15" strokeWidth="3" />
          <path d="M 100,30 A 55 55 0 1 1 45,85" strokeWidth="3" strokeDasharray="3 2" className="opacity-30" />
          <circle cx="100" cy="85" r="55" strokeDasharray="345 345" strokeDashoffset="0" strokeWidth="3.5" className="opacity-95" />
          
          {/* Gauge Center details */}
          <text x="100" y="95" textAnchor="middle" className="font-cabinet font-bold text-3xl fill-pink-400 stroke-none">100</text>
          
          {/* Sub Dials on left/right */}
          <g className="opacity-80">
            {/* LCP dial */}
            <circle cx="45" cy="140" r="14" className="opacity-15" />
            <circle cx="45" cy="140" r="14" strokeDasharray="80" strokeDashoffset="0" strokeWidth="1.5" />
            <text x="45" y="143" textAnchor="middle" className="font-mono text-[6.5px] fill-zinc-300 stroke-none">LCP</text>
            
            {/* FID dial */}
            <circle cx="100" cy="150" r="14" className="opacity-15" />
            <circle cx="100" cy="150" r="14" strokeDasharray="80" strokeDashoffset="0" strokeWidth="1.5" />
            <text x="100" y="153" textAnchor="middle" className="font-mono text-[6.5px] fill-zinc-300 stroke-none">FID</text>
            
            {/* CLS dial */}
            <circle cx="155" cy="140" r="14" className="opacity-15" />
            <circle cx="155" cy="140" r="14" strokeDasharray="80" strokeDashoffset="0" strokeWidth="1.5" />
            <text x="155" y="143" textAnchor="middle" className="font-mono text-[6.5px] fill-zinc-300 stroke-none">CLS</text>
          </g>

          <text x="50" y="25" className="font-mono text-[6px] fill-zinc-500 stroke-none">SEO ACCESSIBILITY BEST PRACTICES</text>
        </svg>
      )
    },
    {
      index: 8,
      color: '204, 142, 252',
      tag: 'TOK.UNIT.08',
      title: 'Design Token Palette',
      subtitle: 'Harmonious Tailwind System',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-violet-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Dynamic palette swatches */}
          {/* Swatch 1: Cyan */}
          <rect x="25" y="30" width="40" height="40" rx="6" className="fill-cyan-950/20" stroke="rgba(142, 249, 252, 0.8)" strokeWidth="1.5" />
          <circle cx="45" cy="50" r="6" className="fill-cyan-400" />
          <text x="45" y="65" textAnchor="middle" className="font-mono text-[5px] fill-zinc-400 stroke-none">#8efffc</text>

          {/* Swatch 2: Emerald */}
          <rect x="80" y="30" width="40" height="40" rx="6" className="fill-emerald-950/20" stroke="rgba(142, 252, 204, 0.8)" strokeWidth="1.5" />
          <circle cx="100" cy="50" r="6" className="fill-emerald-400" />
          <text x="100" y="65" textAnchor="middle" className="font-mono text-[5px] fill-zinc-400 stroke-none">#8effcc</text>

          {/* Swatch 3: Purple */}
          <rect x="135" y="30" width="40" height="40" rx="6" className="fill-purple-950/20" stroke="rgba(204, 142, 252, 0.8)" strokeWidth="1.5" />
          <circle cx="155" cy="50" r="6" className="fill-purple-400" />
          <text x="155" y="65" textAnchor="middle" className="font-mono text-[5px] fill-zinc-400 stroke-none">#cc8eff</text>

          {/* Layout specifications overlay */}
          <g>
            <rect x="25" y="90" width="150" height="50" rx="6" className="fill-purple-950/5" strokeWidth="1.2" />
            <line x1="35" y1="115" x2="165" y2="115" strokeDasharray="3 3" />
            <line x1="60" y1="90" x2="60" y2="140" strokeDasharray="3 3" />
            <line x1="140" y1="90" x2="140" y2="140" strokeDasharray="3 3" />
            
            <circle cx="60" cy="115" r="3.5" className="fill-purple-400" />
            <circle cx="140" cy="115" r="3.5" className="fill-purple-400" />
            <text x="100" y="105" textAnchor="middle" className="font-mono text-[6px] fill-zinc-400 stroke-none">GAP: 80PX (5X)</text>
          </g>

          <text x="25" y="155" className="font-mono text-[6px] fill-zinc-500 stroke-none">CSS TOKENS: --tw-cyber-luxury</text>
        </svg>
      )
    },
    {
      index: 9,
      color: '142, 202, 252',
      tag: 'GIT.UNIT.09',
      title: 'Branching Git Graph',
      subtitle: 'Commit Version Control',
      svg: (
        <svg viewBox="0 0 200 180" className="w-full h-full text-blue-400 opacity-90 fill-none stroke-current" strokeWidth="1">
          {/* Commit Nodes and Lines */}
          {/* Main branch line */}
          <line x1="30" y1="120" x2="170" y2="120" strokeWidth="2.5" />
          
          {/* Feature branch line */}
          <path d="M 60,120 C 80,120 90,60 110,60 L 140,60 C 150,60 160,120 170,120" strokeWidth="1.8" strokeDasharray="2 2" />
          
          {/* Main branch commits */}
          <circle cx="30" cy="120" r="4.5" className="fill-blue-950" strokeWidth="2.2" />
          <text x="30" y="137" textAnchor="middle" className="font-mono text-[5.5px] fill-zinc-500 stroke-none font-bold">e82d92</text>
          
          <circle cx="60" cy="120" r="4.5" className="fill-blue-950" strokeWidth="2.2" />
          <text x="60" y="137" textAnchor="middle" className="font-mono text-[5.5px] fill-zinc-500 stroke-none font-bold">fc9182</text>
          
          <circle cx="115" cy="120" r="4.5" className="fill-blue-950" strokeWidth="2.2" />
          <text x="115" y="137" textAnchor="middle" className="font-mono text-[5.5px] fill-zinc-500 stroke-none font-bold">1d03a4</text>
          
          <circle cx="170" cy="120" r="5.5" className="fill-blue-950" strokeWidth="2.5" />
          <text x="170" y="139" textAnchor="middle" className="font-mono text-[5.5px] fill-blue-400 stroke-none font-bold">HEAD</text>

          {/* Feature branch commits */}
          <circle cx="110" cy="60" r="4" className="fill-blue-950" strokeWidth="2" />
          <text x="110" y="47" textAnchor="middle" className="font-mono text-[5.5px] fill-zinc-500 stroke-none font-bold">9b23c9</text>
          
          <circle cx="140" cy="60" r="4" className="fill-blue-950" strokeWidth="2" />
          <text x="140" y="47" textAnchor="middle" className="font-mono text-[5.5px] fill-zinc-500 stroke-none font-bold">48d1fa</text>
          
          {/* Pull Request Label */}
          <rect x="75" y="80" width="50" height="15" rx="3.5" className="fill-blue-950/20" strokeWidth="1" />
          <text x="100" y="90" textAnchor="middle" className="font-mono text-[6px] fill-blue-400 stroke-none font-bold">PR #28 MERGED</text>
        </svg>
      )
    }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner} style={{ '--quantity': 10 } as React.CSSProperties}>
        {cards.map((card) => (
          <div 
            key={card.index} 
            className={styles.card} 
            style={{ 
              '--index': card.index, 
              '--color-card': card.color 
            } as React.CSSProperties}
          >
            {/* The outer container uses the background matching colors */}
            <div className={`${styles.img} p-6 flex flex-col justify-between h-full w-full select-none text-left`}>
              {/* Header inside the card */}
              <div className="flex justify-between items-center opacity-80">
                <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border border-white/5 bg-white/5 font-semibold text-zinc-300" style={{ color: `rgb(${card.color})` }}>
                  {card.tag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: `rgb(${card.color})`, boxShadow: `0 0 8px rgb(${card.color})` }} />
              </div>
              
              {/* Center Schematic Canvas */}
              <div className="flex-1 w-full flex items-center justify-center my-4 overflow-hidden relative">
                {card.svg}
              </div>
              
              {/* Footer details inside the card */}
              <div className="border-t border-white/5 pt-2">
                <h4 className="font-cabinet font-bold text-sm tracking-tight text-white line-clamp-1 leading-none mb-1">
                  {card.title}
                </h4>
                <p className="text-[11px] font-light text-zinc-400 line-clamp-1">
                  {card.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThreeDCarousel;
