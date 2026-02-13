import heroPostgresLogo from './assets/hero-postgres-logo.svg'
import iconFeatures from './assets/icon-features.svg'
import iconNvme from './assets/icon-nvme.svg'
import iconOpenSource from './assets/icon-open-source.svg'
import iconPlug from './assets/icon-plug.svg'
import iconPostgres from './assets/icon-postgres.svg'
import logoBeehiiv from './assets/logo-beehiiv.svg'
import logoBlacksmith from './assets/logo-blacksmith.svg'
import logoTrm from './assets/logo-trm.svg'
import postgresByClickhouse from './assets/postgres-by-clickhouse.svg'
import styles from './styles.module.scss'
import AccordionItem from '@/components-cleaned/AccordionItem'
import PostgresByClickhouseDiagram, {
  PostgresByClickhouseDiagramProps
} from '@/components-cleaned/PostgresByClickhouseDiagram'
import TickItem from '@/components-cleaned/TickItem'
import { CUICard } from '@/components/ClickUI'
import DotsContainer from '@/components/DotsContainer'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard, { QuoteCardProps } from '@/components/QuoteCard'
import ScaleToContainer from '@/components/ScaleToContainer'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { blogService } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getRelativeDateStatus } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { Icon, Separator, Spacer } from '@clickhouse/click-ui'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

interface StaticProps extends CommonProps {
  postgresBlogs: Array<{
    title: string
    slug: string
  }>
}

export const getStaticProps: GetStaticProps<StaticProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    const postgresBlogs = await blogService.findMany({
      filters: {
        tags: {
          slug: {
            $eq: 'postgres-weekly'
          }
        }
      },
      sortBy: 'publishedAt:desc',
      pagination: { limit: 5 },
      fields: ['title', 'slug'],
      populate: {
        tags: { fields: ['slug'] }
      }
    })

    return {
      props: {
        ...commonProps,
        seo: {
          title:
            'Postgres managed by ClickHouse | One stack for transactions and analytics',
          description:
            'Postgres managed by ClickHouse is now in private preview, a native Postgres service integrated with ClickHouse. Build on a Unified Data Stack with Postgres for transactions and ClickHouse for analytics, with no operational overhead.',
          path: '/cloud/postgres'
        },
        postgresBlogs
      }
    }
  }

// Constants
const POSTGRES_WEEK_TOTAL_DAYS = 5

