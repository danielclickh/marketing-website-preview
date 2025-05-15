import comparisonBigQuery from './assets/comparison-bigquery.png'
import comparisonPostgres from './assets/comparison-postgres.png'
import comparisonRedshift from './assets/comparison-redshift.png'
import comparisonSnowflake from './assets/comparison-snowflake.png'
import diagram from './assets/diagram.png'
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
          path: '/government',
          image: [{ url: '/images/social-government.jpg' }]
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo, headerData, footerData }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section
        className='bg-shadow-element yellow-shadow overflow-hidden bg-grid py-16 lg:py-24'
        style={
          {
            '--top-side': '60%',
            '--right-side': '20%',
            '--left-side': 'auto'
          } as React.CSSProperties
        }>
        <div className='section-container relative z-10'>
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
            <div className='w-full lg:w-1/2 2xl:max-w-[578px]'>
              <Form />
            </div>
          </div>
        </div>
      </section>

      {/* Why ClickHouse */}
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
                  Best-in-class compression ratios{' '}
                  <br className='hidden lg:block' />
                  that reduce storage and accelerate{' '}
                  <br className='hidden lg:block' />
                  performance.
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
              link='/comparison/snowflake?loc=government'
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
              link='/comparison/bigquery?loc=government'
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
              link='/comparison/postgresql?loc=government'
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
              link='/comparison/redshift?loc=government'
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

      {/* Architecture */}
      <section className='bg-neutral-725 py-16 lg:py-24'>
        <div className='section-container mx-auto'>
          {/* Intro */}
          <div className='mx-auto max-w-4xl space-y-6 text-center'>
            <Image
              width={72}
              height={72}
              src='/images/use-cases/logging/icon-how.svg'
              alt='System overview'
              className='mx-auto'
            />
            <SuiTitle type='h2'>Government use cases</SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              ClickHouse powers real-time analytics for mission-critical
              insights.
            </SuiText>
          </div>

          {/* Cards */}
          <div className='my-12 flex w-full flex-col gap-6 px-8 lg:my-20 lg:flex-row lg:px-6 xl:px-0'>
            <div className='items-center space-y-6 rounded-md border border-neutral-0/30 bg-[#3e3e3e] p-6 text-left lg:w-1/3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22.9'
                height='26'
                viewBox='0 0 22.9 22.87'>
                <path
                  fill='#FCFF74'
                  d='M17.65 0c2.9 0 5.25 2.35 5.25 5.25v12.37c0 2.9-2.35 5.25-5.25 5.25H5.25A5.25 5.25 0 0 1 0 17.62V5.25C0 2.35 2.35 0 5.25 0h12.4Zm0 1.5H5.25A3.75 3.75 0 0 0 1.5 5.25v12.37a3.75 3.75 0 0 0 3.75 3.75h12.4a3.75 3.75 0 0 0 3.75-3.75V5.25a3.75 3.75 0 0 0-3.75-3.75Zm-3.28 4.01 2.24 5.17h1.59c.38 0 .7.28.74.65l.01.1c0 .41-.34.75-.75.75h-2.08a.75.75 0 0 1-.69-.45l-1.72-3.97-3.8 9.58a.75.75 0 0 1-1.33.12l-.05-.1-2.24-5.18H4.7a.75.75 0 0 1-.74-.65l-.01-.1c0-.41.34-.75.75-.75h2.08c.3 0 .57.18.69.45l1.72 3.97 3.8-9.57a.75.75 0 0 1 1.38-.02Z'
                />
              </svg>
              <SuiTitle type='h3'>IT monitoring</SuiTitle>
              <SuiText className='text-neutral-200'>
                Monitor your logs, events, and traces with confidence. Detect
                anomalies, network or infrastructure issues, and more.
              </SuiText>
            </div>
            <div className='items-center space-y-6 rounded-md border border-neutral-0/30 bg-[#3e3e3e] p-6 text-left lg:w-1/3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='26'
                viewBox='0 0 25 21'>
                <path
                  fill='#FCFF74'
                  d='M.5 0c.28 0 .5.22.5.5v14.8l7.15-7.15c.2-.2.5-.2.7 0l3.65 3.64L20.3 4h-3.8a.5.5 0 0 1-.5-.41V3.5c0-.28.22-.5.5-.5h5.01a.5.5 0 0 1 .06 0h-.07a.5.5 0 0 1 .35.15h.02a.5.5 0 0 1 .03.05l-.05-.05a.5.5 0 0 1 .15.35v5a.5.5 0 1 1-1 0V4.7l-8.15 8.15a.5.5 0 0 1-.7 0L8.5 9.21 1 16.7V20h23.5a.5.5 0 0 1 .5.41v.09a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5V.5C0 .22.22 0 .5 0Z'
                />
              </svg>
              <SuiTitle type='h3'>Mission analytics</SuiTitle>
              <SuiText className='text-neutral-200'>
                Enable evidence-based decision-making to enhance public services
                at speed and scale without breaking the bank.
              </SuiText>
            </div>
            <div className='items-center space-y-6 rounded-md border border-neutral-0/30 bg-[#3e3e3e] p-6 text-left lg:w-1/3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='23'
                height='26'
                viewBox='0 0 23 26'>
                <path
                  fill='#FCFF74'
                  d='M11.5 0A5.5 5.5 0 0 1 17 5.5V9h4.5c.83 0 1.5.67 1.5 1.5v14c0 .83-.67 1.5-1.5 1.5h-20A1.5 1.5 0 0 1 0 24.5v-14C0 9.67.67 9 1.5 9H6V5.5A5.5 5.5 0 0 1 11.5 0ZM22 22H1v2.5c0 .28.22.5.5.5h20a.5.5 0 0 0 .5-.5V22Zm0-4H1v3h21v-3Zm0-4H1v3h21v-3Zm-.5-4h-20a.5.5 0 0 0-.5.5V13h21v-2.5a.5.5 0 0 0-.5-.5Zm-10-9A4.5 4.5 0 0 0 7 5.5V9h9V5.5A4.5 4.5 0 0 0 11.5 1Z'
                />
              </svg>
              <SuiTitle type='h3'>Cybersecurity</SuiTitle>
              <SuiText className='text-neutral-200'>
                Optimize performance with threat detection, event correlation,
                and tracking attack patterns.
              </SuiText>
            </div>
          </div>

          {/* Diagram */}
          <div className='rounded-md border border-neutral-700/80 bg-neutral-900/50 p-6 lg:p-12'>
            <SuiTitle type='h2' className='text-center'>
              Architecture and components
            </SuiTitle>
            <Image
              src={diagram}
              alt='Architecture and components diagram'
              width={1691 / 2}
              height={1311 / 2}
              className='mx-auto my-12'
            />
            <ul className='mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 lg:gap-y-8'>
              <li>
                <CheckItem>
                  Installable via container images for Kubernetes deployments
                </CheckItem>
              </li>
              <li>
                <CheckItem>
                  Automated backups ensure system resiliency and data protection
                </CheckItem>
              </li>
              <li>
                <CheckItem>
                  Kubernetes management is streamlined with our proprietary
                  ClickHouse Operator
                </CheckItem>
              </li>
              <li>
                <CheckItem>
                  End-to-end encryption leveraging FIPS 140-3 compliant OpenSSL
                </CheckItem>
              </li>
              <li>
                <CheckItem>
                  APIs facilitate automation for efficient resource management
                </CheckItem>
              </li>
              <li>
                <CheckItem>
                  Automatic vertical scaling dynamically manages fluctuating
                  workload demands
                </CheckItem>
              </li>
              <li>
                <CheckItem>
                  Comprehensive NIST 800-53 documentation facilitates ATO from
                  FedRAMP Moderate to IL-6.
                </CheckItem>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id='waitlist' className='section-container my-16 lg:my-24'>
        <div className='bg-shadow-element red-shadow align-shadow-left flex flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 lg:mb-6'
          />
          <SuiTitle type='h2' className='mb-12 text-center lg:mb-20'>
            Join the ClickHouse Government waitlist
          </SuiTitle>
          <div className='mx-auto max-w-[578px]'>
            <Form />
          </div>
        </div>
      </section>
    </Layout>
  )
}

