import LinkWithArrow from '../../LinkWithArrow'
import { NavigationLink } from '../parts'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'

export default function NavigationSubNavSolutions() {
  return (
    <>
      <div className='grid grid-cols-1 md-mid:grid-cols-2'>
        {/* Use cases */}
        <div className='flex flex-col'>
          <div className='px-4 md-mid:grid-cols-5 md-mid:grid-rows-1 md-mid:gap-x-4 md-mid:py-2'>
            <p className='col-span-full px-2 py-2 text-sm'>
              <strong>Use cases</strong>
            </p>
            <ul className='col-span-2'>
              <li className='col-span-2'>
                <NavigationLink
                  href='/use-cases/real-time-analytics'
                  onClick={useGalaxyOnClick(
                    'topNav.useCasesMenu.realTimeAnalyticsSelect'
                  )}
                  className='block w-full'>
                  Real-time analytics
                </NavigationLink>
              </li>
              <li className='col-span-2'>
                <NavigationLink
                  href='/use-cases/observability'
                  onClick={useGalaxyOnClick(
                    'topNav.useCasesMenu.observabilitySelect'
                  )}
                  className='block w-full'>
                  Observability
                </NavigationLink>
              </li>

              <li className='col-span-2'>
                <NavigationLink
                  href='/use-cases/data-warehousing'
                  onClick={useGalaxyOnClick(
                    'topNav.useCasesMenu.dataWarehousingSelect'
                  )}
                  className='block w-full'>
                  Data warehousing
                </NavigationLink>
              </li>
              <li className='col-span-2'>
                <NavigationLink
                  href='/use-cases/machine-learning-and-data-science'
                  onClick={useGalaxyOnClick(
                    'topNav.useCasesMenu.machineLearningSelect'
                  )}
                  className='block w-full'>
                  Machine learning and GenAI
                </NavigationLink>
              </li>
              <li className='col-span-2 md-mid:hidden'>
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
            className='mt-auto hidden w-full rounded-b-lg border-t border-neutral-700 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:block'>
            All use cases
          </LinkWithArrow>
        </div>

        {/* Industries */}
        <div className='flex flex-col border-t border-neutral-700 md-mid:border-l md-mid:border-t-0'>
          <div className='px-4 md-mid:grid-cols-5 md-mid:grid-rows-1 md-mid:gap-x-4 md-mid:py-2'>
            <p className='col-span-full px-2 py-2 text-sm'>
              <strong>Industries</strong>
            </p>
            <ul className='col-span-2'>
              <li className='col-span-2'>
                <NavigationLink
                  href='/industries/cybersecurity'
                  onClick={useGalaxyOnClick(
                    'topNav.industriesMenu.cybersecuritySelect'
                  )}
                  className='block w-full'>
                  Cybersecurity
                </NavigationLink>
              </li>
              <li className='col-span-2'>
                <NavigationLink
                  href='/industries/gaming'
                  onClick={useGalaxyOnClick(
                    'topNav.industriesMenu.gamingSelect'
                  )}
                  className='block w-full'>
                  Gaming and entertainment
                </NavigationLink>
              </li>

              <li className='col-span-2'>
                <NavigationLink
                  href='/industries/retail'
                  onClick={useGalaxyOnClick(
                    'topNav.industriesMenu.retailSelect'
                  )}
                  className='block w-full'>
                  E-commerce and retail
                </NavigationLink>
              </li>
              <li className='col-span-2'>
                <NavigationLink
                  href='/industries/automotive'
                  onClick={useGalaxyOnClick(
                    'topNav.industriesMenu.automotiveSelect'
                  )}
                  className='block w-full'>
                  Automotive
                </NavigationLink>
              </li>
              <li className='col-span-2'>
                <NavigationLink
                  href='/industries/energy'
                  onClick={useGalaxyOnClick(
                    'topNav.industriesMenu.energySelect'
                  )}
                  className='block w-full'>
                  Energy
                </NavigationLink>
              </li>
              <li className='col-span-2 md-mid:hidden'>
                {/* This is the mobile link, the desktop link is futher down */}
                <NavigationLink
                  href='/industries'
                  onClick={useGalaxyOnClick(
                    'topNav.industriesMenu.allIndustriesSelect'
                  )}
                  className='block w-full'>
                  All industries
                </NavigationLink>
              </li>
            </ul>
          </div>

          {/* This is the desktop link, the mobile link is in the <ul> above */}
          <LinkWithArrow
            prefetch={false}
            href='/industries'
            onClick={useGalaxyOnClick(
              'topNav.industriesMenu.allIndustriesSelect'
            )}
            className='mt-auto hidden w-full rounded-b-lg border-t border-neutral-700 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-700/25 hover:text-primary-300 md-mid:block'>
            All industries
          </LinkWithArrow>
        </div>
      </div>
    </>
  )
}
