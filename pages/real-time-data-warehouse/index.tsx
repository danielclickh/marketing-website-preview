import { GetStaticProps } from 'next'
import Image from 'next/image'
import HRSeparator from '../../components/HRSeparator'
import Layout from '../../components/Layout'
import { SuiText, SuiTitle } from '../../components/sui'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import React, { useEffect, useRef, useState } from 'react'
import { CUIButton } from '../../components/ClickUI'
import { HomePageProps } from '../../types/homepage'

export const getStaticProps: GetStaticProps = async function getStaticProps() {
  const commonProps = await getCommonProps()

  return {
    props: {
      seo: {
        title: 'Real-time Data Warehouse - ClickHouse',
        description: '',
        path: '/real-time-data-warehouse'
      },
      ...commonProps
    }
  }
}

export default function Page({ footerData, headerData, seo }: HomePageProps) {
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        {/* Hero */}
        <div className='bg-primary-300 py-16 lg:py-24'>
          <div className='section-container mx-auto'>
            <div className='flex flex-wrap items-center gap-12 lg:flex-nowrap lg:gap-16'>
              {/* Content column */}
              <div className='flip-selection w-full text-neutral-900 lg:w-2/5'>
                <SuiTitle type='h1' weight='bold'>
                  The{' '}
                  <span className='tilted tilted-black'>
                    <span className='tilted-content text-white'>real-time</span>
                  </span>{' '}
                  data warehouse
                </SuiTitle>
                <SuiText size='lg' weight='medium' className='my-6'>
                  ClickHouse is optimized to power data-intensive applications
                  that run on real-time and historical data. <br />
                  With blazing speed and high concurrency.
                </SuiText>
                <CUIButton
                  href='/company/contact'
                  type='primary-dark'
                  size='lg'
                  className='!px-6'>
                  Try it for free
                </CUIButton>
              </div>

              {/* Image */}
              <div className='w-full lg:ml-auto lg:w-auto'>
                <Image
                  src='/images/real-time-data-warehouse-hero.svg'
                  width={628}
                  height={383}
                  alt='Real-time data warehouse'
                />
              </div>
            </div>
          </div>
        </div>

        {/* What is RT data warehouse */}
        <div className='section-container my-24'>
          <div className='mx-auto mb-24 flex max-w-[830px] flex-col items-center gap-6 text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='80'
              height='80'
              fill='none'
              viewBox='0 0 80 80'>
              <rect
                width='78'
                height='78'
                x='1'
                y='1'
                stroke='#FAFF69'
                strokeWidth='2'
                rx='7'
              />
              <g
                stroke='#FAFF69'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'>
                <path d='M40 40c9.1127 0 16.5-4.0294 16.5-9s-7.3873-9-16.5-9-16.5 4.0294-16.5 9 7.3873 9 16.5 9Z' />
                <path d='M23.5 31v9c0 4.9706 7.3875 9 16.5 9s16.5-4.0294 16.5-9v-9' />
                <path d='M23.5 40v9c0 4.9706 7.3875 9 16.5 9s16.5-4.0294 16.5-9v-9' />
              </g>
            </svg>
            <SuiTitle type='h2'>What is a real-time data warehouse?</SuiTitle>
            <SuiText className='opacity-70'>
              Analytics push traditional data warehouses, lakes, and
              transactional databases to their limits – not just in terms of
              performance, but also with skyrocketing costs. A real-time data
              warehouse is purpose-built for fast, reliable, and cost-effective
              querying at any scale, and excels at powering workloads that
              operate on both real-time and historical data.
            </SuiText>
          </div>
          <div className='mx-auto max-w-[1010px]'>
            <YesNoTable
              yesHeading='Real-time data warehouse'
              noHeading='Traditional cloud data warehouse'
              rows={[
                {
                  label: 'Performance',
                  yes: 'Engineered to handle highly concurrent workloads that back user-facing applications',
                  no: 'High query latency and concurrency limitations are commonplace'
                },
                {
                  label: 'Hardware efficiency',
                  yes: 'Optimized to manage and query petabytes of data, with best-in-class compression ratios for the most efficient storage usage',
                  no: 'Can create data bloat and inefficient usage of system resources'
                },
                {
                  label: 'Scale',
                  yes: 'Delivers unparalleled performance for analytical workloads at scale',
                  no: 'Analytics scales inadequately as data volumes increase'
                },
                {
                  label: 'Complexity',
                  yes: "Simplified developer experience that's easy to manage and scale",
                  no: 'Can lead to growing operational complexity'
                },
                {
                  label: 'Cost',
                  yes: 'Maximizes cost-effectiveness',
                  no: 'Costly for many workloads'
                }
              ]}
            />
          </div>
          <CUIButton
            href='/company/contact'
            type='primary'
            size='lg'
            className='mx-auto mt-16 !px-6'>
            Try it for free
          </CUIButton>
        </div>
        <HRSeparator className='my-24' />

        {/* Why use RT data warehouse */}
        <div className='section-container my-24'>
          <div className='mx-auto mb-24 flex max-w-[830px] flex-col items-center gap-6 text-center'>
            <SuiTitle type='h2'>Why use a real-time data warehouse?</SuiTitle>
            <SuiText className='max-w-[600px] opacity-70'>
              Companies leverage ClickHouse Cloud as their real-time data
              warehouse to ensure that analytics shine at any scale.
            </SuiText>
          </div>
        </div>
      </Layout>
    </>
  )
}

