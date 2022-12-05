import { ReactElement } from 'react'
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
      <div className='flex w-1/5 items-center'>
        <div className='flex w-16 h-16 bg-web-light-c2 dark:bg-web-dark-c2 rounded-lg shadow-md justify-center items-center'>
          {icon}
        </div>
      </div>
      <div className='flex w-4/5 flex-col pl-2 pr-6'>
        <SuiTitle semibold color={titleColour}>
          <h3>{title}</h3>
        </SuiTitle>
        <SuiSpacer size='xs' />
        <SuiText color={textColour} padding_0>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </SuiText>
      </div>
    </div>
  )
}
