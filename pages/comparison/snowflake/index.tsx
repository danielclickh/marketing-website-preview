import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import GetStarted from '../../../components/GetStarted'
import Layout from '../../../components/Layout'
import LogoCarousel from '../../../components/LogoCarousel'
import Markdown from '../../../components/Markdown'
import MarketoForm from '../../../components/MarketoForm'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import stats from './stats.json'

interface SnowflakePageProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<SnowflakePageProps> =
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

    const commonProps = await getCommonProps()
    const data = await findOne('homepage', params)

    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function SnowflakePage({
  footerData,
  headerData,
  customerStories,
  seo,
  platforms
}: SnowflakePageProps) {
  seo = {
    title: 'ClickHouse vs Snowflake',
    path: '/comparison/snowflake',
    description:
      'ClickHouse is designed for real-time data analytics and exploration at scale. Snowflake is a cloud data warehouse that is well-optimized for executing long-running reports and ad-hoc data analysis. When it comes to real-time analytics, ClickHouse shines with faster queries at a fraction of the cost.',
    image: [{ url: '/images/clickhouse-vs-snowflake-og.png' }]
  }

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage'>
        <div className='relative pt-16 lg:pb-24 '>
          <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
            <div className='items-start justify-between gap-10 lg:flex lg:grid-cols-2 lg:gap-20'>
              <div className='lg:w-2/3'>
                <div className='items-center'>
                  <div className='lg:max-w-md'>
                    <h4 className='mb-2 w-full text-center text-base font-medium text-primary-300 lg:text-left'>
                      Comparisons
                    </h4>
                    <h1 className='mb-4 text-center font-basier text-4xl font-semibold leading-tight text-neutral-0 lg:text-left lg:text-5.5xl'>
                      ClickHouse vs&nbsp;Snowflake
                    </h1>
                    <h4 className='mb-6 w-full text-center text-base font-medium text-neutral-0/60 lg:text-left'>
                      For Real-time Analytics
                    </h4>
                  </div>
                </div>
                <div className='rich_content mt-8 text-center text-base text-neutral-200 lg:max-w-2xl lg:text-left'>
                  <p>
                    ClickHouse is designed for real-time data analytics and
                    exploration at scale. Snowflake is a cloud data warehouse
                    that is well-optimized for executing long-running reports
                    and ad-hoc data analysis. When it comes to real-time
                    analytics, ClickHouse shines with faster queries at a
                    fraction of the cost.
                  </p>
                  <p>
                    Discover these insights and more in our benchmark study that
                    compares ClickHouse with Snowflake for real-time analytics.
                    Learn how to escape from Snowflake's climbing costs and
                    revamp your data strategy below.
                  </p>
                </div>
              </div>
              <div>
                <div className='mb-6 lg:mb-0'>
                  <div className='lg:max-w-2xl'>
                    <Image
                      src='/images/clickhouse-vs-snowflake-og.png'
                      width={512}
                      height={278}
                      alt='ClickHouse vs Snowflake'
                      className='hidden h-auto w-full lg:block'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative mb-16 pt-12 lg:pt-0'>
          <div className='mx-auto flex flex-col text-center'>
            <div className='mx-auto w-fit max-w-[850px] px-4 pb-4 pt-2 text-center font-basier text-2xl font-semibold leading-normal text-white md:px-0 lg:mb-8 lg:text-4xl'>
              ClickHouse performance compared to Snowflake for{' '}
              <span className='tilted tilted-yellow'>
                <span className='tilted-content leading-8'>real-time</span>
              </span>{' '}
              analytics.
            </div>
          </div>

          <div className='clip-inverted-triangle -mt-16'>
            <div className='relative z-40 mx-auto mt-4 max-w-4xl pt-20 pb-0 lg:mt-12'>
              <div className='mx-auto mb-12 flex items-center gap-4  px-4 md:px-0'>
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className='w-1/3 rounded-md border border-white/40 bg-[#363531] py-6 px-3 shadow-lg'>
                    <h3 className='mb-2 text-center font-basier text-2xl font-bold leading-none text-primary-300 lg:text-[69px]'>
                      {stat.title}
                    </h3>
                    <p className='min-h-[30px] text-center font-basier text-sm font-bold leading-none lg:text-base'>
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='relative z-10 mx-auto -mt-16 bg-primary-300'>
            <div className='mx-auto max-w-4xl px-4 pt-8 md:px-0'>
              <div className='w-full rounded-md border border-white/40 bg-[#363531] p-10 shadow-lg'>
                <Image
                  src='/images/Quote.svg'
                  width={37}
                  height={28}
                  alt='Quote'
                  className='mb-4 flex-none'
                />
                <h3 className='mb-4 text-base'>
                  "With Snowflake, we were using the standard plan, small
                  compute, which <strong>cost nearly six times more</strong>{' '}
                  than ClickHouse Cloud. We got several seconds query time and
                  no materialized views. With ClickHouse Cloud's production
                  instance, we are getting sub-second query time along with
                  materialized views. The decision to switch was a no-brainer
                  for us.”
                </h3>
                <p className='min-h-[30px] pb-6 text-sm text-primary-300 lg:min-h-fit lg:text-base'>
                  <Link href='/blog/adgreetz-processes-millions-of-daily-ad-impressions'>
                    Read more
                  </Link>
                </p>
                <Image
                  src='/images/adgreetz-logo.svg'
                  alt='Adgreetz'
                  width={224}
                  height={29}
                />
              </div>
            </div>

            <div className='relative z-10 mx-auto -mt-10 max-w-7xl'>
              <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0 '>
                <div className='flip-selection mx-auto flex flex-col pt-30 text-center'>
                  <h2 className='mb-8 font-basier text-4xl font-semibold text-primary-800'>
                    Executive Summary
                  </h2>
                  <div className='relative max-w-4xl text-left text-neutral-800'>
                    <p>
                      <strong>Overview</strong>
                    </p>
                    <p className='mb-8'>
                      Our benchmark analysis demonstrates that ClickHouse Cloud
                      outperforms Snowflake across the critical dimensions for
                      real-time analytics: query latency and cost.
                    </p>

                    <p>
                      <strong>Objective</strong>
                    </p>
                    <p className='mb-8'>
                      Reports from customers have indicated that{' '}
                      <strong>
                        migrating real-time analytics workloads from Snowflake
                        to ClickHouse Cloud has not only increased query
                        performance but also reduced expenses
                      </strong>{' '}
                      for their businesses. Thus, the objective of our benchmark
                      analysis is to deeply understand and outline the
                      differences and similarities between ClickHouse Cloud and
                      Snowflake for real-time analytics. We compare the
                      performance and cost of both systems.
                    </p>

                    <p>
                      <strong>Approach</strong>
                    </p>
                    <p className='mb-8'>
                      We benchmark, in ClickHouse Cloud and Snowflake, a set of
                      real-time analytics queries that are representative of
                      many real-time data applications. The cost is recorded for
                      running each benchmark test, considering data loading and
                      storage. Finally, this expense analysis is projected and
                      compared for a production environment and workload.
                    </p>
                    <div className='absolute left-0 bottom-0 z-20 h-[220px] w-full bg-snowflakeGradient lg:h-[100px] '></div>
                  </div>
                  <div className='relative z-40 -mt-30 lg:-mt-20'>
                    <div className='mx-auto max-w-xl rounded-lg bg-black p-5 text-white lg:p-10'>
                      <p
                        className='mb-4 text-2xl font-bold lg:text-3xl'
                        ref={formSuccessRef}>
                        Ready to learn more?
                      </p>
                      <p className='mb-6'>Access the PDF executive summary.</p>
                      {!formSuccess && (
                        <MarketoForm
                          formId='1073'
                          onLoad={() => setFormLoaded(true)}
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

                      {formLoaded && !formSuccess && (
                        <div className='disclaimer-text mt-8 text-left text-sm font-medium text-neutral-200'>
                          <Markdown>
                            By registering, you acknowledge that ClickHouse will
                            process your personal information in accordance with
                            our [Privacy Policy](/legal/privacy-policy).
                          </Markdown>
                        </div>
                      )}

                      {!formLoaded && (
                        <div className='text-center'>Loading form...</div>
                      )}

                      {formSuccess && (
                        <div className='text-center'>
                          <h3 className='text-2xl font-bold'>
                            Thank you for your submission!
                          </h3>
                          <p className='mt-2 text-neutral-200'>
                            You'll receive an email shortly with the executive
                            summary.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
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
                  speedClass1='animate-marqueeLeft3'
                  speedClass2='animate-marqueeLeft4'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetStarted platforms={platforms} />
    </Layout>
  )
}
