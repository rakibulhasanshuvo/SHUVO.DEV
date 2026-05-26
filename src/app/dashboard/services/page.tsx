"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  BadgeDollarSign,
  Layers,
  Plus,
  Edit,
  Save,
  Trash2,
  X,
  FileSpreadsheet,
  CheckCircle,
  Clock,
  Briefcase,
  Sliders,
  DollarSign,
  TrendingUp,
  Percent
} from "lucide-react";

interface ServiceTier {
  id: string;
  name: string;
  price: number;
  timeframe: string;
  status: "active" | "inactive";
  features: string[];
  description: string;
}

interface CustomQuote {
  id: string;
  created_at: string;
  category: string;
  scale: "Small" | "Medium" | "Large" | "Enterprise";
  urgency: "Standard" | "Urgent" | "Critical";
  budgetEst: number;
  senderEmail: string;
  status: "Pending" | "Reviewed" | "Approved" | "Contacted";
  details: string;
}

const DEFAULT_TIERS: ServiceTier[] = [
  {
    id: "tier-1",
    name: "Tier 1: Core Showcase",
    price: 2500.00,
    timeframe: "2-3 weeks",
    status: "active",
    features: [
      "Static High-Fidelity UI Layout",
      "Self-Hosted Satoshi Font Clone integration",
      "Responsive Fluid Mobile design",
      "Basic contact form integrations"
    ],
    description: "Ideal for freelancers and professionals needing an ultra-slick portfolio showcase landing page with fast load times and clean SEO metrics."
  },
  {
    id: "tier-2",
    name: "Tier 2: Full-Stack Build",
    price: 6000.00,
    timeframe: "4-6 weeks",
    status: "active",
    features: [
      "Everything in Tier 1",
      "Supabase DB with CRUD interfaces",
      "Secure user auth & session middleware",
      "Dynamic project content blog engines"
    ],
    description: "A complete production-ready web application backed by stable relational database schema and administrative dashboards."
  },
  {
    id: "tier-3",
    name: "Tier 3: Cyber Interactive Showcase",
    price: 12500.00,
    timeframe: "6-8 weeks",
    status: "active",
    features: [
      "Everything in Tier 2",
      "Interactive 3D Three.js canvas stacks",
      "Autonomous docker pricing crawler swarms",
      "Tinybird analytic clickstream hook integration"
    ],
    description: "Premium enterprise experience featuring bespoke digital art animations, physics-based playgrounds, and real-time scrapers telemetry."
  }
];

const DEFAULT_QUOTES: CustomQuote[] = [
  {
    id: "quote-1",
    created_at: "2026-05-24T18:22:00+06:00",
    category: "Full Stack SaaS",
    scale: "Medium",
    urgency: "Urgent",
    budgetEst: 8500,
    senderEmail: "devops@stripe.com",
    status: "Pending",
    details: "Need a premium analytics portal connecting Stripe invoices to dynamic charts. Must feature dark-mode neon borders and Framer Motion layout switches."
  },
  {
    id: "quote-2",
    created_at: "2026-05-23T11:05:00+06:00",
    category: "Design System",
    scale: "Small",
    urgency: "Standard",
    budgetEst: 3200,
    senderEmail: "design@figma.com",
    status: "Reviewed",
    details: "Require porting our Figma UI kit into clean interactive Tailwind v4 components using self-hosted fonts."
  },
  {
    id: "quote-3",
    created_at: "2026-05-21T09:40:00+06:00",
    category: "WebGL Simulation",
    scale: "Enterprise",
    urgency: "Critical",
    budgetEst: 18000,
    senderEmail: "innovation@spacex.com",
    status: "Approved",
    details: "Orchestrate an interactive 3D physics sandbox representing satellite orbital coordinates. Custom Three.js particles and telemetry logs required."
  }
];

