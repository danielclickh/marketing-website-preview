import bigqueryTableLogo from './assets/bigquery-table-logo.svg'
import heroLogos from './assets/hero-logos.png'
import iconDatabase from './assets/icon-database.svg'
import iconGuage from './assets/icon-guage.svg'
import iconHandCoins from './assets/icon-hand-coins.svg'
import iconVs from './assets/icon-vs.png'
import logoBigquery from './assets/logo-bigquery.svg'
import logoBraze from './assets/logo-braze.svg'
import logoChartmetric from './assets/logo-chartmetric.svg'
import logoM3ter from './assets/logo-m3ter.svg'
import logoPostgress from './assets/logo-postgress.svg'
import logoRedshift from './assets/logo-redshift.svg'
import logoSnowflake from './assets/logo-snowflake.svg'
import logoClickhouse from '@/../public/logo-full.svg'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
import { CUIButton } from '@/components/ClickUI'
import ComparisonTable, {
  ComparisonTableProps
} from '@/components/ComparisonTable'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import Markdown from '@/components/Markdown'
import MoreComparisons from '@/components/MoreComparisons'
import QuoteCard from '@/components/QuoteCard'
import ScaleToContainer from '@/components/ScaleToContainer'
import { SuiText, SuiTitle } from '@/components/sui'
import tables from '@/data/bigquery-comparison'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        ...commonProps,
        seo: {
          title: 'BigQuery vs ClickHouse',
          path: '/comparison/bigquery',
          image: [{ url: '/images/clickhouse-vs-bigquery-og.png' }]
        }
      }
    }
  }

