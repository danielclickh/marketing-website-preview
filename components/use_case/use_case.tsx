import { ChevronRightIcon } from '@heroicons/react/solid'
import { BaseStrapiImage } from '../../lib/api/strapi/types'
import { StrapiPicture } from '../StrapiElements'
import { SuiButton, SuiPanel, SuiText } from '../sui'
import { CheckIcon } from '@heroicons/react/outline'
import { CUIButton } from '../../components/ClickUI'
import Image from 'next/image'

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
    <SuiPanel
      color='bg-neutral-900'
      padding='xl'
      className='border-l-4 border-l-primary-300'>
      <div
        className='flex flex-col justify-start align-top items-between h-full'
        id={id}>
        <div className='flex-auto'>
          <Image
            src={darkLogo.url}
            alt={lightLogo.alternativeText}
            width={darkLogo.width ? darkLogo.width : 180}
            height={darkLogo.height ? darkLogo.height : 63}
            className='pb-7'
          />
          <p className='mb-5 text-neutral-100 font-semibold text-xl leading-7 font-basier'>
            {' '}
            {description}
          </p>
          <ul className='mb-7 space-y-3'>
            {bullets.map((bullet) => (
              <li
                className='grid grid-cols-[1.25rem_1fr] items-start gap-x-4'
                key={bullet.text}>
                <CheckIcon className='w-6 h-6 text-c6 stroke-1' />
                <SuiText size='base' weight='medium'>
                  {bullet.text}
                </SuiText>
              </li>
            ))}
          </ul>
        </div>

        {btnText && (
          <CUIButton
            type='secondary'
            className=''
            href={path}
            target={target}
            iconRight={<ChevronRightIcon className='w-4 h-4' />}>
            {btnText}
          </CUIButton>
        )}
      </div>
    </SuiPanel>
  )
}
