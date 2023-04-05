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
            className='w-auto group'
            href={ctaButton.href}
            target={ctaButton.target}
            iconRight={
              <ChevronRightIcon
                height='16'
                className='group-hover:translate-x-1/2 pt-0.5 transition'
              />
            }>
            {ctaButton.text}
          </CUIButton>
        </div>
      </div>
    </div>
  )
}
