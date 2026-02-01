"use client";

import { useState } from "react";
import { ScheduleScrimModal } from "@/components/dashboard/ScheduleScrimModal";

export default function ScrimTool() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
      <header className="w-full bg-[#111618]/95 backdrop-blur z-10 border-b border-surface-border px-8 py-5 shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#9db0b9]">Dashboard</span>
                <span className="text-[#556975] material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-white font-medium">Scrim Tool</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Scrim Management</h2>
              <p className="text-[#9db0b9] text-sm mt-1">Schedule and analyze practice blocks.</p>
            </div>
            <button 
                onClick={() => setIsScheduleModalOpen(true)}
                className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-[0_0_15px_rgba(19,164,236,0.3)] transition-all cursor-pointer"
            >
                <span className="material-symbols-outlined mr-2 text-lg">add</span>
                New Scrim Block
            </button>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-6">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
            
            {/* Upcoming Scrims */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                    Upcoming Blocks
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Block 1 */}
                    <div className="bg-surface-dark border border-surface-border rounded-xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white">vs Team Liquid</span>
                                <span className="text-[#9db0b9] text-sm">Today, 2:00 PM - 5:00 PM</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase">Confirmed</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#9db0b9]">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">sports_esports</span> 5 Games</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">dns</span> Tournament Realm</span>
                        </div>
                        <div className="mt-2 flex gap-2">
                             <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-colors border border-white/5">View Lobby</button>
                             <button className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-sm font-bold text-primary transition-colors border border-primary/20">Pre-Game Notes</button>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="bg-surface-dark border border-surface-border rounded-xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white">vs FlyQuest</span>
                                <span className="text-[#9db0b9] text-sm">Tomorrow, 2:00 PM - 5:00 PM</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold uppercase">Pending</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#9db0b9]">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">sports_esports</span> 5 Games</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">dns</span> Tournament Realm</span>
                        </div>
                         <div className="mt-2 flex gap-2">
                             <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-colors border border-white/5">Edit Details</button>
                             <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-[#9db0b9] transition-colors border border-white/5">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Past Scrims Table */}
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">history</span>
                        Scrim History
                    </h3>
                    <button className="text-sm text-primary hover:text-primary-light font-bold">View All</button>
                </div>

                <div className="bg-surface-dark border border-surface-border rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-background-dark border-b border-surface-border text-[#9db0b9] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Opponent</th>
                                <th className="p-4 font-medium">Result</th>
                                <th className="p-4 font-medium">Focus</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-border">
                            <tr className="group hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-white">Feb 23, 2024</td>
                                <td className="p-4 text-sm text-[#9db0b9] group-hover:text-white">Cloud9</td>
                                <td className="p-4 text-sm"><span className="text-primary font-bold">4 - 1</span></td>
                                <td className="p-4 text-sm text-[#9db0b9]">Early Game Aggression</td>
                                <td className="p-4 text-right">
                                    <button className="text-primary hover:underline text-sm font-bold">Analysis</button>
                                </td>
                            </tr>
                            <tr className="group hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-white">Feb 22, 2024</td>
                                <td className="p-4 text-sm text-[#9db0b9] group-hover:text-white">NRG</td>
                                <td className="p-4 text-sm"><span className="text-yellow-500 font-bold">3 - 2</span></td>
                                <td className="p-4 text-sm text-[#9db0b9]">Baron Setup</td>
                                <td className="p-4 text-right">
                                    <button className="text-primary hover:underline text-sm font-bold">Analysis</button>
                                </td>
                            </tr>
                            <tr className="group hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm font-medium text-white">Feb 21, 2024</td>
                                <td className="p-4 text-sm text-[#9db0b9] group-hover:text-white">100 Thieves</td>
                                <td className="p-4 text-sm"><span className="text-red-500 font-bold">1 - 4</span></td>
                                <td className="p-4 text-sm text-[#9db0b9]">Teamfighting</td>
                                <td className="p-4 text-right">
                                    <button className="text-primary hover:underline text-sm font-bold">Analysis</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

          </div>
        </div>

        <ScheduleScrimModal 
            isOpen={isScheduleModalOpen} 
            onClose={() => setIsScheduleModalOpen(false)}
            onSuccess={() => {
                // Ideally refresh list here
                console.log("Scrim scheduled");
            }}
        />
    </main>
  );
}
