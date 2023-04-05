import { SuiText, SuiTitle } from '../../components/sui'

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

export default function CloudPage({ hero, seo, footerData }: CloudData) {
  const { ctaButton } = hero

  return (
    <>
      <Layout footerData={footerData} seo={seo}>
        <div className='pt-10 lg:bg-speed-lines bg-center bg-no-repeat bg-contain'>
          <div className='relative overflow-x-hidden'>
            <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-16 px-4 md:pb-24 md:px-8 2xl:px-0 lg:min-h-[630px]'>
              <div className='flex'>
                <div className='md:w-7/12 md:mt-16 flex-col text-center md:text-left'>
                  <h1 className='font-basier text-4xl mb-6 md:text-5.5xl leading-tight font-semibold'>
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
                  <div className='flex flex-col md:flex-row gap-8 mt-8 items-center'>
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
                    <div className='flex space-x-6 justify-center md:justify-start'>
                      <Image
                        src='/images/cloud/provider_aws.png'
                        alt='AWS ClickHouse provider'
                        width={52}
                        height={40}
                      />
                      <Image
                        src='/images/cloud/provider_gcp.png'
                        alt='AWS ClickHouse provider'
                        width={64}
                        height={40}
                      />
                      <Image
                        src='/images/cloud/provider_azure.png'
                        alt='AWS ClickHouse provider'
                        width={64}
                        height={40}
                      />
                    </div>
                  </div>
                </div>
                <div className='hidden mx-auto md:w-4/12 md:flex mt-4'>
                  <img
                    src='/images/cloud/cloud_hero_image.png'
                    alt='ClickHouse is fast'
                    width={1262}
                    height={523}
                    className='w-full h-auto min-w-[60rem]'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-neutral-0 bg-neutral-725'>
          <div className='flex container mx-auto flex-col max-w-7xl pb-16 px-4 sm:px-8 md:px-8 2xl:px-0  pt-16'>
            <div className='feature-container'>
              {features.map((feature) => (
                <div className='col' key={feature.id}>
                  <div className='flex items-start gap-4'>
                    <Image
                      src={feature.icon}
                      width={32}
                      height={32}
                      alt={feature.title}
                    />
                    <div>
                      <h4 className='font-bold mb-3 font-inter'>
                        {feature.title}
                      </h4>
                      <p className='font-light font-inter leading-relaxed text-sm text-neutral-200'>
                        {feature.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex w-full text-neutral-0 pb-12 gap-y-4 md:gap-y-28 bg-shadow-element yellow-shadow'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-24 pb-8 text-center px-8 2xl:px-0 gap-y-24'>
            {featureBlocks.map((item, index: number) => (
              <>
                <div
                  className={`flex flex-col gap-x-24 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } justify-center`}
                  key={item.title}>
                  <div className='flex flex-col md:text-left md:w-1/2 mb-12 md:mb-0'>
                    <div className='md:border-l-4 border-yellow-200 md:pl-8 '>
                      <SuiTitle
                        type='h3'
                        className='mb-4 !text-4xl'
                        weight='semibold'>
                        {item.title}
                      </SuiTitle>
                      <SuiText size='base' color='secondary' className='mb-8'>
                        {item.description}
                      </SuiText>
                      {item.bullets.map((bullet) => (
                        <BulletPoint
                          key={`${item.title}-${bullet.text}`}
                          text={bullet.text}
                        />
                      ))}
                    </div>
                  </div>
                  <div className='flex md:w-1/2 justify-center items-center'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={item.image_width}
                      height={item.image_height}
                      className='md:h-fit w-full'
                    />
                  </div>
                </div>
                <HRSeparator className='my-0' />
              </>
            ))}
          </div>
        </div>
        <div className='relative flex flex-col gap-y-28'>
          <div className='flex flex-col items-center justify-between self-center section-container w-full bg-shadow-element yellow-shadow'>
            <div className='flex flex-col items-center w-full'>
              <Image
                src='/images/cloud/section_integrations.svg'
                alt='ClickHouse integrations'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mt-8 mb-6'>
                Powerful integrations
              </SuiTitle>
              <div className='text-neutral-200 max-w-2xl leading-normal text-center mx-auto'>
                We curate the most popular ways to work ClickHouse. Explore our
                growing library of ecosystem integrations for data ingestion,
                data visualisation, language clients and SQL clients.
              </div>
              <div className='flex gap-6 mt-16 mx-auto justify-center md:max-w-[552px] flex-wrap'>
                {integrations.map((integration) => (
                  <CUICard className='p-4'>
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
          <div className='flex flex-col items-center justify-between self-center section-container w-full bg-shadow-element-right red-shadow'>
            <div className='flex flex-col items-center w-full'>
              <Image
                src='/images/cloud/section_support.svg'
                alt='Fast Icon'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mt-8 mb-6'>
                All in one support
              </SuiTitle>
              <div className='text-neutral-200 max-w-2xl leading-normal text-center mx-auto px-4 md:px-0'>
                ClickHouse provides the most comprehensive, consultative cloud
                support in the industry bundled with your ClickHouse Cloud
                service.
              </div>

              <ul className='flex flex-col gap-2 max-w-lg justify-start py-8 px-4 md:px-0'>
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
              className='w-auto group'
              href='/support/program/'
              iconRight={
                <ChevronRightIcon
                  height='18'
                  className='group-hover:translate-x-1/2 pt-0.5 transition'
                />
              }>
              Learn more
            </CUIButton>
          </div>
        </div>

        <div className='pb-16 section-container md:px-8 2xl:px-0 '>
          <div className='bg-primary-300 text-neutral-0 w-full rounded-lg flip-selection py-16 px-4'>
            <div className='flex container mx-auto flex-col 2xl:px-0'>
              <div className='flex flex-col text-center mx-auto'>
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
                    className='mx-auto mt-8 group'
                    href='https://clickhouse.cloud/signUp?loc=cloud-page-get-started-footer'
                    iconRight={
                      <ChevronRightIcon
                        height='18'
                        className='group-hover:translate-x-1/2 pt-0.5 transition'
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
