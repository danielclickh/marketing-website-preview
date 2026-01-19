import Avatars from '@/components/Avatars'
import { interleaveWithLast } from '@/lib/utils/arrays'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { EntryBlogPost } from '@/types/strapi'
import Link from 'next/link'

export interface StrapiBlogMetaProps {
  entry: EntryBlogPost
  profileLinks?: boolean
}

export default function StrapiBlogMeta({
  entry,
  profileLinks = false
}: StrapiBlogMetaProps) {
  let name: string | null | React.ReactNode = null
  let avatars = entry?.author?.avatarPng || []

  if (entry.author?.name) {
    if (entry.author?.profileLink && profileLinks) {
      name = <Link href={entry.author.profileLink}>{entry.author.name}</Link>
    } else {
      name = entry.author.name
    }
  }

  if (entry?.author?.profiles && entry?.author?.profiles?.length > 0) {
    const mappedNames = entry.author.profiles.map((profile) => {
      if (profileLinks) {
        return <Link href={`/authors/${profile.slug}`}>{profile.name}</Link>
      }

      return <>{profile.name}</>
    })
    name = interleaveWithLast(mappedNames, <>, </>, <> and </>)
    avatars = entry.author.profiles.map((profile) => profile.avatar)
  }

  const metas: Array<string> = []

  if (entry.date || entry.publishedAt) {
    metas.push(convertDateToString(entry.date || entry.publishedAt))
  }

  if (entry.reading_time_override || entry.reading_time) {
    metas.push(
      `${entry.reading_time_override || entry.reading_time} minutes read`
    )
  }

  return (
    <div className='flex flex-row items-center space-x-4'>
      {avatars.length > 0 && <Avatars avatars={avatars} />}
      <div>
        <div className='text-base'>{name}</div>
        {metas.length > 0 && (
          <div className='text-sm text-neutral-300'>{metas.join(' · ')}</div>
        )}
      </div>
    </div>
  )
}
