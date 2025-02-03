import { GetStaticProps } from 'next'
import localFont from 'next/font/local'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import Footer from '../../components/Footer'
import SeoContainer from '../../components/SeoContainer'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import logoFull from '../../public/logo-full.svg'
import { CommonProps } from '../../types/homepage'
import imageGallery1 from './assets/gallery-1.jpg'
import imageGallery2 from './assets/gallery-2.jpg'
import imageGallery3 from './assets/gallery-3.jpg'
import imageGallery4 from './assets/gallery-4.jpg'
import imageIconBinary from './assets/icon-binary.svg'
import imageIconFaq from './assets/icon-faq.svg'
import imageIconMegaphone from './assets/icon-megaphone.svg'
import imageIconNetwork from './assets/icon-network.svg'
import imageOpenhouseLogo from './assets/logo.svg'
import imageAaronKatz from './assets/speaker-aaron-katz.png'
import imageAlexyMilovidov from './assets/speaker-alexey-milovidov.png'
import imageMarkNeedham from './assets/speaker-mark-needham.png'
import imageRobertSchulze from './assets/speaker-robert-schulze.png'
import imageRopaTangirala from './assets/speaker-roopa-tangirala.png'
import imageTanyaBragin from './assets/speaker-tanya-bragin.png'
import imageYuryIzrailevsky from './assets/speaker-yury-izrailevsky.png'
import imageZoeSteinkamp from './assets/speaker-zoe-steinkamp.png'
import styles from './styles.module.scss'

const sohne = localFont({
  src: [
    {
      path: './assets/fonts/soehne-buch.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './assets/fonts/soehne-buch-kursiv.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './assets/fonts/soehne-dreiviertelfett.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './assets/fonts/soehne-dreiviertelfett-kursiv.woff2',
      weight: '600',
      style: 'italic'
    }
  ]
})

