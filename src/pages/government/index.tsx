import comparisonBigQuery from './assets/comparison-bigquery.png'
import comparisonPostgres from './assets/comparison-postgres.png'
import comparisonRedshift from './assets/comparison-redshift.png'
import comparisonSnowflake from './assets/comparison-snowflake.png'
import diagram from './assets/diagram.png'
import languageInterface from './assets/language-interface.svg'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton, CUICard } from '@/components/ClickUI'
import FitText from '@/components/FitText'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import Modal from '@/components/Modal'
import { SuiText, SuiTitle } from '@/components/sui'
import { useClickOutside } from '@/hooks'
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
            'Deploy ClickHouse Government self-managed on AWS for government networks (FedRAMP, IL2-6). Get ATO documentation & FIPS 140-3 support.',
          keywords:
            'ClickHouse Government, self-managed ClickHouse, ClickHouse AWS, government data platform, FedRAMP Moderate, FedRAMP High, IL2, IL3, IL4, IL5, IL6, ATO documentation, Authority to Operate, NIST 800-53, FIPS 140-3, secure data analytics, real-time analytics government, on-premise cloud, private cloud government, customer-managed database, cloud database government',
          path: '/government',
          image: [{ url: '/images/social-government.jpg' }]
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo, headerData, footerData }: CommonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalInnerRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(modalInnerRef, () => {
    setIsModalOpen(false)
  })

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
        <div className='relative z-10'>
          <div className='absolute bottom-4 left-0 z-0 aspect-[1512/524] w-full bg-contain bg-center bg-no-repeat lg:bg-speed-lines' />
          <div className='section-container relative z-10 flex flex-wrap justify-between gap-12 lg:flex-nowrap lg:gap-16'>
            {/* Content column */}
            <div className='mx-auto w-full max-w-lg space-y-6 text-center text-neutral-200 lg:ml-0 lg:w-1/2 lg:pr-9 lg:text-left'>
              <SuiTitle type='h1' className='text-white'>
                ClickHouse Government
              </SuiTitle>
              <SuiText>
                Get the blazing-fast queries and resource efficiency you need
                from ClickHouse, delivered as a self-managed solution that
                handles the complexities of government networks.
              </SuiText>
              <ul className='mx-auto w-max max-w-full space-y-6 lg:ml-0'>
                <li>
                  <TickItem>
                    Deploy <strong>self-managed on AWS</strong> within any{' '}
                    <br />
                    government network (FedRAMP, IL2, 4, 5, 6).
                  </TickItem>
                </li>
                <li>
                  <TickItem>
                    Access{' '}
                    <strong>
                      NIST 800-53 (Risk Management Framework) compliance
                      documentation
                    </strong>{' '}
                    and robust <strong>FIPS 140-3 support</strong>.
                  </TickItem>
                </li>
                <li>
                  <TickItem>
                    Experience <strong>3-5x cost reduction</strong> and
                    <br />
                    <strong>2-10x performance improvements</strong>.
                  </TickItem>
                </li>
              </ul>
            </div>

            {/* Form column */}
            <div className='w-full lg:w-1/2 2xl:max-w-[578px]'>
              <Form
                className='min-h-[688px]'
                beforeForm={
                  <SuiTitle type='h3' className='mb-6 text-center'>
                    Join the ClickHouse Government waitlist
                  </SuiTitle>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className='border-t-2 border-primary-300 bg-neutral-725 text-neutral-0'>
        <div className='section-container grid grid-cols-1 gap-x-12 gap-y-10 space-y-4 py-16 md:grid-cols-2 md:space-y-0 lg:grid-cols-3'>
          {/* Item */}
          <div className='flex items-start gap-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22.9'
              height='26'
              viewBox='0 0 22.9 22.87'
              className='flex-shrink-0'>
              <path
                fill='#FCFF74'
                d='M17.65 0c2.9 0 5.25 2.35 5.25 5.25v12.37c0 2.9-2.35 5.25-5.25 5.25H5.25A5.25 5.25 0 0 1 0 17.62V5.25C0 2.35 2.35 0 5.25 0h12.4Zm0 1.5H5.25A3.75 3.75 0 0 0 1.5 5.25v12.37a3.75 3.75 0 0 0 3.75 3.75h12.4a3.75 3.75 0 0 0 3.75-3.75V5.25a3.75 3.75 0 0 0-3.75-3.75Zm-3.28 4.01 2.24 5.17h1.59c.38 0 .7.28.74.65l.01.1c0 .41-.34.75-.75.75h-2.08a.75.75 0 0 1-.69-.45l-1.72-3.97-3.8 9.58a.75.75 0 0 1-1.33.12l-.05-.1-2.24-5.18H4.7a.75.75 0 0 1-.74-.65l-.01-.1c0-.41.34-.75.75-.75h2.08c.3 0 .57.18.69.45l1.72 3.97 3.8-9.57a.75.75 0 0 1 1.38-.02Z'
              />
            </svg>
            <div className='space-y-3 text-balance'>
              <SuiTitle type='h4'>IT monitoring</SuiTitle>
              <SuiText size='sm' className='leading-relaxed text-neutral-200'>
                Monitor your logs, events, and traces with confidence. Detect
                anomalies, network or infrastructure issues, and more.
              </SuiText>
            </div>
          </div>
          {/* Item */}
          <div className='flex items-start gap-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='26'
              viewBox='0 0 25 21'
              className='flex-shrink-0'>
              <path
                fill='#FCFF74'
                d='M.5 0c.28 0 .5.22.5.5v14.8l7.15-7.15c.2-.2.5-.2.7 0l3.65 3.64L20.3 4h-3.8a.5.5 0 0 1-.5-.41V3.5c0-.28.22-.5.5-.5h5.01a.5.5 0 0 1 .06 0h-.07a.5.5 0 0 1 .35.15h.02a.5.5 0 0 1 .03.05l-.05-.05a.5.5 0 0 1 .15.35v5a.5.5 0 1 1-1 0V4.7l-8.15 8.15a.5.5 0 0 1-.7 0L8.5 9.21 1 16.7V20h23.5a.5.5 0 0 1 .5.41v.09a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5V.5C0 .22.22 0 .5 0Z'
              />
            </svg>
            <div className='space-y-3 text-balance'>
              <SuiTitle type='h4'>Mission analytics</SuiTitle>
              <SuiText size='sm' className='leading-relaxed text-neutral-200'>
                Enable evidence-based decision-making to enhance public services
                at speed and scale without breaking the bank.
              </SuiText>
            </div>
          </div>
          {/* Item */}
          <div className='flex items-start gap-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='23'
              height='26'
              viewBox='0 0 23 26'
              className='flex-shrink-0'>
              <path
                fill='#FCFF74'
                d='M11.5 0A5.5 5.5 0 0 1 17 5.5V9h4.5c.83 0 1.5.67 1.5 1.5v14c0 .83-.67 1.5-1.5 1.5h-20A1.5 1.5 0 0 1 0 24.5v-14C0 9.67.67 9 1.5 9H6V5.5A5.5 5.5 0 0 1 11.5 0ZM22 22H1v2.5c0 .28.22.5.5.5h20a.5.5 0 0 0 .5-.5V22Zm0-4H1v3h21v-3Zm0-4H1v3h21v-3Zm-.5-4h-20a.5.5 0 0 0-.5.5V13h21v-2.5a.5.5 0 0 0-.5-.5Zm-10-9A4.5 4.5 0 0 0 7 5.5V9h9V5.5A4.5 4.5 0 0 0 11.5 1Z'
              />
            </svg>
            <div className='space-y-3 text-balance'>
              <SuiTitle type='h4'>Cybersecurity</SuiTitle>
              <SuiText size='sm' className='leading-relaxed text-neutral-200'>
                Optimize performance with threat detection, event correlation,
                and tracking attack patterns.
              </SuiText>
            </div>
          </div>
        </div>
      </section>

      {/* Government on AWS */}
      <section className='my-16 overflow-hidden lg:my-24'>
        <div className='section-container mx-auto flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-10'>
          {/* Content */}
          <div className='mx-auto max-w-xl space-y-6 text-center text-neutral-200 lg:ml-0 lg:pr-12 lg:text-left'>
            <Image
              width={72}
              height={72}
              src='/images/cloud/bring-your-own-cloud/upload-icon.svg'
              alt='Cloud icon'
              className='mx-auto lg:ml-0'
            />
            <SuiTitle type='h2' className='text-white'>
              ClickHouse Government <br />
              self-managed on AWS
            </SuiTitle>
            <TickItem className='text-balance'>
              Deploy the full power of ClickHouse Cloud as a{' '}
              <strong>self-managed solution</strong> on AWS.
            </TickItem>
            <TickItem className='text-balance'>
              Integrates within <strong>any government network</strong>,
              including FedRAMP Moderate, High, and IL levels 2-6.
            </TickItem>
            <TickItem className='text-balance'>
              Benefit from{' '}
              <strong>included NIST 800-53 compliance documentation</strong> for
              simplified Authority to Operate (ATO).
            </TickItem>
            <TickItem className='text-balance'>
              Delivers all ClickHouse Cloud features with enhanced security,
              including <strong>FIPS 140-3 support</strong>.
            </TickItem>
            <CUIButton
              type='primary'
              className='inline-block'
              onClick={() => setIsModalOpen(true)}>
              Join the waitlist
            </CUIButton>
          </div>

          {/* Image */}
          <div className='relative hidden flex-1 md:block lg:min-h-[568px]'>
            <Image
              src={languageInterface}
              alt='ClickHouse Cloud'
              width={873}
              height={540}
              className='mx-auto h-auto w-full max-w-3xl lg:absolute lg:left-0 lg:top-0 lg:mx-0 lg:h-full lg:!w-auto lg:max-w-none'
            />
          </div>
        </div>
      </section>

      <HRSeparator className='!max-w-none' />

      {/* Comparisons */}
      <section className='section-container my-16 flex flex-col gap-16 lg:my-24 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-10'>
        {/* Content */}
        <div className='mx-auto max-w-xl space-y-6 text-center text-neutral-200 lg:mr-0 lg:text-left'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='72'
            height='73'
            fill='none'
            className='mx-auto lg:ml-0'>
            <rect
              width='70'
              height='70'
              x='1'
              y='1.67'
              stroke='#FAFF69'
              stroke-width='2'
              rx='15'
            />
            <g clip-path='url(#a)'>
              <path
                fill='#FAFF69'
                d='M42.79 23.4c1.85-.7 3.84-1 5.82-.88l.19.02a2 2 0 0 1 1.66 1.66l.02.18.02.38a14.05 14.05 0 0 1-4.1 10.4l-.9.9v9.32a2 2 0 0 1-.45 1.27l-.14.15-5.37 5.37a2 2 0 0 1-3.36-1.01l-.02-.14-.87-6.17-7.14-7.14-6.19-.87a2 2 0 0 1-1.12-3.39l5.36-5.36.15-.14a2 2 0 0 1 1.27-.45h9.32l.9-.9.26-.26a14.03 14.03 0 0 1 4.69-2.94ZM27.07 41.27a.75.75 0 0 1 .36 1.46h-.02l-.12.04-.49.21c-.4.2-.96.55-1.52 1.11-1.02 1.02-2.1 2.8-2.26 5.89 3.09-.16 4.87-1.24 5.89-2.26a5.91 5.91 0 0 0 1.36-2.13v-.02a.75.75 0 0 1 1.46.36l-.73-.18.73.18v.01l-.01.02-.02.06a4.06 4.06 0 0 1-.34.85c-.27.52-.7 1.22-1.4 1.91-1.35 1.36-3.63 2.64-7.35 2.72h-.36a.75.75 0 0 1-.75-.75c0-3.94 1.32-6.32 2.72-7.72a7.41 7.41 0 0 1 2.76-1.73l.06-.02h.02l.16.61-.15-.62Zm9.73 3.5.84 6.04.02.07a.5.5 0 0 0 .32.34.5.5 0 0 0 .51-.12l5.36-5.36.07-.08a.5.5 0 0 0 .08-.28v-7.82l-7.2 7.2ZM48.52 24a12.53 12.53 0 0 0-9.39 3.42l-.23.23L29.56 37 36 43.44l9.34-9.34.23-.23a12.55 12.55 0 0 0 3.41-9.4.5.5 0 0 0-.46-.45Zm-20.9 5a.5.5 0 0 0-.28.08l-.08.07-5.36 5.36a.5.5 0 0 0 .28.85l6.05.84 7.21-7.2h-7.82Z'
              />
            </g>
            <defs>
              <clipPath id='a'>
                <path fill='#fff' d='M16 16.67h40v40H16z' />
              </clipPath>
            </defs>
          </svg>
          <SuiTitle type='h2' className='text-white'>
            Savings and performance gains with ClickHouse Government
          </SuiTitle>
          <SuiText>
            At a time when the government mission is only growing and budgets
            are shrinking, ClickHouse Government utilizes object storage and
            data compression to achieve 3-5x cost reduction while delivering
            2-10x improved performance over other solutions.
          </SuiText>
          <SuiText>
            For more information, check out our{' '}
            <Link
              href='/use-cases?loc=government'
              className='font-bold text-primary-300 hover:underline'>
              use cases
            </Link>{' '}
            page.
          </SuiText>
        </div>

        {/* Grid */}
        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:pr-10'>
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
      </section>

      {/* Architecture */}
      <section className='bg-neutral-725 py-16 lg:py-24'>
        <div className='section-container mx-auto space-y-10 lg:space-y-16'>
          <SuiTitle type='h2' className='text-center'>
            Architecture and components
          </SuiTitle>

          {/* Diagram */}
          <div className='mx-auto max-w-screen-lg rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-4 sm:p-6 lg:p-12'>
            <Image
              src={diagram}
              alt='Architecture and components diagram'
              width={1691 / 2}
              height={1311 / 2}
              className='h-auto w-full'
            />
          </div>

          {/* Features */}
          <ul className='mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 lg:gap-y-8'>
            <li>
              <TickItem>
                Installable via container images for Kubernetes deployments
              </TickItem>
            </li>
            <li>
              <TickItem>
                Automated backups ensure system resiliency and data protection
              </TickItem>
            </li>
            <li>
              <TickItem>
                Kubernetes management is streamlined with our proprietary
                ClickHouse Operator
              </TickItem>
            </li>
            <li>
              <TickItem>
                End-to-end encryption leveraging FIPS 140-3 compliant OpenSSL
              </TickItem>
            </li>
            <li>
              <TickItem>
                APIs facilitate automation for efficient resource management
              </TickItem>
            </li>
            <li>
              <TickItem>
                Automatic vertical scaling dynamically manages fluctuating
                workload demands
              </TickItem>
            </li>
            <li>
              <TickItem>
                Comprehensive NIST 800-53 documentation facilitates ATO from
                FedRAMP Moderate to IL-6.
              </TickItem>
            </li>
            <li>
              <TickItem>
                Granular access controls and data masking to ensure strict data
                privacy and compliance.
              </TickItem>
            </li>
          </ul>
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
          <Form className='mx-auto w-full max-w-[578px]' />
        </div>
      </section>

      {/* Form modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        innerRef={modalInnerRef}>
        <div className='sm:min-w-96'>
          <Form wrapped={false} />
        </div>
      </Modal>
    </Layout>
  )
}

function Form({
  wrapped = true,
  className = '',
  beforeForm,
  afterForm
}: {
  wrapped?: boolean
  className?: string
  beforeForm?: React.ReactNode
  afterForm?: React.ReactNode
}) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <div
      className={`flex flex-col ${wrapped ? 'rounded-lg bg-neutral-900 p-8 shadow-lg' : ''} ${className}`}>
      {!formSuccess && (
        <>
          {beforeForm}
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
                formSuccessRef.current?.scrollIntoView()
              }, 10)

              return false // Stops page from reloading
            }}
          />
          {afterForm}
        </>
      )}

      {!formLoaded && (
        <div className='my-auto text-center'>Loading form...</div>
      )}

      {formSuccess && (
        <div ref={formSuccessRef} className='my-auto text-center'>
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
            maxFontSize={12}
            className='w-full font-bold uppercase text-[#B3B6BD]'>
            Performance
          </FitText>
        </div>
      </CUICard.Footer>
    </CUICard>
  )
}
