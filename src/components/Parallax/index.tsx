import { useCallback, useEffect, useRef } from 'react'

export interface ParallaxProps {
  className?: string
  children: React.ReactNode
  speed: number
  direction?: 'up' | 'down'
}

export default function Parallax({
  className = '',
  children,
  speed,
  direction = 'down'
}: ParallaxProps) {
  const elRef = useRef<null | HTMLDivElement>(null)

  const scrollHanlder = useCallback(() => {
    const el = elRef.current
    if (!el) return

    const scrollTop = window.scrollY
    const translateY = Math.max(0, scrollTop / speed)
    el.style.transform = `translateY(${direction === 'up' ? 0 - translateY : translateY}px)`
  }, [elRef, speed, direction])

  useEffect(() => {
    scrollHanlder()
    window.addEventListener('scroll', scrollHanlder)
    return () => {
      window.removeEventListener('scroll', scrollHanlder)
    }
  }, [scrollHanlder])

  return (
    <div className={className} ref={elRef}>
      {children}
    </div>
  )
}
