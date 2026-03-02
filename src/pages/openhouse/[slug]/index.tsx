import linesPattern from './assets/lines-pattern.svg'
import speakersPlaceholderDesktop from './assets/speakers-placeholder-desktop.jpg'
import speakersPlaceholderMobile from './assets/speakers-placeholder-mobile.jpg'
import StrapiImage from '@/components-cleaned/StrapiImage'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import OpenhouseAgendaHandle from '@/components-cleaned/openhouse/AgendaHandle'
import OpenhouseButton from '@/components-cleaned/openhouse/Button'
import ContentCarousel from '@/components-cleaned/openhouse/ContentCarousel'
import OpenhouseDateRange from '@/components-cleaned/openhouse/DateRange'
import OpenhouseFormModal from '@/components-cleaned/openhouse/FormModal'
import OpenhouseHeader from '@/components-cleaned/openhouse/Header'
import OpenhouseHero from '@/components-cleaned/openhouse/Hero'
import OpenhouseLogoWall from '@/components-cleaned/openhouse/LogoWall'
import OpenhouseMarkdown from '@/components-cleaned/openhouse/Markdown'
import OpenhouseSpeaker from '@/components-cleaned/openhouse/Speaker'
import OpenhouseSpeakerFeatured from '@/components-cleaned/openhouse/SpeakerFeatured'
import FitText from '@/components/FitText'
import FontSohne from '@/components/FontSohne'
import FontSohneBreit from '@/components/FontSohneBreit'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import SeoContainer from '@/components/SeoContainer'
import { StrapiImageUrl } from '@/components/StrapiElements'
import {
  openhouseService,
  seoFieldToNextComponentProps
} from '@/lib/api/strapi'
import { IS_PRODUCTION } from '@/lib/next'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { getOrdinal } from '@/lib/utils/numbers'
import { slugify } from '@/lib/utils/strings'
import playButton from '@/pages/openhouse/assets/play-button.svg'
import { CommonProps, ParamsType } from '@/types/homepage'
import { EntryOpenhouse } from '@/types/strapi'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface RoadshowProps extends CommonProps {
  entry: EntryOpenhouse
}

