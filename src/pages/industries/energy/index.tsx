import hero from './assets/hero.png'
import logoEnjins from './assets/logo-enjins.png'
import logoNovo from './assets/logo-novo.png'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import ContentTicker from '@/components-cleaned/ContentTicker'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import enterprise from '@/components/LinedIconCard/assets/enterprise.svg'
import guage from '@/components/LinedIconCard/assets/guage.svg'
import sparkles from '@/components/LinedIconCard/assets/sparkles.svg'
import tada from '@/components/LinedIconCard/assets/tada.svg'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps, HomePageProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

interface PageProps extends CommonProps {
  stories: Pick<HomePageProps, 'customerStories'>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const [commonProps, stories] = await Promise.all([
      getCommonProps(),
      findOne('homepage', {
        populate: [
          'customerStories',
          'customerStories.*',
          'customerStories.logos.*',
          'customerStories.logos.darkLogoPng'
        ]
      })
    ]) as [Awaited<ReturnType<typeof getCommonProps>>, Pick<HomePageProps, 'customerStories'>]

    return {
      props: {
        stories,
        seo: {
          path: '/industries/energy',
          title:
            'The fastest real-time database for Energy analytics — ClickHouse',
          description:
            'Harness ClickHouse for energy data at scale. Ingest millions of rows per second, enable predictive maintenance, optimize grids, and deliver real-time insights with the fastest open-source database.',
          keywords:
            'energy analytics, real-time energy analytics, energy database, energy data platform, ClickHouse energy, smart grid analytics, renewable energy data, predictive maintenance energy, energy supply chain optimization, energy facility monitoring, energy asset management, energy operations analytics, real-time insights energy, energy cost optimization, energy customer experience, energy data monetization, energy performance monitoring'
        },
        ...commonProps
      }
    }
  }

