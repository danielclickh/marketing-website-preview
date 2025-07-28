import heroGradientBottom from './assets/hero-gradient-bottom.png'
import heroGradientTop from './assets/hero-gradient-top.png'
import linesPattern from './assets/lines-pattern.svg'
import logo from './assets/logo.svg'
import photoTexture from './assets/photo-texture.svg'
import { OpenhouseDayAgenda, OpenhouseEntry, OpenhouseLogo } from './types'
import ContentTicker from '@/components-cleaned/ContentTicker'
import FitText from '@/components/FitText'
import FontSohne from '@/components/FontSohne'
import FontSohneBreit from '@/components/FontSohneBreit'
import Footer from '@/components/Footer'
import Parallax from '@/components/Parallax'
import SeoContainer from '@/components/SeoContainer'
import { StrapiImageUrl } from '@/components/StrapiElements'
import { fetchAll, findAll, getProxiedMediaUrl } from '@/lib/api/strapi'
import { shuffleArraySeeded } from '@/lib/utils/arrays'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { getOrdinal } from '@/lib/utils/numbers'
import { CommonProps, ParamsType } from '@/types/homepage'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export type RoadshowProps = CommonProps & OpenhouseEntry

const logoWidthToPercent: Record<OpenhouseLogo['width'], number> = {
  'Extra small (1/5)': 20,
  'Small (1/4)': 25,
  'Medium (1/3)': 33.33,
  'Large (1/2)': 50,
  'Extra large (1/1)': 100
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

    return {
      props: {
        ...page,
        seo: {
          title:
            'Open House 2025, The ClickHouse User Conference - Sydney, Australia.',
          path: '/openhouse',
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
  logos
}: RoadshowProps) {
  const nowDateObject = new Date()
  const startDateObject = new Date(startDate)
  const endDateObject = new Date(endDate)

  // Add's scroll offset to <html> tag
  useEffect(() => {
    document.documentElement.classList.add('scroll-pt-32')
  }, [])

  const speakersToggleRef = useRef<HTMLDivElement | null>(null)
  const [displayAllSpeakers, setDisplayAllSpeakers] = useState(false)

  const logoWidths = logos.map((logo) => logoWidthToPercent[logo.width])
  const totalLogoWidths = logoWidths.reduce((a, b) => a + b, 0)
  const logoFillerWidth =
    Math.ceil(totalLogoWidths / 100) * 100 - totalLogoWidths

  const scrollToSpeakersToggle = useCallback(() => {
    const speakersToggle = speakersToggleRef.current
    if (speakersToggle) {
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
  }, [speakersToggleRef])

  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <FontSohne className='flex flex-col gap-4 bg-black tracking-wider text-white selection:bg-ch-yellow'>
        <Header
          agenda={days.length > 0}
          speakers={speakers.length > 0}
          faqs={faqs.length > 0}
          register={startDateObject > nowDateObject}
          applyToSpeak={applyToSpeakLink}
        />

        {/* Hero */}
        <section className='relative overflow-hidden'>
          <div
            className='absolute inset-x-0 bottom-0 z-10 h-96 bg-contain'
            style={{ backgroundImage: `url(${heroGradientBottom.src})` }}
          />
          <div className='grid grid-cols-1 grid-rows-1'>
            {/* Hero images */}
            <Parallax
              speed={3}
              className='relative z-0 col-start-1 row-start-1 flex -translate-y-28 flex-col gap-1.5'>
              <ContentTicker
                gap='0.375rem'
                pixelsPerSecond={20}
                direction='ltr'>
                {shuffleArraySeeded(gallery, 321429833423423111339978).map(
                  (item, itemIndex) => {
                    return item.mime.startsWith('video/') ? (
                      <video
                        src={getProxiedMediaUrl(item.url)}
                        autoPlay={true}
                        muted={true}
                        loop={true}
                        controls={false}
                        className='h-72 w-auto max-w-none'
                      />
                    ) : (
                      <StrapiImageUrl
                        key={itemIndex}
                        {...item}
                        className='h-72 w-auto max-w-none'
                      />
                    )
                  }
                )}
              </ContentTicker>
              <ContentTicker gap='0.375rem' pixelsPerSecond={15}>
                {gallery.map((item, itemIndex) => {
                  return item.mime.startsWith('video/') ? (
                    <video
                      src={getProxiedMediaUrl(item.url)}
                      autoPlay={true}
                      muted={true}
                      loop={true}
                      controls={false}
                      className='h-72 w-auto max-w-none'
                    />
                  ) : (
                    <StrapiImageUrl
                      key={itemIndex}
                      {...item}
                      className='h-72 w-auto max-w-none'
                    />
                  )
                })}
              </ContentTicker>
              <ContentTicker
                gap='0.375rem'
                pixelsPerSecond={12}
                direction='ltr'>
                {shuffleArraySeeded(gallery, 42311232345837213).map(
                  (item, itemIndex) => {
                    return item.mime.startsWith('video/') ? (
                      <video
                        src={getProxiedMediaUrl(item.url)}
                        autoPlay={true}
                        muted={true}
                        loop={true}
                        controls={false}
                        className='h-72 w-auto max-w-none'
                      />
                    ) : (
                      <StrapiImageUrl
                        key={itemIndex}
                        {...item}
                        className='h-72 w-auto max-w-none'
                      />
                    )
                  }
                )}
              </ContentTicker>
            </Parallax>

            {/* Hero content */}
            <div className='relative z-20 col-start-1 row-start-1 flex items-end pb-8'>
              <div className='section-container flex w-full items-end justify-between'>
                <h1 className='flex flex-col uppercase leading-none'>
                  <span className='text-[1.75rem] font-extrabold'>
                    Free conference in
                  </span>
                  {heading.split(`\n`).map((item, itemIndex) => {
                    return (
                      <FontSohneBreit
                        as='span'
                        key={itemIndex}
                        className='text-[4rem] font-black text-ch-yellow'>
                        {item}
                      </FontSohneBreit>
                    )
                  })}
                </h1>
                <h2 className='flex flex-col text-right text-[1.75rem] font-black uppercase leading-none'>
                  <span className='text-ch-yellow'>
                    {formateHeroDate(startDateObject, endDateObject)}.
                  </span>
                  {strapline.split(`\n`).map((item, itemIndex) => {
                    return <span key={itemIndex}>{item}</span>
                  })}
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        {cards.length > 0 && (
          <section className='section-container flex flex-wrap gap-4'>
            {cards.map((card, cardIndex) => {
              return (
                <div
                  key={cardIndex}
                  className='flex-1 basis-0 space-y-6 bg-white p-6 text-black'>
                  <StrapiImageUrl
                    {...card.icon}
                    className='h-11 w-11 object-scale-down object-left-top'
                  />
                  <FontSohneBreit as='h3' className='text-2xl font-black'>
                    {card.title}
                  </FontSohneBreit>
                  <p className='text-sm leading-loose'>{card.content}</p>
                </div>
              )
            })}
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
                  className='grid grid-cols-[13rem_1fr] border border-white'>
                  <div
                    className='px-4 py-12 text-center uppercase leading-none text-ch-yellow'
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
                  <OpenhouseMarkdown className='border-l border-white p-6'>
                    {day.description}
                  </OpenhouseMarkdown>
                  {day.agenda.length > 0 && (
                    <>
                      <div className='border-t border-white' />
                      <ol className='border-l border-white'>
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
                                      'px-6 py-2 text-left transition-colors hover:bg-white/10',
                                    body: 'px-6 pb-4 pt-2'
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

        <div className='mt-12 space-y-16 bg-white py-16 text-black'>
          {/* Speakers */}
          {(featuredSpeakers.length > 0 || speakers.length > 0) && (
            <section id='speakers' className='section-container'>
              <div className='flex flex-col gap-px border bg-black p-px'>
                <div className='flex items-center bg-white p-6 pt-5'>
                  <OpenhouseMarkdown className='flex-1'>
                    {`## Speakers 
Our lineup is stacked with engineers, founders, and operators changing the game with data`}
                  </OpenhouseMarkdown>
                  {applyToSpeakLink && (
                    <Link
                      href={applyToSpeakLink}
                      target='_blank'
                      className='mr-2 bg-black px-4 py-2 font-medium uppercase leading-normal text-white'>
                      Apply to speak
                    </Link>
                  )}
                </div>
                {featuredSpeakers.length > 0 && (
                  <ol className='grid grid-cols-2 gap-px'>
                    {featuredSpeakers.map((speaker, speakerIndex) => {
                      return (
                        <li
                          key={speakerIndex}
                          className='group/speaker flex bg-white'>
                          <div className='relative w-56 border-r border-black bg-neutral-50'>
                            <div
                              className='absolute inset-0 z-10 opacity-55 mix-blend-screen'
                              style={{
                                backgroundImage: `url('${photoTexture.src}')`
                              }}
                            />
                            <StrapiImageUrl
                              {...speaker.headshot}
                              className='grayscale transition group-hover/speaker:grayscale-0'
                            />
                          </div>
                          <div className='flex flex-col p-6'>
                            <OpenhouseMarkdown>{`### ${speaker.name}\n${speaker.title}`}</OpenhouseMarkdown>
                            {speaker.logo && (
                              <StrapiImageUrl
                                {...speaker.logo}
                                className='mt-auto'
                              />
                            )}
                          </div>
                        </li>
                      )
                    })}
                    {Array(featuredSpeakers.length % 2)
                      .fill(null)
                      .map((value, fillerIndex) => {
                        return (
                          <li
                            key={featuredSpeakers.length - 1 + fillerIndex}
                            className='bg-white'
                          />
                        )
                      })}
                  </ol>
                )}

                {speakers.length > 0 && (
                  <>
                    <ul className='grid grid-cols-6 gap-px'>
                      {displayAllSpeakers &&
                        speakers.map((speaker, speakerIndex) => {
                          return (
                            <li
                              key={speakerIndex}
                              className='group/speaker flex flex-col overflow-hidden bg-white'>
                              <div className='relative border-b border-black bg-neutral-50'>
                                <div
                                  className='absolute inset-0 z-10 opacity-55 mix-blend-screen'
                                  style={{
                                    backgroundImage: `url('${photoTexture.src}')`
                                  }}
                                />
                                <StrapiImageUrl
                                  {...speaker.headshot}
                                  className='grayscale transition group-hover/speaker:grayscale-0'
                                />
                              </div>
                              <div className='flex flex-col p-6'>
                                <OpenhouseMarkdown>{`#### ${speaker.name}\n${speaker.title}`}</OpenhouseMarkdown>
                                {speaker.logo && (
                                  <StrapiImageUrl
                                    {...speaker.logo}
                                    className='mt-auto'
                                  />
                                )}
                              </div>
                            </li>
                          )
                        })}
                      {displayAllSpeakers &&
                        Array(speakers.length % 6)
                          .fill(null)
                          .map((value, fillerIndex) => {
                            return (
                              <li
                                key={speakers.length - 1 + fillerIndex}
                                className='bg-white'
                              />
                            )
                          })}
                    </ul>

                    <div
                      ref={speakersToggleRef}
                      className='sticky bottom-0 z-40 -mx-6 bg-white/60 px-6 py-2 text-center backdrop-blur sm:relative sm:bg-transparent sm:backdrop-blur-0'>
                      <button
                        onClick={(event) => {
                          event.preventDefault()
                          setDisplayAllSpeakers((old) => !old)
                          scrollToSpeakersToggle()
                        }}
                        className='px-4 py-1 font-medium uppercase leading-normal text-white'>
                        {!displayAllSpeakers && 'View all speakers'}
                        {displayAllSpeakers && 'Collapse all speakers'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {/* Location */}
          <section id='location' className='section-container'>
            <div className='grid grid-cols-3 border border-black'>
              <div className='flex flex-col justify-center space-y-6 border-r border-inherit p-16'>
                <OpenhouseMarkdown>
                  {`### ${heading.replaceAll(`\n`, ', ')}\n${locationAddress.replaceAll(`\n`, '  \n')}`}
                </OpenhouseMarkdown>
                <p>
                  <Link
                    href='#register'
                    className='inline-block bg-ch-yellow px-4 py-2 font-medium uppercase leading-normal text-black'>
                    Get your ticket
                  </Link>
                </p>
              </div>
              <StrapiImageUrl {...locationImage} className='col-span-2' />
            </div>
          </section>

          {/* FAQs */}
          {faqs.length > 0 && (
            <section id='faqs' className='section-container !mt-0'>
              <div className='bg-black text-white'>
                <OpenhouseMarkdown className='p-6 pt-5'>
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
                                'text-left px-6 py-3 transition-colors hover:bg-white/10',
                              body: 'px-6 pb-4 pt-0'
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
              <div className='flex flex-wrap gap-px bg-gray-200 p-px'>
                {logos.map((logo, logoIndex) => {
                  return (
                    <div
                      key={logoIndex}
                      className='flex items-center justify-center bg-white py-4'
                      style={{
                        width: `calc(${logoWidthToPercent[logo.width]}% - 1px)`
                      }}>
                      <StrapiImageUrl
                        {...logo.logo}
                        className='h-12 w-48 max-w-none object-scale-down object-center'
                      />
                    </div>
                  )
                })}
                {logoFillerWidth > 0 && (
                  <div
                    className='bg-white'
                    style={{
                      width: `calc(${logoFillerWidth}% - 1px)`
                    }}
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
    <header className='fixed inset-x-0 top-0 z-50 py-9'>
      <div
        className='absolute inset-x-0 top-0 z-0 h-32 bg-contain'
        style={{ backgroundImage: `url(${heroGradientTop.src})` }}
      />
      <Image
        src={logo}
        width={230}
        height={49}
        alt='Open House by ClickHouse'
        className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'
      />
      <div className='section-container relative z-10'>
        <nav>
          <ul className='flex items-center gap-6 font-medium uppercase leading-loose tracking-wider'>
            {agenda && (
              <li>
                <Link href='#agenda' className='underline hover:text-ch-yellow'>
                  Agenda
                </Link>
              </li>
            )}
            {speakers && (
              <li>
                <Link
                  href='#speakers'
                  className='underline hover:text-ch-yellow'>
                  Speakers
                </Link>
              </li>
            )}
            {faqs && (
              <li>
                <Link href='#faqs' className='underline hover:text-ch-yellow'>
                  FAQ
                </Link>
              </li>
            )}
            <li className='mx-auto' />
            {applyToSpeak && (
              <li>
                <Link
                  href={applyToSpeak}
                  target='_blank'
                  className='underline hover:text-ch-yellow'>
                  Apply to speak
                </Link>
              </li>
            )}
            {register && (
              <li>
                <Link
                  href='#register'
                  className='inline-block bg-ch-yellow px-4 py-2 font-medium uppercase leading-normal text-black'>
                  Register
                </Link>
              </li>
            )}
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
            className='relative -mr-3 block h-11 w-11 overflow-hidden rounded-full border-2 border-black bg-white'
            title={speaker.name}
            style={{
              zIndex: agenda.speakers.length - speakerIndex
            }}>
            <StrapiImageUrl
              key={speakerIndex}
              {...speaker.headshot}
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
