import { CUIButton } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import HomepageSectionTrustedByAlt from '@/components/HomepageSectionTrustedByAlt'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import RealTimeDataWarehouseAnimation from '@/components/RealTimeDataWarehouseAnimation'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { HomePageProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef, Fragment, useEffect, useRef, useState } from 'react'

export const getStaticProps: GetStaticProps = async function getStaticProps() {
  const commonProps = await getCommonProps()
  const data = await findOne('homepage', {
    populate: [
      'customerStories',
      'customerStories.*',
      'customerStories.logos.*',
      'customerStories.logos.darkLogoPng'
    ]
  })
  return {
    props: {
      seo: {
        title: 'The Real-Time Data Warehouse - ClickHouse',
        description:
          'Optimized to power data-intensive apps that run on real-time and historical data. Purpose-built for fast, reliable, and cost-effective querying at any scale.',
        path: '/real-time-data-warehouse',
        image: [{ url: '/images/real-time-data-warehouse/social-banner.png' }]
      },
      ...data,
      ...commonProps
    }
  }
}

export default function Page({
  footerData,
  headerData,
  seo,
  customerStories
}: HomePageProps) {
  const [timelineCoords, setTimelineCoords] = useState<null | {
    top: number
    right: number
    bottom: number
    left: number
  }>(null)
  const timelineContainerRef = useRef<HTMLDivElement | null>(null)
  const timelineLineRef = useRef<HTMLDivElement | null>(null)
  const timelineDotRefs = useRef<Array<HTMLSpanElement | null>>([])

  const [timelineExternalResourceHeight, setTimelineExternalResourceHeight] =
    useState(0)
  const timelineExternalResourcesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculatePosition = () => {
      if (
        timelineContainerRef.current &&
        timelineLineRef.current &&
        timelineDotRefs.current
      ) {
        const container = timelineContainerRef.current
        const line = timelineLineRef.current
        const first = timelineDotRefs.current[0]
        const last = timelineDotRefs.current[timelineDotRefs.current.length - 1]
        if (first && last) {
          const containerRect = container.getBoundingClientRect()
          const lineRect = line.getBoundingClientRect()
          const firstRect = first.getBoundingClientRect()
          const lastRect = last.getBoundingClientRect()

          const is2xl = window.innerWidth >= 1536

          const round = (value: number) => parseFloat(value.toFixed(2))
          setTimelineCoords({
            top: round(
              firstRect.top -
                containerRect.top +
                firstRect.height / 2 -
                (is2xl ? lineRect.height / 2 : 0)
            ),
            left: round(
              firstRect.left -
                containerRect.left +
                firstRect.width / 2 -
                (is2xl ? 0 : lineRect.width / 2)
            ),
            bottom: round(
              containerRect.bottom -
                lastRect.bottom +
                lastRect.height / 2 -
                (is2xl ? lineRect.height / 2 : 0)
            ),
            right: round(
              containerRect.right -
                lastRect.right +
                lastRect.width / 2 -
                (is2xl ? 0 : lineRect.width / 2)
            )
          })
        }
      }
    }

    // Set initial values on mount
    calculatePosition()
    setTimeout(calculatePosition, 500) // Give the page time to adjust

    window.addEventListener('resize', calculatePosition)
    return () => window.removeEventListener('resize', calculatePosition)
  }, [timelineContainerRef, timelineLineRef, timelineDotRefs])

  useEffect(() => {
    const calculatePadding = () => {
      if (timelineExternalResourcesRef.current) {
        setTimelineExternalResourceHeight(
          timelineExternalResourcesRef.current.getBoundingClientRect().height
        )
      }
    }

    // Set initial values on mount
    calculatePadding()

    window.addEventListener('resize', calculatePadding)
    return () => window.removeEventListener('resize', calculatePadding)
  }, [timelineExternalResourcesRef])

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        {/* Hero */}
        <div className='bg-primary-300 py-16 lg:py-24'>
          <div className='section-container mx-auto'>
            <div className='flex flex-col items-center gap-12 lg:flex-row lg:gap-16'>
              {/* Content column */}
              <div className='flip-selection w-full text-center text-neutral-900 lg:w-1/2 lg:text-left xl:w-2/5'>
                <SuiTitle type='h1' weight='bold'>
                  The{' '}
                  <span className='tilted tilted-black'>
                    <span className='tilted-content text-white'>real-time</span>
                  </span>{' '}
                  <br />
                  data warehouse
                </SuiTitle>
                <SuiText weight='medium' className='mt-6 !text-xl lg:mb-8'>
                  Optimized to power data-intensive applications that run on
                  real-time and historical data. With blazing speed and high
                  concurrency.
                </SuiText>

                {/**
                 * This button is hidden on mobile.
                 * The mobile button can be found below.
                 */}
                <CUIButton
                  href='https://console.clickhouse.cloud/signUp?loc=rt-page-hero'
                  target='_blank'
                  type='primary-dark'
                  size='lg'
                  className='mx-auto !hidden !px-6 lg:mx-0 lg:!inline-block'>
                  Start free trial
                </CUIButton>
              </div>

              {/* Image */}
              <div className='mx-auto w-full max-w-xl lg:ml-auto lg:mr-0 lg:max-w-[628px]'>
                <RealTimeDataWarehouseAnimation width='100%' height='auto' />

                {/**
                 * This button is hidden on desktop.
                 * The desktop button can be found above.
                 */}
                <CUIButton
                  href='https://console.clickhouse.cloud/signUp?loc=rt-page-hero'
                  target='_blank'
                  type='primary-dark'
                  size='lg'
                  className='mx-auto mt-8 !px-6 lg:mx-0 lg:!hidden'>
                  Start free trial
                </CUIButton>
              </div>
            </div>
          </div>
        </div>

        <HomepageSectionTrustedByAlt
          invertLogos={true}
          className='!my-0 bg-primary-300 pb-16 text-primary-800'
          customerStories={customerStories}
        />

        {/* Why use RT data warehouse */}
        <div className='mx-auto my-24 px-4 xl:flex xl:max-w-[970px] xl:items-start xl:gap-12 xl:px-0 2xl:block 2xl:max-w-none'>
          <div className='mx-auto mb-12 flex max-w-[830px] flex-1 flex-col items-center gap-6 text-center xl:sticky xl:top-24 xl:mb-0 xl:items-start xl:text-left 2xl:relative 2xl:top-0 2xl:mb-12 2xl:items-center 2xl:text-center'>
            <SuiTitle type='h2'>What is a real-time data warehouse?</SuiTitle>
            <SuiText className='max-w-[600px] opacity-70 xl:max-w-none 2xl:max-w-[600px]'>
              Analytics push traditional data warehouses, lakes, and
              transactional databases to their limits – not just in terms of
              performance, but also with skyrocketing costs. A real-time data
              warehouse is purpose-built for fast, reliable, and cost-effective
              querying at any scale.
            </SuiText>
          </div>

          {/* Timeline */}
          <div
            ref={timelineContainerRef}
            className='relative mx-auto max-w-[715px] flex-shrink-0 flex-grow-0 xl:max-w-[580px] 2xl:max-w-none'>
            <SuiText
              size='sm'
              weight='semibold'
              className='mb-12 text-center uppercase tracking-widest 2xl:mb-36'>
              Evolution of data warehouses
            </SuiText>

            {/* Line */}
            <div
              ref={timelineLineRef}
              className={`bg-gradient-checkered absolute w-0.5 from-neutral-600 bg-[length:0.5rem_0.5rem] transition-opacity 2xl:!left-0 2xl:!right-0 2xl:h-0.5 2xl:w-auto ${
                timelineCoords ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                top: timelineCoords?.top || 0,
                right: timelineCoords?.right || 0,
                bottom: timelineCoords?.bottom || 0,
                left: timelineCoords?.left || 0
              }}
            />

            {/* Items container */}
            <div
              style={{ paddingBottom: timelineExternalResourceHeight }}
              className='section-container grid grid-cols-1 gap-16 pl-8 pr-0 sm:pl-32 md:pl-44 xl:pl-36 2xl:grid-cols-3 2xl:pl-0'>
              <div className='relative flex flex-col'>
                <TimelineCard
                  ref={(el: HTMLSpanElement) =>
                    (timelineDotRefs.current[0] = el)
                  }
                  label='30 years ago'
                  title='Traditional on-prem data warehouse'
                  text='30 years ago, on-prem data warehouses like IBM, Hadoop, Oracle, and Teradata were the only options available.'
                  items={[
                    { type: ItemArrow, text: 'Data volumnes were small' },
                    {
                      type: ItemArrow,
                      text: 'Warehouses were operationally complex'
                    }
                  ]}
                  logos={[
                    <Image
                      key='teradata'
                      src='/images/real-time-data-warehouse/teradata.svg'
                      alt='Teradata'
                      width={108}
                      height={21}
                    />,
                    <Image
                      key='oracle'
                      src='/images/real-time-data-warehouse/oracle.svg'
                      alt='Oracle'
                      width={109}
                      height={15}
                    />,
                    <Image
                      key='ibm'
                      src='/images/real-time-data-warehouse/ibm.svg'
                      alt='IBM'
                      width={51}
                      height={20}
                    />
                  ]}
                />
              </div>

              <div className='relative flex flex-col'>
                <TimelineCard
                  ref={(el: HTMLSpanElement) =>
                    (timelineDotRefs.current[1] = el)
                  }
                  label='10 years ago'
                  title='Traditional cloud warehouse'
                  text='Traditional cloud data warehouses, whose predecessors were
                      built to manage much smaller volumes, began to strain
                      under the increased data load.'
                  items={[
                    {
                      type: ItemArrow,
                      text: 'Performance and concurrency limitations became limiting at scale'
                    },
                    {
                      type: ItemArrow,
                      text: 'Retrofitting these for analytics or real-time workloads started to become prohibitively costly'
                    }
                  ]}
                  logos={[
                    <Image
                      key='snowflake'
                      src='/images/real-time-data-warehouse/snowflake.svg'
                      alt='Snowflake'
                      width={109}
                      height={27}
                    />,
                    <Image
                      key='google-bigquery'
                      src='/images/real-time-data-warehouse/google-bigquery.svg'
                      alt='Google BigQuery'
                      width={88}
                      height={30}
                    />,
                    <Image
                      key='amazon-redshift'
                      src='/images/real-time-data-warehouse/amazon-redshift.svg'
                      alt='Amazon Redshift'
                      width={76}
                      height={28}
                    />
                  ]}
                />
              </div>

              <div className='relative flex flex-col'>
                <TimelineCard
                  ref={(el: HTMLSpanElement) =>
                    (timelineDotRefs.current[2] = el)
                  }
                  active={true}
                  label='Today'
                  title='Real-time data warehouse'
                  text='Built for the next generation of data-intensive workloads.'
                  items={[
                    { type: ItemYes, text: 'Simplified and cost effective' },
                    {
                      type: ItemYes,
                      text: 'Unified resource for querying streaming and historical data'
                    }
                  ]}
                  logos={[
                    <Image
                      key='clickhouse'
                      src='/images/real-time-data-warehouse/clickhouse.svg'
                      alt='ClickHouse'
                      width={136}
                      height={23}
                    />
                  ]}
                />
                <div
                  ref={timelineExternalResourcesRef}
                  className='absolute left-0 right-0 top-full'>
                  <div>
                    <div className='mx-auto h-10 w-px bg-neutral-600'></div>
                  </div>
                  <div className='rounded-lg border border-neutral-700 bg-neutral-900 p-4'>
                    <SuiText
                      size='sm'
                      weight='bold'
                      className='mb-4 text-center uppercase !text-[#B3B6BD]'>
                      Offline data warehouses
                    </SuiText>
                    <div className='flex flex-wrap items-center justify-evenly gap-3'>
                      <Image
                        key='databricks'
                        src='/images/real-time-data-warehouse/databricks.svg'
                        alt='Databricks'
                        width={105}
                        height={25}
                      />
                      <Image
                        key='snowflake'
                        src='/images/real-time-data-warehouse/snowflake.svg'
                        alt='Snowflake'
                        width={109}
                        height={27}
                      />
                      <Image
                        key='amazon-athena'
                        src='/images/real-time-data-warehouse/amazon-athena.svg'
                        alt='Amazon Athena'
                        width={78}
                        height={32}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HRSeparator className='my-24' />

        {/* What is RT data warehouse */}
        <div className='section-container my-24'>
          <div className='mx-auto mb-24 flex flex-col items-center gap-6 text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='80'
              height='80'
              fill='none'
              viewBox='0 0 80 80'>
              <rect
                width='78'
                height='78'
                x='1'
                y='1'
                stroke='#FAFF69'
                strokeWidth='2'
                rx='7'
              />
              <g
                stroke='#FAFF69'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'>
                <path d='M40 40c9.1127 0 16.5-4.0294 16.5-9s-7.3873-9-16.5-9-16.5 4.0294-16.5 9 7.3873 9 16.5 9Z' />
                <path d='M23.5 31v9c0 4.9706 7.3875 9 16.5 9s16.5-4.0294 16.5-9v-9' />
                <path d='M23.5 40v9c0 4.9706 7.3875 9 16.5 9s16.5-4.0294 16.5-9v-9' />
              </g>
            </svg>
            <SuiTitle type='h2'>Why use a real-time data warehouse?</SuiTitle>
            <SuiText className='max-w-[600px] opacity-70'>
              Companies leverage ClickHouse Cloud as their real-time data
              warehouse to ensure that analytics shine at any scale.
            </SuiText>
          </div>
          <div className='mx-auto max-w-[1010px]'>
            <YesNoTable
              yesHeading='Real-time data warehouse'
              noHeading='Traditional cloud data warehouse'
              rows={[
                {
                  label: 'Performance',
                  yes: 'Engineered to handle highly concurrent workloads that back user-facing applications',
                  no: 'High query latency and concurrency limitations are commonplace'
                },
                {
                  label: 'Hardware efficiency',
                  yes: 'Optimized to manage petabytes of data, with best-in-class compression ratios for the most efficient storage usage',
                  no: 'Can create data bloat and inefficient usage of system resources'
                },
                {
                  label: 'Scale',
                  yes: 'Delivers unparalleled performance for analytical workloads at scale',
                  no: 'Analytics queries scale inadequately as data volumes increase'
                },
                {
                  label: 'Complexity',
                  yes: "Simplified developer experience that's easy to manage and scale",
                  no: 'Can lead to growing operational complexity'
                },
                {
                  label: 'Cost',
                  yes: 'Maximizes cost-effectiveness',
                  no: 'Costly for many workloads'
                }
              ]}
            />
          </div>
          <CUIButton
            href='https://console.clickhouse.cloud/signUp?loc=rt-page-what-is-rt'
            target='_blank'
            type='primary'
            size='lg'
            className='mx-auto mt-16 !px-6'>
            Try it for free
          </CUIButton>
        </div>

        {/* Impact of RT */}
        <div className='bg-primary-300 py-16'>
          <SuiTitle type='h2' className='text-center text-neutral-750'>
            Impact of the{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content text-white'>real-time</span>
            </span>{' '}
            data warehouse
          </SuiTitle>
          <div className='section-container mt-16 grid max-w-[1000px] grid-cols-1 gap-8 lg:grid-cols-2'>
            <QuoteCard
              alternative='Snowflake'
              quote={`With Snowflake, we were using the standard plan, small compute, which **cost nearly six times more** than ClickHouse Cloud. We got several seconds query time and no materialized views.

With ClickHouse Cloud's production instance, we are getting **sub-second query time** along with materialized views. The decision to switch was a no-brainer for us.`}
              logo={
                <Image
                  src='/images/real-time-data-warehouse/adgreetz.svg'
                  alt='Adgreetz'
                  width={185}
                  height={23}
                />
              }
            />
            <QuoteCard
              alternative='Redshift'
              quote={
                "We were on Redshift for about a year and a half, but found the operational overhead and performance wasn't getting it done. Moving over to ClickHouse we were basically able to **cut that (Redshift) bill in half**. That 30 second query now takes **under a second**, and every page loads just faster."
              }
              logo={
                <Image
                  src='/images/real-time-data-warehouse/vantage.svg'
                  alt='Vantage'
                  width={159}
                  height={42}
                />
              }
            />
            <QuoteCard
              alternative='BigQuery'
              quote={
                'It [BigQuery] **discourages data usage**. Instead of encouraging analysts to query the database in any and all ways they can imagine you’ll end up worrying about needing to limit them and come up with processes for controlling the volume of data being used. We simply don’t want the hassle of trying to figure out in advance of how many BQ slots to purchase - what a headache!'
              }
              logo={
                <Image
                  src='/images/real-time-data-warehouse/hifi.svg'
                  alt='HIFI'
                  width={87}
                  height={31}
                />
              }
            />
            <QuoteCard
              className='hidden lg:flex'
              alternative='RedShift'
              quote={
                'You can see that **ClickHouse outperforms Redshift** easily... The performance of ClickHouse was consistent in returning results, with some spikes possibly related to the network storage. They also tested the performance of ClickHouse with different levels of concurrency, which showed predictable growth and a maximum query time of six seconds.'
              }
              logo={
                <Image
                  src='/images/real-time-data-warehouse/rokt.svg'
                  alt='Rokt'
                  width={107}
                  height={30}
                />
              }
            />
          </div>
        </div>

        {/* Industries */}
        <div className='bg-neutral-600 py-16'>
          <SuiTitle type='h2' className='text-center text-white'>
            Relied on across industries
          </SuiTitle>
          <div className='section-container mt-16'>
            <div className='-m-2 flex flex-wrap justify-center lg:-m-3'>
              <div className='w-full p-2 lg:w-1/2 lg:p-3'>
                <IndustryCard
                  title='Financial services'
                  text='Trading and market analytics, fraud detection, risk monitoring, blockchain, and more.'
                  icon='/images/real-time-data-warehouse/icon-money.svg'
                />
              </div>
              <div className='w-full p-2 lg:w-1/2 lg:p-3'>
                <IndustryCard
                  title='E-Commerce and retail'
                  text='Real-time inventory monitoring and overall tracking for online businesses.'
                  icon='/images/real-time-data-warehouse/icon-retail.svg'
                />
              </div>
              <div className='w-full p-2 lg:w-1/2 lg:p-3'>
                <IndustryCard
                  title='Marketing and sales'
                  text='Data store for Adtech, web analytics, SEO, and much more.'
                  icon='/images/real-time-data-warehouse/icon-marketing.svg'
                />
              </div>
              <div className='w-full p-2 lg:w-1/2 lg:p-3'>
                <IndustryCard
                  title='Technology'
                  text='Including IoT, Energy, Biotech, Manufacturing, and others.'
                  icon='/images/real-time-data-warehouse/icon-technology.svg'
                />
              </div>
              <div className='w-full p-2 lg:w-1/2 lg:p-3'>
                <IndustryCard
                  title='Media and entertainment'
                  text='Assess the performance of videos, assets, and other media in real‑time.'
                  icon='/images/real-time-data-warehouse/icon-media.svg'
                />
              </div>
              <div className='w-full p-2 lg:w-1/2 lg:p-3'>
                <IndustryCard
                  title='Gaming'
                  href='/industries/gaming'
                  text='Understand player behavior, gaming dynamics, and other key insights used to improve overall gameplay.'
                  icon='/images/real-time-data-warehouse/icon-gaming.svg'
                />
              </div>
              <div className='w-full p-2 lg:w-1/2 lg:p-3'>
                <IndustryCard
                  title='Cybersecurity'
                  href='/industries/cybersecurity'
                  text='Proactive threat detection and response with real-time speed, at any scale.'
                  icon='/images/real-time-data-warehouse/icon-cybersecurity.svg'
                />
              </div>
              <div className='w-full p-2 lg:w-1/2 lg:p-3'>
                <IndustryCard
                  title='Automotive'
                  href='/industries/automotive'
                  text='Deliver vehicle telemetry, factory analytics, predictive maintenance, and connected car insights in real time.'
                  icon='/images/real-time-data-warehouse/icon-automotive.svg'
                />
              </div>
            </div>
          </div>
          <CUIButton
            href='https://console.clickhouse.cloud/signUp?loc=rt-page-industries'
            target='_blank'
            type='primary'
            size='lg'
            className='mx-auto mt-16 !px-6'>
            Get started for free
          </CUIButton>
        </div>
      </Layout>
    </>
  )
}

