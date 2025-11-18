import releases from './releases.json'
import { CUIButton } from '@/components/ClickUI'
import EventPost from '@/components/EventPostList/EventPost'
import GetStartedFree from '@/components/GetStartedFree'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { eventsService, findOne, getUnlistedFilters } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryEvent } from '@/types/strapi'
import {
  ArrowCircleRightIcon,
  BookOpenIcon,
  CalendarIcon,
  DocumentTextIcon,
  PlayIcon
} from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Tilt from 'react-parallax-tilt'

interface PageProps extends CommonProps {
  recentEvents: Array<EntryEvent>
}

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

  const recentEvents = await eventsService.findMany({
    filters: {
      $and: [
        {
          localDatetime: {
            $gte: new Date().toISOString()
          }
        },
        {
          $or: getUnlistedFilters()
        }
      ]
    },
    sort: ['localDatetime:ASC'],
    pagination: { limit: 4 }
  })

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
}: PageProps) {
  useGalaxyOnPage('launchWeekMayPage')
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
            <div className='container mx-auto flex-col px-4 pb-16 pt-10 lg:w-1/2'>
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
                  href='https://console.clickhouse.cloud/signUp?loc=launch-week-may2024'
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
                  <div className='flex justify-start gap-4 pb-4 pt-4'>
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
                        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-semibold'>
                          Coming soon
                        </div>
                      )}
                      <div
                        className={`flex w-full justify-between gap-8 ${
                          release.blurred && 'pointer-events-none blur-xl'
                        }`}>
                        <div className='flex-col'>
                          <div className='flex flex-row align-middle'>
                            <h3 className='mb-1 text-lg font-semibold'>
                              {release.blurred ? 'Coming soon' : release.title}
                            </h3>
                            {['beta', 'preview'].includes(release.badge) && (
                              <div
                                className={`ml-4 mt-1 flex h-5 ${
                                  release.badge === 'beta' ? 'w-14' : 'w-32'
                                } rounded-full bg-primary-300 px-3 text-sm font-normal text-neutral-725`}>
                                {release.badge === 'beta'
                                  ? 'beta'
                                  : 'private preview'}
                              </div>
                            )}
                          </div>
                          <SuiText className='mb-6 max-w-2xl'>
                            {release.blurred
                              ? 'We’ll be rolling out a new ClickHouse Cloud feature every day 🚀. Mark your calendars – you won’t want to miss it! Each day, we’ll release a new ClickHouse Cloud feature with blogs, videos, and more. Be sure to keep tabs on our Launch page for the latest announcements.'
                              : release.summary}
                          </SuiText>

                          <div className='flex-col gap-6 md:flex md:flex-row'>
                            {!release.blurred && release.linkBlog && (
                              <Link
                                className='align-center flex gap-2 text-base-color opacity-80 transition-all hover:opacity-100'
                                href={release.linkBlog}>
                                <BookOpenIcon className='mt-1 h-4 w-4' />
                                <span>Read blog</span>
                              </Link>
                            )}
                            {!release.blurred && release.linkDocs && (
                              <Link
                                className='align-center flex gap-2 text-base-color opacity-80 transition-all hover:opacity-100'
                                href={release.linkDocs}>
                                <DocumentTextIcon className='mt-1 h-4 w-4' />
                                <span>Read docs</span>
                              </Link>
                            )}
                            {!release.blurred && release.linkVideo && (
                              <Link
                                className='align-center flex gap-2 text-base-color opacity-80 transition-all hover:opacity-100'
                                href={release.linkVideo}>
                                <PlayIcon className='mt-1 h-4 w-4' />
                                <span>Watch video</span>
                              </Link>
                            )}
                            {!release.blurred && release.linkStarted && (
                              <Link
                                className='align-center flex gap-2 text-base-color opacity-80 transition-all hover:opacity-100'
                                href={release.linkStarted}>
                                <ArrowCircleRightIcon className='mt-1 h-4 w-4' />
                                <span>Get started</span>
                              </Link>
                            )}
                          </div>
                        </div>
                        {!release.blurred ? (
                          <Image
                            className='mr-4 hidden md:flex'
                            src={release.imgSrc}
                            width='84'
                            height='84'
                            alt={release.imgAlt}
                          />
                        ) : (
                          <Image
                            className='mr-4 hidden md:flex'
                            src='/images/clickhouse-logomark-yellow.svg'
                            width='84'
                            height='84'
                            alt='ClickHouse Logo'
                          />
                        )}
                      </div>
                    </div>
                  </Tilt>
                </div>
              </>
            ))}
          </div>
        </div>

        <HRSeparator className='my-24' />

        <div className='section-container md:px-8 2xl:px-0'>
          <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=cloud-page-get-started-footer' />
        </div>

        <HRSeparator className='my-24' />

        {/* Recent posts */}
        {recentEvents.length > 0 && (
          <section className='section-container my-20 flex flex-col'>
            <div className='flex justify-between pb-8'>
              <SuiTitle
                type='h2'
                className='!text-3xl text-neutral-100'
                weight='semibold'>
                Upcoming community events
              </SuiTitle>

              <CUIButton href='/company/events' type='secondary'>
                View all Events
              </CUIButton>
            </div>
            <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {recentEvents.map((recentEvent, recentEventIndex) => {
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
    </>
  )
}
