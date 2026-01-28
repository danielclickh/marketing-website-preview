'use client'

import useResizeObserverSsr from '@/hooks/useResizeObserverSsr'
import { useEffect, useRef, useState } from 'react'

export interface ResizeEvent {
  width: number
  height: number
  scale: number
  scaledWidth: number
  scaledHeight: number
}

export interface ScaleToContainerProps {
  children: React.ReactNode
  overflow?: boolean
  scaleDown?: boolean
  scaleUp?: boolean
  className?: React.HTMLProps<HTMLDivElement>['className']
  onResize?: (event: ResizeEvent) => void
  hideUntilReady?: boolean
}

export default function ScaleToContainer({
  children,
  className = '',
  scaleUp = true,
  scaleDown = true,
  overflow = true,
  onResize,
  hideUntilReady = true
}: ScaleToContainerProps) {
  const outerRef = useRef<null | HTMLDivElement>(null)
  const innerRef = useRef<null | HTMLDivElement>(null)
  const childRef = useRef<null | HTMLElement>(null)
  const [ready, setReady] = useState<boolean>(false)

  const calculateNewSizes = () => {
    const inner = innerRef.current
    const outer = outerRef.current
    const child = childRef.current

    if (inner && outer && child) {
      const { offsetWidth: childWidth, offsetHeight: childHeight } = child
      let scale = outer.offsetWidth / childWidth

      if ((!scaleUp && scale > 1) || (!scaleDown && scale < 1)) {
        scale = 1
      }

      inner.style.aspectRatio = `${childWidth}/${childHeight}`
      inner.style.transform = `scale(${scale})`
      outer.style.height = `${childHeight * scale}px`

      if (onResize) {
        onResize({
          width: childWidth,
          height: childHeight,
          scale,
          scaledWidth: childWidth * scale,
          scaledHeight: childHeight * scale
        })
      }

      if (!ready) setReady(true)
    }
  }

  // Mutation observer to detect child content changes
  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    // Initial child
    childRef.current = inner.firstElementChild as HTMLElement

    // Update child ref when children change
    const observer = new MutationObserver(() => {
      childRef.current = inner.firstElementChild as HTMLElement
    })

    observer.observe(inner, {
      childList: true,
      subtree: false
    })

    return () => observer.disconnect()
  }, [innerRef])

  useEffect(calculateNewSizes, [])
  useEffect(calculateNewSizes, [childRef])

  // On container resizes
  useResizeObserverSsr(outerRef, calculateNewSizes)
  useResizeObserverSsr(childRef, calculateNewSizes)

  const conditionalClasses = [
    overflow ? '' : 'overflow-hidden',
    scaleUp ? '' : 'max-w-max',
    hideUntilReady && !ready ? 'opacity-0' : ''
  ]
    .filter((val) => val.trim().length > 0)
    .join(' ')

  return (
    <div
      ref={outerRef}
      className={`w-full transition-opacity ${conditionalClasses} ${className}`}>
      <div ref={innerRef} className='origin-top-left'>
        {children}
      </div>
    </div>
  )
}
