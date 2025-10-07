import ScaleToContainer from '../ScaleToContainer'
import styles from './styles.module.scss'

type BadgeColors = 'red' | 'blue' | 'yellow'

type Badge = {
  label: string
  theme: BadgeColors
}

export interface CdcAnimationProps {
  logo: React.ReactNode
  badges?: Array<Badge>
}

export default function CdcAnimation({ logo, badges }: CdcAnimationProps) {
  badges = badges || [
    { label: 'insert', theme: 'yellow' },
    { label: 'insert', theme: 'yellow' },
    { label: 'update', theme: 'blue' },
    { label: 'delete', theme: 'red' },
    { label: 'add col', theme: 'yellow' }
  ]

  const middleWidth = 71 * badges.length

  return (
    <ScaleToContainer scaleUp={false}>
      <div className='pointer-events-none relative w-max select-none'>
        {/* Animated line */}
        <div className='absolute inset-x-20 top-1/2 z-0 -translate-y-1/2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='355'
            height='2'
            viewBox='0 0 355 2'
            className='h-0.5 w-full'
            preserveAspectRatio='none'>
            <path fill='none' stroke='#414141' strokeWidth='2' d='M0 1h355' />
            <path
              fill='none'
              stroke='#FAFF69'
              strokeWidth='2'
              d='M0 1h355'
              className={styles.animatedLine}
            />
          </svg>
        </div>

        <div className='relative z-10 flex items-center gap-12'>
          {/* Postgres logo */}
          <div className='flex w-20 flex-shrink-0 flex-grow-0 items-center justify-center pr-4'>
            {logo}
          </div>

          {/* Badges */}
          <div className='flex-shrink-0 flex-grow-0'>
            <div className='flex gap-4 border border-neutral-700 bg-neutral-900/80 p-4'>
              {badges.map((badge, badgeIndex) => (
                <Badge
                  key={badgeIndex}
                  label={badge.label}
                  theme={badge.theme}
                  glowDelay={150 + 400 * badgeIndex}
                />
              ))}
            </div>
          </div>

          {/* ClickHouse logo */}
          <div className='w-20 flex-shrink-0 flex-grow-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              className='h-auto w-full'>
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
