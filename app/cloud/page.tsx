import { SuiButton, SuiText, SuiTitle } from '../../components/sui'
import { FeatureItem } from '../../components/feature_item'

import { findOne } from '../../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import Markdown from '../../components/Markdown'
import BulletPoint from '../../components/BulletPoint'
import { CloudData } from './types'

async function getData(): Promise<CloudData> {
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
  const {
    title,
    description,
    ctaButton,
    cloudProviders,
    videoGif,
    backgroundSvg
  } = hero

  return (
    <>
      <div className='bg-hero pt-10'>
        <div className='relative'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-20 md:px-8 2xl:px-0'>
            <div data-aos='fade-up' className='flex'>
              <div className='w-11/12 mx-auto md:w-6/12 md:mt-16 flex-col text-center md:text-left'>
                <SuiTitle type='h1' size='6xl'>
                  <Markdown>{title}</Markdown>
                </SuiTitle>
                <SuiText
                  size='base'
                  color='secondary'
                  weight='medium'
                  className='mt-6 md:max-w-lg md:pr-4'>
                  {description}
                </SuiText>
                <div className='flex flex-col mt-8'>
                  {ctaButton && (
                    <div className='flex justify-center md:justify-start'>
                      <SuiButton
                        type='primary'
                        path={ctaButton.href}
                        target={ctaButton.target}>
                        {ctaButton.text}
                      </SuiButton>
                    </div>
                  )}
                  <div className='flex space-x-6 justify-center md:justify-start mt-6'>
                    {cloudProviders.map((cloudProvider) => (
                      <div className='flex flex-col' key={cloudProvider.title}>
                        <SuiText
                          size='xs'
                          weight='bold'
                          color='secondary'
                          className='mb-5'>
                          {cloudProvider.title}
                        </SuiText>
                        <div className='flex flex-row items-start gap-6 h-8'>
                          {cloudProvider.lightProviderPngs.map(
                            (lightIconPng, index: number) => (
                              <StrapiPicture
                                key={`${cloudProvider.title}-${index}`}
                                dark={cloudProvider.darkProviderPngs[index]}
                                light={lightIconPng}
                                height={40}
                                className='max-h-8 w-auto'
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
                  <div className='mt-20 relative'>
                    <StrapiImage
                      {...videoGif}
                      alt='ClickHouse demo'
                      width={748}
                      height={428}
                      className='rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute right-0 top-0 bottom-16 lg:bottom-30 object-fill text-c2 z-[-1] w-auto'>
            <StrapiImage
              {...backgroundSvg}
              alt='ClickHouse demo'
              className='bg-transparent w-full h-full'
            />
          </div>
          <div className='w-full mx-auto bg-strain_background bg-cover h-24 md:h-40 -mt-12 bg-no-repeat 2xl:h-52' />
        </div>
      </div>
      <div className='bg-c3 text-c1-light'>
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

      <div className='flex w-full bg-c2 text-c5 pb-12 gap-y-4 md:gap-y-28'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0 gap-y-24'>
          {screenshotsAndBullets.map((item, index: number) => (
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } justify-between`}
              key={item.title}>
              <div className='flex flex-col text-left md:w-2/5'>
                <SuiTitle type='h2' className='mb-4'>
                  {item.title}
                </SuiTitle>
                <SuiText
                  size='base'
                  weight='medium'
                  color='secondary'
                  className='mb-8'>
                  {item.description}
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
                  {...item.screenshotPng}
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
