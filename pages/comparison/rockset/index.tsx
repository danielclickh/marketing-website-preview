import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import GetStartedFree from '../../../components/GetStartedFree'
import GrowingCommunity from '../../../components/GrowingCommunity'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import MarketoForm from '../../../components/MarketoForm'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import quotes from '../../use-cases/real-time-analytics/quotes.json'
import faqs from '../../use-cases/real-time-analytics/faqs.json'
import Tilt from 'react-parallax-tilt'
import { SuiButton, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { ContactProps } from '../../../types/contact'
import { Button } from '@clickhouse/click-ui'
import LogoCarouselItem from '../../../components/LogoCarousel/CarouselItem'

interface DriftAPI {
  startInteraction: (options: { interactionId: number }) => void
}

interface DriftWindow extends Window {
  drift: {
    api: DriftAPI
  }
}

// Tell TypeScript that when we reference `window`, we mean the extended type with `drift` on it
declare var window: DriftWindow

export const getStaticProps: GetStaticProps<ContactProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: [
        'hero',
        'hero.contactForm',
        'seo',
        'seo.image',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    })

    const commonProps = await getCommonProps()

    return {
      props: {
        ...data.hero,
        seo: {
          title: 'Migrate from Rockset to ClickHouse',
          description:
            "At ClickHouse, we're not going anywhere. Looking for help with your migration? Get in touch!",
          path: '/comparison/rockset'
          // image: [{ url: '/images/air-gapped-og.png' }]
        },
        ...commonProps
      }
    }
  }

interface PageProps {
  customerStories: any
  contactForm: {
    disclaimer: string
  }
  footerData: ContactProps['footerData']
  headerData: ContactProps['headerData']
  seo: ContactProps['seo']
}

export default function Page({
  customerStories,
  contactForm,
  footerData,
  headerData,
  seo
}: PageProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='pt-10'>
          <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pt-24 sm:px-8 2xl:px-0'>
            <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
              <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
                <div className='section_metadata '>
                  <h1 className='mb-8 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    Migrating from <span className='text-[#63C0DD]'>[</span>
                    <span className='text-[#E5C3FF]'>Rockset</span>
                    <span className='text-[#63C0DD]'>]</span> to ClickHouse
                  </h1>
                  <h2 className='mb-6 font-basier text-xl font-medium leading-tight text-neutral-200'>
                    [Rockset] is being deprecated. Are you facing the daunting
                    task of needing to migrate your production workloads before
                    a rapidly approaching cut-off date? We’re here to help.
                  </h2>
                  <div className='mx-auto mb-6 max-w-2xl text-neutral-200'>
                    <div className='prose prose-neutral'>
                      <p>
                        ClickHouse and Rockset are both used to power real-time
                        analytics workloads and customer-facing applications.
                        But ClickHouse outshines Rockset in scalability,
                        ingestion throughput, query performance,
                        cost-efficiency, and much more.
                      </p>

                      <p>
                        Contact us today to learn more about how ClickHouse
                        compares to Rockset, and how our dedicated experts can
                        help you seamlessly transition to ClickHouse with free
                        migration services.
                      </p>
                    </div>
                  </div>
                  <div className='flex pt-8'>
                    <SuiButton
                      type='primary'
                      onClick={() => setShowForm(!showForm)}>
                      Get personalized support
                    </SuiButton>

                    <SuiButton type='empty' color='primary'>
                      Start a 30-day free trial
                    </SuiButton>
                  </div>
                </div>
              </div>
              {showForm ? (
                <div className='rounded-lg border border-neutral-800 bg-neutral-900 p-8 shadow-card duration-300 ease-in-out lg:max-w-lg'>
                  {!formLoaded && (
                    <div className='text-center'>Loading form...</div>
                  )}
                  {!formSuccess && (
                    <MarketoForm
                      formId='1213'
                      disclaimer={contactForm.disclaimer}
                      onLoad={(formObject) => {
                        formObject.addHiddenFields({
                          formReferrer: window.location.href
                        })
                        setFormLoaded(true)
                      }}
                      onSuccess={() => {
                        setFormSuccess(true)

                        // Delay needed to allow the ref to update before scrolling
                        setTimeout(() => {
                          formSuccessRef.current?.scrollIntoView({
                            behavior: 'smooth'
                          })
                        }, 10)

                        return false // Stops page from reloading
                      }}
                    />
                  )}

                  {formSuccess && (
                    <div ref={formSuccessRef} className='text-center'>
                      <h3 className='text-2xl font-bold'>Thank you!</h3>
                      <p className='mt-2 text-neutral-200'>
                        We'll be in touch.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className='ml-auto w-full lg:max-w-lg'>
                  <Image
                    src='/images/comparisons/rockset-migration-2.svg'
                    width='485'
                    height='448'
                    alt='clickhouse to rockset migration'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <HRSeparator className='my-24' />
        <div className=' bg-neutral-725 '>
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
                        <Markdown children={faq.content} />
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
                  <div className='flex flex-col gap-x-6 gap-y-6 lg:flex-row'>
                    {quotes.map((quote) => (
                      <>
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
                                  className='min-h-auto text-left xl:min-h-[280px]'
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
                      </>
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
              {/* <LogoCarouselItem
                logos={customerStories.logos}
                speedClass1='animate-marqueeLeft5'
                speedClass2='animate-marqueeLeft6'
              /> */}
            </div>
          </div>
        </div>

        <div className='bg-shadow-element-right yellow-shadow '>
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
