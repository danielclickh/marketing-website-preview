import LinkWithArrow from '../../../LinkWithArrow'
import { NavigationLink } from '../parts'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'

export default function NavigationSubNavUseCases() {
  return (
    <>
      <div className='px-4 md-mid:grid-cols-5 md-mid:grid-rows-1 md-mid:gap-x-4 md-mid:py-2'>
        <ul className='col-span-2'>
          <li className='col-span-2'>
            <NavigationLink
              href='/jp/use-cases/real-time-analytics'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.realTimeAnalyticsSelect'
              )}
              className='block w-full'>
              リアルタイム分析
            </NavigationLink>
          </li>
          <li className='col-span-2'>
            <NavigationLink
              href='/jp/use-cases/observability'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.observabilitySelect'
              )}
              className='block w-full'>
              オブザーバビリティ
            </NavigationLink>
          </li>
          <li className='col-span-2'>
            <NavigationLink
              href='/jp/use-cases/machine-learning-and-data-science'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.machineLearningSelect'
              )}
              className='block w-full'>
              機械学習 & 生成AI
            </NavigationLink>
          </li>
          <li className='col-span-2'>
            <NavigationLink
              href='/jp/use-cases/logging-and-metrics'
              onClick={useGalaxyOnClick(
                'topNav.useCasesMenu.loggingAndMetricsSelect'
              )}
              className='block w-full'>
              ログ、イベント、トレース
            </NavigationLink>
          </li>
          <li className='col-span-2 md-mid:hidden'>
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
