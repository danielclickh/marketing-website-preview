import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import { CUIButton, CUICard } from '../ClickUI'
import HomepageCustomerVideos from '../HomepageVideos'
import { SuiTitle } from '../sui'
import developerOptions from './developerOptions.json'

function DevelopersSection() {
  return (
    <div className='section-container md:px-8 2xl:px-0 '>
      <SuiTitle type='h2' className='mb-8 w-full text-left'>
        What do developers say?
      </SuiTitle>
      <div className='mb-8 flex flex-col gap-10 md:flex-row'>
        <div className='flex w-full items-start md:w-1/2'>
          <HomepageCustomerVideos
            fullWidth={true}
            videos={[
              {
                videoId: '884351851',
                type: 'vimeo',
                vimeoCode: '979264b085',
                image: '/images/disney-thumbnail.png'
              }
            ]}
          />
        </div>
        <div className='flex w-full flex-col md:w-1/2'>
          <div className='text-md font-semibold text-neutral-0'>
            ClickHouse is the most commonly used database for internal and
            commercial observability platforms. Disney+ uses ClickHouse to
            provide analytics for its content distribution system.
          </div>
          <div className='mt-8 grid gap-6 md:grid-cols-[0.5rem_1fr]'>
            <div className='hidden h-full w-full bg-primary-300 md:flex' />
            <div className='text-neutral-200'>
              “We were really not doing well with ingesting all the logs that we
              have because it's big data, it's all the users of Disney+
              generating that data. Ever since we chose ClickHouse, it's been
              going well.”
              <div className='mt-4 flex flex-col text-base'>
                <div className='mb-1'>Roni Lazimi</div>
                <div className='font-inconsolata font-medium leading-none text-primary-300'>
                  Software Engineer, Disney+
                </div>
              </div>
            </div>
          </div>

          <CUIButton
            className='group mt-8 mb-4'
            type='secondary'
            href='/blog/nyc-meetup-report-high-speed-content-distribution-analytics-for-streaming-platforms'
            iconRight={
              <ChevronRightIcon
                height='18'
                className='pt-0.5 transition group-hover:translate-x-1/2'
              />
            }>
            Learn More
          </CUIButton>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
        {developerOptions.map((developerOption, index) => (
          <CUICard key={`developerOption-${index}`}>
            {developerOption.img && (
              <CUICard.Header className='h-44 w-full'>
                <Image
                  src={developerOption.img}
                  alt={`Image for ${developerOption.title ?? ''}`}
                  width={385}
                  height={172}
                  className='aspect-video h-full w-full object-cover'
                />
              </CUICard.Header>
            )}
            {developerOption.description && (
              <CUICard.Body className='flex flex-col items-center justify-center gap-2 px-6 py-8'>
                <div className='text-center font-basier text-xl font-semibold'>
                  {developerOption.title}
                </div>
                <div className='text-center text-sm text-neutral-200'>
                  {developerOption.description}
                </div>
              </CUICard.Body>
            )}
            <CUICard.Footer className='grid w-full place-items-center px-6 pb-6'>
              <CUIButton
                type='secondary'
                linkClass='w-full group inline-grid'
                href={developerOption.href}
                target='_blank'
                iconRight={
                  <ChevronRightIcon
                    height='18'
                    className='pt-0.5 transition group-hover:translate-x-1/2'
                  />
                }>
                {developerOption.btnText}
              </CUIButton>
            </CUICard.Footer>
          </CUICard>
        ))}
      </div>
    </div>
  )
}

export default DevelopersSection
