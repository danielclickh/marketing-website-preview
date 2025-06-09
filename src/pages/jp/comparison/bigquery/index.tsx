import logoClickhouse from '../../../../../public/logo-full.svg'
import { useClickOutside } from '../../../../hooks'
import chartCosts from './chart-costs.svg'
import chartLatency from './chart-latency.svg'
import iconDevelopers from './icon-developers.svg'
import iconGuage from './icon-guage.svg'
import iconHandCoins from './icon-hand-coins.svg'
import iconQuote from './icon-quote.svg'
import logoBigquery from './logo-bigquery.svg'
import logoBlock from './logo-block.png'
import logoPostgress from './logo-postgress.svg'
import logoRedshift from './logo-redshift.svg'
import logoSnowflake from './logo-snowflake.svg'
import logoAdevinta from './logoAdevinta.svg'
import logos from './logos.png'
import BlogPost from '@/components/BlogPostList/BlogPost'
import { CUIButton, CUICard } from '@/components/ClickUI'
import ComparisonTable from '@/components/ComparisonTable'
import HomepageSectionTrustedByAlt from '@/components/HomepageSectionTrustedByAlt'
import MarketoForm from '@/components/MarketoForm'
import { StrapiImage } from '@/components/StrapiElements'
import { StrapiImageProps } from '@/components/StrapiElements/types'
import Layout from '@/components/jp/Layout'
import MoreComparisons from '@/components/jp/MoreComparisons'
import { SuiText, SuiTitle } from '@/components/sui'
import { findAll, findOne } from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import {
  ComparisonPage,
  ComparisonProps,
  RepeatableContent
} from '@/types/comparisons'
import { HomepageCustomerStories } from '@/types/homepage'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

const locTracking = 'bigquery-comparison-page'

export interface BigQueryPageProps extends ComparisonProps {
  customerStories: HomepageCustomerStories
}

export async function getStaticProps() {
  const { data }: { data: ComparisonPage[] } = await findAll('comparisons', {
    filters: {
      slug: {
        $eq: 'bigquery'
      }
    },
    populate: [
      'seo',
      'Content',
      'Content.customContent',
      'Content.customContent.Image',
      'Content.RelatedBlogs',
      'Content.RelatedBlogs.blog_posts',
      'Content.RelatedBlogs.blog_posts.*',
      'Content.RelatedBlogs.blog_posts.author',
      'Content.RelatedBlogs.blog_posts.thumbnailPng'
    ]
  })

  if (!data?.[0]) {
    return {
      notFound: true
    }
  }

  const { customerStories } = await findOne('homepage', {
    populate: [
      'customerStories',
      'customerStories.*',
      'customerStories.logos.*',
      'customerStories.logos.darkLogoPng'
    ]
  })

  const comparison = data[0]

  const seo: any = comparison.seo || {}
  seo.locale = 'ja_JP'
  seo.path = `/comparison/${comparison.slug}`

  const props: BigQueryPageProps = {
    comparison,
    customerStories,
    seo,
    ...(await getCommonProps())
  }

  return {
    props
  }
}

