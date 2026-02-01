'use client';

import React, { useEffect, useState } from 'react';
import { PlayerService, Player } from '@/lib/api/services';
import { PlayerCard } from '@/components/dashboard/players/PlayerCard';
import { PlayerFilter } from '@/components/dashboard/players/PlayerFilter';

export default function PlayerAnalysis() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const data = await PlayerService.getAll();
        setPlayers(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch players:', err);
        setError('Failed to load players. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(search.toLowerCase()) ||
    player.role.toLowerCase().includes(search.toLowerCase()) ||
    player.team.toLowerCase().includes(search.toLowerCase())
  );

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
             <PlayerFilter 
                search={search}
                onSearchChange={setSearch}
                onRoleFilter={() => {}} // To be implemented
                onSort={() => {}} // To be implemented
             />

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-center">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-surface-dark h-[300px] rounded-xl animate-pulse border border-surface-border"></div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredPlayers.length === 0 && (
                <div className="text-center py-12 text-[#9db0b9]">
                    No players found matching your search.
                </div>
            )}

            {/* Player Grid */}
            {!loading && !error && filteredPlayers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlayers.map((player) => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
            )}
          </div>
        </div>
    </main>
  );
}
