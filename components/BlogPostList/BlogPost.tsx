import Link from 'next/link'
import { BlogPost as BlogPostType } from '../../types/blogs'
import { convertDateToString } from '../../lib/utils/dateUtils'
import { StrapiImage } from '../StrapiElements'
import { CUICard } from '../ClickUI'

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
      href={`/blog/${slug}`}
      className={` transition ease-in-out hover:-translate-y-1 hover:scale-102 blog-post-card blog-post-card-${slug} hover:no-underline category-${category
        .split(' ')
        .join('-')
        .toLowerCase()}`}>
      <CUICard className='h-full'>
        <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
          {thumbnailPng && (
            <StrapiImage
              {...thumbnailPng}
              sizes='medium'
              alt={title}
              className='rounded-t-lg object-cover w-full h-52'
              width={100}
              height={100}
            />
          )}
          <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
            <div className='mb-2 font-inconsolata text-primary-300 font-medium text-base'>
              {category}
            </div>
            <div className='font-basier text-xl font-medium leading-tight cursor-pointer  text-neutral-100'>
              {title}
            </div>
          </div>
        </CUICard.Body>
        <CUICard.Footer className='flex items-center w-full p-6 text-neutral-300 text-sm'>
          {footer.join(' · ')}
        </CUICard.Footer>
      </CUICard>
    </Link>
  )
}
