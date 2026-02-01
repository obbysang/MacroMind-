import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UploadReplayModal } from '../../components/dashboard/UploadReplayModal'
import { MatchService } from '../../lib/api/services'

vi.mock('../../lib/api/services', () => ({
  MatchService: {
    upload: vi.fn(),
  },
}))

describe('UploadReplayModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSuccess: vi.fn(),
  }

  it('renders correctly when open', () => {
    render(<UploadReplayModal {...defaultProps} />)
    expect(screen.getByText('Upload Replay')).toBeDefined()
    expect(screen.getByText('Click to upload or drag and drop')).toBeDefined()
  })

  it('disables submit button initially', () => {
    render(<UploadReplayModal {...defaultProps} />)
    expect(screen.getByText('Upload Replay').closest('button')).toBeDisabled()
  })

  it('uploads file successfully', async () => {
    (MatchService.upload as any).mockResolvedValue({})
    render(<UploadReplayModal {...defaultProps} />)
    
    const file = new File(['dummy content'], 'replay.rofl', { type: 'application/octet-stream' })
    const input = screen.getByLabelText('Replay file')
    
    fireEvent.change(input, { target: { files: [file] } })
    
    expect(screen.getByText('replay.rofl')).toBeDefined()
    
    const submitBtn = screen.getByText('Upload Replay').closest('button')
    expect(submitBtn).not.toBeDisabled()
    
    fireEvent.click(submitBtn!)
    
    await waitFor(() => {
      expect(MatchService.upload).toHaveBeenCalled()
      expect(defaultProps.onSuccess).toHaveBeenCalled()
    })
  })

  it('displays error message on failure', async () => {
    (MatchService.upload as any).mockRejectedValue(new Error('Upload failed'))
    render(<UploadReplayModal {...defaultProps} />)
    
    const file = new File(['dummy content'], 'replay.rofl', { type: 'application/octet-stream' })
    const input = screen.getByLabelText('Replay file')
    fireEvent.change(input, { target: { files: [file] } })
    
    const submitBtn = screen.getByText('Upload Replay').closest('button')
    fireEvent.click(submitBtn!)

    await waitFor(() => {
      expect(screen.getByText('Upload failed')).toBeDefined()
    })
  })
})
