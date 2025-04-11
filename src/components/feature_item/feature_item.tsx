import { BaseStrapiImage } from '@/lib/api/strapi/types'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiText, SuiTitle } from '../sui'

type FeatureItemProps = {
  icon: BaseStrapiImage
  title: string
  description: string
  delay: number
  forceDarkMode?: boolean
}

export function FeatureItem(props: FeatureItemProps) {
  const { icon, title, description, delay, forceDarkMode = false } = props

  const colorPalette = `${forceDarkMode ? 'bg-c2-dark' : 'bg-neutral-725'}`

  return (
    <div className='flex w-full gap-x-4'>
      <div className='flex w-1/5 items-start'>
        <div
          className={`flex h-16 w-16 ${colorPalette} items-center justify-center rounded-lg shadow-md`}>
          <StrapiImage {...icon} className='feature-icon' />
        </div>
      </div>
      <div className='flex w-4/5 flex-col pl-2 pr-6'>
        <SuiTitle type='h3' className='mb-1' weight='bold'>
          {title}
        </SuiTitle>
        <SuiText
          size='sm'
          weight='medium'
          color={forceDarkMode ? 'c4-dark' : 'c4'}>
          <Markdown>{description}</Markdown>
        </SuiText>
      </div>
    </div>
  )
}
