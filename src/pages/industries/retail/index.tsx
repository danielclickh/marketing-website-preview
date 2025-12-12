import hero from './assets/hero.png'
import logoInstacart from './assets/logo-instacart.svg'
import logoShopee from './assets/logo-shopee.svg'
import logoWalmart from './assets/logo-walmart.svg'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
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
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { fetchAll } from '@/lib/api/strapi'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { UserStory } from '@/types/userStories'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

interface PageProps extends CommonProps {
  stories: Array<Pick<UserStory, 'User'>>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    const stories: Array<Pick<UserStory, 'User'>> = await fetchAll(
      'user-stories',
      {
        fields: [],
        populate: ['User.logo'],
        filters: {
          vertical: {
            id: {
              $eq: 3 // E-Commerce and retail
            }
          }
        },
        sort: ['createdAt:desc']
      }
    )

    return {
      props: {
        stories,
        seo: {
          path: '/industries/retail',
          title: 'Retail analytics in real time with ClickHouse',
          description:
            'Explore how ClickHouse enables instant insights for retail businesses. From high-speed dashboards to customer journey tracking, ClickHouse powers real-time analytics for inventory, ads, and store performance at scale.',
          keywords:
            'real-time retail analytics, ClickHouse retail, retail dashboards, inventory tracking, customer journey analytics, ad performance, streaming data, high-concurrency analytics, retail data warehouse, in-store analytics, digital retail insights'
        },
        ...commonProps
      }
    }
  }

