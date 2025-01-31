import { GetStaticProps } from 'next'
import localFont from 'next/font/local'
import Image, { ImageProps } from 'next/image'
import Link, { LinkProps } from 'next/link'
import { Fragment } from 'react'
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
        <header className='fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur-sm bg-neutral-900/80'>
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
                <OpenHouseButton href='#' variant='light' size='sm'>
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
        <section className='py-20 bg-neutral-950'>
          <div className='max-w-6xl mx-auto px-6 lg:px-12 text-center'>
            <h2 className='text-4xl mb-20'>What’s happening at Open House?</h2>
            <div className='divide-y-2 divide-ch-yellow'>
              {(
                [
                  {
                    title: 'News & roadmap',
                    description:
                      'Hear from company founders and product leaders about latest company and product news and the future of ClickHouse.',
                    icon: {
                      src: imageIconMegaphone,
                      alt: 'Megaphone Icon',
                      width: 75,
                      height: 75
                    }
                  },
                  {
                    title: 'Technical track',
                    description:
                      'Dive deep into the newest features for real-time analytics, data warehousing, observability, and AI/ML use cases.',
                    icon: {
                      src: imageIconBinary,
                      alt: 'Binary Icon',
                      width: 75,
                      height: 75
                    }
                  },
                  {
                    title: 'Networking',
                    description:
                      'Hear talks and see demos from other users and network during breakfast, lunch, and evening reception.',
                    icon: {
                      src: imageIconNetwork,
                      alt: 'Networking Icon',
                      width: 75,
                      height: 75
                    }
                  },
                  {
                    title: 'Ask me anything',
                    description:
                      'ClickHouse experts from core database developers to support around every day to answer questions in a dedicated AMA area.',
                    icon: {
                      src: imageIconFaq,
                      alt: 'FAQ Icon',
                      width: 75,
                      height: 75
                    }
                  }
                ] satisfies Array<{
                  title: string
                  description: string
                  icon: ImageProps
                }>
              ).map((row, rowIndex) => {
                return (
                  <div
                    key={rowIndex}
                    className='grid grid-cols-[repeat(15,_minmax(0,_1fr))] divide-x-2 divide-white'>
                    <div className='col-span-2 flex items-center justify-center py-6'>
                      <Image {...row.icon} />
                    </div>
                    <div className='col-span-5 text-center flex items-center justify-center uppercase font-bold text-2xl py-6'>
                      {row.title}
                    </div>
                    <div className='col-span-8 flex items-center py-6'>
                      {row.description}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Agenda */}

        {/* Speakers */}

        {/* CTAs */}

        {/* FAQs */}

        {/* Get in touch */}
      </div>
      <Footer {...footerData} />
    </>
  )
}

type OpenHouseButtonVariants = 'light' | 'dark' | 'primary'
type OpenHouseButtonSizes = 'sm' | 'md' | 'lg'

interface OpenHouseButtonProps extends LinkProps {
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
