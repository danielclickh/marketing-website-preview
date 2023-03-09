import GitHubButton from 'react-github-btn'
import Image from 'next/image'

import { SuiText, SuiTitle } from '../components/sui'
import { findOne } from '../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../components/StrapiElements'
import GetStarted from '../components/GetStarted'
import { HomePageProps } from '../types/homepage'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { getCommonProps } from '../lib/utils/getCommonProps'
import FAQ from '../components/FAQ'
import { CUIBasicCard, CUIButton, CUILink } from '../components/ClickUI'
import LaptopSvg from '../components/icons/LaptopSvg'
import dashboard1 from '../public/images/homepage/dashboard-1.png'
import dashboard2 from '../public/images/homepage/dashboard-2.png'
import dashboard3 from '../public/images/homepage/dashboard-3.png'
import { ChevronRightIcon } from '@heroicons/react/solid'
import TwitterSection from '../components/TwitterSection'
import HomePageTerminal from '../components/Terminal/HomePageTerminal'
import SpeedAnimation from '../components/SpeedAnimation'
import ClickhouseSyntax from '../components/Terminal/ClickhouseSyntax'
import PostgresSyntax from '../components/Terminal/PostgresSyntax'

const pgQuery = `SELECT DISTINCT 
  town, 
  price, 
  street
FROM 
  uk_price_paid
WHERE (town, price) in 
 ( 
  SELECT 
    town, 
    max(price) 
  FROM 
    uk_price_paid 
  GROUP BY town 
  ORDER BY max(price) DESC 
  LIMIT 3 
 )
ORDER BY price DESC


`

