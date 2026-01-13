import PlayOnClickVideo from '@/components-cleaned/PlayOnClickVideo'
import { CUIButton, CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import EventPost from '@/components/EventPostList/EventPost'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import SocialButton from '@/components/SocialButton'
import StripeBuyButton from '@/components/StripeBuyButton'
import { SuiTitle } from '@/components/sui'
import { eventsService, getUnlistedFilters } from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { absoluteUrl } from '@/lib/next'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps, ParamsType } from '@/types/homepage'
import { EntryEvent } from '@/types/strapi'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import React from 'react'

export interface PageProps extends CommonProps {
  event: EntryEvent
  moreEvents: Array<EntryEvent>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType

    const event = await eventsService.findOne({
      filters: { slug }
    })

    if (!event) {
      return {
        notFound: true
      }
    } else if (event.eventVideoUrl) {
      return {
        props: {},
        redirect: {
          destination: event.eventVideoUrl,
          permanent: false
        }
      }
    }

    const moreEventsRequest = await eventsService.findMany({
      filters: {
        $or: getUnlistedFilters(),
        $and: [
          {
            localDatetime: {
              $gte: new Date().toISOString()
            }
          },
          {
            slug: {
              $ne: slug
            }
          }
        ]
      },
      sort: ['localDatetime:ASC'],
      pagination: { limit: 4 }
    })

    const [commonProps, moreEvents] = await Promise.all([
      getCommonProps(),
      moreEventsRequest
    ])

    const seo: SeoMetadata = {
      title: `${event.title} | Registered!`,
      description: event.shortDescription || '',
      image: [event.thumbnailPng],
      type: 'website',
      siteName: 'ClickHouse',
      path: `/company/events/${slug}`, // Set canonical to original event page
      robots: 'noindex nofollow'
    }

    return {
      props: {
        ...commonProps,
        seo,
        event,
        moreEvents
      }
    }
  }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const data: Array<Pick<EntryEvent, 'slug'>> = await eventsService.findAll({
    fields: ['slug'],
    populate: false,
    filters: {
      eventVideoUrl: {
        $null: true
      }
    }
  })

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.slug }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default function Page({
  event,
  headerData,
  moreEvents,
  seo
}: PageProps) {
  useGalaxyOnPage('eventPageThankYou')

  const eventUrl = absoluteUrl(`/company/events/${event.slug}`)

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
    event.form?.type === 'recordedGatedContent' && !!event.recordedVimeoUrl
      ? getVimeoId(event.recordedVimeoUrl)
      : null
  const hasVimeo = !!vimeoId

  return (
    <Layout seo={seo} headerData={headerData}>
      <section className='section-container my-16 space-y-6 text-center lg:my-24'>
        {!vimeoId && (
          <CheckCircleIcon className='mx-auto !mt-4 h-16 w-16 stroke-1 text-primary-300' />
        )}
        <Markdown className='rich-text-content text-center'>
          {event.form?.SuccessMessage ||
            (hasVimeo
              ? '## Thanks for registering. Watch below!'
              : "You've been successfully registered. See you there!")}
        </Markdown>
        {event.form?.stripeBuyButtonId && (
          <div className='mx-auto w-max overflow-hidden rounded-xl border-2 border-primary-300'>
            <StripeBuyButton id={event.form.stripeBuyButtonId} />
          </div>
        )}
        {hasVimeo && (
          <div className='mx-auto max-w-2xl'>
            <PlayOnClickVideo
              thumbnail={event.thumbnailPng?.url}
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
            <SocialButton type='twitter' title={event.title} url={eventUrl} />
            <SocialButton type='facebook' title={event.title} url={eventUrl} />
            <SocialButton type='linkedin' title={event.title} url={eventUrl} />
          </div>
        </div>
      </section>

      {/* Recent posts */}
      {moreEvents.length > 0 && (
        <section className='section-container my-20 flex flex-col'>
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
            {moreEvents.map((recentEvent, recentEventIndex) => {
              return (
                <div
                  key={recentEventIndex}
                  className={
                    recentEventIndex > 2 ? 'hidden md:block lg:hidden' : ''
                  }>
                  <EventPost {...recentEvent} />
                </div>
              )
            })}
          </div>
        </section>
      )}
    </Layout>
  )
}
