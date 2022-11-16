import Image from 'next/image'
import { SuiText } from '../sui'

type PersonProps = {
  avatar: string
  name: string
  job?: string
  small?: boolean
}

export function Person(props: PersonProps) {
  const { avatar, name, job, small } = props

  return (
    <div className='flex w-full flex-col text-center md:max-w-xs px-4'>
      <div>
        <Image
          src={`/our-story/${avatar}`}
          alt={name}
          width={small ? '124' : '154'}
          height={small ? '124' : '154'}
        />
      </div>
      <SuiText>
        <p>
          {' '}
          {name}
          {job && (
            <>
              <br />
              <span className='text-web-light-c4 dark:text-web-dark-c4'>
                {job}
              </span>
            </>
          )}
        </p>
      </SuiText>
    </div>
  )
}
