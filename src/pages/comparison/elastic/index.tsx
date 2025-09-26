import chartQueries from './assets/chart-queries.svg'
import chartStorage from './assets/chart-storage.svg'
import elasticAnimationLogo from './assets/elastic-animation-logo.svg'
import elasticTableLogo from './assets/elastic-table-logo.svg'
import heroLogos from './assets/hero-logos.png'
import iconDatabase from './assets/icon-database.svg'
import iconGuage from './assets/icon-guage.svg'
import iconHandCoins from './assets/icon-hand-coins.svg'
import iconLightning from './assets/icon-lightning.svg'
import iconUnlock from './assets/icon-unlock.svg'
import logoDidi from './assets/logo-didi.svg'
import logoElasticsearch from './assets/logo-elasticsearch.svg'
import logoKibana from './assets/logo-kibana.svg'
import logoLogstash from './assets/logo-logstash.svg'
import logoNetflix from './assets/logo-netflix.svg'
import logoPostgress from './assets/logo-postgress.svg'
import logoRedshift from './assets/logo-redshift.svg'
import logoShopee from './assets/logo-shopee.svg'
import logoSnowflake from './assets/logo-snowflake.svg'
import logoZomato from './assets/logo-zomato.svg'
import logoClickhouse from '@/../public/logo-full.svg'
import iconVs from '@/components-cleaned/ClickHouseVersusAnimation/assets/icon-vs.png'
import LogoStack from '@/components-cleaned/LogoStack'
import Sticky from '@/components-cleaned/Sticky'
import ClickStack from '@/components/ClickStack'
import { CUIButton, CUICard } from '@/components/ClickUI'
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
import tables from '@/data/elastic-comparison'
import { useDebounce } from '@/hooks'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        ...commonProps,
        seo: {
          title: 'Elastic vs ClickHouse',
          path: '/comparison/elastic',
          image: [{ url: '/images/clickhouse-vs-elastic-og.png' }]
        }
      }
    }
  }

