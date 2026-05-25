"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  FolderGit,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Save,
  X,
  Code,
  Tag,
  Check,
  Globe,
  Layers,
  Image as ImageIcon
} from "lucide-react";

interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  techStack: string[];
  coverUrl: string;
  featured: boolean;
  role: string;
  client: string;
  description: string;
  contentMarkdown: string;
}

const DEFAULT_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "proj-1",
    title: "Amolnama Data Platform",
    subtitle: "Enterprise Crawlers & Real-Time E-Commerce Analytics",
    slug: "amolnama-analytics",
    category: "Full Stack SaaS",
    techStack: ["Next.js", "Supabase", "Tinybird", "D3.js", "Cheerio", "Docker"],
    coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    featured: true,
    role: "Lead Architect",
    client: "Amolnama Inc.",
    description: "Built the database infrastructure and analytical pipeline that orchestrates 10+ autonomous web scrapers crawling and evaluating thousands of pricing datapoints every hour across local marketplaces.",
    contentMarkdown: "### Project Overview\n\nAmolnama is a real-time price monitoring and aggregation engine designed for local vendor directories.\n\n### Key Implementations\n\n1. **Scraper Swarm Engine**: Cheerio/Puppeteer-based docker workers crawling 10 markets synchronously.\n2. **Tinybird Analytics API**: Integrated low-latency click-stream analysis representing thousands of webhook telemetry triggers.\n3. **Supabase Realtime Sync**: Handled Postgres database notification synchronizations dynamically to power live chart gauges.",
  },
  {
    id: "proj-2",
    title: "Componeo UI Kit",
    subtitle: "Radix UI & Framer Motion Cybernetic Component Library",
    slug: "componeo-components",
    category: "Design System",
    techStack: ["React 19", "Tailwind CSS", "Radix UI", "Framer Motion", "TypeScript"],
    coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    featured: true,
    role: "UI Engineer",
    client: "Open Source Portfolio",
    description: "Developed a premium, highly accessible cyber-luxury UI kit optimized for smooth transitions, layout-shift resilience, and beautiful neon dark mode designs.",
    contentMarkdown: "### Project Overview\n\nComponeo features accessible primitives custom styled to reflect futuristic, vaporwave-adjacent dark dashboards.\n\n### Key Implementations\n\n- **Resilience**: Zero Cumulative Layout Shift (CLS) on desktop/mobile viewports.\n- **Compound Architectures**: Custom compound select/modal hooks powered by React context state.",
  },
  {
    id: "proj-3",
    title: "SHUVO.DEV Portfolio",
    subtitle: "Premium Cyber-Luxury WebGL Interactive Platform",
    slug: "shuvo-dev-portfolio",
    category: "Web Application",
    techStack: ["Next.js 15", "Three.js", "Framer Motion", "Playwright", "Lighthouse"],
    coverUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
    featured: false,
    role: "Sole Creator",
    client: "Self Project",
    description: "Muhammad Rakibul Hasan Shuvo's portfolio website. Engineered to run ultra-smooth WebGL canvas clusters, responsive interactive mechanics, and self-hosted high performance Google Font twins.",
    contentMarkdown: "### Project Overview\n\nPersonal workspace built using Next.js, featuring optimized server side page conditionally omitting heavy modules for mobile devices, boosting performance and lowering FCP to 700ms.",
  }
];

