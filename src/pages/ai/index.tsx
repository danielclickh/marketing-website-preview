import imageArchitecture from './assets/01-architecture.png'
import imageAgent from './assets/02-agent.png'
import imageMcp from './assets/03-mcp.png'
import imageModels from './assets/04-models.png'
import demoThumbnail from './assets/demo-thumbnail.png'
import iconAgentFacingAnalytics from './assets/icon-agent-facing-analytics.svg'
import iconAgenthouse from './assets/icon-agenthouse.svg'
import iconAgenticDataStack from './assets/icon-agentic-data-stack.svg'
import iconDataWarhouseAi from './assets/icon-data-warehouse-ai.svg'
import iconDocs from './assets/icon-docs.svg'
import iconGithub from './assets/icon-github.svg'
import iconRemoteMcp from './assets/icon-remote-mcp.svg'
import iconYoutube from './assets/icon-youtube.svg'
import langfuseObservability from './assets/langfuse-observability.png'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import ResponsiveHtml5Video from '@/components-cleaned/ResponsiveHtml5Video'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton } from '@/components/ClickUI'
import dynamic from 'next/dynamic'

const AnimatedFlare = dynamic(() => import('@/components/AnimatedFlare'), {
  ssr: false
})
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { ExternalLink } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { CSSProperties, useEffect, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'ClickHouse.ai — Agentic Data Stack',
          description:
            'The open-source stack for agentic analytics powered by ClickHouse, MCP, and LibreChat.',
          path: '/ai'
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo, headerData }: CommonProps) {
  useGalaxyOnPage('aiPage')

  // Only mount the video on desktop to avoid downloading on mobile
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

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
              Agentic Data Stack
            </SuiTitle>
            <SuiText size='lg' className='!mb-8 !mt-4 text-balance'>
              The open-source stack for agentic analytics.
              <br />
              Your chat, your models, your data.
              <br />
              Powered by ClickHouse, LibreChat and Langfuse.
            </SuiText>
            <div className='!my-8 flex flex-col gap-6 sm:flex-row sm:justify-center'>
              <CUIButton
                href='https://console.clickhouse.cloud/signUp?loc=aiPageHeroCta'
                onClick={useGalaxyOnClick('aiPage.heroCta.getStartedToday')}
                type='primary'
                size='lg'
                className='w-full !px-10 sm:w-auto'>
                Get started today
              </CUIButton>
              <CUIButton
                href='https://clickhouse.com/docs/use-cases/AI/MCP/librechat'
                onClick={useGalaxyOnClick('aiPage.heroCta.viewDocumentation')}
                type='secondary'
                size='lg'
                className='w-full !bg-neutral !px-10 sm:w-auto md:!bg-transparent'>
                View documentation
              </CUIButton>
            </div>
          </div>
          {/* Only mount video on desktop — avoids downloading 6-13MB on mobile */}
          {isDesktop && (
            <div className='relative'>
              {/* Center border */}
              <div className='absolute -inset-1 rounded-[1.75%/3.5%] bg-primary-300 mix-blend-overlay' />
              <ResponsiveHtml5Video
                muted={true}
                playsInline={true}
                loop={true}
                autoPlay={true}
                defer={true}
                preload='none'
                poster='/ai/hero-poster.jpg'
                className='relative z-10 block h-auto w-full rounded-[1.5%/3%] bg-neutral'
                sources={{
                  defaultSrc: '/ai/hero-1280.mp4',
                  candidates: [
                    {
                      src: '/ai/hero-1280.mp4',
                      media: '(min-width: 769px) and (resolution: 1dppx)'
                    },
                    {
                      src: '/ai/hero-1920.mp4',
                      media: '(min-width: 769px) and (min-resolution: 2dppx)'
                    }
                  ]
                }}
              />
            </div>
          )}
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
                '--right-side': 'auto',
                '--left-side': '20%',
                '--scale': '0.7',
                '--opacity': '0.02'
              } as CSSProperties
            }
            image={
              <Image
                src={imageAgent}
                width={1093 / 2}
                height={498 / 2}
                alt='Create your agent'
              />
            }>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Chat, visualize, share
            </SuiTitle>
            <TickItem>Talk to your data</TickItem>
            <TickItem>
              Create and share no-code, specialized agents across your team
            </TickItem>
            <TickItem>
              Create charts, visualisations, and dashboards from chats
            </TickItem>
            <TickItem>
              Save and share chat and artifacts with your team
            </TickItem>
          </FeatureSection>
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': '20%',
                '--left-side': 'auto',
                '--scale': '0.7',
                '--opacity': '0.02'
              } as CSSProperties
            }
            image={
              <Image
                src={imageArchitecture}
                width={945 / 2}
                height={784 / 2}
                alt='Architecture'
              />
            }>
            <SuiTitle
              type='h3'
              className='max-w-md !text-4xl'
              weight='semibold'>
              An open-source, composable stack
            </SuiTitle>
            <p className='!mt-2 mb-8 max-w-md text-lg text-neutral-200/75'>
              Monitored by the leading solution for LLM observability,
              evaluations, and prompt management.
            </p>
            <TickItem className='max-w-md'>
              LibreChat gives you a familiar chat UI
            </TickItem>
            <TickItem className='max-w-md'>
              <Link
                href='https://clickhouse.com/docs/use-cases/AI/MCP'
                className='text-primary-300 underline hover:decoration-2'>
                MCP lets you connect to all of your favorite tools
              </Link>
            </TickItem>
            <TickItem className='max-w-md'>
              <Link
                href='https://www.librechat.ai/docs/features#-ai-model-selection'
                className='text-primary-300 underline hover:decoration-2'>
                All the top AI models. One place.
                <ExternalLink height={16} width={16} className='ml-2 inline' />
              </Link>
            </TickItem>
          </FeatureSection>
        </div>
      </section>
      <section className='my-24 bg-gradient-to-br from-[#042566] to-[#010C22]'>
        <div className='section-container py-16 lg:py-24'>
          <div className='flex flex-col items-center justify-center gap-x-16 gap-y-12 md:flex-row'>
            <div className='relative z-10 flex w-full flex-col md:w-1/2 md:text-left'>
              <Link
                href='/blog/clickhouse-acquires-langfuse-open-source-llm-observability'
                className='inline-flex w-full max-w-max items-center gap-3 rounded bg-neutral-400/20 px-3 py-2 text-xs text-neutral-200/75 transition-colors hover:text-neutral-200'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='13'
                  height='13'
                  fill='none'
                  viewBox='0 0 13 13'
                  className='flex-shrink-0 flex-grow-0'>
                  <path
                    fill='silver'
                    fillOpacity='.75'
                    d='M6.5 6c.28 0 .5.22.5.5v3.33a.5.5 0 1 1-1 0V6.5c0-.28.22-.5.5-.5m.07-2.66a.67.67 0 1 1-.73.73V4c0-.37.3-.67.66-.67z'
                  />
                  <path
                    fill='silver'
                    fill-opacity='.75'
                    fillRule='evenodd'
                    d='M6.5 0a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13m0 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11'
                    clipRule='evenodd'
                  />
                </svg>
                ClickHouse welcomes Langfuse: The future of open-source LLM
                observability
              </Link>
              <div className='mt-8 space-y-4 border-primary-300 md:border-l-4 md:pl-8'>
                <SuiTitle
                  type='h3'
                  className='mb-8 !text-4xl'
                  weight='semibold'>
                  Observe your agents with&nbsp;Langfuse
                </SuiTitle>
                <TickItem>
                  Trace full agent workflows, from prompts to tool calls and
                  responses
                </TickItem>
                <TickItem>
                  Evaluate agent outputs with custom scoring and human feedback
                </TickItem>
                <TickItem>
                  Monitor quality, cost, and latency across every LLM call
                </TickItem>
                <TickItem>
                  <Link
                    href='https://langfuse.com/?utm_source=clickhouse_dotai'
                    target='_blank'
                    className='text-primary-300 underline hover:decoration-2'>
                    Get started on langfuse.com
                    <ExternalLink
                      height={16}
                      width={16}
                      className='ml-2 inline'
                    />
                  </Link>
                </TickItem>
              </div>
            </div>
            <div className='relative z-10 flex w-full items-center justify-center md:w-1/2'>
              <Image
                src={langfuseObservability}
                width={1785 / 3}
                height={1273 / 3}
                alt='Languse'
              />
            </div>
          </div>
        </div>
      </section>
      <section className='my-24'>
        <div className='section-container relative z-10 space-y-16 lg:space-y-28 lg:pt-6'>
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': '20%',
                '--left-side': 'auto',
                '--scale': '0.7',
                '--opacity': '0.02'
              } as CSSProperties
            }
            image={
              <Image
                src={imageMcp}
                width={1095 / 2}
                height={589 / 2}
                alt='MCP'
              />
            }>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Integrate with anything, <br />
              thanks to MCP
            </SuiTitle>
            <TickItem>Integrate with databases, apps, and tools</TickItem>
            <TickItem>Interact with anything that supports MCP</TickItem>
            <TickItem>A unified AI interface for your organization</TickItem>
          </FeatureSection>
          <FeatureSection
            className='bg-shadow-element yellow-shadow'
            style={
              {
                '--top-side': '50%',
                '--right-side': 'auto',
                '--left-side': '20%',
                '--scale': '0.7',
                '--opacity': '0.02'
              } as CSSProperties
            }
            image={
              <Image
                src={imageModels}
                width={1091 / 2}
                height={800 / 2}
                alt='Control your AI model'
              />
            }>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              You're in control
            </SuiTitle>
            <TickItem>Control what is shared with model providers</TickItem>
            <TickItem>Integrate with your enterprise user management</TickItem>
            <TickItem>Use the models and providers that suit you best</TickItem>
            <TickItem>Implement a multi-provider AI strategy</TickItem>
          </FeatureSection>
        </div>
      </section>

      {/* Learn */}
      <section className='bg-neutral-700 py-12 lg:py-20'>
        <div className='section-container space-y-6 lg:space-y-16'>
          <SuiTitle type='h2' className='lg:text-center'>
            Learn more about the Agentic Data Stack
          </SuiTitle>
          <FeatureSection
            flip={true}
            image={
              <PlayOnClickVideo
                className='w-full'
                id='fuyu-AnfRDA'
                provider='youtube'
                thumbnail={
                  <Image
                    src={demoThumbnail}
                    width={2560 / 3}
                    height={1440 / 3}
                    alt='Agentic Data Stack demo thumbnail'
                  />
                }
                playButtonLabel='Watch the demo'
              />
            }>
            <p>
              Explore how the Agentic Data Stack enables AI agents to query,
              reason, and act on data in real time. Dive into practical
              examples, architectural deep dives, and product updates from the
              teams building agent-native analytics at ClickHouse.
            </p>
            <p>You’ll learn about:</p>
            <TickItem>
              How agents interact with data using MCP and open standards
            </TickItem>
            <TickItem>
              Designing analytics systems built for AI-first workflows
            </TickItem>
            <TickItem>Real-world use cases for agent-facing analytics</TickItem>
            <TickItem>
              The open-source foundations behind the Agentic Data Stack
            </TickItem>
            <LinkWithArrow
              href='https://clickhouse.com/docs/use-cases/AI/MCP/librechat'
              className='inline-block font-bold text-primary-300 hover:underline'>
              View documentation
            </LinkWithArrow>
          </FeatureSection>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <div className='relative space-y-4 rounded-lg border border-white/20 bg-white/5 p-6'>
              <Image
                src={iconAgentFacingAnalytics}
                width={26}
                height={26}
                alt='Agent-Facing Analytics icon'
              />
              <SuiTitle type='h3'>Agent-Facing Analytics</SuiTitle>
              <p className='text-sm text-neutral-200'>
                Analytics designed for AI agents to explore data, generate
                insights, and take action in real time.
              </p>
              <LinkWithArrow
                href='/blog/agent-facing-analytics'
                className='inline-block font-bold text-primary-300 hover:underline'>
                <span className='absolute inset-0' />
                Learn more
              </LinkWithArrow>
            </div>
            <div className='relative space-y-4 rounded-lg border border-white/20 bg-white/5 p-6'>
              <Image
                src={iconAgenticDataStack}
                width={26}
                height={26}
                alt='Agentic Data Stack icon'
              />
              <SuiTitle type='h3'>Agentic Data Stack</SuiTitle>
              <p className='text-sm text-neutral-200'>
                An open, agent-native data stack that connects models, tools,
                and fast analytical databases.
              </p>
              <LinkWithArrow
                href='/blog/librechat-open-source-agentic-data-stack'
                className='inline-block font-bold text-primary-300 hover:underline'>
                <span className='absolute inset-0' />
                Learn more
              </LinkWithArrow>
            </div>
            <div className='relative space-y-4 rounded-lg border border-white/20 bg-white/5 p-6'>
              <Image
                src={iconDataWarhouseAi}
                width={26}
                height={26}
                alt='Data Warehouse AI icon'
              />
              <SuiTitle type='h3'>Data Warehouse AI</SuiTitle>
              <p className='text-sm text-neutral-200'>
                AI-powered workflows that bring intelligence directly into
                modern data warehouses.
              </p>
              <LinkWithArrow
                href='/blog/ai-first-data-warehouse'
                className='inline-block font-bold text-primary-300 hover:underline'>
                <span className='absolute inset-0' />
                Learn more
              </LinkWithArrow>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className='section-container my-20'>
        <div className='mx-auto mb-16 max-w-2xl space-y-4 lg:text-center'>
          <SuiTitle type='h2'>Resources</SuiTitle>
          <SuiText size='lg' className='opacity-70'>
            Everything you need to build, deploy, and scale with AI -
            documentation, tools, integrations, and community resources in one
            place.
          </SuiText>
        </div>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2'>
          {[
            {
              href: 'https://clickhouse.com/docs/use-cases/AI/ask-ai',
              label: 'Docs',
              icon: iconDocs
            },
            {
              href: '/blog/agenthouse-demo-clickhouse-llm-mcp',
              label: 'AgentHouse',
              icon: iconAgenthouse
            },
            {
              href: 'https://clickhouse.com/docs/use-cases/AI/MCP/remote_mcp',
              label: 'Remote MCP server',
              icon: iconRemoteMcp
            },
            {
              href: 'https://www.youtube.com/watch?v=GfvZHSdJ4CU&t=1527s',
              label: 'ClickHouse for AI and ML',
              icon: iconYoutube,
              target: '_blank'
            },
            {
              href: 'https://github.com/ClickHouse/mcp-clickhouse',
              label: 'MCP ClickHouse',
              icon: iconGithub,
              target: '_blank'
            },
            {
              href: 'https://github.com/danny-avila/LibreChat',
              label: 'LibreChat GitHub',
              icon: iconGithub,
              target: '_blank'
            }
          ].map((linkItem, linkIndex) => {
            return (
              <Link
                key={linkIndex}
                href={linkItem.href}
                target={linkItem?.target}
                className='flex items-center gap-4 rounded border border-neutral-700/80 bg-neutral-900/50 p-4 transition-colors hover:border-primary-500 hover:bg-neutral-725/80'>
                <Image
                  src={linkItem.icon}
                  width={32}
                  height={32}
                  alt={`${linkItem.label} icon`}
                />
                <hr className='h-auto w-px self-stretch border-none bg-neutral-700/80' />
                <span>{linkItem.label}</span>
                <ExternalLink
                  width={24}
                  height={24}
                  strokeWidth={1.5}
                  className='ml-auto'
                />
              </Link>
            )
          })}
        </div>
      </section>

      {/* AgentHouse */}
      <section className='bg-neutral-700 py-12 lg:py-20'>
        <div className='section-container'>
          <div className='mx-auto max-w-2xl space-y-4 text-center'>
            <SuiTitle type='h2'>Meet AgentHouse</SuiTitle>
            <SuiText size='lg' className='opacity-70'>
              AgentHouse is built with the Agentic Data Stack, and allows you to
              chat with public datasets hosted in our ClickHouse playground.
            </SuiText>
          </div>
          <div className='mt-8 flex flex-col gap-6 sm:flex-row sm:justify-center'>
            <CUIButton
              href='https://llm.clickhouse.com/'
              onClick={useGalaxyOnClick('aiPage.agenthouse.tryItNow')}
              type='primary'
              className='w-full border-none !px-8 sm:w-auto'>
              Try it now
            </CUIButton>
            <CUIButton
              href='/blog/agenthouse-demo-clickhouse-llm-mcp'
              onClick={useGalaxyOnClick('aiPage.agenthouse.readTheBlog')}
              type='primary-dark'
              className='w-full border-none !px-8 sm:w-auto'>
              Read the blog
            </CUIButton>
          </div>
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
  image: React.ReactNode
  children: React.ReactNode
  flip?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`flex flex-col items-center gap-x-16 gap-y-12 ${
        flip ? 'md:flex-row-reverse' : 'md:flex-row'
      } justify-center ${className}`}
      style={style}>
      <div className='relative z-10 flex w-full flex-col md:w-1/2 md:text-left'>
        <div className='space-y-4 border-primary-300 md:border-l-4 md:pl-8'>
          {children}
        </div>
      </div>
      <div className='relative z-10 flex w-full items-center justify-center md:w-1/2'>
        {image}
      </div>
    </div>
  )
}
