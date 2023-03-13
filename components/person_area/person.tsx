import { BaseStrapiImage } from '../../lib/api/strapi/types'
import { StrapiImage } from '../StrapiElements'
import { SuiText } from '../sui'

type PersonProps = {
  avatar: BaseStrapiImage
  name: string
  job?: string
  small?: boolean
  className?: string
}

export function Person(props: PersonProps) {
  const { avatar, name, job, small, className = '' } = props

  return (
    <div
      className={`flex w-full flex-col items-center text-center md:max-w-xs ${className}`}>
      {avatar && (
        <div
          className={`${small ? 'w-32 h-32' : 'w-40 h-40'} aspect-square mb-6`}>
          <StrapiImage
            alt={name}
            {...avatar}
            width={small ? 130 : 160}
            height={small ? 130 : 160}
            className='h-full object-cover object-center rounded-full'
          />
        </div>
      )}
      <SuiText size='sm' weight='bold' className='mb-3 !text-xl'>
        {name}
      </SuiText>
      {job && (
        <SuiText size='base' weight='normal' color='text-muted'>
          {job}
        </SuiText>
      )}
    </div>
  )
}
