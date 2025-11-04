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
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
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
import ScaleToContainer from '@/components/ScaleToContainer'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateFaqPageSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import React, { CSSProperties, useRef, useState } from 'react'

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
              className='font-basier text-[1.75rem] font-semibold md:text-4xl'>
              Open-source observability stack
            </SuiTitle>
            <SuiText size='lg' className='space-y-6 text-neutral-200'>
              <p>
                <strong>OpenTelemetry at scale.</strong>
              </p>
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
                href='/docs/use-cases/observability/clickstack/getting-started?loc=use-case-observability'
                target='_blank'
                linkClass='w-full md:w-auto'
                className='w-full !px-10 md:w-auto'>
                Get started
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
              href='/docs/use-cases/observability/clickstack/getting-started?loc=use-case-observability'
              target='_blank'
              linkClass='w-full md:w-auto'
              className='mt-6 w-full !px-10 md:w-auto'>
              Get started
            </CUIButton>
          </div>
          <div className='order-first mx-auto w-full max-w-max lg:order-last'>
            <OtelGraphic />
          </div>
        </div>
      </section>

      {/* Introdcuction video */}
      <section className='section-container my-20 lg:my-24'>
        <div className='mx-auto max-w-4xl text-center'>
          <SuiTitle type='h2' className='mb-10'>
            Watch the ClickStack introduction
          </SuiTitle>
          <PlayOnClickVideo
            provider='youtube'
            id='3waDYancX_c'
            thumbnail={
              <YouTubeThumbnail
                videoId='3waDYancX_c'
                alt='ClickStack introduction video'
              />
            }
          />
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

