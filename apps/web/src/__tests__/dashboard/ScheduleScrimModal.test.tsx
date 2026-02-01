import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ScheduleScrimModal } from '../../components/dashboard/ScheduleScrimModal'
import { ScrimService } from '../../lib/api/services'

vi.mock('../../lib/api/services', () => ({
  ScrimService: {
    schedule: vi.fn(),
  },
}))

describe('ScheduleScrimModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSuccess: vi.fn(),
  }

  it('renders correctly when open', () => {
    render(<ScheduleScrimModal {...defaultProps} />)
    expect(screen.getByText('Schedule New Scrim')).toBeDefined()
    expect(screen.getByPlaceholderText('e.g. Team Liquid')).toBeDefined()
  })

  it('does not render when closed', () => {
    render(<ScheduleScrimModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByText('Schedule New Scrim')).toBeNull()
  })

  it('submits form with correct data', async () => {
    (ScrimService.schedule as any).mockResolvedValue({})
    render(<ScheduleScrimModal {...defaultProps} />)

    fireEvent.change(screen.getByPlaceholderText('e.g. Team Liquid'), { target: { value: 'T1' } })
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-03-01' } })
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '14:00' } })
    fireEvent.change(screen.getByPlaceholderText('Focus areas, restrictions, etc.'), { target: { value: 'Early game' } })

    fireEvent.click(screen.getByText('Schedule Scrim'))

    await waitFor(() => {
      expect(ScrimService.schedule).toHaveBeenCalledWith({
        team_name: 'T1',
        date: expect.stringContaining('2024-03-01T14:00'),
        notes: 'Early game',
      })
      expect(defaultProps.onSuccess).toHaveBeenCalled()
      expect(defaultProps.onClose).toHaveBeenCalled()
    })
  })

  it('displays error message on failure', async () => {
    (ScrimService.schedule as any).mockRejectedValue(new Error('Scheduling failed'))
    render(<ScheduleScrimModal {...defaultProps} />)

    fireEvent.change(screen.getByPlaceholderText('e.g. Team Liquid'), { target: { value: 'T1' } })
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-03-01' } })
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '14:00' } })
    
    fireEvent.click(screen.getByText('Schedule Scrim'))

    await waitFor(() => {
      expect(screen.getByText('Scheduling failed')).toBeDefined()
    })
  })
})
