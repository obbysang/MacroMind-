import Link from "next/link";

export function Header() {
  return (
    <header className="w-full bg-[#111618]/95 backdrop-blur z-10 border-b border-surface-border px-8 py-5 shrink-0">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#9db0b9]">Dashboard</span>
            <span className="text-[#556975] material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-white font-medium">Overview</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Coach Command Center</h2>
          <p className="text-[#9db0b9] text-sm mt-1">Real-time analysis of team micro-actions and macro outcomes.</p>
        </div>
        <div className="flex gap-3 items-center">
          <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-[#283339] hover:bg-[#344148] text-white text-sm font-bold border border-[#3b4b54] transition-colors cursor-pointer">
            <span className="material-symbols-outlined mr-2 text-lg">calendar_today</span>
            Schedule Scrim
          </button>
          <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-[0_0_15px_rgba(19,164,236,0.3)] transition-all cursor-pointer">
            <span className="material-symbols-outlined mr-2 text-lg">upload_file</span>
            Upload Replay
          </button>
        </div>
      </div>
      {/* Context Filters */}
      <div className="flex gap-3 mt-6">
        <button className="flex h-8 items-center justify-center gap-x-2 rounded-lg bg-[#283339] border border-[#3b4b54] pl-3 pr-2 hover:border-primary/50 transition-colors cursor-pointer">
          <span className="text-white text-xs font-medium">Last 5 Matches</span>
          <span className="material-symbols-outlined text-[#9db0b9] text-base">arrow_drop_down</span>
        </button>
        <button className="flex h-8 items-center justify-center gap-x-2 rounded-lg bg-[#283339] border border-[#3b4b54] pl-3 pr-2 hover:border-primary/50 transition-colors cursor-pointer">
          <span className="text-white text-xs font-medium">Patch 14.1</span>
          <span className="material-symbols-outlined text-[#9db0b9] text-base">arrow_drop_down</span>
        </button>
        <button className="flex h-8 items-center justify-center gap-x-2 rounded-lg bg-[#283339] border border-[#3b4b54] pl-3 pr-2 hover:border-primary/50 transition-colors cursor-pointer">
          <span className="text-white text-xs font-medium">vs Team Liquid</span>
          <span className="material-symbols-outlined text-[#9db0b9] text-base">close</span>
        </button>
      </div>
    </header>
  );
}
