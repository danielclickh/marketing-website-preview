import { SuiButton, SuiText } from '../sui'
import { NewsItemProps } from '../../types/newsEvents'

export default function NewsItem({
  source,
  date,
  title,
  abstract,
  ctaButton
}: NewsItemProps) {
  return (
    <div className='flex flex-col justify-between'>
      <div>
        <SuiText size='xs' weight='semibold' color='secondary' className='mb-2'>
          {source} • {date}
        </SuiText>
        <SuiText size='lg' weight='bold' className='mb-2 !text-xl'>
          {title}
        </SuiText>
        <SuiText size='sm' weight='medium' className='mb-2'>
          {abstract}
        </SuiText>
      </div>
      <SuiButton
        type='empty'
        weight='medium'
        iconRight
        path={ctaButton.href}
        target={ctaButton.target}
        color='primary'
        className='!p-0 !text-c6-link'>
        {ctaButton.text}
      </SuiButton>
    </div>
  )
}
