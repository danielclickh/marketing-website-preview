'use client'

import iconVs from './assets/icon-vs.png'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
import ScaleToContainer from '@/components/ScaleToContainer'
import Image, { ImageProps } from 'next/image'
import React, { useEffect, useState } from 'react'

const lineHeight = 84

export interface ClickHouseVersusAnimationProps {
  competitorName: string
  competitorLogo: ImageProps['src']
  competitorLineColor: string
  competitorCardColor: React.CSSProperties['backgroundColor']
}

export default function ClickHouseVersusAnimation({
  competitorName,
  competitorLogo,
  competitorCardColor,
  competitorLineColor
}: ClickHouseVersusAnimationProps) {
  return (
    <ScaleToContainer scaleUp={false} className='mx-auto'>
      <div className='flex w-fit flex-col items-center gap-x-16 gap-y-8 lg:flex-row lg:flex-nowrap lg:px-12'>
        <ClickHouseAnimation />
        <Image
          src={iconVs}
          width={60}
          height={60}
          alt='VS'
          className='rounded-full shadow-xl'
        />
        <CompetitorAnimation
          name={competitorName}
          logo={competitorLogo}
          lineColor={competitorLineColor}
          cardColor={competitorCardColor}
        />
      </div>
    </ScaleToContainer>
  )
}

function AnimationBadge({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`whitespace-nowrap rounded border border-neutral-700 bg-neutral-750 px-4 py-2 text-center font-mono text-sm shadow-lg ${className}`}>
      {children}
    </div>
  )
}

function AnimationCounter({
  interval = 1000,
  max = 1000
}: {
  interval?: number
  max?: number
}) {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount((prev) => (prev === max ? 1 : prev + 1))
    }, interval)

    return () => window.clearInterval(intervalId)
  }, [interval, max])

  return (
    <span
      className='inline-block'
      style={{ width: `${max.toString().length}ch` }}>
      {count}
    </span>
  )
}

