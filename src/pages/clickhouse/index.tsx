import heroTerminal from './assets/hero-terminal.svg'
import logoAdevinta from './assets/logo-adevinta.svg'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import { CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import QuoteCard from '@/components/QuoteCard'
import TiltedText from '@/components/TiltedText'
import { SuiCodeblock, SuiText, SuiTitle } from '@/components/sui'
import { marketingVideosService } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryMarketingVideo } from '@/types/strapi'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PageProps extends CommonProps {
  releaseVideos: Array<EntryMarketingVideo>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const [commonProps, releaseVideos] = await Promise.all([
      getCommonProps(),
      marketingVideosService.findMany({
        populate: false,
        filters: {
          categories: {
            id: {
              $eq: 11 // Releases
            }
          }
        },
        pagination: {
          limit: 3
        }
      })
    ])
    return {
      props: {
        seo: {
          title: 'Real-Time Data Analytics Platform | ClickHouse',
          description:
            'Get real-time insights with ClickHouse, the high-performance data analytics platform. Reap the benefits of streamlined data analysis and try for free today.',
          path: '/clickhouse',
          languages: ['en', 'ja']
        },
        ...commonProps,
        releaseVideos
      }
    }
  }

export default function ClickHouseServerPage({
  seo,
  headerData,
  footerData,
  releaseVideos
}: PageProps) {
  useGalaxyOnPage('productOpenSourcePage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='relative overflow-hidden bg-grid py-16 lg:py-24'>
        <div className='absolute -bottom-6 left-0 z-0 aspect-[1512/524] w-full bg-contain bg-center bg-no-repeat lg:bg-speed-lines' />
        <div className='section-container relative z-10 flex flex-col gap-y-20 lg:flex-row lg:items-center lg:gap-x-20'>
          {/* Content */}
          <div className='max-w-2xl'>
            <SuiTitle type='h1' className='mb-6 lg:!text-5.5xl'>
              The{' '}
              <TiltedText type='black-on-yellow' className='px-2'>
                fastest
              </TiltedText>{' '}
              open-source analytical database
            </SuiTitle>
            <SuiText size='lg' className='space-y-6 text-neutral-200'>
              <p>
                Open-source. Column-orientated. Built for blazingly fast
                analytics with SQL.
              </p>
              <p>
                Applied to data warehousing, real-time analytics, observability
                and ML/GenAI workloads. One database to rule them all.
              </p>
            </SuiText>
          </div>

          {/* Installer */}
          <div className='px-6 lg:px-0 xl:-mr-20'>
            <div className='relative'>
              <Image
                src={heroTerminal}
                width={91}
                height={130}
                alt=''
                className='absolute left-0 top-0 z-20 aspect-[91/130] w-14 -translate-x-1/4 -translate-y-1/3 lg:w-auto'
              />
              <div className='absolute -bottom-3 -left-3 right-3 top-1/4 z-0 rounded-lg bg-primary-300' />
              <div className='relative z-10 space-y-8 rounded-lg border border-neutral-700 bg-neutral-800 p-8 shadow-lg lg:p-16'>
                <div className='space-y-4'>
                  <SuiTitle type='h2' className='lg:!text-2.75xl'>
                    Start using ClickHouse in minutes
                  </SuiTitle>
                  <p className='text-neutral-200'>
                    Install ClickHouse for macOS, Linux, and FreeBSD
                  </p>
                </div>
                <SuiCodeblock
                  showCopy={true}
                  copyValue='curl https://clickhouse.com/ | sh'
                  className='mx-auto flex w-full items-center gap-3 text-center md:pr-24'>
                  <span className='hidden text-primary sm:inline'>$</span>
                  <span>curl https://clickhouse.com/ | sh</span>
                </SuiCodeblock>
                <div className='space-y-4 text-sm text-neutral-500'>
                  <p>
                    Or install for{' '}
                    <Link
                      href='/docs/en/integrations/sql-clients/clickhouse-client-local'
                      className='underline transition-colors hover:text-neutral-100'>
                      Windows
                    </Link>
                    ,{' '}
                    <Link
                      href='https://hub.docker.com/r/clickhouse/clickhouse-server/'
                      className='underline transition-colors hover:text-neutral-100'>
                      Docker
                    </Link>{' '}
                    or see other{' '}
                    <Link
                      href='/docs/en/install'
                      className='underline transition-colors hover:text-neutral-100'>
                      install options
                    </Link>
                    .
                  </p>
                  <p>
                    Watch this{' '}
                    <Link
                      href='/company/events/getting-started-with-clickhouse'
                      className='text-primary-300 hover:underline'>
                      getting started video
                    </Link>{' '}
                    to learn more about ClickHouse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='relative overflow-hidden bg-[#363636]'>
        {/* Red orb */}
        <div
          className='bg-shadow-element pointer-events-none absolute inset-0 z-10'
          style={
            {
              '--bottom-side': '35%',
              '--left-side': '25%',
              '--scale': '0.9',
              '--opacity': '0.03'
            } as React.CSSProperties
          }
        />
        {/* Yellow orb */}
        <div
          className='bg-shadow-element yellow-shadow pointer-events-none absolute inset-0 z-10'
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

        {/* Intro */}
        <div className='section-container relative z-20 max-w-4xl py-16 text-center lg:py-24'>
          <p className='mb-4 font-bold uppercase text-primary-300'>
            Choosing ClickHouse
          </p>
          <SuiTitle type='h2'>
            The leading ClickHouse OSS analytics database
          </SuiTitle>
          <p className='mt-6 text-neutral-200'>
            ClickHouse is an open-source, column-oriented SQL database built for
            speed and scale - running anywhere from a laptop to hundreds of
            servers at true petabyte scale. With a single binary, it unifies
            application analytics, warehousing, observability, and GenAI
            workloads in one blazing-fast engine.
          </p>
        </div>

        {/* Carousel */}
        <div className='relative z-0 pb-16 lg:pb-24'>
          <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-1/3 bg-primary-300' />
          <div className='section-container'>
            <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
              <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
              <h2 className='mb-6 text-center font-basier text-2xl font-semibold lg:-mt-3'>
                Join others migrating from legacy and proprietary data stores
                for their analytics
              </h2>
              <div className='space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0'>
                {(
                  [
                    {
                      link: '/comparison/bigquery',
                      title: 'Migrating from BigQuery',
                      description:
                        'Run highly-concurrency queries without second-long latency, CSP lock-in or run away costs due to per query pricing.',
                      quote:
                        'We needed a solution that could scale, but also provide end-user facing analytics capabilities with low latency and high throughput.',
                      logo: {
                        src: logoAdevinta,
                        width: 126,
                        height: 29,
                        alt: 'Adevinta'
                      }
                    },
                    {
                      link: '/comparison/snowflake',
                      title: 'Migrating from Snowflake',
                      description:
                        'Cut costs and improve latency with true high concurrency - no tier gated features or pricing models that penalize interactivity.',
                      quote:
                        "It's a lot faster. The data is consistent. We have to do less work. It's just way, way better for us. Anything we're doing in Snowflake now that we can do cheaper or faster in ClickHouse, we want to do that.",
                      logo: {
                        src: logoAdevinta,
                        width: 126,
                        height: 29,
                        alt: 'Adevinta'
                      }
                    },
                    {
                      title: 'Migrating from Apache Druid',
                      description:
                        'How Lyft optimized performance and cut infrastructure costs with ClickHouse',
                      quote:
                        'We needed something to slice and dice real-time data, like rides and driver hours across cities and regions where Lyft runs. Using ClickHouse resulted into a lot of performance benefits for us with huge cost savings for the org.',
                      logo: {
                        src: logoAdevinta,
                        width: 126,
                        height: 29,
                        alt: 'Adevinta'
                      }
                    }
                  ] satisfies Array<{
                    link?: string
                    title: string
                    description: string
                    quote: string
                    logo: ImageProps
                  }>
                ).map((migration, migrationIndex) => {
                  return (
                    <CUICard key={migrationIndex} className='relative'>
                      {migration.link && (
                        <Link href={migration.link}>
                          <span className='absolute inset-0 z-10' />
                          <span className='sr-only'>
                            {migration.title}: Find out more
                          </span>
                        </Link>
                      )}
                      <CUICard.Header className='p-4 text-center'>
                        <SuiTitle type='h3' className='mb-4'>
                          {migration.title}
                        </SuiTitle>
                        <p className='text-neutral-200'>
                          {migration.description}
                        </p>
                      </CUICard.Header>
                      <CUICard.Body className='flex-1 p-2'>
                        <QuoteCard
                          className='border-0 bg-white/5'
                          content={
                            <em className='text-sm'>{migration.quote}</em>
                          }
                          logo={{
                            ...migration.logo,
                            className: 'ml-auto opacity-40'
                          }}
                        />
                      </CUICard.Body>
                    </CUICard>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Release calls */}
      {releaseVideos.length > 0 && (
        <>
          <section className='section-container my-16 flex flex-col items-center gap-x-20 gap-y-8 lg:my-24 lg:flex-row'>
            <div className='space-y-6'>
              <SuiTitle type='h2'>
                <TiltedText type='black-on-yellow' className='px-2'>
                  Lightning fast
                </TiltedText>{' '}
                releases for everyone
              </SuiTitle>
              <p className='text-neutral-200'>
                ClickHouse feature development moves as fast as it queries. We
                ship monthly releases packed with new features, performance
                improvements, and bug fixes - shared openly in our community
                calls.
              </p>
              <p>
                <LinkWithArrow
                  href='/videos?category=releases'
                  className='font-bold text-primary-300'>
                  View all release calls
                </LinkWithArrow>
              </p>
            </div>
            <div className='w-full lg:max-w-lg'>
              <PlayOnClickVideo
                provider='youtube'
                id={releaseVideos[0].VideoID}
                thumbnail={
                  <YouTubeThumbnail videoId={releaseVideos[0].VideoID} />
                }
              />
            </div>
          </section>
          <HRSeparator />
        </>
      )}
    </Layout>
  )
}
