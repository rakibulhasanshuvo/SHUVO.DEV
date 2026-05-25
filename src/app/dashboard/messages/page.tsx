"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Mail,
  MailOpen,
  Star,
  Trash2,
  Reply,
  Copy,
  Check,
  Search,
  Filter,
  Inbox,
  Send,
  Archive,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read" | "replied";
  starred: boolean;
  archived: boolean;
}

const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Johnathan Doe",
    email: "john.doe@techvibe.io",
    subject: "Custom E-Commerce Platform Query",
    message: "Hey Rakibul,\n\nI saw your stunning SHUVO.DEV portfolio and the Tier 3 custom interactive experiences. We are looking to rebuild our high-fidelity tech dashboard with interactive canvas animations and a local-first architecture. \n\nOur budget is around $15,000 - $20,000, and we'd love to schedule a dynamic consult call next week. Are you available on Tuesday or Wednesday afternoon?\n\nBest,\nJohn",
    date: "2026-05-24T14:32:00+06:00",
    status: "unread",
    starred: true,
    archived: false,
  },
  {
    id: "msg-2",
    name: "Sarah Connor",
    email: "sarah.c@cyberdyne.org",
    subject: "Portfolio Development & SEO Support",
    message: "Hello Shuvo,\n\nI was testing your portfolio speed and was absolutely blown away by the 0.0018s CLS and 700ms mobile FCP performance! We have a React Next.js application that is suffering from massive layout shifts and slow hydration times.\n\nCould you audit our repository and help us optimize the performance? Please let me know your hourly rate and availability.\n\nThanks,\nSarah",
    date: "2026-05-23T09:15:00+06:00",
    status: "read",
    starred: false,
    archived: false,
  },
  {
    id: "msg-3",
    name: "Bruce Wayne",
    email: "bwayne@wayneenterprise.com",
    subject: "Interactive Showcase App & Templates",
    message: "Rakibul,\n\nI need a secure, anonymous client portal dashboard built using Supabase and dynamic custom widgets. The design must be extremely premium, utilizing dark modes and subtle red/neon accents. \n\nI also want to license some of your portfolio design systems and zip templates under custom commercial terms. Let's arrange a secure encrypted meeting to finalize.\n\nWayne",
    date: "2026-05-22T23:10:00+06:00",
    status: "replied",
    starred: true,
    archived: false,
  }
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "starred" | "archived">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Load messages from localStorage or use defaults
  useEffect(() => {
    const cached = localStorage.getItem("darkpan_messages");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setMessages(parsed);
        if (parsed.length > 0) setSelectedId(parsed[0].id);
      } catch (e) {
        console.error(e);
        setMessages(DEFAULT_MESSAGES);
        if (DEFAULT_MESSAGES.length > 0) setSelectedId(DEFAULT_MESSAGES[0].id);
      }
    } else {
      setMessages(DEFAULT_MESSAGES);
      localStorage.setItem("darkpan_messages", JSON.stringify(DEFAULT_MESSAGES));
      if (DEFAULT_MESSAGES.length > 0) setSelectedId(DEFAULT_MESSAGES[0].id);
    }
  }, []);

  const saveMessages = (updated: ContactMessage[]) => {
    setMessages(updated);
    localStorage.setItem("darkpan_messages", JSON.stringify(updated));
  };

  const handleSelectMessage = (id: string) => {
    setSelectedId(id);
    // Mark as read if it was unread
    const updated = messages.map((m) => {
      if (m.id === id && m.status === "unread") {
        return { ...m, status: "read" as const };
      }
      return m;
    });
    saveMessages(updated);
    // Reset reply form
    setReplyText("");
    setSendSuccess(false);
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = messages.map((m) =>
      m.id === id ? { ...m, starred: !m.starred } : m
    );
    saveMessages(updated);
  };

  const toggleArchive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = messages.map((m) =>
      m.id === id ? { ...m, archived: !m.archived } : m
    );
    saveMessages(updated);
    
    // Auto-select another message if the archived one was selected
    if (selectedId === id) {
      const remaining = updated.filter(m => activeTab === "archived" ? m.archived : !m.archived);
      setSelectedId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const deleteMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = messages.filter((m) => m.id !== id);
    saveMessages(updated);
    
    if (selectedId === id) {
      setSelectedId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedId) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setReplyText("");

      // Update message status to "replied"
      const updated = messages.map((m) =>
        m.id === selectedId ? { ...m, status: "replied" as const } : m
      );
      saveMessages(updated);
    }, 1500);
  };

  // Filter criteria
  const filteredMessages = messages.filter((m) => {
    // Search
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase());

    // Tabs
    if (activeTab === "archived") return m.archived && matchesSearch;
    if (m.archived) return false; // Hide archived from other tabs

    if (activeTab === "unread") return m.status === "unread" && matchesSearch;
    if (activeTab === "starred") return m.starred && matchesSearch;
    return matchesSearch;
  });

  const activeMessage = messages.find((m) => m.id === selectedId);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cabinet font-black text-3xl tracking-tight text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-darkpan-red shadow-[0_0_15px_rgba(235,22,22,0.4)]" />
            Lead Inbox
          </h1>
          <p className="text-darkpan-slate text-sm font-medium mt-1">
            Read, manage, and respond to secure portfolio queries from Supabase.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-darkpan-slate">
          <span>Total: {messages.filter(m => !m.archived).length} leads</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
          <span className="text-darkpan-red font-extrabold">{messages.filter(m => m.status === "unread" && !m.archived).length} unread</span>
        </div>
      </div>

      {/* Main Mailbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-darkpan-bg border border-darkpan-red/10 rounded-2xl overflow-hidden shadow-2xl min-h-[600px]">
        {/* Thread Sidebar (4 cols) */}
        <div className="lg:col-span-5 border-r border-white/5 flex flex-col h-[650px] bg-black/20">
          {/* Sidebar Search */}
          <div className="p-4 border-b border-white/5 space-y-3 bg-black/40">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-darkpan-slate" />
              <input
                type="search"
                placeholder="Search inbox..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-white/10 focus:border-darkpan-red/40 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none transition-all placeholder:text-darkpan-slate"
              />
            </div>
            {/* Filter Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {(["all", "unread", "starred", "archived"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? "text-darkpan-red bg-darkpan-red/10 border-darkpan-red/20"
                      : "text-darkpan-slate border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* List of Messages */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            <AnimatePresence initial={false}>
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-darkpan-slate space-y-2">
                  <Inbox className="w-12 h-12 mx-auto text-white/5" />
                  <p className="text-xs font-semibold">No messages found in this folder</p>
                </div>
              ) : (
                filteredMessages.map((msg) => {
                  const isSelected = msg.id === selectedId;
                  return (
                    <m.div
                      key={msg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => handleSelectMessage(msg.id)}
                      className={`p-4 cursor-pointer transition-all duration-300 flex flex-col gap-2 relative ${
                        isSelected
                          ? "bg-white/5 border-l-2 border-darkpan-red"
                          : "hover:bg-white/5 border-l-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${msg.status === "unread" ? "text-white" : "text-darkpan-slate"}`}>
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-darkpan-slate">
                          {new Date(msg.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs truncate ${msg.status === "unread" ? "text-white font-extrabold" : "text-darkpan-slate font-medium"}`}>
                          {msg.subject}
                        </p>
                        {msg.status === "unread" && (
                          <span className="w-2 h-2 rounded-full bg-darkpan-red flex-shrink-0 animate-pulse"></span>
                        )}
                      </div>
                      <p className="text-[11px] text-darkpan-slate truncate line-clamp-2">
                        {msg.message}
                      </p>
                      {/* Sub-actions floating row */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1.5">
                          {msg.status === "replied" && (
                            <span className="text-xs font-extrabold uppercase tracking-wide bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">
                              Replied
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleStar(msg.id, e)}
                            className={`p-1 rounded hover:bg-white/10 transition-colors ${
                              msg.starred ? "text-amber-500" : "text-darkpan-slate hover:text-white"
                            }`}
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>
                          <button
                            onClick={(e) => toggleArchive(msg.id, e)}
                            className="p-1 rounded hover:bg-white/10 text-darkpan-slate hover:text-white transition-colors"
                            title={msg.archived ? "Unarchive" : "Archive"}
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => deleteMessage(msg.id, e)}
                            className="p-1 rounded hover:bg-darkpan-red/20 text-darkpan-slate hover:text-darkpan-red transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </m.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Thread Details Panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-[650px]">
          <AnimatePresence mode="wait">
            {!activeMessage ? (
              <div className="flex-1 flex items-center justify-center text-darkpan-slate text-xs font-semibold p-8">
                Select a message thread from the column list to inspect details.
              </div>
            ) : (
              <m.div
                key={activeMessage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {/* Detail Header */}
                <div className="p-6 border-b border-white/5 bg-black/40 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-cabinet font-bold text-lg text-white">
                        {activeMessage.subject}
                      </h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-darkpan-slate">From:</span>
                        <span className="text-xs font-bold text-white">{activeMessage.name}</span>
                        <span className="text-xs text-darkpan-slate">({activeMessage.email})</span>
                        <button
                          onClick={() => handleCopyEmail(activeMessage.email)}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-darkpan-slate hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedEmail ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    {/* Top Action controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleStar(activeMessage.id, e)}
                        className={`p-2 rounded-xl border border-white/10 bg-black hover:bg-white/5 transition-colors cursor-pointer ${
                          activeMessage.starred ? "text-amber-500" : "text-white"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={(e) => toggleArchive(activeMessage.id, e)}
                        className="p-2 rounded-xl border border-white/10 bg-black hover:bg-white/5 text-white transition-colors cursor-pointer"
                        title={activeMessage.archived ? "Unarchive" : "Archive"}
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => deleteMessage(activeMessage.id, e)}
                        className="p-2 rounded-xl border border-white/10 bg-black hover:bg-darkpan-red/10 hover:border-darkpan-red/20 text-white hover:text-darkpan-red transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-darkpan-slate">
                    <span>
                      Received: {new Date(activeMessage.date).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        activeMessage.status === "replied"
                          ? "bg-emerald-500"
                          : activeMessage.status === "read"
                          ? "bg-darkpan-slate"
                          : "bg-darkpan-red"
                      }`}></span>
                      Status: {activeMessage.status}
                    </span>
                  </div>
                </div>

                {/* Mail Text Content */}
                <div className="flex-1 p-6 overflow-y-auto bg-black/10 text-sm leading-relaxed text-darkpan-slate whitespace-pre-wrap font-medium">
                  {activeMessage.message}
                </div>

                {/* Reply Composer Section */}
                <div className="p-6 border-t border-white/5 bg-black/40">
                  {sendSuccess ? (
                    <m.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-3"
                    >
                      <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </span>
                      <div>
                        <p>Reply dispatched successfully!</p>
                        <p className="text-[10px] text-emerald-400/70 font-medium mt-0.5">Mock email sent to {activeMessage.email} via lead dispatcher webhook.</p>
                      </div>
                    </m.div>
                  ) : (
                    <form onSubmit={handleSendReply} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs uppercase font-extrabold tracking-wider text-darkpan-slate flex items-center gap-2">
                          <Reply className="w-3.5 h-3.5 text-darkpan-red" />
                          Draft Quick Response
                        </label>
                        <span className="text-[10px] text-darkpan-slate">Replying as Rakibul Shuvo</span>
                      </div>
                      <div className="relative">
                        <textarea
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Type a premium reply to ${activeMessage.name}…`}
                          className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-darkpan-slate focus:border-darkpan-red/40 focus:outline-none transition-all resize-none"
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSending || !replyText.trim()}
                          className="px-4 py-2.5 rounded-xl bg-darkpan-red text-white hover:bg-red-700 transition-colors text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(235,22,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isSending ? (
                            <>
                              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                              Sending…
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              Send Dispatch
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
