import ScaleToContainer from '../ScaleToContainer'
import styles from './styles.module.scss'

export interface ConnectorAnimationProps {
  logo: React.ReactNode
}

export default function ConnectorAnimation({ logo }: ConnectorAnimationProps) {
  return (
    <ScaleToContainer scaleUp={false}>
      <div className='pointer-events-none grid w-[416px] select-none grid-cols-1 grid-rows-1'>
        <div className='relative z-0 col-start-1 row-start-1 flex items-center'>
          {/* Postgres logo */}
          <div className='flex aspect-square w-32 flex-shrink-0 flex-grow-0 items-center justify-center rounded-lg border border-primary-300 p-3'>
            {logo}
          </div>

          {/* Animated line */}
          <div className='flex-shrink-0 flex-grow-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='160'
              height='40'
              viewBox='0 0 160 40'>
              {/* Top line */}
              <line
                x1='0'
                x2='160'
                y1='1'
                y2='1'
                strokeWidth='2'
                stroke='#414141'
              />
              <AnimatedLine
                y={1}
                keyframes={[
                  { startSize: 1.2, endSize: 0.9, duration: 1.5 },
                  { startSize: 1, endSize: 1.5, duration: 2 },
                  { startSize: 0.2, endSize: 0.8, duration: 2 }
                ]}
              />

              {/* Middle line */}
              <line
                x1='0'
                x2='160'
                y1='20'
                y2='20'
                strokeWidth='2'
                stroke='#414141'
              />
              <AnimatedLine
                y={20}
                keyframes={[
                  { startSize: 0, endSize: 1.2, duration: 2 },
                  { startSize: 0.5, endSize: 1.5, duration: 1.75 },
                  { startSize: 1, endSize: 1, duration: 2.25 }
                ]}
              />

              {/* Bottom line */}
              <line
                x1='0'
                x2='160'
                y1='39'
                y2='39'
                strokeWidth='2'
                stroke='#414141'
              />
              <AnimatedLine
                y={39}
                keyframes={[
                  { startSize: 1, endSize: 2, duration: 1.75 },
                  { startSize: 0.5, endSize: 1.5, duration: 2 },
                  { startSize: 1.1, endSize: 1, duration: 2 }
                ]}
              />
            </svg>
          </div>

          {/* ClickHouse logo */}
          <div className='relative w-32 flex-shrink-0 flex-grow-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              className={`absolute inset-0 h-auto w-full blur-lg ${styles.animatedBadgeGlow}`}>
              <g fill='none'>
                <rect width='72' height='72' fill='#FAFF69' rx='4' />
                <path
                  fill='#161517'
                  d='M21.41 15.75c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 18 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 27 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 36 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 45 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 15.75c.6 0 1.09.49 1.09 1.09v6.82c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 54 39.41v-6.82c0-.6.49-1.09 1.09-1.09h2.32Z'
                />
              </g>
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              className='relative z-10 h-auto w-full'>
              <g fill='none'>
                <rect width='72' height='72' fill='#FAFF69' rx='4' />
                <path
                  fill='#161517'
                  d='M21.41 15.75c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 18 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 27 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 36 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 45 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 15.75c.6 0 1.09.49 1.09 1.09v6.82c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 54 39.41v-6.82c0-.6.49-1.09 1.09-1.09h2.32Z'
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </ScaleToContainer>
  )
}

function AnimatedLine({
  y,
  keyframes
}: {
  y: number
  keyframes: Array<{ startSize: number; endSize: number; duration: number }>
}) {
  const lineWidth = 160

  const round = (val: number) => parseFloat(val.toFixed(2))
  const calcSize = (size: number) => round(lineWidth * size)

  const duration = keyframes.reduce(
    (sum, keyframe) => sum + keyframe.duration,
    0
  )

  const keyTimes: Array<number> = [0]

  let x1: Array<number> = [0 - calcSize(keyframes[0].startSize)]
  let x2: Array<number> = [0 - calcSize(keyframes[0].startSize)]

  let elapsed = 0

  keyframes.forEach((keyframe, index, all) => {
    elapsed += keyframe.duration
    const time = round(elapsed / duration)

    // Line sizes
    x1.push(calcSize(keyframe.startSize) + calcSize(keyframe.endSize))
    x2.push(
      calcSize(keyframe.startSize) +
        calcSize(keyframe.endSize) +
        calcSize(keyframe.endSize)
    )
    keyTimes.push(time)

    // Reset sizes
    x1.push(0 - calcSize(all[index + 1]?.startSize || 0))
    x2.push(0 - calcSize(all[index + 1]?.startSize || 0))
    keyTimes.push(time)
  })

  return (
    <line x1='0' x2={lineWidth} y1={y} y2={y} strokeWidth='2' stroke='#FAFF69'>
      <animate
        attributeName='x1'
        values={x1.join(';')}
        keyTimes={keyTimes.join(';')}
        dur={`${duration}s`}
        repeatCount='indefinite'
      />
      <animate
        attributeName='x2'
        values={x2.join(';')}
        keyTimes={keyTimes.join(';')}
        dur={`${duration}s`}
        repeatCount='indefinite'
      />
    </line>
  )
}
