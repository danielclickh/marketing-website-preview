import iconNvme from './assets/icon-nvme.svg'
import iconOpenSource from './assets/icon-open-source.svg'
import iconPlug from './assets/icon-plug.svg'
import iconPostgres from './assets/icon-postgres.svg'
import logoBeehiiv from './assets/logo-beehiiv.svg'
import logoBlacksmith from './assets/logo-blacksmith.svg'
import logoTrm from './assets/logo-trm.svg'
import postgresByClickhouse from './assets/postgres-by-clickhouse.svg'
import AccordionItem from '@/components-cleaned/AccordionItem'
import ClickhousePostgresNvmeDiagram, {
  ClickhousePostgresNvmeDiagramProps
} from '@/components-cleaned/ClickhousePostgresNvmeDiagram'
import TickItem from '@/components-cleaned/TickItem'
import { CUICard } from '@/components/ClickUI'
import DotsContainer from '@/components/DotsContainer'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard, { QuoteCardProps } from '@/components/QuoteCard'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        ...commonProps,
        seo: {
          title: 'Postgres by ClickHouse',
          description:
            "World's fastest and most scalable Postgres, deeply integrated with ClickHouse. Enterprise-grade OLTP meets real-time analytics.",
          path: '/cloud/postgres'
        }
      }
    }
  }

