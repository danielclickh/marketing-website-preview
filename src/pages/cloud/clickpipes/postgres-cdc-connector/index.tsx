import imageAddPostgresSource from './assets/add-postgres-source.png'
import imageCustomizeIncomingData from './assets/customize-incoming-data.png'
import imageDataSource1 from './assets/data-source-logo-1.png'
import imageDataSource2 from './assets/data-source-logo-2.png'
import imageDataSource3 from './assets/data-source-logo-3.png'
import imageDataSource4 from './assets/data-source-logo-4.png'
import imageDataSource5 from './assets/data-source-logo-5.png'
import imageDataSource6 from './assets/data-source-logo-6.png'
import imageDataSource7 from './assets/data-source-logo-7.png'
import imageDataSource8 from './assets/data-source-logo-8.png'
import imageDataSource9 from './assets/data-source-logo-9.png'
import imageEditPipeInPlace from './assets/edit-pipe-in-place.png'
import logoAdoraPng from './assets/logo-adora.png'
import logoAshby from './assets/logo-ashby.svg'
import logoAutoNation from './assets/logo-autonation.svg'
import logoBlacksmithPng from './assets/logo-blacksmith.png'
import logoDaisychainPng from './assets/logo-dailsychain.png'
import logoNeon from './assets/logo-neon.svg'
import logoOttimate from './assets/logo-ottimate.svg'
import logoSeemplicity from './assets/logo-seemplicity.svg'
import logoSellerFetchPng from './assets/logo-seller-fetch.png'
import logoSpotonPng from './assets/logo-spoton.png'
import logoSyntagePng from './assets/logo-syntage.png'
import logoUnifyPng from './assets/logo-unify.png'
import logoVapiPng from './assets/logo-vapi.png'
import logoVuelingPng from './assets/logo-vueling.png'
import logoVueling from './assets/logo-vueling.svg'
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
          title:
            'Postgres CDC connector in ClickPipes is now Generally Available',
          description:
            'Replicate your Postgres data to ClickHouse Cloud in just a few clicks for blazing fast analytics.',
          path: '/cloud/clickpipes/postgres-cdc-connector'
        },
        ...commonProps
      }
    }
  }

