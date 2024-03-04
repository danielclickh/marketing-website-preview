import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import { CUIButton, CUICard } from '../ClickUI'
import HomepageCustomerVideos from '../HomepageVideos'
import { SuiTitle } from '../sui'
import developerOptions from './developerOptions.json'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { FullyQualifiedEvent } from '../../lib/galaxy/client/index'

function DevelopersSection() {
  return (
    <div className='mx-auto max-w-4xl md:px-8 2xl:px-0 '>
      <SuiTitle type='h2' className='mb-8 w-full text-left'>
        What do developers say?
      </SuiTitle>

      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        {developerOptions.map((developerOption, index) => (
          <CUICard key={`developerOption-${index}`}>
            {developerOption.img && (
              <CUICard.Header>
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
                onClick={galaxyOnClick(
                  developerOption.event as FullyQualifiedEvent
                )}
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