export default function ElasticPage({
  footerData,
  headerData,
  seo
}: CommonProps) {
  useGalaxyOnPage('elasticComparisonPage')

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
            ClickHouse <span className='text-primary-300'>vs</span> Elastic
          </SuiTitle>
          <Image
            src={heroLogos}
            alt='ClickHouse vs Elastic'
            width={698 / 2}
            height={646 / 2}
            loading='eager'
            priority
            className='mx-auto lg:hidden'
          />
          <SuiText className='space-y-6 text-neutral-200'>
            <p>
              ClickStack is a high-performance, open-source observability stack
              built on ClickHouse. It delivers lightning-fast queries and
              powerful aggregations across high cardinality logs, metrics,
              traces, session replays at petabyte scale.
            </p>
            <p>
              Elastic, by contrast, is rooted in a full-text search engine,
              built on the belief that observability was just a search problem
              at a time when inverted indices were sufficient at smaller scales.
              Never designed for metrics, it cannot unify logs, metrics, and
              traces in a single system, leaving observability fragmented,
              costly, and slow.
            </p>
          </SuiText>
          <div className='flex flex-col gap-4 sm:mx-auto sm:max-w-[523px] sm:flex-row lg:mx-0'>
            <CUIButton
              href='https://console.clickhouse.cloud/signUp?loc=elastic-comparison-page-hero'
              type='primary'
              size='lg'
              weight='semibold'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Get started with Cloud
            </CUIButton>
            <CUIButton
              href='/company/contact?loc=elastic-comparison-page-hero'
              type='secondary'
              size='lg'
              weight='semibold'
              target='_blank'
              className='w-full sm:w-auto sm:flex-1 sm:!px-8'>
              Contact sales
            </CUIButton>
          </div>
          <SuiText>
            <p className='font-bold text-white'>Why ClickStack is better:</p>
          </SuiText>
          <div className='flex flex-col items-stretch gap-y-5 rounded-lg border border-neutral-700/80 bg-neutral-900/50 shadow-lg lg:flex-row lg:divide-x lg:divide-neutral-700/80'>
            {[
              {
                icon: iconHandCoins,
                stat: '4x',
                label: 'Reduction in costs'
              },
              {
                icon: iconGuage,
                stat: '10x',
                label: 'Faster analytical queries'
              },
              {
                icon: iconDatabase,
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
          <SuiText className='text-sm'>
            Read our comprehensive guide about{' '}
            <Link
              href={`https://clickhouse.com/docs/use-cases/observability/clickstack/migration/elastic?loc=elastic-comparison-page-hero`}
              target='_blank'
              prefetch={false}
              className='text-primary-300 hover:underline'>
              migrating from Elastic to ClickStack
            </Link>
            .
          </SuiText>
        </div>
        <Image
          src={heroLogos}
          alt='ClickHouse vs Elastic'
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
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-[70rem] bg-primary-300 lg:top-[47rem]' />
        <div className='section-container relative z-10 space-y-6'>
          <div className='mb-16 space-y-12 lg:mb-24'>
            <SuiTitle type='h2' className='text-center'>
              ClickStack compared to Elastic
            </SuiTitle>
            <ClickStackVersusElkStack />
            {/*<ClickHouseVersusElastic />*/}
          </div>

          {/* Testimonials */}
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <h2 className='mb-6 text-center font-basier text-2xl font-semibold lg:-mt-3'>
              Join others migrating to ClickStack from Elastic
            </h2>
            <div className='space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0'>
              <QuoteCard
                content='Extensive testing and comparison showed that ClickHouse outperformed other solutions like Elasticsearch in three key areas: performance, compatibility, and cost-efficiency for large-scale operations.'
                link='/videos/meetupsf_march_2025_04'
                logo={{
                  src: logoNetflix,
                  width: 111,
                  height: 30,
                  alt: 'Netflix'
                }}
              />
              <QuoteCard
                content='Elasticsearch was fast but prohibitively, laughably expensive. With ClickHouse, queries that once took seconds came back in milliseconds, logs were searchable within 20 seconds, and the system finally felt absurdly fast'
                link='/blog/seeing-the-big-picture-shopees-journey-to-distributed-tracing-with-clickhouse'
                logo={{
                  src: logoShopee,
                  width: 127,
                  height: 40,
                  alt: 'Shopee'
                }}
              />
              <QuoteCard
                content='ClickHouse logging cluster has now exceeded 400 physical nodes, with a peak writing traffic of over 40 GB/s. This supports approximately 15 million queries per day, with a peak QPS of about 200. Compared to Elasticsearch, the machine cost of ClickHouse has decreased by 30%. The query speed has improved by about 4 times compared to Elasticsearch'
                link='/blog/didi-migrates-from-elasticsearch-to-clickHouse-for-a-new-generation-log-storage-system'
                logo={{
                  src: logoDidi,
                  width: 80 * 1.2,
                  height: 25 * 1.2,
                  alt: 'Didi'
                }}
              />
              <QuoteCard
                content='In the past, we stored all of these logs on self-hosted Elasticsearch. Clickhouse emerged to be the best candidate for our use case, and we decided to move forward with it.'
                link='/videos/zomatos-logging-platform-journey'
                logo={{
                  src: logoZomato,
                  width: 190 * 0.7,
                  height: 40 * 0.7,
                  alt: 'Zomato'
                }}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {/* Pillar 1 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-200 shadow-lg lg:p-10'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconGuage} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Performance at Scale
                </SuiTitle>
              </div>
              <SuiText>
                Elastic slows under heavy ingest and high-cardinality queries,
                while ClickHouse powers sub-second analytics even at petabyte
                scale.
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
            <div className='relative flex flex-col gap-6 overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-200 shadow-lg lg:p-10'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconHandCoins} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Lower Cost, Higher Efficiency
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
            <div className='relative flex flex-col gap-6 overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-200 shadow-lg lg:p-10'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconLightning} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Unified Observability
                </SuiTitle>
              </div>
              <SuiText>
                ClickStack runs logs, metrics, and traces in one engine
                alongside business and application data for unrivalled
                correlation. Elastic was never designed for analytical workloads
                leaving data fragmented.
              </SuiText>
            </div>

            {/* Pillar 4 */}
            <div className='relative flex flex-col gap-6 overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-200 shadow-lg lg:p-10'>
              <div className='flex items-center gap-4 lg:gap-6'>
                <Image src={iconUnlock} alt='Icon' width={36} height={36} />
                <SuiTitle type='h3' className='text-white'>
                  Open source and open standards
                </SuiTitle>
              </div>
              <SuiText>
                ClickStack is fully open source (MIT + Apache 2.0) and
                OpenTelemetry-native, ensuring interoperability and freedom from
                lock-in.
              </SuiText>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed table */}
      <section className='py-16 lg:py-24'>
        <div className='section-container'>
          <div className='mx-auto mb-6 max-w-5xl space-y-6 text-center'>
            <SuiTitle type='h2'>
              Frustrated with slow queries, soaring disk usage at scale and
              costs and hours spent watching clusters rebalance?
            </SuiTitle>
            <SuiText className='mx-auto max-w-2xl text-lg text-neutral-200'>
              <strong className='text-white'>You’re not alone.</strong> Teams
              are moving to ClickStack for faster analytics, lower costs, and a
              unified engine for logs, metrics, and traces.
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
                title='Open and interoperable'
                text='Supports open standards like OpenTelemetry and integrates directly with systems and formats such as Postgres, Kafka, Parquet, and Iceberg.'
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
            Migrate your workload from Elastic today
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
              href='https://console.clickhouse.cloud/signUp?loc=elastic-comparison-page-get-started'>
              Create a free account
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='mx-auto w-full !border-neutral-800 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white sm:!px-10 md:w-auto'
              target='_blank'
              href='/company/contact?loc=elastic-comparison-page-get-started'>
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
            link: `/comparison/postgresql?loc=elastic-comparison-page`,
            logo: logoPostgress
          },
          {
            name: 'Redshift',
            link: `/comparison/redshift?loc=elastic-comparison-page`,
            logo: logoRedshift
          },
          {
            name: 'Snowflake',
            link: `/comparison/snowflake?loc=elastic-comparison-page`,
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
          src={elasticTableLogo}
          alt='Elastic'
          width={131}
          height={29}
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
          seoCaption='Feature comparison of ClickHouse and Elastic'
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
                  values: [row.clickhouse, row.elastic]
                }
              })
            })
            .flat(1)}
        />
      </div>
    </div>
  )
}

