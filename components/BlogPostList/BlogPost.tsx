import Link from 'next/link'
import { BlogPost as BlogPostType } from '../../app/blog/types'
import { convertDateToString } from '../../lib/utils/dateUtils'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiText, SuiTitle } from '../sui'

const components = {
  a: (props: any) => <span {...props} />
}

export default function BlogPost(props: BlogPostType) {
  const {
    thumbnailPng,
    shortDescription,
    author,
    category,
    slug,
    title,
    date,
    publishedAt
  } = props

  return (
    <Link
      href={`/blog/${slug}`}
      className={`blog-post-card blog-post-card-${slug} hover:no-underline category-${category
        .split(' ')
        .join('-')}`}>
      <div className='flex w-full h-full bg-c1 flex-col group md:max-w-sm hover:cursor-pointer shadow-md hover:shadow-xl ease-in-out duration-300 rounded-lg'>
        <div className='h-full flex flex-col justify-between'>
          <div>
            {thumbnailPng && (
              <div className='w-full h-28 overflow-hidden'>
                <StrapiImage
                  {...thumbnailPng}
                  sizes='medium'
                  alt={title}
                  className='rounded-t-lg object-cover w-full h-full'
                  width={100}
                  height={100}
                />
              </div>
            )}

            <div className='px-4 py-4'>
              <SuiTitle type='h6' color='c6' className='mb-2'>
                {category}
              </SuiTitle>
              <SuiText
                size='lg'
                weight='bold'
                className='cursor-pointer pb-2 !text-xl'>
                {title}
              </SuiText>
              {shortDescription && (
                <SuiText
                  size='xs'
                  weight='medium'
                  color='secondary'
                  className='line-clamp'>
                  <Markdown components={components}>
                    {shortDescription}
                  </Markdown>
                </SuiText>
              )}
            </div>
          </div>
          <div className='flex flex-row items-center space-x-4 px-4 pb-6'>
            {author.avatarPng && (
              <div className='flex w-11 h-11 aspect-square'>
                <StrapiImage
                  {...author.avatarPng}
                  alt={author.name}
                  width={44}
                  height={44}
                  className='rounded-full'
                />
              </div>
            )}
            <div className='flex'>
              <div className='flex flex-col'>
                <SuiText size='sm' weight='medium'>
                  {author.name}
                </SuiText>
                {(date || publishedAt) && (
                  <SuiText size='sm' weight='medium' color='secondary'>
                    {convertDateToString(date || publishedAt)}
                  </SuiText>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
