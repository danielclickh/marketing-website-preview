import React from 'react'
import { galaxyOnClick } from '../../../lib/galaxy/galaxy'
import { NavigationLink } from '../parts'

export default function NavigationSubNavPricing() {
  return (
    <ul className='px-4 md-mid:py-4'>
      <li>
        <NavigationLink
          href='/pricing'
          onClick={() => galaxyOnClick('topNav.pricingMenu.cloudPricingSelect')}
          className='block w-full'>
          ClickHouse Cloud pricing
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/pricing?loc=sub-menu#pricing-calculator'
          onClick={() => galaxyOnClick('topNav.pricingMenu.costEstimateSelect')}
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
  )
}
