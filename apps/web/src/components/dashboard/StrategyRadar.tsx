interface StrategyData {
    label: string;
    value: number; // 0-100
}

interface StrategyRadarProps {
    currentStats?: StrategyData[];
    optimalStats?: StrategyData[];
}

export function StrategyRadar({ 
    currentStats = [
        { label: "Vision", value: 92 },
        { label: "Mechanics", value: 88 },
        { label: "Economy", value: 65 },
        { label: "Objective", value: 50 },
        { label: "Aggression", value: 30 },
        { label: "Rotations", value: 20 },
    ],
    optimalStats = [
        { label: "Vision", value: 85 },
        { label: "Mechanics", value: 85 },
        { label: "Economy", value: 85 },
        { label: "Objective", value: 85 },
        { label: "Aggression", value: 85 },
        { label: "Rotations", value: 85 },
    ]
}: StrategyRadarProps) {
  return (
    <div className="bg-surface-dark border border-surface-border rounded-xl p-6 flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center text-xs mb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-primary"></div>
          <span className="text-white">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#9db0b9]"></div>
          <span className="text-[#9db0b9]">Optimal Baseline</span>
        </div>
      </div>
      {/* Simulated Radar Chart using SVG */}
      <div className="relative w-full aspect-square max-w-[280px] mx-auto">
        <svg 
            className="w-full h-full" 
            viewBox="0 0 100 100"
            role="img"
            aria-label="Strategy Radar Chart comparing current performance vs optimal baseline"
        >
          <title>Strategy Radar Chart</title>
          {/* Grid Background */}
          <polygon className="radar-chart-bg" opacity="0.2" points="50,10 90,35 90,75 50,90 10,75 10,35"></polygon>
          <polygon className="radar-chart-bg" opacity="0.2" points="50,25 75,40 75,65 50,75 25,65 25,40"></polygon>
          <line stroke="#283339" x1="50" x2="50" y1="50" y2="10"></line>
          <line stroke="#283339" x1="50" x2="90" y1="50" y2="35"></line>
          <line stroke="#283339" x1="50" x2="90" y1="50" y2="75"></line>
          <line stroke="#283339" x1="50" x2="50" y1="50" y2="90"></line>
          <line stroke="#283339" x1="50" x2="10" y1="50" y2="75"></line>
          <line stroke="#283339" x1="50" x2="10" y1="50" y2="35"></line>
          {/* Optimal Shape (Grey) - Simplified for demo, would need math for dynamic */}
          <polygon className="radar-chart-optimal" points="50,15 85,38 85,72 50,85 15,72 15,38" fill="none" stroke="#9db0b9" strokeWidth="1"></polygon>
          {/* Current Shape (Blue) - Simplified for demo */}
          {/* Vision high, Aggression mid, Eco high */}
          <polygon className="radar-chart-current" points="50,20 88,36 65,65 50,70 30,65 20,45" fill="rgba(19, 164, 236, 0.2)" stroke="#13a4ec" strokeWidth="2"></polygon>
          {/* Points for Current */}
          <circle cx="50" cy="20" fill="#13a4ec" r="1.5"></circle>
          <circle cx="88" cy="36" fill="#13a4ec" r="1.5"></circle>
          <circle cx="65" cy="65" fill="#13a4ec" r="1.5"></circle>
          <circle cx="50" cy="70" fill="#13a4ec" r="1.5"></circle>
          <circle cx="30" cy="65" fill="#13a4ec" r="1.5"></circle>
          <circle cx="20" cy="45" fill="#13a4ec" r="1.5"></circle>
          {/* Labels */}
          <text fill="#9db0b9" fontSize="4" textAnchor="middle" x="50" y="7">Vision</text>
          <text fill="#9db0b9" fontSize="4" textAnchor="start" x="94" y="35">Mechanics</text>
          <text fill="#9db0b9" fontSize="4" textAnchor="start" x="94" y="78">Economy</text>
          <text fill="#9db0b9" fontSize="4" textAnchor="middle" x="50" y="96">Objective</text>
          <text fill="#9db0b9" fontSize="4" textAnchor="end" x="6" y="78">Aggression</text>
          <text fill="#9db0b9" fontSize="4" textAnchor="end" x="6" y="35">Rotations</text>
        </svg>
      </div>
      {/* Detailed Breakdown */}
      <div className="flex flex-col gap-3 mt-2">
        {currentStats.slice(0, 2).map((stat) => (
             <div key={stat.label}>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-[#9db0b9]">{stat.label} Control</span>
                    <span className="text-white font-mono">{stat.value}/100</span>
                </div>
                <div className="w-full bg-[#283339] h-1 rounded-full mt-1">
                    <div 
                        className={`h-full rounded-full ${stat.value < 70 ? 'bg-warning' : 'bg-primary'}`} 
                        style={{ width: `${stat.value}%` }}
                    ></div>
                </div>
             </div>
        ))}
        
        <p className="text-xs text-[#9db0b9] mt-2 italic">
          *Team is underperforming in economy generation vs baseline.
        </p>
      </div>
    </div>
  );
}
