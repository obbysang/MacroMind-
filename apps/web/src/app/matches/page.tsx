
"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import Link from "next/link";
import { useState } from "react";

// Mock data for matches
const MATCH_DATA = [
  {
    id: "match-1",
    result: "Win",
    outcome: "Victory",
    team1: "T1",
    team2: "GEN.G",
    duration: "32:14",
    patch: "14.2",
    date: "Feb 24, 2024",
    tournament: "LCK Spring",
    href: "/matches/analysis",
  },
  {
    id: "match-2",
    result: "Loss",
    outcome: "Defeat",
    team1: "T1",
    team2: "HLE",
    duration: "41:05",
    patch: "14.2",
    date: "Feb 22, 2024",
    tournament: "LCK Spring",
    href: "#",
  },
  {
    id: "match-3",
    result: "Win",
    outcome: "Victory",
    team1: "T1",
    team2: "KT",
    duration: "28:45",
    patch: "14.1",
    date: "Feb 18, 2024",
    tournament: "LCK Spring",
    href: "#",
  },
];

export default function MatchHistory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMatches = MATCH_DATA.filter((match) => {
    const query = searchQuery.toLowerCase();
    return (
      match.team1.toLowerCase().includes(query) ||
      match.team2.toLowerCase().includes(query) ||
      match.patch.toLowerCase().includes(query) ||
      match.tournament.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex h-screen w-full bg-background-dark text-white font-display overflow-hidden antialiased">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="w-full bg-[#111618]/95 backdrop-blur z-10 border-b border-surface-border px-8 py-5 shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#9db0b9]">Dashboard</span>
                <span className="text-[#556975] material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-white font-medium">Match History</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Match History</h2>
              <p className="text-[#9db0b9] text-sm mt-1">Review past performances and analysis.</p>
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-6">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
            
            {/* Filter Bar */}
            <div className="flex gap-4 items-center bg-surface-dark p-4 rounded-lg border border-surface-border">
                <div className="relative flex-1 max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9db0b9]">search</span>
                    <input 
                      type="text" 
                      placeholder="Search by team, champion, or patch..." 
                      className="w-full bg-background-dark border border-surface-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search matches"
                    />
                </div>
                <div className="flex gap-2 ml-auto">
                    <button 
                      className="px-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm font-medium hover:bg-surface-border transition-colors cursor-pointer"
                      onClick={() => alert("Filter modal would open here")}
                    >
                      Filter
                    </button>
                    <button 
                      className="px-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm font-medium hover:bg-surface-border transition-colors cursor-pointer"
                      onClick={() => alert("Sort options would open here")}
                    >
                      Sort
                    </button>
                </div>
            </div>

            {/* Match List */}
            <div className="flex flex-col gap-4">
                {filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <Link 
                      key={match.id} 
                      href={match.href} 
                      className="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-surface-border hover:border-primary/50 transition-all group"
                    >
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center min-w-[60px]">
                                <span className="text-xs font-bold text-[#9db0b9] uppercase tracking-wider">{match.outcome}</span>
                                <span className={`font-bold text-lg ${match.result === 'Win' ? 'text-primary' : 'text-red-500'}`}>{match.result}</span>
                            </div>
                            <div className="h-10 w-px bg-white/5"></div>
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-3 w-[120px] justify-end">
                                    <span className="font-bold text-lg">{match.team1}</span>
                                    <div className="size-8 bg-white/10 rounded-full"></div>
                                </div>
                                <span className="text-[#9db0b9] font-medium">vs</span>
                                <div className="flex items-center gap-3 w-[120px]">
                                    <div className="size-8 bg-white/10 rounded-full"></div>
                                    <span className="font-bold text-lg">{match.team2}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-medium text-white">{match.duration}</span>
                                <span className="text-xs text-[#9db0b9]">Patch {match.patch}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-medium text-white">{match.date}</span>
                                <span className="text-xs text-[#9db0b9]">{match.tournament}</span>
                            </div>
                            <span className="material-symbols-outlined text-[#9db0b9] group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-10 text-[#9db0b9]">
                    No matches found matching &quot;{searchQuery}&quot;
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
