import React from 'react';
import { Player } from '@/lib/api/services';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="bg-surface-dark rounded-xl border border-surface-border p-6 hover:border-primary/50 transition-all cursor-pointer group">
      <div className="flex items-center gap-4 mb-6">
        <div className="size-16 rounded-full bg-white/10 border-2 border-primary/20 flex items-center justify-center">
            {/* Placeholder avatar or initial */}
            <span className="text-xl font-bold text-white">{player.name[0]}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{player.name}</h3>
          <p className="text-[#9db0b9] text-sm">{player.role} • {player.team}</p>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-2xl font-bold text-white">{player.rating}</span>
          <span className="text-xs text-[#9db0b9]">Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-background-dark rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white">{player.kda}</div>
          <div className="text-xs text-[#9db0b9]">KDA</div>
        </div>
        <div className="bg-background-dark rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white">{player.csm}</div>
          <div className="text-xs text-[#9db0b9]">CS/M</div>
        </div>
        <div className="bg-background-dark rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white">{player.kp}</div>
          <div className="text-xs text-[#9db0b9]">KP%</div>
        </div>
      </div>

      <div className="space-y-3">
        {player.stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#9db0b9]">{stat.label}</span>
              <span className="text-primary font-bold">{stat.value}/100</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-primary h-full transition-all duration-500" 
                style={{ width: `${stat.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
