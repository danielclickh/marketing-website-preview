import imageHero from './assets/hero.png'
import iconCoins from './assets/icon-coins.svg'
import iconFileSearch from './assets/icon-file-search.svg'
import iconLightBulb from './assets/icon-light-bulb.svg'
import iconSparkles from './assets/icon-sparkles.svg'
import iconStack from './assets/icon-stack.svg'
import iconTimer from './assets/icon-timer.svg'
import integrationAws from './assets/integration-aws.svg'
import integrationCloudflare from './assets/integration-cloudflare.svg'
import integrationFluentd from './assets/integration-fluentd.svg'
import integrationGo from './assets/integration-go.svg'
import integrationJava from './assets/integration-java.svg'
import integrationJavascript from './assets/integration-javascript.svg'
import integrationKubernetes from './assets/integration-kubernetes.svg'
import integrationNextjs from './assets/integration-nextjs.svg'
import integrationNodejs from './assets/integration-nodejs.svg'
import integrationOpentelemetry from './assets/integration-opentelemetry.svg'
import integrationPython from './assets/integration-python.svg'
import integrationRuby from './assets/integration-ruby.svg'
import logoAnthropic from './assets/logo-anthropic.svg'
import logoCharacterai from './assets/logo-characterai.svg'
import logoCisco from './assets/logo-cisco.svg'
import logoCloudflare from './assets/logo-cloudflare.svg'
import logoComcast from './assets/logo-comcast.svg'
import logoDoorDash from './assets/logo-doordash.svg'
import logoEbay from './assets/logo-ebay.svg'
import logoGitLab from './assets/logo-gitlab.svg'
import logoIbm from './assets/logo-ibm.svg'
import logoNetflix from './assets/logo-netflix.svg'
import logoSierra from './assets/logo-sierra.svg'
import logoSolarwinds from './assets/logo-solarwinds.svg'
import logoSony from './assets/logo-sony.svg'
import logoVimeo from './assets/logo-vimeo.svg'
import shareImage from './assets/share-image.png'
import Accordion from '@/components-cleaned/Accordion'
import AccordionItem from '@/components-cleaned/AccordionItem'
import AnimatedClickstackOtel from '@/components-cleaned/AnimatedClickstackOtel'
import CarouselPaginated from '@/components-cleaned/CarouselPaginated'
import ContentTicker from '@/components-cleaned/ContentTicker'
import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import ClickStack from '@/components/ClickStack'
import { CUIButton } from '@/components/ClickUI'
import EyebrowText from '@/components/EyebrowText'
import LinkWithArrow from '@/components/LinkWithArrow'
import MarketoForm from '@/components/MarketoForm'
import QuoteCard from '@/components/QuoteCard'
import TiltedText from '@/components/TiltedText'
import Layout from '@/components/jp/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnClick, useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateFaqPageSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import React, { CSSProperties, useRef, useState } from 'react'
import { EffectCreative, Mousewheel } from 'swiper/modules'

