"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-40 border-t border-white/5 pt-16 pb-4 relative overflow-hidden max-w-[1440px] mx-auto px-6 w-full">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-electric-purple/5 rounded-full blur-3xl -z-10" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-cabinet font-bold text-3xl tracking-tight mb-4 text-white">
            SHUVO<span className="text-neon-cyan">.</span>
          </div>
          <p className="text-zinc-300 text-sm max-w-sm mb-6 font-medium leading-relaxed">
            Engineering high-performance, visually stunning web applications that bridge the gap between design and engineering.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/rakibulhasanshuvo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
            >
              <svg className="w-5 h-5 text-zinc-200 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/shuvo_dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
            >
              <svg className="w-5 h-5 text-zinc-200 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/rakibulhasanshuvo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:border-neon-cyan transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
            >
              <svg className="w-5 h-5 text-zinc-200 group-hover:text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-cabinet font-bold text-sm uppercase tracking-wider mb-6 text-white">Navigation</h3>
          <ul className="space-y-3 text-sm text-text-muted">
            <li><Link href="/projects" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">Work</Link></li>
            <li><Link href="/about" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">About</Link></li>
            <li><Link href="/#process" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">Process</Link></li>
            <li><Link href="/#reviews" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-neon-cyan transition-colors focus-visible:text-neon-cyan focus:outline-none rounded block py-2">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-cabinet font-bold text-sm uppercase tracking-wider mb-6 text-white">Services</h3>
          <ul className="space-y-3 text-sm text-text-muted">
            <li><Link href="/contact#pricing" className="hover:text-electric-purple transition-colors focus-visible:text-electric-purple focus:outline-none rounded block py-2">Web Development</Link></li>
            <li><Link href="/contact#pricing" className="hover:text-electric-purple transition-colors focus-visible:text-electric-purple focus:outline-none rounded block py-2">UI/UX Design</Link></li>
            <li><Link href="/contact#pricing" className="hover:text-electric-purple transition-colors focus-visible:text-electric-purple focus:outline-none rounded block py-2">Performance Optimization</Link></li>
            <li><Link href="/contact#pricing" className="hover:text-electric-purple transition-colors focus-visible:text-electric-purple focus:outline-none rounded block py-2">Custom Integration</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-text-muted text-xs font-satoshi border-t border-white/5 pt-8">
        <p>© 2026 M.R.H. Shuvo. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0 items-center">
          <Link href="/dashboard" className="text-neon-cyan hover:underline font-bold transition-all focus-visible:ring-1 focus-visible:ring-neon-cyan rounded px-1">Admin Dashboard</Link>
          <span className="text-white/10">|</span>
          <Link href="/contact?subject=privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact?subject=terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