const sohneBreit = localFont({
  src: [
    {
      path: './assets/fonts/soehne-breit-kraftig.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './assets/fonts/soehne-breit-kraftig-kursiv.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './assets/fonts/soehne-breit-halbfett.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './assets/fonts/soehne-breit-halbfett-kursiv.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './assets/fonts/soehne-breit-dreiviertelfett.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './assets/fonts/soehne-breit-dreiviertelfett-kursiv.woff2',
      weight: '600',
      style: 'italic'
    }
  ]
})

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          title:
            'Open House User Conference - Free conference in San Francisco, CA. Watch parties hosted world-wide.',
          path: '/openhouse'
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo, footerData }: CommonProps) {
  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <div className={`readable-content ${sohne.className}`}>
        {/* Header */}
        <header className='fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur-sm bg-black/80'>
          <div className='max-w-6xl mx-auto px-6 lg:px-12 py-4'>
            <div className='h-10 flex items-center justify-between'>
              <Link href='/' prefetch={false}>
                <Image
                  src={logoFull}
                  priority
                  width='135'
                  height='40'
                  alt='ClickHouse logo'
                />
              </Link>
              <div className='flex gap-4'>
                <OpenHouseButton
                  href='https://sessionize.com/clickhouse-user-conference-2025/'
                  target='_blank'
                  variant='light'
                  size='sm'
                  className='hidden sm:inline-block'>
                  Apply to speak
                </OpenHouseButton>
                <OpenHouseButton
                  href='/openhouse/register'
                  variant='primary'
                  size='sm'>
                  Register
                </OpenHouseButton>
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className='bg-black overflow-hidden relative pt-16'>
          <div className='relative max-w-6xl mx-auto px-6 lg:px-12'>
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
                />
              </div>
              <div className='md:self-center flex-shrink-0 flex-grow-0 text-center md:text-left'>
                <h2 className='text-2xl font-bold leading-loose'>
                  May 28-29, 2025
                </h2>
                <p className='text-xl leading-loose mb-4'>
                  Free conference in San Francisco, CA
                  <br />
                  Watch parties hosted world-wide.
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

        {/* Ticker tape */}
        <div className='bg-ch-teal py-3 lg:py-6'>
          <Ticker>
            {() => (
              <div className='text-lg lg:text-2xl font-bold flex items-center flex-nowrap w-max'>
                {[
                  'Hands-on training',
                  'Product roadmap',
                  'Case studies',
                  'Tech talks',
                  'AMA booth',
                  'Hands-on training',
                  'Product'
                ].map((word, wordIndex) => {
                  return (
                    <Fragment key={wordIndex}>
                      <span className='text-ch-yellow mx-6 inline-block flex-grow-0 flex-shrink-0'>
                        •
                      </span>
                      <span
                        key={wordIndex}
                        className='block white-space-nowrap flex-grow-0 flex-shrink-0'>
                        {word}
                      </span>
                    </Fragment>
                  )
                })}
              </div>
            )}
          </Ticker>
        </div>

        {/* Gallery */}
        <div className='py-24 bg-white'>
          <Swiper
            slidesPerView='auto'
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            loopAddBlankSlides={false}
            loopPreventsSliding={true}
            allowTouchMove={true}
            className={styles.centerImageGallery}>
            {(
              [
                {
                  src: imageGallery1,
                  alt: 'Photo 1',
                  width: 874 / 2,
                  height: 960 / 2
                },
                {
                  src: imageGallery2,
                  alt: 'Photo 2',
                  width: 558 / 2,
                  height: 880 / 2
                },
                {
                  src: imageGallery3,
                  alt: 'Photo 3',
                  width: 762 / 2,
                  height: 960 / 2
                },
                {
                  src: imageGallery4,
                  alt: 'Photo 4',
                  width: 656 / 2,
                  height: 880 / 2
                }
              ] satisfies Array<ImageProps>
            ).map((image, imageIndex) => {
              return (
                <SwiperSlide key={imageIndex} style={{ width: image.width }}>
                  <Image {...image} className='w-full h-auto' />
                </SwiperSlide>
              )
            })}
          </Swiper>
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
          <div className='max-w-6xl mx-auto px-6 lg:px-12'>
            <h2 className='text-4xl mb-10 text-center'>Agenda at a glance</h2>
            <div className='space-y-6 lg:space-y-0 lg:grid grid-cols-2 gap-6'>
              <div className='bg-white py-8 px-6 lg:py-10 lg:px-12 space-y-6 lg:text-lg'>
                <h3 className={`text-4xl ${sohneBreit.className}`}>
                  <small className='uppercase font-bold text-2xl'>MAY 28</small>
                  <br />
                  Workshop
                </h3>
                <p>
                  Join us for a free "Developer Fast Track"
                  <br />
                  hands-on training.
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
                <h3 className={`text-4xl mb-6 ${sohneBreit.className}`}>
                  <small className='uppercase font-bold text-2xl'>MAY 29</small>
                  <br />
                  Conference
                </h3>
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
          <div className='max-w-6xl mx-auto px-6 lg:px-12'>
            <h2 className='text-4xl text-center mb-4'>Speakers</h2>
            <p className='text-2xl text-center mb-10'>
              We have an exciting line-up of speakers, and more announcements on
              the way
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8'>
              {(
                [
                  {
                    name: 'Aaron Katz',
                    title: 'Founder, CEO',
                    image: imageAaronKatz
                  },
                  {
                    name: 'Tanya Bragin',
                    title: 'VP Product & Marketing',
                    image: imageTanyaBragin
                  },
                  {
                    name: 'Alexy Milovidov',
                    title: 'Founder, CTO',
                    image: imageAlexyMilovidov
                  },
                  {
                    name: 'Roopa Tangirala',
                    title: 'VP, Engineering',
                    image: imageRopaTangirala
                  },
                  {
                    name: 'Mark Needham',
                    title: 'Principal PME',
                    image: imageMarkNeedham
                  },
                  {
                    name: 'Robert Schulze',
                    title: 'Core Engineering Lead',
                    image: imageRobertSchulze
                  },
                  {
                    name: 'Zoe Steinkamp',
                    title: 'Senior Developer Advocate',
                    image: imageZoeSteinkamp
                  },
                  {
                    name: 'Yury Izrailevsky',
                    title: 'Founder, President',
                    image: imageYuryIzrailevsky
                  }
                ] satisfies Array<{
                  name: string
                  title: string
                  image: ImageProps['src']
                }>
              ).map((profile, profileIndex) => {
                return (
                  <div key={profileIndex}>
                    <div className='relative -mx-3 mb-4'>
                      <div
                        className={`absolute top-5 left-3 right-3 bottom-0 bg-[#EFEFEF] ${styles.gridBackgroundSmall}`}
                      />
                      <Image
                        src={profile.image}
                        alt={profile.name}
                        width={353}
                        height={505}
                        className='w-full h-auto max-w-none relative z-10'
                      />
                    </div>
                    <h3 className='text-2xl'>{profile.name}</h3>
                    <p className='text-lg'>{profile.title}</p>
                  </div>
                )
              })}
            </div>

            <div className='mt-14 text-center'>
              <OpenHouseButton
                href='https://sessionize.com/clickhouse-user-conference-2025/'
                target='_blank'
                variant='dark'
                size='lg'
                className='min-w-48'>
                Apply to speak
              </OpenHouseButton>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section
          className={`relative pt-24 pb-20 lg:min-h-[700px] flex bg-[#2F3032] text-black bg-blend-screen ${styles.patternBackground}`}>
          <div className='max-w-6xl mx-auto my-auto w-full px-6 lg:px-12'>
            <div className='space-y-6 md:space-y-0 md:grid grid-cols-2 gap-6'>
              <div className='bg-white py-8 px-6 lg:py-10 lg:px-12 space-y-8 text-lg'>
                <h3 className={`text-4xl ${sohneBreit.className}`}>
                  Open House
                </h3>
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
                    className='min-w-48 border border-black'>
                    Register
                  </OpenHouseButton>
                </p>
              </div>
              <div className='bg-white py-8 px-6 lg:py-10 lg:px-12 space-y-8 text-lg'>
                <h3 className={`text-4xl mb-6 ${sohneBreit.className}`}>
                  Watch Parties
                </h3>
                <p>
                  Can’t make it to San Francisco? We’ll be hosting watch parties
                  in select cities worldwide.
                </p>
                <p>
                  <strong>Stay tuned for more information.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className='relative py-20 bg-white text-black'>
          <div className='max-w-6xl mx-auto px-6 lg:px-12'>
            <h2 className='text-4xl text-center mb-4'>FAQs</h2>
            <AccordionItem handle='What is Open House 2025 by ClickHouse?'>
              <p className='max-w-3xl'>
                Open House 2025 is the first ever ClickHouse User Conference! It
                is a premier one-day event for ClickHouse users, contributors,
                enthusiasts, and customers, hosted in the heart of San Francisco
                on 29 May. For those unable to join in person, the event will be
                streamed to multiple locations worldwide, ensuring everyone can
                be part of this global gathering.
              </p>
            </AccordionItem>
            <AccordionItem handle='Where will the event be live-streamed?'>
              <p className='max-w-3xl'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur debitis dignissimos eos facilis in ipsa ipsam,
                iusto maiores, pariatur perferendis porro quae quibusdam quo
                quos sunt tenetur veniam voluptatem voluptatum!
              </p>
            </AccordionItem>
            <AccordionItem handle='What can I expect from the agenda?'>
              <p className='max-w-3xl'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur debitis dignissimos eos facilis in ipsa ipsam,
                iusto maiores, pariatur perferendis porro quae quibusdam quo
                quos sunt tenetur veniam voluptatem voluptatum!
              </p>
            </AccordionItem>
            <AccordionItem handle='Will you be offering in-person training?'>
              <p className='max-w-3xl'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur debitis dignissimos eos facilis in ipsa ipsam,
                iusto maiores, pariatur perferendis porro quae quibusdam quo
                quos sunt tenetur veniam voluptatem voluptatum!
              </p>
            </AccordionItem>
            <AccordionItem handle='Will there be a CFP process for speakers?'>
              <p className='max-w-3xl'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur debitis dignissimos eos facilis in ipsa ipsam,
                iusto maiores, pariatur perferendis porro quae quibusdam quo
                quos sunt tenetur veniam voluptatem voluptatum!
              </p>
            </AccordionItem>
          </div>
        </section>

        {/* Get in touch */}
        <section className='relative pb-20 bg-white text-black'>
          <div className='max-w-6xl mx-auto px-6 lg:px-12'>
            <div className='bg-ch-teal rounded p-8 lg:py-16 lg:px-14 text-white flex flex-col lg:flex-row items-center gap-y-10 gap-x-20'>
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
              <div className='flex flex-col sm:flex-row gap-4 items-center flex-1 w-full lg:w-auto'>
                <OpenHouseButton
                  href='https://sessionize.com/clickhouse-user-conference-2025/'
                  target='_blank'
                  variant='light'
                  size='lg'
                  className='flex-1 w-full sm:w-auto'>
                  Apply to speak
                </OpenHouseButton>
                <OpenHouseButton
                  href='/openhouse/register'
                  variant='primary'
                  size='lg'
                  className='flex-1 w-full sm:w-auto'>
                  Register
                </OpenHouseButton>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer {...footerData} />
    </>
  )
}

