import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import { CUIButton, CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import EventPost from '@/components/EventPostList/EventPost'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import SocialButton from '@/components/SocialButton'
import StripeBuyButton from '@/components/StripeBuyButton'
import { SuiTitle } from '@/components/sui'
import {
  findAll,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { absoluteUrl } from '@/lib/next'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { EventProps, EventType } from '@/types/events'
import { ParamsType } from '@/types/homepage'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { GetServerSideProps } from 'next'
import React from 'react'

export const getServerSideProps: GetServerSideProps<EventProps> =
  async function getServerSideProps({ params }) {
    const { slug } = params as ParamsType
    const { data } = await findAll('events', {
      filters: {
        $and: [
          {
            slug: {
              $eq: slug
            }
          },
          {
            $or: getStagingOnlyFilters()
          }
        ]
      },
      sort: ['localDatetime:DESC'],
      populate: [
        'thumbnailPng',
        'hostedBy',
        'hostedBy.hosts',
        'hostedBy.hosts.avatarPng',
        'agenda',
        'agenda.items',
        'location',
        'thumbnailPng',
        'form'
      ]
    })

    const { data: recentEvents }: { data: Array<EventType> } = await findAll(
      'events',
      {
        filters: {
          $and: [
            {
              localDatetime: {
                $gte: new Date().toISOString()
              }
            },
            {
              slug: {
                $notContains: slug
              }
            },
            {
              $or: getStagingOnlyFilters()
            },
            {
              $or: getUnlistedFilters()
            }
          ]
        },
        sort: ['localDatetime:ASC'],
        populate: [
          'thumbnailPng',
          'hostedBy',
          'hostedBy.hosts',
          'hostedBy.hosts.avatarPng',
          'agenda',
          'agenda.items',
          'location',
          'thumbnailPng',
          'form'
        ],
        pagination: { limit: 3 }
      }
    )

    const commonProps = await getCommonProps()

    const page = data[0]
    if (!page) {
      return {
        notFound: true
      }
    }

    if (page.eventVideoUrl) {
      return {
        redirect: {
          destination: page.eventVideoUrl,
          permanent: false
        }
      }
    }

    const seo: SeoMetadata = {
      title: page.title,
      description: page.shortDescription,
      image: [page.thumbnailPng],
      type: 'website',
      siteName: 'ClickHouse',
      path: `/company/events/${slug}`, // Set canonical to original event page
      robots: 'noindex nofollow'
    }

    return {
      props: {
        ...page,
        seo,
        recentEvents,
        ...commonProps
      }
    }
  }

function EventPage({
  slug,
  title,
  form,
  recordedVimeoUrl,
  footerData,
  headerData,
  recentEvents,
  thumbnailPng,
  seo
}: EventProps) {
  useGalaxyOnPage('eventPageThankYou')

  const eventUrl = absoluteUrl(`/company/events/${slug}`)

  const getVimeoId = (video: string) => {
    const regex = /\/video\/(\d+)/
    const match = video?.match(regex)
    let id = video

    if (match) {
      id = match[1]
    }

    const asNumber = Number(id)
    return isNaN(asNumber) ? null : asNumber
  }

  const vimeoId =
    form?.type === 'recordedGatedContent' && !!recordedVimeoUrl
      ? getVimeoId(recordedVimeoUrl)
      : null
  const hasVimeo = !!vimeoId

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <section className='section-container my-16 space-y-6 text-center lg:my-24'>
        {!vimeoId && (
          <CheckCircleIcon className='mx-auto !mt-4 h-16 w-16 stroke-1 text-primary-300' />
        )}
        <Markdown className='mx-auto w-full max-w-max text-center'>
          {form?.SuccessMessage ||
            (hasVimeo
              ? '## Thanks for registering. Watch below!'
              : "You've been successfully registered. See you there!")}
        </Markdown>
        {form?.stripeBuyButtonId && (
          <div className='mx-auto w-max overflow-hidden rounded-xl border-2 border-primary-300'>
            <StripeBuyButton id={form.stripeBuyButtonId} />
          </div>
        )}
        {hasVimeo && (
          <div className='mx-auto max-w-2xl'>
            <PlayOnClickVideo
              thumbnail={thumbnailPng?.url}
              provider='vimeo'
              id={vimeoId}
            />
          </div>
        )}

        <div>
          <p className='mb-2 px-10 text-base font-semibold text-neutral-300'>
            Share with others
          </p>
          <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
            <CopyUrlButton url={eventUrl} />
            <SocialButton type='twitter' title={title} url={eventUrl} />
            <SocialButton type='facebook' title={title} url={eventUrl} />
            <SocialButton type='linkedin' title={title} url={eventUrl} />
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className='bg-shadow-element yellow-shadow my-16 lg:my-24'>
        <div className='section-container flex flex-col'>
          <div className='flex justify-between pb-8'>
            <SuiTitle
              type='h2'
              className='!text-3xl text-neutral-100'
              weight='semibold'>
              Upcoming events
            </SuiTitle>

            <CUIButton href='/company/events' type='secondary'>
              View all Events
            </CUIButton>
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {recentEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default EventPage
