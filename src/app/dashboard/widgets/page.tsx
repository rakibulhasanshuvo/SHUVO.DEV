"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  CloudSun,
  HardDrive,
  PenTool,
  Save,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function WidgetsPage() {
  // Notepad widget state
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem("darkpan_scratch_note");
    if (savedNote) setNote(savedNote);
  }, []);

  const handleSaveNote = () => {
    localStorage.setItem("darkpan_scratch_note", note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  // Weather Widget states
  const [temp, setTemp] = useState(28);

  // Live system diagnostic stats mock
  const [cpu, setCpu] = useState(42);
  const [ram, setRam] = useState(65);
  const [disk, setDisk] = useState(58);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu((prev) => Math.max(15, Math.min(95, prev + Math.floor(Math.random() * 11) - 5)));
      setRam((prev) => Math.max(50, Math.min(85, prev + Math.floor(Math.random() * 5) - 2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="font-cabinet font-black text-3xl tracking-tight text-white">
          Admin Widgets
        </h1>
        <p className="text-darkpan-slate text-sm font-medium mt-1">
          A showcase of modular, interactive UI components and live diagnostics utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Live System Diagnostics (CPU, RAM, Disk) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl space-y-6"
        >
          <h5 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2">
            <Cpu className="w-5 h-5 text-darkpan-red" />
            System Diagnostics
          </h5>

          <div className="space-y-4">
            {/* CPU */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">CPU Usage</span>
                <span className="text-darkpan-red font-bold">{cpu}%</span>
              </div>
              <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                  className="h-full bg-darkpan-red glow-red-sm"
                  animate={{ width: `${cpu}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                />
              </div>
            </div>

            {/* RAM */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">RAM Allocation</span>
                <span className="text-white font-bold">{ram}%</span>
              </div>
              <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                  className="h-full bg-white"
                  animate={{ width: `${ram}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                />
              </div>
            </div>

            {/* Storage */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">NVMe RAID Storage</span>
                <span className="text-darkpan-slate font-bold">{disk}%</span>
              </div>
              <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                  className="h-full bg-darkpan-slate"
                  animate={{ width: `${disk}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-darkpan-slate font-bold uppercase tracking-wider">
            <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
              <span className="block text-white text-xs mb-0.5">3.2 GHz</span>
              Freq
            </div>
            <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
              <span className="block text-white text-xs mb-0.5">32 GB</span>
              Total
            </div>
            <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
              <span className="block text-white text-xs mb-0.5">2.0 TB</span>
              Disk
            </div>
          </div>
        </motion.div>

        {/* 2. Admin Scratchpad Notepad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex flex-col h-full space-y-4"
        >
          <div className="flex justify-between items-center">
            <h5 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2">
              <PenTool className="w-5 h-5 text-darkpan-red" />
              Developer Scratchpad
            </h5>
            <button
              onClick={handleSaveNote}
              className="px-3 py-1.5 rounded-xl bg-darkpan-red hover:bg-darkpan-red/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(235,22,22,0.2)] transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              {noteSaved ? "Saved!" : "Save Note"}
            </button>
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write notes, clipboard blocks, or rapid ideas here. Automatically persists inside your local storage!"
            className="flex-1 bg-black border border-white/10 focus:border-darkpan-red/40 rounded-2xl p-4 text-xs focus:outline-none transition-all placeholder:text-darkpan-slate text-white leading-relaxed resize-none min-h-[140px]"
          />
        </motion.div>

        {/* 3. Glowing Weather Panel Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex items-center justify-between overflow-hidden relative group"
        >
          <div className="space-y-4 relative z-10">
            <div>
              <p className="text-xs uppercase tracking-wider font-extrabold text-darkpan-slate">Weather Panel</p>
              <h4 className="font-cabinet font-black text-xl tracking-wide text-white mt-1">Dhaka, Bangladesh</h4>
            </div>
            <div className="flex items-baseline gap-1">
              <h2 className="font-cabinet font-black text-4xl tracking-tight text-white">{temp}°C</h2>
              <span className="text-xs text-darkpan-slate font-bold">Mostly Sunny</span>
            </div>
            <div className="flex gap-4 text-[10px] text-darkpan-slate font-bold">
              <span>Wind: 12 km/h</span>
              <span>Humidity: 65%</span>
            </div>
          </div>

          <div className="relative flex-shrink-0 flex items-center justify-center w-24 h-24">
            {/* Glowing red accent ring */}
            <div className="absolute inset-0 bg-darkpan-red/10 rounded-full blur-xl group-hover:bg-darkpan-red/15 transition-colors" />
            <CloudSun className="w-16 h-16 text-darkpan-red relative z-10 drop-shadow-[0_0_15px_rgba(235,22,22,0.3)] animate-bounce" style={{ animationDuration: "3s" }} />
          </div>
        </motion.div>

        {/* 4. Project Server Status Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex items-center justify-between"
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider font-extrabold text-darkpan-slate">Database Status</p>
              <h4 className="font-cabinet font-black text-xl tracking-wide text-white mt-1">Supabase Edge Core</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs text-white font-bold">Operational (99.9% uptime)</span>
            </div>
            <div className="text-[10px] text-darkpan-slate font-bold">
              Active Connections: 18 Nodes
            </div>
          </div>

          <div className="w-20 h-20 bg-black rounded-2xl border border-white/5 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <Database className="w-10 h-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