export const getStaticProps: GetStaticProps<HomePageProps> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.ctaButton',
        'customerStories',
        'customerStories.logos',
        'customerStories.logos.darkLogoPng',
        'customerStories.logos.lightLogoPng',
        'customerStories.ctaButton',
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
  seo,
  headerData,
  footerData,
  platforms
}: HomePageProps) {
  return (
    <Layout headerData={headerData} footerData={footerData} seo={seo}>
      <div className='homepage bg-primary bg-bottom bg-opacity-100 overflow-hidden'>
        <div className='bg-home-grid bg-primary-800 flex flex-col pb-20 lg:pb-44 pt-16 md:pt-28 px-8 2xl:px-0 relative gap-24 justify-center '>
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
              <div className='mx-auto lg:ml-0 mt-6 flex flex-col items-center max-w-md'>
                <SuiText size='base' color='secondary' weight='normal'>
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
                <CUILink
                  href='/clickhouse'
                  target='_self'
                  className='mt-6 text-neutral-200 underline hover:text-neutral-0'>
                  Or download open-source ClickHouse
                </CUILink>
              </div>
            </div>
          </div>
        </div>
        <div>
          <HomePageTerminal />
        </div>
        <div className=' py-16'>
          <div className='max-w-3xl mx-auto'>
            <div className='text-center mb-10 text-primary-700 sm:border-t-2 sm:border-primary-700 w-fit mx-auto leading-none'>
              Trusted by the best developers that work with data at{' '}
              <span className='tilted tilted-black'>
                <span className='tilted-content'>scale</span>
              </span>
              {/* <span className='bg-primary-700 text-primary'></span> */}
            </div>

            <div className='container pt-6 flex flex-col sm:flex-row flex-wrap lg:grid lg:grid-cols-5 gap-4 md:gap-x-8 self-center items-center justify-center'>
              {customerStories.logos.map((logo, index: number) => (
                <CUILink
                  key={logo.href}
                  href={logo.href}
                  target={logo.target}
                  className={`customer-stories-${index} flex w-full sm:w-52 lg:w-full rounded-lg py-6 justify-center ease-in-out duration-200 cursor-pointer`}>
                  <StrapiPicture
                    light={logo?.lightLogoPng}
                    dark={logo?.darkLogoPng}
                    className='w-auto h-10 grayscale'
                  />
                </CUILink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-28 mt-24'>
        <div className='flex flex-col justify-between self-center max-w-screen-xl w-full md:flex-row'>
          <div className='flex flex-col text-center md:text-left md:w-2/5 pb-4 md:pb-0'>
            <SuiTitle type='h3' className='!text-3xl mb-3'>
              Stop waiting for dashboards and queries to load
            </SuiTitle>
            <SuiText
              size='base'
              weight='medium'
              color='secondary'
              className='mb-8'>
              {`Traditional databases and data warehouses take minutes or hours to run your queries. ClickHouse is designed for speed.

              With ClickHouse, your can query terabytes of data in a few seconds (or less).`}
            </SuiText>
            <CUIButton
              type='secondary'
              className='pl-10 md:pl-0'
              href='/docs'
              iconRight={<ChevronRightIcon className='w-4 h-4' />}>
              Find out more
            </CUIButton>
          </div>
          <div className='flex md:w-1/2 justify-center pt-4 items-center'>
            <Image src={dashboard1} alt='Dashboard Image' priority />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-28 mt-24'>
        <div className='flex flex-col items-center justify-between self-center section-container w-full'>
          <SuiTitle type='h3' className='!text-3xl mb-3'>
            Why is ClickHouse so fast?
          </SuiTitle>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mb-8'>
            Column-oriented databases are better suited to OLAP scenarios. They
            are at least <span className='font-bold'>100x faster</span> in
            processing most queries. ClickHouse uses all available system
            resources to their full potential to process each analytical query
            as fast as possible.
          </SuiText>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center py-16 gap-16'>
            <div>
              <Image src={dashboard2} alt='Dashboard Image Pie' priority />
              <div>Row-oriented databases</div>
              <div>
                In a row-oriented databases, data is stored in rows, with all
                the values related to a row physically stored next to each
                other.
              </div>
            </div>
            <div>
              <Image src={dashboard3} alt='Dashboard Image Bar' priority />
              <div>Column-oriented databases</div>
              <div>
                In a column-oriented databases, like ClickHouse, data is stored
                in columns, with values from the same columns stored together.
              </div>
            </div>
          </div>
          <CUIButton
            type='secondary'
            className='w-auto'
            href='/docs'
            iconRight={<ChevronRightIcon className='w-4 h-4' />}>
            Read more in the docs
          </CUIButton>
        </div>
      </div>
      <div className='w-full flex flex-col bg-datawarehouse-run text-primary-800'>
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
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            <CUIBasicCard
              icon={<LaptopSvg />}
              title='clickhouse-local'
              btnChildren='Download clickHouse-local'
              href='/'
              className='w-full'>
              Run fast queries on local files (CSV, TSV, Parquet, and more)
              without a server.
            </CUIBasicCard>
            <CUIBasicCard
              icon={<LaptopSvg />}
              title='ClickHouse'
              btnChildren='Download clickHouse'
              href='/'
              className='w-full'>
              Spin up a database server with open-source ClickHouse. Always
              Free.
            </CUIBasicCard>
            <CUIBasicCard
              icon={<LaptopSvg />}
              title='ClickHouse Cloud'
              pretitle='Recommended'
              btnChildren='Deploy in seconds'
              href='/'
              className='w-full'>
              Deploy a fully managed ClickHouse service on AWS and GCP.
            </CUIBasicCard>
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

          <SpeedAnimation className='w-full h-fit max-w-full' />
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

      <div className='flex w-full bg-primary text-primary-800'>
        <div className='flex container mx-auto flex-col max-w-4xl md:bg-no-repeat pt-16 pb-32 text-center px-8 2xl:px-0 items-center'>
          <SuiTitle type='h2' weight='bold' className='mb-4' id='simple-sql'>
            <span className='tilted tilted-black'>
              <span className='tilted-content'>Simple</span>
            </span>{' '}
            SQL
          </SuiTitle>
          <SuiText
            size='base'
            weight='medium'
            color='secondary'
            className='mb-6 max-w-screen-sm'>
            ClickHouse supports a superset of ANSI SQL with thousands of helper
            functions to make your analytics queries easy to write and read.
            Whether you know Postgres, MySQL, Snowflake or other SQL variants,
            you’ll find ClickHouse familiar to use.
          </SuiText>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
            <ClickhouseSyntax />
            <PostgresSyntax />
          </div>
        </div>
      </div>
      <GetStarted platforms={platforms} />
      <TwitterSection />
      <FAQ />
    </Layout>
  )
}
