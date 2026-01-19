import StrapiImage from '@/components-cleaned/StrapiImage'
import { CUICard } from '@/components/ClickUI'
import { SuiTitle } from '@/components/sui'
import { interleaveWithLast } from '@/lib/utils/arrays'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { EntryBlogPost } from '@/types/strapi'
import Link from 'next/link'

export interface StrapiBlogPostCardProps {
  entry: EntryBlogPost
}

export default function StrapiBlogPostCard({ entry }: StrapiBlogPostCardProps) {
  const footer: Array<string> = []

  if (entry.author?.profiles) {
    const authorNames = entry.author.profiles.map((profile) => profile.name)
    const combinedNames = interleaveWithLast(authorNames, ', ', ' and ').join(
      ''
    )
    footer.push(combinedNames)
  } else if (entry.author?.name) {
    footer.push(entry.author.name)
  }

  if (entry.date || entry.publishedAt) {
    footer.push(convertDateToString(entry.date || entry.publishedAt))
  }

  return (
    <CUICard className='relative overflow-hidden transition-transform hover:-translate-y-1'>
      <CUICard.Header>
        <StrapiImage
          entry={entry.thumbnailPng}
          width={400}
          height={600}
          className='aspect-[375/211] w-full max-w-none object-cover object-center'
        />
      </CUICard.Header>
      <CUICard.Body className='mb-auto p-6'>
        <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
          {entry.category}
        </div>
        <SuiTitle type='h3'>
          <Link href={`/blog/${entry.slug}`} className='text-neutral-100'>
            <span className='absolute inset-0' />
            {entry.title}
          </Link>
        </SuiTitle>
      </CUICard.Body>
      <CUICard.Footer className='mt-auto flex w-full items-center p-6 text-sm text-neutral-300'>
        {footer.join(' · ')}
      </CUICard.Footer>
    </CUICard>
  )
}
