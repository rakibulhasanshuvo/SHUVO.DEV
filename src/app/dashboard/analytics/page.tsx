"use client";

import React, { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Activity,
  Play,
  RotateCw,
  Terminal,
  Cpu,
  Database,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Zap,
  Globe,
  Radio,
  X,
  CheckCircle,
  FileCode
} from "lucide-react";

interface ScraperBot {
  id: string;
  name: string;
  targetMarket: string;
  status: "idle" | "running" | "error" | "halted";
  speedMs: number;
  cpu: number;
  memoryMb: number;
  successRate: number;
  lastCrawled: string;
}

const DEFAULT_BOTS: ScraperBot[] = [
  { id: "bot-1", name: "Alpha Scraper", targetMarket: "Chaldal Grocery", status: "idle", speedMs: 450, cpu: 12, memoryMb: 118, successRate: 99.8, lastCrawled: "12 seconds ago" },
  { id: "bot-2", name: "Beta Crawler", targetMarket: "Daraz Tech", status: "idle", speedMs: 950, cpu: 5, memoryMb: 89, successRate: 98.4, lastCrawled: "2 mins ago" },
  { id: "bot-3", name: "Gamma Spider", targetMarket: "Shwapno Outlet", status: "error", speedMs: 600, cpu: 0, memoryMb: 0, successRate: 85.1, lastCrawled: "24 mins ago" },
  { id: "bot-4", name: "Delta Scrape", targetMarket: "Mehena Outlet", status: "idle", speedMs: 320, cpu: 22, memoryMb: 184, successRate: 99.9, lastCrawled: "Just now" },
  { id: "bot-5", name: "Epsilon Bot", targetMarket: "PriyoShop Tech", status: "halted", speedMs: 800, cpu: 0, memoryMb: 45, successRate: 95.0, lastCrawled: "1 hour ago" },
];

const STREAMING_LOG_TEMPLATES = [
  "Initializing docker crawler swarm configuration...",
  "Acquiring fresh rotating proxy credentials...",
  "[PROXY] Connected to node proxy-sea-09.socks5.net",
  "[CRAWLER-01] Dispatching GET request to target: Chaldal.com/fresh-produce",
  "[CRAWLER-02] Dispatching GET request to target: Daraz.com.bd/deals-of-the-day",
  "[HTTP] Response resolved. Status code: 200 OK (Latency: 280ms)",
  "[HTML-PARSER] Initializing cheerio HTML node selector compile phase...",
  "[CRAWLER-01] Extracted 48 active item cards, compiling pricing models...",
  "[DATAPREP] Standardizing pricing schema (Currency: BDT, VAT: Included)",
  "[PIPELINE] Evaluating price drops. Found 3 items drops > 15%!",
  "[SUPABASE] Bulk upserting 148 standardized product rows to 'shop_pricing_telemetry'...",
  "[TINYBIRD] Triggering custom analytics webhook. Event: 'crawlers_batch_upload'",
  "[SUCCESS] Analytics sync acknowledged (201 Created). Datapoints committed: 148",
  "Scraper swarm execution pipeline finished synchronously in 1.48 seconds."
];

