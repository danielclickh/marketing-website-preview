import { SuiText, SuiTitle } from '../sui'
import Link from 'next/link'
import React from 'react'

function PerkCard({
  icon,
  title,
  text
}: {
  icon: React.ReactNode
  title: React.ReactNode | string
  text?: React.ReactNode | string
}) {
  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      {icon}
      <SuiTitle type='h3' color='inherit'>
        {title}
      </SuiTitle>
      <SuiText>{text}</SuiText>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  link,
  target,
  prefetch
}: {
  icon: React.ReactNode
  title: React.ReactNode | string
  link: string
  target?: React.HTMLAttributeAnchorTarget
  prefetch?: boolean
}) {
  return (
    <Link
      href={link}
      target={target}
      prefetch={prefetch}
      className='group flex items-center gap-4 rounded-lg bg-primary-300 px-4 py-6 text-primary-900 sm:flex-col sm:gap-4 sm:px-2 sm:text-center'>
      {icon}
      <SuiTitle type='h3' color='inherit' className='flex-1'>
        {title}
      </SuiTitle>
      <span className='ml-auto flex-shrink-0 flex-grow-0 whitespace-nowrap sm:ml-0'>
        More{' '}
        <span className='tanslate-x-0 inline-block transition-transform group-hover:translate-x-1'>
          -&gt;
        </span>
      </span>
    </Link>
  )
}