function ClickHouseAnimation() {
  const speedModifier = 0.5
  return (
    <div className='w-96'>
      <div className='flex justify-center'>
        <AnimationBadge>
          <span className='text-[#88AECE]'>INSERT INTO</span>{' '}
          <span className='text-[#B6BD68]'>'clickhouse'</span>...
        </AnimationBadge>
      </div>
      <div className='mx-auto flex w-max gap-3.5'>
        <AnimatedDataLine
          size={lineHeight}
          direction='down'
          trackColor='rgba(255,255,255,0.2)'
          trackProps={{
            className: 'backdrop-saturate-150'
          }}
          keyframes={[
            { startSize: 1, endSize: 2, duration: 0.75 + speedModifier },
            { startSize: 0.5, endSize: 1.5, duration: 0.8 + speedModifier },
            { startSize: 1.1, endSize: 1, duration: 0.4 + speedModifier }
          ]}
        />
        <AnimatedDataLine
          size={lineHeight}
          direction='down'
          trackColor='rgba(255,255,255,0.2)'
          trackProps={{
            className: 'backdrop-saturate-150'
          }}
          keyframes={[
            { startSize: 0.25, endSize: 1, duration: 0.5 + speedModifier },
            { startSize: 1, endSize: 0.8, duration: 0.2 + speedModifier },
            { startSize: 0.8, endSize: 1.2, duration: 0.8 + speedModifier }
          ]}
        />
        <AnimatedDataLine
          size={lineHeight}
          direction='down'
          trackColor='rgba(255,255,255,0.2)'
          trackProps={{
            className: 'backdrop-saturate-150'
          }}
          keyframes={[
            { startSize: 1, endSize: 2, duration: 0.75 + speedModifier },
            { startSize: 0.5, endSize: 1.5, duration: 1 + speedModifier },
            { startSize: 1.1, endSize: 1, duration: 1 + speedModifier }
          ]}
        />
      </div>

      <div className='relative mx-auto w-72'>
        <div className='absolute inset-0 z-0 animate-fadeInOut bg-primary-300/80 blur-lg' />
        <div className='relative z-10 rounded bg-primary-300 p-3.5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='55'
            height='56'
            fill='none'
            className='mx-auto'>
            <path
              fill='#000'
              d='M4.87 5.37c0-.27.23-.55.55-.55h4c.28 0 .56.23.56.55V49.9c0 .28-.23.55-.55.55H5.42a.55.55 0 0 1-.55-.55V5.37Zm10.12 0c0-.27.23-.55.55-.55h4c.28 0 .56.23.56.55V49.9c0 .28-.23.55-.55.55h-4.01a.55.55 0 0 1-.55-.55V5.37Zm10.11 0c0-.27.24-.55.56-.55h4c.28 0 .55.23.55.55V49.9c0 .28-.22.55-.54.55h-4.01a.55.55 0 0 1-.55-.55V5.37Zm10.13 0c0-.27.23-.55.55-.55h4c.28 0 .55.23.55.55V49.9c0 .28-.22.55-.54.55h-4.01a.55.55 0 0 1-.55-.55V5.37ZM45.4 23.1c0-.27.22-.54.54-.54h4.01c.28 0 .55.22.55.54v9.07c0 .28-.23.55-.55.55h-4.01a.55.55 0 0 1-.55-.55V23.1Z'
            />
          </svg>
        </div>
      </div>

      <div className='flex justify-center gap-6'>
        <div>
          <div className='mx-auto flex w-max gap-3.5'>
            <AnimatedDataLine
              size={lineHeight}
              direction='up'
              trackColor='rgba(255,255,255,0.2)'
              trackProps={{
                className: 'backdrop-saturate-150'
              }}
              keyframes={[
                {
                  startSize: 0.8,
                  endSize: 1.2,
                  duration: 0.5 + speedModifier
                },
                { startSize: 1, endSize: 1.5, duration: 0.8 + speedModifier },
                { startSize: 2, endSize: 1.3, duration: 0.4 + speedModifier },
                { startSize: 1.1, endSize: 2, duration: 0.2 + speedModifier }
              ]}
            />
            <AnimatedDataLine
              size={lineHeight}
              direction='up'
              trackColor='rgba(255,255,255,0.2)'
              trackProps={{
                className: 'backdrop-saturate-150'
              }}
              keyframes={[
                { startSize: 2, endSize: 1.2, duration: 0.2 + speedModifier },
                {
                  startSize: 1.1,
                  endSize: 1.8,
                  duration: 0.8 + speedModifier
                },
                { startSize: 1, endSize: 1.4, duration: 0.6 + speedModifier }
              ]}
            />
            <AnimatedDataLine
              size={lineHeight}
              direction='up'
              trackColor='rgba(255,255,255,0.2)'
              trackProps={{
                className: 'backdrop-saturate-150'
              }}
              keyframes={[
                { startSize: 0.5, endSize: 1.3, duration: 1 + speedModifier },
                { startSize: 2, endSize: 1.5, duration: 0.3 + speedModifier },
                {
                  startSize: 1.2,
                  endSize: 1.9,
                  duration: 0.6 + speedModifier
                }
              ]}
            />
          </div>
          <AnimationBadge>
            <span className='text-[#88AECE]'>SELECT</span> *{' '}
            <span className='text-[#88AECE]'>FROM</span>...
          </AnimationBadge>
        </div>
        <div>
          <div className='mx-auto flex w-max gap-3.5'>
            <AnimatedDataLine
              size={lineHeight}
              direction='down'
              trackColor='rgba(255,255,255,0.2)'
              trackProps={{
                className: 'backdrop-saturate-150'
              }}
              keyframes={[
                {
                  startSize: 0.5,
                  endSize: 1.5,
                  duration: 0.8 + speedModifier
                },
                { startSize: 1, endSize: 2, duration: 0.75 + speedModifier },
                { startSize: 1.1, endSize: 1, duration: 0.4 + speedModifier },
                { startSize: 2, endSize: 1.5, duration: 0.3 + speedModifier }
              ]}
            />
            <AnimatedDataLine
              size={lineHeight}
              direction='down'
              trackColor='rgba(255,255,255,0.2)'
              trackProps={{
                className: 'backdrop-saturate-150'
              }}
              keyframes={[
                {
                  startSize: 0.8,
                  endSize: 1.2,
                  duration: 0.8 + speedModifier
                },
                { startSize: 0.5, endSize: 1.5, duration: 1 + speedModifier },
                {
                  startSize: 0.25,
                  endSize: 1,
                  duration: 0.5 + speedModifier
                },
                { startSize: 1, endSize: 0.8, duration: 0.2 + speedModifier }
              ]}
            />
            <AnimatedDataLine
              size={lineHeight}
              direction='down'
              trackColor='rgba(255,255,255,0.2)'
              trackProps={{
                className: 'backdrop-saturate-150'
              }}
              keyframes={[
                { startSize: 1.1, endSize: 1, duration: 1 + speedModifier },
                { startSize: 1, endSize: 2, duration: 0.75 + speedModifier },
                { startSize: 0.5, endSize: 1.5, duration: 1 + speedModifier }
              ]}
            />
          </div>
          <AnimationBadge className='flex divide-x divide-neutral-700 !p-0'>
            <span className='px-4 py-2'>
              <AnimationCounter interval={10} />
            </span>
            <span className='px-4 py-2'>...</span>
            <span className='px-4 py-2'>...</span>
          </AnimationBadge>
        </div>
      </div>
    </div>
  )
}

