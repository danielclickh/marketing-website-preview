import { StrapiImageType } from '../../lib/api/strapi/types'
import { StrapiImage } from '../StrapiElements'

export interface AvatarsProps {
  avatars: Array<StrapiImageType>
}

export default function Avatars({ avatars }: AvatarsProps) {
  return (
    <div className='flex -space-x-3'>
      {avatars.map((avatar, avatarIndex) => {
        return (
          <span
            key={avatarIndex}
            className='relative'
            style={{ zIndex: avatars.length - avatarIndex }}>
            <StrapiImage
              {...avatar}
              width={44}
              height={44}
              className='aspect-square !w-14 !h-auto rounded-full border-4 border-neutral-900'
            />
          </span>
        )
      })}
    </div>
  )
}
