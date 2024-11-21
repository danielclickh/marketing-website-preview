import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { CSSProperties } from 'react'
import { CUIButton, CUICard } from '../../../../components/ClickUI'
import Layout from '../../../../components/Layout'
import PostgresCdcAnimation from '../../../../components/PostgresCdcAnimation'
import PostgresCdcWaitlistForm from '../../../../components/PostgresCdcWaitlistForm'
import QuoteCard from '../../../../components/QuoteCard'
import { SuiText, SuiTitle } from '../../../../components/sui'
import {
  useGalaxyOnClick,
  useGalaxyOnPage
} from '../../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../../types/homepage'
import imageAddPostgresSource from './add-postgres-source.png'
import imageCustomizeIncomingData from './customize-incoming-data.png'
import dots from './dots.png'
import imageEditPipeInPlace from './edit-pipe-in-place.png'
import iconFast from './icon-fast.svg'
import iconMaximize from './icon-maximize.svg'
import iconParty from './icon-party.svg'
import iconPeerdb from './icon-peerdb.svg'
import iconStars from './icon-stars.svg'
import imageMonitorPipe from './monitor-pipe.png'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title:
            'Postgres CDC connector in ClickPipes is now in Private Preview',
          description:
            'Replicate your Postgres data to ClickHouse Cloud in just a few clicks for blazing fast analytics.',
          path: '/cloud/clickpipes/postgres-cdc-connector'
        },
        ...commonProps
      }
    }
  }

