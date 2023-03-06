import GitHubButton from 'react-github-btn'

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
import GetStarted from '../components/GetStarted'
import { HomePageProps } from '../types/homepage'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { getCommonProps } from '../lib/utils/getCommonProps'

export const getStaticProps: GetStaticProps<HomePageProps> =
  async function getStaticProps() {
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
        'testimonials.testimonialItems',
        'seo',
        'seo.image'
      ]
    }

    const commonProps = await getCommonProps()
    const data = await findOne('homepage', params)

    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function HomePage({
  hero,
  aboutClickhouse,
  customerStories,
  clickhouseCloud,
  clickhouseCloudItems,
  testimonials,
  seo,
  headerData,
  footerData,
  getStartedData
}: HomePageProps) {
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='homepage bg-hero md:bg-no-repeat bg-right bg-opacity-100 overflow-hidden'>
        <div className='flex mx-auto flex-col pb-20 lg:pb-44 pt-16 md:pt-28 px-8 2xl:px-0 relative gap-24 justify-center max-w-7xl'>
          <div className='flex flex-col w-full mx-auto lg:mx-0'>
            <div className='mx-auto md:mr-0 md:mt-8 flex-col text-center lg:text-left'>
              <div>
                <GitHubButton
                  href='https://github.com/Clickhouse/Clickhouse'
                  data-color-scheme='dark'
                  data-size='large'
                  data-show-count='true'
                  aria-label='Star Clickhouse/Clickhouse on GitHub'
                />
              </div>
              <SuiTitle type='h1' className='md:!text-5.5xl' color='primary'>
                Query <span>BILLIONS</span> of rows in less than a second
              </SuiTitle>
              <div className='mx-auto lg:ml-0 mt-6 flex flex-col'>
                <SuiText
                  size='base'
                  color='secondary'
                  weight='normal'
                  className='text-center lg:text-left mb-10'>
                  {`ClickHouse is the fastest open-source data warehouse for low latency apps and analytics`}
                </SuiText>
                <div>
                  <SuiButton
                    type='primary'
                    path={hero.ctaButton.href}
                    segmentEvent={{
                      label: hero.ctaButton.text,
                      category: 'website-hero'
                    }}
                    className='mr-auto'>
                    Start free trial
                  </SuiButton>
                  <SuiButton
                    type='secondary'
                    path={hero.ctaButton.href}
                    segmentEvent={{
                      label: hero.ctaButton.text,
                      category: 'website-hero'
                    }}
                    className='mr-auto'>
                    View documentation
                  </SuiButton>
                </div>
                <SuiLink
                  href='\clickhouse'
                  target='_self'
                  color='primary'
                  size='lg'
                  weight='bold'>
                  Or download open-source ClickHouse
                </SuiLink>
              </div>
            </div>
          </div>
          <div className='heroScreenshotBg'>image</div>
        </div>
        <SuiText size='base' weight='medium' color='secondary'>
          Trusted by the best developers that work with data at scale
        </SuiText>

        <div className='container pt-6 flex flex-col sm:flex-row flex-wrap lg:grid lg:grid-cols-5 gap-4 md:gap-x-8 self-center items-center justify-center'>
          {customerStories.logos.map((logo, index: number) => (
            <Link
              key={logo.href}
              href={logo.href}
              target={logo.target}
              className={`customer-stories-${index} flex w-full sm:w-52 lg:w-full rounded-lg py-6 justify-center hover:shadow-xl ease-in-out duration-200 cursor-pointer`}>
              <StrapiPicture
                light={logo?.lightLogoPng}
                dark={logo?.darkLogoPng}
                className='w-auto h-10 grayscale'
              />
            </Link>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-y-28 mt-24'>
        <div className='flex flex-col justify-between self-center max-w-screen-xl w-full md:flex-row-reverse'>
          <div className='flex flex-col text-center md:text-left md:w-2/5 pb-4 md:pb-0'>
            <SuiTitle type='h3' className='!text-3xl mb-3'>
              Stop waiting for dashboards and queries to load
            </SuiTitle>
            <SuiText
              size='base'
              weight='medium'
              color='secondary'
              className='mb-8'>
              Traditional databases and data warehouses take minutes or hours to
              run your queries. ClickHouse is designed for speed. With
              ClickHouse, your can query terabytes of data in a few seconds (or
              less).
            </SuiText>
            <div className='pl-10 md:pl-0'>Find out more</div>
          </div>
          <div className='flex md:w-1/2 justify-center pt-4 items-center'>
            {/* <StrapiImage
                  {...clickhouseCloudItem.screenshotPng}
                  alt='ClickHouse Cloud is coming'
                  sizes='large'
                  className='h-fit w-full object-contain shadow-card'
                /> */}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-28 mt-24'>
        <div className='flex flex-col justify-between self-center max-w-screen-xl w-full md:flex-row'>
          <div className='flex flex-col text-center md:text-left md:w-2/5 pb-4 md:pb-0'>
            <SuiTitle type='h3' className='!text-3xl mb-3'>
              Why is ClickHouse so fast?
            </SuiTitle>
            <SuiText
              size='base'
              weight='medium'
              color='secondary'
              className='mb-8'>
              Column-oriented databases are better suited to OLAP scenarios.
              They are at least 100 times faster in processing most queries.
              ClickHouse uses all available system resources to their full
              potential to process each analytical query as fast as possible.
            </SuiText>
          </div>
          <div className='flex md:w-1/2 justify-center pt-4 items-center'>
            {/* <StrapiImage
                  {...clickhouseCloudItem.screenshotPng}
                  alt='ClickHouse Cloud is coming'
                  sizes='large'
                  className='h-fit w-full object-contain shadow-card'
                /> */}
          </div>
          <div>Image2</div>
          <div className='pl-10 md:pl-0'>Read more in the docs</div>
        </div>
      </div>
      <div className='w-full flex flex-col bg-c3 text-c1-light'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat pb-8 px-8 2xl:px-0 pt-16'>
          <SuiTitle type='h3' className='mb-7 !text-lg' color='c6'>
            The data warehouse you can run on your laptop and in your data
            center
          </SuiTitle>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mb-8'>
            Unlike traditional closed-source data warehouses, ClickHouse runs on
            every environment, whether it’s on your machine or on the cloud
          </SuiText>
          <div className='container flex flex-wrap'>
            <SuiPanel className='w-full md:w-1/3' padding='lg' color='empty'>
              <div className='flex flex-col text-center justify-between h-full'>
                <div>
                  <h3 className='text-xl font-bold text-center'>
                    clickhouse-local
                  </h3>
                  <div className='bg-c6 h-1 w-20 rounded-md flex mx-auto my-4' />
                </div>
                <SuiText size='sm' weight='normal' className='mb-4'>
                  Run fast queries on local files (CSV, TSV, Parquet, and more)
                  without a server.
                </SuiText>
                <div>
                  <SuiButton
                    iconRight
                    size='lg'
                    path='/'
                    type='primary'
                    weight='medium'
                    target='_self'>
                    Download clickHouse-local
                  </SuiButton>
                </div>
              </div>
            </SuiPanel>
            <SuiPanel className='w-full md:w-1/3' padding='lg' color='empty'>
              <div className='flex flex-col text-center justify-between h-full'>
                <div>
                  <h3 className='text-xl font-bold text-center'>ClickHouse</h3>
                  <div className='bg-c6 h-1 w-20 rounded-md flex mx-auto my-4' />
                </div>
                <SuiText size='sm' weight='normal' className='mb-4'>
                  Spin up a database server with open-source ClickHouse. Always
                  Free.
                </SuiText>
                <div>
                  <SuiButton
                    iconRight
                    size='lg'
                    path='/'
                    type='primary'
                    weight='medium'
                    target='_self'>
                    Download ClickHouse
                  </SuiButton>
                </div>
              </div>
            </SuiPanel>
            <SuiPanel className='w-full md:w-1/3' padding='lg' color='empty'>
              <div className='flex flex-col text-center justify-between h-full'>
                <div>
                  <h3 className='text-xl font-bold text-center'>
                    ClickHouse Cloud
                  </h3>
                  <div className='bg-c6 h-1 w-20 rounded-md flex mx-auto my-4' />
                </div>
                <SuiText size='sm' weight='normal' className='mb-4'>
                  Deploy a fully managed ClickHouse service on AWS and GCP.
                </SuiText>
                <div>
                  <SuiButton
                    iconRight
                    size='lg'
                    path='/'
                    type='primary'
                    weight='medium'
                    target='_self'>
                    Deploy in seconds
                  </SuiButton>
                </div>
              </div>
            </SuiPanel>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-c2 text-c5'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-16 pb-8 text-center px-8 xl:px-0'>
          <SuiTitle type='h2' className='mb-4'>
            Speed up queries from any data source
          </SuiTitle>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mb-8'>
            ClickHouse supports all the datasources you need to power your apps
            and use cases that require exceptional performance.
          </SuiText>

          <div>Image X</div>
          <div className='flex text-center justify-center pt-16'>
            <div>
              <SuiButton
                iconRight
                path={customerStories.ctaButton.href}
                target={customerStories.ctaButton.target}
                weight='normal'
                type='secondary'
                size='lg'>
                View all supported integrations
              </SuiButton>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-c1 pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 text-center px-8 2xl:px-0'>
          <SuiTitle type='h4' color='c6' weight='bold' className='mb-3'>
            {clickhouseCloud.pretitle}
          </SuiTitle>
          <SuiTitle type='h2' className='mb-4'>
            {clickhouseCloud.title}
          </SuiTitle>

          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='max-w-5xl flex self-center'>
            {clickhouseCloud.description}
          </SuiText>
          <div className='flex flex-col gap-y-28 mt-24'>
            {clickhouseCloudItems.map((clickhouseCloudItem, index: number) => (
              <div
                className={`flex flex-col justify-between self-center max-w-screen-xl w-full ${
                  index % 2 !== 0 ? ' md:flex-row-reverse' : ' md:flex-row'
                }`}
                key={clickhouseCloudItem.title}>
                <div className='flex flex-col text-center md:text-left md:w-2/5 pb-4 md:pb-0'>
                  <SuiTitle type='h3' className='!text-3xl mb-3'>
                    {clickhouseCloudItem.title}
                  </SuiTitle>
                  <SuiText
                    size='base'
                    weight='medium'
                    color='secondary'
                    className='mb-8'>
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
                      className='h-fit w-full object-contain shadow-card'
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className='flex flex-col gap-4 md:flex-row md:gap-x-8 justify-center mt-16'>
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

      <div className='flex w-full bg-c2 text-c5'>
        <div
          className='flex container mx-auto flex-col max-w-4xl md:bg-no-repeat bg-opacity-10 py-16 text-center px-8 2xl:px-0 items-center'
          id='independent-benchmarks'>
          <SuiTitle color='c6' weight='bold' type='h4' className='mb-3'>
            {testimonials.pretitle}
          </SuiTitle>
          <SuiTitle type='h2' weight='bold' className='mb-4'>
            {testimonials.title}
          </SuiTitle>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mb-6'>
            {testimonials.description}
          </SuiText>
          {testimonials.testimonialsIconSvg && (
            <div className='flex justify-center mb-10'>
              <StrapiImage
                {...testimonials.testimonialsIconSvg}
                height={78}
                className='w-auto'
              />
            </div>
          )}
          {testimonials.testimonialItems.map((testimonial) => (
            <div key={testimonial.id} className='mb-6'>
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
            width={24}
            height={24}
          />
        </div>
      </div>
      <GetStarted {...getStartedData} />
    </Layout>
  )
}
