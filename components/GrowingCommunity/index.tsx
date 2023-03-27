import Image from 'next/image'
import React from 'react'
import { CUILink } from '../ClickUI'
import { SuiTitle } from '../sui'
import socials from './socials.json'

function GrowingCommunity() {
  return (
    <div className='w-full text-neutral-0 flex flex-col section-container justify-center items-center mb-24 bg-neutral-900/50 border border-neutral-700/80 py-16 rounded-lg'>
      <SuiTitle type='h2'>
        Join the{' '}
        <span className='tilted tilted-yellow'>
          <span className='tilted-content'>100k+</span>
        </span>{' '}
        developers using ClickHouse today
      </SuiTitle>
      <div className='flex flex-wrap gap-8 pt-11'>
        {socials.map((social) => (
          <CUILink
            key={social.name}
            href={social.href}
            className='w-16 h-16 bg-neutral-900 hover:bg-neutral-800 rounded grid place-items-center border border-neutral-700/80'>
            <Image
              src={social.imgSrc}
              width={32}
              height={32}
              alt={`${social.name} image`}
            />
          </CUILink>
        ))}
      </div>
    </div>
  )
}

export default GrowingCommunity