function YesNoTable({
  yesHeading,
  noHeading,
  rows
}: {
  yesHeading: string
  noHeading: string
  rows: Array<{ label: string; yes: string; no: string }>
}) {
  const [highlightOffset, setHighlightOffset] = useState<number>(0)
  const yesColRef = useRef<HTMLTableHeaderCellElement>(null)

  useEffect(() => {
    const calculatePosition = () => {
      if (yesColRef.current) {
        setHighlightOffset(yesColRef.current.offsetLeft)
      }
    }

    // Set initial values on mount
    calculatePosition()

    window.addEventListener('resize', calculatePosition)
    return () => window.removeEventListener('resize', calculatePosition)
  }, [yesColRef])

  function Yes({
    children,
    className,
    ...props
  }: React.HTMLProps<HTMLDivElement>) {
    return (
      <div className={`flex gap-4 ${className}`} {...props}>
        <div className='w-4 flex-shrink-0 flex-grow-0 text-primary'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='none'
            viewBox='0 0 16 16'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13.3337 4.33331 6.00033 11.6666 2.66699 8.33331'
            />
          </svg>
        </div>
        <div className='flex-1'>{children}</div>
      </div>
    )
  }

  function No({
    children,
    className,
    ...props
  }: React.HTMLProps<HTMLDivElement>) {
    return (
      <div className={`flex gap-4 ${className}`} {...props}>
        <div className='w-4 flex-shrink-0 flex-grow-0 text-[#FFBABA]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='m8 8 8 8m0-8-8 8'
            />
          </svg>
        </div>
        <div className='flex-1'>{children}</div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile table */}
      <div className='space-y-8 md:hidden'>
        <div>
          <h3 className='mb-6 text-xl font-semibold'>{noHeading}</h3>
          <ul>
            {rows.map(({ label, no }) => {
              return (
                <li className='mt-4 border-t border-neutral-700 pt-4'>
                  <No>
                    <div className='text-sm font-bold uppercase text-[#B3B6BD]'>
                      {label}
                    </div>
                    <div className='font-medium'>{no}</div>
                  </No>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='rounded-lg border-2 border-primary-300 p-6 shadow-xl shadow-primary-300/40'>
          <h3 className='mb-6 text-xl font-semibold'>{yesHeading}</h3>
          <ul>
            {rows.map(({ label, yes }) => {
              return (
                <li className='mt-4 border-t border-neutral-700 pt-4'>
                  <Yes>
                    <div className='text-sm font-bold uppercase text-[#B3B6BD]'>
                      {label}
                    </div>
                    <div className='font-medium'>{yes}</div>
                  </Yes>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Desktop table */}
      <div className='relative hidden pb-3 md:block'>
        <div
          className='absolute left-0 top-0 right-0 bottom-0 z-10 rounded-lg border-2 border-primary-300 shadow-xl shadow-primary-300/40'
          style={{ left: highlightOffset }}></div>
        <table className='relative z-20 w-full text-left'>
          <thead>
            <tr>
              <th className='hidden border-b border-neutral-700 py-6 pr-8 text-xl font-semibold lg:table-cell xl:pr-16'></th>
              <th className='w-[38%] border-b border-neutral-700 py-6 pr-6 text-xl font-semibold'>
                {noHeading}
              </th>
              <th
                className='w-[46%] border-b border-neutral-700 py-6 px-6 text-xl font-semibold'
                ref={yesColRef}>
                {yesHeading}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, yes, no }) => {
              return (
                <tr className='min-h-12' key={label}>
                  <th className='hidden border-b border-neutral-700 py-4 pr-8 lg:table-cell xl:pr-16'>
                    <span className='text-sm font-bold uppercase text-[#B3B6BD]'>
                      {label}
                    </span>
                  </th>
                  <td
                    valign='top'
                    className='border-b border-neutral-700 py-4 pr-6'>
                    <No>
                      <div className='text-sm font-bold uppercase text-[#B3B6BD] lg:hidden'>
                        {label}real-time-data-warehouse
                      </div>
                      <div className='font-medium'>{no}</div>
                    </No>
                  </td>
                  <td
                    valign='top'
                    className='border-b border-neutral-700 py-4 px-6'>
                    <Yes>
                      <div className='text-sm font-bold uppercase text-[#B3B6BD] lg:hidden'>
                        {label}
                      </div>
                      <div className='font-medium'>{yes}</div>
                    </Yes>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
