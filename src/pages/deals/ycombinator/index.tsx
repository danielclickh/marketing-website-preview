import TickItem from '@/components-cleaned/TickItem'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import { SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        ...commonProps,
        seo: {
          title: 'ClickHouse x YCombinator',
          description: '',
          keywords: '',
          path: '/deals/ycombinator'
        }
      }
    }
  }

export default function Page({ footerData, headerData, seo }: CommonProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container -mt-4 flex flex-col gap-16 lg:mt-0 lg:grid lg:grid-cols-12 lg:gap-24'>
          {/* Content column */}
          <div className='space-y-6 lg:col-span-7'>
            <SuiTitle type='h1' className='!text-5xl'>
              <small className='text-lg text-primary-300'>
                ClickHouse x YCombinator
              </small>{' '}
              <br />
              Welcome, YC startups!
            </SuiTitle>
            <p className='text-lg text-neutral-200'>
              This is the application page to unlock{' '}
              <strong>$10,000 in ClickHouse Cloud credits</strong>. Before
              applying, please review the deal requirements below and complete
              the form.
            </p>
            <p className='font-bold'>What is ClickHouse?</p>
            <p>
              ClickHouse is a fast, open-source columnar database management
              system that allows for real-time data processing and analytics.
              Engineered for high performance, ClickHouse Cloud delivers
              exceptional query speed, making it an ideal solution for handling
              large volumes of data. Trusted by leading companies like OpenAI,
              Anthropic, Tesla, Weights and Biases, eBay, and LangChain.
              ClickHouse Cloud enables businesses to gain critical insights and
              drive decision-making with its scalable, efficient, and robust
              data infrastructure.{' '}
            </p>
            <ul className='space-y-4'>
              <li>
                <TickItem>
                  <strong>Instant onboarding</strong> - All the speed and power
                  that you expect from ClickHouse is now available in a cloud
                  offering.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Best price/performance</strong> - Cloud-native
                  architecture enables effective data tiering and scaling,
                  resulting in the leading price/performance ratio on the
                  market.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Uncompromising reliability</strong> - Reliable by
                  default, each service is automatically replicated across
                  multiple availability zones.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>World-class security</strong> - Let our experts sweat
                  the security, privacy, and compliance details. Always-on
                  industry standard defaults and customizable policies. You can
                  read more about ClickHouse security on trust.clickhouse.com
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Vibrant ecosystem</strong> - We curate the most
                  popular ways to work ClickHouse. Explore our growing library
                  of ecosystem integration.
                </TickItem>
              </li>
            </ul>

            <ul className='space-y-4'>
              <li>
                <TickItem>
                  <strong>Seamless scaling</strong> - automatic scaling adjusts
                  to variable workloads so you don't have to over-provision for
                  peak usage
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Transparent pricing</strong> - pay only for what you
                  use, with resource reservations and scaling controls
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Broad ecosystem</strong> - bring your favorite data
                  connectors, visualization tools, SQL and language clients with
                  you
                </TickItem>
              </li>
            </ul>
          </div>

          {/* Form column */}
          <div className='lg:col-span-5'>
            <div
              className={`relative rounded-lg bg-neutral-900 p-4 shadow-lg sm:p-6 lg:p-8 ${formLoaded ? '' : 'min-h-full'}`}>
              <SuiTitle type='h2' className='mb-8 text-center'>
                Apply now
              </SuiTitle>

              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              <MarketoForm
                formId='1442'
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

              <div
                ref={formSuccessRef}
                className={`absolute inset-2 z-10 flex bg-neutral-900/90 text-center backdrop-blur transition-opacity ${formSuccess ? '' : 'pointer-events-none -z-50 opacity-0'}`}>
                <div className='m-auto w-full max-w-md'>
                  <h3 className='text-2xl font-bold'>Thank you!</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
