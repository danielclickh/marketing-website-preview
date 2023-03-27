import Image from 'next/image'
import { SuiText } from '../sui'

type PersonProps = {
  avatar: string
  name: string
  job?: string
  small?: boolean
  className?: string
  personType?: string
}

export function Person(props: PersonProps) {
  const { avatar, name, job, small, className, personType = '' } = props

  console.log(props)
  return (
    <div
      className={`flex w-full flex-col items-center text-center md:max-w-xs ${className}`}>
      {avatar && (
        <div
          className={`${small ? 'w-32 h-32' : 'w-40 h-40'} aspect-square mb-6`}>
          <Image
            alt={name}
            src={avatar}
            width={small ? 130 : 160}
            height={small ? 130 : 160}
            className='h-full object-cover object-center rounded-full'
          />
        </div>
      )}

      <div
        className={`text-left ${
          personType === 'founder' && 'border-l-primary-300 border-l-4 pl-4'
        }`}>
        <SuiText size='base' weight='bold' className='mb-1'>
          {name}
        </SuiText>
        {job && (
          <SuiText size='base' weight='normal' color='text-muted'>
            {job}
          </SuiText>
        )}
      </div>
    </div>
  )
}