export default function ServicesPage() {
  const [tiers, setTiers] = useState<ServiceTier[]>([]);
  const [quotes, setQuotes] = useState<CustomQuote[]>([]);
  
  // Drawer states
  const [isTierDrawerOpen, setIsTierDrawerOpen] = useState(false);
  const [activeTier, setActiveTier] = useState<ServiceTier | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeQuote, setActiveQuote] = useState<CustomQuote | null>(null);

  // Tier form states
  const [tierName, setTierName] = useState("");
  const [tierPrice, setTierPrice] = useState(0);
  const [tierTimeframe, setTimeframe] = useState("");
  const [tierStatus, setTierStatus] = useState<"active" | "inactive">("active");
  const [tierFeatures, setTierFeatures] = useState("");
  const [tierDesc, setTierDesc] = useState("");
  const [tierError, setTierError] = useState("");

  // Load state from localStorage & Supabase
  useEffect(() => {
    const syncDashboardData = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        // 1. Fetch Dynamic Service Tiers if table exists
        const { data: dbTiers, error: tierError } = await supabase
          .from("service_tiers")
          .select("*")
          .order("created_at", { ascending: true });

        if (dbTiers && dbTiers.length > 0 && !tierError) {
          setTiers(dbTiers.map((t: any) => ({
            id: t.id,
            name: t.name,
            price: Number(t.price) || 0,
            timeframe: t.timeframe,
            status: t.status as "active" | "inactive",
            features: t.features || [],
            description: t.description
          })));
        } else {
          const cached = localStorage.getItem("darkpan_tiers");
          setTiers(cached ? JSON.parse(cached) : DEFAULT_TIERS);
        }

        // 2. Query Live Quotes from the Contact Leads Table
        const { data: dbLeads, error: leadError } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (dbLeads && !leadError) {
          const mappedQuotes: CustomQuote[] = dbLeads.map((lead: any) => {
            const budget = lead.estimated_budget || 0;
            let calculatedScale: CustomQuote["scale"] = "Medium";
            if (budget > 10000) calculatedScale = "Enterprise";
            else if (budget > 5000) calculatedScale = "Large";
            else if (budget < 2500) calculatedScale = "Small";

            let quoteStatus: CustomQuote["status"] = "Pending";
            if (lead.status === "contacted") quoteStatus = "Contacted";
            else if (lead.status === "negotiating") quoteStatus = "Reviewed";
            else if (lead.status === "archived") quoteStatus = "Approved";

            return {
              id: lead.id,
              created_at: lead.created_at,
              category: lead.subject && lead.subject !== "Direct Contact Form Submission" ? lead.subject : (lead.service_tier === "premium" ? "High-End Experience" : lead.service_tier === "fullstack" ? "Full-Stack Integration" : "Core UI Showcase"),
              scale: calculatedScale,
              urgency: lead.subject && lead.subject.includes("Urgent") ? "Urgent" : "Standard",
              budgetEst: budget,
              senderEmail: lead.email,
              status: quoteStatus,
              details: lead.message || "No additional brief details supplied."
            };
          });
          setQuotes(mappedQuotes);
        } else {
          const cached = localStorage.getItem("darkpan_quotes");
          setQuotes(cached ? JSON.parse(cached) : DEFAULT_QUOTES);
        }
      } catch (err) {
        console.warn("Supabase Configurator Sync bypassed, running cache loops:", err);
        const cachedTiers = localStorage.getItem("darkpan_tiers");
        const cachedQuotes = localStorage.getItem("darkpan_quotes");
        setTiers(cachedTiers ? JSON.parse(cachedTiers) : DEFAULT_TIERS);
        setQuotes(cachedQuotes ? JSON.parse(cachedQuotes) : DEFAULT_QUOTES);
      }
    };

    syncDashboardData();
  }, []);

  const saveTiers = async (updated: ServiceTier[]) => {
    setTiers(updated);
    localStorage.setItem("darkpan_tiers", JSON.stringify(updated));

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      for (const tier of updated) {
        await supabase
          .from("service_tiers")
          .upsert({
            id: tier.id,
            name: tier.name,
            price: tier.price,
            timeframe: tier.timeframe,
            status: tier.status,
            features: tier.features,
            description: tier.description
          });
      }
    } catch (err) {
      // Bypassed if table does not exist
    }
  };

  const saveQuotes = (updated: CustomQuote[]) => {
    setQuotes(updated);
    localStorage.setItem("darkpan_quotes", JSON.stringify(updated));
  };

  // Tier CRUD actions
  const handleOpenCreateTier = () => {
    setActiveTier(null);
    setTierName("");
    setTierPrice(3000);
    setTimeframe("3-4 weeks");
    setTierStatus("active");
    setTierFeatures("");
    setTierDesc("");
    setTierError("");
    setIsTierDrawerOpen(true);
  };

  const handleOpenEditTier = (tier: ServiceTier) => {
    setActiveTier(tier);
    setTierName(tier.name);
    setTierPrice(tier.price);
    setTimeframe(tier.timeframe);
    setTierStatus(tier.status);
    setTierFeatures(tier.features.join("\n"));
    setTierDesc(tier.description);
    setTierError("");
    setIsTierDrawerOpen(true);
  };

  const handleDeleteTier = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this service pricing tier?")) {
      const updated = tiers.filter((t) => t.id !== id);
      await saveTiers(updated);

      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        await supabase
          .from("service_tiers")
          .delete()
          .eq("id", id);
      } catch (err) {
        // Bypassed if table does not exist
      }
    }
  };

  const handleSaveTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tierName.trim() || !tierDesc.trim()) {
      setTierError("Tier name and short description are required.");
      return;
    }

    const featureList = tierFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    let updated: ServiceTier[];

    if (activeTier) {
      updated = tiers.map((t) =>
        t.id === activeTier.id
          ? {
              ...t,
              name: tierName.trim(),
              price: Number(tierPrice) || 0,
              timeframe: tierTimeframe.trim() || "2 weeks",
              status: tierStatus,
              features: featureList,
              description: tierDesc.trim(),
            }
          : t
      );
    } else {
      const newTier: ServiceTier = {
        id: `tier-${Date.now()}`,
        name: tierName.trim(),
        price: Number(tierPrice) || 0,
        timeframe: tierTimeframe.trim() || "2 weeks",
        status: tierStatus,
        features: featureList,
        description: tierDesc.trim(),
      };
      updated = [...tiers, newTier];
    }

    saveTiers(updated);
    setIsTierDrawerOpen(false);
  };

  // Quote Action updates
  const handleOpenQuoteModal = (quote: CustomQuote) => {
    setActiveQuote(quote);
    setIsQuoteModalOpen(true);
  };

  const handleUpdateQuoteStatus = async (id: string, newStatus: CustomQuote["status"]) => {
    // 1. Optimistic UI update
    const updated = quotes.map((q) =>
      q.id === id ? { ...q, status: newStatus } : q
    );
    saveQuotes(updated);
    if (activeQuote && activeQuote.id === id) {
      setActiveQuote({ ...activeQuote, status: newStatus });
    }

    // 2. Sync to Supabase leads table
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      
      let dbStatus = "new";
      if (newStatus === "Contacted") dbStatus = "contacted";
      else if (newStatus === "Reviewed") dbStatus = "negotiating";
      else if (newStatus === "Approved") dbStatus = "archived";

      await supabase
        .from("leads")
        .update({ status: dbStatus })
        .eq("id", id);
    } catch (err) {
      console.warn("Could not sync quote status update to Supabase leads table:", err);
    }
  };

  return (
    <div className="space-y-6 pb-6 relative">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cabinet font-black text-3xl tracking-tight text-white flex items-center gap-3">
            <BadgeDollarSign className="w-8 h-8 text-darkpan-red shadow-[0_0_15px_rgba(235,22,22,0.4)]" />
            Pricing & Quotes Configurator
          </h1>
          <p className="text-darkpan-slate text-sm font-medium mt-1">
            Adjust dynamic freelance pricing packages, manage features checklist, and audit custom client budget configurations.
          </p>
        </div>
        <button
          onClick={handleOpenCreateTier}
          className="px-4 py-2.5 rounded-xl bg-darkpan-red hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(235,22,22,0.3)] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Pricing Tier
        </button>
      </div>

      {/* Grid: Left Column Pricing Tiers, Right Column Custom Quotes List */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Section: Pricing Tiers Editor (5 cols) */}
        <div className="xl:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-cabinet font-extrabold text-base tracking-tight text-white flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-darkpan-red" />
              Dynamic Service Packages
            </h4>
            <span className="text-[10px] text-darkpan-slate font-bold uppercase">
              {tiers.filter(t => t.status === "active").length} Active Tiers
            </span>
          </div>

          <div className="space-y-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl space-y-4 relative group hover:border-darkpan-red/20 transition-all duration-300 ${
                  tier.status === "inactive" ? "opacity-60" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h5 className="font-cabinet font-extrabold text-base text-white tracking-tight group-hover:text-darkpan-red transition-colors">
                      {tier.name}
                    </h5>
                    <p className="text-[10px] text-darkpan-slate font-medium">Est. Delivery: {tier.timeframe}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditTier(tier)}
                      className="p-1.5 rounded bg-black border border-white/10 hover:border-darkpan-red/20 text-white hover:text-darkpan-red cursor-pointer transition-colors"
                      title="Edit Tier"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteTier(tier.id, e)}
                      className="p-1.5 rounded bg-black border border-white/10 hover:border-darkpan-red/30 text-white hover:text-darkpan-red hover:bg-darkpan-red/10 cursor-pointer transition-colors"
                      title="Delete Tier"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-2xl font-cabinet font-black text-white">
                  <DollarSign className="w-5 h-5 text-darkpan-red flex-shrink-0" />
                  {tier.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>

                <p className="text-[11px] text-darkpan-slate leading-relaxed">
                  {tier.description}
                </p>

                {/* Features checklists */}
                <ul className="space-y-1.5 text-[10px] text-white font-medium pl-1">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-darkpan-red rounded-full flex-shrink-0 mt-1"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Custom Quote Requests Spreadsheet (7 cols) */}
        <div className="xl:col-span-7 bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-cabinet font-extrabold text-base tracking-tight text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-darkpan-red" />
              Custom Quotes Ledger
            </h4>
            <span className="text-[10px] text-darkpan-slate font-bold uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {quotes.filter(q => q.status === "Pending").length} pending review
            </span>
          </div>

          {/* Quotes ledger listing table */}
          <div className="overflow-x-auto border border-white/5 rounded-xl bg-black/20">
            <table className="w-full border-collapse text-left text-[11px]">
              <thead>
                <tr className="border-b border-white/5 bg-black/40 text-darkpan-slate uppercase font-extrabold tracking-wider">
                  <th className="p-4">Sender Email</th>
                  <th className="p-4">Scope Category</th>
                  <th className="p-4">Scale / Urgency</th>
                  <th className="p-4">Est. Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-darkpan-slate">
                {quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => handleOpenQuoteModal(quote)}
                  >
                    <td className="p-4 text-white truncate max-w-[140px] font-bold">
                      {quote.senderEmail}
                    </td>
                    <td className="p-4">
                      {quote.category}
                    </td>
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="text-white">{quote.scale} scale</p>
                        <p className="text-[9px] text-darkpan-red font-bold uppercase">{quote.urgency}</p>
                      </div>
                    </td>
                    <td className="p-4 text-white font-extrabold">
                      ${quote.budgetEst.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${
                        quote.status === "Pending"
                          ? "bg-darkpan-red/10 border-darkpan-red/20 text-darkpan-red"
                          : quote.status === "Reviewed"
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          : quote.status === "Approved"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-white/5 border-white/10 text-darkpan-slate"
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenQuoteModal(quote)}
                        className="px-2.5 py-1.5 rounded bg-black border border-white/10 hover:border-darkpan-red/20 text-white hover:text-darkpan-red transition-all text-[9px] font-bold cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Editor Drawer Overlay for Pricing Tiers */}
      <AnimatePresence>
        {isTierDrawerOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTierDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] h-screen bg-darkpan-bg border-l border-darkpan-red/10 z-50 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-black/40">
                <h3 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2 text-white">
                  <BadgeDollarSign className="w-5 h-5 text-darkpan-red" />
                  {activeTier ? "Configure Pricing Package" : "Publish Pricing Tier"}
                </h3>
                <button
                  onClick={() => setIsTierDrawerOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTier} className="flex-1 overflow-y-auto p-6 space-y-6">
                {tierError && (
                  <div className="p-3 text-xs bg-darkpan-red/10 border border-darkpan-red/20 text-darkpan-red rounded-lg font-bold">
                    {tierError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Package Name / Tier Label</label>
                  <input
                    type="text"
                    value={tierName}
                    onChange={(e) => setTierName(e.target.value)}
                    placeholder="e.g. Tier 2: Full-Stack Build"
                    className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold flex items-center gap-0.5">
                      <DollarSign className="w-3 h-3 text-darkpan-red" /> Price (USD)
                    </label>
                    <input
                      type="number"
                      value={tierPrice}
                      onChange={(e) => setTierPrice(Number(e.target.value))}
                      placeholder="6000"
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold flex items-center gap-0.5">
                      <Clock className="w-3 h-3 text-darkpan-red" /> Est. Timeframe
                    </label>
                    <input
                      type="text"
                      value={tierTimeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      placeholder="4-6 weeks"
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Service Pitch / Overview description</label>
                  <textarea
                    rows={3}
                    value={tierDesc}
                    onChange={(e) => setTierDesc(e.target.value)}
                    placeholder="Provide a sales narrative pitching this tier..."
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:border-darkpan-red/40 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Features checklists lists input */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-darkpan-red" />
                    Package Checklist Features (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={tierFeatures}
                    onChange={(e) => setTierFeatures(e.target.value)}
                    placeholder="Static UI layout&#10;Supabase DB Setup&#10;Dynamic Auth Sync"
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:border-darkpan-red/40 focus:outline-none transition-all font-mono"
                  ></textarea>
                </div>

                {/* Status Switcher Toggle */}
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white">Active Service Tier Status</p>
                    <p className="text-[9px] text-darkpan-slate">Controls public visibility on pricing section lists.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTierStatus(tierStatus === "active" ? "inactive" : "active")}
                    className={`w-12 h-6 rounded-full p-1 transition-colors focus:outline-none cursor-pointer ${
                      tierStatus === "active" ? "bg-darkpan-red" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        tierStatus === "active" ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Drawer Footer buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 sticky bottom-0 z-10 py-4 bg-darkpan-bg border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsTierDrawerOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 bg-black hover:bg-white/5 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-darkpan-red text-white hover:bg-red-700 font-bold text-xs cursor-pointer transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(235,22,22,0.3)]"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Pricing Tier
                  </button>
                </div>
              </form>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Quote Inspector Modal Dialog */}
      <AnimatePresence>
        {isQuoteModalOpen && activeQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteModalOpen(false)}
              className="fixed inset-0 bg-black"
            />
            
            <m.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-darkpan-bg border border-darkpan-red/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-lg z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2 text-white">
                  <Briefcase className="w-5 h-5 text-darkpan-red" />
                  Custom Quote Inspection
                </h3>
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quote details */}
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
                    <p className="text-[9px] uppercase font-bold text-darkpan-slate">Sender</p>
                    <p className="text-white font-bold truncate mt-0.5">{activeQuote.senderEmail}</p>
                  </div>
                  <div className="bg-black/30 border border-white/5 p-3 rounded-xl">
                    <p className="text-[9px] uppercase font-bold text-darkpan-slate">Subscribed category</p>
                    <p className="text-white font-bold truncate mt-0.5">{activeQuote.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-black/30 border border-white/5 p-2 rounded-xl">
                    <p className="text-[8px] uppercase font-bold text-darkpan-slate">Scale</p>
                    <p className="text-white font-bold mt-0.5">{activeQuote.scale}</p>
                  </div>
                  <div className="bg-black/30 border border-white/5 p-2 rounded-xl">
                    <p className="text-[8px] uppercase font-bold text-darkpan-slate">Urgency</p>
                    <p className="text-darkpan-red font-bold mt-0.5 uppercase tracking-wide text-[9px]">{activeQuote.urgency}</p>
                  </div>
                  <div className="bg-black/30 border border-white/5 p-2 rounded-xl">
                    <p className="text-[8px] uppercase font-bold text-darkpan-slate">Est. Budget</p>
                    <p className="text-emerald-400 font-black mt-0.5">${activeQuote.budgetEst.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] uppercase font-bold text-darkpan-slate">Functional Project Scope Requirements</p>
                  <div className="bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl text-darkpan-slate leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap font-medium">
                    {activeQuote.details}
                  </div>
                </div>

                {/* Dynamic matching indicators */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-3">
                  <p className="text-[10px] text-white font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-darkpan-red" />
                    Estimate Compatibility Matcher
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] text-darkpan-slate font-bold">
                      <span>BUDGET MATCH STATUS</span>
                      <span className="text-emerald-400 font-extrabold">92% MATCH</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[92%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update selectors buttons */}
              <div className="border-t border-white/5 pt-4 space-y-3">
                <p className="text-[9px] uppercase font-bold text-darkpan-slate">Change Lead status workflow</p>
                <div className="flex gap-2 flex-wrap">
                  {(["Pending", "Reviewed", "Approved", "Contacted"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateQuoteStatus(activeQuote.id, status)}
                      className={`text-[9px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        activeQuote.status === status
                          ? "text-darkpan-red bg-darkpan-red/10 border-darkpan-red/20 font-black"
                          : "text-darkpan-slate border-white/5 bg-black hover:text-white"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-black border border-white/10 hover:border-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Close Details
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
