import logoCisco from './assets/logo-cisco.svg'
import logoCloudflare from './assets/logo-cloudflare.svg'
import logoHuntress from './assets/logo-huntress.svg'
import logoIbm from './assets/logo-ibm.svg'
import logoMicrosoft from './assets/logo-microsoft.svg'
import logoSeemplicity from './assets/logo-seemplicity.svg'
import TickItem from '@/components-cleaned/TickItem'
import YouTubeVideo from '@/components-cleaned/YouTubeVideo'
import thumbAnthropic from '@/components/HomepageSectionContentFeed/assets/thumb-anthropic.jpeg'
import faqs from '@/components/Industries/Gaming/faqs.json'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import React, { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          path: '/industries/cybersecurity',
          title: 'ClickHouse for cybersecurity',
          description: 'ClickHouse is the database for cybersecurity'
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
  useGalaxyOnPage('cybersecurityIndustryPage')

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
        <div className='section-container relative z-10 flex flex-wrap items-center justify-between gap-12 lg:flex-nowrap lg:gap-16'>
          {/* Content column */}
          <div className='mx-auto w-full max-w-lg space-y-6 text-center lg:ml-0 lg:max-w-2xl lg:pr-9 lg:text-left'>
            <p className='font-bold text-primary-300'>
              Industries / Cybersecurity
            </p>
            <SuiTitle type='h1'>ClickHouse for Cybersecurity</SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Ingest millions of rows per second. Handle the most heavily
              concurrent workloads. All without compromising query speed.
            </SuiText>
            <TickItem className='text-left'>
              Continuous, high throughput ingest to serve fresh data
            </TickItem>
            <TickItem className='text-left'>
              Seamlessly integrate static or streaming data from a wide range of
              sources
            </TickItem>
            <TickItem className='text-left'>
              ISO 27001, PCI DSS, HIPAA, GDPR, SOC 2 Type 2, and FedRAMP
            </TickItem>
            <SuiText>
              Trusted by developers that work with data at scale
            </SuiText>
            <ul className='flex items-center justify-between'>
              {(
                [
                  {
                    src: logoIbm,
                    width: 61,
                    height: 25,
                    alt: 'Ibm'
                  },
                  {
                    src: logoCisco,
                    width: 57,
                    height: 29,
                    alt: 'Cisco'
                  },
                  {
                    src: logoCloudflare,
                    width: 82,
                    height: 27,
                    alt: 'Cloudflare'
                  },
                  {
                    src: logoMicrosoft,
                    width: 108,
                    height: 23,
                    alt: 'Microsoft'
                  },
                  {
                    src: logoHuntress,
                    width: 92,
                    height: 23,
                    alt: 'Huntress'
                  },
                  {
                    src: logoSeemplicity,
                    width: 128,
                    height: 21,
                    alt: 'Seemplicity'
                  }
                ] satisfies Array<ImageProps>
              ).map((logo, logoIndex) => {
                return (
                  <li key={logoIndex}>
                    <Image {...logo} />
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Form column */}
          <div className='w-full lg:max-w-lg'>
            <div className='rounded-lg bg-neutral-900/80 p-8 text-center shadow-lg'>
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
                <div ref={formSuccessRef} className='my-auto text-center'>
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

      {/* Videos */}
      <section className='section-container my-16 lg:my-24'>
        <div className='hide-scrollbar -mx-4 overflow-x-auto px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-x-visible lg:px-0'>
          <div className='-mx-2 flex flex-row lg:-mx-4 lg:flex-wrap lg:justify-center'>
            <div className='lg:min-w-none flex w-[90vw] min-w-64 max-w-md flex-shrink-0 flex-grow-0 flex-col p-2 lg:w-1/3 lg:max-w-none lg:flex-1 lg:p-4'>
              <YouTubeVideo
                id='T87D6FTDGX0'
                thumbnail='https://img.youtube.com/vi/T87D6FTDGX0/maxresdefault.jpg'
              />
              <SuiTitle type='h3' className='mt-6'>
                ClickHouse at Exabeam: Delivering scalable, high-performance
                search for advanced security analytics
              </SuiTitle>
              <SuiText size='sm' className='my-4 text-neutral-200'>
                “One key metric in cybersecurity is mean time to detection …
                [the database you choose] needs to be very performant, and
                that’s where ClickHouse has helped us.”
              </SuiText>
              <p className='!mt-auto'>
                <LinkWithArrow
                  href='/videos/exabeam'
                  className='text-primary-300 hover:underline'>
                  Read the case study
                </LinkWithArrow>
              </p>
            </div>
            <div className='lg:min-w-none flex w-[90vw] min-w-64 max-w-md flex-shrink-0 flex-grow-0 flex-col p-2 lg:w-1/3 lg:max-w-none lg:flex-1 lg:p-4'>
              <YouTubeVideo
                id='h-dkVkEh5ec'
                thumbnail='https://img.youtube.com/vi/h-dkVkEh5ec/maxresdefault.jpg'
              />
              <SuiTitle type='h3' className='mt-6'>
                SIEM made simpler: How Huntress improved performance and slashed
                costs with ClickHouse
              </SuiTitle>
              <SuiText size='sm' className='my-4 text-neutral-200'>
                “We looked at a lot of different solutions … the combination of
                features and functionality that we needed and the reduced cost
                that we could get ClickHouse made it all worthwhile.”
              </SuiText>
              <p className='!mt-auto'>
                <LinkWithArrow
                  href='/blog/how-huntress-improved-performance-and-slashed-costs-with-clickHouse'
                  className='text-primary-300 hover:underline'>
                  Read the case study
                </LinkWithArrow>
              </p>
            </div>
            <div className='lg:min-w-none flex w-[90vw] min-w-64 max-w-md flex-shrink-0 flex-grow-0 flex-col p-2 lg:w-1/3 lg:max-w-none lg:flex-1 lg:p-4'>
              <YouTubeVideo
                id='N2z_a9GnACA'
                thumbnail='https://img.youtube.com/vi/N2z_a9GnACA/maxresdefault.jpg'
              />
              <SuiTitle type='h3' className='mt-6'>
                RunReveal Is Building The Ridiculously <br />
                Fast Security Data Platform On ClickHouse
              </SuiTitle>
              <SuiText size='sm' className='my-4 text-neutral-200'>
                “ClickHouse in particular is useful … because it allows us to
                store just obscene amounts of data in a way that can be queried
                and retrieved very efficiently. So we’re realizing those
                efficiencies both in terms of query speed and storage
                capacities.”
              </SuiText>
              <p className='!mt-auto'>
                <LinkWithArrow
                  href='/blog/runreveal-is-building-the-ridiculously-fast-security-data-platform-on-clickhouse'
                  className='text-primary-300 hover:underline'>
                  Read the case study
                </LinkWithArrow>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className='section-container bg-shadow-element yellow-shadow relative my-16 lg:my-24 lg:flex lg:items-center lg:justify-between lg:gap-x-12'
        style={
          {
            '--top-side': '120%',
            '--right-side': '50%',
            '--left-side': '50%',
            '--scale': '0.8',
            '--opacity': '0.05'
          } as React.CSSProperties
        }>
        <div className='mx-auto max-w-lg space-y-6 pb-10 text-center lg:mx-0 lg:pb-0 lg:text-left'>
          <Image
            src='/images/icon-shield.svg'
            alt='icon'
            className='mx-auto mb-6 xl:mx-0'
            width={72}
            height={72}
          />
          <SuiTitle type='h2'>
            Proactive threat detection and response requires real-time speed, at
            any scale.
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            Discover why companies are choosing ClickHouse for their
            cybersecurity platforms.
          </SuiText>
        </div>
        <div className='mx-auto w-full max-w-2xl space-y-8 lg:mr-0'>
          <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
            <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
              01
            </span>
            <div className='pl-6'>
              Unbeatable query performance for{' '}
              <span className='text-primary'>
                mission-critical and time-sensitive applications
              </span>
              .
            </div>
          </div>
          <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
            <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
              02
            </span>
            <div className='pl-6'>
              Built for high-throughput,{' '}
              <span className='text-primary'>
                continuous ingest with native integrations and managed pipelines
              </span>
              .
            </div>
          </div>
          <div className='flex items-center rounded-md border border-neutral-700/80 bg-neutral-900/80 p-3 pr-6 shadow-xl'>
            <span className='border-r border-neutral-700/80 p-2 pr-4 text-center text-lg text-[#B3B6BD]/60'>
              03
            </span>
            <div className='pl-6'>
              <span className='text-primary'>
                Handle high query concurrency for your security dashboards
              </span>{' '}
              and alerts stay fast and responsive - even under heavy load.
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className='bg-shadow-element relative bg-neutral-725 py-16'
        style={
          {
            '--top-side': '45%',
            '--right-side': '20%',
            '--left-side': 'auto',
            '--scale': '0.8',
            '--opacity': '0.05'
          } as React.CSSProperties
        }>
        <div className='clip-inverted-triangle !absolute bottom-0 left-0 right-0 top-40' />
        <div className='section-container'>
          <SuiTitle type='h2' className='mb-16 text-center'>
            Performance x Scale x Trust
          </SuiTitle>
          <div className='relative z-20 flex flex-col overflow-hidden rounded-lg bg-neutral-900 p-10 text-neutral-0 shadow-lg'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />
            <div className='space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0'>
              <QuoteCard
                link='/blog/seemplicity-scaled-real-time-security-analytics-with-postgres-cdc-and-clickhouse'
                content='I knew a managed product built by engineers, whose goal in life is to transform bits from Postgres into ClickHouse, would be better than anything we could do ourselves.'
                logo={{
                  src: '/images/industries/gaming/logo-azur.svg',
                  width: 123,
                  height: 40,
                  alt: 'Azur Games'
                }}
              />
              <QuoteCard
                content='We need our platform to operate in real time. The moment we detect suspicious activity, we aim to block the API user before they can attack the site or exploit a vulnerability.'
                link='/blog/how-wallarms-api-security-platform-relies-on-clickhouse-cloud'
                logo={{
                  src: '/images/industries/gaming/logo-exitlag.svg',
                  width: 175,
                  height: 40,
                  alt: 'ExitLag'
                }}
              />
              <QuoteCard
                content='ClickHouse plays a pivotal role as a key component in both Instana and QRadar. IBM has deployed hundreds of ClickHouse servers across its various product offerings'
                link='/videos/ibm-contributions-to-clickhouse'
                logo={{
                  src: '/images/industries/gaming/logo-roblox.svg',
                  width: 231,
                  height: 40,
                  alt: 'Roblox'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section></section>

      {/* Get started */}
      <section></section>
    </Layout>
  )
}
