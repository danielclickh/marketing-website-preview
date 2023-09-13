import { ChevronRightIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CSSProperties } from 'react'
import { CUIButton, CUICard, CUILink } from '../components/ClickUI'
import ColumnOrientedIllustration from '../components/ColumnOrientedIllustration'
// import SpeedAnimation from '../components/SpeedAnimation'
import DevelopersSection from '../components/DevelopersSection'
import FAQ from '../components/FAQ'
import GetStarted from '../components/GetStarted'
import HomepageCustomerVideos from '../components/HomepageVideos'
import HRSeparator from '../components/HRSeparator'
import JoinCommunity from '../components/JoinCommunity'
import Layout from '../components/Layout'
import LogoCarousel from '../components/LogoCarousel'
import RowOrientedIllustration from '../components/RowOrientedIllustration'
import SpeedAnimationSvg from '../components/SpeedAnimation'
import SpeedAnimationMobileSvg from '../components/SpeedAnimation/Mobile'
import { SuiTitle } from '../components/sui'
import HomePageTerminal from '../components/Terminal/HomePageTerminal'
import { findOne } from '../lib/api/strapi'
import { getCommonProps } from '../lib/utils/getCommonProps'
import { HomePageProps } from '../types/homepage'

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
    btnText: 'Start free trial',
    description: 'Deploy a fully managed ClickHouse service on AWS or GCP.',
    href: 'https://clickhouse.cloud/signUp?loc=home-deploy-your-way',
    target: '_blank',
    btnType: 'primary'
  }
]

