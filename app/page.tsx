import Image from 'next/image'

import {
  SuiButton,
  SuiLink,
  SuiPanel,
  SuiSpacer,
  SuiText,
  SuiTitle
} from '../components/sui'
import { FeatureItem } from '../components/feature_item'
import { CompanyCard } from '../components/company_card'
import { LogoEbay } from '../components/icons/logo_ebay'
import { LogoUber } from '../components/icons/logo_uber'
import { LogoSpotify } from '../components/icons/logo_spotify'
import { LogoCloudflare } from '../components/icons/logo_cloudflare'
import { LogoDeutche } from '../components/icons/logo_deutche_bank'
import { findOne } from '../lib/api/strapi'
import { StrapiImage, StrapiSvg } from '../components/StrapiElements'
import '../styles/HomePage.module.scss'

async function getData() {
  const params = {
    populate: [
      'hero',
      'hero.ctaButton',
      'hero.darkBackgroundIcon',
      'hero.lightBackgroundIcon',
      'hero.advancedCallout',
      'hero.highlights',
      'aboutClickhouse',
      'aboutClickhouse.features',
      'aboutClickhouse.features.iconSvg',
      'aboutClickhouse.allFeaturesButton',
      'customerStories',
      'customerStories.logos',
      'customerStories.logos.darkLogoPng',
      'customerStories.logos.lightLogoPng',
      'customerStories.ctaButton',
      'clickhouseCloud',
      'clickhouseCloud.primaryButton',
      'clickhouseCloud.secondaryButton',
      'clickhouseCloudItems',
      'clickhouseCloudItems.bullets',
      'clickhouseCloudItems.screenshotPng',
      'testimonials',
      'testimonials.testimonialsIconSvg',
      'testimonials.bottomIconSvg',
      'testimonials.testimonialItems'
    ]
  }
  const data = await findOne('homepage', params)

  return data
}

