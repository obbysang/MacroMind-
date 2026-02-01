"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Match History", href: "/dashboard/matches", icon: "history" },
    { name: "Player Analysis", href: "/dashboard/players", icon: "person_search" },
    { name: "Scrim Tool", href: "/dashboard/scrims", icon: "swords" },
    { name: "Settings", href: "/dashboard/settings", icon: "settings" },
  ];

  return (
    <aside className="w-64 bg-[#111618] border-r border-surface-border flex flex-col justify-between shrink-0">
      <div className="flex flex-col gap-6 p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary text-3xl">smart_toy</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-lg font-bold leading-none tracking-tight">MacroMind</h1>
            <p className="text-[#9db0b9] text-xs font-normal">Esports AI Coach</p>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/dashboard");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                  isActive
                    ? "bg-[#283339]/50 border border-[#283339]"
                    : "text-[#9db0b9] hover:bg-[#283339]/30 hover:text-white border border-transparent"
                )}
              >
                <span
                  className={cn(
                    "material-symbols-outlined",
                    isActive ? "text-primary" : "text-[#9db0b9] group-hover:text-white"
                  )}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className={cn("text-sm font-medium", isActive ? "text-white" : "")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* User/Footer */}
      <div className="p-4 border-t border-surface-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border border-surface-border" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ10QVHIQQcI7awY5-99tzEuDNBlNeG0YmyQzBqsj4x3gYRN9RrWVUEM_IWQPYtOGKgIR9Oep1pQzQHjREp8U1JfewDc4dwIPMOzK358aFLYxjTNdJKHNnBUo3XnH1AnIw7NWCvY3eQkUE3ng6F3nRHnmBZawyOl2A1IcON55uTd8N6w321xjQyyJQ_4PTM08Nb3otk2nKx6wX-AaP0rbXO1GtV97xLBwD93ob2QElN1iYrPJCKCElT9H1oIVKfUX05e8SfZxFIE_c")' }}></div>
          <div className="flex flex-col min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.email || "Coach J. Smith"}</p>
            <p className="text-[#9db0b9] text-xs truncate">Head Coach • Cloud9</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 h-9 rounded-lg border border-surface-border hover:bg-[#283339] text-[#9db0b9] hover:text-white text-xs font-bold transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          Log Out
        </button>
      </div>
    </aside>
  );
}
