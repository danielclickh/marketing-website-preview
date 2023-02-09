import { BaseStrapiImage } from '../../lib/api/strapi/types'
import { StrapiImage } from '../StrapiElements'
import { SuiText, SuiTitle } from '../sui'

type FeatureItemProps = {
  icon: BaseStrapiImage
  title: string
  description: string
}

export function FeatureItemLarge(props: FeatureItemProps) {
  const { icon, title, description } = props

  return (
    <div className='flex flex-col w-full text-left'>
      <div className='flex flex-row items-center mb-4'>
        <div className='flex w-12 mr-2'>
          <StrapiImage {...icon} className='feature-icon' />
        </div>
        <SuiTitle type='h3' className='!text-3xl' weight='bold'>
          {title}
        </SuiTitle>
      </div>
      <SuiText size='base' weight='medium' color='secondary'>
        {description}
      </SuiText>
    </div>
  )
}
