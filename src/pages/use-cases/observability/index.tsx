import imageHero from './assets/hero.png'
import iconCoins from './assets/icon-coins.svg'
import iconFileSearch from './assets/icon-file-search.svg'
import iconLightBulb from './assets/icon-light-bulb.svg'
import iconSparkles from './assets/icon-sparkles.svg'
import iconStack from './assets/icon-stack.svg'
import iconTimer from './assets/icon-timer.svg'
import integrationAws from './assets/integration-aws.svg'
import integrationCloudflare from './assets/integration-cloudflare.svg'
import integrationFluentd from './assets/integration-fluentd.svg'
import integrationGo from './assets/integration-go.svg'
import integrationJava from './assets/integration-java.svg'
import integrationJavascript from './assets/integration-javascript.svg'
import integrationKubernetes from './assets/integration-kubernetes.svg'
import integrationNextjs from './assets/integration-nextjs.svg'
import integrationNodejs from './assets/integration-nodejs.svg'
import integrationOpentelemetry from './assets/integration-opentelemetry.svg'
import integrationPython from './assets/integration-python.svg'
import integrationRuby from './assets/integration-ruby.svg'
import logoAnthropic from './assets/logo-anthropic.svg'
import logoCharacterai from './assets/logo-characterai.svg'
import logoCisco from './assets/logo-cisco.svg'
import logoCloudflare from './assets/logo-cloudflare.svg'
import logoComcast from './assets/logo-comcast.svg'
import logoDoorDash from './assets/logo-doordash.svg'
import logoEbay from './assets/logo-ebay.svg'
import logoGitLab from './assets/logo-gitlab.svg'
import logoIbm from './assets/logo-ibm.svg'
import logoNetflix from './assets/logo-netflix.svg'
import logoSierra from './assets/logo-sierra.svg'
import logoSolarwinds from './assets/logo-solarwinds.svg'
import logoSony from './assets/logo-sony.svg'
import logoVimeo from './assets/logo-vimeo.svg'
import shareImage from './assets/share-image.png'
import Accordion from '@/components-cleaned/Accordion'
import AccordionItem from '@/components-cleaned/AccordionItem'
import AnimatedClickstackOtel from '@/components-cleaned/AnimatedClickstackOtel'
import CarouselPaginated from '@/components-cleaned/CarouselPaginated'
import ContentTicker from '@/components-cleaned/ContentTicker'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import ClickStack from '@/components/ClickStack'
import { CUIButton } from '@/components/ClickUI'
import EyebrowText from '@/components/EyebrowText'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateFaqPageSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import React, { CSSProperties, useRef, useState } from 'react'
import { EffectCreative, Mousewheel } from 'swiper/modules'

