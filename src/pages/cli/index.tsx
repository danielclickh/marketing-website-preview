import imageArchitecture from '../ai/assets/01-architecture.png'
import imageAgent from '../ai/assets/02-agent.png'
import imageMcp from '../ai/assets/03-mcp.png'
import imageModels from '../ai/assets/04-models.png'
import demoThumbnail from '../ai/assets/demo-thumbnail.png'
import iconAgentFacingAnalytics from '../ai/assets/icon-agent-facing-analytics.svg'
import iconAgenthouse from '../ai/assets/icon-agenthouse.svg'
import iconAgenticDataStack from '../ai/assets/icon-agentic-data-stack.svg'
import iconDataWarhouseAi from '../ai/assets/icon-data-warehouse-ai.svg'
import iconDocs from '../ai/assets/icon-docs.svg'
import iconGithub from '../ai/assets/icon-github.svg'
import iconRemoteMcp from '../ai/assets/icon-remote-mcp.svg'
import iconYoutube from '../ai/assets/icon-youtube.svg'
import langfuseObservability from '../ai/assets/langfuse-observability.png'
import logoCbioportal from '../ai/assets/logo-cbioportal.svg'
import logoDaimlerTruck from '../ai/assets/logo-daimler-truck.svg'
import logoFetch from '../ai/assets/logo-fetch.svg'
import logoShopify from '../ai/assets/logo-shopify.svg'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import ResponsiveHtml5Video from '@/components-cleaned/ResponsiveHtml5Video'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import QuoteCard from '@/components/QuoteCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { ExternalLink } from 'lucide-react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'


import Image from 'next/image'
import Link from 'next/link'
import { Inconsolata } from 'next/font/google'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'

const inconsolata = Inconsolata({ subsets: ['latin'], weight: '400', variable: '--font-inconsolata' })


