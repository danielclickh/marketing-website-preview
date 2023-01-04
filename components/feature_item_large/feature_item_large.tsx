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
      <div className='flex flex-row items-center mb-4'>
        <div className='flex w-12 mr-2'>
          <StrapiImage {...icon} className='feature-icon inherit' />
        </div>
        <SuiTitle type='h3' className='text-2xl' weight='bold'>
          {title}
        </SuiTitle>
      </div>
      <SuiText size='base' weight='medium' color='secondary'>
        {description}
      </SuiText>
    </div>
  )
}
