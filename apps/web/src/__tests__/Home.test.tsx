import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders MacroMind heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /Master the Macro/i })
    expect(heading).toBeDefined()
  })
})
