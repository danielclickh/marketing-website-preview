import imageAddBigquerySource from './assets/add-bigquery-source.png'
import imageCustomizeIncomingData from './assets/customize-incoming-data.png'
import imageEditPipeInPlace from './assets/edit-pipe-in-place.png'
import imageMonitorPipe from './assets/monitor-pipe.png'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import TickItem from '@/components-cleaned/TickItem'
import CdcWaitlistForm from '@/components/CdcWaitlistForm'
import { CUIButton, CUICard } from '@/components/ClickUI'
import DotsContainer from '@/components/DotsContainer'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import ScaleToContainer from '@/components/ScaleToContainer'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { CSSProperties } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'BigQuery connector in ClickPipes is now in Private Preview',
          description:
            'Replicate your BigQuery data to ClickHouse Cloud in just a few clicks for blazing fast analytics.',
          path: '/cloud/clickpipes/bigquery-connector'
        },
        ...commonProps
      }
    }
  }

export default function Page({ headerData, footerData, seo }: CommonProps) {
  useGalaxyOnPage('mysqlCdcPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <div className='relative my-10 lg:mb-20'>
        <div className='section-container relative z-10 lg:py-20'>
          <div className='flex flex-col items-center justify-between gap-10 lg:flex-row'>
            <div className='w-full flex-1 space-y-6 lg:max-w-2xl lg:pr-8'>
              <Breadcrumbs>
                <Breadcrumbs.Link href='/cloud'>Cloud</Breadcrumbs.Link>
                <Breadcrumbs.Link href='/cloud/clickpipes'>
                  Data ingestion
                </Breadcrumbs.Link>
              </Breadcrumbs>
              <SuiTitle type='h1' className='lg:!text-4xl'>
                BigQuery connector in ClickPipes is now in Private Preview
              </SuiTitle>
              <SuiText size='lg' className='text-neutral-200'>
                Sync your BigQuery data to ClickHouse Cloud in just a few clicks
                for blazing fast analytics. Eliminates the need for external ETL
                tools and custom data pipelines, which are expensive, slow, and
                not optimized for ClickHouse.
              </SuiText>
              <ScaleToContainer scaleUp={false}>
                <div className='pointer-events-none relative w-max select-none'>
                  <div className='absolute inset-x-20 top-1/2 z-0 -translate-y-1/2'>
                    <AnimatedDataLine size={300} direction='right' />
                  </div>
                  <div className='relative z-10 flex items-center gap-12'>
                    <div className='flex w-20 flex-shrink-0 flex-grow-0 items-center justify-center'>
                      <div className='flex aspect-square w-20 items-center justify-center rounded border border-jet bg-neutral-900/80'>
                        <Image
                          src='/images/cloud/integrations/google-bigquery.svg'
                          width={50}
                          height={50}
                          alt='BigQuery'
                          className='m-3'
                        />
                      </div>
                    </div>
                    <div className='flex-grow-1 relative flex w-44 flex-shrink-0 flex-col items-center justify-center gap-y-4'>
                      <p className='absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-1/2 font-inconsolata text-xs'>
                        Data loading
                      </p>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='232'
                        height='239'
                        fill='none'
                        viewBox='0 0 232 239'
                        className='size-12 animate-[spin_2s_linear_infinite_reverse]'>
                        <path
                          fill='#fff'
                          d='m21.04 60.34-3.3-2.27-.15.23-.12.25zm43.08 162.25-2.18 3.36.06.04.07.04zm167.34-50.4-42.55 17.96 36.83 27.87zm-46.32-152.2 2.05-3.44c-7.23-4.32-17.01-8.57-28.42-11.68l-1.05 3.86-1.06 3.86c10.79 2.94 19.89 6.92 26.43 10.83zM124.43 4l.05-4C105.67-.25 85.13 3.5 65.3 14.13l1.9 3.52 1.89 3.52c18.45-9.9 37.6-13.4 55.28-13.16zM40.14 37.56l-2.78-2.87a153 153 0 0 0-19.61 23.38l3.3 2.27 3.29 2.26a145 145 0 0 1 18.58-22.17zm-19.1 22.78-3.57-1.8A181 181 0 0 0 6.02 86.87l3.83 1.16 3.82 1.17a174 174 0 0 1 10.95-27.06zM4.07 121.3l-4-.14c-.71 20.44 3.99 40.47 15.46 59.22l3.42-2.09 3.4-2.09c-10.6-17.33-14.94-35.8-14.29-54.76zm36.43 83-2.73 2.92q10.48 9.77 24.17 18.72l2.18-3.36 2.18-3.35a169 169 0 0 1-23.07-17.86zm23.62 18.28-2.05 3.44c7.29 4.35 17.78 8.14 30.08 10.5l.75-3.94.75-3.92c-11.66-2.23-21.2-5.76-27.48-9.51zm63.35 12.24.23 4c19.44-1.1 40.47-6.11 60.09-17.41l-2-3.47-2-3.46c-18.35 10.57-38.13 15.32-56.54 16.35z'
                        />
                      </svg>
                    </div>
                    <div className='relative w-20 flex-shrink-0 flex-grow-0'>
                      <div className='absolute inset-0 animate-fadeInOut bg-primary-300/60 blur-lg' />
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='72'
                        height='72'
                        viewBox='0 0 72 72'
                        className='relative z-10 h-auto w-full'>
                        <g fill='none'>
                          <rect width='72' height='72' fill='#FAFF69' rx='4' />
                          <path
                            fill='#161517'
                            d='M21.41 15.75c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 18 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 27 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 36 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 45 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 15.75c.6 0 1.09.49 1.09 1.09v6.82c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 54 39.41v-6.82c0-.6.49-1.09 1.09-1.09h2.32Z'
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </ScaleToContainer>
              <SuiText size='lg' className='text-neutral-200'>
                Join the waitlist today!
              </SuiText>
            </div>
            <div className='w-full lg:max-w-lg'>
              <CUICard>
                <CUICard.Body className='p-4 lg:p-6'>
                  <CdcWaitlistForm formId='1515' />
                </CUICard.Body>
              </CUICard>
            </div>
          </div>
        </div>
      </div>

      {/* Cards  */}
      <div className='relative z-10 bg-neutral-700 py-20'>
        <div className='section-container'>
          <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='guage'
                title='Blazing-fast analytics'
                text={
                  <>
                    Integrates BigQuery with ClickHouse, enabling up to 4x
                    faster queries with 21x cost savings for real-time
                    analytics.
                    <br />
                    See{' '}
                    <Link
                      href='/comparison/bigquery'
                      className='text-primary-300 hover:underline'>
                      ClickHouse vs. BigQuery comparison
                    </Link>
                    .
                  </>
                }
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='cloud-tick'
                title='Efficient initial syncs'
                text='Syncs terabytes of existing data within a few hours, with support for table- and column-level filtering.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='double-tick'
                title={
                  <>
                    Incremental syncs
                    <br />
                    <small className='text-base opacity-70'>
                      (coming soon)
                    </small>
                  </>
                }
                text='Leverages query-based Change Data Capture (CDC) to capture new data in BigQuery, enabling incremental loads at scheduled intervals to keep both databases in sync.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='enterprise'
                title='Fully managed experience'
                text='Enables syncing BigQuery data in just a few clicks, with built-in monitoring and alerting. Supports automation and infrastructure-as-code configuration via OpenAPI and Terraform.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='peerdb'
                title='No vendor lock-in'
                text='The BigQuery connector is powered by PeerDB, an open-source project. Except for the UI, all components extend directly from PeerDB, ensuring no vendor lock-in.'
                className='bg-neutral-900/80'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div
        className='bg-shadow-element yellow-shadow shadow-circle my-24'
        style={
          {
            '--top-side': '0',
            '--right-side': '50%',
            '--left-side': 'auto'
          } as CSSProperties
        }>
        <div className='section-container relative z-10 space-y-16 lg:space-y-28 lg:pt-6'>
          <FeatureSection
            image={{
              src: imageAddBigquerySource,
              width: 1036 / 2,
              height: 964 / 2,
              alt: 'Add BigQuery Source'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Easily add your BigQuery source
            </SuiTitle>
            {/*<TickItem>BigQuery can be running anywhere - cloud or on-prem</TickItem>*/}
            {/*<TickItem>Multiple replication modes: one-time load, CDC, or both</TickItem>*/}
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            flip={true}
            image={{
              src: imageCustomizeIncomingData,
              width: 1019 / 2,
              height: 679 / 2,
              alt: 'Customize Incoming Data'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Customize incoming data
            </SuiTitle>
            <TickItem>Table-level filtering</TickItem>
            <TickItem>Column-level filtering</TickItem>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            image={{
              src: imageMonitorPipe,
              width: 1168 / 2,
              height: 667 / 2,
              alt: 'Monitor Pipe'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Monitor your pipe
            </SuiTitle>
            {/*<TickItem>Track throughput (rows or GB ingested) and latency over time</TickItem>*/}
            {/*<TickItem>Detailed table-level metrics</TickItem>*/}
            {/*<TickItem>Built-in logging for full visibility</TickItem>*/}
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            flip={true}
            image={{
              src: imageEditPipeInPlace,
              width: 1298 / 2,
              height: 1029 / 2,
              alt: 'Edit Pipe In-Place'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Edit pipe in-place
            </SuiTitle>
            <TickItem>Add more tables in just a few clicks</TickItem>
            <TickItem>
              Change replication settings, including data freshness
            </TickItem>
            <TickItem>Blazing-fast resyncs</TickItem>
          </FeatureSection>
        </div>
      </div>

      {/* Footer form */}
      <DotsContainer className='my-20'>
        <div className='mx-auto w-full lg:max-w-xl'>
          <CUICard className='bg-neutral-900/80'>
            <div className='my-4 space-y-4 text-center lg:mb-4 lg:mt-6'>
              <SuiTitle type='h2'>Get early access</SuiTitle>
              <SuiText className='opacity-70'>
                Join the waitlist to get access to the BigQuery connector
              </SuiText>
            </div>
            <CUICard.Body className='p-4 lg:p-6'>
              <CdcWaitlistForm formId='1515' />
            </CUICard.Body>
          </CUICard>
        </div>
      </DotsContainer>

      {/* Get started */}
      <div className='section-container my-20 md:px-8 2xl:px-0'>
        <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-16 text-center'>
          <SuiTitle type='h2' color='text-default'>
            Get started with ClickHouse{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content text-white'>Cloud</span>
            </span>{' '}
            for free
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            We’ll get you started on a 30 day trial and $300 credits to spend at
            your own pace.
          </SuiText>
          <CUIButton
            type='primary-dark'
            size='lg'
            className='group mx-auto mt-8'
            target='_blank'
            href='https://console.clickhouse.cloud/signUp?loc=mysqlCdcPageFooterCta'
            onClick={useGalaxyOnClick(
              'mysqlCdcPage.footerCta.createFreeAccountSelect'
            )}>
            Create a free account
          </CUIButton>
        </div>
      </div>
    </Layout>
  )
}

function FeatureSection({
  image,
  children,
  flip = false
}: {
  image: ImageProps
  children: React.ReactNode
  flip?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-x-16 ${
        flip ? 'md:flex-row-reverse' : 'md:flex-row'
      } justify-center`}>
      <div className='mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
        <div className='space-y-4 border-yellow-200 md:border-l-4 md:pl-8'>
          {children}
        </div>
      </div>
      <div className='flex items-center justify-center md:w-1/2'>
        <Image {...image} alt={image.alt || ''} />
      </div>
    </div>
  )
}
