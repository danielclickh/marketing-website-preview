import chartQueries from './assets/chart-queries.svg'
import chartStorage from './assets/chart-storage.svg'
import clickstackLogo from './assets/clickstack-logo.svg'
import splunkAnimationLogo from './assets/elastic-animation-logo.svg'
import heroLogos from './assets/hero-logos.png'
import iconDatabase from './assets/icon-database.svg'
import iconGuage from './assets/icon-guage.svg'
import iconHandCoins from './assets/icon-hand-coins.svg'
import iconLightning from './assets/icon-lightning.svg'
import iconUnlock from './assets/icon-unlock.svg'
import logoAnthropic from './assets/logo-anthropic.svg'
import logoDidi from './assets/logo-didi.svg'
import logoElastic from './assets/logo-elastic.svg'
import logoSplunksearch from './assets/logo-elasticsearch.svg'
import logoKibana from './assets/logo-kibana.svg'
import logoLogstash from './assets/logo-logstash.svg'
import logoNetflix from './assets/logo-netflix.svg'
import logoPostgress from './assets/logo-postgress.svg'
import logoShopee from './assets/logo-shopee.svg'
import logoSnowflake from './assets/logo-snowflake.svg'
import logoZomato from './assets/logo-zomato.svg'
import splunkTableLogo from './assets/splunk-table-logo.svg'
import styles from './styles.module.scss'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import iconVs from '@/components-cleaned/ClickHouseVersusAnimation/assets/icon-vs.png'
import CounterAnimation from '@/components-cleaned/CounterAnimation'
import LogoStack from '@/components-cleaned/LogoStack'
import Sticky from '@/components-cleaned/Sticky'
import ClickStack from '@/components/ClickStack'
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
import tables from '@/data/splunk-comparison'
import { useDebounce } from '@/hooks'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo
} from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        ...commonProps,
        seo: {
          title: 'Splunk vs ClickHouse',
          path: '/comparison/splunk-for-observability',
          image: [{ url: '/images/clickhouse-vs-splunk-og.png' }]
        }
      }
    }
  }

