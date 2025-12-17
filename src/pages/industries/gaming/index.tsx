import hero from './assets/hero.png'
import logoAzur from './assets/logo-azur.svg'
import logoExitlag from './assets/logo-exitlag.svg'
import logoRoblox from './assets/logo-roblox.svg'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton } from '@/components/ClickUI'
import GamingDiagramAndAccordion from '@/components/GamingDiagramAndAccordion'
import GetStartedFree from '@/components/GetStartedFree'
import callouts from '@/components/Industries/Gaming/callouts.json'
import faqs from '@/components/Industries/Gaming/faqs.json'
import Layout from '@/components/Layout'
import LogoCarousel from '@/components/LogoCarousel'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

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

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        {/* Hero */}
        <section
          className='bg-shadow-element yellow-shadow my-16 lg:my-24'
          style={
            {
              '--top-side': '60%',
              '--right-side': '20%',
              '--left-side': 'auto'
            } as React.CSSProperties
          }>
          <div className='section-container relative z-10 flex flex-wrap justify-between gap-y-16 lg:flex-nowrap'>
            {/* Content column */}
            <div className='mx-auto w-full space-y-4 text-center text-neutral-200 lg:ml-0 lg:max-w-lg lg:text-left xl:max-w-2xl'>
              <Breadcrumbs>
                <Breadcrumbs.Link href='/industries'>
                  Industries
                </Breadcrumbs.Link>
                <Breadcrumbs.Item>Gaming</Breadcrumbs.Item>
              </Breadcrumbs>
              <SuiTitle type='h1' className='text-white md:!text-5.5xl'>
                The database for gaming analytics and telemetry
              </SuiTitle>
              <SuiText>
                The real-time database built for high-throughput gaming
                analytics. Process millions of in-game events per second without
                compromising query speed.
              </SuiText>
              <SuiText>
                <strong>The real-time database that never lags.</strong>
              </SuiText>
              <div className='!my-8 flex flex-col gap-6 sm:flex-row sm:justify-center lg:justify-start'>
                <CUIButton
                  type='primary'
                  size='lg'
                  className='w-full !px-10 sm:w-auto'
                  target='_blank'
                  href='https://console.clickhouse.cloud/signUp?loc=industry-gaming'
                  onClick={useGalaxyOnClick(
                    'gamingIndustryPage.heroCta.getStartedTodaySelect'
                  )}>
                  Get started today
                </CUIButton>
                {/*<CUIButton
                  type='secondary'
                  size='lg'
                  className='w-full !px-10 sm:w-auto'
                  target='_blank'
                  href='/company/contact?loc=industry-gaming'
                  onClick={useGalaxyOnClick(
                    'energyIndustryPage.heroCta.contactSalesSelect'
                  )}>
                  Talk to an expert
                </CUIButton>*/}
              </div>
              <ul className='space-y-4 text-left text-neutral-200'>
                <li>
                  <TickItem>
                    <strong>Power in-game analytics and player insights</strong>{' '}
                    with instant responsiveness, enabling real-time segmentation
                    based on in-game behavior.
                  </TickItem>
                </li>
                <li>
                  <TickItem>
                    <strong>
                      Optimize monetization and drive ad decisions
                    </strong>{' '}
                    with real-time event data, personalizing offers and custom
                    in-game experiences.
                  </TickItem>
                </li>
                <li>
                  <TickItem>
                    <strong>Game Performance Monitoring (GPM)</strong> - track
                    game performance, betting system reliability, logs, and
                    telemetry in real time with crash analytics and performance
                    tracking for both gaming and wagering platforms.
                  </TickItem>
                </li>
              </ul>
            </div>

            {/* Form column */}
            <div className='w-full lg:max-w-lg' id='get-in-touch'>
              <div className='relative overflow-hidden rounded-lg bg-neutral-900/80 p-6 text-center shadow-lg lg:p-8'>
                <SuiTitle type='h3' className='mb-2'>
                  Get in touch with a ClickHouse expert
                </SuiTitle>
                <SuiText className='mb-6 text-neutral-200'>
                  Tell us about your use case
                </SuiText>
                <MarketoForm
                  formId='1124'
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
                {!formLoaded && (
                  <div className='my-auto text-center'>Loading form...</div>
                )}
                {formSuccess && (
                  <div
                    ref={formSuccessRef}
                    className='absolute inset-0 z-10 my-auto flex flex-col items-center justify-center bg-neutral-900/90 text-center backdrop-blur'>
                    <h3 className='text-2xl font-bold'>Thank you!</h3>
                    <p className='mt-2 text-neutral-200'>
                      We'll be in touch shortly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

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
                        src: logoAzur,
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
                        src: logoExitlag,
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
                        src: logoRoblox,
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
            <div className='section-container relative max-w-5xl pb-16'>
              <LogoCarousel logos={customerStories.logos} />
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
                  ClickHouse powers real-time analytics for the world's largest
                  gaming and betting platforms, delivering low-latency insights
                  for trust & safety, player behavior, gambling compliance, and
                  revenue optimization across both gaming and wagering
                  activities.
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
