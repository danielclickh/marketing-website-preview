import { useGalaxyOnClick } from '../../../lib/galaxy/galaxy'
import LinkWithArrow from '../../LinkWithArrow'
import { NavigationLink } from '../parts'

export default function NavigationSubNavUseCases() {
  return (
    <>
      <div className='px-4 md-mid:grid-cols-5 md-mid:grid-rows-1 md-mid:gap-x-4 md-mid:py-2'>
        <ul className='col-span-2'>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.lyft)
            }}
            className='col-span-2'>
            <NavigationLink
              href='/use-cases/real-time-analytics'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.realTimeAnalyticsSelect'
              )}
              className='block w-full'>
              Real-time analytics
            </NavigationLink>
          </li>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.langchain)
            }}
            className='col-span-2'>
            <NavigationLink
              href='/use-cases/machine-learning-and-data-science'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.machineLearningSelect'
              )}
              className='block w-full'>
              Machine learning and GenAI
            </NavigationLink>
          </li>

          <li
            onMouseEnter={() => {
              //setQuote(quotes.adgreetz)
            }}
            className='col-span-2'>
            <NavigationLink
              href='/use-cases/data-warehousing'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.dataWarehousingSelect'
              )}
              className='block w-full'>
              Data warehousing
            </NavigationLink>
          </li>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.cloudflare)
            }}
            className='col-span-2'>
            <NavigationLink
              href='/use-cases/observability'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.observabilitySelect'
              )}
              className='block w-full'>
              Observability
            </NavigationLink>
          </li>
          <li
            onMouseEnter={() => {
              //setQuote(quotes.instacart)
            }}
            className='col-span-2 md-mid:hidden'>
            {/* This is the mobile link, the desktop link is futher down */}
            <NavigationLink
              href='/use-cases'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.allUseCasesSelect'
              )}
              className='block w-full'>
              All use cases
            </NavigationLink>
          </li>
        </ul>
      </div>

      {/* This is the desktop link, the mobile link is in the <ul> above */}
      <LinkWithArrow
        prefetch={false}
        href='/use-cases'
        onClick={useGalaxyOnClick('topNav.useCasesMenu.allUseCasesSelect')}
        className='hidden w-full rounded-b-lg border-t border-neutral-700 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:block'>
        All use cases
      </LinkWithArrow>
    </>
  )
}
