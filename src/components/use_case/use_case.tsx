import { CUIButton } from '../ClickUI'
import { SuiPanel, SuiText } from '../sui'
import { BaseStrapiImage } from '@/lib/api/strapi/types'
import { CheckIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
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
        className='items-between flex h-full flex-col justify-start align-top'
        id={id}>
        <div className='flex-auto'>
          <Image
            src={darkLogo.url}
            alt={lightLogo.alternativeText}
            width={darkLogo.width ? darkLogo.width : 180}
            height={darkLogo.height ? darkLogo.height : 63}
            className='pb-7'
          />
          <p className='mb-5 font-basier text-xl font-semibold leading-7 text-neutral-100'>
            {' '}
            {description}
          </p>
          <ul className='mb-7 space-y-3'>
            {bullets.map((bullet) => (
              <li
                className='grid grid-cols-[1.25rem_1fr] items-start gap-x-4'
                key={bullet.text}>
                <CheckIcon className='h-6 w-6 stroke-1 text-c6' />
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
            className='group'
            href={path}
            target={target}
            iconRight={
              <ChevronRightIcon
                height='18'
                className='pt-0.5 transition group-hover:translate-x-1/2'
              />
            }>
            {btnText}
          </CUIButton>
        )}
      </div>
    </SuiPanel>
  )
}
