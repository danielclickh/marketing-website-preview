import callouts from './callouts.json'
import checkpoints from './checkpoints.json'
import faqs from './faqs.json'
import features from './features.json'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import LogoCarousel from '@/components/LogoCarousel'
import Markdown from '@/components/Markdown'
import QuoteCard from '@/components/QuoteCard'
import AccordionComponent from '@/components/RealTimeDiagram/Accordion'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

interface RealTimeAnalyticsPageProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<RealTimeAnalyticsPageProps> =
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

    data.seo.path = '/use-cases/real-time-analytics'
    data.seo.title = 'Real-time Analytics with ClickHouse'
    data.seo.description =
      'Learn about Real-time Analytics and how companies are using ClickHouse for their real-time analytics applications.'
    data.seo.languages = ['en', 'ja']

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function RealTimeAnalyticsPage({
  customerStories,
  seo,
  headerData,
  footerData
}: RealTimeAnalyticsPageProps) {
  useGalaxyOnPage('realTimeUseCasePage')
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
                    <Breadcrumbs className='mb-6'>
                      <Breadcrumbs.Link href='/use-cases'>
                        Use cases
                      </Breadcrumbs.Link>
                      <Breadcrumbs.Item>Real-time analytics</Breadcrumbs.Item>
                    </Breadcrumbs>
                    <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl lg:max-w-xl lg:text-left'>
                      Real-time analytics with ClickHouse
                    </h1>
                    <SuiText
                      size='base'
                      color='secondary'
                      className='mt-6 text-center md:pr-16 lg:text-left'>
                      <p className='mb-6 max-w-2xl font-normal'>
                        Ingest millions of rows per second. Handle the most
                        heavily concurrent workloads. All&nbsp;without
                        compromising query speed.
                      </p>
                    </SuiText>
                  </div>
                  <div className='lg:max-w-2xl xl:max-w-full'>
                    {checkpoints.map(({ content }, checkpointIndex) => {
                      return (
                        <TickItem
                          key={checkpointIndex}
                          className='my-4 text-neutral-200'>
                          {content}
                        </TickItem>
                      )
                    })}
                    <div className='relative z-40 mt-8 flex gap-6'>
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='https://console.clickhouse.cloud/signUp?loc=use-case-real-time-analytics'
                        target='_blank'
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                        className='w-full'>
                        Get started today
                      </CUIButton>
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href='/company/contact?loc=use-case-real-time-analytics'
                        target='_self'
                        linkClass='w-full mx-auto md:mx-0 max-w-[12rem]'
                        className='w-full'>
                        Contact sales
                      </CUIButton>
                    </div>
                  </div>
                </div>
                <div className='relative z-30 mx-auto hidden md:w-4/12 lg:flex lg:w-[400px] xl:w-[525px]'>
                  <Image
                    src='/images/use-cases/real-time-analytics/real-time-analytics-hero.svg'
                    alt='ClickHouse'
                    width={509}
                    height={397}
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
                <h2 className='text-left font-basier text-2xl font-semibold lg:text-4xl xl:max-w-[515px]'>
                  The real-time database that truly shines at scale. Count on
                  blazing performance when low latency{' '}
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content leading-8'>really</span>
                  </span>{' '}
                  matters.
                </h2>
                <p className='mt-6 xl:max-w-[445px]'>
                  Discover why companies are choosing ClickHouse for their
                  real-time analytics applications.
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
                  <div className='space-y-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0'>
                    <QuoteCard
                      content={
                        '"This year we actually exceeded a thousand active replicas. That\'s **processing hundreds of millions of inserted rows every second**, which actually corresponds to quite a significantly larger number of events because we\'ve been using a lot of sampling."'
                      }
                      logo={{
                        src: '/images/use-cases/real-time-analytics/cloudflare-logo.svg',
                        width: 123,
                        height: 41,
                        alt: 'Cloudflare'
                      }}
                    />
                    <QuoteCard
                      content={
                        '"We have multiple clusters deployed on our hardware with hundreds of hosts. Our main cluster is now geo-replicated, and we designate some replicas for read-heavy operations and others for write-heavy operations. Many of our tables are quite large, **with trillions and trillions of rows, as well as tens of columns.**"'
                      }
                      link='/blog/how-clickhouse-powers-ahrefs-the-worlds-most-active-web-crawler'
                      logo={{
                        src: '/images/use-cases/real-time-analytics/ahrefs-logo.svg',
                        width: 123,
                        height: 32,
                        alt: 'ahrefs'
                      }}
                    />
                    <QuoteCard
                      content={
                        '"We’ve had a positive experience with ClickHouse. It allowed us to scale LangSmith to production workloads and provide a service where users can log all of their data. We couldn’t have accomplished this without ClickHouse."'
                      }
                      link='/blog/langchain-why-we-choose-clickhouse-to-power-langchain'
                      logo={{
                        src: '/images/use-cases/ml-and-ds/langchain-logo-white.svg',
                        width: 240,
                        height: 43,
                        alt: 'LangChain'
                      }}
                    />
                    <QuoteCard
                      content={
                        '"In the post-evaluation of each database against our criteria (with metrics ranging from query performance to cost), **ClickHouse emerged as the unrivaled frontrunner.** It excelled across the board, even astonishingly so in certain domains, and proved more cost-efficient."'
                      }
                      link={{
                        href: 'https://medium.com/vimeo-engineering-blog/clickhouse-is-in-the-house-413862c8ac28',
                        target: '_blank'
                      }}
                      logo={{
                        src: '/images/use-cases/real-time-analytics/vimeo-logo.svg',
                        width: 140,
                        height: 30,
                        alt: 'Vimeo'
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
            <div className='mx-auto max-w-7xl'>
              <div className='flex w-full flex-col items-center pb-12 pt-6'>
                <Image
                  src='/images/use-cases/logging/icon-how.svg'
                  alt='System overview'
                  width={72}
                  height={73}
                />
                <SuiTitle type='h2' className='mt-8 text-center'>
                  Real-time applications and dashboards
                </SuiTitle>
                <p className='mx-auto mb-12 max-w-3xl px-9 pt-6 text-center text-sm'>
                  ClickHouse is used across industries to power systems and
                  applications where real-time analysis, evaluation, and
                  querying are critical.
                </p>
                <div className='mb-12 flex w-full flex-col gap-6 px-8 lg:flex-row lg:px-6 xl:px-0'>
                  {[10, 20, 30].map((section) => (
                    <div
                      key={section}
                      className='items-center space-y-6 rounded-md border border-neutral-0/30 bg-[rgba(62,62,62,1)] p-6 text-left lg:w-1/3'>
                      {features
                        .filter((feature) => feature.section === section)
                        .map(({ content }, featureIndex) => (
                          <TickItem key={featureIndex} className='text-sm'>
                            {content}
                          </TickItem>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
              <AccordionComponent />
              <div className='mx-auto max-w-5xl px-4 xl:px-0'>
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
                        href='/blog/asynchronous-data-inserts-in-clickhouse'
                        className='text-primary-300'>
                        Asynchronous Data Inserts in ClickHouse
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/real-time-event-streaming-with-confluent-cloud-clickhouse-and-clickpipes'
                        className='text-primary-300'>
                        Real-time event streaming with ClickHouse, Confluent
                        Cloud and ClickPipes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/building-real-time-applications-with-clickhouse-and-hex-notebook-keeper-engine'
                        className='text-primary-300'>
                        Adding Real-Time Analytics to a Supabase Application
                        With ClickHouse
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/using-materialized-views-in-clickhouse'
                        className='text-primary-300'>
                        Using Materialized Views in ClickHouse
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/working-with-time-series-data-and-functions-ClickHouse'
                        className='text-primary-300'>
                        Working with Time Series Data in ClickHouse
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/clickhouse-postgresql-change-data-capture-cdc-part-1'
                        className='text-primary-300'>
                        Change Data Capture (CDC) with PostgreSQL and ClickHouse
                        - Part 1
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/clickhouse-postgresql-change-data-capture-cdc-part-2'
                        className='text-primary-300'>
                        Change Data Capture (CDC) with PostgreSQL and ClickHouse
                        - Part 2
                      </Link>
                    </li>{' '}
                    <li>
                      <Link
                        href='/blog/how-cloudflare-processes-hundreds-of-millions-of-rows-per-second-with-clickhouse'
                        className='text-primary-300'>
                        How Cloudflare Processes Hundreds of Millions of Rows
                        per Second with ClickHouse
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className='section-container my-20 text-neutral-0 md:px-8 xl:my-44 2xl:px-0'>
            <GetStartedFree
              href='https://console.clickhouse.cloud/signUp?loc=real-time-use-case-getstarted-footer'
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
