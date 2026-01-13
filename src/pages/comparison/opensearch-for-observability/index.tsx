import chartQueries from './assets/chart-queries.svg'
import chartStorage from './assets/chart-storage.svg'
import clickstackLogo from './assets/clickstack-logo.svg'
import heroLogos from './assets/hero-logos.png'
import iconGuage from './assets/icon-guage.svg'
import iconHandCoins from './assets/icon-hand-coins.svg'
import iconLightning from './assets/icon-lightning.svg'
import iconUnlock from './assets/icon-unlock.svg'
import layerDataPrepper from './assets/layer-data-pepper.svg'
import layerOpensearchDashboards from './assets/layer-opensearch-dashboards.svg'
import layerOpensearch from './assets/layer-opensearch.svg'
import logoCanva from './assets/logo-canva.svg'
import logoElastic from './assets/logo-elastic.svg'
import logoPostgress from './assets/logo-postgress.svg'
import logoSnowflake from './assets/logo-snowflake.svg'
import opensearchAnimationLogo from './assets/opensearch-animation-logo.svg'
import opensearchTableLogo from './assets/opensearch-table-logo.svg'
import Accordion from '@/components-cleaned/Accordion'
import AnimatedClickHouseScaleVsCompetitor from '@/components-cleaned/AnimatedClickHouseScaleVsCompetitor'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import Sticky from '@/components-cleaned/Sticky'
import ClickStackVsCompetitorStack from '@/components/ClickStackVsCompetitorStack'
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
import { SuiText, SuiTitle } from '@/components/sui'
import { tables, faqs } from '@/data/opensearch-comparison'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateFaqPageSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { Fragment, useCallback, useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        ...commonProps,
        seo: {
          title: 'OpenSearch vs ClickStack',
          description:
            'Learn why ClickStack outperforms OpenSearch for observability with 10x faster queries, 4x lower costs, and unified analytics across logs, metrics, and traces at scale.',
          schema: generateFaqPageSchema({ faqs }),
          path: '/comparison/opensearch-for-observability'
        }
      }
    }
  }

