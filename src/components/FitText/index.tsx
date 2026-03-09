import { useCallback, useEffect, useRef } from 'react'

export interface FitTextProps {
  minFontSize: number
  maxFontSize: number
  children: React.ReactNode
  className?: string
}

export default function FitText({
  minFontSize,
  maxFontSize,
  children,
  className = ''
}: FitTextProps) {
  const ref = useRef<null | HTMLDivElement>(null)

  const resize = useCallback(() => {
    const element = ref.current
    if (!element) return

    let low = minFontSize
    let high = maxFontSize
    let fontSize

    while (low <= high) {
      fontSize = Math.floor((low + high) / 2)
      element.style.fontSize = `${fontSize}px`

      if (element.scrollWidth > element.clientWidth) {
        high = fontSize - 1 // Text is too wide, decrease size
      } else {
        low = fontSize + 1 // Text fits, try increasing size
      }
    }

    element.style.fontSize = `${high}px`
  }, [ref, minFontSize, maxFontSize])

  // Attach resize events on mount
  useEffect(() => {
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)

    // On mount
    resize()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
