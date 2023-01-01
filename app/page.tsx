import Image from 'next/image'

import {
  SuiButton,
  SuiLink,
  SuiPanel,
  SuiText,
  SuiTitle
} from '../components/sui'
import { FeatureItem } from '../components/feature_item'
import { findOne } from '../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../components/StrapiElements'
import Link from 'next/link'
import BulletPoint from '../components/BulletPoint'
import mainImage from '../public/images/sql_console_hero.png'
import GetStarted from '../components/GetStarted'

async function getData() {
  const params = {
    populate: [
      'hero',
      'hero.ctaButton',
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
      <div className='md:bg-no-repeat bg-right bg-opacity-100 overflow-hidden'>
        <div className='flex mx-auto flex-col lg:flex-row lg:items-stretch pb-20 lg:pb-44 pt-28 px-8 2xl:px-0 relative gap-24 justify-center'>
          <div
            data-aos='fade-up'
            className='flex w-full lg:w-3/5 max-w-screen-sm mx-auto lg:mx-0'>
            <div className=' mx-auto md:mr-0 md:mt-8 flex-col text-center lg:text-left'>
              <SuiTitle type='h1' size='6xl' color='primary'>
                {hero.title}
              </SuiTitle>
              <div className='flex flex-row'>
                <div className='mt-6 max-w-3xl flex flex-col'>
                  <SuiText
                    size='base'
                    color='secondary'
                    weight='normal'
                    className='text-left mb-10'>
                    {hero.description}
                  </SuiText>
                  {hero.ctaButton && (
                    <SuiButton
                      type='primary'
                      path={hero.ctaButton.href}
                      className='mr-auto'>
                      {hero.ctaButton.text}
                    </SuiButton>
                  )}

                  {!hero.ctaButton && hero.advancedCallout && (
                    <div className='flex rounded-lg p-8 bg-onyx mt-11 max-w-screen-sm flex-col gap-4 text-center shadow-md md:w-full md:px-8 md:box-border md:max-w-none'>
                      <div className='md:pr-8 border-0 md:border-r-1 border-solid border-c4'>
                        <SuiText size='base' weight='bold' className='mb-1'>
                          {hero.advancedCallout.title}
                        </SuiText>
                        <SuiText size='base' weight='normal' color='secondary'>
                          {hero.advancedCallout.description}
                        </SuiText>
                      </div>
                      <div className='flex grow items-center justify-center md:pl-8'>
                        <SuiButton
                          type='primary'
                          path={hero.advancedCallout.href}
                          size='sm'
                          target={hero.advancedCallout.target}
                          className='w-auto'>
                          {hero.advancedCallout.title}
                        </SuiButton>
                      </div>
                    </div>
                  )}
                  <SuiText
                    size='sm'
                    weight='normal'
                    color='secondary'
                    className='mt-3'>
                    {hero.ctaButtonSubtext}
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
          <div className='heroScreenshotBg'>
            <Image
              src={mainImage}
              alt='HomePage Image'
              className='heroScreenshot'
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row container mx-auto justify-evenly max-w-7xl px-8 2xl:px-0 mb-16 divide-y-2 md:divide-y-0 md:divide-x-2'>
          {hero.highlights.map((highlight) => (
            <SuiPanel
              key={highlight.title}
              className='w-full md:w-1/3'
              padding='lg'
              color='empty'>
              <div className='flex flex-col text-center justify-between h-full'>
                <h3 className='text-xl font-bold text-center px-6'>
                  {highlight.title}
                </h3>
                <div className='bg-c6 h-1 w-16 rounded-md flex mx-auto my-4' />
                <SuiText size='sm' weight='normal' className='mb-4'>
                  {highlight.description}
                </SuiText>
                <div>
                  <SuiButton
                    iconRight
                    size='lg'
                    path={highlight.href}
                    type='empty'
                    color='primary'
                    target={highlight.target}>
                    {highlight.buttonText}
                  </SuiButton>
                </div>
              </div>
            </SuiPanel>
          ))}
        </div>
      </div>
      <div className='w-full flex flex-col section-dark'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat pb-8 px-8 2xl:px-0 pt-16'>
          <SuiTitle type='h3' className='mb-7' color='c6'>
            {aboutClickhouse.title}
          </SuiTitle>
          <div className='feature-container'>
            {aboutClickhouse.features.map((feature) => (
              <FeatureItem
                key={feature.iconSvg.hash}
                icon={feature.iconSvg}
                title={feature.title}
                description={feature.description}
                delay={100}
              />
            ))}
          </div>
          {aboutClickhouse.allFeaturesButton.text && (
            <div className='flex text-center justify-center pt-16'>
              <SuiButton
                type='empty'
                color='primary'
                iconRight
                path={aboutClickhouse.allFeaturesButton.href}
                target={aboutClickhouse.allFeaturesButton.target}
                size='lg'>
                {aboutClickhouse.allFeaturesButton.text}
              </SuiButton>
            </div>
          )}
        </div>
      </div>

      <div className='flex w-full container-light-color'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 xl:px-0'>
          <SuiTitle type='h2' className='mb-4'>
            {customerStories.title}
          </SuiTitle>
          <SuiText size='base' weight='medium' color='secondary'>
            {customerStories.description}
          </SuiText>

          <div className='container pt-12 flex flex-col sm:flex-row flex-wrap lg:grid lg:grid-cols-5 gap-4 md:gap-x-8 self-center items-center justify-center'>
            {customerStories.logos.map((logo) => (
              <Link key={logo.href} href={logo.href} target={logo.target}>
                <div className='flex w-full sm:w-52 lg:w-full h-24 bg-white rounded-lg py-6 justify-center hover:shadow-xl ease-in-out duration-200 cursor-pointer'>
                  <StrapiPicture
                    light={logo?.lightLogoPng}
                    dark={logo?.darkLogoPng}
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className='flex text-center justify-center pt-16'>
            <div>
              <SuiButton
                iconRight
                path={customerStories.ctaButton.href}
                target={customerStories.ctaButton.target}
                type='empty'
                color='primary'
                size='lg'>
                {customerStories.ctaButton.text}
              </SuiButton>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-white dark:bg-gunmetal pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
          <SuiTitle type='h4' color='c6' className='mb-2'>
            {clickhouseCloud.pretitle}
          </SuiTitle>
          <SuiTitle type='h2'>{clickhouseCloud.title}</SuiTitle>

          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='max-w-5xl flex self-center mt-2'>
            {clickhouseCloud.description}
          </SuiText>

          {clickhouseCloudItems.map((clickhouseCloudItem, index: number) => (
            <div
              className={`flex flex-col pt-16 justify-between self-center max-w-screen-xl ${
                index % 2 !== 0 ? ' md:flex-row-reverse' : ' md:flex-row'
              }`}
              key={clickhouseCloudItem.title}>
              <div className='flex flex-col text-center md:text-left md:w-2/5 pb-4 md:pb-0'>
                <SuiTitle type='h3' className='mb-4'>
                  {clickhouseCloudItem.title}
                </SuiTitle>
                <SuiText
                  size='base'
                  weight='medium'
                  color='secondary'
                  className='mb-4'>
                  {clickhouseCloudItem.description}
                </SuiText>
                <div className='pl-10 md:pl-0'>
                  {clickhouseCloudItem.bullets.map((bullet) => (
                    <BulletPoint key={bullet.text} text={bullet.text} />
                  ))}
                </div>
              </div>
              {clickhouseCloudItem.screenshotPng && (
                <div className='flex md:w-1/2 justify-center pt-4 items-center'>
                  <StrapiImage
                    {...clickhouseCloudItem.screenshotPng}
                    alt='ClickHouse Cloud is coming'
                    sizes='large'
                    className='h-fit w-full object-contain'
                  />
                </div>
              )}
            </div>
          ))}

          <div className='flex flex-col gap-4 md:flex-row md:gap-x-8 justify-center pt-16'>
            {clickhouseCloud.primaryButton && (
              <div className='w-full md:w-48'>
                <SuiButton
                  type='primary'
                  path={clickhouseCloud.primaryButton.href}
                  target={clickhouseCloud.primaryButton.target}
                  className='w-full'>
                  {clickhouseCloud.primaryButton.text}
                </SuiButton>
              </div>
            )}
            {clickhouseCloud.secondaryButton && (
              <div className='w-full md:w-48'>
                <SuiButton
                  type='secondary'
                  path={clickhouseCloud.secondaryButton.href}
                  target={clickhouseCloud.secondaryButton.target}
                  className='w-full'>
                  {clickhouseCloud.secondaryButton.text}
                </SuiButton>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex w-full container-light-color'>
        <div className='flex container mx-auto flex-col max-w-4xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 2xl:px-0 items-center'>
          <SuiTitle color='c6' type='h4' className='mb-2'>
            {testimonials.pretitle}
          </SuiTitle>
          <SuiTitle type='h2' className='mb-2'>
            {testimonials.title}
          </SuiTitle>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mb-4'>
            {testimonials.description}
          </SuiText>
          {testimonials.testimonialsIconSvg && (
            <div className='flex justify-center mb-4'>
              <StrapiImage {...testimonials.testimonialsIconSvg} />
            </div>
          )}
          {testimonials.testimonialItems.map((testimonial) => (
            <div key={testimonial.id} className='mb-4'>
              <SuiLink
                href={testimonial.href}
                target={testimonial.target}
                color='primary'
                size='lg'
                weight='bold'>
                {testimonial.title}
              </SuiLink>
              <SuiText size='base' weight='medium' color='secondary'>
                {testimonial.author}
              </SuiText>
            </div>
          ))}
          <StrapiImage
            {...testimonials.bottomIconSvg}
            className='text-c6'
            width='24'
            height='24'
          />
        </div>
      </div>
      <GetStarted />
    </>
  )
}

HomePage