function OtelGraphic() {
  function Tile({ children }: { children?: React.ReactNode }) {
    return (
      <div className='flex size-16 items-center justify-center rounded-md border border-neutral-700/80 bg-neutral-900 p-4'>
        {children}
      </div>
    )
  }

  function CornerLine({
    angle,
    className,
    duration = 5.75
  }: {
    angle: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    className?: string
    duration?: number
  }) {
    const path = {
      'top-left': 'M1 0V75A25 25 0 0 0 25 99H100',
      'top-right': 'M99 0V75A25 25 0 0 1 75 99H0',
      'bottom-left': 'M1 100V25A25 25 0 0 1 25 1H100',
      'bottom-right': 'M99 100V25A25 25 0 0 0 75 1H0'
    }[angle]
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100'
        height='100'
        viewBox='0 0 100 100'
        className={className}>
        <path
          fill='none'
          stroke='#414141'
          stroke-width='3'
          d={path}
          pathLength='1000'
        />
        <path
          fill='none'
          stroke='#faff69'
          stroke-linecap='round'
          stroke-width='3'
          d={path}
          pathLength='1000'>
          <animate
            attributeName='stroke-dasharray'
            dur={`${duration}s`}
            keyTimes='0;0.5;1'
            repeatCount='indefinite'
            values='100 900;500 500;100 900'
          />
          <animate
            attributeName='stroke-dashoffset'
            calcMode='linear'
            dur={`${duration}s`}
            keyTimes='0;0.5;1'
            repeatCount='indefinite'
            values='0;-1000;-2000'
          />
        </path>
      </svg>
    )
  }

  function Otel() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        fill='none'
        viewBox='0 0 40 40'>
        <path
          fill='#f5a800'
          d='M21.05 21.77a4.35 4.35 0 1 0 6.03 6.27 4.35 4.35 0 0 0-6.03-6.27m4.6 4.6a2.16 2.16 0 0 1-3.67-1.52 2.16 2.16 0 0 1 4.3 0c0 .57-.23 1.12-.63 1.52M27.12.4l-2.65 2.67a1.34 1.34 0 0 0 0 1.9l10.4 10.4c.52.52 1.36.52 1.89 0l2.66-2.67c.52-.52.52-1.37 0-1.9L29.02.4a1.34 1.34 0 0 0-1.9 0M8.47 34.42a1.2 1.2 0 0 0 0-1.72l-1.35-1.36a1.2 1.2 0 0 0-1.72 0l-2.8 2.79-.75-.77a1.1 1.1 0 0 0-1.54 0 1.1 1.1 0 0 0 0 1.54l4.61 4.6a1.1 1.1 0 0 0 1.54 0 1.1 1.1 0 0 0 0-1.53l-.77-.76 2.8-2.8z'
        />
        <path
          fill='#425cc7'
          d='m22.56 8.03-5.92 5.92a1.37 1.37 0 0 0 0 1.91l3.65 3.65a6.6 6.6 0 0 1 8.53.7l2.95-2.95a1.37 1.37 0 0 0 0-1.92l-7.3-7.3a1.36 1.36 0 0 0-1.91 0m-3.8 13.03L16.6 18.9a1.3 1.3 0 0 0-1.84 0l-7.6 7.6a1.3 1.3 0 0 0 0 1.85l4.3 4.31a1.3 1.3 0 0 0 1.84 0l4.89-4.9a6.7 6.7 0 0 1 .57-6.7'
        />
      </svg>
    )
  }

  return (
    <ScaleToContainer>
      <div className='grid size-[537px] grid-cols-3 grid-rows-3'>
        <div className='relative flex items-center justify-center'>
          <Tile>
            <Otel />
          </Tile>
          <CornerLine
            angle='top-left'
            duration={3}
            className='absolute left-1/2 top-1/2 translate-y-8'
          />
        </div>
        <div className='flex flex-col items-center'>
          <Tile>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='44'
              height='44'
              fill='none'
              viewBox='0 0 44 44'>
              <path
                stroke='#dfdfdf'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M36.67 3.67H7.33a3.67 3.67 0 0 0-3.66 3.66v7.34a3.67 3.67 0 0 0 3.66 3.66h29.34a3.67 3.67 0 0 0 3.66-3.66V7.33a3.67 3.67 0 0 0-3.66-3.66m0 22H7.33a3.67 3.67 0 0 0-3.66 3.66v7.34a3.67 3.67 0 0 0 3.66 3.66h29.34a3.67 3.67 0 0 0 3.66-3.66v-7.34a3.67 3.67 0 0 0-3.66-3.66'
              />
              <path
                stroke='#dfdfdf'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='3.5'
                d='M11 11h.02M11 33h.02'
              />
            </svg>
          </Tile>
          <AnimatedDataLine size={115} direction='down' />
        </div>
        <div className='relative flex items-center justify-center'>
          <Tile>
            <Otel />
          </Tile>
          <CornerLine
            angle='top-right'
            duration={4}
            className='absolute right-1/2 top-1/2 translate-y-8'
          />
        </div>
        <div />
        <div className='relative'>
          <div className='absolute inset-0 z-0 animate-fadeInOut bg-primary-300/60 blur-xl' />
          <div className='absolute inset-0 z-10 flex rounded-lg border-2 border-primary-300 bg-neutral-750 bg-gradient-to-br from-primary-300/20 to-primary-300/40'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='179'
              height='179'
              fill='none'
              viewBox='0 0 179 179'
              className='m-auto'>
              <path
                fill='#fff'
                d='M55 41.8c0-.43.37-.8.8-.8h6.16c.44 0 .81.37.81.8v68.4c0 .43-.37.8-.8.8H55.8a.8.8 0 0 1-.81-.8zm15.54 0c0-.43.37-.8.8-.8h6.16c.44 0 .8.37.8.8v68.4a.8.8 0 0 1-.8.8h-6.15a.8.8 0 0 1-.81-.8zm15.54 0c0-.43.36-.8.8-.8h6.16c.44 0 .8.37.8.8v68.4a.8.8 0 0 1-.8.8h-6.16a.8.8 0 0 1-.8-.8zm15.61 0c0-.43.37-.8.8-.8h6.16c.44 0 .81.37.81.8v68.4c0 .43-.37.8-.8.8h-6.16a.8.8 0 0 1-.8-.8zm15.54 27.27c0-.44.37-.8.8-.8h6.16c.44 0 .81.36.81.8V83a.8.8 0 0 1-.8.8h-6.16a.8.8 0 0 1-.81-.8zm-67.55 71.31q-1.06 0-1.9.38a4 4 0 0 0-1.44 1.08 5 5 0 0 0-.9 1.74q-.3 1.02-.3 2.3 0 1.69.5 2.92a4 4 0 0 0 1.5 1.88q.99.66 2.52.66.92 0 1.76-.16a18 18 0 0 0 1.74-.46v1.86q-.85.32-1.72.46-.89.16-2.04.16-2.19 0-3.64-.9a5.5 5.5 0 0 1-2.16-2.56 10 10 0 0 1-.72-3.88q0-1.62.44-2.96.45-1.36 1.32-2.34a6 6 0 0 1 2.12-1.5 8 8 0 0 1 2.94-.54 9.4 9.4 0 0 1 4 .88l-.8 1.8q-.7-.32-1.52-.56a6 6 0 0 0-1.7-.26M58.1 153H56v-15.2h2.12zm5.45-10.78V153h-2.12v-10.78zm-1.04-4.1q.48 0 .84.28t.36.94q0 .64-.36.94-.36.28-.84.28-.52 0-.88-.28-.34-.3-.34-.94 0-.66.34-.94.37-.28.88-.28m8.71 15.08q-1.47 0-2.6-.58a4 4 0 0 1-1.74-1.8 7 7 0 0 1-.62-3.14q0-2 .66-3.24a4.3 4.3 0 0 1 1.82-1.82q1.17-.6 2.64-.6.9 0 1.68.2.81.18 1.32.42l-.64 1.72a10 10 0 0 0-1.2-.38 5 5 0 0 0-1.18-.16q-1 0-1.66.44-.63.41-.96 1.28-.3.84-.3 2.12 0 1.22.32 2.06.33.84.94 1.28.65.42 1.58.42a5.6 5.6 0 0 0 2.86-.72v1.84q-.57.35-1.26.5-.67.16-1.66.16m7.57-7.8q0 .42-.04.96l-.06 1h.06l.38-.48.48-.6.44-.52 3.3-3.54h2.46l-4.34 4.62L86.1 153h-2.5l-3.56-4.82-1.24 1.04V153h-2.1v-15.2h2.1zm17.5 3.74q0 1.28-.61 2.18t-1.78 1.4a7 7 0 0 1-2.76.48q-.78 0-1.5-.1a10 10 0 0 1-1.34-.24 6 6 0 0 1-1.1-.4v-2.04q.8.36 1.88.66 1.08.28 2.2.28.96 0 1.6-.26.64-.25.96-.72t.32-1.08q0-.66-.34-1.1-.32-.46-1.02-.84-.68-.4-1.84-.84-.8-.3-1.46-.66-.64-.38-1.14-.88a4 4 0 0 1-.74-1.16 4 4 0 0 1-.26-1.54q0-1.18.58-2.02.6-.84 1.64-1.28 1.05-.46 2.42-.46 1.16 0 2.14.24 1 .22 1.9.62l-.68 1.78a13 13 0 0 0-1.66-.56 7 7 0 0 0-1.76-.22q-.8 0-1.34.24t-.82.66q-.26.41-.26.98 0 .66.3 1.1t.96.82q.66.36 1.74.8 1.2.45 2.04 1t1.3 1.3.44 1.86m6.45 2.34a5 5 0 0 0 1.61-.26v1.6q-.33.16-.92.26-.57.12-1.16.12-.87 0-1.61-.3-.72-.3-1.16-1.04-.45-.75-.44-2.06v-5.96h-1.5v-.96l1.58-.8.74-2.28h1.3v2.42h3.08v1.62h-3.08v5.92q0 .88.42 1.3.44.42 1.14.42m7.95-9.46q2.04 0 3.04.9 1 .88 1 2.78v7.3h-1.5l-.42-1.5h-.08q-.45.58-.96.96-.48.38-1.12.56a5.5 5.5 0 0 1-3.26-.16q-.75-.36-1.2-1.08-.44-.74-.44-1.84 0-1.65 1.24-2.5 1.26-.86 3.82-.94l1.84-.06v-.6q0-1.2-.54-1.68a2.2 2.2 0 0 0-1.52-.48q-.84 0-1.6.24-.75.24-1.44.58l-.68-1.54a8 8 0 0 1 3.82-.94m.5 5.84q-1.84.08-2.56.62-.7.52-.7 1.48 0 .84.5 1.22.52.38 1.3.38 1.27 0 2.08-.7t.82-2.1v-.94zm11.15 5.34q-1.5 0-2.6-.58a4 4 0 0 1-1.74-1.8 7 7 0 0 1-.62-3.14q0-2 .66-3.24a4.3 4.3 0 0 1 1.82-1.82q1.16-.6 2.64-.6.9 0 1.68.2.8.18 1.32.42l-.64 1.72a10 10 0 0 0-1.2-.38q-.63-.16-1.18-.16-1 0-1.66.44-.65.41-.96 1.28-.3.84-.3 2.12 0 1.22.32 2.06.3.84.94 1.28.63.42 1.58.42a5.6 5.6 0 0 0 2.86-.72v1.84q-.6.35-1.26.5-.69.16-1.66.16m7.56-7.8q0 .42-.04.96-.01.55-.06 1h.06l.38-.48.48-.6.44-.52 3.3-3.54h2.46l-4.34 4.62 4.62 6.16h-2.5l-3.56-4.82-1.24 1.04V153h-2.1v-15.2h2.1z'
              />
            </svg>
          </div>
        </div>
        <div />
        <div className='relative flex items-center justify-center'>
          <Tile>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='44'
              height='44'
              fill='none'
              viewBox='0 0 44 44'>
              <path
                stroke='#dfdfdf'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M33 9.17a3.67 3.67 0 0 1 3.67 3.66v15.63q0 .88.39 1.65L39 34a1.83 1.83 0 0 1-1.65 2.66H6.64A1.83 1.83 0 0 1 4.99 34l1.95-3.9q.4-.77.4-1.65V12.83A3.67 3.67 0 0 1 11 9.17zm3.77 20.14H7.23'
              />
            </svg>
          </Tile>
          <CornerLine
            angle='bottom-left'
            duration={2.5}
            className='absolute bottom-1/2 left-1/2 -translate-y-8'
          />
        </div>
        <div className='flex flex-col items-center'>
          <AnimatedDataLine size={115} direction='up' delay={1} />
          <Tile>
            <Otel />
          </Tile>
        </div>
        <div className='relative flex items-center justify-center'>
          <Tile>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='44'
              height='44'
              fill='none'
              viewBox='0 0 44 44'>
              <path
                stroke='#dfdfdf'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M11 20.17h7.33m-3.66-3.67v7.33M27.5 22h.02M33 18.33h.02m-1.27-9.16h-19.5a7.33 7.33 0 0 0-7.3 6.58q0 .14-.03.28c-.15 1.23-1.25 10.47-1.25 13.3a5.5 5.5 0 0 0 5.5 5.5c1.83 0 2.75-.91 3.66-1.83l2.6-2.6a3.7 3.7 0 0 1 2.59-1.07h7.96c.97 0 1.9.39 2.6 1.08L31.16 33c.91.92 1.83 1.83 3.66 1.83a5.5 5.5 0 0 0 5.5-5.5c0-2.83-1.1-12.07-1.25-13.3l-.03-.28a7.33 7.33 0 0 0-7.3-6.58'
              />
            </svg>
          </Tile>
          <CornerLine
            angle='bottom-right'
            duration={3.5}
            className='absolute bottom-1/2 right-1/2 -translate-y-8'
          />
        </div>
      </div>
    </ScaleToContainer>
  )
}