type OpenHouseButtonVariants = 'light' | 'dark' | 'primary'
type OpenHouseButtonSizes = 'sm' | 'md' | 'lg'

interface OpenHouseButtonProps
  extends LinkProps,
    Omit<React.HTMLProps<HTMLAnchorElement>, keyof LinkProps | 'size' | 'ref'> {
  children: React.ReactNode
  variant?: OpenHouseButtonVariants
  size?: OpenHouseButtonSizes
  className?: string
}

const openHouseButtonVariantClasses: Record<OpenHouseButtonVariants, string> = {
  light: 'bg-white text-neutral-750',
  dark: 'bg-neutral-750 text-white',
  primary: 'bg-ch-yellow text-neutral-750'
}

const openHouseButtonSizeClasses: Record<OpenHouseButtonSizes, string> = {
  sm: 'px-3 py-1 text-sm leading-normal',
  md: 'px-4 py-2 text-base leading-normal',
  lg: 'px-6 py-3 text-base leading-normal'
}

function OpenHouseButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...link
}: OpenHouseButtonProps) {
  return (
    <Link
      {...link}
      className={`inline-block rounded text-center transition-colors ${sohneBreit.className} ${openHouseButtonVariantClasses[variant]} ${openHouseButtonSizeClasses[size]} ${className}`}>
      {children}
    </Link>
  )
}

export interface AccordionItemProps {
  handle: string
  children: React.ReactNode
  open?: boolean
  className?: React.HTMLProps<HTMLDivElement>['className']
  id?: React.HTMLProps<HTMLDivElement>['id']
}

function AccordionItem({
  handle,
  children,
  open = false,
  className = '',
  id
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Sync local state with prop
  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <div className={`border-b-2 border-black ${className}`}>
      <button
        onClick={() => setIsOpen((old) => !old)}
        className='flex w-full items-center gap-4 py-4 text-left text-lg'>
        <span className='flex-1 text-xl'>{handle}</span>
        <span className='relative ml-auto block aspect-square w-10 flex-shrink-0 flex-grow-0 p-3 transition-colors lg:w-12 lg:p-4'>
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? '-rotate-90' : ''}`}>
            <span
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
            />
            <span className='absolute inset-0 rotate-90 bg-black' />
          </span>
        </span>
      </button>
      <div className={`-mt-4 pb-6 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  )
}
