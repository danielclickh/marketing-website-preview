import { SuiButton, SuiPanel, SuiText, SuiTitle } from '../../../components/sui'

import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { NewsItemProps } from './types'

export default function NewsItem({
  source,
  date,
  title,
  abstract,
  ctaButton
}: NewsItemProps) {
  return (
    <div className='flex flex-col py-4 justify-between'>
      <div>
        <SuiText size='xs' weight='medium' color='secondary' className='mb-1'>
          {source} • {date}
        </SuiText>
        <SuiTitle type='h3' className='mb-2'>
          {title}
        </SuiTitle>
        <SuiText size='sm' weight='medium' color='secondary'>
          {abstract}
        </SuiText>
      </div>
      <Link href={ctaButton.href} target={ctaButton.target}>
        <div className='flex items-center cursor-pointer'>
          <SuiText size='sm' weight='medium' color='c6'>
            {ctaButton.text}
          </SuiText>
          <ArrowRightIcon className='ml-2 w-4 text-primary' />
        </div>
      </Link>
    </div>
  )
}
