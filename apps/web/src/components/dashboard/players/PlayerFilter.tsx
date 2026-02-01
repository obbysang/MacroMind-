import React from 'react';

interface PlayerFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  onRoleFilter: () => void;
  onSort: () => void;
}

export const PlayerFilter: React.FC<PlayerFilterProps> = ({ 
  search, 
  onSearchChange,
  onRoleFilter,
  onSort 
}) => {
  return (
    <div className="flex gap-4 items-center bg-surface-dark p-4 rounded-lg border border-surface-border">
      <div className="relative flex-1 max-w-md">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9db0b9]">search</span>
        <input 
          type="text" 
          placeholder="Search player..." 
          className="w-full bg-background-dark border border-surface-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2 ml-auto">
        <button 
          onClick={onRoleFilter}
          className="px-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm font-medium hover:bg-surface-border transition-colors text-white"
        >
          Role
        </button>
        <button 
          onClick={onSort}
          className="px-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm font-medium hover:bg-surface-border transition-colors text-white"
        >
          Sort by Rating
        </button>
      </div>
    </div>
  );
};
