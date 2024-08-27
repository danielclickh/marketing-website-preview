import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import CopyUrlButton from '../../../components/CopyUrlButton'
import EventPost from '../../../components/EventPostList/EventPost'
import Layout from '../../../components/Layout'
import MarketoForm from '../../../components/MarketoForm'
import SocialButton from '../../../components/SocialButton'
import { SuiButton, SuiText, SuiTitle } from '../../../components/sui'
import { findAll } from '../../../lib/api/strapi'
import { galaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { EventType } from '../../../types/events'
import { CommonProps } from '../../../types/homepage'
import Image from 'next/image'
import imageHero from './hero.png'
import imageTexture from './texture.png'
import imageTicket from './ticket.png'

interface PageProps extends CommonProps {
  recentEvents: Array<EventType>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const { data: recentEvents }: { data: PageProps['recentEvents'] } =
      await findAll('events', {
        filters: {
          localDatetime: {
            $gte: new Date().toISOString()
          }
        },
        sort: ['localDatetime:ASC'],
        populate: ['thumbnailPng', 'location'],
        pagination: { limit: 3 }
      })

    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          title: 'House Party with The Chainsmokers',
          description:
            "Hey, you! Yes, you — the one who’s ready to take a break from all the conference sessions and tech talk. We know you’ve been soaking in all the brilliance (and sales pitches) of AWS re:Invent, but now it’s time to let loose, have fun, and show off the dance moves you've been hiding.",
          path: '/houseparty/vegas-2024'
          //image: [{ url: '' }]
        },
        recentEvents,
        ...commonProps
      }
    }
  }

