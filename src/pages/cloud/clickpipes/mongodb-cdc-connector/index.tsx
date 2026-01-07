import imageAddMongoSource from './assets/add-mongodb-source.png'
import imageCustomizeIncomingData from './assets/customize-incoming-data.png'
import imageEditPipeInPlace from './assets/edit-pipe-in-place.png'
import imageMonitorPipe from './assets/monitor-pipe.png'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import TickItem from '@/components-cleaned/TickItem'
import CdcAnimation from '@/components/CdcAnimation'
import CdcWaitlistForm from '@/components/CdcWaitlistForm'
import { CUIButton, CUICard } from '@/components/ClickUI'
import DotsContainer from '@/components/DotsContainer'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
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
          title:
            'MongoDB CDC connector in ClickPipes is now in Private Preview',
          description:
            'Replicate your MongoDB data to ClickHouse Cloud in just a few clicks for blazing fast analytics.',
          path: '/cloud/clickpipes/mongodb-cdc-connector'
        },
        ...commonProps
      }
    }
  }

export default function Page({ headerData, footerData, seo }: CommonProps) {
  useGalaxyOnPage('mongodbCdcPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}{' '}
      <div
        className='bg-shadow-element yellow-shadow shadow-circle relative my-20 lg:my-24'
        style={
          {
            '--top-side': '130%',
            '--left-side': '80%'
          } as CSSProperties
        }>
        <div className='section-container relative z-10'>
          <div className='mx-auto w-full space-y-6 text-center lg:max-w-4xl'>
            <div className='mb-10 flex justify-center'>
              <CdcAnimation
                logo={
                  <div className='-mr-4 flex aspect-square w-20 items-center justify-center rounded-lg border border-[#113C55] bg-[#081E2B]'>
                    <Image
                      src='/images/cloud/integrations/mongodb.svg'
                      width={24}
                      height={50}
                      alt='MongoDB'
                      className='m-3'
                    />
                  </div>
                }
                badges={[
                  { label: 'insert', theme: 'yellow' },
                  { label: 'insert', theme: 'yellow' },
                  { label: 'update', theme: 'blue' },
                  { label: 'delete', theme: 'red' },
                  { label: 'replace', theme: 'blue' },
                  { label: 'add col', theme: 'yellow' }
                ]}
              />
            </div>
            <SuiTitle type='h1'>
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>MongoDB CDC</span>
              </span>{' '}
              connector is now in Public Beta
            </SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Replicate your MongoDB data to ClickHouse Cloud in just a few
              clicks for blazing fast analytics. Eliminates the need for
              external ETL tools that are expensive, slow and not purpose built
              for MongoDB.
            </SuiText>
            <CUIButton
              type='primary'
              size='lg'
              className='group mx-auto mt-8 px-10'
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=mongodbCdcPageHeroCta'
              onClick={useGalaxyOnClick(
                'mongodbCdcPage.heroCta.startFreeCloudTrialSelect'
              )}>
              Start a free cloud trial
            </CUIButton>
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className='relative z-10 bg-neutral-700 py-20'>
        <div className='section-container'>
          <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='maximize'
                title='Advanced JSON Support'
                text={`Seamlessly replicate MongoDB's rich document structures using ClickHouse's powerful native JSON data type. The connector preserves document structure and enables high-performance analytical queries on semi-structured data.`}
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='double-tick'
                title='Real-time replication'
                text={`Leverages MongoDB’s native Change Streams to capture document changes at scale, keeping TBs of data in sync with ClickHouse in real-time, with latencies as low as a few seconds.`}
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='guage'
                title='Blazing-fast analytics'
                text='Integrates MongoDB with ClickHouse, enabling up to 100x faster analytics on your documents while continuing to run transactions reliably on MongoDB.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='sparkles'
                title='Simple'
                text='Easily replicate your MongoDB databases to ClickHouse Cloud in just a few clicks and few minutes!'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/3'>
              <LinedIconCard
                icon='peerdb'
                title='No vendor lock-in'
                text='The MongoDB CDC connector is powered by PeerDB, an open-source project. Except for the UI, all components extend directly from PeerDB, ensuring no vendor lock-in.'
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
              src: imageAddMongoSource,
              width: 1036 / 2,
              height: 964 / 2,
              alt: 'Add MongoDB Source'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Easily add your MongoDB source
            </SuiTitle>
            <TickItem>
              MongoDB can be running anywhere - cloud or on-prem
            </TickItem>
            <TickItem>
              Multiple replication modes: one-time load, CDC, or both
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
            <TickItem>Fixed field extraction</TickItem>
            <TickItem>JSON field-level filtering coming soon</TickItem>
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
            <TickItem>Built-in logging for full visibility</TickItem>
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
