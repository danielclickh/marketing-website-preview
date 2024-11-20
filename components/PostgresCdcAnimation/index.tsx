import Image from 'next/image'
import styles from './styles.module.scss'

export default function PostgresCdcAnimation() {
  return (
    <div className='pointer-events-none grid w-[507px] select-none grid-cols-1 grid-rows-1'>
      <div className='relative z-10 col-start-1 row-start-1'>
        <div className='mx-auto flex max-w-max gap-4 border border-neutral-700 bg-neutral-900/80 p-4'>
          <Badge label='insert' theme='yellow' glowDelay={300} />
          <Badge label='insert' theme='yellow' glowDelay={600} />
          <Badge label='update' theme='blue' glowDelay={900} />
          <Badge label='delete' theme='red' glowDelay={1200} />
          <Badge label='add col' theme='yellow' glowDelay={1500} />
        </div>
      </div>

      <div className='relative z-0 col-start-1 row-start-1 flex items-center'>
        {/* Postgres logo */}
        <div className='flex-shrink-0 flex-grow-0 pr-4'>
          <Image
            src='/images/cloud/integrations/postgres.svg'
            width={64}
            height={64}
            alt='Postgres'
          />
        </div>

        {/* Animated line */}
        <div className='flex-shrink-0 flex-grow-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='355'
            height='2'
            viewBox='0 0 355 2'>
            <path fill='none' stroke='#414141' strokeWidth='2' d='M0 1h355' />
            <path
              fill='none'
              stroke='#FAFF69'
              strokeWidth='2'
              d='M0 1h355'
              stroke-dasharray='355'
              stroke-dashoffset='355'>
              <animate
                attributeName='stroke-dashoffset'
                from='355'
                to='0'
                dur='3.5s'
                repeatCount='indefinite'
                values='355; 0; -355'
                keyTimes='0; 0.5; 1'
              />
            </path>
          </svg>
        </div>

        {/* ClickHouse logo */}
        <div className='flex-shrink-0 flex-grow-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='72'
            height='72'
            viewBox='0 0 72 72'>
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
  )
}

type BadgeColors = 'red' | 'blue' | 'yellow'

interface BadgeProps {
  label: string
  theme: BadgeColors
  glowInterval?: number
  glowDelay?: number
}

const badgeThemes: Record<BadgeColors, string> = {
  red: 'bg-[#451919] border-[#FFBABA]',
  blue: 'bg-[#162540] border-[#B5CDF9]',
  yellow: 'bg-neutral-750 border-primary-300'
}

function Badge({
  label,
  theme,
  glowInterval = 3500,
  glowDelay = 0
}: BadgeProps) {
  return (
    <div className='relative'>
      <div
        className={`absolute inset-0 z-0 rounded border opacity-0 blur brightness-150 saturate-200 ${badgeThemes[theme]} ${styles.animate}`}
        style={
          {
            '--glow-interval': `${glowInterval}ms`,
            '--glow-delay': `${glowDelay}ms`
          } as React.CSSProperties
        }
      />
      <div
        className={`relative z-10 h-[88px] w-9 rounded border font-mono uppercase ${badgeThemes[theme]}`}>
        <span className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm'>
          {label}
        </span>
      </div>
    </div>
  )
}
