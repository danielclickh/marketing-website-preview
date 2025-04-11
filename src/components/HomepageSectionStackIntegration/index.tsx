import { SuiText, SuiTitle } from '../sui'
import Image from 'next/image'
import React from 'react'

export default function HomepageSectionStackIntegration({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`my-16 md:my-32 ${className}`} {...props}>
      {/* Intro text */}
      <div className='mb-16 flex justify-center md:mb-32'>
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
          <div className='absolute bottom-[39.56%] left-[33.55%] right-[33.05%] top-[2.19%] z-10 animate-pulse rounded-lg shadow-stackIntegrationGraphicSmall lg:shadow-stackIntegrationGraphic'></div>
          <Image
            src='/images/homepage/stack-integration-graph.svg'
            alt='Stack integration graph'
            width={1198}
            height={547}
            className='relative z-20 block max-w-full'
          />
        </div>
      </div>
    </div>
  )
}
