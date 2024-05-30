import Link from 'next/link'
import React from 'react'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { Integration } from '../../types/integrations'
import { CUICard } from '../ClickUI'
import { ExternalLink } from '../icons/ExternalLink'
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
            <ExternalLink className='absolute top-3 right-3 text-primary-300' />
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
