import * as React from 'react'

export interface AnimatedDataPathProps {
  /** SVG path `d` for the track + animated line */
  d: string
  /** Motion direction along the path */
  direction?: 'forward' | 'backward'
  /**
   * Keyframes describing how the visible segment changes length over time.
   * Values are RELATIVE to the path length (not pixels). So 1 == full path.
   */
  keyframes?: Array<{ startSize: number; endSize: number; duration: number }>
  /** seconds, applied at the start of every loop as a hold */
  delay?: number
  strokeWidth?: number
  trackColor?: string
  lineColor?: string
  /** Props for the animated line path */
  lineProps?: Omit<
    React.SVGProps<SVGPathElement>,
    'd' | 'strokeWidth' | 'stroke' | 'pathLength'
  >
  /** Props for the background track path */
  trackProps?: Omit<
    React.SVGProps<SVGPathElement>,
    'd' | 'strokeWidth' | 'stroke' | 'pathLength'
  >
  /** overall svg attributes */
  width?: number | string
  height?: number | string
  className?: string
}

export default function AnimatedDataPath({
  d,
  direction = 'forward',
  keyframes,
  delay = 0,
  strokeWidth = 3,
  trackColor = '#414141',
  lineColor = '#FAFF69',
  lineProps = {},
  trackProps = {},
  width,
  height,
  className = ''
}: AnimatedDataPathProps) {
  // Normalise everything to a fixed pathLength so we can use numbers (not %).
  const BASE = 1000

  // Defaults (relative to path length)
  keyframes = keyframes || [
    { startSize: 1, endSize: 1, duration: 1.75 },
    { startSize: 0.5, endSize: 1, duration: 2 },
    { startSize: 1, endSize: 1, duration: 2 }
  ]

  const round = (val: number) => parseFloat(val.toFixed(3))
  const toUnits = (fraction: number) => round(fraction * BASE)

  const kfDuration = keyframes.reduce((sum, kf) => sum + kf.duration, 0)
  const totalDuration = kfDuration + Math.max(0, delay)

  const keyTimes: number[] = [0]

  // Initial state
  const firstLen = toUnits(keyframes[0].startSize)
  const firstStart = -firstLen

  // Internal arrays (units in BASE space)
  let starts: number[] = [firstStart] // S positions along the path
  let lens: number[] = [firstLen] // L visible length

  // Optional initial hold
  if (delay > 0) {
    const holdT = round(delay / totalDuration)
    keyTimes.push(holdT)
    starts.push(starts[0])
    lens.push(lens[0])
  }

  let elapsed = Math.max(0, delay)
  let cursor = starts[0] // current start position S

  keyframes.forEach((kf, index, all) => {
    const startPx = toUnits(kf.startSize)
    const endPx = toUnits(kf.endSize)

    // Advance along the path
    const travel = startPx + endPx
    cursor = cursor + (direction === 'forward' ? travel : -travel)

    elapsed += kf.duration
    const t = round(elapsed / totalDuration)

    // End of this segment: length becomes endPx
    starts.push(cursor)
    lens.push(endPx)
    keyTimes.push(t)

    // Instant reset at the SAME time to the next start length
    const nextStartSize = all[index + 1]?.startSize ?? keyframes![0].startSize // <-- seamless fallback
    const nextLen = toUnits(nextStartSize)
    const nextStart =
      direction === 'forward' ? cursor - nextLen : cursor + nextLen

    starts.push(nextStart)
    lens.push(nextLen)
    keyTimes.push(t)

    cursor = nextStart
  })

  // Ensure loop boundary is seamless:
  // - keyTimes must end at exactly 1
  // - final values must equal the initial state
  keyTimes[keyTimes.length - 1] = 1
  starts[starts.length - 1] = firstStart
  lens[lens.length - 1] = firstLen

  // Convert S (start position) to dashoffset; SVG wraps automatically
  const dashOffsets = starts.map((s) => round(BASE - s))
  const dashArrays = lens.map((l) => `${round(l)} ${BASE}`)

  // SMIL lists (semicolon-separated)
  const offsetValues = dashOffsets.join(';')
  const arrayValues = dashArrays.join(';')
  const times = keyTimes.join(';')

  // Safer SVG props: only set a viewBox if width/height are numeric
  const svgProps: React.SVGProps<SVGSVGElement> = {
    xmlns: 'http://www.w3.org/2000/svg',
    width,
    height,
    className
  }
  if (typeof width === 'number' && typeof height === 'number') {
    svgProps.viewBox = `0 0 ${width} ${height}`
  }

  return (
    <svg {...svgProps}>
      <path
        d={d}
        strokeWidth={strokeWidth}
        stroke={trackColor}
        fill='none'
        pathLength={BASE}
        {...trackProps}
      />
      <path
        d={d}
        strokeWidth={strokeWidth}
        stroke={lineColor}
        fill='none'
        pathLength={BASE}
        // Initial state
        strokeDasharray={`${firstLen} ${BASE}`}
        strokeDashoffset={round(BASE - firstStart)}
        {...lineProps}>
        <animate
          attributeName='stroke-dasharray'
          values={arrayValues}
          keyTimes={times}
          dur={`${round(totalDuration)}s`}
          repeatCount='indefinite'
        />
        <animate
          attributeName='stroke-dashoffset'
          values={offsetValues}
          keyTimes={times}
          dur={`${round(totalDuration)}s`}
          repeatCount='indefinite'
        />
      </path>
    </svg>
  )
}