export default function BigQueryPage({
  footerData,
  headerData,
  seo
}: CommonProps) {
  useGalaxyOnPage('bigqueryComparisonPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='container mx-auto my-16 flex max-w-7xl flex-col items-start gap-x-6 px-8 md:flex-row 2xl:px-0'>
        <div className='mx-auto grid max-w-[800px] grid-cols-1 gap-6 text-center lg:mx-0 lg:text-left'>
          <div>
            <span className='inline-block rounded-full border border-primary-500 bg-primary-700 px-4 py-1 text-xs text-primary-300'>
              Comparisons
            </span>
          </div>
          <SuiTitle type='h1' weight='bold'>
            ClickHouse <span className='text-primary-300'>vs</span> BigQuery
          </SuiTitle>
          <Image
            src={heroLogos}
            alt='ClickHouse vs BigQuery'
            width={698 / 2}
            height={646 / 2}
            loading='eager'
            priority
            className='mx-auto lg:hidden'
          />
          <SuiText className='space-y-6 text-neutral-200'>
            <p>
              BigQuery handles ad-hoc queries and smaller data volumes
              effectively, but scaling turns cost and performance management
              into a significant challenge. Read more below to learn about how
              ClickHouse and BigQuery compare in cost, performance, and
              supported features.
            </p>
            <p>
              While limited to GCP, BigQuery excels at complex, long-running
              queries and ad-hoc analysis. However, its per-query pricing means
              more users or traffic leads to higher costs, penalizing use case
              expansion and success. ClickHouse offers a stable, resource-based
              pricing model with built-in high concurrency and dynamic scaling
              which is ideal for interactive, user-facing workloads without
              surprise bills. Deployable on any Cloud.
            </p>
          </SuiText>
          <div className='flex flex-col gap-4 sm:mx-auto sm:max-w-[523px] sm:flex-row lg:mx-0'>
            <CUIButton
              href='https://console.clickhouse.cloud/signUp?loc=bigquery-comparison-page-hero'
              type='primary'
              size='lg'
              weight='semibold'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Start a free trial
            </CUIButton>
            <CUIButton
              href='/company/contact?loc=bigquery-comparison-page-hero'
              type='secondary'
              size='lg'
              weight='semibold'
              target='_blank'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Contact sales
            </CUIButton>
          </div>
          <SuiText>
            <p className='font-bold text-white'>Why ClickHouse is better:</p>
          </SuiText>
          <div className='flex flex-col items-stretch gap-y-5 rounded-lg border border-neutral-700/80 bg-neutral-900/50 shadow-lg lg:flex-row lg:divide-x lg:divide-neutral-700/80'>
            {[
              {
                icon: iconHandCoins,
                stat: '21x',
                label: 'Reduction in costs'
              },
              {
                icon: iconGuage,
                stat: '4x',
                label: 'Faster queries'
              },
              {
                icon: iconDatabase,
                stat: '60%',
                label: 'Better compression'
              }
            ].map((item, itemIndex) => {
              return (
                <div key={itemIndex} className='flex-1 px-3 py-4 text-center'>
                  <p className='mb-2 text-5xl font-bold'>{item.stat}</p>
                  <p className='font-medium text-primary-300'>{item.label}</p>
                </div>
              )
            })}
          </div>
          <SuiText className='text-sm'>
            Read our comprehensive guide about{' '}
            <Link
              href={`https://clickhouse.com/docs/en/migrations/bigquery?loc=bigquery-comparison-page-hero`}
              target='_blank'
              prefetch={false}
              className='text-primary-300 hover:underline'>
              migrating from BigQuery to ClickHouse
            </Link>
          </SuiText>
        </div>
        <Image
          src={heroLogos}
          alt='ClickHouse vs BigQuery'
          width={698 / 2}
          height={646 / 2}
          loading='eager'
          priority
          className='mx-auto hidden lg:block'
        />
      </section>

      {/* Testimonials */}
      <section className='relative overflow-hidden bg-[#363636] py-16 lg:py-24'>
        {/* Red orb */}
        <div
          className='bg-shadow-element yellow-shadow absolute inset-0'
          style={
            {
              '--top-side': '35%',
              '--left-side': '25%',
              '--scale': '0.9',
              '--opacity': '0.03'
            } as React.CSSProperties
          }
        />
        {/* Yellow orb */}
        <div
          className='bg-shadow-element absolute inset-0'
          style={
            {
              '--top-side': '10%',
              '--right-side': '25%',
              '--left-side': 'auto',
              '--scale': '0.8',
              '--opacity': '0.04'
            } as React.CSSProperties
          }
        />
        {/* Yellow triangle */}
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-2/3 bg-primary-300' />
        <div className='section-container relative z-10'>
          <div className='mb-16 space-y-12 lg:mb-24'>
            <SuiTitle type='h2' className='text-center'>
              ClickHouse compared to BigQuery
            </SuiTitle>
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
                <BigQueryAnimation />
              </div>
            </ScaleToContainer>
          </div>
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <h2 className='mb-6 text-center font-basier text-2xl font-semibold lg:-mt-3'>
              Join others migrating to ClickHouse from BigQuery
            </h2>
            <div className='space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0'>
              <QuoteCard
                content="It's a lot faster. The data is consistent. We have to do less work. It's just way, way better for us. Anything we're doing in BigQuery now that we can do cheaper or faster in ClickHouse, we want to do that."
                link='/blog/how-braze-rebuilt-real-time-analytics-pipeline-with-clickHouse-cloud'
                logo={{
                  src: logoBraze,
                  width: 93,
                  height: 44,
                  alt: 'Braze'
                }}
              />
              <QuoteCard
                content="BigQuery [was] too slow and costly for our needs. While it performs well for processing in-house data, it becomes quite expensive when handling real-time customer data within a product, which negatively impacts the product's unit economics."
                link='/blog/chartmetric-uses-clickhouse-to-turn-artist-data-into-music-intelligence'
                logo={{
                  src: logoChartmetric,
                  width: 189,
                  height: 35,
                  alt: 'Chartmetric'
                }}
              />
              <QuoteCard
                content='Over time, those queries had become painfully slow in BigQuery and Postgres. Some took over a minute. Others timed out entirely...The payoff [of migrating to ClickHouse] came right away. Queries that once failed now ran in six seconds, with no caching required.'
                link='/blog/why-m3ter-clickhouse-cloud'
                logo={{
                  src: logoM3ter,
                  width: 102,
                  height: 29,
                  alt: 'M3ter'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed table */}
      <section className='section-container my-16 lg:my-24'>
        <div className='mx-auto mb-12 max-w-4xl space-y-6 text-center'>
          <SuiTitle type='h2'>
            Tired of unpredictable costs? Need milliseconds when queries take
            seconds? Want predictable, high concurrency without the headaches?
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            Explore the differences for why users are migrating from BigQuery to
            ClickHouse for analytical workloads.
          </SuiText>
        </div>
        <TabbedTable />
      </section>

      {/* Cards  */}
      <section className='relative z-10 bg-neutral-700 py-16 lg:py-20'>
        <div className='section-container'>
          <div className='-mx-4 flex flex-col lg:mx-auto lg:max-w-4xl lg:flex-row lg:flex-wrap lg:justify-center'>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='lightning'
                title='Built for real-time'
                text='Power always-on, low-latency, high-concurrency workloads'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='coins'
                title='Predictable pricing'
                text='No surprise bills or penalties for usage spikes or need to upgrade to expensive plans to access advanced features'
                className='bg-neutral-900/80'
              />
            </div>{' '}
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='hand-coins'
                title='Lower costs'
                text='3–5x better performance per dollar than BigQuery, less spend, and more headroom.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='unlock'
                title='Open source and open standards'
                text='Flexible deployments models from open source to managed cloud and BYOC, with support for external data catalogues and lake formats'
                className='bg-neutral-900/80'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Get started */}
      <div className='section-container my-20 md:px-8 lg:my-24 2xl:px-0'>
        <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-16 text-center'>
          <SuiTitle type='h2' color='text-default'>
            Migrate your workload from BigQuery today
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            Cut costs, boost performance, and unlock real-time analytics with
            ClickHouse.
            <br />
            We’ll get you started on a 30 day trial and $300 credits to spend at
            your own pace.
          </SuiText>
          <p className='mt-8 flex flex-col justify-center gap-2 sm:flex-row sm:gap-4'>
            <CUIButton
              type='primary-dark'
              size='lg'
              className='mx-auto w-full sm:!px-10 md:w-auto'
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=bigquery-comparison-page-get-started'>
              Create a free account
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='mx-auto w-full !border-neutral-800 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white sm:!px-10 md:w-auto'
              target='_blank'
              href='/company/contact?loc=bigquery-comparison-page-get-started'>
              Contact sales
            </CUIButton>
          </p>
        </div>
      </div>

      {/* More comparisons */}
      <MoreComparisons
        comparisons={[
          {
            name: 'PostgreSQL',
            link: `/comparison/postgresql?loc=bigquery-comparison-page`,
            logo: logoPostgress
          },
          {
            name: 'Redshift',
            link: `/comparison/redshift?loc=bigquery-comparison-page`,
            logo: logoRedshift
          },
          {
            name: 'Snowflake',
            link: `/comparison/snowflake?loc=bigquery-comparison-page`,
            logo: logoSnowflake
          }
        ]}
      />
    </Layout>
  )
}

