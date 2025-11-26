import atScaleBottom from './assets/at-scale-bottom.svg'
import atScaleTop from './assets/at-scale-top.svg'
import diagram1part1 from './assets/diagram-1-part-1.svg'
import diagram1part2 from './assets/diagram-1-part-2.svg'
import diagram1part3 from './assets/diagram-1-part-3.svg'
import diagram1part4 from './assets/diagram-1-part-4.svg'
import diagram3base from './assets/diagram-3-base.svg'
import diagram3node from './assets/diagram-3-node.svg'
import diagram5arrowLeft from './assets/diagram-5-arrow-left.svg'
import diagram5arrowRight from './assets/diagram-5-arrow-right.svg'
import diagram5insertsMain from './assets/diagram-5-inserts-main.svg'
import diagram5insertsMv from './assets/diagram-5-inserts-mv.svg'
import diagram5inserts from './assets/diagram-5-inserts.svg'
import diagram5queryIcon from './assets/diagram-5-query-icon.svg'
import heroTerminal from './assets/hero-terminal.svg'
import iconShootingStar from './assets/icon-shooting-star.svg'
import imageAcademicPaper from './assets/image-academic-paper.png'
import imageArchitecture from './assets/image-architecture.png'
import imageBackups from './assets/image-backups.png'
import imageClickbench from './assets/image-clickbench.png'
import imageInteroperability from './assets/image-interoperability.png'
import imageJsonSupport from './assets/image-json-support.png'
import imageLightweightUpdates from './assets/image-lightweight-updates.png'
import imageReplication from './assets/image-replication.png'
import imagesharding from './assets/image-sharding.png'
import imageSqlSupport from './assets/image-sql-support.png'
import imageVectorizedEngine from './assets/image-vectorized-engine.png'
import logoAdevinta from './assets/logo-adevinta.svg'
import logoBraze from './assets/logo-braze.svg'
import logoConstantContact from './assets/logo-constant-contact.svg'
import logoJerry from './assets/logo-jerry.svg'
import logoLyft from './assets/logo-lyft.svg'
import logoNetflix from './assets/logo-netflix.svg'
import thumb01 from './assets/thumb-01.png'
import thumb02 from './assets/thumb-02.png'
import thumb03 from './assets/thumb-03.png'
import thumb04 from './assets/thumb-04.png'
import thumb05 from './assets/thumb-05.png'
import thumb06 from './assets/thumb-06.png'
import thumb07 from './assets/thumb-07.png'
import Accordion from '@/components-cleaned/Accordion'
import CarouselPaginated from '@/components-cleaned/CarouselPaginated'
import GithubStats from '@/components-cleaned/GithubStats'
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
import useResizeObserverSsr from '@/hooks/useResizeObserverSsr'
import { marketingVideosService } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryMarketingVideo } from '@/types/strapi'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-creative'
import {
  Mousewheel,
  EffectCreative,
  EffectCoverflow,
  Navigation
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

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

  // Apply Equal heights to quote card headers
  const quoteCarouselRef = useRef<null | HTMLDivElement>(null)
  useResizeObserverSsr(quoteCarouselRef, () => {
    if (!quoteCarouselRef.current) return

    const titles =
      quoteCarouselRef.current.querySelectorAll<HTMLElement>('.cui-card-header')

    // Remove previously set values
    titles.forEach((el) => {
      el.style.removeProperty('height')
    })

    // Calculate the max height
    let maxHeight = 0
    titles.forEach((el) => {
      const h = el.offsetHeight
      if (h > maxHeight) maxHeight = h
    })

    // Set the height values
    titles.forEach((el) => {
      el.style.setProperty('height', `${maxHeight}px`)
    })
  })

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
                    Start using ClickHouse in seconds
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
                <div className='space-y-4 text-sm leading-normal text-neutral-400'>
                  <p>
                    Or install for{' '}
                    <Link
                      href='/docs/install/windows'
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
                    . Or try without installing in our{' '}
                    <Link
                      href='https://sql.clickhouse.com'
                      className='underline transition-colors hover:text-neutral-100'>
                      playground
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
          <SuiTitle type='h2'>The leading OSS analytics database</SuiTitle>
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
              <div className='grid grid-cols-1 grid-rows-2'>
                <CarouselPaginated
                  ref={quoteCarouselRef}
                  modules={[Mousewheel]}
                  mousewheel={{
                    enabled: true,
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 0.5
                  }}
                  loop={true}
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
                  className='col-span-full row-span-full lg:!-mb-7'>
                  {(
                    [
                      {
                        link: '/comparison/elastic-for-observability',
                        title: 'Migrating from Elastic',
                        description:
                          'Accelerate your aggregations, shrink your storage footprint, and simplify your architecture by scaling vertically',
                        quote:
                          'Extensive testing and comparison showed that ClickHouse outperformed other solutions like Elasticsearch in three key areas: performance, compatibility, and cost-efficiency for large-scale operations.',
                        logo: {
                          src: logoNetflix,
                          width: 111,
                          height: 30,
                          alt: 'Netflix'
                        }
                      },
                      {
                        link: '/videos/lyft-user-story',
                        title: 'Migrating from Apache Druid',
                        description:
                          'How Lyft optimized performance and cut infrastructure costs with ClickHouse',
                        quote:
                          'We needed something to slice and dice real-time data, like rides and driver hours across cities and regions where Lyft runs. Using ClickHouse resulted into a lot of performance benefits for us with huge cost savings for the org.',
                        logo: {
                          src: logoLyft,
                          width: 54,
                          height: 38,
                          alt: 'Lyft'
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
                          src: logoBraze,
                          width: 89,
                          height: 41,
                          alt: 'Braze'
                        }
                      },
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
                        link: '/comparison/redshift',
                        title: 'Migrating from Redshift',
                        description:
                          'Run faster cold queries, tap into broader integrations, and avoid CSP lock-in',
                        quote:
                          'As data size grew, we faced performance and cost challenges with AWS Redshift. Switching to ClickHouse improved our query performance by 20 times and greatly cut costs.',
                        logo: {
                          src: logoJerry,
                          width: 82 * 1.2,
                          height: 20 * 1.2,
                          alt: 'Jerry'
                        }
                      },
                      {
                        link: '/blog/pinot-to-clickhouse-constant-contact',
                        title: 'Migrating from Apache Pinot',
                        description:
                          'Simplify your open-source stack and enjoy faster queries, richer aggregation functions, and full SQL compliance.',
                        quote:
                          'With ClickHouse, our performance is 10 times faster',
                        logo: {
                          src: logoConstantContact,
                          width: 139.88 * 0.9,
                          height: 40 * 0.9,
                          alt: 'Constant Contact'
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
                      <CUICard
                        key={migrationIndex}
                        className='relative bg-neutral-700/20'>
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
                              <em className='text-base text-white'>
                                {migration.quote}
                              </em>
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
                </CarouselPaginated>
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
                release webinars.
              </p>
              <p>
                <LinkWithArrow
                  href='/videos?category=releases'
                  className='font-bold text-primary-300'>
                  View all release webinars
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
                        <div className='relative'>
                          <small className='pointer-events-none absolute right-3 top-3 font-inconsolata text-sm leading-none text-black'>
                            {new Date(releaseVideo.VideoDate).toLocaleString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                timeZone: 'UTC'
                              }
                            )}
                          </small>
                          <YouTubeThumbnail
                            videoId={releaseVideo.VideoID}
                            loading='eager'
                          />
                        </div>
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
      <section className='mt-16 overflow-hidden lg:mt-24'>
        <div className='relative mx-auto h-[120px] w-full max-w-[158px] overflow-hidden md:h-[240px] md:max-w-[317px]'>
          <Image
            src={atScaleTop}
            width={317}
            height={240}
            alt=''
            className='absolute inset-y-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2'
          />
        </div>
        <div className='section-container'>
          <div className='mx-auto max-w-4xl space-y-6 text-center'>
            <SuiTitle type='h2'>
              From your laptop to quadrillion scale and beyond
            </SuiTitle>
            <p className='text-neutral-200'>
              Start in-process with Python on your laptop (
              <Link href='/chdb' className='text-primary-300 hover:underline'>
                chDB
              </Link>
              ), exploring millions of rows.
            </p>
            <p className='text-neutral-200'>
              Scale the same engine on your laptop to billions, expand to
              trillions on a server, and then out to hundreds of nodes for
              quadrillions.
            </p>
          </div>
        </div>
        <div className='relative mx-auto h-[243px] w-full max-w-[487px] overflow-hidden md:h-[487px] md:max-w-[974px]'>
          <Image
            src={atScaleBottom}
            width={974}
            height={487}
            alt=''
            className='absolute inset-y-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2'
          />
        </div>
      </section>

      {/* Videos */}
      <section className='bg-primary-300 py-16 text-neutral-900 lg:py-24'>
        <div className='section-container mb-8 max-w-3xl space-y-6 text-center lg:mb-16'>
          <SuiTitle type='h2'>So what makes ClickHouse fast?</SuiTitle>
          <p className='text-neutral-700'>
            Learn what makes ClickHouse so fast from isolated inserts and
            queries, efficient data pruning, and high compression to a
            state-of-the-art query engine and, above all, meticulous attention
            to detail.
          </p>
        </div>
        <div className='mx-auto max-w-screen-2xl'>
          <YoutubeCoverFlow
            videos={[
              {
                title:
                  'Concurrent inserts are isolated from each other (part 1)',
                youtubeId: 'vsykFYns0Ws',
                thumbnail: thumb01
              },
              {
                title:
                  'Concurrent inserts are isolated from each other (part 2)',
                youtubeId: 'dvGlPh2bJFo',
                thumbnail: thumb02
              },
              {
                title: 'Merge-time computation',
                youtubeId: '_w3zQg695c0',
                thumbnail: thumb03
              },
              {
                title: 'Data pruning',
                youtubeId: 'UJpVAx7o1aY',
                thumbnail: thumb04
              },
              {
                title: 'Data compression',
                youtubeId: 'MH10E3rVvnM',
                thumbnail: thumb05
              },
              {
                title: 'Query processing',
                youtubeId: 'O5qecdQ7Y18',
                thumbnail: thumb06
              },
              {
                title: 'Attention to detail',
                youtubeId: 'dccGLSuYWy0',
                thumbnail: thumb07
              }
            ]}
          />
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
        <div className='section-container xl:flex xl:justify-between xl:gap-x-12'>
          {/* Content */}
          <div className='pb-10 text-center xl:text-left'>
            <div className='w-full space-y-6 xl:sticky xl:top-32 xl:max-w-md'>
              <Image
                src={iconShootingStar}
                alt='Icon'
                width={72}
                height={72}
                className='inline-block'
              />
              <SuiTitle type='h2'>What's different about ClickHouse?</SuiTitle>
              <p className='text-neutral-200'>
                Open-source. Column-oriented. Built for blazingly fast analytics
                with SQL.
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
            className='mx-auto w-full max-w-3xl xl:mr-0'
            items={[
              {
                defaultOpen: true,
                handle: 'Flexible architecture & columnar storage',
                content: (
                  <div className='w-full space-y-4'>
                    <p>
                      A column-oriented design delivers high compression, while
                      the LSM-inspired engine and background merges keep parts
                      compact and queries fast, no matter how large the dataset.
                    </p>
                    <DiagramOne />
                    <p>
                      ClickHouse is built on a unique architecture with a
                      pluggable storage layer: data can live on SSDs, spinning
                      disks, or object storage, and can naturally flow across
                      tiers from hot to cold.
                    </p>
                    <Image
                      src={imageArchitecture}
                      width={1376 / 2}
                      height={1002 / 2}
                      alt=''
                    />
                  </div>
                )
              },
              {
                handle: 'Blazing fast queries and inserts',
                content: (
                  <div className='w-full space-y-4'>
                    <DiagramFour />
                    <p>
                      ClickHouse uses a sparse primary index - just a few
                      megabytes per terabyte - scaling effortlessly while
                      pruning data quickly. Query caches, advanced skip indices
                      accelerating performance further. Inserts are equally
                      fast, streamed row by row or in batches, with writes
                      optimized through part sorting and separation of reads and
                      writes, delivering throughput without slowing queries.
                    </p>
                    <Image
                      src={imageVectorizedEngine}
                      width={1376 / 2}
                      height={798 / 2}
                      alt=''
                    />
                    <p>
                      A parallelized, vectorized engine filters and aggregates
                      data at speed across a single server or hundreds of nodes
                      thanks to partial states, support for sharding and shared
                      processing across replicas.
                    </p>
                  </div>
                )
              },
              {
                handle: 'Infinitely scalable for Petabyte workloads',
                content: (
                  <div className='w-full space-y-4'>
                    <p>
                      ClickHouse scales vertically, fully using machine
                      resources and parallelizing reads at a low level.
                    </p>
                    <p>
                      A decentralized architecture with sharding and replication
                      enables horizontal scaling to hundreds of nodes and
                      quadrillions of rows.
                    </p>
                    <Image
                      src={imagesharding}
                      width={1376 / 2}
                      height={532 / 2}
                      alt=''
                    />
                    <p>
                      ClickHouse Cloud builds on this foundation with separation
                      of storage and compute: nodes read from a single
                      authoritative copy in object storage, cache data locally,
                      and scale compute dynamically both vertically and
                      horizontally while all reads and writes stay consistent.
                    </p>
                    <DiagramThree />
                  </div>
                )
              },
              {
                handle: 'Highly reliable',
                content: (
                  <div className='w-full space-y-4'>
                    <Image
                      src={imageReplication}
                      width={1376 / 2}
                      height={996 / 2}
                      alt=''
                    />
                    <p>
                      ClickHouse ensures reliability through its replication
                      model, which uses Raft-based coordination via{' '}
                      <Link
                        href='/clickhouse/keeper'
                        className='text-primary-300 hover:underline'>
                        Keeper
                      </Link>{' '}
                      and provides eventual consistency. This lightweight design
                      enables replication across availability zones or even
                      regions with high latencies, delivering high durability
                      without heavy overhead.
                    </p>
                    <Image
                      src={imageBackups}
                      width={1376 / 2}
                      height={672 / 2}
                      alt=''
                    />
                    <p>
                      For long-term protection, backups can be written to object
                      storage, giving teams confidence their data is safe and
                      recoverable.
                    </p>
                    <p>
                      Snapshots offer a lightweight means to create a point in
                      time of your data.
                    </p>
                  </div>
                )
              },
              {
                handle: 'Powerful data operations',
                content: (
                  <div className='w-full space-y-4'>
                    <DiagramFive />
                    <p>
                      ClickHouse offers advanced features to manipulate, filter,
                      and transform data efficiently. Materialized views can be
                      refreshable or incremental, with incremental views
                      shifting compute from query time to insert time and
                      dramatically accelerating repeated queries.
                    </p>
                    <p>
                      Projections allow data to be sorted in multiple ways,
                      optimizing for frequent access patterns.
                    </p>
                    <Image
                      src={imageJsonSupport}
                      width={1376 / 2}
                      height={408 / 2}
                      alt=''
                    />
                    <p>
                      ClickHouse supports schema on write with JSON support,
                      semi-structured data can be ingested safely without schema
                      explosion, combining flexibility with the full power of a
                      columnar database.
                    </p>
                    <Image
                      src={imageLightweightUpdates}
                      width={1376 / 2}
                      height={833 / 2}
                      alt=''
                    />
                    <p>
                      ClickHouse breaks past traditional OLAP limitations with
                      full support for lightweight updates and deletes through
                      patched parts providing both flexibility and support for
                      complex compliance requirements.
                    </p>
                  </div>
                )
              },
              {
                handle: 'Ease of use and interoperability',
                content: (
                  <div className='w-full space-y-4'>
                    <Image
                      src={imageSqlSupport}
                      width={1376 / 2}
                      height={480 / 2}
                      alt=''
                    />
                    <p>
                      ClickHouse is a full database engine with complete SQL
                      support, including joins, and an optimizer that can
                      reorder joins globally and leverage column statistics
                      automatically. It extends standard SQL with 100s of
                      analytical functions, making complex aggregations and
                      filters simpler and more expressive.
                    </p>
                    <Image
                      src={imageInteroperability}
                      width={1376 / 2}
                      height={666 / 2}
                      alt=''
                    />
                    <p>
                      With support for 70+ file formats for ingestion and
                      output, ClickHouse delivers unmatched interoperability.
                    </p>
                    <p>
                      The ability to read and write open table and lake formats
                      such as Parquet, Iceberg, and Delta, with catalog
                      integrations like AWS Glue and Unity making them seamless
                      to query - bringing the performance of ClickHouse’s query
                      engine to your data lake.
                    </p>
                  </div>
                )
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
              and thousands of commits per month, ClickHouse thrives on a
              vibrant open-source community that pushes the project forward at
              speed.
            </p>
            <ul className='mx-auto flex flex-wrap justify-center gap-6 sm:max-w-max lg:mx-0'>
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
              <li className='flex items-center justify-center'>
                <SocialIcon
                  name='LinkedIn'
                  href='https://www.linkedin.com/company/clickhouseinc'
                  imgSrc='/socials/linkedin.svg'
                />
              </li>
            </ul>
          </div>
          <GithubStats {...headerData.github} />
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
              We back up our claims with public, reproducible benchmarks like{' '}
              <Link
                href='https://benchmark.clickhouse.com/'
                className='underline hover:decoration-2'>
                ClickBench
              </Link>{' '}
              and{' '}
              <Link
                href='https://jsonbench.com/'
                className='underline hover:decoration-2'>
                JSONBench
              </Link>
              . You can explore our results directly and compare ClickHouse
              against other technologies before deciding how to power your
              analytics.
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

      <section className='section-container my-16 flex flex-col items-center justify-around gap-y-16 lg:my-24 lg:flex-row'>
        <div className='w-full space-y-6 md:max-w-lg'>
          <p className='font-bold uppercase text-primary-300'>
            Built for innovation, open by design
          </p>
          <SuiTitle type='h2'>
            Inviting experimentation and contribution
          </SuiTitle>
          <p className='text-neutral-200'>
            Our academic paper shows how ClickHouse serves not only as a high
            performance database, but also as a platform for advancing the state
            of the art and is the best way to learn how its internals work.
          </p>
          <div className='flex flex-col gap-4 md:flex-row'>
            <CUIButton type='primary' size='lg' className='lg:!px-8'>
              Read our academic paper
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='lg:!px-8'
              iconLeft={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='15'
                  fill='none'
                  viewBox='0 0 20 15'>
                  <path
                    fill='#fff'
                    d='M7.1 0H1.5A1.5 1.5 0 0 0 0 1.5v6A1.5 1.5 0 0 0 1.5 9h5.6v.8a3 3 0 0 1-3 3 .7.7 0 1 0 0 1.4 4.5 4.5 0 0 0 4.5-4.4V1.4A1.5 1.5 0 0 0 7.1 0m0 7.5H1.5v-6h5.6zM18 0h-5.6a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 12.4 9H18v.8a3 3 0 0 1-3 3 .7.7 0 1 0 0 1.4 4.5 4.5 0 0 0 4.5-4.4V1.4A1.5 1.5 0 0 0 18 0m0 7.5h-5.6v-6H18z'
                  />
                </svg>
              }>
              Copy citation
            </CUIButton>
          </div>
        </div>
        <Image
          src={imageAcademicPaper}
          width={1005 / 2}
          height={908 / 2}
          alt='Screenshot of academic paper'
          className='order-first lg:order-last'
        />
      </section>

      <GetStarted platforms={platforms} />
    </Layout>
  )
}

function YoutubeCoverFlow({
  videos
}: {
  videos: Array<{
    title: string
    youtubeId: string
    thumbnail: ImageProps['src']
  }>
}) {
  const swiperRef = useRef<null | SwiperClass>(null)
  const [navReady, setNavReady] = useState<boolean>(false)
  const prevRef = useRef<null | HTMLButtonElement>(null)
  const nextRef = useRef<null | HTMLButtonElement>(null)
  useEffect(() => {
    setNavReady(!!prevRef.current && !!nextRef.current)
  }, [prevRef.current, nextRef.current])
  return (
    <div className='relative'>
      <button
        type='button'
        ref={prevRef}
        className='absolute left-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-lg transition-colors hover:bg-black/10 lg:left-12 lg:flex 2xl:left-0'>
        <span className='sr-only'>Prev</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='23'
          height='15'
          fill='none'
          viewBox='0 0 23 15'>
          <path
            fill='#111'
            d='m7.15 14.32 1.65-1.65-4.32-4.31h17.85v-2.4H4.47L8.8 1.62 7.15 0 0 7.16z'
          />
        </svg>
      </button>
      <button
        type='button'
        ref={nextRef}
        className='absolute right-0 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-lg transition-colors hover:bg-black/10 lg:right-12 lg:flex 2xl:right-0'>
        <span className='sr-only'>Next</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='23'
          height='15'
          fill='none'
          viewBox='0 0 23 15'>
          <path
            fill='#000'
            d='m15.18 14.32-1.65-1.65 4.32-4.31H0v-2.4h17.86l-4.33-4.34L15.18 0l7.15 7.16z'
          />
        </svg>
      </button>
      <Swiper
        key={navReady ? 'with-nav' : 'no-nav'}
        modules={[Mousewheel, EffectCoverflow, Navigation]}
        navigation={{
          enabled: true,
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 0.5
        }}
        effect='coverflow'
        coverflowEffect={{
          rotate: 0, // no tilt
          depth: 0, // no 3D depth
          stretch: 100, // negative to pull sides under center
          scale: 0.8, // scale side slides down
          modifier: 1,
          slideShadows: false
        }}
        onAfterInit={(swiper) => {
          swiperRef.current = swiper
        }}
        slidesPerView={1.25}
        simulateTouch={false}
        slideToClickedSlide={true}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          1024: {
            slidesPerView: 2.75
          }
        }}>
        {videos.map(({ title, youtubeId, thumbnail }, videoIndex) => {
          return (
            <SwiperSlide
              key={videoIndex}
              className='[&:not(.swiper-slide-active)]:cursor-pointer'
              onClick={() => {
                const swiper = swiperRef.current
                if (!swiper) return
                const isGt = videoIndex > swiper.realIndex
                const isLt = videoIndex < swiper.realIndex
                const isLoopStart =
                  swiper.realIndex === 0 &&
                  videoIndex === swiper.slides.length - 1
                const isLoopEnd =
                  swiper.realIndex === swiper.slides.length - 1 &&
                  videoIndex === 0
                if ((isGt && !isLoopStart) || isLoopEnd) {
                  swiper.slideNext()
                } else if ((isLt && !isLoopEnd) || isLoopStart) {
                  swiper.slidePrev()
                }
              }}>
              {({ isActive, isVisible }) => (
                <PlayOnClickVideo
                  provider='youtube'
                  id={youtubeId}
                  className={`transition-opacity ${isVisible || isActive ? '' : 'opacity-0'} ${isActive ? '' : 'pointer-events-none'}`}
                  thumbnailClassName={`transition-opacity ${isActive ? '' : 'opacity-50'}`}
                  playButtonClassName={`!transition-all ${isActive ? '' : 'opacity-0'}`}
                  thumbnail={
                    <Image
                      src={thumbnail}
                      width={1280 / 2}
                      height={720 / 2}
                      loading='eager'
                      alt={`Why is clickhouse so fast. ${title}`}
                    />
                  }
                />
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

function DiagramOne() {
  const [stepIndex, setStepIndex] = useState<number>(0)
  const steps = [
    [9, 11, 25, 27],
    [0, 2, 3, 4, 6, 7, 20, 22, 23, 32, 34, 35],
    [4, 5, 7, 24, 25, 27, 28, 29, 31],
    [0, 1, 2, 16, 17, 18, 20, 21, 22]
  ]

  const charts: Array<Pick<ImageProps, 'src' | 'width' | 'height'>> = [
    { src: diagram1part1, width: 171, height: 133 },
    { src: diagram1part2, width: 176, height: 100 },
    { src: diagram1part3, width: 142, height: 102 },
    { src: diagram1part4, width: 176, height: 100 }
  ]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStepIndex((old) => {
        const newIndex = old + 0.5
        if (newIndex >= steps.length) return 0
        return newIndex
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [steps])

  const [firstChartIndex, secondChartIndex] = useMemo(() => {
    const randChartIndex = () => Math.floor(Math.random() * charts.length)
    const first = randChartIndex()
    let second = randChartIndex()

    // Ensure two unique charts are displaying at one time
    while (second === first) {
      second = randChartIndex()
    }

    return [first, second]
  }, [steps, stepIndex])

  return (
    <ScaleToContainer>
      <div className='relative h-[440px] w-[688px] rounded-lg border border-neutral-700/80 bg-gradient-to-tr from-black/30 to-black/0'>
        <div className='absolute left-9 top-9 grid w-80 grid-cols-4 gap-1'>
          {Array(4 * 9)
            .fill(null)
            .map((_, i) => {
              const isActive = steps[stepIndex]?.includes(i)
              return (
                <div
                  key={i}
                  className={`relative h-4 rounded-sm bg-primary-300 transition-opacity duration-300 before:absolute before:inset-0 before:block before:bg-primary-300/50 before:blur before:transition-opacity ${isActive ? '' : 'opacity-30 before:opacity-0'}`}
                />
              )
            })}
        </div>
        <div className='absolute bottom-6 right-6 flex h-56 w-[420px] flex-col overflow-hidden rounded-lg border border-neutral-700 bg-neutral-750 shadow'>
          <div className='h-10 w-full flex-shrink-0 flex-grow-0 bg-neutral-725' />
          <div className='grid flex-1 grid-cols-2 grid-rows-1'>
            {charts.map((chart, i) => {
              const isActive = firstChartIndex === i
              return (
                <div key={i} className='col-start-1 row-start-1 flex'>
                  <Image
                    {...chart}
                    alt=''
                    className={`m-auto transition duration-300 ${isActive ? '' : 'translate-y-4 opacity-0'}`}
                  />
                </div>
              )
            })}
            {charts.map((chart, i) => {
              const isActive = secondChartIndex === i
              return (
                <div key={i} className='col-start-2 row-start-1 flex'>
                  <Image
                    {...chart}
                    alt=''
                    className={`m-auto transition duration-300 ${isActive ? '' : 'translate-y-4 opacity-0'}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </ScaleToContainer>
  )
}

function DiagramThree() {
  const [stepIndex, setStepIndex] = useState<number>(0)
  const steps = [
    {
      nodes: 1,
      delay: 1000,
      scale: true
    },
    {
      nodes: 2,
      delay: 900,
      scale: true
    },
    {
      nodes: 3,
      delay: 800,
      scale: true
    },
    {
      nodes: 4,
      delay: 700,
      scale: true
    },
    {
      nodes: 5,
      delay: 600,
      scale: true
    },
    {
      nodes: 6,
      delay: 500,
      scale: true
    },
    {
      nodes: 7,
      delay: 400,
      scale: true
    },
    {
      nodes: 8,
      delay: 350,
      scale: true
    },
    {
      nodes: 9,
      delay: 300,
      scale: true
    },
    {
      nodes: 10,
      delay: 250,
      scale: true
    },
    {
      nodes: 11,
      delay: 3000,
      scale: true
    },
    {
      nodes: 0,
      delay: 500,
      scale: false
    }
  ]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStepIndex((old) => {
        const newIndex = old + 1
        return newIndex >= steps.length ? 0 : newIndex
      })
    }, steps[stepIndex].delay)

    return () => window.clearTimeout(timer)
  }, [stepIndex])

  return (
    <ScaleToContainer>
      <div className='relative flex h-[402px] w-[688px] flex-col rounded-lg border border-neutral-700/80 bg-gradient-to-tr from-black/30 to-black/0 p-6'>
        <div className='-mx-1 flex flex-1 justify-center'>
          {Array(Math.max(...steps.map((step) => step.nodes)))
            .fill(null)
            .map((_, i) => {
              const active = steps[stepIndex].nodes > i
              const width = `${100 / steps[stepIndex].nodes}%`
              const scale = steps[stepIndex].scale
              const lineSpeed = Math.max(0.1, 1 - 0.08 * stepIndex)
              const lineSize = Math.max(4, steps.length - stepIndex)
              return (
                <motion.div
                  key={i}
                  layout={true}
                  initial={false}
                  animate={active ? 'open' : 'closed'}
                  variants={{
                    closed: scale
                      ? { opacity: 0, x: -16, width: 0 }
                      : { opacity: 0, x: 0, width },
                    open: { opacity: 1, x: 0, width }
                  }}
                  transition={{ type: 'just', duration: 0.3 }}
                  className='flex flex-col items-center overflow-hidden'>
                  <div className='relative w-full flex-1 before:absolute before:inset-x-1 before:inset-y-0 before:block before:rounded before:bg-primary-300'>
                    <Image
                      src={diagram3node}
                      width={32}
                      height={40}
                      alt='Node'
                      className='absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2'
                    />
                  </div>

                  {/* Line */}
                  <svg width='1' height='48' viewBox='0 0 1 48'>
                    <line
                      x1='0.5'
                      x2='0.5'
                      y1='0'
                      y2='48'
                      strokeWidth='1'
                      strokeDasharray={`${lineSize} ${lineSize}`}
                      stroke='#fff'>
                      <animate
                        attributeName='stroke-dashoffset'
                        from='0'
                        to={`-${lineSize * 2}`}
                        dur={`${lineSpeed}s`}
                        repeatCount='indefinite'
                      />
                    </line>
                  </svg>

                  {/* Arrow */}
                  <svg width='6' viewBox='0 0 3.96 2.27'>
                    <path
                      fill='#fff'
                      d='M1.76 2.2c.1.1.28.1.38 0L3.84.5a.27.27 0 1 0-.37-.38L1.95 1.64.45.12a.27.27 0 0 0-.4.38z'
                    />
                  </svg>
                </motion.div>
              )
            })}
        </div>

        <Image
          src={diagram3base}
          width={640}
          height={150}
          alt=''
          className='mt-auto h-auto w-full max-w-none'
        />
      </div>
    </ScaleToContainer>
  )
}

function DiagramFour() {
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [loopCount, setLoopCount] = useState<number>(0)

  const steps = [
    {
      delay: 400
    },
    {
      delay: 300
    },
    {
      delay: 400
    },
    {
      delay: 1000
    }
  ]
  const highlightRows = [1, 3, 5, 6]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStepIndex((old) => {
        const newIndex = old + 1
        if (newIndex >= 4) {
          setLoopCount((oldLoop) => {
            const newLoop = oldLoop + 1
            if (newLoop >= highlightRows.length) return 0
            return newLoop
          })
          return 0
        }
        return newIndex
      })
    }, steps[stepIndex].delay)

    return () => window.clearTimeout(timer)
  }, [stepIndex])

  const activeRow = highlightRows[loopCount]

  return (
    <ScaleToContainer>
      <div className='relative flex h-[266px] w-[688px] items-center gap-2 rounded-lg border border-neutral-700/80 bg-gradient-to-tr from-black/30 to-black/0 px-6'>
        <div className='flex-1 basis-0 rounded border border-neutral-600 bg-neutral-725 py-5 text-center'>
          <strong className='text-xs'>Query</strong>
        </div>
        <div className='relative overflow-hidden'>
          <div
            className={`absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary-300 duration-700 ${stepIndex === 0 ? 'left-full translate-x-2 transition-all' : 'left-0 -translate-x-2 transition-none'}`}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='41'
            height='8'
            fill='none'
            viewBox='0 0 41 8'>
            <path
              fill='#fff'
              d='M40.38 4.29c.2-.21.2-.55 0-.75L36.99.16a.53.53 0 1 0-.75.75l3 3-3 3a.53.53 0 1 0 .75.76zM40 3.9v-.53h-1.11v1.06H40zm-3.33 0v-.53h-2.23v1.06h2.23zm-4.45 0v-.53H30v1.06h2.22zm-4.44 0v-.53h-2.22v1.06h2.22zm-4.45 0v-.53h-2.22v1.06h2.22zm-4.44 0v-.53h-2.22v1.06h2.22zm-4.45 0v-.53h-2.22v1.06h2.22zM10 3.9v-.53H7.78v1.06H10zm-4.44 0v-.53H3.33v1.06h2.23zm-4.45 0v-.53H0v1.06h1.11z'
            />
          </svg>
        </div>
        <div className='flex flex-1 basis-0 flex-col gap-1 rounded border border-dashed border-neutral-600 p-2.5 text-center'>
          {Array(12)
            .fill(null)
            .map((_, i) => {
              const solid = highlightRows.includes(i)
              const isActive = stepIndex === 1 && i === activeRow
              return (
                <div
                  key={i}
                  className={`relative h-3 rounded-sm ${solid ? `bg-primary-300 transition-opacity before:absolute before:inset-0 before:block before:bg-primary-300/50 before:blur before:transition-opacity ${isActive ? '' : 'opacity-30 before:opacity-0'}` : 'border border-neutral-600 bg-neutral-750'}`}
                />
              )
            })}
          <p className='mt-1.5 text-[0.625rem]'>
            Sparse primary index in memory
          </p>
        </div>
        <div className='relative overflow-hidden'>
          <div
            className={`absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary-300 duration-700 ${stepIndex === 2 ? 'left-full translate-x-2 transition-all' : 'left-0 -translate-x-2 transition-none'}`}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='41'
            height='8'
            fill='none'
            viewBox='0 0 41 8'>
            <path
              fill='#fff'
              d='M40.38 4.29c.2-.21.2-.55 0-.75L36.99.16a.53.53 0 1 0-.75.75l3 3-3 3a.53.53 0 1 0 .75.76zM40 3.9v-.53h-1.11v1.06H40zm-3.33 0v-.53h-2.23v1.06h2.23zm-4.45 0v-.53H30v1.06h2.22zm-4.44 0v-.53h-2.22v1.06h2.22zm-4.45 0v-.53h-2.22v1.06h2.22zm-4.44 0v-.53h-2.22v1.06h2.22zm-4.45 0v-.53h-2.22v1.06h2.22zM10 3.9v-.53H7.78v1.06H10zm-4.44 0v-.53H3.33v1.06h2.23zm-4.45 0v-.53H0v1.06h1.11z'
            />
          </svg>
        </div>
        <div className='flex flex-1 basis-0 flex-col gap-1.5'>
          {Array(7)
            .fill(null)
            .map((_, i) => {
              const solid = highlightRows.includes(i)
              const isActive = stepIndex === 3 && i === activeRow
              return (
                <div
                  key={i}
                  className={`relative h-7 overflow-hidden rounded-sm ${solid ? `bg-primary-300/30 before:absolute before:inset-y-0 before:left-0 before:block before:w-20 before:-translate-x-24 before:-skew-x-12 before:bg-primary-300 before:duration-700 ${isActive ? 'before:left-full before:!translate-x-20 before:transition-all' : 'before:transition-none'}` : 'border border-neutral-600 bg-neutral-750'}`}
                />
              )
            })}
        </div>
      </div>
    </ScaleToContainer>
  )
}

function DiagramFive() {
  const [stepIndex, setStepIndex] = useState<number>(0)

  const steps = [
    // Main sequence
    {
      delay: 1000,
      arrowLeft: 'opacity-0',
      arrowRight: 'opacity-0',
      queryIcon: 'opacity-0',
      insertsMain: '-translate-y-2 opacity-0',
      insertsMv: '-translate-y-12 opacity-0',
      rowsMain: false,
      rowsMv: false
    },
    {
      delay: 1000,
      arrowLeft: '',
      arrowRight: 'opacity-0',
      queryIcon: 'opacity-0',
      insertsMain: '-translate-y-2 opacity-0',
      insertsMv: '-translate-y-12 opacity-0',
      rowsMain: false,
      rowsMv: false
    },
    {
      delay: 1000,
      arrowLeft: '',
      arrowRight: 'opacity-0',
      queryIcon: 'opacity-0',
      insertsMain: '',
      insertsMv: '-translate-y-12 opacity-0',
      rowsMain: false,
      rowsMv: false
    },
    {
      delay: 1000,
      arrowLeft: '',
      arrowRight: 'opacity-0',
      queryIcon: 'opacity-0',
      insertsMain: 'translate-y-12 opacity-0',
      insertsMv: '-translate-y-12 opacity-0',
      rowsMain: true,
      rowsMv: false
    },

    // Pause
    {
      delay: 1000,
      arrowLeft: 'opacity-0',
      arrowRight: 'opacity-0',
      queryIcon: 'opacity-0',
      insertsMain: 'translate-y-12 opacity-0',
      insertsMv: '-translate-y-12 opacity-0',
      rowsMain: true,
      rowsMv: false
    },

    // Material view sequence
    {
      delay: 1000,
      arrowLeft: 'opacity-0',
      arrowRight: '',
      queryIcon: '',
      insertsMain: 'translate-y-12 opacity-0',
      insertsMv: '-translate-y-12 opacity-0',
      rowsMain: true,
      rowsMv: false
    },
    {
      delay: 1000,
      arrowLeft: 'opacity-0',
      arrowRight: '',
      queryIcon: '',
      insertsMain: 'translate-y-12 opacity-0',
      insertsMv: '',
      rowsMain: true,
      rowsMv: false
    },
    {
      delay: 2000,
      arrowLeft: 'opacity-0',
      arrowRight: '',
      queryIcon: '',
      insertsMain: 'translate-y-12 opacity-0',
      insertsMv: 'translate-y-12 opacity-0',
      rowsMain: true,
      rowsMv: true
    }
  ]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStepIndex((old) => {
        const newIndex = old + 1
        return newIndex >= steps.length ? 0 : newIndex
      })
    }, steps[stepIndex].delay)

    return () => window.clearTimeout(timer)
  }, [stepIndex])

  const activeStep = steps[stepIndex]

  return (
    <ScaleToContainer>
      <div className='relative flex h-[608px] w-[688px] flex-col rounded-lg border border-neutral-700/80 bg-gradient-to-tr from-black/30 to-black/0'>
        <div className='grid w-full grid-cols-1 grid-rows-1 pt-6'>
          <Image
            src={diagram5inserts}
            width={688}
            height={195}
            alt=''
            className='col-start-1 row-start-1'
          />
          <Image
            src={diagram5arrowLeft}
            width={688}
            height={195}
            alt=''
            className={`col-start-1 row-start-1 transition duration-500 ${activeStep?.arrowLeft || ''}`}
          />
          <Image
            src={diagram5arrowRight}
            width={688}
            height={195}
            alt=''
            className={`col-start-1 row-start-1 transition duration-500 ${activeStep?.arrowRight || ''}`}
          />
          <Image
            src={diagram5queryIcon}
            width={688}
            height={195}
            alt=''
            className={`col-start-1 row-start-1 transition duration-500 ${activeStep?.queryIcon || ''}`}
          />
          <Image
            src={diagram5insertsMain}
            width={688}
            height={195}
            alt=''
            className={`col-start-1 row-start-1 transition duration-500 ${activeStep?.insertsMain || ''}`}
          />
          <Image
            src={diagram5insertsMv}
            width={688}
            height={195}
            alt=''
            className={`col-start-1 row-start-1 transition duration-500 ${activeStep?.insertsMv || ''}`}
          />
        </div>
        <div className='relative z-10 flex items-start gap-12 p-6 pt-0'>
          <div className='flex w-full flex-1 flex-col space-y-0.5 rounded border border-neutral-700 bg-neutral-750 p-4 text-center shadow'>
            <strong>Main table</strong>
            <p>...</p>
            <div className='h-3 rounded-sm bg-primary-300' />
            <div className='h-3 rounded-sm bg-primary-300' />
            <div className='h-3 rounded-sm bg-primary-300' />
            <p>...</p>
            <div className='h-3 rounded-sm bg-primary-300' />
            <div className='h-3 rounded-sm bg-primary-300' />
            <div className='h-3 rounded-sm bg-primary-300' />
            <p>...</p>
            <div className='h-3 rounded-sm bg-primary-300' />
            <div className='h-3 rounded-sm bg-primary-300' />
            <div className='h-3 rounded-sm bg-primary-300' />
            <AnimatePresence>
              {activeStep.rowsMain &&
                Array(5)
                  .fill(null)
                  .map((_, i) => {
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 12, marginTop: 2 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.5 }}
                        className='rounded-sm bg-primary-300'
                      />
                    )
                  })}
            </AnimatePresence>
            <p>...</p>
            <p className='text-right uppercase text-primary-400'>PB</p>
          </div>
          <div className='flex w-full flex-1 flex-col space-y-0.5 rounded border border-neutral-700 bg-neutral-750 p-4 text-center shadow'>
            <strong>Materialized View</strong>
            <p>...</p>
            <div className='h-3 rounded-sm bg-primary-300' />
            <p>...</p>
            <div className='h-3 rounded-sm bg-primary-300' />
            <AnimatePresence>
              {activeStep.rowsMv &&
                Array(2)
                  .fill(null)
                  .map((_, i) => {
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 12, marginTop: 2 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.5 }}
                        className='rounded-sm bg-primary-300'
                      />
                    )
                  })}
            </AnimatePresence>
            <p>...</p>
            <p className='text-right uppercase text-primary-400'>GB</p>
          </div>
        </div>
      </div>
    </ScaleToContainer>
  )
}
