import { ExternalLinkIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import { CSSProperties } from 'react'
import { CUIButton, CUICard, CUILink } from '../../components/ClickUI'
import Markdown from '../../components/Markdown'
import { SuiCodeblock, SuiText, SuiTitle } from '../../components/sui'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CommonProps } from '../../types/homepage'
import Layout from '../../components/Layout'
import Image, { ImageProps } from 'next/image'

import iconBook from './icon-book-open-text.svg'
import iconFile from './icon-file-py.svg'
import iconList from './icon-list-magnifying-glass.svg'

import logoBun from './logo-bun.svg'
import logoGo from './logo-go.svg'
import logoNode from './logo-node.svg'
import logoPython from './logo-python.svg'
import logoRust from './logo-rust.svg'

import imageHero from './hero.svg'
import imageDbEngineCli from './db-engine-cli.svg'
import imageDbEngineConnection from './db-engine-connection.svg'
import imageDbEngineProcess from './db-engine-process.svg'
import imageEmbedded from './embedded.svg'
import imageInputOutput from './input-output.svg'
import imageMinimizedCopying from './minimized-copying.svg'

import imageSampleQuery from './sample-query.svg'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'chDB',
          description: '',
          path: '/chdb'
        },
        ...commonProps
      }
    }
  }

export default function ChdbPage({ headerData, footerData, seo }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <div className='relative my-20'>
        <div className='absolute bottom-0 left-0 z-0 aspect-[1512/524] w-full bg-contain bg-center bg-no-repeat lg:bg-speed-lines' />
        <div className='section-container relative z-10 lg:py-20'>
          <div className='flex flex-col items-center gap-10 lg:flex-row'>
            <div className='flex-1 space-y-6'>
              <SuiTitle type='h1' className='!text-5xl'>
                chDB - fast, reliable, and scalable in-process database
              </SuiTitle>
              <SuiText className='text-balance'>
                Experience the power of ClickHouse, in-process. With
                unparalleled performance, reliability, and scalability for any
                data-intensive application.
              </SuiText>
              <TickItem>Blazing fast SQL engine</TickItem>
              <TickItem>Seamless data integration</TickItem>
              <TickItem>Supports 80+ data formats</TickItem>
              <CUIButton type='primary' size='lg' weight='semibold'>
                Try it today
              </CUIButton>
            </div>
            <div className='hidden flex-shrink-0 flex-grow-0 lg:block'>
              <Image src={imageHero} width={573} height={344} alt='hero' />
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem */}
      <div className='bg-neutral-725 py-20'>
        <div className='section-container'>
          <div className='mx-auto max-w-3xl text-center'>
            <SuiTitle type='h2'>chDB and the ClickHouse ecosystem</SuiTitle>
            <SuiText>
              Whether you're developing locally, running in-process analytics
              embedded in your app, or scaling production workloads, ClickHouse
              has you covered.
            </SuiText>
          </div>
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
            <div>
              <Image
                src={imageDbEngineConnection}
                width={271}
                height={168}
                alt=''
                className='aspect-square w-full object-scale-down object-center'
              />
              <SuiText size='lg' className='text-center font-mono'>
                ClickHouse
              </SuiText>
            </div>
            <div>
              <Image
                src={imageDbEngineProcess}
                width={253}
                height={177}
                alt=''
                className='aspect-square w-full object-scale-down object-center'
              />
              <SuiText size='lg' className='text-center font-mono'>
                chDB: ClickHouse In-Process
              </SuiText>
            </div>
            <div>
              <Image
                src={imageDbEngineCli}
                width={231}
                height={155}
                alt=''
                className='aspect-square w-full object-scale-down object-center'
              />
              <SuiText size='lg' className='text-center font-mono'>
                ClickHouse Local
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      {/* Install */}
      <div className='mx-auto mb-24 flex w-full max-w-7xl px-4 text-neutral-0 xl:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center rounded-xl border border-neutral-700/80 bg-neutral-900/50 bg-click-grid bg-[length:547px_360px] bg-right bg-no-repeat p-6 md:p-10 lg:p-12 xl:p-16'>
          <div className='flex flex-col text-center'>
            <SuiTitle type='h2' color='white'>
              Start using{' '}
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>chDB</span>
              </span>{' '}
              in minutes
            </SuiTitle>
            <div className='mb-8 mt-6 text-center text-neutral-300'>
              Install chDB for macOS and Linux
            </div>
          </div>
          <SuiCodeblock className='show-copy-paste w-full self-center overflow-hidden md:w-full'>
            <Markdown ignoreAnchor>pip install chdb</Markdown>
          </SuiCodeblock>
          <div className='relative'>
            <SuiCodeblock className='show-copy-paste w-full self-center overflow-hidden md:w-full'>
              <Markdown ignoreAnchor>
                query = "select count() FROM
                s3('s3://datasets-documentation/hackernews/hacknernews.json.gz')"
                chdb.query(query, 'DataFrame')
              </Markdown>
            </SuiCodeblock>
            <Image
              src={imageSampleQuery}
              width={185}
              height={32}
              alt='Sample Query'
              className='absolute bottom-0 right-0 -rotate-[14deg]'
            />
          </div>
        </div>
      </div>

      {/* Bindings */}
      <div className='bg-neutral-725 py-20'>
        <div className='section-container'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <IconCard
              icon={{
                src: iconBook,
                width: 32,
                height: 33,
                alt: 'Book icon'
              }}>
              <SuiTitle type='h3'>Open-source library</SuiTitle>
              <SuiText size='sm'>
                chDB is an open-source library, allowing you to customize and
                extend your database to fit your needs. Benefit from a vibrant
                community that keeps you updated with the latest innovations and
                security practices.
              </SuiText>
            </IconCard>
            <IconCard
              icon={{
                src: iconBook,
                width: 32,
                height: 33,
                alt: 'Book icon'
              }}>
              <SuiTitle type='h3'>Open-source library</SuiTitle>
              <SuiText size='sm'>
                chDB is an open-source library, allowing you to customize and
                extend your database to fit your needs. Benefit from a vibrant
                community that keeps you updated with the latest innovations and
                security practices.
              </SuiText>
            </IconCard>
            <IconCard
              icon={{
                src: iconBook,
                width: 32,
                height: 33,
                alt: 'Book icon'
              }}>
              <SuiTitle type='h3'>Open-source library</SuiTitle>
              <SuiText size='sm'>
                chDB is an open-source library, allowing you to customize and
                extend your database to fit your needs. Benefit from a vibrant
                community that keeps you updated with the latest innovations and
                security practices.
              </SuiText>
            </IconCard>
          </div>
          <div className='mt-20'>
            <SuiText size='sm' className='text-center'>
              chDB supports bindings for many programming languages, including:
            </SuiText>
            <div className='flex items-center justify-center gap-6'>
              <Image src={logoBun} width={56} height={50} alt='Bun' />
              <Image src={logoNode} width={81} height={50} alt='node' />
              <Image src={logoRust} width={96} height={37} alt='Rust' />
              <Image src={logoGo} width={73} height={28} alt='GO' />
              <Image src={logoPython} width={50} height={51} alt='Python' />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className='bg-shadow-element yellow-shadow flex w-full gap-y-4 pb-12 text-neutral-0 md:gap-y-28'>
        <div className='container mx-auto flex max-w-7xl flex-col gap-y-48 bg-opacity-10 px-8 pb-8 pt-24 text-center md:bg-no-repeat 2xl:px-0'>
          <FeatureSection
            image={{
              src: imageEmbedded,
              width: 435,
              height: 230,
              alt: 'Embedded'
            }}>
            <SuiTitle type='h3' className='mb-4 !text-4xl' weight='semibold'>
              Embedded. No need to install or run ClickHouse services
            </SuiTitle>
            <TickItem>Blazing fast SQL engine</TickItem>
            <TickItem>Blazing fast SQL engine</TickItem>
            <TickItem>Blazing fast SQL engine</TickItem>
          </FeatureSection>
          <FeatureSection
            flip={true}
            image={{
              src: imageEmbedded,
              width: 435,
              height: 230,
              alt: 'Embedded'
            }}>
            <SuiTitle type='h3' className='mb-4 !text-4xl' weight='semibold'>
              Embedded. No need to install or run ClickHouse services
            </SuiTitle>
            <TickItem>Blazing fast SQL engine</TickItem>
            <TickItem>Blazing fast SQL engine</TickItem>
            <TickItem>Blazing fast SQL engine</TickItem>
          </FeatureSection>
          <FeatureSection
            image={{
              src: imageEmbedded,
              width: 435,
              height: 230,
              alt: 'Embedded'
            }}>
            <SuiTitle type='h3' className='mb-4 !text-4xl' weight='semibold'>
              Embedded. No need to install or run ClickHouse services
            </SuiTitle>
            <TickItem>Blazing fast SQL engine</TickItem>
            <TickItem>Blazing fast SQL engine</TickItem>
            <TickItem>Blazing fast SQL engine</TickItem>
          </FeatureSection>
        </div>
      </div>

      {/* FAQs */}
      <div
        className='bg-shadow-element relative mx-auto mb-20 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
        style={
          {
            '--top-side': '224px'
          } as CSSProperties
        }>
        <div className='pb-10 text-center'>
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
          <div className='mx-auto max-w-md text-neutral-200 lg:text-left'>
            Wherever you need us, we’re there. We love to engage in thoughtful
            conversation with the ClickHouse community and are always on-hand to
            answer your questions.{' '}
          </div>
          <CUILink
            href='/support/program/'
            target='_self'
            className='mt-6 flex items-center justify-center gap-4 text-primary lg:justify-start'>
            <span>Ask us anything</span>{' '}
            <ExternalLinkIcon className='h-4 w-4' />
          </CUILink>
        </div>
        <div></div>
      </div>

      {/* Get started */}
      <div className='section-container pb-16 md:px-8 2xl:px-0'>
        <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-16 text-center'>
          <SuiTitle type='h2' color='text-default'>
            Looking for a hosted solution?
            <br />
            Get started with ClickHouse Cloud
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            30 day free trial and $300 in credits to spend at your own pace.
          </SuiText>
          <CUIButton
            type='primary-dark'
            size='lg'
            className='group mx-auto mt-8'
            href='https://clickhouse.cloud/signUp'>
            Create a free account
          </CUIButton>
        </div>
      </div>
    </Layout>
  )
}

function IconCard({
  icon,
  children
}: {
  icon: ImageProps
  children: React.ReactNode
}) {
  return (
    <CUICard className='border-t-4 border-t-primary-300 p-8'>
      <div className='mx-auto flex aspect-square w-12 rounded-sm border-neutral-700 bg-black/80'>
        <Image {...icon} className='m-auto' />
      </div>
      {children}
    </CUICard>
  )
}

function FeatureSection({
  image,
  children,
  flip = false
}: {
  image: ImageProps
  children: React.ReactNode
  flip?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-x-24 ${
        flip ? 'md:flex-row-reverse' : 'md:flex-row'
      } justify-center`}>
      <div className='mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
        <div className='border-yellow-200 md:border-l-4 md:pl-8 '>
          {children}
        </div>
      </div>
      <div className='flex items-center justify-center md:w-1/2'>
        <Image {...image} />
      </div>
    </div>
  )
}

function TickItem({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: React.HTMLProps<HTMLDivElement>['className']
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className='flex-shrink-0 flex-grow-0'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='25'
          height='18'
          fill='none'
          viewBox='0 0 25 18'>
          <path
            stroke='#FCFF74'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M23.32 1.67 8.65 16.33 2 9.67'
          />
        </svg>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
