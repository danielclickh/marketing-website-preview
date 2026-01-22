import { StrapiImageType } from '@/lib/api/strapi/types'
import { EntryImage } from '@/types/strapi'
import Image from 'next/image'

export interface AvatarsProps {
  avatars: Array<StrapiImageType | EntryImage>
}

export default function Avatars({ avatars }: AvatarsProps) {
  // Covers an edge case where Strapi would return nothing
  avatars = Array.isArray(avatars)
    ? avatars.filter((avatar) => !!avatar?.id)
    : []
  return (
    <>
      {avatars.length > 0 && (
        <div className='flex -space-x-3'>
          {avatars.map((avatar, avatarIndex) => {
            return (
              <span
                key={avatarIndex}
                className='relative'
                style={{ zIndex: avatars.length - avatarIndex }}>
                <Image
                  src={avatar.url}
                  alt={avatar.alternativeText || ''}
                  className='aspect-square !h-auto !w-14 rounded-full border-4 border-neutral-900 bg-neutral object-cover'
                  width={44}
                  height={44}
                />
              </span>
            )
          })}
        </div>
      )}
    </>
  )
}
