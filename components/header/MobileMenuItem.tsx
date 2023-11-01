import React from 'react'
import { SuiLink, SuiText } from '../sui'
import { HeaderLinkItem, HeaderTopNavItem, MenuItem } from './types'
import styles from './styles.module.scss'
import Image from 'next/image'

type Props = MenuItem & {
  close: any
}

function MobileMenuItem({
  href,
  name,
  target = '_self',
  menuItems,
  close
}: Props) {
  if (href) {
    return (
      <SuiLink
        key={name}
        href={href}
        target={target}
        className='menu-item font-medium hover:no-underline'>
        {name}
      </SuiLink>
    )
  }

  if (menuItems) {
    return (
      <div className='border-y border-neutral-700 bg-neutral-750/90 px-4 pb-4 backdrop-blur-[10px] sm:px-8'>
        {menuItems.map((subitem: HeaderLinkItem | HeaderTopNavItem) => {
          if (subitem.menuItems && subitem.menuItems.length > 0) {
            return (
              <div className='flex flex-col pt-4'>
                {subitem.name && (
                  <div className='mb-4 text-sm font-medium'>{subitem.name}</div>
                )}
                {subitem.menuItems.map((item: HeaderLinkItem) => (
                  <SuiLink
                    key={item.name}
                    href={item.href}
                    onClick={close}
                    className='mb-4 flex max-w-md items-start hover:no-underline'>
                    <div
                      className={styles.menuItem}
                      data-icon={item.icon ? 'true' : 'false'}>
                      {item.icon && (
                        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md sm:h-12 sm:w-12 md:mr-4'>
                          <Image
                            alt={`Image ${item.name}`}
                            src={item.icon}
                            className='h-8 w-8'
                            width={32}
                            height={32}
                            aria-hidden='true'
                          />
                        </div>
                      )}
                      <div className='flex flex-col'>
                        <SuiText
                          color='primary'
                          weight={item.icon ? 'normal' : 'medium'}>
                          {item.name}
                        </SuiText>
                        {item.description && (
                          <SuiText
                            size='sm'
                            color='secondary'
                            weight='normal'
                            className='mt-1'>
                            {item.description}
                          </SuiText>
                        )}
                      </div>
                    </div>
                  </SuiLink>
                ))}
              </div>
            )
          } else if (subitem?.href) {
            return (
              <SuiLink
                key={subitem.name}
                href={subitem.href}
                className='flex max-w-md items-start hover:no-underline'>
                {subitem.name}
              </SuiLink>
            )
          }
          return null
        })}
      </div>
    )
  }

  return null
}

export default MobileMenuItem
