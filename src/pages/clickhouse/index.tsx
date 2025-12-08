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
import imageLightweightUpdatesAlt from './assets/image-lightweight-updates-alt.png'
import imageLightweightUpdates from './assets/image-lightweight-updates.png'
import imageProjections from './assets/image-projections.png'
import imageReplication from './assets/image-replication.png'
import imagesharding from './assets/image-sharding.png'
import imageSqlSupport from './assets/image-sql-support.png'
import imageVectorizedEngine from './assets/image-vectorized-engine.png'
import joinsDiagram1Mask from './assets/joins-diagram-1-mask.svg'
import joinsDiagram1 from './assets/joins-diagram-1.svg'
import joinsDiagram2Mask from './assets/joins-diagram-2-mask.svg'
import joinsDiagram2 from './assets/joins-diagram-2.svg'
import joinsDiagram3Mask from './assets/joins-diagram-3-mask.svg'
import joinsDiagram3 from './assets/joins-diagram-3.svg'
import joinsDiagram4Mask from './assets/joins-diagram-4-mask.svg'
import joinsDiagram4 from './assets/joins-diagram-4.svg'
import joinsDiagram5Mask from './assets/joins-diagram-5-mask.svg'
import joinsDiagram5 from './assets/joins-diagram-5.svg'
import joinsDiagramBase from './assets/joins-diagram-base.svg'
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
import AnimatedDataArc from '@/components-cleaned/AnimatedDataArc'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
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
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryMarketingVideo } from '@/types/strapi'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
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
  const [citationCopied, setCitationCopied] = useState(false)

  const handleCitationCopy = () => {
    window.navigator.clipboard
      .writeText(
        `TY  - JOUR
AU  - Schulze, Robert
AU  - Schreiber, Tom
AU  - Yatsishin, Ilya
AU  - Dahimene, Ryadh
AU  - Milovidov, Alexey
PY  - 2024/11/08
SP  - 3731
EP  - 3744
T1  - ClickHouse - Lightning Fast Analytics for Everyone
VL  - 17
DO  - 10.14778/3685800.3685802
JO  - Proceedings of the VLDB Endowment
ER  -  `
      )
      .finally(() => {
        setCitationCopied(true)
      })
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCitationCopied(false)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [citationCopied])

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
                and ML/GenAI workloads.
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
                      className='text-primary-300 transition-colors hover:underline'>
                      Windows
                    </Link>
                    ,{' '}
                    <Link
                      href='https://hub.docker.com/r/clickhouse/clickhouse-server/'
                      className='text-primary-300 transition-colors hover:underline'>
                      Docker
                    </Link>{' '}
                    or see other{' '}
                    <Link
                      href='/docs/en/install'
                      className='text-primary-300 transition-colors hover:underline'>
                      install options
                    </Link>
                    . Or try without installing in our{' '}
                    <Link
                      href='https://sql.clickhouse.com'
                      className='text-primary-300 transition-colors hover:underline'>
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
                          'Accelerate your aggregations, shrink your storage footprint, and simplify your architecture by scaling vertically.',
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
                          'How Lyft optimized performance and cut infrastructure costs with ClickHouse.',
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
                          'Run faster cold queries, tap into broader integrations, and avoid CSP lock-in.',
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
                  Frequent
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

      <section className='section-container my-16 space-y-16 lg:my-24 lg:space-y-24'>
        <SuiTitle type='h2' className='text-center'>
          Powerful ClickHouse features
        </SuiTitle>
        <FeatureSection image={<JoinsDiagram />}>
          <SuiTitle type='h3' className='text-white md:!text-4xl'>
            Full JOIN support
          </SuiTitle>
          <p>
            ClickHouse fully supports all standard join types and adds powerful
            non-equality capabilities such as ASOF join.
          </p>
          <p>
            <Link
              href='/videos/clickhouse-and-joins'
              className='text-primary-300 hover:underline'>
              Continuous improvements to join algorithms
            </Link>{' '}
            deliver market leading performance, allowing users to query across
            normalized datasets without extra preprocessing - keeping analytics
            flexible and removing the need for forced denormalization.
          </p>
        </FeatureSection>

        <FeatureSection direction='rtl' image={<ClickhouseAtScale />}>
          <SuiTitle type='h3' className='text-white md:!text-4xl'>
            Built for high concurrency
          </SuiTitle>
          <p>
            Cloud-native architecture enables effective data tiering and
            scaling, resulting in the leading price / performance ratio on the
            market.
          </p>
        </FeatureSection>

        <FeatureSection
          image={
            <Image
              src={imageLightweightUpdatesAlt}
              width={1126 / 2}
              height={634 / 2}
              alt=''
            />
          }>
          <SuiTitle type='h3' className='text-white md:!text-4xl'>
            Lightweight data changes
          </SuiTitle>
          <p>
            ClickHouse delivers fast, reliable handling of updates and deletes
            through lightweight mutations that modify only the affected rows
            rather than rewriting entire datasets.
          </p>
          <p>
            Patched parts allow efficient, fine-grained changes while preserving
            performance, making it practical to support evolving data, late
            arriving events, and workloads that require correction of historical
            records.
          </p>
        </FeatureSection>

        <FeatureSection
          direction='rtl'
          image={
            <Image
              src={imageJsonSupport}
              width={1376 / 2}
              height={408 / 2}
              alt=''
            />
          }>
          <SuiTitle type='h3' className='text-white md:!text-4xl'>
            Flexible schema-on-write <br className='hidden xl:block' />
            with JSON
          </SuiTitle>
          <p>
            ClickHouse lets you ingest semi-structured data without schema
            explosion, combining JSON flexibility with the full performance of a
            columnar database.
          </p>
        </FeatureSection>
      </section>

      <HRSeparator />

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
                  Contact us
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
                handle: 'Infinitely scalable for petabyte workloads',
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
                handle: 'Powerful data operations',
                content: (
                  <div className='w-full space-y-4'>
                    <p>
                      ClickHouse offers advanced features to manipulate, filter,
                      and transform data efficiently. Materialized views can be
                      refreshable or incremental, with incremental views
                      shifting compute from query time to insert time and
                      dramatically accelerating repeated queries.
                    </p>
                    <DiagramFive />
                    <p>
                      Projections let you maintain the same data sorted in
                      different ways, enabling ClickHouse to optimize for
                      multiple access patterns and deliver consistently fast
                      queries.
                    </p>
                    <Image
                      src={imageProjections}
                      width={1376 / 2}
                      height={848 / 2}
                      alt=''
                    />
                  </div>
                )
              },
              {
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
                      height={760 / 2}
                      alt=''
                    />
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
                      and provides either immediate or eventual consistency
                      depending on requirements. This lightweight design enables
                      replication across availability zones or even regions with
                      high latencies, delivering high durability without heavy
                      overhead.
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
                handle: 'Ease of use and interoperability',
                content: (
                  <div className='w-full space-y-4'>
                    <p>
                      With support for 70+ file formats for ingestion and
                      output, ClickHouse delivers unmatched interoperability.
                    </p>
                    <Image
                      src={imageSqlSupport}
                      width={1376 / 2}
                      height={480 / 2}
                      alt=''
                    />
                    <p>
                      The ability to read and write open table and lake formats
                      such as Parquet, Iceberg, and Delta, with catalog
                      integrations like AWS Glue and Unity making them seamless
                      to query - bringing the performance of ClickHouse’s query
                      engine to your data lake.
                    </p>
                    <Image
                      src={imageInteroperability}
                      width={1376 / 2}
                      height={666 / 2}
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
                  </div>
                )
              }
            ]}
          />
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
              className='group w-full !border-neutral-800 !bg-neutral-800 !text-white hover:!bg-neutral-725 md:mx-auto md:w-auto md:!px-10'>
              View our benchmarks
            </CUIButton>
          </div>
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

      {/* Academic paper */}
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
            of the art and is the best way to learn how its internals work. For
            deeper insights, explore our in-depth{' '}
            <Link
              href='/blog?category=engineering'
              className='text-primary-300 hover:underline'>
              articles and blogs
            </Link>
            .
          </p>
          <div className='flex flex-col gap-4 md:flex-row'>
            <CUIButton
              href='https://www.vldb.org/pvldb/vol17/p3731-schulze.pdf'
              target='_blank'
              onClick={useGalaxyOnClick(
                'productOpenSourcePage.academicPaper.readSelect'
              )}
              type='primary'
              size='lg'
              className='w-full lg:!px-8'>
              Read our academic paper
            </CUIButton>
            <CUIButton
              onClick={() => {
                useGalaxyOnClick(
                  'productOpenSourcePage.academicPaper.citationSelect'
                )()
                handleCitationCopy()
              }}
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
              {citationCopied ? 'Copied!' : 'Copy citation'}
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

