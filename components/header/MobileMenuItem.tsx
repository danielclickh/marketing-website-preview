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
        segmentEvent={{
          label: name ?? '',
          category: 'website-nav'
        }}
        className='menu-item hover:no-underline font-medium'>
        {name}
      </SuiLink>
    )
  }

  if (menuItems) {
    return (
      <div className='bg-neutral-750/90 px-4 sm:px-8 pb-4 border-y border-neutral-700 backdrop-blur-[10px]'>
        {menuItems.map((subitem: HeaderLinkItem | HeaderTopNavItem) => {
          if (subitem.menuItems && subitem.menuItems.length > 0) {
            return (
              <div className='flex flex-col pt-4'>
                {subitem.name && (
                  <div className='mb-4 font-medium text-sm'>{subitem.name}</div>
                )}
                {subitem.menuItems.map((item: HeaderLinkItem) => (
                  <SuiLink
                    key={item.name}
                    href={item.href}
                    onClick={close}
                    segmentEvent={{
                      label: item.name,
                      category: 'website-nav'
                    }}
                    className='flex items-start hover:no-underline max-w-md mb-4'>
                    <div
                      className={styles.menuItem}
                      data-icon={item.icon ? 'true' : 'false'}>
                      {item.icon && (
                        <div className='flex-shrink-0 flex justify-center h-10 w-10 rounded-md items-center sm:h-12 sm:w-12 md:mr-4'>
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
                segmentEvent={{
                  label: subitem.name,
                  category: 'website-nav'
                }}
                className='flex items-start hover:no-underline max-w-md'>
                <div
                  className={styles.menuItem}
                  data-icon={subitem.icon ? 'true' : 'false'}>
                  {subitem.icon && (
                    <div className='flex-shrink-0 flex justify-center h-10 w-10 rounded-md items-center sm:h-12 sm:w-12 md:mr-4'>
                      <Image
                        alt={`Image ${subitem.name}`}
                        src={subitem.icon}
                        className='h-8 w-8'
                        width={32}
                        height={32}
                        aria-hidden='true'
                      />
                    </div>
                  )}
                  <div className='flex flex-col'>
                    <SuiText
                      size='sm'
                      color='primary'
                      weight={subitem.icon ? 'normal' : 'medium'}>
                      {subitem.name}
                    </SuiText>
                    {subitem.description && (
                      <SuiText
                        size='sm'
                        color='secondary'
                        weight='normal'
                        className='mt-1'>
                        {subitem.description}
                      </SuiText>
                    )}
                  </div>
                </div>
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
