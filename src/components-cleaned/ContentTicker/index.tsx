'use client'

import styles from './styles.module.scss'
import useResizeObserverSsr from '@/hooks/useResizeObserverSsr'
import { EventPropsOf } from '@/types/global'
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

export interface ContentTickerProps extends EventPropsOf<'div'> {
  children: React.ReactNode
  startOffset?: string
  pixelsPerSecond?: number
  gradientMask?: boolean
  direction?: 'ltr' | 'rtl'
  gap?: React.CSSProperties['gap']
  className?: string
  pause?: boolean
}

export default function ContentTicker({
  children,
  startOffset,
  pixelsPerSecond = 30,
  gradientMask = false,
  direction = 'ltr',
  gap,
  className = '',
  pause = false,
  ...events
}: ContentTickerProps) {
  const groupRef = useRef<null | HTMLDivElement>(null)
  const [clonesNeeded, setClonesNeeded] = useState<number>(0)
  const [duration, setDuration] = useState(0)

  const handleResize = useCallback(() => {
    const group = groupRef?.current
    if (group) {
      const windowWidth = window.innerWidth
      const groupWidth = group.offsetWidth
      const needed =
        groupWidth < windowWidth ? Math.ceil(windowWidth / groupWidth) : 0
      const totalWidth =
        groupWidth && needed ? groupWidth * (needed + 1) : groupWidth
      setClonesNeeded(needed)
      setDuration(Math.round(totalWidth / pixelsPerSecond))
    } else {
      setClonesNeeded(0)
      setDuration(75) // fallback duration
    }
  }, [groupRef, pixelsPerSecond])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [children])

  useResizeObserverSsr(groupRef, handleResize)

  const isValidCloneRequirement = useMemo(() => {
    return clonesNeeded > 0 && Number.isFinite(clonesNeeded)
  }, [clonesNeeded])

  const isValidCloneRequirementAdditional = useMemo(() => {
    const needed = clonesNeeded + 1
    return needed > 0 && Number.isFinite(needed)
  }, [clonesNeeded])

  return (
    <div
      {...events}
      className={`flex overflow-hidden ${gradientMask ? styles.mask : ''} ${className}`}
      style={
        {
          '--carousel-offset': startOffset || '0%',
          '--carousel-duration': `${duration}s`,
          gap
        } as CSSProperties
      }>
      {/* Original slide group */}
      <SlideGroup direction={direction} pause={pause}>
        <div ref={groupRef} className='flex w-max' style={{ gap }}>
          {children}
        </div>

        {/* Clone items */}
        {isValidCloneRequirement &&
          Array(clonesNeeded)
            .fill(children)
            .map((clone, cloneIndex) => {
              return (
                <div key={cloneIndex} className='flex w-max' style={{ gap }}>
                  {clone}
                </div>
              )
            })}
      </SlideGroup>

      {/* Slide group */}
      <SlideGroup direction={direction} pause={pause}>
        {isValidCloneRequirementAdditional &&
          Array(clonesNeeded + 1)
            .fill(children)
            .map((clone, cloneIndex) => {
              return (
                <div key={cloneIndex} className='flex w-max' style={{ gap }}>
                  {clone}
                </div>
              )
            })}
      </SlideGroup>

      {/* Slide group */}
      <SlideGroup direction={direction} pause={pause}>
        {isValidCloneRequirementAdditional &&
          Array(clonesNeeded + 1)
            .fill(children)
            .map((clone, cloneIndex) => {
              return (
                <div key={cloneIndex} className='flex w-max gap-4'>
                  {clone}
                </div>
              )
            })}
      </SlideGroup>
    </div>
  )
}

function SlideGroup({
  children,
  direction,
  pause = false
}: {
  children: React.ReactNode
  direction: 'ltr' | 'rtl'
  pause: boolean
}) {
  return (
    <div
      className={`flex w-max ${styles.animated}`}
      style={{
        animationDirection: direction === 'rtl' ? 'reverse' : 'forwards',
        animationPlayState: pause ? 'paused' : 'running'
      }}>
      {children}
    </div>
  )
}