const FAQs: Array<{ question: string; answer: string }> = [
  {
    question: 'What is ClickStack?',
    answer: `ClickStack is a high-performance, open-source observability stack powered by ClickHouse. It unifies logs, metrics, traces and session replays, delivering lightning-fast queries and efficient storage at any scale.`
  },
  {
    question: 'How does ClickStack compare to the ELK stack?',
    answer: `At a high level, Elastic (ELK) and ClickStack share a familiar shape: both have a data collection layer (Beats and Logstash vs. OpenTelemetry), a storage engine (Elasticsearch vs. ClickHouse), and a UI (Kibana vs. HyperDX). But beneath these parallels, the architectures diverge.

Elastic is a distributed search engine built around inverted indices and a shard-based architecture. While effective for full-text search, this design introduces high storage overhead, limited query parallelization, and contention between ingest and query workloads.

ClickStack, powered by ClickHouse, takes a different approach. Its columnar, shared-nothing architecture is optimized for analytics, minimizing storage with advanced compression, parallelizing queries across all available cores, and separating storage from compute in the cloud for consistent, efficient performance. With full SQL support, ClickStack enables deep, real-time analysis across all your observability data while still providing support for Lucene-style queries for fast searching. 

For more details on how ClickStack compares with the ELK Stack [see our comparison guide](/comparison/elastic-for-observability).`
  },
  {
    question: 'What are the core components of ClickStack?',
    answer: `The ClickStack consists of three core components:

- **ClickHouse** - The columnar database powering fast, cost-efficient queries and compression.
- **HyperDX** - The unified UI for search, dashboards, alerts, and session replays.
- **OpenTelemetry** - Standardized data collection for logs, metrics, and traces.

Together, they form a single, integrated observability stack optimized for speed, scalability, and simplicity.`
  },
  {
    question: 'Is ClickStack compatible with OpenTelemetry?',
    answer: `Yes. ClickStack is built for OpenTelemetry at any scale. It includes a bundled OpenTelemetry Collector and natively ingests OTel events - combining logs, metrics, and traces into a unified model. Powered by ClickHouse’s parallel processing and columnar storage, ClickStack scales seamlessly from small deployments to petabytes of telemetry data while maintaining real-time performance.

Although ClickStack is OpenTelemetry-native, it also supports any wide event format. While OpenTelemetry schemas are provided out of the box, users can bring their own - just include a timestamp, and the HyperDX UI with ClickHouse delivers the same powerful querying, correlation, and visualization capabilities.`
  },
  {
    question: 'Is ClickStack only compatible with OpenTelemetry?',
    answer: `No. While ClickStack is optimized for the OpenTelemetry schema, making it the fastest way to get started and scale easily, it’s not limited to it. ClickHouse, the database powering ClickStack, can store and query any event schema.

The HyperDX UI requires only a timestamp field to render and visualize events, so you can use your own data formats or custom pipelines. By following a wide events pattern and including a timestamp, your data becomes immediately usable within ClickStack.`
  },
  {
    question: 'Can I store logs, traces, and metrics in ClickStack?',
    answer: `Yes. ClickStack is a full observability platform designed to handle logs, traces and metrics in one place.  Built on ClickHouse, it efficiently ingests and stores high-cardinality OpenTelemetry data, automatically correlating events at the database layer for deep, real-time insights.`
  },
  {
    question: 'Does ClickStack support fast search using inverted indices?',
    answer: `Yes. ClickStack uses ClickHouse, which is columnar by default, and supports optional inverted indices at the column level. You can enable inverted indices and bloom filters to accelerate log and text search, which is common for log data exploration. The HyperDX UI accepts Lucene-style syntax, transpiles it to SQL, and can leverage these indices for speed. If you want to minimize storage, you can disable indices and rely on ClickHouse’s fast, multi-parallel string search, which is sufficient for many use cases.`
  },
  {
    question: 'Is ClickStack open source?',
    answer: `Yes. ClickStack and its components are fully open source and built on open standards. ClickHouse and the  OpenTelemetry collector are licensed under Apache 2.0, with the HyperDX UI using the MIT license. You can deploy ClickStack anywhere - self-hosted, hybrid, or in the cloud, without restrictions.`
  },
  {
    question: 'Is there a hosted version of ClickStack?',
    answer: `Yes. ClickStack is available as a managed service in ClickHouse Cloud. It delivers the same open architecture with elastic scaling and full separation of storage and compute, allowing users to scale resources independently and isolate read and write workloads for consistent performance.

With advanced compression and cost-efficient object storage, data can be retained indefinitely at low cost. ClickHouse Cloud also includes automatic backups and zero operational overhead. The HyperDX UI is fully integrated - available at no additional cost, secured through ClickHouse Cloud authentication, and can be launched on any service. 

A fully managed ClickStack offering is also planned for the future.`
  }
]

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title:
            'ClickStack: High-Performance Open-Source Observability | Logs, Metrics, Traces with ClickHouse',
          description:
            'ClickStack is a high-performance observability stack powered by ClickHouse. Unify logs, metrics, and traces with 10-100x cost savings. Get started today!',
          path: '/use-cases/observability',
          image: [{ url: shareImage.src }],
          languages: ['en', 'ja'],
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'ClickStack Observability',
              serviceType:
                'Observability (logs, metrics, traces, session replays, errors)',
              url: 'https://clickhouse.com/use-cases/observability',
              description:
                'High-performance, open-source observability stack powered by ClickHouse, delivering sub-second queries and efficient aggregations across logs, metrics, traces, session replays, and errors at massive scale.',
              provider: {
                '@type': 'Organization',
                name: 'ClickHouse, Inc.',
                url: 'https://clickhouse.com'
              },
              areaServed: 'Worldwide',
              audience: {
                '@type': 'BusinessAudience',
                audienceType: 'Engineering, SRE, DevOps, Data teams'
              },
              offers: {
                '@type': 'Offer',
                name: 'ClickStack on ClickHouse Cloud — Free trial',
                description:
                  'Experience HyperDX + ClickHouse with a 30-day trial and $300 in credits.',
                price: '0.00',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: 'https://console.clickhouse.cloud/'
              },
              brand: {
                '@type': 'Brand',
                name: 'ClickStack'
              }
            },
            generateFaqPageSchema({ faqs: FAQs })
          ]
        },
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  seo,
  headerData,
  footerData
}: CommonProps) {
  useGalaxyOnPage('observabilityUseCasePage')
  const [hyperdxActive, setHyperdxActive] = useState(true)
  const [clickhouseActive, setClickhouseActive] = useState(false)
  const [opentelemetryActive, setOpentelemetryActive] = useState(false)
  const allAreInactive =
    !hyperdxActive && !clickhouseActive && !opentelemetryActive

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='overflow-hidden py-20 lg:py-24'>
        <div className='section-container flex flex-col items-center lg:flex-row lg:items-stretch'>
          {/* Content */}
          <div className='relative z-10 w-full max-w-3xl space-y-6 text-center lg:py-8 lg:pr-8 lg:text-left'>
            <SuiText className='flip-selection !text-3xl lg:mb-16 lg:!text-[3.5rem]'>
              <TiltedText type='black-on-yellow' className='px-2 py-1'>
                <strong>ClickStack</strong>
              </TiltedText>
            </SuiText>
            <SuiTitle
              type='h1'
              className='font-basier font-semibold md:!text-6xl'>
              The open-source observability stack for OpenTelemetry at scale
            </SuiTitle>
            <SuiText size='lg' className='space-y-6 text-neutral-200'>
              <p>
                Lightning-fast queries and powerful aggregations on logs,
                metrics, traces, session replays and errors with unmatched
                resource efficiency for even your highest-cardinality OTel data.
              </p>
              <p>All in one stack - powered by ClickHouse.</p>
            </SuiText>
            <div className='flex w-full flex-col justify-center gap-6 md:flex-row lg:justify-start'>
              <CUIButton
                type='primary'
                size='lg'
                weight='semibold'
                href='https://clickhouse.com/docs/use-cases/observability/clickstack/getting-started?loc=use-case-observability'
                linkClass='w-full md:w-auto'
                className='w-full !px-10 md:w-auto'>
                Get started with open-source
              </CUIButton>
              <CUIButton
                type='secondary'
                size='lg'
                weight='semibold'
                href='/company/contact?loc=use-case-observability'
                target='_self'
                linkClass='w-full md:w-auto'
                className='w-full !px-10 md:w-auto'>
                Contact sales
              </CUIButton>
            </div>
          </div>

          {/* Image */}
          <div className='relative order-first -mb-8 -mt-16 w-full sm:-mb-32 sm:-mt-12 lg:order-last lg:mb-0 lg:mt-0 lg:flex-1'>
            <Image
              src={imageHero}
              width={1772 / 2}
              height={1038 / 2}
              alt='HyperDX Dashboard'
              className='bottom-0 left-0 top-0 h-auto w-full origin-left from-40% gradient-mask-to-b md:from-25% lg:absolute lg:h-full lg:w-auto lg:max-w-none lg:gradient-mask-to-none xl:scale-110 2xl:scale-125'
              quality={100}
              loading='eager'
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className='section-container mb-20 lg:mb-24 lg:mt-10'>
        <EyebrowText className='mb-10 text-center text-primary-300'>
          Trusted for observability by
        </EyebrowText>
        <ContentTicker
          gap='3rem'
          gradientMask={true}
          pause={false}
          sizingMethod='max'>
          {(
            [
              {
                src: logoNetflix,
                alt: 'Netflix logo',
                width: 95,
                height: 27
              },
              {
                src: logoCloudflare,
                alt: 'Cloudflare logo',
                width: 106,
                height: 36
              },
              {
                src: logoSony,
                alt: 'Sony logo',
                width: 100,
                height: 19
              },
              {
                src: logoComcast,
                alt: 'Comcast logo',
                width: 108,
                height: 44
              },
              {
                src: logoAnthropic,
                alt: 'Anthropic logo',
                width: 143,
                height: 16,
                className: 'opacity-70'
              },
              {
                src: logoCharacterai,
                alt: 'Character.ai logo',
                width: 102 * 1.5,
                height: 14 * 1.5,
                className: 'opacity-70'
              },
              {
                src: logoSierra,
                alt: 'Sierra logo',
                width: 118,
                height: 39,
                className: 'opacity-70'
              },
              {
                src: logoEbay,
                alt: 'Ebay logo',
                width: 84,
                height: 34
              },
              {
                src: logoCisco,
                alt: 'Cisco logo',
                width: 71,
                height: 38
              },
              {
                src: logoDoorDash,
                alt: 'DoorDash logo',
                width: 187,
                height: 23
              },
              {
                src: logoGitLab,
                alt: 'GitLab logo',
                width: 122,
                height: 38
              },
              {
                src: logoIbm,
                alt: 'IBM logo',
                width: 70,
                height: 29,
                className: 'opacity-70'
              },
              {
                src: logoSolarwinds,
                alt: 'SolarWinds logo',
                width: 200,
                height: 40,
                className: 'opacity-70'
              },
              {
                src: logoVimeo,
                alt: 'Vimeo logo',
                width: 90,
                height: 26,
                className: 'opacity-70'
              }
            ] as Array<ImageProps>
          ).map(({ className = '', ...logo }, logoIndex) => {
            return (
              <Image
                key={logoIndex}
                {...logo}
                loading='lazy'
                className={`my-auto flex-shrink-0 flex-grow-0 ${className}`}
              />
            )
          })}
        </ContentTicker>
      </section>

      {/* Fast, simple, fair */}
      {/*<section className='overflow-hidden bg-neutral-800 py-6 md:py-10 lg:py-16'>
        <div className='section-container'>
          <div
            className='md:bg-shadow-element yellow-shadow shadow-circle relative overflow-hidden rounded-lg bg-neutral-900 px-6 py-8 md:py-10 lg:py-16'
            style={
              {
                '--top-side': '0',
                '--left-side': '50%'
              } as CSSProperties
            }>
            <div className='absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary-300 to-transparent' />
            <div className='mx-auto ml-auto max-w-3xl flex-1 space-y-6 text-center'>
              <SuiTitle type='h3' className='text-primary-300'>
                Fast, simple, and fair observability at any scale
              </SuiTitle>
              <SuiText className='text-neutral-200 md:text-lg'>
                Store and query petabytes of OpenTelemetry data with
                transparent, simple pricing, with fast queries so your engineers
                can investigate instantly, not wait for results.
              </SuiText>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Customer quotes */}
      <section className='relative z-10 bg-neutral-950/60 pb-12 pt-20 lg:pb-16 lg:pt-24'>
        <div className='section-container'>
          <SuiTitle
            type='h2'
            className='mx-auto mb-12 max-w-4xl text-center lg:mb-24 lg:px-7'>
            Join the companies choosing ClickStack as their high-performance
            observability solution
          </SuiTitle>
          <div className='space-y-6 lg:grid lg:grid-cols-3 lg:gap-9 lg:space-y-0'>
            <QuoteCard
              className='!bg-neutral-750'
              content={
                'At Sony LIV, we ingest tens of millions of video streaming events into ClickHouse Cloud and run queries to generate complex dashboards for analysis. This allows our operations team to monitor, alert & troubleshoot the QOS and QOE of our customers in real-time. ClickHouse Cloud has helped us to optimize costs and ensure the high availability and resilience of our services.'
              }
              logo={{
                src: '/images/sony.svg',
                width: 136.36,
                height: 24,
                alt: 'Sony'
              }}
            />
            <QuoteCard
              className='!bg-neutral-750'
              content={
                'ClickHouse played an instrumental role in helping us develop and ship Claude 4. With ClickHouse, the database is green, queries are lightning-fast, and money is not on fire. ClickHouse has already delivered significant value in helping us create state-of-the-art language models.'
              }
              link='/blog/how-anthropic-is-using-clickhouse-to-scale-observability-for-ai-era'
              logo={{
                src: logoAnthropic,
                width: 143 * 1.1,
                height: 16 * 1.1,
                alt: 'Antrhopic',
                className: 'mb-1'
              }}
            />
            <QuoteCard
              className='!bg-neutral-750'
              content={
                'Previously, querying the last 10 minutes would take 1-2 minutes. With ClickStack, it was just a case of how fast I could blink. The performance is real. When you’re digging into logs during an incident, every second matters.'
              }
              link='/blog/scaling-observabilty-for-thousands-of-gpus-at-character-ai'
              logo={{
                src: logoCharacterai,
                width: 102 * 1.5,
                height: 14 * 1.5,
                alt: 'Character.ai',
                className: 'mb-1'
              }}
            />
          </div>
        </div>
        <div className='mt-12 text-center lg:mt-16'>
          <LinkWithArrow
            href='/use-cases?log=use-case-observability'
            className='text-slate-300 hover:underline'>
            Read more case studies
          </LinkWithArrow>
        </div>
      </section>

      {/* ClickStack */}
      <section
        className='section-container bg-shadow-element yellow-shadow shadow-circle my-20 lg:my-24'
        style={
          {
            '--top-side': '0',
            '--left-side': '50%'
          } as CSSProperties
        }>
        {/* Intro */}
        <div className='space-y-2 text-center'>
          <EyebrowText className='text-primary-300'>ClickStack</EyebrowText>
          <SuiTitle type='h2'>
            The ClickHouse powered observability stack
          </SuiTitle>
        </div>

        {/* Features */}
        <div className='my-20 grid grid-cols-1 gap-12 lg:grid-cols-3'>
          <div className='flex flex-1 flex-col items-center gap-4 text-center'>
            <Image src={iconTimer} width={48} height={49} alt='Timer icon' />
            <SuiTitle
              type='h3'
              className='font-basier text-[1.5rem] font-semibold leading-[1.3]'>
              Sub-second queries
            </SuiTitle>
            <SuiText className='text-balance'>
              Even on petabytes of high <br className='hidden lg:block' />
              cardinality OTel data
            </SuiText>
          </div>
          <div className='flex flex-1 flex-col items-center gap-4 text-center'>
            <Image src={iconCoins} width={48} height={49} alt='Savings icon' />
            <SuiTitle
              type='h3'
              className='font-basier text-[1.5rem] font-semibold leading-[1.3]'>
              10-100x in cost savings
            </SuiTitle>
            <SuiText className='text-balance'>
              With best in class ingestion and compression{' '}
              <br className='hidden lg:block' />
              rates (10x - 30x) for OTel data
            </SuiText>
          </div>
          <div className='flex flex-1 flex-col items-center gap-4 text-center'>
            <Image src={iconStack} width={48} height={49} alt='Stack icon' />
            <SuiTitle
              type='h3'
              className='font-basier text-[1.5rem] font-semibold leading-[1.3]'>
              Full stack OTel observability
            </SuiTitle>
            <SuiText className='text-balance'>
              Unify Session Replays with <br className='hidden lg:block' />
              OTel Logs, Traces and Metrics
            </SuiText>
          </div>
        </div>

        {/* Diagram */}
        <div className='mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-8 lg:flex-row lg:items-start lg:gap-20'>
          <div className='w-full max-w-max px-4'>
            <ClickStack
              hyperdx={hyperdxActive || allAreInactive}
              clickhouse={clickhouseActive || allAreInactive}
              opentelemetry={opentelemetryActive || allAreInactive}
              onClick={(stack) => {
                switch (stack) {
                  case 'hyperdx':
                    setHyperdxActive(true)
                    setClickhouseActive(false)
                    setOpentelemetryActive(false)
                    break
                  case 'clickhouse':
                    setHyperdxActive(false)
                    setClickhouseActive(true)
                    setOpentelemetryActive(false)
                    break
                  case 'opentelemetry':
                    setHyperdxActive(false)
                    setClickhouseActive(false)
                    setOpentelemetryActive(true)
                    break
                }
              }}
            />
          </div>
          <div className='flex w-full flex-1 flex-col items-center gap-6 lg:items-start'>
            <AccordionItem
              handle={
                <SuiTitle type='h3'>Searches, dashboards, and alerts</SuiTitle>
              }
              onToggle={(isOpen) => {
                setHyperdxActive(isOpen)
                if (isOpen) {
                  setClickhouseActive(false)
                  setOpentelemetryActive(false)
                }
              }}
              open={hyperdxActive}
              className='w-full !bg-neutral-750'>
              <div className='space-y-4'>
                <SuiText>
                  ClickStack unifies logs, metrics, traces, and session replays
                  in one platform via the HyperDX UI. Optimized for ClickHouse,
                  it supports fast Lucene-style search and full SQL access for
                  advanced analysis and deeper analysis powered by over 100+
                  built-in functions.
                </SuiText>
                <SuiText>
                  Create dashboards and alerts with minimal setup. Spot
                  anomalies with event deltas and speed up root cause analysis
                  using event patterns.
                </SuiText>
              </div>
            </AccordionItem>
            <AccordionItem
              handle={<SuiTitle type='h3'>ClickHouse powered storage</SuiTitle>}
              onToggle={(isOpen) => {
                setClickhouseActive(isOpen)
                if (isOpen) {
                  setHyperdxActive(false)
                  setOpentelemetryActive(false)
                }
              }}
              open={clickhouseActive}
              className='w-full !bg-neutral-750'>
              <div className='space-y-4'>
                <SuiText>
                  Powered by ClickHouse, HyperDX searches terabytes of OTel data
                  in seconds and ingests billions of high-cardinality events
                  daily. ClickStack ships with optimized OTel schemas, removing
                  the need for manual tuning and letting you focus on insights.
                </SuiText>
                <SuiText>
                  On ClickHouse Cloud, ClickStack gains elastic scaling and cost
                  efficiency through full separation of storage and compute.
                  Ingestion and queries can run independently on dedicated
                  resources, thanks to compute-compute separation, ensuring
                  consistent performance at any scale.
                </SuiText>
              </div>
            </AccordionItem>
            <AccordionItem
              handle={<SuiTitle type='h3'>Data collection</SuiTitle>}
              onToggle={(isOpen) => {
                setOpentelemetryActive(isOpen)
                if (isOpen) {
                  setHyperdxActive(false)
                  setClickhouseActive(false)
                }
              }}
              open={opentelemetryActive}
              className='w-full !bg-neutral-750'>
              <div className='space-y-4'>
                <SuiText>
                  ClickStack natively supports the OpenTelemetry standard,
                  capturing logs, metrics, and traces as wide events -
                  context-rich records that unify observability data in
                  ClickHouse. Designed for OTel data at Petabyte scale.
                </SuiText>
                <SuiText>
                  With native JSON support, ClickHouse efficiently handles
                  evolving, semi-structured data. Fields are created
                  automatically on ingest, with compressed columnar storage
                  delivering fast queries and high compression with no upfront
                  schema required.
                </SuiText>
              </div>
            </AccordionItem>
          </div>
        </div>
      </section>

      <section className='bg-neutral-750 py-16'>
        <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between'>
          <div className='lg:max-w-xl'>
            <SuiTitle type='h2' className='mb-6'>
              Built for OTel at scale.
              <br />
              Get started in minutes.
            </SuiTitle>
            <SuiText className='space-y-6'>
              <p>
                Whether you’re handling gigabytes or petabytes of OpenTelemetry
                data, ClickStack delivers unmatched efficiency with high
                compression, parallel query execution, and native SQL support.
              </p>
              <p>
                The HyperDX UI provides a seamless experience with Lucene-style
                log search, full SQL access, and automatic correlation of logs,
                traces, and metrics at the database layer - no extra services,
                pipelines required, restricted workflows or correlation at the
                application layer.
              </p>
              <p>
                If you’re wondering where to send your OpenTelemetry data, the
                answer is simple: ClickStack. Open source.{' '}
                <strong>Built for OTel at scale.</strong>
              </p>
            </SuiText>
            <CUIButton
              type='primary'
              size='lg'
              weight='semibold'
              href='https://clickhouse.com/docs/use-cases/observability/clickstack/getting-started?loc=use-case-observability'
              target='_blank'
              linkClass='w-full md:w-auto'
              className='mt-6 w-full !px-10 md:w-auto'>
              Get started
            </CUIButton>
          </div>
          <div className='order-first mx-auto w-full max-w-max lg:order-last'>
            <AnimatedClickstackOtel />
          </div>
        </div>
      </section>

      {/* Introdcuction video */}
      <section className='section-container my-20 lg:my-24'>
        <div className='mx-auto max-w-4xl text-center'>
          <SuiTitle type='h2' className='mb-10'>
            Watch the 60 second overview & introduction
          </SuiTitle>
          <CarouselPaginated
            modules={[Mousewheel, EffectCreative]}
            mousewheel={{
              enabled: true,
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 0.5
            }}
            effect='creative'
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-20%', 0, -1]
              },
              next: {
                shadow: true,
                translate: ['100%', 0, 0]
              }
            }}
            simulateTouch={false}
            carouselClass='rounded'>
            {['WBe7ZwTRWuQ', '3waDYancX_c'].map((videoId, videoIdIndex) => {
              return (
                <PlayOnClickVideo
                  key={videoIdIndex}
                  provider='youtube'
                  id={videoId}
                  thumbnail={<YouTubeThumbnail videoId={videoId} />}
                />
              )
            })}
          </CarouselPaginated>
        </div>
      </section>

      {/* Custom stack */}
      <section className='section-container my-20 lg:my-24'>
        <div className='relative flex flex-col gap-8 overflow-clip rounded bg-neutral-750 p-8 lg:p-16'>
          <div className='absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary-300 to-transparent' />

          <div className='mx-auto max-w-4xl space-y-8 text-center lg:px-2'>
            <SuiTitle type='h2'>Want to compose your own stack?</SuiTitle>
            <SuiText>
              Need a custom pipeline or schema that isn’t OpenTelemetry? The
              HyperDX UI is schema-agnostic and works with any telemetry
              pipeline, connecting to any ClickHouse instance for full control
              over your observability data.
            </SuiText>
            <SuiText>
              Building your own stack? ClickHouse provides the tools: a
              high-performance SQL engine, HTTP ingestion, scalable MergeTree
              storage, and materialized views for real-time transformation. For
              flexible dashboarding, use the Grafana plugin to correlate
              ClickHouse data with other sources.
            </SuiText>
          </div>
        </div>
      </section>

      {/* Get started */}
      <section className='section-container my-20 grid grid-cols-1 gap-8 lg:my-24 lg:grid-cols-2 lg:gap-16'>
        <SuiTitle type='h2' className='col-span-full text-center'>
          Why build your observability on ClickStack?
        </SuiTitle>
        <div className='space-y-6'>
          <Image src={iconCoins} width={48} height={49} alt='Savings icon' />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            How does ClickStack reduce observability costs?
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse delivers exceptional cost efficiency, avoiding the
            overhead of JVM-based systems, with a hardware-optimized
            column-oriented design that reduces storage for OTel data by up to
            90% without sacrificing speed.
          </SuiText>
          <SuiText className='text-neutral-200'>
            Scaling seamlessly from a single machine to hundreds of cores, with
            automatic tiering between local disks and object storage for maximum
            performance and efficiency.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image
            src={iconSparkles}
            width={48}
            height={49}
            alt='Sparkles icon'
          />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            How simple is ClickStack to deploy and maintain?
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            Experience operational simplicity with ClickHouse's homogenous
            architecture—a single executable handles everything from standalone
            deployments to massive clusters.
          </SuiText>
          <SuiText className='text-neutral-200'>
            For zero overhead, choose ClickStack on ClickHouse Cloud for
            automated scaling, backups, and maintenance. The separation of
            storage and compute ensures both infinite scalability and sub-second
            query performance through intelligent caching.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image src={iconFileSearch} width={48} height={49} alt='File icon' />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            How does ClickStack deliver real-time observability?
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse is designed to handle huge volumes of continuous streams
            of ingest data, supporting ingestion rates of gigabytes per second
            while ensuring new data is searchable with sub-second latency.
          </SuiText>
          <SuiText className='text-neutral-200'>
            Built for the most intensive real-time workloads, HyperDX exploits
            ClickHouse’s powerful suite of aggregation and analytical functions
            with deep optimizations to deliver blazingly fast observability
            queries.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image
            src={iconLightBulb}
            width={48}
            height={49}
            alt='Light bulb icon'
          />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            Is ClickStack only for observability data?
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse isn’t just an observability store - it’s a
            high-performance SQL database built for fast analytics.
          </SuiText>
          <SuiText className='text-neutral-200'>
            Observability is just another data problem, and with ClickHouse you
            can seamlessly join observability, business, and security data in a
            single system, unlocking deeper insights across your entire stack
            with your favorite visualization tool.
          </SuiText>
        </div>
      </section>

      {/* Newsletter */}
      <section className='section-container my-16 max-w-4xl lg:my-24'>
        <div className='flex flex-col justify-between gap-6 rounded bg-white/5 p-4 md:flex-row md:items-center md:p-6'>
          <div className='w-full md:w-1/2'>
            <SuiTitle type='h3' className='mb-2.5'>
              Subscribe to our observability newsletter
            </SuiTitle>
            <SuiText size='sm' weight='medium' color='secondary'>
              Stay informed on ClickStack feature releases, product roadmap,
              support, and cloud offerings!
            </SuiText>
          </div>
          <div className='flex-1'>
            {!formSuccess && (
              <MarketoForm
                formId='1498'
                disclaimer={false}
                clearbitTracking={true}
                onLoad={() => setFormLoaded(true)}
                onSuccess={() => {
                  setFormSuccess(true)

                  // Delay needed to allow the ref to update before scrolling
                  window.setTimeout(() => {
                    formSuccessRef.current?.scrollIntoView()
                  }, 10)

                  return false // Stops page from reloading
                }}
              />
            )}

            {!formLoaded && <div className='text-center'>Loading form...</div>}

            {formSuccess && (
              <div ref={formSuccessRef}>
                <p>Thanks for registering to our newsletter!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className='section-container mb-24 lg:mb-36'>
        <div className='mx-auto mb-10 max-w-4xl space-y-6 text-center lg:mb-16 lg:px-12'>
          <SuiTitle type='h2'>Instrument your applications</SuiTitle>
          <SuiText size='lg' className='text-neutral-200'>
            Trace every log, API request, DB query, and more with just a few
            lines of code. Instrument and observe your stack in minutes with
            ClickStack.
          </SuiText>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-8 md:gap-10 xl:justify-between xl:gap-12'>
          <Image
            src={integrationNodejs}
            width={49}
            height={55}
            alt='NodeJS'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationGo}
            width={49}
            height={19}
            alt='Go'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationJava}
            width={37}
            height={49}
            alt='Java'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationJavascript}
            width={49}
            height={49}
            alt='Javascript'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationNextjs}
            width={92}
            height={19}
            alt='NextJS'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationPython}
            width={49}
            height={49}
            alt='Python'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationRuby}
            width={46}
            height={45}
            alt='Ruby'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationCloudflare}
            width={49}
            height={23}
            alt='Cloudflare'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationKubernetes}
            width={49}
            height={47}
            alt='Kubernetes'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationOpentelemetry}
            width={49}
            height={49}
            alt='OpenTelemetry'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationAws}
            width={70}
            height={42}
            alt='AWS'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationFluentd}
            width={49}
            height={49}
            alt='Fluentd'
            className='w-8 md:w-auto'
          />
        </div>
      </section>

      {/* Try ClickHouse */}
      <section className='section-container my-20 md:px-8 lg:my-24 2xl:px-0'>
        <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-16 text-center'>
          <SuiTitle type='h2' color='text-default'>
            Try{' '}
            <TiltedText type='white-on-black' className='px-2 py-1'>
              ClickStack
            </TiltedText>{' '}
            in ClickHouse Cloud
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            Experience the full power of HyperDX + ClickHouse in just minutes.
            <br />
            We’ll get you started on a 30 day trial and $300 credits to spend at
            your own pace.
          </SuiText>
          <p className='mt-8 flex flex-col justify-center gap-2 sm:flex-row sm:gap-4'>
            <CUIButton
              type='primary-dark'
              size='lg'
              className='group mx-auto w-full !px-10 md:w-auto'
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=use-case-observability'
              onClick={useGalaxyOnClick(
                'observabilityUseCasePage.footerCta.getStartedSelect'
              )}>
              Get started
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='group mx-auto w-full !border-neutral-800 !px-10 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white md:w-auto'
              target='_blank'
              href='/company/contact?loc=use-case-observability'
              onClick={useGalaxyOnClick(
                'observabilityUseCasePage.footerCta.requestDemoSelect'
              )}>
              Get a demo
            </CUIButton>
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section
        id='faqs'
        className='bg-shadow-element relative mx-auto my-24 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
        style={
          {
            '--top-side': '224px'
          } as React.CSSProperties
        }>
        <div className='pb-10 text-center lg:text-left'>
          <div className='lg:sticky lg:top-32'>
            <Image
              src='/faq-icon.svg'
              alt='FAQ Icon'
              width={72}
              height={72}
              className='mx-auto lg:mx-0'
            />
            <SuiTitle type='h2' className='my-6 lg:text-left'>
              FAQs
            </SuiTitle>
            <div className='mx-auto max-w-md space-y-4 text-neutral-200 lg:text-left'>
              <p>
                We're here to make observability simple, fast, and open. Explore
                our FAQs to learn more about ClickStack, and if you don’t see
                what you need, we’re always happy to chat.
              </p>
              <p>
                <LinkWithArrow
                  href='/company/contact'
                  className='font-bold text-primary-300'>
                  Ask us anything
                </LinkWithArrow>
              </p>
            </div>
          </div>
        </div>
        <Accordion
          className='mx-auto w-full max-w-2xl lg:mr-0'
          items={FAQs.map(({ question, answer }) => ({
            handle: question,
            content: answer
          }))}
        />
      </section>
    </Layout>
  )
}
