import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { SuiText } from '../sui'

type TestimonialProps = {
  avatar: string
  name: string
  quote: string
  job: string
  delay: number
}

export function Testimonial(props: TestimonialProps) {
  const { avatar, name, quote, job, delay } = props

  return (
    <div
      className='flex w-full flex-col text-center md:max-w-xs px-4'
      data-aos='fade-up'
      data-aos-delay={delay}>
      <div>
        <Image
          src={`/customer-stories/${avatar}`}
          alt={name}
          width='64'
          height='64'
        />
      </div>
      <SuiText size='lg'>
        <p>{quote}</p>
      </SuiText>
      <SuiText>
        <p>
          {' '}
          {name}
          <br />
          <span className='text-web-light-c4 dark:text-web-dark-c4'>{job}</span>
        </p>
      </SuiText>
      <div className='flex justify-center mt-2'>
        <StarIcon className='w-4 text-primary' />
        <StarIcon className='w-4 text-primary' />
        <StarIcon className='w-4 text-primary' />
        <StarIcon className='w-4 text-primary' />
        <StarIcon className='w-4 text-primary' />
      </div>
    </div>
  )
}
