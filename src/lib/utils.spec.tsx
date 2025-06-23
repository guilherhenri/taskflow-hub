import { render, screen } from '@testing-library/react'

import { cn } from './utils'

describe('cn utility function', () => {
  it('combines multiple class strings correctly', () => {
    const classes = cn('text-red-500', 'font-bold')
    render(<div className={classes} data-testid="test-element" />)

    expect(screen.getByTestId('test-element')).toHaveClass(
      'text-red-500',
      'font-bold',
    )
  })

  it('handles conditional classes using object syntax', () => {
    const isActive = true
    const classes = cn('text-blue-500', { 'bg-gray-200': isActive })
    render(<div className={classes} data-testid="test-element" />)

    expect(screen.getByTestId('test-element')).toHaveClass(
      'text-blue-500',
      'bg-gray-200',
    )
  })

  it('resolves Tailwind class conflicts using twMerge', () => {
    const classes = cn('p-4', 'p-2')
    render(<div className={classes} data-testid="test-element" />)

    expect(screen.getByTestId('test-element')).toHaveClass('p-2')
    expect(screen.getByTestId('test-element')).not.toHaveClass('p-4')
  })

  it('handles arrays of classes', () => {
    const classes = cn(['text-green-500', 'hover:underline'], 'italic')
    render(<div className={classes} data-testid="test-element" />)

    expect(screen.getByTestId('test-element')).toHaveClass(
      'text-green-500',
      'hover:underline',
      'italic',
    )
  })

  it('returns empty string when no classes are provided', () => {
    const classes = cn()
    render(<div className={classes} data-testid="test-element" />)

    expect(screen.getByTestId('test-element')).toHaveAttribute('class', '')
  })
})
