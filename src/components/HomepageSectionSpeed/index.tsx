import Image from 'next/image'
import React from 'react'
import SpeedAnimationSvg from '../SpeedAnimation'
import SpeedAnimationMobileSvg from '../SpeedAnimation/Mobile'
import { SuiTitle } from '../sui'

export default function HomepageSectionSpeed({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`flex w-full text-neutral-0 ${className}`} {...props}>
      <div className='section-container mx-auto flex w-full flex-col items-center pt-24 text-center'>
        <Image src='/speed-icon.svg' alt='Speed Icon' width={73} height={72} />
        <SuiTitle type='h2' className='mb-6 mt-8'>
          Speed up queries from any data source
        </SuiTitle>
        <div className='mx-auto mb-10 max-w-screen-sm text-center leading-normal text-neutral-200 md:mb-16'>
          ClickHouse supports all the data sources you need to power your apps
          and use cases that require exceptional performance.
        </div>
        <div className='flex w-full justify-center md:hidden md:px-12'>
          <SpeedAnimationMobileSvg className='h-auto max-w-full' />
        </div>
        <div className='hidden w-full md:block md:px-12'>
          <SpeedAnimationSvg className='h-auto max-w-full' />
        </div>
      </div>
    </div>
  )
}
