import { StrapiImageType } from '../../lib/api/strapi/types'
import { CUICard } from '../ClickUI'
import { StrapiImageUrl } from '../StrapiElements'
import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import { CirclePlay } from 'lucide-react'
import Link from 'next/link'

export interface CustomerStoryCardProps {
  title: string
  description?: string | null
  categories?: Array<string>
  verticals?: Array<string>
  migrations?: Array<string>
  cloudProviders?: Array<string>
  logo?: StrapiImageType
  highlight?: boolean
  blogLink?: string | null
  videoLink?: string | null
  externalLink?: string | null
}

export default function CustomerStoryCard({
  title,
  description,
  categories,
  verticals,
  migrations,
  cloudProviders,
  logo,
  highlight,
  blogLink,
  videoLink,
  externalLink
}: CustomerStoryCardProps) {
  const hasVerticals = !!verticals?.length
  const hasMigrations = !!migrations?.length
  const hasProviders = !!cloudProviders?.length
  return (
    <CUICard
      className={`relative shadow-xl shadow-black/25 transition hover:shadow-2xl ${highlight ? 'border-primary-300 !bg-neutral-700' : ''}`}>
      <CUICard.Header>
        <div className='rounded-t-lg bg-primary-300 px-4 py-5'>
          {logo && (
            <StrapiImageUrl
              {...logo}
              loading='eager'
              className='h-9 w-full object-scale-down object-center'
            />
          )}
        </div>
      </CUICard.Header>

      <CUICard.Body className='mb-auto p-6'>
        {categories && (
          <div className='flex items-center justify-start gap-2'>
            <div className='story-categories flex-shrink-0 flex-grow-0 font-inconsolata text-primary-300'>
              {categories.join(', ')}
            </div>

            {(hasVerticals || hasMigrations || hasProviders) && (
              <Tooltip.Provider
                delayDuration={0}
                disableHoverableContent={false}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      type='button'
                      className='hidden h-4 w-4 has-hover:inline-flex'>
                      <InformationCircleIcon className='h-auto w-full' />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side='top'
                      align='start'
                      className='max-w-[300px] whitespace-pre-wrap rounded-[4px] bg-neutral-725 px-[15px] py-[10px] text-sm leading-normal will-change-[transform,opacity]'
                      sideOffset={5}>
                      <table className='-my-2 text-left'>
                        <tbody className='divide-y divide-white/10'>
                          {hasVerticals && (
                            <tr className='align-top'>
                              <th className='whitespace-nowrap py-2 pr-2'>
                                Vertical
                              </th>
                              <td className='py-2'>{verticals.join(', ')}</td>
                            </tr>
                          )}
                          {hasMigrations && (
                            <tr className='align-top'>
                              <th className='whitespace-nowrap py-2 pr-2'>
                                Migration
                              </th>
                              <td className='py-2'>{migrations.join(', ')}</td>
                            </tr>
                          )}
                          {hasProviders && (
                            <tr className='align-top'>
                              <th className='whitespace-nowrap py-2 pr-2'>
                                Cloud Provider
                              </th>
                              <td className='py-2'>
                                {cloudProviders.join(', ')}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <Tooltip.Arrow className='fill-neutral-725' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}
          </div>
        )}
        <div className='story-title py-2 font-basier text-xl font-semibold'>
          {title}
        </div>
        {description && (
          <div className='story-description flex-grow text-balance'>
            {description}
          </div>
        )}
      </CUICard.Body>

      {(blogLink || externalLink || videoLink) && (
        <CUICard.Footer className='px-6 pb-6'>
          <div className='flex items-center justify-end gap-x-6 text-primary-300'>
            {blogLink && (
              <Link href={blogLink} target='_blank' className='hover:underline'>
                Read blog
              </Link>
            )}
            {externalLink && (
              <Link
                href={externalLink}
                target='_blank'
                className='hover:underline'>
                Read blog
              </Link>
            )}
            {videoLink && (
              <Link
                href={videoLink}
                target='_blank'
                className='flex items-center gap-x-3 hover:underline'>
                <CirclePlay strokeWidth={1.5} className='h-5 w-5' />
                Watch video
              </Link>
            )}
          </div>

          {highlight && (
            <div className='absolute -bottom-2 left-1/2 z-50 -translate-x-1/2 transform overflow-visible bg-gradient-to-b from-neutral-700 from-[56%] to-transparent to-[56%] px-1 text-xs font-bold uppercase'>
              Highlight
            </div>
          )}
        </CUICard.Footer>
      )}
    </CUICard>
  )
}
