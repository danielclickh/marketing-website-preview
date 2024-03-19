import { GetStaticProps } from 'next'
import Image from 'next/image'
import HRSeparator from '../../components/HRSeparator'
import Layout from '../../components/Layout'
import Markdown from '../../components/Markdown'
import { SuiText, SuiTitle } from '../../components/sui'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import React, { useEffect, useRef, useState } from 'react'
import { CUIButton } from '../../components/ClickUI'
import { HomePageProps } from '../../types/homepage'

export const getStaticProps: GetStaticProps = async function getStaticProps() {
  const commonProps = await getCommonProps()

  return {
    props: {
      seo: {
        title: 'Real-time Data Warehouse - ClickHouse',
        description: '',
        path: '/real-time-data-warehouse'
      },
      ...commonProps
    }
  }
}

export default function Page({ footerData, headerData, seo }: HomePageProps) {
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        {/* Hero */}
        <div className='bg-primary-300 py-16 lg:py-24'>
          <div className='section-container mx-auto'>
            <div className='flex flex-wrap items-center gap-12 lg:flex-nowrap lg:gap-16'>
              {/* Content column */}
              <div className='flip-selection w-full text-neutral-900 lg:w-2/5'>
                <SuiTitle type='h1' weight='bold'>
                  The{' '}
                  <span className='tilted tilted-black'>
                    <span className='tilted-content text-white'>real-time</span>
                  </span>{' '}
                  data warehouse
                </SuiTitle>
                <SuiText size='lg' weight='medium' className='my-6'>
                  ClickHouse is optimized to power data-intensive applications
                  that run on real-time and historical data. <br />
                  With blazing speed and high concurrency.
                </SuiText>
                <CUIButton
                  href='/company/contact'
                  type='primary-dark'
                  size='lg'
                  className='!px-6'>
                  Try it for free
                </CUIButton>
              </div>

              {/* Image */}
              <div className='w-full lg:ml-auto lg:w-auto'>
                <Image
                  src='/images/real-time-data-warehouse-hero.svg'
                  width={628}
                  height={383}
                  alt='Real-time data warehouse'
                />
              </div>
            </div>
          </div>
        </div>

        {/* What is RT data warehouse */}
        <div className='section-container my-24'>
          <div className='mx-auto mb-24 flex max-w-[830px] flex-col items-center gap-6 text-center'>
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
            <SuiTitle type='h2'>What is a real-time data warehouse?</SuiTitle>
            <SuiText className='opacity-70'>
              Analytics push traditional data warehouses, lakes, and
              transactional databases to their limits – not just in terms of
              performance, but also with skyrocketing costs. A real-time data
              warehouse is purpose-built for fast, reliable, and cost-effective
              querying at any scale, and excels at powering workloads that
              operate on both real-time and historical data.
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
                  yes: 'Optimized to manage and query petabytes of data, with best-in-class compression ratios for the most efficient storage usage',
                  no: 'Can create data bloat and inefficient usage of system resources'
                },
                {
                  label: 'Scale',
                  yes: 'Delivers unparalleled performance for analytical workloads at scale',
                  no: 'Analytics scales inadequately as data volumes increase'
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
            href='/company/contact'
            type='primary'
            size='lg'
            className='mx-auto mt-16 !px-6'>
            Try it for free
          </CUIButton>
        </div>
        <HRSeparator className='my-24' />

        {/* Why use RT data warehouse */}
        <div className='my-24'>
          <div className='mx-auto mb-24 flex max-w-[830px] flex-col items-center gap-6 text-center'>
            <SuiTitle type='h2'>Why use a real-time data warehouse?</SuiTitle>
            <SuiText className='max-w-[600px] opacity-70'>
              Companies leverage ClickHouse Cloud as their real-time data
              warehouse to ensure that analytics shine at any scale.
            </SuiText>
          </div>

          {/* Timeline */}
          <div>
            <SuiText
              size='sm'
              weight='semibold'
              className='mt-12 text-center uppercase tracking-widest'>
              Evolution of data warehouses for modern cloud infrastructure
            </SuiText>

            <div className='relative mt-24 pt-8'>
              <div className='absolute top-0 left-0 right-0 h-0.5 bg-neutral-600'></div>
              <div className='section-container grid grid-cols-1 gap-16 lg:grid-cols-3'>
                <div className='relative flex flex-col'>
                  <TimelineLabel>30 years ago</TimelineLabel>
                  <TimelineCard
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
                        src='/images/real-time-data-warehouse/teradata.svg'
                        alt='Teradata'
                        width={108}
                        height={21}
                      />,
                      <Image
                        src='/images/real-time-data-warehouse/oracle.svg'
                        alt='Oracle'
                        width={109}
                        height={15}
                      />,
                      <Image
                        src='/images/real-time-data-warehouse/ibm.svg'
                        alt='IBM'
                        width={51}
                        height={20}
                      />
                    ]}
                  />
                </div>

                <div className='relative flex flex-col'>
                  <TimelineLabel>10 years ago</TimelineLabel>
                  <TimelineCard
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
                        text: 'Retrofitting these for analytics or real-time workloads can become prohibitively costly'
                      }
                    ]}
                    logos={[
                      <Image
                        src='/images/real-time-data-warehouse/snowflake.svg'
                        alt='Snowflake'
                        width={109}
                        height={27}
                      />,
                      <Image
                        src='/images/real-time-data-warehouse/google-bigquery.svg'
                        alt='Google BigQuery'
                        width={88}
                        height={30}
                      />,
                      <Image
                        src='/images/real-time-data-warehouse/amazon-redshift.svg'
                        alt='Amazon Redshift'
                        width={76}
                        height={28}
                      />
                    ]}
                  />
                </div>

                <div className='relative flex flex-col'>
                  <TimelineLabel>
                    <span className='tilted tilted-yellow inline-block py-2 px-3'>
                      <span className='tilted-content'>Today</span>
                    </span>
                  </TimelineLabel>
                  <TimelineCard
                    active={true}
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
                        src='/images/real-time-data-warehouse/clickhouse.svg'
                        alt='ClickHouse'
                        width={136}
                        height={23}
                      />
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
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
          <div className='section-container mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2'>
            <QuoteCard
              alternative='Snowflake'
              quote={`With Snowflake, we were using the standard plan, small compute, which **cost nearly six times more** than ClickHouse Cloud. We got several seconds query time and no materialized views. 

With ClickHouse Cloud's production instance, we are getting **sub-second query time** along with materialized views. The decision to switch was a no-brainer for us.`}
              logo={
                <Image
                  src='/images/real-time-data-warehouse/adgreetz.svg'
                  alt='Adgreetz'
                  width={238}
                  height={31}
                />
              }
            />
            <QuoteCard
              alternative='Redshift'
              quote={`We were on Redshift for about a year and a half, but found the operational overhead and performance wasn't getting it done. Moving over to ClickHouse we were basically able to **cut that (Redshift) bill in half**. That 30 second query now takes **under a second**, and every page loads just faster.`}
              logo={
                <Image
                  src='/images/real-time-data-warehouse/vantage.svg'
                  alt='Vantage'
                  width={182}
                  height={48}
                />
              }
            />
            <QuoteCard
              alternative='BigQuery'
              quote={`It [BigQuery] **discourages data usage**. Instead of encouraging analysts to query the database in any and all ways they can imagine you’ll end up worrying about needing to limit them and come up with processes for controlling the volume of data being used. We simply don’t want the hassle of trying to figure out in advance of how many BQ slots to purchase - what a headache!`}
              logo={
                <Image
                  src='/images/real-time-data-warehouse/hifi.svg'
                  alt='HIFI'
                  width={115}
                  height={42}
                />
              }
            />
            <QuoteCard
              alternative='RedShift'
              quote={`You can see that **ClickHouse outperforms Redshift** easily... The performance of ClickHouse was consistent in returning results, with some spikes possibly related to the network storage. They also tested the performance of ClickHouse with different levels of concurrency, which showed predictable growth and a maximum query time of six seconds.`}
              logo={
                <Image
                  src='/images/real-time-data-warehouse/rokt.svg'
                  alt='Rokt'
                  width={143}
                  height={41}
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
          <div className='section-container mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6'>
            <IndustryCard
              title='Financial Services'
              text='Trading and market analytics, fraud detection, risk monitoring, blockchain, and more.'
              icon={
                <Image
                  src='/images/real-time-data-warehouse/icon-money.svg'
                  alt='Money icon'
                  width={32}
                  height={33}
                />
              }
            />
            <IndustryCard
              title='E-Commerce and Retail'
              text='Real-time inventory monitoring and overall tracking for online businesses.'
              icon={
                <Image
                  src='/images/real-time-data-warehouse/icon-retail.svg'
                  alt='Retail icon'
                  width={32}
                  height={33}
                />
              }
            />
            <IndustryCard
              title='Marketing and Sales'
              text='Data store for Adtech, web analytics, SEO, and much more.'
              icon={
                <Image
                  src='/images/real-time-data-warehouse/icon-marketing.svg'
                  alt='Marketing icon'
                  width={27}
                  height={28}
                />
              }
            />
            <IndustryCard
              title='Technology'
              text='Including IoT, Energy, Biotech, Manufacturing, and others.'
              icon={
                <Image
                  src='/images/real-time-data-warehouse/icon-technology.svg'
                  alt='Technology icon'
                  width={24}
                  height={25}
                />
              }
            />
            <IndustryCard
              title='Media and Entertainment'
              text='Assess the performance of videos, assets, and other media in real-time.'
              icon={
                <Image
                  src='/images/real-time-data-warehouse/icon-media.svg'
                  alt='Media icon'
                  width={32}
                  height={33}
                />
              }
            />
            <IndustryCard
              title='Gaming'
              text='Understand player behavior, gaming dynamics, and other key insights used to improve overall gameplay.'
              icon={
                <Image
                  src='/images/real-time-data-warehouse/icon-gaming.svg'
                  alt='Gaming icon'
                  width={30}
                  height={23}
                />
              }
            />
          </div>
          <CUIButton
            href='/company/contact'
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
      <div className='space-y-8 md:hidden'>
        <div>
          <h3 className='mb-6 text-xl font-semibold'>{noHeading}</h3>
          <ul>
            {rows.map(({ label, no }) => {
              return (
                <li className='mt-4 border-t border-neutral-700 pt-4'>
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
                <li className='mt-4 border-t border-neutral-700 pt-4'>
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
          className={`pointer-events-none absolute left-0 top-0 right-0 bottom-0 rounded-lg border-2 border-primary-300 shadow-noOffset-sm shadow-primary-300/40 ${
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
                className='w-[46%] border-b border-neutral-700 py-6 px-6 text-xl font-semibold'
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
                    className='border-b border-neutral-700 py-4 pr-6'>
                    <ItemNo>
                      <div className='text-sm font-bold uppercase text-[#B3B6BD] lg:hidden'>
                        {label}
                      </div>
                      <div className='font-medium'>{no}</div>
                    </ItemNo>
                  </td>
                  <td
                    valign='top'
                    className='border-b border-neutral-700 py-4 px-6'>
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

function TimelineLabel({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={`relative pl-4 font-bold text-primary-300 sm:pl-0 sm:text-center lg:absolute lg:left-1/2 lg:-top-24 lg:-translate-x-1/2 ${className}`}>
      {children}
      <span className='absolute -left-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary-300 2xl:left-1/2 2xl:top-16 2xl:-translate-y-1/2 2xl:-translate-x-1/2'></span>
    </span>
  )
}

function TimelineCard({
  title,
  text,
  logos,
  items,
  active = false
}: {
  title: string
  text: string
  items?: Array<{
    type: typeof ItemYes | typeof ItemNo | typeof ItemArrow
    text: string
  }>
  logos?: Array<React.ReactElement>
  active?: boolean
}) {
  return (
    <div
      className={`flex flex-1 flex-col gap-3 rounded-lg p-4 ${
        active
          ? 'border-2 border-primary-300 shadow-noOffset-sm shadow-primary/40'
          : 'border-neutral-700 2xl:border'
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
          {items.map(({ type: Type, text }) => {
            return (
              <li>
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
          logos.map((logo) => {
            return <>{logo}</>
          })}
      </div>
    </div>
  )
}

function QuoteCard({
  quote,
  logo,
  alternative
}: {
  quote: string
  logo: React.ReactElement
  alternative: string
}) {
  return (
    <div className='flex flex-col gap-6 rounded-lg bg-neutral-800 p-6 text-xl text-white md:p-12 lg:p-8 xl:p-12'>
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
      <Markdown children={quote} className='font-medium md:mb-16' />
      <div className='mt-auto flex flex-col justify-between gap-6 sm:flex-row sm:items-center'>
        {logo}
        <span className='order-first font-mono text-primary-300 sm:order-last sm:text-right'>
          Alternative to
          <br className='hidden sm:block' />
          {alternative}
        </span>
      </div>
    </div>
  )
}

function IndustryCard({
  title,
  text,
  icon
}: {
  title: string
  text: string
  icon: React.ReactElement
}) {
  return (
    <div className='flex divide-x divide-neutral-600 rounded bg-neutral-800 p-4 pl-0'>
      <div className='flex w-20 flex-shrink-0 flex-grow-0 items-start justify-center'>
        {icon}
      </div>
      <div className='flex-1 pl-4'>
        <SuiTitle type='h3' className='mb-4 !text-2xl text-primary-300'>
          {title}
        </SuiTitle>
        <SuiText>{text}</SuiText>
      </div>
    </div>
  )
}
