import bigNumbers from './big-numbers.json'
import features from './features.json'
import references from './supporting-references.json'
import { CUIButton } from '@/components/ClickUI'
import LogoCarousel from '@/components/LogoCarousel'
import Markdown from '@/components/Markdown'
import QuoteCard from '@/components/QuoteCard'
import AccordionComponent from '@/components/jp/BusinessIntelligenceDiagram/Accordion'
import GetStartedFree from '@/components/jp/GetStartedFree'
import Layout from '@/components/jp/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

interface RealTimeAnalyticsPageProps extends CommonProps {
  customerStories: any
}

export const getStaticProps: GetStaticProps<RealTimeAnalyticsPageProps> =
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
    data.seo.path = '/jp/use-cases/business-intelligence'
    data.seo.title = 'ClickHouseによるビジネスインテリジェンス'
    data.seo.description =
      '読み込みスピナーと長いレポート待ち時間はもう必要ありません。ビジネス インテリジェンスでは、ClickHouse を使用すると、わずかなコストでクエリを高速化できます。'
    data.seo.languages = ['en', 'ja']

    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function RealTimeAnalyticsPage({
  customerStories,
  seo,
  headerData
}: RealTimeAnalyticsPageProps) {
  useGalaxyOnPage('bizIntelUseCasePage')
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
      <Layout seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative z-20 overflow-hidden bg-grid pb-24 pt-10'>
            <div className='container relative z-40 mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 md:bg-no-repeat md:px-8 lg:min-h-[430px] 2xl:px-0'>
              <div className='flex items-center'>
                <div className='flex-col items-center xl:mt-16'>
                  <div className='w-full lg:max-w-xl xl:max-w-full'>
                    <h4 className='mb-6 w-full text-center text-base font-medium text-primary-300 lg:text-left'>
                      <Link href='/jp/use-cases'>すべてのユースケース</Link> /
                      ビジネスインテリジェンス
                    </h4>
                    <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl lg:max-w-xl lg:text-left'>
                      ClickHouseによるビジネスインテリジェンス
                    </h1>
                    <SuiText
                      size='base'
                      color='secondary'
                      className='mt-6 text-center md:pr-16 lg:text-left'>
                      <p className='mb-12 max-w-2xl text-xl font-normal leading-[175%]'>
                        タスクをいくつも読み込む必要も、レポート作成に時間をかける必要もありません。ClickHouseならビジネスインテリジェンスのクエリが驚くほど高速になります。
                      </p>
                    </SuiText>
                  </div>
                  <div className='lg:max-w-2xl xl:max-w-full'>
                    <div className='relative z-40 mt-6 flex gap-6'>
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='https://console.clickhouse.cloud/signUp?loc=use-case-business-intelligence'
                        target='_blank'
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                        className='w-full'>
                        開始する
                      </CUIButton>
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href='/jp/company/contact?loc=use-case-business-intelligence'
                        target='_self'
                        linkClass='w-full mx-auto md:mx-0 max-w-[12rem]'
                        className='w-full'>
                        お問合せ
                      </CUIButton>
                    </div>
                  </div>
                </div>
                <div className='relative z-30 mx-auto hidden md:w-4/12 lg:flex lg:w-[400px] xl:w-[525px]'>
                  <Image
                    src='/images/bi-hero.svg'
                    alt='ClickHouse'
                    width={537}
                    height={314}
                    className='h-auto w-full'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725'>
          <div className='bg-neutral-725 text-neutral-0'>
            <div className='container mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-8 md:px-8 2xl:px-0'>
              <h2 className='text-center font-basier text-2xl font-semibold lg:text-4xl lg:leading-relaxed'>
                他のウエアハウスとの比較
              </h2>
              <div className='py-12'>
                <div className='mx-auto grid max-w-xl grid-cols-3 justify-between gap-x-6 gap-y-10 text-center md:gap-x-16'>
                  {bigNumbers.map((number, index) => {
                    return (
                      <div key={index}>
                        <div className='flex items-center rounded-[36px] border-4 border-primary-300 bg-[#1E1E1B] py-8 text-center md:min-h-[144px] md:min-w-[144px] md:py-0'>
                          <p className='w-full text-3xl font-semibold text-primary-300 md:text-5xl'>
                            {number.stat}
                          </p>
                        </div>
                        <p className='mt-6 text-base font-semibold md:text-lg'>
                          {number.content}
                        </p>
                        {number.readmore && (
                          <Markdown className='text-center text-base'>
                            {number.readmore}
                          </Markdown>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='clip-inverted-triangle before:-top-40'></div>
        </div>
        <div className='relative z-10 mx-auto -mt-1 bg-primary-300'>
          <div className='relative z-10 mx-auto max-w-7xl'>
            <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0'>
              <div className='flip-selection mx-auto flex flex-col text-center'>
                <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-4 pt-10 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
                  大規模なデータを扱う開発者から信頼をいただいています。
                </div>
              </div>
            </div>
            <div className='section-container relative max-w-5xl pb-16'>
              <LogoCarousel logos={customerStories.logos} />
            </div>
          </div>
        </div>
        <div className='bg-neutral-725'>
          <div className='relative mx-auto pb-24 pt-12 md:px-0 md:pt-24'>
            <div className='section-container mx-auto max-w-7xl'>
              <div className='mx-auto max-w-7xl'>
                <div className='flex w-full flex-col items-center'>
                  <div className='grid justify-between gap-10 md:grid-cols-2 xl:grid-cols-4'>
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className='rounded-lg border border-t-4 border-[#414141] border-t-primary-300 bg-neutral-900 p-7 shadow-lg'>
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
          <div className='clip-inverted-triangle bg-shadow-element-right yellow-shadow bg-neutral-725'>
            <div className='section-container max-w-7xl'>
              <div className='relative flex flex-col rounded-lg border-t-2 border-primary-300 bg-neutral-900 text-left text-neutral-0 shadow-lg'>
                <div className='p-10'>
                  <h2 className='mb-10 text-center font-basier text-2xl font-semibold lg:text-4xl lg:leading-relaxed'>
                    お客さまの声
                  </h2>
                  <div className='space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0'>
                    <QuoteCard
                      content={
                        '"At Lyft, **we ingest tens of millions of rows and execute millions of read queries in ClickHouse daily with volume continuing to increase**. On a monthly basis, this means reading and writing more than 25TB of data."'
                      }
                      logo={{
                        src: '/images/use-cases/real-time-analytics/lyft-logo.svg',
                        width: 64,
                        height: 45,
                        alt: 'Lyft'
                      }}
                    />
                    <QuoteCard
                      content={
                        '"With dbt execution orchestrated in various intervals, we can also leverage ClickHouse for internal BI use cases. We’ve found this setup very practical, as we can flexibly create new analytical views of our customer data without moving it from our production operational systems."'
                      }
                      link='/blog/building-a-unified-data-platform-with-clickhouse'
                      logo={{
                        src: '/images/use-cases/business-intelligence/synq-logo.svg',
                        width: 116,
                        height: 43,
                        alt: 'synq'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='-mt-1 h-1 w-full bg-primary-300'></div>
            <div className='bg-primary-300 py-11'></div>
          </div>
          <div className='bg-primary-300 pb-24'>
            <div className='section-container mx-auto max-w-7xl'>
              <AccordionComponent />
              <div className='mx-auto max-w-6xl pt-24'>
                <div className='flex flex-col gap-y-12 text-center text-black md:flex-row md:divide-x md:divide-[#1E1E1E]'>
                  <div className='px-12 md:w-1/2'>
                    <h3 className='mb-8 font-basier text-3xl font-bold leading-10'>
                      最高水準のパフォーマンス
                    </h3>
                    <p>
                      JVMベースのソリューションでは大量のヒープでコストのかかるでGCサイクルのために、垂直方向にスケーリングに制限がかかります。ClickHouseは水平と垂直の両方向にスケーリングすることが可能であり、数百のCPUコアとペタバイト規模のストレージなどの大規模なリソースでもフルに活用できます。
                    </p>
                  </div>
                  <div className='px-12 md:w-1/2'>
                    <h3 className='mb-8 px-12 font-basier text-3xl font-bold leading-10'>
                      柔軟かつスケーラブルに同時実行可能
                    </h3>
                    <p>
                      ClickHouseを使用すれば、ユーザーが使い慣れている強力なビジネスインテリジェンスアプリケーションを構築でき、スケールにおけるレスポンスを心配する必要はありません。毎秒数百万行のデータをインジェストしても、同時実行処理の負荷がどれほど高くても、クエリの速度が低下しません。
                    </p>
                  </div>
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
                  サポート
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content'>リファレンス</span>
                  </span>
                </SuiTitle>
                <div className='mx-auto mb-8 mt-6 max-w-2xl text-center text-neutral-300'>
                  ClickHouseによる以下のブログに、ビジネスインテリジェンスのためにClickhouseを導入する方法について詳しく説明されています。
                </div>
                <div className='bg-neutral-725 p-8'>
                  <ol className='list-decimal space-y-2 text-left text-primary-300'>
                    {references.map((reference, index) => {
                      return (
                        <li key={index}>
                          <Link
                            href={reference.href}
                            target={reference.target}
                            className='text-primary-300'>
                            {reference.text}
                          </Link>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className='section-container pb-24 text-neutral-0 md:px-8 2xl:px-0'>
            <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=real-time-use-case-getstarted-footer' />
          </div>
        </div>
      </Layout>
    </>
  )
}
