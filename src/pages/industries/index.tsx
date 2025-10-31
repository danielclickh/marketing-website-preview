import logoTesla from './automotive/assets/logo-tesla.svg'
import logoSeemplicity from './cybersecurity/assets/logo-seemplicity.svg'
import logoNovo from './energy/assets/logo-novo.png'
import logoWalmart from './retail/assets/logo-walmart.svg'
import ContentTicker from '@/components-cleaned/ContentTicker'
import { CUIButton, CUICard } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { StrapiImageUrl } from '@/components/StrapiElements'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps, HomepageCustomerStories } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
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
            <div className='!mt-8 flex flex-wrap justify-center gap-4'>
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
                  icon='/images/real-time-data-warehouse/icon-cybersecurity.svg'
                  link='/industries/cybersecurity'
                  title='Cybersecurity'
                  description='Learn how ClickHouse empowers real-time threat detection and security analytics'
                  quote='I knew a managed product built by engineers, whose goal in life is to transform bits from Postgres into ClickHouse, would be better than anything we could do ourselves.'
                  quoteLogo={{
                    src: logoSeemplicity,
                    width: 183,
                    height: 30,
                    alt: 'Seemplicity'
                  }}
                />
                <IndustryCell
                  position='top-right'
                  icon='/images/real-time-data-warehouse/icon-energy.svg'
                  link='/industries/energy'
                  title='Energy'
                  description='Discover how ClickHouse optimizes energy management and smart grid operations'
                  quote='Our primary business requirement for any database/store was that we own and control the data we store -- no vendor lock-in and no walled gardens. Going with ClickHouse Cloud on AWS was an easy decision because it allows us to focus on our primary work without having to worry about maintenance, upgrades, backups, and so on.'
                  quoteLogo={{
                    src: logoNovo,
                    width: 1500 / 14,
                    height: 395 / 14,
                    alt: 'Novo Energy',
                    className: 'saturate-0 invert'
                  }}
                />
                <IndustryCell
                  position='middle-left'
                  icon='/images/real-time-data-warehouse/icon-gaming.svg'
                  link='/industries/gaming'
                  title='Gaming and entertainment'
                  description='Explore how ClickHouse enhances player experiences and game analytics'
                  quote='The main benefit is saving employee time, which can now be spent on more exciting and strategic tasks. One of our administrators has about 60% of their time freed up, and our ETL engineer now saves 40% of their time.'
                  quoteLogo={{
                    src: '/images/industries/gaming/logo-azur.svg',
                    width: 123,
                    height: 40,
                    alt: 'Azur Games'
                  }}
                />
                <IndustryCell
                  position='middle-right'
                  icon='/images/real-time-data-warehouse/icon-retail.svg'
                  link='/industries/retail'
                  title='E-commerce and retail'
                  description='See how ClickHouse drives real-time inventory, sales, and customer insights'
                  quote='ClickHouse enables the business users to make smart business decisions based on huge volume of data in a matter of seconds'
                  quoteLogo={{
                    src: logoWalmart,
                    width: 233.58 * 0.7,
                    height: 56.01 * 0.7,
                    alt: 'Walmart'
                  }}
                />
                <IndustryCell
                  position='bottom-left'
                  icon='/images/real-time-data-warehouse/icon-automotive.svg'
                  link='/industries/automotive'
                  title='Automotive'
                  description='Learn how ClickHouse powers connected car data and autonomous driving insights'
                  quote='Data in ClickHouse is better than data anywhere else. No other system lets you slice and dice your data, ask interesting questions, and get answers in an acceptable amount of time.'
                  quoteLogo={{
                    src: logoTesla,
                    width: 100,
                    height: 24,
                    alt: 'Tesla'
                  }}
                />
                <Cell position='bottom-right'>
                  <SuiTitle type='h3' className='lg:!leading-8'>
                    And more!
                  </SuiTitle>
                  <SuiText size='sm' className='text-neutral-200'>
                    <p>
                      Powering analytics, ML, GenAI, warehousing, and
                      observability.
                    </p>
                  </SuiText>
                  <div className='grid flex-1 grid-cols-1 gap-4 lg:-mb-2 lg:grid-cols-2 lg:grid-rows-3'>
                    <Link
                      href='/use-cases/real-time-analytics'
                      className='flex items-center gap-4 rounded bg-neutral-750 px-3 py-3 text-sm transition-colors hover:bg-neutral-725 lg:px-4 lg:py-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='26'
                        height='26'
                        viewBox='0 0 26 26'
                        fill='none'
                        className='size-5'>
                        <path
                          fill='#FAFF69'
                          d='M1 26a1 1 0 0 1 0-2h1.67V6.33A2.32 2.32 0 0 1 5 4h3.9V2.33c0-1.22.93-2.22 2.13-2.32l.21-.01h3.55a2.33 2.33 0 0 1 2.33 2.33V8h3.9a2.3 2.3 0 0 1 2.31 2.13l.02.2V24H25a1 1 0 1 1 0 2H1Zm20-16h-3.9v14h4.23V10.33a.33.33 0 0 0-.26-.32L21 10Zm-6.23-8h-3.54a.33.33 0 0 0-.34.33V24h4.22V2.33a.33.33 0 0 0-.34-.33ZM8.9 6H5a.33.33 0 0 0-.33.33V24h4.22V6Z'
                        />
                      </svg>
                      Real-time analytics
                    </Link>
                    <Link
                      href='/use-cases/machine-learning-and-data-science'
                      className='flex items-center gap-4 rounded bg-neutral-750 px-3 py-3 text-sm transition-colors hover:bg-neutral-725 lg:px-4 lg:py-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='23'
                        height='26'
                        viewBox='0 0 23 26'
                        fill='none'
                        className='size-5'>
                        <path
                          fill='#FAFF69'
                          d='m10.56 0 .4.03.11.02h.11l.18.03a9.8 9.8 0 0 1 3.72 1.24l.34.2a10.16 10.16 0 0 1 4.79 8.28v.17l2.64 5.13c.16.35.18.76.1 1.13l-.06.19c-.17.43-.49.8-.9 1l-2.7 1.24v3.67c0 .42-.14.82-.4 1.14l-.12.13c-.34.34-.8.53-1.25.53h-5.56a.87.87 0 0 1 0-1.72h5.56a.07.07 0 0 0 .05-.03.07.07 0 0 0 .02-.05v-4.22c0-.35.2-.65.5-.78l3.16-1.46c.02 0 .03-.03.03-.05 0 0 0-.02.02 0l-2.7-5.23a.87.87 0 0 1-.09-.39 8.4 8.4 0 0 0-6.6-8.28l-.02 1.95a2.72 2.72 0 0 1 1.83 3.03 2.74 2.74 0 0 1-2.68 2.3 2.7 2.7 0 0 1-2.68-2.3 2.75 2.75 0 0 1 1.82-3.03V1.72h-.05a8.5 8.5 0 0 0-3.45.74l-.32.16a8.45 8.45 0 0 0-4.2 4.85h2.4c.26 0 .5.11.67.3L8.2 11.4a2.68 2.68 0 0 1 3.39 1.27 2.74 2.74 0 0 1 0 2.48 2.72 2.72 0 0 1-3.14 1.37 2.7 2.7 0 0 1-1.77-1.62 2.74 2.74 0 0 1 .2-2.4L4.15 9.2H1.78a8.55 8.55 0 0 0 3.3 7.8c.25.17.38.47.34.78l-.93 7.47a.85.85 0 0 1-1.53.42.87.87 0 0 1-.17-.64l.87-6.98-.22-.19c-1-.88-1.8-1.95-2.4-3.14l-.15-.37A10.27 10.27 0 0 1 .2 8.2v.12-.16a10.22 10.22 0 0 1 3.68-6.02A10.2 10.2 0 0 1 10.57 0h-.01ZM9.19 12.93a1 1 0 0 0 0 2.01 1 1 0 0 0 0-2.01Zm1.85-7.47a1 1 0 0 0-1 1c0 .27.1.52.3.71a1 1 0 0 0 1.7-.7 1.01 1.01 0 0 0-1-1.01Z'
                        />
                      </svg>
                      Machine learning and GenAI
                    </Link>
                    <Link
                      href='/use-cases/data-warehousing'
                      className='flex items-center gap-4 rounded bg-neutral-750 px-3 py-3 text-sm transition-colors hover:bg-neutral-725 lg:px-4 lg:py-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='26'
                        viewBox='0 0 24 26'
                        fill='none'
                        className='size-5'>
                        <path
                          fill='#FCFF74'
                          d='M12 .25C5.41.25.25 3.21.25 7v12c0 3.79 5.16 6.75 11.75 6.75S23.75 22.79 23.75 19V7C23.75 3.21 18.59.25 12 .25Zm0 1.5c5.56 0 10.25 2.4 10.25 5.25s-4.7 5.25-10.25 5.25C6.44 12.25 1.75 9.85 1.75 7S6.45 1.75 12 1.75ZM22.25 19c0 2.85-4.7 5.25-10.25 5.25-5.56 0-10.25-2.4-10.25-5.25v-2.65c2 2.04 5.8 3.4 10.25 3.4s8.25-1.36 10.25-3.4V19Zm0-6c0 2.85-4.7 5.25-10.25 5.25-5.56 0-10.25-2.4-10.25-5.25v-2.65c2 2.04 5.8 3.4 10.25 3.4s8.25-1.36 10.25-3.4V13Z'
                        />
                      </svg>
                      Data warehousing
                    </Link>
                    <Link
                      href='/use-cases/observability'
                      className='flex items-center gap-4 rounded bg-neutral-750 px-3 py-3 text-sm transition-colors hover:bg-neutral-725 lg:px-4 lg:py-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='26'
                        height='26'
                        viewBox='0 0 26 26'
                        fill='none'
                        className='size-5'>
                        <path
                          fill='#FAFF69'
                          d='M19.98 0A6.02 6.02 0 0 1 26 6.02v13.96A6.02 6.02 0 0 1 19.98 26H6.02A6.02 6.02 0 0 1 0 19.98V6.02A6.02 6.02 0 0 1 6.02 0h13.96Zm0 1.9H6.02A4.12 4.12 0 0 0 1.9 6.02v13.96a4.12 4.12 0 0 0 4.12 4.12h13.96a4.12 4.12 0 0 0 4.12-4.12V6.02a4.12 4.12 0 0 0-4.12-4.12Zm-3.6 4.38 2.5 5.77h1.73c.48 0 .89.35.94.82l.01.13c0 .52-.43.95-.95.95h-2.35a.95.95 0 0 1-.87-.57l-1.84-4.25-4.19 10.55a.95.95 0 0 1-1.68.16l-.07-.13-2.5-5.76H5.4a.95.95 0 0 1-.94-.82L4.44 13c0-.52.43-.95.95-.95h2.35c.38 0 .72.23.87.57l1.84 4.24L14.64 6.3a.95.95 0 0 1 1.75-.02Z'
                        />
                      </svg>
                      Observability
                    </Link>
                    <div className='col-span-full flex items-center justify-center'>
                      <LinkWithArrow
                        href='/use-cases'
                        className='text-sm text-primary'>
                        View all use cases
                      </LinkWithArrow>
                    </div>
                  </div>
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
      className={`flex flex-col gap-4 border-neutral-700/80 p-4 lg:p-6 ${borderClasses[position]} ${className}`}>
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
  icon: ImageProps['src']
  title: string
  description: string
  quote: string
  quoteLogo?: ImageProps
  link: LinkProps['href']
  position: CellPositions
}) {
  return (
    <Link href={link} className='flex'>
      <Cell position={position} className='group/industryCell relative'>
        <div className='flex flex-col gap-x-4 gap-y-2 lg:flex-row lg:items-center'>
          <Image
            className='size-8 object-scale-down'
            src={icon}
            alt={`${title} icon`}
            width={32}
            height={32}
          />
          <SuiTitle type='h3'>{title}</SuiTitle>
          <CUIButton
            type='secondary'
            size='sm'
            linkClass=''
            className='!hidden lg:ml-auto lg:!block'>
            <span className='absolute inset-0' />
            Learn more -&gt;
          </CUIButton>
        </div>
        <SuiText size='sm' className='space-y-4 text-neutral-200'>
          <p>{description}</p>
          <p className='font-bold text-primary-300 lg:hidden'>
            Learn more -&gt;
          </p>
        </SuiText>
        <blockquote className='hidden flex-1 flex-col rounded bg-neutral-750 p-4 lg:flex'>
          <Image
            src='/images/Quote.svg'
            width={37}
            height={28}
            alt='Quote'
            className='mb-4'
          />
          <SuiText size='sm' className='w-full text-neutral-200'>
            <p className='italic'>{quote}</p>
          </SuiText>
          {quoteLogo && (
            <div className='mt-auto self-end pt-4 opacity-40 transition-opacity group-hover/industryCell:opacity-50'>
              <Image {...quoteLogo} />
            </div>
          )}
        </blockquote>
      </Cell>
    </Link>
  )
}
