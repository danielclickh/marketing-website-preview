import ContentTicker from '@/components-cleaned/ContentTicker'
import { CUIButton, CUICard } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import { StrapiImageUrl } from '@/components/StrapiElements'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps, HomepageCustomerStories } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import { LinkProps } from 'next/link'
import React from 'react'

interface PageProps extends CommonProps {
  logos: HomepageCustomerStories['logos']
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const commonPropsRequest = getCommonProps()

    const dataRequest = findOne('homepage', {
      populate: [
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    })

    const [commonProps, data] = await Promise.all([
      commonPropsRequest,
      dataRequest
    ])

    return {
      props: {
        logos: data.customerStories.logos,
        seo: {
          path: '/industries',
          title: 'Real-time analytics across industries | ClickHouse',
          description:
            'ClickHouse powers real-time analytics for gaming, retail, energy, cybersecurity, and more. Ingest millions of rows per second and deliver instant insights at any scale.'
        },
        ...commonProps
      }
    }
  }

export default function IndustriesPage({
  seo,
  headerData,
  footerData,
  logos
}: PageProps) {
  useGalaxyOnPage('industriesPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container flex flex-col items-center gap-16 lg:flex-row'>
          <div className='space-y-4 text-center lg:mx-auto lg:w-2/3 lg:text-center'>
            <SuiTitle type='h1'>
              Built for real-time analytics. Trusted across industries.
            </SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              ClickHouse powers real-time analytics and applications where speed
              matters most, from gaming to energy, cybersecurity to retail. Find
              out how companies use ClickHouse to deliver instant insights,
              reduce costs, and move faster than ever.
            </SuiText>
            <div className='!my-8 flex flex-wrap justify-center gap-4'>
              <CUIButton
                href='https://console.clickhouse.cloud/signUp?loc=industries-hero'
                type='primary'
                size='lg'
                className='!px-8'>
                Start your free Cloud trial
              </CUIButton>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className='relative bg-grid'>
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-20 bg-primary-300' />
        <div className='relative z-10'>
          <div className='section-container pb-8 lg:pb-16'>
            <CUICard className='!bg-neutral-900'>
              <CUICard.Body className='grid grid-cols-1 rounded-lg lg:grid-cols-2'>
                <IndustryCell
                  position='top-left'
                  link='/industries/cybersecurity'
                  title='Cybersecurity'
                  description='Learn how ClickHouse empowers real-time threat detection and security analytics'
                  quote='I knew a managed product built by engineers, whose goal in life is to transform bits from Postgres into ClickHouse, would be better than anything we could do ourselves.'
                />
                <IndustryCell
                  position='top-right'
                  link='/industries/energy'
                  title='Energy'
                  description='Discover how ClickHouse optimizes energy management and smart grid operations'
                  quote='Our primary business requirement for any database/store was that we own and control the data we store -- no vendor lock-in and no walled gardens. Going with ClickHouse Cloud on AWS was an easy decision because it allows us to focus on our primary work without having to worry about maintenance, upgrades, backups, and so on.'
                />
                <IndustryCell
                  position='middle-left'
                  link='/industries/gaming'
                  title='Gaming and entertainment'
                  description='Explore how ClickHouse enhances player experiences and game analytics'
                  quote='The main benefit is saving employee time, which can now be spent on more exciting and strategic tasks. One of our administrators has about 60% of their time freed up, and our ETL engineer now saves 40% of their time.'
                />
                <IndustryCell
                  position='middle-right'
                  link='/industries/retail'
                  title='E-commerce and retail'
                  description='See how ClickHouse drives real-time inventory, sales, and customer insights'
                  quote='ClickHouse enables the business users to make smart business decisions based on huge volume of data in a matter of seconds'
                />
                <IndustryCell
                  position='bottom-left'
                  link='/industries/automotive'
                  title='Automotive'
                  description='Learn how ClickHouse powers connected car data and autonomous driving insights'
                  quote='Data in ClickHouse is better than data anywhere else. No other system lets you slice and dice your data, ask interesting questions, and get answers in an acceptable amount of time.'
                />
                <Cell position='bottom-right'>
                  <SuiTitle type='h3'>And more!</SuiTitle>
                  <SuiText size='sm' className='text-neutral-200'>
                    <p>
                      Powering analytics, ML, GenAI, warehousing, and
                      observability.
                    </p>
                  </SuiText>
                </Cell>
              </CUICard.Body>
            </CUICard>

            <div className='mx-auto mt-8 max-w-5xl lg:mt-16'>
              {/* Trusted by */}
              <div className='flip-selection mx-auto mb-8 w-fit max-w-2xl px-4 pb-4 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
                Trusted by industry leaders that work with data{' '}
                <TiltedText type='white-on-black' className='px-2'>
                  at scale
                </TiltedText>
              </div>

              <ContentTicker
                gap='3rem'
                gradientMask={true}
                pause={false}
                sizingMethod='max'>
                {logos.map((story, logoIndex) => {
                  return (
                    <StrapiImageUrl
                      key={logoIndex}
                      className='my-auto flex-shrink-0 flex-grow-0'
                      {...story.darkLogoPng}
                    />
                  )
                })}
              </ContentTicker>
            </div>
          </div>
        </div>
      </section>

      {/* Why ClickHouse */}
      <section className='bg-neutral-700 py-16 lg:py-24'>
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
                  ClickHouse is the fastest and most resource efficient
                  real-time data warehouse and open-source database, built for
                  speed, efficiency, and massive scalability
                </SuiText>
              </div>
            </div>

            {/* Columns */}
            <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
              <div className='flex flex-col items-center gap-4 text-center'>
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
                <SuiTitle type='h3' color='inherit'>
                  Blazing fast
                </SuiTitle>
                <SuiText>
                  Ultimate query performance that your mission-critical and
                  time-sensitive applications can depend on.
                </SuiText>
              </div>
              <div className='flex flex-col items-center gap-4 text-center'>
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
                <SuiTitle type='h3' color='inherit'>
                  Developer friendly
                </SuiTitle>
                <SuiText>
                  Built to ensure that even the most sophisticated data analysis
                  can be done intuitively, using simple SQL.
                </SuiText>
              </div>
              <div className='flex flex-col items-center gap-4 text-center'>
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
                <SuiTitle type='h3' color='inherit'>
                  Cost effective
                </SuiTitle>
                <SuiText>
                  Best-in-class compression ratios{' '}
                  <br className='hidden lg:block' />
                  that reduce storage and accelerate{' '}
                  <br className='hidden lg:block' />
                  performance.
                </SuiText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get started */}
      <section className='section-container my-16 lg:my-24'>
        <GetStartedFree
          href='https://console.clickhouse.cloud/signUp?loc=industries-getstarted-footer'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </section>
    </Layout>
  )
}

