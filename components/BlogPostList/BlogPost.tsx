import Image from 'next/image'
import Link from 'next/link'
import { BlogPost as BlogPostType } from '../../app/blog/types'
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

  const thumbnail = thumbnailPng.data.attributes.formats.thumbnail
  const avatar = author.avatarPng.data.attributes.url

  return (
    <Link href={`/blog/${slug}`}>
      <div className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 flex-col group md:max-w-sm hover:cursor-pointer shadow-md hover:shadow-xl ease-in-out duration-300 rounded-lg'>
        <div className='flex flex-col'>
          <div className='w-full h-28 overflow-hidden'>
            <Image
              src={thumbnail.url}
              alt={title}
              className='rounded-t-lg'
              width='558'
              height='300'
            />
          </div>

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
            <SuiText color='dark'>
              <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
            </SuiText>
            <div className='flex flex-row space-x-4 pt-2'>
              <div className='flex w-11 h-11'>
                <Image src={avatar} alt={author.name} width='44' height='44' />
              </div>
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
