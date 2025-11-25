import useCasesJP from './use-cases.json'
import Accordion from '@/components-cleaned/Accordion'
import { CUIButton, CUICard } from '@/components/ClickUI'
import { StrapiImageUrl } from '@/components/StrapiElements'
import GetStartedFree from '@/components/jp/GetStartedFree'
import Layout from '@/components/jp/Layout'
import UseCasesComparisons from '@/components/jp/UseCasesComparisons'
import { SuiTitle } from '@/components/sui'
import { findAll, findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { Quote, useCasesPageDataProps } from '@/types/useCasesPage'
import { ChevronRightIcon } from '@heroicons/react/solid'
import 'glider-js/glider.min.css'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CSSProperties } from 'react'

export const getStaticProps: GetStaticProps<useCasesPageDataProps> =
  async function getStaticProps() {
    const useCasesPageData = await findOne('use-case-feature', {
      populate: ['ctaButton', 'Industries', 'Industries.icon']
    })

    const individualUseCasesParams = {
      sort: ['id:ASC'],
      populate: [
        'description',
        'shortDescription',
        'ClientsUsingUseCase',
        'ClientsUsingUseCase.*',
        'ClientsUsingUseCase.logo.*',
        'icon'
      ]
    }
    const { data: individualUseCases } = await findAll(
      'individual-use-cases',
      individualUseCasesParams
    )

    const quotesParams = {
      sort: ['id:DESC'],
      populate: ['quotes', 'quotes.*', 'quotes.logo.*', 'id']
    }
    const { data: quotes }: { data: Array<any> } = await findAll(
      'use-case-quotes',
      quotesParams
    )

    const firstThreeIds = [3, 14, 9] // Specify the IDs you want to keep at the beginning
    quotes.sort((a, b) => {
      const aIndex = firstThreeIds.indexOf(a.id)
      const bIndex = firstThreeIds.indexOf(b.id)

      // If both elements are in the firstThreeIds array, sort them based on their index
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }

      // If only one of the elements is in the firstThreeIds array, prioritize it
      if (aIndex !== -1) {
        return -1
      }

      if (bIndex !== -1) {
        return 1
      }

      // If neither element is in the firstThreeIds array, maintain their original order
      return 0
    })

    const commonProps = await getCommonProps()
    return {
      props: {
        useCasesPageData,
        individualUseCases,
        quotes,
        seo: {
          locale: 'ja_JP',
          title: 'すべてのユースケース | ClickHouse',
          description: useCasesPageData.Description,
          path: '/jp/use-cases',
          languages: ['en', 'ja']
        },
        ...commonProps
      }
    }
  }

