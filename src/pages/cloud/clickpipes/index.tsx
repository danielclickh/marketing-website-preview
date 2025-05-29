import features from './features.json'
import CdcAnimation from '@/components/CdcAnimation'
import CdcWaitlistForm from '@/components/CdcWaitlistForm'
import ClickPipesAnimationV2 from '@/components/ClickPipesAnimation/ClickPipesAnimationV2'
import { CUIButton, CUICard } from '@/components/ClickUI'
import GetStartedFree from '@/components/GetStartedFree'
import Layout from '@/components/Layout'
import LogoAnnouncementLink from '@/components/LogoAnnouncementLink'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ClickPipesData } from '@/types/clickpipes'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'

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
  useGalaxyOnPage('clickPipesPage')
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 2xl:px-0'>
              <div className='flex items-center justify-between'>
                <div className='flex-col space-y-6 text-center lg:mt-16 lg:max-w-xl lg:text-left'>
                  <h4 className='mb-4 text-base font-semibold text-primary-300'>
                    <Link href='/cloud'>Cloud</Link> / Data ingestion
                  </h4>
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
                      href='https://clickhouse.com/docs/en/integrations/clickpipes'
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
                    href='/cloud/clickpipes/postgres-cdc-connector?loc=clickpipes-hero'
                    logo={{
                      src: '/images/cloud/integrations/postgres.svg',
                      alt: 'Postgres',
                      width: 46,
                      height: 37
                    }}>
                    Blazing-fast Postgres to ClickHouse CDC with our new
                    ClickPipe connector — now Generally Available.{' '}
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
                      logo: '/images/cloud/integrations/mysql.svg',
                      name: 'MySQL CDC'
                    },
                    {
                      logo: '/images/cloud/integrations/azure-blob-storage.svg',
                      name: 'Azure Blob Storage',
                      badge: 'New'
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='208'
                  height='80'
                  fill='none'>
                  <path
                    fill='#FAFF69'
                    d='m124 39-9.86-5.7v11.4L124 39Zm-44 0v.99h1.83V38H80v1Zm5.5 0v.99h3.67V38H85.5v1Zm7.33 0v.99h3.67V38h-3.67v1Zm7.34 0v.99h3.66V38h-3.66v1Zm7.33 0v.99h3.67V38h-3.67v1Zm7.33 0v.99h3.67V38h-3.67v1Zm9.17 0-9.86-5.7v11.4L124 39Zm-44 0v.99h1.83V38H80v1Zm5.5 0v.99h3.67V38H85.5v1Zm7.33 0v.99h3.67V38h-3.67v1Zm7.34 0v.99h3.66V38h-3.66v1Zm7.33 0v.99h3.67V38h-3.67v1Zm7.33 0v.99h3.67V38h-3.67v1Z'
                  />
                  <rect
                    width='79.17'
                    height='79.17'
                    x='.42'
                    y='.42'
                    stroke='#414141'
                    stroke-width='.83'
                    rx='6.25'
                  />
                  <path
                    fill='#32BEDD'
                    d='M9.78 28.58h60.44v33.7a2.02 2.02 0 0 1-2.02 2.02H11.8a2.02 2.02 0 0 1-2.02-2.02v-33.7Z'
                  />
                  <path
                    fill='#0078D4'
                    d='M11.8 15.7h56.4a2.02 2.02 0 0 1 2.01 2.02v10.86H9.78V17.72a2.02 2.02 0 0 1 2.03-2.02Zm25.8 17.36H17.28a1 1 0 0 0-1 1v10.11a1 1 0 0 0 1 1.01H37.6a1 1 0 0 0 1.01-1V34.06a1 1 0 0 0-1-1Z'
                  />
                  <path
                    fill='#fff'
                    d='M62.52 33.06H42.2a1 1 0 0 0-1 1v10.11a1 1 0 0 0 1 1.01h20.32a1 1 0 0 0 1-1V34.06a1 1 0 0 0-1-1Z'
                  />
                  <path
                    fill='#0078D4'
                    d='M37.49 47.57H17.17a1 1 0 0 0-1 1v10.1a1 1 0 0 0 1 1.01h20.32a1 1 0 0 0 1-1v-10.1a1 1 0 0 0-1-1.01Zm24.91 0H42.1a1 1 0 0 0-1 1v10.1a1 1 0 0 0 1 1.01h20.3a1 1 0 0 0 1-1v-10.1a1 1 0 0 0-1-1.01Z'
                  />
                  <rect
                    width='79.17'
                    height='79.17'
                    x='128.42'
                    y='.42'
                    stroke='#414141'
                    stroke-width='.83'
                    rx='6.25'
                  />
                  <path
                    fill='#fff'
                    d='M141.23 13.56c0-.32.27-.64.64-.64h4.72c.32 0 .65.27.65.64v52.4c0 .32-.27.64-.65.64h-4.72a.65.65 0 0 1-.64-.65V13.56Zm11.9 0c0-.32.27-.64.65-.64h4.72c.32 0 .64.27.64.64v52.4c0 .32-.27.64-.64.64h-4.72a.65.65 0 0 1-.65-.65V13.56Zm11.91 0c0-.32.27-.64.64-.64h4.72c.32 0 .64.27.64.64v52.4c0 .32-.26.64-.64.64h-4.72a.65.65 0 0 1-.64-.65V13.56Zm11.9 0c0-.32.27-.64.65-.64h4.72c.32 0 .64.27.64.64v52.4c0 .32-.27.64-.64.64h-4.72a.65.65 0 0 1-.65-.65V13.56Zm11.96 20.86c0-.32.27-.64.65-.64h4.71c.33 0 .65.27.65.64V45.1c0 .33-.27.65-.65.65h-4.71a.65.65 0 0 1-.65-.65V34.42Z'
                  />
                </svg>
              </div>
              <SuiTitle type='h2'>
                Azure Blob Storage ClickPipes is in Private Preview
              </SuiTitle>
              <SuiText className='opacity-70'>
                Seamlessly load files from Azure Blob Storage into ClickHouse
                Cloud. Get blazing fast analytics without the complexity or cost
                of external ETL tools.
              </SuiText>
            </div>
            <CUICard className='bg-neutral-900/80'>
              <CUICard.Body className='p-4 lg:p-6'>
                <CdcWaitlistForm formId='1390' />
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
