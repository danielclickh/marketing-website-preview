import comparisonBigQuery from './assets/comparison-bigquery.png'
import comparisonPostgres from './assets/comparison-postgres.png'
import comparisonRedshift from './assets/comparison-redshift.png'
import comparisonSnowflake from './assets/comparison-snowflake.png'
import heroGraphic from './assets/hero-graphic.png'
import { CUICard } from '@/components/ClickUI'
import FitText from '@/components/FitText'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import { SuiText, SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          title:
            'ClickHouse Government — Blazing fast queries and resource efficiency for mission critical analytics.',
          description:
            'Deploy the full power of ClickHouse Cloud on any government network, including FedRAMP Moderate, High, and IL levels 2-6. Benefit from included NIST 800-53 compliance documentation for simplified ATO. Initially available for AWS government users, this offering delivers all ClickHouse Cloud features with enhanced security, including FIPS 140-3 support.',
          path: '/government'
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo, headerData, footerData }: CommonProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container'>
          <div className='flex flex-wrap items-center justify-between gap-12 lg:flex-nowrap lg:gap-16'>
            {/* Content column */}
            <div className='flip-selection mx-auto w-full max-w-md space-y-6 lg:ml-0 lg:w-1/2'>
              <SuiTitle type='h1' className='text-center lg:text-left'>
                ClickHouse Government
              </SuiTitle>
              <SuiText
                size='lg'
                className='text-center text-neutral-200 lg:text-left lg:text-xl'>
                Blazing fast queries and resource efficiency for mission
                critical analytics.
              </SuiText>
              <div>
                <Image
                  src={heroGraphic}
                  alt='ClickHouse Government Graphic'
                  width={783 / 1.5}
                  height={598 / 1.5}
                  className='-mb-6 -ml-6 mt-10 block lg:-ml-12'
                />
              </div>
            </div>

            {/* Form column */}
            <div className='w-full rounded-lg bg-neutral-900 p-8 lg:w-1/2 2xl:max-w-[578px]'>
              {!formSuccess && (
                <MarketoForm
                  formId='1135'
                  clearbitTracking={true}
                  onLoad={() => {
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

              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              {formSuccess && (
                <div ref={formSuccessRef} className='py-20 text-center'>
                  <h3 className='text-2xl font-bold'>Thank you!</h3>
                  <p className='mt-2 text-neutral-200'>
                    We'll be in touch shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='bg-neutral-700 py-16 lg:py-24'>
        <div className='section-container'>
          <div className='relative flex flex-col gap-8 overflow-clip rounded bg-neutral-750 p-8 lg:p-16'>
            {/* Gradient */}
            <div className='absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary-300 to-transparent'></div>

            {/* Intro text */}
            <div className='flex justify-center'>
              <div className='max-w-[600px] text-center'>
                <SuiTitle type='h2' color='inherit' className='mb-4'>
                  Why ClickHouse?
                </SuiTitle>
                <SuiText size='lg' className='opacity-70'>
                  ClickHouse is the world's fastest database for analytics.
                  ClickHouse is available open-source, as a fully managed
                  service on AWS, GCP, and Azure, and through ClickHouse
                  Government.
                </SuiText>
              </div>
            </div>

            {/* Columns */}
            <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
              <div className='flex flex-col items-center gap-4 text-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='49'
                  height='48'
                  fill='none'
                  viewBox='0 0 49 48'>
                  <path
                    stroke='#FAFF69'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.75'
                    d='M25.014 20.625A3.38 3.38 0 0 1 28.377 24v.016a3.378 3.378 0 1 1-3.363-3.391m-2.401 5.762-2.5 2.501m13.29-13.291-6.002 6.002'
                  />
                  <path
                    stroke='#FAFF69'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.75'
                    d='M37.733 11.267A18.008 18.008 0 1 1 25 5.992v6.003'
                  />
                </svg>
                <SuiTitle type='h3' color='inherit'>
                  Blazing fast
                </SuiTitle>
                <SuiText>
                  Ultimate query performance that your mission-critical and
                  time-sensitive applications can depend on.
                </SuiText>
              </div>
              <div className='flex flex-col items-center gap-4 text-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  fill='none'
                  viewBox='0 0 48 48'>
                  <g
                    stroke='#FAFF69'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.75'>
                    <path d='M41.25 39H36V28.5M9 21V7.5A1.5 1.5 0 0 1 10.5 6h18L39 16.5V21' />
                    <path d='M28.5 6v10.5H39M14.981 28.8s-5.518-1.459-5.962 2.063c-.445 3.52 7.205 1.897 6.708 5.76-.463 3.592-5.958 2.062-5.958 2.062M25.5 39c2.485 0 4.5-2.35 4.5-5.25s-2.015-5.25-4.5-5.25-4.5 2.35-4.5 5.25S23.015 39 25.5 39Zm1.5-3 3 3' />
                  </g>
                </svg>
                <SuiTitle type='h3' color='inherit'>
                  Developer friendly
                </SuiTitle>
                <SuiText>
                  Built to ensure that even the most sophisticated data analysis
                  can be done intuitively, using simple SQL.
                </SuiText>
              </div>
              <div className='flex flex-col items-center gap-4 text-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='48'
                  height='48'
                  fill='none'
                  viewBox='0 0 48 48'>
                  <g
                    stroke='#FAFF69'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.75'>
                    <path d='M18 22.5c8.284 0 15-3.022 15-6.75S26.284 9 18 9C9.716 9 3 12.022 3 15.75s6.716 6.75 15 6.75Z' />
                    <path d='M3 15.75v7.5C3 26.977 9.716 30 18 30c8.284 0 15-3.023 15-6.75v-7.5m-21 6.188v7.5' />
                    <path d='M33 18.135c6.848.626 12 3.349 12 6.615 0 3.727-6.716 6.75-15 6.75-3.675 0-7.042-.594-9.65-1.582' />
                    <path d='M15 29.865v2.385C15 35.977 21.716 39 30 39c8.284 0 15-3.023 15-6.75v-7.5m-9 6.188v7.5m-12-16.5v16.5' />
                  </g>
                </svg>
                <SuiTitle type='h3' color='inherit'>
                  Cost effective
                </SuiTitle>
                <SuiText>
                  Best-in-class compression ratios that reduce storage and
                  accelerate performance.
                </SuiText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government on AWS */}
      <section className='my-16 lg:my-24'>
        <div className='section-container mx-auto'>
          {/* Intro */}
          <div className='mx-auto max-w-4xl space-y-6 text-center'>
            <Image
              width={72}
              height={72}
              src='/images/cloud/bring-your-own-cloud/upload-icon.svg'
              alt='Cloud icon'
              className='mx-auto'
            />
            <SuiTitle type='h2'>ClickHouse Government on AWS</SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Deploy the full power of ClickHouse Cloud on any government
              network, including FedRAMP Moderate, High, and IL levels 2-6.
              Benefit from included NIST 800-53 compliance documentation for
              simplified ATO. Initially available for AWS government users, this
              offering delivers all ClickHouse Cloud features with enhanced
              security, including FIPS 140-3 support.
            </SuiText>
            <SuiText size='lg' className='text-neutral-200'>
              <Link
                href='#waitlist'
                className='font-bold text-primary-300 hover:underline'>
                Join the waitlist
              </Link>
            </SuiText>
          </div>

          {/* Comparisons */}
          <div className='my-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:my-20 lg:grid-cols-4 2xl:gap-8'>
            <ComparisonCard
              logo={
                <Image
                  src={comparisonSnowflake}
                  alt='SnowFlake'
                  width={171 / 2}
                  height={164 / 2}
                />
              }
              name='SnowFlake'
              savings='3-5x'
              performance='2x'
            />
            <ComparisonCard
              logo={
                <Image
                  src={comparisonBigQuery}
                  alt='BigQuery'
                  width={171 / 2}
                  height={164 / 2}
                />
              }
              name='BigQuery'
              savings='10x'
              performance='10x'
            />
            <ComparisonCard
              logo={
                <Image
                  src={comparisonPostgres}
                  alt='Postgres'
                  width={171 / 2}
                  height={164 / 2}
                />
              }
              name='Postgres'
              savings='5x'
              performance='1000x'
            />
            <ComparisonCard
              logo={
                <Image
                  src={comparisonRedshift}
                  alt='Redshift'
                  width={171 / 2}
                  height={164 / 2}
                />
              }
              name='Redshift'
              savings='4x'
              performance='5x'
            />
          </div>

          {/* Footnote */}
          <div className='mx-auto max-w-4xl space-y-6 text-center'>
            <SuiText size='lg' className='text-neutral-200'>
              At a time when the government mission is only growing and budgets
              are shrinking, ClickHouse Government utilizes object storage and
              data compression to achieve 3-5x cost reduction while delivering
              2-10x improved performance over other solutions.
            </SuiText>
            <SuiText size='lg' className='text-neutral-200'>
              For more information, check out our{' '}
              <Link
                href='/use-cases?loc=government'
                className='font-bold text-primary-300 hover:underline'>
                use cases
              </Link>{' '}
              page.
            </SuiText>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function ComparisonCard({
  logo,
  name,
  savings,
  performance
}: {
  logo: React.ReactNode
  name: string
  savings: string | number
  performance: string | number
}) {
  return (
    <CUICard className='!bg-neutral-750'>
      <CUICard.Body className='flex flex-col items-center justify-center space-y-2 border-b border-neutral-700/80 py-6 text-center'>
        <div className='mx-auto w-auto'>{logo}</div>
        <SuiTitle type='h3' className='leading-none'>
          ClickHouse vs {name}
        </SuiTitle>
      </CUICard.Body>
      <CUICard.Footer className='grid flex-1 grid-cols-2'>
        <div className='flex flex-col items-center justify-center px-1 py-4 text-center'>
          <FitText
            minFontSize={14}
            maxFontSize={36}
            className='w-full text-nowrap text-center font-bold'>
            {savings}
          </FitText>
          <FitText
            minFontSize={9}
            maxFontSize={14}
            className='w-full font-bold uppercase text-[#B3B6BD]'>
            Savings
          </FitText>
        </div>
        <div className='flex flex-col items-center justify-center border-l border-neutral-700/80 px-1 py-4 text-center'>
          <FitText
            minFontSize={14}
            maxFontSize={36}
            className='w-full text-nowrap font-bold'>
            {performance}
          </FitText>
          <FitText
            minFontSize={9}
            maxFontSize={14}
            className='w-full font-bold uppercase text-[#B3B6BD]'>
            Performance
          </FitText>
        </div>
      </CUICard.Footer>
    </CUICard>
  )
}
