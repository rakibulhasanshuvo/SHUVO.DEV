"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Grid,
  Plus,
  Edit,
  Save,
  Trash2,
  X,
  FileArchive,
  Download,
  Info,
  DollarSign,
  Heart,
  Play,
  Eye,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface WebTemplate {
  id: string;
  title: string;
  price: number;
  downloadCount: number;
  likes: number;
  status: "active" | "draft" | "archived";
  taslTitle: string;
  taslAuthor: string;
  taslSource: string;
  taslLicense: string; // e.g. CC BY-NC-SA 4.0, MIT, Commercial
  previewWebmUrl: string;
  downloadUrl: string;
  description: string;
}

const DEFAULT_TEMPLATES: WebTemplate[] = [
  {
    id: "temp-1",
    title: "NeoCyber Luxury Portfolio Theme",
    price: 49.00,
    downloadCount: 342,
    likes: 88,
    status: "active",
    taslTitle: "Cyberpunk Grid Vector",
    taslAuthor: "Muhammad Shuvo",
    taslSource: "https://github.com/rakibulhasanshuvo/SHUVO.DEV",
    taslLicense: "Creative Commons BY-NC 4.0",
    previewWebmUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-43950-large.mp4",
    downloadUrl: "/templates/neocyber-v1.zip",
    description: "Ultra-luxury retro-future web blueprint utilizing customizable neon grid arrays, self-hosted outfits, and custom hydration safe-guards."
  },
  {
    id: "temp-2",
    title: "Glassmorphic 3D Card Stack",
    price: 19.00,
    downloadCount: 1205,
    likes: 247,
    status: "active",
    taslTitle: "Isometric Cards Layer",
    taslAuthor: "Antigravity",
    taslSource: "https://unsplash.com",
    taslLicense: "MIT License",
    previewWebmUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-lines-animation-43184-large.mp4",
    downloadUrl: "/templates/glassmorphic-deck.zip",
    description: "Responsive React 19 Framer Motion component library optimized for card slides and smooth mobile transition swipes."
  },
  {
    id: "temp-3",
    title: "Infinite WebGL Matrix Rain Block",
    price: 29.00,
    downloadCount: 89,
    likes: 12,
    status: "draft",
    taslTitle: "Original Code Matrix rain",
    taslAuthor: "Matrix Studio",
    taslSource: "https://codepen.io",
    taslLicense: "CC BY 3.0",
    previewWebmUrl: "https://assets.mixkit.co/videos/preview/mixkit-green-binary-code-screen-background-39877-large.mp4",
    downloadUrl: "/templates/matrix-rain.zip",
    description: "WebGL canvas segment streaming random characters in cyber-luxury dark green/charcoal layers."
  }
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<WebTemplate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<WebTemplate | null>(null);
  
  // Simulator download overlay states
  const [simulatingId, setSimulatingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState<"active" | "draft" | "archived">("active");
  const [taslTitle, setTaslTitle] = useState("");
  const [taslAuthor, setTaslAuthor] = useState("");
  const [taslSource, setTaslSource] = useState("");
  const [taslLicense, setTaslLicense] = useState("");
  const [description, setDescription] = useState("");
  const [previewWebmUrl, setPreviewWebmUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  
  const [formError, setFormError] = useState("");

  // Load from LocalStorage
  useEffect(() => {
    const cached = localStorage.getItem("darkpan_templates");
    if (cached) {
      try {
        setTemplates(JSON.parse(cached));
      } catch (e) {
        console.error(e);
        setTemplates(DEFAULT_TEMPLATES);
      }
    } else {
      setTemplates(DEFAULT_TEMPLATES);
      localStorage.setItem("darkpan_templates", JSON.stringify(DEFAULT_TEMPLATES));
    }
  }, []);

  const saveTemplates = (updated: WebTemplate[]) => {
    setTemplates(updated);
    localStorage.setItem("darkpan_templates", JSON.stringify(updated));
  };

  const handleOpenCreateModal = () => {
    setActiveTemplate(null);
    setTitle("");
    setPrice(29);
    setStatus("active");
    setTaslTitle("");
    setTaslAuthor("Muhammad Shuvo");
    setTaslSource("https://github.com/rakibulhasanshuvo/SHUVO.DEV");
    setTaslLicense("MIT License");
    setDescription("");
    setPreviewWebmUrl("");
    setDownloadUrl("/templates/new-theme.zip");
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (template: WebTemplate) => {
    setActiveTemplate(template);
    setTitle(template.title);
    setPrice(template.price);
    setStatus(template.status);
    setTaslTitle(template.taslTitle);
    setTaslAuthor(template.taslAuthor);
    setTaslSource(template.taslSource);
    setTaslLicense(template.taslLicense);
    setDescription(template.description);
    setPreviewWebmUrl(template.previewWebmUrl);
    setDownloadUrl(template.downloadUrl);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this storefront template?")) {
      const updated = templates.filter((t) => t.id !== id);
      saveTemplates(updated);
    }
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setFormError("Title and description are required.");
      return;
    }

    let updated: WebTemplate[];

    if (activeTemplate) {
      // Editing
      updated = templates.map((t) =>
        t.id === activeTemplate.id
          ? {
              ...t,
              title: title.trim(),
              price: Number(price) || 0,
              status,
              taslTitle: taslTitle.trim(),
              taslAuthor: taslAuthor.trim(),
              taslSource: taslSource.trim(),
              taslLicense: taslLicense.trim(),
              description: description.trim(),
              previewWebmUrl: previewWebmUrl.trim(),
              downloadUrl: downloadUrl.trim(),
            }
          : t
      );
    } else {
      // Creating
      const newTemplate: WebTemplate = {
        id: `temp-${Date.now()}`,
        title: title.trim(),
        price: Number(price) || 0,
        downloadCount: 0,
        likes: 0,
        status,
        taslTitle: taslTitle.trim(),
        taslAuthor: taslAuthor.trim(),
        taslSource: taslSource.trim(),
        taslLicense: taslLicense.trim(),
        description: description.trim(),
        previewWebmUrl: previewWebmUrl.trim() || "https://assets.mixkit.co/videos/preview/mixkit-futuristic-subway-station-with-neon-lights-43950-large.mp4",
        downloadUrl: downloadUrl.trim() || "/templates/new-theme.zip",
      };
      updated = [newTemplate, ...templates];
    }

    saveTemplates(updated);
    setIsModalOpen(false);
  };

  // Simulate zip file generation & download increment
  const handleSimulateDownload = (id: string) => {
    if (simulatingId) return;

    setSimulatingId(id);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Increment download count in localdb
          const updated = templates.map((t) =>
            t.id === id ? { ...t, downloadCount: t.downloadCount + 1 } : t
          );
          saveTemplates(updated);
          
          setTimeout(() => setSimulatingId(null), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="space-y-6 pb-6 relative">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cabinet font-black text-3xl tracking-tight text-white flex items-center gap-3">
            <Grid className="w-8 h-8 text-darkpan-red shadow-[0_0_15px_rgba(235,22,22,0.4)]" />
            Template Storefront Manager
          </h1>
          <p className="text-darkpan-slate text-sm font-medium mt-1">
            Publish HTML templates, configure licenses with TASL, and view telemetry download statistics.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 rounded-xl bg-darkpan-red hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(235,22,22,0.3)] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {/* Templates Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((temp) => (
          <div
            key={temp.id}
            className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col group relative"
          >
            {/* Status indicator pill absolute */}
            <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full z-10 ${
              temp.status === "active"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : temp.status === "draft"
                ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                : "bg-white/10 border border-white/20 text-darkpan-slate"
            }`}>
              {temp.status}
            </span>

            {/* Video preview background container */}
            <div className="relative h-44 bg-black overflow-hidden flex-shrink-0 flex items-center justify-center">
              {temp.previewWebmUrl ? (
                <video
                  src={temp.previewWebmUrl}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-darkpan-slate font-cabinet font-black tracking-widest text-xl opacity-20">
                  SHUVO.DEV
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-darkpan-bg via-transparent to-transparent" />
              
              {/* Product Price Tag */}
              <span className="absolute bottom-4 right-4 text-xs font-black text-white bg-black/60 px-3 py-1.5 rounded-xl border border-white/5 flex items-center shadow-lg">
                <DollarSign className="w-3.5 h-3.5 text-darkpan-red" />
                {temp.price.toFixed(2)}
              </span>
            </div>

            {/* Product description and properties */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="font-cabinet font-extrabold text-base text-white tracking-tight group-hover:text-darkpan-red transition-colors line-clamp-1">
                  {temp.title}
                </h4>
                <p className="text-[11px] text-darkpan-slate line-clamp-2 leading-relaxed">
                  {temp.description}
                </p>
              </div>

              {/* TASL Metadata panel details */}
              <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1 text-[10px]">
                <p className="text-darkpan-slate font-bold uppercase tracking-wider text-[8px]">
                  TASL Credit License
                </p>
                <p className="text-white truncate font-medium">
                  Title: <span className="text-darkpan-slate">{temp.taslTitle || "N/A"}</span>
                </p>
                <div className="flex justify-between gap-2 text-darkpan-slate font-medium">
                  <p>Author: <span className="text-white">{temp.taslAuthor || "Shuvo"}</span></p>
                  <p className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/15 text-[8px] font-bold">
                    {temp.taslLicense || "Commercial"}
                  </p>
                </div>
              </div>

              {/* Storefront telemetry meters */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
                  <p className="text-[10px] text-darkpan-slate uppercase font-bold">Downloads</p>
                  <h6 className="font-cabinet font-black text-lg text-white mt-0.5 flex items-center justify-center gap-1">
                    <Download className="w-3.5 h-3.5 text-darkpan-red" />
                    {temp.downloadCount}
                  </h6>
                </div>
                <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
                  <p className="text-[10px] text-darkpan-slate uppercase font-bold">Favorites</p>
                  <h6 className="font-cabinet font-black text-lg text-white mt-0.5 flex items-center justify-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                    {temp.likes}
                  </h6>
                </div>
              </div>

              <hr className="border-white/5" />

              {/* Admin Actions controls */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => handleSimulateDownload(temp.id)}
                  disabled={simulatingId !== null}
                  className="flex-1 px-3 py-2 rounded-xl border border-white/10 hover:border-darkpan-red/20 text-white hover:text-darkpan-red bg-black hover:bg-white/5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-3.5 h-3.5" />
                  Test DL Webhook
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEditModal(temp)}
                    className="p-2.5 rounded-xl border border-white/10 bg-black hover:bg-white/5 hover:border-darkpan-red/20 text-white hover:text-darkpan-red cursor-pointer transition-all flex items-center justify-center"
                    title="Edit Metadata"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteTemplate(temp.id, e)}
                    className="p-2.5 rounded-xl border border-white/10 bg-black hover:bg-darkpan-red/10 hover:border-darkpan-red/30 text-white hover:text-darkpan-red cursor-pointer transition-all flex items-center justify-center"
                    title="Remove Template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Simulated download visual progress overlay */}
              {simulatingId === temp.id && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 space-y-3 z-10 rounded-2xl animate-fade-in">
                  <FileArchive className="w-10 h-10 text-darkpan-red animate-bounce" />
                  <p className="text-xs text-white font-bold">Compressing Zip Archive Asset...</p>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-darkpan-red h-full transition-all duration-150"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-darkpan-slate font-bold">{downloadProgress}% complete</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal for templates */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black"
            />
            
            {/* Modal Box */}
            <m.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-darkpan-bg border border-darkpan-red/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-lg z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2 text-white">
                  <Grid className="w-5 h-5 text-darkpan-red" />
                  {activeTemplate ? "Edit Storefront Template" : "Add Storefront Template"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTemplate} className="space-y-4">
                {formError && (
                  <div className="p-3 text-xs bg-darkpan-red/10 border border-darkpan-red/20 text-darkpan-red rounded-lg font-bold">
                    {formError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Template Name</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern Portfolios v2"
                    className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Price (USD)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="29"
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* TASL credit form fieldsets */}
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-darkpan-red" />
                    TASL Credit Framework
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-darkpan-slate font-extrabold">Asset Title</label>
                      <input
                        type="text"
                        value={taslTitle}
                        onChange={(e) => setTaslTitle(e.target.value)}
                        placeholder="e.g. Glowing Grid Vector"
                        className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-darkpan-slate font-extrabold">Asset Author</label>
                      <input
                        type="text"
                        value={taslAuthor}
                        onChange={(e) => setTaslAuthor(e.target.value)}
                        placeholder="e.g. Muhammad Shuvo"
                        className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-darkpan-slate font-extrabold">Asset Source URL</label>
                      <input
                        type="text"
                        value={taslSource}
                        onChange={(e) => setTaslSource(e.target.value)}
                        placeholder="e.g. https://github.com/..."
                        className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-darkpan-slate font-extrabold">Asset License criteria</label>
                      <input
                        type="text"
                        value={taslLicense}
                        onChange={(e) => setTaslLicense(e.target.value)}
                        placeholder="e.g. CC BY-NC 4.0 or MIT"
                        className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Storefront Short Excerpt</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short sales overview of what files are included in the zip..."
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white focus:border-darkpan-red/40 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-darkpan-slate font-extrabold">WebM Preview MP4/WebM Link</label>
                    <input
                      type="text"
                      value={previewWebmUrl}
                      onChange={(e) => setPreviewWebmUrl(e.target.value)}
                      placeholder="e.g. https://assets..."
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-darkpan-slate font-extrabold">Zip Download Link</label>
                    <input
                      type="text"
                      value={downloadUrl}
                      onChange={(e) => setDownloadUrl(e.target.value)}
                      placeholder="e.g. /templates/theme.zip"
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 bg-black hover:bg-white/5 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-darkpan-red text-white hover:bg-red-700 font-bold text-xs cursor-pointer transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(235,22,22,0.3)]"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Template
                  </button>
                </div>
              </form>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
