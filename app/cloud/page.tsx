import { SuiButton, SuiText, SuiTitle } from '../../components/sui'
import { FeatureItem } from '../../components/feature_item'

import { findOne } from '../../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import Markdown from '../../components/Markdown'
import BulletPoint from '../../components/BulletPoint'

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
  const { title, description, ctaButton, cloudProviders, videoGif } = hero

  return (
    <>
      <div className='bg-hero_background dark:bg-dark_hero_background bg-cover pt-10'>
        <div className='bg-cloud_hero_background dark:bg-dark_cloud_hero_background bg-no-repeat bg-right-top'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-20 md:px-8 2xl:px-0'>
            <div data-aos='fade-up' className='flex'>
              <div className='w-11/12 mx-auto md:w-6/12 md:mt-16 flex-col text-center md:text-left'>
                <SuiTitle type='h1' size='6xl'>
                  <Markdown>{title}</Markdown>
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
                        <SuiTitle type='h6' color='dark' className='mb-5'>
                          {cloudProvider.title}
                        </SuiTitle>
                        <div className='flex flex-row items-start gap-6 h-10'>
                          {cloudProvider.lightProviderPngs.data.map(
                            (lightIconPng, index) => (
                              <StrapiPicture
                                key={`${cloudProvider.title}-${index}`}
                                dark={
                                  cloudProvider.darkProviderPngs.data[index]
                                }
                                light={lightIconPng}
                                width='100'
                                height='40'
                                className='max-h-10 w-auto'
                              />
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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

      <div className='flex w-full container-light-color pb-12 gap-y-28'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
          {screenshotsAndBullets.map((item, index) => (
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } justify-between`}
              key={item.title}>
              <div className='flex flex-col text-left md:w-2/5 pb-4 md:pb-20'>
                <SuiTitle type='h3' className='mb-4'>
                  {item.title}
                </SuiTitle>
                <SuiText size='lg' color='dark' className='mb-4'>
                  <p>{item.description}</p>
                </SuiText>
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
