import { SuiButton, SuiText, SuiTitle } from '../../components/sui'
import { findOne } from '../../lib/api/strapi'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import BulletPoint from '../../components/BulletPoint'
import GetStarted from '../../components/GetStarted'
import { ClickhouseData } from '../../types/clickhouse'
import features from './features.json'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CUIButton, CUICard } from '../../components/ClickUI'
import HRSeparator from '../../components/HRSeparator'

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
        'features1',
        'features1.items',
        'features1.items.iconSvg',
        'features2',
        'features2.items',
        'features2.items.iconSvg',
        'features3',
        'features3.mainItem',
        'features3.iconSvg',
        'features3.items',
        'features4',
        'features4.items',
        'features5',
        'features5.iconSvg',
        'features5.items',
        'seo',
        'seo.image'
      ]
    }
    const data = await findOne('click-house', params)

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
  features1,
  features2,
  features3,
  features4,
  features5,
  seo,
  platforms,
  footerData
}: ClickhouseData) {
  const { description, mainButton, secondaryButton, gitButton } = hero
  return (
    <>
      <Layout footerData={footerData} seo={seo}>
        <div className='lg:bg-speed-lines bg-center bg-no-repeat bg-contain'>
          <div className='pt-10 relative bg-grid overflow-x-hidden'>
            <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-16 px-4 md:pb-24 md:px-8 2xl:px-0 lg:min-h-[630px]'>
              <div className='flex'>
                <div className='md:w-7/12 md:mt-16 flex-col text-center md:text-left'>
                  <h1 className='font-basier text-4xl mb-6 md:text-5.5xl leading-tight font-semibold'>
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
                  <div className='flex flex-col sm:flex-row mt-8 justify-center md:justify-start gap-4'>
                    {mainButton && (
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href={mainButton.href}
                        target={mainButton.target}
                        segmentEvent={{
                          label: mainButton.text,
                          category: 'website-hero'
                        }}
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
                        segmentEvent={{
                          label: secondaryButton.text,
                          category: 'website-hero'
                        }}
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                        className='w-full'>
                        {secondaryButton.text}
                      </CUIButton>
                    )}
                    {!secondaryButton && gitButton?.text && (
                      <SuiButton
                        type='secondary'
                        className='w-48'
                        path={gitButton.href}
                        segmentEvent={{
                          label: gitButton.text,
                          category: 'website-hero'
                        }}
                        target={gitButton.target}>
                        <StrapiPicture
                          light={gitButton.lightIconPng}
                          dark={gitButton.darkIconPng}
                          width={20}
                          height={20}
                        />
                        {gitButton.text}
                      </SuiButton>
                    )}
                  </div>
                </div>

                <div className='hidden mx-auto md:w-4/12 md:flex mt-4'>
                  <img
                    src='/images/clickhouse/oss_hero_image.png'
                    alt='ClickHouse is fast'
                    width={1294}
                    height={812}
                    className='w-full h-auto min-w-[50rem]'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='text-neutral-0 bg-neutral-725'>
          <div className='flex container mx-auto flex-col max-w-7xl pb-16 px-4 sm:px-8 md:px-8 2xl:px-0  pt-16'>
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
                      <h4 className='font-bold mb-3 font-inter'>
                        {feature.title}
                      </h4>
                      <p className='font-light font-inter leading-relaxed text-sm text-neutral-200'>
                        {feature.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mx-auto relative flex flex-col gap-y-28 mt-12 md:mt-24 md:px-0 '>
          <div className='flex flex-col items-center justify-between self-center section-container w-full bg-shadow-element-left red-shadow'>
            <div className='flex flex-col items-center w-full'>
              <Image
                src='/images/clickhouse/section_efficient.svg'
                alt='ClickHouse efficiency'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mt-8 mb-6'>
                Hardware efficient
              </SuiTitle>
              <div className='text-neutral-200 max-w-2xl leading-normal text-center mx-auto md:pb-16'>
                ClickHouse processes analytical queries 100-1000x faster than
                traditional row-oriented systems with the same available I/O
                throughput and CPU capacity. Columnar storage format allows
                fitting more hot data in RAM, which leads to shorter response
                times.
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-10 px-4 md:px-0 mx-auto mt-10 md:mt-0'>
                <CUICard title='Strives for CPU efficiency' className='p-6'>
                  <p className='font-inconsolata text-primary-300'>
                    Vectorization
                  </p>
                  <h3 className='font-basier text-2xl mb-6 md:text-2xl leading-tight font-semibold text-center px-2 xl:px-8'>
                    Maximizes CPU efficiency
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='text-center px-0 xl:px-8'>
                    Vectorized query execution involves relevant SIMD processor
                    instructions and runtime code generation. Processing data in
                    columns increases CPU cache line hit rate.
                  </SuiText>
                </CUICard>

                <CUICard title='Strives for CPU efficiency' className='p-6'>
                  <p className='font-inconsolata text-primary-300'>Locality</p>
                  <h3 className='font-basier text-2xl mb-6 md:text-2xl leading-tight font-semibold text-center px-2 xl:px-8'>
                    Optimizes disk drive access
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='text-center px-0 xl:px-8'>
                    ClickHouse minimizes the number of seeks for range queries,
                    which increases the efficiency of using rotating disk
                    drives, as it maintains locality of reference for
                    continually stored data.
                  </SuiText>
                </CUICard>

                <CUICard title='Strives for CPU efficiency' className='p-6'>
                  <p className='font-inconsolata text-primary-300'>
                    Throughput
                  </p>
                  <h3 className='font-basier text-2xl mb-6 md:text-2xl leading-tight font-semibold text-center px-2 xl:px-8'>
                    Minimizes data transfers
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='text-center px-0 xl:px-8'>
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

        <div className='relative flex flex-col gap-y-28 md:mt-24 mx-auto'>
          <div className='flex flex-col items-center justify-between self-center section-container mx-auto bg-shadow-element-left red-shadow px-4 md:px-8 2xl:px-0 '>
            <CUICard className='p-8'>
              <div className='flex w-full justify-between'>
                <h3 className='w-full text-center md:text-left font-basier text-2xl mb-6 md:text-2xl leading-tight font-semibold'>
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

              <div className='flex flex-col md:flex-row gap-8'>
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

        <div className='flex flex-col items-center justify-between self-center section-container w-full bg-shadow-element-left red-shadow pb-16 px-4 md:px-8 2xl:px-0'>
          <div className='flex flex-col items-center w-full'>
            <Image
              src='/images/clickhouse/section_scale.svg'
              alt='ClickHouse at scale'
              width={72}
              height={72}
            />
            <SuiTitle type='h2' className='mt-8 mb-6'>
              {features5.second_title}
            </SuiTitle>
            <div className='text-neutral-200 max-w-2xl leading-normal text-center mx-auto md:pb-10'>
              ClickHouse is used in a variety of industries for a broad set of
              use cases on top of both customer-facing and internally-facing
              workloads.
            </div>

            <div className='flex flex-col md:flex-row md:max-w-4xl md:mx-auto pt-12 md:pt-6 flex-wrap'>
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
