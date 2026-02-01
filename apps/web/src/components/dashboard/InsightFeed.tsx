"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { InsightService, type InsightItem } from "../../lib/api/services";

export function InsightFeed() {
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await InsightService.getAll();
        setInsights(data);
      } catch (err) {
        console.error("Failed to fetch insights:", err);
        setError("Failed to load insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      if (filterRole !== "All" && item.role !== filterRole) return false;
      if (filterType !== "All" && item.type !== filterType.toLowerCase()) return false;
      return true;
    });
  }, [insights, filterRole, filterType]);

  const uniqueRoles = useMemo(() => {
    const roles = new Set(insights.map((i) => i.role));
    return ["All", ...Array.from(roles)];
  }, [insights]);

  const types = ["All", "Positive", "Negative", "Neutral"];

  if (loading) {
    return (
      <div className="bg-surface-dark border border-surface-border rounded-xl flex flex-col h-[400px] animate-pulse">
        <div className="px-5 py-3 bg-[#1a2126] border-b border-surface-border h-10"></div>
        <div className="flex-1 p-5 space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                    <div className="w-20 h-8 bg-surface-border/30 rounded"></div>
                    <div className="flex-1 h-12 bg-surface-border/30 rounded"></div>
                    <div className="w-32 h-10 bg-surface-border/30 rounded"></div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
      return (
          <div className="bg-surface-dark border border-surface-border rounded-xl p-8 text-center">
              <span className="material-symbols-outlined text-warning text-4xl mb-2">warning</span>
              <p className="text-[#9db0b9]">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[#283339] hover:bg-[#3b4b54] rounded text-sm text-white transition-colors"
              >
                Retry
              </button>
          </div>
      )
  }

  return (
    <div className="bg-surface-dark border border-surface-border rounded-xl flex flex-col overflow-hidden">
      {/* Filters Toolbar */}
      <div className="px-5 py-3 border-b border-surface-border flex gap-3 bg-[#1a2126]/50">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="bg-[#283339] text-white text-sm border border-surface-border rounded px-2 py-1 focus:outline-none focus:border-primary"
          aria-label="Filter by role"
        >
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>
              {role === "All" ? "All Roles" : role}
            </option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-[#283339] text-white text-sm border border-surface-border rounded px-2 py-1 focus:outline-none focus:border-primary"
          aria-label="Filter by impact"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type === "All" ? "All Impacts" : type}
            </option>
          ))}
        </select>
      </div>

      {/* Feed Header */}
      <div className="px-5 py-3 bg-[#1a2126] border-b border-surface-border flex text-xs font-medium text-[#9db0b9] uppercase tracking-wider">
        <div className="w-20">Time</div>
        <div className="flex-1">Event & Analysis</div>
        <div className="w-32 text-right">Macro Impact</div>
        <div className="w-10"></div>
      </div>
      {/* Feed Items */}
      <div className="divide-y divide-surface-border">
        {filteredInsights.length === 0 ? (
          <div className="px-5 py-8 text-center text-[#9db0b9] text-sm">
            No insights found matching your filters.
          </div>
        ) : (
          filteredInsights.map((item) => (
            <div
              key={item.id}
            role="button"
            tabIndex={0}
            className="px-5 py-4 hover:bg-[#283339]/20 transition-colors group flex items-start gap-4 cursor-pointer focus:outline-none focus:bg-[#283339]/30"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    // Navigate to details or expand
                }
            }}
          >
            <div className="w-20 pt-1">
              <span className="text-white font-mono text-sm">{item.time}</span>
              <div className="text-[10px] text-[#9db0b9] mt-0.5">{item.game}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#283339] text-[#9db0b9] text-[10px] px-1.5 py-0.5 rounded border border-[#3b4b54]">
                  {item.role}
                </span>
                <span className="text-white font-bold text-sm">{item.title}</span>
              </div>
              <p className="text-[#9db0b9] text-sm leading-snug">{item.description}</p>
            </div>
            <div className="w-32 text-right pt-1">
              <span
                className={`font-bold text-sm ${
                  item.type === "positive"
                    ? "text-success"
                    : item.type === "negative"
                    ? "text-warning"
                    : "text-white"
                }`}
              >
                {item.impactValue}
              </span>
              <div className="text-[10px] text-[#9db0b9]">{item.impactLabel}</div>
            </div>
            <div className="w-10 flex justify-end items-center">
              <button 
                className="text-[#9db0b9] hover:text-white p-1 rounded hover:bg-[#283339] focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label={`Play replay for ${item.title}`}
                onClick={(e) => {
                    e.stopPropagation();
                    // Play replay logic
                }}
              >
                <span className="material-symbols-outlined text-xl">play_circle</span>
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
