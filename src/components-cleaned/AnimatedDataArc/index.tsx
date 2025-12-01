type Directions =
  | 'to-bottom-right'
  | 'to-bottom-left'
  | 'to-top-right'
  | 'to-top-left'

export interface AnimatedDataArcProps {
  direction: Directions
  className?: string
  duration?: number
  width?: number
  height?: number
  strokeWidth?: number
  radius?: number
}

export default function AnimatedDataArc({
  direction,
  className,
  duration = 5.75,
  width = 100,
  height = 100,
  strokeWidth = 3,
  radius = 25
}: AnimatedDataArcProps) {
  // Keep the stroke inside the bounds
  const inset = strokeWidth / 2

  // Clamp radius so it never exceeds available space
  const r = Math.min(radius, width / 2 - inset, height / 2 - inset)

  /**
   * Each corner path:
   * Start at one edge -> corner vertical/horizontal line -> quarter arc -> long horizontal/vertical -> exit
   */
  const paths: Record<Directions, string> = {
    'to-bottom-right': `
      M ${inset} ${inset}
      V ${height - r - inset}
      A ${r} ${r} 0 0 0 ${r + inset} ${height - inset}
      H ${width - inset}
    `,
    'to-bottom-left': `
      M ${width - inset} ${inset}
      V ${height - r - inset}
      A ${r} ${r} 0 0 1 ${width - r - inset} ${height - inset}
      H ${inset}
    `,
    'to-top-right': `
      M ${inset} ${height - inset}
      V ${r + inset}
      A ${r} ${r} 0 0 1 ${r + inset} ${inset}
      H ${width - inset}
    `,
    'to-top-left': `
      M ${width - inset} ${height - inset}
      V ${r + inset}
      A ${r} ${r} 0 0 0 ${width - r - inset} ${inset}
      H ${inset}
    `
  }

  const d = paths[direction].replace(/\s+/g, ' ').trim()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}>
      <path
        fill='none'
        stroke='#414141'
        strokeWidth={strokeWidth}
        d={d}
        pathLength='1000'
      />
      <path
        fill='none'
        stroke='#faff69'
        strokeLinecap='round'
        strokeWidth={strokeWidth}
        d={d}
        pathLength='1000'>
        <animate
          attributeName='stroke-dasharray'
          dur={`${duration}s`}
          keyTimes='0;0.5;1'
          repeatCount='indefinite'
          values='100 900;500 500;100 900'
        />
        <animate
          attributeName='stroke-dashoffset'
          calcMode='linear'
          dur={`${duration}s`}
          keyTimes='0;0.5;1'
          repeatCount='indefinite'
          values='0;-1000;-2000'
        />
      </path>
    </svg>
  )
}
