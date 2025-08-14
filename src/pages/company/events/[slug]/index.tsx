import fallbackSocialImage from '@/../public/images/social_share.png'
import { CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import EventPost from '@/components/EventPostList/EventPost'
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
import Link from 'next/link'
import { useRef, useState } from 'react'

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

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  const checkVimeoCode = (video: string) => {
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
      <div className='flex flex-col'>
        <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-24 sm:px-8 2xl:px-0'>
          <div className='mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
            <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
              <div className='section_metadata mb-20'>
                <h4 className='mb-2 text-base font-semibold text-primary-300'>
                  <Link className='hover:underline' href='/company/events'>
                    Events
                  </Link>{' '}
                  / {category}
                </h4>
                <h1 className='mb-8 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                  {title}
                </h1>

                {richDescription && (
                  <div className='prose prose-neutral'>
                    <Markdown encloseByDiv={false}>{richDescription}</Markdown>
                  </div>
                )}
              </div>

              {hostedBy && (
                <div className='hosted_by mb-16'>
                  <h3 className='mb-7 text-xl font-bold'>{hostedBy.title}</h3>
                  <div className='grid grid-cols-1 flex-wrap gap-3 sm:grid-cols-2'>
                    {hostedBy.hosts.map((host) => (
                      <div
                        className='flex gap-5'
                        key={`${host.name}-${host.role}`}>
                        {host.avatarPng && (
                          <StrapiImage
                            {...host.avatarPng}
                            alt={host.avatarPng.caption ?? host.name}
                            width={64}
                            height={64}
                            className='h-11 w-11 rounded-full'
                          />
                        )}
                        <div className='flex flex-col'>
                          <p className='mb-1 text-base font-medium'>
                            {host.name}
                          </p>
                          <p className='flex-auto text-sm font-medium text-neutral-300'>
                            {host.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {agenda && (
                <div className='agenda'>
                  <SuiTitle type='h2' className='mb-7'>
                    {agenda.title}
                  </SuiTitle>
                  <div className='agenda_items gap-1'>
                    {agenda.items.map((agendaItem) => (
                      <div
                        className='agenda_item flex items-start'
                        key={agendaItem.time}>
                        <SuiText
                          size='base'
                          color='secondary'
                          weight='medium'
                          className='mb-1 w-16'>
                          {agendaItem.time}
                        </SuiText>
                        <SuiText
                          size='base'
                          weight='medium'
                          className='flex-auto'>
                          {agendaItem.topic}
                        </SuiText>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className='ml-auto w-full lg:max-w-lg'>
              {thumbnailPng && (
                <Image
                  src={thumbnailPng.url}
                  width={512}
                  height={293}
                  loading='eager'
                  priority
                  alt='Featured image'
                  className='mb-20 hidden h-auto w-full rounded-lg object-cover lg:block'
                />
              )}

              {!form?.disabled && (
                <SuiPanel
                  isRounded
                  color='bg-neutral-900'
                  shadow
                  padding='xl'
                  className='w-full border border-neutral-800'>
                  {!formSuccess && (
                    <MarketoForm
                      formId={
                        form?.marketoFormId?.trim()?.length
                          ? form.marketoFormId
                          : '1127'
                      }
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
                    <div className='subscribed' ref={formSuccessRef}>
                      <div className='success-container text-center'>
                        <CheckCircleIcon className='mx-auto mb-4 h-16 w-16 stroke-1 text-primary-300' />
                        {form?.SuccessMessage && (
                          <Markdown>{form.SuccessMessage}</Markdown>
                        )}
                        {!form?.SuccessMessage && (
                          <p className='mb-12 px-10 text-xl font-bold'>
                            {form?.type === 'recordedGatedContent' ? (
                              <>Thanks for registering! </>
                            ) : form?.submitButtonLabel ===
                              'Request your spot' ? (
                              <>
                                Thanks for your interest, we'll be in touch to
                                let you know if a space is available
                              </>
                            ) : (
                              <>
                                You've been successfully registered. See you
                                there!
                              </>
                            )}
                          </p>
                        )}
                        {form?.stripeBuyButtonId && (
                          <div
                            className={
                              !form?.SuccessMessage ? 'mb-10 mt-4' : 'my-10'
                            }>
                            <CUICard>
                              <CUICard.Body className='p-4'>
                                <StripeBuyButton id={form.stripeBuyButtonId} />
                              </CUICard.Body>
                            </CUICard>
                          </div>
                        )}
                        {form?.type === 'recordedGatedContent' &&
                          recordedVimeoUrl && (
                            <div
                              className='my-10'
                              id='custom-video-container-player'>
                              <p className='mb-4'>Watch the recording below</p>
                              <VideoPlayerCustom
                                fullWidth={true}
                                videos={[
                                  {
                                    videoId: checkVimeoCode(recordedVimeoUrl),
                                    type: 'vimeo',
                                    vimeoCode: '979264b085',
                                    image: thumbnailPng?.url
                                  }
                                ]}
                              />
                            </div>
                          )}

                        <p className='mb-2 px-10 text-base font-semibold text-neutral-300'>
                          {form?.type == 'recordedGatedContent' &&
                          recordedVimeoUrl ? (
                            <>Share the recording</>
                          ) : (
                            <>Share</>
                          )}
                        </p>
                        <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                          <CopyUrlButton />
                          {['twitter', 'facebook', 'linkedin'].map((social) => (
                            <SocialButton
                              key={social}
                              type={social}
                              title='title'
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </SuiPanel>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-shadow-element yellow-shadow align-shadow-right mx-auto mb-40 max-w-7xl px-4 pb-10 sm:px-8 2xl:px-0'>
        <div className='relative z-20'>
          <h3 className='mb-10 font-basier text-4xl'>Upcoming events</h3>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {recentEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EventPage
