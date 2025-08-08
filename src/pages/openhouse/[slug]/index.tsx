import linesPattern from './assets/lines-pattern.svg'
import speakersPlaceholderDesktop from './assets/speakers-placeholder-desktop.jpg'
import speakersPlaceholderMobile from './assets/speakers-placeholder-mobile.jpg'
import { OpenhouseEntry } from './types'
import OpenhouseAgendaHandle from '@/components-cleaned/openhouse/AgendaHandle'
import OpenhouseButton from '@/components-cleaned/openhouse/Button'
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
import SeoContainer from '@/components/SeoContainer'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { fetchAll, findAll } from '@/lib/api/strapi'
import { IS_PRODUCTION } from '@/lib/next'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { getOrdinal } from '@/lib/utils/numbers'
import { CommonProps, ParamsType } from '@/types/homepage'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

export type RoadshowProps = CommonProps & OpenhouseEntry

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
      pagination: { limit: 1 },
      publicationState: IS_PRODUCTION ? 'live' : 'preview'
    })

    const page = data?.[0] as null | OpenhouseEntry

    if (!page || (page.comingSoon && IS_PRODUCTION)) {
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
      fields: ['slug'],
      publicationState: IS_PRODUCTION ? 'live' : 'preview'
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
  marketoFormId,
  faqsIntro,
  speakersIntro,
  navRegisterLabel,
  agendaRegisterLabel,
  speakersRegisterLabel,
  locationRegisterLabel
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
  const [formOpen, setFormOpen] = useState(false)

  const hasFeaturedSpeakers = featuredSpeakers.length > 0
  const hasSpeakers = speakers.length > 0

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

  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <FontSohne className='flex flex-col gap-4 bg-black tracking-wider text-white selection:bg-ch-yellow'>
        <OpenhouseHeader
          agenda={days.length > 0}
          speakers={true}
          faqs={faqs.length > 0}
          register={registrationIsOpen}
          applyToSpeak={applyToSpeakLink}
          registerLabel={navRegisterLabel}
        />

        {registrationIsOpen && (
          <OpenhouseFormModal
            formId={marketoFormId}
            open={formOpen}
            onClose={() => {
              setFormOpen(false)
            }}
          />
        )}

        {/* Hero */}
        <OpenhouseHero gallery={gallery} pause={formOpen}>
          <div className='section-container w-full items-end justify-between md:flex'>
            <h1 className='flex flex-col uppercase'>
              <span className='text-xl font-extrabold leading-none lg:text-[1.75rem]'>
                Free conference in{' '}
              </span>
              {heading.split(/\n+/g).map((item, itemIndex) => {
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
              {strapline.split(`\n`).map((item, itemIndex) => {
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
                      {dayDateObject.getDate()}
                      {getOrdinal(dayDateObject.getDate())}
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
                {agendaRegisterLabel}
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
                  {speakersIntro}
                </OpenhouseMarkdown>
                {applyToSpeakLink && (
                  <OpenhouseButton
                    variant='secondary'
                    href={applyToSpeakLink}
                    target='_blank'
                    className='mr-2 !hidden lg:!inline-flex'>
                    Apply to speak
                  </OpenhouseButton>
                )}
              </div>

              {/* Coming soon */}
              {!featuredSpeakers.length && !speakers.length && (
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
              {featuredSpeakers.length > 0 && (
                <div className='grid grid-cols-6 gap-px md-mid:grid-cols-12'>
                  {featuredSpeakers.map((speaker, speakerIndex) => {
                    return (
                      <OpenhouseSpeakerFeatured
                        key={speakerIndex}
                        {...speaker}
                      />
                    )
                  })}
                  {Array(2 - (featuredSpeakers.length % 2))
                    .fill(null)
                    .map((value, fillerIndex) => {
                      return (
                        <div
                          key={featuredSpeakers.length - 1 + fillerIndex}
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
                    speakers.map((speaker, speakerIndex) => {
                      return (
                        <OpenhouseSpeaker key={speakerIndex} {...speaker} />
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

              {registrationIsOpen && (!hasFeaturedSpeakers || !hasSpeakers) && (
                <OpenhouseButton
                  href='#register'
                  size='lg'
                  arrow={true}
                  className='w-full ring-1 ring-black'>
                  {speakersRegisterLabel}
                </OpenhouseButton>
              )}
            </div>
          </section>

          {/* Location */}
          <section id='location' className='section-container'>
            <div className='flex flex-col-reverse border border-black lg:grid lg:grid-cols-3'>
              <div className='flex flex-col justify-center border-inherit lg:border-r'>
                <OpenhouseMarkdown className='my-auto space-y-6 p-6 lg:p-16'>
                  {`## ${heading.replaceAll(`\n`, ', ')}\n${locationAddress.replaceAll(`\n`, '  \n')}`}
                </OpenhouseMarkdown>

                {registrationIsOpen && (
                  <OpenhouseButton
                    href='#register'
                    size='lg'
                    arrow={true}
                    className='-mx-px mt-auto border border-black'>
                    {locationRegisterLabel}
                  </OpenhouseButton>
                )}
              </div>
              <StrapiImageUrl
                {...locationImage}
                className='col-span-2 h-full w-full object-cover'
              />
            </div>
          </section>

          {/* FAQs */}
          {faqs.length > 0 && (
            <section id='faqs' className='section-container !mt-0'>
              <div className='bg-black text-white'>
                <OpenhouseMarkdown className='p-4 pt-3 lg:p-6 lg:pt-5'>
                  {faqsIntro}
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
              <OpenhouseLogoWall logos={logos} />
            </section>
          )}
        </div>
      </FontSohne>
      <Footer {...footerData} />
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