export default function Page({ headerData, seo, postgresBlogs }: StaticProps) {
  useGalaxyOnPage('postgresByClickhousePage')

  const [accordionNvmesOpen, setAccordionNvmesOpen] = useState(true)
  const [accordionStackOpen, setAccordionStackOpen] = useState(false)
  const [accordionQueriesOpen, setAccordionQueriesOpen] = useState(false)
  const [activeDiagramParts, setActiveDiagramParts] = useState<
    PostgresByClickhouseDiagramProps['activeParts']
  >(['your-application', 'postgres-database', 'nvmes'])

  // Get today's date normalized to midnight for date comparisons
  const today = new Date()
  today.setHours(0, 0, 0, 0)

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
            <ScaleToContainer scaleUp={false}>
              <div className='flex w-max items-center gap-4'>
                <div className='relative flex aspect-square size-48 flex-shrink-0 flex-grow-0'>
                  <span className='absolute inset-0 block rounded-full bg-primary-300/15 blur-xl' />
                  <span
                    className={`absolute inset-0 block rounded-full border border-primary-600/80 [animation-delay:400ms] ${styles.pulseRing}`}
                  />
                  <span
                    className={`absolute inset-2.5 block rounded-full border border-primary-500/80 [animation-delay:200ms] ${styles.pulseRing}`}
                  />
                  <span
                    className={`absolute inset-5 block rounded-full border border-primary-400/80 ${styles.pulseRing}`}
                  />
                  <Image
                    src={heroPostgresLogo}
                    width={102}
                    height={106}
                    alt=''
                    priority
                    className='relative z-10 m-auto translate-y-1'
                  />
                </div>
                <h1 className='flex-shrink-0 flex-grow-0'>
                  <span className='sr-only'>
                    Postgres managed by ClickHouse
                  </span>
                  <Image
                    src={postgresByClickhouse}
                    width={438}
                    height={162}
                    alt=''
                    priority
                    className='transform-none'
                  />
                </h1>
              </div>
            </ScaleToContainer>
            <SuiText className='!mt-12 space-y-6 text-xl text-neutral-200'>
              <p>
                Fast, scalable, enterprise-grade Postgres, natively integrated
                with&nbsp;ClickHouse.
              </p>
              <p>Built for real-time and AI-driven applications.</p>
              <p>
                A Unified Data Stack that combines Postgres for transactions and
                ClickHouse for analytics, with no added complexity!{' '}
                <Link
                  href='/blog/postgres-managed-by-clickhouse?loc=hero'
                  className='text-primary-300 hover:underline'>
                  Learn more
                </Link>
              </p>
              <p>Currently in private preview. Join the waitlist!</p>
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

      {/* Postgres Week */}
      <section className='relative bg-neutral-750 py-16'>
        <div className='section-container'>
          <div className='mx-auto flex max-w-3xl flex-col gap-6'>
            <div className='mx-auto flex w-fit items-center justify-center gap-2 rounded-[2.5rem] border border-primary-600 bg-[linear-gradient(180deg,rgba(250,255,105,0.16)_3.75%,rgba(150,153,63,0.16)_100%)] px-4 py-2'>
              <SuiText
                size='base'
                weight='semibold'
                color='white'
                className='text-center font-inter leading-[150%]'>
                Feb 13-20, 2026
              </SuiText>
            </div>
            <SuiTitle type='h2' className='text-center'>
              Postgres Week
            </SuiTitle>
            <SuiText
              size='lg'
              className='mx-auto space-y-4 text-center opacity-70'>
              Five days, five deep dives
            </SuiText>
          </div>
          <Spacer size='xxl' />
          <div className='scrollbar-hide-inline flex items-stretch gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {Array.from({ length: POSTGRES_WEEK_TOTAL_DAYS }).map(
              (_, index) => {
                // Calculate the date for this card
                const cardDate = new Date(today)

                if (index !== 0) {
                  // DAY 2+: Start from next Tuesday and continue daily
                  // Calculate days until next Tuesday (day 2 = Tuesday)
                  const currentDay = today.getDay() // 0=Sunday, 1=Monday, 2=Tuesday, etc.
                  const daysUntilTuesday =
                    currentDay <= 2
                      ? 2 - currentDay // If today is Sun/Mon/Tue, days until Tuesday
                      : 9 - currentDay // If after Tuesday, days until next Tuesday

                  // Set to next Tuesday, then add additional days for DAY 3, 4, 5
                  cardDate.setDate(
                    today.getDate() + daysUntilTuesday + (index - 1)
                  )
                }

                cardDate.setHours(0, 0, 0, 0)

                // Get blog data and format date
                const blog = postgresBlogs?.[index]
                const dateString = cardDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })

                // Content unlocks as soon as blog is available
                const isContentUnlocked = !!blog?.title

                // Get status text and blog URL
                const statusText = getRelativeDateStatus(cardDate)
                const blogUrl = blog?.slug
                  ? `/blog/${blog.slug}?loc=postgresWeek${index + 1}`
                  : '#'

                // Card styling
                const cardClassName = `flex h-auto w-64 flex-col justify-start p-6 text-neutral-200 ${
                  isContentUnlocked
                    ? 'cursor-pointer hover:border-primary-300 hover:bg-[#323232] focus:border-primary-300'
                    : 'cursor-not-allowed hover:shadow-card'
                }`

                return (
                  <CUICard
                    hFull={false}
                    key={`postgres-week-blog-${index}`}
                    onClick={
                      isContentUnlocked
                        ? () => window.open(blogUrl, '_blank')
                        : undefined
                    }
                    className={cardClassName}>
                    <CUICard.Header>
                      <SuiText
                        size='base'
                        color='white'
                        weight='bold'
                        className='!font-bold'>
                        DAY {index + 1}
                      </SuiText>
                      <SuiText
                        size='base'
                        color='text-accent'
                        weight='medium'
                        className='font-mono'>
                        {dateString}
                      </SuiText>
                    </CUICard.Header>
                    <Spacer size='md' />
                    <CUICard.Body className='h-full'>
                      <SuiTitle
                        type='h3'
                        color='white'
                        className={isContentUnlocked ? '' : 'blur-[5px]'}>
                        {isContentUnlocked
                          ? blog.title
                          : `New blog post will be revealed on ${dateString}!`}
                      </SuiTitle>
                    </CUICard.Body>
                    <div className='flex w-full flex-col'>
                      <Separator size='lg' />
                      <CUICard.Footer>
                        {isContentUnlocked ? (
                          <LinkWithArrow
                            href={blogUrl}
                            target='_blank'
                            onClick={(e) => e.stopPropagation()}
                            className='text-base font-medium text-primary-300 hover:underline'>
                            Read blog
                          </LinkWithArrow>
                        ) : (
                          <SuiText className='flex items-center gap-2'>
                            <Icon name='clock' />
                            {statusText}
                          </SuiText>
                        )}
                      </CUICard.Footer>
                    </div>
                  </CUICard>
                )
              }
            )}
          </div>
        </div>
        <Spacer size='lg' />
      </section>

      {/* Why Postgres managed by ClickHouse */}
      <section className='bg-black/20 py-16 lg:py-24'>
        <div className='section-container'>
          <SuiTitle type='h2' className='mb-16 text-center'>
            Why Postgres managed by ClickHouse?
          </SuiTitle>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            {[
              {
                icon: iconNvme,
                title: 'NVMe performance',
                description:
                  'Enterprise-grade Postgres on [local NVMe storage](https://www.ubicloud.com/blog/postgresql-performance-local-vs-network-attached-storage). Microsecond latency, practically unlimited IOPS, consistent performance without network jitter.',
                bullets: [
                  'Up to 10× faster performance for I/O-heavy workloads',
                  'Ultra-low disk latency: μs vs ms',
                  'No EBS throttling or limits',
                  'Architecture validated by [Datadog](https://postgresql.us/events/pgconfus2025/sessions/session/2064/slides/204/), [Instacart](https://www.instacart.com/company/tech-innovation/how-instacart-built-a-modern-search-infrastructure-on-postgres)'
                ]
              },
              {
                icon: iconPlug,
                title: 'ClickHouse integration',
                description:
                  'Postgres meets ClickHouse, 100x faster real-time analytics. Unify transactional and analytical workloads.',
                bullets: [
                  '[Native CDC](https://clickhouse.com/docs/integrations/clickpipes/postgres): sync Postgres data to ClickHouse, in a few clicks.',
                  'Blazing fast replication with seconds latency',
                  '[pg_clickhouse](https://github.com/ClickHouse/pg_clickhouse): unified query layer to build apps powering transactions and analytics.',
                  'Comprehensive query pushdown with pg_clickhouse - JOINs, aggregations and more.'
                ]
              },
              {
                icon: iconPostgres,
                title: 'Enterprise grade Postgres built with Ubicloud',
                description:
                  'Postgres built for mission-critical workloads. No compromises on availability, reliability, security or standard managed service features. Built along with seasoned Postgres experts at Ubicloud.',
                bullets: [
                  'High availability with up to 2 standbys',
                  'Automatic backups with WAL archival to S3',
                  'Forks & Point-In-Time-Recovery (PITR)',
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
                  'Postgres managed service powered by [Ubicloud](https://github.com/ubicloud/ubicloud)'
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
                          <TickItem size='sm'>
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
          <p className='-mb-8 mt-8 text-center text-lg text-neutral-200 lg:mt-16'>
            To learn more,{' '}
            <LinkWithArrow
              href='/blog/postgres-managed-by-clickhouse?loc=whyClickhouse'
              className='text-primary-300 hover:underline'>
              read our blog
            </LinkWithArrow>
          </p>
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

            <div className='hide-scrollbar -mx-6 mb-1 mt-2 overflow-x-auto lg:mx-0 lg:overflow-x-visible'>
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
                      content: `Using Postgres for transactions and ClickHouse for analytics delivers best-in-class performance while significantly reducing operational overhead. That combination enables teams to focus less on infrastructure and more on shipping innovative, AI-driven product features.`,
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
          data stack
        </SuiTitle>
        <SuiText
          size='lg'
          className='mx-auto mb-16 mt-6 max-w-3xl space-y-4 text-center opacity-70'>
          <p>
            Combine Postgres for transactions with ClickHouse for analytics to
            deliver best-in-class performance and scalability with minimal
            operational overhead.
          </p>
          <p>
            Architectural pattern followed by thousands of companies like
            GitLab, Cloudflare, Instacart, and LangChain.
          </p>
        </SuiText>

        {/* Diagram */}
        <div className='mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 lg:flex-row-reverse lg:items-start lg:gap-10 lg:px-9'>
          <div>
            <PostgresByClickhouseDiagram
              activeParts={activeDiagramParts}
              className='h-auto w-full max-w-full'
            />
          </div>
          <div className='flex w-full flex-1 flex-col items-center gap-6 lg:max-w-md lg:items-start'>
            <AccordionItem
              handle={
                <SuiTitle type='h3'>NVMe-backed Postgres for OLTP</SuiTitle>
              }
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
                  Unlock up to 10× faster Postgres performance with NVMe storage
                  built for I/O-intensive workloads. Microsecond-level latency
                  and millions of IOPS eliminate disk bottlenecks for
                  high-throughput transactional applications.
                </p>
                <p>
                  Unlike traditional SSDs that cap out at a few hundred thousand
                  IOPS, NVMe scales effortlessly, delivering lower tail
                  latencies and faster system operations like VACUUM,
                  checkpoints, and logical replication.
                </p>
                <p>
                  High availability is built in by design, with up to two
                  dedicated standby instances reserved exclusively for HA. Read
                  replicas are offered separately to preserve reliability.
                  Automatic backups and point-in-time recovery (PITR) with WAL
                  archiving ensure robust disaster recovery.
                </p>
              </SuiText>
            </AccordionItem>
            <AccordionItem
              handle={<SuiTitle type='h3'>Blazing-fast replication</SuiTitle>}
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
                  Replicate Postgres data to ClickHouse in real time to unlock
                  up to 100× faster analytics. With replication latency as low
                  as a few seconds, your data is analytics-ready almost
                  immediately.
                </p>
                <p>
                  The pipeline supports both initial snapshots for existing
                  datasets and CDC-based incremental updates. It’s powered by
                  the ClickPipes Postgres CDC connector, proven in production by
                  hundreds of enterprises moving hundreds of terabytes per
                  month.
                </p>
                <p>
                  Coming next: more native CDC capabilities, including
                  sub-second replication latency, reliable slot flushing through
                  ongoing transaction replication, and other enhancements,
                  exclusive to Postgres managed by ClickHouse.
                </p>
              </SuiText>
            </AccordionItem>
            <AccordionItem
              handle={<SuiTitle type='h3'>Unified query layer</SuiTitle>}
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
                  Query ClickHouse directly from Postgres using the
                  pg_clickhouse extension. No proxies, no new query layer to
                  manage. Postgres becomes a single interface for both
                  transactions and analytics.
                </p>
                <p>
                  Queries are transparently pushed down to ClickHouse for
                  maximum performance, supporting joins, filters, aggregations,
                  and functions. Today, 14 of 22 TPC-H queries are fully pushed
                  down, delivering 60×+ speedups.
                </p>
                <p>
                  Pushdown support continues to expand to CTEs, window
                  functions, and more, enabling fast analytics from the Postgres
                  layer while ClickHouse handles execution behind the scenes.
                </p>
              </SuiText>
            </AccordionItem>
          </div>
        </div>
      </section>

      <HRSeparator />

      {/* Everything you need */}
      <section className='section-container my-16 lg:my-24'>
        <Image
          src={iconFeatures}
          width={80}
          height={80}
          alt=''
          className='mx-auto'
        />
        <SuiTitle type='h2' className='my-16 text-center'>
          Everything you need, from day one
        </SuiTitle>
        <div className='mx-auto grid max-w-max grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:max-w-2xl lg:max-w-5xl lg:grid-cols-3'>
          <div>
            <SuiTitle type='h3'>Enterprise Postgres</SuiTitle>
            <ul className='mt-4 space-y-4 text-neutral-200 lg:mt-8'>
              <li>
                <TickItem size='sm'>Point in time recovery (PITR)</TickItem>
              </li>
              <li>
                <TickItem size='sm'>Automated backups</TickItem>
              </li>
              <li>
                <TickItem size='sm'>
                  Read replicas with faster failover
                </TickItem>
              </li>
              <li>
                <TickItem size='sm'>Connection pooling</TickItem>
              </li>
              <li>
                <TickItem size='sm'>Major version upgrades</TickItem>
              </li>
            </ul>
          </div>
          <div>
            <SuiTitle type='h3'>ClickHouse Integration</SuiTitle>
            <ul className='mt-4 space-y-4 text-neutral-200 lg:mt-8'>
              <li>
                <TickItem size='sm'>pg_clickhouse extension</TickItem>
              </li>
              <li>
                <TickItem size='sm'>CDC via ClickPipes</TickItem>
              </li>
              <li>
                <TickItem size='sm'>Query pushdown (JOINs, AGGs)</TickItem>
              </li>
              <li>
                <TickItem size='sm' className='text-neutral-600'>
                  Logical Replication v2
                  <span className='ml-2 inline-block rounded-full border border-green-800 bg-green-900 px-2 py-1 text-xs leading-none text-green-50'>
                    Soon
                  </span>
                </TickItem>
              </li>
              <li>
                <TickItem size='sm' className='text-neutral-600'>
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
                <TickItem size='sm'>One click-provisioning</TickItem>
              </li>
              <li>
                <TickItem size='sm'>ClickHouse Cloud console</TickItem>
              </li>
              <li>
                <TickItem size='sm'>Metrics and monitoring</TickItem>
              </li>
              <li>
                <TickItem size='sm' className='text-neutral-600'>
                  API & Terraform support
                  <span className='ml-2 inline-block rounded-full border border-green-800 bg-green-900 px-2 py-1 text-xs leading-none text-green-50'>
                    Soon
                  </span>
                </TickItem>
              </li>
              <li>
                <TickItem size='sm' className='text-neutral-600'>
                  Query Performance Insights
                  <span className='ml-2 inline-block rounded-full border border-green-800 bg-green-900 px-2 py-1 text-xs leading-none text-green-50'>
                    Soon
                  </span>
                </TickItem>
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
                Ready to try{' '}
                <TiltedText type='black-on-yellow' className='px-2'>
                  Postgres
                </TiltedText>
                <br /> managed by ClickHouse?
              </SuiTitle>
              <SuiText className='mx-auto max-w-xl opacity-70 sm:px-10'>
                Join our private preview. Get early access and help shape the
                future of unified data.
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
          submitButtonLabel='Get early access'
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
            Thank you for your interest in Postgres managed by ClickHouse
            <br />
            <br />
            We’ll be in touch soon.
          </p>
        </div>
      )}
    </>
  )
}
