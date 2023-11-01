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
      className='flex max-w-md items-start !text-neutral-300 hover:!text-neutral-0 hover:no-underline '>
      <div className={styles.menuItem} data-icon={icon ? 'true' : 'false'}>
        {icon && (
          <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md sm:h-12 sm:w-12'>
            <Image
              src={icon}
              width={42}
              height={42}
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
