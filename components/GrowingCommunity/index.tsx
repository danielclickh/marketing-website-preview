import Image from 'next/image'
import React from 'react'
import { CUILink } from '../ClickUI'
import SocialIcon from '../SocialIcon'
import { SuiTitle } from '../sui'
import socials from './socials.json'

function GrowingCommunity() {
  return (
    <div className='px-4 section-container'>
      <div className='w-full text-neutral-0 flex flex-col justify-center items-center mb-24 bg-neutral-900/50 border border-neutral-700/80 px-8 py-16 rounded-lg'>
        <SuiTitle type='h2' className='text-center'>
          Join the{' '}
          <span className='tilted tilted-yellow'>
            <span className='tilted-content'>100k+</span>
          </span>{' '}
          developers using ClickHouse today
        </SuiTitle>
        <div className='flex flex-wrap justify-center items-center gap-8 pt-11'>
          {socials.map((social) => (
            <SocialIcon
              key={social.name}
              href={social.href}
              imgSrc={social.imgSrc}
              name={social.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GrowingCommunity
