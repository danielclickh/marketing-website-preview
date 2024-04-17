import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import ClickPipesAnimation from '../../../components/ClickPipesAnimation'
import ClickPipesAnimationV2 from '../../../components/ClickPipesAnimation/ClickPipesAnimationV2'
import { CUIButton } from '../../../components/ClickUI'
import GetStartedFree from '../../../components/GetStartedFree'
import Layout from '../../../components/Layout'
import { SuiText, SuiTitle } from '../../../components/sui'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { ClickPipesData } from '../../../types/clickpipes'
import features from './features.json'
import integrations from './integrations.json'
import { galaxyOnLoad, galaxyOnPage } from '../../../lib/galaxy/galaxy'

export const getStaticProps: GetStaticProps<ClickPipesData> =
  async function getStaticProps() {
    const data = {
      seo: {
        path: '/cloud/clickpipes',
        title: 'ClickPipes - Continuous Data Ingestion for ClickHouse Cloud',
        description:
          'ClickPipes is an integration engine that makes ingesting massive volumes of data from a diverse set of sources as simple as clicking a few buttons. Our robust and scalable architecture empowers you to handle the most demanding workloads, with guaranteed high throughput and low latency at scale.',
        image: [{ url: '/images/cloud/clickpipes/clickpipes-og.png' }]
      }
    }

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  seo,
  headerData,
  footerData
}: ClickPipesData) {
  galaxyOnPage('clickPipesPage')
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 2xl:px-0'>
              <div className='flex justify-between'>
                <div className='flex-col text-center lg:mt-16 lg:max-w-xl lg:text-left'>
                  <h4 className='mb-4 text-base font-semibold text-primary-300'>
                    <Link href='/cloud'>Cloud</Link> / Data Ingestion
                  </h4>
                  <h1 className='relative mb-3 mt-4 inline-block font-basier text-4xl font-semibold leading-tight md:mt-0 md:text-5.5xl'>
                    ClickPipes
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 text-neutral-200 md:pr-16'>
                    An integration engine that makes ingesting massive volumes
                    of data from a diverse set of sources as simple as clicking
                    a few buttons.
                  </SuiText>
                  <div className='mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start'>
                    <CUIButton
                      type='primary'
                      size='lg'
                      weight='semibold'
                      href='https://clickhouse.cloud/signUp?loc=clickpipes-hero-button'
                      target='_blank'
                      linkClass='w-full mx-auto md:mx-0 max-w-[14rem] md:max-w-[12rem]'
                      className='w-full'>
                      Get started today
                    </CUIButton>
                    <CUIButton
                      type='secondary'
                      weight='semibold'
                      size='lg'
                      href='https://clickhouse.com/docs/en/integrations/clickpipes'
                      target='_blank'
                      linkClass='w-full max-w-[14rem]'
                      className='w-full'>
                      View documentation
                    </CUIButton>
                  </div>
                </div>
                <div className='mx-6 mt-6 hidden lg:block'>
                  <ClickPipesAnimationV2
                    logo1={{
                      src: '/images/cloud/integrations/diagram/confluent-logos-idXfleyO4U-1.svg',
                      alt: 'Confluent',
                      active: true
                    }}
                    logo2={{
                      src: '/images/cloud/integrations/kafka.svg',
                      alt: 'Kafka',
                      active: true
                    }}
                    logo3={{
                      src: '/images/cloud/integrations/amazon_s3.svg',
                      alt: 'Amazon S3',
                      active: false,
                      badge: 'Beta'
                    }}
                    logo4={{
                      src: '/images/cloud/integrations/diagram/aws-kinesis.svg',
                      alt: 'AWS Kinesis',
                      active: false,
                      badge: 'Beta'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 pb-10 text-neutral-0'>
          <div className='mx-auto max-w-2xl pt-16 text-center'>
            <h2 className='font-basier text-3xl font-semibold leading-normal'>
              Seamlessly{' '}
              <span className='tilted tilted-yellow'>
                <span className='tilted-content'>connect</span>
              </span>{' '}
              your external data sources to ClickHouse Cloud.
            </h2>
          </div>
          <div className='container mx-auto flex max-w-4xl flex-col px-4 pb-16 pt-16 sm:px-8 md:px-8  2xl:px-0'>
            <div className='grid grid-cols-1 gap-y-10 gap-x-8 space-y-4 md:grid-cols-2 md:space-y-0'>
              {features.map((feature) => (
                <div className='col' key={feature.id}>
                  <div className='flex flex-col items-center gap-4 text-center'>
                    <Image
                      src={feature.icon}
                      width={52}
                      height={52}
                      alt={feature.title}
                    />
                    <div>
                      <h4 className='text-md mb-3 font-inter font-semibold'>
                        {feature.title}
                      </h4>
                      <div className='px-10 font-inter text-sm font-light leading-relaxed text-neutral-200'>
                        <ReactMarkdown children={feature.content} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle bg-neutral-725'>
          <div className='section-container max-w-7xl lg:mt-0'>
            <div className='relative rounded-lg border-t-2 border-neutral-700/80 border-primary-300 bg-neutral-900 shadow-lg'>
              <div className='px-6 py-8 lg:p-10'>
                <div className='text-center'>
                  <SuiTitle type='h2'>Available Connectors</SuiTitle>
                  <SuiText className='mx-auto mt-6 max-w-[844px] opacity-70'>
                    ClickPipes is an integration engine that simplifies data
                    ingestion from a variety of sources, including new
                    connectors for Amazon S3 and Google Cloud Storage. Our
                    scalable architecture ensures high throughput and low
                    latency, ideal for demanding workloads.
                  </SuiText>
                </div>
                <div className='-mx-2 mt-8 -mb-3 flex max-w-[1040px] flex-wrap items-stretch justify-center sm:-mx-3 lg:mx-auto'>
                  {[
                    {
                      logo: '/images/cloud/integrations/amazon_s3.svg',
                      name: 'AWS S3',
                      badge: 'beta'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/aws-kinesis.svg',
                      name: 'AWS Kinesis',
                      badge: 'beta'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/aws-msk.svg',
                      name: 'AWS MSK'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/confluent-logos-idXfleyO4U-1.svg',
                      name: 'Confluent'
                    },
                    {
                      logo: '/images/cloud/integrations/google-cloud-storage.svg',
                      name: 'Google Cloud Storage',
                      badge: 'beta'
                    },
                    {
                      logo: '/images/cloud/integrations/kafka.svg',
                      name: 'Kafka'
                    },
                    {
                      logo: '/images/cloud/integrations/redpanda.svg',
                      name: 'RedPanda',
                      badge: 'new'
                    },
                    {
                      logo: '/images/cloud/integrations/upstash.svg',
                      name: 'Upstash'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/azure-event-hub.svg',
                      name: 'Azure Event Hubs'
                    },
                    {
                      logo: '/images/cloud/integrations/warpstream.svg',
                      name: 'Warpstream'
                    }
                  ].map(({ logo, name, badge }) => {
                    return (
                      <div className='w-1/2 p-2 sm:p-3 md:w-1/3 lg:w-1/4'>
                        <div className='relative flex h-full flex-col items-center rounded-sm bg-neutral-700/70 px-4 pt-8 pb-6'>
                          <Image
                            src={logo}
                            width={56}
                            height={56}
                            alt={name}
                            className='mb-4 h-14 w-14 object-contain'
                          />
                          <SuiTitle
                            type='h3'
                            className='!my-auto text-center !text-base'>
                            {name}
                          </SuiTitle>
                          {badge && (
                            <span className='absolute top-3 right-3 rounded-full bg-warning-800 px-3 py-1 text-xs font-normal text-warning-200'>
                              {badge}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-primary-300 py-12'></div>

        <div className='relative mx-auto mt-12 flex flex-col gap-y-28 md:mt-24 md:px-0 '>
          <div className='section-container bg-shadow-element-left red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/clickpipes/icon-integrations.svg'
                alt='ClickHouse efficiency'
                width={72}
                height={73}
              />
              <SuiTitle
                type='h2'
                className='mt-8 mb-4 px-8 text-center md:px-0'>
                More connectors coming soon
              </SuiTitle>
              <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-16'>
                To find out more,{' '}
                <Link
                  href='/company/contact?loc=clickpipes'
                  className='text-primary-300'>
                  Contact Us
                </Link>{' '}
                today.
              </div>
            </div>
          </div>
        </div>

        <div className='section-container my-12 pb-16 md:px-8 2xl:px-0 '>
          <GetStartedFree
            href='https://clickhouse.cloud/signUp?loc=clickpipes-getstarted-footer'
            textBefore='Get started with ClickHouse'
            textSlanted='Cloud'
            textAfter='for free'
          />
        </div>
      </Layout>
    </>
  )
}