function ClickStackVersusElkStack() {
  const layerGap = 72
  const [userInteracting, setUserInteracting] = useState(false)
  const [activeLayer, setActiveLayer] = useState<null | number>(null)

  const activateLayer = useDebounce((layer: number | null) => {
    setUserInteracting(typeof layer === 'number')
    setActiveLayer(layer)
  }, 50)
  const resetActiveLayer = () => activateLayer(null)

  useEffect(() => {
    if (!userInteracting) {
      const interval = window.setInterval(() => {
        setActiveLayer((old) => {
          if (old === null) return 1
          const newValue = old + 1
          return newValue > 3 ? null : newValue
        })
      }, 1500)

      return () => window.clearInterval(interval)
    }
  }, [userInteracting])

  const noActiveLayer = activeLayer === null
  const layer1Active = noActiveLayer || activeLayer === 1
  const layer2Active = noActiveLayer || activeLayer === 2
  const layer3Active = noActiveLayer || activeLayer === 3
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-x-16 gap-y-8 lg:flex-row'>
        <ClickStack
          gap={layerGap}
          hyperdx={layer1Active}
          clickhouse={layer2Active}
          opentelemetry={layer3Active}
          onMouseEnter={(stack) => {
            switch (stack) {
              case 'hyperdx':
                activateLayer(1)
                break
              case 'clickhouse':
                activateLayer(2)
                break
              case 'opentelemetry':
                activateLayer(3)
                break
            }
          }}
          onMouseLeave={resetActiveLayer}
        />
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
              logo: { src: logoKibana },
              onMouseEnter: () => activateLayer(1),
              onMouseLeave: resetActiveLayer,
              active: layer1Active
            },
            {
              logo: { src: logoElasticsearch },
              onMouseEnter: () => activateLayer(2),
              onMouseLeave: resetActiveLayer,
              active: layer2Active
            },
            {
              logo: { src: logoLogstash },
              onMouseEnter: () => activateLayer(3),
              onMouseLeave: resetActiveLayer,
              active: layer3Active
            }
          ]}
        />
      </div>
    </>
  )
}

function ClickHouseVersusElastic() {
  function ClickHouseLogo({ className = '' }: { className?: string }) {
    return (
      <div
        className={`flex w-20 items-center justify-center rounded bg-primary shadow ${className}`}>
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
    )
  }

  function ElasticLogo({ className = '' }: { className?: string }) {
    return (
      <div
        className={`flex size-20 items-center justify-center rounded bg-white shadow ${className}`}>
        <Image
          src={elasticAnimationLogo}
          width={56}
          height={56}
          alt='Elastic'
        />
      </div>
    )
  }

  return (
    <ScaleToContainer scaleUp={false} className='mx-auto'>
      <div className='flex w-fit flex-col gap-x-16 gap-y-8 lg:flex-row lg:flex-nowrap lg:px-12'>
        <div className='grid grid-cols-2 grid-rows-3 gap-2.5'>
          <ClickHouseLogo className='row-span-full' />
          <ClickHouseLogo className='row-span-full' />
        </div>
        <Image
          src={iconVs}
          width={60}
          height={60}
          alt='VS'
          className='self-center rounded-full shadow-xl'
        />
        <div className='grid grid-cols-2 grid-rows-3 gap-2.5'>
          <ElasticLogo />
          <ElasticLogo />
          <ElasticLogo />
          <ElasticLogo />
          <ElasticLogo />
          <ElasticLogo />
        </div>
      </div>
    </ScaleToContainer>
  )
}
