import GitHubButton from 'react-github-btn'

import {
  SuiButton,
  SuiLink,
  SuiPanel,
  SuiText,
  SuiTitle
} from '../components/sui'
import { findOne } from '../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../components/StrapiElements'
import Link from 'next/link'
import BulletPoint from '../components/BulletPoint'
import GetStarted from '../components/GetStarted'
import { HomePageProps } from '../types/homepage'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { getCommonProps } from '../lib/utils/getCommonProps'
import FAQ from '../components/FAQ'
import { BasicCard, CUIButton } from '../components/ClickUI'
import LaptopSvg from '../components/icons/LaptopSvg'

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
  customerStories,
  testimonials,
  seo,
  headerData,
  footerData,
  getStartedData
}: HomePageProps) {
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='homepage  bg-right bg-opacity-100 overflow-hidden'>
        <div className='bg-grid flex flex-col pb-20 lg:pb-44 pt-16 md:pt-28 px-8 2xl:px-0 relative gap-24 justify-center '>
          <div className='flex flex-col w-full mx-auto max-w-3xl'>
            <div className='mx-auto md:mr-0 md:mt-8 flex-col items-center justify-center'>
              <div className='mx-auto'>
                <GitHubButton
                  href='https://github.com/Clickhouse/Clickhouse'
                  data-color-scheme='dark'
                  data-size='large'
                  data-show-count='true'
                  aria-label='Star Clickhouse/Clickhouse on GitHub'
                />
              </div>
              <SuiTitle
                type='h1'
                className='md:!text-5.5xl text-center'
                color='primary'>
                Query{' '}
                <span className='tilted tilted-yellow'>
                  <span className='tilted-content'>BILLIONS</span>
                </span>{' '}
                of rows in less than a second
              </SuiTitle>
              <div className='mx-auto lg:ml-0 mt-6 flex flex-col items-center'>
                <SuiText
                  size='base'
                  color='secondary'
                  weight='normal'
                  className='text-center lg:text-left mb-10'>
                  ClickHouse is the fastest open-source data warehouse for low
                  latency apps and analytics
                </SuiText>
                <div className='flex flex-col md:flex-row gap-6 w-full justify-center items-center'>
                  <CUIButton
                    type='primary'
                    size='lg'
                    weight='semibold'
                    href={hero.ctaButton.href}
                    segmentEvent={{
                      label: hero.ctaButton.text,
                      category: 'website-hero'
                    }}
                    linkClass='w-full max-w-[14rem]'
                    className='w-full'>
                    Start free trial
                  </CUIButton>
                  <CUIButton
                    type='secondary'
                    weight='semibold'
                    size='lg'
                    href='/docs'
                    segmentEvent={{
                      label: hero.ctaButton.text,
                      category: 'website-hero'
                    }}
                    linkClass='w-full max-w-[14rem]'
                    className='w-full'>
                    View documentation
                  </CUIButton>
                </div>
                <SuiLink
                  href='\clickhouse'
                  target='_self'
                  color='primary'
                  className='mt-6'
                  weight='bold'>
                  Or download open-source ClickHouse
                </SuiLink>
              </div>
            </div>
          </div>
        </div>
        <div className='heroScreenshotBg'>
          <div className='code-data'>code data</div>
        </div>
        <div className='bg-primary py-16'>
          <div className='max-w-3xl mx-auto'>
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
            <CUIButton type='secondary' className='pl-10 md:pl-0'>
              Find out more
            </CUIButton>
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
      <div className='w-full flex flex-col bg-primary text-primary-800'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat pb-8 px-8 2xl:px-0 pt-16'>
          <SuiTitle
            type='h2'
            className='mb-7 max-w-3xl mx-auto !text-primary-800'
            color='c6'>
            The data warehouse you can run on your{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content'>laptop</span>
            </span>{' '}
            and in your{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content'>data center</span>
            </span>
          </SuiTitle>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mb-8'>
            Unlike traditional closed-source data warehouses, ClickHouse runs on
            every environment, whether it’s on your machine or on the cloud
          </SuiText>
          <div className='container grid grid-cols-1 md:grid-cols-3 gap-10'>
            <BasicCard
              icon={<LaptopSvg />}
              title='clickhouse-local'
              btnChildren='Download clickHouse-local'
              href='/'
              className='w-full'>
              Run fast queries on local files (CSV, TSV, Parquet, and more)
              without a server.
            </BasicCard>
            <BasicCard
              icon={<LaptopSvg />}
              title='ClickHouse'
              btnChildren='Download clickHouse'
              href='/'
              className='w-full'>
              Spin up a database server with open-source ClickHouse. Always
              Free.
            </BasicCard>
            <BasicCard
              icon={<LaptopSvg />}
              title='ClickHouse Cloud'
              pretitle='Recommended'
              btnChildren='Deploy in seconds'
              href='/'
              className='w-full'>
              Deploy a fully managed ClickHouse service on AWS and GCP.
            </BasicCard>
          </div>
        </div>
      </div>

      <div className='flex w-full text-neutral-0'>
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
              <CUIButton
                iconRight
                href={customerStories.ctaButton.href}
                target={customerStories.ctaButton.target}
                weight='normal'
                type='secondary'
                size='lg'>
                View all supported integrations
              </CUIButton>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full bg-base-color text-primary-800'>
        <div className='flex container mx-auto flex-col max-w-4xl md:bg-no-repeat bg-opacity-10 py-16 text-center px-8 2xl:px-0 items-center'>
          <SuiTitle type='h2' weight='bold' className='mb-4'>
            <span className='tilted tilted-black'>
              <span className='tilted-content'>Simple</span>
            </span>{' '}
            SQL
          </SuiTitle>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mb-6'>
            ClickHouse supports a superset of ANSI SQL with thousands of helper
            functions to make your analytics queries easy to write and read.
            Whether you know Postgres, MySQL, Snowflake or other SQL variants,
            you’ll find ClickHouse familiar to use.
          </SuiText>
          <div className='flex flex-col md:flex-row gap-8'>
            <StrapiImage
              {...testimonials.bottomIconSvg}
              className='text-c6'
              width={24}
              height={24}
            />
            <StrapiImage
              {...testimonials.bottomIconSvg}
              className='text-c6'
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <GetStarted {...getStartedData} />
      <FAQ />
    </Layout>
  )
}
