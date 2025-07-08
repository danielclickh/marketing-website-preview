import TickItem from '@/components-cleaned/TickItem'
import { CUIButton } from '@/components/ClickUI'
import GamingDiagramAndAccordion from '@/components/GamingDiagramAndAccordion'
import GetStartedFree from '@/components/GetStartedFree'
import callouts from '@/components/Industries/Gaming/callouts.json'
import faqs from '@/components/Industries/Gaming/faqs.json'
import heroCheckItems from '@/components/Industries/Gaming/hero-check-items.json'
import Layout from '@/components/Layout'
import LogoCarousel from '@/components/LogoCarousel'
import Markdown from '@/components/Markdown'
import QuoteCard from '@/components/QuoteCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

interface GamingPageProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<GamingPageProps> =
  async function getStaticProps() {
    const params = {
      populate: [
        'seo',
        'seo.image',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    }

    const data = await findOne('homepage', params)

    data.seo.path = '/industries/gaming'
    data.seo.title = 'ClickHouse for gaming analytics and telemetry'
    data.seo.description =
      'ClickHouse is the database for Gaming Analytics and Telemetry'

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function GamingIndustryPage({
  customerStories,
  seo,
  headerData,
  footerData
}: GamingPageProps) {
  useGalaxyOnPage('gamingIndustryPage')
  useEffect(() => {
    const container = document.getElementById('regionsContainer')
    if (container) {
      const middlePosition =
        container.scrollWidth / 2 - container.clientWidth / 2
      container.scrollLeft = middlePosition
    }
  }, [])
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative z-20 overflow-hidden bg-grid pb-16 pt-10'>
            <div className='container relative z-40 mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 md:bg-no-repeat md:px-8 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col xl:mt-16'>
                  <div className='w-full lg:max-w-xl xl:max-w-full'>
                    <h4 className='mb-6 w-full text-center text-base font-medium text-primary-300 lg:text-left'>
                      Industries / Gaming
                    </h4>
                    <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl lg:max-w-xl lg:text-left'>
                      The database for gaming analytics and telemetry
                    </h1>
                    <SuiText
                      size='base'
                      color='secondary'
                      className='mt-6 text-center md:pr-16 lg:text-left'>
                      <p className='mb-6 max-w-2xl font-normal'>
                        The real-time database built for high-throughput gaming
                        analytics. Process millions of in-game events per second
                        without compromising query speed.
                      </p>
                      <p className='mb-6 max-w-2xl font-bold'>
                        The real-time database that never lags.
                      </p>
                    </SuiText>
                  </div>
                  <div className='space-y-2 lg:max-w-2xl'>
                    {heroCheckItems.map((item) => {
                      return (
                        <TickItem key={item.id}>
                          <Markdown>{item.content}</Markdown>
                        </TickItem>
                      )
                    })}
                    <div className='relative z-40 !mt-8 flex gap-6'>
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='https://console.clickhouse.cloud/signUp?loc=industry-gaming'
                        target='_blank'
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                        className='w-full'>
                        Get started today
                      </CUIButton>
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href='/company/contact?loc=industry-gaming'
                        target='_self'
                        linkClass='w-full mx-auto md:mx-0 max-w-[12rem]'
                        className='w-full'>
                        Contact sales
                      </CUIButton>
                    </div>
                  </div>
                </div>
                <div className='relative z-30 mx-auto hidden items-center justify-center align-middle lg:flex'>
                  <Image
                    src='/images/industries/gaming/gaming-controller_fnl.png'
                    alt='ClickHouse Gaming'
                    width={738}
                    height={528}
                    className='h-auto w-full'
                    loading='eager'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725'>
          <div className='bg-shadow-element-left red-shadow section-container max-w-7xl'>
            <div className='flex flex-col justify-between py-16 xl:flex-row xl:px-12'>
              <div className='mb-10 xl:mb-0 xl:min-w-[540px]'>
                <Image
                  src='/images/icon-shield.svg'
                  alt='icon'
                  className='mx-auto mb-6 xl:mx-0'
                  width={72}
                  height={72}
                />
                <h2 className='text-left font-basier text-2xl font-semibold leading-relaxed lg:text-4xl xl:max-w-[515px]'>
                  Track every in-game event with 100% fidelity. Analyze player
                  behavior in{' '}
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content leading-8'>real time</span>
                  </span>
                </h2>
                <p className='mt-6 xl:max-w-[445px]'>
                  Discover why companies are choosing ClickHouse for their
                  gaming analytics.
                </p>
              </div>
              <div>
                <div className='flex flex-col gap-y-8 xl:max-w-[610px]'>
                  {faqs.map((faq) => (
                    <div
                      className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'
                      key={faq.id}>
                      <span className='pl-2 text-center text-lg text-[#B3B6BD]/60'>
                        0{faq.id}
                      </span>
                      <span className='border-r border-neutral-700/80 py-2 pl-4 text-lg'>
                        &nbsp;
                      </span>
                      <div className='pl-6'>
                        <Markdown>{faq.content}</Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='clip-inverted-triangle before:-top-40'>
            <div className='mx-auto max-w-7xl'>
              <div className='relative z-20 flex flex-col rounded-lg border-t-2 border-primary-300 bg-neutral-900 text-left text-neutral-0 shadow-lg'>
                <div className='p-10'>
                  <div className='space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0'>
                    <QuoteCard
                      link={
                        '/blog/migrating-to-clickhouse-cloud-in-just-three-months-with-no-downtime-a-120-terabyte-data-journey-and-its-benefits'
                      }
                      content={
                        '"The main benefit is saving employee time, which can now be spent on more exciting and strategic tasks. One of our administrators has about 60% of their time freed up, and our ETL engineer now saves 40% of their time."'
                      }
                      logo={{
                        src: '/images/industries/gaming/logo-azur.svg',
                        width: 123,
                        height: 40,
                        alt: 'Azur Games'
                      }}
                    />
                    <QuoteCard
                      content={
                        '"With ClickHouse, we can quickly process billions of lines of data in a short time, giving us the speed and scale we need to optimize routes and enhance the gaming experience for our users."'
                      }
                      link={
                        'https://clickhouse.com/blog/boosting-game-performance-exitlag-quest-for-a-better-data-management-system'
                      }
                      logo={{
                        src: '/images/industries/gaming/logo-exitlag.svg',
                        width: 175,
                        height: 40,
                        alt: 'ExitLag'
                      }}
                    />
                    <QuoteCard
                      content={
                        '"ClickHouse is our main real-time OLAP tool. We process around 100 million safety-related events per day, and ClickHouse enables us to act fast."'
                      }
                      link={'/videos/clickhouse-at-roblox-safety'}
                      logo={{
                        src: '/images/industries/gaming/logo-roblox.svg',
                        width: 231,
                        height: 40,
                        alt: 'Roblox'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative z-10 mx-auto bg-primary-300'>
          <div className='relative z-10 mx-auto max-w-7xl'>
            <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0'>
              <div className='flip-selection mx-auto flex flex-col text-center'>
                <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-4 pt-12 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
                  Trusted by developers that work with data at{' '}
                  <span className='tilted tilted-black'>
                    <span className='tilted-content leading-8'>scale</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center pb-20 md:gap-x-14'>
              <div className='absolute left-0 z-20 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
              <div className='absolute right-0 z-20 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
              <LogoCarousel
                logos={customerStories.logos}
                speedClass1='animate-marqueeLeft5'
                speedClass2='animate-marqueeLeft6'
              />
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 pb-24'>
          <div className='relative mx-auto pt-12 md:px-0 md:pt-24'>
            {/* Features */}
            <div className='mx-auto max-w-7xl'>
              <div className='flex w-full flex-col items-center pb-12 pt-6'>
                <Image
                  src='/images/use-cases/logging/icon-how.svg'
                  alt='System overview'
                  width={72}
                  height={73}
                />
                <SuiTitle type='h2' className='mt-8 text-center'>
                  Gaming analytics applications
                </SuiTitle>
                <p className='mx-auto mb-12 max-w-3xl px-9 pt-6 text-center text-sm'>
                  ClickHouse powers real-time analytics for the world’s largest
                  gaming platforms, delivering low-latency insights for trust &
                  safety, player behavior, and revenue optimization.
                </p>
                <div className='mb-12 flex w-full flex-col gap-6 px-8 lg:flex-row lg:px-6 xl:px-0'>
                  <div className='items-center space-y-4 rounded-md border border-neutral-0/30 bg-[rgba(62,62,62,1)] px-6 py-4 text-left lg:w-1/3'>
                    <SuiText size='lg' weight='bold' color='white'>
                      Customer intelligence
                    </SuiText>
                    <TickItem className='text-sm'>
                      Player retention and churn prediction
                    </TickItem>
                    <TickItem className='text-sm'>
                      Real-time ad tech and marketing
                    </TickItem>
                    <TickItem className='text-sm'>
                      Critical KPI monitoring on metrics such as concurrent
                      users
                    </TickItem>
                    <TickItem className='text-sm'>
                      Personalized in-game content and A/B testing with user
                      segmentation
                    </TickItem>
                  </div>
                  <div className='items-center space-y-4 rounded-md border border-neutral-0/30 bg-[rgba(62,62,62,1)] px-6 py-4 text-left lg:w-1/3'>
                    <SuiText size='lg' weight='bold' color='white'>
                      Real-time in-game analytics
                    </SuiText>
                    <TickItem className='text-sm'>
                      Real-time leaderboards and rankings
                    </TickItem>
                    <TickItem className='text-sm'>
                      Player behavior analytics and experience segmentation
                    </TickItem>
                    <TickItem className='text-sm'>
                      Live in-game event processing
                    </TickItem>
                    <TickItem className='text-sm'>
                      Trust &amp; safety monitoring
                    </TickItem>
                  </div>
                  <div className='items-center space-y-4 rounded-md border border-neutral-0/30 bg-[rgba(62,62,62,1)] px-6 py-4 text-left lg:w-1/3'>
                    <SuiText size='lg' weight='bold' color='white'>
                      Security and operations
                    </SuiText>
                    <TickItem className='text-sm'>
                      Fraud detection and anti-cheat analytics
                    </TickItem>
                    <TickItem className='text-sm'>
                      Crash analytics and performance debugging
                    </TickItem>
                    <TickItem className='text-sm'>
                      Log, key performance indicators (KPIs) and application
                      monitoring
                    </TickItem>
                    <TickItem className='text-sm'>
                      Network optimization and routing
                    </TickItem>
                  </div>
                </div>
              </div>

              {/* Diagram */}
              <div className='rounded-xl border border-neutral-700/80 bg-neutral-900/50 p-6'>
                <div className='flex w-full flex-col items-center pt-6'>
                  <Image
                    src='/images/use-cases/logging/icon-how.svg'
                    alt='System overview'
                    width={72}
                    height={73}
                  />
                  <SuiTitle type='h2' className='mt-8 text-center'>
                    ClickHouse for gaming analytics
                  </SuiTitle>
                  <p className='mx-auto mb-10 max-w-4xl px-9 pt-6 text-center'>
                    ClickHouse is purpose-built for powering real-time analytics
                    at massive scale. Track in-game events, ad performance, or
                    player behavior with instant insights and low latency—all
                    while keeping infrastructure simple.
                  </p>
                  <p className='mx-auto mb-12 max-w-3xl px-9 text-center'>
                    Our parallelized query execution engine, best-in-class
                    compression, and column-oriented design ensure that even the
                    most demanding gaming workloads run effortlessly at scale.
                  </p>
                </div>
                <div className='mx-auto pb-12 md:px-12'>
                  <GamingDiagramAndAccordion />
                </div>
              </div>

              {/* Callouts */}
              <div className='mx-auto max-w-5xl px-4 xl:px-0 xl:pr-2'>
                <div className='grid justify-between gap-20 pt-20 lg:grid-cols-2'>
                  {callouts.map((feature) => (
                    <div key={feature.id} className='px-3'>
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={32}
                        height={32}
                        className='mb-4'
                      />
                      <h3 className='mb-4 text-lg font-bold'>
                        {feature.title}
                      </h3>

                      <div className='rich_content text-base text-neutral-200'>
                        <Markdown>{feature.content}</Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-shadow-element-right yellow-shadow'>
          <div className='section-container mb-24 flex w-full pt-24 text-neutral-0 md:px-8 2xl:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center rounded-xl border border-neutral-700/80 bg-neutral-900/50 bg-right bg-no-repeat px-4 py-16 xl:px-24'>
              <div className='flex flex-col text-center'>
                <SuiTitle type='h2' color='white'>
                  Supporting{' '}
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content'>references</span>
                  </span>{' '}
                </SuiTitle>
                <div className='mx-auto mb-8 mt-6 max-w-2xl text-center text-neutral-300'>
                  For detailed guides about how to get started with ClickHouse
                  for real-time analytics workloads, follow along in our blog:
                </div>
                <div className='bg-neutral-725 p-8'>
                  <ol className='list-decimal space-y-2 text-left text-primary-300'>
                    <li>
                      <Link
                        href='/blog/real-time-event-streaming-with-confluent-cloud-clickhouse-and-clickpipes'
                        className='text-primary-300 hover:underline'>
                        Real-time event streaming with ClickHouse, Confluent
                        Cloud and ClickPipes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/using-materialized-views-in-clickhouse'
                        className='text-primary-300 hover:underline'>
                        Using Materialized Views in ClickHouse
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/working-with-time-series-data-and-functions-ClickHouse'
                        className='text-primary-300 hover:underline'>
                        Working with Time Series Data in ClickHouse
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/boosting-game-performance-exitlag-quest-for-a-better-data-management-system'
                        className='text-primary-300 hover:underline'>
                        Boosting Game Performance: ExitLag's Quest for a Better
                        Data Management System
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/migrating-to-clickhouse-cloud-in-just-three-months-with-no-downtime-a-120-terabyte-data-journey-and-its-benefits'
                        className='text-primary-300 hover:underline'>
                        How Azur Games migrated to 120TB to ClickHouse Cloud in
                        just three months
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className='section-container my-20 text-neutral-0 md:px-8 xl:my-44 2xl:px-0'>
            <GetStartedFree
              href='https://console.clickhouse.cloud/signUp?loc=industry-gaming-getstarted-footer'
              textBefore='Get started with ClickHouse'
              textSlanted='Cloud'
              textAfter='for free'
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