function CompetitorAnimation({
  logo,
  name,
  lineColor,
  cardColor
}: {
  name: string
  logo: ImageProps['src']
  lineColor: string
  cardColor: React.CSSProperties['backgroundColor']
}) {
  return (
    <div className='w-96'>
      <div className='flex justify-center'>
        <AnimationBadge>
          <span className='text-[#88AECE]'>INSERT INTO</span>{' '}
          <span className='text-[#B6BD68]'>'{name}'</span>...
        </AnimationBadge>
      </div>
      <div className='mx-auto flex w-max gap-3.5'>
        <AnimatedDataLine
          size={lineHeight}
          direction='down'
          lineColor={lineColor}
          strokeWidth={16}
          trackColor='rgba(255,255,255,0.2)'
          trackProps={{
            className: 'backdrop-saturate-150'
          }}
          lineProps={{
            strokeDasharray: '6 8'
          }}
          keyframes={[{ startSize: 1, endSize: 1, duration: 4 }]}
        />
      </div>

      <div className='relative mx-auto w-72'>
        <div
          className='relative z-10 rounded p-3.5'
          style={{ backgroundColor: cardColor }}>
          <Image
            src={logo}
            alt={name}
            width={384}
            height={56}
            className='mx-auto h-14 w-auto'
          />
        </div>
      </div>

      <div className='flex justify-center gap-6'>
        <div>
          <div className='mx-auto flex w-max gap-3.5'>
            <AnimatedDataLine
              size={lineHeight}
              direction='up'
              lineColor={lineColor}
              trackColor='rgba(255,255,255,0.2)'
              trackProps={{
                className: 'backdrop-saturate-150'
              }}
              keyframes={[
                { startSize: 0.8, endSize: 1.2, duration: 3.5 },
                { startSize: 1, endSize: 1.5, duration: 3.8 },
                { startSize: 2, endSize: 1.3, duration: 3.4 },
                { startSize: 1.1, endSize: 2, duration: 3.2 }
              ]}
            />
          </div>
          <AnimationBadge>
            <span className='text-[#88AECE]'>SELECT</span> *{' '}
            <span className='text-[#88AECE]'>FROM</span>...
          </AnimationBadge>
        </div>
        <div>
          <div className='mx-auto flex w-max gap-3.5'>
            <AnimatedDataLine
              size={lineHeight}
              direction='down'
              lineColor={lineColor}
              trackColor='rgba(255,255,255,0.2)'
              trackProps={{
                className: 'backdrop-saturate-150'
              }}
              keyframes={[
                { startSize: 0.5, endSize: 1.5, duration: 3.8 },
                { startSize: 1, endSize: 2, duration: 3.75 },
                { startSize: 1.1, endSize: 1, duration: 3.4 },
                { startSize: 2, endSize: 1.5, duration: 3.3 }
              ]}
            />
          </div>
          <AnimationBadge className='flex divide-x divide-neutral-700 !p-0'>
            <span className='px-4 py-2'>
              <AnimationCounter interval={700} />
            </span>
            <span className='px-4 py-2'>...</span>
            <span className='px-4 py-2'>...</span>
          </AnimationBadge>
        </div>
      </div>
    </div>
  )
}
