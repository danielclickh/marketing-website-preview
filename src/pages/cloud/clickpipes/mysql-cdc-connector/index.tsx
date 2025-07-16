import imageAddMysqlSource from './assets/add-mysql-source.png'
import imageCustomizeIncomingData from './assets/customize-incoming-data.png'
import imageEditPipeInPlace from './assets/edit-pipe-in-place.png'
import logoBrainRocket from './assets/logo-brainrocket.svg'
import logoNocd from './assets/logo-nocd.svg'
import logoTicketSwap from './assets/logo-ticketswap.svg'
import imageMonitorPipe from './assets/monitor-pipe.png'
import TickItem from '@/components-cleaned/TickItem'
import CdcAnimation from '@/components/CdcAnimation'
import { CUIButton } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import QuoteCard from '@/components/QuoteCard'
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
          title: 'MySQL CDC connector in ClickPipes is now in Public Beta',
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
                  <div className='-mr-4 flex aspect-square items-center justify-center rounded-lg border border-neutral-700 p-3'>
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
            <SuiTitle type='h1'>
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>MySQL CDC</span>
              </span>{' '}
              connector is now in Public Beta
            </SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Seamlessly replicate your MySQL data to ClickHouse Cloud with just
              a few clicks. Get real-time analytics without the complexity or
              cost of external ETL tools.{' '}
              <Link
                href='/docs/integrations/clickpipes/mysql'
                className='text-primary-300 hover:underline'>
                Learn more
              </Link>
              .
            </SuiText>
            <CUIButton
              type='primary'
              size='lg'
              className='group mx-auto mt-8 px-10'
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=mysqlCdcPageHeroCta'
              onClick={useGalaxyOnClick(
                'mysqlCdcPage.heroCta.startFreeCloudTrialSelect'
              )}>
              Start a free cloud trial
            </CUIButton>
          </div>
        </div>
      </div>

      {/* Cards  */}
      <div className='relative z-10 pb-20'>
        <div className='section-container'>
          <div className='-mx-4 flex flex-col lg:mx-auto lg:max-w-4xl lg:flex-row lg:flex-wrap lg:justify-center'>
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

      {/* Quotes */}
      <div className='relative z-10 bg-neutral-700 py-20'>
        <div className='section-container'>
          <SuiTitle type='h2' className='mb-16 text-center'>
            What our customers are saying
          </SuiTitle>
          <div className='grid grid-cols-1 gap-8 lg:gap-10'>
            <QuoteCard
              className='bg-neutral-900/80'
              direction='horizontal'
              content={
                "Previously, our CDC workflows relied on a complex broker-based streaming infrastructure. This approach was not only resource-intensive but also required significant operational overhead.\n\nWe've transitioned to using the MySQL CDC connector in ClickPipes, and the impact has been transformative. ClickPipes has allowed us to modernize our data pipeline, reduce maintenance costs, and focus on delivering value through analytics rather than infrastructure management. No more managing clusters, brokers, or custom connectors - ClickPipes just works out of the box."
              }
              logo={{
                src: logoBrainRocket,
                width: 110,
                height: 36,
                alt: 'Brain Rocket',
                className:
                  'saturate-0 brightness-0 invert lg:saturate-100 lg:brightness-100 lg:invert-0'
              }}
            />
            <QuoteCard
              className='bg-neutral-900/80'
              direction='horizontal'
              content={
                'ClickPipes MySQL CDC connector has been an excellent tool for us to stream our data into Clickhouse . It offered reliable, real-time replication with about a one-minute delay. It was simple to set up, cost-effective, handled both historical and ongoing sync smoothly, and supports private VPC networking to keep our data secure. ClickPipes, paired with ClickHouse Cloud, gives us true real-time analytics without the complexity. It just works!'
              }
              logo={{
                src: logoNocd,
                width: 110,
                height: 36,
                alt: 'NOCD',
                className:
                  'saturate-0 brightness-0 invert lg:saturate-100 lg:brightness-100 lg:invert-0'
              }}
            />
            <QuoteCard
              className='bg-neutral-900/80'
              direction='horizontal'
              content={
                'We’ve been using the MySQL CDC connector in ClickPipes and are thoroughly impressed. Data transfer speeds are excellent, even when syncing our largest tables (over 1TB) and performance has been consistently reliable. It’s a robust solution for moving high-volume data from OLTP databases to ClickHouse Cloud for real-time analytics.\n' +
                '\n' +
                'Throughout the beta, the team was incredibly responsive, resolving issues quickly and clearly.'
              }
              logo={{
                src: logoTicketSwap,
                width: 110,
                height: 36,
                alt: 'TicketSwap',
                className:
                  'saturate-0 brightness-0 invert lg:saturate-100 lg:brightness-100 lg:invert-0'
              }}
            />
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
