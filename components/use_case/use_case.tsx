import { ChevronRightIcon } from '@heroicons/react/solid'
import { StarIcon } from '@heroicons/react/solid'
import { BaseStrapiImage } from '../../lib/api/strapi/types'
import { StrapiPicture } from '../StrapiElements'
import { SuiButton, SuiPanel, SuiText } from '../sui'

type TestimonialProps = {
  lightLogo: BaseStrapiImage
  darkLogo: BaseStrapiImage
  description: string
  bullets: { text: string }[]
  path?: string
  btnText?: string
  target?: string
}

export function UseCase(props: TestimonialProps) {
  const { lightLogo, darkLogo, description, bullets, path, btnText, target } =
    props

  return (
    <SuiPanel color='bg-white dark:bg-gunmetal' shadow padding='xl'>
      <div className='flex flex-col justify-start align-top items-between h-full'>
        <div className='flex-auto'>
          <StrapiPicture light={lightLogo} dark={darkLogo} className='pb-2' />
          <SuiText size='sm' weight='medium'>
            {description}
          </SuiText>

          <ul className='pb-4'>
            {bullets.map((bullet) => (
              <li className='flex space-x-2' key={bullet.text}>
                <StarIcon className='w-5 text-c6' />
                <SuiText size='sm' weight='medium'>
                  {bullet.text}
                </SuiText>
              </li>
            ))}
          </ul>
        </div>

        {btnText && (
          <SuiButton
            type='custom'
            className='bg-auro_metal_saurus/10 dark:bg-arsenic text-c5'
            path={path}
            target={target}>
            {btnText}
            <ChevronRightIcon className='w-5 h-5' />
          </SuiButton>
        )}
      </div>
    </SuiPanel>
  )
}
