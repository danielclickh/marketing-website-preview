import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { CSSProperties } from 'react'
import CdcAnimation from '../../../../components/CdcAnimation'
import CdcWaitlistForm from '../../../../components/CdcWaitlistForm'
import { CUIButton, CUICard } from '../../../../components/ClickUI'
import DotsContainer from '../../../../components/DotsContainer'
import Layout from '../../../../components/Layout'
import LinedIconCard from '../../../../components/LinedIconCard'
import { SuiText, SuiTitle } from '../../../../components/sui'
import {
  useGalaxyOnClick,
  useGalaxyOnPage
} from '../../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../../types/homepage'
import imageAddMysqlSource from './assets/add-mysql-source.png'
import imageCustomizeIncomingData from './assets/customize-incoming-data.png'
import imageEditPipeInPlace from './assets/edit-pipe-in-place.png'
import imageMonitorPipe from './assets/monitor-pipe.png'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'MySQL CDC connector in ClickPipes is now in Private Preview',
          description:
            'Replicate your MySQL data to ClickHouse Cloud in just a few clicks for blazing fast analytics.',
          path: '/cloud/clickpipes/mysql-cdc-connector'
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
              <h4 className='text-base font-semibold text-primary-300'>
                <Link href='/cloud'>Cloud</Link> / Data ingestion
              </h4>
              <SuiTitle type='h1' className='lg:!text-4xl'>
                MySQL CDC connector in ClickPipes is now in Private Preview
              </SuiTitle>
              <SuiText size='lg' className='text-neutral-200'>
                Seamlessly replicate your MySQL data to ClickHouse Cloud with
                just a few clicks. Get real-time analytics without the
                complexity or cost of external ETL tools.
              </SuiText>
              <SuiText size='lg' className='text-neutral-200'>
                Join the waitlist today!
              </SuiText>
              <CdcAnimation
                logo={
                  <div className='aspect-square flex items-center justify-center border border-neutral-700 rounded-lg p-3 -mr-4'>
                    <Image
                      src='/images/cloud/integrations/mysql.svg'
                      width={64}
                      height={64}
                      alt='MySQL'
                    />
                  </div>
                }
              />
            </div>
            <div className='w-full lg:max-w-lg'>
              <CUICard>
                <CUICard.Body className='p-4 lg:p-6'>
                  <CdcWaitlistForm formId='1365' />
                </CUICard.Body>
              </CUICard>
            </div>
          </div>
        </div>
      </div>

      {/* Cards  */}
      <div className='relative z-10 bg-neutral-700 py-20'>
        <div className='section-container'>
          <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center lg:max-w-4xl lg:mx-auto'>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='guage'
                title='Blazing-fast'
                text='Blazing-fast performance with few seconds CDC latency on ClickHouse. Optimized with chunking, parallel ingest through replicas, and future-ready for parallel snapshotting.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='tada'
                title='Feature rich'
                text='Designed specifically for MySQL and ClickHouse, with support for schema changes, rich data types incl. vectors, POS and GTID replication, edit pipes, parallel ingest via replicas and more.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='sparkles'
                title='Simple'
                text='Easily replicate your MySQL databases to ClickHouse Cloud in just a few clicks and few minutes. Skip complex pipelines with multiple moving parts and failure points.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='enterprise'
                title='Enterprise-grade'
                text='Built to support enterprise-grade workloads with TBs of data, fully secured through SSH tunneling, Private Link, and IP-based access controls.'
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
              src: imageAddMysqlSource,
              width: 1036 / 2,
              height: 777 / 2,
              alt: 'Add MySQL Source'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Easily add your MySQL source
            </SuiTitle>
            <TickItem>
              MySQL can be running anywhere - cloud or on-prem
            </TickItem>
            <TickItem>Secure the connection with SSH tunneling</TickItem>
            <TickItem>
              Multiple replication modes: one-time, CDC, or both.
            </TickItem>
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
            <TickItem>Column-level granular settings</TickItem>
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
            <TickItem>
              Track throughput (rows or GB ingested) and latency over time
            </TickItem>
            <TickItem>Detailed table-level metrics</TickItem>
            <TickItem>Inbuilt logging for full visibility</TickItem>
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
            <div className='my-4 space-y-4 text-center lg:mt-6 lg:mb-4'>
              <SuiTitle type='h2'>Get early access</SuiTitle>
              <SuiText className='opacity-70'>
                Join the waitlist to get access to the MySQL CDC connector
              </SuiText>
            </div>
            <CUICard.Body className='p-4 lg:p-6'>
              <CdcWaitlistForm formId='1365' />
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

function IconCard({
  icon,
  children
}: {
  icon: ImageProps
  children: React.ReactNode
}) {
  return (
    <CUICard className='relative overflow-hidden p-8'>
      <div className='absolute left-0 right-0 top-0 h-1 bg-primary-300' />
      <CUICard.Body className='space-y-4 text-center'>
        <Image
          {...icon}
          className='mx-auto aspect-square w-[72px] rounded border border-jet bg-black/40 object-scale-down object-center shadow-sm'
          alt='icon image'
        />
        {children}
      </CUICard.Body>
    </CUICard>
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

function TickItem({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: React.HTMLProps<HTMLDivElement>['className']
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className='flex-shrink-0 flex-grow-0'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='18'
          fill='none'
          viewBox='0 0 25 18'>
          <path
            stroke='#FCFF74'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M23.32 1.67 8.65 16.33 2 9.67'
          />
        </svg>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