export default function SplunkPage({
  footerData,
  headerData,
  seo
}: CommonProps) {
  useGalaxyOnPage('splunkComparisonPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='container mx-auto my-16 flex max-w-7xl flex-col items-start gap-x-6 px-8 md:flex-row 2xl:px-0'>
        <div className='mx-auto grid max-w-[800px] grid-cols-1 gap-6 text-center lg:mx-0 lg:text-left'>
          <Breadcrumbs>
            <Breadcrumbs.Item>Comparisons</Breadcrumbs.Item>
            <Breadcrumbs.Item>Observability</Breadcrumbs.Item>
          </Breadcrumbs>
          <SuiTitle type='h1' weight='bold'>
            ClickHouse <span className='text-primary-300'>vs</span> Splunk
          </SuiTitle>
          <Image
            src={heroLogos}
            alt='ClickHouse vs Splunk'
            width={698 / 2}
            height={646 / 2}
            loading='eager'
            priority
            className='mx-auto lg:hidden'
          />
          <SuiText className='space-y-6 text-neutral-200'>
            <p>
              ClickStack is a high-performance, open-source observability stack
              built on ClickHouse. It delivers high compression, lightning-fast
              queries and powerful aggregations across high cardinality logs,
              metrics, traces, session replays at petabyte scale.
            </p>
            <p>
              Splunk, in contrast, is a legacy log analytics and monitoring
              platform built on an index-based search architecture and
              proprietary Search Processing Language (SPL). Designed primarily
              for IT operations and security analytics, it faces limitations in
              cost efficiency, scalability, and performance for modern
              observability workloads at large scale.
            </p>
          </SuiText>
          <div className='flex flex-col gap-4 sm:mx-auto sm:max-w-[523px] sm:flex-row lg:mx-0'>
            <CUIButton
              href='https://clickhouse.com/docs/use-cases/observability/clickstack/overview'
              type='primary'
              size='lg'
              weight='semibold'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Get started
            </CUIButton>
            <CUIButton
              href='/company/contact?loc=splunk-comparison-page-hero'
              type='secondary'
              size='lg'
              weight='semibold'
              target='_blank'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Contact sales
            </CUIButton>
          </div>
        </div>
        <Image
          src={heroLogos}
          alt='ClickHouse vs Splunk'
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
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-[44rem] bg-primary-300 lg:top-[50rem]' />
        <div className='section-container relative z-10 space-y-6'>
          <div className='mb-16 text-center lg:mb-24'>
            <SuiTitle
              type='h2'
              className='mx-auto mb-16 max-w-5xl text-neutral-200'>
              Tired of ingest limits, limited retention, slow searches, and
              complex licensing?{' '}
              <strong className='text-white'>You’re not alone.</strong>
            </SuiTitle>
            <ClickHouseVersusSplunk />
          </div>

          {/* Testimonials */}
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-800 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <h2 className='mb-6 text-center font-basier text-2xl font-semibold lg:-mt-3'>
              Join others migrating to ClickStack from Splunk
            </h2>
            <div className='space-y-6 lg:grid lg:grid-cols-1 lg:gap-6 lg:space-y-0'>
              <QuoteCard
                content='I’d recommend ClickHouse - it supports real-time at scale, fast analytics, deployment flexibility, and cost-effective scaling. Queries are lightning-fast, and money is not on fire as much.'
                link='/blog/how-anthropic-is-using-clickhouse-to-scale-observability-for-ai-era'
                logo={{
                  src: logoAnthropic,
                  width: 200 * 0.9,
                  height: 41 * 0.9,
                  alt: 'Anthropic'
                }}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Pillar 1 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded-lg bg-neutral-800 p-6 text-neutral-200 shadow-lg lg:p-10'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconHandCoins} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Predictable, resource-based pricing
                </SuiTitle>
              </div>
              <SuiText>
                Splunk’s complex mix of ingest, workload, and host-based pricing
                makes cost forecasting difficult. ClickStack uses simple
                resource-based pricing, so you pay for compute and storage only.
                With separation of storage and compute and at least 10x
                compression, users can enjoy long term cost-efficient retention.
              </SuiText>
            </div>

            {/* Pillar 2 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded-lg bg-neutral-800 p-6 text-neutral-200 shadow-lg lg:p-10'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconGuage} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Real-time performance, not long-running searches
                </SuiTitle>
              </div>
              <SuiText>
                Splunk queries often slow under scale or require
                pre-aggregations like tstats. ClickStack delivers sub-second
                queries on full-fidelity data, even across trillions of rows. No
                sampling. No penalty for high cardinality.
              </SuiText>
            </div>

            {/* Pillar 3 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded-lg bg-neutral-800 p-6 text-neutral-200 shadow-lg lg:p-10'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconLightning} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Unified observability without product sprawl
                </SuiTitle>
              </div>
              <SuiText>
                Unlike Splunk’s separate Enterprise, Cloud, and Observability
                platforms, ClickStack unifies logs, metrics, traces, and replays
                in one system - no multiple SKUs or disconnected data stores and
                disjointed user experiences.
              </SuiText>
            </div>

            {/* Pillar 4 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded-lg bg-neutral-800 p-6 text-neutral-200 shadow-lg lg:p-10'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconUnlock} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Open source and open standards
                </SuiTitle>
              </div>
              <SuiText>
                Splunk’s proprietary SPL and closed data formats limit
                portability. ClickStack is fully open-source and embraces open
                standards like SQL and OpenTelemetry, ensuring flexibility and
                avoiding lock-in.
              </SuiText>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed table */}
      <section className='my-16 lg:my-24'>
        <div className='section-container mb-16'>
          <div className='mx-auto mb-16 max-w-5xl space-y-6 text-center'>
            <SuiTitle type='h2'>ClickStack compared to Splunk</SuiTitle>
            <SuiText className='mx-auto max-w-3xl text-neutral-200'>
              Break free from thousands of products and SKUs.
              <br />
              One high-performance engine, one unified experience.
            </SuiText>
          </div>
          <ClickStackVersusSplunkStack />
        </div>
        <TabbedTable />
      </section>

      {/* Cards  */}
      <section className='relative z-10 bg-neutral-700 py-16 lg:py-20'>
        <div className='section-container'>
          <div className='-mx-4 flex flex-col lg:mx-auto lg:max-w-4xl lg:flex-row lg:flex-wrap lg:justify-center'>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='database'
                title='Long-term retention without compromise'
                text='Separation of storage and compute and 10–30x compression, enables cost-efficient, near-infinite data retention. Keep full-fidelity data for months or years without sampling or pre-aggregation'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='gear'
                title='Schema on read and write'
                text='Splunk pioneered schema-on-read, and ClickStack matches it with powerful parsing and string extraction functions. It also adds dynamic schema-on-write, allowing users to index data efficiently for compression and performance'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='guage'
                title='Consistently low latency at high concurrency'
                text='ClickHouse was designed for real-time analytics, sustaining thousands of concurrent queries while maintaining sub-second latency'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='hand-coins'
                title='Unified architecture with simple pricing'
                text='ClickStack streamlines observability in a unified engine. Eliminate the operational complexity of multiple products, components and SKUs.'
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
            Migrate your workload from Splunk today
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            Cut costs, boost performance, and unlock observability at scale with
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
              href='https://console.clickhouse.cloud/signUp?loc=splunk-comparison-page-get-started'>
              Create a free account
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='mx-auto w-full !border-neutral-800 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white sm:!px-10 md:w-auto'
              target='_blank'
              href='/company/contact?loc=splunk-comparison-page-get-started'>
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
            link: `/comparison/postgresql?loc=splunk-comparison-page`,
            logo: logoPostgress
          },
          {
            name: 'Elastic',
            link: `/comparison/elastic-for-observability?loc=splunk-comparison-page`,
            logo: logoElastic
          },
          {
            name: 'Snowflake',
            link: `/comparison/snowflake?loc=splunk-comparison-page`,
            logo: logoSnowflake
          }
        ]}
      />
    </Layout>
  )
}