export const getStaticProps: GetStaticProps<RoadshowProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType

    const [commonProps, entry] = await Promise.all([
      getCommonProps(),
      openhouseService.findOne({
        filters: {
          slug: {
            $eq: slug
          }
        },
        publicationState: IS_PRODUCTION ? 'live' : 'preview'
      })
    ])

    if (!entry) {
      return {
        notFound: true
      }
    }

    const startDateObject = new Date(entry.startDate)

    const seo = seoFieldToNextComponentProps(entry.seo, {
      title: `Open House ${startDateObject.getFullYear()}, The ClickHouse User Conference - ${entry.heading.replaceAll(`\n`, ', ')}.`,
      path: `/openhouse/${entry.slug}`
    })

    return {
      props: {
        entry,
        seo,
        ...commonProps
      }
    }
  }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const data = await openhouseService.findAll({
    fields: ['slug'],
    populate: [],
    publicationState: IS_PRODUCTION ? 'live' : 'preview'
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

export default function Page({ seo, entry }: RoadshowProps) {
  const router = useRouter()
  const nowDateObject = new Date()
  const startDateObject = new Date(`${entry.startDate}T00:00:00Z`)
  const endDateObject = new Date(`${entry.endDate}T00:00:00Z`)

  // Add's scroll offset to <html> tag
  useEffect(() => {
    document.documentElement.classList.add('scroll-pt-32')
  }, [])

  const speakersToggleRef = useRef<HTMLDivElement | null>(null)
  const videosRef = useRef<HTMLDivElement | null>(null)
  const [displayAllSpeakers, setDisplayAllSpeakers] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<
    null | EntryOpenhouse['videos'][number]
  >(null)

  const hasFeaturedSpeakers = entry.featuredSpeakers.length > 0
  const hasSpeakers = entry.speakers.length > 0

  const registrationIsOpen =
    startDateObject > nowDateObject && endDateObject > nowDateObject

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

  const setFeaturedVideoAndUrl = useCallback(
    (video: EntryOpenhouse['videos'][number] | null) => {
      setActiveVideo(video)
      const newUrl = new URL(window.location.toString())
      newUrl.hash = video ? slugify(`video ${video.title}`) : ''
      window.history.replaceState(null, '', newUrl.toString())
    },
    [setActiveVideo]
  )

  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <FontSohne className='flex flex-col gap-4 bg-black tracking-wider text-white selection:bg-ch-yellow'>
        <OpenhouseHeader
          agenda={entry.days.length > 0}
          speakers={true}
          faqs={entry.faqs.length > 0}
          register={registrationIsOpen}
          applyToSpeak={entry.applyToSpeakLink}
          registerLabel={entry.registerLabel}
        />

        {registrationIsOpen && (
          <OpenhouseFormModal
            formId={entry.marketoFormId}
            open={formOpen}
            onClose={() => {
              setFormOpen(false)
            }}
          />
        )}

        {/* Hero */}
        <OpenhouseHero gallery={entry.gallery} pause={formOpen}>
          <div className='section-container w-full items-end justify-between md:flex'>
            <h1 className='flex flex-col uppercase'>
              <span className='text-xl font-extrabold leading-none lg:text-[1.75rem]'>
                Free database and AI conference{' '}
              </span>
              {entry.heading.split(/\n+/g).map((item, itemIndex) => {
                return (
                  <FontSohneBreit
                    as='span'
                    key={itemIndex}
                    className='text-4xl font-black leading-none text-ch-yellow lg:text-[4rem]'>
                    {item.trim()}{' '}
                  </FontSohneBreit>
                )
              })}
            </h1>
            <h2 className='flex flex-col text-xl font-black uppercase leading-none md:text-right md:text-[1.75rem]'>
              <span className='text-white md:text-ch-yellow'>
                <OpenhouseDateRange
                  start={startDateObject}
                  end={endDateObject}
                />
                <span className='hidden md:inline'>.</span>{' '}
              </span>
              {entry.strapline.split(`\n`).map((item, itemIndex) => {
                return (
                  <span key={itemIndex} className='hidden md:inline'>
                    {item}{' '}
                  </span>
                )
              })}
            </h2>
          </div>
        </OpenhouseHero>

        {/* Cards */}
        {entry.cards.length > 0 && (
          <section className='section-container'>
            <div className='-m-2 flex flex-col md:flex-row md:flex-wrap'>
              {entry.cards.map((card, cardIndex) => {
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

        {entry.videos && entry.videos.length > 0 && (
          <section
            id='videos'
            className='relative py-10 text-white md:py-20 xl:py-24'>
            <Modal
              isOpen={!!activeVideo}
              onClose={() => setFeaturedVideoAndUrl(null)}>
              <div className='w-full flex-shrink-0'>
                {activeVideo && (
                  <>
                    <h3 className='mb-6 mt-1 text-2xl md:-mt-1'>
                      {activeVideo.title}
                    </h3>
                    <ResponsiveEmbed>
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&autoplay=1`}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                      />
                    </ResponsiveEmbed>
                  </>
                )}
              </div>
            </Modal>
            <div className='overflow-hidden' ref={videosRef}>
              <div className='section-container w-full'>
                <div className='mb-10'>
                  <p className='text-sm font-medium uppercase text-ch-yellow'>
                    Sessions
                  </p>
                  <FontSohneBreit as='h2' className='text-3xl font-black'>
                    In case you missed it
                  </FontSohneBreit>
                </div>
                <ContentCarousel mode='dark'>
                  {entry.videos.map((video, videoIndex) => {
                    return (
                      <div
                        key={videoIndex}
                        className='group/videoItem relative flex h-full flex-col bg-white text-black'>
                        <div className='relative'>
                          <YouTubeThumbnail
                            videoId={video.youtubeId}
                            className='z-0 aspect-video h-auto w-full max-w-none origin-top-left object-cover'
                          />
                          <Image
                            src={playButton}
                            width={89}
                            height={89}
                            alt='Play'
                            className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition-transform group-hover/videoItem:scale-105'
                          />
                        </div>
                        <div className='flex flex-1 flex-col p-4 lg:p-6'>
                          <h3 className='mb-3 text-xl'>
                            <Link
                              target='_blank'
                              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                              onClick={(event) => {
                                event.preventDefault()
                                setFeaturedVideoAndUrl(video)
                              }}>
                              <span className='absolute inset-0 z-10' />
                              {video.title}
                            </Link>
                          </h3>
                          <strong className='mt-auto group-hover/videoItem:underline'>
                            Watch now
                          </strong>
                        </div>
                      </div>
                    )
                  })}
                </ContentCarousel>
              </div>
            </div>
          </section>
        )}

        {/* Agenda */}
        {entry.days.length > 0 && (
          <section id='agenda' className='section-container w-full space-y-4'>
            {entry.days.map((day, dayIndex) => {
              const dayDateObject = new Date(`${day.date}T00:00:00Z`)
              const dayNumber = dayDateObject.toLocaleString('en-US', {
                day: 'numeric',
                timeZone: 'UTC'
              })
              return (
                <div
                  key={dayIndex}
                  className='border border-white lg:grid lg:grid-cols-[13rem_1fr]'>
                  <div
                    className={`flex px-8 py-6 text-center uppercase leading-none text-ch-yellow lg:px-4 lg:py-12 ${day.useAmericanDateFormat ? 'flex-col-reverse justify-end' : 'flex-col'}`}
                    style={{
                      backgroundImage: `url('${linesPattern.src}')`
                    }}>
                    <FitText
                      minFontSize={16}
                      maxFontSize={55}
                      className='font-black'>
                      {dayNumber}
                      {getOrdinal(parseInt(dayNumber))}
                    </FitText>
                    <FitText
                      minFontSize={16}
                      maxFontSize={72}
                      className='font-bold'>
                      {dayDateObject.toLocaleString('en-US', {
                        month: 'long',
                        timeZone: 'UTC'
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

                          const Handle = () => (
                            <OpenhouseAgendaHandle
                              title={agenda.title}
                              time={agenda.time}
                              speakers={agenda.speakers.map(
                                (speaker) => speaker.headshot
                              )}
                            />
                          )
                          return (
                            <li
                              key={agendaIndex}
                              className={`border-t border-white px-6 py-2 ${isDivider ? 'bg-white/10' : ''}`}>
                              {isDivider && (
                                <span className='text-sm opacity-70'>
                                  {agenda.title}
                                </span>
                              )}
                              {!isDivider && !agenda.description && <Handle />}
                              {!isDivider && agenda.description && (
                                <RiggedAccordion
                                  handle={<Handle />}
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
            {registrationIsOpen && (
              <OpenhouseButton
                href='#register'
                size='lg'
                arrow={true}
                className='!-mt-px w-full border border-white'>
                {entry.registerLabel}
              </OpenhouseButton>
            )}
          </section>
        )}

        <div className='space-y-4 bg-white py-4 text-black lg:mt-12 lg:space-y-16 lg:py-16'>
          {/* Speakers */}
          <section id='speakers' className='section-container'>
            <div className='p-px'>
              <div className='flex items-center bg-white p-4 pt-3 ring-1 ring-black lg:gap-6 lg:p-6 lg:pt-5'>
                <OpenhouseMarkdown className='flex-1'>
                  {entry.speakersIntro}
                </OpenhouseMarkdown>
                {entry.applyToSpeakLink && (
                  <OpenhouseButton
                    variant='secondary'
                    href={entry.applyToSpeakLink}
                    target='_blank'
                    className='mr-2 !hidden lg:!inline-flex'>
                    Apply to speak
                  </OpenhouseButton>
                )}
              </div>

              {/* Coming soon */}
              {!entry.featuredSpeakers.length && !entry.speakers.length && (
                <div className='relative my-px ring-1 ring-black'>
                  <div className='absolute left-8 right-8 top-1/2 z-10 -translate-y-1/2 border border-black bg-white p-8 text-center lg:left-1/2 lg:right-auto lg:max-w-96 lg:-translate-x-1/2 lg:px-10'>
                    <FontSohneBreit as='h4' className='text-xl font-black'>
                      Coming soon!
                    </FontSohneBreit>
                    <p>
                      We’re curating an incredible lineup of engineers,
                      founders, and data pioneers. Stay tuned!
                    </p>
                  </div>
                  <Image
                    src={speakersPlaceholderMobile}
                    alt=''
                    width={1204 / 2}
                    height={1600 / 2}
                    className='w-full max-w-none opacity-20 md:hidden'
                  />
                  <Image
                    src={speakersPlaceholderDesktop}
                    alt=''
                    width={1200}
                    height={400}
                    className='hidden w-full max-w-none opacity-20 md:block'
                  />
                </div>
              )}

              {/* Featured speakers */}
              {entry.featuredSpeakers.length > 0 && (
                <div className='grid grid-cols-6 gap-px md-mid:grid-cols-12'>
                  {entry.featuredSpeakers.map((speaker, speakerIndex) => {
                    return (
                      <OpenhouseSpeakerFeatured
                        key={speakerIndex}
                        {...speaker}
                      />
                    )
                  })}
                  {Array(2 - (entry.featuredSpeakers.length % 2))
                    .fill(null)
                    .map((value, fillerIndex) => {
                      return (
                        <div
                          key={entry.featuredSpeakers.length - 1 + fillerIndex}
                          className='col-span-6 hidden bg-white ring-1 ring-black md-mid:block'
                        />
                      )
                    })}
                </div>
              )}

              {/* Non-featured speakers */}
              {hasSpeakers && (
                <div className='relative grid grid-cols-2 gap-px sm:grid-cols-3 md-mid:grid-cols-4 lg:grid-cols-6'>
                  {(!hasFeaturedSpeakers || displayAllSpeakers) &&
                    entry.speakers.map((speaker, speakerIndex) => {
                      return (
                        <OpenhouseSpeaker key={speakerIndex} {...speaker} />
                      )
                    })}
                  {(!hasFeaturedSpeakers || displayAllSpeakers) &&
                    Array(6 - (entry.speakers.length % 6))
                      .fill(null)
                      .map((value, fillerIndex) => {
                        return (
                          <div
                            key={entry.speakers.length - 1 + fillerIndex}
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

              {registrationIsOpen && (!hasFeaturedSpeakers || !hasSpeakers) && (
                <OpenhouseButton
                  href='#register'
                  size='lg'
                  arrow={true}
                  className='w-full ring-1 ring-black'>
                  {entry.registerLabel}
                </OpenhouseButton>
              )}
            </div>
          </section>

          {/* Location */}
          <section id='location' className='section-container'>
            <div className='flex flex-col-reverse border border-black lg:grid lg:grid-cols-3'>
              <div className='flex flex-col justify-center border-inherit lg:border-r'>
                <OpenhouseMarkdown className='my-auto space-y-6 p-6 lg:p-16'>
                  {`## ${entry.heading.replaceAll(`\n`, ', ')}\n${entry.locationAddress.replaceAll(`\n`, '  \n')}`}
                </OpenhouseMarkdown>

                {registrationIsOpen && (
                  <OpenhouseButton
                    href='#register'
                    size='lg'
                    arrow={true}
                    className='-mx-px mt-auto border border-black'>
                    {entry.registerLabel}
                  </OpenhouseButton>
                )}
              </div>
              <StrapiImage
                entry={entry.locationImage}
                className='col-span-2 h-full w-full object-cover'
              />
            </div>
          </section>

          {/* FAQs */}
          {entry.faqs.length > 0 && (
            <section id='faqs' className='section-container !mt-0'>
              <div className='bg-black text-white'>
                <OpenhouseMarkdown className='p-4 pt-3 lg:p-6 lg:pt-5'>
                  {entry.faqsIntro}
                </OpenhouseMarkdown>
                <ul>
                  {entry.faqs.length > 0 &&
                    entry.faqs.map((faq, faqIndex) => {
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
          {entry.logos.length > 0 && (
            <section id='logos' className='section-container'>
              <OpenhouseLogoWall logos={entry.logos} />
            </section>
          )}
        </div>
      </FontSohne>
      <Footer />
    </>
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