export default function BigQueryPage({
  footerData,
  headerData,
  seo,
  comparison,
  customerStories
}: BigQueryPageProps) {
  useGalaxyOnPage(`${comparison.slug}ComparisonPage`)

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalInnerRef = useRef<HTMLDivElement | null>(null)
  const modalFormSuccessRef = useRef<HTMLDivElement | null>(null)
  const [modalFormSuccess, setModalFormSuccess] = useState(false)
  const [modalFormLoaded, setModalFormLoaded] = useState(false)

  // Reset modal form on modal close
  useEffect(() => {
    if (!isModalOpen && modalFormSuccess) {
      setModalFormSuccess(false)
      setModalFormLoaded(false)
    }
  }, [isModalOpen])

  useClickOutside(modalInnerRef, () => {
    setIsModalOpen(false)
  })

  // At the top of your component, add this:
  const handlePersonalizedSupportClick = useGalaxyOnClick(
    `${comparison.slug}ComparisonPage.heroCta.personalizedSupportSelect`
  )

  // Then in the JSX, replace the onClick with:
  const handleStartTrialClick = useGalaxyOnClick(
    `${comparison.slug}ComparisonPage.heroCta.startTrialSelect`
  )

  // At the top of your component, add this:
  const handleMigrationDocClick = useGalaxyOnClick(
    `${comparison.slug}ComparisonPage.heroCta.migrationDocSelect`
  )

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <div className='container mx-auto my-16 flex max-w-7xl flex-col items-center gap-x-6 px-8 md:flex-row 2xl:px-0'>
        <div className='mx-auto grid max-w-[800px] grid-cols-1 gap-6 text-center lg:mx-0 lg:text-left'>
          <div>
            <span className='inline-block rounded-full border border-primary-500 bg-primary-700 px-4 py-1 text-xs text-primary-300'>
              比較情報
            </span>
          </div>
          <SuiTitle type='h1' weight='bold'>
            ClickHouse <span className='text-primary-300'>vs</span> BigQuery
          </SuiTitle>

          <Image
            src={logos}
            alt='ClickHouse vs BigQuery'
            width={240}
            height={245}
            className='mx-auto lg:hidden'
          />

          <SuiText className='sm:text-xl'>
            BigQueryでは、アドホッククエリや小規模データの処理は効率的ですが、規模を拡張すると費用およびパフォーマンス管理の面で負担がかなり大きくなります。以下の表では、費用、パフォーマンス、およびサポートされる機能の面からClickHouseとBigQueryを詳細に比較しています。
          </SuiText>
          <div className='mt-6 flex flex-col gap-4 sm:mx-auto sm:max-w-[523px] sm:flex-row lg:mx-0'>
            <CUIButton
              type='primary'
              size='lg'
              weight='semibold'
              className='w-full sm:flex-1'
              onClick={() => {
                handlePersonalizedSupportClick()
                setIsModalOpen(true)
              }}>
              担当者に問い合わせる
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              weight='semibold'
              href={`https://console.clickhouse.cloud/signUp?loc=${locTracking}-hero`}
              target='_blank'
              linkClass='flex-1 w-full'
              className='w-full'
              onClick={handleStartTrialClick}>
              クラウドの無料トライアルを始める
            </CUIButton>
          </div>
          <SuiText className='text-sm'>
            BigQueryからClickHouseへの移行{' '}
            <Link
              href={`https://clickhouse.com/docs/en/migrations/bigquery?loc=${locTracking}-hero`}
              target='_blank'
              prefetch={false}
              className='text-primary-300 hover:underline'
              onClick={handleMigrationDocClick}>
              について詳しく解説したガイドをお読みください
            </Link>
          </SuiText>
        </div>
        <Image
          src={logos}
          alt='ClickHouse vs BigQuery'
          width={240}
          height={245}
          className='mx-auto hidden lg:block'
        />
      </div>

      {/* Table */}
      <div className='container mx-auto my-16 max-w-7xl px-8 2xl:px-0'>
        <ComparisonTable
          columns={[
            {
              heading: (
                <Image
                  src={logoClickhouse}
                  alt='ClickHouse'
                  width={149}
                  height={44}
                  className='mx-auto -mb-2 -mt-1'
                />
              ),
              width: '45%',
              rowIcon: <YesIcon />,
              highlight: true
            },
            {
              heading: (
                <Image
                  src={logoBigquery}
                  alt='BigQuery'
                  width={131}
                  height={44}
                  className='mx-auto -mb-2 -mt-1'
                />
              ),
              width: '35%',
              rowIcon: <NoIcon />
            }
          ]}
          rows={[
            {
              heading: '速度と効率',
              values: [
                '最大95%のクエリ速度向上、さらにストレージ使用量を60%削減。',
                'クエリ速度が遅く、ストレージ消費量も多い。'
              ]
            },
            {
              heading: 'コスト効率が高い',
              values: [
                '最大100倍のコスト効率を実現。',
                'BigQueryを分析処理に使用すると費用が高くなる。'
              ]
            },
            {
              heading: '最新のSQL',
              values: [
                '標準SQLを多数の拡張機能 (Lambda関数や高階関数など) で強化および改善しているため使いやすく、簡単に分析タスクを実行できる。',
                '標準SQLのみに対応しているため、分析タスクが複雑になりやすい。'
              ]
            },
            {
              heading: '簡単なデータ分析',
              values: [
                '150以上の事前定義された集計関数に加え、パワフルな集計関数を組み合わせることが可能。ベクトル化と並列化に完全に対応。\n\n数値計算、地理情報、機械学習、時系列などの処理に1,300以上のデータ処理関数を使用できる。',
                '集計関数や標準データ処理関数の数が少ないため、非常に複雑なSQLを作成する必要がある。'
              ]
            },
            {
              heading: 'リッチデータ型のサポート',
              values: [
                'JSON、マップ、配列などの高度なデータ型と、80を超える配列関数を使用し、シンプルかつ直感的な方法で問題をモデル化して解決できる。',
                '配列関数がわずか8つなど、データ型の数に制限がある。'
              ]
            },
            {
              heading: '世界クラスの相互運用性',
              values: [
                'ほとんどのデータソースから、90を超えるファイル形式でデータをネイティブに読み取ることができるため、形状や場所に関係なく、データを簡単に分析できる。',
                '相互運用性が低い。5つのファイル形式と19のデータソースのみに対応。'
              ]
            }
          ]}
        />
      </div>

      <HomepageSectionTrustedByAlt
        className='!my-24'
        heading='ClickHouseは多くのお客さまから信頼を獲得しています'
        customerStories={customerStories}
      />

      <div className='container mx-auto my-16 max-w-7xl space-y-8 px-8 2xl:px-0'>
        <div className='mb-16 flex flex-col items-center gap-6 text-center'>
          <Image src={iconDevelopers} alt='Icon' width={72} height={72} />
          <SuiTitle type='h2'>ClickHouseはなぜ開発者に選ばれるのか</SuiTitle>
        </div>

        {/* Latency */}
        <CUICard className='!block space-y-8 p-8 md:space-y-10 md:p-10'>
          <Image src={iconGuage} alt='Icon' width={36} height={24} />
          <div className='flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
            <div className='grid grid-cols-1 gap-6 lg:max-w-2xl'>
              <SuiTitle type='h2'>BigQueryはクエリ速度が遅い</SuiTitle>
              <SuiText>
                クエリの応答時間を1秒未満に抑え、ワークロードを多数同時処理することは、BigQueryの場合、不可能とは言いませんが簡単ではありません。
              </SuiText>
              <SuiText>
                ClickHouseは大容量のデータ分析をリアルタイムで処理することを目的としたデータベースです。非常に高速かつリソース効率の高い分析処理が可能であり、同時に多数のクエリを、数に限りなく並列処理で実行できます。
              </SuiText>
              <SuiText>
                大容量データをリアルタイムで集計する、詳細な分析をインタラクティブにオンザフライで実行する、顧客に高機能なダッシュボードを提供するなどを、ClickHouseであれば瞬時に処理できます。
              </SuiText>
            </div>
            <Image
              src={chartLatency}
              alt='10億行のクエリ処理時間'
              width={342}
              height={305}
              className='mx-auto flex-shrink flex-grow-0 lg:mx-0'
            />
          </div>
          <CUICard className='gap-6 !bg-[#323232] p-6 lg:flex-row lg:items-stretch lg:pr-10'>
            <div className='flex flex-col items-center gap-6 self-stretch sm:flex-row lg:max-w-3xl'>
              <Image
                src={iconQuote}
                alt='Quote'
                width={36}
                height={28}
                className='flex-shrink-0 flex-grow-0 self-start'
              />
              <div className='grid grid-cols-1 gap-6'>
                <SuiText>
                  We needed a solution that could scale, but also provide
                  end-user facing analytics capabilities with low latency and
                  high throughput.{' '}
                  <Link
                    href={`/blog/serving-real-time-analytics-across-marketplaces-at-adevinta?loc=${locTracking}`}
                    target='_blank'
                    className='text-primary-300 hover:underline'>
                    Read blog
                  </Link>
                </SuiText>
              </div>
            </div>
            <Image
              src={logoAdevinta}
              alt='Adevinta logo'
              width={110}
              height={25}
              className='mr-auto flex-shrink flex-grow-0 lg:ml-auto lg:mr-0'
            />
          </CUICard>
        </CUICard>

        {/* Costs */}
        <CUICard className='!block space-y-8 p-8 md:space-y-10 md:p-10'>
          <Image src={iconHandCoins} alt='Icon' width={38} height={30} />
          <div className='flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
            <div className='grid grid-cols-1 gap-6 lg:max-w-2xl'>
              <SuiTitle type='h2'>BigQueryはコストが高い</SuiTitle>
              <SuiText>
                BigQueryの価格設定により、データの使用やアクセスが人為的に制限され、ROIが低下する可能性があります。
              </SuiText>
              <SuiText>
                ClickHouseでは莫大な量のデータを効率的に管理することができます。リソース管理を効率化できるため、コスト効率を大幅に改善することができます。ClickHouseはリソースの使用効率を最高水準まで高めるようにデザインされています。
              </SuiText>
              <SuiText>
                たとえば、Prefectを使用してBigQueryからClickHouseに移行すれば、コストを33%削減でき、Juspayを使用して分析ワークロードをBigQueryからClickHouseに移行すれば、コストを10倍削減できます。
              </SuiText>
            </div>
            <Image
              src={chartCosts}
              alt='10億行のクエリにかかるコスト'
              width={336}
              height={273}
              className='mx-auto flex-shrink flex-grow-0 lg:mx-0'
            />
          </div>
          <CUICard className='gap-6 !bg-[#323232] p-6 lg:flex-row lg:pr-10'>
            <div className='flex flex-col items-center gap-6 self-stretch sm:flex-row lg:max-w-3xl'>
              <Image
                src={iconQuote}
                alt='Quote'
                width={36}
                height={28}
                className='flex-shrink-0 flex-grow-0 self-start'
              />
              <div className='grid grid-cols-1 gap-6'>
                <SuiText>
                  [BigQuery] discourages data usage. Instead of encouraging
                  analysts to query the database in any and all ways they can
                  imagine you’ll end up worrying about needing to limit them and
                  come up with processes for controlling the volume of data
                  being used.
                </SuiText>
                <SuiText>
                  We simply don’t want the hassle of trying to figure out in
                  advance of how many BigQuery slots to purchase - what a
                  headache!{' '}
                  <Link
                    href={`/blog/hifis-migration-from-bigquery-to-clickhouse?loc=${locTracking}`}
                    target='_blank'
                    className='text-primary-300 hover:underline'>
                    Read blog
                  </Link>
                </SuiText>
              </div>
            </div>
            <Image
              src={logoBlock}
              alt='Block logo'
              width={61}
              height={86}
              className='mr-auto flex-shrink flex-grow-0 lg:ml-auto lg:mr-0'
            />
          </CUICard>
        </CUICard>
      </div>

      {/* Roadmap */}
      <div className='my-16 bg-neutral-700 py-16'>
        <div className='section-container'>
          <div className='relative rounded border-t-4 border-primary-300 bg-neutral-750 p-8 text-center lg:p-10'>
            <SuiTitle type='h3' weight='bold' className='mb-4'>
              BigQueryからClickHouse Cloudへの
              <span className='text-primary-300'>移行がまだ</span>{' '}
              お済みではありませんか?
            </SuiTitle>
            <SuiText>
              複数ステートメントのトランザクションや、高度に正規化されたテーブルに対する広範な結合が必要な場合。
              <br />
              どちらも 2024 年のロードマップに含まれています。
            </SuiText>
          </div>
        </div>
      </div>

      {/* Related content */}
      <div className='container mx-auto my-16 max-w-7xl px-8 2xl:px-0'>
        {comparison.Content.map((content, index) => {
          return (
            <div key={index} className='mx-auto mb-10 max-w-7xl'>
              <div className='mb-16 text-center'>
                <SuiTitle type='h2'>関連コンテンツ</SuiTitle>
                {content.Description && (
                  <div className='rich_content mt-4 text-center'>
                    <ReactMarkdown>{content.Description}</ReactMarkdown>
                  </div>
                )}
              </div>

              <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {combineRenderedContent(
                  content.customContent,
                  content.RelatedBlogs
                ).map((card, index) => {
                  return <div key={index}>{card}</div>
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className='mx-auto mb-24 max-w-7xl px-4 md:px-8 2xl:px-0'>
        <div className='section-container bg-shadow-element red-shadow align-shadow-left container mx-auto flex flex-col items-center'>
          <Image
            src='/images/migration.svg'
            height={72}
            width={72}
            alt='Migrations'
            className='mb-4 lg:mb-6'
          />
          <SuiTitle type='h2' className='mb-12 text-center lg:mb-16'>
            すぐにお問合せください
          </SuiTitle>
          <div className='mx-auto max-w-lg'>
            <>
              {!formSuccess && (
                <MarketoForm
                  formId={'1237'}
                  clearbitTracking={true}
                  onLoad={(formObject) => {
                    setFormLoaded(true)

                    // Set field values
                    formObject.addHiddenFields({
                      miscBlankField17: 'organic',
                      loc__c: 'footer'
                    })
                  }}
                  onSuccess={() => {
                    setFormSuccess(true)
                    // Delay needed to allow the ref to update before scrolling
                    setTimeout(() => {
                      formSuccessRef.current?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }, 10)

                    return false // Stops page from reloading
                  }}
                />
              )}

              {!formLoaded && (
                <div className='text-center'>フォームを読み込んでいます...</div>
              )}

              {formSuccess && (
                <div ref={formSuccessRef}>
                  <SuiTitle type='h3' className='text-center'>
                    ご応募ありがとうございました！
                  </SuiTitle>
                  <p className='mt-2 text-center text-neutral-200'>
                    すぐにご連絡させていただきます。
                  </p>
                </div>
              )}
            </>
          </div>
        </div>
      </div>

      {/* More comparisons */}
      <MoreComparisons
        comparisons={[
          {
            name: 'PostgreSQL',
            link: `/jp/comparison/postgresql?loc=${locTracking}`,
            logo: logoPostgress
          },
          {
            name: 'Redshift',
            link: `/jp/comparison/redshift?loc=${locTracking}`,
            logo: logoRedshift
          },
          {
            name: 'Snowflake',
            link: `/jp/comparison/snowflake?loc=${locTracking}`,
            logo: logoSnowflake
          }
        ]}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex overflow-auto bg-[#323232] bg-opacity-50 transition-opacity ${
          isModalOpen ? '' : 'pointer-events-none opacity-0'
        }`}>
        <div className='m-auto p-4'>
          <div
            className='relative w-full max-w-2xl rounded-lg bg-[#323232] p-8 shadow-2xl'
            ref={modalInnerRef}>
            <button
              className='absolute right-4 top-4 opacity-60 transition-opacity hover:opacity-80'
              type='button'
              onClick={() => setIsModalOpen(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </button>

            <SuiTitle type='h3'>担当者に問い合わせる</SuiTitle>
            <SuiText size='sm' className='mb-6 mt-4'>
              ClickHouseはこれまで、BigQueryから移行される多くのお客様をサポートしてきました。移行の要件など、お問合せの内容をご記入のうえ送信してください。すぐに返信し、ClickHouseによるサポートについてご案内いたします。
            </SuiText>
            <>
              {!modalFormSuccess && (
                <MarketoForm
                  formId={'1237'}
                  clearbitTracking={true}
                  onLoad={(formObject) => {
                    setModalFormLoaded(true)

                    // Set field values
                    formObject.addHiddenFields({
                      miscBlankField17: 'organic',
                      loc__c: 'modal'
                    })
                  }}
                  onSuccess={() => {
                    setModalFormSuccess(true)
                    // Delay needed to allow the ref to update before scrolling
                    setTimeout(() => {
                      modalFormSuccessRef.current?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }, 10)

                    return false // Stops page from reloading
                  }}
                />
              )}

              {!modalFormLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              {modalFormSuccess && (
                <div ref={modalFormSuccessRef}>
                  <SuiTitle type='h3' className='text-center'>
                    Thank you for your submission!
                  </SuiTitle>
                  <p className='mt-2 text-center text-neutral-200'>
                    We will be in touch soon.
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

function YesIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-primary'
      width='16'
      height='16'
      fill='none'
      viewBox='0 0 16 16'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M13.3337 4.33331 6.00033 11.6666 2.66699 8.33331'
      />
    </svg>
  )
}

function NoIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-[#FFBABA]'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='m8 8 8 8m0-8-8 8'
      />
    </svg>
  )
}

function CustomContentCard({
  href,
  category,
  title,
  footer,
  image
}: {
  href: LinkProps['href']
  category: string
  title: string
  footer: string
  image?: Omit<
    StrapiImageProps,
    'sizes' | 'alt' | 'className' | 'width' | 'height'
  >
}) {
  return (
    <Link
      href={href}
      target='_blank'
      className={
        'hover:scale-102 blog-post-card transition ease-in-out hover:-translate-y-1 hover:no-underline'
      }>
      <CUICard className='h-full'>
        <CUICard.Body className='flex flex-col items-start justify-center gap-2'>
          {image && (
            <StrapiImage
              {...image}
              sizes='medium'
              alt={image.alternativeText}
              className='w-full rounded-t-lg xl:h-52 xl:object-cover'
              width={100}
              height={100}
            />
          )}
          <div className='flex flex-col items-start justify-center gap-2 px-6 pt-6'>
            <div className='mb-2 font-inconsolata text-base font-medium text-primary-300'>
              {category}
            </div>
            <div className='cursor-pointer font-basier text-xl font-medium leading-tight text-neutral-100'>
              {title}
            </div>
          </div>
        </CUICard.Body>
        <CUICard.Footer className='flex w-full items-center p-6 text-sm text-neutral-300'>
          {footer}
        </CUICard.Footer>
      </CUICard>
    </Link>
  )
}

function combineRenderedContent(
  custom: RepeatableContent['customContent'],
  related: RepeatableContent['RelatedBlogs']
) {
  const customRendered = custom
    .filter((content) => !!content.href)
    .map((custom, index) => {
      return (
        <CustomContentCard
          key={index}
          href={`${custom.href}?loc=${locTracking}`}
          image={custom.Image}
          category={custom.Category}
          title={custom.Title}
          footer={custom.Footer}
        />
      )
    })

  const relatedRendered = related.flatMap((custom) => {
    return custom.blog_posts.map((blog) => {
      const urlWithLoc = `${blog.slug}?loc=${locTracking}`
      return <BlogPost key={blog.id} {...blog} slug={urlWithLoc} />
    })
  })

  return [...customRendered, ...relatedRendered]
}
