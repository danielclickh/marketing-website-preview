export interface AnimatedDataLineProps {
  size: number
  direction: 'right' | 'left' | 'up' | 'down'
  keyframes?: Array<{ startSize: number; endSize: number; duration: number }>
  delay?: number // seconds, applied at the start of every loop
  strokeWidth?: number
  trackColor?: string
  lineColor?: string
  lineProps?: Omit<
    React.SVGProps<SVGLineElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'strokeWidth' | 'stroke'
  >
  trackProps?: Omit<
    React.SVGProps<SVGLineElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'strokeWidth' | 'stroke'
  >
  className?: string
}

export default function AnimatedDataLine({
  size,
  direction,
  keyframes,
  delay = 0,
  strokeWidth = 3,
  trackColor = '#414141',
  lineColor = '#FAFF69',
  lineProps = {},
  trackProps = {},
  className
}: AnimatedDataLineProps) {
  // Defaults
  keyframes = keyframes || [
    { startSize: 1, endSize: 2, duration: 1.75 },
    { startSize: 0.5, endSize: 1.5, duration: 2 },
    { startSize: 1.1, endSize: 1, duration: 2 }
  ]

  const round = (val: number) => parseFloat(val.toFixed(3))
  const calcSize = (val: number) => round(val * size)

  const kfDuration = keyframes.reduce((sum, kf) => sum + kf.duration, 0)
  const totalDuration = kfDuration + Math.max(0, delay)

  const keyTimes: number[] = [0]

  // ⬇️ Start with the correct initial length (NOT zero)
  const firstLen = calcSize(keyframes[0].startSize)
  let frames1: number[] = [0 - firstLen]
  let frames2: number[] = [0 - firstLen + firstLen] // == 0

  // Optional initial hold equal to the first value
  if (delay > 0) {
    const holdT = round(delay / totalDuration)
    keyTimes.push(holdT)
    frames1.push(frames1[0])
    frames2.push(frames2[0])
  }

  // Build the rest of the timeline
  let elapsed = Math.max(0, delay)

  keyframes.forEach((kf, index, all) => {
    elapsed += kf.duration
    const t = round(elapsed / totalDuration)

    // Grow/shrink the line: keep length == endSize during this segment
    const startPx = calcSize(kf.startSize)
    const endPx = calcSize(kf.endSize)
    frames1.push(startPx + endPx)
    frames2.push(startPx + endPx + endPx) // frames2 - frames1 == endPx
    keyTimes.push(t)

    // Reset to next start WITHOUT collapsing to zero length
    const nextStartSize = all[index + 1]?.startSize ?? 0
    const nextLen = calcSize(nextStartSize)
    const nextStart = 0 - nextLen
    frames1.push(nextStart)
    frames2.push(nextStart + nextLen) // keep length at nextLen
    keyTimes.push(t)
  })

  // Axis setup
  let framesAttr1: 'x1' | 'x2' | 'y1' | 'y2' = 'x1'
  let framesAttr2: 'x1' | 'x2' | 'y1' | 'y2' = 'x2'

  let x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0

  switch (direction) {
    case 'up':
      y1 = size
      y2 = 0
      x1 = strokeWidth / 2
      x2 = strokeWidth / 2
      framesAttr1 = 'y2'
      framesAttr2 = 'y1'
      break
    case 'down':
      y1 = 0
      y2 = size
      x1 = strokeWidth / 2
      x2 = strokeWidth / 2
      framesAttr1 = 'y1'
      framesAttr2 = 'y2'
      break
    case 'left':
      x1 = size
      x2 = 0
      y1 = strokeWidth / 2
      y2 = strokeWidth / 2
      framesAttr1 = 'x2'
      framesAttr2 = 'x1'
      break
    case 'right':
      x1 = 0
      x2 = size
      y1 = strokeWidth / 2
      y2 = strokeWidth / 2
      framesAttr1 = 'x1'
      framesAttr2 = 'x2'
      break
  }

  // Flip sign for negative directions (left/up)
  if (direction === 'left' || direction === 'up') {
    frames1 = frames1.map((v) => size - v)
    frames2 = frames2.map((v) => size - v)
  }

  const width = Math.max(x1, x2, strokeWidth)
  const height = Math.max(y1, y2, strokeWidth)

  // Ensure keyTimes end at 1
  if (keyTimes[keyTimes.length - 1] !== 1) {
    keyTimes[keyTimes.length - 1] = 1
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}>
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        strokeWidth={strokeWidth}
        stroke={trackColor}
        {...trackProps}
      />
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        strokeWidth={strokeWidth}
        stroke={lineColor}
        {...lineProps}>
        <animate
          attributeName={framesAttr1}
          values={frames1.join(';')}
          keyTimes={keyTimes.join(';')}
          dur={`${totalDuration}s`}
          repeatCount='indefinite'
        />
        <animate
          attributeName={framesAttr2}
          values={frames2.join(';')}
          keyTimes={keyTimes.join(';')}
          dur={`${totalDuration}s`}
          repeatCount='indefinite'
        />
      </line>
    </svg>
  )
}
