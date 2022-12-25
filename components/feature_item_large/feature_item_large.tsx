import { ReactElement } from 'react'
import { StrapiImage } from '../StrapiElements'
import { SuiText, SuiTitle } from '../sui'

type FeatureItemProps = {
  icon: ReactElement
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
          <StrapiImage {...icon.data.attributes} className='feature-icon' />
        </div>
        <SuiTitle type='h3'>{title}</SuiTitle>
      </div>
      <SuiText size='lg' color='dark'>
        <p>{description}</p>
      </SuiText>
    </div>
  )
}