const FAQs: Array<{ question: string; answer: string }> = [
  {
    question: 'ClickStack とは何ですか？',
    answer: `ClickStack は ClickHouse を基盤とした高性能なオープンソースの観測性スタックです。ログ、メトリクス、トレース、セッションリプレイを統合し、あらゆるスケールにおいて高速なクエリ実行と効率的なストレージを提供します。`
  },
  {
    question: 'ClickStack は ELK スタックとどのように異なりますか？',
    answer: `大まかに見ると、Elastic（ELK）と ClickStack は似た構成を持っています。どちらもデータ収集レイヤー（Beats / Logstash と OpenTelemetry）、ストレージエンジン（Elasticsearch と ClickHouse）、UI（Kibana と HyperDX）で構成されています。しかし、その内部アーキテクチャには大きな違いがあります。

Elastic は転置インデックスとシャードベースのアーキテクチャを採用した分散検索エンジンです。全文検索には有効ですが、ストレージ使用量の増大、クエリの並列性の制限、取り込み処理とクエリ処理間の競合といった課題があります。

一方、ClickHouse を基盤とする ClickStack は、分析処理に最適化されたカラム指向の共有なし（shared-nothing）アーキテクチャを採用しています。高度な圧縮によるストレージ効率の向上、全コアを活用したクエリの並列実行、そしてクラウド環境におけるストレージとコンピュートの分離により、一貫して高いパフォーマンスと効率性を実現します。フル SQL をサポートし、Lucene スタイルの高速検索にも対応しているため、すべての観測性データに対してリアルタイムかつ高度な分析が可能です。

ClickStack と ELK スタックの詳細な比較については、[比較ガイドはこちら](/comparison/elastic-for-observability)をご覧ください。`
  },
  {
    question: 'ClickStack の主な構成要素は何ですか？',
    answer: `ClickStack は以下の 3 つの主要コンポーネントで構成されています。

- **ClickHouse** - 高速かつコスト効率の高いクエリ処理と圧縮を実現するカラム型データベース  
- **HyperDX** - 検索、ダッシュボード、アラート、セッションリプレイを統合した UI  
- **OpenTelemetry** - ログ、メトリクス、トレースのための標準化されたデータ収集基盤  

これらが連携することで、速度、スケーラビリティ、そしてシンプルさを重視した統合型の観測性スタックを形成します。`
  },
  {
    question: 'ClickStack は OpenTelemetry に対応していますか？',
    answer: `はい。ClickStack はあらゆるスケールの OpenTelemetry 環境向けに設計されています。OpenTelemetry Collector が同梱されており、ログ、メトリクス、トレースを統合した OTel イベントをネイティブに取り込みます。

ClickHouse の並列処理とカラム型ストレージを活用することで、小規模な導入からペタバイト規模のテレメトリデータまでシームレスにスケールし、リアルタイム性能を維持します。

ClickStack は OpenTelemetry ネイティブである一方、任意のワイドイベント形式にも対応しています。標準の OTel スキーマはすぐに利用できますが、独自スキーマを使用することも可能です。タイムスタンプを含めるだけで、HyperDX UI と ClickHouse による同様の強力なクエリ、相関分析、可視化機能を利用できます。`
  },
  {
    question: 'ClickStack は OpenTelemetry 専用ですか？',
    answer: `いいえ。ClickStack は OpenTelemetry スキーマに最適化されており、最も簡単かつ高速に導入・スケールできる方法を提供しますが、それに限定されるものではありません。ClickStack を支えるデータベースである ClickHouse は、あらゆるイベントスキーマを保存・クエリできます。

HyperDX UI は、イベントを表示・可視化するためにタイムスタンプフィールドのみを必要とします。そのため、独自のデータ形式やカスタムパイプラインを使用することも可能です。ワイドイベントのパターンに従い、タイムスタンプを含めることで、データは即座に ClickStack 上で利用可能になります。`
  },
  {
    question: 'ClickStack にはログ、トレース、メトリクスを保存できますか？',
    answer: `はい。ClickStack は、ログ、トレース、メトリクスを単一のプラットフォームで扱うために設計されたフルスタックの観測性プラットフォームです。ClickHouse を基盤として、高いカーディナリティを持つ OpenTelemetry データを効率的に取り込み・保存し、データベースレイヤーで自動的にイベントを相関付けることで、リアルタイムかつ深い洞察を提供します。`
  },
  {
    question:
      'ClickStack は転置インデックスによる高速検索をサポートしていますか？',
    answer: `はい。ClickStack は、デフォルトでカラム型の ClickHouse を使用しており、列単位でオプションの転置インデックスをサポートしています。ログデータの探索などに一般的なテキスト検索を高速化するため、転置インデックスやブルームフィルターを有効にすることができます。

HyperDX UI は Lucene スタイルの構文を受け取り、それを SQL に変換してこれらのインデックスを活用します。一方で、ストレージ使用量を最小限に抑えたい場合はインデックスを無効にし、ClickHouse の高速な並列文字列検索機能を利用することも可能で、多くのユースケースに十分対応できます。`
  },
  {
    question: 'ClickStack はオープンソースですか？',
    answer: `はい。ClickStack およびその構成要素はすべてオープンソースで、オープンスタンダードに基づいて構築されています。ClickHouse と OpenTelemetry Collector は Apache 2.0 ライセンス、HyperDX UI は MIT ライセンスで提供されています。

ClickStack は、セルフホスト、ハイブリッド、クラウドなど、制限なくあらゆる環境にデプロイできます。`
  },
  {
    question: 'ClickStack のホステッド版はありますか？',
    answer: `はい。ClickStack は ClickHouse Cloud 上でマネージドサービスとして利用できます。オープンなアーキテクチャはそのままに、ストレージとコンピュートの完全な分離による柔軟なスケーリングを実現し、読み取りと書き込みのワークロードを分離することで、一貫したパフォーマンスを提供します。

高度な圧縮とコスト効率の高いオブジェクトストレージにより、データを低コストで長期間保持できます。ClickHouse Cloud には自動バックアップが含まれ、運用負荷は不要です。HyperDX UI も追加費用なしで完全に統合されており、ClickHouse Cloud の認証を通じて安全に利用でき、どのサービスからでも起動できます。

将来的には、完全にマネージドな ClickStack の提供も予定されています。`
  }
]

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title:
            'ClickStack：ClickHouse を基盤とした高性能オープンソース観測性 | ログ・メトリクス・トレース',
          description:
            'ClickStack は ClickHouse を基盤とした高性能な観測性スタックです。ログ、メトリクス、トレースを統合し、10〜100 倍のコスト削減を実現します。今すぐ始めましょう。',
          path: '/jp/use-cases/observability',
          image: [{ url: shareImage.src }],
          languages: ['en', 'ja'],
          schema: [
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'ClickStack 観測性',
              serviceType:
                '観測性（ログ、メトリクス、トレース、セッションリプレイ、エラー）',
              url: 'https://clickhouse.com/jp/use-cases/observability',
              description:
                'ClickHouse を基盤とした高性能なオープンソース観測性スタック。大規模環境において、ログ、メトリクス、トレース、セッションリプレイ、エラーに対するサブ秒クエリと効率的な集計を提供します。',
              provider: {
                '@type': 'Organization',
                name: 'ClickHouse, Inc.',
                url: 'https://clickhouse.com'
              },
              areaServed: '全世界',
              audience: {
                '@type': 'BusinessAudience',
                audienceType: 'エンジニアリング、SRE、DevOps、データチーム'
              },
              offers: {
                '@type': 'Offer',
                name: 'ClickHouse Cloud 上の ClickStack — 無料トライアル',
                description:
                  'HyperDX と ClickHouse を 30 日間のトライアルと $300 分のクレジットで体験できます。',
                price: '0.00',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: 'https://console.clickhouse.cloud/'
              },
              brand: {
                '@type': 'Brand',
                name: 'ClickStack'
              }
            },
            generateFaqPageSchema({ faqs: FAQs })
          ]
        },
        ...commonProps
      }
    }
  }

