import { useGalaxyOnClick } from '../../../lib/galaxy/galaxy'
import { NavigationLink } from '../parts'

export default function NavigationSubNavPricing() {
  return (
    <ul className='px-4 md-mid:py-2'>
      <li>
        <NavigationLink
          href='/pricing'
          onClick={useGalaxyOnClick('topNav.pricingMenu.cloudPricingSelect')}
          className='block w-full'>
          ClickHouse Cloud pricing
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/pricing?loc=sub-menu#pricing-calculator'
          onClick={useGalaxyOnClick('topNav.pricingMenu.costEstimateSelect')}
          className='block w-full'>
          Cost estimator
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/pricing/contact?loc=menu'
          onClick={useGalaxyOnClick(
            'topNav.pricingMenu.dedicatedServiceSelect'
          )}
          className='block w-full'>
          Dedicated services
        </NavigationLink>
      </li>
    </ul>
  )
}
