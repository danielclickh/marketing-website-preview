import { NavigationItem, NavigationItemProps } from './parts'
import NavigationSubNavProducts from './sub-navs/NavigationSubNavProducts'
import NavigationSubNavResources from './sub-navs/NavigationSubNavResources'
import NavigationSubNavSolutions from './sub-navs/NavigationSubNavSolutions'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import React from 'react'

export interface NavigationProps extends React.HTMLProps<HTMLElement> {
  onItemClick?: NavigationItemProps['onClick']
  onItemClickOutside?: NavigationItemProps['onClickOutside']
  onItemEnter?: NavigationItemProps['onMouseEnter']
  onItemLeave?: NavigationItemProps['onMouseLeave']
}

export default function Navigation({
  onItemClick,
  onItemClickOutside,
  onItemEnter,
  onItemLeave,
  ...props
}: NavigationProps) {
  const topLevelEvents: Pick<
    NavigationItemProps,
    'onClick' | 'onClickOutside' | 'onMouseEnter' | 'onMouseLeave'
  > = {
    onClick(...args) {
      if (onItemClick) onItemClick(...args)
    },
    onClickOutside(...args) {
      if (onItemClickOutside) onItemClickOutside(...args)
    },
    onMouseEnter(...args) {
      if (onItemEnter) onItemEnter(...args)
    },
    onMouseLeave(...args) {
      if (onItemLeave) onItemLeave(...args)
    }
  }

  return (
    <nav {...props}>
      <div className='relative'>
        <ul className='grid grid-cols-1 md-mid:flex md-mid:flex-row'>
          <li>
            <NavigationItem {...topLevelEvents} label='Products'>
              <NavigationSubNavProducts />
            </NavigationItem>
          </li>
          <li>
            <NavigationItem {...topLevelEvents} label='Solutions'>
              <NavigationSubNavSolutions />
            </NavigationItem>
          </li>
          <li>
            <NavigationItem
              {...topLevelEvents}
              label='Docs'
              link={{
                href: 'https://clickhouse.com/docs',
                onClick: useGalaxyOnClick('topNav.navItems.docsSelect'),
                target: '_blank'
              }}
            />
          </li>
          <li>
            <NavigationItem {...topLevelEvents} label='Resources'>
              <NavigationSubNavResources />
            </NavigationItem>
          </li>
          <li>
            <NavigationItem
              {...topLevelEvents}
              label='Pricing'
              link={{
                href: '/pricing',
                onClick: useGalaxyOnClick('topNav.navItems.pricingSelect')
              }}
            />
          </li>
          <li>
            <NavigationItem
              {...topLevelEvents}
              label='Contact us'
              link={{
                href: '/company/contact?loc=nav',
                onClick: useGalaxyOnClick('topNav.navItems.contactUsSelect')
              }}
            />
          </li>
        </ul>
      </div>
    </nav>
  )
}