export default function Page({
  footerData,
  headerData,
  seo,
  recentEvents
}: PageProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  galaxyOnPage('reinvent2024AncillaryPage')

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
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
            <Image
              src={imageHero}
              width={3000}
              height={825}
              alt='ClickHouse house party with the Chainsmokers!'
              className='block aspect-[2000/825] h-auto w-full origin-top object-cover lg:aspect-auto'
            />

            {/* Form section */}
            <div className='py-10 lg:py-20'>
              <div className='section-container flex flex-col items-start gap-10 lg:flex-row lg:gap-20'>
                <div className='space-y-6'>
                  <SuiTitle
                    type='h2'
                    weight='bold'
                    className='md:!text-[3.5rem]'>
                    ClickHouse + Chainsmokers + Vegas = an epic House Party
                  </SuiTitle>
                  <SuiText className='text-xl font-semibold'>
                    Hey, you! Yes, you — the one who’s ready to take a break
                    from all the conference sessions and tech talk. We know
                    you’ve been soaking in all the brilliance (and sales
                    pitches) of AWS re:Invent, but now it’s time to let loose,
                    have fun, and show off the dance moves you've been hiding.
                  </SuiText>
                  <SuiText className='text-xl font-semibold'>
                    Tuesday, December 3, 2024
                    <br />
                    9:00 PM - 12:00 AM PST | Las Vegas
                  </SuiText>
                </div>
                <div className='w-full flex-shrink-0 lg:min-h-[640px] lg:max-w-lg'>
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
                          <>
                            By registering, you acknowledge that ClickHouse will
                            process your personal information in accordance with
                            our{' '}
                            <Link
                              href='/legal/privacy-policy'
                              className='underline'>
                              Privacy Policy
                            </Link>
                            .
                          </>
                        }
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
                        <SuiTitle type='h3' className='text-xl font-bold'>
                          You’ve been successfully <br />
                          added to the wait list!
                        </SuiTitle>
                        <SuiText weight='bold' className='mb-4 mt-12'>
                          Share the event
                        </SuiText>
                        <div className='mx-auto flex max-w-80 flex-wrap justify-center gap-4 text-neutral-0'>
                          <CopyUrlButton className='!px-3' />
                          {[
                            'y_combinator',
                            'twitter',
                            'facebook',
                            'linkedin'
                          ].map((social) => (
                            <SocialButton
                              key={social}
                              type={social}
                              title='ClickHouse + Chainsmokers + Vegas = an epic House Party'
                              className='!px-3'
                            />
                          ))}
                        </div>
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
                    src={imageTicket}
                    width={1073}
                    height={825}
                    alt=''
                    className='origin-bottom-right lg:scale-150'
                  />
                </div>
                <div className='max-w-[600px] space-y-6'>
                  <SuiTitle type='h3'>What’s going on</SuiTitle>
                  <SuiText className='!mt-0'>
                    ClickHouse is super excited to bring{' '}
                    <strong>The Chainsmokers</strong> to the party. Picture
                    this: you, a killer DJ set, and a room full of fellow
                    ClickHouse users who are just as ready to party as you are.
                    It’s not just “any” DJ set though.
                  </SuiText>
                  <SuiText>
                    We are a bunch of high-speed database, real-time data
                    warehouse enthusiasts…and so are you. No pretentious vibes
                    here, just a place where you can kick back, relax, and
                    dance. It’s the perfect place to hit pause on the conference
                    hustle and just enjoy yourself.
                  </SuiText>
                  <SuiTitle type='h3'>How to get tickets</SuiTitle>
                  <SuiText className='!mt-0'>
                    We know you don’t want to miss this, and we don’t want you
                    to either. But here’s the catch —{' '}
                    <strong>tickets are extremely limited</strong>. So, do
                    yourself a favor and put your name on the waitlist now
                    (that’s all it takes). We will be releasing tickets in
                    waves.{' '}
                    <Link
                      href='#faqs'
                      className='underline transition-opacity hover:opacity-70'>
                      For more info, check the FAQs below.
                    </Link>
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
                  <FaqAccordion question='When will I find out if I’m in?'>
                    <SuiText className='max-w-3xl'>
                      We are rolling tickets out in waves weekly. There is
                      limited space in the venue and the waitlist is already
                      filling up quickly. As we will get confirmation of
                      attendance we will release tickets in waves weekly
                      starting September 10th. Keep an eye on your favorite
                      social channel for the tickets.
                    </SuiText>
                  </FaqAccordion>
                  <FaqAccordion question='What should I wear?'>
                    <SuiText className='max-w-3xl'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Adipisci doloribus et ex impedit ipsum natus ratione
                      voluptate. Amet dicta dignissimos distinctio id incidunt
                      modi nesciunt numquam quo reiciendis voluptatibus. Amet!
                    </SuiText>
                  </FaqAccordion>
                  <FaqAccordion question='Will there be food and drinks provided?'>
                    <SuiText className='max-w-3xl'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Adipisci doloribus et ex impedit ipsum natus ratione
                      voluptate. Amet dicta dignissimos distinctio id incidunt
                      modi nesciunt numquam quo reiciendis voluptatibus. Amet!
                    </SuiText>
                  </FaqAccordion>
                  <FaqAccordion question='Can I bring a friend (or two, or three?)'>
                    <SuiText className='max-w-3xl'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Adipisci doloribus et ex impedit ipsum natus ratione
                      voluptate. Amet dicta dignissimos distinctio id incidunt
                      modi nesciunt numquam quo reiciendis voluptatibus. Amet!
                    </SuiText>
                  </FaqAccordion>
                  <FaqAccordion question='Why is ClickHouse doing this?'>
                    <SuiText className='max-w-3xl'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Adipisci doloribus et ex impedit ipsum natus ratione
                      voluptate. Amet dicta dignissimos distinctio id incidunt
                      modi nesciunt numquam quo reiciendis voluptatibus. Amet!
                    </SuiText>
                  </FaqAccordion>
                  <FaqAccordion question='Is a party at a club in Vegas during a tech conference safe?'>
                    <SuiText className='max-w-3xl'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Adipisci doloribus et ex impedit ipsum natus ratione
                      voluptate. Amet dicta dignissimos distinctio id incidunt
                      modi nesciunt numquam quo reiciendis voluptatibus. Amet!
                    </SuiText>
                  </FaqAccordion>
                  <FaqAccordion question='Do I know The Chainsmokers?'>
                    <SuiText className='max-w-3xl'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Adipisci doloribus et ex impedit ipsum natus ratione
                      voluptate. Amet dicta dignissimos distinctio id incidunt
                      modi nesciunt numquam quo reiciendis voluptatibus. Amet!
                    </SuiText>
                  </FaqAccordion>
                  <FaqAccordion question='What should I wear?'>
                    <SuiText className='max-w-3xl'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Adipisci doloribus et ex impedit ipsum natus ratione
                      voluptate. Amet dicta dignissimos distinctio id incidunt
                      modi nesciunt numquam quo reiciendis voluptatibus. Amet!
                    </SuiText>
                  </FaqAccordion>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related content */}
        <div className='section-container py-10 lg:py-20'>
          <div className='flex justify-between'>
            <h3 className='mb-10 font-basier text-4xl'>Upcoming events</h3>
            <SuiButton
              path='/company/news-event'
              type='empty'
              color='primary'
              className='font-base hidden border border-primary-300/50 md:inline-block'>
              View all events
            </SuiButton>
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {recentEvents.map((event: EventType) => (
              <EventPost key={event.id} {...event} />
            ))}
          </div>
          <div className='mt-8 text-center md:hidden'>
            <SuiButton
              path='/company/news-event'
              type='empty'
              color='primary'
              className='font-base border border-primary-300/50'>
              View all events
            </SuiButton>
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
