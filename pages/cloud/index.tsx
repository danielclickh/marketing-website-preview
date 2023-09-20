import { SuiText, SuiTitle } from '../../components/sui'
import CloudProviders from '../../components/CloudProviders'

import { findOne } from '../../lib/api/strapi'
import BulletPoint from '../../components/BulletPoint'
import { CloudData } from '../../types/cloud'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CUIButton, CUICard } from '../../components/ClickUI'
import Image from 'next/image'
import HRSeparator from '../../components/HRSeparator'
import integrations from './integrations.json'
import features from './features.json'
import featureBlocks from './feature_blocks.json'
import { ChevronRightIcon } from '@heroicons/react/solid'
import GetStartedFree from '../../components/GetStartedFree'
import LogoCarousel from '../../components/LogoCarousel'
import Link from 'next/link'

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
  const { ctaButton } = hero

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
                          href='https://clickhouse.cloud/signUp?loc=cloud-page-hero-button'
                          target={ctaButton.target}
                          segmentEvent={{
                            label: ctaButton.text,
                            category: 'website-hero'
                          }}
                          linkClass='w-full max-w-[12rem]'
                          className='w-full'>
                          {ctaButton.text}
                        </CUIButton>
                      </div>
                    )}
                    <div className='flex items-center justify-center space-x-6 md:justify-start'>
                      <CloudProviders cloudProviders={hero.cloudProviders} />
                    </div>
                  </div>
                  <p className='mt-3 text-sm'>
                    Interested in being notified when Azure is available?{' '}
                    <Link
                      href='/cloud/azure-waitlist'
                      className='text-primary-300'>
                      Join the waitlist
                    </Link>
                  </p>
                </div>
                <div className='mx-auto mt-4 hidden md:flex md:w-4/12'>
                  <Image
                    src='/images/cloud/cloud_hero_image.png'
                    alt='ClickHouse Cloud'
                    loading='eager'
                    width={1262}
                    height={523}
                    className='h-auto w-full min-w-[60rem]'
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
            <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center md:gap-x-14'>
              <div className='absolute left-0 z-10 h-full bg-cloudFadeLeftLogos p-10 lg:pr-20'></div>
              <div className='absolute right-0 z-10 h-full bg-cloudFadeRightLogos p-10 lg:pl-20'></div>
              <LogoCarousel
                fixShape={true}
                logoColor='pink'
                logos={CloudCustomerLogos.logos}
                speedClass1='animate-marqueeLeft3'
                speedClass2='animate-marqueeLeft4'
              />
            </div>
          </div>
        </div>
        <div className='border-t-2 border-primary-300 bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto flex max-w-7xl flex-col px-4 pb-16 pt-16 sm:px-8 md:px-8  2xl:px-0'>
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
          <div className='container mx-auto flex max-w-7xl flex-col gap-y-48 bg-opacity-10 px-8 pt-24 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
            {featureBlocks.map((item, index: number) => (
              <div key={index}>
                <div
                  className={`flex flex-col items-center gap-x-24 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } justify-center`}>
                  <div className='mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
                    <div className='border-yellow-200 md:border-l-4 md:pl-8 '>
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
                        <BulletPoint key={index} text={bullet.text} />
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center justify-center md:w-1/2'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={item.image_width}
                      height={item.image_height}
                      className=''
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='relative flex flex-col gap-y-28'>
          <HRSeparator className='my-0' />
          <div className='section-container bg-shadow-element yellow-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/section_integrations.svg'
                alt='ClickHouse integrations'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mt-8 mb-6'>
                Powerful integrations
              </SuiTitle>
              <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200'>
                We curate the most popular ways to work ClickHouse. Explore our
                growing library of ecosystem integrations for data ingestion,
                data visualization, and language clients. Now with support for
                the MySQL interface so you can connect to any of your favorite
                MySQL-compatible{' '}
                <a
                  href='https://clickhouse.com/docs/en/integrations/data-visualization'
                  className='text-primary-300'>
                  data tools
                </a>
                .
              </div>
              <div className='mx-auto mt-16 flex flex-wrap justify-center gap-6 md:max-w-[552px]'>
                {integrations.map((integration) => (
                  <CUICard className='p-4' key={integration.name}>
                    <Image
                      src={integration.logo}
                      width={36}
                      height={36}
                      alt={integration.name}
                    />
                  </CUICard>
                ))}
              </div>

              <div className='mx-auto mt-36 max-w-2xl leading-normal text-neutral-200'>
                <div className='flex flex-col items-center gap-x-10 md:flex-row'>
                  <div className='text-center md:text-left'>
                    <h3 className='relative mt-8 mb-6 inline-block text-left font-basier text-3xl font-semibold'>
                      ClickPipes
                      <div className='absolute -top-3 -right-10 rounded-full bg-primary-300 px-3 text-sm font-normal text-neutral-725'>
                        Beta
                      </div>
                    </h3>
                    <p className='mb-6 text-center md:text-left'>
                      ClickPipes offers the easiest and most intuitive way to
                      ingest data into ClickHouse Cloud. With support for Apache
                      Kafka and Confluent today, and many more data sources
                      coming soon.
                    </p>
                  </div>
                  <Link href='/cloud/clickpipes'>
                    <Image
                      src='/images/cloud/clickpipes/clickpipes-diagram.svg'
                      width={624}
                      height={457}
                      alt='ClickPipes'
                      className='mx-auto max-w-[250px]'
                    />
                  </Link>
                </div>
                <div className=' w-full'>
                  <CUIButton
                    type='secondary'
                    className='group mx-auto mt-16 w-auto'
                    href='/cloud/clickpipes'
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
            </div>
          </div>
        </div>

        <HRSeparator className='my-24' />
        <div className='relative flex flex-col gap-y-28 '>
          <div className='section-container bg-shadow-element-right red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/section_support.svg'
                alt='Fast Icon'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mt-8 mb-6'>
                All in one support
              </SuiTitle>
              <div className='mx-auto max-w-2xl px-4 text-center leading-normal text-neutral-200 md:px-0'>
                ClickHouse provides the most comprehensive, consultative cloud
                support in the industry bundled with your ClickHouse Cloud
                service.
              </div>

              <ul className='flex max-w-lg flex-col justify-start gap-2 py-8 px-4 md:px-0'>
                <li>
                  <div className='flex items-center gap-4'>
                    <Image
                      src='/images/cloud/check.svg'
                      width={32}
                      height={32}
                      alt='Icon'
                    />
                    <div className=''>Unlimited 24x7 support</div>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-4'>
                    <Image
                      src='/images/cloud/check.svg'
                      width={32}
                      height={32}
                      alt='Icon'
                    />
                    <div className=''>
                      On-Demand training and onboarding workshops
                    </div>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-4'>
                    <Image
                      src='/images/cloud/check.svg'
                      width={32}
                      height={32}
                      alt='Icon'
                    />
                    <div className=''>
                      Consultative support via Expert Sessions
                    </div>
                  </div>
                </li>
                <li>
                  <div className='flex items-center gap-4'>
                    <Image
                      src='/images/cloud/check.svg'
                      width={32}
                      height={32}
                      alt='Icon'
                    />
                    <div className=''>
                      Assistance in migration to ClickHouse Cloud
                    </div>
                  </div>
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
              <SuiTitle type='h2' className='mt-8 mb-6 text-center'>
                ClickHouse Cloud, wherever you&nbsp;are
              </SuiTitle>
              <div className='mx-auto max-w-2xl px-4 text-center leading-normal text-neutral-200 md:px-0'>
                With the flexibility to choose where and how you deploy.
                Available on AWS and GCP, and through Marketplaces. Manage your
                services through our ClickHouse Cloud self-serve UI, or by
                leveraging our APIs and Terraform provider to automate your
                operations.
              </div>
              <div className='mt-16 flex flex-col space-y-10 md:flex-row md:space-x-10 md:space-y-0'>
                <CUICard className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
                  <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                    <Image
                      src='/images/cloud/aws-marketplace-logo.svg'
                      width={180}
                      height={22}
                      alt='AWS Marketplace'
                    />
                    <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-8'>
                      <div className='text-center text-sm text-neutral-200'>
                        Flexible deployment and subscription options available
                        through the AWS Marketplace.
                      </div>
                    </div>
                  </CUICard.Body>
                  <CUICard.Footer className='flex w-full items-center '>
                    <CUIButton
                      type='secondary'
                      href='https://aws.amazon.com/marketplace/pp/prodview-jettukeanwrfc'
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
                      width={180}
                      height={28}
                      alt='Google Cloud'
                    />
                    <div className='flex flex-col items-center justify-center gap-2 pt-4 pb-8'>
                      <div className='text-center text-sm text-neutral-200'>
                        Fast procurement, flexible purchasing, and fulfillment
                        available through the GCP Marketplace.
                      </div>
                    </div>
                  </CUICard.Body>
                  <CUICard.Footer className='flex w-full items-center '>
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
              </div>
            </div>
          </div>
        </div>

        <div className='section-container pb-16 md:px-8 2xl:px-0 '>
          <GetStartedFree href='https://clickhouse.cloud/signUp?loc=cloud-page-get-started-footer' />
        </div>
      </Layout>
    </>
  )
}