export default function ProjectsCRUDPage() {
  const [projects, setProjects] = useState<ProjectCaseStudy[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  
  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Full Stack SaaS");
  const [formTechStack, setFormTechStack] = useState("");
  const [formCoverUrl, setFormCoverUrl] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formRole, setFormRole] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formContentMarkdown, setFormContentMarkdown] = useState("");
  const [formError, setFormError] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem("darkpan_projects");
    if (cached) {
      try {
        setProjects(JSON.parse(cached));
      } catch (e) {
        console.error(e);
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem("darkpan_projects", JSON.stringify(DEFAULT_PROJECTS));
    }
  }, []);

  const saveProjects = (updated: ProjectCaseStudy[]) => {
    setProjects(updated);
    localStorage.setItem("darkpan_projects", JSON.stringify(updated));
  };

  const handleOpenCreateDrawer = () => {
    setActiveProject(null);
    setFormTitle("");
    setFormSubtitle("");
    setFormSlug("");
    setFormCategory("Full Stack SaaS");
    setFormTechStack("");
    setFormCoverUrl("");
    setFormFeatured(false);
    setFormRole("");
    setFormClient("");
    setFormDescription("");
    setFormContentMarkdown("");
    setFormError("");
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (project: ProjectCaseStudy) => {
    setActiveProject(project);
    setFormTitle(project.title);
    setFormSubtitle(project.subtitle);
    setFormSlug(project.slug);
    setFormCategory(project.category);
    setFormTechStack(project.techStack.join(", "));
    setFormCoverUrl(project.coverUrl);
    setFormFeatured(project.featured);
    setFormRole(project.role);
    setFormClient(project.client);
    setFormDescription(project.description);
    setFormContentMarkdown(project.contentMarkdown);
    setFormError("");
    setIsDrawerOpen(true);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project case study?")) {
      const updated = projects.filter((p) => p.id !== id);
      saveProjects(updated);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSlug.trim() || !formDescription.trim()) {
      setFormError("Title, Slug, and Short Description are required.");
      return;
    }

    const techArray = formTechStack
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const coverImg = formCoverUrl.trim() || "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80";

    let updated: ProjectCaseStudy[];

    if (activeProject) {
      // Editing
      updated = projects.map((p) =>
        p.id === activeProject.id
          ? {
              ...p,
              title: formTitle.trim(),
              subtitle: formSubtitle.trim(),
              slug: formSlug.trim().toLowerCase().replace(/\s+/g, "-"),
              category: formCategory,
              techStack: techArray,
              coverUrl: coverImg,
              featured: formFeatured,
              role: formRole.trim() || "Developer",
              client: formClient.trim() || "Independent",
              description: formDescription.trim(),
              contentMarkdown: formContentMarkdown.trim(),
            }
          : p
      );
    } else {
      // Creating
      const newProject: ProjectCaseStudy = {
        id: `proj-${Date.now()}`,
        title: formTitle.trim(),
        subtitle: formSubtitle.trim(),
        slug: formSlug.trim().toLowerCase().replace(/\s+/g, "-"),
        category: formCategory,
        techStack: techArray,
        coverUrl: coverImg,
        featured: formFeatured,
        role: formRole.trim() || "Developer",
        client: formClient.trim() || "Independent",
        description: formDescription.trim(),
        contentMarkdown: formContentMarkdown.trim(),
      };
      updated = [newProject, ...projects];
    }

    saveProjects(updated);
    setIsDrawerOpen(false);
  };

  return (
    <div className="space-y-6 pb-6 relative">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cabinet font-black text-3xl tracking-tight text-white flex items-center gap-3">
            <FolderGit className="w-8 h-8 text-darkpan-red shadow-[0_0_15px_rgba(235,22,22,0.4)]" />
            Case Studies Content Engine
          </h1>
          <p className="text-darkpan-slate text-sm font-medium mt-1">
            Build, edit, and organize dynamic markdown portfolio studies for your visitors.
          </p>
        </div>
        <button
          onClick={handleOpenCreateDrawer}
          className="px-4 py-2.5 rounded-xl bg-darkpan-red hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(235,22,22,0.3)] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Case Study
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <m.div
            key={project.id}
            layoutId={`project-card-${project.id}`}
            whileHover={{ y: -6 }}
            className="bg-darkpan-bg border border-darkpan-red/10 hover:border-darkpan-red/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col group relative"
          >
            {/* Cover Image mockup */}
            <div className="relative h-48 bg-black overflow-hidden flex-shrink-0">
              <img
                src={project.coverUrl}
                alt={project.title}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkpan-bg via-transparent to-transparent"></div>
              
              {/* Featured Badge */}
              {project.featured && (
                <span className="absolute top-4 left-4 text-xs uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full bg-darkpan-red text-white shadow-[0_0_10px_rgba(235,22,22,0.5)]">
                  Featured Showcase
                </span>
              )}

              <span className="absolute bottom-4 left-4 text-[10px] font-bold text-darkpan-red bg-darkpan-red/15 px-2 py-0.5 rounded border border-darkpan-red/20 uppercase tracking-wide">
                {project.category}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-cabinet font-extrabold text-base text-white tracking-tight group-hover:text-darkpan-red transition-colors">
                    {project.title}
                  </h4>
                  <a
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="text-darkpan-slate hover:text-white p-1 hover:bg-white/5 rounded transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-darkpan-slate font-medium line-clamp-1">
                  {project.subtitle}
                </p>
                <p className="text-[11px] text-darkpan-slate line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-bold text-darkpan-slate bg-black/40 px-2 py-0.5 rounded border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <hr className="border-white/5" />

                {/* Info & Admin Controls */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-darkpan-slate font-semibold">
                    Client: <span className="text-white">{project.client}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditDrawer(project)}
                      className="p-2 rounded-lg bg-black border border-white/10 hover:border-darkpan-red/20 text-white hover:text-darkpan-red transition-all cursor-pointer flex items-center justify-center"
                      title="Edit Case Study"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="p-2 rounded-lg bg-black border border-white/10 hover:border-darkpan-red/30 text-white hover:text-darkpan-red hover:bg-darkpan-red/10 transition-all cursor-pointer flex items-center justify-center"
                      title="Delete Case Study"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Editor Dynamic Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Drawer */}
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] h-screen bg-darkpan-bg border-l border-darkpan-red/10 z-50 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Header */}
              <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-black/40">
                <h3 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2 text-white">
                  <FolderGit className="w-5 h-5 text-darkpan-red" />
                  {activeProject ? "Modify Case Study" : "Draft New Case Study"}
                </h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto p-6 space-y-6">
                {formError && (
                  <div className="p-3 text-xs bg-darkpan-red/10 border border-darkpan-red/20 text-darkpan-red rounded-lg font-bold">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Project Title</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => {
                        setFormTitle(e.target.value);
                        if (!activeProject) {
                          setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                        }
                      }}
                      placeholder="e.g. Amolnama Analytics"
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-darkpan-slate focus:outline-none transition-all"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">URL Slug</label>
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="e.g. amolnama-analytics"
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-darkpan-slate focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Project Subtitle / Catchphrase</label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    placeholder="e.g. Enterprise Crawler Orchestration Dashboard"
                    className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-darkpan-slate focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Showcase Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                    >
                      <option value="Full Stack SaaS">Full Stack SaaS</option>
                      <option value="Design System">Design System</option>
                      <option value="Web Application">Web Application</option>
                      <option value="WebGL Simulation">WebGL Simulation</option>
                    </select>
                  </div>

                  {/* Cover URL */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-darkpan-red" />
                      Mockup Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={formCoverUrl}
                      onChange={(e) => setFormCoverUrl(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/..."
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-darkpan-slate focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Role */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Professional Role</label>
                    <input
                      type="text"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      placeholder="e.g. Sole Architect"
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-darkpan-slate focus:outline-none transition-all"
                    />
                  </div>

                  {/* Client */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Client / Company Name</label>
                    <input
                      type="text"
                      value={formClient}
                      onChange={(e) => setFormClient(e.target.value)}
                      placeholder="e.g. Amolnama Lab"
                      className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-darkpan-slate focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold flex items-center gap-1">
                    <Code className="w-3 h-3 text-darkpan-red" />
                    Technology Stack (comma-separated list)
                  </label>
                  <input
                    type="text"
                    value={formTechStack}
                    onChange={(e) => setFormTechStack(e.target.value)}
                    placeholder="Next.js, Supabase, D3.js, Tailwind"
                    className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-darkpan-slate focus:outline-none transition-all"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Short Summary / Excerpt</label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe the case study focus in 2-3 key sentences..."
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-darkpan-slate focus:border-darkpan-red/40 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Markdown Content */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-darkpan-slate font-extrabold">Full Case Study Narrative (Markdown Supported)</label>
                  <textarea
                    rows={8}
                    value={formContentMarkdown}
                    onChange={(e) => setFormContentMarkdown(e.target.value)}
                    placeholder="### Project Goals... \n\nWhat did you implement?"
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-darkpan-slate focus:border-darkpan-red/40 focus:outline-none transition-all font-mono"
                  ></textarea>
                </div>

                {/* Showcase Switcher */}
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white">Promote to Featured Showcase</p>
                    <p className="text-[10px] text-darkpan-slate font-medium">Pins this case study to the primary hero section card deck.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormFeatured(!formFeatured)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors focus:outline-none cursor-pointer ${
                      formFeatured ? "bg-darkpan-red" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        formFeatured ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Footer buttons in drawer */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5 bg-darkpan-bg sticky bottom-0 z-10 py-4">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-white/10 bg-black hover:bg-white/5 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-darkpan-red text-white hover:bg-red-700 font-bold text-xs cursor-pointer transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(235,22,22,0.3)]"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              </form>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
