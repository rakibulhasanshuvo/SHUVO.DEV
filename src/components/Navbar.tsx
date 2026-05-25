"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/templates", label: "Templates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force close mobile menu on path changes
  useEffect(() => {
    setTimeout(() => setMobileOpen(false), 0);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color] duration-300 ${
        scrolled
          ? "py-3 bg-cyber-black/70 backdrop-blur-md border-b border-neon-cyan/20 shadow-[0_4px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(0,240,255,0.05)]"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1.5 text-white font-cabinet font-bold text-2xl tracking-wider select-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none rounded-lg">
            <span>SHUVO</span>
            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_10px_#00F0FF] group-hover:scale-125 transition-transform duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md relative">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 rounded-full z-10 focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none ${
                    isActive ? "text-white" : "text-text-muted hover:text-white"
                  }`}
                >
                  {isActive && (
                    <m.div
                      layoutId="nav-glider"
                      className="absolute inset-0 bg-gradient-to-r from-neon-cyan/40 to-neon-cyan rounded-full z-[-1] shadow-[0_0_15px_rgba(0,240,255,0.3)] border border-neon-cyan/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Call-to-Action button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/hire"
              className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-neon-cyan border border-neon-cyan/50 hover:border-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/15 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-lg border border-white/10 bg-white/5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-cyber-black/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-bold tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none rounded-lg px-4 py-3 block ${
                      isActive ? "text-neon-cyan" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/hire"
                className="mt-4 text-center px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-neon-cyan border border-neon-cyan bg-neon-cyan/5 w-full focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
              >
                Hire Me
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
