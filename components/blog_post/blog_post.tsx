import Image from 'next/image'
import Link from 'next/link'
import { SuiSpacer, SuiText, SuiTitle } from '../sui'

type BlogPostProps = {
  image: string
  tag: string
  title: string
  abstract: string
  date: string
  author_avatar: string
  author_name: string
}

export function BlogPost(props: BlogPostProps) {
  const { image, tag, title, abstract, date, author_avatar, author_name } =
    props

  return (
    <Link href='/blog/new-docs/'>
      <div className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 flex-col group md:max-w-sm hover:cursor-pointer shadow-md hover:shadow-xl ease-in-out duration-300 rounded-lg'>
        <div className='flex flex-col'>
          <div className='w-full h-28 overflow-hidden'>
            <Image
              src={`/blog/${image}`}
              alt={title}
              className='rounded-t-lg'
              width='558'
              height='300'
            />
          </div>

          <div className='px-6 py-6'>
            <SuiTitle size='xxs' uppercase color='primary' hover>
              <h5>{tag}</h5>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <SuiTitle
              size='md'
              className='group-hover:underline cursor-pointer'>
              <h3>{title}</h3>
            </SuiTitle>
            <SuiText color='dark'>{abstract}...</SuiText>
            <div className='flex flex-row space-x-4 pt-2'>
              <div className='flex w-11 h-11'>
                <Image
                  src={`/blog/${author_avatar}`}
                  alt={author_name}
                  width='44'
                  height='44'
                />
              </div>
              <div className='flex'>
                <div className='flex flex-col'>
                  <SuiText padding_0>{author_name}</SuiText>
                  <SuiText padding_0 color='dark'>
                    {date}
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
