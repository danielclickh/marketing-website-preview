import animationClickhouse from './assets/animation-clickhouse.svg'
import animationSplunk from './assets/animation-splunk.svg'
import clickstackLogo from './assets/clickstack-logo.svg'
import heroLogos from './assets/hero-logos.png'
import iconGuage from './assets/icon-guage.svg'
import iconHandCoins from './assets/icon-hand-coins.svg'
import iconLightning from './assets/icon-lightning.svg'
import iconUnlock from './assets/icon-unlock.svg'
import logoAnthropic from './assets/logo-anthropic.svg'
import logoElastic from './assets/logo-elastic.svg'
import logoPostgress from './assets/logo-postgress.svg'
import logoSnowflake from './assets/logo-snowflake.svg'
import splunkTableLogo from './assets/splunk-table-logo.svg'
import Accordion from '@/components-cleaned/Accordion'
import AnimatedClickstackOtel from '@/components-cleaned/AnimatedClickstackOtel'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import iconVs from '@/components-cleaned/ClickHouseVersusAnimation/assets/icon-vs.png'
import CounterAnimation from '@/components-cleaned/CounterAnimation'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import Sticky from '@/components-cleaned/Sticky'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import { CUIButton } from '@/components/ClickUI'
import ComparisonTable, {
  ComparisonTableProps
} from '@/components/ComparisonTable'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import LinkWithArrow from '@/components/LinkWithArrow'
import Markdown from '@/components/Markdown'
import MoreComparisons from '@/components/MoreComparisons'
import QuoteCard from '@/components/QuoteCard'
import ScaleToContainer from '@/components/ScaleToContainer'
import { SuiText, SuiTitle } from '@/components/sui'
import { tables, faqs } from '@/data/splunk-comparison'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { Fragment, useCallback, useRef, useState, useMemo } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        ...commonProps,
        seo: {
          title: 'Splunk vs ClickStack',
          description:
            'ClickStack offers fast, cost-efficient OpenTelemetry observability at scale. Compare it with Splunk’s complex pricing and slower searches to modernize your stack.',
          path: '/comparison/splunk-for-observability'
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
            ClickStack <span className='text-primary-300'>vs</span> Splunk
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
              built on ClickHouse for OpenTelemetry at scale. It delivers high
              compression and lightning-fast queries across high cardinality
              OTel data at petabyte scale.
            </p>
            <p>
              Splunk, in contrast, is a legacy log analytics and monitoring
              platform built on an index-based search architecture and a
              proprietary query language. Designed for IT operations and
              security analytics, it faces limitations in cost efficiency and
              performance for modern observability workloads at large scale.
            </p>
          </SuiText>
          <div className='flex flex-col gap-4 sm:mx-auto sm:max-w-[523px] sm:flex-row lg:mx-0'>
            <CUIButton
              href='https://clickhouse.com/docs/use-cases/observability/clickstack/getting-started?loc=splunk-comparison-page'
              type='primary'
              size='lg'
              weight='semibold'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Get started with open-source
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
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-[44rem] bg-primary-300 lg:top-[56rem]' />
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
              Join Anthropic in migrating from Splunk
            </h2>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:space-y-0'>
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
              <div className='order-first lg:order-last'>
                <PlayOnClickVideo
                  provider='youtube'
                  id='SrLKbzdFEWA'
                  thumbnail={<YouTubeThumbnail videoId='SrLKbzdFEWA' />}
                  playButtonEyebrow='Customer story'
                  playButtonLabel='Hear from Anthropic'
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 rounded-lg bg-neutral-800 p-6 text-neutral-0 shadow-lg lg:grid-cols-2'>
            <h2 className='col-span-full text-center font-basier text-2xl font-semibold'>
              Why ClickStack outperforms Splunk
            </h2>

            {/* Pillar 1 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded bg-neutral-725 p-6 text-neutral-200'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconHandCoins} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Predictable, resource-based pricing
                </SuiTitle>
              </div>
              <SuiText>
                Splunk’s complex mix of ingest, workload, and host-based pricing
                makes cost forecasting difficult. ClickStack uses simple
                resource-based pricing -pay only for compute and storage. With
                separation of storage and compute and high compression, users
                can enjoy long term cost-efficient retention.
              </SuiText>
            </div>

            {/* Pillar 2 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded bg-neutral-725 p-6 text-neutral-200'>
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
            <div className='relative flex flex-col gap-6 overflow-hidden rounded bg-neutral-725 p-6 text-neutral-200'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconLightning} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Unified observability without product sprawl
                </SuiTitle>
              </div>
              <SuiText>
                Unlike Splunk’s separate Enterprise, Cloud, and Observability
                platforms, ClickStack unifies logs, metrics andtraces, in one
                system - no multiple SKUs or disconnected data stores and
                disjointed user experiences.
              </SuiText>
            </div>

            {/* Pillar 4 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded bg-neutral-725 p-6 text-neutral-200'>
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

      <section className='bg-neutral-750 py-16'>
        <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between'>
          <div className='lg:max-w-xl'>
            <SuiTitle type='h2' className='mb-6'>
              Designed for OTel at scale
            </SuiTitle>
            <SuiText className='space-y-6 text-neutral-200'>
              <p>
                <strong>
                  OTel-first by design. Real-time querying.
                  <br />
                  Long term retention. No sampling.
                </strong>
              </p>
              <p>
                ClickStack, built on ClickHouse, is OpenTelemetry-native by
                design, supporting unified logs, traces, metrics, and replays at
                petabyte scale.
              </p>
              <p>
                Splunk’s architecture is not optimized for OTel’s
                high-cardinality, high-throughput demands.
              </p>
            </SuiText>
          </div>
          <div className='order-first mx-auto w-full max-w-max lg:order-last'>
            <AnimatedClickstackOtel />
          </div>
        </div>
      </section>

      {/* Tabbed table */}
      <section className='my-16 lg:my-24'>
        <div className='section-container mb-8'>
          <div className='mx-auto max-w-5xl space-y-6 text-center'>
            <SuiTitle type='h2'>ClickStack compared to Splunk</SuiTitle>
            <SuiText className='mx-auto max-w-3xl text-neutral-200'>
              Break free from thousands of products and SKUs.
              <br />
              One high-performance engine, one unified experience.
            </SuiText>
          </div>
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
          </SuiText>
          <p className='mt-8 flex flex-col justify-center gap-2 sm:flex-row sm:gap-4'>
            <CUIButton
              type='primary-dark'
              size='lg'
              className='mx-auto w-full sm:!px-10 md:w-auto'
              href='https://clickhouse.com/docs/use-cases/observability/clickstack/getting-started?loc=splunk-comparison-page-get-started'>
              Get started with open-source
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='mx-auto w-full !border-neutral-800 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white sm:!px-10 md:w-auto'
              href='/company/contact?loc=splunk-comparison-page-get-started'>
              Contact sales
            </CUIButton>
          </p>
        </div>
      </div>

      {/* FAQs */}
      <section
        id='faqs'
        className='bg-shadow-element relative mx-auto my-24 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
        style={
          {
            '--top-side': '224px'
          } as React.CSSProperties
        }>
        <div className='pb-10 text-center lg:text-left'>
          <div className='lg:sticky lg:top-32'>
            <Image
              src='/faq-icon.svg'
              alt='FAQ Icon'
              width={72}
              height={72}
              className='mx-auto lg:mx-0'
            />
            <SuiTitle type='h2' className='my-6 lg:text-left'>
              FAQs
            </SuiTitle>
            <div className='mx-auto max-w-md space-y-4 text-neutral-200 lg:text-left'>
              <p>
                We're here to make observability simple, fast, and open. Explore
                our FAQs to learn more about ClickStack, and if you don’t see
                what you need, we’re always happy to chat.
              </p>
              <p>
                <LinkWithArrow
                  href='/company/contact'
                  className='font-bold text-primary-300'>
                  Ask us anything
                </LinkWithArrow>
              </p>
            </div>
          </div>
        </div>
        <Accordion
          className='mx-auto w-full max-w-2xl lg:mr-0'
          items={faqs.map(({ question, answer }) => ({
            handle: question,
            content: answer
          }))}
        />
      </section>

      {/* More comparisons */}
      <MoreComparisons
        comparisons={[
          {
            name: 'PostgreSQL',
            link: `/comparison/postgresql?loc=splunk-comparison-page`,
            logo: logoPostgress
          },
          {
            name: 'Elastic Observability',
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

function ClickHouseVersusSplunk() {
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
    ].map((row) => {
      return row.map((col) => {
        return {
          ...col,
          duration: col.duration * 0.5
        }
      })
    })
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
          <Image
            src={animationClickhouse}
            alt='ClickHouse'
            width={283}
            height={360}
          />
          <span className='relative'>
            <span className='absolute inset-0 block animate-fadeInOut bg-primary-400 blur-lg' />
            <span className='relative z-10 inline-block rounded-full border border-primary-300 bg-primary-300 px-4 py-2 font-mono text-xs font-bold leading-none text-neutral-900'>
              Query results
            </span>
          </span>
          <div className='mx-auto flex w-max gap-3.5'>
            {clickhouseLines.map((keyframes, lineIndex) => {
              return (
                <AnimatedDataLine
                  key={lineIndex}
                  size={50}
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
              increment={4}
              max={99999}
              interval={5}
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
          className='self-center rounded-full shadow-xl'
        />

        {/* Splunk */}
        <div className='w-max'>
          <Image src={animationSplunk} alt='Splunk' width={283} height={360} />
          <span className='relative z-10 inline-block rounded-full border border-neutral-600 bg-neutral-700 px-4 py-2 font-mono text-xs font-bold leading-none text-neutral-200'>
            Search heads
          </span>
          <div className='mx-auto flex w-max gap-3.5'>
            {splunkLines.map((keyframes, lineIndex) => {
              return (
                <AnimatedDataLine
                  key={lineIndex}
                  size={50}
                  direction='down'
                  strokeWidth={8}
                  trackColor='rgba(255,255,255,0.2)'
                  lineColor='#76B43A'
                  lineProps={{
                    strokeDasharray: '6 8'
                  }}
                  keyframes={keyframes}
                />
              )
            })}
          </div>
          <div className='mx-auto inline-flex flex-col rounded border border-neutral-700 bg-neutral-750 px-4 py-2 text-center font-mono text-sm shadow-lg'>
            <CounterAnimation fixedWidth={false} max={99999} interval={300} />{' '}
            <small className='uppercase text-neutral-300'>
              Queries executed
            </small>
          </div>
        </div>
      </div>
    </ScaleToContainer>
  )
}