export default function Page({ headerData, footerData, seo }: CommonProps) {
  useGalaxyOnPage('postgresCdcPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <div className='relative my-10 lg:mb-20'>
        <div className='section-container relative z-10 lg:py-20'>
          <div className='flex flex-col items-center justify-between gap-10 lg:flex-row'>
            <div className='w-full flex-1 space-y-6 lg:max-w-2xl'>
              <h4 className='text-base font-semibold text-primary-300'>
                <Link href='/cloud'>Cloud</Link> / Data ingestion
              </h4>
              <SuiTitle type='h1' className='lg:!text-4xl'>
                Postgres CDC connector in ClickPipes is now in Private Preview
              </SuiTitle>
              <SuiText size='lg' className='text-neutral-200'>
                Replicate your Postgres data to ClickHouse Cloud in just a few
                clicks for blazing fast analytics.
              </SuiText>
              <SuiText size='lg' className='text-neutral-200'>
                Eliminates the need for external ETL tools that are expensive,
                slow and not purpose built for Postgres. Join the waitlist now.
              </SuiText>
              <PostgresCdcAnimation />
            </div>
            <div className='w-full lg:max-w-lg'>
              <CUICard>
                <CUICard.Body className='p-4 lg:p-6'>
                  <PostgresCdcWaitlistForm />
                </CUICard.Body>
              </CUICard>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className='section-container my-20'>
        <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
          <div className='p-4 lg:w-1/3'>
            <IconCard
              icon={{
                src: iconFast,
                width: 32,
                height: 32,
                alt: 'Fast icon'
              }}>
              <SuiTitle type='h3' className='!text-2xl'>
                Blazing-fast
              </SuiTitle>
              <SuiText className='text-balance text-white/70'>
                Achieve 10x faster initial loads with parallel snapshotting,
                transferring TBs in hours, and experience continuous replication
                latency of just a few seconds.
              </SuiText>
            </IconCard>
          </div>
          <div className='p-4 lg:w-1/3'>
            <IconCard
              icon={{
                src: iconStars,
                width: 32,
                height: 32,
                alt: 'Stars icon'
              }}>
              <SuiTitle type='h3' className='!text-2xl'>
                Simple
              </SuiTitle>
              <SuiText className='text-balance text-white/70'>
                Easily replicate your Postgres databases to ClickHouse Cloud in
                just a few clicks and few minutes!
              </SuiText>
            </IconCard>
          </div>
          <div className='p-4 lg:w-1/3'>
            <IconCard
              icon={{
                src: iconMaximize,
                width: 32,
                height: 32,
                alt: 'Maximize icon'
              }}>
              <SuiTitle type='h3' className='!text-2xl'>
                Flexible
              </SuiTitle>
              <SuiText className='text-balance text-white/70'>
                Connect any Postgres database, hosted or on-prem, including RDS,
                Azure Flexible Server, CloudSQL, Supabase, Neon, Crunchy Bridge,
                Tembo, and more.
              </SuiText>
            </IconCard>
          </div>
          <div className='p-4 lg:w-1/3'>
            <IconCard
              icon={{
                src: iconParty,
                width: 32,
                height: 32,
                alt: 'Party icon'
              }}>
              <SuiTitle type='h3' className='!text-2xl'>
                Feature rich
              </SuiTitle>
              <SuiText className='text-balance text-white/70'>
                This connector is purpose-built for Postgres and ClickHouse,
                supporting features like schema changes, partitioned tables,
                TOAST columns, customizable ordering keys, and more.
              </SuiText>
            </IconCard>
          </div>
          <div className='p-4 lg:w-1/3'>
            <IconCard
              icon={{
                src: iconPeerdb,
                width: 32,
                height: 32,
                alt: 'PeerDB icon'
              }}>
              <SuiTitle type='h3' className='!text-2xl'>
                Powered by PeerDB
              </SuiTitle>
              <SuiText className='text-balance text-white/70'>
                The connector is powered by{' '}
                <Link href='#' className='text-primary hover:underline'>
                  PeerDB
                </Link>
                , a leading open-source Postgres CDC provider, which ClickHouse
                acquired a few months ago. Since PeerDB is open source, there’s
                no vendor lock-in!
              </SuiText>
            </IconCard>
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
              content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
              logo={{
                src: '/images/use-cases/real-time-analytics/cloudflare-logo.svg',
                width: 123,
                height: 41,
                alt: 'Cloudflare'
              }}
            />
            <QuoteCard
              className='bg-neutral-900/80'
              content={`Mattis sapien ullamcorper vivamus viverra ultrices curabitur in. Rhoncus arcu aenean himenaeos nec dolor auctor scelerisque nascetur.`}
              logo={{
                src: '/images/use-cases/real-time-analytics/cloudflare-logo.svg',
                width: 123,
                height: 41,
                alt: 'Cloudflare'
              }}
            />
            <QuoteCard
              className='bg-neutral-900/80'
              content={`Lectus elementum torquent magna sollicitudin augue dignissim taciti venenatis rhoncus. Cras vestibulum urna molestie quam accumsan. Dapibus sagittis ad eleifend sociosqu aliquet bibendum ad. `}
              logo={{
                src: '/images/use-cases/real-time-analytics/cloudflare-logo.svg',
                width: 123,
                height: 41,
                alt: 'Cloudflare'
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
              src: imageAddPostgresSource,
              width: 1036 / 2,
              height: 777 / 2,
              alt: 'Add Postgres Source'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Easily add your Postgres source
            </SuiTitle>
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

      {/* Footer form */}
      <div className='relative my-20 bg-neutral-700 py-20'>
        <Image
          src={dots}
          width={612 / 2}
          height={400 / 2}
          alt='Dots'
          className='pointer-events-none absolute left-0 top-0'
        />
        <Image
          src={dots}
          width={612 / 2}
          height={400 / 2}
          alt='Dots'
          className='pointer-events-none absolute bottom-0 right-0 rotate-180'
        />
        <div className='section-container'>
          <div className='mx-auto w-full lg:max-w-xl'>
            <CUICard className='bg-neutral-900/80'>
              <CUICard.Body className='p-4 lg:p-6'>
                <div className='mb-4 space-y-4 text-center lg:mb-6'>
                  <SuiTitle type='h2'>Get early access</SuiTitle>
                  <SuiText className='opacity-70'>
                    Join the waitlist to get access to the Postgres CDC
                    connector
                  </SuiText>
                </div>
                <PostgresCdcWaitlistForm />
              </CUICard.Body>
            </CUICard>
          </div>
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
            href='https://clickhouse.cloud/signUp?loc=postgresCdcPageFooterCta'
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
