import features from './features.json'
import ClickPipesAnimationV2 from '@/components/ClickPipesAnimation/ClickPipesAnimationV2'
import { CUIButton } from '@/components/ClickUI'
import GetStartedFree from '@/components/jp/GetStartedFree'
import Layout from '@/components/jp/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ClickPipesData } from '@/types/clickpipes'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export const getStaticProps: GetStaticProps<ClickPipesData> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          locale: 'ja_JP',
          path: '/jp/cloud/clickpipes',
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
              <div className='flex justify-between'>
                <div className='flex-col text-center lg:mt-16 lg:max-w-xl lg:text-left'>
                  <h4 className='mb-4 text-base font-semibold text-primary-300'>
                    <Link href='/jp/cloud'>クラウド</Link> / データインジェスト
                  </h4>
                  <h1 className='relative mb-3 mt-4 inline-block font-basier text-4xl font-semibold leading-tight md:mt-0 md:text-5.5xl'>
                    ClickPipes
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 text-neutral-200 md:pr-16'>
                    膨大な量のデータをさまざまなソースから、ボタンを数回クリックするだけで簡単に取り込むためのインジェストエンジンです。
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
                      開始する
                    </CUIButton>
                    <CUIButton
                      type='secondary'
                      weight='semibold'
                      size='lg'
                      href='https://clickhouse.com/docs/integrations/clickpipes'
                      target='_blank'
                      linkClass='w-full max-w-[14rem]'
                      className='w-full'>
                      ドキュメントを見る
                    </CUIButton>
                  </div>
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
              外部データ ソースを ClickHouse Cloud にシームレスに接続します。
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
                  <SuiTitle type='h2'>利用可能なコネクタ</SuiTitle>
                  <SuiText className='mx-auto mt-6 max-w-[844px] opacity-70'>
                    ClickPipesはデータをさまざまなソースから簡単に取り込むためのインジェストエンジンです。Amazon
                    S3やGoogle Cloud
                    Storage用の新しいコネクタも追加されています。スケーラブルなアーキテクチャが高スループットと低遅延を実現し、負荷の高い処理に最適です。
                  </SuiText>
                </div>
                <div className='-mx-2 -mb-3 mt-8 flex max-w-[1040px] flex-wrap items-stretch justify-center sm:-mx-3 lg:mx-auto'>
                  {[
                    {
                      logo: '/images/cloud/integrations/amazon_s3.svg',
                      name: 'Amazon S3'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/aws-kinesis.svg',
                      name: 'Amazon Kinesis'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/aws-msk.svg',
                      name: 'Amazon MSK'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/confluent-logos-idXfleyO4U-1.svg',
                      name: 'Confluent Cloud'
                    },
                    {
                      logo: '/images/cloud/integrations/google-cloud-storage.svg',
                      name: 'Google Cloud Storage'
                    },
                    {
                      logo: '/images/cloud/integrations/kafka.svg',
                      name: 'Apache Kafka'
                    },
                    {
                      logo: '/images/cloud/integrations/redpanda.svg',
                      name: 'Redpanda'
                    },
                    {
                      logo: '/images/cloud/integrations/upstash.svg',
                      name: 'Upstash Kafka'
                    },
                    {
                      logo: '/images/cloud/integrations/diagram/azure-event-hub.svg',
                      name: 'Azure Event Hubs'
                    },
                    {
                      logo: '/images/cloud/integrations/warpstream.svg',
                      name: 'WarpStream'
                    }
                  ].map(({ logo, name }) => {
                    return (
                      <div
                        key={name}
                        className='w-1/2 p-2 sm:p-3 md:w-1/3 lg:w-1/4'>
                        <div className='relative flex h-full flex-col items-center rounded-sm bg-neutral-700/70 px-4 pb-6 pt-8'>
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
              </div>
            </div>
          </div>
        </div>
        <div className='bg-primary-300 py-12'></div>

        <div className='relative mx-auto mt-12 flex flex-col gap-y-28 md:mt-24 md:px-0'>
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
                className='mb-4 mt-8 px-8 text-center md:px-0'>
                コネクタのコレクションを拡大中
              </SuiTitle>
              <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-16'>
                詳細については、{' '}
                <Link
                  href='/jp/company/contact?loc=clickpipes'
                  className='text-primary-300'>
                  Clickhouse にお問い合わせください
                </Link>
                。
              </div>
            </div>
          </div>
        </div>

        <div className='section-container my-12 pb-16 md:px-8 2xl:px-0'>
          <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=clickpipes-getstarted-footer' />
        </div>
      </Layout>
    </>
  )
}
