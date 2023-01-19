import { BaseStrapiImage } from '../../lib/api/strapi/types'
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

  const colorPalette = `${forceDarkMode ? 'bg-c2-dark' : 'bg-c2'}`

  return (
    <div
      className='flex w-full gap-x-4'
      data-aos='fade-up'
      data-aos-offset={0}
      data-aos-delay={delay}>
      <div className='flex w-1/5 items-start'>
        <div
          className={`flex w-16 h-16 ${colorPalette} rounded-lg shadow-md justify-center items-center`}>
          <StrapiImage {...icon} className='feature-icon' />
        </div>
      </div>
      <div className='flex w-4/5 flex-col pl-2 pr-6'>
        <SuiTitle type='h3' className='mb-1' weight='bold'>
          {title}
        </SuiTitle>
        <SuiText size='sm' weight='medium' color='c4-dark'>
          <Markdown className='ignore-anchor'>{description}</Markdown>
        </SuiText>
      </div>
    </div>
  )
}
