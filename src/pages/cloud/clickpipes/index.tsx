import features from './features.json'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
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
                    href='/cloud/clickpipes/mongodb-cdc-connector?loc=clickpipes-hero'
                    logo={{
                      src: '/images/cloud/integrations/mongodb.svg',
                      alt: 'MongoDB',
                      width: 24,
                      height: 50,
                      className: 'mx-3'
                    }}>
                    Blazing-fast MongoDB to ClickHouse CDC with our new
                    ClickPipe connector — now in Public Beta.{' '}
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
                      logo: '/images/cloud/integrations/mongodb.svg',
                      name: 'MongoDB CDC',
                      badge: 'New'
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

        {/*<div className='section-container my-20'>
          <div className='mx-auto w-full lg:max-w-xl'>
            <div className='mb-4 space-y-4 text-center md:-mx-4 lg:mb-6'>
              <div className='mb-10 flex justify-center'>
                <CdcAnimation
                  logo={
                    <div className='-mr-4 flex aspect-square w-20 items-center justify-center rounded-lg border border-[#113C55] bg-[#081E2B]'>
                      <Image
                        src='/images/cloud/integrations/mongodb.svg'
                        width={24}
                        height={50}
                        alt='MongoDB'
                        className='m-3'
                      />
                    </div>
                  }
                  badges={[
                    { label: 'insert', theme: 'yellow' },
                    { label: 'insert', theme: 'yellow' },
                    { label: 'update', theme: 'blue' },
                    { label: 'delete', theme: 'red' },
                    { label: 'replace', theme: 'blue' },
                    { label: 'add col', theme: 'yellow' }
                  ]}
                />
              </div>
              <SuiTitle type='h2'>MongoDB CDC is in Private Preview</SuiTitle>
              <SuiText className='opacity-70'>
                Stream your MongoDB data into ClickHouse Cloud to bridge the gap
                between transactional and analytical workloads — blazing fast
                with our new ClickPipes MongoDB CDC connector!
              </SuiText>
            </div>
            <CUICard className='bg-neutral-900/80'>
              <CUICard.Body className='p-4 lg:p-6'>
                <CdcWaitlistForm formId='1441' />
              </CUICard.Body>
            </CUICard>
          </div>
        </div>*/}

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
