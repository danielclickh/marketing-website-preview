import heroGradientBottom from './assets/hero-gradient-bottom.png'
import heroGradientTop from './assets/hero-gradient-top.png'
import linesPattern from './assets/lines-pattern.svg'
import logo from './assets/logo.svg'
import photoTexture from './assets/photo-texture.svg'
import styles from './styles.module.scss'
import { OpenhouseDayAgenda, OpenhouseEntry, OpenhouseLogo } from './types'
import ContentTicker from '@/components-cleaned/ContentTicker'
import CopyUrlButton from '@/components/CopyUrlButton'
import FitText from '@/components/FitText'
import FontSohne from '@/components/FontSohne'
import FontSohneBreit from '@/components/FontSohneBreit'
import Footer from '@/components/Footer'
import MarketoForm from '@/components/MarketoForm'
import Parallax from '@/components/Parallax'
import SeoContainer from '@/components/SeoContainer'
import SocialButton from '@/components/SocialButton'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { useClickOutside } from '@/hooks'
import { fetchAll, findAll, getProxiedMediaUrl } from '@/lib/api/strapi'
import { shuffleArraySeeded } from '@/lib/utils/arrays'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { getOrdinal } from '@/lib/utils/numbers'
import { CommonProps, ParamsType } from '@/types/homepage'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export type RoadshowProps = CommonProps & OpenhouseEntry

const logoColSpanToTailwind: Record<number, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12'
}

const logoWidthToColSpan: Record<OpenhouseLogo['width'], number> = {
  'Small (1/4)': 3,
  'Medium (1/3)': 4,
  'Large (1/2)': 6,
  'Full (1/1)': 12
}

