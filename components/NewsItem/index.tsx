import { SuiButton, SuiText, SuiLink } from '../sui'
import { NewsItemProps } from '../../types/newsEvents'

export default function NewsItem({
  source,
  date,
  title,
  abstract,
  ctaButton
}: NewsItemProps) {
  return (
    <SuiLink
      href={ctaButton.href}
      target='_blank'
      className={`md:grid-cols-[4rem_1fr] gap-x-6 p-4 group flex hover:bg-primary-800 rounded-lg hover:no-underline ease-in-out duration-200 cursor-pointer`}
      key={title}>
      <div className='flex flex-col'>
        <div>
          <SuiText size='lg' weight='bold' className='mb-2 !text-xl'>
            {title}
          </SuiText>
          <SuiText
            size='sm'
            weight='normal'
            color='text-muted'
            className='mb-2'>
            {abstract}
          </SuiText>
        </div>
        <div className='flex items-center'>
          <SuiText size='sm' color='text-muted' className='mr-4 p-0'>
            {source} • {date}
          </SuiText>
          <SuiButton
            type='empty'
            weight='medium'
            iconRight
            path={ctaButton.href}
            target={ctaButton.target}
            color='primary'
            className='!text-neutral-300 !p-0 group-hover:!text-primary'>
            {ctaButton.text}
          </SuiButton>
        </div>
      </div>
    </SuiLink>
  )
}
