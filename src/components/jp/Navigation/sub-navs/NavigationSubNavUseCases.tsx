import LinkWithArrow from '../../../LinkWithArrow'
import { NavigationLink, NavigationQuote, NavigationQuoteProps } from '../parts'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { useState } from 'react'

export default function NavigationSubNavUseCases() {
  type UseCaseQuote = Omit<NavigationQuoteProps, 'link'>

  const quotes: Record<string, UseCaseQuote> = {
    lyft: {
      logo: '/images/nav/logo-lyft.svg',
      quote:
        'We needed something to slice and dice real-time data [...]. Using ClickHouse resulted into a lot of performance benefits for us with huge cost savings for the org.'
    },
    cloudflare: {
      logo: '/images/nav/logo-cloudflare.svg',
      quote:
        'ClickHouse helps us efficiently and reliably analyze logs across trillions of Internet requests to identify malicious traffic and provide customers with rich analytics.'
    },
    adgreetz: {
      logo: '/images/nav/logo-adgreetz.svg',
      quote:
        'With ClickHouse Cloud’s production instance, we are getting sub-second query time along with materialized views, and it costs 6x less. The decision to switch was a no-brainer for us.'
    },
    langchain: {
      logo: '/images/nav/logo-langchain.svg',
      quote:
        'ClickHouse allowed us to scale LangSmith to production workloads and provide a service where users can log all of their data. We couldn’t have accomplished this without ClickHouse.'
    },
    instacart: {
      logo: '/images/nav/logo-instacart.svg',
      quote:
        'ClickHouse is widely used across Instacart to power other use-cases such as critical retailer and ads dashboards, calculating results for A/B testing, and machine learning signals.'
    }
  }

  const [quote, setQuote] = useState<null | UseCaseQuote>(null)
  const handleUserStoriesClick = useGalaxyOnClick(
    'topNav.useCasesMenu.userStoriesQuoteSelect'
  )

  return (
    <>
      <div
        className={`px-4 md-mid:grid-cols-5 md-mid:grid-rows-1 md-mid:gap-x-4 md-mid:py-2 ${
          quote ? 'md-mid:grid' : ''
        }`}>
        <ul className='col-span-2'>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.lyft)
            }}
            className='col-span-2'>
            <NavigationLink
              href='/jp/use-cases/real-time-analytics'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.realTimeAnalyticsSelect'
              )}
              className='block w-full'>
              リアルタイム分析
            </NavigationLink>
          </li>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.cloudflare)
            }}
            className='col-span-2'>
            <NavigationLink
              href='/jp/use-cases/observability'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.observabilitySelect'
              )}
              className='block w-full'>
              観測性
            </NavigationLink>
          </li>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.langchain)
            }}
            className='col-span-2'>
            <NavigationLink
              href='/jp/use-cases/machine-learning-and-data-science'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.machineLearningSelect'
              )}
              className='block w-full'>
              機械学習 & 生成AI
            </NavigationLink>
          </li>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.adgreetz)
            }}
            className='col-span-2'>
            <NavigationLink
              href='/jp/use-cases/business-intelligence'
              onClick={useGalaxyOnClick('topNav.useCasesMenu.bizIntelSelect')}
              className='block w-full'>
              ビジネスインテリジェンス
            </NavigationLink>
          </li>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.instacart)
            }}
            className='col-span-2 md-mid:hidden'>
            {/* This is the mobile link, the desktop link is futher down */}
            <NavigationLink
              href='/jp/use-cases'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.allUseCasesSelect'
              )}
              className='block w-full'>
              すべてのユースケース
            </NavigationLink>
          </li>
        </ul>
        {!!quote && (
          <NavigationQuote
            {...quote}
            className='col-span-3 col-start-3 row-span-full my-4 md-mid:my-0 md-mid:max-w-[400px]'
            link={{
              href: '/user-stories',
              text: 'View more user stories',
              onClick: handleUserStoriesClick
            }}>
            {quote?.children}
          </NavigationQuote>
        )}
      </div>

      {/* This is the desktop link, the mobile link is in the <ul> above */}
      <LinkWithArrow
        prefetch={false}
        href='/jp/use-cases'
        onClick={useGalaxyOnClick('topNav.useCasesMenu.allUseCasesSelect')}
        className='hidden w-full rounded-b-lg border-t border-neutral-700 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:block'>
        すべてのユースケース
      </LinkWithArrow>
    </>
  )
}
