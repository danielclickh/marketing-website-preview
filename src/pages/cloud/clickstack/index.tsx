import imageEstimatedCost from './assets/estimated-cost.svg'
import imageHero from './assets/hero.png'
import iconBadge from './assets/icon-badge.svg'
import iconCoins from './assets/icon-coins.svg'
import iconFileSearch from './assets/icon-file-search.svg'
import iconHandCoins from './assets/icon-hand-coins.svg'
import iconLightBulb from './assets/icon-light-bulb.svg'
import iconLock from './assets/icon-lock.svg'
import iconShieldTick from './assets/icon-shield-tick.svg'
import iconSparkles from './assets/icon-sparkles.svg'
import iconStack from './assets/icon-stack.svg'
import iconTimer from './assets/icon-timer.svg'
import imageIngestionAndStorage from './assets/ingestion-and-storage.svg'
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
import imageWorkflows from './assets/workflows.png'
import Accordion from '@/components-cleaned/Accordion'
import AccordionItem from '@/components-cleaned/AccordionItem'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import CarouselPaginated from '@/components-cleaned/CarouselPaginated'
import ContentTicker from '@/components-cleaned/ContentTicker'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import TickItem from '@/components-cleaned/TickItem'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import ClickStack from '@/components/ClickStack'
import { CUIButton } from '@/components/ClickUI'
import EyebrowText from '@/components/EyebrowText'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard, { QuoteCardProps } from '@/components/QuoteCard'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateFaqPageSchema, generateVideoObjectSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import React, { useRef, useState } from 'react'
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

