import imageAiExperience from './assets/01-ai-experience.png'
import imageContextAware from './assets/02-context-aware.png'
import imageBuiltIn from './assets/03-built-in.png'
import imageAiDocs from './assets/04-ai-docs.png'
import imageMcpServer from './assets/05-mcp-server.png'
import imageMcpClient from './assets/06-mcp-client.png'
import heroCenter from './assets/hero-center.png'
import heroLeft from './assets/hero-left.png'
import heroRightBig from './assets/hero-right-big.png'
import heroRightSmall from './assets/hero-right-small.png'
import TickItem from '@/components-cleaned/TickItem'
import AnimatedFlare from '@/components/AnimatedFlare'
import { CUIButton } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinedIconCard, { LinedIconCardProps } from '@/components/LinedIconCard'
import Parallax from '@/components/Parallax'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { CSSProperties, useEffect, useState } from 'react'

type Tabs = 'mcp' | 'assistant'
type Feature = Pick<LinedIconCardProps, 'icon' | 'title' | 'text'> & {
  tab: Tabs
}
const featues: Array<Feature> = [
  {
    tab: 'assistant',
    icon: 'users-three',
    title: 'Natural language interaction',
    text: (
      <>
        &bull; Chat like a teammate
        <br />
        &bull; Ask data question in plain English
        <br />
        &bull; Generate SQL queries, visualisations or summaries
      </>
    )
  },
  {
    tab: 'assistant',
    icon: 'database',
    title: 'Context-aware assistance',
    text: (
      <>
        &bull; Understands your current tab, saved{' '}
        <br className='hidden lg:block' />
        queries schema, dashboard
        <br />
        &bull; Dynamically adapts answers based on{' '}
        <br className='hidden lg:block' />
        what is relevant
      </>
    )
  },
  {
    tab: 'assistant',
    icon: 'magic-wand',
    title: 'Seamless integration',
    text: (
      <>
        &bull; Pushes queries directly to the editor
        <br />
        &bull; Creates saved queries, dashboards, API Endpoints
        <br />
        &bull; Acts like Colipot for ClickHouse Cloud
      </>
    )
  },
  {
    tab: 'assistant',
    icon: 'chart-line',
    title: 'Dashboard & reporting',
    text: (
      <>
        &bull; Analyses dashboards, highlights anomalies or trends
        <br />
        &bull; Summarises what dashboards are telling you
        <br />
        &bull; Can generate reports with clear insights
      </>
    )
  },
  {
    tab: 'mcp',
    icon: 'sidebar',
    title: (
      <>
        Built into your ClickHouse Cloud <br className='hidden lg:block' />
        service as a new interface
      </>
    )
  },
  {
    tab: 'mcp',
    icon: 'squares-four',
    title: (
      <>
        Leverage your data with external <br className='hidden lg:block' />
        agents and MCP-compatible clients
      </>
    )
  },
  {
    tab: 'mcp',
    icon: 'keyhole',
    title: (
      <>
        Secured with OAuth for <br className='hidden lg:block' />
        authentication
      </>
    )
  },
  {
    tab: 'mcp',
    icon: 'toggle-right',
    title: (
      <>
        Turn-key experience, no infra to <br className='hidden lg:block' />
        setup or manage
      </>
    )
  }
]

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title:
            'ClickHouse.ai — Natural language & MCP interface for your data',
          description:
            'Unlock Agent-Facing Analytics within the ClickHouse Cloud console or via the native remote MCP server',
          path: '/ai'
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo, headerData }: CommonProps) {
  useGalaxyOnPage('aiPage')

  const [activeTab, setActiveTab] = useState<Tabs>('assistant')

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      if (
        router.query?.feature &&
        (router.query.feature === 'mcp' || router.query.feature === 'assistant')
      ) {
        setActiveTab(router.query.feature)
      }
    }
  }, [router])

  return (
    <Layout seo={seo} headerData={headerData}>
      {/* Hero */}
      <section
        className='bg-shadow-element yellow-shadow relative overflow-hidden bg-grid pb-6 md:pb-20'
        style={
          {
            '--top-side': '60%',
            '--right-side': '20%',
            '--left-side': 'auto'
          } as React.CSSProperties
        }>
        <AnimatedFlare className='absolute -bottom-[40%] left-1/2 z-0 aspect-video h-[140vh] max-w-[3000px] -translate-x-1/3 md:bottom-0 md:left-1/2 md:h-auto md:w-[200vw] md:-translate-x-1/2 lg:-bottom-[5%] xl:-bottom-[3%] 3xl:bottom-[3%] 3xl:w-[150vw]' />
        <div className='section-container'>
          <div className='relative z-10 pb-8 pt-16 text-center md:py-24'>
            <SuiTitle
              type='h1'
              className='font-semibold sm:!text-6.5xl lg:text-[5rem]'
              weight='bold'>
              ClickHouse.ai
            </SuiTitle>
            <SuiText size='lg' className='!mb-8 !mt-4 text-balance'>
              Unlock Agent-Facing Analytics within the ClickHouse Cloud console
              or <br className='hidden md:block' />
              via the native remote MCP server
            </SuiText>
            <CUIButton
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=aiPageHeroCta'
              onClick={useGalaxyOnClick(
                'aiPage.heroCta.createFreeAccountSelect'
              )}
              type='primary'
              size='lg'
              className='inline-block'
              linkClass='inline-block'>
              Start free trial
            </CUIButton>
          </div>
          <div className='2xl:-mx-16'>
            <div className='relative aspect-[365/441] md:aspect-[2460/1259]'>
              {/* Center border */}
              <div className='absolute bottom-[14.85%] left-[6.62%] top-0 hidden w-[87.23%] rounded-[0.77%/1.5%] bg-primary-300 mix-blend-overlay md:block' />
              <Image
                src={heroCenter}
                width={2135 / 2}
                height={1060 / 2}
                alt='Hero center'
                className='absolute left-[6.82%] top-[0.47%] hidden h-auto w-[86.74%] rounded-[0.32%/0.63%] md:block'
                loading='eager'
                priority={true}
              />
              <Parallax
                speed={15}
                direction='up'
                className='absolute bottom-0 right-0 h-auto w-[69.22%] md:w-[31.05%]'>
                <Image
                  src={heroRightBig}
                  width={764 / 2}
                  height={1149 / 2}
                  alt='Hero right big'
                  className='h-full w-full'
                  loading='eager'
                  priority={true}
                />
              </Parallax>
              <Parallax
                speed={10}
                direction='up'
                className='absolute left-0 top-0 h-auto w-[82.15%] md:top-[28.43%] md:w-[36.09%]'>
                <Image
                  src={heroLeft}
                  width={888 / 2}
                  height={844 / 2}
                  alt='Hero left'
                  className='h-full w-full'
                  loading='eager'
                  priority={true}
                />
              </Parallax>
              <Parallax
                speed={5}
                direction='up'
                className='absolute bottom-[5.32%] right-[34.8%] h-auto w-[53.03%] md:bottom-[5.63%] md:right-[15.69%] md:w-[23.65%]'>
                <Image
                  src={heroRightSmall}
                  width={583 / 2}
                  height={253 / 2}
                  alt='Hero right small'
                  className='h-full w-full'
                  loading='eager'
                  priority={true}
                />
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className='relative z-10 bg-neutral-700 py-16 lg:py-20'>
        <div className='section-container'>
          <div className='mx-auto mb-10 flex w-max lg:mb-16'>
            <button
              type='button'
              className={`rounded rounded-r-none border px-5 py-1.5 text-sm transition-colors ${activeTab === 'mcp' ? 'border-primary-300 bg-[#2D2D2D]' : 'border-[#585858] bg-neutral-750 text-neutral-300 hover:text-white'}`}
              onClick={(event) => {
                event.preventDefault()
                setActiveTab('mcp')
              }}>
              Remote MCP Server
            </button>
            <button
              type='button'
              className={`rounded rounded-l-none border px-5 py-1.5 text-sm transition-colors ${activeTab === 'assistant' ? 'border-primary-300 bg-[#2D2D2D]' : 'border-[#585858] bg-neutral-750 text-neutral-300 hover:text-white'}`}
              onClick={(event) => {
                event.preventDefault()
                setActiveTab('assistant')
              }}>
              Agentic Ask AI
            </button>
          </div>
          <div className='-mx-4 flex flex-col lg:flex-row lg:flex-wrap lg:justify-center'>
            {featues
              .filter((item) => item.tab === activeTab)
              .map((feature, tabIndex) => {
                return (
                  <div key={tabIndex} className='p-4 lg:w-1/2'>
                    <LinedIconCard
                      icon={feature.icon}
                      title={feature.title}
                      text={feature.text}
                      className='bg-neutral-900/80'
                    />
                  </div>
                )
              })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='my-24'>
        <div className='section-container relative z-10 space-y-16 lg:space-y-28 lg:pt-6'>
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': '20%',
                '--left-side': 'auto',
                '--scale': '1',
                '--opacity': '0.02'
              } as CSSProperties
            }
            image={{
              src: imageAiExperience,
              width: 874 / 2,
              height: 373 / 2,
              alt: 'A feature-complete AI experience'
            }}>
            <SuiTitle
              type='h3'
              className='mb-8 max-w-md !text-4xl'
              weight='semibold'>
              A feature-complete AI experience
            </SuiTitle>
            <TickItem className='max-w-md'>
              <strong>Docs AI:</strong>Allows you to query the docs for help
            </TickItem>
            <TickItem className='max-w-md'>
              <strong>AI Assistant:</strong> helps you craft SQL queries powered
              by our ClickHouse fine-tuned text-to-sql model
            </TickItem>
            <TickItem className='max-w-md'>
              <strong>AI Agent:</strong> Generate full fledged analysis and
              reports on top of your datasets
            </TickItem>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': 'auto',
                '--left-side': '20%',
                '--scale': '1',
                '--opacity': '0.02'
              } as CSSProperties
            }
            flip={true}
            image={{
              src: imageContextAware,
              width: 1427 / 2,
              height: 729 / 2,
              alt: 'Context-aware prompting'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Context-aware prompting
            </SuiTitle>
            <TickItem>Understands your active query</TickItem>
            <TickItem>Auto-detects data sources</TickItem>
            <TickItem>Considers your saved queries</TickItem>
            <TickItem>Integrated with query history</TickItem>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': '20%',
                '--left-side': 'auto',
                '--scale': '1',
                '--opacity': '0.02'
              } as CSSProperties
            }
            image={{
              src: imageBuiltIn,
              width: 1248 / 2,
              height: 1545 / 2,
              alt: 'Built into the cloud UX'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Built into the cloud UX
            </SuiTitle>
            <TickItem>Directly embedded in your workflow</TickItem>
            <TickItem>Instant chart generation from results</TickItem>
            <TickItem>One-click to edit or run in SQL editor</TickItem>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': 'auto',
                '--left-side': '20%',
                '--scale': '1',
                '--opacity': '0.02'
              } as CSSProperties
            }
            flip={true}
            image={{
              src: imageAiDocs,
              width: 890 / 2,
              height: 1261 / 2,
              alt: 'AI-powered “Ask the docs”'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              AI-powered “Ask the docs”
            </SuiTitle>
            <TickItem>Ask questions in plain language</TickItem>
            <TickItem>Instant access to syntax and examples</TickItem>
            <TickItem>Built on ClickHouse knowledge</TickItem>
            <TickItem>Ready-to-edit in your workspace</TickItem>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': '20%',
                '--left-side': 'auto',
                '--scale': '1',
                '--opacity': '0.02'
              } as CSSProperties
            }
            image={{
              src: imageMcpServer,
              width: 908 / 2,
              height: 859 / 2,
              alt: 'A fully managed remote MCP Server'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              A fully managed remote MCP Server
            </SuiTitle>
            <TickItem className='max-w-sm'>
              Built into your ClickHouse Cloud service as a new interface
            </TickItem>
            <TickItem className='max-w-sm'>
              Leverage your data with external agents and MCP-compatible clients
            </TickItem>
            <TickItem className='max-w-sm'>
              Secured with OAuth for authentication
            </TickItem>
            <TickItem>
              Turn-key experience, no infra to setup or manage
            </TickItem>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': 'auto',
                '--left-side': '20%',
                '--scale': '1',
                '--opacity': '0.02'
              } as CSSProperties
            }
            flip={true}
            image={{
              src: imageMcpClient,
              width: 1092 / 2,
              height: 982 / 2,
              alt: 'Bring your own MCP-compatible client'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Bring your own MCP-
              <br className='hidden lg:block' />
              compatible client
            </SuiTitle>
            <TickItem>Claude (Desktop or Web via integrations)</TickItem>
            <TickItem>Cursor</TickItem>
            <TickItem>Windsurf</TickItem>
            <TickItem>
              <Link
                href='https://github.com/punkpeye/awesome-mcp-clients'
                target='_blank'
                className='text-primary-300 underline hover:decoration-2'>
                And many more
              </Link>
            </TickItem>
          </FeatureSection>
        </div>
      </section>

      {/* Get started */}
      <section className='section-container my-20 md:px-8 2xl:px-0'>
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
            href='https://console.clickhouse.cloud/signUp?loc=aiPageFooterCta'
            onClick={useGalaxyOnClick(
              'aiPage.footerCta.createFreeAccountSelect'
            )}>
            Create a free account
          </CUIButton>
        </div>
      </section>
    </Layout>
  )
}

function FeatureSection({
  image,
  children,
  flip = false,
  className = '',
  style
}: {
  image: ImageProps
  children: React.ReactNode
  flip?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`flex flex-col items-center gap-x-16 ${
        flip ? 'md:flex-row-reverse' : 'md:flex-row'
      } justify-center ${className}`}
      style={style}>
      <div className='relative z-10 mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
        <div className='space-y-4 border-yellow-200 md:border-l-4 md:pl-8'>
          {children}
        </div>
      </div>
      <div className='relative z-10 flex items-center justify-center md:w-1/2'>
        <Image {...image} alt={image.alt || ''} />
      </div>
    </div>
  )
}
