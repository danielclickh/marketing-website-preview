import BlogPost from '@/components/BlogPostList/BlogPost'
import { CUIButton, CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import LogoCarousel from '@/components/LogoCarousel'
import MarketoForm from '@/components/MarketoForm'
import { StrapiImage } from '@/components/StrapiElements'
import GetStarted from '@/components/jp/GetStarted'
import Layout from '@/components/jp/Layout'
import { findAll, findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ComparisonProps } from '@/types/comparisons'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface SnowflakePageProps extends ComparisonProps {
  customerStories: any
  comparison: any
}

export const getStaticProps: GetStaticProps<SnowflakePageProps> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.ctaButton',
        'seo',
        'seo.image',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    }

    const commonProps = await getCommonProps()
    const data = await findOne('homepage', params)

    const comparison = await findAll('comparisons', {
      populate: [
        'painpoint',
        'paintpoint.customer.*',
        'painpoint.customer.description',
        'painpoint.customer.logo',
        'painpointsTitle',
        'painpointsIcon',
        'seo',
        'seo.*',
        'Testimonials',
        'Testimonials.*',
        'Testimonials.logo.*',
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng',
        'image',
        'formTitle',
        'testimonialsTitle',
        'testimonialsIcon',
        'Content',
        'Content.customContent',
        'Content.customContent.Image',
        'Content.RelatedBlogs',
        'Content.RelatedBlogs.blog_posts',
        'Content.RelatedBlogs.blog_posts.*',
        'Content.RelatedBlogs.blog_posts.author',
        'Content.RelatedBlogs.blog_posts.thumbnailPng',
        'BigNumbers',
        'BigNumbers.*'
      ],
      filters: {
        slug: {
          $eq: 'snowflake'
        }
      }
    })

    data.seo.locale = 'ja_JP'
    data.seo = comparison.data[0].seo
    data.seo.path = '/comparison/snowflake'
    data.seo.image = [{ url: '/images/clickhouse-vs-snowflake-og.png' }]

    return {
      props: {
        comparison,
        ...data,
        ...commonProps
      }
    }
  }