export default function Page({ headerData, seo }: CommonProps) {
  useGalaxyOnPage('postgresByClickhousePage')

  const [accordionNvmesOpen, setAccordionNvmesOpen] = useState(true)
  const [accordionStackOpen, setAccordionStackOpen] = useState(false)
  const [accordionQueriesOpen, setAccordionQueriesOpen] = useState(false)
  const [activeDiagramParts, setActiveDiagramParts] =
    useState<ClickhousePostgresNvmeDiagramProps['activeParts']>(undefined)
  return (
    <Layout headerData={headerData} seo={seo}>
      {/* Hero */}
      <section
        className='section-container bg-shadow-element yellow-shadow my-16 lg:my-24 lg:gap-x-24'
        style={
          {
            '--top-side': '130%',
            '--left-side': '80%'
          } as React.CSSProperties
        }>
        <div className='flex flex-col items-center justify-between gap-10 lg:flex-row'>
          <div className='w-full flex-1 space-y-6 lg:max-w-2xl lg:pr-8'>
            <h1>
              <span className='sr-only'>Postgres by ClickHouse</span>
              <Image
                src={postgresByClickhouse}
                width={573}
                height={232}
                alt=''
                priority
              />
            </h1>
            <SuiText size='lg' className='mt-8 space-y-6 text-neutral-200'>
              <p>
                World's fastest and most scalable Postgres, deeply integrated
                with ClickHouse. Enterprise-grade OLTP meets real-time
                analytics.
              </p>
              <p>Powers a unified data stack for real-time AI applications.</p>
              <p>Join the waitlist today!</p>
            </SuiText>
          </div>
          <div className='w-full lg:max-w-lg'>
            <CUICard>
              <CUICard.Body className='p-6'>
                <Form />
              </CUICard.Body>
            </CUICard>
          </div>
        </div>
      </section>

      {/* Why Postgres by Clickhouse */}
      <section className='bg-black/20 py-16 lg:py-24'>
        <div className='section-container'>
          <SuiTitle type='h2' className='mb-16 text-center'>
            Why Postgres by ClickHouse?
          </SuiTitle>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {[
              {
                icon: iconNvme,
                title: 'NVMe performance',
                description:
                  'Enterprise-grade Postgres on [local NVMe storage](https://www.ubicloud.com/blog/postgresql-performance-local-vs-network-attached-storage). Microsecond latency, practically unlimited IOPS, consistent performance without network jitter.',
                bullets: [
                  'Ultra-low latency: μs vs ms',
                  'No EBS throttling or limits',
                  'Validated by [Datadog](https://postgresql.us/events/pgconfus2025/sessions/session/2064/slides/204/), [Instacart](https://www.instacart.com/company/tech-innovation/how-instacart-built-a-modern-search-infrastructure-on-postgres)',
                  'Full PITR & backups included'
                ]
              },
              {
                icon: iconPlug,
                title: 'ClickHouse integration',
                description:
                  'Postgres meets ClickHouse, real-time analytics at 100× speed. Unify transactional and analytical workloads.',
                bullets: [
                  '[Native CDC](https://clickhouse.com/docs/integrations/clickpipes/postgres): sync Postgres data to ClickHouse, in a few clicks.',
                  'Blazing fast replication with seconds latency',
                  '[pg_clickhouse](https://github.com/ClickHouse/pg_clickhouse): unified query layer to build apps.',
                  'Comprehensive query pushdown'
                ]
              },
              {
                icon: iconPostgres,
                title: 'Enterprise grade Postgres',
                description:
                  'Postgres built for mission-critical workloads. No compromises on availability, reliability, or security.',
                bullets: [
                  'High availability with up to 2 standbys',
                  'Automatic backups with WAL archival to S3',
                  'End-to-end encryption and private networking',
                  'Backed by ClickHouse Cloud Trust'
                ]
              },
              {
                icon: iconOpenSource,
                title: 'Open-source first',
                description:
                  'Built on open-source principles. Every component is open-source, no vendor lock-in, full control of your data stack.',
                bullets: [
                  '[Postgres](https://github.com/postgres/postgres) for transactions',
                  '[ClickHouse](https://github.com/ClickHouse/ClickHouse) for analytics',
                  '[PeerDB](https://github.com/PeerDB-io/peerdb) for CDC',
                  '[pg_clickhouse](https://github.com/ClickHouse/pg_clickhouse) for unified query layer',
                  'Postgres powered by [Ubicloud](https://github.com/ubicloud/ubicloud)'
                ]
              }
            ].map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className='relative z-10 flex flex-col gap-6 rounded-lg border border-neutral-700 bg-neutral-800/80 p-6 text-neutral-200 shadow'>
                  <Image
                    src={item.icon}
                    width={64}
                    height={64}
                    alt={item.title}
                  />
                  <SuiTitle type='h3' className='text-white'>
                    {item.title}
                  </SuiTitle>
                  <Markdown
                    allowDirectives={false}
                    allowHeaderLink={false}
                    className='rich-text-content space-y-6'>
                    {item.description}
                  </Markdown>
                  <ul className='space-y-4'>
                    {item.bullets.map((bullet, bulletIndex) => {
                      return (
                        <li key={bulletIndex}>
                          <TickItem>
                            <Markdown
                              allowDirectives={false}
                              allowHeaderLink={false}
                              className='rich-text-content space-y-6'>
                              {bullet}
                            </Markdown>
                          </TickItem>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='relative bg-black/20 pb-16 lg:pb-24'>
        {/* Yellow orb */}
        <div
          className='bg-shadow-element yellow-shadow absolute inset-0'
          style={
            {
              '--top-side': '-10%',
              '--right-side': '50%',
              '--left-side': '50%',
              '--scale': '0.8',
              '--opacity': '0.04'
            } as React.CSSProperties
          }
        />
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-1/4 bg-primary-300 lg:top-1/3' />
        <div className='section-container'>
          <div className='relative gap-6 overflow-hidden rounded-lg bg-neutral-725 p-6 text-neutral-0 shadow-lg'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />

            <h2 className='text-center font-basier text-2xl font-semibold'>
              Trusted by
            </h2>

            <div className='hide-scrollbar -mx-6 mt-6 overflow-x-auto lg:mx-0 lg:overflow-x-visible'>
              <div className='flex flex-row before:block before:w-3 before:flex-shrink-0 after:block after:w-3 after:flex-shrink-0 lg:flex-wrap lg:justify-center lg:before:hidden lg:after:hidden'>
                {(
                  [
                    {
                      content: `We’re excited to see ClickHouse entering the Postgres ecosystem. At Beehiiv, we rely heavily on both Postgres and ClickHouse to power our mission-critical, real-time, customer-facing applications. 

We’ve invested significant effort integrating these technologies, so a tighter, more native integration between them would materially simplify our architecture.`,
                      logo: {
                        src: logoBeehiiv,
                        alt: 'Beehiiv',
                        width: 159,
                        height: 40
                      }
                    },
                    {
                      content: `We’re excited that ClickHouse is offering a native Postgres service to complement its core OLAP database. NVMe-backed Postgres performance, combined with seamless integration with CDC and pg_clickhouse for fast analytics, makes it very compelling for us to build our fast-growing applications.`,
                      logo: {
                        src: logoBlacksmith,
                        alt: 'Blacksmith',
                        width: 241,
                        height: 24
                      }
                    },
                    {
                      content: `We’re excited by the vision of a unified database stack that brings together transactional and analytical workloads without the traditional complexity. Using Postgres for transactions and ClickHouse for analytics delivers best-in-class performance while significantly reducing operational overhead. That combination enables teams to focus less on infrastructure and more on shipping innovative, AI-driven product features for their customers. Early signs are very encouraging, and we look forward to continuing our collaboration as the integration continues to evolve.`,
                      logo: {
                        src: logoTrm,
                        alt: 'TRM Labs',
                        width: 97,
                        height: 31
                      }
                    }
                  ] satisfies Array<QuoteCardProps>
                ).map((quote, quoteIndex) => {
                  return (
                    <div
                      key={quoteIndex}
                      className='lg:min-w-none w-[80vw] min-w-64 max-w-md flex-shrink-0 flex-grow-0 px-2 lg:w-1/3 lg:max-w-none lg:flex-1 lg:px-3'>
                      <QuoteCard {...quote} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className='section-container relative my-16 lg:my-24'>
        {/* Yellow orb */}
        <div
          className='bg-shadow-element yellow-shadow absolute inset-0'
          style={
            {
              '--top-side': '50%',
              '--right-side': '50%',
              '--left-side': '50%',
              '--scale': '0.8',
              '--opacity': '0.04'
            } as React.CSSProperties
          }
        />
        <SuiTitle type='h2' className='text-center'>
          <TiltedText type='black-on-yellow' className='px-2'>
            Unified
          </TiltedText>{' '}
          transactional and analytics stack
        </SuiTitle>
        <SuiText size='lg' className='mb-16 mt-6 text-center opacity-70'>
          <p>
            Keep your Postgres workflow. Add ClickHouse performance.
            <br />
            One unified interface for both transactional and analytical queries.
          </p>
        </SuiText>

        {/* Diagram */}
        <div className='mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-8 lg:flex-row-reverse lg:items-start lg:gap-20'>
          <div className='px-4'>
            <ClickhousePostgresNvmeDiagram
              activeParts={activeDiagramParts}
              className='h-auto w-full max-w-full'
            />
          </div>
          <div className='flex w-full flex-1 flex-col items-center gap-6 lg:max-w-md lg:items-start'>
            <AccordionItem
              handle={<SuiTitle type='h3'>NVMe Postgres</SuiTitle>}
              onToggle={(isOpen) => {
                setAccordionNvmesOpen(isOpen)
                if (isOpen) {
                  setActiveDiagramParts([
                    'your-application',
                    'postgres-database',
                    'nvmes'
                  ])
                  setAccordionStackOpen(false)
                  setAccordionQueriesOpen(false)
                } else {
                  setActiveDiagramParts(undefined)
                }
              }}
              open={accordionNvmesOpen}
              className='w-full !border-white/10 !bg-white/5 hover:!border-white/20'>
              <SuiText className='space-y-4'>
                <p>
                  NVMe-powered Postgres delivers 2-10x faster performance,
                  eliminating storage bottlenecks with microsecond latency and
                  unlimited IOPS for your transactional workloads.
                </p>
                <p>
                  Traditional SSDs bottleneck at 100K IOPS. NVMe delivers
                  millions. Your Postgres queries that took seconds now complete
                  in milliseconds.
                </p>
                <p>
                  Connection pooling, vacuum operations, and high-concurrency
                  workloads all benefit from direct PCIe-attached storage.
                </p>
              </SuiText>
            </AccordionItem>
            <AccordionItem
              handle={<SuiTitle type='h3'>Unified data stack</SuiTitle>}
              onToggle={(isOpen) => {
                setAccordionStackOpen(isOpen)
                if (isOpen) {
                  setActiveDiagramParts([
                    'your-application',
                    'postgres-database',
                    'pg_clickhouse',
                    'clickhouse-database'
                  ])
                  setAccordionNvmesOpen(false)
                  setAccordionQueriesOpen(false)
                } else {
                  setActiveDiagramParts(undefined)
                }
              }}
              open={accordionStackOpen}
              className='w-full !border-white/10 !bg-white/5 hover:!border-white/20'>
              <SuiText className='space-y-4'>
                <p>
                  pg_clickhouse FDW creates a unified query interface — enabling
                  transparent query routing between Postgres and ClickHouse
                  through a single connection.
                </p>
                <p>
                  TYour application connects to Postgres as usual. The FDW
                  automatically routes analytical queries to ClickHouse, handles
                  JOINs across both systems, and pushes down aggregations for
                  optimal performance.
                </p>
                <p>One interface, two specialized engines.</p>
              </SuiText>
            </AccordionItem>
            <AccordionItem
              handle={<SuiTitle type='h3'>Sub-second queries</SuiTitle>}
              onToggle={(isOpen) => {
                setAccordionQueriesOpen(isOpen)
                if (isOpen) {
                  setActiveDiagramParts([
                    'postgres-database',
                    'clickpipes-cdc',
                    'clickhouse-database'
                  ])
                  setAccordionNvmesOpen(false)
                  setAccordionStackOpen(false)
                } else {
                  setActiveDiagramParts(undefined)
                }
              }}
              open={accordionQueriesOpen}
              className='w-full !border-white/10 !bg-white/5 hover:!border-white/20'>
              <SuiText className='space-y-4'>
                <p>
                  ClickPipes CDC enables sub-second replication — streaming
                  changes from Postgres to ClickHouse with zero impact on your
                  primary database.
                </p>
                <p>
                  Built on Postgres Logical Replication v2, ClickPipes captures
                  every INSERT, UPDATE, and DELETE in real-time. Your analytics
                  in ClickHouse stay fresh without polling, batch jobs, or ETL
                  pipelines.
                </p>
                <p>Sub-second latency.</p>
              </SuiText>
            </AccordionItem>
          </div>
        </div>
      </section>

      <HRSeparator />

      {/* Everything you need */}
      <section className='section-container my-16 lg:my-24'>
        <SuiTitle type='h2' className='mb-16 text-center'>
          Everything you need, from day one
        </SuiTitle>
        <div className='mx-auto grid max-w-max grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:max-w-2xl lg:max-w-5xl lg:grid-cols-3'>
          <div>
            <SuiTitle type='h3'>Enterprise Postgres</SuiTitle>
            <ul className='mt-4 space-y-4 text-neutral-200 lg:mt-8'>
              <li>
                <TickItem>Point in time recovery (PITR)</TickItem>
              </li>
              <li>
                <TickItem>Automated backups</TickItem>
              </li>
              <li>
                <TickItem>Read replicas with faster failover</TickItem>
              </li>
              <li>
                <TickItem>Connection pooling</TickItem>
              </li>
              <li>
                <TickItem>Major version upgrades</TickItem>
              </li>
            </ul>
          </div>
          <div>
            <SuiTitle type='h3'>ClickHouse Integration</SuiTitle>
            <ul className='mt-4 space-y-4 text-neutral-200 lg:mt-8'>
              <li>
                <TickItem>pg_clickhouse extension</TickItem>
              </li>
              <li>
                <TickItem>CDC via ClickPipes</TickItem>
              </li>
              <li>
                <TickItem>Query pushdown (JOINs, AGGs)</TickItem>
              </li>
              <li>
                <TickItem className='text-neutral-600'>
                  Logical Replication v2
                  <span className='ml-2 inline-block rounded-full border border-green-800 bg-green-900 px-2 py-1 text-xs leading-none text-green-50'>
                    Soon
                  </span>
                </TickItem>
              </li>
              <li>
                <TickItem className='text-neutral-600'>
                  Custom output plugin
                  <span className='ml-2 inline-block rounded-full border border-green-800 bg-green-900 px-2 py-1 text-xs leading-none text-green-50'>
                    Soon
                  </span>
                </TickItem>
              </li>
            </ul>
          </div>
          <div>
            <SuiTitle type='h3'>Developer experience</SuiTitle>
            <ul className='mt-4 space-y-4 text-neutral-200 lg:mt-8'>
              <li>
                <TickItem>One click-provisioning</TickItem>
              </li>
              <li>
                <TickItem>ClickHouse Cloud console</TickItem>
              </li>
              <li>
                <TickItem>Metrics and monitoring</TickItem>
              </li>
              <li>
                <TickItem className='text-neutral-600'>
                  API & Terraform support
                  <span className='ml-2 inline-block rounded-full border border-green-800 bg-green-900 px-2 py-1 text-xs leading-none text-green-50'>
                    Soon
                  </span>
                </TickItem>
              </li>
              <li>
                <TickItem>SOC 2 Type II certified</TickItem>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer form */}
      <DotsContainer>
        <div className='mx-auto w-full lg:max-w-xl'>
          <CUICard className='bg-neutral-900/80'>
            <div className='mb-4 mt-6 space-y-4 px-4 text-center lg:mb-4 lg:mt-8'>
              <SuiTitle type='h2'>
                Ready to try the
                <br />{' '}
                <TiltedText type='black-on-yellow' className='px-2'>
                  fastest
                </TiltedText>{' '}
                Postgres?
              </SuiTitle>
              <SuiText className='mx-auto max-w-xl opacity-70 sm:px-10'>
                Join our private preview. Get early access to Postgres by
                ClickHouse and help shape the future of unified data.
              </SuiText>
            </div>
            <CUICard.Body className='p-4 lg:p-6'>
              <Form />
            </CUICard.Body>
          </CUICard>
        </div>
      </DotsContainer>
    </Layout>
  )
}

function Form() {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      {!formSuccess && (
        <MarketoForm
          formId={'1517'}
          clearbitTracking={true}
          onLoad={() => {
            setFormLoaded(true)
          }}
          onSuccess={() => {
            setFormSuccess(true)
            // Delay needed to allow the ref to update before scrolling
            setTimeout(() => {
              formSuccessRef.current?.scrollIntoView()
            }, 10)

            return false // Stops page from reloading
          }}
        />
      )}

      {!formLoaded && <div className='text-center'>Loading form...</div>}

      {formSuccess && (
        <div
          ref={formSuccessRef}
          className='flex flex-col items-center py-10 lg:py-20'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='52'
            height='52'
            fill='none'
            viewBox='0 0 52 52'>
            <path
              stroke='#CCFFD0'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='3'
              d='M26 50v0A24 24 0 0 1 2 26v0A24 24 0 0 1 26 2v0a24 24 0 0 1 24 24v0a24 24 0 0 1-24 24Z'
              clipRule='evenodd'
            />
            <path
              stroke='#CCFFD0'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='3'
              d='M36.7 20.7 23.3 34l-8-8'
            />
          </svg>
          <h3 className='mb-4 mt-8 text-center text-2xl font-bold'>
            You’ve been added to the waitlist!
          </h3>
          <p className='mt-2 text-center text-neutral-200'>
            Thank you for your interest in Postgres by ClickHouse
            <br />
            <br />
            We’ll be in touch soon.
          </p>
        </div>
      )}
    </>
  )
}
