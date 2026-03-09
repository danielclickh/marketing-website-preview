import Avatars from '@/components/Avatars'
import { interleaveWithLast } from '@/lib/utils/arrays'
import { ComponentAuthor } from '@/types/strapi'
import Link from 'next/link'

export interface StrapiAuthorMetaProps {
  authors: null | ComponentAuthor
  profileLinks?: boolean
  extras?: Array<string | null | undefined>
}

export default function StrapiAuthorMeta({
  authors,
  profileLinks = true,
  extras
}: StrapiAuthorMetaProps) {
  let name: string | null | React.ReactNode = null
  let avatars = authors?.avatarPng || []

  if (authors?.name) {
    if (authors?.profileLink && profileLinks) {
      name = (
        <Link
          href={authors.profileLink}
          target='_blank'
          className='hover:underline'>
          {authors.name}
        </Link>
      )
    } else {
      name = authors.name
    }
  }

  if (authors?.profiles && authors?.profiles?.length > 0) {
    const mappedNames = authors.profiles.map((profile) => {
      if (profileLinks) {
        return (
          <Link href={`/authors/${profile.slug}`} className='hover:underline'>
            {profile.name}
          </Link>
        )
      }

      return <>{profile.name}</>
    })
    name = interleaveWithLast(mappedNames, <>, </>, <> and </>)
    avatars = authors.profiles.map((profile) => profile.avatar)
  }

  extras = extras?.filter((value) => value && value.length > 0)

  return (
    <div className='flex flex-row flex-wrap items-center gap-x-4 gap-y-2'>
      {avatars.length > 0 && (
        <div className='flex-shrink-0'>
          <Avatars
            avatars={Array.from(
              new Map(avatars.map((item) => [item.id, item])).values()
            )}
          />
        </div>
      )}
      <div>
        <div className='text-base'>{name}</div>
        {extras && extras.length > 0 && (
          <div className='text-sm text-neutral-300'>{extras.join(' · ')}</div>
        )}
      </div>
    </div>
  )
}