export default function SnowflakePage({
  footerData,
  headerData,
  customerStories,
  seo,
  platforms,
  comparison
}: SnowflakePageProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const {
    Title: comparisonTitle,
    HeroDescription: heroDescription,
    BigNumbers: BigNumbers
  } = comparison.data[0]
  useGalaxyOnPage('snowflakeComparisonPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='homepage'>
        <div className='relative pt-16 lg:pb-20'>
          <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
            <div className='items-start justify-between lg:flex lg:grid-cols-2'>
              <div>
                <div className='items-center'>
                  <div className='w-full lg:max-w-xl'>
                    <span className='mb-2 inline-block rounded-full border border-primary-500 bg-primary-700 px-4 py-1 text-xs text-primary-300'>
                      比較情報
                    </span>
                    <h1 className='mb-4 text-center font-basier text-4xl font-semibold leading-tight text-neutral-0 lg:text-left lg:text-5xl xl:text-5.5xl'>
                      {comparisonTitle}
                    </h1>
                    <h4 className='mb-6 w-full text-center text-base font-medium text-neutral-0/60 lg:text-left'>
                      リアルタイム分析での比較
                    </h4>
                  </div>
                </div>
                <div className='rich_content mt-8 w-full text-center text-base text-neutral-200 lg:max-w-xl lg:text-left'>
                  <p>
                    ClickHouseは大規模なデータの分析と探索をリアルタイムで処理するようにデザインされています。Snowflakeは長期的なレポート作成やアドホックデータ分析を効率的に実行するためのデータウェアハウスです。リアルタイム分析の処理ではClickHouseの方が高速かつコストも低く抑えられます。
                  </p>
                  <p>
                    リアルタイム分析におけるClickHouseとSnowflakeの比較について、ClickHouseが行ったベンチマーク調査を基に解説します。Snowflakeの増え続けるコストから解放され、ClickHouseでデータ戦略を一新しましょう。
                  </p>
                </div>
              </div>
              <div className='mb-6 hidden lg:mb-0 lg:block lg:max-w-[400px] xl:max-w-[575px]'>
                <div className=''>
                  {comparison.data[0].image && (
                    <StrapiImage
                      {...comparison.data[0].image}
                      className='mx-auto lg:mx-0'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative pt-12 lg:pt-0'>
          <div className='mx-auto flex flex-col text-center'>
            <div className='mx-auto w-fit max-w-[850px] px-4 pb-4 pt-2 text-center font-basier text-2xl font-semibold text-white md:px-0 lg:mb-8 lg:text-4xl'>
              ClickHouseの
              <span className='tilted tilted-yellow leading-relaxed'>
                <span className='tilted-content'>のリアルタイム</span>
              </span>{' '}
              分析におけるSnowflakeとの性能比較
            </div>
          </div>

          <div className='clip-inverted-triangle -mt-16 xl:-mt-28'>
            <div className='relative z-40 mx-auto mt-4 max-w-4xl pb-0 pt-20 lg:mt-12'>
              <div className='mx-auto flex items-center gap-4 px-4 md:px-0'>
                <div
                  key={1}
                  className='w-1/3 rounded-md border border-white/40 bg-[#363531] px-3 py-6 shadow-lg'>
                  <h3 className='mb-2 text-center font-basier text-2xl font-bold leading-none text-primary-300 lg:text-[69px]'>
                    2倍
                  </h3>
                  <p className='min-h-[30px] text-center font-basier text-sm font-bold leading-none lg:text-base'>
                    クエリ速度
                  </p>
                </div>

                <div
                  key={2}
                  className='w-1/3 rounded-md border border-white/40 bg-[#363531] px-3 py-6 shadow-lg'>
                  <h3 className='mb-2 text-center font-basier text-2xl font-bold leading-none text-primary-300 lg:text-[69px]'>
                    38%
                  </h3>
                  <p className='min-h-[30px] text-center font-basier text-sm font-bold leading-none lg:text-base'>
                    圧縮効率
                  </p>
                </div>

                <div
                  key={3}
                  className='w-1/3 rounded-md border border-white/40 bg-[#363531] px-3 py-6 shadow-lg'>
                  <h3 className='mb-2 text-center font-basier text-2xl font-bold leading-none text-primary-300 lg:text-[69px]'>
                    3-5倍
                  </h3>
                  <p className='min-h-[30px] text-center font-basier text-sm font-bold leading-none lg:text-base'>
                    コスト削減
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='relative z-10 bg-primary-300 pt-4'>
            <div className='section-container max-w-4xl'>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                <div className='flex w-full flex-col rounded-md border border-white/40 bg-[#363531] p-6 shadow-lg'>
                  <Image
                    src='/images/Quote.svg'
                    width={37}
                    height={28}
                    alt='Quote'
                    className='mb-4 flex-none'
                  />
                  <h3 className='mb-4 text-base'>
                    "With Snowflake, we were using the standard plan, small
                    compute, which <strong>cost nearly six times more</strong>{' '}
                    than ClickHouse Cloud. We got several seconds query time and
                    no materialized views. With ClickHouse Cloud's production
                    instance, we are getting sub-second query time along with
                    materialized views. The decision to switch was a no-brainer
                    for us.”
                  </h3>
                  <p className='mb-6'>
                    <Link
                      href='/blog/adgreetz-processes-millions-of-daily-ad-impressions'
                      className='text-sm text-primary-300 hover:underline lg:text-base'>
                      詳しく見る
                    </Link>
                  </p>
                  <Image
                    src='/images/adgreetz-logo.svg'
                    alt='Adgreetz'
                    width={224}
                    height={29}
                    className='mt-auto'
                  />
                </div>
                <div className='flex w-full flex-col rounded-md border border-white/40 bg-[#363531] p-6 shadow-lg'>
                  <Image
                    src='/images/Quote.svg'
                    width={37}
                    height={28}
                    alt='Quote'
                    className='mb-4 flex-none'
                  />
                  <h3 className='mb-4 text-base'>
                    “Snowflake [was] too slow and costly for our needs. While it
                    performs well for processing in-house data, it becomes quite
                    expensive when handling real-time customer data within a
                    product, which negatively impacts the product's unit
                    economics.”
                  </h3>
                  <p className='mb-6'>
                    <Link
                      href='/blog/harnessing-the-power-of-materialized-views-and-clickhouse-for-high-performance-analytics-at-inigo'
                      className='text-sm text-primary-300 hover:underline lg:text-base'>
                      詳しく見る
                    </Link>
                  </p>
                  <Image
                    src='/images/inigo-logo.svg'
                    alt='inigo'
                    width={135}
                    height={40}
                    className='mt-auto'
                  />
                </div>
                <div className='col-span-full flex w-full flex-col rounded-md border border-white/40 bg-[#363531] p-6 shadow-lg'>
                  <Image
                    src='/images/Quote.svg'
                    width={37}
                    height={28}
                    alt='Quote'
                    className='mb-4 flex-none'
                  />
                  <h3 className='mb-4 text-base'>
                    “Over time, those queries had become painfully slow in
                    Snowflake and Postgres. Some took over a minute. Others
                    timed out entirely...The payoff [of migrating to ClickHouse]
                    came right away. Queries that once failed now ran in six
                    seconds, with no caching required.”
                  </h3>
                  <p className='mb-6'>
                    <Link
                      href='/blog/chartmetric-uses-clickhouse-to-turn-artist-data-into-music-intelligence'
                      className='text-sm text-primary-300 hover:underline lg:text-base'>
                      詳しく見る
                    </Link>
                  </p>
                  <Image
                    src='/images/logo-chartmetric-gray.svg'
                    alt='Chartmetric'
                    width={221.85}
                    height={40}
                    className='mt-auto'
                  />
                </div>
              </div>
            </div>

            <div className='relative z-10 mx-auto -mt-10 max-w-7xl'>
              <div className='container mx-auto flex max-w-7xl flex-col px-8 2xl:px-0'>
                <div className='flip-selection mx-auto flex flex-col pt-30 text-center'>
                  <h2 className='mb-8 font-basier text-4xl font-semibold text-primary-800'>
                    Executive summary
                  </h2>
                  <div className='relative max-w-4xl text-left text-neutral-800'>
                    <p>
                      <strong>Overview</strong>
                    </p>
                    <p className='mb-8'>
                      Our benchmark analysis demonstrates that ClickHouse Cloud
                      outperforms Snowflake across the critical dimensions for
                      real-time analytics: query latency and cost.
                    </p>

                    <p>
                      <strong>Objective</strong>
                    </p>
                    <p className='mb-8'>
                      Reports from customers have indicated that{' '}
                      <strong>
                        migrating real-time analytics workloads from Snowflake
                        to ClickHouse Cloud has not only increased query
                        performance but also reduced expenses
                      </strong>{' '}
                      for their businesses. Thus, the objective of our benchmark
                      analysis is to deeply understand and outline the
                      differences and similarities between ClickHouse Cloud and
                      Snowflake for real-time analytics. We compare the
                      performance and cost of both systems.
                    </p>

                    <p>
                      <strong>Approach</strong>
                    </p>
                    <p className='mb-8'>
                      We benchmark, in ClickHouse Cloud and Snowflake, a set of
                      real-time analytics queries that are representative of
                      many real-time data applications. The cost is recorded for
                      running each benchmark test, considering data loading and
                      storage. Finally, this expense analysis is projected and
                      compared for a production environment and workload.
                    </p>
                    <div className='absolute bottom-0 left-0 z-20 h-[220px] w-full bg-snowflakeGradient lg:h-[100px]'></div>
                  </div>
                  <div className='relative z-40 -mt-30 lg:-mt-20'>
                    <div className='mx-auto max-w-xl rounded-lg bg-neutral-900 p-5 text-white lg:p-10'>
                      {formLoaded && !formSuccess && (
                        <>
                          <p
                            className='mb-4 text-2xl font-bold lg:text-3xl'
                            ref={formSuccessRef}>
                            詳細をご覧ください
                          </p>
                          <p className='mb-6'>
                            エグゼクティブサマリー（PDF）をお届けします
                          </p>
                        </>
                      )}
                      {!formSuccess && (
                        <MarketoForm
                          formId='1073'
                          clearbitTracking={true}
                          disclaimer='登録することで、ClickHouseがお客さまの個人情報をプライバシーポリシーに従って処理することに同意したと見なされます。'
                          onLoad={() => setFormLoaded(true)}
                          onSuccess={() => {
                            setFormSuccess(true)

                            // Delay needed to allow the ref to update before scrolling
                            setTimeout(() => {
                              formSuccessRef.current?.scrollIntoView()
                            }, 10)

                            return false // Stops page from reloading
                          }}
                        />
                      )}

                      {!formLoaded && (
                        <div className='text-center'>
                          フォームを読み込んでいます...
                        </div>
                      )}

                      {formSuccess && (
                        <div className='text-center'>
                          <h3 className='text-2xl font-bold'>
                            ご応募ありがとうございました！
                          </h3>
                          <CUIButton
                            type='primary'
                            size='lg'
                            weight='semibold'
                            href=' https://discover.clickhouse.com/rs/238-FPC-317/images/ClickHouse-vs-Snowflake.pdf'
                            target='_blank'
                            className='my-6 w-full'>
                            Download PDF
                          </CUIButton>
                          <p className='mt-2 text-neutral-200'>
                            You'll also receive an email shortly with the
                            executive summary.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-4 pt-12 text-center text-xl font-semibold leading-normal text-primary-800 md:px-0'>
                    大規模なデータを扱う開発者から信頼をいただいています。
                  </div>
                </div>
              </div>
              <div className='section-container relative z-10 flex max-w-5xl flex-wrap place-items-center items-center justify-center gap-6 self-center pb-16 md:gap-x-14'>
                <div className='absolute left-0 z-20 h-full bg-homepageFadeLeftLogos p-10 lg:pr-20'></div>
                <div className='absolute right-0 z-20 h-full bg-homepageFadeRightLogos p-10 lg:pl-20'></div>
                <LogoCarousel
                  logos={customerStories.logos}
                  speedClass1='animate-marqueeLeft3'
                  speedClass2='animate-marqueeLeft4'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-4 pt-20 md:px-8 2xl:px-0'>
        <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
          {comparison.data[0].Content.map((content: any, index: number) => {
            return (
              <div key={index} className='mx-auto mb-10 max-w-7xl'>
                <h3 className='mb-4 text-2xl font-semibold'>関連コンテンツ</h3>
                {content.Description && (
                  <div className='rich_content mb-6'>
                    <ReactMarkdown>{content.Description}</ReactMarkdown>
                  </div>
                )}
                <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  {content.customContent.length > 0 && (
                    <>
                      {content.customContent?.map(
                        (custom: any, index: number) => {
                          if (!custom.href) {
                            return null
                          }
                          return (
                            <Link
                              key={index}
                              href={custom.href}
                              target='_blank'
                              className={
                                'hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1 hover:no-underline'
                              }>
                              <CUICard className='h-full'>
                                <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                                  {custom.Image && (
                                    <StrapiImage
                                      {...custom.Image}
                                      sizes='medium'
                                      alt={custom.Image.alternativeText}
                                      className='w-full rounded-t-lg xl:h-52'
                                      width={100}
                                      height={100}
                                    />
                                  )}
                                  <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
                                    <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
                                      {custom.Category}
                                    </div>
                                    <div className='cursor-pointer font-basier text-xl font-medium leading-tight text-neutral-100'>
                                      {custom.Title}
                                    </div>
                                  </div>
                                </CUICard.Body>
                                <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
                                  {custom.Footer}
                                </CUICard.Footer>
                              </CUICard>
                            </Link>
                          )
                        }
                      )}
                    </>
                  )}
                  {content.RelatedBlogs.length > 0 && (
                    <>
                      {content.RelatedBlogs.flatMap((custom: any) =>
                        custom.blog_posts.map((blog: any) => (
                          <div id='snowflake-relatedcontent' key={blog.id}>
                            <BlogPost {...blog} />
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <HRSeparator className='my-24' />

      <GetStarted platforms={platforms} />
    </Layout>
  )
}
