import Image from 'next/image'
import React from 'react'
import { SuiText, SuiTitle } from '../sui'

export default function HomepageSectionStackIntegration() {
  return (
    <div className='my-32'>
      {/* Intro text */}
      <div className='mb-32 flex justify-center'>
        <div className='max-w-[650px] text-center'>
          <SuiTitle type='h2' color='inherit' className='mb-4'>
            Seamlessly integrate with your stack
          </SuiTitle>
          <SuiText size='lg' className='opacity-70'>
            Choose from our growing ecosystem of integrations for data
            ingestion, visualization, language clients, and more.
          </SuiText>
        </div>
      </div>

      {/* Graph */}
      <div className='section-container flex justify-center'>
        <div className='relative'>
          <div className='absolute top-[0.33%] left-[33.52%] bottom-[40.43%] right-[33.52%] z-10 animate-pulse rounded-lg shadow-stackIntegrationGraphicSmall lg:shadow-stackIntegrationGraphic'></div>
          <Image
            src='/images/homepage/stack-integration-graph.png'
            alt='Stack integration graph'
            width={1194}
            height={591}
            className='relative z-20 block max-w-full'
          />
        </div>
      </div>
    </div>
  )
}
