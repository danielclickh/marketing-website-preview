import Link from 'next/link'
import { BlogPost as BlogPostType } from '../../app/blog/types'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiText, SuiTitle } from '../sui'

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
    <Link href={`/blog/${slug}`}>
      <div className='flex w-full bg-white dark:bg-gunmetal flex-col group md:max-w-sm hover:cursor-pointer shadow-md hover:shadow-xl ease-in-out duration-300 rounded-lg'>
        <div className='flex flex-col'>
          {thumbnailPng && (
            <div className='w-full h-28 overflow-hidden'>
              <StrapiImage
                {...thumbnailPng}
                sizes='thumbnail'
                alt={title}
                className='rounded-t-lg object-cover w-full h-full'
                width='100'
                height='100'
                unoptimized
              />
            </div>
          )}

          <div className='px-6 py-6'>
            <SuiTitle type='h6' color='c6' className='mb-2'>
              {category}
            </SuiTitle>
            <SuiTitle
              type='h4'
              className='group-hover:underline cursor-pointer'>
              {title}
            </SuiTitle>
            {shortDescription && (
              <SuiText
                size='xs'
                weight='medium'
                color='secondary'
                className='line-clamp'>
                <Markdown>{shortDescription}</Markdown>
              </SuiText>
            )}
            <div className='flex flex-row space-x-4 pt-2'>
              {author.avatarPng && (
                <div className='flex w-11 h-11'>
                  <StrapiImage
                    {...author.avatarPng}
                    alt={author.name}
                    width='44'
                    height='44'
                    className='rounded-full'
                  />
                </div>
              )}
              <div className='flex'>
                <div className='flex flex-col'>
                  <SuiText size='sm' weight='medium'>
                    {author.name}
                  </SuiText>
                  <SuiText size='xs' weight='medium' color='secondary'>
                    {date || publishedAt}
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
