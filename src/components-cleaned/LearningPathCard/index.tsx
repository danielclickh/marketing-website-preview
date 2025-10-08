import iconClock from './assets/icon-clock.svg'
import iconPuzzle from './assets/icon-puzzle.svg'
import { CUICard } from '@/components/ClickUI'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiText, SuiTitle } from '@/components/sui'
import { PageItem, Section } from '@/data/learn'
import Image, { ImageProps } from 'next/image'

export interface LearningPathCardProps {
  path: PageItem
}

export default function LearningPathCard({
  path: {
    title,
    slug,
    icon,
    h1,
    intro,
    lmsUrl,
    comingSoon,
    level,
    modules,
    quizzes,
    duration,
    sections
  }
}: LearningPathCardProps) {
  const hasDuration = typeof duration !== 'undefined'
  const hasModules = typeof modules !== 'undefined'
  const hasStats = false //hasDuration || hasModules // Disabled until further notice
  const canLink = !comingSoon || (comingSoon && lmsUrl)
  return (
    <CUICard className='relative'>
      <CUICard.Body className='flex flex-1 flex-col gap-4 p-6'>
        <Image
          src={icon}
          alt={title}
          width={26}
          height={26}
          className='aspect-square object-contain'
        />
        <SuiTitle type='h3'>{title}</SuiTitle>
        <SuiText size='sm' className='text-neutral-200'>
          {intro}
        </SuiText>
        {!canLink && (
          <span className='mt-auto inline-block font-bold text-neutral-500'>
            Coming soon
          </span>
        )}
        {canLink && (
          <LinkWithArrow
            href={`/learn/${slug}`}
            className='mt-auto inline-block font-bold text-primary-300 hover:underline'>
            <span className='absolute inset-0' />
            {comingSoon && lmsUrl && 'Find out more'}
            {!comingSoon && (
              <>
                Explore <span className='sr-only'>{title}</span> learning path
              </>
            )}
          </LinkWithArrow>
        )}
      </CUICard.Body>
      {hasStats && (
        <CUICard.Footer className='flex flex-1 flex-shrink-0 flex-grow-0 divide-x divide-neutral-700/80 border-t border-neutral-700/80'>
          {hasDuration && (
            <div className='flex flex-1 items-center justify-center gap-2 py-2.5 text-sm text-neutral-200'>
              <Image src={iconClock} width={20} height={20} alt='Duration' />
              <span>{duration}</span>
            </div>
          )}
          {hasModules && (
            <div className='flex flex-1 items-center justify-center gap-2 py-2.5 text-sm'>
              <Image src={iconPuzzle} width={20} height={20} alt='Duration' />
              <span>{modules}</span>
            </div>
          )}
        </CUICard.Footer>
      )}
    </CUICard>
  )
}
