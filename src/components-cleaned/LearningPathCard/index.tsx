import iconClock from './assets/icon-clock.svg'
import iconPuzzle from './assets/icon-puzzle.svg'
import { CUICard } from '@/components/ClickUI'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiText, SuiTitle } from '@/components/sui'
import Image, { ImageProps } from 'next/image'

export interface LearningPathCardProps {
  icon: ImageProps['src']
  title: string
  description: string
  href: string
  duration?: string
  modules?: string
}

export default function LearningPathCard({
  icon,
  title,
  description,
  href,
  duration,
  modules
}: LearningPathCardProps) {
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
          {description}
        </SuiText>
        <LinkWithArrow
          href={href}
          className='mt-auto inline-block font-bold text-primary-300 hover:underline'>
          <span className='absolute inset-0' />
          Explore <span className='sr-only'>{title}</span> learning path
        </LinkWithArrow>
      </CUICard.Body>
      <CUICard.Footer className='flex flex-1 flex-shrink-0 flex-grow-0 divide-x divide-neutral-700/80 border-t border-neutral-700/80'>
        {typeof duration !== 'undefined' && (
          <div className='flex flex-1 items-center justify-center gap-2 py-2.5 text-sm text-neutral-200'>
            <Image src={iconClock} width={20} height={20} alt='Duration' />
            <span>{duration}</span>
          </div>
        )}
        {typeof modules !== 'undefined' && (
          <div className='flex flex-1 items-center justify-center gap-2 py-2.5 text-sm'>
            <Image src={iconPuzzle} width={20} height={20} alt='Duration' />
            <span>{modules}</span>
          </div>
        )}
      </CUICard.Footer>
    </CUICard>
  )
}
