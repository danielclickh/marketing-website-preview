import hero from './assets/hero.png'
import logoJerry from './assets/logo-jerry.svg'
import logoTekion from './assets/logo-tekion.svg'
import logoTesla from './assets/logo-tesla.svg'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import enterprise from '@/components/LinedIconCard/assets/enterprise.svg'
import guage from '@/components/LinedIconCard/assets/guage.svg'
import sparkles from '@/components/LinedIconCard/assets/sparkles.svg'
import tada from '@/components/LinedIconCard/assets/tada.svg'
import QuoteCard from '@/components/QuoteCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          path: '/industries/automotive',
          title: ' Automotive analytics in real time with ClickHouse',
          description:
            'Power automotive analytics with ClickHouse—track vehicle performance, monitor factory data, and ingest telemetry at scale. Real-time dashboards, crash insights, and predictive maintenance, all without lag.',
          keywords:
            ' automotive analytics, vehicle telemetry, real-time dashboards, performance monitoring, ClickHouse automotive, factory monitoring, EV analytics, connected car data, predictive maintenance, in-car data processing'
        },
        ...commonProps
      }
    }
  }

export default function GamingIndustryPage({
  seo,
  headerData,
  footerData
}: CommonProps) {
  useGalaxyOnPage('automotiveIndustryPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container relative z-10 flex flex-wrap items-center justify-between lg:flex-nowrap lg:items-start'>
          {/* Content column */}
          <div className='mx-auto w-full space-y-4 text-center text-neutral-200 lg:max-w-lg lg:text-left xl:max-w-xl'>
            <p className='font-bold text-primary-300'>
              Industries / Automotive
            </p>
            <SuiTitle type='h1' className='text-white md:!text-5.5xl'>
              Automotive, accelerated in real-time with ClickHouse
            </SuiTitle>
            <SuiText>
              <strong>The real-time database that never lags.</strong> Ingest
              millions of rows per second. Handle the most heavily concurrent
              workloads. All without compromising query speed.
            </SuiText>
            <TickItem className='text-left'>
              <strong>Automotive Performance Monitoring (APM)</strong> - track
              vehicle performance, logs, and telemetry in real time with crash
              analytics and performance tracking.
            </TickItem>
            <TickItem className='text-left'>
              <strong>Effortlessly handle high-concurrency workloads</strong>{' '}
              needed to power real-time dashboards, live vehicle state tracking,
              EV charging analytics, and telemetry.
            </TickItem>
            <TickItem className='text-left'>
              <strong>Factory monitoring</strong> - ingest metrics, machine
              monitoring, assembly line analytics, and predictive maintenance &
              asset health.
            </TickItem>
            <TickItem className='text-left'>
              <strong>Connected Car</strong> - predictive maintenance, remote
              diagnostics, EV charging station analytics, battery-health
              optimization, and track update roll-outs.
            </TickItem>
            <div className='!mt-8 flex flex-col gap-6 sm:flex-row sm:justify-center lg:justify-start'>
              <CUIButton
                type='primary'
                size='lg'
                className='w-full !px-10 sm:w-auto'
                target='_blank'
                href='https://console.clickhouse.cloud/signUp?loc=industry-automotive-hero-cta'
                onClick={useGalaxyOnClick(
                  'automotiveIndustryPage.heroCta.getStartedTodaySelect'
                )}>
                Get started today
              </CUIButton>
              <CUIButton
                type='primary-dark'
                size='lg'
                className='w-full !px-10 sm:w-auto'
                target='_blank'
                href='/company/contact?loc=industry-automotive-hero-cta'
                onClick={useGalaxyOnClick(
                  'automotiveIndustryPage.heroCta.contactSalesSelect'
                )}>
                Contact sales
              </CUIButton>
            </div>
          </div>

          {/* Image column */}
          <div className='mx-auto mt-16 hidden w-full lg:block'>
            <Image
              src={hero}
              alt='Automtive'
              width={1295 / 1.5}
              height={891 / 1.5}
              className='h-auto w-full'
              loading='eager'
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className='bg-shadow-element relative bg-neutral-725 py-16 lg:py-24'
        style={
          {
            '--top-side': '25%',
            '--left-side': '20%',
            '--scale': '0.8',
            '--opacity': '0.05'
          } as React.CSSProperties
        }>
        <div className='section-container lg:flex lg:items-center lg:justify-between lg:gap-x-12'>
          <div className='mx-auto max-w-lg space-y-6 pb-10 text-center lg:mx-0 lg:pb-0 lg:text-left'>
            <Image
              src='/images/icon-shield.svg'
              alt='icon'
              className='mx-auto xl:mx-0'
              width={72}
              height={72}
            />
            <SuiTitle type='h2'>
              Unify telemetry for real-time automotive analytics
            </SuiTitle>
            <SuiText className='text-neutral-200'>
              Bring together vehicle, fleet, and factory telemetry to power live
              dashboards, real-time insights, and predictive maintenance—see why
              leading companies rely on ClickHouse for automotive analytics.
            </SuiText>
            <CUIButton
              type='primary'
              href='/company/contact?loc=industry-automotive-unify-telemetry'
              linkClass='inline-block'>
              Talk to an expert
            </CUIButton>
          </div>
          <div className='mx-auto w-full max-w-2xl space-y-4 lg:mr-0'>
            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                01
              </span>
              <div className='pl-6'>
                <span className='text-primary'>
                  Built for high-speed event ingestion
                </span>{' '}
                - process millions of in-car events per second with native
                support for streaming sources like Kafka, Kinesis, and Pub/Sub.
              </div>
            </div>
            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                02
              </span>
              <div className='pl-6'>
                <span className='text-primary'>
                  Powerful domain-specific functions
                </span>{' '}
                - SQL functions designed for event-driven data, help you analyze
                driver behavior, optimize vehicle mechanics, and improve ad
                performance.
              </div>
            </div>
            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                03
              </span>
              <div className='pl-6'>
                <span className='text-primary'>
                  High concurrency, zero slowdown.
                </span>{' '}
                ClickHouse powers real-time dashboards, driver dashboards,
                in-car ads, and live telemetry—handling massive user loads with
                instant responsiveness, unlike traditional data warehouses.
              </div>
            </div>

            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                04
              </span>
              <div className='pl-6'>
                <span className='text-primary'>
                  Native support for OpenTelemetry (OTel)
                </span>{' '}
                - Capture logs, traces, and performance data in real-time.
                Enable low-latency telemetry for monitoring driver experience,
                vehicle crashes, and detecting anomalies.
              </div>
            </div>

            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                05
              </span>
              <div className='pl-6'>
                <span className='text-primary'>
                  Secure by design, built for compliance
                </span>{' '}
                - Safeguard driver data with CMEK, BYOC support, fine-grained
                access controls, and built-in GDPR-compliant TTLs and deletes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className='bg-shadow-element relative bg-neutral-725 pb-16'
        style={
          {
            '--top-side': '45%',
            '--right-side': '20%',
            '--left-side': 'auto',
            '--scale': '0.8',
            '--opacity': '0.05'
          } as React.CSSProperties
        }>
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-1/2 bg-primary-300' />
        <div className='section-container relative z-10'>
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <div className='space-y-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0'>
              <QuoteCard
                link='/blog/how-tesla-built-quadrillion-scale-observability-platform-on-clickhouse'
                content='Data in ClickHouse is better than data anywhere else. No other system lets you slice and dice your data, ask interesting questions, and get answers in an acceptable amount of time.'
                logo={{
                  src: logoTesla,
                  width: 173 * 0.8,
                  height: 24 * 0.8,
                  alt: 'Tesla'
                }}
              />
              <QuoteCard
                content='Over one quadrillion rows ingested, “with not a single hiccup, not a single issue. Memory was flat, CPU consumption was flat. It was just a thing of beauty to behold."'
                link='/blog/how-tesla-built-quadrillion-scale-observability-platform-on-clickhouse'
                logo={{
                  src: logoTesla,
                  width: 173 * 0.8,
                  height: 24 * 0.8,
                  alt: 'Tesla'
                }}
              />
              <QuoteCard
                content='Auto-insurance ecommerce use-case - real-time funnel, A/B-test, and pricing analytics for car-insurance and loan comparison at 20× faster queries and a fraction of Redshift’s cost with ClickHouse'
                logo={{
                  src: logoJerry,
                  width: 82 * 1.2,
                  height: 20 * 1.2,
                  alt: 'Jerry'
                }}
              />
              <QuoteCard
                content='Tekion’s automotive retail cloud provides real-time dealer-software insights powered by ClickHouse Cloud, slashing storage 10×, sustaining 1.2 million records-per-minute ingest without lag, and cutting query latency to sub-0.5s'
                link='/blog/tekion-adopts-clickhouse-cloud-to-power-application-performance-and-metrics-monitoring'
                logo={{
                  src: logoTekion,
                  width: 179 * 0.8,
                  height: 20 * 0.8,
                  alt: 'Tekion'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='section-container my-16 lg:my-24'>
        <div className='space-y-6 text-center'>
          <Image
            src='/images/icon-shield.svg'
            alt='icon'
            className='mx-auto inline-block'
            width={72}
            height={72}
          />
          <SuiTitle type='h2'>Real-time speed at warehouse scale</SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse is used across industries to power systems and
            applications where real-time analysis, evaluation, and querying are
            critical.
          </SuiText>
        </div>
        <div className='my-12 flex w-full flex-col gap-6 md:flex-row'>
          <div className='relative flex-1 basis-full items-center space-y-6 overflow-hidden rounded-md border border-neutral-700 bg-neutral-725 p-6 text-left lg:w-1/3'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <TickItem className='!mt-1 text-sm'>
              User-facing dashboards and apps
            </TickItem>
            <TickItem className='text-sm'>E-commerce optimisation</TickItem>
            <TickItem className='text-sm'>Retail analytics</TickItem>
            <TickItem className='text-sm'>Supply chain optimisation</TickItem>
          </div>
          <div className='relative flex-1 basis-full items-center space-y-6 overflow-hidden rounded-md border border-neutral-700 bg-neutral-725 p-6 text-left lg:w-1/3'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <TickItem className='!mt-1 text-sm'>Fraud selection</TickItem>
            <TickItem className='text-sm'>Threat prevention</TickItem>
            <TickItem className='text-sm'>Proactive maintenance</TickItem>
            <TickItem className='text-sm'>Inteligent automation</TickItem>
          </div>
          <div className='relative flex-1 basis-full items-center space-y-6 overflow-hidden rounded-md border border-neutral-700 bg-neutral-725 p-6 text-left lg:w-1/3'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <TickItem className='!mt-1 text-sm'>
              User centric analytics
            </TickItem>
            <TickItem className='text-sm'>
              Trend evaluation and monitoring
            </TickItem>
            <TickItem className='text-sm'>Gaming analytics</TickItem>
            <TickItem className='text-sm'>
              Advertising and marketing analysis
            </TickItem>
          </div>
        </div>
        <div className='space-y-6 text-center'>
          <CUIButton
            type='primary'
            href='/company/contact?loc=industry-automotive-warehouse-scale'
            linkClass='inline-block'>
            Talk to an expert
          </CUIButton>
        </div>
      </section>

      {/* Callouts */}
      <section className='section-container my-16 grid justify-between gap-20 lg:my-24 lg:grid-cols-2'>
        <div className='space-y-6'>
          <Image
            src={guage}
            alt='guage'
            width={72}
            height={72}
            className='aspect-square w-[72px] rounded border border-jet bg-black/40 object-scale-down object-center shadow-sm'
          />
          <SuiTitle type='h3'>
            Unlock real-time insights and user experiences
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            Whether you’re performing live analysis to drive business outcomes
            or building interactive user-facing applications, ClickHouse
            delivers the unparalleled speed-to-insight you can depend on.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image
            src={tada}
            alt='tada'
            width={72}
            height={72}
            className='aspect-square w-[72px] rounded border border-jet bg-black/40 object-scale-down object-center shadow-sm'
          />
          <SuiTitle type='h3'>Simplify your SQL</SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse supports an extensive library of domain-specific
            functions that transform even the most complex queries into simple
            SQL statements. With ClickHouse, real-time data exploration is easy
            and powerful.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image
            src={sparkles}
            alt='sparkles'
            width={72}
            height={72}
            className='aspect-square w-[72px] rounded border border-jet bg-black/40 object-scale-down object-center shadow-sm'
          />
          <SuiTitle type='h3'>Manage data efficiently</SuiTitle>
          <SuiText className='text-neutral-200'>
            With highly optimized compression techniques and our fully
            parallelized query pipeline, ClickHouse maximizes CPU efficiency and
            provides the power to quickly process huge volumes of compressed
            data.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image
            src={enterprise}
            alt='enterprise'
            width={72}
            height={72}
            className='aspect-square w-[72px] rounded border border-jet bg-black/40 object-scale-down object-center shadow-sm'
          />
          <SuiTitle type='h3'>Scale effortessly</SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse scales both vertically and horizontally to meet the
            demands of any workload — read and write — to systems with hundreds
            of cores and petabytes of storage. ClickHouse provides the
            scalability you need to effortlessly handle increasing data volumes
            and workloads over time.
          </SuiText>
        </div>
      </section>

      {/* Get started */}
      <section className='section-container my-16 lg:my-24'>
        <GetStartedFree
          href='https://console.clickhouse.cloud/signUp?loc=industry-automotive-getstarted-footer'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </section>
    </Layout>
  )
}