export const getStaticProps: GetStaticProps<HomePageProps> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.ctaButton',
        'seo',
        'seo.image',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    }

    const commonProps = await getCommonProps()
    const data = await findOne('homepage', params)
    data.seo.path = ''
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
  headerData,
  customerStories,
  platforms
}: HomePageProps) {
  // Split the customerStories.logos array into two separate arrays
  const logos1 = customerStories.logos.slice(
    0,
    Math.ceil(customerStories.logos.length / 2)
  )
  const logos2 = customerStories.logos.slice(
    Math.ceil(customerStories.logos.length / 2)
  )

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage overflow-hidden bg-grid'>
        <div className='relative flex flex-col justify-center gap-24 px-8 pb-20 pt-16 md:px-0 md:pt-20 lg:pb-44 '>
          <div className='mx-auto flex w-full max-w-2xl flex-col'>
            <div className='mx-auto flex-col items-center justify-center md:mr-0 md:mt-8'>
              <SuiTitle type='h1' className='text-center' color='primary'>
                Query{' '}
                <span className='tilted tilted-yellow'>
                  <span className='tilted-content'>billions</span>
                </span>{' '}
                of rows in milliseconds
              </SuiTitle>
              <div className='mx-auto flex max-w-md flex-col items-center'>
                <div className='my-8 text-center leading-normal text-neutral-200'>
                  ClickHouse is the fastest and most resource efficient
                  open-source database for real-time apps and analytics.
                </div>

                <div className='flex w-full flex-col items-center justify-center gap-6 md:flex-row'>
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
                    href='https://clickhouse.com/docs/en/intro'
                    segmentEvent={{
                      label: hero.ctaButton.text,
                      category: 'website-hero-docs'
                    }}
                    linkClass='w-full max-w-[14rem]'
                    className='w-full'>
                    View documentation
                  </CUIButton>
                </div>
                <CUILink
                  href='#getting_started'
                  target='_self'
                  className='arrow-link mt-5 hidden items-center gap-1 whitespace-nowrap text-neutral-200 hover:text-neutral-0 md:flex'>
                  Or download open-source ClickHouse{' '}
                  <ChevronRightIcon height='18' className='arrow pt-0.5' />
                </CUILink>
              </div>
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle'>
          <div className='section-container mt-12 max-w-3xl lg:mt-0'>
            <HomePageTerminal />
          </div>
        </div>
        <div className='flip-selection -mt-1 bg-primary-300 pt-16 '>
          <div className='mx-auto'>
            <div className='mx-auto mb-8 w-fit max-w-4xl px-4 py-6 pt-10 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
              Trusted by developers that work with data at{' '}
              <span className='tilted tilted-black'>
                <span className='tilted-content leading-8'>scale</span>
              </span>
            </div>
            <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center md:gap-x-14'>
              <div className='absolute left-0 z-10 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
              <div className='absolute right-0 z-10 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
              <LogoCarousel
                logos={logos1}
                speedClass1='animate-marqueeLeft'
                speedClass2='animate-marqueeLeft2'
              />
              <LogoCarousel
                logos={logos2}
                speedClass1='animate-marqueeLeft3'
                speedClass2='animate-marqueeLeft4'
              />
            </div>
            <div className='mx-auto w-fit max-w-4xl px-4 py-6 pb-0 pt-10 text-center text-base leading-normal text-primary-800 md:px-0'>
              Don't take our word for it.{' '}
              <Link href='/user-stories' className='font-bold hover:underline'>
                Read our user stories{' '}
                <ChevronRightIcon
                  height='20'
                  className='-mt-0.5 inline-block transition group-hover:translate-x-1/2'
                />
              </Link>
            </div>
            <div className='mx-auto max-w-7xl py-24 px-3 text-black xl:px-0'>
              <HomepageCustomerVideos
                videos={[
                  {
                    videoId: '863656593',
                    type: 'vimeo',
                    vimeoCode: 'ff50bb0ffb',
                    quote:
                      'Moving over to ClickHouse we were basically able to cut that (Redshift) bill in half.',
                    personName: 'Brooke McKim',
                    personTitleAndCompany: 'Co-founder and CTO, Vantage',
                    image: '/images/vantage-tile.png'
                  },
                  {
                    videoId: '863656379',
                    type: 'vimeo',
                    vimeoCode: 'ec5de7be6d',
                    quote:
                      "There is that feeling of new tech where everything just feels like it's going right.",
                    personName: 'Harlow Ward',
                    personTitleAndCompany: 'Co-founder and CTO, Clearbit',
                    image: '/images/clearbit-tile.png'
                  },
                  {
                    videoId: '863656471',
                    type: 'vimeo',
                    vimeoCode: '72825b3c5e',
                    quote:
                      'We wanted something not only just simple to use, but also simple to manage.',
                    personName: 'Jason Wang',
                    personTitleAndCompany: 'Software Engineer, Statsig',
                    image: '/images/statsig-tile.png'
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full text-neutral-0'>
        <div className='section-container mx-auto flex w-full flex-col items-center pt-24 text-center'>
          <Image
            src='/speed-icon.svg'
            alt='Speed Icon'
            width={72}
            height={72}
          />
          <SuiTitle type='h2' className='mb-6 mt-8'>
            Speed up queries from any data source
          </SuiTitle>
          <div className='mx-auto mb-10 max-w-screen-sm text-center leading-normal text-neutral-200 md:mb-16'>
            ClickHouse supports all the data sources you need to power your apps
            and use cases that require exceptional performance.
          </div>
          <div className='flex w-full justify-center md:hidden md:px-12'>
            <SpeedAnimationMobileSvg className='h-auto max-w-full' />
          </div>
          <div className='hidden w-full md:block md:px-12'>
            <SpeedAnimationSvg className='h-auto max-w-full' />
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <div className='relative flex flex-col gap-y-28'>
        <div className='section-container bg-shadow-element flex w-full flex-col items-center justify-between self-center md:px-16'>
          <div className='flex w-full flex-col items-center'>
            <Image
              src='/fast-icon.svg'
              alt='Fast Icon'
              width={72}
              height={72}
            />
            <SuiTitle type='h2' className='mt-8 mb-6 text-center'>
              Why is ClickHouse so fast?
            </SuiTitle>
            <div className='mx-auto max-w-screen-md text-center leading-normal text-neutral-200'>
              Column-oriented databases are better suited to OLAP scenarios.
              They are at least <span className='font-bold'>100x faster</span>{' '}
              in processing most queries. ClickHouse uses all available system
              resources to their full potential to process each analytical query
              as fast as possible.
            </div>
          </div>
          <div className='grid grid-cols-1 items-center gap-16 py-16 md:grid-cols-2'>
            <div>
              <RowOrientedIllustration className='mx-auto h-auto max-w-full rounded-lg border border-neutral-700/80 bg-neutral-900' />
              <div className='mb-3 mt-6 text-center font-bold leading-normal text-neutral-0 md:text-left'>
                Row-oriented databases
              </div>
              <div className='text-center leading-normal text-neutral-200 md:text-left'>
                In row-oriented databases, data is stored in rows, with all the
                values related to a row physically stored next to each other.
              </div>
            </div>
            <div>
              <ColumnOrientedIllustration className='mx-auto h-auto max-w-full rounded-lg border border-neutral-700/80 bg-neutral-900' />
              <div className='mb-3 mt-6 text-center font-bold leading-normal text-neutral-0 md:text-left'>
                Column-oriented databases
              </div>
              <div className='text-center leading-normal text-neutral-200 md:text-left'>
                In column-oriented databases, like ClickHouse, data is stored in
                columns, with values from the same columns stored together.
              </div>
            </div>
          </div>
          <CUIButton
            type='secondary'
            className='group w-auto'
            href='https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast'
            iconRight={
              <ChevronRightIcon
                height='16'
                className='pt-0.5 transition group-hover:translate-x-1/2'
              />
            }>
            Read more in the docs
          </CUIButton>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <div className='flex w-full flex-col'>
        <div
          className='section-container bg-shadow-element yellow-shadow container mx-auto flex flex-col items-center'
          style={yellowPositionStyle}>
          <Image
            src='/deploy-icon.svg'
            alt='Deploy Icon'
            width={72}
            height={72}
          />
          <SuiTitle
            type='h2'
            className='mx-auto mt-8 mb-6 max-w-3xl text-center'>
            Deploy your way
          </SuiTitle>
          <div className='mx-auto max-w-screen-sm text-center leading-normal text-neutral-200'>
            Unlike traditional closed-source OLAP databases, ClickHouse runs on
            every environment, whether it’s on your machine or in the cloud.
          </div>
          <div className='mt-16 flex flex-wrap justify-center gap-10'>
            {deployData.map((deploy) => (
              <CUICard
                key={deploy.title}
                className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
                <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                  <Image
                    src={deploy.img}
                    alt={`${deploy.title}`}
                    width={64}
                    height={64}
                  />
                  <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-8'>
                    <div className='cursor-pointer text-center text-xl font-semibold leading-tight text-neutral-0'>
                      {deploy.title}
                    </div>
                    <div className='text-center text-sm text-neutral-200'>
                      {deploy.description}
                    </div>
                  </div>
                </CUICard.Body>
                <CUICard.Footer className='flex w-full items-center '>
                  <CUIButton
                    type={deploy.btnType}
                    href={deploy.href}
                    linkClass='w-full inline-grid group'
                    iconRight={
                      <ChevronRightIcon
                        height='18'
                        className='arrow pt-0.5 transition group-hover:translate-x-1/2'
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
      <JoinCommunity github={headerData.github} />
      <HRSeparator className='my-24' />
      <DevelopersSection />
      <HRSeparator className='my-24' />
      <FAQ />
      <GetStarted platforms={platforms} />
    </Layout>
  )
}