function ItemYes({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`flex gap-4 ${className}`} {...props}>
      <div className='w-4 flex-shrink-0 flex-grow-0 text-primary'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='none'
          viewBox='0 0 16 16'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13.3337 4.33331 6.00033 11.6666 2.66699 8.33331'
          />
        </svg>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}

function ItemNo({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`flex gap-4 ${className}`} {...props}>
      <div className='w-4 flex-shrink-0 flex-grow-0 text-[#FFBABA]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='m8 8 8 8m0-8-8 8'
          />
        </svg>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}

function ItemArrow({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={`flex gap-4 ${className}`} {...props}>
      <div className='w-4 flex-shrink-0 flex-grow-0 text-primary'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M4.47742 11.98H19.4674m-5.9869-5.99199L19.5175 12l-6.037 6.012'
          />
        </svg>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}

function YesNoTable({
  yesHeading,
  noHeading,
  rows
}: {
  yesHeading: string
  noHeading: string
  rows: Array<{ label: string; yes: string; no: string }>
}) {
  const [highlightOffset, setHighlightOffset] = useState<null | number>(null)
  const yesColRef = useRef<HTMLTableHeaderCellElement>(null)

  useEffect(() => {
    const calculatePosition = () => {
      if (yesColRef.current) {
        setHighlightOffset(yesColRef.current.offsetLeft)
      }
    }

    // Set initial values on mount
    calculatePosition()

    window.addEventListener('resize', calculatePosition)
    return () => window.removeEventListener('resize', calculatePosition)
  }, [yesColRef])

  return (
    <>
      {/* Mobile table */}
      <div className='space-y-16 md:hidden'>
        <div>
          <h3 className='mb-6 text-xl font-semibold'>{noHeading}</h3>
          <ul>
            {rows.map(({ label, no }) => {
              return (
                <li
                  key={label}
                  className='mt-4 border-t border-neutral-700 pt-4'>
                  <ItemNo>
                    <div className='text-sm font-bold uppercase text-[#B3B6BD]'>
                      {label}
                    </div>
                    <div className='font-medium'>{no}</div>
                  </ItemNo>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='rounded-lg border-2 border-primary-300 p-6 shadow-noOffset-sm shadow-primary-300/40'>
          <h3 className='mb-6 text-xl font-semibold'>{yesHeading}</h3>
          <ul>
            {rows.map(({ label, yes }) => {
              return (
                <li
                  key={label}
                  className='mt-4 border-t border-neutral-700 pt-4'>
                  <ItemYes>
                    <div className='text-sm font-bold uppercase text-[#B3B6BD]'>
                      {label}
                    </div>
                    <div className='font-medium'>{yes}</div>
                  </ItemYes>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Desktop table */}
      <div className='relative hidden pb-3 md:block'>
        <div
          className={`pointer-events-none absolute bottom-0 left-0 right-0 top-0 rounded-lg border-2 border-primary-300 shadow-noOffset-sm shadow-primary-300/40 ${
            highlightOffset === null ? 'opacity-0' : 'opacity-100'
          } transition-opacity`}
          style={{ left: highlightOffset || 0 }}></div>
        <table className='w-full text-left'>
          <thead>
            <tr>
              <th className='hidden border-b border-neutral-700 py-6 pr-8 text-xl font-semibold lg:table-cell xl:pr-16'></th>
              <th className='w-[38%] border-b border-neutral-700 py-6 pr-6 text-xl font-semibold'>
                {noHeading}
              </th>
              <th
                className='w-[46%] border-b border-neutral-700 px-6 py-6 text-xl font-semibold'
                ref={yesColRef}>
                {yesHeading}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, yes, no }) => {
              return (
                <tr className='min-h-12' key={label}>
                  <th className='hidden border-b border-neutral-700 py-4 pr-8 lg:table-cell xl:pr-16'>
                    <span className='text-sm font-bold uppercase text-[#B3B6BD]'>
                      {label}
                    </span>
                  </th>
                  <td
                    valign='top'
                    className='border-b border-neutral-700 py-4 pr-6 lg:pr-8'>
                    <ItemNo>
                      <div className='text-sm font-bold uppercase text-[#B3B6BD] lg:hidden'>
                        {label}
                      </div>
                      <div className='font-medium'>{no}</div>
                    </ItemNo>
                  </td>
                  <td
                    valign='top'
                    className='border-b border-neutral-700 px-6 py-4 lg:px-8'>
                    <ItemYes>
                      <div className='text-sm font-bold uppercase text-[#B3B6BD] lg:hidden'>
                        {label}
                      </div>
                      <div className='font-medium'>{yes}</div>
                    </ItemYes>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

const TimelineCard = forwardRef(function TimelineCard(
  {
    label,
    title,
    text,
    logos,
    items,
    active = false
  }: {
    label: string
    title: string
    text: string
    items?: Array<{
      type: typeof ItemYes | typeof ItemNo | typeof ItemArrow
      text: string
    }>
    logos?: Array<React.ReactElement>
    active?: boolean
  },
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <>
      {/* Floating label */}
      <span
        className={`relative pl-4 font-bold leading-tight text-primary-300 sm:absolute sm:-left-32 sm:w-24 sm:px-4 sm:text-center md:-left-44 md:w-36 xl:-left-36 xl:w-28 xl:pl-0 xl:pr-8 2xl:-top-20 2xl:left-1/2 2xl:w-full 2xl:-translate-x-1/2 2xl:px-0 ${
          active ? '-top-1.5 sm:top-4' : '-top-1.5'
        }`}>
        {!active && <>{label}</>}
        {active && (
          <>
            <span className='md:hidden'>{label}</span>
            <span className='tilted tilted-yellow -my-2 hidden px-3 py-2 md:inline-block'>
              <span className='tilted-content'>{label}</span>
            </span>
          </>
        )}
        <span
          ref={ref}
          className={`absolute -left-4 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full sm:-right-3 sm:left-auto 2xl:left-1/2 2xl:top-12 ${
            active
              ? 'bg-neutral-800 ring-4 ring-primary-300 ring-offset-0 2xl:bg-primary-300 2xl:ring-0'
              : 'bg-primary-300'
          }`}></span>
      </span>

      {/* Card */}
      <div
        className={`flex flex-1 flex-col gap-3 rounded-lg ${
          active
            ? 'border-2 border-primary-300 p-4 shadow-noOffset-sm shadow-primary/40'
            : 'border-neutral-700 px-4 2xl:border 2xl:py-4'
        }`}>
        <SuiTitle type='h3'>{title}</SuiTitle>
        <SuiText
          size='sm'
          weight='medium'
          className={`${active ? '' : 'opacity-70'}`}>
          {text}
        </SuiText>
        {items && (
          <ul className='mb-8 space-y-3'>
            {items.map(({ type: Type, text }, index) => {
              return (
                <li key={index}>
                  <Type>
                    <SuiText
                      size='sm'
                      weight='medium'
                      className={`${active ? '' : 'opacity-70'}`}>
                      {text}
                    </SuiText>
                  </Type>
                </li>
              )
            })}
          </ul>
        )}
        <div className='mt-auto flex flex-wrap items-center gap-6'>
          {logos &&
            logos.map((logo, logoIndex) => {
              return <Fragment key={logoIndex}>{logo}</Fragment>
            })}
        </div>
      </div>
    </>
  )
})

interface QuoteCardProps extends React.HTMLProps<HTMLDivElement> {
  quote: string
  logo: React.ReactElement
  alternative: string
}

function QuoteCard({
  quote,
  logo,
  alternative,
  className,
  ...props
}: QuoteCardProps) {
  return (
    <div
      {...props}
      className={`flex flex-col gap-6 rounded-lg bg-neutral-800 p-6 md:px-10 md:py-8 lg:px-8 lg:py-6 xl:px-10 xl:py-8 ${
        className || ''
      }`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='28'
        fill='none'
        viewBox='0 0 36 28'
        className='text-primary-300'>
        <path
          fill='currentColor'
          d='M0 27.3452v-7.8239c0-2.25.4219-4.5895 1.2656-7.0185.8693-2.4545 2.0455-4.7684 3.5284-6.9417C6.3026 3.3622 7.99 1.5085 9.8565 0l6.4432 4.1804c-1.5085 2.2756-2.7741 4.6534-3.7969 7.1335-.9971 2.4546-1.4829 5.1648-1.4573 8.1307v7.9006H0Zm19.4446 0v-7.8239c0-2.25.4219-4.5895 1.2656-7.0185.8693-2.4545 2.0455-4.7684 3.5284-6.9417C25.7472 3.3622 27.4347 1.5085 29.3011 0l6.4432 4.1804c-1.5085 2.2756-2.7741 4.6534-3.7969 7.1335-.9971 2.4546-1.4829 5.1648-1.4573 8.1307v7.9006H19.4446Z'
        />
      </svg>
      <Markdown
        className='md:mb- font-medium'
        components={{
          strong: ({ children, className, ...props }) => (
            <strong {...props} className={`text-white ${className || ''}`}>
              {children}
            </strong>
          )
        }}>
        {quote}
      </Markdown>
      <div className='mt-auto flex flex-col justify-between gap-6 sm:flex-row sm:items-center'>
        {logo}
        <span className='order-first font-mono text-primary-300 sm:order-last sm:text-right'>
          Alternative to <br className='hidden sm:block' />
          {alternative}
        </span>
      </div>
    </div>
  )
}

interface IndustryCardProps extends React.HTMLProps<HTMLDivElement> {
  title: string
  text: string
  icon: string
  href?: string
}

function IndustryCard({
  title,
  text,
  icon,
  className,
  href,
  ...props
}: IndustryCardProps) {
  return (
    <div
      {...props}
      className={`relative flex min-h-full divide-x divide-neutral-600 rounded bg-neutral-800 p-4 pl-0 ${
        className || ''
      }`}>
      <div className='flex w-20 flex-shrink-0 flex-grow-0 items-start justify-center'>
        <div className='flex h-8 w-8 items-center justify-center'>
          <Image
            className='h-full w-full object-scale-down'
            src={icon}
            alt={`${title} icon`}
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className='flex-1 pl-4'>
        <SuiTitle type='h3' className='mb-4 !text-2xl text-primary-300'>
          {href && (
            <Link
              href={href}
              className='text-primary-300 before:absolute before:inset-0 hover:underline'>
              {title}
            </Link>
          )}
          {!href && title}
        </SuiTitle>
        <SuiText>{text}</SuiText>
      </div>
    </div>
  )
}
