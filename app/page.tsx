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
import { findOne } from '../lib/api/strapi'
import {
  StrapiImage,
  StrapiSvg,
  transformStrapi
} from '../components/StrapiElements'
import styles from './HomePage.module.scss'
import Link from 'next/link'
import BulletPoint from '../components/BulletPoint'
import mainImage from '../public/sql_console_hero.png'
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
        <div className='flex mx-auto flex-col lg:flex-row lg:items-stretch pb-44 pt-28 px-8 2xl:px-0 relative gap-24'>
          <div data-aos='fade-up' className='flex w-full lg:w-3/5'>
            <div className='max-w-screen-md mx-auto md:mt-8 flex-col text-center lg:text-left'>
              <SuiTitle size='max' color='darkest'>
                <h1>{hero.title}</h1>
              </SuiTitle>
              <div className='flex flex-row'>
                <div className='mt-6 max-w-3xl flex flex-col'>
                  <SuiText
                    size='lg'
                    color='dark'
                    weight='normal'
                    className='text-left'>
                    <p>{hero.description}</p>
                  </SuiText>
                  {hero.ctaButton && (
                    <SuiButton
                      path={hero.ctaButton.href}
                      size='md'
                      title={hero.ctaButton.text}
                      className='mr-auto'
                    />
                  )}

                  {!hero.ctaButton && hero.advancedCallout && (
                    <div className={styles.advanced_cta}>
                      <div className={styles.info_container}>
                        <div className={styles.cta_title}>
                          {hero.advancedCallout.title}
                        </div>
                        <div className={styles.cta_description}>
                          {hero.advancedCallout.description}
                        </div>
                      </div>
                      <div className={styles.button_container}>
                        <SuiButton
                          path={hero.advancedCallout.href}
                          size='sm'
                          title={hero.advancedCallout.title}
                          target={hero.advancedCallout.target}
                          className='w-auto'
                        />
                      </div>
                    </div>
                  )}
                  <SuiText>{hero.ctaButtonSubtext}</SuiText>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-full lg:w-2/5 object-fit md:object-contain ${styles.heroScreenshotBg}`}>
            <Image
              src={mainImage}
              alt='HomePage Image'
              className={styles.heroScreenshot}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row container mx-auto justify-evenly max-w-7xl px-8 2xl:px-0 mb-16 divide-y-2 md:divide-y-0 md:divide-x-2'>
          {hero.highlights.map((highlight) => (
            <SuiPanel
              key={highlight.title}
              className='w-full md:w-1/3 duration-300 ease-in-out rounded-none'
              padding='lg'
              color='empty'>
              <div className='flex flex-col text-center justify-between h-full'>
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
      </div>
      <div className='w-full flex flex-col section-dark'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat pb-8 px-8 2xl:px-0 pt-16'>
          <SuiTitle size='sm' color='primary' dark_color='primary'>
            {aboutClickhouse.title}
          </SuiTitle>

          <SuiSpacer size='lg' />
          <div className='feature-container'>
            {aboutClickhouse.features.map((feature) => (
              <FeatureItem
                key={feature.iconSvg.hash}
                icon={feature.iconSvg}
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

      <div className='flex w-full section-light-color'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 xl:px-0'>
          <SuiTitle size='xl'>
            <h3>{customerStories.title}</h3>
          </SuiTitle>
          <SuiText size='lg' color='dark' weight='normal'>
            <p>{customerStories.description}</p>
          </SuiText>

          <div className='container pt-12 flex flex-col sm:flex-row flex-wrap lg:grid lg:grid-cols-5 gap-4 md:gap-x-8 self-center items-center justify-center'>
            {customerStories.logos.map((logo) => {
              const style = {}
              style['--image-url'] = `url(${
                transformStrapi(logo?.lightLogoPng?.data?.attributes)?.src
              })`
              style['--dark-image-url'] = `url(${
                transformStrapi(logo?.darkLogoPng?.data?.attributes)?.src
              })`
              return (
                <Link key={logo.href} href={logo.href} target={logo.target}>
                  <div
                    className={`${styles.companyCard} dark:bg-gunmetal dark:bg-[image:var(--dark-image-url)]`}
                    style={style}
                  />
                </Link>
              )
            })}
          </div>

          <div className='flex text-center justify-center pt-16'>
            <div>
              <SuiButton
                iconRight
                path={customerStories.ctaButton.href}
                target={customerStories.ctaButton.target}
                color='empty'
                textColor='darkest'
                title={customerStories.ctaButton.text}
                size='lg'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-white dark:bg-gunmetal pb-20'>
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
                    <BulletPoint key={bullet.text} text={bullet.text} />
                  ))}
                </div>
              </div>
              {clickhouseCloudItem.screenshotPng.data && (
                <div className='flex md:w-1/2 justify-center pt-4 items-center'>
                  <StrapiImage
                    src={clickhouseCloudItem.screenshotPng.data}
                    alt='ClickHouse Cloud is coming'
                    size='large'
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
                  color='primary'
                  borderColor='border-primary'
                  title={clickhouseCloud.primaryButton.text}
                  path={clickhouseCloud.primaryButton.href}
                  target={clickhouseCloud.primaryButton.target}
                  widthFull
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
                  widthFull
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex w-full section-light-color'>
        <div className='flex container mx-auto flex-col max-w-4xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 2xl:px-0 items-center'>
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
          {testimonials.testimonialsIconSvg && (
            <div className='flex justify-center'>
              {/* @ts-expect-error Server Component */}
              <StrapiSvg src={testimonials.testimonialsIconSvg} />
            </div>
          )}
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
          <StrapiSvg
            src={testimonials.bottomIconSvg}
            className='text-primary'
          />
        </div>
      </div>
      <GetStarted />
    </>
  )
}

HomePage
