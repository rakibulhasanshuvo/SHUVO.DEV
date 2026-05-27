"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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

export default function AnalyticsPage() {
  const [bots, setBots] = useState<ScraperBot[]>([]);
  const [isCrawlActive, setIsCrawlActive] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "errors">("all");
  const [webhookInput, setWebhookInput] = useState(`{\n  "event": "crawlers_batch_upload",\n  "shop_count": 5,\n  "payload_size_kb": 142.4,\n  "node_origin": "docker-swarm-ams"\n}`);
  const [webhookSuccess, setWebhookSuccess] = useState(false);
  const [webhookSending, setWebhookSending] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [latestResponse, setLatestResponse] = useState<any>(null);
  const [dispatches, setDispatches] = useState<any[]>([]);
  const [crawlProgress, setCrawlProgress] = useState(0);
  const [totalRecords, setTotalRecords] = useState(348290);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Load bots + persisted record count
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

    const savedRecords = localStorage.getItem("darkpan_records");
    if (savedRecords) setTotalRecords(parseInt(savedRecords, 10) || 348290);
  }, []);

  const saveBots = useCallback((updated: ScraperBot[]) => {
    setBots(updated);
    localStorage.setItem("darkpan_bots", JSON.stringify(updated));
  }, []);

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
    setCrawlProgress(0);

    // Set bots to running state
    const runningBots = bots.map((b) =>
      b.status === "idle" || b.status === "running"
        ? { ...b, status: "running" as const, cpu: Math.floor(Math.random() * 25) + 30, memoryMb: b.memoryMb + Math.floor(Math.random() * 20) }
        : b
    );
    saveBots(runningBots);

    // Generate high-fidelity dynamic logs based on current bot profiles
    const dynamicLogs: string[] = [
      "Initializing docker crawler swarm configuration...",
      "Acquiring fresh rotating proxy credentials...",
    ];

    runningBots.forEach((bot) => {
      if (bot.status === "running") {
        const node = `proxy-${bot.name.toLowerCase().replace(/\s+/g, "-")}-${Math.floor(Math.random() * 89 + 10)}.socks5.net`;
        dynamicLogs.push(`[PROXY] Registered container node on ${node}`);
      }
    });

    runningBots.forEach((bot) => {
      if (bot.status === "running") {
        dynamicLogs.push(`[${bot.name.toUpperCase()}] Dispatching GET request to target: ${bot.targetMarket}`);
      } else if (bot.status === "error") {
        dynamicLogs.push(`[${bot.name.toUpperCase()}] [HALTED] Connection pool exhausted for target: ${bot.targetMarket}`);
      }
    });

    runningBots.forEach((bot) => {
      if (bot.status === "running") {
        const latency = bot.speedMs + Math.floor(Math.random() * 60 - 30);
        dynamicLogs.push(`[HTTP] ${bot.name} resolved. Status: 200 OK (Latency: ${latency}ms)`);
      } else if (bot.status === "error") {
        dynamicLogs.push(`[HTTP] ${bot.name} connection failed: 504 Gateway Timeout (Attempt 3/3)`);
      }
    });

    let batchTotal = 0;
    runningBots.forEach((bot) => {
      if (bot.status === "running") {
        dynamicLogs.push(`[HTML-PARSER] ${bot.name} compiling cheerio JSDOM selectors...`);
        const items = Math.floor(Math.random() * 60) + 40;
        batchTotal += items;
        dynamicLogs.push(`[${bot.name.toUpperCase()}] Extracted ${items} pricing cards, standardizing pricing schema...`);
        const drops = Math.floor(Math.random() * 4);
        if (drops > 0) {
          dynamicLogs.push(`[PIPELINE] ${bot.name} detected ${drops} pricing anomalies (> 15% discount)!`);
        }
        dynamicLogs.push(`[SUPABASE] Bulk upserting ${items} rows into 'shop_pricing_telemetry' ledger...`);
      }
    });

    dynamicLogs.push("[TINYBIRD] Dispatching clickstream telemetry payload event to event gateway...");
    dynamicLogs.push(`[SUCCESS] Tinybird batch sync accepted (201 Created). ${batchTotal} datapoints committed.`);
    dynamicLogs.push(`Scraper swarm execution pipeline finished synchronously in ${(Math.random() * 0.5 + 1.1).toFixed(2)} seconds.`);

    let currentLogIndex = 0;
    const totalLogs = dynamicLogs.length;

    const logInterval = setInterval(() => {
      if (currentLogIndex < totalLogs) {
        const timeStamp = new Date().toLocaleTimeString();
        setConsoleLogs((prev) => [...prev, `[${timeStamp}] ${dynamicLogs[currentLogIndex]}`]);
        setCrawlProgress(Math.round(((currentLogIndex + 1) / totalLogs) * 100));
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setCrawlProgress(100);

        // Increment total records counter
        setTotalRecords((prev) => {
          const next = prev + batchTotal;
          localStorage.setItem("darkpan_records", String(next));
          return next;
        });

        // Brief delay before resetting to idle for smooth UX
        setTimeout(() => {
          setIsCrawlActive(false);
          setCrawlProgress(0);

          const idleBots = runningBots.map((b) =>
            b.status === "running"
              ? { ...b, status: "idle" as const, cpu: 0, lastCrawled: "Just now" }
              : b
          );
          saveBots(idleBots);
        }, 600);
      }
    }, 350);
  };

  // Simulate Tinybird webhook event dispatch
  const handleDispatchWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (webhookSending) return;

    setJsonError(null);
    setWebhookSuccess(false);

    let parsedPayload: any = null;
    try {
      parsedPayload = JSON.parse(webhookInput);
      if (typeof parsedPayload !== "object" || parsedPayload === null) {
        throw new Error("Payload must be a valid JSON object.");
      }
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON syntax. Please verify keys and commas.");
      return;
    }

    setWebhookSending(true);

    setTimeout(() => {
      const transactionId = "evt_" + Math.random().toString(36).substring(2, 12);
      const latency = Math.floor(Math.random() * 25) + 12;
      const responseObj = {
        status: "accepted",
        id: transactionId,
        timestamp: new Date().toISOString(),
        rows_imported: parsedPayload.shop_count || 1,
        payload: parsedPayload
      };

      setLatestResponse({
        statusCode: 202,
        statusText: "Accepted",
        latencyMs: latency,
        headers: {
          "content-type": "application/json",
          "x-tinybird-ratelimit-remaining": "999",
          "x-tinybird-transaction-id": transactionId
        },
        body: responseObj
      });

      setWebhookSending(false);
      setWebhookSuccess(true);

      setDispatches((prev) => [
        {
          id: transactionId,
          timestamp: new Date().toLocaleTimeString(),
          event: parsedPayload.event || "unknown_event",
          status: 202,
          latencyMs: latency,
          origin: parsedPayload.node_origin || "unknown_node"
        },
        ...prev
      ].slice(0, 5));
    }, 1200);
  };

  // Classify log line color by tag
  const getLogColor = (log: string): string => {
    if (log.includes("[SUCCESS]")) return "text-emerald-300 font-bold";
    if (log.includes("[HTTP]") && log.includes("failed")) return "text-red-400";
    if (log.includes("[HTTP]")) return "text-blue-400";
    if (log.includes("[PROXY]")) return "text-purple-400";
    if (log.includes("[HALTED]")) return "text-red-500 font-bold";
    if (log.includes("[PIPELINE]")) return "text-amber-300";
    if (log.includes("[SUPABASE]")) return "text-cyan-400";
    if (log.includes("[TINYBIRD]")) return "text-pink-400";
    if (log.includes("[HTML-PARSER]")) return "text-indigo-400";
    if (log.includes("Extracted")) return "text-yellow-400";
    if (log.includes("Dispatching GET")) return "text-amber-400";
    if (log.includes("finished")) return "text-emerald-400 font-bold";
    return "text-emerald-400/80";
  };

  // Tab calculations — errors tab now catches both "error" and "halted"
  const filteredBots = bots.filter((bot) => {
    if (activeTab === "active") return bot.status === "running" || bot.status === "idle";
    if (activeTab === "errors") return bot.status === "error" || bot.status === "halted";
    return true;
  });

  const runningCount = bots.filter(b => b.status === "running").length;
  const healthyNodes = bots.filter(b => b.status !== "error").length;

  return (
    <div className="space-y-6 pb-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cabinet font-black text-3xl tracking-tight text-white flex items-center gap-3">
            <Activity className="w-8 h-8 text-darkpan-red shadow-[0_0_15px_rgba(235,22,22,0.4)]" />
            Scraper Bot Telemetry
            <AnimatePresence>
              {isCrawlActive && (
                <m.span
                  initial={{ opacity: 0, scale: 0, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: "auto" }}
                  exit={{ opacity: 0, scale: 0, width: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-darkpan-red/15 border border-darkpan-red/30 overflow-hidden"
                >
                  <span className="w-2 h-2 rounded-full bg-darkpan-red animate-pulse" />
                  <span className="text-[10px] font-bold text-darkpan-red uppercase tracking-wider whitespace-nowrap">Live</span>
                </m.span>
              )}
            </AnimatePresence>
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
            {isCrawlActive ? "Swarm Running..." : "Trigger Scraper Swarm"}
          </button>
        </div>
      </div>

      {/* Grid of Gauges — values now react to live state */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Swarm Nodes Online", value: `${healthyNodes} / ${bots.length || 5}`, sub: `${Math.round((healthyNodes / Math.max(bots.length, 1)) * 100)}% capacity`, icon: Globe, color: "text-emerald-500" },
          { label: "Active Containers", value: runningCount, sub: runningCount > 0 ? "Docker containers active" : "All containers idle", icon: Cpu, color: "text-darkpan-red" },
          { label: "API Webhook Sync", value: "Tinybird.co", sub: `Latency < 45ms • ${dispatches.length} dispatches`, icon: Radio, color: "text-blue-500" },
          { label: "Aggregated Records", value: totalRecords.toLocaleString(), sub: "Persisted in Supabase", icon: Database, color: "text-pink-500" }
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
                  className={`text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
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

          {/* Bots loop with AnimatePresence for smooth tab transitions */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {filteredBots.map((bot, index) => (
                <m.div
                  key={bot.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.25, delay: index * 0.03, layout: { duration: 0.2 } }}
                  className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-3 relative group overflow-hidden"
                >
                  {/* Bot name and status pill */}
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <h6 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Zap className={`w-3.5 h-3.5 transition-colors duration-300 ${bot.status === "running" ? "text-darkpan-red animate-pulse" : "text-darkpan-slate"}`} />
                        {bot.name}
                      </h6>
                      <p className="text-[10px] text-darkpan-slate font-medium">Target: {bot.targetMarket}</p>
                    </div>

                    <span className={`text-[8px] uppercase tracking-widest font-black px-2 py-0.5 rounded border transition-all duration-300 ${
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
                      <p className={`mt-0.5 transition-colors duration-500 ${bot.cpu > 20 ? "text-amber-400" : "text-white"}`}>{bot.cpu}%</p>
                    </div>
                    <div className="bg-black/20 p-1.5 rounded border border-white/5">
                      <p className="text-[8px] uppercase font-bold text-darkpan-slate">Success</p>
                      <p className={`mt-0.5 ${bot.successRate >= 98 ? "text-emerald-400" : bot.successRate >= 90 ? "text-amber-400" : "text-red-400"}`}>{bot.successRate}%</p>
                    </div>
                  </div>

                  {/* Last crawled timestamp */}
                  <div className="flex justify-between items-center text-[9px] text-darkpan-slate">
                    <span>RAM: {bot.memoryMb} MB</span>
                    <span>Last Run: {bot.lastCrawled}</span>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>

            {/* Empty state when tab filter yields zero bots */}
            {filteredBots.length === 0 && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-darkpan-slate text-xs font-medium flex flex-col items-center gap-2"
              >
                <Cpu className="w-8 h-8 opacity-10" />
                No bots match this filter.
              </m.div>
            )}
          </div>
        </div>

        {/* Right Column: Scraper Console & Webhook Payload (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Terminal Console */}
          <div className="bg-black border border-darkpan-red/10 rounded-2xl flex flex-col shadow-2xl h-[320px]">
            {/* Terminal bar header */}
            <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-white/5 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-darkpan-red" />
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-darkpan-slate font-mono">
                  Live Swarm Execution Console
                </span>
                {isCrawlActive && (
                  <m.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[9px] font-mono text-darkpan-red ml-1 tabular-nums"
                  >
                    {crawlProgress}%
                  </m.span>
                )}
              </div>

              {/* Dot decoration */}
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></span>
              </div>

              {/* Animated progress bar at bottom of header */}
              <AnimatePresence>
                {isCrawlActive && (
                  <m.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-darkpan-red via-pink-500 to-amber-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${crawlProgress}%` }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Terminal output */}
            <div className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-1 bg-[#0a0a0c] text-emerald-400 select-text">
              {consoleLogs.length === 0 ? (
                <div className="text-darkpan-slate text-center py-20 flex flex-col items-center gap-2">
                  <Terminal className="w-8 h-8 opacity-10" />
                  <p>Console idle. Click &apos;Trigger Scraper Swarm&apos; to initiate bot cluster run.</p>
                </div>
              ) : (
                consoleLogs.map((log, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={getLogColor(log)}
                  >
                    {log}
                  </m.div>
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

            {/* JSON error banner with smooth enter/exit */}
            <AnimatePresence>
              {jsonError && (
                <m.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-semibold flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                    <div>
                      <p className="font-bold text-white">JSON Compile Error</p>
                      <p className="text-red-400/80 mt-0.5">{jsonError}</p>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Form ↔ Success state with smooth crossfade */}
            <AnimatePresence mode="wait">
              {webhookSuccess ? (
                <m.div
                  key="webhook-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-white">API Event Dispatched Successfully!</p>
                      <p className="text-[10px] text-emerald-400/70 font-medium mt-0.5">Response code: 202 Accepted. Telemetry payload committed to Tinybird datasource.</p>
                      <button
                        onClick={() => {
                          setWebhookSuccess(false);
                          setLatestResponse(null);
                        }}
                        className="text-[10px] text-darkpan-red hover:underline mt-2 cursor-pointer font-bold block"
                      >
                        Reset Sandbox Trigger
                      </button>
                    </div>
                  </div>

                  {/* Diagnostics Panel */}
                  {latestResponse && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                      className="bg-black/50 border border-white/5 rounded-xl p-4 space-y-3 font-mono text-[10px]"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[9px] text-darkpan-slate">
                        <span>HTTP/2 • Response Headers</span>
                        <span className="text-emerald-400">Latency: {latestResponse.latencyMs}ms</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-darkpan-slate text-[9px]">
                        <div>
                          <span className="text-white font-bold">status:</span> {latestResponse.statusCode} {latestResponse.statusText}
                        </div>
                        <div>
                          <span className="text-white font-bold">content-type:</span> {latestResponse.headers["content-type"]}
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-white font-bold">x-tinybird-transaction-id:</span> {latestResponse.headers["x-tinybird-transaction-id"]}
                        </div>
                      </div>
                      <div className="border-t border-white/5 pt-2">
                        <span className="text-[9px] text-darkpan-slate block mb-1">Response Body</span>
                        <pre className="text-emerald-400 bg-black/40 p-2.5 rounded border border-white/5 text-[9px] overflow-x-auto font-mono">
                          {JSON.stringify(latestResponse.body, null, 2)}
                        </pre>
                      </div>
                    </m.div>
                  )}
                </m.div>
              ) : (
                <m.form
                  key="webhook-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleDispatchWebhook}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Payload Body (JSON)</label>
                    <textarea
                      rows={4}
                      value={webhookInput}
                      onChange={(e) => {
                        setWebhookInput(e.target.value);
                        if (jsonError) setJsonError(null);
                      }}
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
                </m.form>
              )}
            </AnimatePresence>

            {/* Dynamic ledger section with staggered entry animation */}
            <AnimatePresence>
              {dispatches.length > 0 && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="border-t border-white/5 pt-4 space-y-2.5 overflow-hidden"
                >
                  <p className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Recent Webhook Dispatch Ledger</p>
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {dispatches.map((disp, index) => (
                      <m.div
                        key={disp.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.04 }}
                        className="bg-black/30 border border-white/5 rounded-xl p-3 flex justify-between items-center text-[10px] font-mono hover:border-white/10 transition-all"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-white font-bold">{disp.event}</span>
                          </div>
                          <p className="text-darkpan-slate text-[9px]">ID: {disp.id} • Node: {disp.origin}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px]">{disp.status} OK</span>
                          <p className="text-darkpan-slate text-[9px]">{disp.latencyMs}ms • {disp.timestamp}</p>
                        </div>
                      </m.div>
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
