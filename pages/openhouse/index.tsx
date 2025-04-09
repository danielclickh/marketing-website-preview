import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import 'swiper/css'
import FontSohne from '../../components/FontSohne'
import FontSohneBreit from '../../components/FontSohneBreit'
import Footer from '../../components/Footer'
import OpenHouseAccordionItem from '../../components/OpenHouseAccordionItem'
import OpenHouseButton from '../../components/OpenHouseButton'
import OpenHouseHeader from '../../components/OpenHouseHeader'
import SeoContainer from '../../components/SeoContainer'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { CommonProps } from '../../types/homepage'
import imageGallery from './assets/gallery.png'
import imageIconBinary from './assets/icon-binary.svg'
import imageIconFaq from './assets/icon-faq.svg'
import imageIconMegaphone from './assets/icon-megaphone.svg'
import imageIconNetwork from './assets/icon-network.svg'
import imageOpenhouseLogo from './assets/logo.svg'
import speakerAaronKatz from './assets/speaker-aaron-katz.png'
import speakerAlexyMilovidov from './assets/speaker-alexey-milovidov.png'
import speakerChloeCarassoDitCarson from './assets/speaker-chloe-carasso-dit-carson.png'
import speakerKaushikIska from './assets/speaker-kaushik-iska.png'
import speakerKevinWeil from './assets/speaker-kevin-weil.png'
import speakerKrithikaBalagurunathan from './assets/speaker-krithika-balagurunathan.png'
import speakerLukasBiewald from './assets/speaker-lukas-biewald.png'
import speakerMarkNeedham from './assets/speaker-mark-needham.png'
import speakerMartinCasado from './assets/speaker-martin-casado.png'
import speakerMelvynPeignon from './assets/speaker-melvyn-peignon.png'
import speakerMihirGokhale from './assets/speaker-mihir-gokhale.png'
import speakerNikitaMikhailov from './assets/speaker-nikita-mikhailov.png'
import speakerRobertSchulze from './assets/speaker-robert-schulze.png'
import speakerRyadhDahimene from './assets/speaker-ryadh-dahimene.png'
import speakerTanyaBragin from './assets/speaker-tanya-bragin.png'
import speakerYuryIzrailevsky from './assets/speaker-yury-izrailevsky.png'
import speakerZachNaimon from './assets/speaker-zach-naimon.png'
import speakerZoeSteinkamp from './assets/speaker-zoe-steinkamp.png'
import styles from './styles.module.scss'

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
    title: 'Senior Product Manager, ClickHouse',
    image: speakerChloeCarassoDitCarson
  },
  {
    name: 'Nikita Mikhailov',
    title: 'Director of Engineering, ClickHouse',
    image: speakerNikitaMikhailov
  },
  {
    name: 'Zach Naimon',
    title: 'Principal Product Manager, ClickHouse',
    image: speakerZachNaimon
  },
  {
    name: 'Kaushik Iska',
    title: 'Engineering Manager, ClickHouse',
    image: speakerKaushikIska
  },
  {
    name: 'Mihir Gokhale',
    title: 'Product Manager, ClickHouse',
    image: speakerMihirGokhale
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
          <section className='bg-black overflow-hidden relative'>
            <div className='relative max-w-6xl mx-auto px-6 lg:px-12 pt-16'>
              <div
                className={`absolute left-1/2 gradient-mask-to-b-[rgba(0,0,0,1)_0%,rgba(0,0,0,0.2)_70%] md:gradient-mask-to-r-[rgba(0,0,0,1)_0%,rgba(0,0,0,0.2)_70%] -translate-x-1/2 top-0 bottom-0 ${styles.gridBackground} bg-blend-luminosity mix-blend-luminosity opacity-50 w-dvw`}
              />

              <div className='md:min-h-[680px] py-24 md:py-0 relative z-10 flex flex-col md:flex-row gap-16 md:justify-between'>
                <div className='relative md:w-max md:self-stretch flex items-center flex-shrink-1 flex-grow-0 px-8 md:px-0'>
                  <div className='absolute scale-150 md:scale-100 -z-10 -top-20 -bottom-20 rounded-full aspect-square mix-blend-multiply left-1/2 -translate-x-1/2 bg-ch-teal/60 blur-[100px]' />
                  <Image
                    src={imageOpenhouseLogo}
                    alt='Open House By ClickHouse'
                    width={590}
                    height={289}
                    loading='eager'
                    priority
                  />
                </div>
                <div className='md:self-center flex-shrink-0 flex-grow-0 text-center md:text-left'>
                  <h2 className='text-2xl font-bold leading-loose'>
                    May 28-29, 2025
                  </h2>
                  <p className='text-xl leading-loose mb-4'>
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
          <div className='bg-white hidden md:flex relative px-2 md:py-10 lg:py-18 xl:py-24 justify-center'>
            <Image
              src={imageGallery}
              width={3602 / 2}
              height={960 / 2}
              alt='Gallery Desktop'
              className=''
            />
          </div>

          {/* Table */}
          <section className={`py-20 bg-neutral-950 ${styles.dotBackground}`}>
            <div className='max-w-6xl mx-auto px-6 lg:px-12'>
              <h2 className='text-4xl mb-14 lg:mb-20 text-center'>
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
                      className='space-y-6 lg:space-y-0 py-6 lg:py-0 lg:grid grid-cols-[repeat(15,_minmax(0,_1fr))] lg:divide-x-2 divide-white'>
                      <div className='col-span-2 sm:float-start sm:mr-4 lg:mr-0 lg:float-none lg:flex items-center justify-center lg:py-8 lg:pr-2'>
                        <Image
                          src={row.icon}
                          width={75}
                          height={75}
                          alt={row.title}
                        />
                      </div>
                      <div className='col-span-5 lg:px-2 lg:text-center lg:flex items-center justify-center uppercase font-bold text-2xl lg:py-8'>
                        {row.title}
                      </div>
                      <div className='col-span-8 lg:flex items-center text-left lg:py-8 text-lg lg:pl-8'>
                        {row.description}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Agenda */}
          <section className='relative py-20 bg-ch-yellow text-black'>
            <div
              className={`bg-ch-yellow h-8 absolute -top-8 left-0 right-0 ${styles.textureMaskTop}`}
            />
            <div className='max-w-6xl mx-auto px-6 lg:px-12' id='agenda'>
              <h2 className='text-4xl mb-10 text-center'>Agenda at a glance</h2>
              <div className='space-y-6 lg:space-y-0 lg:grid grid-cols-2 gap-6'>
                <div className='bg-white py-8 px-6 lg:py-10 lg:px-12 space-y-6 lg:text-lg'>
                  <FontSohneBreit>
                    <h3 className='text-4xl'>
                      <small className='uppercase font-bold text-2xl'>
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
                  <ul className='!mt-0 pl-8 list-disc'>
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
                <div className='bg-white py-8 px-6 lg:py-10 lg:px-12 lg:text-lg space-y-3'>
                  <FontSohneBreit>
                    <h3 className='text-4xl mb-6'>
                      <small className='uppercase font-bold text-2xl'>
                        MAY 29
                      </small>
                      <br />
                      Conference
                    </h3>
                  </FontSohneBreit>
                  <p>
                    <strong>Sessions:</strong>
                  </p>
                  <ul className='!mt-0 pl-8 list-disc'>
                    <li>Opening keynote with ClickHouse founders</li>
                    <li>Roadmap session with product leaders</li>
                    <li>In-depth customer talks from our largest users</li>
                    <li>Technical feature deep dives from our engineers</li>
                  </ul>
                  <p>
                    <strong>Breakouts:</strong>
                  </p>
                  <ul className='!mt-0 pl-8 list-disc'>
                    <li>Use Case & Integration Demos</li>
                    <li>“Built on ClickHouse” showcase</li>
                    <li>AMA Booth</li>
                  </ul>
                  <p>
                    <strong>Networking:</strong>
                  </p>
                  <ul className='!mt-0 pl-8 list-disc'>
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
          <section className='relative py-20 bg-white text-black'>
            <div
              className={`bg-white h-8 absolute -bottom-8 left-0 right-0 z-20 ${styles.textureMaskBottom}`}
            />
            <div className='max-w-[1413px] mx-auto px-6'>
              <h2 className='text-4xl text-center mb-4'>Speakers</h2>
              <p className='text-2xl text-center mb-10'>
                We have an exciting line-up of speakers, and more announcements
                on the way
              </p>
              <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mx-2 -my-4'>
                {initialSpeakers.map((profile, profileIndex) => {
                  return <SpeakerProfile {...profile} key={profileIndex} />
                })}
              </div>

              {overflowSpeakers.length > 0 && (
                <div
                  className={`relative transition-all duration-300 ${displayAllSpeakers ? 'mt-4' : 'mt-14'}`}>
                  <AnimatePresence onExitComplete={scrollToSpeakersToggle}>
                    {displayAllSpeakers && (
                      <motion.div
                        variants={{
                          closed: { opacity: 0, height: 0 },
                          open: { opacity: 1, height: 'auto' }
                        }}
                        initial='closed'
                        animate='open'
                        exit='closed'
                        transition={{
                          type: 'spring',
                          bounce: 0,
                          duration: 0.5
                        }}
                        className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mx-2'>
                        {overflowSpeakers.map((profile, profileIndex) => {
                          return (
                            <SpeakerProfile {...profile} key={profileIndex} />
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div
                    ref={speakersToggleRef}
                    className='text-center -mx-6 px-6 py-2 bg-white/60 backdrop-blur sticky bottom-0 z-40 sm:relative sm:backdrop-blur-0 sm:bg-transparent'>
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
            className={`relative pt-24 pb-20 lg:min-h-[700px] flex bg-[#2F3032] text-black bg-blend-screen ${styles.patternBackground}`}>
            <div className='max-w-xl mx-auto my-auto w-full px-6 lg:px-12'>
              <div className='space-y-6 md:space-y-0 md:grid grid-cols-1 gap-6'>
                <div className='bg-white py-8 px-6 lg:py-10 lg:px-12 space-y-8 text-lg text-center'>
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
          <section className='relative py-20 bg-white text-black'>
            <div className='max-w-6xl mx-auto px-6 lg:px-12'>
              <h2 className='text-4xl text-center mb-4'>FAQs</h2>
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
                <ul className='pl-8 list-disc mt-4'>
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
          <section className='relative pb-20 bg-white text-black'>
            <div className='max-w-6xl mx-auto px-6 lg:px-12'>
              <div className='bg-neutral-900 rounded p-8 lg:py-16 lg:px-14 text-white flex flex-col lg:flex-row items-center gap-y-10 gap-x-20'>
                <div className='w-full lg:w-auto'>
                  <h2 className='text-4xl mb-4'>Get in touch</h2>
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
                <div className='flex-1 w-full lg:w-auto text-center'>
                  <OpenHouseButton
                    href='/openhouse/register'
                    variant='primary'
                    size='lg'
                    className='flex-1 w-full sm:mx-auto sm:w-auto sm:min-w-48'>
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
        <div className='relative aspect-square mb-4 bg-[#EFEFEF]'>
          <Image
            src={image}
            alt={name}
            width={353}
            height={505}
            className='w-full h-full max-w-none absolute inset-0 z-10 transition grayscale group-hover/speaker:grayscale-0'
          />
        </div>
        <h3 className='text-lg md:text-xl lg:text-2xl'>{name}</h3>
        <p className='text-sm md:text-base lg:text-lg'>{title}</p>
      </div>
    </div>
  )
}
