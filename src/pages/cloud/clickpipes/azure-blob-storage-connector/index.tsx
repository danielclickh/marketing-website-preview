import imageAddDataSource from './assets/add-data-source.png'
import imageCustomizeIncomingData from './assets/containers-files-ingestion-mode.png'
import imageDefineMappings from './assets/define-mappings.png'
import imageManagePipe from './assets/manage-pipe.png'
import imageMonitorPipe from './assets/monitoring.png'
import { CUIButton } from '@/components/ClickUI'
import ConnectorAnimation from '@/components/ConnectorAnimation'
import Layout from '@/components/Layout'
import LinedIconCard from '@/components/LinedIconCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import React, { CSSProperties } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'Azure Blob Storage ClickPipe is now Generally Available',
          description:
            'Seamlessly load files from Azure Blob Storage into ClickHouse Cloud. Get blazing fast analytics without the complexity or cost of external ETL tools.',
          path: '/cloud/clickpipes/azure-blob-storage-connector'
        },
        ...commonProps
      }
    }
  }

export default function Page({ headerData, seo }: CommonProps) {
  useGalaxyOnPage('azureBlobConnectorPage')

  return (
    <Layout seo={seo} headerData={headerData}>
      {/* Hero */}
      <div
        className='bg-shadow-element yellow-shadow shadow-circle relative my-20 lg:my-24'
        style={
          {
            '--top-side': '130%',
            '--left-side': '80%'
          } as CSSProperties
        }>
        <div className='section-container relative z-10'>
          <div className='mx-auto w-full space-y-6 text-center lg:max-w-4xl'>
            <div className='mb-10 flex justify-center'>
              <ConnectorAnimation
                logo={
                  <Image
                    src='/images/cloud/integrations/azure-blob-storage.svg'
                    width={90}
                    height={72}
                    alt='Azure Blob Storage'
                  />
                }
              />
            </div>
            <SuiTitle type='h1'>
              Azure Blob Storage ClickPipe is now Generally Available
            </SuiTitle>
            <SuiText size='lg' className='text-neutral-200 lg:px-12'>
              Seamlessly load files from Azure Blob Storage into ClickHouse
              Cloud. Get blazing fast analytics without the complexity or cost
              of external ETL tools.
            </SuiText>
            <CUIButton
              type='primary'
              size='lg'
              className='group mx-auto mt-8 px-10'
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=azureBlobConnectorHeroCta'
              onClick={useGalaxyOnClick(
                'azureBlobConnectorPage.heroCta.startFreeCloudTrialSelect'
              )}>
              Start a free cloud trial
            </CUIButton>
          </div>
        </div>
      </div>

      {/* Cards  */}
      <div className='relative z-10 bg-neutral-700 py-20'>
        <div className='section-container'>
          <SuiTitle type='h2' className='mb-16 text-center lg:!text-4xl'>
            Built for scale
          </SuiTitle>
          <div className='-mx-4 flex flex-col lg:mx-auto lg:max-w-4xl lg:flex-row lg:flex-wrap lg:justify-center'>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='shield-check'
                title='Built for reliability'
                text='Built on top of the azureBlobStorage table function, but adds layers of reliability to handle real-world scale. It gracefully handles automatic retries on failures and guarantees exactly-once ingestion—no cron jobs, no duplicates.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='tada'
                title='Secure by design'
                text='Supports ingestion from private buckets using connection strings with account credentials or storage account URLs. You can also use Shared Access Signatures (SAS) within the connection string for secure, time-limited access.'
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='sparkles'
                title='Optimized for performance'
                text="The connector dynamically adjusts ingestion parallelism and ClickHouse tuning based on your instance size and workload. It's built to move terabytes of data quickly and efficiently—without manual tuning."
                className='bg-neutral-900/80'
              />
            </div>
            <div className='p-4 lg:w-1/2'>
              <LinedIconCard
                icon='enterprise'
                title='Fully managed experience'
                text='The connector is fully integrated into the ClickHouse Cloud experience. It offers HA, built-in metrics and monitoring, including throughput, detailed logs for error diagnosis and debugging, in-place pipe editing (e.g., adding columns), and more.'
                className='bg-neutral-900/80'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div
        className='bg-shadow-element yellow-shadow shadow-circle my-24'
        style={
          {
            '--top-side': '0',
            '--right-side': '50%',
            '--left-side': 'auto'
          } as CSSProperties
        }>
        <div className='section-container relative z-10 space-y-16 lg:space-y-28 lg:pt-6'>
          <FeatureSection
            image={{
              src: imageAddDataSource,
              width: 956 / 2,
              height: 649 / 2,
              alt: 'Add your Azure credentials'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Add your Azure credentials
            </SuiTitle>
            <SuiText>Securely connect to your blob storage account.</SuiText>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            flip={true}
            image={{
              src: imageCustomizeIncomingData,
              width: 1035 / 2,
              height: 382 / 2,
              alt: 'Select container, files, and ingestion mode'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Select container, files, and ingestion mode
            </SuiTitle>
            <SuiText>
              Choose the containers or paths to ingest and whether you <br />
              want to batch or stream files.
            </SuiText>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            image={{
              src: imageDefineMappings,
              width: 1204 / 2,
              height: 697 / 2,
              alt: 'Monitor Pipe'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Define table and column mappings in ClickHouse
            </SuiTitle>
            <SuiText>View real-time progress and monitor data flow.</SuiText>
          </FeatureSection>
          <hr className='mx-auto w-2/3 opacity-10 lg:w-1/2' />
          <FeatureSection
            flip={true}
            image={{
              src: imageMonitorPipe,
              width: 904 / 2,
              height: 583 / 2,
              alt: 'Monitor your ingestion'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Monitor your ingestion
            </SuiTitle>
            <SuiText>Track data ingested and rows inserted overtime</SuiText>
          </FeatureSection>
          <FeatureSection
            image={{
              src: imageManagePipe,
              width: 952 / 2,
              height: 409 / 2,
              alt: 'Edit and manage your pipe'
            }}>
            <SuiTitle type='h3' className='mb-8 !text-4xl' weight='semibold'>
              Edit and manage your pipe
            </SuiTitle>
            <SuiText>
              Modify connection details, ingestion mode, table and column
              settings.
            </SuiText>
          </FeatureSection>
        </div>
      </div>

      {/* Get started */}
      <div className='section-container my-20 md:px-8 2xl:px-0'>
        <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-16 text-center'>
          <SuiTitle type='h2' color='text-default'>
            Get started with ClickHouse{' '}
            <span className='tilted tilted-black'>
              <span className='tilted-content text-white'>Cloud</span>
            </span>{' '}
            for free
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            We’ll get you started on a 30 day trial and $300 credits to spend at
            your own pace.
          </SuiText>
          <CUIButton
            type='primary-dark'
            size='lg'
            className='group mx-auto mt-8'
            target='_blank'
            href='https://console.clickhouse.cloud/signUp?loc=azureBlobConnectorPageFooterCta'
            onClick={useGalaxyOnClick(
              'azureBlobConnectorPage.footerCta.createFreeAccountSelect'
            )}>
            Create a free account
          </CUIButton>
        </div>
      </div>
    </Layout>
  )
}

function FeatureSection({
  image,
  children,
  flip = false
}: {
  image: ImageProps
  children: React.ReactNode
  flip?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-x-16 ${
        flip ? 'md:flex-row-reverse' : 'md:flex-row'
      } justify-center`}>
      <div className='mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
        <div className='space-y-4 border-yellow-200 md:border-l-4 md:pl-8'>
          {children}
        </div>
      </div>
      <div className='flex items-center justify-center md:w-1/2'>
        <Image {...image} alt={image.alt || ''} />
      </div>
    </div>
  )
}
