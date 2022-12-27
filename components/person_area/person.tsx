import { BaseStrapiImage } from '../../lib/api/strapi/types'
import { StrapiImage } from '../StrapiElements'
import { SuiText } from '../sui'

type PersonProps = {
  avatar: BaseStrapiImage
  name: string
  job?: string
  small?: boolean
}

export function Person(props: PersonProps) {
  const { avatar, name, job, small } = props

  return (
    <div className='flex w-full flex-col text-center md:max-w-xs px-4'>
      {avatar && (
        <div>
          <StrapiImage
            alt={name}
            {...avatar}
            width={small ? 130 : 160}
            height={small ? 130 : 160}
            className='aspect-square'
          />
        </div>
      )}
      <SuiText size='lg' weight='bold' className='mb-3'>
        {name}
      </SuiText>
      {job && (
        <SuiText size='base' weight='medium' color='secondary'>
          {job}
        </SuiText>
      )}
    </div>
  )
}
