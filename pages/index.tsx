import Image from 'next/image'

import { SuiTitle } from '../components/sui'
import { findOne } from '../lib/api/strapi'
import GetStarted from '../components/GetStarted'
import { HomePageProps } from '../types/homepage'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { getCommonProps } from '../lib/utils/getCommonProps'
import FAQ from '../components/FAQ'
import { CUIButton, CUICard, CUILink } from '../components/ClickUI'

import { ChevronRightIcon } from '@heroicons/react/solid'
import JoinCommunity from '../components/JoinCommunity'
import HomePageTerminal from '../components/Terminal/HomePageTerminal'
// import SpeedAnimation from '../components/SpeedAnimation'
import DevelopersSection from '../components/DevelopersSection'
import { CSSProperties } from 'react'
import HRSeparator from '../components/HRSeparator'
import RowOrientedIllustration from '../components/RowOrientedIllustration'
import ColumnOrientedIllustration from '../components/ColumnOrientedIllustration'
import SpeedAnimationSvg from '../components/SpeedAnimation'
import SpeedAnimationMobileSvg from '../components/SpeedAnimation/Mobile'

const yellowPositionStyle = {
  '--left-side': 'auto',
  '--right-side': '30%'
} as CSSProperties

type DeployData = {
  title: string
  img: string
  btnText: string
  description: string
  href: string
  target?: string
  btnType: 'secondary' | 'primary' | 'secondary-dark'
}

const deployData: Array<DeployData> = [
  {
    title: 'ClickHouse Local',
    img: '/laptop.svg',
    btnText: 'Download ClickHouse Local',
    description:
      'Run fast queries on local files (CSV, TSV, Parquet, and more) without a server.',
    href: 'https://clickhouse.com/docs/en/operations/utilities/clickhouse-local',
    btnType: 'secondary'
  },
  {
    title: 'Open-source ClickHouse',
    img: '/drive.svg',
    btnText: 'Download ClickHouse',
    description:
      'Spin up a database server with open-source ClickHouse. Always Free.',
    href: '#getting_started',
    btnType: 'secondary'
  },
  {
    title: 'ClickHouse Cloud',
    img: '/cloud.svg',
    btnText: 'Deploy in seconds',
    description: 'Deploy a fully managed ClickHouse service on AWS.',
    href: 'https://clickhouse.cloud/signUp?loc=home-deploy-your-way',
    target: '_blank',
    btnType: 'primary'
  }
]

const customerStoriesLogos = [
  {
    href: '/customer-stories#ebay',
    target: '_self',
    imageSrc: '/logos/eBay-black.svg',
    alt: 'ebay',
    width: 82,
    height: 33
  },
  {
    href: '/customer-stories#uber',
    target: '_self',
    imageSrc: '/logos/uber-black.svg',
    alt: 'uber',
    width: 72,
    height: 25
  },
  {
    href: '/customer-stories#cloudflare',
    target: '_self',
    imageSrc: '/logos/cloudflare-black.svg',
    alt: 'cloudflare',
    width: 117,
    height: 39
  },
  {
    href: '/customer-stories#deutsche_bank',
    target: '_self',
    imageSrc: '/logos/deutsche-black.svg',
    alt: 'deutsche bank',
    width: 133,
    height: 26
  },
  {
    href: '/customer-stories#spotify',
    target: '_self',
    imageSrc: '/logos/spotify-black.svg',
    alt: 'spotify',
    width: 119,
    height: 35
  }
]

