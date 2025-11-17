import { CUICard } from '../../ClickUI'
import { StrapiImageUrl } from '../../StrapiElements'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { BlogPost as BlogPostType } from '@/types/blogs'
import Link from 'next/link'

export default function BlogPost({
  thumbnailPng,
  author,
  category,
  slug,
  title,
  date,
  publishedAt
}: BlogPostType) {
  const footer = [author.name]
  if (date || publishedAt) {
    footer.push(convertDateToString(date || publishedAt))
  }

  return (
    <Link
      prefetch={false}
      href={`/jp/blog/${slug}`}
      className={`hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1 blog-post-card-${slug} hover:no-underline category-${category
        .split(' ')
        .join('-')
        .toLowerCase()}`}>
      <CUICard className='h-full'>
        <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
          {thumbnailPng && (
            <StrapiImageUrl
              {...thumbnailPng}
              sizes='medium'
              alt={title}
              className='w-full rounded-t-lg xl:h-52 xl:object-cover'
              width={100}
              height={100}
            />
          )}
          <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
            <div className='cursor-pointer font-basier text-xl font-medium leading-tight text-neutral-100'>
              {title}
            </div>
          </div>
        </CUICard.Body>
        <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
          {footer.join(' · ')}
        </CUICard.Footer>
      </CUICard>
    </Link>
  )
}
