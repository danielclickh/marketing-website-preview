import { CUICard } from '../ClickUI'
import IntegrationSupportPill from '../IntegrationPill'
import { StrapiImageUrl } from '../StrapiElements'
import { ExternalLink } from '../icons/ExternalLink'
import { SuiTitle } from '../sui'
import { Integration } from '@/types/integrations'
import Link from 'next/link'

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
  const tileLogo = logo_dark || logo

  return (
    <Link
      href={openInNewWindow ? docsLink : `/integrations/${slug}`}
      target={openInNewWindow ? '_blank' : '_self'}>
      <CUICard className='!bg-neutral-700/50'>
        <CUICard.Body className='group relative'>
          {readiness && (
            <div className='absolute -top-2 left-1/2 -translate-x-1/2'>
              <IntegrationSupportPill label={readiness} />
            </div>
          )}
          {openInNewWindow && (
            <ExternalLink className='absolute right-3 top-3 text-primary-300 opacity-0 transition-opacity group-hover:opacity-100 group-hover:delay-75 group-hover:ease-in-out' />
          )}
          <div className='flex aspect-square flex-col items-center justify-center gap-3 rounded-lg text-center'>
            {!!tileLogo && (
              <StrapiImageUrl
                {...tileLogo}
                width={64}
                height={64}
                sizes='medium'
                loading='eager'
                alt={name}
                className='size-16 object-contain object-center'
              />
            )}
            <SuiTitle type='h4' className='w-full px-2'>
              {name}
            </SuiTitle>
          </div>
        </CUICard.Body>
      </CUICard>
    </Link>
  )
}