export default function AnalyticsPage() {
  const [bots, setBots] = useState<ScraperBot[]>([]);
  const [isCrawlActive, setIsCrawlActive] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "errors">("all");
  const [webhookInput, setWebhookInput] = useState(`{\n  "event": "crawlers_batch_upload",\n  "shop_count": 5,\n  "payload_size_kb": 142.4,\n  "node_origin": "docker-swarm-ams"\n}`);
  const [webhookSuccess, setWebhookSuccess] = useState(false);
  const [webhookSending, setWebhookSending] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Load bots state
  useEffect(() => {
    const cached = localStorage.getItem("darkpan_bots");
    if (cached) {
      try {
        setBots(JSON.parse(cached));
      } catch (e) {
        console.error(e);
        setBots(DEFAULT_BOTS);
      }
    } else {
      setBots(DEFAULT_BOTS);
      localStorage.setItem("darkpan_bots", JSON.stringify(DEFAULT_BOTS));
    }
  }, []);

  const saveBots = (updated: ScraperBot[]) => {
    setBots(updated);
    localStorage.setItem("darkpan_bots", JSON.stringify(updated));
  };

  // Autoscroll terminal
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  // Run Scraper Swarm Simulation
  const handleTriggerScraper = () => {
    if (isCrawlActive) return;

    setIsCrawlActive(true);
    setConsoleLogs([]);

    // Set bots to running state
    const runningBots = bots.map((b) =>
      b.status === "idle" || b.status === "running"
        ? { ...b, status: "running" as const, cpu: Math.floor(Math.random() * 25) + 30, memoryMb: b.memoryMb + Math.floor(Math.random() * 20) }
        : b
    );
    setBots(runningBots);

    let currentLogIndex = 0;
    
    const logInterval = setInterval(() => {
      if (currentLogIndex < STREAMING_LOG_TEMPLATES.length) {
        const timeStamp = new Date().toLocaleTimeString();
        setConsoleLogs((prev) => [...prev, `[${timeStamp}] ${STREAMING_LOG_TEMPLATES[currentLogIndex]}`]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setIsCrawlActive(false);

        // Reset bots state to idle
        const idleBots = runningBots.map((b) =>
          b.status === "running"
            ? { ...b, status: "idle" as const, cpu: 0, lastCrawled: "Just now" }
            : b
        );
        setBots(idleBots);
        saveBots(idleBots);
      }
    }, 450);
  };

  // Simulate Tinybird webhook event dispatch
  const handleDispatchWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (webhookSending) return;

    setWebhookSending(true);
    setWebhookSuccess(false);

    setTimeout(() => {
      setWebhookSending(false);
      setWebhookSuccess(true);
    }, 1200);
  };

  // Tab calculations
  const filteredBots = bots.filter((bot) => {
    if (activeTab === "active") return bot.status === "running" || bot.status === "idle";
    if (activeTab === "errors") return bot.status === "error";
    return true;
  });

  return (
    <div className="space-y-6 pb-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cabinet font-black text-3xl tracking-tight text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-darkpan-red shadow-[0_0_15px_rgba(235,22,22,0.4)]" />
            Scraper Bot Telemetry
          </h1>
          <p className="text-darkpan-slate text-sm font-medium mt-1">
            Real-time server load gauges, Tinybird pipeline execution webhook logs, and crawler health diagnostics.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleTriggerScraper}
            disabled={isCrawlActive}
            className="px-4 py-2.5 rounded-xl bg-darkpan-red hover:bg-red-700 disabled:bg-white/10 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(235,22,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className={`w-4 h-4 ${isCrawlActive ? "animate-spin" : ""}`} />
            Trigger Scraper Swarm
          </button>
        </div>
      </div>

      {/* Grid of Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Swarm Nodes Online", value: "12 / 12", sub: "100% capacity", icon: Globe, color: "text-emerald-500" },
          { label: "Active Containers", value: bots.filter(b => b.status === "running").length, sub: "Docker isolated containers", icon: Cpu, color: "text-darkpan-red" },
          { label: "API Webhook Sync", value: "Tinybird.co", sub: "Latency < 45ms", icon: Radio, color: "text-blue-500" },
          { label: "Aggregated Records", value: "348,290", sub: "Persisted in Supabase", icon: Database, color: "text-pink-500" }
        ].map((gauge, i) => {
          const Icon = gauge.icon;
          return (
            <m.div
              key={gauge.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-5 flex items-center justify-between shadow-2xl hover:border-darkpan-red/30 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="space-y-1.5 z-10">
                <p className="text-[10px] uppercase tracking-wider font-extrabold text-darkpan-slate">{gauge.label}</p>
                <h3 className="font-cabinet font-black text-2xl tracking-tight text-white">{gauge.value}</h3>
                <span className="text-[10px] font-bold text-darkpan-slate block">{gauge.sub}</span>
              </div>
              <div className={`w-12 h-12 bg-black rounded-xl border border-white/5 flex items-center justify-center ${gauge.color} shadow-lg transition-transform group-hover:scale-105 duration-300`}>
                <Icon className="w-5 h-5" />
              </div>
            </m.div>
          );
        })}
      </div>

      {/* Main split sections: Left (Active Bots), Right (Terminal & Webhook) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Bots list (5 cols) */}
        <div className="lg:col-span-5 bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 flex flex-col space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h4 className="font-cabinet font-extrabold text-base tracking-tight text-white">
              Amolnama Scraper Grid
            </h4>
            
            {/* Tiny tab switcher */}
            <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5">
              {(["all", "active", "errors"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "text-darkpan-red bg-darkpan-red/15"
                      : "text-darkpan-slate hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Bots loop */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {filteredBots.map((bot) => (
              <div
                key={bot.id}
                className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-3 relative group overflow-hidden"
              >
                {/* Bot name and status pill */}
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h6 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className={`w-3.5 h-3.5 ${bot.status === "running" ? "text-darkpan-red animate-pulse" : "text-darkpan-slate"}`} />
                      {bot.name}
                    </h6>
                    <p className="text-[10px] text-darkpan-slate font-medium">Target: {bot.targetMarket}</p>
                  </div>
                  
                  <span className={`text-[8px] uppercase tracking-widest font-black px-2 py-0.5 rounded border ${
                    bot.status === "running"
                      ? "bg-darkpan-red/10 border-darkpan-red/20 text-darkpan-red animate-pulse"
                      : bot.status === "idle"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : bot.status === "error"
                      ? "bg-red-500/10 border-red-500/20 text-red-500"
                      : "bg-white/5 border-white/10 text-darkpan-slate"
                  }`}>
                    {bot.status}
                  </span>
                </div>

                {/* Bot speed and details */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-darkpan-slate">
                  <div className="bg-black/20 p-1.5 rounded border border-white/5">
                    <p className="text-[8px] uppercase font-bold text-darkpan-slate">Speed</p>
                    <p className="text-white mt-0.5">{bot.speedMs}ms</p>
                  </div>
                  <div className="bg-black/20 p-1.5 rounded border border-white/5">
                    <p className="text-[8px] uppercase font-bold text-darkpan-slate">CPU</p>
                    <p className="text-white mt-0.5">{bot.cpu}%</p>
                  </div>
                  <div className="bg-black/20 p-1.5 rounded border border-white/5">
                    <p className="text-[8px] uppercase font-bold text-darkpan-slate">Success</p>
                    <p className="text-emerald-400 mt-0.5">{bot.successRate}%</p>
                  </div>
                </div>

                {/* Last crawled timestamp */}
                <div className="flex justify-between items-center text-[9px] text-darkpan-slate">
                  <span>RAM: {bot.memoryMb} MB</span>
                  <span>Last Run: {bot.lastCrawled}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Scraper Console & Webhook Payload (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Terminal Console */}
          <div className="bg-black border border-darkpan-red/10 rounded-2xl flex flex-col shadow-2xl h-[320px]">
            {/* Terminal bar header */}
            <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-darkpan-red" />
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-darkpan-slate font-mono">
                  Live Swarm Execution Console
                </span>
              </div>
              
              {/* Dot decoration */}
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></span>
              </div>
            </div>

            {/* Terminal output */}
            <div className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-1.5 bg-[#0a0a0c] text-emerald-400 select-text">
              {consoleLogs.length === 0 ? (
                <div className="text-darkpan-slate text-center py-20 flex flex-col items-center gap-2">
                  <Terminal className="w-8 h-8 opacity-10" />
                  <p>Console idle. Click 'Trigger Scraper Swarm' to initiate bot cluster run.</p>
                </div>
              ) : (
                consoleLogs.map((log, index) => (
                  <div
                    key={index}
                    className={
                      log.includes("[SUCCESS]")
                        ? "text-emerald-300 font-bold"
                        : log.includes("[HTTP]")
                        ? "text-blue-400"
                        : log.includes("[PROXY]")
                        ? "text-purple-400"
                        : log.includes("[CRAWLER")
                        ? "text-amber-400"
                        : "text-emerald-400/80"
                    }
                  >
                    {log}
                  </div>
                ))
              )}
              <div ref={consoleEndRef} />
            </div>
          </div>

          {/* Webhook API Dispatcher */}
          <div className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-cabinet font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-darkpan-red" />
                Tinybird Event API Webhook Sandbox
              </h4>
              <span className="text-[10px] text-darkpan-slate font-mono">POST /v1/events</span>
            </div>

            {webhookSuccess ? (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-3"
              >
                <CheckCircle className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-white">API Event Dispatched Successfully!</p>
                  <p className="text-[10px] text-emerald-400/70 font-medium mt-0.5">Response code: 202 Accepted. Telemetry payload committed to Tinybird datasource.</p>
                  <button
                    onClick={() => setWebhookSuccess(false)}
                    className="text-[10px] text-darkpan-red hover:underline mt-2 cursor-pointer font-bold block"
                  >
                    Reset Sandbox Trigger
                  </button>
                </div>
              </m.div>
            ) : (
              <form onSubmit={handleDispatchWebhook} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Payload Body (JSON)</label>
                  <textarea
                    rows={4}
                    value={webhookInput}
                    onChange={(e) => setWebhookInput(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-darkpan-slate focus:border-darkpan-red/40 focus:outline-none transition-all font-mono resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={webhookSending}
                    className="px-4 py-2.5 rounded-xl bg-darkpan-red text-white hover:bg-red-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(235,22,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {webhookSending ? (
                      <>
                        <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        POSTing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        Trigger Webhook Event
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