function TabbedTable() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const tableRef = useRef<null | HTMLDivElement>(null)

  const scrollTableIntoView = useCallback(() => {
    const table = tableRef.current
    if (table) {
      const timer = window.setTimeout(() => {
        const boundingRect = table.getBoundingClientRect()
        const isInView =
          boundingRect.bottom > 0 &&
          boundingRect.right > 0 &&
          boundingRect.top < window.innerHeight &&
          boundingRect.left < window.innerWidth

        // Only scroll into view if it's not already in view
        if (!isInView) {
          table.scrollIntoView({
            block: 'center'
          })
        }
      }, 100)

      return () => window.clearTimeout(timer)
    }
  }, [tableRef])

  const tableColumns: ComparisonTableProps['columns'] = [
    {
      heading: (
        <Image
          src={clickstackLogo}
          alt='ClickStack'
          width={131}
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
          src={splunkTableLogo}
          alt='Splunk'
          width={103}
          height={30}
          className='mx-auto -mb-2 -mt-1'
        />
      ),
      width: '35%'
    }
  ]

  return (
    <div className='relative'>
      <Sticky
        className='z-40 border-b border-transparent py-4 transition'
        stuckClassName='bg-neutral-900/80 border-white/5 backdrop-blur'>
        <div className='section-container'>
          <div className='hide-scrollbar -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-x-visible lg:px-0'>
            <ul className='mx-auto flex w-min justify-center whitespace-nowrap px-2'>
              {tables.map((table, tableIndex) => {
                const isActive = activeTabIndex === tableIndex
                return (
                  <li key={tableIndex} className='px-1 lg:px-2'>
                    <button
                      disabled={isActive}
                      className='inline-block rounded-full border border-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-primary-300 disabled:border-primary-300 disabled:bg-primary-300 disabled:text-primary-800'
                      onClick={(event) => {
                        event.preventDefault()
                        setActiveTabIndex(tableIndex)
                        scrollTableIntoView()
                      }}>
                      {table.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Sticky>

      <div className='section-container' ref={tableRef}>
        <div className='mx-auto mb-12 mt-6 max-w-5xl grid-cols-1 grid-rows-1 text-center text-sm text-neutral-200 lg:grid lg:px-6'>
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
          seoCaption='Feature comparison of ClickHouse and Splunk'
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
                  values: [row.clickhouse, row.splunk]
                }
              })
            })
            .flat(1)}
        />
      </div>
    </div>
  )
}

