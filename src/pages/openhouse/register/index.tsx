import imageOpenhouseLogo from '../assets/logo.svg'
import styles from '../styles.module.scss'
import { CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import EventPost from '@/components/EventPostList/EventPost'
import FontSohne from '@/components/FontSohne'
import Footer from '@/components/Footer'
import MarketoForm from '@/components/MarketoForm'
import OpenHouseButton from '@/components/OpenHouseButton'
import OpenHouseHeader from '@/components/OpenHouseHeader'
import SeoContainer from '@/components/SeoContainer'
import SocialButton from '@/components/SocialButton'
import { SuiButton } from '@/components/sui'
import { findAll } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { EventType } from '@/types/events'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import 'swiper/css'

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
          path: '/openhouse/register',
          image: [{ url: '/images/social-open-house.png' }]
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
      <FontSohne>
        <div
          className={`readable-content bg-neutral-950 py-20 ${styles.dotBackground}`}>
          {/* Header */}
          <OpenHouseHeader>
            <OpenHouseButton
              href='/company/contact'
              variant='primary'
              size='sm'>
              Get in touch
            </OpenHouseButton>
          </OpenHouseHeader>

          {/* Form */}
          <section>
            <div className='mx-auto max-w-6xl px-6 lg:px-12'>
              <CUICard className='my-20 px-6 py-20 text-center backdrop-blur-sm'>
                <CUICard.Body>
                  <Link href='/openhouse' className='inline-block'>
                    <Image
                      src={imageOpenhouseLogo}
                      alt='Open House By ClickHouse'
                      width={326}
                      height={160}
                      loading='eager'
                      priority
                      className='mb-10'
                    />
                  </Link>
                  <p className='text-xl font-bold text-white'>
                    Registration closed.
                  </p>
                </CUICard.Body>
              </CUICard>
            </div>
          </section>
        </div>
      </FontSohne>
      <Footer {...footerData} />
    </>
  )
}
