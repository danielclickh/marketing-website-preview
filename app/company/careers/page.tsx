import { SuiText, SuiTitle } from '../../../components/sui'

import Image from 'next/image'
import { findOne } from '../../../lib/api/strapi'
import CareersFilter from '../../../components/CareersFilter'
import GetStarted from '../../../components/GetStarted'

async function getData() {
  const data = await findOne('career', {
    populate: [
      'hero',
      'hero.companyImages',
      'companyValues',
      'companyValues.iconSvg'
    ]
  })
  return data
}

export default async function CareersPage() {
  const { hero, companyValues, positionsTitle } = await getData()
  const { title, description, paragraphTitle, paragraphText } = hero
  return (
    <>
      <div className='bg-white dark:bg-gunmetal bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle type='h1' className='mb-2'>
              {title}
            </SuiTitle>
            <SuiText
              type='p1'
              weight='medium'
              color='dark'
              className='max-w-2xl'>
              {description}
            </SuiText>
          </div>
        </div>
        <div className='bg-careers_background bg-center bg-cover w-full h-64 my-12' />
        <div className='w-full pt-4 pb-12'>
          <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12'>
            <div className='flex flex-col md:w-4/5'>
              <SuiTitle type='h3' className='mb-4'>
                {paragraphTitle}
              </SuiTitle>
              <SuiText
                type='p2'
                weight='medium'
                className='whitespace-pre-wrap'>
                {paragraphText}
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full container-light-color pt-12 pb-12'>
        {companyValues.map((companyValue, index: number) => (
          <div
            className={`flex flex-col md:${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            } container mx-auto max-w-7xl px-6 md:space-x-16 mb-12 items-center`}
            key={companyValue.title}>
            <div className='flex flex-col md:w-3/5'>
              <SuiTitle type='h3' className='mb-4'>
                {companyValue.title}
              </SuiTitle>
              <SuiText
                type='p2'
                weight='medium'
                color='dark'
                className='whitespace-pre-wrap'>
                {companyValue.description}
              </SuiText>
            </div>
            <div className='flex flex-col md:w-2/5 mt-6 md:mt-12 items-center'>
              <Image
                src={companyValue.iconSvg}
                alt='Empathy at work'
                width='212'
                height='212'
              />
            </div>
          </div>
        ))}
      </div>

      <div className='w-full bg-white dark:bg-gunmetal pt-16 pb-16'>
        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12 items-center'>
          <div className='flex flex-col md:w-3/5'>
            <SuiTitle type='h3'>{positionsTitle}</SuiTitle>
          </div>
        </div>

        <CareersFilter />
      </div>
      <GetStarted />
    </>
  )
}
