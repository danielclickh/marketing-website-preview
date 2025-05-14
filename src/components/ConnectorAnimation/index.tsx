import ScaleToContainer from '../ScaleToContainer'
import styles from './styles.module.scss'

export interface ConnectorAnimationProps {
  logo: React.ReactNode
}

export default function ConnectorAnimation({ logo }: ConnectorAnimationProps) {
  return (
    <ScaleToContainer scaleUp={false}>
      <div className='pointer-events-none grid w-[507px] select-none grid-cols-1 grid-rows-1'>
        <div className='relative z-0 col-start-1 row-start-1 flex items-center'>
          {/* Postgres logo */}
          <div className='flex w-20 flex-shrink-0 flex-grow-0 items-center justify-center'>
            <div className='flex aspect-square items-center justify-center rounded-lg border border-primary-300 p-3'>
              {logo}
            </div>
          </div>

          {/* Animated line */}
          <div className='flex-shrink-0 flex-grow-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='80'
              height='40'
              viewBox='0 0 80 40'>
              {/* Grey lines */}
              <path fill='none' stroke='#414141' strokeWidth='2' d='M0 1h80' />
              <path fill='none' stroke='#414141' strokeWidth='2' d='M0 20h80' />
              <path fill='none' stroke='#414141' strokeWidth='2' d='M0 39h80' />

              {/* Yellow lines */}
              <path
                fill='none'
                stroke='#FAFF69'
                strokeWidth='2'
                strokeDasharray='30% 20% 20% 30%'
                d='M0 1h80'>
                <animate
                  dur='1.5s'
                  attributeName='stroke-dashoffset'
                  repeatCount='indefinite'
                  values='100%; 0%'
                />
              </path>
              <path
                fill='none'
                stroke='#FAFF69'
                strokeWidth='2'
                strokeDasharray='10% 40% 40% 10%'
                d='M0 20h80'>
                <animate
                  dur='2s'
                  attributeName='stroke-dashoffset'
                  repeatCount='indefinite'
                  values='100%; 0%'
                />
              </path>
              <path
                fill='none'
                stroke='#FAFF69'
                strokeWidth='2'
                strokeDasharray='35% 15% 25% 25%'
                d='M0 39h80'>
                <animate
                  dur='1.75s'
                  attributeName='stroke-dashoffset'
                  repeatCount='indefinite'
                  values='100%; 0%'
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
    </ScaleToContainer>
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

const badgeGlowAmounts: Record<BadgeColors, number> = {
  red: 1.5,
  blue: 1.5,
  yellow: 2
}

function Badge({
  label,
  theme,
  glowInterval = 3500,
  glowDelay = 0
}: BadgeProps) {
  return (
    <div
      className='relative'
      style={
        {
          '--glow-interval': `${glowInterval}ms`,
          '--glow-delay': `${glowDelay}ms`,
          '--glow-amount': badgeGlowAmounts[theme]
        } as React.CSSProperties
      }>
      <div
        className={`absolute inset-0 z-0 rounded border opacity-0 blur brightness-150 saturate-200 ${badgeThemes[theme]} ${styles.animatedBadgeGlow}`}
      />
      <div
        className={`absolute inset-0 z-0 rounded border opacity-0 blur-sm brightness-150 saturate-200 ${badgeThemes[theme]} ${styles.animatedBadgeGlow}`}
      />
      <div
        className={`relative z-10 h-[88px] w-9 rounded border font-mono uppercase ${badgeThemes[theme]} ${styles.animatedBadge}`}>
        <span className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm'>
          {label}
        </span>
      </div>
    </div>
  )
}
