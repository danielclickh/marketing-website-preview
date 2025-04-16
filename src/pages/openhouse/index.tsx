import imageGallery from './assets/gallery.png'
import imageIconBinary from './assets/icon-binary.svg'
import imageIconFaq from './assets/icon-faq.svg'
import imageIconMegaphone from './assets/icon-megaphone.svg'
import imageIconNetwork from './assets/icon-network.svg'
import imageOpenhouseLogo from './assets/logo.svg'
import speakerAaronKatz from './assets/speaker-aaron-katz.png'
import speakerAlexyMilovidov from './assets/speaker-alexey-milovidov.png'
import speakerChloeCarassoDitCarson from './assets/speaker-chloe-carasso-dit-carson.png'
import speakerDaleFrohman from './assets/speaker-dale-frohman.png'
import speakerKaushikIska from './assets/speaker-kaushik-iska.png'
import speakerKevinWeil from './assets/speaker-kevin-weil.png'
import speakerKrithikaBalagurunathan from './assets/speaker-krithika-balagurunathan.png'
import speakerLukasBiewald from './assets/speaker-lukas-biewald.png'
import speakerMarkNeedham from './assets/speaker-mark-needham.png'
import speakerMartinCasado from './assets/speaker-martin-casado.png'
import speakerMelvynPeignon from './assets/speaker-melvyn-peignon.png'
import speakerMihirGokhale from './assets/speaker-mihir-gokhale.png'
import speakerMikeShi from './assets/speaker-mike-shi.png'
import speakerNikitaMikhailov from './assets/speaker-nikita-mikhailov.png'
import speakerRobertSchulze from './assets/speaker-robert-schulze.png'
import speakerRyadhDahimene from './assets/speaker-ryadh-dahimene.png'
import speakerTanyaBragin from './assets/speaker-tanya-bragin.png'
import speakerVladSeliverstov from './assets/speaker-vlad-seliverstov.png'
import speakerYuryIzrailevsky from './assets/speaker-yury-izrailevsky.png'
import speakerZachNaimon from './assets/speaker-zach-naimon.png'
import speakerZoeSteinkamp from './assets/speaker-zoe-steinkamp.png'
import styles from './styles.module.scss'
import FontSohne from '@/components/FontSohne'
import FontSohneBreit from '@/components/FontSohneBreit'
import Footer from '@/components/Footer'
import OpenHouseAccordionItem from '@/components/OpenHouseAccordionItem'
import OpenHouseButton from '@/components/OpenHouseButton'
import OpenHouseHeader from '@/components/OpenHouseHeader'
import SeoContainer from '@/components/SeoContainer'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import 'swiper/css'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          title:
            'Open House User Conference - Free conference in San Francisco, CA.',
          path: '/openhouse',
          image: [{ url: '/images/social-open-house.png' }]
        },
        ...commonProps
      }
    }
  }

const INITIAL_NUMBER_OF_SPEAKERS = 8