function TabbedTable() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const tableColumns: ComparisonTableProps['columns'] = [
    {
      heading: (
        <Image
          src={logoClickhouse}
          alt='ClickHouse'
          width={149}
          height={44}
          className='mx-auto -mb-2 -mt-1'
        />
      ),
      width: '35%',
      highlight: true
    },
    {
      heading: (
        <Image
          src={bigqueryTableLogo}
          alt='BigQuery'
          width={131}
          height={29}
          className='mx-auto -mb-2 -mt-1'
        />
      ),
      width: '35%'
    }
  ]

  return (
    <div>
      <ul className='flex flex-wrap justify-center gap-4'>
        {tables.map((table, tableIndex) => {
          const isActive = activeTabIndex === tableIndex
          return (
            <li key={tableIndex}>
              <button
                disabled={isActive}
                className='inline-block rounded-full border border-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-primary-300 disabled:border-primary-300 disabled:bg-primary-300 disabled:text-primary-800'
                onClick={(event) => {
                  event.preventDefault()
                  setActiveTabIndex(tableIndex)
                }}>
                {table.name}
              </button>
            </li>
          )
        })}
      </ul>

      <div className='mx-auto my-12 max-w-5xl grid-cols-1 grid-rows-1 text-center text-sm text-neutral-200 lg:grid lg:px-6'>
        {tables.map((table, tableIndex) => {
          const isActive = activeTabIndex === tableIndex
          return (
            <Fragment key={tableIndex}>
              {table.description && (
                <div
                  className={`relative col-start-1 row-start-1 space-y-6 ${isActive ? 'z-10' : 'pointer-events-none -z-10 hidden lg:block lg:opacity-0'}`}>
                  <Markdown
                    encloseByDiv={false}
                    components={{
                      a({ node, children, className = '', ...props }) {
                        return (
                          <a
                            {...props}
                            className={`text-primary-300 hover:underline ${className}`}>
                            {children}
                          </a>
                        )
                      },
                      strong({ node, children, className = '', ...props }) {
                        return (
                          <strong
                            className={`text-white ${className}`}
                            {...props}>
                            {children}
                          </strong>
                        )
                      }
                    }}>
                    {table.description}
                  </Markdown>
                </div>
              )}
            </Fragment>
          )
        })}
      </div>

      <ComparisonTable
        columns={tableColumns}
        seoCaption='Feature comparison of ClickHouse and BigQuery'
        rows={tables
          .map((table, tableIndex) => {
            const isActive = activeTabIndex === tableIndex
            return table.rows.map((row) => {
              return {
                hidden: !isActive,
                heading: (
                  <>
                    {row.heading}
                    {row?.subHeading && (
                      <small className='block font-normal normal-case'>
                        {row.subHeading}
                      </small>
                    )}
                  </>
                ),
                values: [row.clickhouse, row.bigquery]
              }
            })
          })
          .flat(1)}
      />
    </div>
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
  max = 99
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
  const lineHeight = 84
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
              <AnimationCounter interval={25} />
            </span>
            <span className='px-4 py-2'>...</span>
            <span className='px-4 py-2'>...</span>
          </AnimationBadge>
        </div>
      </div>
    </div>
  )
}

