import Link from 'next/link'
import React from 'react'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { Integration } from '../../types/integrations'
import { CUICard } from '../ClickUI'
import IntegrationLogo from '../IntegrationLogo'
import IntegrationSupportPill from '../IntegrationPill'
import { SuiTitle } from '../sui'

export default function IntegrationTile({
  name,
  slug,
  logo,
  logo_dark,
  readiness,
  openInNewWindow = false,
  docsLink
}: Pick<
  Integration,
  | 'name'
  | 'slug'
  | 'logo'
  | 'logo_dark'
  | 'readiness'
  | 'openInNewWindow'
  | 'docsLink'
>) {
  return (
    <Link
      href={openInNewWindow ? docsLink : `/integrations/${slug}`}
      target={openInNewWindow ? '_blank' : '_self'}>
      <CUICard>
        <CUICard.Body className='relative bg-neutral-700/50'>
          {readiness && (
            <div className='absolute -top-2 left-1/2 -translate-x-1/2'>
              <IntegrationSupportPill label={readiness} />
            </div>
          )}
          {openInNewWindow && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              fill='none'
              viewBox='0 0 14 14'
              className='absolute top-3 right-3'>
              <path
                stroke='#FAFF69'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M9.66653 1h3.33337v3.33333M8.33322 5.66667 12.9999 1m-1.3334 7.33331v3.33329c0 .7367-.5966 1.3334-1.3333 1.3334H2.33321c-.73667 0-1.333332-.5967-1.333332-1.3334V3.66665c0-.73667.596662-1.33334 1.333332-1.33334h3.33333'
              />
            </svg>
          )}
          <div className='flex aspect-square flex-col items-center justify-center gap-3 rounded-lg text-center'>
            <div className='aspect-square w-full max-w-[64px]'>
              <IntegrationLogo
                image={logo_dark || logo}
                alt={name}
                className='aspect-square h-auto w-full object-contain'
              />
            </div>
            <SuiTitle type='h4' className='w-full px-2'>
              {name}
            </SuiTitle>
          </div>
        </CUICard.Body>
      </CUICard>
    </Link>
  )
}
