import React, { useState } from 'react'
import { galaxyOnClick } from '../../../lib/galaxy/galaxy'
import { NavigationLink, NavigationQuote, NavigationQuoteProps } from '../parts'

export default function NavigationSubNavUseCases() {
  type UseCaseQuote = Omit<NavigationQuoteProps, 'link'>

  const defaultQuote: UseCaseQuote = {
    author: 'Harlow Ward',
    jobTitle: 'CTO, Clearbit',
    children: (
      <>
        There's that feeling of new tech where everything just feels like it's
        going right. Can we get the data in there quick enough? Yes. Can we
        query the data in a way that is going to have a responsive UI? Yes.
      </>
    )
  }

  const [quote, setQuote] = useState<null | NavigationQuoteProps>(null)

  return (
    <div className='px-4 md-mid:grid md-mid:grid-cols-5 md-mid:grid-rows-1 md-mid:gap-x-4 md-mid:py-4'>
      <ul className='col-span-2'>
        <li
          onMouseEnter={() => {
            setQuote(defaultQuote)
          }}
          className='col-span-2'>
          <NavigationLink
            href='/use-cases/real-time-analytics'
            onClick={() =>
              galaxyOnClick('topNav.useCasesMenu.realTimeAnalyticsSelect')
            }
            className='block w-full'>
            Real-time analytics
          </NavigationLink>
        </li>
        <li
          onMouseEnter={() => {
            setQuote({
              author: 'Author Name',
              jobTitle: 'Job Title, Cloudflare',
              children: (
                <>
                  ClickHouse helps us efficiently and reliably analyze logs
                  across trillions of Internet requests to identify malicious
                  traffic and provide customers with rich analytics.
                </>
              )
            })
          }}
          className='col-span-2'>
          <NavigationLink
            href='/use-cases/logging-and-metrics'
            onClick={() =>
              galaxyOnClick('topNav.useCasesMenu.loggingAndMetricsSelect')
            }
            className='block w-full'>
            Logs, events and traces
          </NavigationLink>
        </li>
        <li
          onMouseEnter={() => {
            setQuote({
              author: 'Author Name',
              jobTitle: 'Job Title, AdGreetz',
              children: (
                <>
                  With ClickHouse Cloud’s production instance, we are getting
                  sub-second query time along with materialized views. The
                  decision to switch was a no-brainer for us.
                </>
              )
            })
          }}
          className='col-span-2'>
          <NavigationLink
            href='/use-cases/business-intelligence'
            onClick={() =>
              galaxyOnClick('topNav.useCasesMenu.businessIntelligenceSelect')
            }
            className='block w-full'>
            Business intelligence
          </NavigationLink>
        </li>
        <li
          onMouseEnter={() => {
            setQuote({
              author: 'Author Name',
              jobTitle: 'Job Title, LangChain',
              children: (
                <>
                  We’ve had a positive experience with ClickHouse. It allowed us
                  to scale LangSmith to production workloads and provide a
                  service where users can log all of their data. We couldn’t
                  have accomplished this without ClickHouse.
                </>
              )
            })
          }}
          className='col-span-2'>
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
      </ul>
      <NavigationQuote
        {...(quote || defaultQuote)}
        className='col-span-3 col-start-3 row-span-full my-4 md-mid:my-0 md-mid:max-w-[336px]'
        link={{
          href: '/blog?category=customer-stories',
          text: 'View more user stories',
          onClick() {
            galaxyOnClick('topNav.useCasesMenu.userStoriesQuoteSelect')
          }
        }}>
        {(quote || defaultQuote).children}
      </NavigationQuote>
    </div>
  )
}
