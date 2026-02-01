interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
  icon: string;
  iconColor?: string;
  isPrimary?: boolean;
  progress?: number;
}

export function StatCard({
  title,
  value,
  subValue,
  trend,
  trendDirection,
  icon,
  iconColor = "text-white",
  isPrimary = false,
  progress,
}: StatCardProps) {
  const trendColor = trendDirection === "up" ? "text-success bg-success/10" : "text-warning bg-warning/10";
  const trendIcon = trendDirection === "up" ? "trending_up" : "trending_down";

  return (
    <div 
      className={`bg-surface-dark border ${isPrimary ? 'border-primary/30 shadow-[0_0_20px_rgba(19,164,236,0.05)]' : 'border-surface-border'} rounded-xl p-5 relative overflow-hidden group`}
      role="region"
      aria-label={`${title} Statistics`}
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 ${!isPrimary && 'group-hover:opacity-20 transition-opacity'}`}>
        <span className={`material-symbols-outlined text-6xl ${iconColor}`} aria-hidden="true">{icon}</span>
      </div>
      <div className="flex justify-between items-start mb-2">
        <p className="text-[#9db0b9] text-sm font-medium">{title}</p>
        {isPrimary && (
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#13a4ec]" aria-hidden="true"></span>
        )}
      </div>
      <div className="flex items-baseline gap-3">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        {subValue && <span className="text-base text-[#9db0b9] font-normal">{subValue}</span>}
      </div>
      <div 
        className={`flex items-center mt-3 gap-1 ${isPrimary ? 'text-primary bg-primary/10' : trendColor} w-fit px-2 py-1 rounded text-xs font-bold`}
        aria-label={`Trend: ${trendDirection} ${trend}`}
      >
        <span className="material-symbols-outlined text-sm" aria-hidden="true">{trendIcon}</span>
        {trend}
      </div>
      {progress !== undefined && (
        <div 
            className="w-full bg-[#283339] h-1.5 rounded-full mt-4 overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${title} progress`}
        >
          <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}
