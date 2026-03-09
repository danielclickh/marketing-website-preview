import faqs from './faqs.json'
import imageHeroImage from './hero-image.jpg'
import imageHeroText from './hero-text.png'
import imageHeroTexture from './hero-texture.png'
import styles from './styles.module.scss'
import imageTexture from './texture.png'
import imageTicketBlob from './ticket-blob.png'
import { CUIButton } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { ChevronRightIcon } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          title: 'House Party with The Chainsmokers 2024',
          description:
            "Hey, you! Yes, you — the one who’s ready to take a break from all the conference sessions and tech talk. We know you’ve been soaking in all the brilliance (and sales pitches) of AWS re:Invent, but now it’s time to let loose, have fun, and show off the dance moves you've been hiding.",
          path: '/houseparty/vegas-2024',
          image: [{ url: '/images/houseparty-2024.png' }]
        },
        ...commonProps
      }
    }
  }

export default function Page({ headerData, seo }: CommonProps) {
  useGalaxyOnPage('reinvent2024AncillaryPage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

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

  return (
    <>
      <Layout
        seo={seo}
        headerData={{ eyebrow: { className: '!bg-[#EBFF00]' }, ...headerData }}>
        <div className='relative bg-[#EFEFEF]'>
          {/* Background texture */}
          <Image
            src={imageTexture}
            width={1966}
            height={4096}
            alt=''
            className='pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-40'
          />

          <div className='relative z-10 text-primary-900'>
            {/* Hero image */}
            <div
              className={`relative aspect-[2000/825] overflow-hidden lg:aspect-auto lg:h-[420px] ${styles.heroMask}`}>
              <Image
                ref={heroImageRef}
                src={imageHeroImage}
                width={3000}
                height={825}
                priority
                loading='eager'
                alt=''
                className='absolute block h-full w-full object-cover'
              />
              <Image
                ref={heroImageTextureRef}
                src={imageHeroTexture}
                width={3000}
                height={825}
                loading='eager'
                priority
                alt=''
                className='absolute block h-full w-full object-cover'
              />
              <Image
                ref={heroImageTextRef}
                src={imageHeroText}
                width={3000}
                height={825}
                loading='eager'
                priority
                alt='ClickHouse house party with The Chainsmokers!'
                className='absolute block h-full w-full object-cover lg:object-scale-down'
              />
            </div>
            <div className='w-full md:hidden'>
              <CUIButton
                type='primary'
                className='group mx-auto mt-4 w-auto !bg-[#EBFF00] md:mt-0'
                target='_self'
                href='/houseparty/vegas-2024#register'
                iconRight={
                  <ChevronRightIcon
                    height='18'
                    className='pt-0.5 transition group-hover:translate-x-1/2'
                  />
                }>
                Join the waitlist
              </CUIButton>
            </div>

            {/* Form section */}
            <div className='py-10 lg:py-20'>
              <div className='section-container flex flex-col items-start gap-10 lg:flex-row lg:gap-20'>
                <div className='space-y-6'>
                  <SuiTitle
                    type='h2'
                    weight='bold'
                    className='md:!text-[3.5rem]'>
                    You + ClickHouse + The&nbsp;Chainsmokers + One Epic Night =
                    House Party
                  </SuiTitle>
                  <SuiText className='font-semibold lg:text-xl'>
                    Tuesday, December 3
                    <br />
                    9:00 PM - 12:00 AM PT | Las Vegas
                  </SuiText>
                  <SuiText className='font-semibold lg:text-xl'>
                    Hey, you! Yes, you—the one who’s ready to take a break from
                    all the conference sessions and tech talk. We know you’ve
                    been soaking in all the brilliance (and sales pitches) of
                    AWS re:Invent, but now it’s time to let loose, have some
                    fun, and maybe show off those dance moves you've been
                    hiding.
                  </SuiText>
                  <SuiText className='font-semibold lg:text-xl'>
                    Welcome to the House Party!
                  </SuiText>
                </div>
                <div
                  className='w-full flex-shrink-0 lg:min-h-[640px] lg:max-w-lg'
                  id='register'>
                  <div className='rounded-lg bg-[#D6D6D6] bg-opacity-50 p-4 lg:p-8'>
                    {!formLoaded && (
                      <div className='flex items-center justify-center text-center'>
                        Loading form...
                      </div>
                    )}

                    {!formSuccess && (
                      <MarketoForm
                        formId='1258'
                        theme='light'
                        disclaimer={
                          <p className='text-xs'>
                            By registering, you acknowledge that ClickHouse will
                            process your personal information in accordance with
                            our{' '}
                            <Link
                              href='/legal/privacy-policy'
                              className='underline'>
                              Privacy Policy
                            </Link>
                            .
                          </p>
                        }
                        onLoad={() => setFormLoaded(true)}
                        onSuccess={() => {
                          setFormSuccess(true)

                          // Delay needed to allow the ref to update before scrolling
                          setTimeout(() => {
                            formSuccessRef.current?.scrollIntoView()
                          }, 10)

                          return false // Stops page from reloading
                        }}
                      />
                    )}
                    {formSuccess && (
                      <div
                        ref={formSuccessRef}
                        className='flex flex-col items-center justify-center py-6 text-center text-primary-900'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='64'
                          height='64'
                          fill='none'
                          viewBox='0 0 64 64'
                          className='mb-6'>
                          <path
                            fill='#EBFF00'
                            fillRule='evenodd'
                            stroke='#EBFF00'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M32 56v0A24 24 0 0 1 8 32v0A24 24 0 0 1 32 8v0a24 24 0 0 1 24 24v0a24 24 0 0 1-24 24Z'
                            clipRule='evenodd'
                          />
                          <path
                            stroke='#282828'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M42.67 26.68 29.33 40l-8-8'
                          />
                        </svg>
                        <SuiTitle type='h3' className='mb-3 text-xl font-bold'>
                          You’ve been successfully <br />
                          added to the waitlist!
                        </SuiTitle>
                        <p>
                          We'll be notifying you via email so please check your
                          emails (including spam folders) periodically.
                        </p>
                        {/* <SuiText weight='bold' className='mb-4 mt-12'>
                          Share the event
                        </SuiText>
                        <div className='mx-auto flex max-w-80 flex-wrap justify-center gap-4 text-neutral-0'>
                          <CopyUrlButton className='!px-3' />
                          <SocialButton
                            type='twitter'
                            title='ClickHouse + The Chainsmokers + Vegas = an epic House Party'
                            className='!px-3'
                          />
                          <SocialButton
                            type='facebook'
                            title='ClickHouse + The Chainsmokers + Vegas = an epic House Party'
                            className='!px-3'
                          />
                          <SocialButton
                            type='linkedin'
                            title='ClickHouse + The Chainsmokers + Vegas = an epic House Party'
                            className='!px-3'
                          />
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* What's going on */}
            <div className='py-10 lg:py-20'>
              <div className='section-container flex flex-col gap-10 lg:flex-row lg:gap-20'>
                <div>
                  <Image
                    src={imageTicketBlob}
                    width={1073}
                    height={825}
                    alt=''
                    className='origin-bottom-right lg:scale-150'
                  />
                </div>
                <div className='max-w-[600px] space-y-6'>
                  <SuiTitle type='h3'>What’s going down</SuiTitle>
                  <SuiText className='!mt-0'>
                    Picture this: You, a killer DJ set, and a room full of
                    fellow ClickHouse users and re:Invent attendees who are just
                    as ready to party as you are. It’s not just “any” DJ set
                    though. ClickHouse is super excited to bring The
                    Chainsmokers to the party.
                  </SuiText>

                  <SuiText>
                    No, we aren’t kidding. That’s for real. The Chainsmokers! In
                    Vegas! At re:Invent! Told you it was a House Party.
                  </SuiText>
                  <SuiTitle type='h3'>The where and when</SuiTitle>
                  <SuiText className='!mt-0'>
                    So, here’s the deal: It’s all happening on Tuesday, December
                    3, 2024 from 9:00 PM - 12:00 AM PT in a location disclosed
                    when you receive your ticket. We are a bunch of high-speed
                    database, real-time data warehouse enthusiasts…and so are
                    you. No pretentious vibes here, just a place where you can
                    kick back, relax, and dance. It’s the perfect place to hit
                    pause on the conference hustle and just enjoy yourself.
                  </SuiText>
                  <SuiTitle type='h3'>Your ticket to fun</SuiTitle>
                  <SuiText className='!mt-0'>
                    We know you don’t want to miss this, and we don’t want you
                    to either. But here’s the catch—{' '}
                    <strong>tickets are extremely limited</strong>. So, do
                    yourself a favor and put your name on the waitlist now
                    (that’s all it takes). We will be releasing tickets in waves
                    (check the{' '}
                    <Link
                      href='#faqs'
                      className='underline transition-opacity hover:opacity-70'>
                      FAQs
                    </Link>{' '}
                    below).
                  </SuiText>
                  <SuiText>
                    Trust us, future you will be thanking present you for making
                    this happen. Prepare to make some memories, start a few
                    dance battles, and take a #SELFIE. See you there!
                  </SuiText>
                </div>
              </div>
            </div>
            {/* FAQs */}
            <div className='relative py-10 lg:py-20' id='faqs'>
              <div className='bg-shadow-element yellow-shadow align-shadow-right absolute right-0 h-full w-1/2 -translate-y-1/4' />
              <div className='section-container relative z-10'>
                <SuiTitle type='h2' className='text-center'>
                  We’re here to answer all your questions.
                </SuiTitle>

                <div className='mt-10 space-y-2.5'>
                  {faqs.map((faq, index) => {
                    return (
                      <FaqAccordion key={index} question={faq.title}>
                        <SuiText className='max-w-3xl'>
                          <Markdown>{faq.content}</Markdown>
                        </SuiText>
                      </FaqAccordion>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

function FaqAccordion({
  question,
  children,
  open = false
}: {
  question: string | React.ReactNode
  children: React.ReactNode
  open?: boolean
}) {
  const [isOpen, setIsOpen] = useState(open)
  return (
    <div className='rounded bg-neutral-725 text-white'>
      <button
        className={`flex w-full items-center justify-between px-8 py-6 text-left transition-colors lg:px-14 lg:text-xl ${
          isOpen ? 'text-[#EBFF00]' : 'text-white/80 hover:text-white'
        }`}
        onClick={() => setIsOpen((old) => !old)}>
        <span className='flex-1'>{question}</span>
        <span className='relative block h-4 w-4 flex-shrink-0 flex-grow-0'>
          <span
            className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded bg-[#EBFF00] transition-all duration-300 ${
              isOpen ? '-rotate-90 opacity-0' : ''
            }`}></span>
          <span
            className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded bg-[#EBFF00] transition-all duration-300 ${
              isOpen ? '' : 'rotate-90'
            }`}></span>
        </span>
      </button>
      <div className={`px-8 pb-8 lg:px-14 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  )
}
