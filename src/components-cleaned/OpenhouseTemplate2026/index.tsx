import OpenhouseAccordion from './Accordion'
import OpenhouseAgendaHandle from './AgendaHandle'
import OpenhouseButton from './Button'
import OpenhouseFormModal from './FormModal'
import OpenhouseHeader from './Header'
import OpenhouseHero from './Hero'
import OpenhouseLogoWall from './LogoWall'
import OpenhouseMarkdown from './Markdown'
import OpenhouseSpeaker from './Speaker'
import OpenhouseSpeakerFeatured from './SpeakerFeatured'
import linesPattern from './assets/lines-pattern.svg'
import speakersPlaceholderDesktop from './assets/speakers-placeholder-desktop.jpg'
import speakersPlaceholderMobile from './assets/speakers-placeholder-mobile.jpg'
import DateRange from '@/components-cleaned/DateRange'
import OpenhouseCarousel from '@/components-cleaned/OpenhouseContentCarousel'
import StrapiImage from '@/components-cleaned/StrapiImage'
import YouTubeThumbnail from '@/components-cleaned/YouTubeThumbnail'
import FontSohne from '@/components/FontSohne'
import FontSohneBreit from '@/components/FontSohneBreit'
import Modal from '@/components/Modal'
import ResponsiveEmbed from '@/components/ResponsiveEmbed'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { getOrdinal } from '@/lib/utils/numbers'
import { slugify } from '@/lib/utils/strings'
import playButton from '@/pages/openhouse/assets/play-button.svg'
import { EntryOpenhouse } from '@/types/strapi'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function OpenhouseTemplate2026({
  entry
}: {
  entry: EntryOpenhouse
}) {
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
                <DateRange start={startDateObject} end={endDateObject} />
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
                <OpenhouseCarousel mode='dark'>
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
                </OpenhouseCarousel>
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
                <div key={dayIndex} className='border border-white'>
                  <div className='p-4 lg:p-6'>
                    <p
                      className={`flex flex-row gap-2 font-bold uppercase text-ch-yellow ${day.useAmericanDateFormat ? 'flex-row-reverse justify-end' : ''}`}>
                      <span>
                        {dayNumber}
                        {getOrdinal(parseInt(dayNumber))}{' '}
                      </span>{' '}
                      <span>
                        {dayDateObject.toLocaleString('en-US', {
                          month: 'long',
                          timeZone: 'UTC'
                        })}
                      </span>
                    </p>
                    <OpenhouseMarkdown>{day.description}</OpenhouseMarkdown>
                  </div>
                  {day.agenda.length > 0 && (
                    <ol>
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
                              <OpenhouseAccordion
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
                              </OpenhouseAccordion>
                            )}
                          </li>
                        )
                      })}
                    </ol>
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
                          <OpenhouseAccordion
                            handle={faq.question}
                            classNames={{
                              handle:
                                'text-left px-4 lg:px-6 py-3 transition-colors hover:bg-white/10',
                              body: 'px-4 lg:px-6 pb-4 pt-0'
                            }}>
                            <OpenhouseMarkdown className='text-neutral-200'>
                              {faq.answer}
                            </OpenhouseMarkdown>
                          </OpenhouseAccordion>
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
    </>
  )
}
