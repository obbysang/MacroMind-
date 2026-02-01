"use client";

import { useState, useEffect, useCallback } from "react";
import { ScheduleScrimModal } from "@/components/dashboard/ScheduleScrimModal";
import { ScrimService, Scrim } from "@/lib/api/services";

export default function ScrimTool() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [upcomingScrims, setUpcomingScrims] = useState<Scrim[]>([]);
  const [historyScrims, setHistoryScrims] = useState<Scrim[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScrim, setEditingScrim] = useState<Scrim | null>(null);

  const fetchScrims = useCallback(async () => {
    setLoading(true);
    try {
      const [upcoming, history] = await Promise.all([
        ScrimService.getAll(true),
        ScrimService.getAll(false),
      ]);
      setUpcomingScrims(upcoming);
      setHistoryScrims(history);
    } catch (error) {
      console.error("Failed to fetch scrims:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScrims();
  }, [fetchScrims]);

  const handleEdit = (scrim: Scrim) => {
    setEditingScrim(scrim);
    setIsScheduleModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to cancel/delete this scrim?")) return;
    try {
      await ScrimService.delete(id);
      fetchScrims();
    } catch (error) {
      console.error("Failed to delete scrim:", error);
      alert("Failed to delete scrim");
    }
  };

  const handleModalClose = () => {
    setIsScheduleModalOpen(false);
    setEditingScrim(null);
  };

  const handleModalSuccess = () => {
    fetchScrims();
  };

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
                
                {loading ? (
                    <div className="text-[#9db0b9]">Loading upcoming scrims...</div>
                ) : upcomingScrims.length === 0 ? (
                    <div className="text-[#9db0b9] italic">No upcoming scrims scheduled.</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {upcomingScrims.map((scrim) => (
                            <div key={scrim.id} className="bg-surface-dark border border-surface-border rounded-xl p-6 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-white">vs {scrim.team_name}</span>
                                        <span className="text-[#9db0b9] text-sm">
                                            {new Date(scrim.date).toLocaleString([], { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase ${scrim.is_confirmed ? 'bg-primary/10 text-primary border-primary/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                        {scrim.is_confirmed ? 'Confirmed' : 'Pending'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[#9db0b9]">
                                    {scrim.notes && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">notes</span> {scrim.notes}</span>}
                                </div>
                                <div className="mt-2 flex gap-2">
                                     <button 
                                        onClick={() => handleEdit(scrim)}
                                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-colors border border-white/5"
                                     >
                                        Edit Details
                                     </button>
                                     <button 
                                        onClick={() => handleDelete(scrim.id)}
                                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-[#9db0b9] transition-colors border border-white/5"
                                     >
                                        Cancel
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Past Scrims Table */}
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">history</span>
                        Scrim History
                    </h3>
                    {/* <button className="text-sm text-primary hover:text-primary-light font-bold">View All</button> */}
                </div>

                <div className="bg-surface-dark border border-surface-border rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-background-dark border-b border-surface-border text-[#9db0b9] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Opponent</th>
                                {/* <th className="p-4 font-medium">Result</th> */}
                                <th className="p-4 font-medium">Notes</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-border">
                            {loading ? (
                                <tr><td colSpan={5} className="p-4 text-center text-[#9db0b9]">Loading history...</td></tr>
                            ) : historyScrims.length === 0 ? (
                                <tr><td colSpan={5} className="p-4 text-center text-[#9db0b9]">No scrim history found.</td></tr>
                            ) : (
                                historyScrims.map((scrim) => (
                                    <tr key={scrim.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-sm font-medium text-white">
                                            {new Date(scrim.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-sm text-[#9db0b9] group-hover:text-white">{scrim.team_name}</td>
                                        {/* <td className="p-4 text-sm"><span className="text-primary font-bold">4 - 1</span></td> */}
                                        <td className="p-4 text-sm text-[#9db0b9]">{scrim.notes}</td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => handleEdit(scrim)}
                                                className="text-primary hover:underline text-sm font-bold mr-4"
                                            >
                                                Edit
                                            </button>
                                             <button 
                                                onClick={() => handleDelete(scrim.id)}
                                                className="text-[#9db0b9] hover:underline text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

          </div>
        </div>

        <ScheduleScrimModal 
            isOpen={isScheduleModalOpen} 
            onClose={handleModalClose}
            onSuccess={handleModalSuccess}
            initialData={editingScrim}
        />
    </main>
  );
}