function Form() {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <div className='rounded-lg bg-neutral-900 p-8'>
      {!formSuccess && (
        <MarketoForm
          formId='1391'
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

      {!formLoaded && <div className='text-center'>Loading form...</div>}

      {formSuccess && (
        <div ref={formSuccessRef} className='py-20 text-center'>
          <h3 className='text-2xl font-bold'>Thank you!</h3>
          <p className='mt-2 text-neutral-200'>We'll be in touch shortly.</p>
        </div>
      )}
    </div>
  )
}

function ComparisonCard({
  logo,
  name,
  savings,
  performance,
  link
}: {
  logo: React.ReactNode
  name: string
  savings: string | number
  performance: string | number
  link: string
}) {
  return (
    <CUICard className='relative !bg-neutral-750'>
      <CUICard.Body className='flex flex-col items-center justify-center space-y-2 border-b border-neutral-700/80 py-6 text-center'>
        <div className='mx-auto w-auto'>{logo}</div>
        <SuiTitle type='h3' className='leading-none'>
          <Link href={link}>
            <span className='absolute inset-0' />
            ClickHouse vs <br className='hidden lg:block xl:hidden' />
            {name}
          </Link>
        </SuiTitle>
      </CUICard.Body>
      <CUICard.Footer className='grid flex-1 grid-cols-2'>
        <div className='flex flex-col items-center justify-center px-2 py-4 text-center'>
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
        <div className='flex flex-col items-center justify-center border-l border-neutral-700/80 px-2 py-4 text-center'>
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

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='item-center flex space-x-4 pb-2 last:pb-0'>
      <Image src='/images/cloud/check.svg' width={32} height={32} alt='Icon' />
      <SuiText>{children}</SuiText>
    </div>
  )
}
