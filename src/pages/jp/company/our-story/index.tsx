import founders from './founders.json'
import investors from './investors.json'
import styles from './styles.module.scss'
import { CUIButton } from '@/components/ClickUI'
import { StrapiImageUrl } from '@/components/StrapiElements'
import Layout from '@/components/jp/Layout'
import { Person } from '@/components/person_area'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { OurStoryData } from '@/types/ourStory'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Image from 'next/image'

export const getStaticProps: GetStaticProps<OurStoryData> =
  async function getStaticProps() {
    const params = {
      populate: [
        'ourHistory',
        'ourHistory.items',
        'hiring',
        'hiring.ctaButton',
        'team',
        'team.founders',
        'team.founders.profileImagePng',
        'team.investors',
        'team.investors.profileImagePng',
        'team.darkInvestorLogosPng',
        'team.lightInvestorLogosPng',
        'seo',
        'seo.image'
      ]
    }
    const data = await findOne('our-story', params)
    data.seo.locale = 'ja_JP'
    data.seo.path = '/company/our-story'
    data.seo.languages = ['en', 'ja']
    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function OurStoryPage({
  ourHistory,
  hiring,
  team,
  footerData,
  headerData,
  seo
}: OurStoryData) {
  useGalaxyOnPage('ourStoryPage')

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='relative pt-10'>
          <div className='pt-10'>
            <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
              <div className='mx-auto flex flex-col text-center'>
                <h1 className='mb-4 font-basier text-4xl font-semibold leading-tight text-neutral-100 md:text-5.5xl'>
                  ClickHouseについて
                </h1>
                <p className='max-w-3xl text-neutral-200'>
                  ClickHouseの開発は2009年に始まり、世界最速のOLAPデータベースを目指すというビジョンもとに始まりました。私たちは、SQLクエリを使用してリアルタイムで分析レポートを生成できる、人気のオープンソースの列指向データベース管理システムの開発者です。データはリアルタイムで増加していくものであり、分析結果は素早く、{' '}
                  <span className='tilted tilted-yellow'>
                    <span className='tilted-content'>瞬時に</span>
                  </span>
                  得られるべきだと私たちは考えています。
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className='relative pt-10'>
              <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 2xl:px-0'>
                <div className='flex'>
                  <Image
                    src='/images/team-who-we-are.png'
                    width='751'
                    height='406'
                    alt='Who we are'
                    className='mx-auto'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='section-container mx-auto my-32 flex max-w-7xl flex-col items-start gap-16 lg:flex-row-reverse'>
          <div className='flex w-full flex-col lg:w-1/2'>
            <Image
              src='/images/our-story/map-wrap.png'
              height={488}
              width={1025}
              alt='ClickHouse around the world'
            />
          </div>
          <div className='flex w-full flex-col lg:w-1/2'>
            <SuiTitle
              type='h2'
              weight='semibold'
              className='mb-8 text-neutral-100'>
              分散して助け合う
            </SuiTitle>
            <div className='max-w-5xl'>
              <div className='whitespace-pre-wrap text-neutral-200'>
                {`ClickHouseの社員は10か国以上に散らばっています。さまざまな人たちが遠く離れた場所から協力して働くことは大きなメリットだと、私たちは信じています。タイムゾーンや言語や文化の違いを超えたコラボレーションこそが、私たちの強みなのです。

離れた場所にいても全員で同じ目標を持ち、互いに信頼しながら働いています。世界に散らばることを手段として選んだのではなく、真にグローバルな企業を実現させるために、この考え方を意図的に取り入れたのです。
`}
              </div>
            </div>
          </div>
        </div>
        <div className='section-container mx-auto mb-12 flex max-w-7xl flex-col items-center gap-16 lg:flex-row'>
          <div className='flex w-full flex-col lg:w-1/2'>
            <Image
              src='/images/our-story/founders.png'
              alt='Founders'
              width={480}
              height={320}
              className='w-full'
            />
          </div>
          <div className='flex w-full flex-col lg:w-1/2'>
            <SuiTitle
              type='h2'
              weight='semibold'
              className='mb-8 text-neutral-100'>
              ClickHouseの歴史
            </SuiTitle>
            <div className='max-w-5xl'>
              <div className='flex flex-col whitespace-pre-wrap text-neutral-200'>
                <div className={styles.historyItem} key={2022}>
                  <div className='flex'>
                    <div className='flex items-center justify-center rounded-full text-center font-bold text-primary-300'>
                      <SuiTitle
                        type='h5'
                        className='min-w-[3rem] !text-base'
                        weight='medium'>
                        2022
                      </SuiTitle>
                    </div>
                  </div>
                  <div className={styles.historyText}>
                    ClickHouse欧州オフィスをアムステルダムに設立。待望のクラウドサービスに対して早期アクセスプログラムを開始しました。
                  </div>
                </div>

                <div className={styles.historyItem} key={2021}>
                  <div className='flex'>
                    <div className='flex items-center justify-center rounded-full text-center font-bold text-primary-300'>
                      <SuiTitle
                        type='h5'
                        className='min-w-[3rem] !text-base'
                        weight='medium'>
                        2021
                      </SuiTitle>
                    </div>
                  </div>
                  <div className={styles.historyText}>
                    ClickHouse,
                    Inc.をデラウェアに創立。サンフランシスコのベイエリアに本社を置きました。９月にIndex
                    Ventures社とBenchmark
                    Capital社から5,000万ドルの初期投資を受け、10月にはシリーズBの資金調達ラウンドで総額2億5000万ドルを調達。Coatue
                    Management、Altimeter
                    Capital、Lightspeed、Redpoint、その他の投資企業からの企業評価額は20億ドルに達しています。
                  </div>
                </div>

                <div className={styles.historyItem} key={2016}>
                  <div className='flex'>
                    <div className='flex items-center justify-center rounded-full text-center font-bold text-primary-300'>
                      <SuiTitle
                        type='h5'
                        className='min-w-[3rem] !text-base'
                        weight='medium'>
                        2016
                      </SuiTitle>
                    </div>
                  </div>
                  <div className={styles.historyText}>
                    ClickHouseは、Apache
                    2ライセンスの下でオープンソースプロジェクトをリリース。
                  </div>
                </div>

                <div className={styles.historyItem} key={2012}>
                  <div className='flex'>
                    <div className='flex items-center justify-center rounded-full text-center font-bold text-primary-300'>
                      <SuiTitle
                        type='h5'
                        className='min-w-[3rem] !text-base'
                        weight='medium'>
                        2012
                      </SuiTitle>
                    </div>
                  </div>
                  <div className={styles.historyText}>
                    3年の開発期間を経て、ClickHouseは世界第2位の規模を誇るウェブ分析プラットフォームを支えるためにローンチされました。
                  </div>
                </div>

                <div className={styles.historyItem} key={2009}>
                  <div className='flex'>
                    <div className='flex items-center justify-center rounded-full text-center font-bold text-primary-300'>
                      <SuiTitle
                        type='h5'
                        className='min-w-[3rem] !text-base'
                        weight='medium'>
                        2009
                      </SuiTitle>
                    </div>
                  </div>
                  <div className={styles.historyText}>
                    Alexey
                    Milovidovとそのチームは、リアルタイムで増加する非集計データからリアルタイムで分析レポートを生成することを目指し、試験的なプロジェクトを開始しました。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full bg-neutral-725 pb-24 pt-16'>
          <div className='section-container container mx-auto flex flex-col'>
            <SuiTitle
              type='h2'
              weight='bold'
              className='mb-14 text-center text-neutral-100'>
              創設メンバー
            </SuiTitle>

            <div className='flex flex-col items-center justify-evenly gap-2 space-y-8 sm:flex-row sm:items-start sm:space-y-0'>
              {founders.map((founder) => (
                <Person
                  key={founder.name + founder.role}
                  avatar={founder.imgSrc}
                  name={founder.name}
                  job={founder.role}
                  className='mx-auto !max-w-[232px]'
                  personType='founder'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='w-full pb-24 pt-16'>
          <div className='section-container container mx-auto flex flex-col'>
            <SuiTitle
              type='h2'
              weight='bold'
              className='mb-14 text-center text-neutral-100'>
              投資家の皆さま
            </SuiTitle>

            <div className='investor min-[340px]:grid-cols-2 grid grid-cols-1 flex-wrap justify-evenly gap-2 md:grid-cols-3 lg:grid-cols-6'>
              {investors.map((investor) => (
                <Person
                  small
                  key={investor.name}
                  avatar={investor.imgSrc}
                  name={investor.name}
                />
              ))}
            </div>

            <div className='flex flex-wrap justify-evenly gap-x-20 gap-y-16 pt-12'>
              {team.darkInvestorLogosPng.map((image, index) => (
                <StrapiImageUrl
                  key={`investors-${index}`}
                  {...image}
                  sizes='small'
                  className='mx-auto h-10 w-auto max-w-[min(250px,100%)] object-contain'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='section-container pb-16'>
          <div className='flip-selection w-full rounded-lg bg-primary-300 py-16 text-neutral-0'>
            <div className='container mx-auto flex flex-col 2xl:px-0'>
              <div className='mx-auto flex flex-col text-center'>
                <SuiTitle type='h2' color='text-default' className='mb-6'>
                  私たちのチームに参加しませんか？
                </SuiTitle>
                <div className='max-w-3xl'>
                  <SuiText size='base' color='text-default' weight='normal'>
                    新しい何かを築きたい、変革の推進者になりたい、ClickHouseの成長に大きく貢献してみたいという方は、こちらからご応募ください。
                  </SuiText>

                  {hiring.ctaButton && (
                    <CUIButton
                      type='primary-dark'
                      className='group mx-auto mt-6 flex w-auto'
                      href='/company/careers'
                      size='lg'
                      iconRight={
                        <ChevronRightIcon
                          height='18'
                          className='pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }>
                      採用情報を見る
                    </CUIButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