export default function GamingIndustryPage({
  seo,
  headerData,
  footerData,
  stories
}: PageProps) {
  useGalaxyOnPage('retailIndustryPage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
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
              <Breadcrumbs.Item>Retail</Breadcrumbs.Item>
            </Breadcrumbs>
            <SuiTitle type='h1' className='text-white md:!text-5.5xl'>
              ClickHouse for Retail
            </SuiTitle>
            <SuiText>
              Retail and e-commerce move fast; your data stack must keep up.
              With rising expectations, thin margins, and real-time stakes,
              ClickHouse delivers the speed, scale, and insight to stay ahead.
            </SuiText>
            <div className='!my-8 flex flex-col gap-6 sm:flex-row sm:justify-center lg:justify-start'>
              <CUIButton
                type='primary'
                size='lg'
                className='w-full !px-10 sm:w-auto'
                target='_blank'
                href='https://console.clickhouse.cloud/signUp?loc=industry-retail-hero-cta'
                onClick={useGalaxyOnClick(
                  'retailIndustryPage.heroCta.getStartedTodaySelect'
                )}>
                Get started today
              </CUIButton>
              {/*<CUIButton
                type='secondary'
                size='lg'
                className='w-full !px-10 sm:w-auto'
                target='_blank'
                href='/company/contact?loc=industry-retail-hero-cta'
                onClick={useGalaxyOnClick(
                  'retailIndustryPage.heroCta.contactSalesSelect'
                )}>
                Talk to an expert
              </CUIButton>*/}
            </div>
            <ul className='space-y-4 text-left text-neutral-200'>
              <li>
                <TickItem>
                  <strong>Instant customer understanding:</strong>{' '}
                  Personalization is no longer optional. Analyze millions of
                  real-time interactions to adapt pricing, offers, and
                  experiences without delay instantly.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Real-time supply chain & inventory insights:</strong>{' '}
                  Inventory visibility must be live, not delayed, from warehouse
                  to doorstep. Monitor stock levels, identify anomalies, and
                  respond immediately to disruptions.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Fraud & risk detection at scale:</strong> As threats
                  become more complex, the ability to detect patterns in real
                  time is crucial. Continuously monitoring across all
                  transactions and channels, catching issues before they
                  escalate.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Unified view across channels:</strong> Today’s
                  customers switch between physical and digital touchpoints
                  seamlessly. Get a 360° view, so you’re not guessing you’re
                  acting on real data.
                </TickItem>
              </li>
              <li>
                <TickItem>
                  <strong>Track the entire funnel in real-time:</strong>{' '}
                  End-to-end customer journey analytics - site performance,
                  error logs, campaign KPIs, email CTRs, notifications, ad
                  performance, and A/B tests.
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
            <div className='space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0'>
              <QuoteCard
                content='ClickHouse enables the business users to make smart business decisions based on huge volume of data in a matter of seconds'
                link={{
                  href: 'https://medium.com/walmartglobaltech/interactive-analytics-at-scale-c8e32dd0e910',
                  target: '_blank'
                }}
                logo={{
                  src: logoWalmart,
                  width: 233.58 * 0.6,
                  height: 56.01 * 0.6,
                  alt: 'Walmart'
                }}
              />
              <QuoteCard
                content='ClickHouse is a fast and highly performant analytical database, widely used across Instacart to power other use-cases such as critical retailer and ads dashboards, calculating results for A/B testing, and machine learning signals.'
                link={{
                  href: 'https://tech.instacart.com/real-time-fraud-detection-with-yoda-and-clickhouse-bd08e9dbe3f4',
                  target: '_blank'
                }}
                logo={{
                  src: logoInstacart,
                  width: 150,
                  height: 24,
                  alt: 'Instacart'
                }}
              />
              <QuoteCard
                content='ClickHouse has become the backbone for all of our data applications. Adopting ClickHouse has enhanced our data analytics capabilities, supporting the growing demands of our internal teams efficiently and cost-effectively'
                link='/blog/seeing-the-big-picture-shopees-journey-to-distributed-tracing-with-clickhouse'
                logo={{
                  src: logoShopee,
                  width: 889 * 0.14,
                  height: 281 * 0.14,
                  alt: 'Jerry'
                }}
              />
            </div>
          </div>
          <div className='mx-auto max-w-5xl'>
            {/* Trusted by */}
            <div className='flip-selection mx-auto mb-8 w-fit max-w-2xl px-4 pb-4 pt-12 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
              Leading retailers choose ClickHouse for real-time speed optimizing
              fulfillment, loyalty, and peak demand at{' '}
              <TiltedText type='white-on-black' className='px-2'>
                scale
              </TiltedText>
            </div>
            <div className='mask-logos-carousel brightness-0 saturate-0'>
              <div className='pause-hover hide-scrollbar relative flex overflow-hidden'>
                <div className='flex animate-marqueeLeft items-center whitespace-nowrap'>
                  {stories.map((story, logoIndex) => {
                    return (
                      <div
                        key={logoIndex}
                        className='w-max flex-shrink-0 flex-grow-0 px-6'>
                        <StrapiImageUrl {...story.User.logo} />
                      </div>
                    )
                  })}
                </div>
                <div className='flex animate-marqueeLeft items-center whitespace-nowrap'>
                  {stories.map((story, logoIndex) => {
                    return (
                      <div
                        key={logoIndex}
                        className='w-max flex-shrink-0 flex-grow-0 px-6'>
                        <StrapiImageUrl {...story.User.logo} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
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
              Total visibility into every digital interaction
            </SuiTitle>
            <SuiText className='text-neutral-200'>
              Get full-fidelity insight into customer behavior in real time—and
              see why leading retailers trust ClickHouse for their analytics.
            </SuiText>
            <CUIButton
              type='primary'
              href='/company/contact?loc=industry-retail-total-visibility'
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
                  Real-time insights with zero lag.
                </span>{' '}
                Get lightning-fast queries for in-store events, customer
                analytics, and ad tech; where every millisecond matters.
              </div>
            </div>
            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                02
              </span>
              <div className='pl-6'>
                <span className='text-primary'>
                  Built for high-speed ingestion.
                </span>{' '}
                Process millions of in-store events per second with native
                support for streaming sources like Kafka, Kinesis, and Pub/Sub.
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
                ClickHouse powers real-time dashboards, customer dashboards,
                in-store ads, and live telemetry that handles massive user loads
                with instant responsiveness, unlike traditional data warehouses.
              </div>
            </div>
            <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
              <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
                04
              </span>
              <div className='pl-6'>
                <span className='text-primary'>
                  Secure by design, built for compliance.
                </span>{' '}
                Safeguard customer data with CMEK, BYOC support, fine-grained
                access controls, and built-in GDPR-compliant TTLs and deletes.
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
            href='/company/contact?loc=industry-retail-warehouse-scale'
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
          href='https://console.clickhouse.cloud/signUp?loc=industry-retail-getstarted-footer'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </section>
    </Layout>
  )
}
