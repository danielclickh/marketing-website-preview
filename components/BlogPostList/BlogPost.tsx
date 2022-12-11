import Link from 'next/link'
import { BlogPost as BlogPostType } from '../../app/blog/types'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiSpacer, SuiText, SuiTitle } from '../sui'

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
                src={thumbnailPng}
                size='thumbnail'
                alt={title}
                className='rounded-t-lg'
                width='558'
                height='300'
              />
            </div>
          )}

          <div className='px-6 py-6'>
            <SuiTitle size='xxs' uppercase color='primary' hover>
              <h5>{category}</h5>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <SuiTitle
              size='md'
              className='group-hover:underline cursor-pointer'>
              <h3>{title}</h3>
            </SuiTitle>
            {shortDescription && (
              <SuiText color='dark'>
                <Markdown>{shortDescription}</Markdown>
              </SuiText>
            )}
            <div className='flex flex-row space-x-4 pt-2'>
              {author.avatarPng && (
                <div className='flex w-11 h-11'>
                  <StrapiImage
                    src={author.avatarPng}
                    alt={author.name}
                    width='44'
                    height='44'
                  />
                </div>
              )}
              <div className='flex'>
                <div className='flex flex-col'>
                  <SuiText padding_0>{author.name}</SuiText>
                  <SuiText padding_0 color='dark'>
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