function FeatureSection({
  image,
  children,
  direction = 'ltr'
}: {
  image: React.ReactNode
  children: React.ReactNode
  direction?: 'ltr' | 'rtl'
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-x-16 ${
        direction === 'rtl' ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}>
      <div className='mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
        <div className='space-y-4 border-primary-300 text-neutral-200 md:border-l-4 md:pl-8'>
          {children}
        </div>
      </div>
      <div className='flex w-full items-center justify-center md:w-1/2'>
        {image}
      </div>
    </div>
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
          stretch: 60, // negative to pull sides under center
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
            slidesPerView: 2.85
          }
        }}>
        {videos.map(({ title, youtubeId, thumbnail }, videoIndex) => {
          return (
            <SwiperSlide
              key={videoIndex}
              className='bg-neutral-900 [&:not(.swiper-slide-active)]:cursor-pointer'
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
                  className={`transition-opacity ${isVisible || isActive ? '' : 'opacity-0'} ${isActive ? '' : 'pointer-events-none opacity-50'}`}
                  playButtonClassName={`!transition-all ${isActive ? '' : 'opacity-0'}`}
                  thumbnail={
                    <Image
                      src={thumbnail}
                      width={1280 / 2}
                      height={720 / 2}
                      loading='eager'
                      alt={`Why is clickhouse so fast. ${title}`}
                      style={{
                        transform:
                          'translateZ(0px)' /* Fixes flashing bug on iOS Safari */
                      }}
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
              const isFirstActive = steps[stepIndex] && firstChartIndex === i
              const isSecondActive = steps[stepIndex] && secondChartIndex === i
              return (
                <Fragment key={i}>
                  <div className='col-start-1 row-start-1 flex'>
                    <Image
                      {...chart}
                      alt=''
                      className={`m-auto transition duration-300 ${isFirstActive ? '' : 'translate-y-4 opacity-0'}`}
                    />
                  </div>
                  <div className='col-start-2 row-start-1 flex'>
                    <Image
                      {...chart}
                      alt=''
                      className={`m-auto transition duration-300 ${isSecondActive ? '' : 'translate-y-4 opacity-0'}`}
                    />
                  </div>
                </Fragment>
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

function ClickhouseAtScale() {
  function Tile() {
    return (
      <div className='flex size-16 items-center justify-center rounded-md border border-neutral-700/80 bg-neutral-900 p-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='44'
          height='44'
          fill='none'
          viewBox='0 0 44 44'>
          <path
            stroke='#dfdfdf'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M33 9.17a3.67 3.67 0 0 1 3.67 3.66v15.63q0 .88.39 1.65L39 34a1.83 1.83 0 0 1-1.65 2.66H6.64A1.83 1.83 0 0 1 4.99 34l1.95-3.9q.4-.77.4-1.65V12.83A3.67 3.67 0 0 1 11 9.17zm3.77 20.14H7.23'
          />
        </svg>
      </div>
    )
  }

  return (
    <ScaleToContainer scaleUp={false}>
      <div className='grid size-[537px] grid-cols-3 grid-rows-3'>
        {/* Top left */}
        <div className='relative flex items-center justify-center'>
          <Tile />
          <AnimatedDataArc
            direction='to-bottom-right'
            duration={3}
            className='absolute left-1/2 top-1/2 translate-y-8'
          />
        </div>

        {/* Top center */}
        <div className='flex items-start justify-center'>
          <div className='relative z-10 mt-6 size-max'>
            <Tile />
            <AnimatedDataLine
              size={115}
              direction='down'
              className='absolute left-1/2 top-full -translate-x-1/2'
            />
          </div>
          <div className='relative -ml-4 -mt-4 size-max opacity-20'>
            <Tile />
            <AnimatedDataLine
              size={144}
              delay={0.2}
              direction='down'
              className='absolute left-1/2 top-full -translate-x-1/2'
            />
          </div>
        </div>

        {/* Top right */}
        <div className='relative flex items-center justify-center'>
          <Tile />
          <AnimatedDataArc
            direction='to-bottom-left'
            duration={4}
            className='absolute right-1/2 top-1/2 translate-y-8'
          />
        </div>

        {/* Middle left */}
        <div className='flex items-center'>
          <div className='relative size-max'>
            <Tile />
            <AnimatedDataLine
              size={124}
              direction='right'
              className='absolute left-full top-1/2 -translate-y-1/2'
            />
          </div>
        </div>

        {/* Middle center */}
        <div className='relative'>
          <div className='absolute inset-0 z-0 animate-fadeInOut bg-primary-300/60 blur-xl' />
          <div className='absolute inset-0 z-10 flex rounded-lg border-2 border-primary-300 bg-neutral-750 bg-gradient-to-br from-primary-300/20 to-primary-300/40'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='104'
              height='113'
              fill='none'
              viewBox='0 0 104 113'
              className='m-auto'>
              <path
                fill='#fff'
                d='M17 .8c0-.43.37-.8.81-.8h6.16c.44 0 .8.37.8.8v68.4a.8.8 0 0 1-.8.8H17.8a.8.8 0 0 1-.8-.8zm15.54 0c0-.43.37-.8.81-.8h6.16c.44 0 .8.37.8.8v68.4a.8.8 0 0 1-.8.8h-6.16a.8.8 0 0 1-.8-.8zm15.54 0c0-.43.37-.8.81-.8h6.16c.44 0 .8.37.8.8v68.4a.8.8 0 0 1-.8.8h-6.16a.8.8 0 0 1-.8-.8zM63.7.8c0-.43.36-.8.8-.8h6.16c.44 0 .8.37.8.8v68.4a.8.8 0 0 1-.8.8H64.5a.8.8 0 0 1-.8-.8zm15.54 27.27c0-.44.36-.8.8-.8h6.16c.44 0 .8.36.8.8V42a.8.8 0 0 1-.8.8h-6.16a.8.8 0 0 1-.8-.8zM6.8 99.38q-1.06 0-1.9.38a4 4 0 0 0-1.44 1.08 5 5 0 0 0-.9 1.74q-.3 1.02-.3 2.3 0 1.68.5 2.92a4 4 0 0 0 1.5 1.88q1 .66 2.52.66.92 0 1.76-.16a18 18 0 0 0 1.74-.46v1.86q-.84.32-1.72.46-.88.16-2.04.16-2.18 0-3.64-.9a5.5 5.5 0 0 1-2.16-2.56 10 10 0 0 1-.72-3.88q0-1.62.44-2.96.46-1.36 1.32-2.34a6 6 0 0 1 2.12-1.5 8 8 0 0 1 2.94-.54 9.4 9.4 0 0 1 4 .88l-.8 1.8q-.7-.32-1.52-.56a6 6 0 0 0-1.7-.26M15.24 112h-2.12V96.8h2.12zm5.45-10.78V112h-2.12v-10.78zm-1.04-4.1q.48 0 .84.28t.36.94q0 .64-.36.94-.36.28-.84.28-.52 0-.88-.28-.34-.3-.34-.94-.01-.66.34-.94t.88-.28m8.7 15.08q-1.47 0-2.6-.58a4 4 0 0 1-1.74-1.8 7 7 0 0 1-.62-3.14q0-2 .66-3.24a4.3 4.3 0 0 1 1.82-1.82q1.17-.6 2.64-.6.9 0 1.68.2.81.18 1.32.42l-.64 1.72a10 10 0 0 0-1.2-.38 5 5 0 0 0-1.18-.16q-1 0-1.66.44-.63.41-.96 1.28-.3.84-.3 2.12 0 1.22.32 2.06.33.84.94 1.28.65.42 1.58.42a5.6 5.6 0 0 0 2.86-.72v1.84q-.57.35-1.26.5-.67.16-1.66.16m7.57-7.8q0 .42-.04.96-.02.54-.06 1h.06l.38-.48.48-.6.44-.52 3.3-3.54h2.46l-4.34 4.62 4.62 6.16h-2.5l-3.56-4.82-1.24 1.04V112h-2.1V96.8h2.1zm20.45 7.6h-2.16v-6.52H47.4V112h-2.16V97.72h2.16v5.92h6.82v-5.92h2.16zm13.08-5.4q0 1.35-.36 2.38-.36 1.05-1.02 1.76-.66.72-1.6 1.1a6 6 0 0 1-4.12 0 4.6 4.6 0 0 1-2.64-2.86q-.38-1.05-.38-2.4 0-1.79.6-3.02a4.3 4.3 0 0 1 1.76-1.88 5.4 5.4 0 0 1 2.72-.66q1.49 0 2.6.66a4.4 4.4 0 0 1 1.78 1.88q.66 1.24.66 3.04m-7.94 0q0 1.2.3 2.08.3.86.94 1.32.65.45 1.64.46 1 0 1.64-.46t.94-1.32q.3-.88.3-2.08 0-1.24-.32-2.08-.3-.84-.94-1.28-.62-.45-1.64-.46-1.5 0-2.18 1t-.68 2.82m19.91-5.38V112h-1.7l-.3-1.42h-.1a3 3 0 0 1-.88.92q-.54.36-1.18.52-.65.18-1.32.18-1.26 0-2.14-.4a3 3 0 0 1-1.32-1.28 5 5 0 0 1-.44-2.24v-7.06h2.14v6.74q0 1.26.52 1.88.54.62 1.66.62t1.76-.44q.65-.45.9-1.28.28-.86.28-2.06v-5.46zm10.48 7.74q0 1.06-.52 1.78t-1.5 1.1q-.98.36-2.36.36-1.15 0-1.96-.18a7 7 0 0 1-1.48-.48v-1.86q.72.34 1.66.62a7 7 0 0 0 1.84.26q1.2 0 1.72-.38.54-.38.54-1.02 0-.36-.2-.64-.2-.3-.76-.6-.55-.32-1.6-.72a17 17 0 0 1-1.74-.82q-.72-.41-1.1-.98a2.7 2.7 0 0 1-.38-1.48q0-1.4 1.12-2.14 1.14-.75 3-.76.97 0 1.84.2.87.17 1.7.56l-.7 1.62q-.46-.22-.96-.36-.48-.16-.98-.26-.48-.1-1-.1-.96 0-1.46.3t-.5.84q0 .38.22.66.24.28.82.56.57.28 1.58.68 1 .38 1.7.78.72.4 1.08.98.38.58.38 1.48m6.76-7.94q1.43 0 2.45.6 1.01.59 1.56 1.68.55 1.1.55 2.6v1.16h-7.24q.05 1.65.86 2.54.84.88 2.34.88 1.05 0 1.84-.18.82-.2 1.69-.58v1.76a8 8 0 0 1-3.6.72q-1.57 0-2.77-.62a4.5 4.5 0 0 1-1.88-1.84 6.4 6.4 0 0 1-.66-3.04q0-1.82.6-3.08a4.5 4.5 0 0 1 4.26-2.6m0 1.64q-1.14 0-1.84.74-.68.75-.8 2.1h5.09q0-.84-.27-1.48a2 2 0 0 0-.8-1 2.4 2.4 0 0 0-1.38-.36'
              />
            </svg>
          </div>
        </div>

        {/* Middle right */}
        <div className='flex items-end justify-end'>
          <div className='relative size-max opacity-20'>
            <Tile />
            <AnimatedDataArc
              direction='to-top-left'
              height={40}
              width={144}
              className='absolute bottom-full right-1/2 -translate-x-0.5'
            />
          </div>
        </div>

        {/* Bottom Left */}
        <div className='flex flex-col items-end'>
          <div className='relative mr-4 mt-1 size-max'>
            <AnimatedDataArc
              direction='to-top-right'
              duration={3}
              height={40}
              width={52}
              className='absolute bottom-full left-1/2 -translate-x-0.5'
            />
            <Tile />
          </div>
          <div className='relative mr-8 mt-4 size-max opacity-20'>
            <AnimatedDataArc
              reverse={true}
              direction='to-bottom-left'
              duration={3.5}
              height={150}
              width={64}
              className='absolute bottom-1/2 left-full translate-y-0.5'
            />
            <Tile />
          </div>
        </div>

        {/* Bottom center */}
        <div className='flex items-end justify-center'>
          <div className='relative size-max'>
            <Tile />
            <AnimatedDataLine
              size={115}
              direction='up'
              className='absolute bottom-full left-1/2 -translate-x-1/2'
            />
          </div>
        </div>

        {/* Bottom right */}
        <div className='flex flex-col'>
          <div className='relative ml-4 mt-1 size-max'>
            <AnimatedDataArc
              direction='to-top-left'
              duration={3.5}
              height={80}
              width={52}
              className='absolute bottom-full right-1/2 translate-x-0.5'
            />
            <Tile />
          </div>
          <div className='relative mt-9 size-max opacity-20'>
            <AnimatedDataArc
              reverse={true}
              direction='to-bottom-right'
              duration={3.5}
              height={150}
              width={30}
              className='absolute bottom-1/2 right-full translate-y-0.5'
            />
            <Tile />
          </div>
        </div>
      </div>
    </ScaleToContainer>
  )
}

function JoinsDiagram() {
  const [stepIndex, setStepIndex] = useState(0)

  const steps: Array<{
    image: StaticImageData
    mask: StaticImageData
  }> = [
    {
      image: joinsDiagram1,
      mask: joinsDiagram1Mask
    },
    {
      image: joinsDiagram2,
      mask: joinsDiagram2Mask
    },
    {
      image: joinsDiagram3,
      mask: joinsDiagram3Mask
    },
    {
      image: joinsDiagram4,
      mask: joinsDiagram4Mask
    },
    {
      image: joinsDiagram5,
      mask: joinsDiagram5Mask
    }
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
  }, [steps.length])

  const activeStepMask: undefined | string = steps[stepIndex]?.mask?.src

  return (
    <ScaleToContainer scaleUp={false}>
      <div
        className='grid grid-cols-1 grid-rows-1'
        style={{
          width: 266 * 1.5,
          height: 154 * 1.5
        }}>
        <Image
          src={joinsDiagramBase}
          width={266}
          height={154}
          alt=''
          className='col-start-1 row-start-1 h-auto w-full max-w-none'
        />
        {steps.map((step, index) => {
          return (
            <Image
              src={step.image}
              width={266}
              height={154}
              alt=''
              className={`col-start-1 row-start-1 h-auto w-full max-w-none transition-opacity ${stepIndex === index ? '' : 'opacity-0'}`}
            />
          )
        })}
        <div
          className='relative col-start-1 row-start-1 overflow-hidden'
          style={{
            maskSize: '100% 100%',
            maskImage: activeStepMask ? `url(${activeStepMask})` : 'none'
          }}>
          <div
            className={`absolute inset-y-0 left-0 w-20 -translate-x-24 -skew-x-12 bg-primary-300 duration-700 ${activeStepMask ? 'left-full !translate-x-20 transition-all' : 'opacity-0 transition-none'}`}
          />
        </div>
      </div>
    </ScaleToContainer>
  )
}
