import { StarIcon } from '@heroicons/react/solid'
import { StrapiPicture } from '../StrapiElements'
import { StrapiImageProps } from '../StrapiElements/types'
import { SuiButton, SuiPanel, SuiText } from '../sui'

type TestimonialProps = {
  lightLogo: StrapiImageProps
  darkLogo: StrapiImageProps
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
      <div className='flex flex-col justify-start align-top items-start'>
        <div className='pb-2'>
          <StrapiPicture light={lightLogo} dark={darkLogo} />
        </div>
        <SuiText>{description}</SuiText>

        <ul className='pb-4'>
          {bullets.map((bullet) => (
            <li className='flex space-x-2' key={bullet.text}>
              <StarIcon className='w-5 text-primary' />
              <SuiText color='darkest'>
                <p>{bullet.text}</p>
              </SuiText>
            </li>
          ))}
        </ul>

        {btnText && (
          <SuiButton title={btnText} path={path} target={target} color='dark' />
        )}
      </div>
    </SuiPanel>
  )
}