export default function HomepageSectionWhyClickhouse({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={`my-16 bg-neutral-700 py-16 md:my-32 lg:py-24 ${className}`}
      {...props}>
      <div className='section-container'>
        <div className='relative flex flex-col gap-8 overflow-clip rounded bg-neutral-750 p-8 lg:p-16'>
          {/* Gradient */}
          <div className='absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary-300 to-transparent'></div>

          {/* Intro text */}
          <div className='flex justify-center'>
            <div className='max-w-[600px] text-center'>
              <SuiTitle type='h2' color='inherit' className='mb-4'>
                Why ClickHouse?
              </SuiTitle>
              <SuiText size='lg' className='opacity-70'>
                ClickHouse is the fastest and most resource efficient real-time
                data warehouse and open-source database.
              </SuiText>
            </div>
          </div>

          {/* Perks */}
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
            <PerkCard
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='49'
                  height='48'
                  fill='none'
                  viewBox='0 0 49 48'>
                  <path
                    stroke='#FAFF69'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.75'
                    d='M25.014 20.625A3.38 3.38 0 0 1 28.377 24v.016a3.378 3.378 0 1 1-3.363-3.391m-2.401 5.762-2.5 2.501m13.29-13.291-6.002 6.002'
                  />
                  <path
                    stroke='#FAFF69'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.75'
                    d='M37.733 11.267A18.008 18.008 0 1 1 25 5.992v6.003'
                  />
                </svg>
              }
              title='Blazing fast'
              text='Ultimate query performance that your mission-critical and time-sensitive applications can depend on.'
            />
            <PerkCard
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  fill='none'
                  viewBox='0 0 48 48'>
                  <g
                    stroke='#FAFF69'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.75'>
                    <path d='M41.25 39H36V28.5M9 21V7.5A1.5 1.5 0 0 1 10.5 6h18L39 16.5V21' />
                    <path d='M28.5 6v10.5H39M14.981 28.8s-5.518-1.459-5.962 2.063c-.445 3.52 7.205 1.897 6.708 5.76-.463 3.592-5.958 2.062-5.958 2.062M25.5 39c2.485 0 4.5-2.35 4.5-5.25s-2.015-5.25-4.5-5.25-4.5 2.35-4.5 5.25S23.015 39 25.5 39Zm1.5-3 3 3' />
                  </g>
                </svg>
              }
              title='Developer friendly'
              text='Built to ensure that even the most sophisticated data analysis can be done intuitively, using simple SQL.'
            />
            <PerkCard
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  fill='none'
                  viewBox='0 0 48 48'>
                  <g
                    stroke='#FAFF69'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.75'>
                    <path d='M18 22.5c8.284 0 15-3.022 15-6.75S26.284 9 18 9C9.716 9 3 12.022 3 15.75s6.716 6.75 15 6.75Z' />
                    <path d='M3 15.75v7.5C3 26.977 9.716 30 18 30c8.284 0 15-3.023 15-6.75v-7.5m-21 6.188v7.5' />
                    <path d='M33 18.135c6.848.626 12 3.349 12 6.615 0 3.727-6.716 6.75-15 6.75-3.675 0-7.042-.594-9.65-1.582' />
                    <path d='M15 29.865v2.385C15 35.977 21.716 39 30 39c8.284 0 15-3.023 15-6.75v-7.5m-9 6.188v7.5m-12-16.5v16.5' />
                  </g>
                </svg>
              }
              title='Cost effective'
              text={
                <>
                  Best-in-class compression ratios{' '}
                  <br className='hidden lg:block' />
                  that reduce storage and accelerate{' '}
                  <br className='hidden lg:block' />
                  performance.
                </>
              }
            />
          </div>

          {/* Features */}
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-5'>
            <FeatureCard
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='49'
                  height='48'
                  fill='none'
                  viewBox='0 0 49 48'>
                  <path
                    stroke='#151515'
                    strokeWidth='1.5'
                    d='M32.221 43.72a21 21 0 1 0-13.298.382l4.112-13.604a6.79 6.79 0 1 1 4.3-.123l4.886 13.344Z'
                  />
                </svg>
              }
              title={
                <>
                  Open
                  <br />
                  Source
                </>
              }
              link='/clickhouse'
            />
            <FeatureCard
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='49'
                  height='48'
                  fill='none'
                  viewBox='0 0 49 48'>
                  <path
                    stroke='#161517'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='m31.038 20.684-8.296 8.296-4.978-4.978'
                  />
                  <path
                    stroke='#161517'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M38.6 11.842a22.536 22.536 0 0 1-12.927-5.376 1.978 1.978 0 0 0-2.548 0A22.55 22.55 0 0 1 10.2 11.842c-1.024.08-1.8.956-1.8 1.982v8.66c0 8.734 6.312 16.924 14.956 19.37a3.864 3.864 0 0 0 2.09 0C34.087 39.406 40.4 31.22 40.4 22.486v-8.66c0-1.028-.776-1.904-1.8-1.984Z'
                  />
                </svg>
              }
              title={
                <>
                  Secure,
                  <br />
                  compliant
                </>
              }
              link='https://trust.clickhouse.com/'
              target='_blank'
            />
            <FeatureCard
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  fill='none'
                  viewBox='0 0 48 48'>
                  <g
                    stroke='#161517'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'>
                    <path d='M28.5 19.5h-9v9h9v-9Z' />
                    <path d='M37.5 9h-27A1.5 1.5 0 0 0 9 10.5v27a1.5 1.5 0 0 0 1.5 1.5h27a1.5 1.5 0 0 0 1.5-1.5v-27A1.5 1.5 0 0 0 37.5 9ZM39 19.5h4.5m-4.5 9h4.5m-39-9H9m-4.5 9H9M28.5 39v4.5m-9-4.5v4.5m9-39V9m-9-4.5V9' />
                  </g>
                </svg>
              }
              title={
                <>
                  Resource
                  <br />
                  optimized
                </>
              }
              link='https://clickhouse.com/docs/concepts/why-clickhouse-is-so-fast'
              target='_blank'
              prefetch={false}
            />
            <FeatureCard
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='49'
                  height='48'
                  fill='none'
                  viewBox='0 0 49 48'>
                  <g
                    stroke='#151515'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'>
                    <path d='m44.1 10.5-18 18-7.5-7.5L5.1 34.5' />
                    <path d='M44.1 22.5v-12h-12' />
                  </g>
                </svg>
              }
              title={
                <>
                  Proven
                  <br />
                  at scale
                </>
              }
              link='/user-stories'
            />
            <FeatureCard
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='49'
                  height='48'
                  fill='none'
                  viewBox='0 0 49 48'>
                  <path
                    stroke='#161517'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='M42.207 31.341v6.443m-.001-23.234v6.443h.002a5.376 5.376 0 0 0-2.801.182 5.22 5.22 0 0 0-3.375 3.671 5.29 5.29 0 0 0 6.176 6.495v6.443a4.224 4.224 0 0 1-4.224 4.223h-6.442v.002c.188-.933.125-1.9-.182-2.8a5.22 5.22 0 0 0-3.672-3.376 5.29 5.29 0 0 0-6.495 6.176l-6.44-.002a4.223 4.223 0 0 1-4.224-4.221v-6.443a5.29 5.29 0 0 1-6.177-6.495 5.22 5.22 0 0 1 3.376-3.671 5.376 5.376 0 0 1 2.8-.182h-.001v-6.443a4.223 4.223 0 0 1 4.224-4.224h6.442a5.29 5.29 0 0 1 6.495-6.177 5.228 5.228 0 0 1 3.672 3.376c.307.901.37 1.868.182 2.801h6.442a4.223 4.223 0 0 1 4.224 4.224'
                  />
                </svg>
              }
              title={
                <>
                  100+
                  <br />
                  integrations
                </>
              }
              link='https://clickhouse.com/docs/integrations'
              target='_blank'
              prefetch={false}
            />
          </div>

          {/* CTA */}
          <SuiText className='text-center lg:mt-8'>
            Get started in a few minutes with a{' '}
            <Link
              href='https://console.clickhouse.cloud/signUp?loc=why-clickhouse'
              target='_blank'
              className='group whitespace-nowrap font-bold text-primary-300'>
              free cloud trial{' '}
              <span className='tanslate-x-0 inline-block transition-transform group-hover:translate-x-1'>
                -&gt;
              </span>
            </Link>
          </SuiText>
        </div>
      </div>
    </div>
  )
}
