import { render, screen, fireEvent } from '@testing-library/react';
import { PlayerFilter } from '@/components/dashboard/players/PlayerFilter';
import { vi, describe, it, expect } from 'vitest';

describe('PlayerFilter', () => {
  it('renders search input and buttons', () => {
    const onSearchChange = vi.fn();
    const onRoleFilter = vi.fn();
    const onSort = vi.fn();

    render(
      <PlayerFilter 
        search="" 
        onSearchChange={onSearchChange} 
        onRoleFilter={onRoleFilter} 
        onSort={onSort} 
      />
    );

    expect(screen.getByPlaceholderText('Search player...')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Sort by Rating')).toBeInTheDocument();
  });

  it('calls onSearchChange when input changes', () => {
    const onSearchChange = vi.fn();
    render(
      <PlayerFilter 
        search="" 
        onSearchChange={onSearchChange} 
        onRoleFilter={() => {}} 
        onSort={() => {}} 
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Search player...'), { target: { value: 'Faker' } });
    expect(onSearchChange).toHaveBeenCalledWith('Faker');
  });
});
