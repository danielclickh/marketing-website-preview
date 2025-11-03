import logoFull from '../../../public/logo-full.svg'
import { CUIButton } from '../ClickUI'
import NewsLetterForm from '../NewsLetter/NewsLetterForm'
import GitHub from '../icons/GitHub'
import { FooterData } from './types'
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
    heading: 'Products',
    label: 'ClickHouse Cloud',
    href: '/cloud',
    galaxyEvent: 'footerNav.productMenu.clickHouseCloudSelect'
  },
  {
    label: 'ClickHouse',
    href: '/clickhouse',
    galaxyEvent: 'footerNav.productMenu.clickHouseSelect'
  },
  {
    label: 'Bring Your Own Cloud',
    href: '/cloud/bring-your-own-cloud',
    galaxyEvent: 'footerNav.productMenu.byocSelect'
  },
  {
    label: 'ClickHouse Government',
    href: '/government',
    galaxyEvent: 'footerNav.productMenu.governmentSelect'
  },
  {
    label: 'ClickHouse Keeper',
    href: '/clickhouse/keeper',
    galaxyEvent: 'footerNav.productMenu.keeperSelect'
  },
  {
    label: 'ClickStack',
    href: '/use-cases/observability',
    galaxyEvent: 'footerNav.productMenu.clickstackSelect'
  },
  {
    label: 'ClickPipes',
    href: '/cloud/clickpipes',
    galaxyEvent: 'footerNav.productMenu.clickpipesSelect'
  },
  {
    label: 'Integrations',
    href: '/integrations',
    galaxyEvent: 'footerNav.productMenu.integrationsSelect'
  },
  {
    label: 'chDB',
    href: '/chdb',
    galaxyEvent: 'footerNav.productMenu.chdbSelect'
  },
  {
    label: 'Trust center',
    href: 'https://trust.clickhouse.com',
    galaxyEvent: 'footerNav.productMenu.trustCenterSelect'
  },
  {
    label: 'Pricing',
    href: '/pricing',
    galaxyEvent: 'footerNav.productMenu.pricingSelect'
  },
  {
    heading: 'Resources',
    newColumn: true,
    label: 'Documentation',
    href: 'https://clickhouse.com/docs',
    galaxyEvent: 'footerNav.resourcesMenu.docsSelect'
  },
  {
    label: 'Training',
    href: '/learn/',
    galaxyEvent: 'footerNav.resourcesMenu.trainingSelect'
  },
  {
    label: 'Support',
    href: '/support/program',
    galaxyEvent: 'footerNav.resourcesMenu.supportSelect'
  },
  {
    label: 'Benchmarks',
    href: 'https://benchmark.clickhouse.com',
    target: '_blank',
    galaxyEvent: 'footerNav.resourcesMenu.benchmarkSelect'
  },
  {
    label: 'Use cases',
    href: '/use-cases',
    galaxyEvent: 'footerNav.resourcesMenu.useCasesSelect'
  },
  {
    label: 'Videos',
    href: '/videos',
    galaxyEvent: 'footerNav.resourcesMenu.videosSelect'
  },
  {
    label: 'Demos',
    href: '/demos',
    galaxyEvent: 'footerNav.resourcesMenu.demosSelect'
  },
  {
    label: 'Real-time data warehouse',
    href: '/real-time-data-warehouse',
    galaxyEvent: 'footerNav.productMenu.realtimeDWSelect'
  },
  {
    label: 'Open House videos',
    href: '/videos?category=open-house',
    galaxyEvent: 'footerNav.resourcesMenu.openHouseVideosSelect'
  },
  {
    label: 'Engineering resources',
    href: '/engineering-resources',
    galaxyEvent: 'footerNav.resourcesMenu.engineeringResources'
  },
  {
    heading: 'Company',
    newColumn: true,
    label: 'Blog',
    href: '/blog',
    galaxyEvent: 'footerNav.companyMenu.blogSelect'
  },
  {
    label: 'Our story',
    href: '/company/our-story',
    galaxyEvent: 'footerNav.companyMenu.ourStorySelect'
  },
  {
    label: 'Careers',
    href: '/company/careers',
    galaxyEvent: 'footerNav.companyMenu.careersSelect'
  },
  {
    label: 'Contact us',
    href: '/company/contact?loc=footer',
    galaxyEvent: 'footerNav.companyMenu.contactSelect'
  },
  {
    label: 'Events',
    href: '/company/events',
    galaxyEvent: 'footerNav.companyMenu.eventsSelect'
  },
  {
    label: 'News',
    href: '/company/news',
    galaxyEvent: 'footerNav.companyMenu.newsSelect'
  },
  {
    label: 'Media',
    href: '/media',
    target: '_blank',
    galaxyEvent: 'footerNav.companyMenu.mediaSelect'
  },
  {
    heading: 'Join our community',
    newColumn: true,
    label: 'GitHub',
    href: 'https://github.com/ClickHouse/ClickHouse',
    target: '_blank',
    galaxyEvent: 'footerNav.communityMenu.gitHubSelect'
  },
  {
    label: 'Slack',
    href: '/slack',
    target: '_blank',
    galaxyEvent: 'footerNav.communityMenu.slackSelect'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/clickhouseinc',
    target: '_blank',
    galaxyEvent: 'footerNav.communityMenu.linkedInSelect'
  },
  {
    label: 'X',
    href: 'https://x.com/ClickhouseDB',
    target: '_blank',
    galaxyEvent: 'footerNav.communityMenu.twitterSelect'
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/clickhouse.com',
    target: '_blank',
    galaxyEvent: 'footerNav.communityMenu.blueSkySelect'
  },
  {
    label: 'Telegram',
    href: 'https://telegram.me/clickhouse_en',
    target: '_blank',
    galaxyEvent: 'footerNav.communityMenu.telegramSelect'
  },
  {
    label: 'Meetup',
    href: 'https://www.meetup.com/pro/clickhouse',
    target: '_blank',
    galaxyEvent: 'footerNav.communityMenu.meetupSelect'
  },
  {
    heading: 'Comparisons',
    newColumn: true,
    label: 'BigQuery',
    href: '/comparison/bigquery',
    galaxyEvent: 'footerNav.comparisonsMenu.bigQuerySelect'
  },
  {
    label: 'PostgreSQL',
    href: '/comparison/postgresql',
    galaxyEvent: 'footerNav.comparisonsMenu.postgresSelect'
  },
  {
    label: 'Redshift',
    href: '/comparison/redshift',
    galaxyEvent: 'footerNav.comparisonsMenu.redshiftSelect'
  },
  {
    label: 'Snowflake',
    href: '/comparison/snowflake',
    galaxyEvent: 'footerNav.comparisonsMenu.snowflakeSelect'
  },
  {
    label: 'Elastic',
    href: '/comparison/elastic-for-observability',
    galaxyEvent: 'footerNav.comparisonsMenu.elasticSelect'
  },
  {
    heading: 'Partners',
    label: 'AWS',
    href: '/partners/aws',
    galaxyEvent: 'footerNav.partnersMenu.awsSelect'
  },
  {
    label: 'Azure',
    href: '/partners/azure',
    galaxyEvent: 'footerNav.partnersMenu.azureSelect'
  }
]

export default function Footer({ bottomLinks = [] }: FooterData) {
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
              &copy; {year.getFullYear()} ClickHouse, Inc. HQ in the Bay Area,
              CA and Amsterdam, NL.
            </div>
            <div className='bottom_links flex flex-wrap items-center justify-center gap-4'>
              {bottomLinks.map((bottomLink, index) => (
                <Link
                  key={bottomLink.text}
                  href={bottomLink.href}
                  target={bottomLink.target}
                  className={`first:pl-0 bottom-link-${index} whitespace-nowrap hover:text-neutral-0`}
                  onClick={() => {
                    useGalaxyOnClick(
                      `footerNav.privacyItems.${camel(bottomLink.text)}Select`
                    )
                  }}>
                  {bottomLink.text}
                </Link>
              ))}
              <button
                id='cookie-settings-button'
                className={
                  'cmp-revoke-consent hidden whitespace-nowrap bg-transparent hover:text-neutral-0'
                }>
                Cookie settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
