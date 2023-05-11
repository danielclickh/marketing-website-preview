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
        'seo.image'
      ]
    }
    const data = await findOne('cloud', params)

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
  footerData
}: CloudData) {
  const { ctaButton } = hero

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat pt-10 lg:bg-speed-lines'>
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
        <div className='bg-neutral-725 text-neutral-0'>
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
          <div className='container mx-auto flex max-w-7xl flex-col gap-y-24 bg-opacity-10 px-8 pt-24 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
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
                      className='w-full md:h-fit'
                    />
                  </div>
                </div>
                <HRSeparator className='my-0' />
              </div>
            ))}
          </div>
        </div>
        <div className='relative flex flex-col gap-y-28'>
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
                data visualisation, language clients and SQL clients.
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
            </div>
          </div>
        </div>

        <HRSeparator className='my-24' />
        <div className='relative flex flex-col gap-y-28 pb-24'>
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

        <div className='section-container pb-16 md:px-8 2xl:px-0 '>
          <div className='flip-selection w-full rounded-lg bg-primary-300 py-16 px-4 text-neutral-0'>
            <div className='container mx-auto flex flex-col 2xl:px-0'>
              <div className='mx-auto flex flex-col text-center'>
                <SuiTitle type='h2' color='text-default' className='mb-6 '>
                  Get started for free
                </SuiTitle>
                <div className='max-w-3xl'>
                  <SuiText size='base' color='text-default' weight='normal'>
                    We’ll get you started on a 30 day trial and $300 credits to
                    spend at your own pace.
                  </SuiText>

                  <CUIButton
                    type='primary-dark'
                    size='lg'
                    className='group mx-auto mt-8'
                    href='https://clickhouse.cloud/signUp?loc=cloud-page-get-started-footer'
                    iconRight={
                      <ChevronRightIcon
                        height='18'
                        className='pt-0.5 transition group-hover:translate-x-1/2'
                      />
                    }
                    segmentEvent={{
                      label: 'Create a free acount',
                      category: 'website-cloudpage-lower-hero'
                    }}>
                    Create a free acount
                  </CUIButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
