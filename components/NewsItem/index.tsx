import { SuiText } from '../sui'
import { NewsItemProps } from '../../types/newsEvents'
import { CUIButton } from '../ClickUI'
import { ChevronRightIcon } from '@heroicons/react/solid'

export default function NewsItem({
  source,
  date,
  title,
  abstract,
  ctaButton
}: NewsItemProps) {
  return (
    <div className='flex flex-col'>
      <div>
        <p className='font-inconsolata text-primary-300 mb-2'>
          {source} • {date}
        </p>
        <SuiText size='lg' weight='bold' className='!text-xl text-neutral-100'>
          {title}
        </SuiText>

        <div className='mt-6 inline-block'>
          <CUIButton
            type='secondary'
            className='w-auto'
            href={ctaButton.href}
            target={ctaButton.target}
            iconRight={<ChevronRightIcon className='w-4 h-4' />}>
            {ctaButton.text}
          </CUIButton>
        </div>
      </div>
    </div>
  )
}
