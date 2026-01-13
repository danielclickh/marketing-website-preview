import BlogPost from '@/components/BlogPostList/BlogPost'
import { CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import LogoCarousel from '@/components/LogoCarousel'
import MarketoForm from '@/components/MarketoForm'
import { getNewsLetterData } from '@/components/NewsLetter/getNewsLetterData'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import { StrapiImageUrl } from '@/components/StrapiElements'
import Layout from '@/components/jp/Layout'
import { findAll } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ComparisonProps } from '@/types/comparisons'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Tilt from 'react-parallax-tilt'

export const getStaticProps: GetStaticProps<ComparisonProps> =
  async function getStaticProps() {
    const { data } = await findAll('comparisons', {
      filters: {
        slug: {
          $eq: 'redshift'
        }
      },
      populate: [
        'painpoint',
        'paintpoint.customer.*',
        'painpoint.customer.description',
        'painpoint.customer.logo',
        'painpointsTitle',
        'painpointsIcon',
        'seo',
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
      pagination: { limit: 1 }
    })
    if (!data?.[0]) {
      return {
        notFound: true
      }
    }

    const comparison = data[0]

    const seo = comparison.seo

    seo.locale = 'ja_JP'
    seo.path = '/jp/comparison/redshift'
    seo.languages = ['en', 'ja']

    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    return {
      props: {
        comparison,
        seo,
        newsLetterData,
        ...commonData
      }
    }
  }

export default function ComparisonPage({
  headerData,
  seo,
  comparison
}: ComparisonProps) {
  useGalaxyOnPage('redshiftComparisonPage')
  const formSuccessRef1 = useRef<HTMLDivElement | null>(null)
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout seo={seo} headerData={headerData}>
      <div className='homepage bg-grid'>
        <div className='relative pt-16 lg:pb-24'>
          <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
            <div className='w-full items-start gap-10 lg:grid lg:grid-cols-8 lg:gap-20'>
              <div className='lg:col-span-5'>
                <div className='mb-8 items-center md:flex md:justify-between md:gap-x-10'>
                  <div>
                    <h1 className='mb-6 text-center font-basier text-4xl font-semibold leading-tight text-neutral-0 md:mb-0 md:text-left md:text-5.5xl'>
                      {comparison.Title}
                    </h1>
                  </div>
                  <div>
                    {comparison.image && (
                      <StrapiImageUrl
                        {...comparison.image}
                        className='mx-auto lg:mx-0'
                      />
                    )}
                  </div>
                </div>
                <div className='rich_content mb-12 mt-4 text-center text-base text-neutral-0 md:text-left'>
                  <p className='mb-6 text-lg'>
                    同時実行可能数が少ない、クエリの速度が遅いなど、Redshiftの課題でお困りではありませんか。コスト効果の高いソリューションをお探しでしょうか。
                    <br />
                    <br />
                    多くのお客様がRedshiftからClickHouseに移行して分析処理を行う理由についてご説明します。
                  </p>
                </div>

                {comparison.BigNumbers && (
                  <Tilt
                    tiltEnable={false}
                    glareEnable={true}
                    glareMaxOpacity={0.4}
                    glareColor='rgba(251, 255, 70, 0.08)'
                    glarePosition='all'
                    className='mb-12 h-full'>
                    <div className='cui-card flex flex-col items-stretch gap-y-5 rounded-lg border border-neutral-700/80 bg-neutral-900/50 p-3 shadow-card hover:shadow-lg lg:flex-row lg:divide-x lg:divide-neutral-700/80'>
                      <div className='flex-1 p-3 text-center' key={1}>
                        <p className='mb-2 text-5xl'>75%</p>
                        <p className='text-md text-primary-300'>コスト削減</p>
                      </div>
                      <div className='flex-1 p-3 text-center' key={1}>
                        <p className='mb-2 text-5xl'>5倍</p>
                        <p className='text-md text-primary-300'>
                          クエリパフォーマンス
                        </p>
                      </div>
                      <div className='flex-1 p-3 text-center' key={1}>
                        <p className='mb-2 text-5xl'>20倍</p>
                        <p className='text-md text-primary-300'>同時実行数</p>
                      </div>
                    </div>
                  </Tilt>
                )}
              </div>
              <div className='lg:col-span-3'>
                <div className='mb-12 lg:mb-0'>
                  <div className='lg:max-w-lg'>
                    <h3 className='mb-6 text-center font-basier text-xl font-light text-neutral-0'>
                      すぐにお問合せください
                    </h3>
                    <>
                      {!formSuccess && (
                        <MarketoForm
                          formId={'1156'}
                          clearbitTracking={true}
                          disclaimer='登録することで、ClickHouseがお客さまの個人情報をプライバシーポリシーに従って処理することに同意したと見なされます。'
                          onLoad={() => {
                            setFormLoaded(true)
                          }}
                          onSuccess={() => {
                            setFormSuccess(true)
                            // Delay needed to allow the ref to update before scrolling
                            setTimeout(() => {
                              formSuccessRef1.current?.scrollIntoView()
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
                        <div ref={formSuccessRef1}>
                          <h3 className='text-center text-2xl font-bold'>
                            ご応募ありがとうございました！
                          </h3>
                          <p className='mt-2 text-center text-neutral-200'>
                            すぐにご連絡させていただきます。
                          </p>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='clip-inverted-triangle -mt-16 xl:-mt-28'>
          <div className='relative z-40 mx-auto mt-4 max-w-4xl pb-0 pt-20 lg:mt-6'>
            <div className='mx-auto flex items-center gap-4 px-4 md:px-0'>
              <div className='container mx-auto max-w-4xl border-none px-6 2xl:px-0'>
                <div className='overflow-hidden rounded-xl'>
                  <ResponsiveEmbed html='<iframe src="https://www.youtube-nocookie.com/embed/8FUfyvoqDTg?rel=0&autoplay=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='-mt-1 bg-primary-300 py-12 lg:mt-0'>
          <div className='mx-auto max-w-2xl text-center text-neutral-900'>
            <p className='mb-6 text-2xl font-bold'>
              "Moving over to ClickHouse, we were basically able to cut that
              (Redshift) bill in half"
            </p>
            <p className='text-xl font-light text-neutral-725'>Brooke McKim</p>
            <p className='text-xl font-light text-neutral-725'>
              Co-founder and CTO, Vantage
            </p>
          </div>
        </div>
      </div>
      <div className='bg-primary-300 py-6'>
        <div className='mx-auto'>
          <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-6 text-center font-basier text-xl font-semibold leading-normal text-neutral-900 md:px-0'>
            ClickHouseは多くのお客さまから信頼を獲得しています
          </div>
          <div className='section-container relative max-w-5xl pb-16'>
            <LogoCarousel logos={comparison.customerStories.logos} />
          </div>
        </div>
      </div>
      {comparison.painpointsTitle && (
        <div className='mx-auto mt-28 max-w-7xl px-4 md:px-8 2xl:px-0'>
          <div className='section-container bg-shadow-element yellow-shadow align-shadow-right container mx-auto flex flex-col items-center'>
            {comparison.painpointsIcon && (
              <StrapiImageUrl
                {...comparison.painpointsIcon}
                className='mb-4 fill-none'
              />
            )}
            <h2 className='text-center font-basier text-3xl font-semibold'>
              開発者が ClickHouse を選択する理由は何ですか?
            </h2>
            <div className='mt-10 lg:mt-20'>
              <div className='grid grid-cols-1 gap-8'>
                <CUICard key={1} className='p-6'>
                  <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                    <div className='flex flex-col items-start gap-10 lg:flex-row'>
                      <div className='w-full lg:w-2/3'>
                        <h3 className='mb-4 flex-grow text-center font-basier text-3xl font-semibold leading-tight text-neutral-100 lg:text-left'>
                          Redshiftはパフォーマンスが低い
                        </h3>
                        <div className='rich_content text-neutral-0'>
                          <p>
                            同時可能数が非常に少ないため、顧客向けアプリケーション（大量の並列処理が必要）の作成がかなり困難です。Redshiftの場合、同時可能数はすべてのキュー全体でも最大50しかありません。
                          </p>
                          <p>
                            ClickHouseは非常に高速でリソース効率の高い、分析に適したデータベースです。
                            同時可能数のレベルが高いため、多数のユーザーによるデータのアクセスやクエリを効率的に処理できます。パワフルなパフォーマンスと拡張性で、同時ユーザーの数が非常に多い場合でも分析処理を高速に実行できます。
                          </p>
                          <p>
                            世界中で多くの企業がClickHouseを使用し、インタラクティブでアドホックな高機能アプリケーションを構築して分析結果をユーザーに表示しています。
                          </p>
                        </div>
                      </div>

                      <div className='h-full w-full lg:w-1/3'>
                        <CUICard className='p-6'>
                          <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                            <div className='rich_content text-neutral-0'>
                              <Image
                                src='/images/Quote.svg'
                                width={37}
                                height={28}
                                alt='Quote'
                                className='mb-4'
                              />{' '}
                              <p>
                                "As data size grew, we faced performance and
                                cost challenges with AWS Redshift. Switching to
                                ClickHouse improved our query performance by 20
                                times and greatly cut costs."
                              </p>
                              <p>
                                <Link
                                  target='_blank'
                                  href='https://juicefs.com/en/blog/user-stories/read-write-separation'>
                                  Read blog
                                </Link>
                              </p>
                              <p>Tao Ma, Data Engineering Lead, Jerry</p>
                              {/* {painpoint.customer.logo && (
                                <StrapiImageUrl {...painpoint.customer.logo} />
                              )} */}
                            </div>
                          </CUICard.Body>
                        </CUICard>
                      </div>
                    </div>
                  </CUICard.Body>
                </CUICard>

                <CUICard key={2} className='p-6'>
                  <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                    <div className='flex flex-col items-start gap-10 lg:flex-row'>
                      <div className='w-full lg:w-2/3'>
                        <h3 className='mb-4 flex-grow text-center font-basier text-3xl font-semibold leading-tight text-neutral-100 lg:text-left'>
                          Redshiftはクエリの遅延が大きい
                        </h3>
                        <div className='rich_content text-neutral-0'>
                          <p>
                            Amazon
                            Redshiftのクエリ遅延が大きいことには多くの理由があります。それらは主にデータガバナンス、管理全般、クエリ最適化などの要因に分類されますが、テーブルデザインが最適でないことも大きな原因の1つです。
                          </p>
                          <p>
                            ClickHouseはリアルタイム分析で他を圧倒するパフォーマンスを発揮します。
                            多くの企業から、分析処理をRedshiftからClickHouseに移行したことでクエリ速度が5倍以上改善したと報告されています。
                          </p>
                          <p>
                            大容量データを集計する、詳細な分析をインタラクティブにオンザフライで実行するなどを、ClickHouseであれば瞬時に処理できます。
                          </p>
                        </div>
                      </div>

                      <div className='h-full w-full lg:w-1/3'>
                        <CUICard className='p-6'>
                          <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                            <div className='rich_content text-neutral-0'>
                              <Image
                                src='/images/Quote.svg'
                                width={37}
                                height={28}
                                alt='Quote'
                                className='mb-4'
                              />{' '}
                              <p>
                                "You can see that ClickHouse outperforms
                                Redshift easily…. The performance of ClickHouse
                                was consistent in returning results, with some
                                spikes possibly related to the network storage.
                                They also tested the performance of ClickHouse
                                with different levels of concurrency, which
                                showed predictable growth and a maximum query
                                time of six seconds"
                              </p>
                              <p>
                                <Link
                                  target='_blank'
                                  href='/blog/nyc-meetup-report-real-time-slicing-and-dicing-reporting-with-clickhouse?loc=redshift'>
                                  Read blog
                                </Link>
                              </p>
                              <p>Vadim Semenov</p>
                              <Image
                                src='/logos/rokt.svg'
                                alt='Rokt'
                                height={28}
                                width={101}
                              />
                              {/* {painpoint.customer.logo && (
                                <StrapiImageUrl {...painpoint.customer.logo} />
                              )} */}
                            </div>
                          </CUICard.Body>
                        </CUICard>
                      </div>
                    </div>
                  </CUICard.Body>
                </CUICard>

                <CUICard key={2} className='p-6'>
                  <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                    <div className='flex flex-col items-start gap-10 lg:flex-row'>
                      <div className='w-full lg:w-2/3'>
                        <h3 className='mb-4 flex-grow text-center font-basier text-3xl font-semibold leading-tight text-neutral-100 lg:text-left'>
                          Redshiftはコストの負担が大きい
                        </h3>
                        <div className='rich_content text-neutral-0'>
                          <p>
                            クエリ実行計画、インデックス化の戦略、およびデータベース設定パラメーターを最適化するために高度な専門知識が要求されます。また、パフォーマンスのボトルネックを解決するために監視を続ける必要があります。
                          </p>
                          <p>
                            ClickHouseのリソース管理機能を使用すると、コスト効果が大幅に向上します。
                            ClickHouseはリソースの使用効率を最高水準まで高めるようにデザインされています。
                          </p>
                          <p>
                            ClickHouseからRedshiftに移行したお客様から、コストを75%も削減できたとお聞きしています。また、Roktによるベンチマーク分析結果から、ClickHouseの費用がRedshiftよりも3倍低いとの報告もありました。
                          </p>
                        </div>
                      </div>

                      <div className='h-full w-full lg:w-1/3'>
                        <CUICard className='p-6'>
                          <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
                            <div className='rich_content text-neutral-0'>
                              <Image
                                src='/images/Quote.svg'
                                width={37}
                                height={28}
                                alt='Quote'
                                className='mb-4'
                              />{' '}
                              <p>
                                "Moving over to ClickHouse we were basically
                                able to cut that (Redshift) bill in half."
                              </p>
                              <p>
                                <Link target='_blank' href='/videos/vantage'>
                                  Watch
                                </Link>
                              </p>
                              <p>Brooke McKim, Co-founder and CTO, Vantage</p>
                              <Image
                                src='/logos/vantage.svg'
                                alt='Vantage'
                                height={28}
                                width={101}
                              />
                              {/* {painpoint.customer.logo && (
                                <StrapiImageUrl {...painpoint.customer.logo} />
                              )} */}
                            </div>
                          </CUICard.Body>
                        </CUICard>
                      </div>
                    </div>
                  </CUICard.Body>
                </CUICard>
              </div>
            </div>
          </div>
        </div>
      )}
      {comparison.testimonialsTitle && (
        <>
          <HRSeparator className='my-16 lg:my-24' />
          <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
            <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
              {comparison.testimonialsIcon && (
                <StrapiImageUrl
                  {...comparison.testimonialsIcon}
                  className='mb-4 fill-none'
                />
              )}
              <h2 className='text-center font-basier text-3xl font-semibold'>
                {comparison.testimonialsTitle}
              </h2>
            </div>
            <div className='mt-10 gap-3 md:columns-2 lg:mt-20 lg:columns-3'>
              {comparison.Testimonials.map((testimonial, index) => (
                <div
                  className='mb-3 w-full break-inside-avoid rounded-lg border border-neutral-700/80 bg-neutral-900/50 object-cover p-6 shadow-card hover:bg-neutral-750'
                  key={index}>
                  <Link href={testimonial.href} target='_blank'>
                    <div className='flex h-full w-full flex-col justify-between space-y-12'>
                      <div className='text-left'>
                        {testimonial.logo && (
                          <StrapiImageUrl
                            {...testimonial.logo}
                            className='color-swap-no-hover mb-4 h-16 fill-none'
                          />
                        )}
                        <div className='space-y-4 text-neutral-0'>
                          <ReactMarkdown>
                            {testimonial.Description}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <HRSeparator className='my-16 lg:my-24' />
      <div className='mx-auto max-w-7xl px-4 md:px-8 2xl:px-0'>
        {comparison.Content.map((content, index) => {
          return (
            <div key={index} className='mx-auto mb-10 max-w-7xl'>
              <h3 className='mb-4 text-2xl font-semibold'>
                {content.SectionTitle}
              </h3>
              {content.Description && (
                <div className='rich_content mb-6'>
                  <ReactMarkdown>{content.Description}</ReactMarkdown>
                </div>
              )}
              <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {content.customContent.length > 0 && (
                  <>
                    {content.customContent?.map((custom, index) => {
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
                                <StrapiImageUrl
                                  {...custom.Image}
                                  sizes='medium'
                                  alt={custom.Image.alternativeText}
                                  className='w-full rounded-t-lg xl:h-52 xl:object-cover'
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
                    })}
                  </>
                )}
                {content.RelatedBlogs.length > 0 && (
                  <>
                    {content.RelatedBlogs.flatMap((custom) =>
                      custom.blog_posts.map((blog) => (
                        <BlogPost key={blog.id} {...blog} />
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <HRSeparator className='my-16 lg:my-24' />
      <div className='mx-auto mb-24 max-w-7xl px-4 md:px-8 2xl:px-0'>
        <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 fill-none'
          />
          <h2 className='mb-12 text-center font-basier text-xl font-semibold lg:mb-16'>
            すぐにお問合せください
          </h2>
          <div className='mx-auto max-w-lg'>
            <>
              {!formSuccess && (
                <MarketoForm
                  formId={'1156'}
                  clearbitTracking={true}
                  onLoad={() => {
                    setFormLoaded(true)
                  }}
                  onSuccess={() => {
                    setFormSuccess(true)
                    // Delay needed to allow the ref to update before scrolling
                    setTimeout(() => {
                      formSuccessRef.current?.scrollIntoView()
                    }, 10)
                    return false // Stops page from reloading
                  }}
                  disclaimer='登録することで、ClickHouseがお客さまの個人情報をプライバシーポリシーに従って処理することに同意したと見なされます。'
                />
              )}

              {!formLoaded && (
                <div className='text-center'>フォームを読み込んでいます...</div>
              )}

              {formSuccess && (
                <div ref={formSuccessRef}>
                  <h3 className='text-center text-2xl font-bold'>
                    ご応募ありがとうございました！
                  </h3>
                  <p className='mt-2 text-center text-neutral-200'>
                    すぐにご連絡させていただきます。
                  </p>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </Layout>
  )
}
