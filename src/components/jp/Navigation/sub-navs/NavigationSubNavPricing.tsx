import { NavigationLink } from '../parts'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'

export default function NavigationSubNavPricing() {
  return (
    <ul className='px-4 md-mid:py-2'>
      <li>
        <NavigationLink
          href='/jp/pricing'
          onClick={useGalaxyOnClick('topNav.pricingMenu.cloudPricingSelect')}
          className='block w-full'>
          ClickHouse Cloud pricing
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/jp/pricing?loc=sub-menu#pricing-calculator'
          onClick={useGalaxyOnClick('topNav.pricingMenu.costEstimateSelect')}
          className='block w-full'>
          Cost estimator
        </NavigationLink>
      </li>
    </ul>
  )
}
