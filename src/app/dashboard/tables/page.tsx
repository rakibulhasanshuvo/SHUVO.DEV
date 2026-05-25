"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, Search, ChevronLeft, ChevronRight, UserMinus, UserCheck, ShieldAlert } from "lucide-react";

// Mock Database Items
const initialUsers = [
  { id: 1, name: "Muhammad Rakibul", email: "rakibul@shuvo.dev", role: "Owner/Admin", status: "Active", date: "Jan 12, 2026" },
  { id: 2, name: "Sarah Connor", email: "sarah@connor.net", role: "Editor", status: "Active", date: "Feb 05, 2026" },
  { id: 3, name: "John Doe", email: "john@doe.com", role: "Viewer", status: "Inactive", date: "Mar 18, 2026" },
  { id: 4, name: "Bruce Wayne", email: "bruce@gotham.co", role: "Editor", status: "Suspended", date: "Apr 01, 2026" },
  { id: 5, name: "Tony Stark", email: "tony@stark.industries", role: "Editor", status: "Active", date: "Apr 15, 2026" },
  { id: 6, name: "Peter Parker", email: "peter@dailybugle.com", role: "Viewer", status: "Active", date: "May 10, 2026" },
  { id: 7, name: "Clark Kent", email: "clark@dailyplanet.com", role: "Viewer", status: "Inactive", date: "May 20, 2026" },
];

export default function TablesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(initialUsers);
  
  // Pagination Mock
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleToggleStatus = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "Active" ? "Inactive" : u.status === "Inactive" ? "Active" : "Active";
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // Filter & Search Logic
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination slicing
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="font-cabinet font-black text-3xl tracking-tight text-white">
          Admin Tables
        </h1>
        <p className="text-darkpan-slate text-sm font-medium mt-1">
          A showcase of custom tabular structures, filterable database rows, and paginations.
        </p>
      </div>

      {/* 1. Database Table Card */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-darkpan-bg border border-darkpan-red/10 rounded-2xl p-6 shadow-2xl space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h5 className="font-cabinet font-extrabold text-base tracking-wide flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-darkpan-red" />
            Registered Administrative Nodes
          </h5>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-darkpan-slate" />
            <input
              type="text"
              placeholder="Search nodes by query…"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              className="bg-black border border-white/10 focus:border-darkpan-red/40 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none text-white w-56 transition-colors placeholder:text-darkpan-slate font-semibold"
            />
          </div>
        </div>

        {/* Custom Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 text-darkpan-slate font-bold uppercase tracking-wider">
                <th className="pb-3 pl-4">Node Profile</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date Added</th>
                <th className="pb-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {paginatedUsers.map((user, idx) => (
                  <m.tr
                    key={user.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-white/[0.01] transition-colors group"
                  >
                    <td className="py-4 pl-4">
                      <div>
                        <p className="font-bold text-white leading-tight">{user.name}</p>
                        <p className="text-[10px] text-darkpan-slate font-medium mt-0.5">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 font-semibold text-white/95">{user.role}</td>
                    <td className="py-4">
                      <span
                        onClick={() => handleToggleStatus(user.id)}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase inline-block border cursor-pointer select-none transition-all ${
                          user.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                            : user.status === "Inactive"
                            ? "bg-darkpan-slate/15 text-darkpan-slate border-darkpan-slate/20 hover:bg-darkpan-slate/30"
                            : "bg-darkpan-red/10 text-darkpan-red border-darkpan-red/20"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 text-darkpan-slate font-semibold">{user.date}</td>
                    <td className="py-4 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle Status Check */}
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="p-1.5 rounded-lg bg-black hover:bg-white/5 border border-white/5 text-darkpan-slate hover:text-white cursor-pointer transition-colors"
                          title="Toggle Status"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-lg bg-black hover:bg-darkpan-red/10 border border-white/5 hover:border-darkpan-red/20 text-darkpan-slate hover:text-darkpan-red cursor-pointer transition-colors"
                          title="Remove Node"
                        >
                          <UserMinus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </m.tr>
                ))}
              </AnimatePresence>
              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-darkpan-slate font-bold text-sm">
                    No administrative nodes match the query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination Footer */}
        {totalPages > 1 && (
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-darkpan-slate font-bold uppercase tracking-wider">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={`w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center text-white cursor-pointer ${
                  currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/5"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={`w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center text-white cursor-pointer ${
                  currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-white/5"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </m.div>
    </div>
  );
}
