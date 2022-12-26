import { BaseStrapiImage } from '../../lib/api/strapi/types'
import { StrapiImage } from '../StrapiElements'
import { SuiText, SuiTitle } from '../sui'

type FeatureItemProps = {
  icon: BaseStrapiImage
  title: string
  description: string
  entry?: string
}

export function FeatureItemLarge(props: FeatureItemProps) {
  const { icon, title, description, entry } = props

  return (
    <div className='flex flex-col space-y-2 w-full text-left' data-aos={entry}>
      <div className='flex flex-row items-center'>
        <div className='flex w-12 mr-2'>
          <StrapiImage {...icon} className='feature-icon' />
        </div>
        <SuiTitle type='h2'>{title}</SuiTitle>
      </div>
      <SuiText type='p2' weight='medium' color='dark'>
        {description}
      </SuiText>
    </div>
  )
}