export default function EnergyIndustryPage({
  seo,
  headerData,
  stories
}: PageProps) {
  useGalaxyOnPage('energyIndustryPage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <Layout seo={seo} headerData={headerData}>
      {/* Hero */}
      <section
        className='bg-shadow-element yellow-shadow my-16 lg:my-24'
        style={
          {
            '--top-side': '60%',
            '--right-side': '20%',
            '--left-side': 'auto'
          } as React.CSSProperties
        }>
        <div className='section-container relative z-10 flex flex-wrap justify-between gap-y-16 lg:flex-nowrap'>
          {/* Content column */}
          <div className='mx-auto w-full space-y-4 text-center text-neutral-200 lg:ml-0 lg:max-w-lg lg:text-left xl:max-w-2xl'>
            <Breadcrumbs>
              <Breadcrumbs.Link href='/industries'>Industries</Breadcrumbs.Link>
              <Breadcrumbs.Item>Energy</Breadcrumbs.Item>
            </Breadcrumbs>
            <SuiTitle type='h1' className='text-white md:!text-5.5xl'>
              Energy, accelerated in real-time with ClickHouse
            </SuiTitle>
            <SuiText>
              <strong>The real-time database that never lags.</strong> Ingest
              millions of rows per second. Handle the most heavily concurrent
              workloads. All without compromising query speed.
            </SuiText>
            <div className='!my-8 flex flex-col gap-6 sm:flex-row sm:justify-center lg:justify-start'>
              <CUIButton
                type='primary'
                size='lg'
                className='w-full !px-10 sm:w-auto'
                target='_blank'
                href='https://console.clickhouse.cloud/signUp?loc=industry-energy-hero-cta'
                onClick={useGalaxyOnClick(
                  'energyIndustryPage.heroCta.getStartedTodaySelect'
                )}>
                Get started today
              </CUIButton>
              {/*<CUIButton
                type='secondary'
                size='lg'
                className='w-full !px-10 sm:w-auto'
                target='_blank'
                href='/company/contact?loc=industry-energy-hero-cta'
                onClick={useGalaxyOnClick(
                  'energyIndustryPage.heroCta.contactSalesSelect'
                )}>
                Talk to an expert
              </CUIButton>*/}
            </div>
            <ul className='space-y-4 text-left text-neutral-200'>
              <li>
                <TickItem>
                  <strong>Unpredictable supply chains:</strong> Global
                  disruptions have become the norm. Detect issues in real time
                  to reroute shipments, rebalance production, and avoid costly
                  downtime in energy supply.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Margins under pressure:</strong> Every decision must
                  count. Our high-performance analytics help you optimize energy
                  distribution, reduce operational costs, and improve asset
                  utilization without adding infrastructure bloat.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Software-defined energy systems shift:</strong> Energy
                  grids are now platforms. Process real-time sensor data from
                  smart grids, renewable energy sources, and consumption
                  patterns at scale, enabling better resource allocation and
                  faster innovation.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Growing customer expectations:</strong> Today’s energy
                  consumers expect hyper-personalized experiences and real-time
                  insights into their energy usage. Enable real-time insights
                  into consumption behavior, preferences, and usage patterns,
                  helping you monetize data while delighting customers.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Facility monitoring:</strong> Ingest metrics,
                  equipment monitoring, production line analytics, and
                  predictive maintenance & asset health for energy facilities.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Massive-scale data ingestion:</strong> Ingest and
                  process millions of logs, metrics, time series, events, and
                  transactions per second.
                </TickItem>
              </li>
            </ul>
          </div>

          {/* Form column */}
          <div className='w-full lg:max-w-lg' id='get-in-touch'>
            <div className='relative overflow-hidden rounded-lg bg-neutral-900/80 p-6 text-center shadow-lg lg:p-8'>
              <SuiTitle type='h3' className='mb-2'>
                Get in touch with a ClickHouse expert
              </SuiTitle>
              <SuiText className='mb-6 text-neutral-200'>
                Tell us about your use case
              </SuiText>
              <MarketoForm
                formId='1124'
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
              {!formLoaded && (
                <div className='my-auto text-center'>Loading form...</div>
              )}
              {formSuccess && (
                <div
                  ref={formSuccessRef}
                  className='absolute inset-0 z-10 my-auto flex flex-col items-center justify-center bg-neutral-900/90 text-center backdrop-blur'>
                  <h3 className='text-2xl font-bold'>Thank you!</h3>
                  <p className='mt-2 text-neutral-200'>
                    We'll be in touch shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className='bg-shadow-element relative pb-16'
        style={
          {
            '--top-side': '45%',
            '--right-side': '20%',
            '--left-side': 'auto',
            '--scale': '0.8',
            '--opacity': '0.05'
          } as React.CSSProperties
        }>
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-1/3 bg-primary-300' />
        <div className='section-container relative z-10'>
          <div className='relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-6 text-neutral-0 shadow-lg lg:p-10'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <p className='mb-6 text-center text-xl font-semibold leading-normal lg:-mt-3'>
              Trusted by the world’s most ambitious energy companies and
              innovators
            </p>
            <div className='space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0'>
              <QuoteCard
                content='Our primary business requirement for any database/store was that we own and control the data we store -- no vendor lock-in and no walled gardens. Going with ClickHouse Cloud on AWS was an easy decision because it allows us to focus on our primary work without having to worry about maintenance, upgrades, backups, and so on.'
                link='/blog/powering-the-next-generation-of-electric-cars'
                logo={{
                  src: logoNovo,
                  width: 1500 / 12,
                  height: 395 / 12,
                  alt: 'Novo Energy',
                  className: 'saturate-0 invert'
                }}
              />
              <QuoteCard
                content='The collaboration between Enjins and ClickHouse is built on our shared mission: accelerating the energy transition. At Enjins, we design and build AI solutions for the energy sector. By leveraging ClickHouse’s analytical database as a foundation, we enable our clients to make faster, smarter decisions – from optimizing grid performance and automating asset steering to forecasting renewable energy output with greater accuracy.'
                logo={{
                  src: logoEnjins,
                  width: 209 / 2,
                  height: 99 / 2,
                  alt: 'Enjins'
                }}
              />
            </div>
          </div>
          <div className='mx-auto max-w-5xl pb-4 pt-16'>
            <ContentTicker
              gap='3rem'
              gradientMask={true}
              pause={false}
              sizingMethod='max'>
              {stories.customerStories.logos.map((story, logoIndex) => {
                return (
                  <StrapiImageUrl
                    key={logoIndex}
                    className='my-auto flex-shrink-0 flex-grow-0'
                    {...story.darkLogoPng}
                  />
                )
              })}
            </ContentTicker>
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
            <SuiTitle type='h2'>Designed for data-Led transformation</SuiTitle>
            <SuiText className='text-neutral-200'>
              ClickHouse is built for leaders who want answers, not overhead.
            </SuiText>
            <CUIButton
              type='primary'
              href='/company/contact?loc=industry-energy-total-visibility'
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
                <span className='text-primary'>Milliseconds response</span> time
                on billions of rows
              </div>
            </div>
            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                02
              </span>
              <div className='pl-6'>
                Open source core with{' '}
                <span className='text-primary'>complete control</span> over
                deployment
              </div>
            </div>
            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                03
              </span>
              <div className='pl-6'>
                <span className='text-primary'>Cloud-native or on-prem</span> ,
                aligned with your IT strategy
              </div>
            </div>
            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                04
              </span>
              <div className='pl-6'>
                <span className='text-primary'>TCO up to 10x lower</span> than
                legacy data platforms
              </div>
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
            href='/company/contact?loc=industry-energy-warehouse-scale'
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
          href='https://console.clickhouse.cloud/signUp?loc=industry-energy-getstarted-footer'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </section>
    </Layout>
  )
}