export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'ClickHouse CLI — Full control over ClickHouse with clickhousectl',
          description:
            'The official CLI to run, query, and build with ClickHouse locally and in the cloud.',
          path: '/cli'
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo, headerData }: CommonProps) {
  useGalaxyOnPage('cliPage')

  return (
    <Layout seo={seo} headerData={headerData}>
      {/* Hero */}
      <section
        className='relative overflow-hidden pb-16 md:pb-28'
        style={{ background: '#000' }}>
        <AuroraBg />
        <div className='section-container'>
          <div className='relative z-10 pb-6 pt-16 text-center md:pb-12 md:pt-24'>
            <SuiTitle
              type='h1'
              className='!text-[36px] font-semibold'
              weight='bold'>
              Full control over ClickHouse with{' '}
              <span
                style={{
                  color: '#FF792A',
                  background: '#232529',
                  border: '1px solid #3C3E42',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  display: 'inline-block',
                  fontFamily: `${inconsolata.style.fontFamily}, monospace`,
                  fontWeight: 400,
                  fontSize: '32px',
                }}>
                clickhousectl
              </span>
            </SuiTitle>
            <SuiText size='lg' className='!mb-8 !mt-4 text-balance'>
              The official CLI to run, query, and build with ClickHouse locally and in the cloud.
            </SuiText>
            <div className='!my-8 flex flex-col gap-6 sm:flex-row sm:justify-center'>
              <CUIButton
                href='https://console.clickhouse.cloud/signUp?loc=cliPageHeroCta'
                onClick={useGalaxyOnClick('cliPage.heroCta.getStartedToday')}
                type='primary'
                size='lg'
                className='w-full !px-10 sm:w-auto'>
                Get started today
              </CUIButton>
              <CUIButton
                href='https://clickhouse.com/docs/use-cases/AI/MCP/librechat'
                onClick={useGalaxyOnClick('cliPage.heroCta.viewDocumentation')}
                type='secondary'
                size='lg'
                className='w-full !px-10 sm:w-auto !bg-black'>
                View documentation
              </CUIButton>
            </div>
          </div>
          <div className='relative mx-auto max-w-[600px]' style={{ borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className='relative z-10 w-full overflow-hidden rounded-[10px] bg-neutral'>
              <TerminalAnimation />
            </div>
          </div>
          <p className='relative z-10 mx-auto mt-4 max-w-[600px] text-center text-sm text-neutral-200/60'>
            Or install for{' '}
            <Link href='https://clickhouse.com/docs/install/windows' className='text-primary-300 underline hover:decoration-2'>Windows</Link>
            {', '}
            <Link href='https://clickhouse.com/docs/install/docker' className='text-primary-300 underline hover:decoration-2'>Docker</Link>
            {' or see '}
            <Link href='https://clickhouse.com/docs/install' className='text-primary-300 underline hover:decoration-2'>other install options</Link>
            .
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className='section-container my-12'>
        <div className='mx-auto mb-16 max-w-2xl space-y-4 lg:text-center'>
          <SuiTitle type='h2'>Built for every workflow</SuiTitle>
          <SuiText size='lg' className='opacity-70'>
            From quick queries to production pipelines - the CLI handles it.
          </SuiText>
        </div>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {[
            {
              label: 'Query data interactively',
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.41012 8.40963C12.0684 4.75134 18.0004 4.75161 21.6588 8.40963L21.9909 8.75989C25.0894 12.1894 25.2002 17.3564 22.3268 20.9122L26.0403 24.6258C26.4308 25.0163 26.4308 25.6493 26.0403 26.0398C25.6498 26.4303 25.0168 26.4303 24.6263 26.0398L20.914 22.3276C17.2351 25.3006 11.8297 25.0779 8.41012 21.6583C4.7521 17.9999 4.75183 12.0679 8.41012 8.40963ZM19.97 9.56328C17.0777 6.94992 12.6117 7.03619 9.82418 9.8237C6.94694 12.7009 6.94721 17.3669 9.82418 20.2443C12.6792 23.0993 17.2934 23.1199 20.1757 20.3094C20.1957 20.2852 20.2169 20.2617 20.2395 20.2391C20.2626 20.216 20.2865 20.1943 20.3112 20.174C23.032 17.3822 23.0984 12.9671 20.5065 10.0984L20.2448 9.8237L19.97 9.56328Z" fill="#FAFF69"/>
                </svg>
              )
            },
            {
              label: 'Manage Cloud services',
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.1668 14.6665C23.1668 10.8055 20.0279 7.6665 16.1668 7.6665C12.6978 7.66678 9.81596 10.2057 9.26969 13.5259C9.19335 13.99 8.80444 14.339 8.3348 14.3631C5.68834 14.4978 3.5874 16.6653 3.5874 19.3332C3.5874 22.0942 5.82635 24.3332 8.5874 24.3332H24.7476C26.7659 24.3331 28.4142 22.6848 28.4142 20.6665C28.4142 18.6482 26.7659 16.9999 24.7476 16.9998H24.1668C23.6148 16.9995 23.1668 16.5519 23.1668 15.9998V14.6665ZM25.1668 15.0168C28.0949 15.2324 30.4142 17.6846 30.4142 20.6665C30.4142 23.7894 27.8704 26.3331 24.7476 26.3332H8.5874C4.72178 26.3332 1.5874 23.1988 1.5874 19.3332C1.5874 15.8504 4.13353 12.9906 7.45329 12.4491C8.44203 8.55702 11.9644 5.66677 16.1668 5.6665C21.1324 5.6665 25.1668 9.70089 25.1668 14.6665V15.0168Z" fill="#FAFF69"/>
                </svg>
              )
            },
            {
              label: 'Import & export datasets',
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.3333 17.6667C13.8856 17.6667 14.3333 18.1144 14.3333 18.6667V28C14.3333 28.5523 13.8856 29 13.3333 29H4C3.44772 29 3 28.5523 3 28V18.6667C3 18.1144 3.44772 17.6667 4 17.6667H13.3333ZM5 27H12.3333V19.6667H5V27Z" fill="#FAFF69"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M28 17.6667C28.5523 17.6667 29 18.1144 29 18.6667V28C29 28.5523 28.5523 29 28 29H18.6667C18.1144 29 17.6667 28.5523 17.6667 28V18.6667C17.6667 18.1144 18.1144 17.6667 18.6667 17.6667H28ZM19.6667 27H27V19.6667H19.6667V27Z" fill="#FAFF69"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.3333 3C13.8856 3 14.3333 3.44772 14.3333 4V13.3333C14.3333 13.8856 13.8856 14.3333 13.3333 14.3333H4C3.44772 14.3333 3 13.8856 3 13.3333V4C3 3.44772 3.44772 3 4 3H13.3333ZM5 12.3333H12.3333V5H5V12.3333Z" fill="#FAFF69"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M28 3C28.5523 3 29 3.44772 29 4V13.3333C29 13.8856 28.5523 14.3333 28 14.3333H18.6667C18.1144 14.3333 17.6667 13.8856 17.6667 13.3333V4C17.6667 3.44772 18.1144 3 18.6667 3H28ZM19.6667 12.3333H27V5H19.6667V12.3333Z" fill="#FAFF69"/>
                </svg>
              )
            },
            {
              label: 'Run migrations',
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.8267 17.1593C20.2172 16.769 20.8503 16.7689 21.2407 17.1593L26.0402 21.9588C26.2276 22.1462 26.333 22.4008 26.3332 22.6658C26.3332 22.9309 26.2276 23.1853 26.0402 23.3728L21.2407 28.1736C20.8503 28.564 20.2172 28.5638 19.8267 28.1736C19.4361 27.7831 19.4361 27.1501 19.8267 26.7596L22.9191 23.6658H6.6665C6.11422 23.6658 5.6665 23.2181 5.6665 22.6658C5.66679 22.1138 6.11439 21.6658 6.6665 21.6658H22.9191L19.8267 18.5734C19.4361 18.1828 19.4361 17.5498 19.8267 17.1593ZM10.759 3.82597C11.1494 3.43553 11.7825 3.4357 12.173 3.82597C12.5635 4.21649 12.5635 4.8495 12.173 5.24003L9.08057 8.33248H25.3332C25.8853 8.33248 26.3329 8.78043 26.3332 9.33248C26.3332 9.88476 25.8855 10.3325 25.3332 10.3325H9.08057L12.173 13.4262C12.5635 13.8168 12.5635 14.4498 12.173 14.8403C11.7825 15.2304 11.1493 15.2307 10.759 14.8403L5.95947 10.0395C5.56921 9.64896 5.56904 9.01588 5.95947 8.62545L10.759 3.82597Z" fill="#FAFF69"/>
                </svg>
              )
            },
            {
              label: 'Monitor cluster health',
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.7409 22.7411C20.1475 21.3344 22.4094 21.3125 23.8464 22.6695L23.8503 22.6721L23.9258 22.7411L24.1784 23.0197C24.5013 23.4158 24.7256 23.8645 24.8581 24.3335H28C28.5523 24.3335 29 24.7812 29 25.3335C28.9997 25.8856 28.5521 26.3335 28 26.3335H24.8568C24.6918 26.916 24.3843 27.4674 23.9258 27.926C22.4939 29.3576 20.1728 29.3576 18.7409 27.926C18.2822 27.4672 17.9721 26.9163 17.8073 26.3335H4C3.44787 26.3335 3.00025 25.8856 3 25.3335C3 24.7812 3.44772 24.3335 4 24.3335H17.8073C17.972 23.7505 18.2821 23.2 18.7409 22.7411ZM22.3854 24.0405C21.7308 23.5066 20.7652 23.5449 20.1549 24.1551C19.5043 24.806 19.5042 25.8611 20.1549 26.5119C20.8058 27.1625 21.8609 27.1625 22.5117 26.5119C23.1218 25.9018 23.16 24.9361 22.6263 24.2814L22.5117 24.1551L22.3854 24.0405Z" fill="#FAFF69"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.07422 13.4077C9.48085 12.0011 11.7427 11.9792 13.1797 13.3361L13.1836 13.3387L13.2591 13.4077L13.5117 13.6864C13.8346 14.0825 14.0589 14.5311 14.1914 15.0002H28C28.5523 15.0002 29 15.4479 29 16.0002C28.9997 16.5522 28.5521 17.0002 28 17.0002H14.1901C14.0252 17.5827 13.7176 18.1341 13.2591 18.5926C11.8273 20.0242 9.50608 20.0242 8.07422 18.5926C7.61549 18.1339 7.30544 17.583 7.14062 17.0002H4C3.44787 17.0002 3.00025 16.5522 3 16.0002C3 15.4479 3.44772 15.0002 4 15.0002H7.14062C7.30534 14.4172 7.61539 13.8666 8.07422 13.4077ZM11.7188 14.7072C11.0641 14.1732 10.0985 14.2116 9.48828 14.8218C8.83764 15.4727 8.83749 16.5278 9.48828 17.1786C10.1391 17.8291 11.1942 17.8291 11.8451 17.1786C12.4552 16.5684 12.4934 15.6027 11.9596 14.9481L11.8451 14.8218L11.7188 14.7072Z" fill="#FAFF69"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.7409 4.0744C20.1475 2.66777 22.4094 2.64584 23.8464 4.00278L23.8503 4.00539L23.9258 4.0744L24.1784 4.35304C24.5013 4.74916 24.7256 5.1978 24.8581 5.66685H28C28.5523 5.66685 29 6.11456 29 6.66685C28.9997 7.21892 28.5521 7.66685 28 7.66685H24.8568C24.6918 8.24937 24.3843 8.80077 23.9258 9.2593C22.4939 10.6909 20.1728 10.6909 18.7409 9.2593C18.2822 8.80056 17.9721 8.24962 17.8073 7.66685H4C3.44787 7.66685 3.00025 7.21892 3 6.66685C3 6.11456 3.44772 5.66685 4 5.66685H17.8073C17.972 5.08385 18.2821 4.53331 18.7409 4.0744ZM22.3854 5.37388C21.7308 4.8399 20.7652 4.87825 20.1549 5.48846C19.5043 6.13936 19.5042 7.19444 20.1549 7.84523C20.8058 8.49579 21.8609 8.49579 22.5117 7.84523C23.1218 7.2351 23.16 6.26938 22.6263 5.61476L22.5117 5.48846L22.3854 5.37388Z" fill="#FAFF69"/>
                </svg>
              )
            },
            {
              label: 'Configure & debug locally',
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.3333 13.3333C24.3333 13.1496 24.1837 13 24 13H20.112L20.1107 27H24.3333V13.3333ZM18.1055 5.26562C18.0741 5.11419 17.9392 5 17.7786 5H14.2227C14.0389 5 13.8893 5.14962 13.8893 5.33333V27H18.1107L18.112 5.33333L18.1055 5.26562ZM7.66667 27H11.8893V9H8C7.81629 9 7.66667 9.14962 7.66667 9.33333V27ZM20.112 11H24C25.2883 11 26.3333 12.045 26.3333 13.3333V27H28C28.5523 27 29 27.4477 29 28C29 28.5523 28.5523 29 28 29H4C3.44772 29 3 28.5523 3 28C3 27.4477 3.44772 27 4 27H5.66667V9.33333C5.66667 8.04505 6.71172 7 8 7H11.8893V5.33333C11.8893 4.04505 12.9344 3 14.2227 3H17.7786C19.0669 3 20.112 4.04505 20.112 5.33333V11Z" fill="#FAFF69"/>
                </svg>
              )
            },
          ].map((item, index) => (
            <div
              key={index}
              className='flex items-center gap-4 rounded border border-neutral-700/80 bg-neutral-900/50 p-4'>
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
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
            href='https://console.clickhouse.cloud/signUp?loc=cliPageFooterCta'
            onClick={useGalaxyOnClick(
              'cliPage.footerCta.createFreeAccountSelect'
            )}>
            Create a free account
          </CUIButton>
        </div>
      </section>
    </Layout>
  )
}



function AuroraBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const HUE = 58       // yellow-gold hue center (~#FCFF74)
    const HUE_DIF = 10   // tight range to stay in yellow
    const GLOW = 10
    const MD = 100
    const MAX_W = 15, MIN_W = 2
    const MAX_SPD = 35, MIN_SPD = 6

    let w = canvas.width = container.clientWidth
    let h = canvas.height = container.clientHeight
    let maxH = h * 0.9, minH = h * 0.5
    let rafId: number

    type Dot = { x: number; y: number; h: number; w: number; c: number; m: number }
    let dots: Dot[] = []

    const pushDots = () => {
      for (let i = 0; i < MD; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h / 2,
          h: Math.random() * (maxH - minH) + minH,
          w: Math.random() * (MAX_W - MIN_W) + MIN_W,
          c: Math.random() * HUE_DIF * 2 + (HUE - HUE_DIF),
          m: Math.random() * (MAX_SPD - MIN_SPD) + MIN_SPD,
        })
      }
    }

    ctx.globalCompositeOperation = 'lighter'
    pushDots()

    // background glow
    const bgGlow = `radial-gradient(ellipse at center, hsla(${HUE},60%,50%,.35) 0%, rgba(0,0,0,0) 100%)`
    container.style.setProperty('--bg-glow', bgGlow)

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        ctx.beginPath()
        const grd = ctx.createLinearGradient(d.x, d.y, d.x + d.w, d.y + d.h)
        grd.addColorStop(0.0, `hsla(${d.c},80%,60%,0)`)
        grd.addColorStop(0.2, `hsla(${d.c + 5},85%,65%,.12)`)
        grd.addColorStop(0.5, `hsla(${d.c + 10},90%,70%,.2)`)
        grd.addColorStop(0.8, `hsla(${d.c + 5},85%,65%,.12)`)
        grd.addColorStop(1.0, `hsla(${d.c},80%,60%,0)`)
        ctx.shadowBlur = GLOW
        ctx.shadowColor = `hsla(${d.c},80%,60%,.3)`
        ctx.fillStyle = grd
        ctx.fillRect(d.x, d.y, d.w, d.h)
        ctx.closePath()
        d.x += d.m / 600
        if (d.x > w + MAX_W) d.x = -MAX_W
      }
      rafId = requestAnimationFrame(render)
    }

    render()

    const onResize = () => {
      w = canvas.width = container.clientWidth
      h = canvas.height = container.clientHeight
      maxH = h * 0.9; minH = h * 0.5
      dots = []; pushDots()
      ctx.globalCompositeOperation = 'lighter'
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center, hsla(58,60%,50%,.1) 0%, rgba(0,0,0,0) 100%)',
      }} />
      {/* Canvas beams */}
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} />
      {/* Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 10%, rgba(0,0,0,.75) 80%, rgba(0,0,0,1) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

function TerminalAnimation() {
  const MAIN_CMD = 'curl https://clickhouse.com/cli'
  const MAIN_CMD_PREFIX = 'curl '
  const MAIN_CMD_URL = 'https://clickhouse.com/cli'
  const OTHER_CMDS = [
    'clickhouse client',
    'clickhouse client --query "SELECT now()"',
    'cat data.csv | clickhouse client --query "INSERT INTO table FORMAT CSV"',
    'clickhouse client --queries-file script.sql',
    'clickhouse client --format JSON',
    "clickhouse local --query \"SELECT * FROM 'data.csv'\"",
    'clickhouse client --multiquery',
    'clickhouse client --host mycluster.clickhouse.cloud --secure',
    'clickhouse client --param_x="value"',
    'SHOW TABLES',
  ]

  const [displayText, setDisplayText] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showCopy, setShowCopy] = useState(false)
  const textRef = useRef('')

  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let alive = true
    const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

    const type = async (text: string) => {
      for (let i = 0; i <= text.length; i++) {
        if (!alive) return
        textRef.current = text.slice(0, i)
        setDisplayText(textRef.current)
        await delay(50 + Math.random() * 50)
      }
    }

    const erase = async () => {
      while (textRef.current.length > 0) {
        if (!alive) return
        textRef.current = textRef.current.slice(0, -1)
        setDisplayText(textRef.current)
        await delay(28)
      }
    }

    const run = async () => {
      await delay(1500)
      while (alive) {
        await type(MAIN_CMD)
        if (!alive) break
        setShowCopy(true)
        await delay(5000)
        if (!alive) break
        setShowCopy(false)
        await erase()
        if (!alive) break
        const cmd = OTHER_CMDS[Math.floor(Math.random() * OTHER_CMDS.length)]
        await type(cmd)
        if (!alive) break
        await delay(3500)
        if (!alive) break
        await erase()
        if (!alive) break
      }
    }

    run()
    return () => { alive = false }
  }, [])

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(MAIN_CMD)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', fontFamily: 'monospace' }}>
      {/* Title bar */}
      <div
        className='flex items-center px-5 gap-6'
        style={{ height: '32px', background: 'rgba(255,255,255,0.05)' }}>
        <div className='flex gap-2'>
          <div className='w-3 h-3 rounded-full bg-[#FF4B59]' />
          <div className='w-3 h-3 rounded-full bg-[#FFC600]' />
          <div className='w-3 h-3 rounded-full bg-[#00CA48]' />
        </div>
        <span className='text-white/80 text-xs'>Terminal</span>
      </div>
      {/* Body */}
      <div
        className='flex items-start gap-3 px-6 pt-8 text-sm'
        style={{ height: '268px' }}>
        <span className='text-[#C0C0C0] select-none flex-shrink-0'>$</span>
        <span className='flex-1 text-white break-all'>
          {MAIN_CMD.startsWith(displayText) && displayText.length > 0 ? (
            <>
              <span>{displayText.slice(0, MAIN_CMD_PREFIX.length)}</span>
              <span style={{ color: '#FCFF74' }}>{displayText.slice(MAIN_CMD_PREFIX.length)}</span>
            </>
          ) : (
            displayText
          )}
          <span
            className='inline-block w-2 align-middle ml-px'
            style={{
              height: '1.1em',
              background: '#C0C0C0',
              opacity: cursorOn ? 1 : 0,
            }}
          />
        </span>
        {showCopy && (
          <div className='relative flex-shrink-0'>
            {copied && (
              <span className='absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-white/10 px-2 py-0.5 text-xs text-white whitespace-nowrap'>
                Copied!
              </span>
            )}
          <button
            onClick={handleCopy}
            className='opacity-60 hover:opacity-100 transition-opacity'
            title='Copy command'>
            <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 0.5H29.5C31.433 0.5 33 2.067 33 4V28C33 29.933 31.433 31.5 29.5 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="#FAFF69"/>
              <path d="M4 0.5H29.5C31.433 0.5 33 2.067 33 4V28C33 29.933 31.433 31.5 29.5 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4C0.5 2.067 2.067 0.5 4 0.5Z" stroke="#FAFF69" strokeLinecap="square"/>
              <g clipPath="url(#clip_copy_btn)">
                <path fillRule="evenodd" clipRule="evenodd" d="M18.6882 9.70068C19.6694 9.70068 20.4649 10.4968 20.4649 11.478V12.2853H21.2734C22.2543 12.2853 23.0495 13.0804 23.0495 14.0613V20.5234C23.0495 21.5043 22.2543 22.2995 21.2734 22.2995H14.8113C13.8304 22.2995 13.0353 21.5043 13.0353 20.5234V19.7155H12.2274C11.2463 19.7155 10.4509 18.9199 10.4507 17.9388V11.478C10.4507 10.4968 11.2462 9.70068 12.2274 9.70068H18.6882ZM14.8113 13.254C14.3655 13.254 14.004 13.6155 14.004 14.0613V20.5234C14.004 20.9693 14.3655 21.3307 14.8113 21.3307H21.2734C21.7193 21.3307 22.0807 20.9693 22.0807 20.5234V14.0613C22.0807 13.6155 21.7193 13.254 21.2734 13.254H19.9931C19.9889 13.2541 19.9847 13.2547 19.9805 13.2547C19.9763 13.2547 19.9721 13.2541 19.9679 13.254H14.8113ZM12.2274 10.6701C11.7812 10.6701 11.4194 11.0318 11.4194 11.478V17.9388C11.4196 18.3849 11.7813 18.7468 12.2274 18.7468H13.0353V14.0613C13.0353 13.0804 13.8304 12.2853 14.8113 12.2853H19.4961V11.478C19.4961 11.0318 19.1344 10.6701 18.6882 10.6701H12.2274Z" fill="#1F1F1C"/>
              </g>
              <defs>
                <clipPath id="clip_copy_btn">
                  <rect width="15.5" height="15.5" fill="white" transform="translate(9 8.25)"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          </div>
        )}
      </div>
    </div>
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
