import Link from 'next/link'
import React from 'react'
import { findOne } from '../../lib/api/strapi'
import { StrapiPicture } from '../StrapiElements'
import { SuiTitle } from '../sui'

async function getData() {
  const data = await findOne('growing-community', {
    populate: [
      'iconButtons',
      'iconButtons.darkIconPng',
      'iconButtons.lightIconPng'
    ]
  })

  return data
}

async function GrowingCommunity() {
  const { title, iconButtons } = await getData()

  return (
    <div className='w-full container-light-color pt-16 pb-12'>
      <div className='flex flex-col container mx-auto max-w-7xl px-8 2xl:px-0 mb-12'>
        <SuiTitle type='h3'>{title}</SuiTitle>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-2 gap-x-6 pt-8'>
          {iconButtons.map((iconButton) => (
            <Link
              key={iconButton.href}
              href={iconButton.href}
              target={iconButton.target}>
              <div className='flex w-full xl:w-52 bg-white dark:bg-gunmetal rounded-lg py-6 justify-center hover:shadow-xl ease-in-out duration-200 cursor-pointer'>
                <StrapiPicture
                  dark={iconButton.darkIconPng}
                  light={iconButton.lightIconPng}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GrowingCommunity
