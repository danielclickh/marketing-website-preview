import { ChevronRightIcon } from '@heroicons/react/solid'
import { NewsItemProps } from '@/types/newsEvents'
import { CUIButton } from '../ClickUI'
import { SuiText } from '../sui'

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
        <p className='mb-2 font-inconsolata text-primary-300'>
          {source} • {date}
        </p>
        <SuiText size='lg' weight='bold' className='!text-xl text-neutral-100'>
          {title}
        </SuiText>

        <div className='mt-6 inline-block'>
          <CUIButton
            type='secondary'
            className='group w-auto'
            href={ctaButton.href}
            target={ctaButton.target}
            iconRight={
              <ChevronRightIcon
                height='16'
                className='pt-0.5 transition group-hover:translate-x-1/2'
              />
            }>
            {ctaButton.text}
          </CUIButton>
        </div>
      </div>
    </div>
  )
}
