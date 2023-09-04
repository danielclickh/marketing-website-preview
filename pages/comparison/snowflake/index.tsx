import { ChevronRightIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { CUIButton, CUICard } from '../../../components/ClickUI'
import ContactForm from '../../../components/ContactForm'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import LogoCarousel from '../../../components/LogoCarousel'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import Tilt from 'react-parallax-tilt'
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
  seo
}: SnowflakePageProps) {
  seo = {
    title: 'ClickHouse vs Snowflake',
    path: '/comparison/snowflake',
    description:
      'ClickHouse is designed for real-time data analytics and exploration at scale. Snowflake is a cloud data warehouse that is well-optimized for executing long-running reports and ad-hoc data analysis. When it comes to real-time analytics, ClickHouse shines with faster queries at a fraction of the cost.'
  }

  const [form2Successful, setForm2Successful] = useState(false)

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
            <div className='relative z-40 mx-auto mt-12 max-w-4xl pt-20 pb-0 lg:mt-0'>
              <div className='mx-auto mb-12 flex items-center gap-4'>
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className='w-1/3 rounded-md border border-white/40 bg-[#363531] py-6 px-3 shadow-lg'>
                    <h3 className='mb-2 text-center font-basier text-2xl font-bold leading-none text-primary-300 lg:text-[69px]'>
                      {stat.title}
                    </h3>
                    <p className='text-center font-basier text-sm font-bold leading-none lg:text-base'>
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
                    <div className='absolute left-0 bottom-0 z-20 h-[100px] w-full bg-snowflakeGradient '></div>
                  </div>
                  <div className='relative z-40 -mt-20'>
                    <div className='mx-auto max-w-xl rounded-lg bg-black  p-10 text-white'>
                      <p>asdf</p> Ready
                      <p>asdf</p> Ready
                      <p>asdf</p> Ready
                      <p>asdf</p> Ready
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
              <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center pb-10 md:gap-x-14'>
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
      <div className='mx-auto my-28 max-w-4xl px-4 md:px-8 2xl:px-0'>
        <div className='bg-shadow-element yellow-shadow align-shadow-right'></div>
        <Image
          src='/images/monitorama/obs-logo.svg'
          height={72}
          width={72}
          alt='Observability'
          className='mx-auto mb-4 fill-none'
        />
        <h2 className='mb-6 text-center font-basier text-3xl font-semibold'>
          ClickHouse and Observability
        </h2>
        <p className='text-center text-base'>
          ClickHouse efficiently stores and queries years of structured logs,
          traces, errors, time series events, profile data, metrics, and more.
          Cost savings of going with ClickHouse as your observability data
          storage can be 10-100x, depending on alternatives considered.
        </p>
      </div>
      <div className='mx-auto mb-24 max-w-7xl px-4 md:px-8 2xl:px-0'>
        <div className='mx-auto max-w-4xl'>
          <Image
            src='/images/monitorama/people-icon.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mx-auto mb-4 fill-none'
          />
          <h2 className='mb-12 text-center font-basier text-3xl font-semibold'>
            Off-the-shelf or self-build ClickHouse has you covered
          </h2>
        </div>
        <div className='relative w-full rounded-lg border-t-4 border-t-primary-300 bg-neutral-900 p-3 shadow-lg md:p-10'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div className='relative z-20'>
              <CUICard>
                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                  <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                    <div className='mb-1 font-inconsolata text-base font-medium text-primary-300'>
                      <Image
                        src='/images/monitorama/speedlayer.svg'
                        width={28}
                        height={28}
                        alt='Speed Layer'
                      />
                    </div>
                    <div className='font-basier text-xl font-medium leading-tight  text-neutral-100'>
                      Vendors building observability solutions
                    </div>
                    <div className='text-neutral-20 whitespace-pre-wrap pb-20 text-sm'>
                      Various companies, such as Sentry (specializing in error
                      tracking and metrics), Chronosphere (offering structured
                      logs and metrics), and Gitlab Opstrace (focused on error
                      tracking and tracing), have opted for ClickHouse as their
                      storage solution for observability data. This choice is
                      driven by ClickHouse's exceptional cost savings on
                      storage, often exceeding 10 times the efficiency, as well
                      as its unparalleled query speeds that can handle multiple
                      concurrent users.
                    </div>
                  </div>
                </CUICard.Body>
                <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                  <div className='absolute left-0 bottom-0 z-50 h-20 w-full overflow-hidden rounded-b-lg border border-neutral-700/80 bg-neutral-900'>
                    <div className='flex w-full justify-between'>
                      <div className='h-20'>
                        <Image
                          src='/images/monitorama/logo-sentry.svg'
                          width={110}
                          height={32}
                          alt='Sentry'
                          className='h-full w-full object-contain px-4 py-2 '
                        />
                      </div>
                      <div className='h-20'>
                        <Image
                          src='/images/monitorama/logo-highlight-2.svg'
                          width={153}
                          height={28}
                          alt='highlight.io'
                          className='h-full w-full border-l border-l-neutral-700/80 object-contain px-4 py-2 '
                        />
                      </div>
                      <div className='h-20'>
                        <Image
                          src='/images/monitorama/logo-signoz.svg'
                          width={110}
                          height={32}
                          alt='SigNoz'
                          className='h-full w-full border-l border-l-neutral-700/80 object-contain px-4 py-2 '
                        />
                      </div>
                    </div>
                  </div>
                </CUICard.Footer>
              </CUICard>
            </div>
            <div className='relative z-20'>
              <CUICard>
                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                  <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                    <div className='mb-1 font-inconsolata text-base font-medium text-primary-300'>
                      <Image
                        src='/images/monitorama/eventdriven.svg'
                        width={28}
                        height={28}
                        alt='Speed Layer'
                      />
                    </div>
                    <div className='font-basier text-xl font-medium leading-tight  text-neutral-100'>
                      Teams building bespoke observability platforms
                    </div>
                    <div className='text-neutral-20 whitespace-pre-wrap pb-20 text-sm'>
                      Usually, these teams opt for a combination of
                      industry-leading technologies to build their custom
                      solution. The common approach for observability use cases
                      entails employing OpenTelemetry agents for data
                      collection, utilizing ClickHouse as the database, and
                      leveraging Grafana for creating dashboards and managing
                      alerts. We internally employ this stack to empower
                      observability within ClickHouse Cloud. This methodology
                      has the potential to deliver cost savings ranging from 10
                      to 100 times compared to off-the-shelf solutions when it
                      comes to storing detailed structured logs over the long
                      term.
                    </div>
                  </div>
                </CUICard.Body>
                <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                  <div className='absolute left-0 bottom-0 z-50 h-20 w-full overflow-hidden rounded-b-lg border border-neutral-700/80 bg-neutral-900'>
                    <div className='flex w-full'>
                      <div className='flex h-20 w-1/3 items-center justify-center'>
                        <Image
                          src='/images/monitorama/logo-benocs.svg'
                          width={110}
                          height={32}
                          alt='Benocs'
                          className='h-full w-full object-contain px-4 py-2'
                        />
                      </div>
                      <div className='flex h-20 w-1/3 items-center justify-center'>
                        <Image
                          src='/images/monitorama/logo-uber-2.svg'
                          width={153}
                          height={28}
                          alt='Uber'
                          className='h-full w-full border-l border-l-neutral-700/80 object-contain px-4 py-2'
                        />
                      </div>
                      <div className='flex h-20 w-1/3 items-center justify-center'>
                        <Image
                          src='/images/monitorama/logo-ebay.svg'
                          width={110}
                          height={32}
                          alt='eBay'
                          className='h-full w-full border-l border-l-neutral-700/80 object-contain px-4 py-2'
                        />
                      </div>
                    </div>
                  </div>
                </CUICard.Footer>
              </CUICard>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-neutral-725 py-24'>
        <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
          <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
            <Image
              src='/images/monitorama/code-icon.svg'
              height={72}
              width={72}
              alt='Code'
              className='mb-4 fill-none'
            />
            <h2 className='mb-12 text-center font-basier text-3xl font-semibold lg:mb-16'>
              What do developers say?
            </h2>
            <div className='mx-auto grid gap-10 lg:grid-cols-3'>
              <Tilt
                tiltEnable={false}
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor='rgba(251, 255, 70, 0.08)'
                glarePosition='all'
                className='h-full'>
                <div className='cui-card flex h-full flex-col justify-between rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-6 shadow-card hover:shadow-lg'>
                  <div>
                    <Image
                      src='/images/Quote.svg'
                      width={37}
                      height={28}
                      alt='Quote'
                      className='mb-4 flex-none'
                    />
                    <p className='mb-6'>
                      ClickHouse helps us efficiently and reliably analyze logs
                      across trillions of Internet requests to identify
                      malicious traffic and provide customers with rich
                      analytics.
                    </p>
                  </div>
                  <div>
                    <Link
                      className='text-primary-300'
                      href='https://blog.cloudflare.com/http-analytics-for-6m-requests-per-second-using-clickhouse/'
                      target='_blank'>
                      Read more &raquo;
                    </Link>
                    <Image
                      src='/images/monitorama/sh-cloudflare.png'
                      width={444}
                      height={196}
                      alt='Cloudflare'
                      className='max-h-20 w-auto'
                    />
                  </div>
                </div>
              </Tilt>
              <Tilt
                tiltEnable={false}
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor='rgba(251, 255, 70, 0.08)'
                glarePosition='all'
                className='h-full'>
                <div className='cui-card flex h-full flex-col justify-between rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-6 shadow-card hover:shadow-lg'>
                  <div>
                    <Image
                      src='/images/Quote.svg'
                      width={37}
                      height={28}
                      alt='Quote'
                      className='mb-4 flex-none'
                    />{' '}
                    <p className='mb-6'>
                      Now, our customers can search through months of browser
                      and server-side log data in under a second thanks to the
                      tech behind ClickHouse.
                    </p>
                  </div>
                  <div>
                    <Link
                      className='text-primary-300'
                      href='/blog/overview-of-highlightio'
                      target='_blank'>
                      Read more &raquo;
                    </Link>
                    <Image
                      src='/images/monitorama/sh-highlight.png'
                      width={680}
                      height={196}
                      alt='Highlight'
                      className='max-h-20 w-auto'
                    />
                  </div>
                </div>
              </Tilt>
              <Tilt
                tiltEnable={false}
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor='rgba(251, 255, 70, 0.08)'
                glarePosition='all'
                className='h-full'>
                <div className='cui-card flex h-full flex-col justify-between rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-6 shadow-card hover:shadow-lg'>
                  <div>
                    <Image
                      src='/images/Quote.svg'
                      width={37}
                      height={28}
                      alt='Quote'
                      className='mb-4 flex-none'
                    />
                    <p className='mb-16'>
                      The platform is ingesting millions of logs per second from
                      thousands of services across regions, storing several PBs
                      worth, and serving hundreds of queries per second from
                      both dashboards and programs.
                    </p>
                  </div>
                  <div>
                    <Link
                      className='text-primary-300'
                      href='https://www.uber.com/blog/logging/'
                      target='_blank'>
                      Read more &raquo;
                    </Link>
                    <Image
                      src='/images/monitorama/sh-uber.png'
                      width={372}
                      height={196}
                      alt='Cloudflare'
                      className='max-h-20 w-auto'
                    />
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto my-24 max-w-7xl px-4 md:px-8 2xl:px-0'>
        <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
          <div className='mb-6 flex items-center justify-between'>
            <h3 className='text-2xl font-semibold'>Further Reading</h3>
            <CUIButton
              type='secondary'
              className='group mt-4 w-auto md:mt-0'
              target='_blank'
              href='/blog'
              iconRight={
                <ChevronRightIcon
                  height='18'
                  className='pt-0.5 transition group-hover:translate-x-1/2'
                />
              }>
              View all blogs
            </CUIButton>
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-4'>
            <Link
              href='/blog/storing-log-data-in-clickhouse-fluent-bit-vector-open-telemetry'
              target='_blank'
              className={` hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1  hover:no-underline`}>
              <CUICard className='h-full'>
                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                  <Image
                    alt=''
                    className='w-full rounded-t-lg xl:h-36 xl:object-cover'
                    width={750}
                    height={394}
                    src='/uploads/building_logs_solution_2_503a1fe8cb.png'
                  />
                  <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                    <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
                      Engineering
                    </div>
                    <div className='cursor-pointer font-basier text-xl font-medium leading-tight  text-neutral-100'>
                      Building an Observability Solution with ClickHouse - Part
                      1 - Logs
                    </div>
                  </div>
                </CUICard.Body>
                <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                  Dale McDiarmid ⋅ Jan 11, 2023
                </CUICard.Footer>
              </CUICard>
            </Link>
            <Link
              href='/blog/storing-traces-and-spans-open-telemetry-in-clickhouse'
              target='_blank'
              className={` hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1  hover:no-underline`}>
              <CUICard className='h-full'>
                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                  <Image
                    alt=''
                    className='w-full rounded-t-lg xl:h-36 xl:object-cover'
                    width={750}
                    height={394}
                    src='/uploads/medium_OTEL_Collector_8bb84aa780.png'
                  />
                  <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                    <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
                      Engineering
                    </div>
                    <div className='cursor-pointer font-basier text-xl font-medium leading-tight  text-neutral-100'>
                      Building an Observability Solution with ClickHouse - Part
                      2 - Traces
                    </div>
                  </div>
                </CUICard.Body>
                <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                  Dale McDiarmid ⋅ Mar 29, 2023
                </CUICard.Footer>
              </CUICard>
            </Link>
            <Link
              href='/blog/overview-of-highlightio'
              target='_blank'
              className={` hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1  hover:no-underline`}>
              <CUICard className='h-full'>
                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                  <Image
                    alt=''
                    className='w-full rounded-t-lg xl:h-36 xl:object-cover'
                    width={750}
                    height={394}
                    src='/uploads/Highlightio_image1_488ce7093f.png'
                  />
                  <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                    <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
                      Customer stories
                    </div>
                    <div className='cursor-pointer font-basier text-xl font-medium leading-tight  text-neutral-100'>
                      A ClickHouse-powered Observability Solution: Overview of
                      Highlight.io
                    </div>
                  </div>
                </CUICard.Body>
                <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                  Elissa Weve ⋅ Apr 21, 2023
                </CUICard.Footer>
              </CUICard>
            </Link>
            <Link
              href='https://tech.ebayinc.com/engineering/ou-online-analytical-processing/'
              target='_blank'
              className={` hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1  hover:no-underline`}>
              <CUICard className='h-full'>
                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                  <Image
                    alt=''
                    className='w-full rounded-t-lg xl:h-36 xl:object-cover'
                    width={750}
                    height={394}
                    src='/images/monitorama/Kube2.jpg'
                  />
                  <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                    <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
                      Customer stories
                    </div>
                    <div className='cursor-pointer font-basier text-xl font-medium leading-tight  text-neutral-100'>
                      Our Online Analytical Processing Journey with ClickHouse
                      on Kubernetes
                    </div>
                  </div>
                </CUICard.Body>
                <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                  eBay Team ⋅ Mar 10, 2023
                </CUICard.Footer>
              </CUICard>
            </Link>
          </div>
        </div>
      </div>
      <HRSeparator className='my-16 lg:my-24' />
      <div className='mx-auto mb-24 max-w-7xl px-4 md:px-8 2xl:px-0'>
        <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto  flex  flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 fill-none'
          />
          <h2 className='mb-12 text-center font-basier text-3xl font-semibold lg:mb-16'>
            Contact us for help with your Observability Questions
          </h2>
          <div className='mx-auto max-w-lg'>
            {' '}
            <ContactForm
              firstNameLabel='First Name'
              lastNameLabel='Last Name'
              emailLabel='Email'
              companyLabel='Company'
              messageLabel='Message'
              submitButtonLabel='Submit'
              thankYouMessage='Thank you for submitting the form!'
              disclaimer=''
              onSuccess={() => setForm2Successful(true)}
            />
            {!form2Successful && (
              <div className='rich_content mt-4 text-center text-sm'>
                <ReactMarkdown
                  children='By clicking Submit, you acknowledge that ClickHouse will
                    process your personal information in accordance with our
                    [privacy
                    policy](https://clickhouse.com/legal/privacy-policy).'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
