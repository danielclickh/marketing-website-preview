import callouts from './callouts.json'
import features from './features.json'
import { CUIButton } from '@/components/ClickUI'
import LogoCarousel from '@/components/LogoCarousel'
import Markdown from '@/components/Markdown'
import QuoteCard from '@/components/QuoteCard'
import GetStartedFree from '@/components/jp/GetStartedFree'
import Layout from '@/components/jp/Layout'
import AccordionComponent from '@/components/jp/LoggingDiagram/Accordion'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface LoggingProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<LoggingProps> =
  async function getStaticProps() {
    const params = {
      populate: [
        'seo',
        'seo.image',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    }

    const data = await findOne('homepage', params)

    data.seo.locale = 'ja_JP'
    data.seo.path = '/jp/use-cases/logging-and-metrics'
    data.seo.title = 'ClickHouseによるログ、イベント、トレース'
    data.seo.description =
      'ClickHouse is the fastest and most resource-efficient database for real-time analytics, making it the perfect fit for observability use cases.'
    data.seo.image = [{ url: '/images/use-cases/logging/og.png' }]
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
  customerStories,
  seo,
  headerData,
  footerData
}: LoggingProps) {
  useGalaxyOnPage('logsMetricsUseCasePage')
  useEffect(() => {
    const container = document.getElementById('regionsContainer')
    if (container) {
      const middlePosition =
        container.scrollWidth / 2 - container.clientWidth / 2
      container.scrollLeft = middlePosition
    }
  }, [])
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative z-20 overflow-hidden bg-grid pt-10'>
            <div className='absolute z-10 w-full bg-center bg-no-repeat lg:top-40 lg:h-[524px] lg:bg-speed-lines-ml'></div>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col xl:mt-16 xl:w-7/12'>
                  <h4 className='mb-6 w-full text-center text-base font-medium text-primary-300 lg:text-left'>
                    <Link href='/jp/use-cases'>すべてのユースケース</Link> /
                    ログ、イベント、トレース
                  </h4>
                  <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl lg:max-w-2xl lg:text-left'>
                    ClickHouseによるログ、イベント、トレース
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 text-center md:pr-16 lg:text-left'>
                    <p className='mb-6'>
                      業界最高水準の圧縮率、ミリ秒単位のクエリ応答時間、パワフルな集計関数、幅広い統合スイートを活用して、ログ、イベント、トレースを変換します。
                    </p>
                    <p className='mb-6'>
                      ClickHouseは、あらゆるスケールのオブザーバビリティプラットフォームを支えるために必要なコスト効率と驚異的な速度を提供します。
                    </p>
                  </SuiText>
                  <div className='relative z-40 mt-6 flex gap-6'>
                    <CUIButton
                      type='primary'
                      size='lg'
                      weight='semibold'
                      href='https://console.clickhouse.cloud/signUp?loc=use-case-logging'
                      target='_blank'
                      linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                      className='w-full'>
                      開始する
                    </CUIButton>
                    <CUIButton
                      type='secondary'
                      size='lg'
                      weight='semibold'
                      href='/jp/company/contact?loc=use-case-ml-and-ds'
                      target='_self'
                      linkClass='w-full mx-auto md:mx-0 max-w-[12rem]'
                      className='w-full'>
                      お問合せ
                    </CUIButton>
                  </div>
                </div>
                <div className='relative z-20 mx-auto mt-4 hidden md:flex md:w-4/12'>
                  <Image
                    src='/images/use-cases/logging/logging-use-cases-hero.svg'
                    alt='Open source ClickHouse'
                    width={488}
                    height={318}
                    className='h-auto w-full min-w-[54rem]'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-8 md:px-8 2xl:px-0'>
            <h2 className='text-center font-basier text-2xl font-semibold lg:text-4xl lg:leading-relaxed'>
              なぜ多くの企業が驚異的に高速なSQLベースのオブザーバビリティストレージとしてClickHouseを選んでいるのか
            </h2>
          </div>
          <div className='mx-auto flex max-w-5xl flex-col gap-10 pb-24 md:flex-row'>
            {features.map((feature) => {
              return (
                <div key={feature.id} className='flex-1 text-center'>
                  <Image
                    src={feature.icon}
                    width={32}
                    height={32}
                    alt={feature.content}
                    className='mx-auto h-11 w-auto'
                  />
                  <div className='rich_content px-12 pt-4 text-lg text-neutral-200'>
                    <ReactMarkdown>{feature.content}</ReactMarkdown>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='clip-inverted-triangle bg-neutral-725'>
          <div className='section-container max-w-7xl'>
            <div className='relative flex flex-col rounded-lg border-t-2 border-primary-300 bg-neutral-900 text-left text-neutral-0 shadow-lg'>
              <div className='p-10'>
                <div className='space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0'>
                  <QuoteCard
                    className='flex-1'
                    content={
                      '“At Sony LIV, we ingest tens of millions of video streaming events into ClickHouse Cloud and run queries to generate complex dashboards for analysis. This allows our operations team to monitor, alert & troubleshoot the QOS and QOE of our customers in real-time. ClickHouse Cloud has helped us to optimize costs and ensure the high availability and resilience of our services.”'
                    }
                    logo={{
                      src: '/images/sony.svg',
                      width: 80,
                      height: 17,
                      alt: 'Sony'
                    }}
                  />
                  <QuoteCard
                    className='flex-1'
                    content={
                      '"Trip.com was using Elasticsearch for their observability data until they made the switch to ClickHouse. The result? 40GB per second, 30% savings in costs, and queries that are up to 30x faster!"'
                    }
                    link='/blog/how-trip.com-migrated-from-elasticsearch-and-built-a-50pb-logging-solution-with-clickhouse'
                    logo={{
                      src: '/images/use-cases/logging/tripdotcom.svg',
                      width: 135,
                      height: 33,
                      alt: 'Trip.com'
                    }}
                  />
                  <QuoteCard
                    className='flex-1'
                    content={
                      '"Migrating logs from Elasticsearch to ClickHouse has not only significantly reduced storage costs but also provided us with a faster querying experience."'
                    }
                    link='/blog/didi-migrates-from-elasticsearch-to-clickHouse-for-a-new-generation-log-storage-system'
                    logo={{
                      src: '/images/didi-logo-white.svg',
                      width: 110,
                      height: 30,
                      alt: 'didi'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='-mt-1 h-1 w-full bg-primary-300'></div>
        </div>
        <div className='bg-primary-300 py-12'></div>

        <div className='relative z-10 mx-auto -mt-10 bg-primary-300'>
          <div className='relative z-10 mx-auto -mt-10 max-w-7xl'>
            <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0'>
              <div className='flip-selection mx-auto flex flex-col text-center'>
                <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-4 pt-12 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
                  大規模なデータを扱う開発者から信頼をいただいています。
                </div>
              </div>
            </div>
            <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center pb-20 md:gap-x-14'>
              <div className='absolute left-0 z-20 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
              <div className='absolute right-0 z-20 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
              <LogoCarousel
                logos={customerStories.logos}
                speedClass1='animate-marqueeLeft5'
                speedClass2='animate-marqueeLeft6'
              />
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 pb-24'>
          <div className='relative mx-auto pt-12 md:px-0 md:pt-24'>
            <div className='mx-auto max-w-7xl'>
              <AccordionComponent />
              <div className='mx-auto max-w-5xl px-4 xl:px-0'>
                <div className='grid justify-between gap-20 pt-20 lg:grid-cols-2'>
                  {callouts.map((feature) => (
                    <div key={feature.id} className='px-3'>
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={32}
                        height={32}
                        className='mb-4'
                      />
                      <h3 className='mb-4 text-lg font-bold'>
                        {feature.title}
                      </h3>
                      <div className='rich_content text-base text-neutral-200'>
                        <Markdown>{feature.content}</Markdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-shadow-element-right yellow-shadow'>
          <div className='section-container mb-24 flex w-full pt-24 text-neutral-0 md:px-8 2xl:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center rounded-xl border border-neutral-700/80 bg-neutral-900/50 bg-right bg-no-repeat px-4 py-16 xl:px-24'>
              <div className='flex flex-col text-center'>
                <SuiTitle type='h2' color='white'>
                  サポート{' '}
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content'>リファレンス</span>
                  </span>
                </SuiTitle>
                <div className='mx-auto mb-8 mt-6 max-w-2xl text-center text-neutral-300'>
                  ClickHouseによる以下のブログに、オブザーバビリティソリューションのためにClickhouseを導入する方法について詳しく説明されています。
                </div>
                <div className='bg-neutral-725 p-8'>
                  <ol className='list-decimal space-y-2 text-left text-primary-300'>
                    <li>
                      <Link
                        href='/blog/storing-log-data-in-clickhouse-fluent-bit-vector-open-telemetry'
                        target='_blank'
                        className='text-primary-300'>
                        Building an Observability Solution with ClickHouse -
                        Part 1 - Logs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='https://clickhouse.com/docs/knowledgebase/use-clickhouse-for-log-analytics'
                        target='_blank'
                        className='text-primary-300'>
                        Docs: Using ClickHouse for log analytics
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/nginx-logs-to-clickhouse-fluent-bit'
                        target='_blank'
                        className='text-primary-300'>
                        Sending Nginx logs to ClickHouse with Fluent Bit
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/working-with-time-series-data-and-functions-ClickHouse'
                        target='_blank'
                        className='text-primary-300'>
                        Working with Time Series Data in ClickHouse
                      </Link>
                    </li>
                    <li>
                      <a
                        target='_blank'
                        href='https://www.zomato.com/blog/building-a-cost-effective-logging-platform-using-clickhouse-for-petabyte-scale'
                        className='text-primary-300'>
                        Building a cost-effective logging platform using
                        ClickHouse for petabyte scale
                      </a>
                    </li>
                    <li>
                      <Link
                        href='/blog/helicones-migration-from-postgres-to-clickhouse-for-advanced-llm-monitoring'
                        target='_blank'
                        className='text-primary-300'>
                        Helicone's Migration from Postgres to ClickHouse for
                        Advanced LLM Monitoring
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/how-trip.com-migrated-from-elasticsearch-and-built-a-50pb-logging-solution-with-clickhouse'
                        target='_blank'
                        className='text-primary-300'>
                        How trip.com migrated from Elasticsearch and built a
                        50PB logging solution with ClickHouse
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className='section-container my-20 text-neutral-0 md:px-8 xl:my-44 2xl:px-0'>
            <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=logging-use-case-getstarted-footer' />
          </div>
        </div>
      </Layout>
    </>
  )
}
