import Link from 'next/link'
import React from 'react'
import { Integration } from '../../types/integrations'
import { CUICard } from '../ClickUI'
import { ExternalLink } from '../icons/ExternalLink'
import IntegrationSupportPill from '../IntegrationPill'
import { StrapiImage } from '../StrapiElements'
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
            <ExternalLink className='absolute right-3 top-3 text-primary-300' />
          )}
          <div className='flex aspect-square flex-col items-center justify-center gap-3 rounded-lg text-center'>
            <StrapiImage
              {...(logo_dark || logo)}
              sizes='medium'
              alt={name}
              className='h-[64px] w-[64px] object-contain'
            />
            <SuiTitle type='h4' className='w-full px-2'>
              {name}
            </SuiTitle>
          </div>
        </CUICard.Body>
      </CUICard>
    </Link>
  )
}
