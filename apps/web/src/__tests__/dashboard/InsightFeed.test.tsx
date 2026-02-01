import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { InsightFeed } from '../../components/dashboard/InsightFeed'
import { InsightService } from '../../lib/api/services'

// Mock the InsightService
vi.mock('../../lib/api/services', () => ({
  InsightService: {
    getAll: vi.fn(),
  },
}))

describe('InsightFeed', () => {
  const mockInsights = [
    {
      id: "1",
      time: "14:32",
      game: "Game 3",
      role: "Jungle",
      title: "Overextension Top Lane",
      description: "Jungler showed on vision top side...",
      impactValue: "-15% Pressure",
      impactLabel: "Map Control",
      type: "negative" as const,
    },
    {
      id: "2",
      time: "15:45",
      game: "Game 3",
      role: "Mid",
      title: "Solo Kill",
      description: "Mid laner solo killed opponent...",
      impactValue: "+10% Gold",
      impactLabel: "Economy",
      type: "positive" as const,
    },
    {
      id: "3",
      time: "18:20",
      game: "Game 3",
      role: "Support",
      title: "Vision Control",
      description: "Deep vision established...",
      impactValue: "0%",
      impactLabel: "Vision",
      type: "neutral" as const,
    },
  ]

  it('renders insights after loading', async () => {
    (InsightService.getAll as any).mockResolvedValue(mockInsights)

    render(<InsightFeed />)

    // Wait for items to appear
    await waitFor(() => {
        expect(screen.getByText('Overextension Top Lane')).toBeDefined()
        expect(screen.getByText('Solo Kill')).toBeDefined()
    })
    
    expect(screen.getByText('14:32')).toBeDefined()
  })

  it('renders error state when fetch fails', async () => {
    (InsightService.getAll as any).mockRejectedValue(new Error('Failed to fetch'))

    render(<InsightFeed />)

    await waitFor(() => {
        expect(screen.getByText('Failed to load insights. Please try again later.')).toBeDefined()
    })
  })

  it('filters insights by role', async () => {
    (InsightService.getAll as any).mockResolvedValue(mockInsights)

    render(<InsightFeed />)

    await waitFor(() => {
      expect(screen.getByText('Overextension Top Lane')).toBeDefined()
    })

    // Filter by Role: Mid
    const roleSelect = screen.getByLabelText('Filter by role')
    fireEvent.change(roleSelect, { target: { value: 'Mid' } })

    expect(screen.getByText('Solo Kill')).toBeDefined()
    expect(screen.queryByText('Overextension Top Lane')).toBeNull()
    expect(screen.queryByText('Vision Control')).toBeNull()
    
    // Reset to All
    fireEvent.change(roleSelect, { target: { value: 'All' } })
    expect(screen.getByText('Overextension Top Lane')).toBeDefined()
  })

  it('filters insights by impact type', async () => {
    (InsightService.getAll as any).mockResolvedValue(mockInsights)

    render(<InsightFeed />)

    await waitFor(() => {
      expect(screen.getByText('Overextension Top Lane')).toBeDefined()
    })

    // Filter by Type: Positive
    const typeSelect = screen.getByLabelText('Filter by impact')
    fireEvent.change(typeSelect, { target: { value: 'Positive' } })

    expect(screen.getByText('Solo Kill')).toBeDefined()
    expect(screen.queryByText('Overextension Top Lane')).toBeNull() // Negative
    expect(screen.queryByText('Vision Control')).toBeNull() // Neutral
  })

  it('shows no results message when filters match nothing', async () => {
    (InsightService.getAll as any).mockResolvedValue(mockInsights)

    render(<InsightFeed />)

    await waitFor(() => {
      expect(screen.getByText('Overextension Top Lane')).toBeDefined()
    })

    // Filter by Role: Jungle (exists) AND Type: Positive (doesn't exist for Jungle)
    const roleSelect = screen.getByLabelText('Filter by role')
    fireEvent.change(roleSelect, { target: { value: 'Jungle' } })
    
    const typeSelect = screen.getByLabelText('Filter by impact')
    fireEvent.change(typeSelect, { target: { value: 'Positive' } })

    expect(screen.getByText('No insights found matching your filters.')).toBeDefined()
    expect(screen.queryByText('Overextension Top Lane')).toBeNull()
    expect(screen.queryByText('Solo Kill')).toBeNull()
  })
})
