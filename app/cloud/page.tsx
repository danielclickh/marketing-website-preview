import { SuiButton, SuiSpacer, SuiText, SuiTitle } from '../../components/sui'
import { FeatureItem } from '../../components/feature_item'

import Image from 'next/image'
import { IconAWS } from '../../components/icons/icon_aws'
import { findOne } from '../../lib/api/strapi'
import { StrapiImage } from '../../components/StrapiElements'
import Markdown from '../../components/Markdown'

async function getData() {
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
      'screenshotsAndBullets.bullets'
    ]
  }
  const data = await findOne('cloud', params)

  return data
}

export default async function CloudPage() {
  const { hero, features, screenshotsAndBullets } = await getData()
  const { title, description, ctaButton, cloudProviders } = hero

  return (
    <>
      <div className='bg-hero_background dark:bg-dark_hero_background bg-cover pt-10'>
        <div className='bg-cloud_hero_background dark:bg-dark_cloud_hero_background bg-no-repeat bg-right-top'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-20 md:px-8 2xl:px-0'>
            <div data-aos='fade-up' className='flex'>
              <div className='w-11/12 mx-auto md:w-6/12 md:mt-16 flex-col text-center md:text-left'>
                <SuiTitle size='web'>
                  <h1>
                    <Markdown>{title}</Markdown>
                  </h1>
                </SuiTitle>
                <div className='mt-6'>
                  <SuiText size='lg' color='dark' weight='normal'>
                    <p className='md:max-w-lg md:pr-4'>{description}</p>
                  </SuiText>
                </div>
                <div className='flex flex-col mt-6'>
                  {ctaButton && (
                    <div className='flex justify-center md:justify-start'>
                      <SuiButton
                        size='md'
                        path={ctaButton.href}
                        target={ctaButton.target}
                        title={ctaButton.text}
                      />
                    </div>
                  )}
                  <div className='flex space-x-6 justify-center md:justify-start'>
                    {cloudProviders.map((cloudProvider) => (
                      <div
                        className='pt-8 flex flex-col space-y-2'
                        key={cloudProvider.title}>
                        <SuiTitle size='xxs' color='dark'>
                          <h5>{cloudProvider.title}</h5>
                        </SuiTitle>
                        <div className='flex flex-row'>
                          <IconAWS />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='hidden md:flex w-6/12 mx-auto px-8'>
                <div>
                  <div className='mt-20'>
                    <Image
                      src='/cloud/cloud_demo_small.gif'
                      alt='ClickHouse demot'
                      width='748'
                      height='428'
                      className='rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full mx-auto bg-strain_background bg-cover h-24 md:h-40 -mt-12 bg-no-repeat 2xl:h-52' />
        </div>
      </div>
      <div className=' bg-arsenic'>
        <div className='flex container mx-auto flex-col max-w-7xl  pb-16 px-4 sm:px-8 2xl:px-0 pt-16'>
          <div className='feature-container'>
            {features.map((feature) => (
              <FeatureItem
                key={feature.iconSvg.hash}
                icon={feature.iconSvg}
                title={feature.title}
                description={feature.description}
                delay={100}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex w-full bg-cultured dark:bg-onyx pb-12'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
          {screenshotsAndBullets.map((item, index) => (
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } justify-between`}
              key={item.title}>
              <div className='flex flex-col text-left md:w-2/5 pb-4 md:pb-20'>
                <SuiTitle size='lg'>{item.title}</SuiTitle>
                <SuiSpacer size='md' />
                <SuiText size='lg' color='dark'>
                  <p>{item.description}</p>
                </SuiText>
                <SuiSpacer size='md' />
                {item.bullets.map((bullet) => (
                  <div
                    className='flex space-x-4 pb-2'
                    key={`${item.title}-${bullet.text}`}>
                    <Image
                      src='/homepage/new/icon_check.svg'
                      alt='ClickHouse is fast'
                      width='32'
                      height='32'
                    />
                    <SuiText size='lg' color='dark'>
                      <p>{bullet.text}</p>
                    </SuiText>
                  </div>
                ))}
              </div>
              <div className='flex md:w-1/2 justify-center items-center'>
                <StrapiImage
                  src={item.screenshotPng}
                  className='h-fit w-full object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
