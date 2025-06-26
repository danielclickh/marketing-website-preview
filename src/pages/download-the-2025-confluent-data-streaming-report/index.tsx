import background from './assets/background.png'
import socialImage from './assets/social-image.jpg'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import { SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        ...commonProps,
        seo: {
          title: '2025 Data Streaming Report: AI Adoption & Real-Time ROI',
          description:
            'Explore how 4,175 IT leaders use real-time data to accelerate AI adoption, boost ROI, and cut time to market—brought to you by Confluent & ClickHouse.',
          keywords:
            '2025 data streaming report, AI adoption, real-time data, data streaming platforms, ClickHouse, Confluent, IT leaders insights, AI and ROI, speed to market, modern data architecture',
          path: '/download-the-2025-confluent-data-streaming-report',
          image: [{ url: socialImage.src }]
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
      <section className='relative overflow-hidden'>
        <Image
          src={background}
          width={1440 * 2}
          height={1086 * 2}
          quality={100}
          alt='Background'
          className='absolute inset-0 z-0 w-full max-w-none object-cover object-center opacity-20'
        />
        <div className='relative z-10 bg-grid py-16 lg:py-24'>
          <div className='section-container -mt-4 flex flex-col gap-16 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-24'>
            {/* Content column */}
            <div className='space-y-6'>
              <SuiTitle type='h1' className='!text-5xl'>
                <small className='text-lg text-primary-300'>
                  2025 Data Streaming Report
                </small>{' '}
                <br />
                Moving the needle on AI adoption, speed to market, and ROI
              </SuiTitle>
              <p className='text-lg text-neutral-200'>
                Discover insights from 4,175 IT leaders on how real-time data
                has become the foundation for AI success.
              </p>
              <p className='font-bold'>Key findings from the report:</p>
              <ul className='list-disc space-y-6 pl-8 text-neutral-200'>
                <li>
                  <strong className='text-white'>The AI advantage:</strong> How
                  data streaming platforms are helping 89% of IT leaders
                  overcome critical barriers to AI adoption.
                </li>
                <li>
                  <strong className='text-white'>Real business impact:</strong>{' '}
                  Organizations report 84% faster time to market and significant
                  revenue increases from real-time data capabilities.
                </li>
                <li>
                  <strong className='text-white'>Architecture insights:</strong>{' '}
                  What IT leaders look for when evaluating modern data streaming
                  platforms.
                </li>
              </ul>
              <p className='text-neutral-200'>
                Discover how ClickHouse fits into the modern real-time data
                stack—delivering the sub-second performance needed to power AI
                applications.
              </p>
              <p className='text-neutral-200'>
                Report brought to you by Confluent and ClickHouse.
              </p>
            </div>

            {/* Form column */}
            <div>
              <div
                className={`relative rounded-lg bg-neutral-900 p-4 shadow-lg sm:p-6 lg:p-8 ${formLoaded ? '' : 'min-h-full'}`}>
                <SuiTitle type='h2' className='mb-8 text-center'>
                  Download the report
                </SuiTitle>

                {!formLoaded && (
                  <div className='text-center'>Loading form...</div>
                )}

                <MarketoForm
                  formId='1423'
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
                  <div className='m-auto w-full'>
                    <h3 className='text-2xl font-bold'>Thank you!</h3>
                    <p className='mt-2 text-neutral-200'>
                      We'll be in touch shortly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
