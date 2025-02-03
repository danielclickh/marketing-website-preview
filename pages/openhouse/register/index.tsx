import { GetStaticProps } from 'next'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import React, { useRef, useState } from 'react'
import 'swiper/css'
import { CUICard } from '../../../components/ClickUI'
import CopyUrlButton from '../../../components/CopyUrlButton'
import EventPost from '../../../components/EventPostList/EventPost'
import Footer from '../../../components/Footer'
import MarketoForm from '../../../components/MarketoForm'
import SeoContainer from '../../../components/SeoContainer'
import SocialButton from '../../../components/SocialButton'
import { SuiButton } from '../../../components/sui'
import { findAll } from '../../../lib/api/strapi'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import logoFull from '../../../public/logo-full.svg'
import { EventType } from '../../../types/events'
import { CommonProps } from '../../../types/homepage'
import imageOpenhouseLogo from '../assets/logo.svg'
import styles from '../styles.module.scss'

const sohne = localFont({
  src: [
    {
      path: './../assets/fonts/soehne-buch.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './../assets/fonts/soehne-buch-kursiv.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './../assets/fonts/soehne-dreiviertelfett.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './../assets/fonts/soehne-dreiviertelfett-kursiv.woff2',
      weight: '600',
      style: 'italic'
    }
  ]
})

const sohneBreit = localFont({
  src: [
    {
      path: './../assets/fonts/soehne-breit-kraftig.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './../assets/fonts/soehne-breit-kraftig-kursiv.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './../assets/fonts/soehne-breit-halbfett.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './../assets/fonts/soehne-breit-halbfett-kursiv.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: './../assets/fonts/soehne-breit-dreiviertelfett.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './../assets/fonts/soehne-breit-dreiviertelfett-kursiv.woff2',
      weight: '600',
      style: 'italic'
    }
  ]
})

interface RegisterPageProps extends CommonProps {
  recentEvents: Array<EventType>
}

export const getStaticProps: GetStaticProps<RegisterPageProps> =
  async function getStaticProps() {
    const commonPromise = getCommonProps()

    const eventsPromise = findAll('events', {
      filters: {
        localDatetime: {
          $gte: new Date().toISOString()
        }
      },
      sort: ['localDatetime:ASC'],
      populate: [
        'thumbnailPng',
        'hostedBy',
        'hostedBy.hosts',
        'hostedBy.hosts.avatarPng',
        'agenda',
        'agenda.items',
        'location',
        'darkFeatureImagePng',
        'lightFeatureImagePng',
        'form'
      ],
      pagination: { limit: 3 }
    })

    const [commonProps, { data: recentEvents }] = await Promise.all([
      commonPromise,
      eventsPromise
    ])

    return {
      props: {
        seo: {
          title:
            'Open House User Conference - Free conference in San Francisco, CA. Watch parties hosted world-wide.',
          path: '/openhouse'
        },
        recentEvents,
        ...commonProps
      }
    }
  }

export default function Page({
  seo,
  footerData,
  recentEvents
}: RegisterPageProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)
  return (
    <>
      {seo && <SeoContainer {...seo} />}
      <div
        className={`readable-content ${sohne.className} bg-neutral-950 ${styles.dotBackground}`}>
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

        {/* Form */}
        <section className='my-20'>
          <div className='max-w-6xl mx-auto px-6 lg:px-12'>
            <Link href='/openhouse' className='inline-block'>
              <Image
                src={imageOpenhouseLogo}
                alt='Open House By ClickHouse'
                width={326}
                height={160}
                className='my-20'
              />
            </Link>
            <CUICard className='p-6 backdrop-blur-sm'>
              <CUICard.Body>
                {!formSuccess && (
                  <>
                    <h1 className='text-3xl mb-4'>Register</h1>
                    <MarketoForm
                      formId='1317'
                      clearbitTracking={true}
                      onLoad={() => setFormLoaded(true)}
                      onSuccess={() => {
                        setFormSuccess(true)

                        // Delay needed to allow the ref to update before scrolling
                        setTimeout(() => {
                          formSuccessRef.current?.scrollIntoView({
                            behavior: 'smooth'
                          })
                        }, 10)

                        return false // Stops page from reloading
                      }}
                    />
                  </>
                )}
                {!formLoaded && (
                  <div className='text-center mt-10 mb-12'>Loading form...</div>
                )}

                {formSuccess && (
                  <div
                    ref={formSuccessRef}
                    className='text-center flex flex-col items-center py-6 lg:py-10'>
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
                    <p className='mt-6 text-white font-bold text-xl'>
                      You’ve been successfully <br />
                      registered for Open House 2025!
                    </p>
                    <p className='mt-12 mb-3 text-center font-bold text-neutral-400'>
                      Share this event
                    </p>
                    <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                      <CopyUrlButton />
                      {['y_combinator', 'twitter', 'facebook', 'linkedin'].map(
                        (social) => (
                          <SocialButton
                            key={social}
                            type={social}
                            title='Open House by ClickHouse'
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              </CUICard.Body>
            </CUICard>
          </div>
        </section>
        {formSuccess && (
          <div className='mx-auto my-36 max-w-7xl px-4 pb-10 sm:px-8 2xl:px-0'>
            <div className='flex justify-between'>
              <h3 className='mb-10 font-basier text-4xl'>Upcoming events</h3>
              <SuiButton
                path='/company/news-event'
                type='empty'
                color='primary'
                className='font-base hidden border border-primary-300/50 md:inline-block !no-underline backdrop-blur-sm'>
                View all events
              </SuiButton>
            </div>
            <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {recentEvents.map((event) => (
                <EventPost key={event.id} {...event} />
              ))}
            </div>
          </div>
        )}
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
