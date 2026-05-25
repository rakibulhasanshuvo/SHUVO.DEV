"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Menu,
  Search,
  Mail,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  FileSpreadsheet,
  ToggleLeft,
  CalendarDays,
  FileCheck2,
  X,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Dropdown states
  const [messageOpen, setMessageOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Force close mobile sidebar on path change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/widgets", label: "Widgets", icon: CalendarDays },
    { href: "/dashboard/forms", label: "Forms", icon: ToggleLeft },
    { href: "/dashboard/tables", label: "Tables", icon: FileSpreadsheet },
  ];

  return (
    <div className="min-h-screen bg-black font-satoshi flex relative text-white">
      {/* 1. Sidebar (Desktop & Tablet) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 h-screen bg-darkpan-bg border-r border-darkpan-red/10 transition-all duration-300 z-40 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        } hidden lg:flex`}
      >
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-darkpan-red/10">
          <Link href="/dashboard" className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none rounded-lg">
            <span className="w-8 h-8 rounded-lg bg-darkpan-red flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(235,22,22,0.6)]">
              DP
            </span>
            {sidebarOpen && (
              <m.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-cabinet font-black text-xl tracking-wider text-darkpan-red"
              >
                DARKPAN
              </m.span>
            )}
          </Link>
        </div>

        {/* User Profile Summary */}
        <div className={`p-6 border-b border-darkpan-red/10 flex items-center ${sidebarOpen ? "gap-4" : "justify-center"}`}>
          <div className="relative flex-shrink-0">
            <Image
              src="/portrait.png"
              alt="Admin Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border border-darkpan-red/30 shadow-[0_0_10px_rgba(235,22,22,0.2)]"
              onError={(e) => {
                // Fallback avatar
                e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
              }}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-darkpan-bg"></span>
          </div>
          {sidebarOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h6 className="font-bold text-sm tracking-wide text-white">Rakibul Shuvo</h6>
              <span className="text-xs text-darkpan-slate font-medium">Administrator</span>
            </m.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-[color,background-color,border-color] duration-300 relative group font-semibold text-sm focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none ${
                  isActive
                    ? "text-darkpan-red bg-black/50 border border-darkpan-red/20 shadow-[inset_0_0_10px_rgba(235,22,22,0.05)]"
                    : "text-darkpan-slate hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {/* Active side indicator */}
                {isActive && (
                  <m.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-3 bottom-3 w-1 bg-darkpan-red rounded-r-md"
                  />
                )}
                <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-darkpan-red" : ""}`} />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        {sidebarOpen && (
          <div className="p-6 border-t border-darkpan-red/10 text-center">
            <span className="text-[10px] text-darkpan-slate uppercase tracking-widest font-bold">
              © SHUVO.DEV Admin
            </span>
          </div>
        )}
      </aside>

      {/* 2. Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black z-45 lg:hidden"
            />
            {/* Drawer */}
            <m.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-64 h-screen bg-darkpan-bg border-r border-darkpan-red/10 z-50 flex flex-col lg:hidden"
            >
              {/* Brand Mobile */}
              <div className="h-20 flex items-center justify-between px-6 border-b border-darkpan-red/10">
                <Link href="/dashboard" className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none rounded-lg">
                  <span className="w-8 h-8 rounded-lg bg-darkpan-red flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(235,22,22,0.6)]">
                    DP
                  </span>
                  <span className="font-cabinet font-black text-xl tracking-wider text-darkpan-red">
                    DARKPAN
                  </span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer text-white focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
                  aria-label="Close Sidebar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Mobile */}
              <div className="p-6 border-b border-darkpan-red/10 flex items-center gap-4">
                <div className="relative">
                  <Image
                    src="/portrait.png"
                    alt="Admin Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border border-darkpan-red/30"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-darkpan-bg"></span>
                </div>
                <div>
                  <h6 className="font-bold text-sm tracking-wide text-white">Rakibul Shuvo</h6>
                  <span className="text-xs text-darkpan-slate font-medium">Administrator</span>
                </div>
              </div>

              {/* Nav Mobile */}
              <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-[color,background-color,border-color] duration-300 font-semibold text-sm focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none ${
                        isActive
                          ? "text-darkpan-red bg-black/50 border border-darkpan-red/20"
                          : "text-darkpan-slate hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-darkpan-red/10 text-center">
                <span className="text-[10px] text-darkpan-slate uppercase tracking-widest font-bold">
                  © SHUVO.DEV Admin
                </span>
              </div>
            </m.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Dashboard Wrapper */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        {/* Top Header Navbar */}
        <header className="h-20 bg-darkpan-bg border-b border-darkpan-red/10 sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Desktop Toggler */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 rounded-full bg-black hover:bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer text-white hidden lg:flex transition-colors focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Mobile/Tablet Drawer Toggler */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="w-10 h-10 rounded-full bg-black hover:bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer text-white lg:hidden transition-colors focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Dashboard Search */}
            <form onSubmit={(e) => e.preventDefault()} className="hidden sm:flex relative items-center">
              <Search className="absolute left-3 w-4 h-4 text-darkpan-slate" />
              <input
                type="search"
                placeholder="Search analytics…"
                className="w-60 bg-black border border-white/10 focus:border-darkpan-red/40 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all placeholder:text-darkpan-slate"
              />
            </form>
          </div>

          {/* Action Menus */}
          <div className="flex items-center gap-4 relative">
            {/* Messages Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setMessageOpen(!messageOpen);
                  setNotificationOpen(false);
                  setProfileOpen(false);
                }}
                className="w-10 h-10 rounded-full bg-black hover:bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer text-white transition-colors relative focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
                aria-label="View Messages"
              >
                <Mail className="w-4.5 h-4.5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-darkpan-red rounded-full animate-pulse shadow-[0_0_5px_#EB1616]"></span>
              </button>

              <AnimatePresence>
                {messageOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMessageOpen(false)} />
                    <m.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-72 bg-darkpan-bg border border-darkpan-red/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(235,22,22,0.05)] z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/40">
                        <h6 className="font-bold text-xs uppercase tracking-wider text-darkpan-slate">Messages</h6>
                        <span className="text-[10px] bg-darkpan-red/15 text-darkpan-red font-bold px-2 py-0.5 rounded-full">3 New</span>
                      </div>
                      <div className="divide-y divide-white/5">
                        <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                          <Image
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&h=40&q=80"
                            alt="Jhon"
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-white">Jhon Doe</p>
                            <p className="text-[11px] text-darkpan-slate truncate max-w-[170px]">Stunning design! Can we schedule a meeting?</p>
                            <span className="text-[9px] text-darkpan-red font-semibold">15 minutes ago</span>
                          </div>
                        </div>
                        <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                          <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&h=40&q=80"
                            alt="Alex"
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-white">Alex Mercer</p>
                            <p className="text-[11px] text-darkpan-slate truncate max-w-[170px]">Is the client dashboard synced with Supabase?</p>
                            <span className="text-[9px] text-darkpan-slate">1 hour ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 text-center border-t border-white/5 bg-black/20">
                        <Link href="/dashboard" onClick={() => setMessageOpen(false)} className="text-xs text-darkpan-red font-bold hover:underline">
                          See all messages
                        </Link>
                      </div>
                    </m.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setMessageOpen(false);
                  setProfileOpen(false);
                }}
                className="w-10 h-10 rounded-full bg-black hover:bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer text-white transition-colors relative focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
                aria-label="View Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-darkpan-red rounded-full"></span>
              </button>

              <AnimatePresence>
                {notificationOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotificationOpen(false)} />
                    <m.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-72 bg-darkpan-bg border border-darkpan-red/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(235,22,22,0.05)] z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/40">
                        <h6 className="font-bold text-xs uppercase tracking-wider text-darkpan-slate">Notifications</h6>
                        <span className="text-[10px] text-darkpan-red font-bold">Clear All</span>
                      </div>
                      <div className="divide-y divide-white/5">
                        <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                          <p className="text-xs font-semibold text-white">Client query received</p>
                          <span className="text-[9px] text-darkpan-red font-semibold">5 mins ago</span>
                        </div>
                        <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                          <p className="text-xs font-semibold text-white">CPU utilization is high (92%)</p>
                          <span className="text-[9px] text-darkpan-slate">22 mins ago</span>
                        </div>
                      </div>
                      <div className="p-3 text-center border-t border-white/5 bg-black/20">
                        <Link href="/dashboard" onClick={() => setNotificationOpen(false)} className="text-xs text-darkpan-red font-bold hover:underline">
                          See all notifications
                        </Link>
                      </div>
                    </m.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setMessageOpen(false);
                  setNotificationOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-white/5 px-3 py-1.5 rounded-full border border-transparent hover:border-white/5 cursor-pointer text-white transition-[color,background-color,border-color] duration-300 focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-2 focus-visible:ring-offset-black focus:outline-none"
                aria-label="Admin Profile Menu"
              >
                <Image
                  src="/portrait.png"
                  alt="Admin Portrait"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border border-darkpan-red/20"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
                  }}
                />
                <span className="text-xs font-bold tracking-wide hidden sm:inline-flex">Rakibul Shuvo</span>
                <ChevronDown className="w-3.5 h-3.5 text-darkpan-slate" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <m.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-48 bg-darkpan-bg border border-darkpan-red/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(235,22,22,0.05)] z-50 overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-darkpan-slate hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-1 focus-visible:ring-offset-black focus:outline-none"
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-darkpan-slate hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-1 focus-visible:ring-offset-black focus:outline-none"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <hr className="border-white/5 mx-2" />
                        <Link
                          href="/"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs text-darkpan-red hover:bg-darkpan-red/10 rounded-xl transition-colors font-bold focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-1 focus-visible:ring-offset-black focus:outline-none"
                        >
                          <LogOut className="w-4 h-4" />
                          Exit Dashboard
                        </Link>
                      </div>
                    </m.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 bg-black overflow-y-auto">
          {children}
        </main>

        {/* Dashboard Footer */}
        <footer className="bg-darkpan-bg border-t border-darkpan-red/10 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-darkpan-slate text-center sm:text-left font-medium">
              &copy; <Link href="/" className="hover:underline text-white font-semibold">SHUVO.DEV</Link>. All Rights Reserved.
            </p>
            <p className="text-xs text-darkpan-slate text-center sm:text-right font-medium">
              Designed & Ported by <span className="text-darkpan-red font-semibold">Antigravity AI</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}