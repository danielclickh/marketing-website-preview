import featureBlocks from './feature_blocks.json'
import features from './features.json'
import TickItem from '@/components-cleaned/TickItem'
import Lines from '@/components/ClickPipesAnimation/Lines'
import { CUIButton, CUICard } from '@/components/ClickUI'
import HRSeparator from '@/components/HRSeparator'
import LogoCarousel from '@/components/LogoCarousel'
import AnimatedIntegrationLogos from '@/components/jp/AnimatedIntegrationLogos'
import CloudProviders from '@/components/jp/CloudProviders'
import GetStartedFree from '@/components/jp/GetStartedFree'
import Layout from '@/components/jp/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CloudData } from '@/types/cloud'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useInView } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CloudData> =
  async function getStaticProps() {
    const params = {
      populate: [
        'hero',
        'hero.ctaButton',
        'hero.cloudProviders',
        'hero.cloudProviders.darkProviderPngs',
        'hero.cloudProviders.lightProviderPngs',
        'hero.videoGif',
        'hero.backgroundSvg',
        'features',
        'features.iconSvg',
        'screenshotsAndBullets',
        'screenshotsAndBullets.screenshotPng',
        'screenshotsAndBullets.bullets',
        'seo',
        'seo.image',
        'CloudCustomerLogos',
        'CloudCustomerLogos.logos',
        'CloudCustomerLogos.logos.*',
        'CloudCustomerLogos.logos.Logo'
      ]
    }
    const data = await findOne('cloud', params)
    data.seo.locale = 'ja_JP'
    data.seo.path = '/jp/cloud'
    data.seo.title = 'ClickHouse Cloud が日本で登場'
    data.seo.languages = ['en', 'ja']
    const commonProps = await getCommonProps()
    return {
      props: {
        ...data,
        ...commonProps
      }
    }
  }

