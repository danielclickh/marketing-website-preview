import features from './features.json'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import CdcWaitlistForm from '@/components/CdcWaitlistForm'
import ClickPipesAnimationV2 from '@/components/ClickPipesAnimation/ClickPipesAnimationV2'
import { CUIButton, CUICard } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import LogoAnnouncementLink from '@/components/LogoAnnouncementLink'
import ScaleToContainer from '@/components/ScaleToContainer'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ClickPipesData } from '@/types/clickpipes'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'
import ReactMarkdown from 'react-markdown'

export const getStaticProps: GetStaticProps<ClickPipesData> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          path: '/cloud/clickpipes',
          title: 'ClickPipes - Continuous Data Ingestion for ClickHouse Cloud',
          description:
            'ClickPipes is an integration engine that makes ingesting massive volumes of data from a diverse set of sources as simple as clicking a few buttons. Our robust and scalable architecture empowers you to handle the most demanding workloads, with guaranteed high throughput and low latency at scale.',
          image: [{ url: '/images/cloud/clickpipes/clickpipes-og.png' }],
          languages: ['en', 'ja']
        },
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  seo,
  headerData
}: ClickPipesData) {
  useGalaxyOnPage('clickPipesPage')
  return (
    <>
      <Layout seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 2xl:px-0'>
              <div className='flex items-center justify-between'>
                <div className='flex-col space-y-6 text-center lg:mt-16 lg:max-w-xl lg:text-left'>
                  <Breadcrumbs>
                    <Breadcrumbs.Link href='/cloud'>Cloud</Breadcrumbs.Link>
                    <Breadcrumbs.Item>Data ingestion</Breadcrumbs.Item>
                  </Breadcrumbs>
                  <h1 className='font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    ClickPipes
                  </h1>
                  <SuiText size='lg' className='text-neutral-200'>
                    An integration engine that makes ingesting massive volumes
                    of data from a diverse set of sources as simple as clicking
                    a few buttons. Only available in ClickHouse Cloud.
                  </SuiText>
                  <div className='mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start'>
                    <CUIButton
                      type='primary'
                      size='lg'
                      weight='semibold'
                      href='https://console.clickhouse.cloud/signUp?loc=clickpipes-hero-button'
                      target='_blank'
                      linkClass='w-full mx-auto md:mx-0 max-w-[14rem] md:max-w-[12rem]'
                      className='w-full'>
                      Get started today
                    </CUIButton>
                    <CUIButton
                      type='secondary'
                      weight='semibold'
                      size='lg'
                      href='https://clickhouse.com/docs/integrations/clickpipes'
                      target='_blank'
                      prefetch={false}
                      linkClass='w-full max-w-[14rem]'
                      className='w-full'>
                      View documentation
                    </CUIButton>
                  </div>
                  <LogoAnnouncementLink
                    mode='dark'
                    className='mt-8 !bg-neutral-700/60'
                    href='/cloud/clickpipes/bigquery-connector?loc=clickpipes-hero'
                    logo={{
                      src: '/images/cloud/integrations/google-bigquery.svg',
                      alt: 'BigQuery',
                      width: 50,
                      height: 50,
                      className: 'mx-2'
                    }}>
                    Blazing-fast BigQuery to ClickHouse with our new ClickPipe
                    connector — now in Private Preview.
                    <br />
                    <span className='underline group-hover:decoration-2'>
                      Learn more
                    </span>
                    !
                  </LogoAnnouncementLink>
                </div>
                <div className='mx-6 mt-6 hidden lg:block'>
                  <ClickPipesAnimationV2 />
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
          <div className='container mx-auto flex max-w-4xl flex-col px-4 pb-16 pt-16 sm:px-8 md:px-8 2xl:px-0'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 space-y-4 md:grid-cols-2 md:space-y-0'>
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
                        <ReactMarkdown>{feature.content}</ReactMarkdown>
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
                <div className='-mx-2 -mb-3 mt-8 flex max-w-[1040px] flex-wrap items-stretch justify-center sm:-mx-3 lg:mx-auto'>
                  {[
                    {
                      logo: '/images/cloud/integrations/amazon_s3.svg',
                      name: 'AWS S3'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/confluent-logos-idXfleyO4U-1.svg',
                      name: 'Confluent'
                    },
                    {
                      logo: '/images/cloud/integrations/kafka.svg',
                      name: 'Kafka'
                    },
                    {
                      logo: '/images/cloud/integrations/postgres.svg',
                      name: 'Postgres CDC'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/aws-kinesis.svg',
                      name: 'AWS Kinesis'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/aws-msk.svg',
                      name: 'AWS MSK'
                    },
                    {
                      logo: '/images/cloud/integrations/google-cloud-storage.svg',
                      name: 'Google Cloud Storage'
                    },
                    {
                      logo: '/images/cloud/integrations/google-bigquery.svg',
                      name: 'BigQuery',
                      badge: 'New'
                    },
                    {
                      logo: '/images/cloud/integrations/mysql.svg',
                      name: 'MySQL CDC'
                    },
                    {
                      logo: '/images/cloud/integrations/mongodb.svg',
                      name: 'MongoDB CDC'
                    },
                    {
                      logo: '/images/cloud/integrations/azure-blob-storage.svg',
                      name: 'Azure Blob Storage'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/azure-event-hub.svg',
                      name: 'Azure Event Hubs'
                    },
                    {
                      logo: '/images/cloud/integrations/digitalocean.svg',
                      name: 'DigitalOcean'
                    },
                    {
                      logo: '/images/cloud/integrations/redpanda.svg',
                      name: 'RedPanda'
                    },
                    {
                      logo: '/images/cloud/integrations/warpstream.svg',
                      name: 'Warpstream'
                    }
                  ].map(({ logo, name, badge }) => {
                    return (
                      <div
                        key={name}
                        className='w-1/2 p-2 sm:p-3 md:w-1/3 lg:w-1/4'>
                        <div className='relative flex h-full flex-col items-center rounded-sm bg-neutral-700/70 px-4 pb-6 pt-8'>
                          {badge && (
                            <span className='absolute right-3 top-3 rounded-full bg-primary-300 px-3 text-sm text-primary-900'>
                              {badge}
                            </span>
                          )}
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
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className='text-center'>
                  <SuiText className='my-8 opacity-70'>
                    ClickPipes are available in ClickHouse Cloud only.
                  </SuiText>
                  <CUIButton
                    type='primary'
                    href='https://console.clickhouse.cloud/signUp?loc=clickpipes-free-trial-connectors'
                    target='_blank'
                    className='mx-auto'>
                    Start a free trial
                  </CUIButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-primary-300 py-12'></div>

        {/* Azure Blob Storage form */}
        <div className='section-container my-20'>
          <div className='mx-auto w-full lg:max-w-xl'>
            <div className='mb-4 space-y-4 text-center md:-mx-4 lg:mb-6'>
              <div className='mb-10 flex justify-center'>
                <ScaleToContainer scaleUp={false}>
                  <div className='pointer-events-none relative w-max select-none'>
                    <div className='absolute inset-x-20 top-1/2 z-0 -translate-y-1/2'>
                      <AnimatedDataLine size={300} direction='right' />
                    </div>
                    <div className='relative z-10 flex items-center gap-12'>
                      <div className='flex w-20 flex-shrink-0 flex-grow-0 items-center justify-center'>
                        <div className='flex aspect-square w-20 items-center justify-center rounded border border-jet bg-neutral-900/80'>
                          <Image
                            src='/images/cloud/integrations/google-bigquery.svg'
                            width={50}
                            height={50}
                            alt='BigQuery'
                            className='m-3'
                          />
                        </div>
                      </div>
                      <div className='flex-grow-1 relative flex w-44 flex-shrink-0 flex-col items-center justify-center gap-y-4'>
                        <p className='absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-1/2 font-inconsolata text-xs'>
                          Data loading
                        </p>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='232'
                          height='239'
                          fill='none'
                          viewBox='0 0 232 239'
                          className='size-12 animate-[spin_2s_linear_infinite_reverse]'>
                          <path
                            fill='#fff'
                            d='m21.04 60.34-3.3-2.27-.15.23-.12.25zm43.08 162.25-2.18 3.36.06.04.07.04zm167.34-50.4-42.55 17.96 36.83 27.87zm-46.32-152.2 2.05-3.44c-7.23-4.32-17.01-8.57-28.42-11.68l-1.05 3.86-1.06 3.86c10.79 2.94 19.89 6.92 26.43 10.83zM124.43 4l.05-4C105.67-.25 85.13 3.5 65.3 14.13l1.9 3.52 1.89 3.52c18.45-9.9 37.6-13.4 55.28-13.16zM40.14 37.56l-2.78-2.87a153 153 0 0 0-19.61 23.38l3.3 2.27 3.29 2.26a145 145 0 0 1 18.58-22.17zm-19.1 22.78-3.57-1.8A181 181 0 0 0 6.02 86.87l3.83 1.16 3.82 1.17a174 174 0 0 1 10.95-27.06zM4.07 121.3l-4-.14c-.71 20.44 3.99 40.47 15.46 59.22l3.42-2.09 3.4-2.09c-10.6-17.33-14.94-35.8-14.29-54.76zm36.43 83-2.73 2.92q10.48 9.77 24.17 18.72l2.18-3.36 2.18-3.35a169 169 0 0 1-23.07-17.86zm23.62 18.28-2.05 3.44c7.29 4.35 17.78 8.14 30.08 10.5l.75-3.94.75-3.92c-11.66-2.23-21.2-5.76-27.48-9.51zm63.35 12.24.23 4c19.44-1.1 40.47-6.11 60.09-17.41l-2-3.47-2-3.46c-18.35 10.57-38.13 15.32-56.54 16.35z'
                          />
                        </svg>
                      </div>
                      <div className='relative w-20 flex-shrink-0 flex-grow-0'>
                        <div className='absolute inset-0 animate-fadeInOut bg-primary-300/60 blur-lg' />
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='72'
                          height='72'
                          viewBox='0 0 72 72'
                          className='relative z-10 h-auto w-full'>
                          <g fill='none'>
                            <rect
                              width='72'
                              height='72'
                              fill='#FAFF69'
                              rx='4'
                            />
                            <path
                              fill='#161517'
                              d='M21.41 15.75c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 18 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 27 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 36 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 0c.6 0 1.09.49 1.09 1.09v38.32c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 45 55.16V16.84c0-.6.49-1.09 1.09-1.09h2.32Zm9 15.75c.6 0 1.09.49 1.09 1.09v6.82c0 .6-.49 1.09-1.09 1.09h-2.32A1.1 1.1 0 0 1 54 39.41v-6.82c0-.6.49-1.09 1.09-1.09h2.32Z'
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScaleToContainer>
              </div>
              <SuiTitle type='h2'>
                BigQuery connector is in Private Preview
              </SuiTitle>
              <SuiText className='opacity-70'>
                Stream your BigQuery data into ClickHouse Cloud to bridge the
                gap between transactional and analytical workloads — blazing
                fast with our new ClickPipes BigQuery connector!
              </SuiText>
            </div>
            <CUICard className='bg-neutral-900/80'>
              <CUICard.Body className='p-4 lg:p-6'>
                <CdcWaitlistForm formId='1515' />
              </CUICard.Body>
            </CUICard>
          </div>
        </div>

        <div className='section-container my-28 md:px-8 2xl:px-0'>
          <GetStartedFree
            href='https://console.clickhouse.cloud/signUp?loc=clickpipes-getstarted-footer'
            textBefore='Try ClickPipes in ClickHouse'
            textSlanted='Cloud'
            textAfter='for free'
          />
        </div>
      </Layout>
    </>
  )
}
