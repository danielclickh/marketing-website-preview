import { NavigationItem, NavigationItemProps } from './parts'
import NavigationSubNavProducts from './sub-navs/NavigationSubNavProducts'
import NavigationSubNavResources from './sub-navs/NavigationSubNavResources'
import NavigationSubNavUseCases from './sub-navs/NavigationSubNavUseCases'
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
            <NavigationItem {...topLevelEvents} label='製品'>
              <NavigationSubNavProducts />
            </NavigationItem>
          </li>
          <li>
            <NavigationItem {...topLevelEvents} label='ユースケース'>
              <NavigationSubNavUseCases />
            </NavigationItem>
          </li>
          <li>
            <NavigationItem
              {...topLevelEvents}
              label='ドキュメント'
              link={{
                href: '/docs',
                prefetch: false,
                target: '_blank',
                onClick: useGalaxyOnClick('topNav.navItems.docsSelect')
              }}
            />
          </li>
          <li>
            <NavigationItem {...topLevelEvents} label='リソース'>
              <NavigationSubNavResources />
            </NavigationItem>
          </li>
          <li>
            <NavigationItem
              {...topLevelEvents}
              label='料金'
              link={{
                href: '/jp/pricing',
                onClick: useGalaxyOnClick('topNav.navItems.pricingSelect')
              }}
            />
          </li>
          <li>
            <NavigationItem
              {...topLevelEvents}
              label='お問合せ'
              link={{
                href: '/jp/company/contact?loc=nav',
                onClick: useGalaxyOnClick('topNav.navItems.contactUsSelect')
              }}
            />
          </li>
        </ul>
      </div>
    </nav>
  )
}
