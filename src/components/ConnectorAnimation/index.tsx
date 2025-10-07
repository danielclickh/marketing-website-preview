import ScaleToContainer from '../ScaleToContainer'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'

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
          <div className='flex-shrink-0 flex-grow-0 space-y-5'>
            <AnimatedDataLine
              size={160}
              direction='right'
              keyframes={[
                { startSize: 1.2, endSize: 0.9, duration: 1.5 },
                { startSize: 1, endSize: 1.5, duration: 2 },
                { startSize: 0.2, endSize: 0.8, duration: 2 }
              ]}
            />
            <AnimatedDataLine
              size={160}
              direction='right'
              keyframes={[
                { startSize: 0, endSize: 1.2, duration: 2 },
                { startSize: 0.5, endSize: 1.5, duration: 1.75 },
                { startSize: 1, endSize: 1, duration: 2.25 }
              ]}
            />
            <AnimatedDataLine
              size={160}
              direction='right'
              keyframes={[
                { startSize: 1, endSize: 2, duration: 1.75 },
                { startSize: 0.5, endSize: 1.5, duration: 2 },
                { startSize: 1.1, endSize: 1, duration: 2 }
              ]}
            />
          </div>

          {/* ClickHouse logo */}
          <div className='relative w-32 flex-shrink-0 flex-grow-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              className='absolute inset-0 h-auto w-full animate-fadeInOut blur-lg'>
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
