import Image from 'next/image'
import React from 'react'
import { CUILink } from '../ClickUI'
import { SuiText } from '../sui'
import styles from './styles.module.scss'
import { HeaderLinkItem } from './types'

function Option({ name, href, icon, target, description }: HeaderLinkItem) {
  return (
    <CUILink
      key={name}
      href={href}
      target={target}
      segmentEvent={{
        label: name,
        category: 'website-nav'
      }}
      className='flex items-start hover:no-underline max-w-md !text-neutral-300 hover:!text-neutral-0'>
      <div className={styles.menuItem} data-icon={icon ? 'true' : 'false'}>
        {icon && (
          <div className='flex-shrink-0 flex justify-center h-10 w-10 rounded-md items-center sm:h-12 sm:w-12'>
            <Image
              src={icon}
              className='h-8 w-8'
              width={32}
              height={32}
              aria-hidden='true'
              alt={''}
            />
          </div>
        )}
        <div className='flex flex-col'>
          <SuiText
            size={icon ? 'base' : 'sm'}
            color='primary'
            weight={icon ? 'medium' : 'normal'}
            className='text-inherit'>
            {name}
          </SuiText>
          {description && (
            <SuiText
              size='sm'
              color='secondary'
              weight='normal'
              className='mt-1'>
              {description}
            </SuiText>
          )}
        </div>
      </div>
    </CUILink>
  )
}

export default Option
