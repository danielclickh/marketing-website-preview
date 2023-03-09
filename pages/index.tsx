import GitHubButton from 'react-github-btn'
import Image from 'next/image'

import { SuiTitle } from '../components/sui'
import { findOne } from '../lib/api/strapi'
import { StrapiPicture } from '../components/StrapiElements'
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
              <div className='mx-auto mt-6 flex flex-col items-center max-w-md'>
                <div className='leading-normal text-neutral-200 text-center mb-10'>
                  ClickHouse is the fastest open-source data warehouse for low
                  latency apps and analytics
                </div>
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
                  className='mt-5 text-neutral-200 underline hover:text-neutral-0'>
                  Or download open-source ClickHouse
                </CUILink>
              </div>
            </div>
          </div>
        </div>
        <div className='section-container max-w-3xl'>
          <HomePageTerminal />
        </div>
        <div className=' py-16'>
          <div className='max-w-3xl mx-auto'>
            <div className='text-center mb-10 text-primary-700 sm:border-t-2 sm:border-primary-700 w-fit mx-auto leading-normal sm:leading-none'>
              Trusted by the best developers that work with data at{' '}
              <span className='tilted tilted-black non-tilted-md'>
                <span className='tilted-content'>scale</span>
              </span>
            </div>

            <div className='container pt-6 flex flex-wrap sm:grid sm:grid-cols-5 gap-2 md:gap-x-8 self-center items-center justify-center place-items-center'>
              {customerStories.logos.map((logo, index: number) => (
                <CUILink
                  key={logo.href}
                  href={logo.href}
                  target={logo.target}
                  className={`customer-stories-${index} flex rounded-lg justify-center ease-in-out duration-200 cursor-pointer`}>
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
        <div className='section-container  flex flex-col justify-between self-center max-w-screen-xl w-full md:flex-row'>
          <div className='flex flex-col text-center md:text-left md:w-2/5 pb-4 md:pb-0'>
            <SuiTitle type='h3' className='!text-3xl mb-3'>
              Stop waiting for dashboards and queries to load
            </SuiTitle>
            <div className='text-neutral-200 max-w-screen-sm leading-normal text-left mx-auto mb-16'>
              {`Traditional databases and data warehouses take minutes or hours to run your queries. ClickHouse is designed for speed.

              With ClickHouse, your can query terabytes of data in a few seconds (or less).`}
            </div>
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

      <div className='flex flex-col gap-y-28 mt-24 mb-16'>
        <div className='flex flex-col items-center justify-between self-center section-container w-full'>
          <SuiTitle type='h3' className='!text-3xl mb-6'>
            Why is ClickHouse so fast?
          </SuiTitle>
          <div className='text-neutral-200 max-w-screen-sm leading-normal text-center mx-auto'>
            Column-oriented databases are better suited to OLAP scenarios. They
            are at least <span className='font-bold'>100x faster</span> in
            processing most queries. ClickHouse uses all available system
            resources to their full potential to process each analytical query
            as fast as possible.
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center py-16 gap-16'>
            <div>
              <Image src={dashboard2} alt='Dashboard Image Pie' priority />
              <div className='text-neutral-0 font-bold leading-normal mb-4'>
                Row-oriented databases
              </div>
              <div className='text-neutral-200 leading-normal'>
                In a row-oriented databases, data is stored in rows, with all
                the values related to a row physically stored next to each
                other.
              </div>
            </div>
            <div>
              <Image src={dashboard3} alt='Dashboard Image Bar' priority />
              <div className='text-neutral-0 font-bold leading-normal mb-4'>
                Column-oriented databases
              </div>
              <div className='text-neutral-200 leading-normal'>
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
            className='mb-7 max-w-3xl mx-auto !text-primary-800 text-center'
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
          <div className='text-primary-800 max-w-screen-sm leading-normal text-center mx-auto'>
            Unlike traditional closed-source data warehouses, ClickHouse runs on
            every environment, whether it’s on your machine or on the cloud
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 mb-28'>
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
        <div className='flex container mx-auto flex-col md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 xl:px-0'>
          <SuiTitle type='h2' className='mb-4'>
            Speed up queries from any data source
          </SuiTitle>
          <div className='text-neutral-200 max-w-screen-sm leading-normal text-center mx-auto mb-10'>
            ClickHouse supports all the datasources you need to power your apps
            and use cases that require exceptional performance.
          </div>
          <div className='flex flex-wrap md:hidden gap-10 justify-center'>
            <div>
              <div className='text-sm font-bold uppercase text-neutral-0 text-center mb-4'>
                Databases and data warehourses
              </div>
              <div className='bg-noised w-56 justify-center border-primary-700 rounded p-4 flex flex-wrap gap-6'>
                <Image
                  src='/logos/postgres.svg'
                  alt='Postgres logo Image'
                  width={40}
                  height={40}
                />
                <Image
                  src='/logos/bigquery.svg'
                  alt='BigQuery logo Image'
                  width={40}
                  height={40}
                />
                <Image
                  src='/logos/redshift.svg'
                  alt='AWS Redshift logo Image'
                  width={40}
                  height={40}
                />
                <Image
                  src='/logos/snowflake.svg'
                  alt='Snowflake logo Image'
                  width={40}
                  height={40}
                />
                <Image
                  src='/logos/mongodb.svg'
                  alt='MongoDb logo Image'
                  width={18}
                  height={40}
                />
                <Image
                  src='/logos/mysql.svg'
                  alt='Mysql logo Image'
                  width='48'
                  height='32'
                />
              </div>
            </div>
            <div>
              <div className='text-sm font-bold uppercase text-neutral-0 text-center mb-4'>
                log and analytics events
              </div>
              <div className='bg-noised w-56 justify-center border-primary-700 rounded p-4 flex flex-nowrap gap-6'>
                <Image
                  src='/logos/kafka.svg'
                  alt='Kafka logo Image'
                  width={25}
                  height={40}
                />
                <Image
                  src='/logos/vector.svg'
                  alt='Vector logo Image'
                  width={40}
                  height={40}
                />
                <Image
                  src='/logos/dbt.svg'
                  alt='Dbt logo Image'
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <div>
              <div className='text-sm font-bold uppercase text-neutral-0 text-center mb-4'>
                Local files
              </div>
              <div className='bg-noised w-56 justify-center border-primary-700 rounded p-4 flex flex-col flex-nowrap gap-6 items-center'>
                <Image
                  src='/logos/file-icon.svg'
                  alt='File Icon'
                  width='33'
                  height='42'
                />
                <Image
                  src='/logos/local-files-text.svg'
                  alt='File Type Image'
                  width='124'
                  height='54'
                />
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            <SpeedAnimation className='w-full h-fit max-w-full' />
          </div>
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
          <SuiTitle type='h2' weight='bold' className='mb-5' id='simple-sql'>
            <span className='tilted tilted-black'>
              <span className='tilted-content'>Simple</span>
            </span>{' '}
            SQL
          </SuiTitle>
          <div className='text-primary-800 mb-6 max-w-screen-sm leading-normal'>
            ClickHouse supports a superset of ANSI SQL with thousands of helper
            functions to make your analytics queries easy to write and read.
            Whether you know Postgres, MySQL, Snowflake or other SQL variants,
            you’ll find ClickHouse familiar to use.
          </div>
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