type CellPositions =
  | 'top-left'
  | 'top-right'
  | 'middle-left'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-right'

function Cell({
  position,
  children,
  className = ''
}: {
  position: CellPositions
  children: React.ReactNode
  className?: string
}) {
  const borderClasses: Record<CellPositions, string> = {
    'top-left': 'border-b lg:border-r',
    'top-right': 'border-b',
    'middle-left': 'border-b lg:border-r',
    'middle-right': 'border-b',
    'bottom-left': 'border-b lg:border-b-0 lg:border-r',
    'bottom-right': ''
  }
  return (
    <div
      className={`border-b border-r border-neutral-700/80 p-6 ${borderClasses[position]} ${className}`}>
      {children}
    </div>
  )
}

function IndustryCell({
  icon,
  title,
  description,
  quote,
  quoteLogo,
  link,
  position
}: {
  icon?: ImageProps['src']
  title: string
  description: string
  quote: string
  quoteLogo?: ImageProps['src']
  link: LinkProps['href']
  position: CellPositions
}) {
  return (
    <Cell position={position} className='relative flex flex-col gap-4'>
      <div className='flex items-center'>
        <SuiTitle type='h3'>{title}</SuiTitle>
        <CUIButton type='secondary' size='sm' linkClass='ml-auto' href={link}>
          <span className='absolute inset-0' />
          Learn more -&gt;
        </CUIButton>
      </div>
      <SuiText size='sm' className='text-neutral-200'>
        <p>{description}</p>
      </SuiText>
      <blockquote className='flex-1 rounded bg-neutral-750 p-4'>
        <Image
          src='/images/Quote.svg'
          width={37}
          height={28}
          alt='Quote'
          className='mb-4'
        />
        <SuiText size='sm' className='text-neutral-200'>
          <p className='italic'>{quote}</p>
        </SuiText>
      </blockquote>
    </Cell>
  )
}
