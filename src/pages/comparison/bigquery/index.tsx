import bigqueryAnimationLogo from './assets/bigquery-animation-logo.svg'
import bigqueryTableLogo from './assets/bigquery-table-logo.svg'
import chartCosts from './assets/chart-costs.svg'
import chartLatency from './assets/chart-latency.svg'
import heroLogos from './assets/hero-logos.png'
import iconConcurrent from './assets/icon-concurrent.svg'
import iconDatabase from './assets/icon-database.svg'
import iconGuage from './assets/icon-guage.svg'
import iconHandCoins from './assets/icon-hand-coins.svg'
import iconQuote from './assets/icon-quote.svg'
import logoAdevinta from './assets/logo-adevinta.svg'
import logoBlock from './assets/logo-block.png'
import logoGumlet from './assets/logo-gumlet.svg'
import logoPostgress from './assets/logo-postgress.svg'
import logoRedshift from './assets/logo-redshift.svg'
import logoSnowflake from './assets/logo-snowflake.svg'
import logoClickhouse from '@/../public/logo-full.svg'
import ClickHouseVersusAnimation from '@/components-cleaned/ClickHouseVersusAnimation'
import { CUIButton, CUICard } from '@/components/ClickUI'
import ComparisonTable, {
  ComparisonTableProps
} from '@/components/ComparisonTable'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import Markdown from '@/components/Markdown'
import MoreComparisons from '@/components/MoreComparisons'
import { SuiText, SuiTitle } from '@/components/sui'
import tables from '@/data/bigquery-comparison'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
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
              BigQuery, limited to GCP, handles ad-hoc queries and complex,
              long-running analysis effectively, but scaling introduces major
              challenges in both cost and performance management. A per-query
              pricing model drives up expenses as usage grows, penalizing
              expansion.
            </p>
            <p>
              In contrast, ClickHouse is deployable on any cloud and delivers
              stable, resource-based pricing with high concurrency and dynamic
              scaling - ideal for interactive, user-facing workloads without
              surprise bills. Read more below to see how ClickHouse and BigQuery
              compare across cost, performance, and supported features.
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
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-[67rem] bg-primary-300 lg:top-[47rem]' />
        <div className='section-container relative z-10 space-y-6'>
          <div className='mb-16 space-y-12 lg:mb-24'>
            <SuiTitle type='h2' className='text-center'>
              ClickHouse compared to BigQuery
            </SuiTitle>
            <ClickHouseVersusAnimation
              competitorName='bigquery'
              competitorLogo={bigqueryAnimationLogo}
              competitorLineColor='#4386FA'
              competitorCardColor='#fff'
            />
          </div>

          {/* Latency */}
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <div className='flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between'>
              <div className='space-y-6 text-neutral-200'>
                <div className='flex items-center gap-4 lg:gap-6'>
                  <Image src={iconGuage} alt='Icon' width={36} height={36} />
                  <SuiTitle type='h3' className='text-white'>
                    BigQuery’s query latency
                  </SuiTitle>
                </div>
                <SuiText>
                  BigQuery often struggles with sub-second queries due to
                  baseline latency on uncached results.
                </SuiText>
                <SuiText>
                  ClickHouse, built for real-time analytics at scale, delivers
                  the fastest and most resource-efficient performance -
                  consistently serving queries in under a second.
                </SuiText>
                <SuiText>
                  Whether you’re aggregating large volumes of data in real-time,
                  interactively slicing and dicing on the fly, or powering
                  customer-facing dashboards, ClickHouse ensures blazing speed.
                </SuiText>

                {/* Mobile chart */}
                <Image
                  src={chartLatency}
                  alt='Latency when querying 1 billion rows'
                  width={342}
                  height={305}
                  className='mx-auto flex-shrink flex-grow-0 lg:mx-0 lg:hidden'
                />

                <CUICard className='!h-auto gap-6 !bg-[#323232] p-6 lg:flex-row lg:items-stretch lg:pr-10'>
                  <div className='flex flex-col items-center gap-6 self-stretch lg:max-w-3xl lg:flex-row'>
                    <Image
                      src={iconQuote}
                      alt='Quote'
                      width={36}
                      height={28}
                      className='flex-shrink-0 flex-grow-0 self-start'
                    />
                    <div className='space-y-6'>
                      <SuiText>
                        We needed a solution that could scale, but also provide
                        end-user facing analytics capabilities with low latency
                        and high throughput.{' '}
                        <Link
                          href='/blog/serving-real-time-analytics-across-marketplaces-at-adevinta?loc=bigquery-comparison-page'
                          className='text-primary-300 hover:underline'>
                          <span className='absolute inset-0' />
                          Read blog
                        </Link>
                      </SuiText>
                    </div>
                  </div>
                  <Image
                    src={logoAdevinta}
                    alt='Adevinta logo'
                    width={110}
                    height={25}
                    className='mr-auto flex-shrink flex-grow-0 lg:ml-auto lg:mr-0'
                  />
                </CUICard>
              </div>

              {/* Desktop chart */}
              <Image
                src={chartLatency}
                alt='Latency when querying 1 billion rows'
                width={342}
                height={305}
                className='mx-auto hidden flex-shrink flex-grow-0 lg:mx-0 lg:block'
              />
            </div>
          </div>

          {/* Costs */}
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between'>
              <div className='space-y-6 text-neutral-200'>
                <div className='flex items-center gap-4 lg:gap-6'>
                  <Image
                    src={iconHandCoins}
                    alt='Icon'
                    width={36}
                    height={36}
                  />
                  <SuiTitle type='h3' className='text-white'>
                    BigQuery’s high cost
                  </SuiTitle>
                </div>
                <SuiText>
                  BigQuery’s per-query pricing and streaming insert fees often
                  limit usage, reduce ROI, and penalize frequent ingestion.
                  ClickHouse Cloud avoids these trade-offs with fixed pricing,
                  no per-query or insert costs, and best-in-class resource
                  efficiency - delivering maximum cost-effectiveness at scale.
                </SuiText>

                {/* Mobile chart */}
                <Image
                  src={chartCosts}
                  alt='Cost for querying 1 billion rows'
                  width={336}
                  height={273}
                  className='mx-auto flex-shrink flex-grow-0 lg:mx-0 lg:hidden'
                />

                <CUICard className='!h-auto gap-6 !bg-[#323232] p-6 lg:flex-row lg:pr-10'>
                  <div className='flex flex-col items-center gap-6 self-stretch lg:max-w-3xl lg:flex-row'>
                    <Image
                      src={iconQuote}
                      alt='Quote'
                      width={36}
                      height={28}
                      className='flex-shrink-0 flex-grow-0 self-start'
                    />
                    <div className='space-y-6'>
                      <SuiText>
                        ClickHouse solves most of our problems very efficiently
                        at a small fraction of the price in terms of
                        infrastructure. This is a far better advantage for us in
                        our books
                      </SuiText>
                      <SuiText>
                        We simply don’t want the hassle of trying to figure out
                        in advance of how many BigQuery slots to purchase - what
                        a headache!{' '}
                        <Link
                          href='/blog/hifis-migration-from-bigquery-to-clickhouse?loc=bigquery-comparison-page'
                          className='text-primary-300 hover:underline'>
                          <span className='absolute inset-0' />
                          Read blog
                        </Link>
                      </SuiText>
                    </div>
                  </div>
                  <Image
                    src={logoBlock}
                    alt='Block logo'
                    width={61}
                    height={86}
                    className='mr-auto flex-shrink flex-grow-0 lg:ml-auto lg:mr-0'
                  />
                </CUICard>
              </div>

              {/* Desktop chart */}
              <Image
                src={chartCosts}
                alt='Cost for querying 1 billion rows'
                width={336}
                height={273}
                className='mx-auto hidden flex-shrink flex-grow-0 lg:mx-0 lg:block'
              />
            </div>
          </div>

          {/* Concurrency */}
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='space-y-8 md:space-y-10'>
              <div className='flex flex-col gap-10 lg:flex-row lg:justify-between'>
                <div className='space-y-6 text-neutral-200'>
                  <div className='flex items-center gap-4 lg:gap-6'>
                    <Image
                      src={iconConcurrent}
                      alt='Icon'
                      width={36}
                      height={36}
                    />
                    <SuiTitle type='h3' className='text-white'>
                      BigQuery’s query concurrency
                    </SuiTitle>
                  </div>
                  <SuiText>
                    BigQuery caps concurrency based on compute availability,
                    queuing or rejecting queries while charging per query -
                    making high-concurrency workloads costly and unpredictable.
                  </SuiText>
                  <SuiText>
                    ClickHouse takes the opposite approach: reserve compute
                    once, pay a fixed price, and run 1,000+ queries per node.
                    Need more capacity? Simply add nodes. Costs stay
                    predictable, and scalability comes without slot management
                    or complex tuning.
                  </SuiText>
                </div>
                <CUICard className='!bg-[#323232] p-6 lg:pr-10'>
                  <CUICard.Body className='space-y-6'>
                    <Image
                      src={iconQuote}
                      alt='Quote'
                      width={36}
                      height={28}
                      className='flex-shrink-0 flex-grow-0 self-start'
                    />
                    <SuiText>
                      Another issue was BigQuery's limit of 100 concurrent
                      queries, which created bottlenecks for Gumlet's customers.
                      "If our customers needed to fire more analytics API
                      requests than that, they would fail or go into a queue.
                      <br />
                      <Link
                        href='/blog/gumlet-processing-billions-of-video-image-requests-with-clickhouse'
                        className='text-primary-300 hover:underline'>
                        <span className='absolute inset-0' />
                        Read blog
                      </Link>
                    </SuiText>
                    <Image
                      src={logoGumlet}
                      alt='Gumlet logo'
                      width={215 / 1.5}
                      height={50 / 1.5}
                      className='flex-shrink flex-grow-0'
                    />
                  </CUICard.Body>
                </CUICard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed table */}
      <section className='section-container my-16 lg:my-24'>
        <div className='mx-auto mb-12 max-w-3xl space-y-6 text-center'>
          <SuiTitle type='h2'>
            Explore why users are migrating from BigQuery to ClickHouse.
          </SuiTitle>
          <SuiText className='text-lg text-neutral-200'>
            Tired of unpredictable costs?
            <br />
            Need milliseconds when queries take seconds?
            <br />
            Want predictable, high concurrency without the headaches?
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
