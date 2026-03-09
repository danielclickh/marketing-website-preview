import faqs from '../../use-cases/real-time-analytics/faqs.json'
import ebayLogo from './ebay.svg'
import { CUIButton } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
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
          title: 'Migrate from Imply to ClickHouse',
          description:
            "At ClickHouse, we're not going anywhere. Looking for help with your migration? Get in touch!",
          path: '/comparison/imply'
          // image: [{ url: '/images/air-gapped-og.png' }]
        },
        ...commonProps
      }
    }
  }

export default function Page({
  customerStories,
  contactForm,
  headerData,
  seo
}: PageProps) {
  useGalaxyOnPage('implyMigrationPage')
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const handleContactSupportClick = useGalaxyOnClick(
    'imply.hero.contactSupportSelect'
  )

  return (
    <>
      <Layout seo={seo} headerData={headerData}>
        <div className='pb-24'>
          <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pt-8 sm:pt-8 md:pt-24 2xl:px-0'>
            <div className='mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
              <div className='mb-6 mr-0 flex-auto px-2 sm:px-6 md:mb-16 lg:mb-0 lg:mr-16 lg:max-w-2xl xl:px-2'>
                <div className='section_metadata'>
                  <h1 className='mb-8 text-balance font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    Migrating from <span className='text-[#0D7DE0]'>Imply</span>{' '}
                    to ClickHouse
                  </h1>
                  <div className='mb-6 max-w-2xl text-neutral-200'>
                    <div className='prose prose-neutral'>
                      <p>
                        ClickHouse is the fastest database for analytics, and
                        outshines Imply and Druid with faster query performance,
                        superior efficiency - which translates to cost savings -
                        ease of operations, and much more.
                      </p>

                      <p>
                        Contact us today for free migration services from Imply
                        to ClickHouse.
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
                      href='https://console.clickhouse.cloud/signUp?loc=imply-comparison-hero'
                      iconRight={
                        <ChevronRightIcon
                          height='16'
                          className='pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }
                      onClick={useGalaxyOnClick('imply.hero.startTrialSelect')}>
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
                      your options when migrating away from Imply.
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
                    src='/images/comparisons/imply-migration.svg'
                    width='485'
                    height='448'
                    loading='eager'
                    priority
                    alt='Imply to ClickHouse migration'
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
                  <div className='space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0'>
                    <QuoteCard
                      content={`"Druid has already been deployed in similar environments with over 100B events/day, so we were confident it could work, but after testing on sampled data we couldn’t justify the hardware costs of hundreds of nodes... 
                      
ClickHouse has a much simpler system design - all the nodes in a cluster have equal functionality and use only ZooKeeper for coordination. We built a small cluster of several nodes to start kicking the tires, and found the performance to be quite impressive."`}
                      link={{
                        href: 'https://blog.cloudflare.com/how-cloudflare-analyzes-1m-dns-queries-per-second/',
                        target: '_blank'
                      }}
                      logo={{
                        src: '/images/use-cases/real-time-analytics/cloudflare-logo.svg',
                        width: 123,
                        height: 41,
                        alt: 'Cloudflare'
                      }}
                    />
                    <QuoteCard
                      content={`"We’ve run OLAP on Druid for years, but as our platform has scaled and as traffic has increased on OLAP, we sought new solutions to reduce the cost of maintaining Druid and occasional availability challenges.

We explored ClickHouse late last year and, based on documentation and extensive benchmarking tests, it seemed to fit our events use-case well and yielded impressive numbers... We also did a cost comparison of infrastructure footprint and storage, which showed that we could cut back on our existing infrastructure used for Druid by over 90 percent."`}
                      link={{
                        href: 'https://innovation.ebayinc.com/tech/engineering/ou-online-analytical-processing/',
                        target: '_blank'
                      }}
                      logo={{
                        src: ebayLogo,
                        width: 85,
                        height: 34,
                        alt: 'eBay'
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
            <div className='section-container relative max-w-5xl pb-20'>
              <LogoCarousel logos={customerStories.logos} />
            </div>
          </div>
        </div>

        <div className='bg-shadow-element-right yellow-shadow'>
          <div className='section-container my-20 text-neutral-0 md:px-8 xl:my-44 2xl:px-0'>
            <GetStartedFree
              href='https://console.clickhouse.cloud/signUp?loc=imply-comparison-getstarted-footer'
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
