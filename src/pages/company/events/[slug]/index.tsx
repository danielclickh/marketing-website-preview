import fallbackSocialImage from '@/../public/images/social_share.png'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import StrapiImage from '@/components-cleaned/StrapiImage'
import { CUIButton, CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import EventPost from '@/components/EventPostList/EventPost'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import SocialButton from '@/components/SocialButton'
import StripeBuyButton from '@/components/StripeBuyButton'
import { SuiTitle } from '@/components/sui'
import {
  eventsService,
  getProxiedMediaUrl,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { absoluteUrl } from '@/lib/next'
import { generateInnerEventSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps, ParamsType } from '@/types/homepage'
import { EntryEvent } from '@/types/strapi'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState, useMemo } from 'react'

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
      title: event.title,
      description: event.shortDescription || '',
      image: [event.thumbnailPng],
      type: 'website',
      siteName: 'ClickHouse',
      path: `/company/events/${slug}`,
      schema: generateInnerEventSchema({
        name: event.title,
        description: event.shortDescription || '',
        startDate: event.localDatetime,
        imageUrl: event?.thumbnailPng?.url
          ? getProxiedMediaUrl(event.thumbnailPng.url)
          : absoluteUrl(fallbackSocialImage.src),
        path: `/company/events/${slug}`,
        locationCity: event.location.city,
        locationCountry: event.location.country
      })
    }

    if (event.unlisted) {
      seo.robots = 'noindex'
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
  headerData,
  event,
  moreEvents,
  seo
}: PageProps) {
  const router = useRouter()
  useGalaxyOnPage('eventPage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  const eventHasPast = useMemo(() => {
    const expiryDate = new Date(event.localDatetime)
    const nowDate = new Date()

    // Set expiry datetime at 23:59 +1 day after the event closes
    expiryDate.setDate(expiryDate.getDate() + 1)
    expiryDate.setUTCHours(23, 59, 59, 0)

    // Set now time to 00:00
    nowDate.setUTCHours(0, 0, 0, 0)

    return nowDate > expiryDate
  }, [event.localDatetime])

  const redirectOnSuccess =
    event.form?.type === 'recordedGatedContent' && !!event.recordedVimeoUrl
  const hasSidebar = !!event.thumbnailPng || !event.form?.disabled
  const formId = event.form?.marketoFormId?.trim()?.length
    ? event.form.marketoFormId
    : '1127'

  const handleFormSuccess = () => {
    if (redirectOnSuccess) {
      router.push(`/company/events/${event.slug}/thank-you`)
    } else {
      setFormSuccess(true)

      // Delay needed to allow the ref to update before scrolling
      window.setTimeout(() => {
        formSuccessRef.current?.scrollIntoView()
      }, 10)
    }

    return false // Stops page from reloading
  }

  return (
    <Layout seo={seo} headerData={headerData}>
      <section className='section-container my-16 flex flex-col items-start gap-x-16 gap-y-8 lg:my-24 lg:flex-row'>
        {/* Content column */}
        <div className={`space-y-6 ${hasSidebar ? '' : 'mx-auto max-w-4xl'}`}>
          <Breadcrumbs>
            <Breadcrumbs.Link href='/company/events'>Events</Breadcrumbs.Link>
            <Breadcrumbs.Link
              href={`/company/events?category=${event.category}`}>
              {event.category}
            </Breadcrumbs.Link>
          </Breadcrumbs>
          <SuiTitle type='h1'>{event.title}</SuiTitle>

          {event.richDescription && (
            <Markdown className='rich-text-content'>
              {event.richDescription}
            </Markdown>
          )}

          {event.hostedBy && (
            <>
              <HRSeparator className='!max-w-none' />
              <SuiTitle type='h3' className='mb-7'>
                {event.hostedBy.title}
              </SuiTitle>
              <div className='grid grid-cols-1 flex-wrap gap-3 sm:grid-cols-2'>
                {event.hostedBy.hosts.map((host, hostIndex) => (
                  <div className='flex items-center gap-5' key={hostIndex}>
                    {host.avatarPng && (
                      <StrapiImage
                        entry={host.avatarPng}
                        alt={host.avatarPng.caption ?? host.name}
                        width={64}
                        height={64}
                        className='h-11 w-11 flex-shrink-0 flex-grow-0 rounded-full'
                      />
                    )}
                    <div className='space-y-1 font-medium'>
                      <p>{host.name}</p>
                      <p className='text-sm text-neutral-300'>{host.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {event.agenda && (
            <>
              <HRSeparator className='!max-w-none' />
              <SuiTitle type='h3'>{event.agenda.title}</SuiTitle>
              <div className='grid grid-cols-[auto_1fr] gap-1'>
                {event.agenda.items.map((agendaItem, agendaIndex) => (
                  <div
                    className='col-span-full grid grid-cols-subgrid gap-4'
                    key={agendaIndex}>
                    <p className='mb-1 text-neutral-200'>{agendaItem.time}</p>
                    <p className='font-medium'>{agendaItem.topic}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Form column */}
        {hasSidebar && (
          <div className='w-full flex-shrink-0 flex-grow-0 space-y-6 lg:max-w-lg'>
            {event.thumbnailPng && (
              <StrapiImage
                entry={event.thumbnailPng}
                width={512}
                height={293}
                loading='eager'
                priority={true}
                alt='Featured image'
                className='hidden h-auto w-full rounded-lg border border-neutral-700/80 object-cover shadow-lg lg:block'
              />
            )}
            {!event.form?.disabled && (
              <CUICard>
                <CUICard.Body className='p-4 lg:p-6'>
                  {eventHasPast ? (
                    <div className='py-16 text-center text-neutral-200'>
                      Registration for this event is now closed.
                      <br />{' '}
                      <LinkWithArrow
                        href='/company/events'
                        className='text-primary-300 hover:underline'>
                        Explore our upcoming events here
                      </LinkWithArrow>
                    </div>
                  ) : (
                    <>
                      {!formSuccess && (
                        <MarketoForm
                          formId={formId}
                          onLoad={() => setFormLoaded(true)}
                          submitButtonLabel={event.form?.submitButtonLabel}
                          clearbitTracking={true}
                          onSuccess={handleFormSuccess}
                        />
                      )}

                      {!formLoaded && (
                        <div className='text-center'>Loading form...</div>
                      )}

                      {formSuccess && (
                        <div ref={formSuccessRef}>
                          <div className='space-y-6 text-center'>
                            <CheckCircleIcon className='mx-auto !mt-4 h-16 w-16 stroke-1 text-primary-300' />
                            <Markdown className='rich-text-content text-center'>
                              {event.form?.SuccessMessage ||
                                "You've been successfully registered. See you there!"}
                            </Markdown>
                            {event.form?.stripeBuyButtonId && (
                              <div className='mx-auto w-max overflow-hidden rounded-xl border-2 border-primary-300'>
                                <StripeBuyButton
                                  id={event.form.stripeBuyButtonId}
                                />
                              </div>
                            )}
                            <div>
                              <p className='mb-2 px-10 text-base font-semibold text-neutral-300'>
                                Share with others
                              </p>
                              <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                                <CopyUrlButton />
                                <SocialButton
                                  type='twitter'
                                  title={event.title}
                                />
                                <SocialButton
                                  type='facebook'
                                  title={event.title}
                                />
                                <SocialButton
                                  type='linkedin'
                                  title={event.title}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CUICard.Body>
              </CUICard>
            )}
          </div>
        )}
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
