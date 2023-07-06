import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Tilt from 'react-parallax-tilt'
import { CUICard } from '../../../components/ClickUI'
import GetStarted from '../../../components/GetStarted'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import LogoCarousel from '../../../components/LogoCarousel'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import features from './features.json'
import quotes from './quotes.json'
import loggingSystems from './building-a-logging-system.json'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

interface LoggingProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<LoggingProps> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.ctaButton',
        'seo',
        'seo.image',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    }

    const data = await findOne('homepage', params)

    data.seo.path = '/use-cases/logging'
    data.seo.title = 'Logging with ClickHouse | ClickHouse for Logging Metrics'
    data.seo.description =
      'ClickHouse is the fastest and most resource efficient database for real-time analytics, making it the perfect fit for Observability use cases'

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
  platforms,
  headerData,
  footerData
}: LoggingProps) {
  // Split the customerStories.logos array into two separate arrays

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat lg:bg-speed-lines'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col text-center md:mt-16 md:w-7/12 md:text-left'>
                  <h4 className='mb-6 text-base font-medium text-primary-300'>
                    <Link href='/use-cases'>Use cases</Link> / Logging &amp;
                    Metrics
                  </h4>
                  <h1 className='mb-6 max-w-md font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    Logging with ClickHouse
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 md:pr-16'>
                    <p className='mb-6'>
                      ClickHouse is the fastest and most resource efficient
                      database for real-time analytics, making it the perfect
                      fit for Observability use cases.
                    </p>
                    <p>
                      When it comes to time series events data, like logs and
                      metrics, ClickHouse shines in its ability to perform a
                      huge range of analytical functions over massive volumes of
                      data - leveraging features like high compression rates to
                      ensure robust performance at scale.
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
          <div className='container mx-auto max-w-4xl px-4 pb-16 pt-16 sm:px-8 md:px-8  2xl:px-0'>
            <h2 className='text-center font-basier text-4xl font-semibold'>
              Discover why companies are choosing ClickHouse as their blazing
              fast observability store.
            </h2>
          </div>
          <div className='mx-auto flex max-w-5xl gap-x-10 pb-24'>
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
                  <div className='rich_content px-4 pt-4 text-neutral-200'>
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
                <div className='flex h-[300px] gap-x-6 gap-y-6'>
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
                        <SuiText
                          size='sm'
                          color='secondary'
                          className='text-left'>
                          {quote.content}
                        </SuiText>
                        <Image
                          src={quote.logo}
                          width={quote.imgWidth}
                          height={quote.imgHeight}
                          alt={quote.title}
                          className='mt-auto'
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

        <div className='relative mx-auto mt-12 flex flex-col gap-y-28 md:mt-24 md:px-0 '>
          <div className='section-container bg-shadow-element-right yellow-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/use-cases/logging/icon-logging.svg'
                alt='Logging'
                width={72}
                height={73}
              />
              <SuiTitle type='h2' className='mt-8 mb-6'>
                How to build a logging system with ClickHouse
              </SuiTitle>
            </div>
            <div className='mx-auto flex w-full rounded-xl border border-neutral-700/80 bg-neutral-900/50 p-4'>
              <div className='w-1/2'>
                <Image
                  src='/images/use-cases/logging/how-to-build-a-logging-system-diagram.svg'
                  width={404}
                  height={723}
                  alt='ClickHouse is linearly scalable'
                  className='mx-auto w-full px-20 py-10'
                />
              </div>
              <div className='w-1/2'>
                <div className='h-full w-full'>
                  <div className='mx-auto w-full rounded-2xl bg-white p-2'>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                            <span>What is your refund policy?</span>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                            If you're unhappy with your purchase for any reason,
                            email us within 90 days and we'll refund you in
                            full, no questions asked.
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure as='div' className='mt-2'>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className='flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                            <span>Do you offer technical support?</span>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                            No.
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HRSeparator className='my-12 md:my-24' />

        <div className='relative mx-auto flex flex-col gap-y-28 md:mt-24'>
          <div className='section-container bg-shadow-element-left red-shadow mx-auto flex flex-col items-center justify-between self-center px-4 md:px-8 2xl:px-0 '>
            <CUICard className='p-8'>
              <div className='flex w-full justify-between'>
                <h3 className='mb-6 w-full text-center font-basier text-2xl font-semibold leading-tight md:text-left md:text-2xl'>
                  From your laptop to petabyte scale
                </h3>
                <Image
                  src='/images/clickhouse/scalable.svg'
                  width={32}
                  height={32}
                  alt='ClickHouse is linearly scalable'
                  className='h-7'
                />
              </div>

              <div className='flex flex-col gap-8 md:flex-row'>
                <div className='w-full text-center md:text-left lg:w-9/12'>
                  <SuiText size='sm' color='secondary'>
                    ClickHouse scales well both vertically and horizontally. It
                    is easily adaptable to perform on your laptop, small virtual
                    machine, a single server, or a cluster with hundreds or
                    thousands of nodes.
                  </SuiText>
                  <br />
                  <SuiText size='sm' color='secondary'>
                    There are many ClickHouse clusters consisting of multiple
                    hundreds of nodes, while the largest known ClickHouse
                    cluster is well over a thousand nodes. There are
                    installations of ClickHouse with more multiple trillion rows
                    or hundreds of terabytes of data per single node.
                  </SuiText>
                </div>
              </div>
            </CUICard>
          </div>
        </div>

        <HRSeparator className='my-12 md:my-24' />

        <div className='section-container bg-shadow-element-left red-shadow flex w-full flex-col items-center justify-between self-center px-4 pb-16 md:px-8 2xl:px-0'>
          <div className='flex w-full flex-col items-center'>
            <Image
              src='/images/clickhouse/section_scale.svg'
              alt='ClickHouse at scale'
              width={72}
              height={72}
            />
            <SuiTitle type='h2' className='mt-8 mb-6'>
              fas
            </SuiTitle>
            <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-10'>
              ClickHouse is used in a variety of industries for a broad set of
              use cases on top of both customer-facing and internally-facing
              workloads.
            </div>

            <div className='flex flex-col flex-wrap pt-12 md:mx-auto md:max-w-4xl md:flex-row md:pt-6'>
              asdf
            </div>
          </div>
        </div>

        <GetStarted platforms={platforms} />
      </Layout>
    </>
  )
}
