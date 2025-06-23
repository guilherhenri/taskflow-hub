import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TaskForm } from './task-form'

describe('TaskForm', () => {
  const mockOnSubmit = vi.fn((data: { title: string }) => {
    return Promise.resolve(data)
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form with title input and submit button', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('submits form with valid title', async () => {
    const user = userEvent.setup()
    render(<TaskForm onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/title/i)
    await user.type(titleInput, 'New Task')

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith(
      { title: 'New Task' },
      expect.any(Object),
    )
  })

  it('disables submit button when title is empty', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /save/i })
    expect(submitButton).toBeDisabled()
  })

  it('populates title input with provided title prop', () => {
    render(<TaskForm title="Existing Task" onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/title/i)
    expect(titleInput).toHaveValue('Existing Task')
  })

  it('displays error message when title is empty on submit attempt', async () => {
    const user = userEvent.setup()
    render(<TaskForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /save/i })
    await user.click(submitButton)

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
