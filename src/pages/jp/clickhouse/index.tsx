import features from './features.json'
import TickItem from '@/components-cleaned/TickItem'
import { CUIButton, CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import { StrapiPicture } from '@/components/StrapiElements'
import GetStarted from '@/components/jp/GetStarted'
import Layout from '@/components/jp/Layout'
import { SuiButton, SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ClickhouseData } from '@/types/clickhouse'
import { GetStaticProps } from 'next'
import Image from 'next/image'

export const getStaticProps: GetStaticProps<ClickhouseData> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.mainButton',
        'hero.secondaryButton',
        'hero.gitButton',
        'hero.gitButton.darkIconPng',
        'hero.gitButton.lightIconPng',
        'hero.backgroundPng',
        'features5',
        'features5.iconSvg',
        'features5.items',
        'seo',
        'seo.image'
      ]
    }
    const data = await findOne('click-house', params)
    data.seo.locale = 'ja_JP'
    data.seo.path = '/jp/clickhouse'
    data.seo.title = 'ClickHouse が日本で登場'
    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  hero,
  features5,
  seo,
  platforms,
  headerData,
  footerData
}: ClickhouseData) {
  useGalaxyOnPage('productOpenSourcePage')

  const { mainButton, secondaryButton, gitButton } = hero
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat lg:bg-speed-lines'>
          <div className='relative overflow-x-hidden bg-grid pt-10'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col text-center md:mt-16 md:w-7/12 md:text-left'>
                  <h1 className='mb-6 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    <span className='tilted tilted-yellow'>
                      <span className='tilted-content'>超高速</span>
                    </span>{' '}
                    オープンソース分析用データベース
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 md:pr-16'>
                    ClickHouseはSQLクエリを使用して高性能なリアルタイム分析を可能にするカラム指向データベースです。
                  </SuiText>
                  <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start'>
                    {mainButton && (
                      <CUIButton
                        type='primary'
                        size='lg'
                        weight='semibold'
                        href='/jp/clickhouse#getting_started'
                        target={mainButton.target}
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem] md:max-w-[12rem]'
                        className='w-full'>
                        すぐに開始する
                      </CUIButton>
                    )}
                    {secondaryButton && (
                      <CUIButton
                        type='secondary'
                        size='lg'
                        weight='semibold'
                        href='/jp/videos/clickhouse-intro-japanese'
                        target={secondaryButton.target}
                        linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                        className='w-full'>
                        概要ビデオを見る
                      </CUIButton>
                    )}
                    {!secondaryButton && gitButton?.text && (
                      <SuiButton
                        type='secondary'
                        className='w-48'
                        path={gitButton.href}
                        target={gitButton.target}>
                        <StrapiPicture
                          light={gitButton.lightIconPng}
                          dark={gitButton.darkIconPng}
                          width={20}
                          height={20}
                        />
                        {gitButton.text}
                      </SuiButton>
                    )}
                  </div>
                </div>

                <div className='mx-auto mt-4 hidden md:flex md:w-4/12'>
                  <Image
                    src='/images/clickhouse/oss_hero_image.png'
                    alt='Open source ClickHouse'
                    width={1294}
                    height={812}
                    className='h-auto w-full min-w-[54rem]'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto flex max-w-7xl flex-col px-4 pb-16 pt-16 sm:px-8 md:px-8 2xl:px-0'>
            <div className='feature-container'>
              {features.map((feature) => (
                <div className='col' key={feature.id}>
                  <div className='flex items-start gap-4'>
                    <Image
                      src={feature.icon}
                      width={32}
                      height={32}
                      alt={feature.title}
                    />
                    <div>
                      <h4 className='mb-3 font-inter font-bold'>
                        {feature.title}
                      </h4>
                      <p className='font-inter text-sm font-light leading-relaxed text-neutral-200'>
                        {feature.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='relative mx-auto mt-12 flex flex-col gap-y-28 md:mt-24 md:px-0'>
          <div className='section-container bg-shadow-element-left red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/clickhouse/section_efficient.svg'
                alt='ClickHouse efficiency'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mb-6 mt-8'>
                ハードウェア効率
              </SuiTitle>
              <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-16'>
                ClickHouseでは、I/OスループットとCPUリソースが同じ従来型の行指向システムと比較して、100倍から1,000倍も高速に分析クエリを処理できます。カラム型ストレージフォーマットを採用することで、より多くのデータをRAMに効率的に格納することで、応答時間が短縮されます。
              </div>

              <div className='mx-auto mt-10 grid grid-cols-1 content-baseline gap-10 px-4 md:mt-0 md:grid-cols-3 md:px-0'>
                <CUICard
                  title='Strives for CPU efficiency'
                  className='px-4 py-6'>
                  <p className='font-inconsolata text-primary-300'>
                    ベクトル化
                  </p>
                  <h3 className='mb-6 px-2 text-center font-basier text-2xl font-semibold leading-tight md:text-2xl xl:px-4'>
                    CPU効率を最大化
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='px-0 text-center xl:px-4'>
                    SIMD命令および実行時コード生成を使用し、クエリをベクトル化して実行します。データが列で処理されるため、キャッシュラインヒット率が上がります。
                  </SuiText>
                </CUICard>

                <CUICard
                  title='Strives for CPU efficiency'
                  className='px-4 py-6'>
                  <p className='font-inconsolata text-primary-300'>
                    移動を減らす
                  </p>
                  <h3 className='mb-6 px-2 text-center font-basier text-2xl font-semibold leading-tight md:text-2xl xl:px-4'>
                    ディスクへのアクセスを最適化
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='px-0 text-center xl:px-4'>
                    範囲クエリのシーク回数を最小化し、ディスクドライブの使用効率を高めます。また、連続して格納されたデータを参照する際のヘッド移動量も減らせます。
                  </SuiText>
                </CUICard>

                <CUICard
                  title='Strives for CPU efficiency'
                  className='px-4 py-6'>
                  <p className='font-inconsolata text-primary-300'>
                    スループット
                  </p>
                  <h3 className='mb-6 px-2 text-center font-basier text-2xl font-semibold leading-tight md:text-2xl xl:px-4'>
                    データ転送を最小化
                  </h3>

                  <SuiText
                    size='sm'
                    color='secondary'
                    className='px-0 text-center xl:px-4'>
                    データの管理やレポートの作成を、高性能コンピューティングを前提とした特殊なネットワークを使わずに行えます。
                  </SuiText>
                </CUICard>
              </div>
            </div>
          </div>
        </div>

        <HRSeparator className='my-12 md:my-24' />

        <div className='relative mx-auto flex flex-col gap-y-28 md:mt-24'>
          <div className='section-container bg-shadow-element-left red-shadow mx-auto flex flex-col items-center justify-between self-center px-4 md:px-8 2xl:px-0'>
            <CUICard className='p-8'>
              <div className='flex w-full justify-between'>
                <h3 className='mb-6 w-full text-center font-basier text-2xl font-semibold leading-tight md:text-left md:text-2xl'>
                  ノートパソコンからペタバイト規模まで
                </h3>
                <Image
                  src='/images/clickhouse/scalable.svg'
                  width={32}
                  height={32}
                  alt='ClickHouse is linearly scalable'
                  className='h-7'
                />
              </div>

              <div className='flex flex-col gap-8 md:flex-row'>
                <div className='w-full text-center md:text-left lg:w-9/12'>
                  <SuiText size='sm' color='secondary'>
                    ClickHouseは垂直方向と水平方向の両方で優れたスケーラビリティを持っています。ノートパソコンや小さな仮想マシン、単一のサーバー、あるいは数百から数千のノードを持つクラスタにも簡単に適応し、パフォーマンスを発揮します。
                  </SuiText>
                  <br />
                  <SuiText size='sm' color='secondary'>
                    数百のノードで構成されるClickHouseクラスターも多く存在し、最も規模の大きいものでは数千ノードを上回ると報告されています。また、1つのノードで数兆行または数百テラバイトのデータを保持するClickHouseのインスタンスもあります。
                  </SuiText>
                </div>
              </div>
            </CUICard>
          </div>
        </div>

        <HRSeparator className='my-12 md:my-24' />

        <div className='section-container bg-shadow-element-left red-shadow flex w-full flex-col items-center justify-between self-center px-4 pb-16 md:px-8 2xl:px-0'>
          <div className='flex w-full flex-col items-center'>
            <Image
              src='/images/clickhouse/section_scale.svg'
              alt='ClickHouse at scale'
              width={72}
              height={72}
            />
            <SuiTitle type='h2' className='mb-6 mt-8'>
              ClickHouseの大規模展開
            </SuiTitle>
            <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200 md:pb-10'>
              ClickHouseは、顧客向けと社内向けのワークロードに基づくさまざまなユースケースで、幅広い業界で利用されています。
            </div>

            <div className='flex flex-col flex-wrap pt-12 md:mx-auto md:max-w-4xl md:flex-row md:pt-6'>
              {[
                'ウェブおよびアプリの分析',
                'Eコマースおよび金融',
                '時系列分析',
                '広告ネットワークおよびRTB',
                '情報セキュリティ',
                'ビジネスインテリジェンス',
                '通信業界',
                '監視とテレメトリ',
                'オンラインゲーム',
                'モノのインターネット（IoT）',
                'オブザーバビリティ',
                'ユーザー行動分析'
              ].map((feature, featureIndex) => (
                <TickItem
                  key={featureIndex}
                  className='my-2 w-full md:w-1/2 lg:w-1/3'>
                  {feature}
                </TickItem>
              ))}
            </div>
          </div>
        </div>

        <GetStarted platforms={platforms} />
      </Layout>
    </>
  )
}
