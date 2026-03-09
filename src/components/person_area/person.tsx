import { SuiText } from '../sui'
import Image from 'next/image'

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

  return (
    <div
      className={`flex w-full flex-col items-center text-center md:max-w-xs ${className}`}>
      {avatar && (
        <div
          className={`${small ? 'h-32 w-32' : 'h-40 w-40'} mb-6 aspect-square`}>
          <Image
            alt={name}
            src={avatar}
            width={small ? 130 : 160}
            height={small ? 130 : 160}
            className='h-full rounded-full object-cover object-center'
          />
        </div>
      )}

      <div
        className={`text-left ${
          personType === 'founder' && 'border-l-4 border-l-primary-300 pl-4'
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