function BigQueryAnimation() {
  const lineHeight = 84

  return (
    <div className='w-96'>
      <div className='flex justify-center'>
        <AnimationBadge>
          <span className='text-[#88AECE]'>INSERT INTO</span>{' '}
          <span className='text-[#B6BD68]'>'bigquery'</span>...
        </AnimationBadge>
      </div>
      <div className='mx-auto flex w-max gap-3.5'>
        <AnimatedDataLine
          size={lineHeight}
          direction='down'
          lineColor='#4386FA'
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
        <div className='relative z-10 rounded bg-white p-3.5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='56'
            height='56'
            fill='none'
            viewBox='0 0 97 97'
            className='mx-auto'>
            <g>
              <path
                fill='#4386FA'
                d='M21.88 88.2.91 51.85a6.27 6.27 0 0 1 0-6.27L21.88 9.26a6.27 6.27 0 0 1 5.43-3.14h41.97a6.27 6.27 0 0 1 5.4 3.14l20.97 36.33a6.27 6.27 0 0 1 0 6.27L74.68 88.2a6.27 6.27 0 0 1-5.43 3.14H27.3c-2.23 0-4.3-1.2-5.41-3.14Z'
              />
              <path
                fill='#000'
                d='M61.38 37.03S67.21 51 59.27 58.94c-7.95 7.93-22.43 2.85-22.43 2.85l29.44 29.53h3c2.23 0 4.3-1.2 5.42-3.14l13.88-24.04-27.2-27.11Z'
                opacity='.1'
              />
              <path
                fill='#fff'
                d='m68.27 65.64-6.43-6.44a1 1 0 0 0-.24-.18 17.52 17.52 0 1 0-3.06 3.07c.05.08.1.16.17.23l6.44 6.44a1.01 1.01 0 0 0 1.43 0l1.69-1.69a1 1 0 0 0 0-1.43Zm-20.53-4.16a13.18 13.18 0 1 1 0-26.37 13.18 13.18 0 0 1 0 26.37ZM39.3 47.59v5.45a9.68 9.68 0 0 0 3.52 3.58v-9.06l-3.52.03Zm6.6-4.51V57.8c1.16.21 2.35.21 3.52 0V43.08H45.9Zm10.18 9.95V49.8h-3.52v6.78a9.69 9.69 0 0 0 3.53-3.57v.02Z'
              />
            </g>
          </svg>
        </div>
      </div>

      <div className='flex justify-center gap-6'>
        <div>
          <div className='mx-auto flex w-max gap-3.5'>
            <AnimatedDataLine
              size={lineHeight}
              direction='up'
              lineColor='#4386FA'
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
              lineColor='#4386FA'
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
              <AnimationCounter />
            </span>
            <span className='px-4 py-2'>...</span>
            <span className='px-4 py-2'>...</span>
          </AnimationBadge>
        </div>
      </div>
    </div>
  )
}