export default function ClickHouseServerPage({
  seo,
  headerData,
  footerData
}: CommonProps) {
  useGalaxyOnPage('observabilityUseCasePage')
  const [hyperdxActive, setHyperdxActive] = useState(true)
  const [clickhouseActive, setClickhouseActive] = useState(false)
  const [opentelemetryActive, setOpentelemetryActive] = useState(false)
  const allAreInactive =
    !hyperdxActive && !clickhouseActive && !opentelemetryActive

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='overflow-hidden py-20 lg:py-24'>
        <div className='section-container flex flex-col items-center lg:flex-row lg:items-stretch'>
          {/* Content */}
          <div className='relative z-10 w-full max-w-3xl space-y-6 text-center lg:py-8 lg:pr-8 lg:text-left'>
            <SuiText className='flip-selection !text-3xl lg:mb-16 lg:!text-[3.5rem]'>
              <TiltedText type='black-on-yellow' className='px-2 py-1'>
                <strong>ClickStack</strong>
              </TiltedText>
            </SuiText>
            <SuiTitle
              type='h1'
              className='font-basier font-semibold md:!text-6xl'>
              大規模 OpenTelemetry に対応したオープンソース観測性スタック
            </SuiTitle>
            <SuiText size='lg' className='space-y-6 text-neutral-200'>
              <p>
                大規模な OpenTelemetry データに対応するための
                オープンソース観測性スタック 高いカーディナリティを持つ
                OpenTelemetry
                データであっても、ログ、メトリクス、トレース、セッションリプレイ、エラーに対する
                高速クエリ実行と強力な集計機能
                を実現し、リソース効率に優れた処理を提供します。
              </p>
              <p>
                すべてが ClickHouse によって統合されたスタックで利用できます。
              </p>
            </SuiText>
            <div className='flex w-full flex-col justify-center gap-6 md:flex-row lg:justify-start'>
              <CUIButton
                type='primary'
                size='lg'
                weight='semibold'
                href='https://clickhouse.com/docs/jp/use-cases/observability/clickstack/getting-started?loc=use-case-observability'
                linkClass='w-full md:w-auto'
                className='w-full !px-10 md:w-auto'>
                オープンソースで始める
              </CUIButton>
              <CUIButton
                type='secondary'
                size='lg'
                weight='semibold'
                href='/jp/company/contact?loc=use-case-observability'
                target='_self'
                linkClass='w-full md:w-auto'
                className='w-full !px-10 md:w-auto'>
                営業にお問い合わせ
              </CUIButton>
            </div>
          </div>

          {/* Image */}
          <div className='relative order-first -mb-8 -mt-16 w-full sm:-mb-32 sm:-mt-12 lg:order-last lg:mb-0 lg:mt-0 lg:flex-1'>
            <Image
              src={imageHero}
              width={1772 / 2}
              height={1038 / 2}
              alt='HyperDX Dashboard'
              className='bottom-0 left-0 top-0 h-auto w-full origin-left from-40% gradient-mask-to-b md:from-25% lg:absolute lg:h-full lg:w-auto lg:max-w-none lg:gradient-mask-to-none xl:scale-110 2xl:scale-125'
              quality={100}
              loading='eager'
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className='section-container mb-20 lg:mb-24 lg:mt-10'>
        <EyebrowText className='mb-10 text-center text-primary-300'>
          多くの企業が観測性用途で信頼しています
        </EyebrowText>
        <ContentTicker
          gap='3rem'
          gradientMask={true}
          pause={false}
          sizingMethod='max'>
          {(
            [
              {
                src: logoNetflix,
                alt: 'Netflix logo',
                width: 95,
                height: 27
              },
              {
                src: logoCloudflare,
                alt: 'Cloudflare logo',
                width: 106,
                height: 36
              },
              {
                src: logoSony,
                alt: 'Sony logo',
                width: 100,
                height: 19
              },
              {
                src: logoComcast,
                alt: 'Comcast logo',
                width: 108,
                height: 44
              },
              {
                src: logoAnthropic,
                alt: 'Anthropic logo',
                width: 143,
                height: 16,
                className: 'opacity-70'
              },
              {
                src: logoCharacterai,
                alt: 'Character.ai logo',
                width: 102 * 1.5,
                height: 14 * 1.5,
                className: 'opacity-70'
              },
              {
                src: logoSierra,
                alt: 'Sierra logo',
                width: 118,
                height: 39,
                className: 'opacity-70'
              },
              {
                src: logoEbay,
                alt: 'Ebay logo',
                width: 84,
                height: 34
              },
              {
                src: logoCisco,
                alt: 'Cisco logo',
                width: 71,
                height: 38
              },
              {
                src: logoDoorDash,
                alt: 'DoorDash logo',
                width: 187,
                height: 23
              },
              {
                src: logoGitLab,
                alt: 'GitLab logo',
                width: 122,
                height: 38
              },
              {
                src: logoIbm,
                alt: 'IBM logo',
                width: 70,
                height: 29,
                className: 'opacity-70'
              },
              {
                src: logoSolarwinds,
                alt: 'SolarWinds logo',
                width: 200,
                height: 40,
                className: 'opacity-70'
              },
              {
                src: logoVimeo,
                alt: 'Vimeo logo',
                width: 90,
                height: 26,
                className: 'opacity-70'
              }
            ] as Array<ImageProps>
          ).map(({ className = '', ...logo }, logoIndex) => {
            return (
              <Image
                key={logoIndex}
                {...logo}
                loading='lazy'
                className={`my-auto flex-shrink-0 flex-grow-0 ${className}`}
              />
            )
          })}
        </ContentTicker>
      </section>

      {/* Fast, simple, fair */}
      {/*<section className='overflow-hidden bg-neutral-800 py-6 md:py-10 lg:py-16'>
        <div className='section-container'>
          <div
            className='md:bg-shadow-element yellow-shadow shadow-circle relative overflow-hidden rounded-lg bg-neutral-900 px-6 py-8 md:py-10 lg:py-16'
            style={
              {
                '--top-side': '0',
                '--left-side': '50%'
              } as CSSProperties
            }>
            <div className='absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary-300 to-transparent' />
            <div className='mx-auto ml-auto max-w-3xl flex-1 space-y-6 text-center'>
              <SuiTitle type='h3' className='text-primary-300'>
                Fast, simple, and fair observability at any scale
              </SuiTitle>
              <SuiText className='text-neutral-200 md:text-lg'>
                Store and query petabytes of OpenTelemetry data with
                transparent, simple pricing, with fast queries so your engineers
                can investigate instantly, not wait for results.
              </SuiText>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Customer quotes */}
      <section className='relative z-10 bg-neutral-950/60 pb-12 pt-20 lg:pb-16 lg:pt-24'>
        <div className='section-container'>
          <SuiTitle
            type='h2'
            className='mx-auto mb-12 max-w-4xl text-center lg:mb-24 lg:px-7'>
            高性能な観測性ソリューションとして ClickStack
            を選択している企業の仲間に加わりましょう
          </SuiTitle>
          <div className='space-y-6 lg:grid lg:grid-cols-3 lg:gap-9 lg:space-y-0'>
            <QuoteCard
              className='!bg-neutral-750'
              content={
                'At Sony LIV, we ingest tens of millions of video streaming events into ClickHouse Cloud and run queries to generate complex dashboards for analysis. This allows our operations team to monitor, alert & troubleshoot the QOS and QOE of our customers in real-time. ClickHouse Cloud has helped us to optimize costs and ensure the high availability and resilience of our services.'
              }
              logo={{
                src: '/images/sony.svg',
                width: 136.36 * 0.63,
                height: 24 * 0.63,
                alt: 'Sony'
              }}
            />
            <QuoteCard
              className='!bg-neutral-750'
              content={
                'ClickHouse played an instrumental role in helping us develop and ship Claude 4. With ClickHouse, the database is green, queries are lightning-fast, and money is not on fire. ClickHouse has already delivered significant value in helping us create state-of-the-art language models.'
              }
              link='/blog/how-anthropic-is-using-clickhouse-to-scale-observability-for-ai-era'
              logo={{
                src: logoAnthropic,
                width: 143 * 1,
                height: 16 * 1,
                alt: 'Antrhopic',
                className: 'mb-1'
              }}
            />
            <QuoteCard
              className='!bg-neutral-750'
              content={
                'Previously, querying the last 10 minutes would take 1-2 minutes. With ClickStack, it was just a case of how fast I could blink. The performance is real. When you’re digging into logs during an incident, every second matters.'
              }
              link='/blog/scaling-observabilty-for-thousands-of-gpus-at-character-ai'
              logo={{
                src: logoCharacterai,
                width: 102 * 1.38,
                height: 14 * 1.38,
                alt: 'Character.ai',
                className: 'mb-1'
              }}
            />
          </div>
        </div>
        <div className='mt-12 text-center lg:mt-16'>
          <LinkWithArrow
            href='/use-cases?log=use-case-observability'
            className='text-slate-300 hover:underline'>
            導入事例をさらに見る
          </LinkWithArrow>
        </div>
      </section>

      {/* ClickStack */}
      <section
        className='section-container bg-shadow-element yellow-shadow shadow-circle my-20 lg:my-24'
        style={
          {
            '--top-side': '0',
            '--left-side': '50%'
          } as CSSProperties
        }>
        {/* Intro */}
        <div className='space-y-2 text-center'>
          <EyebrowText className='text-primary-300'>ClickStack</EyebrowText>
          <SuiTitle type='h2'>ClickHouse を基盤とした観測性スタック</SuiTitle>
        </div>

        {/* Features */}
        <div className='my-20 grid grid-cols-1 gap-12 lg:grid-cols-3'>
          <div className='flex flex-1 flex-col items-center gap-4 text-center'>
            <Image src={iconTimer} width={48} height={49} alt='Timer icon' />
            <SuiTitle
              type='h3'
              className='font-basier text-[1.5rem] font-semibold leading-[1.3]'>
              サブ秒クエリ
            </SuiTitle>
            <SuiText className='text-balance'>
              高いカーディナリティを持つ OpenTelemetry
              データがペタバイト規模であっても、サブ秒でのクエリ実行が可能です
            </SuiText>
          </div>
          <div className='flex flex-1 flex-col items-center gap-4 text-center'>
            <Image src={iconCoins} width={48} height={49} alt='Savings icon' />
            <SuiTitle
              type='h3'
              className='font-basier text-[1.5rem] font-semibold leading-[1.3]'>
              10〜100倍のコスト削減
            </SuiTitle>
            <SuiText className='text-balance'>
              OpenTelemetry
              データに対して業界最高水準の取り込み性能と圧縮率（10〜30倍）を実現し、大幅なコスト削減を可能にします
            </SuiText>
          </div>
          <div className='flex flex-1 flex-col items-center gap-4 text-center'>
            <Image src={iconStack} width={48} height={49} alt='Stack icon' />
            <SuiTitle
              type='h3'
              className='font-basier text-[1.5rem] font-semibold leading-[1.3]'>
              フルスタックの OpenTelemetry 観測性
            </SuiTitle>
            <SuiText className='text-balance'>
              セッションリプレイを OpenTelemetry
              のログ、トレース、メトリクスと統合し、包括的な観測性を実現します
            </SuiText>
          </div>
        </div>

        {/* Diagram */}
        <div className='mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-8 lg:flex-row lg:items-start lg:gap-20'>
          <div className='w-full max-w-max px-4'>
            <ClickStack
              hyperdx={hyperdxActive || allAreInactive}
              clickhouse={clickhouseActive || allAreInactive}
              opentelemetry={opentelemetryActive || allAreInactive}
              onClick={(stack) => {
                switch (stack) {
                  case 'hyperdx':
                    setHyperdxActive(true)
                    setClickhouseActive(false)
                    setOpentelemetryActive(false)
                    break
                  case 'clickhouse':
                    setHyperdxActive(false)
                    setClickhouseActive(true)
                    setOpentelemetryActive(false)
                    break
                  case 'opentelemetry':
                    setHyperdxActive(false)
                    setClickhouseActive(false)
                    setOpentelemetryActive(true)
                    break
                }
              }}
            />
          </div>
          <div className='flex w-full flex-1 flex-col items-center gap-6 lg:items-start'>
            <AccordionItem
              handle={
                <SuiTitle type='h3'>検索、ダッシュボード、アラート</SuiTitle>
              }
              onToggle={(isOpen) => {
                setHyperdxActive(isOpen)
                if (isOpen) {
                  setClickhouseActive(false)
                  setOpentelemetryActive(false)
                }
              }}
              open={hyperdxActive}
              className='w-full !bg-neutral-750'>
              <div className='space-y-4'>
                <SuiText>
                  ClickStack は HyperDX UI
                  を通じて、ログ、メトリクス、トレース、セッションリプレイを単一のプラットフォームに統合します。ClickHouse
                  向けに最適化されており、高速な Lucene スタイル検索に加え、100
                  以上の組み込み関数を活用した高度な分析のためのフル SQL
                  アクセスを提供します。
                </SuiText>
                <SuiText>
                  最小限の設定でダッシュボードやアラートを作成でき、イベント差分による異常検知や、イベントパターンを用いた迅速な原因分析を可能にします。
                </SuiText>
              </div>
            </AccordionItem>
            <AccordionItem
              handle={
                <SuiTitle type='h3'>ClickHouse を基盤としたストレージ</SuiTitle>
              }
              onToggle={(isOpen) => {
                setClickhouseActive(isOpen)
                if (isOpen) {
                  setHyperdxActive(false)
                  setOpentelemetryActive(false)
                }
              }}
              open={clickhouseActive}
              className='w-full !bg-neutral-750'>
              <div className='space-y-4'>
                <SuiText>
                  ClickHouse を基盤とすることで、HyperDX はテラバイト規模の
                  OpenTelemetry
                  データを秒単位で検索し、高いカーディナリティを持つイベントを日々数十億件取り込みます。ClickStack
                  には最適化済みの OpenTelemetry
                  スキーマがあらかじめ用意されており、手動でのチューニングを必要とせず、分析や洞察の創出に集中できます。
                </SuiText>
                <SuiText>
                  ClickHouse Cloud
                  上では、ストレージとコンピュートの完全な分離により、ClickStack
                  は柔軟なスケーリングと高いコスト効率を実現します。コンピュート分離（compute-compute
                  separation）により、データ取り込みとクエリ処理をそれぞれ専用リソースで独立して実行でき、あらゆるスケールにおいて一貫したパフォーマンスを提供します。
                </SuiText>
              </div>
            </AccordionItem>
            <AccordionItem
              handle={<SuiTitle type='h3'>データ収集</SuiTitle>}
              onToggle={(isOpen) => {
                setOpentelemetryActive(isOpen)
                if (isOpen) {
                  setHyperdxActive(false)
                  setClickhouseActive(false)
                }
              }}
              open={opentelemetryActive}
              className='w-full !bg-neutral-750'>
              <div className='space-y-4'>
                <SuiText>
                  ClickStack は OpenTelemetry
                  標準をネイティブにサポートし、ログ、メトリクス、トレースを「ワイドイベント」として取り込みます。ワイドイベントは、ClickHouse
                  上で観測性データを統合するための、コンテキスト情報を豊富に含んだレコード形式です。ペタバイト規模の
                  OpenTelemetry データ処理を前提に設計されています。
                </SuiText>
                <SuiText>
                  ClickHouse はネイティブの JSON
                  サポートにより、変化し続ける半構造化データを効率的に扱うことができます。データ取り込み時にフィールドが自動的に作成され、事前のスキーマ定義を必要とせず、高速なクエリ性能と高い圧縮率を実現するカラム型ストレージを提供します。
                </SuiText>
              </div>
            </AccordionItem>
          </div>
        </div>
      </section>

      <section className='bg-neutral-750 py-16'>
        <div className='section-container flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between'>
          <div className='lg:max-w-xl'>
            <SuiTitle type='h2' className='mb-6'>
              大規模な OpenTelemetry 環境に対応するために設計されています。
              <br />
              数分で利用を開始できます。
            </SuiTitle>
            <SuiText className='space-y-6'>
              <p>
                OpenTelemetry
                データがギガバイト規模であってもペタバイト規模であっても、ClickStack
                は高い圧縮率、並列クエリ実行、ネイティブな SQL
                サポートにより、他に類を見ない効率性を提供します。
              </p>
              <p>
                HyperDX UI は、Lucene スタイルのログ検索、フル SQL
                アクセス、そしてログ・トレース・メトリクスをデータベースレイヤーで自動的に関連付ける機能を備え、シームレスな操作体験を実現します。追加のサービスやパイプライン、制限されたワークフロー、アプリケーションレイヤーでの相関処理は必要ありません。
              </p>
              <p>
                OpenTelemetry
                データの送信先を検討しているなら、答えはシンプルです。ClickStack。オープンソース。{' '}
                <strong>
                  大規模 OpenTelemetry 環境のために設計されています。
                </strong>
              </p>
            </SuiText>
            <CUIButton
              type='primary'
              size='lg'
              weight='semibold'
              href='https://clickhouse.com/docs/use-cases/observability/clickstack/getting-started?loc=use-case-observability'
              target='_blank'
              linkClass='w-full md:w-auto'
              className='mt-6 w-full !px-10 md:w-auto'>
              今すぐ始める
            </CUIButton>
          </div>
          <div className='order-first mx-auto w-full max-w-max lg:order-last'>
            <AnimatedClickstackOtel />
          </div>
        </div>
      </section>

      {/* Introdcuction video */}
      <section className='section-container my-20 lg:my-24'>
        <div className='mx-auto max-w-4xl text-center'>
          <SuiTitle type='h2' className='mb-10'>
            60 秒で分かる概要と紹介動画を見る
          </SuiTitle>
          <CarouselPaginated
            modules={[Mousewheel, EffectCreative]}
            mousewheel={{
              enabled: true,
              forceToAxis: true,
              releaseOnEdges: true,
              sensitivity: 0.5
            }}
            effect='creative'
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-20%', 0, -1]
              },
              next: {
                shadow: true,
                translate: ['100%', 0, 0]
              }
            }}
            simulateTouch={false}
            carouselClass='rounded'>
            {['WBe7ZwTRWuQ', '3waDYancX_c'].map((videoId, videoIdIndex) => {
              return (
                <PlayOnClickVideo
                  key={videoIdIndex}
                  provider='youtube'
                  id={videoId}
                  thumbnail={<YouTubeThumbnail videoId={videoId} />}
                />
              )
            })}
          </CarouselPaginated>
        </div>
      </section>

      {/* Custom stack */}
      <section className='section-container my-20 lg:my-24'>
        <div className='relative flex flex-col gap-8 overflow-clip rounded bg-neutral-750 p-8 lg:p-16'>
          <div className='absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-primary-300 to-transparent' />

          <div className='mx-auto max-w-4xl space-y-8 text-center lg:px-2'>
            <SuiTitle type='h2'>独自のスタックを構築したいですか？</SuiTitle>
            <SuiText>
              OpenTelemetry
              以外のカスタムパイプラインやスキーマが必要な場合でも、HyperDX UI
              はスキーマ非依存で、あらゆるテレメトリパイプラインに対応します。任意の
              ClickHouse
              インスタンスに接続でき、観測性データを完全にコントロールすることが可能です。
            </SuiText>
            <SuiText>
              独自のスタック構築においても、ClickHouse
              は必要な機能を提供します。高性能な SQL エンジン、HTTP
              によるデータ取り込み、スケーラブルな MergeTree
              ストレージ、そしてリアルタイム変換を可能にするマテリアライズドビューを活用できます。柔軟なダッシュボード作成には、Grafana
              プラグインを使用して、ClickHouse
              のデータを他のデータソースと相関させることができます。
            </SuiText>
          </div>
        </div>
      </section>

      {/* Get started */}
      <section className='section-container my-20 grid grid-cols-1 gap-8 lg:my-24 lg:grid-cols-2 lg:gap-16'>
        <SuiTitle type='h2' className='col-span-full text-center'>
          なぜ ClickStack で観測性を構築するのか？
        </SuiTitle>
        <div className='space-y-6'>
          <Image src={iconCoins} width={48} height={49} alt='Savings icon' />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            ClickStack はどのようにして観測性コストを削減するのでしょうか？
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse は JVM
            ベースのシステムに伴うオーバーヘッドを回避し、ハードウェアに最適化されたカラム指向設計により、処理速度を損なうことなく
            OpenTelemetry データのストレージ使用量を最大 90% 削減します。
          </SuiText>
          <SuiText className='text-neutral-200'>
            単一のマシンから数百コア規模までシームレスにスケールし、ローカルディスクとオブジェクトストレージ間の自動階層化によって、パフォーマンスとコスト効率の両立を実現します。
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image
            src={iconSparkles}
            width={48}
            height={49}
            alt='Sparkles icon'
          />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            ClickStack の導入と運用はどれほど簡単でしょうか？
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse
            の統一されたアーキテクチャにより、単一の実行ファイルでスタンドアロン環境から大規模クラスターまで対応でき、シンプルな運用を実現します。
          </SuiText>
          <SuiText className='text-neutral-200'>
            運用負荷を最小限に抑えたい場合は、ClickHouse Cloud 上の ClickStack
            を選択することで、スケーリング、バックアップ、メンテナンスが自動化されます。ストレージとコンピュートの分離により、インテリジェントなキャッシュを活用した無制限のスケーラビリティとサブ秒クエリ性能の両立を可能にします。
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image src={iconFileSearch} width={48} height={49} alt='File icon' />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            ClickStack
            はどのようにしてリアルタイム観測性を実現するのでしょうか？
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse
            は大量かつ継続的なデータストリームの取り込みを前提に設計されており、毎秒ギガバイト規模の取り込みレートをサポートしながら、新しいデータをサブ秒レベルの低遅延で検索可能にします。
          </SuiText>
          <SuiText className='text-neutral-200'>
            最も負荷の高いリアルタイムワークロード向けに構築された HyperDX
            は、ClickHouse
            が備える強力な集計・分析関数群を高度に最適化して活用し、極めて高速な観測性クエリを提供します。
          </SuiText>
        </div>
        <div className='space-y-6'>
          <Image
            src={iconLightBulb}
            width={48}
            height={49}
            alt='Light bulb icon'
          />
          <SuiTitle
            type='h3'
            className='font-basier text-[1.75rem] font-semibold leading-[1.3]'>
            ClickStack は観測性データ専用なのでしょうか？
          </SuiTitle>
          <SuiText className='text-neutral-200'>
            ClickHouse
            は観測性データのためだけのストアではなく、高速な分析処理を目的として設計された高性能
            SQL データベースです。
          </SuiText>
          <SuiText className='text-neutral-200'>
            観測性は数あるデータ課題の一つに過ぎません。ClickHouse
            を使用すれば、観測性データ、ビジネスデータ、セキュリティデータを単一のシステム上でシームレスに結合し、お好みの可視化ツールを用いて、システム全体にわたるより深い洞察を引き出すことができます。
          </SuiText>
        </div>
      </section>

      {/* Newsletter */}
      <section className='section-container my-16 max-w-4xl lg:my-24'>
        <div className='flex flex-col justify-between gap-6 rounded bg-white/5 p-4 md:flex-row md:items-center md:p-6'>
          <div className='w-full md:w-1/2'>
            <SuiTitle type='h3' className='mb-2.5'>
              観測性ニュースレターを購読する
            </SuiTitle>
            <SuiText size='sm' weight='medium' color='secondary'>
              ClickStack
              の新機能リリース、プロダクトロードマップ、サポート情報、クラウド提供に関する最新情報をお届けします。
            </SuiText>
          </div>
          <div className='flex-1'>
            {!formSuccess && (
              <MarketoForm
                formId='1498'
                disclaimer={false}
                clearbitTracking={true}
                onLoad={() => setFormLoaded(true)}
                onSuccess={() => {
                  setFormSuccess(true)

                  // Delay needed to allow the ref to update before scrolling
                  window.setTimeout(() => {
                    formSuccessRef.current?.scrollIntoView()
                  }, 10)

                  return false // Stops page from reloading
                }}
              />
            )}

            {!formLoaded && <div className='text-center'>Loading form...</div>}

            {formSuccess && (
              <div ref={formSuccessRef}>
                <p>ニュースレターへのご登録ありがとうございます！</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className='section-container mb-24 lg:mb-36'>
        <div className='mx-auto mb-10 max-w-4xl space-y-6 text-center lg:mb-16 lg:px-12'>
          <SuiTitle type='h2'>アプリケーションの計測をはじめましょう</SuiTitle>
          <SuiText size='lg' className='text-neutral-200'>
            数行のコードで、ログ、API リクエスト、DB
            クエリなどあらゆる処理をトレースできます。ClickStack
            を使えば、数分でスタック全体の計測と観測を開始できます。
          </SuiText>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-8 md:gap-10 xl:justify-between xl:gap-12'>
          <Image
            src={integrationNodejs}
            width={49}
            height={55}
            alt='NodeJS'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationGo}
            width={49}
            height={19}
            alt='Go'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationJava}
            width={37}
            height={49}
            alt='Java'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationJavascript}
            width={49}
            height={49}
            alt='Javascript'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationNextjs}
            width={92}
            height={19}
            alt='NextJS'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationPython}
            width={49}
            height={49}
            alt='Python'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationRuby}
            width={46}
            height={45}
            alt='Ruby'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationCloudflare}
            width={49}
            height={23}
            alt='Cloudflare'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationKubernetes}
            width={49}
            height={47}
            alt='Kubernetes'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationOpentelemetry}
            width={49}
            height={49}
            alt='OpenTelemetry'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationAws}
            width={70}
            height={42}
            alt='AWS'
            className='w-8 md:w-auto'
          />
          <Image
            src={integrationFluentd}
            width={49}
            height={49}
            alt='Fluentd'
            className='w-8 md:w-auto'
          />
        </div>
      </section>

      {/* Try ClickHouse */}
      <section className='section-container my-20 md:px-8 lg:my-24 2xl:px-0'>
        <div className='space-y-6 rounded-lg bg-primary-300 px-4 py-16 text-center'>
          <SuiTitle type='h2' color='text-default'>
            ClickHouse Cloud で{' '}
            <TiltedText type='white-on-black' className='px-2 py-1'>
              ClickStack
            </TiltedText>{' '}
            をお試しください
          </SuiTitle>
          <SuiText size='base' color='text-default' weight='normal'>
            HyperDX と ClickHouse
            の組み合わせによるフル機能を、数分で体験できます。
            <br />
            30 日間の無料トライアルと、ご自身のペースで利用できる **$300
            分のクレジット**をご用意しています。
          </SuiText>
          <p className='mt-8 flex flex-col justify-center gap-2 sm:flex-row sm:gap-4'>
            <CUIButton
              type='primary-dark'
              size='lg'
              className='group mx-auto w-full !px-10 md:w-auto'
              target='_blank'
              href='https://console.clickhouse.cloud/signUp?loc=use-case-observability'
              onClick={useGalaxyOnClick(
                'observabilityUseCasePage.footerCta.getStartedSelect'
              )}>
              今すぐ始める
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              className='group mx-auto w-full !border-neutral-800 !px-10 !text-neutral-800 hover:!bg-neutral-800 hover:!text-white md:w-auto'
              target='_blank'
              href='/jp/company/contact?loc=use-case-observability'
              onClick={useGalaxyOnClick(
                'observabilityUseCasePage.footerCta.requestDemoSelect'
              )}>
              デモを申し込む
            </CUIButton>
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section
        id='faqs'
        className='bg-shadow-element relative mx-auto my-24 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
        style={
          {
            '--top-side': '224px'
          } as React.CSSProperties
        }>
        <div className='pb-10 text-center lg:text-left'>
          <div className='lg:sticky lg:top-32'>
            <Image
              src='/faq-icon.svg'
              alt='FAQ Icon'
              width={72}
              height={72}
              className='mx-auto lg:mx-0'
            />
            <SuiTitle type='h2' className='my-6 lg:text-left'>
              よくある質問
            </SuiTitle>
            <div className='mx-auto max-w-md space-y-4 text-neutral-200 lg:text-left'>
              <p>
                私たちは、観測性をシンプルで高速、そしてオープンなものにすることを目指しています。ClickStack
                について詳しく知るには FAQ
                をご覧ください。必要な情報が見つからない場合でも、いつでもお気軽にご相談いただけます。
              </p>
              <p>
                <LinkWithArrow
                  href='/jp/company/contact'
                  className='font-bold text-primary-300'>
                  お気軽にお問い合わせください
                </LinkWithArrow>
              </p>
            </div>
          </div>
        </div>
        <Accordion
          className='mx-auto w-full max-w-2xl lg:mr-0'
          items={FAQs.map(({ question, answer }) => ({
            handle: question,
            content: answer
          }))}
        />
      </section>
    </Layout>
  )
}