export default function OpensearchPage({ headerData, seo }: CommonProps) {
  useGalaxyOnPage('opensearchComparisonPage')

  return (
    <Layout seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='container mx-auto my-16 flex max-w-7xl flex-col items-start gap-x-6 px-8 md:flex-row 2xl:px-0'>
        <div className='mx-auto grid max-w-[800px] grid-cols-1 gap-6 text-center lg:mx-0 lg:text-left'>
          <Breadcrumbs>
            <Breadcrumbs.Item>Comparisons</Breadcrumbs.Item>
            <Breadcrumbs.Item>Observability</Breadcrumbs.Item>
          </Breadcrumbs>
          <SuiTitle type='h1' weight='bold'>
            ClickStack <span className='text-primary-300'>vs</span> OpenSearch
          </SuiTitle>
          <Image
            src={heroLogos}
            alt='ClickHouse vs OpenSearch'
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
              OpenSearch, derived from Elasticsearch, remains anchored in a
              search-first architecture built on inverted indices. While
              effective for text search, this design falls short for modern
              observability workloads: it drives high disk usage, yields poor
              compression, and slows down queries at petabyte scale. Logs,
              metrics, and traces necessarily sit in separate indices, with no
              native way to join or analyze them together.
            </p>
          </SuiText>
          <div className='flex flex-col gap-4 sm:mx-auto sm:max-w-[523px] sm:flex-row lg:mx-0'>
            <CUIButton
              href='https://clickhouse.com/docs/use-cases/observability/clickstack/getting-started?loc=opensearch-comparison-page'
              type='primary'
              size='lg'
              weight='semibold'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Get started with open-source
            </CUIButton>
            <CUIButton
              href='/company/contact?loc=opensearch-comparison-page-hero'
              type='secondary'
              size='lg'
              weight='semibold'
              target='_blank'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Contact sales
            </CUIButton>
          </div>
          <SuiText>
            <p className='font-bold text-white'>
              Why ClickStack is better than Lucene-based observability:
            </p>
          </SuiText>
          <div className='flex flex-col items-stretch gap-y-5 rounded-lg border border-neutral-700/80 bg-neutral-900/50 shadow-lg lg:flex-row lg:divide-x lg:divide-neutral-700/80'>
            {[
              {
                stat: '4x',
                label: 'Reduction in costs'
              },
              {
                stat: '10x',
                label: 'Faster analytical queries'
              },
              {
                stat: '2x',
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
        </div>
        <Image
          src={heroLogos}
          alt='ClickHouse vs OpenSearch'
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
              Frustrated by slow queries, rising storage costs, and an endless
              need to scale horizontally?{' '}
              <strong className='text-white'>You’re not alone.</strong>
            </SuiTitle>
            <AnimatedClickHouseScaleVsCompetitor
              name='OpenSearch'
              logo={opensearchAnimationLogo}
              tileColor='#F4F8FB'
              lineColor='#1486BA'
            />
          </div>

          {/* Testimonials */}
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-800 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <h2 className='mb-6 text-center font-basier text-2xl font-semibold lg:-mt-3'>
              Join Canva in migrating from OpenSearch
            </h2>
            <QuoteCard
              direction='horizontal'
              content={`Moving to ClickHouse meant 70 percent lower costs and a 10x improvement in search performance. With amazing out of the box performance and really amazing compression, we got the ingest performance we needed and the headroom to make queries fast. We're doing more and storing more with less.`}
              link='/blog/canva-faster-search-lower-costs'
              logo={{
                src: logoCanva,
                width: 199.6 * 0.6,
                height: 64 * 0.6,
                alt: 'Canva'
              }}
            />
          </div>

          <div className='relative grid grid-cols-1 gap-6 overflow-hidden rounded-lg bg-neutral-800 p-6 text-neutral-0 shadow-lg lg:grid-cols-2'>
            <h2 className='col-span-full text-center font-basier text-2xl font-semibold'>
              Why ClickStack outperforms OpenSearch Observability
            </h2>

            {/* Pillar 1 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded bg-neutral-725 p-6 text-neutral-200'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconGuage} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Performance at scale
                </SuiTitle>
              </div>
              <SuiText>
                OpenSearch slows under heavy ingest and high-cardinality
                queries, while ClickHouse powers sub-second analytics even at
                petabyte scale.
              </SuiText>
              <Image
                src={chartQueries}
                alt='Full data set aggregation for 1 billion JSON documents'
                width={336}
                height={273}
                className='mx-auto mt-auto'
              />
            </div>

            {/* Pillar 2 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded bg-neutral-725 p-6 text-neutral-200'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconHandCoins} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Lower cost, higher efficiency
                </SuiTitle>
              </div>
              <SuiText>
                ClickHouse’s columnar storage and advanced compression cut
                storage needs by &gt; 50%, reducing infrastructure costs
                dramatically and allowing for long term retention.
              </SuiText>
              <Image
                src={chartStorage}
                alt='Storage required for 1 billion JSON documents'
                width={336}
                height={273}
                className='mx-auto mt-auto'
              />
            </div>

            {/* Pillar 3 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded bg-neutral-725 p-6 text-neutral-200'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconLightning} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Unified observability
                </SuiTitle>
              </div>
              <SuiText>
                ClickStack runs logs, metrics, and traces in one engine
                alongside business and application data for unrivalled
                correlation. OpenSearch was never designed for analytical
                workloads leaving data fragmented.
              </SuiText>
            </div>

            {/* Pillar 4 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded bg-neutral-725 p-6 text-neutral-200'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconUnlock} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Operational simplicity
                </SuiTitle>
              </div>
              <SuiText>
                ClickStack eliminates the overhead of managing tens, hundreds,
                or even thousands of shards and the constant JVM tuning that
                comes with them. Its optimized engine scales vertically,
                handling massive datasets within a single shard - only requiring
                sharding at extreme volumes - reducing network overhead and
                costly rebalances.
              </SuiText>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed table */}
      <section className='my-16 lg:my-24'>
        <div className='section-container mb-8'>
          <div className='mx-auto mb-16 max-w-5xl space-y-6 text-center'>
            <SuiTitle type='h2'>
              ClickStack compared to OpenSearch for Observability
            </SuiTitle>
            <SuiText className='mx-auto max-w-3xl text-neutral-200'>
              At a high level, OpenSearch and ClickStack share a familiar shape:
              both have a data collection layer (FluentBit and Data Prepper vs.
              OpenTelemetry), a storage engine (OpenSearch vs. ClickHouse), and
              a UI (OpenSearch dashboards vs. HyperDX). But beneath these
              parallels, the architectures diverge.
            </SuiText>
          </div>
          <ClickStackVsCompetitorStack
            layer1={{ logo: { src: layerOpensearchDashboards } }}
            layer2={{ logo: { src: layerOpensearch } }}
            layer3={{ logo: { src: layerDataPrepper } }}
          />
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
                text='10x cost savings thanks to high compression and resource efficiency'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='squares-four'
                title='Simpler at scale'
                text='Homogenous architecture and vertical scaling simplifies and reduces nodes'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='chart-line'
                title='Built for high cardinality analytics'
                text='Column orientation designed for high cardinality queries'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='list-search'
                title='Cloud-agnostic and open'
                text='Deploy on any cloud or on-premises. ClickStack’s open architecture avoids vendor lock-in and integrates seamlessly across ecosystems.'
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
            Migrate your workload from OpenSearch today
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
              href='https://clickhouse.com/docs/use-cases/observability/clickstack/getting-started?loc=opensearch-comparison-page-get-started'>
              Get started with open-source
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='mx-auto w-full !border-neutral-800 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white sm:!px-10 md:w-auto'
              href='/company/contact?loc=opensearch-comparison-page-get-started'>
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
            link: `/comparison/postgresql?loc=opensearch-comparison-page`,
            logo: logoPostgress
          },
          {
            name: 'Elastic Observability',
            link: `/comparison/elastic-for-observability?loc=opensearch-comparison-page`,
            logo: logoElastic
          },
          {
            name: 'Snowflake',
            link: `/comparison/snowflake?loc=opensearch-comparison-page`,
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
          src={opensearchTableLogo}
          alt='OpenSearch'
          width={156}
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
                  values: [row.clickhouse, row.opensearch]
                }
              })
            })
            .flat(1)}
        />
      </div>
    </div>
  )
}
