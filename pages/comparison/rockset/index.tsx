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
import AccordionComponent from '../../../components/RealTimeDiagram/Accordion'
import Feature from '../../../components/RealTimeDiagram/feature-check'
import features from '../../use-cases/real-time-analytics/features.json'
import callouts from '../../use-cases/real-time-analytics/callouts.json'
import { SuiButton, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { ContactProps } from '../../../types/contact'
import { Button } from '@clickhouse/click-ui'

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
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
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
  contactForm: {
    disclaimer: string
  }
  footerData: ContactProps['footerData']
  headerData: ContactProps['headerData']
  seo: ContactProps['seo']
}

export default function Page({
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
                    Migrating from{' '}
                    <span className='text-[#E5C3FF]'>[Rockset]</span> to
                    ClickHouse
                  </h1>
                  <h2 className='mb-6 font-basier text-xl font-medium leading-tight text-neutral-200'>
                    [Rockset] is being deprecated. Are you facing the daunting
                    task of needing to migrate your production workloads before
                    a rapidly approaching cut-off date? We’re here to help.
                  </h2>
                  <div className='mx-auto mb-6 max-w-2xl text-neutral-200'>
                    <div className='prose prose-neutral'>
                      <p>
                        ClickHouse and Rocksest are both used to power real-time
                        analytics workloads and customer-facing applications.
                        But ClickHouse outshines Rockset in scalability,
                        ingestion throughput, query performance,
                        cost-efficiency, and much more.
                      </p>

                      <p>
                        Contact us today to learn more about how ClickHouse
                        compares to Rockset, and how our dedicated experts can
                        help you transition to ClickHouse.
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
                    </li>{' '}
                    <li>
                      <a
                        href='/blog/how-cloudflare-processes-hundreds-of-millions-of-rows-per-second-with-clickhouse'
                        className='text-primary-300'>
                        How Cloudflare Processes Hundreds of Millions of Rows
                        per Second with ClickHouse
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
