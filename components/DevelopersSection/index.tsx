import { ArrowRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import { CUIButton, CUICard } from '../ClickUI'
import { SuiTitle } from '../sui'
import developerOptions from './developerOptions.json'

function DevelopersSection() {
  return (
    <div className='section-container px-12'>
      <SuiTitle type='h2' className='w-full text-left mb-8'>
        What do developers say?
      </SuiTitle>
      <div className='flex flex-col md:flex-row mb-8 gap-10'>
        <div className='w-full md:w-1/2 flex items-start'>
          <iframe
            src='https://www.youtube.com/embed/CVVp6N8Xeoc?rel=0'
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            allowFullScreen
            className='rounded-lg h-fit w-full top-0 left-0 relative aspect-video'
            title='Getting Started.mp4'></iframe>
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <div className='text-md font-semibold text-neutral-0'>
            ClickHouse is a preferred option for the Observability team for
            processing access logs and providing analytics on Disney+'s content
            distribution system. Its flexibility and simplicity make it a
            powerful tool for content distribution analytics.
          </div>
          <div className='grid md:grid-cols-[0.5rem_1fr] gap-6 mt-8'>
            <div className='bg-primary-300 w-full h-full hidden md:flex' />
            <div className='text-neutral-200'>
              “We were really not doing well with ingesting all the logs that we
              have because it's big data, it's all the users of Disney+
              generating that data. Ever since we chose ClickHouse, it's been
              going well.”
              <div className='flex flex-col text-base mt-4'>
                <div className='mb-1'>Roni Lazimi</div>
                <div className='leading-none text-primary-300 font-medium font-inconsolata'>
                  Software Engineer, Disney+
                </div>
              </div>
            </div>
          </div>

          <CUIButton
            className='mt-8 mb-4'
            type='secondary'
            href='/blog/nyc-meetup-report-high-speed-content-distribution-analytics-for-streaming-platforms'
            iconRight={<ArrowRightIcon height='16' />}>
            Learn More
          </CUIButton>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {developerOptions.map((developerOption, index) => (
          <CUICard key={`developerOption-${index}`}>
            {developerOption.img && (
              <CUICard.Header className='w-full h-44'>
                <Image
                  src={developerOption.img}
                  alt={`Image for ${developerOption.title ?? ''}`}
                  width={385}
                  height={172}
                  className='w-full h-full aspect-video object-cover'
                />
              </CUICard.Header>
            )}
            {developerOption.description && (
              <CUICard.Body className='flex flex-col items-center justify-center gap-2 px-6 py-8'>
                <div className='text-center text-xl font-semibold'>
                  {developerOption.title}
                </div>
                <div className='text-center text-neutral-200 text-sm'>
                  {developerOption.description}
                </div>
              </CUICard.Body>
            )}
            <CUICard.Footer className='grid place-items-center w-full px-6 pb-6'>
              <CUIButton
                type='secondary'
                linkClass='w-full inline-grid'
                href={developerOption.href}
                target='_blank'
                iconRight={<ArrowRightIcon height='16' />}>
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
