import imageAiExperience from './assets/01-ai-experience.png'
import imageContextAware from './assets/02-context-aware.png'
import imageBuiltIn from './assets/03-built-in.png'
import imageAiDocs from './assets/04-ai-docs.png'
import imageMcpServer from './assets/05-mcp-server.png'
import imageMcpClient from './assets/06-mcp-client.png'
import demoThumbnail from './assets/demo-thumbnail.png'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import ResponsiveHtml5Video from '@/components-cleaned/ResponsiveHtml5Video'
import TickItem from '@/components-cleaned/TickItem'
import AnimatedFlare from '@/components/AnimatedFlare'
import { CUIButton } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React, { CSSProperties } from 'react'

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

export default function Page({ seo, headerData, footerData }: CommonProps) {
  useGalaxyOnPage('aiPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
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
              Powered by ClickHouse, MCP and LibreChat.
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
                href='#'
                onClick={useGalaxyOnClick('aiPage.heroCta.viewDocumentation')}
                type='secondary'
                size='lg'
                className='w-full !px-10 sm:w-auto'>
                View documentation
              </CUIButton>
            </div>
          </div>
          <div className='relative'>
            {/* Center border */}
            <div className='absolute -inset-1 rounded-[1.75%/3.5%] bg-primary-300 mix-blend-overlay' />
            <ResponsiveHtml5Video
              muted={true}
              playsInline={true}
              loop={true}
              autoPlay={true}
              preload='metadata'
              className='relative z-10 block h-auto w-full rounded-[1.5%/3%]'
              sources={{
                defaultSrc: '/ai/hero-1280.mp4',
                candidates: [
                  {
                    src: '/ai/hero-960.mp4',
                    media: '(max-width: 768px) and (resolution: 1dppx)'
                  },
                  {
                    src: '/ai/hero-1280.mp4',
                    media: '(max-width: 768px) and (min-resolution: 2dppx)'
                  },
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
            image={
              <Image
                src={imageAiExperience}
                width={874 / 2}
                height={373 / 2}
                alt='A feature-complete AI experience'
              />
            }>
            <SuiTitle
              type='h3'
              className='mb-8 max-w-md !text-4xl'
              weight='semibold'>
              An open-source, composable stack
            </SuiTitle>
            <TickItem className='max-w-md'>
              LibreChat gives you a familiar chat UI
            </TickItem>
            <TickItem className='max-w-md'>
              MCP lets you connect to all of your favorite tools
            </TickItem>
            <TickItem className='max-w-md'>
              All the top AI models. One place.
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
            image={
              <Image
                src={imageContextAware}
                width={1427 / 2}
                height={729 / 2}
                alt='Context-aware prompting'
              />
            }>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Chat, visualise, share
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
            image={
              <Image
                src={imageBuiltIn}
                width={1248 / 2}
                height={1545 / 2}
                alt='Built into the cloud UX'
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
            image={
              <Image
                src={imageAiDocs}
                width={890 / 2}
                height={1261 / 2}
                alt='AI-powered “Ask the docs”'
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
        <div className='section-container'>
          <SuiTitle type='h2' className='mb-6 lg:mb-16 lg:text-center'>
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
            {/*<CUIButton
              type='primary'
              href='/videos/librechat-mcp-server'
              linkClass='inline-block'>
              Watch the demo
            </CUIButton>*/}
          </FeatureSection>
        </div>
      </section>

      {/* Resources */}
      <section></section>

      {/* AgentHouse */}
      <section></section>

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