const ALL_SPEAKERS: Array<{
  name: string
  title: string
  image: ImageProps['src']
}> = [
  {
    name: 'Aaron Katz',
    title: 'Founder, CEO, ClickHouse',
    image: speakerAaronKatz
  },
  {
    name: 'Tanya Bragin',
    title: 'VP Product & Marketing, ClickHouse',
    image: speakerTanyaBragin
  },
  {
    name: 'Alexey Milovidov',
    title: 'Founder, CTO, ClickHouse',
    image: speakerAlexyMilovidov
  },
  {
    name: 'Kevin Weil',
    title: 'CPO, OpenAI',
    image: speakerKevinWeil
  },
  {
    name: 'Martin Casado',
    title: 'Partner, Andreessen Horowitz',
    image: speakerMartinCasado
  },
  {
    name: 'Lukas Biewald',
    title: 'Founder, CEO, Weights & Biases',
    image: speakerLukasBiewald
  },
  {
    name: 'Krithika Balagurunathan',
    title: 'Sr Director, PM, ClickHouse',
    image: speakerKrithikaBalagurunathan
  },
  {
    name: 'Dale Frohman',
    title: 'Lead Director Engineering, CVS',
    image: speakerDaleFrohman
  },
  {
    name: 'Yury Izrailevsky',
    title: 'Founder, President, ClickHouse',
    image: speakerYuryIzrailevsky
  },
  {
    name: 'Mark Needham',
    title: 'Principal PME, ClickHouse',
    image: speakerMarkNeedham
  },
  {
    name: 'Robert Schulze',
    title: 'Core Engineering Lead, ClickHouse',
    image: speakerRobertSchulze
  },
  {
    name: 'Melvyn Peignon',
    title: 'Principal PM, ClickHouse',
    image: speakerMelvynPeignon
  },
  {
    name: 'Zoe Steinkamp',
    title: 'Senior Developer Advocate, ClickHouse',
    image: speakerZoeSteinkamp
  },
  {
    name: 'Chloe Carasso dit Carson',
    title: 'Senior PM, ClickHouse',
    image: speakerChloeCarassoDitCarson
  },
  {
    name: 'Nikita Mikhailov',
    title: 'Director of Engineering, ClickHouse',
    image: speakerNikitaMikhailov
  },
  {
    name: 'Zach Naimon',
    title: 'Principal PM, ClickHouse',
    image: speakerZachNaimon
  },
  {
    name: 'Kaushik Iska',
    title: 'Engineering Manager, ClickHouse',
    image: speakerKaushikIska
  },
  {
    name: 'Mihir Gokhale',
    title: 'PM, ClickHouse',
    image: speakerMihirGokhale
  },
  {
    name: 'Mike Shi',
    title: 'Principal PM, ClickHouse',
    image: speakerMikeShi
  },
  {
    name: 'Vlad Seliverstov',
    title: 'Principal PME, ClickHouse',
    image: speakerVladSeliverstov
  },
  {
    name: 'Ryadh Dahimene',
    title: 'Director, PM, ClickHouse',
    image: speakerRyadhDahimene
  }
]

