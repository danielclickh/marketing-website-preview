import { CUILink } from '../../ClickUI'
import { SuiTitle } from '../../sui'
import Accordion from '@/components-cleaned/Accordion'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { CSSProperties } from 'react'

const style = {
  '--top-side': '224px'
} as CSSProperties

export default function FAQ() {
  return (
    <div
      className='bg-shadow-element relative mx-auto mb-20 max-w-7xl px-4 md:px-8 lg:flex lg:justify-between lg:gap-x-12 2xl:px-0'
      style={style}>
      <div className='pb-10 text-center'>
        <Image
          src='/faq-icon.svg'
          alt='FAQ Icon'
          width={72}
          height={72}
          className='mx-auto lg:mx-0'
        />
        <SuiTitle type='h2' className='my-6 lg:text-left'>
          FAQ
        </SuiTitle>
        <div className='mx-auto max-w-md text-neutral-200 lg:text-left'>
          ClickHouseコミュニティの皆さまからのお問合せを、いつでも心よりお持ちしています。質問にもすぐにお答えします。
        </div>
        <CUILink
          href='/support/program/'
          target='_self'
          className='mt-6 flex items-center justify-center gap-4 text-primary-300 hover:underline lg:justify-start'
          onClick={useGalaxyOnClick('homePage.faqSection.askAnythingSelect')}>
          <span>問い合わせる</span> <ExternalLinkIcon className='h-4 w-4' />
        </CUILink>
      </div>
      <Accordion
        className='mx-auto w-full max-w-2xl lg:mr-0'
        items={[
          {
            onOpen: useGalaxyOnClick('homePage.faqSection.whyClickhouseExpand'),
            handle: 'ClickHouseが他社のデータベースよりも優れている点は？',
            content: (
              <p>
                ClickHouseは従来のデータウェアハウスやデータベースよりも高速です。通常は大規模なデータベースに対するリアルタイムのクエリを手頃なコストで実装するために使用されますが、CDWHやOLTPデータベースなどの既存のインフラに「スピードレイヤ」を追加して機能拡張するためにも使用されます。
              </p>
            )
          },
          {
            onOpen: useGalaxyOnClick('homePage.faqSection.olapOverviewExpand'),
            handle: 'OLAPとは？',
            content: (
              <p>
                OLAPはOnline Analytical
                Processing（オンライン分析処理）の略で、OLTP（Online Transaction
                Processing）と対比した用語です。OLAPデータベースは大規模なデータセットを使用した分析処理を、OLTPよりもはるかに高速に実行できます。
              </p>
            )
          },
          {
            onOpen: useGalaxyOnClick('homePage.faqSection.largeDataExpand'),
            handle: 'ClickHouseが大規模なデータを処理する仕組みは？',
            content: (
              <p>
                ClickHouseは高度な圧縮技術を使用して大量のデータをすばやく処理します。また、クエリをベクトル化して実行することでCPU効率を最大化します。
              </p>
            )
          },
          {
            onOpen: useGalaxyOnClick('homePage.faqSection.'),
            handle: 'ClickHouseがデータを可視化および分析する仕組みは？',
            content: (
              <p>
                ClickHouseはBIやデータ分析ツールなど多くのクライアントやドライバに対するコネクタをサポートしています。ClickHouseインテグレーションの一覧を、こちらのページでご覧ください。
              </p>
            )
          },
          {
            onOpen: useGalaxyOnClick(
              'homePage.faqSection.clickhouseCostExpand'
            ),
            handle: 'ClickHouseの費用は？',
            content: (
              <p>
                セルフマネージドのClickHouseの場合、費用はコンピューターやデータストレージなどのリソース、およびClickHouseの管理に必要な人員の数によって変わります。
                <Link
                  href='https://console.clickhouse.cloud/signUp?loc=homepage-faq-accordion'
                  className='text-primary-300 hover:underline'>
                  ClickHouse Cloud
                </Link>
                であれば月々50ドルと非常に手頃な価格で始められます。
              </p>
            )
          }
        ]}
      />
    </div>
  )
}
