import { ReactElement } from 'react'
import Markdown from '../Markdown'
import { StrapiSvg } from '../StrapiElements'
import { SuiSpacer, SuiText, SuiTitle } from '../sui'

type FeatureItemProps = {
  icon: ReactElement
  title: string
  description: string
  delay: number
  invert?: boolean
}

export function FeatureItem(props: FeatureItemProps) {
  const { icon, title, description, delay, invert } = props

  const titleColour = invert ? 'lightest' : 'darkest'
  const textColour = invert ? 'light_purple' : 'dark'
  return (
    <div
      className='flex w-full gap-x-4'
      data-aos='fade-up'
      data-aos-offset={0}
      data-aos-delay={delay}>
      <div className='flex w-1/5 items-start'>
        <div className='flex w-16 h-16 bg-onyx rounded-lg shadow-md justify-center items-center'>
          {/* @ts-expect-error Server Component */}
          <StrapiSvg src={icon} className='feature-icon' />
        </div>
      </div>
      <div className='flex w-4/5 flex-col pl-2 pr-6'>
        <SuiTitle semibold color={titleColour}>
          <h3>{title}</h3>
        </SuiTitle>
        <SuiSpacer size='xs' />
        <SuiText color={textColour} padding_0>
          <Markdown>{description}</Markdown>
        </SuiText>
      </div>
    </div>
  )
}