export const getStaticProps: GetStaticProps<HomePageProps> =
  async function getStaticProps() {
    const params = {
      populate: ['hero', 'hero.ctaButton', 'seo', 'seo.image']
    }

    const commonProps = await getCommonProps()
    const data = await findOne('homepage', params)

    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function HomePage({
  hero,
  seo,
  footerData,
  platforms
}: HomePageProps) {
  return (
    <Layout footerData={footerData} seo={seo}>
      <div className='homepage overflow-hidden bg-grid'>
        <div className='flex flex-col pb-20 lg:pb-44 pt-16 md:pt-20 px-8 md:px-0 relative gap-24 justify-center '>
          <div className='flex flex-col w-full mx-auto max-w-2xl'>
            <div className='mx-auto md:mr-0 md:mt-8 flex-col items-center justify-center'>
              <SuiTitle type='h1' className='text-center' color='primary'>
                Query{' '}
                <span className='tilted tilted-yellow'>
                  <span className='tilted-content'>billions</span>
                </span>{' '}
                of rows in milliseconds
              </SuiTitle>
              <div className='mx-auto flex flex-col items-center max-w-md'>
                <div className='leading-normal text-neutral-200 text-center my-8'>
                  ClickHouse is the fastest and most resource efficient
                  open-source database for real-time apps and analytics.
                </div>

                <div className='flex flex-col md:flex-row gap-6 w-full justify-center items-center'>
                  <CUIButton
                    type='primary'
                    size='lg'
                    weight='semibold'
                    href={hero.ctaButton.href}
                    segmentEvent={{
                      label: hero.ctaButton.text,
                      category: 'website-hero'
                    }}
                    linkClass='w-full max-w-[14rem]'
                    className='w-full'>
                    Start free trial
                  </CUIButton>
                  <CUIButton
                    type='secondary'
                    weight='semibold'
                    size='lg'
                    href='https://clickhouse.com/docs/'
                    segmentEvent={{
                      label: hero.ctaButton.text,
                      category: 'website-hero'
                    }}
                    linkClass='w-full max-w-[14rem]'
                    className='w-full'>
                    View documentation
                  </CUIButton>
                </div>
                <CUILink
                  href='#getting_started'
                  target='_self'
                  className='arrow-link hidden mt-5 text-neutral-200 hover:text-neutral-0 md:flex items-center gap-1 whitespace-nowrap'>
                  Or download open-source ClickHouse{' '}
                  <ChevronRightIcon height='18' className='arrow pt-0.5' />
                </CUILink>
              </div>
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle'>
          <div className='section-container max-w-3xl mt-12 lg:mt-0'>
            <HomePageTerminal />
          </div>
        </div>
        <div className='bg-primary-300 pt-8 pb-16'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-8 text-primary-800 w-fit mx-auto text-xl font-semibold leading-normal px-4 md:px-0'>
              Trusted by the best developers that work with data at{' '}
              <span className='tilted tilted-black'>
                <span className='tilted-content leading-8'>scale</span>
              </span>
            </div>

            <div className='section-container flex flex-wrap gap-6 md:gap-x-14 self-center items-center justify-center place-items-center'>
              {customerStoriesLogos.map((logo, index: number) => (
                <CUILink
                  key={logo.href}
                  href={logo.href}
                  target={logo.target}
                  className={`customer-stories-${index} flex rounded-lg justify-center ease-in-out duration-200 cursor-pointer gap-2`}>
                  <Image
                    src={logo?.imageSrc}
                    className='object-contain'
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                  />
                </CUILink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full text-neutral-0'>
        <div className='flex section-container w-full mx-auto flex-col pt-24 text-center items-center'>
          <Image
            src='/speed-icon.svg'
            alt='Speed Icon'
            width={72}
            height={72}
          />
          <SuiTitle type='h2' className='mb-6 mt-8'>
            Speed up queries from any data source
          </SuiTitle>
          <div className='text-neutral-200 max-w-screen-sm leading-normal text-center mx-auto mb-10 md:mb-16'>
            ClickHouse supports all the data sources you need to power your apps
            and use cases that require exceptional performance.
          </div>
          <div className='md:hidden w-full md:px-12 flex justify-center'>
            <SpeedAnimationMobileSvg className='max-w-full h-auto' />
          </div>
          <div className='hidden md:block w-full md:px-12'>
            <SpeedAnimationSvg className='max-w-full h-auto' />
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <div className='relative flex flex-col gap-y-28'>
        <div className='flex flex-col items-center justify-between self-center section-container w-full md:px-16 bg-shadow-element'>
          <div className='flex flex-col items-center w-full'>
            <Image
              src='/fast-icon.svg'
              alt='Fast Icon'
              width={72}
              height={72}
            />
            <SuiTitle type='h2' className='mt-8 mb-6'>
              Why is ClickHouse so fast?
            </SuiTitle>
            <div className='text-neutral-200 max-w-screen-md leading-normal text-center mx-auto'>
              Column-oriented databases are better suited to OLAP scenarios.
              They are at least <span className='font-bold'>100x faster</span>{' '}
              in processing most queries. ClickHouse uses all available system
              resources to their full potential to process each analytical query
              as fast as possible.
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center py-16 gap-16'>
            <div>
              <RowOrientedIllustration className='bg-neutral-900 border border-neutral-700/80 rounded-lg mx-auto max-w-full h-auto' />
              <div className='text-neutral-0 font-bold leading-normal mb-3 mt-6 text-center md:text-left'>
                Row-oriented databases
              </div>
              <div className='text-neutral-200 leading-normal text-center md:text-left'>
                In a row-oriented databases, data is stored in rows, with all
                the values related to a row physically stored next to each
                other.
              </div>
            </div>
            <div>
              <ColumnOrientedIllustration className='bg-neutral-900 border border-neutral-700/80 rounded-lg mx-auto max-w-full h-auto' />
              <div className='text-neutral-0 font-bold leading-normal mb-3 mt-6 text-center md:text-left'>
                Column-oriented databases
              </div>
              <div className='text-neutral-200 leading-normal text-center md:text-left'>
                In a column-oriented databases, like ClickHouse, data is stored
                in columns, with values from the same columns stored together.
              </div>
            </div>
          </div>
          <CUIButton
            type='secondary'
            className='w-auto group'
            href='https://clickhouse.com/docs/'
            iconRight={
              <ChevronRightIcon
                height='16'
                className='group-hover:translate-x-1/2 pt-0.5 transition'
              />
            }>
            Read more in the docs
          </CUIButton>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <div className='w-full flex flex-col'>
        <div
          className='flex container mx-auto flex-col section-container items-center bg-shadow-element yellow-shadow'
          style={yellowPositionStyle}>
          <Image
            src='/deploy-icon.svg'
            alt='Deploy Icon'
            width={72}
            height={72}
          />
          <SuiTitle
            type='h2'
            className='mt-8 mb-6 max-w-3xl mx-auto text-center'>
            Deploy your way
          </SuiTitle>
          <div className='max-w-screen-sm leading-normal text-center mx-auto text-neutral-200'>
            Unlike traditional closed-source OLAP databases, ClickHouse runs on
            every environment, whether it’s on your machine or in the cloud.
          </div>
          <div className='flex flex-wrap justify-center gap-10 mt-16'>
            {deployData.map((deploy) => (
              <CUICard
                key={deploy.title}
                className='p-8 bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat w-full max-w-[22.5rem]'>
                <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                  <Image
                    src={deploy.img}
                    alt={`${deploy.title}`}
                    width={64}
                    height={64}
                  />
                  <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-8'>
                    <div className='text-xl leading-tight text-neutral-0 cursor-pointer font-semibold'>
                      {deploy.title}
                    </div>
                    <div className='text-neutral-200 text-center text-sm'>
                      {deploy.description}
                    </div>
                  </div>
                </CUICard.Body>
                <CUICard.Footer className='flex items-center w-full '>
                  <CUIButton
                    type={deploy.btnType}
                    href={deploy.href}
                    linkClass='w-full inline-grid group'
                    iconRight={
                      <ChevronRightIcon
                        height='18'
                        className='arrow group-hover:translate-x-1/2 pt-0.5 transition'
                      />
                    }
                    target={deploy.target}>
                    {deploy.btnText}
                  </CUIButton>
                </CUICard.Footer>
              </CUICard>
            ))}
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <JoinCommunity />
      <HRSeparator className='my-24' />
      <DevelopersSection />
      <HRSeparator className='my-24' />
      <FAQ />
      <GetStarted platforms={platforms} />
    </Layout>
  )
}
