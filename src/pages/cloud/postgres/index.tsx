import iconCoins from './assets/icon-coins.svg'
import iconNvme from './assets/icon-nvme.svg'
import iconPlug from './assets/icon-plug.svg'
import logoBeehiiv from './assets/logo-beehiiv.svg'
import logoPolymarket from './assets/logo-polymarket.svg'
import logoRamp from './assets/logo-ramp.svg'
import postgresByClickhouse from './assets/postgres-by-clickhouse.svg'
import TickItem from '@/components-cleaned/TickItem'
import { CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
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
        ...commonProps,
        seo: {
          title: 'Postgres by ClickHouse',
          description:
            "World's fastest and most scalable Postgres, deeply integrated with ClickHouse. Enterprise-grade OLTP meets real-time analytics.",
          path: '/cloud/postgres'
        }
      }
    }
  }

export default function Page({ headerData, seo }: CommonProps) {
  useGalaxyOnPage('postgresByClickhousePage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout headerData={headerData} seo={seo}>
      {/* Hero */}
      <section
        className='section-container bg-shadow-element yellow-shadow my-16 lg:my-24 lg:gap-x-24'
        style={
          {
            '--top-side': '130%',
            '--left-side': '80%'
          } as React.CSSProperties
        }>
        <div className='flex flex-col items-center justify-between gap-10 lg:flex-row'>
          <div className='w-full flex-1 space-y-6 lg:max-w-2xl lg:pr-8'>
            <h1>
              <span className='sr-only'>Postgres by ClickHouse</span>
              <Image
                src={postgresByClickhouse}
                width={478}
                height={123}
                alt=''
                priority
              />
            </h1>
            <SuiText size='lg' className='mt-8 space-y-6 text-neutral-200'>
              <p>
                World's fastest and most scalable Postgres, deeply integrated
                with ClickHouse. Enterprise-grade OLTP meets real-time
                analytics.
              </p>
              <p>Join the waitlist today!</p>
            </SuiText>
          </div>
          <div className='w-full lg:max-w-lg'>
            <CUICard>
              <CUICard.Body className='p-6'>
                {!formSuccess && (
                  <MarketoForm
                    formId={'1517'}
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
                )}

                {!formLoaded && (
                  <div className='text-center'>Loading form...</div>
                )}

                {formSuccess && (
                  <div
                    ref={formSuccessRef}
                    className='flex flex-col items-center py-10 lg:py-20'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='52'
                      height='52'
                      fill='none'
                      viewBox='0 0 52 52'>
                      <path
                        stroke='#CCFFD0'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='3'
                        d='M26 50v0A24 24 0 0 1 2 26v0A24 24 0 0 1 26 2v0a24 24 0 0 1 24 24v0a24 24 0 0 1-24 24Z'
                        clipRule='evenodd'
                      />
                      <path
                        stroke='#CCFFD0'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='3'
                        d='M36.7 20.7 23.3 34l-8-8'
                      />
                    </svg>
                    <h3 className='mb-4 mt-8 text-center text-2xl font-bold'>
                      You’ve been added to the waitlist!
                    </h3>
                    <p className='mt-2 text-center text-neutral-200'>
                      Thank you for your interest in Postgres by ClickHouse
                      <br />
                      <br />
                      We’ll be in touch soon.
                    </p>
                  </div>
                )}
              </CUICard.Body>
            </CUICard>
          </div>
        </div>
      </section>

      {/* Why Postgres by Clickhouse */}
      <section className='bg-black/20 py-16 lg:py-24'>
        <div className='section-container'>
          <SuiTitle type='h2' className='mb-16 text-center'>
            Why Postgres by ClickHouse?
          </SuiTitle>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {[
              {
                icon: iconNvme,
                title: 'NVMe performance',
                description:
                  'Enterprise-grade Postgres on local NVMe storage. Microsecond latency, practically unlimited IOPS, consistent performance without network jitter.',
                bullets: [
                  'Ultra-low latency: μs vs ms',
                  'No EBS throttling or limits',
                  'Validated by Datadog, Instacart',
                  'Full PITR & backups included'
                ]
              },
              {
                icon: iconPlug,
                title: 'ClickHouse integration',
                description:
                  'World-class unification layer between your transactional and analytical workloads. Query both from a single endpoint.',
                bullets: [
                  'pg_clickhouse FDW extension',
                  'CDC via ClickPipes (sub-second)',
                  'Logical Replication v2',
                  'Unified query interface'
                ]
              },
              {
                icon: iconCoins,
                title: 'Cost effective',
                description:
                  'Enterprise capabilities at a fraction of the cost. Powered by infrastructure optimized for database workloads.',
                bullets: [
                  'Powered by Ubicloud',
                  'No per-IOPS pricing',
                  'Predictable costs',
                  'Built by ex-Citus team'
                ]
              }
            ].map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className='relative z-10 flex flex-col gap-6 rounded-lg border border-neutral-700 bg-neutral-800/80 p-6 text-neutral-200 shadow'>
                  <Image
                    src={item.icon}
                    width={64}
                    height={64}
                    alt={item.title}
                  />
                  <SuiTitle type='h3' className='text-white'>
                    {item.title}
                  </SuiTitle>
                  <p>{item.description}</p>
                  <ul className='mt-auto space-y-4'>
                    {item.bullets.map((bullet, bulletIndex) => {
                      return (
                        <li key={bulletIndex}>
                          <TickItem>{bullet}</TickItem>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='bg-primary-300 py-16 text-neutral-900'>
        <p className='mb-8 text-center text-sm font-bold uppercase tracking-wide'>
          Trusted by
        </p>
        <div className='section-container grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <QuoteCard
            className='!bg-neutral-800'
            content='Finally, Postgres performance that matches our growth. The NVMe difference is night and day.'
            logo={{
              src: logoBeehiiv,
              alt: 'Beehiiv'
            }}
          />
          <QuoteCard
            className='!bg-neutral-800'
            content='Real-time analytics on our transactional data without the ETL complexity. Game changer.'
            logo={{
              src: logoPolymarket,
              alt: 'PolyMarket'
            }}
          />
          <QuoteCard
            className='!bg-neutral-800'
            content='The unified query layer means our team ships features faster. One less thing to manage.'
            logo={{
              src: logoRamp,
              alt: 'Ramp'
            }}
          />
        </div>
      </section>
      <HRSeparator />
    </Layout>
  )
}
