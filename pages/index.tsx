import Image from 'next/image'

import { SuiTitle } from '../components/sui'
import { findOne } from '../lib/api/strapi'
import GetStarted from '../components/GetStarted'
import { HomePageProps } from '../types/homepage'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { getCommonProps } from '../lib/utils/getCommonProps'
import FAQ from '../components/FAQ'
import { CUIBasicCard, CUIButton, CUILink } from '../components/ClickUI'
import columnOrientedIllustration from '../public/images/homepage/column-oriented-illustration.svg'
import rowOrientedIllustration from '../public/images/homepage/row-oriented-illustration.svg'
import { ChevronRightIcon } from '@heroicons/react/solid'
import JoinCommunity from '../components/JoinCommunity'
import HomePageTerminal from '../components/Terminal/HomePageTerminal'
import SpeedAnimation from '../components/SpeedAnimation'

const customerStoriesLogos = [
  {
    href: '/customer-stories#ebay',
    target: '_self',
    imageSrc: '/logos/eBay-black.svg',
    alt: 'ebay'
  },
  {
    href: '/customer-stories#uber',
    target: '_self',
    imageSrc: '/logos/uber-black.svg',
    alt: 'uber'
  },
  {
    href: '/customer-stories#cloudflare',
    target: '_self',
    imageSrc: '/logos/cloudflare-black.svg',
    alt: 'cloudflare'
  },
  {
    href: '/customer-stories#spotify',
    target: '_self',
    imageSrc: '/logos/spotify-black.svg',
    alt: 'spotify'
  },
  {
    href: '/customer-stories#deutsche_bank',
    target: '_self',
    imageSrc: '/logos/deutsche-black.svg',
    alt: 'deutsche bank'
  }
]

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
      <div className='homepage overflow-hidden bg-speed-lines bg-no-repeat bg-bottom '>
        <div className='flex flex-col relative gap-24 justify-center md:flex-row items-center section-container pb-20 lg:pb-44 pt-16 md:pt-28'>
          <div className='mx-auto md:ml-0 md:mt-8 flex flex-col max-w-md'>
            <SuiTitle type='h1' color='primary'>
              Query billions of rows in milliseconds
            </SuiTitle>
            <div className='mt-6 flex flex-col items-center'>
              <div className='leading-normal text-neutral-200 mb-10'>
                ClickHouse is the fastest and most resource efficient
                open-source database for real-time apps and analytics.
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
          <div className='section-container max-w-md w-full md:mr-0 md:ml-auto px-0'>
            <HomePageTerminal />
          </div>
        </div>
      </div>
      <div className='section-container py-16'>
        <div className='max-w-3xl mx-auto'>
          <div className='container pt-6 flex flex-wrap sm:grid sm:grid-cols-5 gap-2 md:gap-x-8 self-center items-center justify-center place-items-center'>
            {customerStoriesLogos.map((logo, index: number) => (
              <CUILink
                key={logo.href}
                href={logo.href}
                target={logo.target}
                className={`customer-stories-${index} flex rounded-lg justify-center ease-in-out duration-200 cursor-pointer gap-2`}>
                <Image
                  src={logo?.imageSrc}
                  className='w-auto h-12 rounded'
                  alt={logo.alt}
                  width={144}
                  height={48}
                />
              </CUILink>
            ))}
          </div>
        </div>
      </div>

      <div className='flex w-full text-neutral-0'>
        <div className='flex section-container mx-auto flex-col pt-20 pb-8 text-center items-center'>
          <Image
            src='/speed-icon.svg'
            alt='Speed Icon'
            width={72}
            height={72}
          />
          <SuiTitle type='h2' className='my-6'>
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
              <div className='w-56 justify-center border-primary-700 rounded p-4 flex flex-wrap gap-6'>
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
              <div className='w-56 justify-center border-primary-700 rounded p-4 flex flex-nowrap gap-6'>
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
              <div className='w-56 justify-center border-primary-700 rounded p-4 flex flex-col flex-nowrap gap-6 items-center'>
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
            <SpeedAnimation className='w-full h-fit max-w-full test' />
          </div>
        </div>
      </div>

      <div className='relative flex flex-col gap-y-28 mt-24 mb-16'>
        <div className='flex flex-col items-center justify-between self-center section-container w-full'>
          <div className='flex flex-col items-center w-full gap-6'>
            <Image
              src='/fast-icon.svg'
              alt='Fast Icon'
              width={72}
              height={72}
            />
            <SuiTitle type='h2' className='my-6'>
              Why is ClickHouse so fast?
            </SuiTitle>
            <div className='text-neutral-200 max-w-screen-md leading-normal text-center mx-auto'>
              Column-oriented databases are better suited to OLAP scenarios.
              They are at least <span className='font-bold'>100x faster</span>{' '}
              in processing most queries. ClickHouse uses all available system
              resources to their full potential to process each analytical query
              as fast as possible.
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center py-16 gap-16'>
            <div>
              <Image
                src={rowOrientedIllustration}
                width='544'
                height='257'
                alt='Row Oriented Illustration'
                priority
              />
              <div className='text-neutral-0 font-bold leading-normal mb-3 mt-7'>
                Row-oriented databases
              </div>
              <div className='text-neutral-200 leading-normal'>
                In a row-oriented databases, data is stored in rows, with all
                the values related to a row physically stored next to each
                other.
              </div>
            </div>
            <div>
              <Image
                src={columnOrientedIllustration}
                width='544'
                height='257'
                alt='Column Oriented Illustration'
                priority
              />
              <div className='text-neutral-0 font-bold leading-normal mb-3 mt-7'>
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
      <div className='w-full flex flex-col'>
        <div className='flex container mx-auto flex-col section-container pt-16 items-center'>
          <Image
            src='/deploy-icon.svg'
            alt='Deploy Icon'
            width={72}
            height={72}
          />
          <SuiTitle type='h2' className='my-6 max-w-3xl mx-auto text-center'>
            Deploy your way
          </SuiTitle>
          <div className='max-w-screen-sm leading-normal text-center mx-auto'>
            Unlike traditional closed-source data warehouses, ClickHouse runs on
            every environment, whether it’s on your machine or on the cloud
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 mb-28'>
            <CUIBasicCard
              icon='/laptop.svg'
              btnType='secondary'
              title='Clickhouse Local'
              btnChildren='Download ClickHouse Local'
              href='/'
              className='w-full'>
              Run fast queries on local files (CSV, TSV, Parquet, and more)
              without a server.
            </CUIBasicCard>
            <CUIBasicCard
              icon='/drive.svg'
              btnType='secondary'
              title='ClickHouse'
              btnChildren='Download ClickHouse'
              href='/'
              className='w-full'>
              Spin up a database server with open-source ClickHouse. Always
              Free.
            </CUIBasicCard>
            <CUIBasicCard
              icon='/cloud.svg'
              title='ClickHouse Cloud'
              btnChildren='Deploy in seconds'
              href='https://clickhouse.cloud'
              className='w-full'>
              Deploy a fully managed ClickHouse service on AWS and GCP.
            </CUIBasicCard>
          </div>
        </div>
      </div>

      <JoinCommunity />
      <FAQ />
      <GetStarted platforms={platforms} />
    </Layout>
  )
}
