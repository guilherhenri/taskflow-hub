import { act, renderHook } from '@testing-library/react'
import type { Mock } from 'vitest'

import { useIsMobile } from './use-mobile'

describe('useIsMobile', () => {
  const MOBILE_WIDTH = 767
  const DESKTOP_WIDTH = 768

  let matchMediaMock: Mock
  let originalInnerWidth: number

  beforeEach(() => {
    originalInnerWidth = window.innerWidth
    matchMediaMock = vi.fn()

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock.mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    })
    vi.clearAllMocks()
  })

  it('should return true when window width is below mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: MOBILE_WIDTH,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('should return false when window width is at or above mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: DESKTOP_WIDTH,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('should update isMobile when window size changes', () => {
    let handler: () => void
    matchMediaMock.mockReturnValue({
      matches: false,
      media: `(max-width: ${767}px)`,
      addEventListener: vi.fn().mockImplementation((_, cb) => {
        handler = cb
      }),
      removeEventListener: vi.fn(),
    })

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: DESKTOP_WIDTH,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    Object.defineProperty(window, 'innerWidth', {
      value: MOBILE_WIDTH,
    })

    act(() => {
      handler!()
    })

    expect(result.current).toBe(true)
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListener = vi.fn()
    matchMediaMock.mockReturnValue({
      matches: false,
      media: `(max-width: ${767}px)`,
      addEventListener: vi.fn(),
      removeEventListener,
    })

    const { unmount } = renderHook(() => useIsMobile())
    unmount()
    expect(removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    )
  })
})
