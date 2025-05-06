import { InformationCircleIcon } from '@heroicons/react/outline'
import * as Tooltip from '@radix-ui/react-tooltip'
import { CirclePlay } from 'lucide-react'
import Link from 'next/link'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { CUICard } from '../ClickUI'
import { StrapiImageUrl } from '../StrapiElements'

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
      className={`relative transition shadow-xl hover:shadow-2xl shadow-black/25 ${highlight ? 'border-primary-300 !bg-neutral-700' : ''}`}>
      <CUICard.Header>
        <div className='rounded-t-lg bg-primary-300 p-4'>
          <div className='flex h-[40px] items-center justify-center'>
            {logo && (
              <StrapiImageUrl
                {...logo}
                loading='eager'
                className='max-h-[35px]'
              />
            )}
          </div>
        </div>
      </CUICard.Header>

      <CUICard.Body className='p-6 mb-auto'>
        {categories && (
          <div className='flex gap-2 justify-start items-center'>
            <div className='story-categories font-inconsolata text-primary-300 flex-shrink-0 flex-grow-0'>
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
                      className='hidden has-hover:inline-flex h-4 w-4'>
                      <InformationCircleIcon className='w-full h-auto' />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side='top'
                      align='start'
                      className='max-w-[300px] whitespace-pre-wrap rounded-[4px] bg-neutral-725 px-[15px] py-[10px] text-sm leading-normal will-change-[transform,opacity]'
                      sideOffset={5}>
                      <table className='text-left -my-2'>
                        <tbody className='divide-y divide-white/10'>
                          {hasVerticals && (
                            <tr className='align-top'>
                              <th className='whitespace-nowrap pr-2 py-2'>
                                Vertical
                              </th>
                              <td className='py-2'>{verticals.join(', ')}</td>
                            </tr>
                          )}
                          {hasMigrations && (
                            <tr className='align-top'>
                              <th className='whitespace-nowrap pr-2 py-2'>
                                Migration
                              </th>
                              <td className='py-2'>{migrations.join(', ')}</td>
                            </tr>
                          )}
                          {hasProviders && (
                            <tr className='align-top'>
                              <th className='whitespace-nowrap pr-2 py-2'>
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
            <div className='absolute -bottom-2 left-1/2 z-50 -translate-x-1/2 transform overflow-visible bg-half-highlight px-1 text-xs font-bold uppercase'>
              Highlight
            </div>
          )}
        </CUICard.Footer>
      )}
    </CUICard>
  )
}