export default function Page({ headerData, seo }: CommonProps) {
  useGalaxyOnPage('postgresCdcPage')

  const logos: Array<ImageProps> = [
    {
      src: logoSellerFetchPng,
      width: 201 / 2,
      height: 115 / 2,
      alt: 'Seller Fetch'
    },
    {
      src: logoSpotonPng,
      width: 313 / 2,
      height: 95 / 2,
      alt: 'SpotOn'
    },
    {
      src: logoVuelingPng,
      width: 247 / 2,
      height: 81 / 2,
      alt: 'Vueling'
    },
    {
      src: logoAshby,
      width: 91.71,
      height: 30,
      alt: 'Ashby'
    },
    {
      src: logoAutoNation,
      width: 141.95,
      height: 30,
      alt: 'AutoNation'
    },
    {
      src: logoSeemplicity,
      width: 186,
      height: 30,
      alt: 'Seemplicity'
    },
    {
      src: logoBlacksmithPng,
      width: 417 / 2,
      height: 53 / 2,
      alt: 'Blacksmith'
    },
    {
      src: logoUnifyPng,
      width: 233 / 2,
      height: 65 / 2,
      alt: 'Unify'
    },
    {
      src: logoSyntagePng,
      width: 321 / 2,
      height: 79 / 2,
      alt: 'Syntage'
    },
    {
      src: logoDaisychainPng,
      width: 394 / 2,
      height: 77 / 2,
      alt: 'Daisychain'
    },
    {
      src: logoAdoraPng,
      width: 277 / 2,
      height: 69 / 2,
      alt: 'Adora'
    },
    {
      src: logoVapiPng,
      width: 211 / 2,
      height: 61 / 2,
      alt: 'Vapi'
    },
    {
      src: logoNeon,
      width: 102,
      height: 28,
      alt: 'Neon'
    },
    {
      src: logoOttimate,
      width: 204.68,
      height: 29.25,
      alt: 'Ottimate'
    }
  ]

  return (
    <Layout seo={seo} headerData={headerData}>
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
                  <Image
                    src='/images/cloud/integrations/postgres.svg'
                    width={64}
                    height={64}
                    alt='Postgres'
                  />
                }
              />
            </div>
            <SuiTitle type='h1'>
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>Postgres CDC</span>
              </span>{' '}
              connector is now Generally Available
            </SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Replicate your Postgres data to ClickHouse Cloud in just a few
              clicks for blazing fast analytics. Eliminates the need for
              external ETL tools that are expensive, slow and not purpose built
              for Postgres.{' '}
              <Link
                href='https://clickhouse.com/docs/en/integrations/clickpipes/postgres'
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
              href='https://console.clickhouse.cloud/signUp?loc=postgresCdcPageHeroCta'
              onClick={useGalaxyOnClick(
                'postgresCdcPage.heroCta.startFreeCloudTrialSelect'
              )}>
              Start a free cloud trial
            </CUIButton>
          </div>
        </div>
      </div>

      {/* Trusted by */}
      <SuiText
        weight='bold'
        size='sm'
        className='mb-8 text-center uppercase tracking-[0.0875rem] text-primary-300'>
        Our postgres CDC connector is already Trusted by
      </SuiText>
      <div className='mask-logos-carousel'>
        <div className='pause-hover hide-scrollbar relative flex overflow-hidden'>
          <div className='flex animate-marqueeLeft items-center whitespace-nowrap'>
            {logos.map((logo, logoIndex) => {
              return (
                <div
                  key={logoIndex}
                  className='w-max flex-shrink-0 flex-grow-0 px-6'>
                  <Image {...logo} className='opacity-75' />
                </div>
              )
            })}
          </div>
          <div className='flex animate-marqueeLeft items-center whitespace-nowrap'>
            {logos.map((logo, logoIndex) => {
              return (
                <div
                  key={logoIndex}
                  className='w-max flex-shrink-0 flex-grow-0 px-6'>
                  <Image {...logo} className='opacity-75' />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className='section-container mb-16 mt-20'>
        <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
          <div className='p-4 lg:w-1/3'>
            <LinedIconCard
              icon='guage'
              title='Blazing-fast'
              text='Achieve 10x faster initial loads with parallel snapshotting, transferring TBs in hours, and experience continuous replication latency of just a few seconds.'
            />
          </div>
          <div className='p-4 lg:w-1/3'>
            <LinedIconCard
              icon='sparkles'
              title='Simple'
              text='Easily replicate your Postgres databases to ClickHouse Cloud in just a few clicks and few minutes!'
            />
          </div>
          <div className='p-4 lg:w-1/3'>
            <LinedIconCard
              icon='maximize'
              title='Flexible'
              text='Connect any Postgres database, hosted or on-prem, including RDS, Azure Flexible Server, CloudSQL, Supabase, Neon, Crunchy Bridge, Tembo, and more.'
            />
          </div>
          <div className='p-4 lg:w-1/3'>
            <LinedIconCard
              icon='tada'
              title='Feature rich'
              text='This connector is purpose-built for Postgres and ClickHouse, supporting features like schema changes, partitioned tables, TOAST columns, customizable ordering keys, and more.'
            />
          </div>
          <div className='p-4 lg:w-1/3'>
            <LinedIconCard
              icon='peerdb'
              title='Powered by PeerDB'
              text='The connector is powered by PeerDB, a leading open-source Postgres CDC provider, which ClickHouse acquired a few months ago. Since PeerDB is open source, there’s no vendor lock-in!'
            />
          </div>
        </div>
      </div>

      {/* Data sources */}
      <div
        className='bg-shadow-element yellow-shadow shadow-circle mt-16 pb-20'
        style={
          {
            '--top-side': '200%',
            '--left-side': '50%'
          } as CSSProperties
        }>
        <div className='section-container'>
          <SuiText
            weight='bold'
            size='sm'
            className='mb-8 text-center uppercase tracking-[0.0875rem] text-primary-300'>
            supports a wide range of Postgres data sources
          </SuiText>
          <div className='flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-16'>
            <Image
              src={imageDataSource1}
              alt='Data source 1'
              width={145 / 3}
              height={145 / 3}
            />
            <Image
              src={imageDataSource2}
              alt='Data source 2'
              width={118 / 3}
              height={119 / 3}
            />
            <Image
              src={imageDataSource3}
              alt='Data source 3'
              width={119 / 3}
              height={119 / 3}
            />
            <Image
              src={imageDataSource4}
              alt='Data source 4'
              width={128 / 3}
              height={132 / 3}
            />
            <Image
              src={imageDataSource5}
              alt='Data source 5'
              width={99 / 3}
              height={132 / 3}
            />
            <Image
              src={imageDataSource6}
              alt='Data source 6'
              width={145 / 3}
              height={145 / 3}
            />
            <Image
              src={imageDataSource7}
              alt='Data source 7'
              width={130 / 3}
              height={126 / 3}
            />
            <Image
              src={imageDataSource8}
              alt='Data source 8'
              width={152 / 3}
              height={138 / 3}
            />
            <Image
              src={imageDataSource9}
              alt='Data source 9'
              width={139 / 3}
              height={126 / 3}
            />
          </div>
        </div>
      </div>

      {/* Quotes */}
      <div className='relative z-10 bg-neutral-700 py-20'>
        <div className='section-container'>
          <SuiTitle type='h2' className='mb-16 text-center'>
            What our customers are saying
          </SuiTitle>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10'>
            <QuoteCard
              className='bg-neutral-900/80'
              content={
                "ClickHouse powers Ashby's customer-facing analytics, delivering lightning-fast, fully dynamic insights, while Postgres handles core transactions. With Postgres CDC via ClickPipes, we seamlessly replicate terabytes of data and speed up our real-time analytics without disrupting operations. Reports that once took minutes now finish within a second. Complementing Postgres with ClickHouse enables us to provide a lightning-fast and fully reliable experience and handle even larger data as we scale."
              }
              logo={{
                src: logoAshby,
                width: 91.71 * 1.2,
                height: 30 * 1.2,
                alt: 'Ashby'
              }}
            />
            <QuoteCard
              className='bg-neutral-900/80'
              content={
                'We are having an amazing experience using the Postgres CDC connector in ClickPipes. We seamlessly moved our 30TB Aurora database to ClickHouse Cloud and are continuously keeping it in sync. We did not expect any ETL tool to handle our load, especially after a bitter experience in the past. However, we were pleasantly surprised by how reliable and performant ClickPipes has been for us.'
              }
              logo={{
                src: logoSyntagePng,
                width: 321 / 2,
                height: 79 / 2,
                alt: 'Syntage'
              }}
            />
            <QuoteCard
              className='bg-neutral-900/80'
              content={
                'We already reduced our Postgres to ClickHouse snapshot times from 10+ hours down to 15 minutes with PeerDB. Combining ClickHouse’s powerful analytics natively with PeerDB’s real-time data capture capabilities will greatly simplify our data processing workflows. This integration will enable us to build analytical applications faster, giving us a competitive edge in the market.'
              }
              logo={{
                src: logoVueling,
                width: 140,
                height: 44,
                alt: 'Vueling'
              }}
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='bg-shadow-element yellow-shadow shadow-circle my-24'>
        <div className='section-container relative z-10 space-y-16 lg:space-y-28 lg:pt-6'>
          <FeatureSection
            image={{
              src: imageAddPostgresSource,
              width: 1036 / 2,
              height: 777 / 2,
              alt: 'Add Postgres Source'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Easily add your Postgres source
            </SuiTitle>
            <TickItem>
              In ClickHouse Cloud, go to Data Sources --&gt; Set up a{' '}
              <br className='hidden md:block' />
              ClickPipe, and select Postgres CDC
            </TickItem>
            <TickItem>
              Postgres can be running anywhere - cloud or on-prem
            </TickItem>
            <TickItem>Secure the connection with SSH tunneling</TickItem>
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
            <TickItem>Number of rows per table / GB ingested</TickItem>
            <TickItem>Native Postgres metrics, including slot size</TickItem>
            <TickItem>Alerts for potential issues</TickItem>
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
      <div className='section-container my-20 md:px-8 lg:my-28 2xl:px-0'>
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
            href='https://console.clickhouse.cloud/signUp?loc=postgresCdcPageFooterCta'
            onClick={useGalaxyOnClick(
              'postgresCdcPage.footerCta.createFreeAccountSelect'
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
