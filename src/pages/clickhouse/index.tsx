import heroTerminal from './assets/hero-terminal.svg'
import Layout from '@/components/Layout'
import TiltedText from '@/components/TiltedText'
import { SuiCodeblock, SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'Real-Time Data Analytics Platform | ClickHouse',
          description:
            'Get real-time insights with ClickHouse, the high-performance data analytics platform. Reap the benefits of streamlined data analysis and try for free today.',
          path: '/clickhouse',
          languages: ['en', 'ja']
        },
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  seo,
  headerData,
  footerData,
  platforms
}: CommonProps) {
  useGalaxyOnPage('productOpenSourcePage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='relative overflow-hidden bg-grid py-16 lg:py-24'>
        <div className='absolute -bottom-6 left-0 z-0 aspect-[1512/524] w-full bg-contain bg-center bg-no-repeat lg:bg-speed-lines' />
        <div className='section-container relative z-10 flex flex-col gap-y-20 lg:flex-row lg:items-center lg:gap-x-20'>
          {/* Content */}
          <div className='max-w-2xl'>
            <SuiTitle type='h1' className='mb-6 lg:!text-5.5xl'>
              The{' '}
              <TiltedText type='black-on-yellow' className='px-2'>
                fastest
              </TiltedText>{' '}
              open-source analytical database
            </SuiTitle>
            <SuiText size='lg' className='space-y-6 text-neutral-200'>
              <p>
                Open-source. Column-orientated. Built for blazingly fast
                analytics with SQL.
              </p>
              <p>
                Applied to data warehousing, real-time analytics, observability
                and ML/GenAI workloads. One database to rule them all.
              </p>
            </SuiText>
          </div>

          {/* Installer */}
          <div className='px-6 lg:px-0 xl:-mr-20'>
            <div className='relative'>
              <Image
                src={heroTerminal}
                width={91}
                height={130}
                alt=''
                className='absolute left-0 top-0 z-20 aspect-[91/130] w-14 -translate-x-1/4 -translate-y-1/3 lg:w-auto'
              />
              <div className='absolute -bottom-3 -left-3 right-3 top-1/4 z-0 rounded-lg bg-primary-300' />
              <div className='relative z-10 space-y-8 rounded-lg border border-neutral-700 bg-neutral-800 p-8 shadow-lg lg:p-16'>
                <div className='space-y-4'>
                  <SuiTitle type='h2' className='lg:!text-2.75xl'>
                    Start using ClickHouse in minutes
                  </SuiTitle>
                  <p className='text-neutral-200'>
                    Install ClickHouse for macOS, Linux, and FreeBSD
                  </p>
                </div>
                <SuiCodeblock
                  showCopy={true}
                  copyValue='curl https://clickhouse.com/ | sh'
                  className='mx-auto flex w-full items-center gap-3 text-center md:pr-24'>
                  <span className='hidden text-primary sm:inline'>$</span>
                  <span>curl https://clickhouse.com/ | sh</span>
                </SuiCodeblock>
                <div className='space-y-4 text-sm text-neutral-500'>
                  <p>
                    Or install for{' '}
                    <Link
                      href='/docs/en/integrations/sql-clients/clickhouse-client-local'
                      className='underline transition-colors hover:text-neutral-100'>
                      Windows
                    </Link>
                    ,{' '}
                    <Link
                      href='https://hub.docker.com/r/clickhouse/clickhouse-server/'
                      className='underline transition-colors hover:text-neutral-100'>
                      Docker
                    </Link>{' '}
                    or see other{' '}
                    <Link
                      href='/docs/en/install'
                      className='underline transition-colors hover:text-neutral-100'>
                      install options
                    </Link>
                    .
                  </p>
                  <p>
                    Watch this{' '}
                    <Link
                      href='/company/events/getting-started-with-clickhouse'
                      className='text-primary-300 hover:underline'>
                      getting started video
                    </Link>{' '}
                    to learn more about ClickHouse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
