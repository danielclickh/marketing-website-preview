import Link from 'next/link'
import React from 'react'
import { findOne } from '../../lib/api/strapi'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { StrapiPicture } from '../StrapiElements'
import { SuiTitle } from '../sui'

interface DataProps {
  title: string
  iconButtons: {
    darkIconPng: StrapiImageType
    lightIconPng: StrapiImageType
    href: string
    target?: string
  }[]
}

async function getData(): Promise<DataProps> {
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
    <div className='w-full bg-c2 text-c5 pt-16 pb-12'>
      <div className='flex flex-col container mx-auto max-w-7xl px-8 2xl:px-0 mb-12'>
        <SuiTitle type='h2'>{title}</SuiTitle>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pt-11'>
          {iconButtons.map((iconButton) => (
            <Link
              key={iconButton.href}
              href={iconButton.href}
              target={iconButton.target}>
              <div className='flex w-full xl:w-52 bg-c1 rounded-lg py-6 justify-center hover:shadow-xl ease-in-out duration-200 cursor-pointer'>
                <StrapiPicture
                  dark={iconButton.darkIconPng}
                  light={iconButton.lightIconPng}
                  className='h-11 w-auto'
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
