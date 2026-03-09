import imageOpenhouseLogo from '../assets/logo.svg'
import styles from '../styles.module.scss'
import { CUICard } from '@/components/ClickUI'
import FontSohne from '@/components/FontSohne'
import Footer from '@/components/Footer'
import OpenHouseButton from '@/components/OpenHouseButton'
import OpenHouseHeader from '@/components/OpenHouseHeader'
import SeoContainer from '@/components/SeoContainer'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import 'swiper/css'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          title:
            'Open House User Conference - Free conference in San Francisco, CA. Watch parties hosted world-wide.',
          path: '/openhouse/register',
          image: [{ url: '/images/social-open-house.png' }]
        },
        ...commonProps
      }
    }
  }

export default function Page({ seo }: CommonProps) {
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
      <Footer />
    </>
  )
}
