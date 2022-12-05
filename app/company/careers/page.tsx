import { SuiSpacer, SuiText, SuiTitle } from '../../../components/sui'

import Image from 'next/image'
import { findOne } from '../../../lib/api/strapi'
import CareersFilter from '../../../components/CareersFilter'

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
  return (
    <>
      <div className='bg-web-light-c1 dark:bg-web-dark-c1 bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle size='web'>
              <h1>{hero.title}</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>{hero.description}</p>
              </SuiText>
            </div>
          </div>
        </div>
        <div className='bg-careers_background bg-center bg-cover w-full h-64 my-12' />
        <div className='w-full pt-4 pb-12'>
          <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12'>
            <div className='flex flex-col md:w-4/5'>
              <SuiTitle size='lg'>
                <h2>{hero.paragraphTitle}</h2>
              </SuiTitle>
              <SuiSpacer size='md' />
              <SuiText size='lg'>
                <p>{hero.paragraphText}</p>
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full bg-web-light-c2 dark:bg-web-dark-c2 pt-12 pb-12'>
        {companyValues.map((companyValue) => (
          <div
            className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12 items-center'
            key={companyValue.title}>
            <div className='flex flex-col md:w-3/5'>
              <SuiTitle size='lg'>
                <h2>{companyValue.title}</h2>
              </SuiTitle>
              <SuiSpacer size='md' />
              <SuiText size='lg' color='dark'>
                <p>{companyValue.description}</p>
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

      <div className='w-full bg-web-light-c1 dark:bg-web-dark-c1 pt-16 pb-16'>
        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12 items-center'>
          <div className='flex flex-col md:w-3/5'>
            <SuiTitle size='lg'>
              <h2>{positionsTitle}</h2>
            </SuiTitle>
          </div>
        </div>

        <CareersFilter />
      </div>
    </>
  )
}
