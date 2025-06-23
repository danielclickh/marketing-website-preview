import iconCalendar from './assets/icon-calendar.svg'
import iconCareerAdvantage from './assets/icon-career-advantage.svg'
import iconContributors from './assets/icon-contributors.svg'
import iconDevelopers from './assets/icon-developers.svg'
import iconImprovedResults from './assets/icon-improved-results.svg'
import iconIndustryCredibility from './assets/icon-industry-credibility.svg'
import iconLiveTraining from './assets/icon-live-training.svg'
import iconMapPin from './assets/icon-map-pin.svg'
import iconOnDemand from './assets/icon-on-demand.svg'
import iconPrs from './assets/icon-prs.svg'
import iconStars from './assets/icon-stars.svg'
import iconTeamRecognition from './assets/icon-team-recognition.svg'
import videoThumbnail from './assets/video-thumbnail.png'
import AngledSection from '@/components-cleaned/AngledSection'
import LearningPathCard from '@/components-cleaned/LearningPathCard'
import YouTubeVideo from '@/components-cleaned/YouTubeVideo'
import { CUIButton } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { StrapiImageUrl } from '@/components/StrapiElements'
import TiltedText from '@/components/TiltedText'
import {
  SuiCodeblock,
  SuiSearchField,
  SuiText,
  SuiTitle
} from '@/components/sui'
import {
  findAll,
  findOne,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import {
  convertDateToString,
  convertTimeToString,
  startOfToday
} from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import formatStat from '@/lib/utils/numbers'
import { limitStringByWord, slugify } from '@/lib/utils/strings'
import { PAGES } from '@/pages/learn/[slug]'
import { LearnProps, TrainingSimpleEvent } from '@/types/learn'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, CSSProperties, useMemo, useState } from 'react'
import removeMarkdown from 'remove-markdown'

