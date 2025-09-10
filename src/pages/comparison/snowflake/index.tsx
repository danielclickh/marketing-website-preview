import heroLogos from './assets/hero-logos.png'
import iconDatabase from './assets/icon-database.svg'
import iconGuage from './assets/icon-guage.svg'
import iconHandCoins from './assets/icon-hand-coins.svg'
import logoAdgreetz from './assets/logo-adgreetz.svg'
import logoBigquery from './assets/logo-bigquery.svg'
import logoBraze from './assets/logo-braze.svg'
import logoChartmetric from './assets/logo-chartmetric.svg'
import logoM3ter from './assets/logo-m3ter.svg'
import snowflakeTableLogo from './assets/snowflake-table-logo.svg'
import logoClickhouse from '@/../public/logo-full.svg'
import { CUIButton } from '@/components/ClickUI'
import ComparisonTable, {
  ComparisonTableProps
} from '@/components/ComparisonTable'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import Markdown from '@/components/Markdown'
import MoreComparisons from '@/components/MoreComparisons'
import QuoteCard from '@/components/QuoteCard'
import { SuiText, SuiTitle } from '@/components/sui'
import tables from '@/data/snowflake-comparison'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import logoPostgress from '@/pages/comparison/bigquery/logo-postgress.svg'
import logoRedshift from '@/pages/comparison/bigquery/logo-redshift.svg'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        ...commonProps,
        seo: {
          title: 'Snowflake vs ClickHouse',
          path: '/comparison/snowflake',
          image: [{ url: '/images/clickhouse-vs-snowflake-og.png' }]
        }
      }
    }
  }

