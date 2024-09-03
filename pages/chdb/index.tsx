import { GetStaticProps } from 'next'
import { CUIButton } from '../../components/ClickUI'
import { SuiText, SuiTitle } from '../../components/sui'
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
          <div className='flex gap-10'>
            <div>
              <Image
                src={imageDbEngineConnection}
                width={231}
                height={155}
                alt=''
              />
            </div>
            <div>
              <Image
                src={imageDbEngineProcess}
                width={231}
                height={155}
                alt=''
              />
            </div>
            <div>
              <Image src={imageDbEngineCli} width={231} height={155} alt='' />
            </div>
          </div>
        </div>
      </div>

      {/* Install */}

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
        </div>
      </div>
    </Layout>
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
