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
  FolderGit,
  Grid,
  Activity,
  BadgeDollarSign,
  Check,
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

  // Dynamic User & Database-driven notifications states
  const [userEmail, setUserEmail] = useState("");
  const [notifications, setNotifications] = useState<{ id: string; title: string; time: string }[]>([]);
  const [latestMessages, setLatestMessages] = useState<{ id: string; name: string; text: string; time: string; avatarUrl: string }[]>([]);

  // Dynamic user profile settings states
  const [displayName, setDisplayName] = useState("Rakibul Shuvo");
  const [avatarUrl, setAvatarUrl] = useState("/portrait-new.png");
  
  // Settings modal states
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<"profile" | "account">("profile");
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [avatarUploadProgress, setAvatarUploadProgress] = useState(0);
  const [settingsSuccessMessage, setSettingsSuccessMessage] = useState("");
  const [settingsErrorMessage, setSettingsErrorMessage] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        
        // 1. Get active user session
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserEmail(user.email || "");
          if (user.user_metadata?.full_name) {
            setDisplayName(user.user_metadata.full_name);
          }
          if (user.user_metadata?.avatar_url) {
            setAvatarUrl(user.user_metadata.avatar_url);
          }
        }

        // 2. Get unread templates requests and contact enquiries (leads status 'new')
        const { data: leads, error } = await supabase
          .from("leads")
          .select("id, name, subject, created_at")
          .eq("status", "new")
          .order("created_at", { ascending: false })
          .limit(5);

        if (leads && !error) {
          const formatted = leads.map((lead: any) => {
            const date = new Date(lead.created_at);
            const diffMs = Date.now() - date.getTime();
            const diffMins = Math.round(diffMs / 60000);
            const diffHours = Math.round(diffMins / 60);
            
            let timeStr = "Just now";
            if (diffMins > 0 && diffMins < 60) {
              timeStr = `${diffMins}m ago`;
            } else if (diffHours > 0 && diffHours < 24) {
              timeStr = `${diffHours}h ago`;
            } else if (diffHours >= 24) {
              timeStr = date.toLocaleDateString();
            }

            return {
              id: lead.id,
              title: `${lead.name}: ${lead.subject}`,
              time: timeStr,
            };
          });
          setNotifications(formatted);
        }

        // 3. Get latest inbox messages (leads from any client contact or request)
        const { data: dbMessages, error: msgError } = await supabase
          .from("leads")
          .select("id, name, message, created_at")
          .order("created_at", { ascending: false })
          .limit(4);

        if (dbMessages && !msgError) {
          const formattedMsgs = dbMessages.map((msg: any, idx: number) => {
            const date = new Date(msg.created_at);
            const diffMs = Date.now() - date.getTime();
            const diffMins = Math.round(diffMs / 60000);
            const diffHours = Math.round(diffMins / 60);
            
            let timeStr = "Just now";
            if (diffMins > 0 && diffMins < 60) {
              timeStr = `${diffMins}m ago`;
            } else if (diffHours > 0 && diffHours < 24) {
              timeStr = `${diffHours}h ago`;
            } else if (diffHours >= 24) {
              timeStr = date.toLocaleDateString();
            }

            const avatarUrls = [
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
            ];

            return {
              id: msg.id,
              name: msg.name,
              text: msg.message,
              time: timeStr,
              avatarUrl: avatarUrls[idx % avatarUrls.length]
            };
          });
          setLatestMessages(formattedMsgs);
        }
      } catch (err) {
        console.warn("Could not dynamically resolve admin session or leads data:", err);
      }
    };
    fetchUserData();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err) {
      console.error("Sign out error:", err);
      window.location.href = "/";
    }
  };

  const openSettings = (tab: "profile" | "account") => {
    setEditDisplayName(displayName);
    setEditAvatarUrl(avatarUrl);
    setEditEmail(userEmail);
    setEditPassword("");
    setEditConfirmPassword("");
    setSettingsSuccessMessage("");
    setSettingsErrorMessage("");
    setActiveSettingsTab(tab);
    setSettingsModalOpen(true);
    setProfileOpen(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSettingsErrorMessage("Avatar image file is too large. Keep it under 5MB.");
      return;
    }

    setIsAvatarUploading(true);
    setAvatarUploadProgress(0);
    setSettingsErrorMessage("");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dv2tnlb40";
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setAvatarUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          let optimizedUrl = response.secure_url;
          
          if (optimizedUrl.includes("/image/upload/")) {
            optimizedUrl = optimizedUrl.replace("/image/upload/", "/image/upload/w_150,h_150,c_fill,g_face,f_auto,q_auto/");
          }
          
          setEditAvatarUrl(optimizedUrl);
          setIsAvatarUploading(false);
          setAvatarUploadProgress(0);
        } else {
          try {
            const response = JSON.parse(xhr.responseText);
            setSettingsErrorMessage(`Upload failed: ${response.error?.message || "Verify upload preset"}`);
          } catch {
            setSettingsErrorMessage("Avatar upload failed. Check Cloudinary settings.");
          }
          setIsAvatarUploading(false);
        }
      };

      xhr.onerror = () => {
        setSettingsErrorMessage("Network error occurred during avatar upload.");
        setIsAvatarUploading(false);
      };

      xhr.send(formData);
    } catch (err: any) {
      setSettingsErrorMessage(err.message || "Avatar upload encountered an error.");
      setIsAvatarUploading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSuccessMessage("");
    setSettingsErrorMessage("");

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const updateData: any = {
        data: {
          full_name: editDisplayName,
          avatar_url: editAvatarUrl,
        }
      };

      if (activeSettingsTab === "account") {
        if (editPassword) {
          if (editPassword !== editConfirmPassword) {
            setSettingsErrorMessage("Passwords do not match.");
            setIsSavingSettings(false);
            return;
          }
          if (editPassword.length < 6) {
            setSettingsErrorMessage("Password must be at least 6 characters.");
            setIsSavingSettings(false);
            return;
          }
          updateData.password = editPassword;
        }

        if (editEmail && editEmail !== userEmail) {
          updateData.email = editEmail;
        }
      }

      const { data, error } = await supabase.auth.updateUser(updateData);

      if (error) {
        setSettingsErrorMessage(error.message);
      } else {
        setDisplayName(editDisplayName);
        setAvatarUrl(editAvatarUrl);
        if (data.user?.email) {
          setUserEmail(data.user.email);
        }
        setSettingsSuccessMessage("Profile settings updated successfully!");
        setEditPassword("");
        setEditConfirmPassword("");
        
        setTimeout(() => {
          setSettingsModalOpen(false);
          setSettingsSuccessMessage("");
        }, 1500);
      }
    } catch (err: any) {
      setSettingsErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/messages", label: "Inbox", icon: Mail },
    { href: "/dashboard/projects", label: "Projects CRUD", icon: FolderGit },
    { href: "/dashboard/templates", label: "Templates", icon: Grid },
    { href: "/dashboard/analytics", label: "Analytics & Scrapers", icon: Activity },
    { href: "/dashboard/services", label: "Services & Quotes", icon: BadgeDollarSign },
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
                className="font-cabinet font-black text-sm tracking-widest text-darkpan-red uppercase"
              >
                SHUVO.DEV
              </m.span>
            )}
          </Link>
        </div>

        {/* User Profile Summary */}
        <div className={`p-6 border-b border-darkpan-red/10 flex items-center ${sidebarOpen ? "gap-4" : "justify-center"}`}>
          <div className="relative flex-shrink-0">
            <Image
              src={avatarUrl}
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
              className="overflow-hidden whitespace-nowrap w-full"
            >
              <h6 className="font-bold text-sm tracking-wide text-white">{displayName}</h6>
              <span className="text-[10px] text-darkpan-slate font-mono font-medium truncate block max-w-[120px]">
                {userEmail || "Administrator"}
              </span>
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
                  <span className="font-cabinet font-black text-sm tracking-widest text-darkpan-red uppercase">
                    SHUVO.DEV
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
                    src={avatarUrl}
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
                  <h6 className="font-bold text-sm tracking-wide text-white">{displayName}</h6>
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
                {latestMessages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-darkpan-red rounded-full text-[8px] font-bold flex items-center justify-center text-white border border-black animate-pulse shadow-[0_0_5px_#EB1616]">
                    {latestMessages.length}
                  </span>
                )}
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
                        <span className="text-[10px] bg-darkpan-red/15 text-darkpan-red font-mono font-bold px-2 py-0.5 rounded-full">{latestMessages.length} New</span>
                      </div>
                      <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
                        {latestMessages.length > 0 ? (
                          latestMessages.map((msg) => (
                            <Link key={msg.id} href="/dashboard/messages" onClick={() => setMessageOpen(false)} className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 text-left block">
                              <div className="relative flex-shrink-0 w-8 h-8">
                                <Image
                                  src={msg.avatarUrl}
                                  alt={msg.name}
                                  fill
                                  sizes="32px"
                                  className="rounded-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-white truncate">{msg.name}</p>
                                <p className="text-[11px] text-darkpan-slate truncate leading-relaxed">{msg.text}</p>
                                <span className="text-[9px] text-darkpan-red font-semibold font-mono mt-1 block">{msg.time}</span>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="p-6 text-center text-xs text-darkpan-slate">
                            No unread messages in your inbox.
                          </div>
                        )}
                      </div>
                      <div className="p-3 text-center border-t border-white/5 bg-black/20">
                        <Link href="/dashboard/messages" onClick={() => setMessageOpen(false)} className="text-xs text-darkpan-red font-bold hover:underline font-mono">
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
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-darkpan-red rounded-full text-[8px] font-bold flex items-center justify-center text-white border border-black animate-pulse shadow-[0_0_5px_#EB1616]">
                    {notifications.length}
                  </span>
                )}
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
                        <span className="text-[10px] text-darkpan-red font-mono font-bold">{notifications.length} New</span>
                      </div>
                      <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((item) => (
                            <Link key={item.id} href="/dashboard/messages" onClick={() => setNotificationOpen(false)} className="block p-4 hover:bg-white/5 transition-colors cursor-pointer text-left">
                              <p className="text-xs font-semibold text-white line-clamp-2 leading-relaxed">{item.title}</p>
                              <span className="text-[9px] text-darkpan-red font-semibold font-mono block mt-1">{item.time}</span>
                            </Link>
                          ))
                        ) : (
                          <div className="p-6 text-center text-xs text-darkpan-slate">
                            No unread template requests or messages.
                          </div>
                        )}
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
                  src={avatarUrl}
                  alt="Admin Portrait"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border border-darkpan-red/20"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
                  }}
                />
                <span className="text-xs font-bold tracking-wide hidden sm:inline-flex">{displayName}</span>
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
                      className="absolute right-0 mt-3 w-52 bg-darkpan-bg border border-darkpan-red/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(235,22,22,0.05)] z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/5 bg-black/40 text-left">
                        <p className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Active Session</p>
                        <p className="text-xs font-mono text-white truncate mt-0.5">{userEmail || "admin@shuvo.dev"}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <button
                          type="button"
                          onClick={() => openSettings("profile")}
                          className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs text-darkpan-slate hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-1 focus-visible:ring-offset-black focus:outline-none cursor-pointer"
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => openSettings("account")}
                          className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs text-darkpan-slate hover:text-white hover:bg-white/5 rounded-xl transition-colors font-semibold focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-1 focus-visible:ring-offset-black focus:outline-none cursor-pointer"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        <hr className="border-white/5 mx-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs text-darkpan-red hover:bg-darkpan-red/10 rounded-xl transition-colors font-bold focus-visible:ring-2 focus-visible:ring-darkpan-red focus-visible:ring-offset-1 focus-visible:ring-offset-black focus:outline-none cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Exit Dashboard
                        </button>
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

      {/* Settings Modal Component */}
      <AnimatePresence>
        {settingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-darkpan-bg border border-darkpan-red/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(235,22,22,0.1)] flex flex-col md:flex-row h-[550px] max-h-[90vh]"
            >
              {/* Left Column / Tabs */}
              <div className="w-full md:w-56 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-row md:flex-col justify-start md:justify-between items-stretch gap-2 flex-shrink-0">
                <div className="space-y-1 w-full flex flex-row md:flex-col gap-2 md:gap-1">
                  <div className="hidden md:block mb-4">
                    <h5 className="font-cabinet font-black text-sm tracking-widest text-darkpan-red uppercase">
                      Admin Settings
                    </h5>
                    <p className="text-[10px] text-darkpan-slate font-medium mt-0.5">Customize your workspace</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setActiveSettingsTab("profile")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-wider text-left w-full cursor-pointer focus:outline-none ${
                      activeSettingsTab === "profile"
                        ? "bg-darkpan-red/10 text-darkpan-red border border-darkpan-red/20"
                        : "text-darkpan-slate hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSettingsTab("account")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-wider text-left w-full cursor-pointer focus:outline-none ${
                      activeSettingsTab === "account"
                        ? "bg-darkpan-red/10 text-darkpan-red border border-darkpan-red/20"
                        : "text-darkpan-slate hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Account</span>
                  </button>
                </div>

                <div className="hidden md:block">
                  <button
                    type="button"
                    onClick={() => setSettingsModalOpen(false)}
                    className="w-full border border-white/10 hover:border-white/20 hover:bg-white/5 text-white py-2.5 rounded-xl text-xs font-bold transition-all focus:outline-none cursor-pointer"
                  >
                    Close Settings
                  </button>
                </div>
              </div>

              {/* Right Column / Tab Content Forms */}
              <form onSubmit={handleSaveSettings} className="flex-1 flex flex-col h-full bg-black/20 overflow-hidden">
                <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
                  {/* Status Banner Messages */}
                  {settingsSuccessMessage && (
                    <m.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-500 flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>{settingsSuccessMessage}</span>
                    </m.div>
                  )}
                  
                  {settingsErrorMessage && (
                    <m.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-darkpan-red/10 border border-darkpan-red/20 text-xs font-bold text-darkpan-red flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      <span>{settingsErrorMessage}</span>
                    </m.div>
                  )}

                  {activeSettingsTab === "profile" ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-cabinet font-extrabold text-lg text-white">Profile Configuration</h4>
                        <p className="text-xs text-darkpan-slate mt-0.5">Control how your personal identity renders inside the CMS dashboard.</p>
                      </div>

                      {/* Profile Photo Uploader */}
                      <div className="flex items-center gap-6 p-4 rounded-2xl bg-black/40 border border-white/5">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-darkpan-red/30 flex-shrink-0 bg-darkpan-bg flex items-center justify-center">
                          {isAvatarUploading ? (
                            <div className="flex flex-col items-center justify-center gap-1.5">
                              <span className="text-[10px] font-bold text-darkpan-red font-mono">{avatarUploadProgress}%</span>
                              <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="bg-darkpan-red h-full transition-all duration-300" style={{ width: `${avatarUploadProgress}%` }}></div>
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={editAvatarUrl || "/portrait-new.png"}
                              alt="Profile Avatar"
                              fill
                              sizes="80px"
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80";
                              }}
                            />
                          )}
                        </div>
                        
                        <div className="space-y-2 flex-1 min-w-0">
                          <label className="block text-xs font-bold text-darkpan-slate uppercase tracking-wider">Profile Avatar</label>
                          <div className="flex flex-wrap gap-2">
                            <label className="cursor-pointer border border-white/10 hover:border-darkpan-red hover:bg-darkpan-red/10 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all focus:outline-none flex items-center gap-2">
                              <span>Upload Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                                disabled={isAvatarUploading}
                              />
                            </label>
                            {editAvatarUrl && editAvatarUrl !== "/portrait-new.png" && (
                              <button
                                type="button"
                                onClick={() => setEditAvatarUrl("/portrait-new.png")}
                                className="border border-white/5 hover:border-white/10 hover:bg-white/5 text-darkpan-slate hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none"
                              >
                                Reset to Default
                              </button>
                            )}
                          </div>
                          <p className="text-[10px] text-darkpan-slate font-medium leading-relaxed">
                            Supports PNG, JPG, GIF up to 5MB. Auto-optimized to Cloudinary.
                          </p>
                        </div>
                      </div>

                      {/* Display Name Input */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-darkpan-slate uppercase tracking-wider">Display Name / Full Name</label>
                        <input
                          type="text"
                          required
                          value={editDisplayName}
                          onChange={(e) => setEditDisplayName(e.target.value)}
                          placeholder="e.g. Rakibul Shuvo"
                          className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-3 text-sm focus:outline-none text-white placeholder:text-darkpan-slate transition-colors"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-cabinet font-extrabold text-lg text-white">Security & Login Details</h4>
                        <p className="text-xs text-darkpan-slate mt-0.5">Manage administrative credentials, security parameters, and keys.</p>
                      </div>

                      {/* Email address */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-darkpan-slate uppercase tracking-wider">Admin Email address</label>
                        <input
                          type="email"
                          required
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          placeholder="admin@shuvo.dev"
                          className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-3 text-sm focus:outline-none text-white placeholder:text-darkpan-slate transition-colors"
                        />
                        <p className="text-[10px] text-darkpan-slate font-medium">
                          Note: Changing your email will require verifying the new address via confirmation email.
                        </p>
                      </div>

                      <hr className="border-white/5" />

                      {/* Passwords */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-darkpan-slate uppercase tracking-wider">New Password</label>
                          <input
                            type="password"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-3 text-sm focus:outline-none text-white placeholder:text-darkpan-slate transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-darkpan-slate uppercase tracking-wider">Confirm New Password</label>
                          <input
                            type="password"
                            value={editConfirmPassword}
                            onChange={(e) => setEditConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-3 text-sm focus:outline-none text-white placeholder:text-darkpan-slate transition-colors"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-darkpan-slate font-medium leading-relaxed">
                        Leave password fields blank if you do not wish to update your password credentials. Minimum 6 characters.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Save Area */}
                <div className="p-6 md:p-8 bg-black/40 border-t border-white/5 flex items-center justify-between flex-shrink-0">
                  <span className="text-[10px] font-mono text-darkpan-slate tracking-wide">
                    Last sync: {new Date().toLocaleTimeString()}
                  </span>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSettingsModalOpen(false)}
                      className="md:hidden border border-white/10 hover:border-white/20 hover:bg-white/5 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all focus:outline-none cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingSettings || isAvatarUploading}
                      className="bg-darkpan-red hover:bg-darkpan-red/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(235,22,22,0.2)] focus:outline-none flex items-center gap-2 cursor-pointer"
                    >
                      {isSavingSettings ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving…</span>
                        </>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}