import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Tilt from 'react-parallax-tilt'
import GetStartedFree from '../../../components/GetStartedFree'
import Layout from '../../../components/Layout'
import AccordionComponent from '../../../components/LoggingDiagram/Accordion'
import LogoCarousel from '../../../components/LogoCarousel'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import features from './features.json'
import quotes from './quotes.json'

interface LoggingProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<LoggingProps> =
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

    data.seo.path = '/use-cases/logging-and-metrics'
    data.seo.title =
      'Logging & Metrics with ClickHouse | ClickHouse for Logging Metrics'
    data.seo.description =
      'ClickHouse is the fastest and most resource efficient database for real-time analytics, making it the perfect fit for observability use cases.'

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  customerStories,
  seo,
  headerData,
  footerData
}: LoggingProps) {
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
        <div className='bg-contain bg-center bg-no-repeat lg:bg-speed-lines'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col xl:mt-16 xl:w-7/12'>
                  <h4 className='mb-6 w-full text-center text-base font-medium text-primary-300 lg:text-left'>
                    <Link href='/use-cases'>Use cases</Link> / Logging &amp;
                    Metrics
                  </h4>
                  <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl lg:max-w-lg lg:text-left'>
                    Logging &amp; Metrics with ClickHouse
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 text-center md:pr-16 lg:text-left'>
                    <p className='mb-6'>
                      ClickHouse is the fastest and most resource efficient
                      database for real-time analytics, making it the perfect
                      fit for observability use cases.
                    </p>
                    <p>
                      When it comes to time series event data like logs, traces,
                      and metrics, ClickHouse shines in its ability to
                      efficiently store, search, and query over years of
                      structured data, leveraging high compression rates to
                      ensure robust performance at scale. ClickHouse's expansive
                      range of analytical and aggregation functions make real
                      time analysis easy.
                    </p>
                  </SuiText>
                </div>

                <div className='mx-auto mt-4 hidden md:flex md:w-4/12'>
                  <Image
                    src='/images/logging-use-cases-hero.svg'
                    alt='Open source ClickHouse'
                    width={382}
                    height={310}
                    className='h-auto w-full min-w-[54rem] '
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto max-w-4xl px-4 pb-16 pt-16 sm:px-8 md:px-8 2xl:px-0'>
            <h2 className='text-center font-basier text-2xl font-semibold lg:text-4xl lg:leading-relaxed'>
              Discover why companies are choosing ClickHouse as their blazing
              fast{' '}
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>observability</span>
              </span>{' '}
              store
            </h2>
          </div>
          <div className='mx-auto flex max-w-5xl flex-col gap-10 pb-24 md:flex-row'>
            {features.map((feature) => {
              return (
                <div key={feature.id} className='flex-1 text-center'>
                  <Image
                    src={feature.icon}
                    width={32}
                    height={32}
                    alt={feature.content}
                    className='mx-auto '
                  />
                  <div className='rich_content px-12 pt-4 text-neutral-200'>
                    <ReactMarkdown children={feature.content} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='clip-inverted-triangle bg-neutral-725'>
          <div className='section-container max-w-7xl'>
            <div className='relative flex flex-col rounded-lg border-t-2 border-neutral-700/80 border-primary-300 bg-neutral-900 text-left text-neutral-0 shadow-lg'>
              <div className='p-10'>
                <div className='flex flex-col gap-x-6 gap-y-6 md:h-[350px] md:flex-row'>
                  {quotes.map((quote) => (
                    <Tilt
                      tiltEnable={false}
                      glareEnable={true}
                      glareMaxOpacity={0.4}
                      glareColor='rgba(251, 255, 70, 0.08)'
                      glarePosition='all'
                      className='flex-1'
                      key={quote.id}>
                      <div className='animate-fade-in relative flex h-full w-full flex-col rounded-lg border border-neutral-725 bg-neutral-900/50 p-6 px-4 text-center shadow-card hover:shadow-lg'>
                        <Image
                          src='/images/Quote.svg'
                          width={37}
                          height={28}
                          alt='Quote'
                          className='mb-4 block'
                        />
                        <SuiText color='secondary' className='text-left'>
                          {quote.content}
                        </SuiText>
                        <Link
                          href={quote.href}
                          target={quote.target}
                          className='mt-4 text-left underline'>
                          Read more &raquo;
                        </Link>
                        <Image
                          src={quote.logo}
                          width={quote.imgWidth}
                          height={quote.imgHeight}
                          alt={quote.title}
                          className='mt-20 md:mt-auto'
                        />
                      </div>
                    </Tilt>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='-mt-1 h-1 w-full bg-primary-300'></div>
        </div>
        <div className='bg-primary-300 py-12'></div>

        <div className='relative z-10 mx-auto -mt-10 bg-primary-300'>
          <div className='relative z-10 mx-auto -mt-10 max-w-7xl'>
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

        <div className='bg-neutral-725'>
          <div className='relative mx-auto flex flex-col gap-y-28 pt-12 md:px-0 md:pt-24'>
            <div className='section-container flex w-full flex-col items-center justify-between self-center'>
              <div className='flex w-full flex-col items-center'>
                <Image
                  src='/images/use-cases/logging/icon-logging.svg'
                  alt='Logging'
                  width={72}
                  height={73}
                />
                <SuiTitle type='h2' className='mb-16 mt-8 text-center'>
                  System overview
                </SuiTitle>
              </div>
              <AccordionComponent />
            </div>
          </div>

          <div className='relative mx-auto mt-12 flex flex-col gap-y-28 md:mt-24 md:px-0 '>
            <div className='section-container bg-shadow-element-right yellow-shadow flex w-full flex-col items-center justify-between self-center'>
              <div className='flex w-full flex-col items-center'>
                <Image
                  src='/images/use-cases/logging/icon-logging.svg'
                  alt='Multi-region setup'
                  width={72}
                  height={73}
                />
                <SuiTitle type='h2' className='mb-16 mt-8 text-center'>
                  Multi-region setup
                </SuiTitle>
              </div>
            </div>
          </div>
          <div
            id='regionsContainer'
            className='hide-scrollbar overflow-hidden overflow-x-scroll sm:mx-auto sm:max-w-7xl'>
            <div className='hide-scrollbar w-[800px] items-center overflow-x-scroll sm:w-auto'>
              <Image
                src='/images/use-cases/logging/regions.svg'
                alt='Multi-region setup'
                width={1200}
                height={965}
                priority
                className='mx-auto h-auto w-max'
              />
            </div>
          </div>

          <div className='section-container mt-24 flex w-full flex-col items-center justify-between self-center px-4 pb-16 md:px-8 2xl:px-0'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/use-cases/logging/icon-multi-support.svg'
                alt='  Multi-region support'
                width={72}
                height={73}
              />
              <SuiTitle type='h2' className='mt-8 mb-6'>
                Multi-region support
              </SuiTitle>

              <div className='pt-12 text-center text-xl leading-relaxed md:mx-auto md:max-w-3xl md:pt-6'>
                With the{' '}
                <span className='underline'>Distributed Table Engine</span>,
                ClickHouse offers a robust distributed cluster design - perfect
                for log management applications.
              </div>
              <div className='mt-10 flex max-w-3xl flex-col gap-10 text-center md:flex-row'>
                <div className=''>
                  By creating independent ClickHouse instances for each
                  operational region, the system can guarantee that raw,
                  uncompressed data remains within its region of origin. This
                  approach reduces the demand for cross-region data transfer, a
                  notable benefit when considering network resource utilization
                  and costs.
                </div>
                <div>
                  Cross-region queries, while possible, are selectively
                  employed. They're only initiated when the system handles
                  queries that necessitate data from remote regions. This
                  strategy effectively minimizes the unnecessary cross-region
                  traffic, improving both latency and cost-effectiveness.
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
                <div className='mb-8 mt-6 text-center text-neutral-300'>
                  For much more detailed guides about how to get started
                  building an Observability solution with ClickHouse, follow
                  along in our Blogs here:
                </div>
                <div className='bg-neutral-725 p-8'>
                  <ol className='list-inside list-decimal space-y-2 text-left'>
                    <li>
                      <Link
                        href='/blog/storing-log-data-in-clickhouse-fluent-bit-vector-open-telemetry'
                        className='underline'>
                        Building an Observability Solution with ClickHouse -
                        Part 1 - Logs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='https://clickhouse.com/docs/knowledgebase/use-clickhouse-for-log-analytics'
                        className='underline'>
                        Docs: Using ClickHouse for log analytics
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className='section-container my-44 text-neutral-0 md:px-8 2xl:px-0'>
            <GetStartedFree
              href='https://clickhouse.cloud/signUp?loc=logging-use-case-getstarted-footer'
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