function UseCasesPage({
  seo,
  headerData,
  footerData,
  useCasesPageData,
  individualUseCases,
  quotes
}: useCasesPageDataProps) {
  useGalaxyOnPage('useCasesPage')

  const useCaseOrder = [2, 9, 7, 5]
  const sortedUseCases = useCaseOrder
    .map((id) => individualUseCases.find((useCase) => useCase.id === id))
    .filter((useCase) => useCase)

  const desiredOrderIds = [18, 9, 5, 7, 8, 17, 21, 4, 19, 10, 11, 12, 13] // IDs in the desired order
  const quotesInDesiredOrder: Array<Quote> = []

  // Iterate through the desired order IDs
  desiredOrderIds.forEach((id) => {
    // Find the quote with the current ID
    const quote = quotes.find((quote) => quote.id === id)
    if (quote) {
      // If the quote exists, push it to the quotesInDesiredOrder array
      quotesInDesiredOrder.push(quote)
    }
  })

  // Now, iterate through the original quotes array and push quotes that are not in the desired order
  quotes.forEach((quote) => {
    if (!desiredOrderIds.includes(quote.id)) {
      quotesInDesiredOrder.push(quote)
    }
  })

  const getUseCaseLink = (useCaseTitle: string | undefined | null) => {
    const map: Record<string, string> = {
      ビジネスインテリジェンス: '/use-cases/business-intelligence',
      'ログ、イベント、トレース': '/use-cases/logging-and-metrics',
      '機械学習 & 生成AI': '/use-cases/machine-learning-and-data-science',
      リアルタイム分析: '/use-cases/real-time-analytics'
    }

    return useCaseTitle ? map?.[useCaseTitle] || null : null
  }

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage bg-grid'>
        <div className='relative gap-24 px-8 pb-16 pt-16 md:px-0'>
          <div className='mx-auto max-w-3xl'>
            <div className='mx-auto text-center md:mr-0'>
              <h1 className='mb-6 font-basier text-4xl font-semibold text-neutral-200 md:text-5.5xl md:leading-tight'>
                ユースケース
              </h1>
              <p className='mx-auto mb-12 max-w-2xl text-xl leading-[175%] text-neutral-200'>
                より高速なクエリとより優れた同時実行性の実現。データ量が多くても対応可能です。
              </p>
              <p>
                <a
                  href={useCasesPageData.ctaButton.href}
                  target='_blank'
                  className='inline-block rounded border-primary-300 bg-primary-300 px-8 py-3 font-semibold text-neutral-900 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-400'>
                  クラウドの無料トライアルを始める
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className='clip-inverted-triangle-use-cases'>
          <div className='section-container mt-12 flex max-w-6xl flex-col gap-y-6 lg:mt-0'>
            {useCasesJP.map((useCase, index) => {
              // Limit the number of logos to a maximum of 6
              // const useCaseLogos = (useCase?.ClientsUsingUseCase || []).slice(
              //   0,
              //   6
              // )
              // const totalUseCaseLogos = useCaseLogos.length
              // const useCaseLink = getUseCaseLink(useCase?.title)
              return (
                <div key={index}>
                  <CUICard>
                    <CUICard.Body className='rounded-lg bg-neutral-900'>
                      <div className='flex flex-col justify-between gap-x-6 lg:flex-row'>
                        <div className='relative p-6 lg:w-[560px]'>
                          {useCase.link && (
                            <div className='absolute right-6 lg:right-0'>
                              <CUIButton
                                type='secondary'
                                size='sm'
                                className='group mx-auto'
                                href={useCase.link}
                                iconRight={
                                  <ChevronRightIcon
                                    height='18'
                                    className='pt-0.5 transition group-hover:translate-x-1/2'
                                  />
                                }>
                                詳しく見る
                              </CUIButton>
                            </div>
                          )}
                          <div className='flex flex-col items-start justify-center gap-4'>
                            <div className='mb-1 flex flex-col gap-y-2 font-inconsolata text-base font-medium text-primary-300'>
                              {useCase?.icon && (
                                <Image
                                  src={useCase.icon}
                                  alt={useCase.title}
                                  width={0}
                                  height={0}
                                  className='h-8 w-8'
                                />
                              )}
                            </div>
                            <div className='font-basier text-xl font-medium leading-tight text-neutral-100'>
                              {useCase?.title}
                            </div>
                            <div className='text-neutral-20 whitespace-pre-wrap text-sm'>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: useCase?.description
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            'grid w-full grid-cols-2 grid-rows-3 border-t border-t-[#464641] lg:w-[590px] lg:border-t-0'
                          }>
                          {useCase.logos.map((logo, index) => {
                            return (
                              <div
                                key={index}
                                className={
                                  'flex min-h-[86px] w-full justify-center border-b border-l border-[#464641] align-middle ring-inset transition-all hover:z-10 hover:bg-white/10 hover:ring-[1px] hover:ring-primary-300'
                                }>
                                <Link
                                  href={
                                    logo.link
                                      ? logo.link
                                      : 'https://clickhouse.com/jp/'
                                  }
                                  className='flex items-center justify-center align-middle brightness-0 invert hover:brightness-100 hover:invert-0'>
                                  <Image
                                    src={logo.logo}
                                    alt={logo.name}
                                    height={0}
                                    width={0}
                                    className='max-h-10 w-auto max-w-36'
                                  />
                                </Link>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CUICard.Body>
                  </CUICard>
                </div>
              )
            })}
            <div className='bg-primary-300 pb-24'></div>
          </div>
        </div>
      </div>

      <UseCasesComparisons />

      <div className='mx-auto max-w-7xl px-4 py-24 md:px-8 2xl:px-0'>
        <div className='gap-6 md:columns-2 lg:columns-3'>
          {quotesInDesiredOrder.map((quote, index) => (
            <div key={index}>
              {quote.quotes.href ? (
                <Link
                  href={quote.quotes.href}
                  target={quote.quotes.href.startsWith('http') ? '_blank' : ''}
                  rel={
                    quote.quotes.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : ''
                  }>
                  <div
                    key={index}
                    className='logos-color-swap mb-6 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover p-4 shadow-card hover:bg-neutral-750'>
                    <Image
                      src='/images/Quote.svg'
                      width={37}
                      height={28}
                      alt='Quote'
                      className='mb-4 block'
                    />
                    <p className='mb-4 pt-1 font-normal text-white'>
                      {quote.quotes.quote}
                    </p>
                    <div>
                      <StrapiImageUrl
                        {...quote.quotes.logo}
                        className='color-swap h-16'
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  key={index}
                  className='logos-color-swap mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover shadow-card hover:bg-neutral-750'>
                  <div>
                    <StrapiImageUrl
                      {...quote.quotes.logo}
                      className='color-swap h-16'
                    />
                  </div>
                  <p className='px-4 pb-6 pt-3 text-sm font-normal text-white'>
                    "{quote.quotes.quote}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className='bg-shadow-element yellow-shadow align-shadow-right bg-neutral-900'
        id='industries'>
        <div className='mx-auto max-w-7xl px-4 py-20 md:px-8 2xl:px-0'>
          <div
            className='bg-shadow-element relative mx-auto mb-20 max-w-7xl items-center px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
            style={
              {
                '--top-side': '224px'
              } as CSSProperties
            }>
            <div className='pb-10 text-center'>
              <Image
                src='/images/industries-icon.svg'
                alt='Industries Icon'
                width={72}
                height={72}
                className='mx-auto lg:mx-0'
              />
              <SuiTitle type='h2' className='my-6 lg:text-left'>
                業界
              </SuiTitle>
              <div className='mx-auto max-w-md text-neutral-200 lg:text-left'>
                必要な場所に、私たちはいます。ClickHouseコミュニティとの意見交換を大切にしており、いつでもご質問にお答えできるよう準備しています。
              </div>
            </div>
            <Accordion
              className='mx-auto w-full max-w-2xl lg:mr-0'
              numbered={false}
              items={[
                {
                  handle: '金融サービス',
                  content:
                    'トレーディングと市場分析、不正検知、リスク監視、ブロックチェーンなど。',
                  prefix: (
                    <Image
                      src='/uploads/financial_eabf48e8c4.svg'
                      alt='Financial Icon'
                      width={32}
                      height={32}
                      className='-my-1'
                    />
                  )
                },
                {
                  handle: 'マーケティングとセールス',
                  content:
                    '広告テクノロジー、ウェブ分析、SEOなどのためのデータストア。',
                  prefix: (
                    <Image
                      src='/uploads/marketing_564c57118c.svg'
                      alt='Marketing Icon'
                      width={32}
                      height={32}
                      className='-my-1'
                    />
                  )
                },
                {
                  handle: 'Eコマースと小売業',
                  content:
                    'オンラインビジネス向けのリアルタイム在庫監視と全体的なトラッキング。',
                  prefix: (
                    <Image
                      src='/uploads/ecommerce_007f909f93.svg'
                      alt='Ecommerce Icon'
                      width={32}
                      height={32}
                      className='-my-1'
                    />
                  )
                },
                {
                  handle: 'テクノロジ',
                  content:
                    'IoT、エネルギー、バイオテクノロジー、製造業などを含む。',
                  prefix: (
                    <Image
                      src='/uploads/technology_f01c171efc.svg'
                      alt='Technology Icon'
                      width={32}
                      height={32}
                      className='-my-1'
                    />
                  )
                },
                {
                  handle: 'メディアとエンターテイメント',
                  content:
                    '動画、アセット、その他のメディアのパフォーマンスをリアルタイムで評価する。',
                  prefix: (
                    <Image
                      src='/uploads/media_7dd1b2c68e.svg'
                      alt='Media Icon'
                      width={32}
                      height={32}
                      className='-my-1'
                    />
                  )
                },
                {
                  handle: 'ゲーム',
                  content:
                    'プレイヤーの行動、ゲーム内の動向、ゲーム体験の向上に役立つ重要なインサイトを理解する。',
                  prefix: (
                    <Image
                      src='/uploads/gaming_71acbd7e42.svg'
                      alt='Gaming Icon'
                      width={32}
                      height={32}
                      className='-my-1'
                    />
                  )
                }
              ]}
            />
          </div>

          <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=use-cases-get-started-footer' />
        </div>
      </div>
    </Layout>
  )
}

export default UseCasesPage