export const getStaticProps: GetStaticProps<LearnProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    const data = await findOne('homepage', {
      populate: [
        'customerStories',
        'customerStories.*',
        'customerStories.logos.*',
        'customerStories.logos.darkLogoPng'
      ]
    })

    let { data: events }: { data: Array<TrainingSimpleEvent> } = await findAll(
      'events',
      {
        filters: {
          $and: [
            {
              localDatetime: {
                $gte: startOfToday().toISOString()
              },
              category: {
                $in: ['Live Training', 'Free Training', 'Paid Training']
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
        populate: ['location']
      }
    )

    events = events.map((event) => {
      if (event.richDescription) {
        const stripped = removeMarkdown(event.richDescription)
        const regex =
          /(?:^times?\s*:\s*(.+)$)|(?:dates?\s*:\s*(?:.+)\sat\s(.+)$)/im

        const matches = stripped.match(regex)
        event.extractedTime = matches?.[1] || matches?.[2] || null
      }

      if (!event?.extractedTime) {
        event.extractedTime = convertTimeToString(event.localDatetime)
      }

      return event
    })

    return {
      props: {
        seo: {
          title:
            'ClickHouse Training | How to Use ClickHouse | Database Tutorial',
          description:
            'Master the art of data analysis with ClickHouse. Our seamless, easy to use database management platform can help you to unlock powerful insights. Try for free.',
          path: '/learn',
          imageUrl: 'https://clickhouse.com/images/clickhouse-learning-og.png'
        },
        events,
        ...data,
        ...commonProps
      }
    }
  }

export default function LearnPage({
  footerData,
  headerData,
  customerStories,
  events,
  seo
}: LearnProps) {
  useGalaxyOnPage('learnPage')

  const [eventsSearch, setEventsSearch] = useState('')

  const filteredEvents = useMemo(() => {
    const searchTerm = eventsSearch.trim().toLowerCase()

    if (!searchTerm.length) {
      return events
    }

    const includesSearch = (value: string | null) => {
      return (value || '')
        .trim()
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    }

    const todayStart = startOfToday()

    return events.filter((event) => {
      // Remove any event's that have passsed since the page was last built
      if (new Date(event.localDatetime) < todayStart) {
        return false
      }

      return (
        includesSearch(event.title) ||
        includesSearch(event.shortDescription) ||
        includesSearch(event.richDescription) ||
        includesSearch(event.location.city) ||
        includesSearch(event.location.country)
      )
    })
  }, [events, eventsSearch])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='bg-grid py-16 lg:py-24'>
        <div className='section-container flex flex-col items-center gap-16 lg:flex-row'>
          <div className='space-y-4 text-center lg:text-left'>
            <SuiTitle type='h1'>ClickHouse training</SuiTitle>
            <SuiText size='lg' className='text-neutral-200'>
              Master ClickHouse with expert-led training designed for every
              skill level and delivered through self-paced paths, live sessions,
              or certification.
            </SuiText>
            <div className='!my-8 flex flex-wrap justify-center gap-4 lg:justify-start'>
              <CUIButton
                href='/learn#on-demand'
                type='primary'
                size='lg'
                className='px-8'>
                On-demand training
              </CUIButton>
              <CUIButton
                href='/learn#live-training'
                type='secondary-dark'
                size='lg'
                className='px-8'>
                Live training
              </CUIButton>
            </div>
            <LinkWithArrow
              href='/learn/certification'
              className='font-bold text-primary-300 hover:underline'>
              Get ClickHouse Certified
            </LinkWithArrow>
          </div>
          <div className='w-full max-w-xl'>
            <YouTubeVideo
              id='V6C6zyR4rq0'
              thumbnail={videoThumbnail}
              playButtonEyebrow='New to ClickHouse?'
              playButtonLabel='Watch the introduction'
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className='bg-white/10 py-4 lg:py-7'>
        <div className='section-container'>
          <ul className='flex flex-wrap items-center justify-center gap-6 gap-y-4 font-bold lg:justify-between lg:text-xl'>
            <li className='flex items-center gap-2 lg:gap-4'>
              <Image
                src={iconDevelopers}
                alt='Developers'
                width={32}
                height={32}
                className='w-6 lg:w-8'
              />
              100k+ developers
            </li>
            <li className='flex items-center gap-2 lg:gap-4'>
              <Image
                src={iconStars}
                alt='Stars'
                width={32}
                height={32}
                className='w-6 lg:w-8'
              />
              {formatStat(headerData.github.stars)}+ GitHub stars
            </li>
            <li className='flex items-center gap-2 lg:gap-4'>
              <Image
                src={iconContributors}
                alt='Contributors'
                width={32}
                height={32}
                className='w-6 lg:w-8'
              />
              {formatStat(headerData.github.contributors)}+ contributors
            </li>
            <li className='flex items-center gap-2 lg:gap-4'>
              <Image
                src={iconPrs}
                alt='PRs'
                width={32}
                height={32}
                className='w-6 lg:w-8'
              />
              {formatStat(headerData.github.prs)}+ PRs
            </li>
          </ul>
        </div>
      </section>

      {/* On-demand */}
      <section
        id='on-demand'
        className='relative overflow-hidden py-16 lg:py-24'>
        <div
          className='bg-shadow-element yellow-shadow absolute inset-0 from-90% gradient-mask-to-b'
          style={
            {
              '--top-side': '50px',
              '--left-side': '80%',
              '--opacity': '0.05'
            } as CSSProperties
          }
        />
        <div
          className='bg-shadow-element red-shadow absolute inset-0 from-90% gradient-mask-to-b'
          style={
            {
              '--top-side': '70%',
              '--left-side': '20%',
              '--opacity': '0.05'
            } as CSSProperties
          }
        />
        <div className='section-container space-y-12'>
          <div className='mx-auto max-w-xl space-y-4 text-center'>
            <Image
              src={iconOnDemand}
              width={72}
              height={72}
              alt='On demand'
              className='inline-block'
            />
            <SuiTitle type='h2'>Choose a learning path</SuiTitle>
            <SuiText className='opacity-70'>
              Build real-world skills with curated learning paths aligned to
              your goals. Self-paced and beginner-friendly.
            </SuiText>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-4 xl:gap-8'>
            {PAGES.map((path, pathIndex) => {
              return (
                <LearningPathCard
                  key={pathIndex}
                  icon={path.icon}
                  title={path.title}
                  description={path.intro}
                  href={`/learn/${path.slug}`}
                  duration={path.duration}
                  modules={path.modules}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Live training */}
      <AngledSection topDirection='down' className='text-primary-300'>
        <section
          id='live-training'
          className='bg-primary-300 py-16 text-neutral-950 lg:py-24'>
          <div className='section-container space-y-12'>
            <div className='mx-auto max-w-xl space-y-4 text-center'>
              <Image
                src={iconLiveTraining}
                width={72}
                height={72}
                alt='Live training'
                className='inline-block'
              />
              <SuiTitle type='h2'>Instructor-led training</SuiTitle>
              <SuiText className='opacity-70'>
                Join live, instructor-led sessions led by our head of training,
                Rich Raposa, and supported by ClickHouse engineers. Get hands-on
                with real labs, ask questions in real time, and build the skills
                you need.
              </SuiText>
            </div>
            <div className='rounded-xl border border-neutral-600 bg-neutral-900/80 p-4 text-white'>
              <div className='mb-4 flex flex-col items-center gap-y-4 md:flex-row'>
                <SuiTitle type='h3'>Upcoming live training</SuiTitle>
                <SuiSearchField
                  placeholder='Search live training...'
                  htmlFor='search'
                  className='ml-auto w-full md:max-w-sm'
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEventsSearch(event.target.value)
                  }}
                />
              </div>
              <div>
                {filteredEvents.length > 0 ? (
                  <ul className='grid grid-cols-2 space-y-2 lg:grid-cols-10'>
                    {filteredEvents.map((event, eventIndex) => {
                      return (
                        <li
                          key={eventIndex}
                          className='relative col-span-full grid grid-cols-subgrid gap-y-2 rounded bg-neutral-900/30 px-4 py-2'>
                          <div className='col-span-full flex lg:col-span-6'>
                            <Link
                              href={`/company/events/${event.slug}`}
                              className='my-auto font-bold text-primary-300 hover:underline'>
                              <span className='absolute inset-0' />
                              {event.title}
                            </Link>
                          </div>
                          <span className='flex items-center gap-2 text-sm text-neutral-200 lg:col-span-2'>
                            <Image
                              src={iconCalendar}
                              width={20}
                              height={20}
                              alt='Datetime'
                              className='flex-shrink-0 flex-grow-0'
                            />
                            <span className='leading-tight'>
                              {convertDateToString(event.localDatetime)}
                              <br />
                              <small className='opacity-70'>
                                {event.extractedTime}
                              </small>
                            </span>
                          </span>
                          <span className='flex items-center gap-2 text-sm text-neutral-200 lg:col-span-2'>
                            <Image
                              src={iconMapPin}
                              width={20}
                              height={20}
                              alt='Location'
                              className='flex-shrink-0 flex-grow-0'
                            />
                            {event.location.city} ({event.location.country})
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div className='py-16 text-center lg:py-24'>
                    {eventsSearch && eventsSearch.length > 0 ? (
                      <p className='text-xl font-bold'>
                        No search results for "
                        {limitStringByWord(eventsSearch, 20, '...')}"
                      </p>
                    ) : (
                      <>
                        <p className='mb-4 text-xl font-bold'>
                          We don’t have any live training at the moment
                        </p>
                        <p>
                          Check back soon or explore our{' '}
                          <Link
                            href='#on-demand'
                            className='text-primary-300 hover:underline'>
                            on-demand
                          </Link>{' '}
                          learning resources in the meantime.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </AngledSection>

      {/* Certification */}
      <AngledSection
        topDirection='down'
        className='bg-primary-300 text-neutral-600'>
        <section id='certification' className='bg-neutral-600 py-24 text-white'>
          <div className='section-container space-y-12'>
            <div className='mx-auto max-w-xl space-y-4 text-center'>
              <SuiTitle type='h2'>Get ClickHouse Certified</SuiTitle>
              <SuiText>
                Become a recognized ClickHouse expert by validating your skills
                with our official ClickHouse Certification.
              </SuiText>
            </div>
            <ul className='mx-auto flex max-w-6xl flex-wrap justify-center gap-6'>
              {(
                [
                  {
                    title: 'Career advantage',
                    description: 'Showcase your capabilities',
                    icon: iconCareerAdvantage
                  },
                  {
                    title: 'Industry credibility',
                    description: 'Skills that translate to real-world impact',
                    icon: iconIndustryCredibility
                  },
                  {
                    title: 'Improved results',
                    description: 'Unlock the full potential of ClickHouse',
                    icon: iconImprovedResults
                  },
                  {
                    title: 'Team recognition',
                    description: 'Stand out as the go-to ClickHouse expert',
                    icon: iconTeamRecognition
                  }
                ] satisfies Array<{
                  title: string
                  description: string
                  icon: ImageProps['src']
                }>
              ).map((item, itemIndex) => {
                return (
                  <li
                    key={itemIndex}
                    className='flex w-full max-w-sm rounded border border-white'>
                    <span className='flex flex-shrink-0 flex-grow-0 items-center justify-center bg-white px-5 text-neutral-950'>
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={25}
                        className='aspect-square w-6 object-contain object-center'
                      />
                    </span>
                    <span className='flex flex-1 flex-col px-5 py-2'>
                      <span className='font-bold'>{item.title}</span>
                      <span className='text-sm'>{item.description}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className='text-center'>
              <CUIButton
                type='primary'
                className='inline-block px-8'
                size='lg'
                href='/learn/certification'>
                View certification guide
              </CUIButton>
            </div>
          </div>
        </section>
      </AngledSection>

      {/* Get started */}
      <section
        className='bg-shadow-element yellow-shadow overflow-hidden bg-grid py-32'
        style={
          {
            '--top-side': '0',
            '--left-side': '50%',
            '--scale': '0.75',
            '--opacity': '0.05'
          } as CSSProperties
        }>
        <div className='section-container space-y-12'>
          <div className='space-y-8 text-center'>
            <SuiTitle type='h2'>
              Start using{' '}
              <TiltedText type='black-on-yellow' className='px-2 py-1'>
                ClickHouse
              </TiltedText>{' '}
              in minutes
            </SuiTitle>
            <SuiText className='opacity-70'>
              Install ClickHouse for macOS, Linux, and FreeBSD
            </SuiText>
          </div>
          <SuiCodeblock
            showCopy={true}
            copyValue='curl https://clickhouse.com/ | sh'
            className='mx-auto flex w-max items-center gap-3 pr-24'>
            <span className='text-primary'>$</span>
            <span>curl https://clickhouse.com/ | sh</span>
          </SuiCodeblock>
        </div>
      </section>

      {/* Trusted by */}
      <section className='bg-primary-300 py-20 text-neutral-950'>
        <div className='section-container'>
          <SuiTitle type='h3' className='mb-10 text-center'>
            Trusted by the best developers that work with data{' '}
            <TiltedText type='white-on-black' className='px-1 py-0.5'>
              at scale
            </TiltedText>
          </SuiTitle>
          <div className='mask-logos-carousel opacity-90 brightness-50 grayscale'>
            <div className='pause-hover hide-scrollbar relative flex overflow-hidden'>
              <div className='flex animate-marqueeLeft5 items-center whitespace-nowrap'>
                {customerStories.logos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='w-max flex-shrink-0 flex-grow-0 px-6'>
                      <StrapiImageUrl {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
              <div className='flex animate-marqueeLeft5 items-center whitespace-nowrap'>
                {customerStories.logos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='w-max flex-shrink-0 flex-grow-0 px-6'>
                      <StrapiImageUrl {...logo.darkLogoPng} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
