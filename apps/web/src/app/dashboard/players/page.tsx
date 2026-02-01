
export default function PlayerAnalysis() {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
      <header className="w-full bg-[#111618]/95 backdrop-blur z-10 border-b border-surface-border px-8 py-5 shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#9db0b9]">Dashboard</span>
                <span className="text-[#556975] material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-white font-medium">Players</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Player Analysis</h2>
              <p className="text-[#9db0b9] text-sm mt-1">Individual performance metrics and coaching insights.</p>
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
                    <input type="text" placeholder="Search player..." className="w-full bg-background-dark border border-surface-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary" />
                </div>
                <div className="flex gap-2 ml-auto">
                    <button className="px-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm font-medium hover:bg-surface-border transition-colors">Role</button>
                    <button className="px-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm font-medium hover:bg-surface-border transition-colors">Sort by Rating</button>
                </div>
            </div>

            {/* Player Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Player Card 1 */}
                <div className="bg-surface-dark rounded-xl border border-surface-border p-6 hover:border-primary/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-16 rounded-full bg-white/10 border-2 border-primary/20"></div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Zeus</h3>
                            <p className="text-[#9db0b9] text-sm">Top Lane • T1</p>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                            <span className="text-2xl font-bold text-white">S+</span>
                            <span className="text-xs text-[#9db0b9]">Rating</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">4.2</div>
                            <div className="text-xs text-[#9db0b9]">KDA</div>
                        </div>
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">8.4</div>
                            <div className="text-xs text-[#9db0b9]">CS/M</div>
                        </div>
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">62%</div>
                            <div className="text-xs text-[#9db0b9]">KP%</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#9db0b9]">Laning Phase</span>
                            <span className="text-primary font-bold">94/100</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[94%]"></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm mt-2">
                            <span className="text-[#9db0b9]">Teamfighting</span>
                            <span className="text-primary font-bold">88/100</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[88%]"></div>
                        </div>
                    </div>
                </div>

                {/* Player Card 2 */}
                <div className="bg-surface-dark rounded-xl border border-surface-border p-6 hover:border-primary/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-16 rounded-full bg-white/10 border-2 border-primary/20"></div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Oner</h3>
                            <p className="text-[#9db0b9] text-sm">Jungle • T1</p>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                            <span className="text-2xl font-bold text-white">A</span>
                            <span className="text-xs text-[#9db0b9]">Rating</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">3.8</div>
                            <div className="text-xs text-[#9db0b9]">KDA</div>
                        </div>
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">5.2</div>
                            <div className="text-xs text-[#9db0b9]">CS/M</div>
                        </div>
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">71%</div>
                            <div className="text-xs text-[#9db0b9]">KP%</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#9db0b9]">Pathing Efficiency</span>
                            <span className="text-primary font-bold">82/100</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[82%]"></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm mt-2">
                            <span className="text-[#9db0b9]">Objective Control</span>
                            <span className="text-primary font-bold">89/100</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[89%]"></div>
                        </div>
                    </div>
                </div>

                {/* Player Card 3 */}
                <div className="bg-surface-dark rounded-xl border border-surface-border p-6 hover:border-primary/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-16 rounded-full bg-white/10 border-2 border-primary/20"></div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Faker</h3>
                            <p className="text-[#9db0b9] text-sm">Mid Lane • T1</p>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                            <span className="text-2xl font-bold text-white">S</span>
                            <span className="text-xs text-[#9db0b9]">Rating</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">5.1</div>
                            <div className="text-xs text-[#9db0b9]">KDA</div>
                        </div>
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">9.1</div>
                            <div className="text-xs text-[#9db0b9]">CS/M</div>
                        </div>
                        <div className="bg-background-dark rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white">68%</div>
                            <div className="text-xs text-[#9db0b9]">KP%</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#9db0b9]">Roaming</span>
                            <span className="text-primary font-bold">91/100</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[91%]"></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm mt-2">
                            <span className="text-[#9db0b9]">Macro Decision</span>
                            <span className="text-primary font-bold">98/100</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[98%]"></div>
                        </div>
                    </div>
                </div>

            </div>
          </div>
        </div>
    </main>
  );
}
