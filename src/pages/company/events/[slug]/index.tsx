import fallbackSocialImage from '@/../public/images/social_share.png'
import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import { CUIButton, CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import EventPost from '@/components/EventPostList/EventPost'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import SocialButton from '@/components/SocialButton'
import { StrapiImage } from '@/components/StrapiElements'
import StripeBuyButton from '@/components/StripeBuyButton'
import VideoPlayerCustom from '@/components/VideoPlayerCustom'
import { SuiPanel, SuiText, SuiTitle } from '@/components/sui'
import {
  findAll,
  getProxiedMediaUrl,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { absoluteUrl } from '@/lib/next'
import { generateInnerEventSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { EventProps, EventType } from '@/types/events'
import { ParamsType } from '@/types/homepage'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

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
        props: {},
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
      path: `/company/events/${slug}`,
      schema: generateInnerEventSchema({
        name: page.title,
        description: page.shortDescription || '',
        startDate: page.localDatetime,
        imageUrl: page?.thumbnailPng?.url
          ? getProxiedMediaUrl(page.thumbnailPng.url)
          : absoluteUrl(fallbackSocialImage.src),
        path: `/company/events/${slug}`,
        locationCity: page.location.city,
        locationCountry: page.location.country
      })
    }

    if (page.unlisted) {
      seo.robots = 'noindex'
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
  agenda,
  hostedBy,
  category,
  title,
  richDescription,
  form,
  localDatetime,
  recordedVimeoUrl,
  footerData,
  headerData,
  recentEvents,
  thumbnailPng,
  seo
}: EventProps) {
  useGalaxyOnPage('eventPage')

  const hasSidebar = !!thumbnailPng || !form?.disabled
  const hasVimeo = form?.type === 'recordedGatedContent' && !!recordedVimeoUrl
  const formId = form?.marketoFormId?.trim()?.length
    ? form.marketoFormId
    : '1127'

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(true)
  const [formLoaded, setFormLoaded] = useState(true)

  const getVideoCode = (video: string) => {
    const regex = /\/video\/(\d+)/
    const match = video?.match(regex)
    if (match) {
      return match[1]
    } else {
      return video
    }
  }

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <section className='section-container my-16 flex flex-col items-start gap-x-16 gap-y-8 lg:my-24 lg:flex-row'>
        {/* Content column */}
        <div className={`space-y-6 ${hasSidebar ? '' : 'mx-auto max-w-4xl'}`}>
          <Breadcrumbs>
            <Breadcrumbs.Link href='/company/events'>Events</Breadcrumbs.Link>
            <Breadcrumbs.Link href={`/company/events?category=${category}`}>
              {category}
            </Breadcrumbs.Link>
          </Breadcrumbs>
          <SuiTitle type='h1'>{title}</SuiTitle>

          {richDescription && <Markdown>{richDescription}</Markdown>}

          {hostedBy && (
            <>
              <HRSeparator className='!max-w-none' />
              <SuiTitle type='h3' className='mb-7'>
                {hostedBy.title}
              </SuiTitle>
              <div className='grid grid-cols-1 flex-wrap gap-3 sm:grid-cols-2'>
                {hostedBy.hosts.map((host, hostIndex) => (
                  <div className='flex items-center gap-5' key={hostIndex}>
                    {host.avatarPng && (
                      <StrapiImage
                        {...host.avatarPng}
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
          {agenda && (
            <>
              <HRSeparator className='!max-w-none' />
              <SuiTitle type='h3'>{agenda.title}</SuiTitle>
              <div className='grid grid-cols-[auto_1fr] gap-1'>
                {agenda.items.map((agendaItem, agendaIndex) => (
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
          <div className='w-full lg:max-w-lg'>
            <CUICard className='overflow-hidden'>
              {thumbnailPng && (
                <CUICard.Header className='hidden border-b border-neutral-700/80 lg:block'>
                  <Image
                    src={thumbnailPng.url}
                    width={512}
                    height={293}
                    loading='eager'
                    priority
                    alt='Featured image'
                    className='h-auto w-full object-cover'
                  />
                </CUICard.Header>
              )}
              <CUICard.Body className='p-4 lg:p-6'>
                {!form?.disabled && (
                  <>
                    {!formSuccess && (
                      <MarketoForm
                        formId={formId}
                        onLoad={() => setFormLoaded(true)}
                        submitButtonLabel={form?.submitButtonLabel}
                        clearbitTracking={true}
                        onSuccess={() => {
                          setFormSuccess(true)
                          // Delay needed to allow the ref to update before scrolling
                          setTimeout(() => {
                            formSuccessRef.current?.scrollIntoView()
                          }, 10)

                          return false // Stops page from reloading
                        }}
                      />
                    )}

                    {!formLoaded && (
                      <div className='text-center'>Loading form...</div>
                    )}

                    {formSuccess && (
                      <div ref={formSuccessRef}>
                        <div className='text-center'>
                          <CheckCircleIcon className='mx-auto mb-4 h-16 w-16 stroke-1 text-primary-300' />
                          <Markdown>
                            {form?.SuccessMessage || hasVimeo
                              ? 'Thanks for registering!'
                              : "You've been successfully registered. See you there!"}
                          </Markdown>
                          {form?.stripeBuyButtonId && (
                            <CUICard className='my-10'>
                              <CUICard.Body className='p-4'>
                                <StripeBuyButton id={form.stripeBuyButtonId} />
                              </CUICard.Body>
                            </CUICard>
                          )}
                          {hasVimeo && (
                            <div className='my-10'>
                              <p className='mb-4'>Watch the recording below</p>
                              <VideoPlayerCustom
                                fullWidth={true}
                                videos={[
                                  {
                                    videoId: getVideoCode(recordedVimeoUrl),
                                    type: 'vimeo',
                                    vimeoCode: '979264b085',
                                    image: thumbnailPng?.url
                                  }
                                ]}
                              />
                            </div>
                          )}

                          <p className='mb-2 px-10 text-base font-semibold text-neutral-300'>
                            {hasVimeo ? 'Share the recording' : 'Share'}
                          </p>
                          <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                            <CopyUrlButton />
                            {['twitter', 'facebook', 'linkedin'].map(
                              (social) => (
                                <SocialButton
                                  key={social}
                                  type={social}
                                  title={title}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CUICard.Body>
            </CUICard>
          </div>
        )}
      </section>

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