export default function SnowflakePage({
  footerData,
  headerData,
  seo
}: CommonProps) {
  useGalaxyOnPage('snowflakeComparisonPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='container mx-auto my-16 flex max-w-7xl flex-col items-center gap-x-6 px-8 md:flex-row 2xl:px-0'>
        <div className='mx-auto grid max-w-[800px] grid-cols-1 gap-6 text-center lg:mx-0 lg:text-left'>
          <div>
            <span className='inline-block rounded-full border border-primary-500 bg-primary-700 px-4 py-1 text-xs text-primary-300'>
              Comparisons
            </span>
          </div>
          <SuiTitle type='h1' weight='bold'>
            ClickHouse <span className='text-primary-300'>vs</span> Snowflake
          </SuiTitle>

          <Image
            src={heroLogos}
            alt='ClickHouse vs Snowflake'
            width={698 / 2}
            height={646 / 2}
            loading='eager'
            priority
            className='mx-auto lg:hidden'
          />
          <SuiText className='text-neutral-200'>
            ClickHouse is a high-performance, SQL-based analytics database built
            to power everything from traditional data warehouse workloads to
            real-time dashboards and user-facing applications. Snowflake, while
            effective for data warehousing, often struggles with
            latency-sensitive or highly concurrent workloads.
            <br />
            <br />
            Whether you’re building real-time applications, running large-scale
            event analytics, or simply looking to accelerate existing warehouse
            workloads, ClickHouse provides superior performance, significantly
            lower cost, simpler pricing, and industry-leading efficiency.
          </SuiText>
          <div className='mt-6 flex flex-col gap-4 sm:mx-auto sm:max-w-[523px] sm:flex-row lg:mx-0'>
            <CUIButton
              href='https://console.clickhouse.cloud/signUp?loc=snowflake-comparison-page-hero'
              type='primary'
              size='lg'
              weight='semibold'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Start a free trial
            </CUIButton>
            <CUIButton
              href='/company/contact?loc=snowflake-comparison-page-hero'
              type='secondary'
              size='lg'
              weight='semibold'
              target='_blank'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Contact sales
            </CUIButton>
          </div>
          <SuiText className='text-sm'>
            Read our comprehensive guide about{' '}
            <Link
              href={`https://clickhouse.com/docs/en/migrations/snowflake?loc=snowflake-comparison-page-hero`}
              target='_blank'
              prefetch={false}
              className='text-primary-300 hover:underline'>
              migrating from Snowflake to ClickHouse
            </Link>
          </SuiText>
        </div>
        <Image
          src={heroLogos}
          alt='ClickHouse vs Snowflake'
          width={698 / 2}
          height={646 / 2}
          loading='eager'
          priority
          className='mx-auto hidden lg:block'
        />
      </section>

      {/* Stats & testimonials */}
      <section className='relative overflow-hidden bg-[#363636] py-16 lg:py-24'>
        {/* Red orb */}
        <div
          className='bg-shadow-element absolute inset-0'
          style={
            {
              '--top-side': '35%',
              '--left-side': '25%',
              '--scale': '0.9',
              '--opacity': '0.08'
            } as React.CSSProperties
          }
        />
        {/* Yellow orb */}
        <div
          className='bg-shadow-element yellow-shadow absolute inset-0'
          style={
            {
              '--top-side': '10%',
              '--right-side': '25%',
              '--left-side': 'auto',
              '--scale': '0.8',
              '--opacity': '0.06'
            } as React.CSSProperties
          }
        />
        {/* Yellow triangle */}
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-1/2 bg-primary-300' />
        <div className='section-container relative z-10'>
          {/* Stats */}
          <div className='-mt-6 pb-10 text-center lg:mt-0 lg:pb-24'>
            <SuiTitle type='h2'>ClickHouse compared to Snowflake</SuiTitle>
            <div className='mx-auto mt-10 flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6'>
              {[
                {
                  icon: iconHandCoins,
                  stat: '4x',
                  label: 'Reduction in costs'
                },
                {
                  icon: iconGuage,
                  stat: '3-5x',
                  label: 'Faster queries'
                },
                {
                  icon: iconDatabase,
                  stat: '38%',
                  label: 'Better compression'
                }
              ].map((item, itemIndex) => {
                return (
                  <div
                    key={itemIndex}
                    className='flex flex-1 flex-col items-center rounded-md bg-neutral-750/70 px-4 py-8'>
                    <Image
                      src={item.icon}
                      alt={`${item.label} icon`}
                      width={32}
                      height={32}
                      className='size-8 object-contain object-center'
                    />
                    <span className='mb-2 mt-3 text-6xl font-black text-white'>
                      {item.stat}
                    </span>
                    <strong className='text-neutral-200'>{item.label}</strong>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Testimonials */}
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <p className='mb-6 text-center text-xl font-semibold leading-normal lg:-mt-3'>
              Join others migrating to ClickHouse from Snowflake
            </p>
            <div className='space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0'>
              <QuoteCard
                content="It's a lot faster. The data is consistent. We have to do less work. It's just way, way better for us. Anything we're doing in Snowflake now that we can do cheaper or faster in ClickHouse, we want to do that."
                link='/blog/how-braze-rebuilt-real-time-analytics-pipeline-with-clickHouse-cloud'
                logo={{
                  src: logoBraze,
                  width: 93,
                  height: 44,
                  alt: 'Braze'
                }}
              />
              <QuoteCard
                content='Over time, those queries had become painfully slow in Snowflake and Postgres. Some took over a minute. Others timed out entirely...The payoff [of migrating to ClickHouse] came right away. Queries that once failed now ran in six seconds, with no caching required.'
                link='/blog/why-m3ter-clickhouse-cloud'
                logo={{
                  src: logoM3ter,
                  width: 102,
                  height: 29,
                  alt: 'M3ter'
                }}
              />
              <QuoteCard
                content="Snowflake [was] too slow and costly for our needs. While it performs well for processing in-house data, it becomes quite expensive when handling real-time customer data within a product, which negatively impacts the product's unit economics."
                link='/blog/chartmetric-uses-clickhouse-to-turn-artist-data-into-music-intelligence'
                logo={{
                  src: logoChartmetric,
                  width: 189,
                  height: 35,
                  alt: 'Chartmetric'
                }}
              />
              <QuoteCard
                content="With Snowflake, we were using the standard plan, small compute, which cost nearly six times more than ClickHouse Cloud. We got several seconds query time and no materialized views. With ClickHouse Cloud's production instance, we are getting sub-second query time along with materialized views. The decision to switch was a no-brainer for us."
                link='/blog/adgreetz-processes-millions-of-daily-ad-impressions'
                logo={{
                  src: logoAdgreetz,
                  width: 178,
                  height: 23,
                  alt: 'Adgreetz'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed table */}
      <section className='section-container my-16 lg:my-24'>
        <div className='mx-auto mb-10 max-w-4xl space-y-6 text-center lg:mb-16'>
          <SuiTitle type='h2'>
            Tired of unpredictable costs, gated features, and pricing models
            that penalize interactivity?
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            <strong className='text-white'>You’re not alone.</strong> Many teams
            are rethinking their architecture.
            <br /> Discover why they’re moving real-time and user-facing
            workloads to ClickHouse.
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
                icon='hand-coins'
                title='Lower costs'
                text='Achieve 3–5x better performance per dollar than Snowflake'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='coins'
                title='Predictable pricing'
                text='No surprise bills or penalties for usage spikes or tiered feature pricing'
                className='bg-neutral-900/80'
              />
            </div>
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
                icon='unlock'
                title='No tiered lock-in'
                text='Access advanced features without upgrading to expensive plans'
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
            Migrate your workload from Snowflake today
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
              href='https://console.clickhouse.cloud/signUp?loc=snowflake-comparison-page-get-started'>
              Create a free account
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='mx-auto w-full !border-neutral-800 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white sm:!px-10 md:w-auto'
              target='_blank'
              href='/company/contact?loc=snowflake-comparison-page-get-started'>
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
            link: `/comparison/postgresql?loc=snowflake-comparison-page`,
            logo: logoPostgress
          },
          {
            name: 'Redshift',
            link: `/comparison/redshift?loc=snowflake-comparison-page`,
            logo: logoRedshift
          },
          {
            name: 'BigQuery',
            link: `/comparison/bigquery?loc=snowflake-comparison-page`,
            logo: logoBigquery
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
          src={snowflakeTableLogo}
          alt='Snowflake'
          width={142}
          height={33}
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
        seoCaption='Feature comparison of ClickHouse and Snowflake'
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
                values: [row.clickhouse, row.snowflake]
              }
            })
          })
          .flat(1)}
      />
    </div>
  )
}
