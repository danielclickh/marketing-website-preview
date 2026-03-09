import StrapiImage from '@/components-cleaned/StrapiImage'
import { CUICard } from '@/components/ClickUI'
import { SuiTitle } from '@/components/sui'
import { interleaveWithLast } from '@/lib/utils/arrays'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { EntryResource } from '@/types/strapi'
import Image from 'next/image'
import Link from 'next/link'

export interface StrapiResourceCardProps {
  entry: EntryResource
}

export default function StrapiResourceCard({ entry }: StrapiResourceCardProps) {
  const footer: Array<string> = []

  if (entry.author?.profiles && entry.author.profiles.length > 0) {
    const authorNames = entry.author.profiles.map((profile) => profile.name)
    const combinedNames = interleaveWithLast(authorNames, ', ', ' and ').join(
      ''
    )
    footer.push(combinedNames)
  } else if (entry.author?.name) {
    footer.push(entry.author.name)
  }

  if (entry?.date) {
    footer.push(
      `${entry.dateLabel ? `${entry.dateLabel}: ` : ''}${convertDateToString(entry.date)}`
    )
  }

  return (
    <CUICard className='group/resource relative overflow-hidden p-6'>
      <CUICard.Header className='mb-4'>
        {entry.category.requiresThumbnail && (
          <div className='-mx-6 -mt-6 mb-6'>
            {entry.thumbnail ? (
              <StrapiImage
                entry={entry.thumbnail}
                width={400}
                height={600}
                className='aspect-video w-full max-w-none object-cover object-center'
              />
            ) : (
              <Image
                src='/images/fallback-video-thumbnail.png'
                alt=''
                width={400}
                height={600}
                className='aspect-video w-full max-w-none object-cover object-center'
              />
            )}
          </div>
        )}
        <SuiTitle type='h3'>
          <Link
            href={`/resources/${entry.category.slug}/${entry.slug}`}
            className='text-primary-300 hover:underline'>
            <span className='absolute inset-0' />
            {entry.title}
          </Link>
        </SuiTitle>
        {(entry.author || entry.date) && (
          <p className='mt-2 text-sm text-neutral-200'>
            {footer.filter(Boolean).join(' • ')}
          </p>
        )}
      </CUICard.Header>
      <CUICard.Body className='mb-auto'>
        <p className='text-neutral-200'>{entry.excerpt}</p>
      </CUICard.Body>
      <CUICard.Footer className='mt-4'>
        <strong>
          Continue reading{' '}
          <span className='inline-block transition-transform group-hover/resource:translate-x-1'>
            -&gt;
          </span>
        </strong>
      </CUICard.Footer>
    </CUICard>
  )
}
