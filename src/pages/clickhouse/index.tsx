import features from './features.json'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton, CUICard } from '@/components/ClickUI'
import GetStarted from '@/components/GetStarted'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ClickhouseData } from '@/types/clickhouse'
import { GetStaticProps } from 'next'
import Image from 'next/image'

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
    data.seo.path = '/clickhouse'
    data.seo.languages = ['en', 'ja']
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
  useGalaxyOnPage('productOpenSourcePage')

  const { description, mainButton, secondaryButton, gitButton } = hero
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat lg:bg-speed-lines'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col text-center md:mt-16 md:w-7/12 md:text-left'>
                  <h1 className='mb-6 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    The{' '}
                    <span className='tilted tilted-yellow'>
                      <span className='tilted-content'>fastest</span>
                    </span>{' '}
                    open-source analytical database.
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 md:pr-16'>
                    {description}
                  </SuiText>
                  <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start'>
                    {mainButton && (
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href={mainButton.href}
                        target={mainButton.target}
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem] md:max-w-[12rem]'
                        className='w-full'>
                        {mainButton.text}
                      </CUIButton>
                    )}
                    {secondaryButton && (
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href={secondaryButton.href}
                        target={secondaryButton.target}
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                        className='w-full'>
                        {secondaryButton.text}
                      </CUIButton>
                    )}
                    {!secondaryButton && gitButton?.text && (
                      <CUIButton
                        type='secondary'
                        className='w-48'
                        href={gitButton.href}
                        target={gitButton.target}>
                        <StrapiImageUrl
                          {...(gitButton.darkIconPng || gitButton.lightIconPng)}
                          width={20}
                          height={20}
                        />
                        {gitButton.text}
                      </CUIButton>
                    )}
                  </div>
                </div>

                <div className='mx-auto mt-4 hidden md:flex md:w-4/12'>
                  <Image
                    src='/images/clickhouse/oss_hero_image.png'
                    alt='Open source ClickHouse'
                    loading='eager'
                    priority
                    width={870}
                    height={555}
                    className='h-auto w-full min-w-[54rem]'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto flex max-w-7xl flex-col px-4 pb-16 pt-16 sm:px-8 md:px-8 2xl:px-0'>
            <div className='feature-container'>
              {features.map((feature) => (
                <div className='col' key={feature.id}>
                  <div className='flex items-start gap-4'>
                    <Image
                      src={feature.icon}
                      width={32}
                      height={32}
                      alt={feature.title}
                    />
                    <div>
                      <h4 className='mb-3 font-inter font-bold'>
                        {feature.title}
                      </h4>
                      <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                        {feature.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='relative mx-auto mt-12 flex flex-col gap-y-28 md:mt-24 md:px-0'>
          <div className='section-container bg-shadow-element-left red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/clickhouse/section_efficient.svg'
                alt='ClickHouse efficiency'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mb-6 mt-8'>
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
                  className='px-4 py-6'>
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
                  className='px-4 py-6'>
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
                  className='px-4 py-6'>
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
          <div className='section-container bg-shadow-element-left red-shadow mx-auto flex flex-col items-center justify-between self-center px-4 md:px-8 2xl:px-0'>
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
            <SuiTitle type='h2' className='mb-6 mt-8'>
              {features5.second_title}
            </SuiTitle>
            <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-10'>
              ClickHouse is used in a variety of industries for a broad set of
              use cases on top of both customer-facing and internally-facing
              workloads.
            </div>

            <div className='flex flex-col flex-wrap pt-12 md:mx-auto md:max-w-4xl md:flex-row md:pt-6'>
              {features5.items.map((feature, featureIndex) => (
                <TickItem
                  key={featureIndex}
                  className='my-2 w-full md:w-1/2 lg:w-1/3'>
                  {feature.text}
                </TickItem>
              ))}
            </div>
          </div>
        </div>

        <GetStarted platforms={platforms} />
      </Layout>
    </>
  )
}
