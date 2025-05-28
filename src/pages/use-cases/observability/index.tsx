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
import logoCisco from './assets/logo-cisco.svg'
import logoCloudflare from './assets/logo-cloudflare.svg'
import logoComcast from './assets/logo-comcast.svg'
import logoDoorDash from './assets/logo-doordash.svg'
import logoEbay from './assets/logo-ebay.svg'
import logoGitLab from './assets/logo-gitlab.svg'
import logoLovable from './assets/logo-lovable.svg'
import logoNetflix from './assets/logo-netflix.svg'
import logoSony from './assets/logo-sony.svg'
import shareImage from './assets/share-image.png'
import AccordionItem from '@/components-cleaned/AccordionItem'
import ClickStack from '@/components/ClickStack'
import { CUIButton } from '@/components/ClickUI'
import EyebrowText from '@/components/EyebrowText'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import QuoteCard from '@/components/QuoteCard'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { CSSProperties, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title:
            'ClickStack: High-Performance Open-Source Observability | Logs, Metrics, Traces with ClickHouse',
          description:
            'ClickStack is a high-performance, open-source observability stack powered by ClickHouse. Unify logs, metrics, traces, and session replays with lightning-fast queries and 10-100x cost savings on even your highest-cardinality data.',
          path: '/use-cases/observability',
          image: [{ url: shareImage.src }]
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
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='overflow-hidden py-20 lg:py-24'>
        <div className='section-container flex flex-col items-center lg:flex-row lg:items-stretch'>
          {/* Content */}
          <div className='relative z-10 w-full max-w-2xl space-y-6 text-center lg:py-8 lg:pr-8 lg:text-left'>
            <SuiText className='flip-selection !text-3xl lg:mb-16 lg:!text-[3.5rem]'>
              <TiltedText type='black-on-yellow' className='px-2 py-1'>
                <strong>ClickStack</strong>
              </TiltedText>
            </SuiText>
            <SuiTitle
              type='h1'
              className='font-basier text-[1.75rem] font-semibold md:text-4xl'>
              The High Performance <br className='hidden md:block' />
              Open-source Observability Stack
            </SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Lightning-fast queries and powerful aggregations on logs, metrics,
              traces, session replays and errors with unmatched resource
              efficiency for even your highest-cardinality data.
            </SuiText>
            <SuiText size='lg' className='text-neutral-200'>
              All in one stack - powered by ClickHouse.
            </SuiText>
            <div className='flex w-full flex-col justify-center gap-6 md:flex-row lg:justify-start'>
              <CUIButton
                type='primary'
                size='lg'
                weight='semibold'
                href='/docs/use-cases/observability/clickstack/getting-started?loc=use-case-observability'
                target='_blank'
                linkClass='w-full md:w-auto'
                className='w-full px-10 md:w-auto'>
                Get started
              </CUIButton>
              <CUIButton
                type='secondary'
                size='lg'
                weight='semibold'
                href='/company/contact?loc=use-case-observability'
                target='_self'
                linkClass='w-full md:w-auto'
                className='w-full px-10 md:w-auto'>
                Talk to sales
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
              loading='eager'
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className='section-container mb-20 lg:mb-24 lg:mt-10'>
        <EyebrowText className='mb-10 text-center text-primary-300'>
          Trusted by
        </EyebrowText>
        <div className='flex flex-wrap items-center justify-center gap-10 xl:justify-between xl:gap-12'>
          <Image src={logoNetflix} width={95} height={27} alt='Netflix' />
          <Image
            src={logoCloudflare}
            width={106}
            height={36}
            alt='Cloudflare'
          />
          <Image src={logoSony} width={100} height={19} alt='Sony' />
          <Image src={logoComcast} width={108} height={44} alt='Comcast' />
          <Image src={logoEbay} width={84} height={34} alt='Ebay' />
          <Image src={logoCisco} width={71} height={38} alt='Cisco' />
          <Image src={logoDoorDash} width={187} height={23} alt='DoorDash' />
          <Image src={logoGitLab} width={122} height={38} alt='GitLab' />
        </div>
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
                'Trip.com was using Elasticsearch for their observability data until they made the switch to ClickHouse. The result? 40GB per second, 30% savings in costs, and queries that are up to 30x faster!'
              }
              link='/blog/how-trip.com-migrated-from-elasticsearch-and-built-a-50pb-logging-solution-with-clickhouse'
              logo={{
                src: '/images/use-cases/logging/tripdotcom.svg',
                width: 141,
                height: 34.01,
                alt: 'Trip.com',
                className: '-mb-1'
              }}
            />
            <QuoteCard
              className='!bg-neutral-750'
              content={
                'ClickHouse’s analytics capabilities and open ecosystem make it a powerful technology for observability. HyperDX is very exciting, bringing together an enhanced query experience with a more intuitive UI for exploratory observability workflows.'
              }
              logo={{
                src: logoLovable,
                width: 159,
                height: 27,
                alt: 'Lovable',
                className: 'mb-0.5'
              }}
            />
          </div>
        </div>
        <div className='mt-12 text-center lg:mt-16'>
          <LinkWithArrow
            href='/use-cases?log=use-case-observability'
            className='text-slate-300 hover:underline'>
            Read More Case Studies
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
          <EyebrowText className='text-primary-300'>
            The clickhouse powered observability stack
          </EyebrowText>
          <SuiTitle
            type='h2'
            className='font-basier text-4xl font-semibold leading-tight md:text-6.5xl'>
            ClickStack
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
              cardinality data
            </SuiText>
          </div>
          <div className='flex flex-1 flex-col items-center gap-4 text-center'>
            <Image src={iconCoins} width={48} height={49} alt='Savings icon' />
            <SuiTitle
              type='h3'
              className='font-basier text-[1.5rem] font-semibold leading-[1.3]'>
              10-100x cost savings
            </SuiTitle>
            <SuiText className='text-balance'>
              Best in class ingestion and <br className='hidden lg:block' />
              compression rates (30x)
            </SuiText>
          </div>
          <div className='flex flex-1 flex-col items-center gap-4 text-center'>
            <Image src={iconStack} width={48} height={49} alt='Stack icon' />
            <SuiTitle
              type='h3'
              className='font-basier text-[1.5rem] font-semibold leading-[1.3]'>
              Full stack observability
            </SuiTitle>
            <SuiText className='text-balance'>
              Unify Session Replays, Logs, <br className='hidden lg:block' />
              Traces, Metrics and Errors
            </SuiText>
          </div>
        </div>

        {/* Diagram */}
        <div className='mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-8 lg:flex-row lg:items-start lg:gap-20'>
          <div className='px-6'>
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
                  Powered by ClickHouse, HyperDX searches terabytes in seconds
                  and ingests billions of high-cardinality events daily.
                  ClickStack ships with optimized schemas, removing the need for
                  manual tuning and letting you focus on insights.
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
                  ClickHouse.
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
              href='https://console.clickhouse.cloud/signUp?loc=use-case-observability'
              target='_blank'
              className='px-10'
              linkClass='inline-block'>
              Get started with ClickStack
            </CUIButton>
          </div>
        </div>
      </section>

      {/* Custom stack */}
      <section className='section-container my-20 lg:my-24'>
        <div className='relative flex flex-col gap-8 overflow-clip rounded bg-neutral-750 p-8 lg:p-16'>
          <div className='absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary-300 to-transparent' />

          <div className='mx-auto max-w-4xl space-y-8 text-center lg:px-2'>
            <SuiTitle type='h2'>Want to compose your own stack?</SuiTitle>
            <SuiText>
              Need a custom pipeline or schema? The HyperDX UI is
              schema-agnostic and works with any telemetry pipeline, connecting
              to any ClickHouse instance for full control over your
              observability data.
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
          Get started with ClickStack
        </SuiTitle>
        <div className='space-y-6'>
          <Image src={iconCoins} width={48} height={49} alt='Savings icon' />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            Reduce your observability costs
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse delivers exceptional cost efficiency, avoiding the
            overhead of JVM-based systems, with a hardware-optimized
            column-oriented design that reduces storage by up to 90% without
            sacrificing speed.
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
            Simple deployment and maintenance
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
            Unlock real-time observability
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
            Not just observability
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

      {/* Integrations */}
      <section className='section-container my-24 lg:my-36'>
        <div className='mx-auto mb-10 max-w-4xl space-y-6 text-center lg:mb-16 lg:px-12'>
          <SuiTitle type='h2'>Instrument your applications</SuiTitle>
          <SuiText size='lg' className='text-neutral-200'>
            Trace every log, API request, DB query, and more with just a few
            lines of code. Instrument and observe your stack in minutes with
            ClickStack.
          </SuiText>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-10 xl:justify-between xl:gap-12'>
          <Image src={integrationNodejs} width={49} height={55} alt='NodeJS' />
          <Image src={integrationGo} width={49} height={19} alt='Go' />
          <Image src={integrationJava} width={37} height={49} alt='Java' />
          <Image
            src={integrationJavascript}
            width={49}
            height={49}
            alt='Javascript'
          />
          <Image src={integrationNextjs} width={92} height={19} alt='NextJS' />
          <Image src={integrationPython} width={49} height={49} alt='Python' />
          <Image src={integrationRuby} width={46} height={45} alt='Ruby' />
          <Image
            src={integrationCloudflare}
            width={49}
            height={23}
            alt='Cloudflare'
          />
          <Image
            src={integrationKubernetes}
            width={49}
            height={47}
            alt='Kubernetes'
          />
          <Image
            src={integrationOpentelemetry}
            width={49}
            height={49}
            alt='OpenTelemetry'
          />
          <Image src={integrationAws} width={70} height={42} alt='AWS' />
          <Image
            src={integrationFluentd}
            width={49}
            height={49}
            alt='Fluentd'
          />
        </div>
      </section>

      {/* Try ClickHouse */}
      <div className='section-container my-20 md:px-8 lg:my-24 2xl:px-0'>
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
              className='group mx-auto w-full px-10 md:w-auto'
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
              className='group mx-auto w-full !border-neutral-800 px-10 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white md:w-auto'
              target='_blank'
              href='/company/contact?loc=use-case-observability'
              onClick={useGalaxyOnClick(
                'observabilityUseCasePage.footerCta.requestDemoSelect'
              )}>
              Get a demo
            </CUIButton>
          </p>
        </div>
      </div>
    </Layout>
  )
}
