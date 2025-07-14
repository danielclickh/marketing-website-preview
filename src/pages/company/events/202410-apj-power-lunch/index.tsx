import fallbackSocialImage from '@/../public/images/social_share.png'
import EventPost from '@/components/EventPostList/EventPost'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import { SuiText, SuiTitle } from '@/components/sui'
import {
  findAll,
  getProxiedMediaUrl,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { absoluteUrl } from '@/lib/next'
import { generateInnerEventSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { EventProps, EventType } from '@/types/events'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<EventProps> =
  async function getStaticProps() {
    const { data } = await findAll('events', {
      filters: {
        slug: {
          $eq: '202410-apj-power-lunch'
        }
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
                $notContains: '202410-apj-power-lunch'
              }
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
    return {
      props: {
        ...page,
        seo: {
          title: page.title,
          description: page.shortDescription,
          image: [page.thumbnailPng],
          type: 'website',
          siteName: 'ClickHouse',
          path: '/company/events/202410-apj-power-lunch',
          schema: generateInnerEventSchema({
            name: page.title,
            description: page.shortDescription || '',
            startDate: page.localDatetime,
            imageUrl: page?.thumbnailPng?.url
              ? getProxiedMediaUrl(page.thumbnailPng.url)
              : absoluteUrl(fallbackSocialImage.src),
            path: '/company/events/202410-apj-power-lunch',
            locationCity: page.location.city,
            locationCountry: page.location.country
          })
        },
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
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='flex flex-col'>
        <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-24 sm:px-8 2xl:px-0'>
          <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
            <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
              <div className='section_metadata mb-20'>
                <h4 className='mb-2 text-base font-semibold text-primary-300'>
                  <Link
                    className='hover:text-primary-400'
                    href='/company/events'>
                    Events
                  </Link>{' '}
                  / {category}
                </h4>
                <h1 className='mb-8 font-basier text-4xl font-semibold leading-tight md:text-5xl md:leading-normal'>
                  {title}
                </h1>
                {richDescription && (
                  <div className='prose prose-neutral'>
                    <Markdown encloseByDiv={false}>{richDescription}</Markdown>
                  </div>
                )}
              </div>

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
                  alt='Featured image'
                  className='mb-20 hidden h-auto w-full rounded-lg object-cover lg:block'
                />
              )}
              <div className='w-full rounded-lg border border-neutral-800 bg-neutral-900 p-8 shadow-card duration-300 ease-in-out'>
                {!formLoaded && (
                  <div className='text-center'>Loading form...</div>
                )}

                {!formSuccess && (
                  <MarketoForm
                    formId='1274'
                    disclaimer={
                      'By registering, you acknowledge that ClickHouse will process your personal information in accordance with our [Privacy Policy](/legal/privacy-policy).'
                    }
                    onLoad={(form) => {
                      setFormLoaded(true)

                      // Email validation @ /pages/marketo-forms/[id].tsx
                    }}
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
                {formSuccess && (
                  <div ref={formSuccessRef} className='text-center'>
                    <h3 className='text-2xl font-bold'>Thank you!</h3>
                    <p className='mt-2 text-neutral-200'>We'll be in touch.</p>
                  </div>
                )}
              </div>
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
