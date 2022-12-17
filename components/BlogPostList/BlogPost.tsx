import Image from 'next/image'
import Link from 'next/link'
import { BlogPost as BlogPostType } from '../../app/blog/types'
import Markdown from '../Markdown'
import { transformStrapi } from '../StrapiElements'
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
          {thumbnailPng.data && (
            <div className='w-full h-28 overflow-hidden'>
              <Image
                src={
                  transformStrapi(thumbnailPng?.data?.attributes, 'thumbnail')
                    ?.src
                }
                alt={title}
                className='rounded-t-lg object-cover w-full h-full'
                width='100'
                height='100'
                unoptimized
              />
            </div>
          )}

          <div className='px-6 py-6'>
            <SuiTitle size='xs' uppercase color='primary' hover>
              <h5>{category}</h5>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <SuiTitle className='group-hover:underline cursor-pointer'>
              <h3>{title}</h3>
            </SuiTitle>
            {shortDescription && (
              <SuiText color='dark' className='line-clamp'>
                <Markdown>{shortDescription}</Markdown>
              </SuiText>
            )}
            <div className='flex flex-row space-x-4 pt-2'>
              {author.avatarPng?.data?.attributes && (
                <div className='flex w-11 h-11'>
                  <Image
                    src={
                      transformStrapi(author.avatarPng?.data?.attributes)?.src
                    }
                    alt={author.name}
                    width='44'
                    height='44'
                    className='rounded-full'
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
