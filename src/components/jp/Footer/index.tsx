import logoFull from '@/../public/logo-full.svg'
import { CUIButton } from '@/components/ClickUI'
import NewsLetterForm from '@/components/NewsLetter/NewsLetterForm'
import GitHub from '@/components/icons/GitHub'
import { FullyQualifiedEvent } from '@/lib/galaxy/client'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { camel } from '@/lib/utils/strings'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'

type NavItem = {
  heading?: string
  newColumn?: boolean
  label: string
  href: string
  target?: '_self' | '_blank'
  galaxyEvent?: FullyQualifiedEvent
}

const NAV_ITEMS: Array<NavItem> = [
  {
    heading: '製品',
    label: 'ClickHouse Cloud',
    href: '/jp/cloud',
    galaxyEvent: 'jpFooterNav.productMenu.clickHouseCloudSelect'
  },
  {
    label: 'ClickHouse',
    href: '/jp/clickhouse',
    galaxyEvent: 'jpFooterNav.productMenu.clickHouseSelect'
  },
  {
    label: 'ClickPipes',
    href: '/jp/cloud/clickpipes',
    galaxyEvent: 'jpFooterNav.productMenu.clickpipesSelect'
  },
  {
    label: '統合',
    href: '/jp/integrations',
    galaxyEvent: 'jpFooterNav.productMenu.integrationsSelect'
  },
  {
    label: 'トラストセンター',
    href: 'https://trust.clickhouse.com',
    galaxyEvent: 'jpFooterNav.productMenu.trustCenterSelect'
  },
  {
    label: '料金',
    href: '/jp/pricing',
    galaxyEvent: 'jpFooterNav.productMenu.pricingSelect'
  },
  {
    heading: 'リソース',
    newColumn: true,
    label: 'ドキュメント',
    href: 'https://clickhouse.com/docs/jp',
    galaxyEvent: 'jpFooterNav.resourcesMenu.docsSelect'
  },
  {
    label: 'ベンチマーク',
    href: 'https://benchmark.clickhouse.com',
    target: '_blank',
    galaxyEvent: 'jpFooterNav.resourcesMenu.benchmarkSelect'
  },
  {
    label: 'ユースケース',
    href: '/jp/use-cases',
    galaxyEvent: 'jpFooterNav.resourcesMenu.useCasesSelect'
  },
  {
    label: 'ビデオ',
    href: '/jp/videos',
    galaxyEvent: 'jpFooterNav.resourcesMenu.videosSelect'
  },
  {
    label: 'デモ',
    href: '/jp/demos',
    galaxyEvent: 'jpFooterNav.resourcesMenu.demosSelect'
  },
  {
    label: 'サイトマップ',
    href: '/sitemap',
    galaxyEvent: 'jpFooterNav.resourcesMenu.sitemapSelect'
  },
  {
    heading: '企業情報',
    newColumn: true,
    label: 'ブログ',
    href: '/jp/blog',
    galaxyEvent: 'jpFooterNav.companyMenu.blogSelect'
  },
  {
    label: 'ClickHouseについて',
    href: '/jp/company/our-story',
    galaxyEvent: 'jpFooterNav.companyMenu.ourStorySelect'
  },
  {
    label: 'お問合せ',
    href: '/jp/company/contact?loc=footer',
    galaxyEvent: 'jpFooterNav.companyMenu.contactSelect'
  },
  {
    heading: 'コミュニティに参加',
    newColumn: true,
    label: 'GitHub',
    href: 'https://github.com/ClickHouse/ClickHouse',
    target: '_blank',
    galaxyEvent: 'jpFooterNav.communityMenu.gitHubSelect'
  },
  {
    label: 'Slack',
    href: '/slack',
    target: '_blank',
    galaxyEvent: 'jpFooterNav.communityMenu.slackSelect'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/clickhouse-jp/',
    target: '_blank',
    galaxyEvent: 'jpFooterNav.communityMenu.linkedInSelect'
  },
  {
    label: 'X',
    href: 'https://x.com/ClickHouseJP',
    target: '_blank',
    galaxyEvent: 'jpFooterNav.communityMenu.twitterSelect'
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ClickHouseJP',
    target: '_blank',
    galaxyEvent: 'jpFooterNav.communityMenu.facebookSelect'
  },
  {
    label: 'Meetup',
    href: 'https://www.meetup.com/pro/clickhouse',
    target: '_blank',
    galaxyEvent: 'jpFooterNav.communityMenu.meetupSelect'
  },
  {
    heading: '比較情報',
    newColumn: true,
    label: 'BigQuery',
    href: '/jp/comparison/bigquery',
    galaxyEvent: 'jpFooterNav.comparisonsMenu.bigQuerySelect'
  },
  {
    label: 'Redshift',
    href: '/jp/comparison/redshift',
    galaxyEvent: 'jpFooterNav.comparisonsMenu.redshiftSelect'
  },
  {
    label: 'Snowflake',
    href: '/jp/comparison/snowflake',
    galaxyEvent: 'jpFooterNav.comparisonsMenu.snowflakeSelect'
  }
]

