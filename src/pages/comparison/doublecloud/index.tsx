import faqs from '../../use-cases/real-time-analytics/faqs.json'
import { CUIButton } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LogoCarousel from '@/components/LogoCarousel'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import { SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ContactProps } from '@/types/contact'
import { ArrowDownIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface PageProps {
  customerStories: any
  contactForm: {
    disclaimer: string
  }
  footerData: ContactProps['footerData']
  headerData: ContactProps['headerData']
  seo: ContactProps['seo']
}

export const getStaticProps: GetStaticProps<ContactProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
    })

    const paramsCustomerStories = {
      populate: [
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    }

    const customerStoriesData = await findOne('homepage', paramsCustomerStories)

    const commonProps = await getCommonProps()

    return {
      props: {
        ...data.hero,
        customerStories: customerStoriesData.customerStories,
        seo: {
          title: 'Migrate from DoubleCloud to ClickHouse',
          description:
            "At ClickHouse, we're not going anywhere. Looking for help with your migration? Get in touch!",
          path: '/comparison/doublecloud'
          // image: [{ url: '/images/air-gapped-og.png' }]
        },
        ...commonProps
      }
    }
  }

export default function Page({
  customerStories,
  contactForm,
  footerData,
  headerData,
  seo
}: PageProps) {
  useGalaxyOnPage('doubleCloudMigrationPage')
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const handleContactSupportClick = useGalaxyOnClick(
    'doublecloud.hero.contactSupportSelect'
  )

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='pb-24'>
          <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pt-8 sm:pt-8 md:pt-24 2xl:px-0'>
            <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
              <div className='mb-6 mr-0 flex-auto px-2 sm:px-6 md:mb-16 lg:mb-0 lg:mr-16 lg:max-w-2xl xl:px-2'>
                <div className='section_metadata'>
                  <h1 className='mb-8 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    Migrating from{' '}
                    <span className='text-[#03cea4]'>DoubleCloud</span> to
                    ClickHouse
                  </h1>
                  <h2 className='font-basier text-xl font-medium leading-tight text-neutral-200'>
                    DoubleCloud is winding down. Are you facing the daunting
                    task of needing to migrate your production workloads before
                    a rapidly approaching cut-off date?{' '}
                    <span className='italic text-neutral-0'>
                      We’re here to help
                    </span>
                    .
                  </h2>
                  <HRSeparator className='my-6' />
                  <div className='mb-6 max-w-2xl text-neutral-200'>
                    <div className='prose prose-neutral'>
                      <p>
                        ClickHouse is used to power real-time analytics
                        workloads and customer-facing applications. But
                        ClickHouse outshines DoubleCloud in scalability,
                        ingestion throughput, query performance,
                        cost-efficiency, and much more.
                      </p>

                      <p>
                        Contact us today for free migration services, plus
                        additional trial credits for qualified migrations.
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-8 pt-2 md:flex-row'>
                    <CUIButton
                      type='primary'
                      onClick={() => {
                        setShowForm(!showForm)
                        handleContactSupportClick()
                      }}>
                      Get personalized support
                    </CUIButton>

                    <CUIButton
                      className='w-full'
                      type='secondary'
                      target='_blank'
                      href='https://console.clickhouse.cloud/signUp?loc=doublecloud-comparison-hero'
                      iconRight={
                        <ChevronRightIcon
                          height='16'
                          className='pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }
                      onClick={useGalaxyOnClick(
                        'doublecloud.hero.startTrialSelect'
                      )}>
                      Start a 30-day free trial
                    </CUIButton>
                  </div>
                </div>
              </div>
              {showForm ? (
                <>
                  <ArrowDownIcon className='ml-24 w-4 pb-8 md:hidden' />
                  <div className='rounded-lg border-neutral-800 bg-neutral-900 p-8 shadow-card md:w-[30.3125rem]'>
                    <SuiTitle type='h4'>
                      Enter your information and we'll contact you to discuss
                      your options when migrating away from DoubleCloud.
                    </SuiTitle>
                    <br />
                    <div className='delay-1000 duration-300 ease-in-out'>
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
                              formSuccessRef.current?.scrollIntoView()
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
                  </div>
                </>
              ) : (
                <div className='mx-auto w-96 pt-8 md:ml-auto md:w-full md:pt-0 lg:max-w-lg lg:pt-4'>
                  <Image
                    src='/images/comparisons/dc-migration.svg'
                    width='485'
                    height='448'
                    loading='eager'
                    priority
                    alt='DoubleCloud to ClickHouse migration'
                  />
                </div>
              )}
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
                  ClickHouse is the real-time database that truly shines at
                  scale. Count on blazing performance when low latency{' '}
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
                        '"At Lyft, **we ingest tens of millions of rows and execute millions of read queries in ClickHouse daily with volume continuing to increase**. On a monthly basis, this means reading and writing more than 25TB of data."'
                      }
                      logo={{
                        src: '/images/use-cases/real-time-analytics/lyft-logo.svg',
                        width: 64,
                        height: 45,
                        alt: 'Lyft'
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

        <div className='bg-shadow-element-right yellow-shadow'>
          <div className='section-container my-20 text-neutral-0 md:px-8 xl:my-44 2xl:px-0'>
            <GetStartedFree
              href='https://console.clickhouse.cloud/signUp?loc=doublecloud-comparison-getstarted-footer'
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
