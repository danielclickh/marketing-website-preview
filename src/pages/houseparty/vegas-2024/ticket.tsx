'use client'

import imageHeroImage from './hero-image.jpg'
import imageHeroTexture from './hero-texture.png'
import styles from './styles.module.scss'
import imageTicket from './ticket.png'
import Layout from '@/components/Layout'
import SocialButton from '@/components/SocialButton'
import { SuiText } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Tilt from 'react-parallax-tilt'

interface PageProps extends CommonProps {}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          title: "I'm going to the [Click]House Party with The Chainsmokers",
          description:
            "Hey, you! Yes, you — the one who’s ready to take a break from all the conference sessions and tech talk. We know you’ve been soaking in all the brilliance (and sales pitches) of AWS re:Invent, but now it’s time to let loose, have fun, and show off the dance moves you've been hiding.",
          path: '/houseparty/vegas-2024/ticket',
          image: [{ url: '/images/social-houseparty-vegas-2024-ticket.png' }]
        },
        ...commonProps
      }
    }
  }

export default function Page({ headerData, seo }: PageProps) {
  useGalaxyOnPage('reinvent2024AncillaryTicketPage')

  const router = useRouter()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState<boolean>(true)

  const heroImageRef = useRef<HTMLImageElement | null>(null)
  const heroImageTextureRef = useRef<HTMLImageElement | null>(null)
  const heroImageTextRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const scrollHanlder = () => {
      const scrollTop = window.scrollY
      if (heroImageRef.current) {
        // Prevent negative offset
        const translateY = Math.max(0, scrollTop / 3)
        heroImageRef.current.style.transform = `translateY(${translateY}px)`
      }

      if (heroImageTextureRef.current) {
        // Prevent negative offset
        const translateY = Math.max(0, scrollTop / 6)
        heroImageTextureRef.current.style.transform = `translateY(${translateY}px)`
      }
    }

    scrollHanlder()
    window.addEventListener('scroll', scrollHanlder, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollHanlder)
    }
  }, [heroImageRef, heroImageTextureRef, heroImageTextRef])

  useEffect(() => {
    ;(async function () {
      if (router.isReady) {
        const authedUrl = searchParams?.has('granted') || null
        const authedStorage = localStorage.getItem('houseparty-vegas-2024')
        if (authedUrl || authedStorage) {
          // Save auth for accessing without query string
          if (!authedStorage) localStorage.setItem('houseparty-vegas-2024', '1')

          // Removes the query string from the address bar, for sharing purposes
          if (authedUrl) await router.push(router.pathname)

          setLoading(false)
        } else {
          // Not authed, go to landing page
          await router.push('/houseparty/vegas-2024')
        }
      }
    })()
  }, [router])

  return (
    <>
      <Layout
        seo={seo}
        headerData={{ eyebrow: { className: '!bg-[#EBFF00]' }, ...headerData }}>
        {loading && (
          <div className='py-24 text-center'>Preparing your ticket...</div>
        )}
        {!loading && (
          <div className='relative overflow-hidden'>
            <Image
              ref={heroImageRef}
              src={imageHeroImage}
              width={3000}
              height={825}
              alt=''
              className='absolute block h-full w-full object-cover opacity-50'
            />
            <Image
              ref={heroImageTextureRef}
              src={imageHeroTexture}
              width={3000}
              height={825}
              alt=''
              className='absolute block h-full w-full object-cover'
            />
            <div className='relative z-10 flex pb-24 pt-16 lg:min-h-[700px]'>
              <div className='m-auto px-6 text-center'>
                <div className='text-white'>
                  <SuiText
                    weight='bold'
                    className='mb-4 select-none drop-shadow-[0_0_10px_rgb(0_0_0)]'>
                    Use the buttons below to let your networks know that you are
                    attending!
                  </SuiText>
                  <div className='mx-auto flex max-w-80 flex-wrap justify-center gap-4 text-neutral-0'>
                    <SocialButton
                      type='twitter'
                      url='https://clickhou.se/houseparty2024'
                      title="Just grabbed my ticket to the [Click]House Party during re:Invent in Vegas—who's joining me for an epic night?"
                      className='!px-3'
                    />
                    <SocialButton
                      type='linkedin'
                      url='https://clickhou.se/houseparty2024'
                      title="Just grabbed my ticket to the [Click]House Party during re:Invent in Vegas—who's joining me for an epic night?"
                      className='!px-3'
                    />
                  </div>
                </div>
                <SuiText
                  size='sm'
                  className='mb-4 mt-10 text-center opacity-80'>
                  This is not an official ticket. You will receive it before the
                  event.
                </SuiText>
                <Tilt
                  className={`${styles.ticketMask}`}
                  glareEnable={true}
                  glareMaxOpacity={0.5}
                  glarePosition='all'
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  gyroscope={true}>
                  <Image
                    src={imageTicket}
                    width={1465}
                    height={682}
                    alt='Ticket'
                    className='h-auto w-full max-w-2xl'
                  />
                </Tilt>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}