export default function CloudPage({
  hero,
  seo,
  headerData,
  footerData,
  CloudCustomerLogos
}: CloudData) {
  const [windowWidth, setWindowWidth] = useState(0)
  const { ctaButton } = hero
  const integrationsRef = useRef(null)
  const isInView = useInView(integrationsRef, {
    amount: 'some',
    once: true
  })

  useGalaxyOnPage('productCloudPage')
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-neutral-800 bg-contain bg-center bg-no-repeat pt-10'>
          <div className='relative overflow-x-hidden'>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-4 pb-16 md:bg-no-repeat md:px-8 md:pb-24 lg:min-h-[630px] 2xl:px-0'>
              <div className='flex'>
                <div className='flex-col text-center md:mt-16 md:w-7/12 md:text-left'>
                  <h1 className='mb-6 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    サーバーレス。{' '}
                    <span className='tilted tilted-yellow'>
                      <span className='tilted-content'>シンプル。</span>
                    </span>{' '}
                    ClickHouse Cloud。
                  </h1>
                  <SuiText
                    size='base'
                    color='secondary'
                    className='mt-6 md:max-w-xl md:pr-4'>
                    理想のパフォーマンスをオープンソースのClickHouseをサーバレスで提供。手間のかかる管理はまかせて、地球上で最も高速なデータベースからより多くのインサイトを得るための時間に使ってください。
                  </SuiText>
                  <div className='mt-8 flex flex-col items-center gap-8 md:flex-row'>
                    {ctaButton && (
                      <div className='flex justify-center md:justify-start'>
                        <CUIButton
                          type='primary'
                          size='lg'
                          weight='semibold'
                          href='https://console.clickhouse.cloud/signUp?loc=cloud-page-hero-button'
                          target={ctaButton.target}
                          linkClass='w-full max-w-[12rem]'
                          className='w-full'>
                          無料トライアルを始める
                        </CUIButton>
                      </div>
                    )}
                    <div className='flex items-center justify-center space-x-6 md:justify-start'>
                      <CloudProviders cloudProviders={hero.cloudProviders} />
                    </div>
                  </div>
                </div>
                <div className='mx-auto mt-4 hidden md:flex md:w-4/12'>
                  <Image
                    src='/images/cloud/cloud_hero_image.png'
                    alt='ClickHouse Cloud'
                    loading='eager'
                    width={1262}
                    height={523}
                    className='h-auto w-full min-w-[60rem]'
                    priority={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-neutral-800 pb-24'>
          <div className='mx-auto'>
            <div className='mx-auto mb-8 w-fit max-w-4xl px-4 pb-6 text-center font-basier text-xl font-semibold leading-normal text-neutral-300 md:px-0'>
              ClickHouse
              Cloudは大規模なデータを扱う開発者から信頼されています。{' '}
            </div>
            <div className='relative z-10 flex flex-wrap place-items-center items-center justify-center gap-6 self-center md:gap-x-14'>
              <div className='absolute left-0 z-10 h-full bg-cloudFadeLeftLogos p-10 lg:pr-20'></div>
              <div className='absolute right-0 z-10 h-full bg-cloudFadeRightLogos p-10 lg:pl-20'></div>
              <LogoCarousel
                fixShape={true}
                logoColor='pink'
                logos={CloudCustomerLogos.logos}
                speedClass1='animate-marqueeLeft3'
                speedClass2='animate-marqueeLeft4'
              />
            </div>
          </div>
        </div>
        <div className='border-t-2 border-primary-300 bg-neutral-725 text-neutral-0'>
          <div className='container mx-auto flex max-w-7xl flex-col px-4 pb-16 pt-16 sm:px-8 md:px-8 2xl:px-0'>
            <div className='feature-container'>
              {features.map((feature, index: number) => (
                <div className='col' key={index}>
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

        <div className='bg-shadow-element yellow-shadow flex w-full gap-y-4 pb-12 text-neutral-0 md:gap-y-28'>
          <div className='container mx-auto flex max-w-7xl flex-col gap-y-48 bg-opacity-10 px-8 pb-8 pt-24 text-center md:bg-no-repeat 2xl:px-0'>
            {featureBlocks.map((item, index: number) => (
              <div key={index}>
                <div
                  className={`flex flex-col items-center gap-x-24 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } justify-center`}>
                  <div className='mb-12 flex flex-col md:mb-0 md:w-1/2 md:text-left'>
                    <div className='border-yellow-200 md:border-l-4 md:pl-8'>
                      <SuiTitle
                        type='h3'
                        className='mb-4 !text-4xl'
                        weight='semibold'>
                        {item.title}
                      </SuiTitle>
                      <SuiText size='base' color='secondary' className='mb-8'>
                        {item.description}
                      </SuiText>
                      {item.bullets.map((bullet, index: number) => (
                        <TickItem key={index} className='my-4'>
                          {bullet.text}
                        </TickItem>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center justify-center md:w-1/2'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={item.image_width}
                      height={item.image_height}
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='relative flex flex-col gap-y-28 px-3 xl:px-0'>
          <HRSeparator className='my-0' />
          <div className='flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/section_integrations.svg'
                alt='ClickHouse integrations'
                width={72}
                height={73}
              />
              <SuiTitle type='h2' className='mb-6 mt-8'>
                パワフルなインテグレーション
              </SuiTitle>
              <div className='mx-auto max-w-2xl text-center leading-normal text-neutral-200'>
                ClickHouse
                の最も一般的な使い方を厳選しました。データ取り込み、データ視覚化、言語クライアントのエコシステム統合のライブラリは増え続けています。MySQL
                インターフェイスのサポートにより、お気に入りの MySQL 互換の
                <a
                  href='https://clickhouse.com/docs/en/integrations/data-visualization'
                  className='px-1 text-primary-300'>
                  データツール
                </a>
                に接続できるようになりました。
              </div>

              <div
                className='relative z-20 mx-auto mt-16 md:max-w-[552px]'
                ref={integrationsRef}>
                <AnimatedIntegrationLogos
                  play={isInView && windowWidth > 768}
                />
                <div
                  className={`absolute -top-1 left-1/2 z-[5] hidden -translate-x-1/2 transition-opacity delay-1000 duration-1000 lg:block ${
                    isInView ? '' : 'opacity-0'
                  }`}>
                  <Lines />
                </div>
              </div>
              <div className='relative z-20 mt-28 w-full pb-24'>
                <SuiTitle type='h2' className='mb-6 text-center'>
                  ClickPipes
                </SuiTitle>
                <div className='mx-auto max-w-3xl text-center leading-normal text-neutral-200'>
                  ClickPipesは数回のクリック操作だけでデータをさまざまなソースから簡単にインジェストできる、マネージド型インテグレーションサービスです。直感的な方法でデータをすばやくClickHouse
                  Cloudにインジェストできます。
                </div>
                <div className='mx-auto mt-11 inline-block w-full text-center hover:cursor-none'>
                  <CUIButton
                    type='secondary'
                    className='group mx-auto w-auto !bg-neutral-800 text-center'
                    href='/jp/cloud/clickpipes'>
                    詳しく見る
                  </CUIButton>
                </div>
                <Image
                  src='/images/cloud/clickhouse-logo-with-dropshadow.svg'
                  width={120}
                  height={120}
                  alt='ClickHouse'
                  className='relative z-20 mx-auto mt-16 shadow-noOffset shadow-primary-300'
                />
                <SuiTitle type='h2' className='mb-6 mt-8 text-center'>
                  ClickHouse Cloud
                </SuiTitle>
                <div className='mx-auto max-w-3xl text-center leading-normal text-neutral-200'>
                  オープンソースのClickHouseのパワーをサーバーレス構成でお試しいただけます。すばやい展開、シームレスなスケーリング、SOC
                  2 Type
                  II準拠の最高水準セキュリティを実現します。AWS、GCP、Azureで利用可能。インフラ構築の手間を省いて高度な分析情報を入手してください。
                </div>
                <CUIButton
                  type='primary'
                  className='mx-auto mt-11'
                  href='https://console.clickhouse.cloud/signUp?loc=clickpipes-cloud-page-get-started'>
                  開始する
                </CUIButton>
              </div>
            </div>
          </div>
        </div>

        <div className='relative flex flex-col gap-y-28'>
          <div className='section-container bg-shadow-element-right red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/section_support.svg'
                alt='Fast Icon'
                width={72}
                height={73}
              />
              <SuiTitle type='h2' className='mb-6 mt-8'>
                オールインワンのサポート
              </SuiTitle>
              <div className='mx-auto max-w-2xl px-4 text-center leading-normal text-neutral-200 md:px-0'>
                ClickHouseは、業界で最も包括的でコンサルティング的なクラウドサポートを、ClickHouse
                Cloudサービスにバンドルして提供しています。
              </div>

              <ul className='flex max-w-lg flex-col justify-start gap-4 px-4 py-8 md:px-0'>
                <li>
                  <TickItem>制限なしの24時間年中無休サポート</TickItem>
                </li>
                <li>
                  <TickItem>
                    オンデマンドのトレーニングとオンボーディングワークショップ
                  </TickItem>
                </li>
                <li>
                  <TickItem>
                    エキスパートセッションによるコンサルティングサポート
                  </TickItem>
                </li>
                <li>
                  <TickItem>ClickHouse Cloudへの移行をサポート</TickItem>
                </li>
              </ul>
            </div>

            <CUIButton
              type='secondary'
              className='group w-auto'
              href='/support/program/'
              iconRight={
                <ChevronRightIcon
                  height='18'
                  className='pt-0.5 transition group-hover:translate-x-1/2'
                />
              }>
              詳しく見る
            </CUIButton>
          </div>
        </div>

        <HRSeparator className='my-24' />
        <div className='relative flex flex-col gap-y-28 pb-48'>
          <div className='section-container bg-shadow-element-right red-shadow flex w-full flex-col items-center justify-between self-center'>
            <div className='flex w-full flex-col items-center'>
              <Image
                src='/images/cloud/cloud-icon.svg'
                alt='Fast Icon'
                width={72}
                height={72}
              />
              <SuiTitle type='h2' className='mb-6 mt-8 text-center'>
                デプロイ先を自由に選べる
              </SuiTitle>
              <div className='mx-auto max-w-2xl px-4 text-center leading-normal text-neutral-200 md:px-0'>
                ClickHouse
                Cloudなら、AWS、GCP、Azure、そしてMarketplacesと、展開する場所も方法も柔軟にお選びいただけます。ClickHouse
                CloudのセルフサービスUIでサービスを管理することも、APIとTerraformプロバイダーを使用して運用を自動化することもできます。
              </div>
              <div className='mt-16 flex flex-col space-y-10 md:flex-row md:space-x-10 md:space-y-0'>
                <CUICard className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
                  <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                    <Image
                      src='/images/cloud/aws-marketplace-logo.svg'
                      width={183}
                      height={29}
                      alt='AWS Marketplace'
                    />
                    <div className='flex flex-col items-center justify-center gap-2 pb-8 pt-4'>
                      <div className='text-center text-sm text-neutral-200'>
                        展開とサブスクリプションのオプションをAWS
                        Marketplaceで柔軟に選択できます。
                      </div>
                    </div>
                  </CUICard.Body>
                  <CUICard.Footer className='flex w-full items-center'>
                    <CUIButton
                      type='secondary'
                      href='https://aws.amazon.com/marketplace/pp/prodview-jettukeanwrfc'
                      linkClass='w-full inline-grid group'
                      iconRight={
                        <ChevronRightIcon
                          height='18'
                          className='arrow pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }
                      target='_blank'>
                      Marketplaceで見る
                    </CUIButton>
                  </CUICard.Footer>
                </CUICard>
                <CUICard className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
                  <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                    <Image
                      src='/images/cloud/gcp-logo.svg'
                      width={181}
                      height={29}
                      alt='Google Cloud'
                    />
                    <div className='flex flex-col items-center justify-center gap-2 pb-8 pt-4'>
                      <div className='text-center text-sm text-neutral-200'>
                        迅速な調達、柔軟な購入、そしてGCP
                        Marketplaceでの円滑な導入が可能です。
                      </div>
                    </div>
                  </CUICard.Body>
                  <CUICard.Footer className='flex w-full items-center'>
                    <CUIButton
                      type='secondary'
                      href='https://console.cloud.google.com/marketplace/product/clickhouse-public/clickhouse-cloud'
                      linkClass='w-full inline-grid group'
                      iconRight={
                        <ChevronRightIcon
                          height='18'
                          className='arrow pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }
                      target='_blank'>
                      Marketplaceで見る
                    </CUIButton>
                  </CUICard.Footer>
                </CUICard>
                <CUICard className='w-full max-w-[22.5rem] bg-click-grid bg-[length:359px_261px] bg-right bg-no-repeat p-8'>
                  <CUICard.Body className='flex flex-col items-center justify-center gap-2'>
                    <Image
                      src='/images/cloud/ms-marketplace.svg'
                      width={162}
                      height={29}
                      alt='Microsoft Azure Marketplace'
                    />
                    <div className='flex flex-col items-center justify-center gap-2 pb-8 pt-4'>
                      <div className='text-center text-sm text-neutral-200'>
                        Azure
                        Marketplaceサブスクリプションで支払いをまとめれば、クラウド費用を合理化できます。
                      </div>
                    </div>
                  </CUICard.Body>
                  <CUICard.Footer className='flex w-full items-center'>
                    <CUIButton
                      type='secondary'
                      href='https://azuremarketplace.microsoft.com/en-us/marketplace/apps/clickhouse.clickhouse_cloud?tab=Overview'
                      linkClass='w-full inline-grid group'
                      iconRight={
                        <ChevronRightIcon
                          height='18'
                          className='arrow pt-0.5 transition group-hover:translate-x-1/2'
                        />
                      }
                      target='_blank'>
                      Marketplaceで見る
                    </CUIButton>
                  </CUICard.Footer>
                </CUICard>
              </div>
            </div>
          </div>
        </div>

        <div className='section-container pb-16 md:px-8 2xl:px-0'>
          <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=cloud-page-get-started-footer' />
        </div>
      </Layout>
    </>
  )
}