function ClickStackVersusSplunkStack() {
  const layerGap = 72
  return (
    <ScaleToContainer className='mx-auto'>
      <div className='flex w-max flex-row items-center justify-center gap-x-16 gap-y-8'>
        <ClickStack gap={layerGap} />
        <Image
          src={iconVs}
          width={60}
          height={60}
          alt='VS'
          className='rounded-full shadow-xl'
        />
        <LogoStack
          gap={layerGap}
          layers={[
            {
              logo: { src: logoKibana }
            },
            {
              logo: { src: logoSplunksearch }
            },
            {
              logo: { src: logoLogstash }
            }
          ]}
        />
      </div>
    </ScaleToContainer>
  )
}

function useLoopKey(stage: number) {
  const prev = useRef<number | null>(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (prev.current !== null && stage < prev.current) {
      setKey((k) => 1 - k) // toggle between 0 and 1
    }
    prev.current = stage
  }, [stage])

  return key
}

function ClickHouseVersusSplunk() {
  const [activeClickhouseStep, setActiveClickhouseStep] = useState(0)
  const [activeSplunkStep, setActiveSplunkStep] = useState(0)
  const clickhouseSteps = [
    {
      rows: 1,
      cols: 1,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 600,
      delay: 400
    },
    {
      rows: 1,
      cols: 1,
      cellWidth: 80,
      cellHeight: 170,
      gutter: 10,
      duration: 600,
      delay: 400
    },
    {
      rows: 1,
      cols: 1,
      cellWidth: 80,
      cellHeight: 260,
      gutter: 10,
      duration: 600,
      delay: 400
    },
    {
      rows: 1,
      cols: 2,
      cellWidth: 80,
      cellHeight: 260,
      gutter: 10,
      duration: 600,
      delay: 400
    },

    // Long delay
    {
      rows: 1,
      cols: 2,
      cellWidth: 80,
      cellHeight: 260,
      gutter: 10,
      duration: 0,
      delay: 10000
    }
  ]

  const splunkSteps = [
    {
      cols: 1,
      rows: 1,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 1000,
      delay: 800
    },
    {
      cols: 1,
      rows: 2,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 1000,
      delay: 800
    },
    {
      cols: 1,
      rows: 3,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 1000,
      delay: 800
    },
    {
      cols: 2,
      rows: 3,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 1000,
      delay: 800
    },
    {
      cols: 4,
      rows: 6,
      cellWidth: 38.75,
      cellHeight: 38.75,
      gutter: 5,
      duration: 1000,
      delay: 800
    },
    {
      cols: 8,
      rows: 12,
      cellWidth: 16.875,
      cellHeight: 16.875,
      gutter: 5,
      duration: 1000,
      delay: 800
    },

    // Long pause at end of animation
    {
      cols: 8,
      rows: 12,
      cellWidth: 16.875,
      cellHeight: 16.875,
      gutter: 5,
      duration: 0,
      delay: 3000
    }
  ]

  const loopKey = useLoopKey(activeSplunkStep)

  const glowClickhouse = activeClickhouseStep >= clickhouseSteps.length - 2

  const clickhouseCounterInterval = [150, 100, 50, 25, 5][activeClickhouseStep]
  const clickhouseCounterIncrement = [1, 2, 3, 4, 4][activeClickhouseStep]

  const splunkCounterInterval = [300, 250, 200, 150, 100, 50, 50][
    activeSplunkStep
  ]

  const clickhouseLines = useMemo(() => {
    return [
      [
        { startSize: 0.5, endSize: 1.5, duration: 1.3 },
        { startSize: 1, endSize: 2, duration: 1.25 },
        { startSize: 1.1, endSize: 1, duration: 0.9 },
        { startSize: 2, endSize: 1.5, duration: 0.8 }
      ],
      [
        { startSize: 0.8, endSize: 1.2, duration: 1.3 },
        { startSize: 0.5, endSize: 1.5, duration: 1.5 },
        { startSize: 0.25, endSize: 1, duration: 1 },
        { startSize: 1, endSize: 0.8, duration: 0.7 }
      ],
      [
        { startSize: 1.1, endSize: 1, duration: 1.5 },
        { startSize: 1, endSize: 2, duration: 1.25 },
        { startSize: 0.5, endSize: 1.5, duration: 1.5 }
      ]
    ]
  }, [])

  const splunkLines = useMemo(() => {
    return [
      [
        { startSize: 0.5, endSize: 1.5, duration: 4.8 },
        { startSize: 1, endSize: 2, duration: 4.75 },
        { startSize: 1.1, endSize: 1, duration: 4.4 },
        { startSize: 2, endSize: 1.5, duration: 5.3 }
      ]
    ]
  }, [])

  return (
    <ScaleToContainer scaleUp={false} className='mx-auto'>
      <div className='relative flex w-max flex-row flex-nowrap gap-x-12 lg:gap-x-16'>
        {/* ClickHouse */}
        <div className='w-max'>
          <GridAnimation
            onStepChange={setActiveClickhouseStep}
            steps={clickhouseSteps}
            cell={
              <>
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${glowClickhouse ? '' : 'opacity-0'}`}>
                  <div className='absolute inset-0 animate-fadeInOut rounded-sm bg-primary-300 blur-lg' />
                </div>
                <div className='absolute inset-0 rounded-sm bg-primary-300'>
                  <div className='absolute inset-[10%]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='55'
                      height='56'
                      fill='none'
                      viewBox='0 0 55 56'
                      className='absolute h-full w-full'>
                      <path
                        fill='#000'
                        d='M4.87 5.37c0-.27.23-.55.55-.55h4c.28 0 .56.23.56.55V49.9c0 .28-.23.55-.55.55H5.42a.55.55 0 0 1-.55-.55V5.37Zm10.12 0c0-.27.23-.55.55-.55h4c.28 0 .56.23.56.55V49.9c0 .28-.23.55-.55.55h-4.01a.55.55 0 0 1-.55-.55V5.37Zm10.11 0c0-.27.24-.55.56-.55h4c.28 0 .55.23.55.55V49.9c0 .28-.22.55-.54.55h-4.01a.55.55 0 0 1-.55-.55V5.37Zm10.13 0c0-.27.23-.55.55-.55h4c.28 0 .55.23.55.55V49.9c0 .28-.22.55-.54.55h-4.01a.55.55 0 0 1-.55-.55V5.37ZM45.4 23.1c0-.27.22-.54.54-.54h4.01c.28 0 .55.22.55.54v9.07c0 .28-.23.55-.55.55h-4.01a.55.55 0 0 1-.55-.55V23.1Z'
                      />
                    </svg>
                  </div>
                </div>
              </>
            }
          />
          <div
            className={`mx-auto flex w-max gap-3.5 ${styles.animationLineMask}`}
            style={{ marginTop: -130 }}>
            {clickhouseLines.map((keyframes, lineIndex) => {
              return (
                <AnimatedDataLine
                  key={lineIndex}
                  size={210}
                  direction='down'
                  trackColor='rgba(255,255,255,0.2)'
                  keyframes={keyframes}
                />
              )
            })}
          </div>
          <div className='mx-auto inline-flex flex-col rounded border border-neutral-700 bg-neutral-750 px-4 py-2 text-center font-mono text-sm shadow-lg'>
            <CounterAnimation
              fixedWidth={false}
              key={loopKey}
              increment={clickhouseCounterIncrement}
              max={99999}
              interval={clickhouseCounterInterval}
            />{' '}
            <small className='uppercase text-neutral-300'>
              Queries executed
            </small>
          </div>
        </div>

        {/* VS icon */}
        <Image
          src={iconVs}
          width={60}
          height={60}
          alt='VS'
          className='-mt-28 self-center rounded-full shadow-xl'
        />

        {/* Splunk */}
        <div className='w-max'>
          <GridAnimation
            onStepChange={setActiveSplunkStep}
            steps={splunkSteps}
            cell={
              <div className='absolute inset-0 rounded-sm bg-white'>
                <div className='absolute inset-[10%]'>
                  <Image
                    src={splunkAnimationLogo}
                    width={56}
                    height={56}
                    alt='Splunk'
                    className='absolute h-full w-full object-contain'
                  />
                </div>
              </div>
            }
          />
          <div
            className={`mx-auto flex w-max gap-3.5 ${styles.animationLineMask}`}
            style={{ marginTop: -130 }}>
            {splunkLines.map((keyframes, lineIndex) => {
              return (
                <AnimatedDataLine
                  key={lineIndex}
                  size={210}
                  direction='down'
                  strokeWidth={16}
                  trackColor='rgba(255,255,255,0.2)'
                  lineColor='#22BCB3'
                  lineProps={{
                    strokeDasharray: '6 8'
                  }}
                  keyframes={keyframes}
                />
              )
            })}
          </div>
          <div className='mx-auto inline-flex flex-col rounded border border-neutral-700 bg-neutral-750 px-4 py-2 text-center font-mono text-sm shadow-lg'>
            <CounterAnimation
              fixedWidth={false}
              key={loopKey}
              max={99999}
              interval={splunkCounterInterval}
            />{' '}
            <small className='uppercase text-neutral-300'>
              Queries executed
            </small>
          </div>
        </div>
      </div>
    </ScaleToContainer>
  )
}

type GridAnimationStep = {
  rows: number
  cols: number
  cellWidth: number
  cellHeight: number
  gutter: number
  duration: number
  delay?: number
}

export function GridAnimation({
  cell,
  steps,
  onStepChange // called when internal step changes (uncontrolled mode)
}: {
  cell: React.ReactNode
  steps: Array<GridAnimationStep>
  onStepChange?: (next: number) => void
}) {
  type CellStep = {
    id: string
    x: number
    y: number
    width: number
    height: number
  }
  type StableCell = {
    id: string
    bornAt: number
    birthRows: number
    birthCols: number
    birthRow: number
    birthCol: number
  }

  const clamp = (n: number, min: number, max: number) => {
    return Math.min(Math.max(n, min), max)
  }

  const scaleIndex = (i: number, fromN: number, toN: number) => {
    if (toN <= 1 || fromN <= 1) return 0
    return Math.round((i * (toN - 1)) / (fromN - 1))
  }

  // the effective step we render
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = useMemo(() => {
    return steps[currentIndex]
  }, [steps.length, currentIndex])

  // canvas size
  const canvasWidth = useMemo(
    () =>
      Math.max(
        ...steps.map((s) => s.cols * s.cellWidth + (s.cols - 1) * s.gutter)
      ),
    [steps]
  )
  const canvasHeight = useMemo(
    () =>
      Math.max(
        ...steps.map((s) => s.rows * s.cellHeight + (s.rows - 1) * s.gutter)
      ),
    [steps]
  )

  const gridMetrics = (s: GridAnimationStep) => {
    const gridWidth = s.cols * s.cellWidth + (s.cols - 1) * s.gutter
    const gridHeight = s.rows * s.cellHeight + (s.rows - 1) * s.gutter
    const startX = Math.round((canvasWidth - gridWidth) / 2)
    const startY = Math.round((canvasHeight - gridHeight) / 2)
    return { startX, startY }
  }

  // build stable cells with “birth slots”
  const stableCells = useMemo<StableCell[]>(() => {
    const out: StableCell[] = []
    for (let sIdx = 0; sIdx < steps.length; sIdx++) {
      const s = steps[sIdx]
      const targetCount = s.rows * s.cols
      const prevCount =
        sIdx === 0 ? 0 : steps[sIdx - 1].rows * steps[sIdx - 1].cols
      const toCreate = Math.max(0, targetCount - prevCount)
      if (toCreate === 0) continue

      // mark occupied when scaling existing cells into this step
      const occupied = new Set<string>()
      for (const c of out) {
        if (c.bornAt >= sIdx) continue
        const rr = scaleIndex(c.birthRow, c.birthRows, s.rows)
        const cc = scaleIndex(c.birthCol, c.birthCols, s.cols)
        occupied.add(`${rr}:${cc}`)
      }

      // row-major fill for new births
      let created = 0
      outer: for (let r = 0; r < s.rows; r++) {
        for (let c = 0; c < s.cols; c++) {
          const key = `${r}:${c}`
          if (!occupied.has(key)) {
            out.push({
              id: String(out.length),
              bornAt: sIdx,
              birthRows: s.rows,
              birthCols: s.cols,
              birthRow: r,
              birthCol: c
            })
            created++
            if (created >= toCreate) break outer
          }
        }
      }
    }
    return out
  }, [steps])

  const positionAtStep = (cell: StableCell, s: GridAnimationStep): CellStep => {
    const { startX, startY } = gridMetrics(s)
    const r = scaleIndex(cell.birthRow, cell.birthRows, s.rows)
    const c = scaleIndex(cell.birthCol, cell.birthCols, s.cols)
    return {
      id: cell.id,
      x: startX + c * (s.cellWidth + s.gutter),
      y: startY + r * (s.cellHeight + s.gutter),
      width: s.cellWidth,
      height: s.cellHeight
    }
  }

  const birthPositions = useMemo(() => {
    const m = new Map<string, CellStep>()
    for (const c of stableCells) m.set(c.id, positionAtStep(c, steps[c.bornAt]))
    return m
  }, [stableCells, steps])

  const currentLayout = useMemo(() => {
    return stableCells
      .filter((c) => c.bornAt <= currentIndex)
      .map((c) => positionAtStep(c, current))
  }, [stableCells, currentIndex, current])

  // auto-advance (uncontrolled only)
  useEffect(() => {
    onStepChange?.(currentIndex)

    const next = steps[(currentIndex + 1) % steps.length]
    const delay = current.duration + (next.delay || 0)

    const timer = window.setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % steps.length)
    }, delay)

    return () => window.clearTimeout(timer)
  }, [currentIndex, current, steps.length, onStepChange])

  return (
    <div
      className='relative'
      style={{ width: canvasWidth, height: canvasHeight }}>
      {stableCells.map((c) => {
        const birth = birthPositions.get(c.id)!
        const target = currentLayout.find((p) => p.id === c.id)
        const isActive = !!target
        const to = target ?? birth
        return (
          <motion.div
            key={c.id}
            layout={false}
            initial={{
              opacity: 0,
              scale: 0.4,
              x: birth.x,
              y: birth.y,
              width: birth.width,
              height: birth.height,
              originX: 0.5,
              originY: 0.5
            }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.4,
              x: to.x,
              y: to.y,
              width: to.width,
              height: to.height
            }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: current.duration / 1000
            }}
            className='absolute left-0 top-0'>
            {cell}
          </motion.div>
        )
      })}
    </div>
  )
}
