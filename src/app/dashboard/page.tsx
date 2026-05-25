"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  PieChart,
  Plus,
  Trash2,
  Check,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  FileCheck2,
  FolderGit,
  Download,
  Cpu,
} from "lucide-react";

// Mock Database Items
const initialSales = [
  { id: "INV-0123", date: "23 May 2026", customer: "John Doe", amount: 123.00, status: "Paid" },
  { id: "INV-0124", date: "22 May 2026", customer: "Sarah Connor", amount: 450.50, status: "Paid" },
  { id: "INV-0125", date: "21 May 2026", customer: "Bruce Wayne", amount: 1200.00, status: "Pending" },
  { id: "INV-0126", date: "20 May 2026", customer: "Tony Stark", amount: 8900.00, status: "Paid" },
  { id: "INV-0127", date: "19 May 2026", customer: "Clark Kent", amount: 75.00, status: "Overdue" },
  { id: "INV-0128", date: "18 May 2026", customer: "Peter Parker", amount: 15.00, status: "Pending" },
];

const mockMessages = [
  { id: 1, user: "Alice Cooper", msg: "Can we integrate this template with Prisma?", time: "10 mins ago" },
  { id: 2, user: "Bob Marley", msg: "The animations on the home page look stellar!", time: "45 mins ago" },
  { id: 3, user: "Charlie Sheen", msg: "Let's discuss the backend deployment timeline.", time: "3 hours ago" },
];

