import { Fragment } from 'react'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { StrapiImage } from '../StrapiElements'

export interface AvatarsProps {
  avatars: Array<StrapiImageType>
}

export default function Avatars({ avatars }: AvatarsProps) {
  return (
    <div className='flex -space-x-4'>
      {avatars.map((avatar, avatarIndex) => {
        return (
          <Fragment key={avatarIndex}>
            <StrapiImage
              {...avatar}
              width={44}
              height={44}
              className='aspect-square !w-14 !h-auto rounded-full border-4 border-neutral-900'
            />
          </Fragment>
        )
      })}
    </div>
  )
}