export const getStaticProps: GetStaticProps<RoadshowProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType
    const commonProps = await getCommonProps()

    const { data } = await findAll('openhouses', {
      filters: {
        slug: {
          $eq: slug
        }
      },
      populate: [
        'gallery',
        'cards',
        'cards.icon',
        'days',
        'days.agenda',
        'days.agenda.speakers',
        'days.agenda.speakers.headshot',
        'days.agenda.speakers.logo',
        'featuredSpeakers',
        'featuredSpeakers.headshot',
        'featuredSpeakers.logo',
        'speakers',
        'speakers.headshot',
        'speakers.logo',
        'locationImage',
        'faqs',
        'logos',
        'logos.logo'
      ],
      pagination: { limit: 1 }
    })

    const page = data?.[0] as null | OpenhouseEntry

    if (!page) {
      return {
        notFound: true
      }
    }

    const startDateObject = new Date(page.startDate)

    return {
      props: {
        ...page,
        seo: {
          title: `Open House ${startDateObject.getFullYear()}, The ClickHouse User Conference - ${page.heading.replaceAll(`\n`, ', ')}.`,
          path: `/openhouse/${page.slug}`,
          image: [{ url: '/images/social-open-house.png' }]
        },
        ...commonProps
      }
    }
  }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const data: Array<Pick<OpenhouseEntry, 'slug'>> = await fetchAll(
    'openhouses',
    {
      fields: ['slug']
    }
  )

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
  footerData,
  seo,
  slug,
  heading,
  strapline,
  startDate,
  endDate,
  applyToSpeakLink,
  gallery,
  cards,
  days,
  featuredSpeakers,
  speakers,
  locationAddress,
  locationImage,
  faqs,
  logos,
  marketoFormId
}: RoadshowProps) {
  const router = useRouter()
  const nowDateObject = new Date()
  const startDateObject = new Date(startDate)
  const endDateObject = new Date(endDate)

  // Add's scroll offset to <html> tag
  useEffect(() => {
    document.documentElement.classList.add('scroll-pt-32')
  }, [])

  const speakersToggleRef = useRef<HTMLDivElement | null>(null)
  const [displayAllSpeakers, setDisplayAllSpeakers] = useState(false)

  const hasFeaturedSpeakers = featuredSpeakers.length > 0

  const logoSpans = logos.map((logo) => logoWidthToColSpan[logo.width])
  const totalLogoSpans = logoSpans.reduce((a, b) => a + b, 0)
  const logoFillerSpan = Math.ceil(totalLogoSpans / 12) * 12 - totalLogoSpans

  const scrollToSpeakersToggle = useCallback(() => {
    const speakersToggle = speakersToggleRef.current
    if (speakersToggle && displayAllSpeakers) {
      const timer = window.setTimeout(() => {
        const boundingRect = speakersToggle.getBoundingClientRect()
        const isInView =
          boundingRect.top >= 0 &&
          boundingRect.left >= 0 &&
          boundingRect.bottom <= window.innerHeight &&
          boundingRect.right <= window.innerWidth

        // Only scroll into view if it's not already in view
        if (!isInView) {
          speakersToggle.scrollIntoView({
            block: 'center'
          })
        }
      }, 100)

      return () => window.clearTimeout(timer)
    }
  }, [speakersToggleRef, displayAllSpeakers])

  const registrationIsOpen =
    startDateObject > nowDateObject && endDateObject > nowDateObject

  const formModalRef = useRef<HTMLDivElement | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  useClickOutside(formModalRef, () => {
    setFormOpen(false)
  })

  useEffect(() => {
    const onHashChangeStart = (path: string) => {
      const url = new URL(path, window.location.toString())
      setFormOpen(url.hash === '#register')
    }

    router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [router.events])

  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <FontSohne className='flex flex-col gap-4 bg-black tracking-wider text-white selection:bg-ch-yellow'>
        <Header
          agenda={days.length > 0}
          speakers={speakers.length > 0}
          faqs={faqs.length > 0}
          register={registrationIsOpen}
          applyToSpeak={applyToSpeakLink}
        />

        <div
          className={`fixed inset-0 z-[9999] overflow-y-auto sm:p-6 ${styles.modalBackground} ${formOpen ? 'block' : 'hidden'}`}>
          <div
            className='mx-auto min-h-dvh max-w-2xl bg-white p-6 text-black sm:min-h-0'
            ref={formModalRef}>
            {!formSuccess && (
              <>
                <div className='mb-6 flex items-center justify-between'>
                  <FontSohneBreit className='flex-1 text-3xl font-black'>
                    Get your ticket
                  </FontSohneBreit>

                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      setFormOpen(false)
                    }}
                    className='flex aspect-square w-8 flex-shrink-0 flex-grow-0 items-center justify-center gap-1 text-center text-neutral-500 transition-colors hover:bg-neutral-400/10'>
                    <X height={24} />
                    <span className='sr-only'>Close</span>
                  </button>
                </div>
                <MarketoForm
                  theme='light'
                  formId={marketoFormId}
                  clearbitTracking={true}
                  onLoad={() => setFormLoaded(true)}
                  onSuccess={() => {
                    setFormSuccess(true)
                    return false // Stops page from reloading
                  }}
                  disclaimer={
                    <>
                      By registering, you acknowledge that ClickHouse will
                      process your personal information in accordance with our{' '}
                      <Link href='/legal/privacy-policy' className='underline'>
                        Privacy Policy
                      </Link>
                      .
                    </>
                  }
                />
              </>
            )}
            {!formLoaded && (
              <div className='mb-12 mt-10 text-center'>Loading form...</div>
            )}

            {formSuccess && (
              <div className='my-auto flex flex-col items-center py-6 text-center lg:py-10'>
                <svg
                  width='48'
                  height='48'
                  viewBox='0 0 48 48'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M24 48.0091V48.0091C10.744 48.0091 0 37.2651 0 24.0091V24.0091C0 10.7531 10.744 0.00909424 24 0.00909424V0.00909424C37.256 0.00909424 48 10.7531 48 24.0091V24.0091C48 37.2651 37.256 48.0091 24 48.0091Z'
                    fill='#EBFF00'
                  />
                  <path
                    d='M34.6666 18.6758L21.3333 32.0091L13.3333 24.0091'
                    stroke='black'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='mt-6 text-xl font-bold'>
                  Thanks for your interest in OpenHouse.
                  <br />
                  Check your email for next steps.
                </p>
                <p className='mb-3 mt-12 text-center font-bold text-neutral-400'>
                  Share this event
                </p>
                <div className='flex flex-wrap justify-center gap-2 text-neutral-0'>
                  <CopyUrlButton className='aspect-square w-11 !rounded-none !p-0 !shadow-none hover:!bg-ch-yellow' />
                  {['y_combinator', 'twitter', 'facebook', 'linkedin'].map(
                    (social) => (
                      <SocialButton
                        className='aspect-square w-11 !rounded-none !p-0 !shadow-none hover:!bg-ch-yellow'
                        key={social}
                        type={social}
                        title='Open House by ClickHouse'
                      />
                    )
                  )}
                </div>
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    setFormOpen(false)
                  }}
                  className='mt-12 flex items-center gap-1 border border-neutral-400 py-1 pl-1 pr-3 text-center text-neutral-500 transition-colors hover:bg-neutral-400/10'>
                  <X height={16} />
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hero */}
        <section className='relative h-dvh max-h-[600px] min-h-[450px] overflow-hidden lg:max-h-[900px] lg:min-h-[600px]'>
          <div
            className='absolute inset-x-0 bottom-0 z-10 h-72 bg-contain lg:h-96'
            style={{ backgroundImage: `url(${heroGradientBottom.src})` }}
          />
          {/* Hero images */}
          <Parallax
            speed={3}
            className='absolute inset-0 z-0 flex flex-col gap-1.5'>
            <ContentTicker
              gap='0.375rem'
              pixelsPerSecond={20}
              direction='ltr'
              className='-translate-y-16 lg:-translate-y-28'
              pause={formOpen}>
              {shuffleArraySeeded(gallery, 2 + gallery.length).map(
                (item, itemIndex) => {
                  return item.mime.startsWith('video/') ? (
                    <video
                      src={getProxiedMediaUrl(item.url)}
                      autoPlay={true}
                      muted={true}
                      loop={true}
                      controls={false}
                      className='h-full max-h-44 w-auto max-w-none lg:max-h-72'
                    />
                  ) : (
                    <StrapiImageUrl
                      key={itemIndex}
                      {...item}
                      height={176}
                      width={704}
                      unoptimized={false}
                      priority={true}
                      loading='eager'
                      className='h-full max-h-44 w-auto max-w-none lg:max-h-72'
                    />
                  )
                }
              )}
            </ContentTicker>
            <ContentTicker
              gap='0.375rem'
              pixelsPerSecond={15}
              className='-translate-y-16 lg:-translate-y-28'
              pause={formOpen}>
              {gallery.map((item, itemIndex) => {
                return item.mime.startsWith('video/') ? (
                  <video
                    src={getProxiedMediaUrl(item.url)}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    controls={false}
                    className='h-full max-h-44 w-auto max-w-none lg:max-h-72'
                  />
                ) : (
                  <StrapiImageUrl
                    key={itemIndex}
                    {...item}
                    height={176}
                    width={704}
                    unoptimized={false}
                    priority={true}
                    loading='eager'
                    className='h-full max-h-44 w-auto max-w-none lg:max-h-72'
                  />
                )
              })}
            </ContentTicker>
            <ContentTicker
              gap='0.375rem'
              pixelsPerSecond={12}
              direction='ltr'
              className='-translate-y-16 lg:-translate-y-28'
              pause={formOpen}>
              {shuffleArraySeeded(gallery, 3 + gallery.length).map(
                (item, itemIndex) => {
                  return item.mime.startsWith('video/') ? (
                    <video
                      src={getProxiedMediaUrl(item.url)}
                      autoPlay={true}
                      muted={true}
                      loop={true}
                      controls={false}
                      className='h-full max-h-44 w-auto max-w-none lg:max-h-72'
                    />
                  ) : (
                    <StrapiImageUrl
                      key={itemIndex}
                      {...item}
                      height={176}
                      width={704}
                      unoptimized={false}
                      priority={true}
                      loading='eager'
                      className='h-full max-h-44 w-auto max-w-none lg:max-h-72'
                    />
                  )
                }
              )}
            </ContentTicker>
          </Parallax>

          {/* Hero content */}
          <div className='relative z-20 flex h-full items-end pb-8'>
            <div className='section-container w-full items-end justify-between md:flex'>
              <h1 className='flex flex-col uppercase'>
                <span className='text-xl font-extrabold leading-none lg:text-[1.75rem]'>
                  Free conference in
                </span>
                {heading.split(`\n`).map((item, itemIndex) => {
                  return (
                    <FontSohneBreit
                      as='span'
                      key={itemIndex}
                      className='text-4xl font-black leading-none text-ch-yellow lg:text-[4rem]'>
                      {item}
                    </FontSohneBreit>
                  )
                })}
              </h1>
              <h2 className='flex flex-col text-xl font-black uppercase leading-none md:text-right md:text-[1.75rem]'>
                <span className='text-white md:text-ch-yellow'>
                  {formateHeroDate(startDateObject, endDateObject)}
                  <span className='hidden md:inline'>.</span>
                </span>
                {strapline.split(`\n`).map((item, itemIndex) => {
                  return (
                    <span key={itemIndex} className='hidden md:inline'>
                      {item}
                    </span>
                  )
                })}
              </h2>
            </div>
          </div>
        </section>

        {/* Cards */}
        {cards.length > 0 && (
          <section className='section-container'>
            <div className='-m-2 flex flex-col md:flex-row md:flex-wrap'>
              {cards.map((card, cardIndex) => {
                return (
                  <div
                    key={cardIndex}
                    className='relative w-full p-2 md:w-1/2 lg:w-1/4'>
                    <div className='min-h-full space-y-4 bg-white p-4 pt-6 text-black lg:space-y-6 lg:p-6'>
                      <StrapiImageUrl
                        {...card.icon}
                        className='h-11 w-11 object-scale-down object-left-top'
                      />
                      <FontSohneBreit as='h3' className='text-2xl font-black'>
                        {card.title}
                      </FontSohneBreit>
                      <p className='text-sm leading-loose'>{card.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Agenda */}
        {days.length > 0 && (
          <section id='agenda' className='section-container w-full space-y-4'>
            {days.map((day, dayIndex) => {
              const dayDateObject = new Date(day.date)
              return (
                <div
                  key={dayIndex}
                  className='border border-white lg:grid lg:grid-cols-[13rem_1fr]'>
                  <div
                    className='px-8 py-6 text-center uppercase leading-none text-ch-yellow lg:px-4 lg:py-12'
                    style={{
                      backgroundImage: `url('${linesPattern.src}')`
                    }}>
                    <FitText
                      minFontSize={16}
                      maxFontSize={55}
                      className='font-black'>
                      {getOrdinal(dayDateObject.getDate())}
                    </FitText>
                    <FitText
                      minFontSize={16}
                      maxFontSize={72}
                      className='font-bold'>
                      {dayDateObject.toLocaleString('en-US', {
                        month: 'long'
                      })}
                    </FitText>
                  </div>
                  <OpenhouseMarkdown className='border-t border-white p-4 pt-3 lg:border-l lg:border-t-0 lg:p-6 lg:pt-5'>
                    {day.description}
                  </OpenhouseMarkdown>
                  {day.agenda.length > 0 && (
                    <>
                      <div className='hidden border-t border-white lg:block' />
                      <ol className='border-white lg:border-l'>
                        {day.agenda.map((agenda, agendaIndex) => {
                          const isDivider =
                            !agenda.time &&
                            !agenda.description &&
                            !agenda.speakers.length
                          return (
                            <li
                              key={agendaIndex}
                              className={`border-t border-white px-6 py-2 ${isDivider ? 'bg-white/10' : ''}`}>
                              {isDivider && (
                                <span className='text-sm opacity-70'>
                                  {agenda.title}
                                </span>
                              )}
                              {!isDivider && !agenda.description && (
                                <AgendaHandle agenda={agenda} />
                              )}
                              {!isDivider && agenda.description && (
                                <RiggedAccordion
                                  handle={<AgendaHandle agenda={agenda} />}
                                  classNames={{
                                    container: '-mx-6 -my-2',
                                    handle:
                                      'px-4 lg:px-6 py-2 text-left transition-colors hover:bg-white/10',
                                    body: 'px-4 lg:px-6 pb-4 pt-2'
                                  }}>
                                  <OpenhouseMarkdown>
                                    {agenda.description}
                                  </OpenhouseMarkdown>
                                </RiggedAccordion>
                              )}
                            </li>
                          )
                        })}
                      </ol>
                    </>
                  )}
                </div>
              )
            })}
          </section>
        )}

        <div className='space-y-4 bg-white py-4 text-black lg:mt-12 lg:space-y-16 lg:py-16'>
          {/* Speakers */}
          {(featuredSpeakers.length > 0 || speakers.length > 0) && (
            <section id='speakers' className='section-container'>
              <div className='p-px'>
                <div className='flex items-center bg-white p-4 pt-3 ring-1 ring-black lg:p-6 lg:pt-5'>
                  <OpenhouseMarkdown className='flex-1'>
                    {`## Speakers 
Our lineup is stacked with engineers, founders, and operators changing the game with data`}
                  </OpenhouseMarkdown>
                  {applyToSpeakLink && (
                    <Link
                      href={applyToSpeakLink}
                      target='_blank'
                      className='mr-2 hidden bg-black px-4 py-2 font-medium uppercase leading-normal text-white hover:underline lg:inline-block'>
                      Apply to speak
                    </Link>
                  )}
                </div>
                {featuredSpeakers.length > 0 && (
                  <div className='grid grid-cols-6 gap-px md-mid:grid-cols-12'>
                    {featuredSpeakers.map((speaker, speakerIndex) => {
                      return (
                        <div
                          key={speakerIndex}
                          className='group/speaker col-span-3 bg-white ring-1 ring-black md-mid:col-span-6 lg:grid lg:grid-cols-subgrid'>
                          <div className='relative bg-neutral-50 ring-1 ring-black lg:col-span-2'>
                            <div
                              className='absolute inset-0 z-10 opacity-55 mix-blend-screen'
                              style={{
                                backgroundImage: `url('${photoTexture.src}')`
                              }}
                            />
                            <StrapiImageUrl
                              {...speaker.headshot}
                              width={400}
                              height={400}
                              unoptimized={false}
                              className='aspect-square object-cover grayscale transition group-hover/speaker:grayscale-0'
                            />
                          </div>
                          <div className='col-span-4 flex flex-col p-3 pt-2 lg:p-6 lg:pt-5'>
                            <FontSohneBreit
                              as='h3'
                              className='font-black lg:text-xl'>
                              {speaker.name}
                            </FontSohneBreit>
                            <p className='text-sm opacity-70 lg:text-base'>
                              {speaker.title}
                            </p>
                            {speaker.logo && (
                              <StrapiImageUrl
                                {...speaker.logo}
                                className='mt-auto hidden lg:inline-block'
                              />
                            )}
                          </div>
                        </div>
                      )
                    })}
                    {Array(2 - (featuredSpeakers.length % 2))
                      .fill(null)
                      .map((value, fillerIndex) => {
                        return (
                          <div
                            key={featuredSpeakers.length - 1 + fillerIndex}
                            className='col-span-6 hidden ring-1 ring-black md-mid:block'
                          />
                        )
                      })}
                  </div>
                )}

                {speakers.length > 0 && (
                  <div className='relative grid grid-cols-2 gap-px sm:grid-cols-3 md-mid:grid-cols-4 lg:grid-cols-6'>
                    {(!hasFeaturedSpeakers || displayAllSpeakers) &&
                      speakers.map((speaker, speakerIndex) => {
                        return (
                          <div
                            key={speakerIndex}
                            className='group/speaker flex flex-col overflow-hidden bg-white ring-1 ring-black'>
                            <div className='relative bg-neutral-50 ring-1 ring-black'>
                              <div
                                className='absolute inset-0 z-10 opacity-55 mix-blend-screen'
                                style={{
                                  backgroundImage: `url('${photoTexture.src}')`
                                }}
                              />
                              <StrapiImageUrl
                                {...speaker.headshot}
                                width={400}
                                height={400}
                                unoptimized={false}
                                className='aspect-square object-cover grayscale transition group-hover/speaker:grayscale-0'
                              />
                            </div>
                            <div className='flex flex-col p-3 pt-2 lg:p-4 lg:pt-3'>
                              <FontSohneBreit
                                as='h3'
                                className='font-black lg:text-xl'>
                                <SpeakerName name={speaker.name} />
                              </FontSohneBreit>
                              <p className='text-sm opacity-70 lg:text-base'>
                                {speaker.title}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    {(!hasFeaturedSpeakers || displayAllSpeakers) &&
                      Array(6 - (speakers.length % 6))
                        .fill(null)
                        .map((value, fillerIndex) => {
                          return (
                            <div
                              key={speakers.length - 1 + fillerIndex}
                              className='bg-white ring-1 ring-black'
                            />
                          )
                        })}

                    {hasFeaturedSpeakers && (
                      <div
                        ref={speakersToggleRef}
                        className='sticky bottom-0 z-40 col-span-full text-center ring-1 ring-black sm:relative'>
                        <button
                          onClick={(event) => {
                            event.preventDefault()
                            setDisplayAllSpeakers((old) => !old)
                            scrollToSpeakersToggle()
                          }}
                          className='flex w-full items-center justify-center gap-4 bg-black px-4 py-3 font-medium uppercase leading-normal text-white hover:underline'>
                          {!displayAllSpeakers && 'View all speakers'}
                          {displayAllSpeakers && 'Collapse all speakers'}
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='13'
                            height='13'
                            fill='none'
                            className={displayAllSpeakers ? '-rotate-90' : ''}>
                            <path
                              fill='currentColor'
                              d='M10.4 9V.4h2v12H.4v-2H9l-9-9L1.4 0l9 9Z'
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Location */}
          <section id='location' className='section-container'>
            <div className='flex flex-col-reverse border border-black lg:grid lg:grid-cols-3'>
              <div className='flex flex-col justify-center space-y-6 border-inherit p-6 lg:border-r lg:p-16'>
                <OpenhouseMarkdown>
                  {`## ${heading.replaceAll(`\n`, ', ')}\n${locationAddress.replaceAll(`\n`, '  \n')}`}
                </OpenhouseMarkdown>
                {registrationIsOpen && (
                  <p>
                    <Link
                      href='#register'
                      className='inline-block bg-ch-yellow px-4 py-2 font-medium uppercase leading-normal text-black hover:underline'>
                      Get your ticket
                    </Link>
                  </p>
                )}
              </div>
              <StrapiImageUrl {...locationImage} className='col-span-2' />
            </div>
          </section>

          {/* FAQs */}
          {faqs.length > 0 && (
            <section id='faqs' className='section-container !mt-0'>
              <div className='bg-black text-white'>
                <OpenhouseMarkdown className='p-4 pt-3 lg:p-6 lg:pt-5'>
                  {`## FAQs 
For questions about the event or general inquiries, please reach out to [openhouse@clickhouse.com](mailto:openhouse@clickhouse.com)`}
                </OpenhouseMarkdown>
                <ul>
                  {faqs.length > 0 &&
                    faqs.map((faq, faqIndex) => {
                      return (
                        <li key={faqIndex} className='border-t border-white'>
                          <RiggedAccordion
                            handle={faq.question}
                            classNames={{
                              handle:
                                'text-left px-4 lg:px-6 py-3 transition-colors hover:bg-white/10',
                              body: 'px-4 lg:px-6 pb-4 pt-0'
                            }}>
                            <OpenhouseMarkdown className='text-neutral-200'>
                              {faq.answer}
                            </OpenhouseMarkdown>
                          </RiggedAccordion>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </section>
          )}

          {/* Logo wall */}
          {logos.length > 0 && (
            <section id='logos' className='section-container'>
              <div className='grid grid-cols-1 md:grid-cols-12'>
                {logos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className={`flex items-center justify-center bg-white px-2 py-6 ring-1 ring-gray-200 ${logoColSpanToTailwind[logoWidthToColSpan[logo.width]]}`}>
                      <StrapiImageUrl
                        {...logo.logo}
                        className='h-12 w-full max-w-48 object-scale-down object-center'
                      />
                    </div>
                  )
                })}
                {logoFillerSpan > 0 && (
                  <div
                    className={`hidden bg-white ring-1 ring-gray-200 md:block ${logoColSpanToTailwind[logoFillerSpan]}`}
                  />
                )}
              </div>
            </section>
          )}
        </div>
      </FontSohne>
      <Footer {...footerData} />
    </>
  )
}

function Header({
  agenda,
  speakers,
  faqs,
  register,
  applyToSpeak
}: {
  agenda: boolean
  speakers: boolean
  faqs: boolean
  register: boolean
  applyToSpeak: null | string
}) {
  return (
    <header className='fixed inset-x-0 top-0 z-50 py-4 md:py-9'>
      <div
        className='absolute inset-x-0 top-0 z-0 h-24 bg-contain md:h-32'
        style={{ backgroundImage: `url(${heroGradientTop.src})` }}
      />
      <Image
        src={logo}
        width={230}
        height={49}
        alt='Open House by ClickHouse'
        className='absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block'
      />
      <div className='section-container relative z-10 flex items-center justify-between lg:block'>
        <Image
          src={logo}
          width={230}
          height={49}
          alt='Open House by ClickHouse'
          className='w-full max-w-44 flex-shrink flex-grow-0 lg:hidden'
        />
        <nav className='flex-shrink-0'>
          <ul className='flex items-center gap-6 font-medium uppercase leading-loose tracking-wider'>
            {agenda && (
              <li className='hidden lg:block'>
                <Link href='#agenda' className='underline hover:text-ch-yellow'>
                  Agenda
                </Link>
              </li>
            )}
            {speakers && (
              <li className='hidden lg:block'>
                <Link
                  href='#speakers'
                  className='underline hover:text-ch-yellow'>
                  Speakers
                </Link>
              </li>
            )}
            {faqs && (
              <li className='hidden lg:block'>
                <Link href='#faqs' className='underline hover:text-ch-yellow'>
                  FAQ
                </Link>
              </li>
            )}
            <li className='mx-auto hidden lg:block' />
            {applyToSpeak && (
              <li className='hidden lg:block'>
                <Link
                  href={applyToSpeak}
                  target='_blank'
                  className='underline hover:text-ch-yellow'>
                  Apply to speak
                </Link>
              </li>
            )}
            <li>
              <Link
                href={register ? '#register' : '/company/contact'}
                className='inline-block bg-ch-yellow px-4 py-2 font-medium uppercase leading-normal text-black hover:underline'>
                {register ? 'Register' : 'Get in touch'}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function OpenhouseMarkdown({
  children,
  className = ''
}: {
  children: string
  className?: string
}) {
  return (
    <div className={`space-y-6 ${className}`}>
      <ReactMarkdown
        components={{
          h1({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h1'
                className={`!-mb-6 text-4xl font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h2({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h2'
                className={`!-mb-6 text-2xl font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h3({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h3'
                className={`!-mb-6 text-xl font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h4({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h4'
                className={`!-mb-6 text-lg font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h5({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h5'
                className={`!-mb-6 text-base font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h6({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h6'
                className={`!-mb-6 text-sm font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          p({ node, children, className = '', ...props }) {
            return (
              <p className={`${className}`} {...props}>
                {children}
              </p>
            )
          },
          ul({ node, children, className = '', ...props }) {
            return (
              <ul
                className={`list-disc space-y-3 pl-5 ${className}`}
                {...props}>
                {children}
              </ul>
            )
          },
          ol({ node, children, className = '', ...props }) {
            return (
              <ol
                className={`list-decimal space-y-3 pl-5 ${className}`}
                {...props}>
                {children}
              </ol>
            )
          },
          li({ node, children, className = '', ...props }) {
            return (
              <li className={`${className}`} {...props}>
                {children}
              </li>
            )
          },
          a({ node, children, className = '', ...props }) {
            return (
              <a className={`underline ${className}`} {...props}>
                {children}
              </a>
            )
          }
        }}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

function formateHeroDate(start: Date, end: Date) {
  const startDay = start.toLocaleString('en-US', {
    day: 'numeric'
  })
  const endDay = end.toLocaleString('en-US', {
    day: 'numeric'
  })
  const startMonth = start.toLocaleString('en-US', {
    month: 'short'
  })
  const endMonth = end.toLocaleString('en-US', {
    month: 'short'
  })
  const startYear = start.toLocaleString('en-US', {
    year: 'numeric'
  })
  const endYear = end.toLocaleString('en-US', {
    year: 'numeric'
  })

  if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay} ${startYear}`
  }

  if (startDay !== endDay && startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay}-${endDay} ${startYear}`
  }

  if (startDay !== endDay && startMonth !== endMonth && startYear === endYear) {
    return `${startMonth} ${startDay}-${endMonth} ${endDay} ${startYear}`
  }

  return `${startMonth} ${startDay} ${startYear}-${endMonth} ${endDay} ${endYear}`
}

function SpeakerName({ name }: { name: string }) {
  const whitespaceIndices = []
  for (let i = 0; i < name.length; i++) {
    if (/\s/.test(name[i])) {
      whitespaceIndices.push(i)
    }
  }

  // No whitespace, return whole string
  if (whitespaceIndices.length === 0) {
    return <>{name}</>
  }

  const center = name.length / 2
  // Find the whitespace index closest to the center
  let closest = whitespaceIndices[0]
  let minDiff = Math.abs(closest - center)

  for (let i = 1; i < whitespaceIndices.length; i++) {
    const diff = Math.abs(whitespaceIndices[i] - center)
    if (diff < minDiff) {
      closest = whitespaceIndices[i]
      minDiff = diff
    }
  }

  const left = name.slice(0, closest).trim()
  const right = name.slice(closest + 1).trim()

  return (
    <>
      {left}
      <br />
      {right}
    </>
  )
}

function formatTimeTo12Hour(timeString: string) {
  const [hours, minutes] = timeString.split(':')
  let hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12 // Convert 0 to 12 for midnight
  return `${hour}:${minutes}${ampm}`
}

function AgendaHandle({ agenda }: { agenda: OpenhouseDayAgenda }) {
  return (
    <div className='mr-6 flex items-center'>
      <span className='mr-auto font-bold'>
        {agenda.time && (
          <span className='block font-normal opacity-70'>
            {formatTimeTo12Hour(agenda.time)}
          </span>
        )}
        {agenda.title}
      </span>

      {agenda.speakers.map((speaker, speakerIndex) => {
        return (
          <span
            className='relative -mr-3 hidden h-11 w-11 overflow-hidden rounded-full border-2 border-black bg-white lg:block'
            title={speaker.name}
            style={{
              zIndex: agenda.speakers.length - speakerIndex
            }}>
            <StrapiImageUrl
              key={speakerIndex}
              {...speaker.headshot}
              width={44}
              height={44}
              unoptimized={false}
              className='absolute inset-0 h-full w-full max-w-none object-contain object-center saturate-0'
            />
          </span>
        )
      })}
    </div>
  )
}

function RiggedAccordion({
  handle,
  children,
  classNames = {}
}: {
  handle: string | React.ReactNode
  children: React.ReactNode
  classNames?: {
    container?: string
    handle?: string
    body?: string
  }
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className={classNames.container || ''}>
      <button
        type='button'
        onClick={(event) => {
          event.preventDefault()
          setIsOpen((old) => !old)
        }}
        className={`flex w-full items-center gap-4 ${classNames.handle || ''}`}>
        <span className='flex-1'>{handle}</span>
        {/* Plus/minus icon */}
        <span className='relative ml-auto block aspect-square w-4 flex-shrink-0 flex-grow-0 transition-colors'>
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? '-rotate-90' : ''}`}>
            <span
              className={`absolute inset-0 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span className='absolute inset-0 rotate-90 bg-white' />
          </span>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={{
              closed: {
                opacity: 0,
                y: '-1rem',
                height: 0
              },
              open: {
                opacity: 1,
                y: 0,
                height: 'auto'
              }
            }}
            initial='closed'
            animate='open'
            exit='closed'
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.5
            }}>
            <div className={classNames.body || ''}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
