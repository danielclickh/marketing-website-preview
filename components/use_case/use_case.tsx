import { StarIcon } from '@heroicons/react/solid'
import { ReactElement } from 'react'
import { SuiButton, SuiPanel, SuiText } from '../sui'

type TestimonialProps = {
  logo: ReactElement
  description: string
  bullet_one: string
  bullet_two: string
  bullet_three: string
  path: string
}

export function UseCase(props: TestimonialProps) {
  const { logo, description, bullet_one, bullet_two, bullet_three, path } =
    props

  return (
    <SuiPanel color='bg-web-light-c1 dark:bg-web-dark-c1' shadow padding='xl'>
      <div className='flex flex-col justify-start align-top items-start'>
        <div className='pb-2'>{logo}</div>
        <SuiText>{description}</SuiText>

        <ul className='pb-4'>
          <li className='flex space-x-2'>
            <StarIcon className='w-5 text-primary' />
            <SuiText color='darkest'>
              <p>{bullet_one}</p>
            </SuiText>
          </li>
          <li className='flex space-x-2'>
            <StarIcon className='w-5 text-primary' />
            <SuiText color='darkest'>
              <p>{bullet_two}</p>
            </SuiText>
          </li>
          <li className='flex space-x-2'>
            <StarIcon className='w-5 text-primary' />
            <SuiText color='darkest'>
              <p>{bullet_three}</p>
            </SuiText>
          </li>
        </ul>

        <SuiButton title='Read the case study' path={`${path}`} color='dark' />
      </div>
    </SuiPanel>
  )
}
