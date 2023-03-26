import { ArrowRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import { CUIButton, CUICard } from '../ClickUI'
import { SuiTitle } from '../sui'
import developerOptions from './developerOptions.json'

function DevelopersSection() {
  return (
    <div className='section-container'>
      <SuiTitle type='h2' className='w-full text-left mb-8'>
        What do developers say?
      </SuiTitle>
      <div className='flex flex-col md:flex-row mb-16 gap-10'>
        <div className='w-full md:w-1/2 flex items-start'>
          <iframe
            src='https://player.vimeo.com/video/756877867?h=c58e171729&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            allowFullScreen
            className='rounded-lg h-fit w-full top-0 left-0 relative aspect-video'
            title='Getting Started.mp4'></iframe>
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <div className='text-lg font-bold text-neutral-0'>
            “We saw huge speed gains from the moment we introduced ClickHouse to
            our stack”
          </div>
          <div className='grid grid-cols-[0.5rem_1fr] gap-6 mt-8'>
            <div className='bg-primary-300 w-full h-full' />
            <div className='text-neutral-200'>
              Disney moved its logging platform to ClickHouse increasing
              developer productivity and overall reliability of the platform
              while seeing 3x data compression, 10x performance increase, and ½
              the reduction in hardware cost. Disney moved its logging platform
              to ClickHouse increasing developer productivity.
            </div>
          </div>
          <div className='flex flex-col text-base mt-8 mb-10'>
            <div className='mb-1'>John Johnson,</div>
            <div className='leading-none text-primary-300 font-medium font-inconsolata'>
              Head of Engineering @ Disney
            </div>
          </div>
          <CUIButton
            type='secondary'
            href='/'
            iconRight={<ArrowRightIcon height='16' />}>
            Learn More
          </CUIButton>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {developerOptions.map((developerOption, index) => (
          <CUICard key={`developerOption-${index}`}>
            {developerOption.img && (
              <CUICard.Header className='w-full h-32'>
                <Image
                  src={developerOption.img}
                  alt={`Image for ${developerOption.title ?? ''}`}
                  width={385}
                  height={128}
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