export default async function HomePage() {
  const {
    hero,
    aboutClickhouse,
    customerStories,
    clickhouseCloud,
    clickhouseCloudItems,
    testimonials
  } = await getData()

  return (
    <>
      <div className='bg-hero_background dark:bg-dark_hero_background bg-cover pt-10'>
        <div className='md:bg-no-repeat bg-mountain_background dark:bg-dark_mountain_background bg-right bg-opacity-100'>
          <div className='flex container mx-auto flex-col max-w-7xl pb-60 px-8 2xl:px-0'>
            <div data-aos='fade-up' className='flex'>
              <div className='max-w-screen-md mx-auto md:mt-8 flex-col text-center'>
                <SuiTitle size='max' color='darkest'>
                  <h1>{hero.title}</h1>
                </SuiTitle>

                <div className='mt-6 max-w-3xl flex flex-col justify-center self-center'>
                  <SuiText size='lg' color='dark' weight='normal'>
                    <p>{hero.description}</p>
                  </SuiText>
                  {hero.ctaButton && (
                    <SuiButton
                      path={hero.ctaButton.href}
                      size='md'
                      title={hero.ctaButton.text}
                    />
                  )}

                  {!hero.ctaButton && hero.advancedCallout && (
                    <div className='advanced_cta grid grid-cols-3 max-w-screen-sm mx-auto'>
                      <div className='info_container col-span-2'>
                        <div className='cta_title'>
                          {hero.advancedCallout.title}
                        </div>
                        <div className='cta_description'>
                          {hero.advancedCallout.description}
                        </div>
                      </div>
                      <div className='button_container'>
                        <SuiButton
                          path={hero.advancedCallout.href}
                          size='sm'
                          title={hero.advancedCallout.title}
                          target={hero.advancedCallout.target}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col bg-web-light-c3 dark:bg-web-dark-c3'>
        <div className='flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8 lg:space-x-20 -mt-32 container mx-auto justify-evenly max-w-7xl px-8 2xl:px-0'>
          {hero.highlights.map((highlight) => (
            <SuiPanel
              key={highlight.title}
              className='md:w-80 hover:bg-light-grey2 duration-300 ease-in-out hover:shadow-xl'
              color='bg-web-light-c2 dark:bg-web-dark-c2'
              shadow
              border
              padding='lg'>
              <div className='flex flex-col text-center'>
                <SuiTitle size='md'>
                  <h3>{highlight.title}</h3>
                </SuiTitle>
                <div className='bg-primary h-1 w-16 rounded-md flex mx-auto my-4' />
                <SuiText>
                  <p>{highlight.description}</p>
                </SuiText>
                <SuiSpacer />
                <div>
                  <SuiButton
                    iconRight
                    path={highlight.href}
                    color='empty'
                    title={highlight.buttonText}
                    target={highlight.target}
                    size='md'
                  />
                </div>
              </div>
            </SuiPanel>
          ))}
        </div>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat pb-8 px-8 2xl:px-0 pt-16'>
          <SuiTitle size='sm' color='primary' dark_color='primary'>
            {aboutClickhouse.title}
          </SuiTitle>

          <SuiSpacer size='lg' />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 md:space-y-0 gap-y-10 gap-x-12'>
            {aboutClickhouse.features.map((feature) => (
              <FeatureItem
                key={feature.iconSvg.hash}
                icon={
                  <StrapiSvg
                    url={feature.iconSvg.data.attributes.url}
                    className='feature-icon'
                  />
                }
                title={feature.title}
                description={feature.description}
                delay={100}
                invert
              />
            ))}
          </div>
          {aboutClickhouse.allFeaturesButton.text && (
            <div className='flex text-center justify-center pt-16'>
              <SuiButton
                iconRight
                path={aboutClickhouse.allFeaturesButton.href}
                target={aboutClickhouse.allFeaturesButton.target}
                color='dark'
                title={aboutClickhouse.allFeaturesButton.text}
                size='lg'
              />
            </div>
          )}
        </div>
      </div>

      <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 xl:px-0'>
          <SuiTitle size='xl'>
            <h3>{customerStories.title}</h3>
          </SuiTitle>
          <SuiText size='lg' color='dark' weight='normal'>
            <p>{customerStories.description}</p>
          </SuiText>

          <div className='pt-12 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 self-center'>
            <CompanyCard path='/customer-stories/' image={<LogoEbay />} />
            <CompanyCard path='/customer-stories/' image={<LogoUber />} />
            <CompanyCard path='/customer-stories/' image={<LogoSpotify />} />
            <CompanyCard path='/customer-stories/' image={<LogoCloudflare />} />
            <CompanyCard path='/customer-stories/' image={<LogoDeutche />} />
          </div>

          <div className='flex text-center justify-center pt-16'>
            <div>
              <SuiButton
                iconRight
                path='/clickhouse/'
                color='empty'
                textColor='darkest'
                title='Read customer stories'
                size='lg'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
          <SuiTitle size='sm' color='primary' dark_color='primary'>
            {clickhouseCloud.pretitle}
          </SuiTitle>
          <SuiSpacer size='sm' />
          <SuiTitle size='xl'>
            <h3>{clickhouseCloud.title}</h3>
          </SuiTitle>

          <div className='max-w-5xl flex self-center mt-2'>
            <SuiText size='lg' color='dark' weight='normal'>
              <p>{clickhouseCloud.description}</p>
            </SuiText>
          </div>

          {clickhouseCloudItems.map((clickhouseCloudItem, index) => (
            <div
              className={`flex flex-col pt-16 justify-between self-center max-w-screen-xl ${
                index % 2 !== 0 ? ' md:flex-row-reverse' : ' md:flex-row'
              }`}
              key={clickhouseCloudItem.title}>
              <div className='flex flex-col text-center md:text-left md:w-2/5 pb-4 md:pb-0'>
                <SuiTitle size='lg'>{clickhouseCloudItem.title}</SuiTitle>
                <SuiSpacer size='md' />
                <SuiText size='lg' color='dark'>
                  <p>{clickhouseCloudItem.description}</p>
                </SuiText>
                <SuiSpacer size='md' />
                <div className='pl-10 md:pl-0'>
                  {clickhouseCloudItem.bullets.map((bullet) => (
                    <div className='flex space-x-4 pb-2' key={bullet.text}>
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
              </div>
              <div className='flex md:w-1/2 justify-center pt-4'>
                <StrapiImage
                  src={clickhouseCloudItem.screenshotPng.data.attributes}
                  alt='ClickHouse Cloud is coming'
                  size='large'
                />
              </div>
            </div>
          ))}

          <div className='flex flex-col gap-4 md:flex-row md:space-x-8 justify-center pt-16'>
            {clickhouseCloud.primaryButton && (
              <div className='w-full md:w-48'>
                <SuiButton
                  color='primary'
                  textColor='text-text-lightest'
                  borderColor='border-primary'
                  title={clickhouseCloud.primaryButton.text}
                  path={clickhouseCloud.primaryButton.href}
                  target={clickhouseCloud.primaryButton.target}
                />
              </div>
            )}
            {clickhouseCloud.secondaryButton && (
              <div className='w-full md:w-48'>
                <SuiButton
                  color='warning'
                  textColor='text-text-darkest'
                  title={clickhouseCloud.secondaryButton.text}
                  path={clickhouseCloud.secondaryButton.href}
                  target={clickhouseCloud.secondaryButton.target}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2'>
        <div className='flex container mx-auto flex-col max-w-4xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 2xl:px-0'>
          <SuiTitle size='sm' color='primary'>
            <h5>{testimonials.pretitle}</h5>
          </SuiTitle>
          <SuiSpacer size='sm' />
          <SuiTitle size='xl'>
            <h3>{testimonials.title}</h3>
          </SuiTitle>
          <SuiSpacer size='sm' />
          <SuiText size='lg' color='dark'>
            <p>{testimonials.description}</p>
          </SuiText>
          <SuiSpacer size='md' />
          <div className='flex justify-center'>
            {await StrapiSvg({
              url: testimonials.testimonialsIconSvg.data.attributes.url
            })}
          </div>
          <SuiSpacer size='md' />
          {testimonials.testimonialItems.map((testimonial) => (
            <>
              <SuiText size='md' weight='medium' color='dark'>
                <p>
                  <SuiLink
                    href={testimonial.href}
                    target={testimonial.target}
                    size='sm'
                    color='darkest'>
                    {testimonial.title}
                  </SuiLink>
                  <br />
                  {testimonial.author}
                </p>
              </SuiText>

              <SuiSpacer size='md' />
            </>
          ))}
          <Image
            src='/homepage/new/icon_star.svg'
            alt='Experts'
            width='32'
            height='32'
          />
        </div>
      </div>
    </>
  )
}

HomePage
