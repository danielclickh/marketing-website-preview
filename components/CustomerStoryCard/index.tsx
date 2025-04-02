import { CirclePlay } from 'lucide-react'
import Link from 'next/link'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { CUICard } from '../ClickUI'
import { StrapiImageUrl } from '../StrapiElements'

export interface CustomerStoryCardProps {
  title: string
  description?: string | null
  categories?: Array<string>
  logo?: StrapiImageType
  highlight?: boolean
  blogLink?: string | null
  videoLink?: string | null
  externalLink?: string | null
}

export default function CustomerStoryCard({
  title,
  description,
  categories,
  logo,
  highlight,
  blogLink,
  videoLink,
  externalLink
}: CustomerStoryCardProps) {
  return (
    <CUICard
      className={`relative transition shadow-xl hover:shadow-2xl shadow-black/25 ${highlight ? 'border-primary-300 !bg-neutral-700' : ''}`}>
      <CUICard.Header>
        <div className='rounded-t-lg bg-primary-300 p-4'>
          <div className='flex h-[40px] items-center justify-center'>
            {logo && (
              <StrapiImageUrl
                {...logo}
                loading='eager'
                className='max-h-[35px]'
              />
            )}
          </div>
        </div>
      </CUICard.Header>

      <CUICard.Body className='p-6 mb-auto'>
        {categories && (
          <div className='story-categories font-inconsolata text-primary-300'>
            {categories.join(', ')}
          </div>
        )}
        <div className='story-title py-2 font-basier text-xl font-semibold'>
          {title}
        </div>
        {description && (
          <div className='story-description flex-grow text-balance'>
            {description}
          </div>
        )}
      </CUICard.Body>

      {(blogLink || externalLink || videoLink) && (
        <CUICard.Footer className='px-6 pb-6'>
          <div className='flex items-center justify-end gap-x-6 text-primary-300'>
            {blogLink && (
              <Link href={blogLink} target='_blank' className='hover:underline'>
                Read blog
              </Link>
            )}
            {externalLink && (
              <Link
                href={externalLink}
                target='_blank'
                className='hover:underline'>
                Read blog
              </Link>
            )}
            {videoLink && (
              <Link
                href={videoLink}
                target='_blank'
                className='flex items-center gap-x-3 hover:underline'>
                <CirclePlay strokeWidth={1.5} className='h-5 w-5' />
                Watch video
              </Link>
            )}
          </div>

          {highlight && (
            <div className='absolute -bottom-2 left-1/2 z-50 -translate-x-1/2 transform overflow-visible bg-half-highlight px-1 text-xs font-bold uppercase'>
              Highlight
            </div>
          )}
        </CUICard.Footer>
      )}
    </CUICard>
  )
}
