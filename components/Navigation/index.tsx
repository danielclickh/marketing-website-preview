import Image from 'next/image'
import React, { useState } from 'react'
import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import ClickHouseCloud from '../icons/ClickHouseCloud'
import LinkWithArrow from '../LinkWithArrow'
import {
  NavigationItem,
  NavigationItemProps,
  NavigationLink,
  NavigationQuote
} from './parts'
import NavigationChevron from './parts/NavigationChevron'
import NavigationSubNav from './parts/NavigationSubNav'

export interface NavigationProps extends React.HTMLProps<HTMLElement> {
  onItemClick?: NavigationItemProps['onClick']
  onItemClickOutside?: NavigationItemProps['onClickOutside']
}

export default function Navigation({
  onItemClick,
  onItemClickOutside,
  ...props
}: NavigationProps) {
  const topLevelEvents: Pick<
    NavigationItemProps,
    'onClick' | 'onClickOutside'
  > = {
    onClick(...args) {
      if (onItemClick) onItemClick(...args)
    },
    onClickOutside(...args) {
      if (onItemClickOutside) onItemClickOutside(...args)
    }
  }

  const [activeSubNav, setActiveSubNav] = useState<null | string>(null)

  const isSubNavActive = (name: string) => activeSubNav === name

  return (
    <nav {...props}>
      <div className='relative'>
        <ul className='grid grid-cols-1 md-mid:flex md-mid:flex-row'>
          <li>
            <NavigationItem {...topLevelEvents} label='Products'>
              <ul className='px-4 md-mid:grid md-mid:grid-cols-5 md-mid:grid-rows-3 md-mid:py-4'>
                <li className='col-span-3 row-span-full flex items-center'>
                  <NavigationLink
                    href='/cloud'
                    onClick={() =>
                      galaxyOnClick('topNav.productMenu.cloudSelect')
                    }
                    className='!flex w-full items-center gap-4'>
                    <ClickHouseCloud className='flex-grow-1 h-auto w-5 flex-shrink-0 stroke-[4] text-primary-300 md-mid:w-auto md-mid:stroke-[1.75]' />
                    <span>
                      ClickHouse Cloud
                      <div className='text-xs text-slate-300'>
                        The best way to use ClickHouse.
                        <br />
                        Available on AWS, GCP, and Azure.
                      </div>
                    </span>
                  </NavigationLink>
                </li>
                <li className='col-span-2'>
                  <NavigationLink
                    href='/clickhouse'
                    onClick={() =>
                      galaxyOnClick('topNav.productMenu.openSourceSelect')
                    }
                    className='!flex w-full items-center gap-3'>
                    <Image
                      src='/images/nav/icon-clickhouse.svg'
                      alt='ClickHouse'
                      width={24}
                      height={24}
                      className='flex-grow-1 flex-shrink-0'
                    />
                    <span>ClickHouse</span>
                  </NavigationLink>
                </li>
                <li className='col-span-2'>
                  <NavigationLink
                    href='https://clickhouse.com/docs/en/operations/utilities/clickhouse-local'
                    onClick={() =>
                      galaxyOnClick('topNav.productMenu.localSelect')
                    }
                    className='!flex w-full items-center gap-3'>
                    <Image
                      src='/images/nav/icon-clickhouse-local.svg'
                      alt='ClickHouse Local'
                      width={24}
                      height={24}
                      className='flex-grow-1 flex-shrink-0'
                    />
                    <span>ClickHouse Local</span>
                  </NavigationLink>
                </li>
                <li className='col-span-2'>
                  <NavigationLink
                    href='https://github.com/chdb-io/chdb'
                    onClick={() =>
                      galaxyOnClick('topNav.productMenu.chdbSelect')
                    }
                    className='!flex w-full items-center gap-3'>
                    <Image
                      src='/images/nav/icon-chdb.svg'
                      alt='chDB'
                      width={24}
                      height={24}
                      className='flex-grow-1 flex-shrink-0'
                    />
                    <span>chDB</span>
                  </NavigationLink>
                </li>
                <li className='md-mid:hidden'>
                  <NavigationLink
                    href='https://clickhouse.com/docs/en/integrations'
                    className='!flex w-full items-center gap-3'
                    onClick={() =>
                      galaxyOnClick('topNav.productMenu.integrationsSelect')
                    }>
                    <Image
                      src='/images/nav/icon-integrations.svg'
                      alt='chDB'
                      width={24}
                      height={24}
                      className='flex-grow-1 flex-shrink-0'
                    />
                    <span>View integrations</span>
                  </NavigationLink>
                </li>
              </ul>
              <LinkWithArrow
                href='https://clickhouse.com/docs/en/integrations'
                onClick={() =>
                  galaxyOnClick('topNav.productMenu.integrationsSelect')
                }
                className='hidden w-full rounded-b-lg bg-primary-300 px-4 py-2 text-center text-sm font-medium text-primary-900 md-mid:block'>
                View our integrations
              </LinkWithArrow>
            </NavigationItem>
          </li>
          <li>
            <NavigationItem
              {...topLevelEvents}
              label='Docs'
              link={{
                href: 'https://clickhouse.com/docs',
                onClick() {
                  galaxyOnClick('topNav.navItems.docsSelect')
                }
              }}
            />
          </li>
          <li>
            <NavigationItem {...topLevelEvents} label='Resources'>
              <ul className='relative px-4 md-mid:py-4'>
                <li>
                  <NavigationLink
                    href='/blog'
                    onClick={() =>
                      galaxyOnClick('topNav.resourcesMenu.blogSelect')
                    }
                    className='block w-full'>
                    Blog
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    href='/blog?category=customer-stories'
                    onClick={() =>
                      galaxyOnClick(
                        'topNav.resourcesMenu.blogCustomerStoriesSelect'
                      )
                    }
                    className='block w-full'>
                    User stories
                  </NavigationLink>
                </li>
                <li
                  onMouseEnter={() => {
                    setActiveSubNav('news-and-events')
                  }}
                  onMouseLeave={() => {
                    setActiveSubNav(null)
                  }}>
                  <NavigationLink
                    onClick={() => {
                      setActiveSubNav(
                        isSubNavActive('news-and-events')
                          ? null
                          : 'news-and-events'
                      )
                    }}
                    className={`w-full items-center justify-between ${
                      isSubNavActive('news-and-events')
                        ? 'text-primary-300'
                        : ''
                    }`}>
                    <span>News and events</span>
                    <NavigationChevron
                      className={
                        isSubNavActive('news-and-events')
                          ? 'rotate-90 text-primary-300 md-mid:rotate-0'
                          : 'text-neutral-500'
                      }
                    />
                  </NavigationLink>
                  <NavigationSubNav isOpen={isSubNavActive('news-and-events')}>
                    <li>
                      <NavigationLink
                        href='/company/news-events?category=Event'
                        onClick={() =>
                          galaxyOnClick('topNav.resourcesMenu.blogEventsSelect')
                        }
                        className='block w-full'>
                        Events
                      </NavigationLink>
                    </li>
                    <li>
                      <NavigationLink
                        href='https://clickhouse.com/docs/category/changelog'
                        onClick={() =>
                          galaxyOnClick('topNav.resourcesMenu.releasesSelect')
                        }
                        className='block w-full'>
                        Releases
                      </NavigationLink>
                    </li>
                  </NavigationSubNav>
                </li>
                <li
                  onMouseEnter={() => {
                    setActiveSubNav('learning')
                  }}
                  onMouseLeave={() => {
                    setActiveSubNav(null)
                  }}>
                  <NavigationLink
                    onClick={() => {
                      setActiveSubNav(
                        isSubNavActive('learning') ? null : 'learning'
                      )
                    }}
                    className={`w-full items-center justify-between ${
                      isSubNavActive('learning') ? 'text-primary-300' : ''
                    }`}>
                    <span>Learning</span>
                    <NavigationChevron
                      className={
                        isSubNavActive('learning')
                          ? 'rotate-90 text-primary-300 md-mid:rotate-0'
                          : 'text-neutral-500'
                      }
                    />
                  </NavigationLink>
                  <NavigationSubNav isOpen={isSubNavActive('learning')}>
                    <li>
                      <NavigationLink
                        href='/learn'
                        onClick={() =>
                          galaxyOnClick('topNav.learnMenu.academySelect')
                        }
                        className='block w-full'>
                        ClickHouse Academy
                      </NavigationLink>
                    </li>
                    <li>
                      <NavigationLink
                        href='/company/news-events?category=Free+Training#upcoming-events'
                        onClick={() =>
                          galaxyOnClick('topNav.learnMenu.freeTrainingSelect')
                        }
                        className='block w-full'>
                        Free live training
                      </NavigationLink>
                    </li>
                    <li>
                      <NavigationLink
                        href='https://clickhouse.com/docs/knowledgebase'
                        onClick={() =>
                          galaxyOnClick('topNav.learnMenu.knowledgebaseSelect')
                        }
                        className='block w-full'>
                        Knowledge base
                      </NavigationLink>
                    </li>
                    <li>
                      <NavigationLink
                        href='/videos?category=how-to'
                        onClick={() =>
                          galaxyOnClick('topNav.learnMenu.howtoVideosSelect')
                        }
                        className='block w-full'>
                        How to videos
                      </NavigationLink>
                    </li>
                    <li>
                      <NavigationLink
                        href='/learn/certification'
                        onClick={() =>
                          galaxyOnClick('topNav.learnMenu.certificationSelect')
                        }
                        className='block w-full'>
                        ClickHouse Certification
                      </NavigationLink>
                    </li>
                  </NavigationSubNav>
                </li>
                <li>
                  <NavigationLink
                    href='/support/program'
                    className='block w-full'>
                    Support
                  </NavigationLink>
                </li>
              </ul>
            </NavigationItem>
          </li>
          <li>
            <NavigationItem {...topLevelEvents} label='Use cases'>
              <ul className='px-4 md-mid:grid md-mid:grid-cols-5 md-mid:grid-rows-5 md-mid:gap-x-4 md-mid:py-4'>
                <li className='col-span-2'>
                  <NavigationLink
                    href='/use-cases/real-time-analytics'
                    onClick={() =>
                      galaxyOnClick(
                        'topNav.useCasesMenu.realTimeAnalyticsSelect'
                      )
                    }
                    className='block w-full'>
                    Real-time analytics
                  </NavigationLink>
                </li>
                <li className='col-span-2'>
                  <NavigationLink
                    href='/use-cases/logging-and-metrics'
                    onClick={() =>
                      galaxyOnClick(
                        'topNav.useCasesMenu.loggingAndMetricsSelect'
                      )
                    }
                    className='block w-full'>
                    Logs, events and traces
                  </NavigationLink>
                </li>
                <li className='col-span-2'>
                  <NavigationLink
                    href='/use-cases/business-intelligence'
                    onClick={() =>
                      galaxyOnClick(
                        'topNav.useCasesMenu.businessIntelligenceSelect'
                      )
                    }
                    className='block w-full'>
                    Business intelligence
                  </NavigationLink>
                </li>
                <li className='col-span-2'>
                  <NavigationLink
                    href='/use-cases/machine-learning-and-data-science'
                    onClick={() =>
                      galaxyOnClick('topNav.useCasesMenu.machineLearningSelect')
                    }
                    className='block w-full'>
                    Machine learning and GenAI
                  </NavigationLink>
                </li>
                <li className='col-span-2'>
                  <NavigationLink
                    href='/use-cases'
                    onClick={() =>
                      galaxyOnClick('topNav.useCasesMenu.allUseCasesSelect')
                    }
                    className='block w-full'>
                    All use cases
                  </NavigationLink>
                </li>
                <li className='col-span-3 col-start-3 row-span-full my-4 md-mid:my-0'>
                  <NavigationQuote
                    className='md-mid:max-w-[336px]'
                    author='Harlow Ward'
                    jobTitle='CTO, Clearbit'
                    link={{
                      href: '/blog?category=customer-stories',
                      text: 'View more user stories',
                      onClick() {
                        galaxyOnClick('topNav.useCasesMenu.clearbitQuoteSelect')
                      }
                    }}>
                    There's that feeling of new tech where everything just feels
                    like it's going right. Can we get the data in there quick
                    enough? Yes. Can we query the data in a way that is going to
                    have a responsive UI? Yes.
                  </NavigationQuote>
                </li>
              </ul>
            </NavigationItem>
          </li>
          <li>
            <NavigationItem {...topLevelEvents} label='Pricing'>
              <ul className='px-4 md-mid:py-4'>
                <li>
                  <NavigationLink
                    href='/pricing'
                    onClick={() =>
                      galaxyOnClick('topNav.pricingMenu.cloudPricingSelect')
                    }
                    className='block w-full'>
                    ClickHouse Cloud pricing
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    href='/pricing?loc=sub-menu#pricing-calculator'
                    onClick={() =>
                      galaxyOnClick('topNav.pricingMenu.costEstimateSelect')
                    }
                    className='block w-full'>
                    Cost estimator
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink
                    href='/pricing/contact?loc=menu'
                    onClick={() =>
                      galaxyOnClick('topNav.pricingMenu.dedicatedServiceSelect')
                    }
                    className='block w-full'>
                    Dedicated services
                  </NavigationLink>
                </li>
              </ul>
            </NavigationItem>
          </li>
          <li>
            <NavigationItem
              {...topLevelEvents}
              label='Contact us'
              link={{
                href: '/company/contact?loc=nav',
                onClick() {
                  galaxyOnClick('topNav.navItems.contactUsSelect')
                }
              }}
            />
          </li>
        </ul>
      </div>
    </nav>
  )
}
