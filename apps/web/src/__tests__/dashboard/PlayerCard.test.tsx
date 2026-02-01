import { render, screen } from '@testing-library/react';
import { PlayerCard } from '@/components/dashboard/players/PlayerCard';
import { Player } from '@/lib/api/services';
import { describe, it, expect } from 'vitest';

const mockPlayer: Player = {
  id: 1,
  name: 'TestPlayer',
  role: 'Mid',
  team: 'TestTeam',
  rating: 'S',
  kda: 5.0,
  csm: 10.0,
  kp: '70%',
  stats: [
    { label: 'Roaming', value: 90 },
    { label: 'Macro', value: 95 },
  ],
};

describe('PlayerCard', () => {
  it('renders player information correctly', () => {
    render(<PlayerCard player={mockPlayer} />);
    
    expect(screen.getByText('TestPlayer')).toBeInTheDocument();
    expect(screen.getByText(/Mid • TestTeam/)).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // KDA
    expect(screen.getByText('10')).toBeInTheDocument(); // CSM
    expect(screen.getByText('70%')).toBeInTheDocument(); // KP
  });

  it('renders stats bars correctly', () => {
    render(<PlayerCard player={mockPlayer} />);
    
    expect(screen.getByText('Roaming')).toBeInTheDocument();
    expect(screen.getByText('90/100')).toBeInTheDocument();
    expect(screen.getByText('Macro')).toBeInTheDocument();
    expect(screen.getByText('95/100')).toBeInTheDocument();
  });
});
