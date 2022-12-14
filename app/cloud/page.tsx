import { SuiButton, SuiSpacer, SuiText, SuiTitle } from '../../components/sui'
import { FeatureItem } from '../../components/feature_item'

import Image from 'next/image'
import { findOne } from '../../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import Markdown from '../../components/Markdown'
import BulletPoint from '../../components/BulletPoint'
import CloudProviders from '../../components/CloudProviders'

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
  const { title, description, ctaButton, videoGif } = hero

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
                  <CloudProviders />
                </div>
              </div>
              <div className='hidden md:flex w-6/12 mx-auto px-8'>
                <div>
                  <div className='mt-20'>
                    <StrapiImage
                      src={videoGif.data}
                      alt='ClickHouse demo'
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
      <div className='section-dark'>
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

      <div className='flex w-full section-light-color pb-12 gap-y-28'>
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
                  <BulletPoint
                    key={`${item.title}-${bullet.text}`}
                    text={bullet.text}
                  />
                ))}
              </div>
              <div className='flex md:w-1/2 justify-center items-center'>
                <StrapiImage
                  src={item.screenshotPng.data}
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