export default function DashboardPage() {
  // To-Do Checklist State
  const [todoInput, setTodoInput] = useState("");
  
  // Dynamic State telemetry from localStorage
  const [inboxCount, setInboxCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [templatesDownloadSum, setTemplatesDownloadSum] = useState(0);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    // 1. Inbox
    const cachedMessages = localStorage.getItem("darkpan_messages");
    if (cachedMessages) {
      try {
        const parsed = JSON.parse(cachedMessages);
        setInboxCount(parsed.length);
        setUnreadCount(parsed.filter((m: any) => m.status === "unread").length);
        setRecentMessages(parsed.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    } else {
      setInboxCount(3);
      setUnreadCount(1);
      setRecentMessages([
        { id: "msg-1", name: "Johnathan Doe", email: "john.doe@techvibe.io", subject: "Custom E-Commerce Platform Query", message: "Hey Rakibul,\n\nI saw your stunning SHUVO.DEV portfolio and the Tier 3 custom interactive experiences...", date: "2026-05-24T14:32:00Z", status: "unread", starred: true, archived: false },
        { id: "msg-2", name: "Sarah Connor", email: "sarah.c@cyberdyne.org", subject: "Portfolio Development & SEO Support", message: "Hello Shuvo,\n\nI was testing your portfolio speed and was absolutely blown away by the 0.0018s CLS...", date: "2026-05-23T09:15:00Z", status: "read", starred: false, archived: false },
        { id: "msg-3", name: "Bruce Wayne", email: "bwayne@wayneenterprise.com", subject: "Interactive Showcase App & Templates", message: "Rakibul,\n\nI need a secure, anonymous client portal dashboard built using Supabase...", date: "2026-05-22T23:10:00Z", status: "replied", starred: true, archived: false }
      ].slice(0, 3));
    }

    // 2. Projects
    const cachedProjects = localStorage.getItem("darkpan_projects");
    if (cachedProjects) {
      try {
        const parsed = JSON.parse(cachedProjects);
        setProjectsCount(parsed.length);
      } catch (e) {
        console.error(e);
      }
    } else {
      setProjectsCount(3);
    }

    // 3. Templates
    const cachedTemplates = localStorage.getItem("darkpan_templates");
    if (cachedTemplates) {
      try {
        const parsed = JSON.parse(cachedTemplates);
        const totalDl = parsed.reduce((sum: number, t: any) => sum + (t.downloadCount || 0), 0);
        setTemplatesDownloadSum(totalDl);
      } catch (e) {
        console.error(e);
      }
    } else {
      setTemplatesDownloadSum(1636);
    }
  }, []);

  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([
    { id: 1, text: "Sync React 19 Framer Motion components", completed: false },
    { id: 2, text: "Audit SEO tags and JSON-LD schema", completed: true },
    { id: 3, text: "Build premium DarkPan custom widgets", completed: false },
  ]);

  // Load Todos from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("darkpan_todos");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save Todos helper
  const saveTodos = (newTodos: typeof todos) => {
    setTodos(newTodos);
    localStorage.setItem("darkpan_todos", JSON.stringify(newTodos));
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: todoInput.trim(),
      completed: false,
    };
    saveTodos([...todos, newTodo]);
    setTodoInput("");
  };

  const toggleTodo = (id: number) => {
    const updated = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTodos(updated);
  };

  const deleteTodo = (id: number) => {
    const updated = todos.filter((t) => t.id !== id);
    saveTodos(updated);
  };

  // Recent Sales Table Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sales, setSales] = useState(initialSales);

  const filteredSales = sales.filter((item) => {
    const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Calendar Widget State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 23)); // May 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(23);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // SVG Worldwide Sales Bar Chart Hover State
  const [barHovered, setBarHovered] = useState<number | null>(null);
  const barData = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 1800 },
    { month: "Mar", sales: 1400 },
    { month: "Apr", sales: 2600 },
    { month: "May", sales: 2100 },
    { month: "Jun", sales: 3200 },
  ];

  // SVG Area Chart Hover State
  const [lineHovered, setLineHovered] = useState<number | null>(null);
  const trendData = [
    { label: "Jan", sales: 15, revenue: 10 },
    { label: "Feb", sales: 30, revenue: 20 },
    { label: "Mar", sales: 25, revenue: 35 },
    { label: "Apr", sales: 50, revenue: 40 },
    { label: "May", sales: 45, revenue: 55 },
    { label: "Jun", sales: 75, revenue: 65 },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cabinet font-black text-3xl tracking-tight text-white">
            Overview Dashboard
          </h1>
          <p className="text-darkpan-slate text-sm font-medium mt-1">
            Real-time analytics, widget logs, and client request pipelines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-darkpan-red/10 border border-darkpan-red/20 text-xs font-bold text-darkpan-red">
            <span className="w-1.5 h-1.5 bg-darkpan-red rounded-full animate-ping"></span>
            System Live
          </span>
        </div>
      </div>

      {/* 1. Stat Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { title: "Lead Inbox", value: `${inboxCount} Leads`, change: `${unreadCount} Unread`, icon: MessageSquare, color: "text-darkpan-red", href: "/dashboard/messages" },
          { title: "Active Case Studies", value: `${projectsCount} Projects`, change: "CRUD persistent", icon: FolderGit, color: "text-blue-500", href: "/dashboard/projects" },
          { title: "Template Downloads", value: templatesDownloadSum.toLocaleString(), change: "ZIP telemetry", icon: Download, color: "text-pink-500", href: "/dashboard/templates" },
          { title: "Scraper Telemetry", value: "98.9% Health", change: "12 nodes live", icon: Cpu, color: "text-emerald-500", href: "/dashboard/analytics" },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="focus:outline-none"
            >
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-darkpan-red/30 transition-all duration-300 relative group overflow-hidden cursor-pointer h-full"
              >
                {/* Decorative glow hover corner */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-darkpan-red/5 rounded-full blur-2xl group-hover:bg-darkpan-red/10 transition-colors" />

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider font-bold text-darkpan-slate">{card.title}</p>
                  <h3 className="font-cabinet font-black text-2xl tracking-tight text-white">{card.value}</h3>
                  <span className="text-[10px] font-bold text-darkpan-red bg-darkpan-red/10 px-2 py-0.5 rounded-full inline-block">
                    {card.change}
                  </span>
                </div>
                <div className={`w-12 h-12 bg-black rounded-xl border border-white/5 flex items-center justify-center ${card.color} shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(235,22,22,0.15)] group-hover:border-darkpan-red/20 transition-all duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
              </m.div>
            </Link>
          );
        })}
      </section>

      {/* 2. Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Worldwide Sales SVG Bar Chart */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h5 className="font-cabinet font-extrabold text-base tracking-wide">Worldwide Sales</h5>
            <span className="text-[11px] text-darkpan-slate font-bold">Mock Data (USD)</span>
          </div>

          <div className="flex-1 min-h-[220px] flex items-end justify-between relative px-2 pt-6 border-b border-white/5 pb-2">
            {/* Grid horizontal markers */}
            <div className="absolute inset-x-0 bottom-2 top-0 flex flex-col justify-between pointer-events-none text-[9px] text-darkpan-slate/50">
              <div className="border-t border-white/5 w-full pt-1">3k</div>
              <div className="border-t border-white/5 w-full pt-1">2k</div>
              <div className="border-t border-white/5 w-full pt-1">1k</div>
              <div className="border-t border-white/5 w-full pt-1">0</div>
            </div>

            {/* Custom interactive bars */}
            {barData.map((data, index) => {
              const maxSales = 3500;
              const barHeightPct = (data.sales / maxSales) * 100;
              return (
                <div key={data.month} className="flex flex-col items-center flex-1 z-10">
                  <div
                    className="w-8 sm:w-10 relative cursor-pointer"
                    onMouseEnter={() => setBarHovered(index)}
                    onMouseLeave={() => setBarHovered(null)}
                  >
                    {/* Interactive Tooltip popup */}
                    <AnimatePresence>
                      {barHovered === index && (
                        <m.div
                          initial={{ opacity: 0, y: -5, scale: 0.9 }}
                          animate={{ opacity: 1, y: -25, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.9 }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-darkpan-red/30 px-2 py-0.5 rounded text-[10px] font-bold text-white z-20 whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                        >
                          ${data.sales}
                        </m.div>
                      )}
                    </AnimatePresence>

                    {/* Glowing bar */}
                    <m.div
                      initial={{ height: 0 }}
                      animate={{ height: `${barHeightPct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`w-full rounded-t-lg bg-gradient-to-t from-darkpan-red/40 to-darkpan-red shadow-[0_0_15px_rgba(235,22,22,0.1)] transition-all ${
                        barHovered === index ? "brightness-125 border-t border-x border-white/30 glow-red-sm" : ""
                      }`}
                      style={{ height: `${(data.sales / maxSales) * 150}px` }}
                    />
                  </div>
                  <span className="text-[10px] text-darkpan-slate font-bold mt-2">{data.month}</span>
                </div>
              );
            })}
          </div>
        </m.div>

        {/* Sales & Revenue Double Area/Line SVG Chart */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h5 className="font-cabinet font-extrabold text-base tracking-wide">Sales & Revenue</h5>
            <div className="flex items-center gap-4 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-darkpan-red">
                <span className="w-2.5 h-0.5 bg-darkpan-red inline-block"></span> Sales
              </span>
              <span className="flex items-center gap-1 text-white">
                <span className="w-2.5 h-0.5 bg-white inline-block"></span> Revenue
              </span>
            </div>
          </div>

          <div className="flex-1 min-h-[220px] relative px-2 pt-6 pb-2">
            {/* Interactive SVG Workspace */}
            <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EB1616" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EB1616" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* Area Paths (Filled regions) */}
              {/* Cubic spline path representation of data */}
              <path
                d="M 10 160 Q 90 130 170 120 T 330 90 T 490 30 L 490 160 L 10 160 Z"
                fill="url(#salesGrad)"
                className="opacity-70"
              />
              <path
                d="M 10 160 Q 90 145 170 115 T 330 110 T 490 55 L 490 160 L 10 160 Z"
                fill="url(#revGrad)"
                className="opacity-50"
              />

              {/* Line Paths */}
              <m.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2 }}
                d="M 10 160 Q 90 130 170 120 T 330 90 T 490 30"
                fill="none"
                stroke="#EB1616"
                strokeWidth="2.5"
                className="glow-red-sm"
              />
              <m.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                d="M 10 160 Q 90 145 170 115 T 330 110 T 490 55"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />

              {/* Click/Hover circles markers for trends */}
              {trendData.map((data, idx) => {
                // Calculated coordinates for markers
                const xCoords = [10, 90, 170, 250, 330, 490];
                const ySales = [160, 130, 120, 105, 90, 30];
                const yRev = [160, 145, 115, 112, 110, 55];
                const x = xCoords[idx];

                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setLineHovered(idx)}
                    onMouseLeave={() => setLineHovered(null)}
                  >
                    {/* Vertical guideline */}
                    {lineHovered === idx && (
                      <line x1={x} y1="10" x2={x} y2="160" stroke="#EB1616" strokeDasharray="3,3" strokeWidth="1" />
                    )}

                    {/* Sales Dot */}
                    <circle cx={x} cy={ySales[idx]} r={lineHovered === idx ? 5 : 3.5} fill="#EB1616" stroke="#000" strokeWidth="1.5" />
                    {/* Revenue Dot */}
                    <circle cx={x} cy={yRev[idx]} r={lineHovered === idx ? 5 : 3.5} fill="#FFF" stroke="#000" strokeWidth="1.5" />

                    {/* Tooltip Overlay */}
                    {lineHovered === idx && (
                      <g>
                        <rect x={x - 45} y={Math.min(ySales[idx], yRev[idx]) - 35} width="90" height="28" rx="4" fill="#000" stroke="rgba(235, 22, 22, 0.3)" strokeWidth="1" />
                        <text x={x} y={Math.min(ySales[idx], yRev[idx]) - 24} fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">
                          Sales: ${data.sales}k
                        </text>
                        <text x={x} y={Math.min(ySales[idx], yRev[idx]) - 14} fill="#6C7293" fontSize="8" fontWeight="bold" textAnchor="middle">
                          Rev: ${data.revenue}k
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            <div className="flex justify-between text-[9px] text-darkpan-slate font-bold px-2 mt-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </m.div>
      </section>

      {/* 3. Recent Sales Section */}
      <section className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h5 className="font-cabinet font-extrabold text-lg tracking-wide text-white">Recent Sales</h5>
            <p className="text-xs text-darkpan-slate mt-0.5">Filter invoice history, transaction logs, and processing state.</p>
          </div>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-darkpan-slate" />
              <input
                type="text"
                placeholder="Search customer…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-darkpan-red/40 text-white w-48 transition-colors placeholder:text-darkpan-slate"
              />
            </div>
            <div className="flex items-center gap-2 bg-black border border-white/10 rounded-full px-3 py-1.5">
              <Filter className="w-3.5 h-3.5 text-darkpan-red" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none font-semibold cursor-pointer"
              >
                <option value="All" className="bg-darkpan-bg">All Status</option>
                <option value="Paid" className="bg-darkpan-bg">Paid</option>
                <option value="Pending" className="bg-darkpan-bg">Pending</option>
                <option value="Overdue" className="bg-darkpan-bg">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 text-darkpan-slate font-bold uppercase tracking-wider">
                <th className="pb-3 pl-4">Invoice</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredSales.map((item, idx) => (
                  <m.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-white/[0.02] group transition-colors"
                  >
                    <td className="py-4 pl-4 font-bold text-white tracking-wide">{item.id}</td>
                    <td className="py-4 text-darkpan-slate font-semibold">{item.date}</td>
                    <td className="py-4 font-semibold">{item.customer}</td>
                    <td className="py-4 font-bold text-white">${item.amount.toFixed(2)}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase inline-block ${
                          item.status === "Paid"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : item.status === "Pending"
                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            : "bg-darkpan-red/10 text-darkpan-red border border-darkpan-red/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <button aria-label="View invoice details" className="px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 hover:border-darkpan-red hover:bg-darkpan-red/10 transition-all duration-300">
                        Details
                      </button>
                    </td>
                  </m.tr>
                ))}
              </AnimatePresence>
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-darkpan-slate font-bold text-sm">
                    No transactions found match query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Widgets Section Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Messages Feed Widget */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex flex-col h-[380px]"
        >
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <h5 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-darkpan-red" />
              Incoming Messages
            </h5>
            <span className="text-[10px] bg-darkpan-red/10 border border-darkpan-red/20 text-darkpan-red font-bold px-2 py-0.5 rounded-full animate-pulse">
              Live
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {recentMessages.length === 0 ? (
              <div className="py-16 text-center text-darkpan-slate font-bold text-xs">
                No incoming messages.
              </div>
            ) : (
              recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  href="/dashboard/messages"
                  className="flex gap-3 hover:bg-white/[0.02] p-2.5 rounded-xl border border-transparent hover:border-white/5 transition-all text-left focus:outline-none cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-darkpan-red/10 border border-darkpan-red/20 flex items-center justify-center font-bold text-darkpan-red text-xs relative flex-shrink-0">
                    {msg.name.split(" ").map((n: string) => n[0]).join("")}
                    {msg.status === "unread" && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-darkpan-red rounded-full border border-darkpan-bg animate-pulse"></span>
                    )}
                  </div>
                  <div className="space-y-1 overflow-hidden flex-1">
                    <div className="flex justify-between w-full gap-2">
                      <p className="text-xs font-bold text-white leading-none truncate">{msg.name}</p>
                      <span className="text-[9px] text-darkpan-slate font-semibold flex-shrink-0">
                        {new Date(msg.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <p className="text-[10px] text-darkpan-red font-bold truncate leading-none mt-0.5">{msg.subject}</p>
                    <p className="text-[11px] text-darkpan-slate font-semibold leading-relaxed truncate">
                      {msg.message}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </m.div>

        {/* Custom Interactive Calendar Widget */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex flex-col h-[380px]"
        >
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <h5 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2">
              <Calendar className="w-5 h-5 text-darkpan-red" />
              Calendar
            </h5>
            <div className="flex gap-2">
              <button
                aria-label="Previous Month"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                className="w-6 h-6 rounded bg-black border border-white/5 flex items-center justify-center cursor-pointer text-white hover:bg-white/5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                aria-label="Next Month"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                className="w-6 h-6 rounded bg-black border border-white/5 flex items-center justify-center cursor-pointer text-white hover:bg-white/5"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-center font-bold text-xs text-white tracking-wide uppercase mb-3">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-darkpan-slate uppercase tracking-wider mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
              {/* Blank leading offsets */}
              {Array.from({ length: startDayOfWeek }).map((_, i) => (
                <div key={`offset-${i}`} className="w-8 h-8"></div>
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDay === day && currentDate.getMonth() === 4 && currentDate.getFullYear() === 2026;
                const isToday = day === 23 && currentDate.getMonth() === 4 && currentDate.getFullYear() === 2026;
                
                return (
                  <button
                    key={`day-${day}`}
                    aria-label={`Select ${day} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                    onClick={() => setSelectedDay(day)}
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? "bg-darkpan-red text-white shadow-[0_0_12px_#EB1616] font-bold border border-darkpan-red"
                        : isToday
                        ? "border border-darkpan-red text-darkpan-red font-bold bg-darkpan-red/5"
                        : "text-darkpan-slate hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </m.div>

        {/* To-Do Checklist Widget */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl flex flex-col h-[380px]"
        >
          <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
            <h5 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-darkpan-red" />
              Checklist Tasks
            </h5>
            <span className="text-[10px] text-darkpan-slate font-bold">
              {todos.filter((t) => t.completed).length}/{todos.length} Done
            </span>
          </div>

          {/* Add input */}
          <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add project task…"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="flex-1 bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl px-3 py-2 text-xs focus:outline-none transition-colors placeholder:text-darkpan-slate text-white"
            />
            <button
              type="submit"
              aria-label="Add Task"
              className="w-8 h-8 rounded-xl bg-darkpan-red hover:bg-darkpan-red/90 flex items-center justify-center cursor-pointer text-white shadow-[0_0_10px_rgba(235,22,22,0.2)] transition-colors flex-shrink-0 animate-pulse"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Checklist scrollable items */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            <AnimatePresence>
              {todos.map((todo) => (
                <m.div
                  key={todo.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black border border-white/5 group hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Toggle task ${todo.text}`}
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                        todo.completed
                          ? "bg-darkpan-red border-darkpan-red text-white"
                          : "border-white/20 hover:border-darkpan-red/50 text-transparent"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[4px]" />
                    </button>
                    <span className={`text-[11px] font-semibold transition-all ${
                      todo.completed ? "text-darkpan-slate line-through" : "text-white"
                    }`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Delete task ${todo.text}`}
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 text-darkpan-slate hover:text-darkpan-red transition-opacity cursor-pointer p-0.5 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </m.div>
              ))}
            </AnimatePresence>
            {todos.length === 0 && (
              <div className="py-8 text-center text-darkpan-slate font-bold text-xs">
                No active tasks. Good job!
              </div>
            )}
          </div>
        </m.div>
      </section>
    </div>
  );
}
