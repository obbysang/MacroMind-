import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatCard } from '../../components/dashboard/StatCard'

describe('StatCard', () => {
  const defaultProps = {
    title: 'Win Rate',
    value: '68%',
    trend: '+5%',
    trendDirection: 'up' as const,
    icon: 'emoji_events',
  }

  it('renders title and value', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByText('Win Rate')).toBeDefined()
    expect(screen.getByText('68%')).toBeDefined()
  })

  it('renders trend information', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByText('+5%')).toBeDefined()
    expect(screen.getByText('trending_up')).toBeDefined()
  })

  it('applies primary styles when isPrimary is true', () => {
    const { container } = render(<StatCard {...defaultProps} isPrimary={true} />)
    // Check if the container has the border-primary/30 class
    expect(container.firstChild).toHaveClass('border-primary/30')
  })

  it('renders progress bar when progress prop is provided', () => {
    render(<StatCard {...defaultProps} progress={75} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeDefined()
    expect(progressBar.getAttribute('aria-valuenow')).toBe('75')
  })

  it('has accessible role and label', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByRole('region', { name: 'Win Rate Statistics' })).toBeDefined()
  })
})