export default function Page({ seo, footerData }: CommonProps) {
  const speakersToggleRef = useRef<HTMLDivElement | null>(null)
  const [displayAllSpeakers, setDisplayAllSpeakers] = useState(false)

  const initialSpeakers = ALL_SPEAKERS.slice(0, 8)
  const overflowSpeakers = ALL_SPEAKERS.slice(8)

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
            behavior: 'smooth',
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
      <FontSohne>
        <div className='readable-content'>
          {/* Header */}
          <OpenHouseHeader>
            <OpenHouseButton
              href='/openhouse/register'
              variant='primary'
              size='sm'>
              Register
            </OpenHouseButton>
          </OpenHouseHeader>

          {/* Hero */}
          <section className='relative overflow-hidden bg-black'>
            <div className='relative mx-auto max-w-6xl px-6 pt-16 lg:px-12'>
              <div
                className={`absolute bottom-0 left-1/2 top-0 -translate-x-1/2 gradient-mask-to-b-[rgba(0,0,0,1)_0%,rgba(0,0,0,0.2)_70%] md:gradient-mask-to-r-[rgba(0,0,0,1)_0%,rgba(0,0,0,0.2)_70%] ${styles.gridBackground} w-dvw opacity-50 bg-blend-luminosity mix-blend-luminosity`}
              />

              <div className='relative z-10 flex flex-col gap-16 py-24 md:min-h-[680px] md:flex-row md:justify-between md:py-0'>
                <div className='flex-shrink-1 relative flex flex-grow-0 items-center px-8 md:w-max md:self-stretch md:px-0'>
                  <div className='absolute -bottom-20 -top-20 left-1/2 -z-10 aspect-square -translate-x-1/2 scale-150 rounded-full bg-ch-teal/60 mix-blend-multiply blur-[100px] md:scale-100' />
                  <Image
                    src={imageOpenhouseLogo}
                    alt='Open House By ClickHouse'
                    width={590}
                    height={289}
                    loading='eager'
                    priority
                  />
                </div>
                <div className='flex-shrink-0 flex-grow-0 text-center md:self-center md:text-left'>
                  <h2 className='text-2xl font-bold leading-loose'>
                    May 28-29, 2025
                  </h2>
                  <p className='mb-4 text-xl leading-loose'>
                    Free conference in San Francisco, CA.
                  </p>
                  <OpenHouseButton
                    href='/openhouse/register'
                    variant='primary'
                    size='lg'
                    className='min-w-48'>
                    Register
                  </OpenHouseButton>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <div className='lg:py-18 relative hidden justify-center bg-white px-2 md:flex md:py-10 xl:py-24'>
            <Image
              src={imageGallery}
              width={3602 / 2}
              height={960 / 2}
              alt='Gallery Desktop'
              className=''
            />
          </div>

          {/* Table */}
          <section className={`bg-neutral-950 py-20 ${styles.dotBackground}`}>
            <div className='mx-auto max-w-6xl px-6 lg:px-12'>
              <h2 className='mb-14 text-center text-4xl lg:mb-20'>
                What’s happening at Open House?
              </h2>
              <div className='divide-y-2 divide-ch-yellow'>
                {(
                  [
                    {
                      title: 'News & roadmap',
                      description:
                        'Hear from company founders and product leaders about latest company and product news and the future of ClickHouse.',
                      icon: imageIconMegaphone
                    },
                    {
                      title: 'Technical track',
                      description:
                        'Dive deep into the newest features for real-time analytics, data warehousing, observability, and AI/ML use cases.',
                      icon: imageIconBinary
                    },
                    {
                      title: 'Networking',
                      description:
                        'Hear talks and see demos from other users and network during breakfast, lunch, and evening reception.',
                      icon: imageIconNetwork
                    },
                    {
                      title: 'Ask me anything',
                      description:
                        'ClickHouse experts from core database developers to support around every day to answer questions in a dedicated AMA area.',
                      icon: imageIconFaq
                    }
                  ] satisfies Array<{
                    title: string
                    description: string
                    icon: Pick<ImageProps, 'src'>
                  }>
                ).map((row, rowIndex) => {
                  return (
                    <div
                      key={rowIndex}
                      className='grid-cols-[repeat(15,_minmax(0,_1fr))] space-y-6 divide-white py-6 lg:grid lg:space-y-0 lg:divide-x-2 lg:py-0'>
                      <div className='col-span-2 items-center justify-center sm:float-start sm:mr-4 lg:float-none lg:mr-0 lg:flex lg:py-8 lg:pr-2'>
                        <Image
                          src={row.icon}
                          width={75}
                          height={75}
                          alt={row.title}
                        />
                      </div>
                      <div className='col-span-5 items-center justify-center text-2xl font-bold uppercase lg:flex lg:px-2 lg:py-8 lg:text-center'>
                        {row.title}
                      </div>
                      <div className='col-span-8 items-center text-left text-lg lg:flex lg:py-8 lg:pl-8'>
                        {row.description}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Agenda */}
          <section className='relative bg-ch-yellow py-20 text-black'>
            <div
              className={`absolute -top-8 left-0 right-0 h-8 bg-ch-yellow ${styles.textureMaskTop}`}
            />
            <div className='mx-auto max-w-6xl px-6 lg:px-12' id='agenda'>
              <h2 className='mb-10 text-center text-4xl'>Agenda at a glance</h2>
              <div className='grid-cols-2 gap-6 space-y-6 lg:grid lg:space-y-0'>
                <div className='space-y-6 bg-white px-6 py-8 lg:px-12 lg:py-10 lg:text-lg'>
                  <FontSohneBreit>
                    <h3 className='text-4xl'>
                      <small className='text-2xl font-bold uppercase'>
                        MAY 28
                      </small>
                      <br />
                      Training
                    </h3>
                  </FontSohneBreit>
                  <p>
                    Start your journey to becoming a ClickHouse Certified
                    Developer with this free, hands-on training.
                  </p>
                  <p>
                    <strong>We'll cover:</strong>
                  </p>
                  <ul className='!mt-0 list-disc pl-8'>
                    <li>Module 1: Getting Started with ClickHouse</li>
                    <li>Module 2: ClickHouse Architecture</li>
                    <li>Module 3: Modeling Data</li>
                    <li>Module 4: Inserting Data</li>
                    <li>Module 5: Analyzing Data</li>
                  </ul>
                  <p>
                    This will be a full-day event with limited seats.
                    <br />
                    Open to conference registrants only.
                  </p>
                </div>
                <div className='space-y-3 bg-white px-6 py-8 lg:px-12 lg:py-10 lg:text-lg'>
                  <FontSohneBreit>
                    <h3 className='mb-6 text-4xl'>
                      <small className='text-2xl font-bold uppercase'>
                        MAY 29
                      </small>
                      <br />
                      Conference
                    </h3>
                  </FontSohneBreit>
                  <p>
                    <strong>Sessions:</strong>
                  </p>
                  <ul className='!mt-0 list-disc pl-8'>
                    <li>Opening keynote with ClickHouse founders</li>
                    <li>Roadmap session with product leaders</li>
                    <li>In-depth customer talks from our largest users</li>
                    <li>Technical feature deep dives from our engineers</li>
                  </ul>
                  <p>
                    <strong>Breakouts:</strong>
                  </p>
                  <ul className='!mt-0 list-disc pl-8'>
                    <li>Use Case & Integration Demos</li>
                    <li>“Built on ClickHouse” showcase</li>
                    <li>AMA Booth</li>
                  </ul>
                  <p>
                    <strong>Networking:</strong>
                  </p>
                  <ul className='!mt-0 list-disc pl-8'>
                    <li>Catered breakfast & lunch</li>
                    <li>Evening networking reception</li>
                  </ul>
                </div>
              </div>
              <div className='mt-10 text-center'>
                <OpenHouseButton
                  href='/openhouse/register'
                  variant='dark'
                  size='lg'
                  className='min-w-48'>
                  Register
                </OpenHouseButton>
              </div>
            </div>
          </section>

          {/* Speakers */}
          <section className='relative bg-white py-20 text-black'>
            <div
              className={`absolute -bottom-8 left-0 right-0 z-20 h-8 bg-white ${styles.textureMaskBottom}`}
            />
            <div className='mx-auto max-w-[1413px] px-6'>
              <h2 className='mb-4 text-center text-4xl'>Speakers</h2>
              <p className='mb-10 text-center text-2xl'>
                We have an exciting line-up of speakers, and more announcements
                on the way
              </p>
              <div className='-mx-2 -my-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {initialSpeakers.map((profile, profileIndex) => {
                  return <SpeakerProfile {...profile} key={profileIndex} />
                })}
              </div>

              {overflowSpeakers.length > 0 && (
                <div
                  className={`relative transition-all duration-300 ${displayAllSpeakers ? 'mt-4' : 'mt-14'}`}>
                  <div className='-mx-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    <AnimatePresence onExitComplete={scrollToSpeakersToggle}>
                      {displayAllSpeakers &&
                        overflowSpeakers.map((profile, profileIndex) => {
                          return (
                            <motion.div
                              key={profileIndex}
                              variants={{
                                closed: {
                                  opacity: 0,
                                  height: 0,
                                  transition: {
                                    delay: 0
                                  }
                                },
                                open: {
                                  opacity: 1,
                                  height: 'auto',
                                  transition: {
                                    delay: (profileIndex + 1) / 10
                                  }
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
                              <SpeakerProfile {...profile} />
                            </motion.div>
                          )
                        })}
                    </AnimatePresence>
                  </div>
                  <div
                    ref={speakersToggleRef}
                    className='sticky bottom-0 z-40 -mx-6 bg-white/60 px-6 py-2 text-center backdrop-blur sm:relative sm:bg-transparent sm:backdrop-blur-0'>
                    <OpenHouseButton
                      href='#'
                      onClick={(event) => {
                        event.preventDefault()
                        setDisplayAllSpeakers((old) => !old)
                      }}
                      variant='dark'
                      size='lg'
                      className='w-full min-w-48 sm:w-auto'>
                      {!displayAllSpeakers && 'View all speakers'}
                      {displayAllSpeakers && 'Collapse all speakers'}
                    </OpenHouseButton>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTAs */}
          <section
            className={`relative flex bg-[#2F3032] pb-20 pt-24 text-black bg-blend-screen lg:min-h-[700px] ${styles.patternBackground}`}>
            <div className='mx-auto my-auto w-full max-w-xl px-6 lg:px-12'>
              <div className='grid-cols-1 gap-6 space-y-6 md:grid md:space-y-0'>
                <div className='space-y-8 bg-white px-6 py-8 text-center text-lg lg:px-12 lg:py-10'>
                  <FontSohneBreit>
                    <h3 className='text-4xl'>Open House</h3>
                  </FontSohneBreit>
                  <p>
                    The Pearl
                    <br />
                    San Francisco, California
                    <br />
                    FREE
                  </p>
                  <p>
                    <OpenHouseButton
                      href='/openhouse/register'
                      variant='primary'
                      size='lg'
                      className='min-w-48 border !border-black hover:!text-black'>
                      Register
                    </OpenHouseButton>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className='relative bg-white py-20 text-black'>
            <div className='mx-auto max-w-6xl px-6 lg:px-12'>
              <h2 className='mb-4 text-center text-4xl'>FAQs</h2>
              <OpenHouseAccordionItem handle='What is Open House 2025 by ClickHouse?'>
                <p className='max-w-3xl'>
                  Open House 2025 is the first ever ClickHouse User Conference!
                  It is a premier one-day event for ClickHouse users,
                  contributors, enthusiasts, and customers, hosted in the heart
                  of San Francisco on 29 May. For those unable to join in
                  person, the event will be streamed to multiple locations
                  worldwide, ensuring everyone can be part of this global
                  gathering.
                </p>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='What can I expect from the agenda?'>
                <p className='max-w-3xl'>
                  At a glance the agenda and initial speaker lineup is above,
                  and we’ll be announcing more details as the event shapes up.
                  It will include:
                </p>
                <ul className='mt-4 list-disc pl-8'>
                  <li>Insights from company founders</li>
                  <li>
                    In-depth technical sessions from builders and practitioners
                  </li>
                  <li>ClickHouse users sharing their stories</li>
                  <li>Demos and AMA</li>
                </ul>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='Will you be offering in-person training?'>
                <p className='max-w-3xl'>
                  Yes, in-person training will be offered on an optional basis
                  in San Francisco on May 28 2025, the day before the main
                  event. We are offering free hands-on training on 28 May, the
                  day before Open House, to equip attendees with practical
                  skills for deploying and optimizing ClickHouse in production.
                  Whether you’re just starting with ClickHouse or refining an
                  advanced deployment, this training will empower you with the
                  tools and techniques to unlock the full potential of your
                  data.
                </p>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='Will there be a CFP process for speakers?'>
                <p className='max-w-3xl'>
                  Yes! Please apply to be a speaker{' '}
                  <Link
                    href='https://sessionize.com/clickhouse-user-conference-2025/'
                    target='_blank'
                    className='underline hover:decoration-2'>
                    here
                  </Link>
                  .
                </p>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='Are you accepting sponsorships for the event?'>
                <p className='max-w-3xl'>
                  We do not plan to have a formal sponsor expo at this event,
                  but if you’d like to collaborate with us on this event, please
                  share your ideas with the organizers at{' '}
                  <Link
                    href='mailto:openhouse@clickhouse.com'
                    target='_blank'
                    className='underline hover:decoration-2'>
                    openhouse@clickhouse.com
                  </Link>
                </p>
              </OpenHouseAccordionItem>
              <OpenHouseAccordionItem handle='Will you have a code of conduct?'>
                <p className='max-w-3xl'>
                  Yes. ClickHouse is committed to providing a safe and
                  harassment-free experience for participants at all of our
                  events. All attendees are required to comply with the{' '}
                  <Link
                    href='/events-code-of-conduct'
                    className='underline hover:decoration-2'>
                    Code of Conduct
                  </Link>
                  .
                </p>
              </OpenHouseAccordionItem>
            </div>
          </section>

          {/* Get in touch */}
          <section className='relative bg-white pb-20 text-black'>
            <div className='mx-auto max-w-6xl px-6 lg:px-12'>
              <div className='flex flex-col items-center gap-x-20 gap-y-10 rounded bg-neutral-900 p-8 text-white lg:flex-row lg:px-14 lg:py-16'>
                <div className='w-full lg:w-auto'>
                  <h2 className='mb-4 text-4xl'>Get in touch</h2>
                  <p className='text-lg'>
                    For questions about the event or general inquiries,
                    <br />
                    please reach out to{' '}
                    <Link
                      href='mailto:openhouse@clickhouse.com'
                      target='_blank'
                      className='underline hover:decoration-2'>
                      openhouse@clickhouse.com
                    </Link>
                  </p>
                </div>
                <div className='w-full flex-1 text-center lg:w-auto'>
                  <OpenHouseButton
                    href='/openhouse/register'
                    variant='primary'
                    size='lg'
                    className='w-full flex-1 sm:mx-auto sm:w-auto sm:min-w-48'>
                    Register
                  </OpenHouseButton>
                </div>
              </div>
            </div>
          </section>
        </div>
      </FontSohne>
      <Footer {...footerData} />
    </>
  )
}

function SpeakerProfile({
  name,
  title,
  image
}: {
  name: string
  title: string
  image: ImageProps['src']
}) {
  return (
    <div className='group/speaker'>
      <div className='px-2 py-4'>
        <div className='relative mb-4 aspect-square bg-[#EFEFEF]'>
          <Image
            src={image}
            alt={name}
            width={353}
            height={505}
            className='absolute inset-0 z-10 h-full w-full max-w-none grayscale transition group-hover/speaker:grayscale-0'
          />
        </div>
        <h3 className='text-lg md:text-xl lg:text-2xl'>{name}</h3>
        <p className='text-sm md:text-base lg:text-lg'>{title}</p>
      </div>
    </div>
  )
}
