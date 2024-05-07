import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { EventProps, EventType } from '../../../types/events'
import { findAll } from '../../../lib/api/strapi'
import GetStartedFree from '../../../components/GetStartedFree'
import Layout from '../../../components/Layout'
import EventPost from '../../../components/EventPostList/EventPost'
import { SuiText } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CUIButton } from '../../../components/ClickUI'
import { galaxyOnPage } from '../../../lib/galaxy/galaxy'
import Tilt from 'react-parallax-tilt'

import HRSeparator from '../../../components/HRSeparator'
import {
  BookOpenIcon,
  CalendarIcon,
  DocumentTextIcon,
  PlayIcon
} from '@heroicons/react/outline'
import releases from './releases.json'

export const getStaticProps: GetStaticProps = async () => {
  const params = {
    populate: ['seo', 'seo.image']
  }

  const data = await findOne('homepage', params)

  data.seo.path = '/launch-week/may-2024'
  data.seo.title = 'ClickHouse Cloud Launch Week - May 2024'
  data.seo.description = 'ClickHouse Cloud Launch Week - May 2024'
  data.seo.image = [
    { url: '/images/launch-week/launch-week-social-preview.png' }
  ]

  const commonProps = await getCommonProps()

  const { data: recentEvents }: { data: Array<EventType> } = await findAll(
    'events',
    {
      filters: {
        localDatetime: {
          $gte: new Date().toISOString()
        }
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
        'darkFeatureImagePng',
        'lightFeatureImagePng',
        'form'
      ],
      pagination: { limit: 3 }
    }
  )

  return {
    props: {
      recentEvents,
      ...commonProps,
      ...data
    }
  }
}

export default function LaunchWeekPage({
  recentEvents,
  seo,
  headerData,
  footerData
}: EventProps) {
  galaxyOnPage('launchWeekMayPage')
  useEffect(() => {
    const container = document.getElementById('regionsContainer')
    if (container) {
      const middlePosition =
        container.scrollWidth / 2 - container.clientWidth / 2
      container.scrollLeft = middlePosition
    }
  }, [])
  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='bg-contain bg-center bg-no-repeat'>
          <div className='relative z-20 overflow-hidden bg-calendar bg-cover bg-top bg-no-repeat pt-14'>
            <div className='container mx-auto flex-col px-4 pt-10 pb-16 lg:w-1/2'>
              <div className='mb-6 flex justify-center'>
                <h4 className='w-full max-w-[8rem] rounded-full border border-base-color py-1 text-center text-base font-medium'>
                  May 2024
                </h4>
              </div>
              <div className='mx-auto mb-6 flex max-w-lg justify-center'>
                <h1 className='text-center font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                  ClickHouse Cloud Launch Week
                </h1>
              </div>
              <SuiText
                size='base'
                color='secondary'
                className='mx-auto mt-6 justify-center text-center md:max-w-2xl'>
                <p className='mb-8 text-xl'>
                  Join us for Launch Week on May 13th - May 17th where we’ll
                  release a new feature each day of the week. Mark your
                  calendars – you won’t want to miss it!
                </p>
              </SuiText>
              <div className='flex justify-center gap-6'>
                <CUIButton
                  type='primary'
                  size='lg'
                  weight='semibold'
                  href='https://clickhouse.cloud/signUp?loc=launch-week-may2024'
                  target='_blank'
                  linkClass='w-full mx-auto md:mx-0 max-w-[14rem]'
                  className='w-full'>
                  Start your free trial
                </CUIButton>
              </div>
            </div>
          </div>
        </div>

        <div className='section-container mx-auto mt-16'>
          <div className='flex-col'>
            {releases.map((release) => (
              <>
                <div className='mb-12 flex flex-col justify-center md:flex md:flex-row'>
                  <div className='flex justify-start gap-4 pt-4 pb-4'>
                    <div className='flex'>
                      <CalendarIcon className='h-12 w-12 stroke-1 text-neutral-200' />
                    </div>
                    <div className='w-56 flex-col'>
                      <h4 className='text-lg font-semibold'>
                        Day {release.day}
                      </h4>
                      <h5 className='text-neutral-400'>{release.date}</h5>
                    </div>
                  </div>

                  <Tilt
                    tiltEnable={false}
                    glareEnable={true}
                    glareMaxOpacity={0.4}
                    glareColor='rgba(251, 255, 70, 0.08)'
                    glarePosition='all'
                    className='h-full'>
                    <div className='relative mx-auto flex h-auto w-full rounded-lg border border-neutral-700/80 bg-neutral-900 bg-opacity-30 p-4 shadow-card'>
                      {release.blurred && (
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-semibold'>
                          Coming soon
                        </div>
                      )}
                      <div
                        className={`flex w-full justify-between gap-8 ${
                          release.blurred && 'pointer-events-none blur-xl'
                        }`}>
                        <div className='flex-col'>
                          <h3 className='mb-1 text-lg font-semibold'>
                            {release.title}
                          </h3>
                          <SuiText className='mb-6 max-w-2xl'>
                            {release.summary}
                          </SuiText>

                          <div className='flex-col gap-6 md:flex md:flex-row'>
                            {release.linkBlog && (
                              <Link
                                className='align-center flex gap-2 text-base-color opacity-80 transition-all hover:opacity-100'
                                href={release.linkBlog}>
                                <BookOpenIcon className='mt-1 h-4 w-4' />
                                <span>Read blog</span>
                              </Link>
                            )}
                            {release.linkDocs && (
                              <Link
                                className='align-center flex gap-2 text-base-color opacity-80 transition-all hover:opacity-100'
                                href={release.linkDocs}>
                                <DocumentTextIcon className='mt-1 h-4 w-4' />
                                <span>Read docs</span>
                              </Link>
                            )}
                            {release.linkVideo && (
                              <Link
                                className='align-center flex gap-2 text-base-color opacity-80 transition-all hover:opacity-100'
                                href={release.linkVideo}>
                                <PlayIcon className='mt-1 h-4 w-4' />
                                <span>Watch video</span>
                              </Link>
                            )}
                          </div>
                        </div>

                        <Image
                          className='mr-4 hidden md:flex'
                          src={release.imgSrc}
                          width='84'
                          height='84'
                          alt={release.imgAlt}
                        />
                      </div>
                    </div>
                  </Tilt>
                </div>
              </>
            ))}
          </div>
        </div>

        <HRSeparator className='my-24' />

        <div className='section-container md:px-8 2xl:px-0 '>
          <GetStartedFree href='https://clickhouse.cloud/signUp?loc=cloud-page-get-started-footer' />
        </div>

        <HRSeparator className='my-24' />

        <div className='bg-shadow-element yellow-shadow align-shadow-right mx-auto mb-40 max-w-7xl px-4 pb-10 sm:px-8 2xl:px-0'>
          <div className='relative z-20'>
            <h3 className='mb-10 font-basier text-4xl'>
              Upcoming community events
            </h3>
            <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {recentEvents.map((event: EventType) => (
                <EventPost key={event.id} {...event} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
