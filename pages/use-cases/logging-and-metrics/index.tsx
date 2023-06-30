import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import BulletPoint from '../../../components/BulletPoint'
import { CUICard } from '../../../components/ClickUI'
import GetStarted from '../../../components/GetStarted'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { ClickhouseData } from '../../../types/clickhouse'
import features from './features.json'

export const getStaticProps: GetStaticProps<ClickhouseData> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.mainButton',
        'hero.secondaryButton',
        'hero.gitButton',
        'hero.gitButton.darkIconPng',
        'hero.gitButton.lightIconPng',
        'hero.backgroundPng',
        'features5',
        'features5.iconSvg',
        'features5.items',
        'seo',
        'seo.image'
      ]
    }
    const data = await findOne('click-house', params)
    data.seo.path = '/use-cases/logging'
    data.seo.title = 'Logging with ClickHouse | ClickHouse for Logging Metrics'
    data.seo.description =
      'ClickHouse is the fastest and most resource efficient database for real-time analytics, making it the perfect fit for Observability use cases'

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  hero,
  features5,
  seo,
  platforms,
  headerData,
  footerData
}: ClickhouseData) {
  const { description, mainButton, secondaryButton, gitButton } = hero
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat lg:bg-speed-lines'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col text-center md:mt-16 md:w-7/12 md:text-left'>
                  <h4 className='mb-6 text-base font-medium text-primary-300'>
                    <Link href='/use-cases'>Use cases</Link> / Logging &amp;
                    Metrics
                  </h4>
                  <h1 className='mb-6 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    Logging with ClickHouse
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 md:pr-16'>
                    <p className='mb-6'>
                      ClickHouse is the fastest and most resource efficient
                      database for real-time analytics, making it the perfect
                      fit for Observability use cases.
                    </p>
                    <p>
                      When it comes to time series events data, like logs and
                      metrics, ClickHouse shines in its ability to perform a
                      huge range of analytical functions over massive volumes of
                      data - leveraging features like high compression rates to
                      ensure robust performance at scale.
                    </p>
                  </SuiText>
                </div>

                <div className='mx-auto mt-4 hidden md:flex md:w-4/12'>
                  <Image
                    src='/images/logging-use-cases-hero.svg'
                    alt='Open source ClickHouse'
                    width={382}
                    height={310}
                    className='h-auto w-full min-w-[54rem] '
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto max-w-4xl px-4 pb-16 pt-16 sm:px-8 md:px-8  2xl:px-0'>
            <h2 className='text-center font-basier text-4xl font-semibold'>
              Discover why companies are choosing ClickHouse as their blazing
              fast observability store.
            </h2>
          </div>
          <div className='mx-auto flex max-w-7xl gap-x-10'>
            {features.map((feature) => {
              return <div key={feature.id}>{feature.title}</div>
            })}
          </div>
        </div>

        <div className='relative mx-auto mt-12 flex flex-col gap-y-28 md:mt-24 md:px-0 '>
          <div className='section-container bg-shadow-element-left red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/clickhouse/section_efficient.svg'
                alt='ClickHouse efficiency'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mt-8 mb-6'>
                Hardware efficient
              </SuiTitle>
              <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-16'>
                ClickHouse processes analytical queries 100-1000x faster than
                traditional row-oriented systems with the same available I/O
                throughput and CPU capacity. Columnar storage format allows
                fitting more hot data in RAM, which leads to shorter response
                times.
              </div>

              <div className='mx-auto mt-10 grid grid-cols-1 content-baseline gap-10 px-4 md:mt-0 md:grid-cols-3 md:px-0'>
                <CUICard
                  title='Strives for CPU efficiency'
                  className='py-6 px-4'>
                  <p className='font-inconsolata text-primary-300'>
                    Vectorization
                  </p>
                  <h3 className='mb-6 px-2 text-center font-basier text-2xl font-semibold leading-tight md:text-2xl xl:px-4'>
                    Maximizes CPU efficiency
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='px-0 text-center xl:px-4'>
                    Vectorized query execution leverages SIMD processor
                    instructions and runtime code generation. Processing data in
                    columns increases CPU cache line hit rate.
                  </SuiText>
                </CUICard>

                <CUICard
                  title='Strives for CPU efficiency'
                  className='py-6 px-4'>
                  <p className='font-inconsolata text-primary-300'>Locality</p>
                  <h3 className='mb-6 px-2 text-center font-basier text-2xl font-semibold leading-tight md:text-2xl xl:px-4'>
                    Optimizes disk access
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='px-0 text-center xl:px-4'>
                    ClickHouse minimizes the number of seeks for range queries
                    to increase efficiency of using disk drives and maintain
                    locality of reference for continually stored data.
                  </SuiText>
                </CUICard>

                <CUICard
                  title='Strives for CPU efficiency'
                  className='py-6 px-4'>
                  <p className='font-inconsolata text-primary-300'>
                    Throughput
                  </p>
                  <h3 className='mb-6 px-2 text-center font-basier text-2xl font-semibold leading-tight md:text-2xl xl:px-4'>
                    Minimizes data transfers
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='px-0 text-center xl:px-4'>
                    ClickHouse enables companies to manage their data and create
                    reports without using specialized networks that are aimed at
                    high-performance computing.
                  </SuiText>
                </CUICard>
              </div>
            </div>
          </div>
        </div>

        <HRSeparator className='my-12 md:my-24' />

        <div className='relative mx-auto flex flex-col gap-y-28 md:mt-24'>
          <div className='section-container bg-shadow-element-left red-shadow mx-auto flex flex-col items-center justify-between self-center px-4 md:px-8 2xl:px-0 '>
            <CUICard className='p-8'>
              <div className='flex w-full justify-between'>
                <h3 className='mb-6 w-full text-center font-basier text-2xl font-semibold leading-tight md:text-left md:text-2xl'>
                  From your laptop to petabyte scale
                </h3>
                <Image
                  src='/images/clickhouse/scalable.svg'
                  width={32}
                  height={32}
                  alt='ClickHouse is linearly scalable'
                  className='h-7'
                />
              </div>

              <div className='flex flex-col gap-8 md:flex-row'>
                <div className='w-full text-center md:text-left lg:w-9/12'>
                  <SuiText size='sm' color='secondary'>
                    ClickHouse scales well both vertically and horizontally. It
                    is easily adaptable to perform on your laptop, small virtual
                    machine, a single server, or a cluster with hundreds or
                    thousands of nodes.
                  </SuiText>
                  <br />
                  <SuiText size='sm' color='secondary'>
                    There are many ClickHouse clusters consisting of multiple
                    hundreds of nodes, while the largest known ClickHouse
                    cluster is well over a thousand nodes. There are
                    installations of ClickHouse with more multiple trillion rows
                    or hundreds of terabytes of data per single node.
                  </SuiText>
                </div>
              </div>
            </CUICard>
          </div>
        </div>

        <HRSeparator className='my-12 md:my-24' />

        <div className='section-container bg-shadow-element-left red-shadow flex w-full flex-col items-center justify-between self-center px-4 pb-16 md:px-8 2xl:px-0'>
          <div className='flex w-full flex-col items-center'>
            <Image
              src='/images/clickhouse/section_scale.svg'
              alt='ClickHouse at scale'
              width={72}
              height={72}
            />
            <SuiTitle type='h2' className='mt-8 mb-6'>
              {features5.second_title}
            </SuiTitle>
            <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-10'>
              ClickHouse is used in a variety of industries for a broad set of
              use cases on top of both customer-facing and internally-facing
              workloads.
            </div>

            <div className='flex flex-col flex-wrap pt-12 md:mx-auto md:max-w-4xl md:flex-row md:pt-6'>
              {features5.items.map((feature) => (
                <BulletPoint
                  key={feature.text}
                  text={feature.text}
                  className='w-full md:w-1/2 lg:w-1/3'
                />
              ))}
            </div>
          </div>
        </div>

        <GetStarted platforms={platforms} />
      </Layout>
    </>
  )
}
