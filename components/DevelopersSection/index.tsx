import { ArrowRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import { CUIBasicCard, CUIButton } from '../ClickUI'
import { SuiTitle } from '../sui'

function DevelopersSection() {
  return (
    <div className='mb-10 section-container'>
      <SuiTitle type='h2' className='w-full text-left'>
        What do developers say?
      </SuiTitle>
      <div className='flex flex-col md:flex-row'>
        <Image
          src='/'
          width='100'
          height='100'
          alt='Developers story image'
          className='w-full md:w-1/2'
        />
        <div className='flex flex-col w-full md:w-1/2'>
          <div>
            “We saw huge speed gains from the moment we introduced ClickHouse to
            our stack”
          </div>
          <div className='flex flex-row gap-6 mt-8'>
            <div className='bg-primary w-2 h-full' />
            <div>
              Disney moved its logging platform to ClickHouse increasing
              developer productivity and overall reliability of the platform
              while seeing 3x data compression, 10x performance increase, and ½
              the reduction in hardware cost. Disney moved its logging platform
              to ClickHouse increasing developer productivity.
            </div>
          </div>
          <div className='flex flex-col text-base mt-8 mb-10'>
            <div className='leading-normal'>John Johnson,</div>
            <div className='leading-none text-primary-300'>
              Head of Engineering @ Disney
            </div>
          </div>
          <CUIButton
            type='secondary'
            href='/'
            iconRight={<ArrowRightIcon height='24' />}>
            Learn More
          </CUIButton>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <CUIBasicCard
          icon='/cloud.svg'
          title='Susan Wright - Uber'
          btnChildren='Learn more'
          href='https://clickhouse.cloud'
          className='w-full'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi.
        </CUIBasicCard>
        <CUIBasicCard
          icon='/cloud.svg'
          title='Susan Wright - Uber'
          btnChildren='Learn more'
          href='https://clickhouse.cloud'
          className='w-full'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi.
        </CUIBasicCard>
        <CUIBasicCard
          icon='/cloud.svg'
          title='Susan Wright - Uber'
          btnChildren='Learn more'
          href='https://clickhouse.cloud'
          className='w-full'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi.
        </CUIBasicCard>
      </div>
    </div>
  )
}

export default DevelopersSection
