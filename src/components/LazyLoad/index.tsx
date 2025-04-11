import { useEffect, useRef, useState } from 'react'

export interface LazyLoadProps {
  children: React.ReactNode
  onLoad?: () => void
}

export default function LazyLoad({ onLoad, children }: LazyLoadProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === container && entry.isIntersecting) {
            setLoaded(true)
          }
        })
      })

      observer.observe(container)

      return () => {
        observer.disconnect()
      }
    }
  }, [containerRef])

  useEffect(() => {
    if (loaded && onLoad) onLoad()
  }, [loaded])

  return <div ref={containerRef}>{loaded && children}</div>
}
