import featureBlocks from './feature_blocks.json'
import features from './features.json'
import TickItem from '@/components-cleaned/TickItem'
import AnimatedIntegrationLogos from '@/components/AnimatedIntegrationLogos'
import { BYOCSection } from '@/components/BYOCSection'
import Lines from '@/components/ClickPipesAnimation/Lines'
import { CUIButton, CUICard } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LogoCarousel from '@/components/LogoCarousel'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CloudData } from '@/types/cloud'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useInView } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CloudData> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.ctaButton',
        'hero.cloudProviders',
        'hero.cloudProviders.darkProviderPngs',
        'hero.cloudProviders.lightProviderPngs',
        'hero.videoGif',
        'hero.backgroundSvg',
        'features',
        'features.iconSvg',
        'screenshotsAndBullets',
        'screenshotsAndBullets.screenshotPng',
        'screenshotsAndBullets.bullets',
        'seo',
        'seo.image',
        'CloudCustomerLogos',
        'CloudCustomerLogos.logos',
        'CloudCustomerLogos.logos.*',
        'CloudCustomerLogos.logos.Logo'
      ]
    }
    const data = await findOne('cloud', params)
    data.seo.path = '/cloud'
    data.seo.languages = ['en', 'ja']
    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function CloudPage({
  hero,
  seo,
  headerData,
  footerData,
  CloudCustomerLogos
}: CloudData) {
  const [windowWidth, setWindowWidth] = useState(0)
  const { ctaButton } = hero
  const integrationsRef = useRef(null)
  const isInView = useInView(integrationsRef, {
    amount: 'some',
    once: true
  })

  useGalaxyOnPage('productCloudPage')
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-neutral-800 bg-contain bg-center bg-no-repeat pt-10'>
          <div className='relative overflow-x-hidden'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col text-center md:mt-16 md:w-7/12 md:text-left'>
                  <h1 className='mb-6 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    Serverless.{' '}
                    <span className='tilted tilted-yellow'>
                      <span className='tilted-content'>Simple.</span>
                    </span>{' '}
                    ClickHouse Cloud.
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 md:max-w-xl md:pr-4'>
                    Get the performance you love from open source ClickHouse in
                    a serverless offering that takes care of the details so you
                    can spend more time getting insight out of the fastest
                    database on earth.
                  </SuiText>
                  <div className='mt-8 flex flex-col items-center gap-8 md:flex-row'>
                    {ctaButton && (
                      <div className='flex justify-center md:justify-start'>
                        <CUIButton
                          type='primary'
                          size='lg'
                          weight='semibold'
                          href='https://console.clickhouse.cloud/signUp?loc=cloud-page-hero-button'
                          target={ctaButton.target}
                          linkClass='w-full max-w-[12rem]'
                          className='w-full'>
                          {ctaButton.text}
                        </CUIButton>
                      </div>
                    )}
                    <div className='flex items-center justify-center space-x-6 md:justify-start'>
                      <div className='flex flex-row items-start gap-6 pb-6 pt-8'>
                        <div className='relative w-auto px-4'>
                          <Link href='/pricing?provider=aws'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              className='h-10 w-auto'
                              viewBox='0 0 52 40'>
                              <path
                                fill='#fff'
                                d='M15.8 16.69q0 .83.16 1.32.17.48.48 1.07.11.17.1.34.01.23-.28.44l-.95.63a1 1 0 0 1-.4.13q-.22-.01-.45-.2-.3-.35-.54-.7-.22-.38-.47-.88a5.6 5.6 0 0 1-4.44 2.05A4.2 4.2 0 0 1 6 19.82a3.8 3.8 0 0 1-1.11-2.85q0-1.9 1.37-3.06a5.6 5.6 0 0 1 3.7-1.15q.76 0 1.6.11.83.13 1.74.33v-1.08q0-1.7-.71-2.38-.73-.68-2.46-.68-.8 0-1.63.2a12 12 0 0 0-2.16.7L6.1 10q-.32 0-.32-.46V8.8q0-.37.1-.52.12-.15.43-.31a9 9 0 0 1 1.9-.67 9 9 0 0 1 2.35-.28q2.7 0 3.96 1.2t1.25 3.65v4.8zm-6.14 2.25q.75 0 1.56-.26.82-.27 1.43-.95.37-.43.52-.95.14-.54.15-1.3v-.62a13 13 0 0 0-2.81-.34q-1.5 0-2.25.6t-.74 1.7q0 1.05.56 1.57.54.55 1.58.55m12.13 1.6q-.4 0-.58-.14-.18-.16-.31-.58L17.35 8.35q-.15-.44-.14-.6 0-.35.37-.36h1.48q.43 0 .58.14.18.15.3.58l2.54 9.82 2.36-9.82q.1-.45.28-.58.2-.13.6-.14h1.22q.42 0 .6.14.19.15.29.58l2.38 9.94 2.62-9.94q.14-.45.3-.58a1 1 0 0 1 .59-.14h1.4q.37-.01.38.37l-.03.23-.1.37-3.65 11.47q-.14.45-.31.58a1 1 0 0 1-.58.15h-1.3q-.42 0-.6-.15-.19-.15-.29-.6l-2.34-9.56-2.32 9.55q-.11.45-.29.6-.19.15-.6.14zm19.4.4a10 10 0 0 1-4.06-.86q-.37-.2-.47-.41t-.09-.42v-.75q0-.46.35-.46.14 0 .27.04l.38.15a8 8 0 0 0 3.45.7q1.44 0 2.2-.5.79-.49.8-1.4 0-.62-.41-1.04a4 4 0 0 0-1.53-.77l-2.19-.67a4.6 4.6 0 0 1-2.41-1.51 3.5 3.5 0 0 1-.35-3.8q.4-.72 1.09-1.22.66-.5 1.57-.77.9-.26 1.9-.25a8 8 0 0 1 2 .22q.45.11.85.24t.64.27q.3.17.45.37.13.18.13.49v.7q0 .46-.34.47-.19 0-.58-.18a7 7 0 0 0-2.9-.58q-1.3 0-2 .42-.7.41-.71 1.32 0 .62.45 1.05t1.66.82l2.14.67a4.6 4.6 0 0 1 2.35 1.42q.69.9.69 2.08a3.8 3.8 0 0 1-1.5 3.02 5 5 0 0 1-1.67.83 7 7 0 0 1-2.16.32'
                              />
                              <path
                                fill='#f90'
                                fillRule='evenodd'
                                d='M44.04 28.16c-4.96 3.6-12.18 5.51-18.39 5.51a33.6 33.6 0 0 1-22.45-8.4c-.47-.42-.04-.99.51-.66a46 46 0 0 0 22.47 5.86c5.51 0 11.57-1.13 17.14-3.44.83-.37 1.54.53.72 1.13'
                                clip-rule='evenodd'
                              />
                              <path
                                fill='#f90'
                                fillRule='evenodd'
                                d='M46.11 25.84c-.63-.8-4.2-.39-5.81-.2-.48.07-.56-.35-.12-.66 2.84-1.96 7.5-1.4 8.05-.74.54.67-.16 5.25-2.81 7.45-.41.34-.8.16-.62-.29.6-1.46 1.95-4.77 1.31-5.56'
                                clipRule='evenodd'
                              />
                            </svg>
                          </Link>
                        </div>
                        <div className='relative w-auto px-4'>
                          <Link href='/pricing?provider=gcp'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              className='h-10 w-auto'
                              viewBox='0 0 32 32'>
                              <path
                                fill='#ea4335'
                                d='m20.36 10.24 1.03.02 2.78-2.78.14-1.18a12.54 12.54 0 0 0-20.4 6.08c.3-.22.96-.06.96-.06l5.56-.91s.29-.48.44-.45a6.94 6.94 0 0 1 9.5-.72'
                              />
                              <path
                                fill='#4285f4'
                                d='M28.09 12.38A12.5 12.5 0 0 0 24.3 6.3l-3.95 3.94a7 7 0 0 1 2.6 5.41v.7a3.48 3.48 0 0 1 0 6.95H16l-.7.7v4.17l.7.7h6.96a9.06 9.06 0 0 0 5.13-16.48'
                              />
                              <path
                                fill='#34a853'
                                d='M9.04 28.87H16V23.3H9.04q-.75 0-1.43-.31l-1 .3-2.79 2.8-.24.93a9 9 0 0 0 5.46 1.85'
                              />
                              <path
                                fill='#fbbc05'
                                d='M9.04 10.78a9.05 9.05 0 0 0-5.46 16.25L7.62 23a3.48 3.48 0 1 1 4.6-4.6l4.02-4.03a9 9 0 0 0-7.2-3.59'
                              />
                            </svg>
                          </Link>
                        </div>
                        <div className='relative w-auto px-4'>
                          <Link href='/pricing?provider=azure'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              className='h-10 w-auto'
                              viewBox='0 0 27 27'>
                              <path
                                fill='url(#a)'
                                d='M9.38 1.84h7.32L9.1 24.37a1.2 1.2 0 0 1-1.1.79H2.3a1.16 1.16 0 0 1-1.11-1.54L8.27 2.63a1.2 1.2 0 0 1 1.1-.79'
                              />
                              <path
                                fill='#0078d4'
                                d='M20.02 16.95H8.4a.54.54 0 0 0-.37.93l7.46 6.96q.34.31.8.32h6.58z'
                              />
                              <path
                                fill='url(#b)'
                                d='M9.38 1.84a1.2 1.2 0 0 0-1.11.81L1.2 23.6a1.16 1.16 0 0 0 1.1 1.56h5.84a1.3 1.3 0 0 0 .96-.82l1.41-4.15 5.04 4.7q.31.26.75.27h6.55l-2.87-8.21H11.6l5.13-15.1z'
                              />
                              <path
                                fill='url(#c)'
                                d='M18.73 2.63a1.2 1.2 0 0 0-1.1-.79H9.46a1.2 1.2 0 0 1 1.1.8l7.1 20.98a1.17 1.17 0 0 1-1.11 1.54h8.16a1.16 1.16 0 0 0 1.1-1.54z'
                              />
                              <defs>
                                <linearGradient
                                  id='a'
                                  x1='12.05'
                                  x2='4.44'
                                  y1='3.57'
                                  y2='26.04'
                                  gradientUnits='userSpaceOnUse'>
                                  <stop stopColor='#114a8b' />
                                  <stop offset='1' stopColor='#0669bc' />
                                </linearGradient>
                                <linearGradient
                                  id='b'
                                  x1='14.42'
                                  x2='12.66'
                                  y1='14.04'
                                  y2='14.63'
                                  gradientUnits='userSpaceOnUse'>
                                  <stop stopOpacity='.3' />
                                  <stop offset='.07' stopOpacity='.2' />
                                  <stop offset='.32' stopOpacity='.1' />
                                  <stop offset='.62' stopOpacity='.05' />
                                  <stop offset='1' stopOpacity='0' />
                                </linearGradient>
                                <linearGradient
                                  id='c'
                                  x1='13.45'
                                  x2='21.8'
                                  y1='2.91'
                                  y2='25.15'
                                  gradientUnits='userSpaceOnUse'>
                                  <stop stopColor='#3ccbf4' />
                                  <stop offset='1' stopColor='#2892df' />
                                </linearGradient>
                              </defs>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='mt-3 text-sm'>
                    Request access for{' '}
                    <Link
                      href='/cloud/bring-your-own-cloud'
                      className='text-primary-300'>
                      Bring Your Own Cloud (BYOC)
                    </Link>
                  </p>
                </div>
                <div className='mx-auto mt-4 hidden md:flex md:w-4/12'>
                  <Image
                    src='/images/cloud/cloud_hero_image.png'
                    alt='ClickHouse Cloud'
                    loading='eager'
                    width={960}
                    height={516}
                    className='h-auto w-full min-w-[60rem]'
                    priority={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-neutral-800 pb-24'>
          <div className='mx-auto'>
            <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-6 text-center font-basier text-xl font-semibold leading-normal text-neutral-300 md:px-0'>
              ClickHouse Cloud is trusted by developers that work with data at{' '}
              <span className='tilted tilted-yellow'>
                <span className='tilted-content leading-8'>scale</span>
              </span>
            </div>
            <div className='section-container relative max-w-5xl'>
              <LogoCarousel fixShape={true} logos={CloudCustomerLogos.logos} />
            </div>
          </div>
        </div>
        <div className='border-t-2 border-primary-300 bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto flex max-w-7xl flex-col px-4 pb-16 pt-16 sm:px-8 md:px-8 2xl:px-0'>
            <div className='feature-container'>
              {features.map((feature, index: number) => (
                <div className='col' key={index}>
                  <div className='flex items-start gap-4'>
                    <Image
                      src={feature.icon}
                      width={32}
                      height={32}
                      alt={feature.title}
                    />
                    <div>
                      <h4 className='mb-3 font-inter font-bold'>
                        {feature.title}
                      </h4>
                      <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                        {feature.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-shadow-element yellow-shadow flex w-full gap-y-4 pb-12 text-neutral-0 md:gap-y-28'>
          <div className='container mx-auto flex max-w-7xl flex-col gap-y-48 bg-opacity-10 px-8 pb-8 pt-24 text-center md:bg-no-repeat 2xl:px-0'>
            {featureBlocks.map((item, index: number) => (
              <div key={index}>
                <div
                  className={`flex flex-col items-center gap-x-24 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } justify-center`}>
                  <div className='mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
                    <div className='border-yellow-200 md:border-l-4 md:pl-8'>
                      <SuiTitle
                        type='h3'
                        className='mb-4 !text-4xl'
                        weight='semibold'>
                        {item.title}
                      </SuiTitle>
                      <SuiText size='base' color='secondary' className='mb-8'>
                        {item.description}
                      </SuiText>
                      {item.bullets.map((bullet, index: number) => (
                        <TickItem key={index} className='my-4'>
                          {bullet.text}
                        </TickItem>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center justify-center md:w-1/2'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={item.image_width}
                      height={item.image_height}
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='relative flex flex-col gap-y-28 px-3 xl:px-0'>
          <HRSeparator className='my-0' />
          <div className='flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/section_integrations.svg'
                alt='ClickHouse integrations'
                width={72}
                height={73}
              />
              <SuiTitle type='h2' className='mb-6 mt-8'>
                Powerful integrations
              </SuiTitle>
              <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200'>
                We curate the most popular ways to work ClickHouse. Explore our
                growing library of ecosystem integrations for data ingestion,
                data visualization, and language clients. Now with support for
                the MySQL interface so you can connect to any of your favorite
                MySQL-compatible{' '}
                <Link
                  href='https://clickhouse.com/docs/en/integrations/data-visualization'
                  className='text-primary-300'
                  prefetch={false}
                  target='_blank'>
                  data tools
                </Link>
                .
              </div>

              <div
                className='relative z-20 mx-auto mt-16 md:max-w-[552px]'
                ref={integrationsRef}>
                <AnimatedIntegrationLogos
                  play={isInView && windowWidth > 768}
                />
                <div
                  className={`absolute -top-1 left-1/2 z-[5] hidden -translate-x-1/2 transition-opacity delay-1000 duration-1000 lg:block ${
                    isInView ? '' : 'opacity-0'
                  }`}>
                  <Lines />
                </div>
              </div>
              <div className='relative z-20 mt-28 w-full pb-24'>
                <SuiTitle type='h2' className='mb-6 text-center'>
                  ClickPipes
                </SuiTitle>
                <div className='mx-auto max-w-3xl text-center leading-normal text-neutral-200'>
                  ClickPipes is a managed integration service that makes
                  ingesting data from a diverse set of sources as simple as
                  clicking a few buttons, offering the easiest and most
                  intuitive way to ingest data into ClickHouse Cloud.
                </div>
                <div className='mx-auto mt-11 inline-block w-full text-center hover:cursor-none'>
                  <CUIButton
                    type='secondary'
                    className='group mx-auto w-auto !bg-neutral-800 text-center'
                    href='/cloud/clickpipes'>
                    Learn more
                  </CUIButton>
                </div>
                <Image
                  src='/images/cloud/clickhouse-logo-with-dropshadow.svg'
                  width={120}
                  height={120}
                  alt='ClickHouse'
                  className='relative z-20 mx-auto mt-16 shadow-noOffset shadow-primary-300'
                />
                <SuiTitle type='h2' className='mb-6 mt-8 text-center'>
                  ClickHouse Cloud
                </SuiTitle>
                <div className='mx-auto max-w-3xl text-center leading-normal text-neutral-200'>
                  Experience the power of open-source ClickHouse in a serverless
                  setup. Deploy in seconds, scale seamlessly, and ensure
                  top-tier security with our SOC 2 Type II compliant platform.
                  Available on AWS, GCP and Azure. Dive into insights without
                  the infrastructure hassle!
                </div>
                <CUIButton
                  type='primary'
                  className='mx-auto mt-11'
                  href='https://console.clickhouse.cloud/signUp?loc=clickpipes-cloud-page-get-started'>
                  Get Started
                </CUIButton>
              </div>
            </div>
          </div>
        </div>

        <BYOCSection loc='cloud-page-component' />

        <div className='relative flex flex-col gap-y-28'>
          <div className='section-container bg-shadow-element-right red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/section_support.svg'
                alt='Fast Icon'
                width={72}
                height={73}
              />
              <SuiTitle type='h2' className='mb-6 mt-8'>
                All in one support
              </SuiTitle>
              <div className='mx-auto max-w-2xl px-4 text-center leading-normal text-neutral-200 md:px-0'>
                ClickHouse provides the most comprehensive, consultative cloud
                support in the industry bundled with your ClickHouse Cloud
                service.
              </div>

              <ul className='flex max-w-lg flex-col justify-start gap-4 px-4 py-8 md:px-0'>
                <li>
                  <TickItem>Unlimited 24x7 support</TickItem>
                </li>
                <li>
                  <TickItem>
                    On-Demand training and onboarding workshops
                  </TickItem>
                </li>
                <li>
                  <TickItem>Consultative support via Expert Sessions</TickItem>
                </li>
                <li>
                  <TickItem>
                    Assistance in migration to ClickHouse Cloud
                  </TickItem>
                </li>
              </ul>
            </div>

            <CUIButton
              type='secondary'
              className='group w-auto'
              href='/support/program/'
              iconRight={
                <ChevronRightIcon
                  height='18'
                  className='pt-0.5 transition group-hover:translate-x-1/2'
                />
              }>
              Learn more
            </CUIButton>
          </div>
        </div>

        <HRSeparator className='my-24' />
        <div className='relative flex flex-col gap-y-28 pb-48'>
          <div className='section-container bg-shadow-element-right red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/cloud-icon.svg'
                alt='Fast Icon'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mb-6 mt-8 text-center'>
                ClickHouse Cloud, wherever you&nbsp;are
              </SuiTitle>
              <div className='mx-auto max-w-2xl px-4 text-center leading-normal text-neutral-200 md:px-0'>
                With the flexibility to choose where and how you deploy.
                Available on AWS, GCP and Azure, and through Marketplaces.
                Manage your services through our ClickHouse Cloud self-serve UI,
                or by leveraging our APIs and Terraform provider to automate
                your operations.
              </div>
              <div className='mt-16 flex flex-col space-y-10 md:flex-row md:space-x-10 md:space-y-0'>
                <CUICard className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
                  <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                    <Image
                      src='/images/cloud/aws-marketplace-logo.svg'
                      width={183}
                      height={29}
                      alt='AWS Marketplace'
                    />
                    <div className='flex flex-col items-center justify-center gap-2 pb-8 pt-4'>
                      <div className='text-center text-sm text-neutral-200'>
                        Flexible deployment and subscription options available
                        through the AWS Marketplace.
                      </div>
                    </div>
                  </CUICard.Body>
                  <CUICard.Footer className='flex w-full items-center'>
                    <CUIButton
                      type='secondary'
                      href='https://aws.amazon.com/marketplace/pp/prodview-p4gwofrqpkltu?trk=176b570f-20dd-4b84-aa7e-cae53990fe91&sc_channel=el&source=clickhouse'
                      linkClass='w-full inline-grid group'
                      iconRight={
                        <ChevronRightIcon
                          height='18'
                          className='arrow pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }
                      target='_blank'>
                      View in Marketplace
                    </CUIButton>
                  </CUICard.Footer>
                </CUICard>
                <CUICard className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
                  <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                    <Image
                      src='/images/cloud/gcp-logo.svg'
                      width={181}
                      height={29}
                      alt='Google Cloud'
                    />
                    <div className='flex flex-col items-center justify-center gap-2 pb-8 pt-4'>
                      <div className='text-center text-sm text-neutral-200'>
                        Fast procurement, flexible purchasing, and fulfillment
                        available through the GCP Marketplace.
                      </div>
                    </div>
                  </CUICard.Body>
                  <CUICard.Footer className='flex w-full items-center'>
                    <CUIButton
                      type='secondary'
                      href='https://console.cloud.google.com/marketplace/product/clickhouse-public/clickhouse-cloud'
                      linkClass='w-full inline-grid group'
                      iconRight={
                        <ChevronRightIcon
                          height='18'
                          className='arrow pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }
                      target='_blank'>
                      View in Marketplace
                    </CUIButton>
                  </CUICard.Footer>
                </CUICard>
                <CUICard className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
                  <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                    <Image
                      src='/images/cloud/ms-marketplace.svg'
                      width={162}
                      height={29}
                      alt='Microsoft Azure Marketplace'
                    />
                    <div className='flex flex-col items-center justify-center gap-2 pb-8 pt-4'>
                      <div className='text-center text-sm text-neutral-200'>
                        Consolidate billing and streamline your cloud costs with
                        Azure Marketplace subscriptions.
                      </div>
                    </div>
                  </CUICard.Body>
                  <CUICard.Footer className='flex w-full items-center'>
                    <CUIButton
                      type='secondary'
                      href='https://azuremarketplace.microsoft.com/en-us/marketplace/apps/clickhouse.clickhouse_cloud?tab=Overview'
                      linkClass='w-full inline-grid group'
                      iconRight={
                        <ChevronRightIcon
                          height='18'
                          className='arrow pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }
                      target='_blank'>
                      View in Marketplace
                    </CUIButton>
                  </CUICard.Footer>
                </CUICard>
              </div>
            </div>
          </div>
        </div>

        <div className='section-container pb-16 md:px-8 2xl:px-0'>
          <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=cloud-page-get-started-footer' />
        </div>
      </Layout>
    </>
  )
}
