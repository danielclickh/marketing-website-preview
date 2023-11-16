import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Tilt from 'react-parallax-tilt'
import { CUIButton } from '../../../components/ClickUI'
import GetStartedFree from '../../../components/GetStartedFree'
import Layout from '../../../components/Layout'
import LogoCarousel from '../../../components/LogoCarousel'
import Markdown from '../../../components/Markdown'
import AccordionComponent from '../../../components/RealTimeDiagram/Accordion'
import Feature from '../../../components/RealTimeDiagram/feature-check'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import callouts from './callouts.json'
import faqs from './faqs.json'
import features from './features.json'
import quotes from './quotes.json'

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

    data.seo.path = '/use-cases/business-intelligence'
    data.seo.title = 'Business Intelligence with ClickHouse'
    data.seo.description =
      'Say goodbye to loading spinners and lengthy report wait times. For Business Intelligence, ClickHouse unlocks faster queries at a fraction of the cost.'

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
            <div className='container relative z-40 mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 md:bg-no-repeat md:px-8 lg:min-h-[430px] 2xl:px-0'>
              <div className='flex items-center'>
                <div className='flex-col items-center xl:mt-16'>
                  <div className='w-full lg:max-w-xl xl:max-w-full'>
                    <h4 className='mb-6 w-full text-center text-base font-medium text-primary-300 lg:text-left'>
                      <Link href='/use-cases'>Use cases</Link> / Business
                      Intelligence
                    </h4>
                    <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl lg:max-w-xl lg:text-left'>
                      Business Intelligence with ClickHouse
                    </h1>
                    <SuiText
                      size='base'
                      color='secondary'
                      className='mt-6 text-center md:pr-16 lg:text-left'>
                      <p className='mb-6 max-w-2xl font-normal'>
                        Say goodbye to loading spinners and lengthy report wait
                        times. For Business Intelligence, ClickHouse unlocks
                        faster queries at a fraction of the cost.
                      </p>
                    </SuiText>
                  </div>
                  <div className='lg:max-w-2xl xl:max-w-full'>
                    <div className='relative z-40 mt-6 flex gap-6'>
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='https://clickhouse.cloud/signUp?loc=use-case-business-intelligence'
                        target='_blank'
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                        className='w-full'>
                        Get started today
                      </CUIButton>
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href='/company/contact?loc=use-case-business-intelligence'
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
                    src='/images/bi-hero.svg'
                    alt='ClickHouse'
                    width={537}
                    height={313}
                    className='h-auto w-full '
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=' bg-neutral-725 '>
          <div className='bg-shadow-element-left red-shadow section-container max-w-7xl'>
            <div className='flex flex-col justify-between py-16 xl:flex-row xl:px-12'></div>
          </div>

          <div className='clip-inverted-triangle before:-top-40'>
            <div className='mx-auto max-w-7xl'>
              <div className='relative z-20 flex flex-col rounded-lg border-t-2 border-primary-300 bg-neutral-900 text-left text-neutral-0 shadow-lg'>
                <div className='p-10'>
                  <div className='flex flex-col gap-x-6 gap-y-6 lg:flex-row'>
                    {quotes.map((quote) => (
                      <Tilt
                        tiltEnable={false}
                        glareEnable={true}
                        glareMaxOpacity={0.4}
                        glareColor='rgba(251, 255, 70, 0.08)'
                        glarePosition='all'
                        className='flex-1'
                        key={quote.id}>
                        {quote.href ? (
                          <Link href={quote.href} target={quote.target}>
                            <div className='animate-fade-in relative flex h-full w-full flex-col rounded-lg border border-neutral-725 bg-neutral-900/50 p-6 px-4 text-center shadow-card hover:bg-neutral-725/90 hover:shadow-lg'>
                              <Image
                                src='/images/Quote.svg'
                                width={37}
                                height={28}
                                alt='Quote'
                                className='mb-4 block'
                              />
                              <Markdown
                                className='min-h-auto text-left xl:min-h-[250px]'
                                children={quote.content}
                              />
                              <Image
                                src={quote.logo}
                                width={quote.imgWidth}
                                height={quote.imgHeight}
                                alt={quote.title}
                                className='mt-12 xl:mt-auto'
                              />
                            </div>
                          </Link>
                        ) : (
                          <div className='animate-fade-in relative flex h-full w-full flex-col rounded-lg border border-neutral-725 bg-neutral-900/50 p-6 px-4 text-center shadow-card hover:bg-neutral-800/90 hover:shadow-lg'>
                            <Image
                              src='/images/Quote.svg'
                              width={37}
                              height={28}
                              alt='Quote'
                              className='mb-4 block'
                            />
                            <Markdown
                              className='min-h-auto text-left xl:min-h-[250px]'
                              children={quote.content}
                            />
                            <Image
                              src={quote.logo}
                              width={quote.imgWidth}
                              height={quote.imgHeight}
                              alt={quote.title}
                              className='mt-12 xl:mt-auto'
                            />
                          </div>
                        )}
                      </Tilt>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative z-10 mx-auto bg-primary-300'>
          <div className='relative z-10 mx-auto max-w-7xl'>
            <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0 '>
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
          <div className='relative mx-auto pt-12  md:px-0 md:pt-24'>
            <div className='mx-auto max-w-7xl'>
              <div className='flex w-full flex-col items-center pt-6 pb-12'>
                <Image
                  src='/images/use-cases/logging/icon-how.svg'
                  alt='System overview'
                  width={72}
                  height={73}
                />
                <SuiTitle type='h2' className='mt-8 text-center'>
                  Real-time Applications and Dashboards
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
                      className='items-center rounded-md border border-neutral-0/30 bg-[rgba(62,62,62,1)] py-4 px-6 text-left lg:w-1/3'>
                      {features
                        .filter((feature) => feature.section === section)
                        .map((feature) => (
                          <Feature key={feature.id} feature={feature} />
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
                        <Markdown children={feature.content} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-shadow-element-right yellow-shadow '>
          <div className='section-container mb-24 flex w-full pt-24 text-neutral-0 md:px-8 2xl:px-0 '>
            <div className='mx-auto flex w-full flex-col justify-center rounded-xl border border-neutral-700/80 bg-neutral-900/50 bg-right bg-no-repeat py-16 px-4 xl:px-24'>
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
                  <ol className='list-decimal space-y-2 text-left	text-primary-300'>
                    <li>
                      <Link
                        href='/blog/asynchronous-data-inserts-in-clickhouse'
                        className='text-primary-300'>
                        Asynchronous Data Inserts in ClickHouse
                      </Link>
                    </li>

                    <li>
                      <a
                        href='/blog/real-time-event-streaming-with-confluent-cloud-clickhouse-and-clickpipes'
                        className='text-primary-300'>
                        Real-time event streaming with ClickHouse, Confluent
                        Cloud and ClickPipes
                      </a>
                    </li>
                    <li>
                      <a
                        href='/blog/building-real-time-applications-with-clickhouse-and-hex-notebook-keeper-engine'
                        className='text-primary-300'>
                        Adding Real-Time Analytics to a Supabase Application
                        With ClickHouse
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://python.langchain.com/docs/integrations/vectorstores/clickhouse'
                        className='text-primary-300'>
                        Building Real-time Analytics Apps with ClickHouse and
                        Hex
                      </a>
                    </li>

                    <li>
                      <a
                        href='/blog/using-materialized-views-in-clickhouse'
                        className='text-primary-300'>
                        Using Materialized Views in ClickHouse
                      </a>
                    </li>
                    <li>
                      <a
                        href='/blog/working-with-time-series-data-and-functions-ClickHouse'
                        className='text-primary-300'>
                        Working with Time Series Data in ClickHouse
                      </a>
                    </li>
                    <li>
                      <a
                        href='/blog/clickhouse-postgresql-change-data-capture-cdc-part-1'
                        className='text-primary-300'>
                        Change Data Capture (CDC) with PostgreSQL and ClickHouse
                        - Part 1
                      </a>
                    </li>
                    <li>
                      <a
                        href='/blog/clickhouse-postgresql-change-data-capture-cdc-part-2'
                        className='text-primary-300'>
                        Change Data Capture (CDC) with PostgreSQL and ClickHouse
                        - Part 2
                      </a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className='section-container my-20 text-neutral-0 md:px-8 xl:my-44 2xl:px-0'>
            <GetStartedFree
              href='https://clickhouse.cloud/signUp?loc=real-time-use-case-getstarted-footer'
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