const LEGAL_ITEMS: Array<{
  label: string
  href: string
  target?: '_self' | '_blank'
  galaxyEvent?: FullyQualifiedEvent
}> = [
  {
    label: 'Trademark',
    href: '/legal/trademark-policy'
  },
  {
    label: 'Privacy',
    href: '/legal/privacy-policy'
  },
  {
    label: 'Security',
    href: 'https://trust.clickhouse.com/',
    target: '_blank'
  },
  {
    label: 'Legal',
    href: '/legal'
  },
  {
    label: 'Cookie policy',
    href: '/legal/cookie-policy'
  }
]

export default function Footer() {
  const year = new Date()

  // Split nav items into columns
  const footerColumns = (() => {
    const columns: Array<Array<NavItem>> = []
    let currentCol: Array<NavItem> = []
    const pushCurrentCol = () => {
      if (currentCol.length) {
        columns.push(currentCol)
        currentCol = []
      }
    }
    NAV_ITEMS.forEach((item) => {
      if (item?.newColumn) {
        pushCurrentCol()
      }
      currentCol.push(item)
    })
    pushCurrentCol()
    return columns
  })()

  return (
    <footer className='bg-neutral-900 pb-8 pt-16'>
      <div className='section-container space-y-11'>
        {/* Main */}
        <div className='md:flex md:justify-between md:gap-8 lg:gap-10'>
          {/* Nav */}
          <nav className='w-full'>
            <ul className='-mx-3 flex flex-row flex-wrap gap-y-8 lg:flex-nowrap'>
              {footerColumns.map((columnItems, columnIndex) => {
                return (
                  <li
                    key={columnIndex}
                    className='flex w-1/2 flex-col px-3 lg:w-4/12'>
                    <ul>
                      {columnItems.map((columnItem, itemIndex) => {
                        return (
                          <Fragment key={itemIndex}>
                            {columnItem.heading && (
                              <li
                                className={`mb-4 font-inter text-sm font-bold text-neutral-100 ${itemIndex > 0 ? 'mt-8' : ''}`}>
                                {columnItem.heading}
                              </li>
                            )}
                            <li>
                              <Link
                                href={columnItem.href}
                                target={columnItem.target}
                                className='text-sm text-neutral-400 hover:text-neutral-0'
                                onClick={useGalaxyOnClick(
                                  columnItem.galaxyEvent ||
                                    `footer.nav.${camel(columnItem.label)}`
                                )}>
                                {columnItem.label}
                              </Link>
                            </li>
                          </Fragment>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Social */}
          <div className='mt-12 md:mt-0 md:w-fit'>
            <Image
              src={logoFull}
              width='135'
              height='40'
              alt='ClickHouse logo'
              className='mb-4 mr-3'
            />
            <div className='mb-4 text-sm text-neutral-400'>
              Stay informed on feature releases, product roadmap, support, and
              cloud offerings!
            </div>
            <NewsLetterForm />
            <CUIButton
              type='secondary'
              weight='semibold'
              href='https://github.com/ClickHouse/ClickHouse'
              target='_blank'
              iconLeft={<GitHub />}
              linkClass='flex justify-end w-full'
              className='mt-6 w-full bg-neutral-0 text-neutral-900 md:w-fit'>
              Star us on Github
            </CUIButton>
          </div>
        </div>

        {/* Legal */}
        <div className='flex flex-col items-start border-t border-neutral-400/10 pt-2 lg:pt-8'>
          <div className='section-container flex w-full flex-col items-center gap-3 pt-4 text-center text-sm text-neutral-400 sm:gap-1 md:flex-row md:justify-between md:pt-0 md:text-left'>
            <div>
              &copy; {year.getFullYear()} ClickHouse, Inc.
              本社はカリフォルニア州ベイエリアとオランダ領アムステルダムにあります。
            </div>
            <div className='bottom_links flex flex-wrap items-center justify-center gap-4'>
              {LEGAL_ITEMS.map((legalItem, legalIndex) => (
                <Link
                  key={legalIndex}
                  href={legalItem.href}
                  target={legalItem.target}
                  className='whitespace-nowrap first:pl-0 hover:text-neutral-0'
                  onClick={() => {
                    useGalaxyOnClick(
                      legalItem.galaxyEvent ||
                        `footer.legal.${camel(legalItem.label)}`
                    )
                  }}>
                  {legalItem.label}
                </Link>
              ))}
              <button
                id='cookie-settings-button'
                className={
                  'cmp-revoke-consent relative bottom-auto left-auto hidden whitespace-nowrap bg-transparent p-0 hover:text-neutral-0'
                }>
                <Image
                  src='/images/opt-out-logo.svg'
                  width={30}
                  height={14}
                  className='mr-2 inline w-8 align-middle'
                  alt='Opt-out logo'
                />
                Your privacy choices
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
