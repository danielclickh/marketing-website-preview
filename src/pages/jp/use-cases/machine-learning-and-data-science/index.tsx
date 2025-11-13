import callouts from './callouts.json'
import checkpoints from './checkpoints.json'
import features from './features.json'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton } from '@/components/ClickUI'
import LogoCarousel from '@/components/LogoCarousel'
import Markdown from '@/components/Markdown'
import QuoteCard from '@/components/QuoteCard'
import GetStartedFree from '@/components/jp/GetStartedFree'
import Layout from '@/components/jp/Layout'
import AccordionComponent from '@/components/jp/MLDiagram/Accordion'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface MLProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<MLProps> =
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
    data.seo.path = '/jp/use-cases/machine-learning-and-data-science'
    data.seo.title =
      'ClickHouse による機械学習と GenAI | ML とデータ サイエンスのための ClickHouse'
    data.seo.description =
      '機械学習ワークロードを強化する究極のリアルタイム データベース。ClickHouse を使用すると、分析データに GenAI を活用することがこれまで以上に簡単になります。'
    data.seo.image = [{ url: '/images/og-ml-ds.png' }]
    data.seo.languages = ['en', 'ja']

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function MLUseCasePage({
  customerStories,
  seo,
  headerData,
  footerData
}: MLProps) {
  useGalaxyOnPage('mlAIUseCasePage')
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
          <div className='relative z-20 overflow-hidden bg-grid pb-20 pt-10'>
            <div className='absolute z-10 w-full bg-center bg-no-repeat lg:top-64 lg:h-[524px] lg:bg-speed-lines-ml'></div>
            <div className='container relative z-40 mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col xl:mt-16'>
                  <div className='w-full lg:max-w-xl xl:max-w-full'>
                    <h4 className='mb-6 w-full text-center text-base font-medium text-primary-300 lg:text-left'>
                      <Link href='/jp/use-cases'>すべてのユースケース</Link> /
                      機械学習と生成AI
                    </h4>
                    <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl lg:max-w-lg lg:text-left'>
                      機械学習と生成AI
                    </h1>
                    <SuiText
                      size='base'
                      color='secondary'
                      className='mt-6 text-center md:pr-16 lg:text-left'>
                      <p className='mb-6 font-normal'>
                        機械学習ワークロードを支える究極のリアルタイムデータベース。ClickHouseを使えば、生成AIのデータ分析能力を簡単にどこまでも引き出せます。
                      </p>
                    </SuiText>
                  </div>
                  <div className='lg:max-w-2xl xl:max-w-full'>
                    {checkpoints.map(({ content }, checkpointIndex) => {
                      return (
                        <TickItem
                          key={checkpointIndex}
                          className='my-4 text-neutral-200'>
                          {content}
                        </TickItem>
                      )
                    })}
                    <div className='relative z-40 mt-8 flex gap-6'>
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='https://console.clickhouse.cloud/signUp?loc=use-case-ml-and-ds'
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
                </div>
                <div className='relative z-30 mx-auto mt-20 hidden md:mt-10 md:w-4/12 lg:flex'>
                  <Image
                    src='/images/use-cases/ml-and-ds/ml-ds-hero.svg'
                    alt='ClickHouse'
                    width={326}
                    height={316}
                    className='h-auto w-full'
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
              次のような理由により、AIワークロードの強化にClickHouseが利用されています。
            </h2>
          </div>
          <div className='mx-auto flex max-w-6xl flex-col gap-5 pb-24 md:flex-row'>
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
                  <div className='rich_content px-3 pt-4 text-base text-neutral-200'>
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
                <div className='space-y-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0'>
                  <QuoteCard
                    content={
                      '"We aggregate the user\'s history in ClickHouse and use it as a data store for training and inference. Even when reading 10s of millions of rows, the performance was very nice and not the bottleneck when training new models."'
                    }
                    link='/blog/deepls-journey-with-clickhouse'
                    logo={{
                      src: '/images/use-cases/ml-and-ds/DeepL_logo.svg',
                      width: 120,
                      height: 42,
                      alt: 'DeepL'
                    }}
                  />
                  <QuoteCard
                    content={
                      '"ClickHouse was able to efficiently process queries that previously had taken hours or even days to complete. This was hugely valuable for Cognitiv’s data team, allowing them to rapidly iterate and refine their machine learning models."'
                    }
                    link='/blog/transforming-ad-tech-how-cognitiv-uses-clickhouse-to-build-better-machine-learning-models?loc=ml-use-case'
                    logo={{
                      src: '/images/use-cases/ml-and-ds/cognitiv-logo-white.svg',
                      width: 245,
                      height: 39,
                      alt: 'Cognitiv'
                    }}
                  />
                  <QuoteCard
                    content={
                      '"We collect tens of thousands of data points from customers\' phones and other more traditional sources. ClickHouse is used as a way to process all of these SMS messages and extract valuable information used for the scoring and fraud models."'
                    }
                    link='/blog/how-quickcheck-uses-clickhouse-to-bring-banking-to-the-unbanked'
                    logo={{
                      src: '/images/use-cases/ml-and-ds/QuickCheck.svg',
                      width: 253,
                      height: 40,
                      alt: 'QuickCheck'
                    }}
                  />
                  <QuoteCard
                    content={
                      '"By utilizing expert models and embeddings, we detect substantive changes in web pages and identify connections between pages that share similar characteristics."'
                    }
                    link='/blog/corsearch-replaces-mysql-with-clickhouse-for-content-and-brand-protection'
                    logo={{
                      src: '/images/use-cases/ml-and-ds/corsearch-logo.svg',
                      width: 180,
                      height: 22,
                      alt: 'Corsearch'
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
            <div className='section-container relative max-w-5xl pb-20'>
              <LogoCarousel logos={customerStories.logos} />
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
                  ClickHouseによる以下のブログに、機械学習のためにClickhouseを導入する方法について詳しく説明されています。
                </div>
                <div className='bg-neutral-725 p-8'>
                  <ol className='list-decimal space-y-2 text-left text-primary-300'>
                    <li>
                      <Link
                        href='/blog/vector-search-clickhouse-p1'
                        target='_blank'
                        className='text-primary-300'>
                        Vector Search with ClickHouse - Part 1
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/vector-search-clickhouse-p2'
                        target='_blank'
                        className='text-primary-300'>
                        Vector Search with ClickHouse - Part 2
                      </Link>
                    </li>
                    <li>
                      <a
                        href='https://www.youtube.com/watch?v=hGRNcftpqAk'
                        className='text-primary-300'
                        target='_blank'>
                        Video: ClickHouse for AI - Vectors, Embedding, Semantic
                        Search, and more - Alexey Milovidov, ClickHouse
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.youtube.com/watch?v=F08ktx1ZrpI'
                        className='text-primary-300'
                        target='_blank'>
                        Video: Vector Search In ClickHouse - Dale McDiarmid
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://python.langchain.com/docs/integrations/vectorstores/clickhouse'
                        className='text-primary-300'
                        target='_blank'>
                        Using Langchain with ClickHouse
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://deepnote.com/blog/clickhouse'
                        className='text-primary-300'
                        target='_blank'>
                        Using Deepnote with ClickHouse
                      </a>
                    </li>
                    <li>
                      <Link
                        href='/blog/query-analyze-hugging-face-datasets-with-clickhouse'
                        target='_blank'
                        className='text-primary-300'>
                        Analyzing Hugging Face datasets with ClickHouse
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/clickhouse-open-ai-user-defined-functions-udfs'
                        target='_blank'
                        className='text-primary-300'>
                        Using ClickHouse UDFs to integrate with OpenAI models
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/forecasting-using-clickhouse'
                        target='_blank'
                        className='text-primary-300'>
                        Forecasting Using ClickHouse Machine Learning Functions
                      </Link>
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
                        href='/blog/clickHouse-and-the-machine-learning-data-layer'
                        target='_blank'
                        className='text-primary-300'>
                        ClickHouse and the Machine Learning Data Layer
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/blog/powering-featurestores-with-clickhouse'
                        target='_blank'
                        className='text-primary-300'>
                        Powering Feature Stores with ClickHouse
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className='section-container my-20 text-neutral-0 md:px-8 xl:my-44 2xl:px-0'>
            <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=ml-and-ds-use-case-getstarted-footer' />
          </div>
        </div>
      </Layout>
    </>
  )
}