export default function ClickHouseServerPage({ seo, headerData }: CommonProps) {
  useGalaxyOnPage('managedClickstackPage')
  const [hyperdxActive, setHyperdxActive] = useState(true)
  const [clickhouseActive, setClickhouseActive] = useState(false)
  const [opentelemetryActive, setOpentelemetryActive] = useState(false)
  const allAreInactive =
    !hyperdxActive && !clickhouseActive && !opentelemetryActive

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='overflow-hidden py-20 lg:py-24'>
        <div className='section-container flex flex-col items-center lg:flex-row lg:items-stretch'>
          {/* Content */}
          <div className='relative z-10 w-full max-w-3xl space-y-6 text-center lg:py-8 lg:pr-8 lg:text-left'>
            <Breadcrumbs className='justify-center lg:justify-start'>
              <Breadcrumbs.Item>Managed ClickStack</Breadcrumbs.Item>
            </Breadcrumbs>
            <SuiTitle
              type='h1'
              className='font-basier font-semibold md:!text-6xl'>
              Observability for OpenTelemetry at scale
            </SuiTitle>
            <SuiText size='lg' className='space-y-4 text-neutral-200'>
              <p>
                Lightning-fast queries and powerful aggregations across logs,
                metrics, traces and session replays, even on the
                highest-cardinality OpenTelemetry data powered by ClickHouse
                Cloud for unlimited retention at low-cost.
              </p>
            </SuiText>
            <div className='!my-8 flex w-full flex-col justify-center gap-6 md:flex-row lg:justify-start'>
              <CUIButton
                type='primary'
                size='lg'
                weight='semibold'
                href='https://console.clickhouse.cloud/signUp?loc=managed-clickstack-hero'
                linkClass='w-full md:w-auto'
                className='w-full !px-10 md:w-auto'
                onClick={useGalaxyOnClick(
                  'managedClickstack.hero.startFreeTrial'
                )}>
                Start free trial
              </CUIButton>
              <CUIButton
                type='secondary'
                size='lg'
                weight='semibold'
                href='/company/contact?loc=managed-clickstack-hero'
                target='_self'
                linkClass='w-full md:w-auto'
                className='w-full !px-10 md:w-auto'
                onClick={useGalaxyOnClick(
                  'managedClickstack.hero.contactSales'
                )}>
                Contact sales
              </CUIButton>
            </div>
            <ul className='space-y-4 text-neutral-200'>
              <li>
                <TickItem>
                  Open-source ClickStack with cloud-native storage and compute
                  separation
                </TickItem>
              </li>
              <li>
                <TickItem>
                  Indefinite retention of high-cardinality data at sub-cent per
                  GB storage pricing
                </TickItem>
              </li>
              <li>
                <TickItem>
                  Unlimited queries, no ingest sampling and predictable costs
                </TickItem>
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className='relative order-first -mb-8 -mt-16 w-full sm:-mb-32 sm:-mt-12 lg:order-last lg:mb-0 lg:mt-0 lg:flex-1'>
            <Image
              src={imageHero}
              width={814}
              height={509}
              alt='ClickStack Dashboard'
              className='bottom-0 left-0 top-0 h-auto w-full origin-left rounded-lg border border-slate-700 from-40% gradient-mask-to-b md:from-25% lg:absolute lg:h-full lg:w-auto lg:max-w-none lg:gradient-mask-to-none'
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
                height: 19,
                className: 'opacity-80'
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

      {/* Testimonials */}
      <section className='relative pb-16'>
        <div className='clip-inverted-triangle-simplified absolute bottom-0 left-0 right-0 top-1/4 bg-primary-300 lg:top-1/3' />
        <div className='section-container'>
          <div className='relative gap-6 overflow-hidden rounded-lg bg-neutral-725 p-6 text-neutral-0 shadow-lg'>
            <div className='absolute left-0 right-0 top-0 h-1 bg-primary' />

            <div className='hide-scrollbar -mx-6 mb-1 mt-2 overflow-x-auto lg:mx-0 lg:overflow-x-visible'>
              <div className='flex flex-row before:block before:w-3 before:flex-shrink-0 after:block after:w-3 after:flex-shrink-0 lg:flex-wrap lg:justify-center lg:before:hidden lg:after:hidden'>
                {(
                  [
                    {
                      content: `At Sony LIV, we ingest tens of millions of video streaming events into ClickHouse Cloud and run queries to generate complex dashboards for analysis. This allows our operations team to monitor, alert & troubleshoot the QOS and QOE of our customers in real-time. ClickHouse Cloud has helped us to optimize costs and ensure the high availability and resilience of our services.`,
                      logo: {
                        src: logoSony,
                        alt: 'Sony logo',
                        width: 100,
                        height: 19
                      }
                    },
                    {
                      content: `ClickHouse played an instrumental role in helping us develop and ship Claude 4. With ClickHouse, the database is green, queries are lightning-fast, and money is not on fire. ClickHouse has already delivered significant value in helping us create state-of-the-art language models.`,
                      logo: {
                        src: logoAnthropic,
                        alt: 'Anthropic logo',
                        width: 143,
                        height: 16
                      }
                    },
                    {
                      content: `Previously, querying the last 10 minutes would take 1-2 minutes. With ClickStack, it was just a case of how fast I could blink. The performance is real. When you’re digging into logs during an incident, every second matters.`,
                      logo: {
                        src: logoCharacterai,
                        alt: 'Character.ai logo',
                        width: 102 * 1.5,
                        height: 14 * 1.5
                      }
                    }
                  ] satisfies Array<QuoteCardProps>
                ).map((quote, quoteIndex) => {
                  return (
                    <div
                      key={quoteIndex}
                      className='lg:min-w-none w-[80vw] min-w-64 max-w-md flex-shrink-0 flex-grow-0 px-2 lg:w-1/3 lg:max-w-none lg:flex-1 lg:px-3'>
                      <QuoteCard {...quote} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className='bg-neutral-725 py-20 lg:py-24'>
        <div className='section-container grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16'>
          <div className='col-span-full text-center'>
            <SuiTitle type='h2' className='mx-auto max-w-xl'>
              The Observability solution powered by ClickHouse Cloud
            </SuiTitle>
          </div>
          <div className='flex flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-start'>
            <Image
              src={iconTimer}
              width={48}
              height={49}
              alt='Timer icon'
              className='flex-shrink-0'
            />
            <div className='space-y-6 lg:pt-2'>
              <SuiTitle type='h3'>Sub-second Queries</SuiTitle>
              <SuiText className='text-neutral-200'>
                Even on hundreds of petabytes of high cardinality OTel data
              </SuiText>
            </div>
          </div>
          <div className='flex flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-start'>
            <Image
              src={iconStack}
              width={48}
              height={49}
              alt='Stack icon'
              className='flex-shrink-0'
            />
            <div className='space-y-6 lg:pt-2'>
              <SuiTitle type='h3'>Full Stack OTel Observability</SuiTitle>
              <SuiText className='text-neutral-200'>
                Unify Session Replays with OTel Logs, Traces and Metrics
              </SuiText>
            </div>
          </div>
          <div className='flex flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-start'>
            <Image
              src={iconCoins}
              width={48}
              height={49}
              alt='Coins icon'
              className='flex-shrink-0'
            />
            <div className='space-y-6 lg:pt-2'>
              <SuiTitle type='h3'>Market leading cost efficiency</SuiTitle>
              <SuiText className='text-neutral-200'>
                With best-in-class compression for OpenTelemetry data, achieving
                10x to 30x reduction, and object storage backing flexible,
                warehouse-based compute, Managed ClickStack delivers
                unparalleled cost efficiency.
              </SuiText>
            </div>
          </div>
          <div className='flex flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-start'>
            <Image
              src={iconHandCoins}
              width={48}
              height={49}
              alt='Savings icon'
              className='flex-shrink-0'
            />
            <div className='space-y-6 lg:pt-2'>
              <SuiTitle type='h3'>Unlimited Retention</SuiTitle>
              <SuiText className='text-neutral-200'>
                Separation of storage and compute using object storage for data,
                means long-term retention for less than a cent per GB per month.
              </SuiText>
            </div>
          </div>
        </div>
      </section>

      {/* ClickStack */}
      <section className='section-container my-20 lg:my-24'>
        {/* Intro */}
        <div className='mx-auto max-w-4xl space-y-6 text-center'>
          <Image
            src={iconBadge}
            width={72}
            height={72}
            alt=''
            className='inline-block'
          />
          <SuiTitle type='h2'>
            Enterprise-grade observability, made simple
          </SuiTitle>
          <SuiText size='lg' className='text-center opacity-70'>
            Getting started with Managed ClickStack takes minutes. Specify how
            much data you plan to ingest, create your service, start sending and
            enjoy enterprise-grade capabilities out of the box.
          </SuiText>
        </div>

        {/* Features */}
        <div className='mb-16 mt-10 grid grid-cols-1 gap-8 lg:mb-24 lg:mt-20 lg:grid-cols-2 lg:gap-16'>
          <div className='space-y-6'>
            <Image
              src={iconShieldTick}
              width={48}
              height={49}
              alt='Shield icon'
            />
            <SuiTitle type='h3'>Uncompromising reliability</SuiTitle>
            <SuiText className='text-neutral-200'>
              Replicated across multiple availability zones by default,
              ClickHouse Cloud provides high availability, seamless upgrades,
              automated backups, and built-in disaster recovery
            </SuiText>
          </div>
          <div className='space-y-6'>
            <Image src={iconLock} width={48} height={49} alt='Lock icon' />
            <SuiTitle type='h3'>World-class security</SuiTitle>
            <SuiText className='text-neutral-200'>
              Enterprise-grade security is built in from day one. ClickHouse
              Cloud offers strong user and network access controls, encryption
              in transit and at rest, comprehensive activity logging, and SOC 2
              Type II compliance.
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
            <CUIButton
              type='primary'
              size='lg'
              weight='semibold'
              href='https://console.clickhouse.cloud/signUp?loc=managed-clickstack-accordions'
              linkClass='w-full md:w-auto'
              className='w-full !px-10 md:w-auto'
              onClick={useGalaxyOnClick(
                'managedClickstack.accordions.startFreeTrial'
              )}>
              Start free trial
            </CUIButton>
          </div>
        </div>
      </section>

      <section className='bg-neutral-800 py-16 lg:py-24'>
        <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between'>
          <div className='space-y-6 text-neutral-200 lg:max-w-xl'>
            <SuiTitle type='h2' className='text-white'>
              Ingest everything.
              <br />
              Retain everything.
            </SuiTitle>
            <p>
              Whether you’re handling gigabytes or petabytes of OpenTelemetry
              data, Managed ClickStack delivers the full power of open source
              ClickStack with a simpler way to operate at scale. Retain all of
              your OpenTelemetry data indefinitely,{' '}
              <strong className='text-white'>
                without sampling, rollups, or retention tradeoffs.
              </strong>
            </p>
            <p>
              Built on ClickHouse Cloud, fully managed storage and compute scale
              effortlessly to petabytes, with industry-leading compression and
              cost controls that reduce{' '}
              <strong className='text-white'>
                storage to less than a cent per GB
              </strong>
              . Separation of storage and compute lets you retain
              high-cardinality data long term while keeping queries fast and
              costs predictable.
            </p>
          </div>
          <Image
            src={imageIngestionAndStorage}
            width={540}
            height={400}
            alt=''
            className='mx-auto lg:mr-0'
          />
        </div>
      </section>

      {/* Introdcuction video */}
      <section className='section-container my-16 lg:my-24'>
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
            <PlayOnClickVideo
              provider='youtube'
              id='WBe7ZwTRWuQ'
              thumbnail={<YouTubeThumbnail videoId='WBe7ZwTRWuQ' />}
              schema={generateVideoObjectSchema({
                title: 'ClickStack in 60 seconds',
                description:
                  'A 60-second overview of ClickStack, an open-source observability platform for logs, traces, metrics, session replay, and alerting — all unified to help teams quickly detect, investigate, and resolve issues at scale.',
                thumbnailUrl:
                  'https://img.youtube.com/vi/WBe7ZwTRWuQ/maxresdefault.jpg',
                uploadDate: '2025-12-18T08:06:01-08:00',
                contentUrl: 'https://www.youtube.com/watch?v=WBe7ZwTRWuQ',
                embedUrl: 'https://www.youtube.com/embed/WBe7ZwTRWuQ'
              })}
            />
            <PlayOnClickVideo
              provider='youtube'
              id='3waDYancX_c'
              thumbnail={<YouTubeThumbnail videoId='3waDYancX_c' />}
              schema={generateVideoObjectSchema({
                title:
                  'ClickStack: Unified Observability with ClickHouse for High-Cardinality Logs, Metrics & Traces ',
                description:
                  'A hands-on tutorial introducing ClickStack, an OpenTelemetry-native observability platform that unifies logs, metrics, and traces in ClickHouse with powerful correlation and querying via HyperDX.',
                thumbnailUrl:
                  'https://img.youtube.com/vi/3waDYancX_c/maxresdefault.jpg',
                uploadDate: '2025-06-25T09:14:17-07:00',
                contentUrl: 'https://www.youtube.com/watch?v=3waDYancX_c',
                embedUrl: 'https://www.youtube.com/embed/3waDYancX_c'
              })}
            />
          </CarouselPaginated>
        </div>
      </section>

      <section className='space-y-16 bg-neutral-800 py-16 lg:space-y-24 lg:py-24'>
        <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between'>
          <div className='space-y-6 text-neutral-200 lg:max-w-xl'>
            <SuiTitle type='h2' className='text-white'>
              Only pay for the compute you need, when you need
            </SuiTitle>
            <p>
              ClickHouse Cloud lets you match compute to how your observability
              data is used, with dedicated resources for ingestion, separate
              pools for common queries on recent data, and on-demand compute for
              long-tail or historical analysis.
            </p>
            <p>
              With isolated read and write paths and independent scaling,
              combined with the ability to idle or pause unused compute, you
              only pay for resources while they are actively in use.
            </p>
          </div>
          <Image
            src={imageEstimatedCost}
            width={540}
            height={400}
            alt=''
            className='mx-auto lg:mr-0'
          />
        </div>
        <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between'>
          <div className='space-y-6 text-neutral-200 lg:max-w-xl'>
            <SuiTitle type='h2' className='text-white'>
              Intuitive observability workflows
            </SuiTitle>
            <p>
              The ClickStack UI, HyperDX, delivers a modern, intuitive
              observability experience built for how engineers actually
              investigate incidents. Lucene-style log search and full SQL access
              work side by side, with automatic correlation of logs, traces, and
              metrics directly at the database layer.
            </p>
            <p>
              Go beyond raw search with Service Maps, Event Patterns, and Log
              Clustering and custom Dashboarding. Optimized for ClickHouse
              Cloud, ClickStack automatically exploits ingest-time aggregates
              via materialized views to accelerate common queries and
              visualizations, keeping dashboards fast without extra services or
              custom pipelines.
            </p>
          </div>
          <Image
            src={imageWorkflows}
            width={540}
            height={400}
            alt=''
            className='mx-auto lg:order-first lg:ml-0'
          />
        </div>
      </section>

      {/* Get started */}
      <section className='section-container my-20 grid grid-cols-1 gap-8 lg:my-24 lg:grid-cols-2 lg:gap-16'>
        <div className='col-span-full'>
          <SuiTitle type='h2' className='mx-auto max-w-xl text-center'>
            Why use Managed ClickStack for your observability?
          </SuiTitle>
        </div>
        <div className='space-y-6'>
          <div className='flex flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-center'>
            <Image
              src={iconCoins}
              width={48}
              height={49}
              alt='Savings icon'
              className='flex-shrink-0'
            />
            <SuiTitle type='h3'>Reduce your observability costs</SuiTitle>
          </div>

          <SuiText className='text-neutral-200'>
            Managed ClickStack combines ClickHouse’s open source efficiency with
            cloud-native separation of storage and compute to keep observability
            costs low at any scale. Data can be retained indefinitely on
            low-cost object storage, while fast queries focus on the data that
            matters most.
          </SuiText>
          <SuiText className='text-neutral-200'>
            Ingestion and query workloads scale independently, with compute
            pooled or idled based on access patterns. Columnar storage and
            advanced compression reduce OTel data size by up to 90 percent,
            eliminating the need for sampling or short retention windows at
            petabyte scale.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <div className='flex flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-center'>
            <Image
              src={iconSparkles}
              width={48}
              height={49}
              alt='Sparkles icon'
              className='flex-shrink-0'
            />
            <SuiTitle type='h3'>Simple deployment and maintenance</SuiTitle>
          </div>
          <SuiText className='text-neutral-200'>
            Managed ClickStack can be deployed in a few clicks. Specify how much
            OpenTelemetry data you plan to ingest per month, and start sending
            data using standard OpenTelemetry formats. Backups, maintenance,
            upgrades, and scaling are handled automatically, with no
            infrastructure to manage.
          </SuiText>
          <SuiText className='text-neutral-200'>
            Separation of storage and compute enables infinite scaling while
            maintaining sub-second query performance through intelligent
            caching. Services adapt to changing workloads, with the ability to
            allocate separate compute for ingestion and query paths to optimize
            performance and cost.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <div className='flex flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-center'>
            <Image
              src={iconFileSearch}
              width={48}
              height={49}
              alt='File icon'
              className='flex-shrink-0'
            />
            <SuiTitle type='h3'>Real-time observability</SuiTitle>
          </div>
          <SuiText className='text-neutral-200'>
            ClickHouse Cloud is built for continuous, high-volume ingestion,
            supporting gigabytes per second while making new data searchable
            with sub-second latency. Common metrics and aggregations can be
            computed at insert time using materialized views, shifting work away
            from queries and amortizing cost across writes.
          </SuiText>
          <SuiText className='text-neutral-200'>
            The ClickStack UI automatically leverages these materialized views
            to accelerate dashboards and visualizations. This keeps charts fast
            and interactive, even when analyzing hundreds of petabytes of
            high-cardinality data, with only a modest increase in ingest
            compute.
          </SuiText>
        </div>
        <div className='space-y-6'>
          <div className='flex flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-center'>
            <Image
              src={iconLightBulb}
              width={48}
              height={49}
              alt='Light bulb icon'
              className='flex-shrink-0'
            />
            <SuiTitle type='h3'>Beyond observability</SuiTitle>
          </div>
          <SuiText className='text-neutral-200'>
            The engine behind Managed ClickStack, ClickHouse Cloud, is more than
            an observability store. It is a high-performance SQL database built
            for analytics, with a fully managed ingestion pipeline through
            ClickPipes. ClickPipes data sources such as Kafka, while native
            lakehouse support enables direct querying of data already in your
            data lake.
          </SuiText>
          <SuiText className='text-neutral-200'>
            Observability becomes part of a broader analytics workflow.
            ClickHouse Cloud lets you join observability, business, and security
            data in a single system, then analyze it using BI tools, notebooks,
            or alternative visualization, notebook and dashboarding solutions.
            for deeper correlation.
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
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationGo}
            width={49}
            height={19}
            alt='Go'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationJava}
            width={37}
            height={49}
            alt='Java'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationJavascript}
            width={49}
            height={49}
            alt='Javascript'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationNextjs}
            width={92}
            height={19}
            alt='NextJS'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationPython}
            width={49}
            height={49}
            alt='Python'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationRuby}
            width={46}
            height={45}
            alt='Ruby'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationCloudflare}
            width={49}
            height={23}
            alt='Cloudflare'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationKubernetes}
            width={49}
            height={47}
            alt='Kubernetes'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationOpentelemetry}
            width={49}
            height={49}
            alt='OpenTelemetry'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationAws}
            width={70}
            height={42}
            alt='AWS'
            className='w-8 md:w-[initial]'
          />
          <Image
            src={integrationFluentd}
            width={49}
            height={49}
            alt='Fluentd'
            className='w-8 md:w-[initial]'
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
              href='https://console.clickhouse.cloud/signUp?loc=managed-clickstack'
              onClick={useGalaxyOnClick(
                'managedClickstackPage.footerCta.getStartedSelect'
              )}>
              Get started
            </CUIButton>
            {/*<CUIButton
              type='secondary'
              size='lg'
              className='group mx-auto w-full !border-neutral-800 !px-10 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white md:w-auto'
              target='_blank'
              href='/company/contact?loc=managed-clickstack'
              onClick={useGalaxyOnClick(
                'managedClickstackPage.footerCta.requestDemoSelect'
              )}>
              Get a demo
            </CUIButton>*/}
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
