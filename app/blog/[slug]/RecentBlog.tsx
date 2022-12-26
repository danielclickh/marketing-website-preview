import Link from 'next/link'
import React from 'react'
import { StrapiImage } from '../../../components/StrapiElements'
import { SuiTitle } from '../../../components/sui'

function RecentBlog({ thumbnailPng, category, slug, title }) {
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
                className='rounded-t-lg'
                width='558'
                height='300'
              />
            </div>
          )}

          <div className='px-6 py-6'>
            <SuiTitle type='h6' color='primary' className='mb-2'>
              {category}
            </SuiTitle>
            <SuiTitle
              type='h4'
              className='group-hover:underline cursor-pointer'>
              {title}
            </SuiTitle>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecentBlog
