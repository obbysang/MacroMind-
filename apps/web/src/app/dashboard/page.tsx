
import { StatCard } from "@/components/dashboard/StatCard";
import { InsightFeed } from "@/components/dashboard/InsightFeed";
import { StrategyRadar } from "@/components/dashboard/StrategyRadar";
import { Header } from "@/components/layout/Header";

export default function DashboardPage() {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
      <Header />
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-6">
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Win Rate (Last 20)"
              value="68%"
              subValue="(17-8)"
              trend="+5.0% vs Last Split"
              trendDirection="up"
              icon="emoji_events"
            />
            <StatCard
              title="Macro Efficiency Score"
              value="78.4%"
              trend="+2.4% (Trending Up)"
              trendDirection="up"
              icon="hub"
              iconColor="text-primary"
              isPrimary={true}
              progress={78.4}
            />
            <StatCard
              title="Objective Control Rate"
              value="62%"
              trend="-1.2% Drop in Herald Pri"
              trendDirection="down"
              icon="flag"
            />
          </div>
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[500px]">
            {/* Left Column: Causal Insight Feed (2/3 width) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  <h3 className="text-xl font-bold text-white">AI Causal Insights</h3>
                </div>
                <button className="text-xs text-primary font-bold hover:underline cursor-pointer">View All Analysis</button>
              </div>
              <InsightFeed />
            </div>
            
            {/* Right Column: Strategy Comparison Widget (1/3 width) */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Strategy Comparison
              </h3>
              <StrategyRadar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
