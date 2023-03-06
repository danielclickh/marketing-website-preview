import { ChevronRightIcon } from '@heroicons/react/solid'
import { StarIcon } from '@heroicons/react/solid'
import { BaseStrapiImage } from '../../lib/api/strapi/types'
import { StrapiPicture } from '../StrapiElements'
import { SuiButton, SuiPanel, SuiText } from '../sui'

type TestimonialProps = {
  id: string
  lightLogo: BaseStrapiImage
  darkLogo: BaseStrapiImage
  description: string
  bullets: { text: string }[]
  path?: string
  btnText?: string
  target?: string
}

export function UseCase(props: TestimonialProps) {
  const {
    lightLogo,
    darkLogo,
    description,
    bullets,
    path,
    btnText,
    target,
    id
  } = props

  return (
    <SuiPanel isRounded color='bg-c1' shadow padding='xl'>
      <div
        className='flex flex-col justify-start align-top items-between h-full'
        id={id}>
        <div className='flex-auto'>
          <StrapiPicture light={lightLogo} dark={darkLogo} className='pb-7' />
          <SuiText size='sm' weight='medium' className='mb-6'>
            {description}
          </SuiText>

          <ul className='mb-7 gap-y-2.5'>
            {bullets.map((bullet) => (
              <li
                className='grid grid-cols-[1.25rem_1fr] items-start gap-x-2'
                key={bullet.text}>
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
            className='bg-c4/10 text-neutral-0'
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
