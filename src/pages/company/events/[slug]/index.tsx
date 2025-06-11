import EventPost from '@/components/EventPostList/EventPost'
import EventsContainer from '@/components/EventsContainer'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import { StrapiImage } from '@/components/StrapiElements'
import { SuiText, SuiTitle } from '@/components/sui'
import {
  findAll,
  getProxiedMediaUrl,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { generateInnerEventSchema } from '@/lib/schema'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { EventProps, EventType } from '@/types/events'
import { ParamsType } from '@/types/homepage'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

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
        imageUrl: getProxiedMediaUrl(page.thumbnailPng.url)
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

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='flex flex-col'>
        <EventsContainer
          form={form}
          recordedVimeoUrl={recordedVimeoUrl}
          featuredImage={thumbnailPng}>
          <div className='section_metadata mb-20'>
            <h4 className='mb-2 text-base font-semibold text-primary-300'>
              <Link className='hover:text-primary-400' href='/company/events'>
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
                  <div className='flex gap-5' key={`${host.name}-${host.role}`}>
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
                      <p className='mb-1 text-base font-medium'>{host.name}</p>
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
                    <SuiText size='base' weight='medium' className='flex-auto'>
                      {agendaItem.topic}
                    </SuiText>
                  </div>
                ))}
              </div>
            </div>
          )}
        </EventsContainer>
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
