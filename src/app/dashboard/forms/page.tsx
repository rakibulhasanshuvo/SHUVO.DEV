"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToggleLeft, HelpCircle, Lock, User, Mail, Upload, File } from "lucide-react";

export default function FormsPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Editor",
    newsletter: false,
    theme: "Dark",
    bio: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="font-cabinet font-black text-3xl tracking-tight text-white">
          Admin Forms
        </h1>
        <p className="text-darkpan-slate text-sm font-medium mt-1">
          A collection of responsive input configurations, toggles, selections, and layouts.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 1. Basic Admin Account Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl space-y-6"
        >
          <h5 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2">
            <User className="w-5 h-5 text-darkpan-red" />
            Account Management
          </h5>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs text-darkpan-slate font-bold uppercase tracking-wider block">Username</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-4 h-4 text-darkpan-slate" />
                <input
                  type="text"
                  required
                  placeholder="Enter username…"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:glow-red-sm text-white placeholder:text-darkpan-slate transition-all font-semibold"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs text-darkpan-slate font-bold uppercase tracking-wider block">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-darkpan-slate" />
                <input
                  type="email"
                  required
                  placeholder="name@shuvo.dev"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:glow-red-sm text-white placeholder:text-darkpan-slate transition-all font-semibold"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs text-darkpan-slate font-bold uppercase tracking-wider block">Security Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-darkpan-slate" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:glow-red-sm text-white placeholder:text-darkpan-slate transition-all font-semibold"
                />
              </div>
            </div>

            {/* Select Input (Role) */}
            <div className="space-y-1.5">
              <label className="text-xs text-darkpan-slate font-bold uppercase tracking-wider block">Administrative Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:glow-red-sm text-white transition-all font-semibold cursor-pointer"
              >
                <option value="Admin">Administrator</option>
                <option value="Editor">Content Editor</option>
                <option value="Viewer">Viewer Only</option>
              </select>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-[10px] text-darkpan-slate font-medium">Please review details before submit.</span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-darkpan-red hover:bg-darkpan-red/90 text-white font-bold text-xs shadow-[0_0_12px_rgba(235,22,22,0.3)] transition-colors cursor-pointer"
              >
                {submitted ? "Submitted Successfully!" : "Submit Profile"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* 2. Advanced Controls & Upload Toggles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <h5 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2">
              <ToggleLeft className="w-5 h-5 text-darkpan-red" />
              Advanced Controls
            </h5>

            {/* Checklist newsletter toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-black border border-white/5">
              <div>
                <h6 className="text-xs font-bold text-white">Newsletter Subscription</h6>
                <p className="text-[10px] text-darkpan-slate font-medium mt-0.5">Receive system update audits and deployment checks.</p>
              </div>
              <button
                onClick={() => setFormData({ ...formData, newsletter: !formData.newsletter })}
                className={`w-10 h-6 rounded-full flex items-center p-0.5 cursor-pointer transition-colors ${
                  formData.newsletter ? "bg-darkpan-red" : "bg-white/10"
                }`}
              >
                <motion.div
                  layout
                  className="w-5 h-5 rounded-full bg-white shadow-md"
                  animate={{ x: formData.newsletter ? 16 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Custom Radios (Theme) */}
            <div className="space-y-2">
              <label className="text-xs text-darkpan-slate font-bold uppercase tracking-wider block">Dashboard Active Theme</label>
              <div className="grid grid-cols-2 gap-4">
                {["Dark", "Light"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, theme: t })}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      formData.theme === t
                        ? "bg-darkpan-red/15 border-darkpan-red text-white shadow-[inset_0_0_10px_rgba(235,22,22,0.1)]"
                        : "bg-black border-white/5 text-darkpan-slate hover:text-white"
                    }`}
                  >
                    {t} Theme
                  </button>
                ))}
              </div>
            </div>

            {/* Custom drag-drop upload style mock */}
            <div className="space-y-1.5">
              <label className="text-xs text-darkpan-slate font-bold uppercase tracking-wider block">Attachment Upload</label>
              <div className="border-2 border-dashed border-white/10 hover:border-darkpan-red/30 rounded-2xl p-6 text-center cursor-pointer bg-black/40 hover:bg-black/80 transition-all flex flex-col items-center justify-center space-y-2 group">
                <div className="w-10 h-10 rounded-xl bg-darkpan-red/10 border border-darkpan-red/20 flex items-center justify-center text-darkpan-red group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Drag & drop files here</p>
                  <p className="text-[10px] text-darkpan-slate mt-0.5">Supports JPG, PNG, WebM up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
