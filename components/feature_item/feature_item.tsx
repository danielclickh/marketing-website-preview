import { BaseStrapiImage } from '../../lib/api/strapi/types'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiText, SuiTitle } from '../sui'

type FeatureItemProps = {
  icon: BaseStrapiImage
  title: string
  description: string
  delay: number
  invert?: boolean
}

export function FeatureItem(props: FeatureItemProps) {
  const { icon, title, description, delay, invert } = props

  const textColour = invert ? 'light_purple' : 'dark'
  return (
    <div
      className='flex w-full gap-x-4'
      data-aos='fade-up'
      data-aos-offset={0}
      data-aos-delay={delay}>
      <div className='flex w-1/5 items-start'>
        <div className='flex w-16 h-16 bg-onyx rounded-lg shadow-md justify-center items-center'>
          <StrapiImage {...icon} className='feature-icon' />
        </div>
      </div>
      <div className='flex w-4/5 flex-col pl-2 pr-6'>
        <SuiTitle type='h3' className='mb-4'>
          {title}
        </SuiTitle>
        <SuiText type='p3' weight='medium' color='dark'>
          <Markdown>{description}</Markdown>
        </SuiText>
      </div>
    </div>
  )
}
