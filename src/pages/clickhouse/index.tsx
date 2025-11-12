import atScaleBottom from './assets/at-scale-bottom.svg'
import atScaleTop from './assets/at-scale-top.svg'
import heroTerminal from './assets/hero-terminal.svg'
import imageClickbench from './assets/image-clickbench.png'
import logoAdevinta from './assets/logo-adevinta.svg'
import Accordion from '@/components-cleaned/Accordion'
import CarouselPaginated from '@/components-cleaned/CarouselPaginated'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import { CUIButton, CUICard } from '@/components/ClickUI'
import GetStarted from '@/components/GetStarted'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import QuoteCard from '@/components/QuoteCard'
import ScaleToContainer from '@/components/ScaleToContainer'
import SocialIcon from '@/components/SocialIcon'
import TiltedText from '@/components/TiltedText'
import { SuiCodeblock, SuiText, SuiTitle } from '@/components/sui'
import { marketingVideosService } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import formatStat from '@/lib/utils/numbers'
import { CommonProps } from '@/types/homepage'
import { EntryMarketingVideo } from '@/types/strapi'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React from 'react'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-creative'
import { Mousewheel, EffectCreative, EffectCoverflow } from 'swiper/modules'

interface PageProps extends CommonProps {
  releaseVideos: Array<
    Omit<EntryMarketingVideo, 'seo' | 'categories' | 'RelatedVideos' | 'tags'>
  >
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
  platforms,
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
              <CarouselPaginated
                modules={[Mousewheel]}
                mousewheel={{
                  enabled: true,
                  forceToAxis: true,
                  releaseOnEdges: true,
                  sensitivity: 0.5
                }}
                simulateTouch={false}
                slidesPerView={1}
                spaceBetween={16}
                breakpoints={{
                  768: {
                    slidesPerView: 2
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24
                  }
                }}
                carouselClass='!-mx-6 !px-6 lg:!-mx-10 lg:!px-10'
                className='lg:!-mb-5'>
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
                    },
                    {
                      link: '/comparison/elastic-for-observability',
                      title: 'Migrating from Elastic',
                      description:
                        'Accelerate your aggregations, shrink your storage footprint, and simplify your architecture by scaling vertically',
                      quote:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius leo vitae lacus pulvinar, a ultricies elit malesuada. Donec eget lacus at leo varius facilisis. In semper faucibus consequat.',
                      logo: {
                        src: logoAdevinta,
                        width: 126,
                        height: 29,
                        alt: 'Adevinta',
                        className: 'bg-white'
                      }
                    },
                    {
                      link: '/comparison/redshift',
                      title: 'Migrating from Redshift',
                      description:
                        'Run faster cold queries, tap into broader integrations, and avoid CSP lock-in',
                      quote:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius leo vitae lacus pulvinar, a ultricies elit malesuada. Donec eget lacus at leo varius facilisis. In semper faucibus consequat.',
                      logo: {
                        src: logoAdevinta,
                        width: 126,
                        height: 29,
                        alt: 'Adevinta',
                        className: 'bg-white'
                      }
                    },
                    {
                      title: 'Migrating from Apache Pinot',
                      description:
                        'Simplify your open-source stack and enjoy faster queries, richer aggregation functions, and full SQL compliance.',
                      quote:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius leo vitae lacus pulvinar, a ultricies elit malesuada. Donec eget lacus at leo varius facilisis. In semper faucibus consequat.',
                      logo: {
                        src: logoAdevinta,
                        width: 126,
                        height: 29,
                        alt: 'Adevinta',
                        className: 'bg-white'
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
                            className: `ml-auto opacity-40 ${migration.logo?.className || ''}`
                          }}
                        />
                      </CUICard.Body>
                    </CUICard>
                  )
                })}
              </CarouselPaginated>
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
              <CarouselPaginated
                modules={[Mousewheel, EffectCreative]}
                mousewheel={{
                  enabled: true,
                  forceToAxis: true,
                  releaseOnEdges: true,
                  sensitivity: 0.5
                }}
                effect='creative'
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: ['-20%', 0, -1]
                  },
                  next: {
                    shadow: true,
                    translate: ['100%', 0, 0]
                  }
                }}
                simulateTouch={false}
                carouselClass='rounded'>
                {releaseVideos.map((releaseVideo, releaseVideoIndex) => {
                  return (
                    <PlayOnClickVideo
                      key={releaseVideoIndex}
                      provider='youtube'
                      id={releaseVideo.VideoID}
                      thumbnail={
                        <YouTubeThumbnail videoId={releaseVideo.VideoID} />
                      }
                    />
                  )
                })}
              </CarouselPaginated>
            </div>
          </section>
          <HRSeparator />
        </>
      )}

      {/* At scale */}
      <section className='section-container mt-16 lg:mt-24'>
        <Image
          src={atScaleTop}
          width={317}
          height={240}
          alt=''
          className='mx-auto'
        />
        <div className='mx-auto max-w-4xl space-y-6 text-center'>
          <SuiTitle type='h2'>
            From your laptop to quadrillion scale and beyond
          </SuiTitle>
          <p className='text-neutral-200'>
            Start in-process with Python on your laptop (CHDB), exploring
            millions of rows.
          </p>
          <p className='text-neutral-200'>
            Scale the same single-binary engine on your laptop to billions,
            expand to trillions on a server, and then out to hundreds of nodes
            for quadrillions.
          </p>
        </div>
        <Image
          src={atScaleBottom}
          width={974}
          height={487}
          alt=''
          className='mx-auto'
        />
      </section>

      {/* Videos */}
      <section className='bg-primary-300 py-16 text-neutral-900 lg:py-24'>
        <div className='section-container'>
          <div className='mx-auto mb-8 max-w-3xl space-y-6 text-center lg:mb-12'>
            <SuiTitle type='h2'>So what makes ClickHouse soo fast?</SuiTitle>
            <p className='text-neutral-700'>
              Learn what makes ClickHouse soo fast from isolated inserts and
              queries, efficient data pruning, and high compression to a
              state-of-the-art query engine and, above all, meticulous attention
              to detail.
            </p>
          </div>
          <CarouselPaginated
            theme='dark'
            modules={[EffectCoverflow]}
            coverflowEffect={{
              modifier: 4,
              rotate: 0,
              stretch: 0
            }}
            simulateTouch={false}
            slideToClickedSlide={true}
            slidesPerView={3}
            effect='coverflow'>
            {[
              'vsykFYns0Ws',
              'dvGlPh2bJFo',
              '_w3zQg695c0',
              'UJpVAx7o1aY',
              'MH10E3rVvnM',
              'O5qecdQ7Y18',
              'dccGLSuYWy0'
              //'7QXKBKDOkJE'
            ].map((videoId, videoIndex) => {
              return (
                <PlayOnClickVideo
                  key={videoIndex}
                  provider='youtube'
                  id={videoId}
                  thumbnail={<YouTubeThumbnail videoId={videoId} />}
                />
              )
            })}
          </CarouselPaginated>
        </div>
      </section>

      {/* What makes CH different? */}
      <section
        className='bg-shadow-element relative my-16 lg:my-24'
        style={
          {
            '--top-side': '224px'
          } as React.CSSProperties
        }>
        <div className='section-container lg:flex lg:justify-between lg:gap-x-12'>
          {/* Content */}
          <div className='pb-10 text-center lg:text-left'>
            <div className='w-full space-y-6 lg:sticky lg:top-32 lg:max-w-md'>
              <Image
                src='/faq-icon.svg'
                alt='FAQ Icon'
                width={72}
                height={72}
                className='inline-block'
              />
              <SuiTitle type='h2'>What's different about ClickHouse?</SuiTitle>
              <p className='text-neutral-200'>
                Open-source. Column-orientated. Built for blazingly fast
                analytics with SQL.
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

          {/* Accordions */}
          <Accordion
            className='mx-auto w-full max-w-3xl lg:mr-0'
            items={[
              {
                handle: 'Flexible architecture & columnar storage',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus viverra porta. Nullam euismod dignissim tortor, eu eleifend risus. Morbi orci purus, lobortis ut orci bibendum, euismod luctus nibh. Mauris auctor condimentum volutpat. Maecenas euismod suscipit iaculis. Suspendisse a finibus libero. Nulla ultrices pellentesque magna vitae condimentum. Donec non lacus orci. '
              },
              {
                handle: 'Blazing fast queries and inserts',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus viverra porta. Nullam euismod dignissim tortor, eu eleifend risus. Morbi orci purus, lobortis ut orci bibendum, euismod luctus nibh. Mauris auctor condimentum volutpat. Maecenas euismod suscipit iaculis. Suspendisse a finibus libero. Nulla ultrices pellentesque magna vitae condimentum. Donec non lacus orci. '
              },
              {
                handle: 'Infinitely scalable for Petabyte workloads',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus viverra porta. Nullam euismod dignissim tortor, eu eleifend risus. Morbi orci purus, lobortis ut orci bibendum, euismod luctus nibh. Mauris auctor condimentum volutpat. Maecenas euismod suscipit iaculis. Suspendisse a finibus libero. Nulla ultrices pellentesque magna vitae condimentum. Donec non lacus orci. '
              },
              {
                handle: 'Highly reliable',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus viverra porta. Nullam euismod dignissim tortor, eu eleifend risus. Morbi orci purus, lobortis ut orci bibendum, euismod luctus nibh. Mauris auctor condimentum volutpat. Maecenas euismod suscipit iaculis. Suspendisse a finibus libero. Nulla ultrices pellentesque magna vitae condimentum. Donec non lacus orci. '
              },
              {
                handle: 'Powerful data operations',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus viverra porta. Nullam euismod dignissim tortor, eu eleifend risus. Morbi orci purus, lobortis ut orci bibendum, euismod luctus nibh. Mauris auctor condimentum volutpat. Maecenas euismod suscipit iaculis. Suspendisse a finibus libero. Nulla ultrices pellentesque magna vitae condimentum. Donec non lacus orci. '
              },
              {
                handle: 'Ease of use and interoperability',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus viverra porta. Nullam euismod dignissim tortor, eu eleifend risus. Morbi orci purus, lobortis ut orci bibendum, euismod luctus nibh. Mauris auctor condimentum volutpat. Maecenas euismod suscipit iaculis. Suspendisse a finibus libero. Nulla ultrices pellentesque magna vitae condimentum. Donec non lacus orci. '
              }
            ]}
          />
        </div>
      </section>

      {/* Community */}
      <section className='bg-white/5 py-16 lg:py-24'>
        <div
          className='section-container bg-shadow-element yellow-shadow flex w-full flex-col-reverse items-center justify-between gap-x-8 gap-y-16 lg:flex-row'
          style={
            {
              '--top-side': '25%',
              '--left-side': 'auto',
              '--right-side': '25%',
              '--scale': 0.7,
              '--opacity': 0.025
            } as React.CSSProperties
          }>
          <div className='w-full max-w-xl space-y-6 text-center lg:text-left'>
            <SuiTitle type='h2'>
              Join the <TiltedText type='black-on-yellow'>100k+</TiltedText>{' '}
              developers using ClickHouse today
            </SuiTitle>
            <p className='text-neutral-200'>
              Backed by{' '}
              <strong>
                {Intl.NumberFormat('en', {
                  notation: 'standard'
                })
                  .format(headerData.github.contributors)
                  .toLowerCase()}
                + contributors
              </strong>{' '}
              and thousands of commits, ClickHouse thrives on a vibrant
              open-source community that pushes the project forward at speed.
            </p>
            <ul className='mx-auto grid max-w-40 grid-cols-2 gap-6 sm:max-w-max sm:grid-cols-4 lg:mx-0'>
              <li className='flex items-center justify-center'>
                <SocialIcon
                  name='X'
                  href='https://x.com/ClickhouseDB'
                  imgSrc='/socials/x.svg'
                />
              </li>
              <li className='flex items-center justify-center'>
                <SocialIcon
                  name='Slack'
                  href='/slack'
                  prefetch={false}
                  imgSrc='/socials/slack.svg'
                />
              </li>
              <li className='flex items-center justify-center'>
                <SocialIcon
                  name='Telegram'
                  href='https://telegram.me/clickhouse_en'
                  imgSrc='/socials/telegram.svg'
                />
              </li>
              <li className='flex items-center justify-center'>
                <SocialIcon
                  name='Meetup'
                  href='https://www.meetup.com/pro/clickhouse'
                  imgSrc='/socials/meetup.svg'
                />
              </li>
            </ul>
          </div>
          <div className='w-full max-w-max'>
            <ScaleToContainer scaleUp={false}>
              <div className='grid h-[290px] w-[564px] -translate-y-5 grid-cols-4 grid-rows-4 gap-x-16 gap-y-20'>
                {Object.entries({
                  Contributors: headerData.github.contributors,
                  PRs: headerData.github.prs,
                  Releases: headerData.github.releases,
                  Stars: headerData.github.stars
                }).map(([label, value], statIndex) => {
                  const className = [
                    'translate-y-10 -translate-x-5',
                    '',
                    'translate-y-10 translate-x-2',
                    '-translate-x-2'
                  ][statIndex % 4]
                  return (
                    <div
                      key={statIndex}
                      className={`relative col-span-2 row-span-2 flex items-center justify-center text-7xl font-bold ${className}`}>
                      <span className='flex flex-col'>
                        {formatStat(value)}+
                        <span className='text-2xl leading-snug text-primary-300'>
                          {label}
                        </span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </ScaleToContainer>
          </div>
        </div>
      </section>

      {/* ClickBench */}
      <section className='section-container my-16 lg:my-24'>
        <div className='rounded-lg bg-primary-300 p-4 text-neutral-900 md:p-8 lg:p-16'>
          <div className='mx-auto max-w-3xl space-y-6 text-center'>
            <SuiTitle type='h2'>
              All proven by benchmarks that can be reproduced by{' '}
              <TiltedText type='white-on-black' className='px-2'>
                anyone
              </TiltedText>
              .
            </SuiTitle>
            <p className='text-neutral-700'>
              At ClickHouse, we measure performance relentlessly - believing
              every millisecond matters. We continually push to make queries
              faster.
            </p>
          </div>
          <Image
            src={imageClickbench}
            width={2282 / 3}
            height={1515 / 3}
            alt='Screenshot of benchmarks'
            className='mx-auto my-8 block lg:my-12'
          />
          <div className='mx-auto max-w-3xl space-y-6 text-center'>
            <p className='text-neutral-700'>
              We back up our claims with public, reproducible benchmarks like
              ClickBench and JSONBench. You can explore our results directly and
              compare ClickHouse against other technologies before deciding how
              to power your analytics.
            </p>
            <CUIButton
              href='https://benchmark.clickhouse.com/'
              type='secondary'
              size='lg'
              linkClass='block md:inline-block'
              className='group w-full !border-neutral-800 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white md:mx-auto md:w-auto md:!px-10'>
              View our benchmarks
            </CUIButton>
          </div>
        </div>
      </section>

      <GetStarted platforms={platforms} />
    </Layout>
  )
}
