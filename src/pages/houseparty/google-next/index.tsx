import HRSeparator from '@/components/HRSeparator'
import imageTexture from './assets/background.png'
import heroText from './assets/hero-text.svg'
import image1 from './assets/image-1.png'
import image2 from './assets/image-2.png'
import image3 from './assets/image-3.png'
import map from './assets/map.svg'
import socialImage from './assets/social.jpg'
import Accordion from '@/components-cleaned/Accordion'
import { CUIButton, CUICard } from '@/components/ClickUI'
import CopyUrlButton from '@/components/CopyUrlButton'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import MarketoForm from '@/components/MarketoForm'
import Modal from '@/components/Modal'
import SocialButton from '@/components/SocialButton'
import StripeBuyButton from '@/components/StripeBuyButton'
import TiltedText from '@/components/TiltedText'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import React, { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'House Party with The Chainsmokers — Google Cloud Next 2026',
          description:
            'Ready to trade dashboards for dance floors? Join us in Vegas during Google Cloud Next for House Party with The Chainsmokers 2026. Step away from the tech talk, grab a drink, and get ready for a night of music, energy, and unforgettable vibes.',
          path: '/houseparty/google-next',
          image: [{ url: socialImage.src }]
        },
        ...commonProps
      }
    }
  }

export default function Page({ headerData, seo }: CommonProps) {
  useGalaxyOnPage('googlenext2026AncillaryPage')

  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)
  const [meetingModalLoaded, setMeetingModalLoaded] = useState(false)
  const [meetingModalSuccess, setMeetingModalSuccess] = useState(false)

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      <Layout seo={seo} headerData={headerData}>
        
        <div className='relative bg-[#010203] py-10 lg:py-20'>
          {/* Background texture */}
          <Image
            src={imageTexture}
            width={1966}
            height={4096}
            alt=''
            className='pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25'
          />

          <div className='relative z-10 space-y-10 lg:space-y-20'>
            {/* Form section */}
            <section className='section-container'>
              <div className='flex flex-col gap-12 lg:flex-row lg:justify-between'>
                <div className='mx-auto max-w-xl flex-1 space-y-12 lg:ml-0'>
                  <h1 className='text-6xl font-[900] leading-none lg:text-[5rem] tracking-tighter'>
                    House Party
                    </h1>
                    <Image
                      src={heroText}
                      width={575}
                      height={208}
                      alt='Featuring The Chainsmokers!'
                      className='!mt-6'
                    />
                    <SuiText className='!mt-10 font-semibold lg:text-xl text-primary-300'>
                    Wednesday, April 22, 9:30 PM - 12:00 AM PT
                    </SuiText>
                  <HRSeparator className='' />
                  <SuiText className='space-y-6 lg:text-xl'>
                    <h3 className='!-mb-6 font-semibold text-primary-300'>
                      We're bringing House Party to Google Cloud Next
                    </h3>
                    <p>
                      You + ClickHouse + The Chainsmokers = House Party. Where
                      database engineers become dance floor legends.
                    </p>
    
                    <h3 className='!-mb-6 font-semibold text-primary-300'>
                      What’s going down
                    </h3>
                    <p>
                      The ClickHouse House Party is coming to Google Cloud Next
                      for the first time. If you know, you know. We bring the
                      music and pour the drinks; you bring the dance moves.
                    </p>
                    <h3 className='!-mb-6 font-semibold text-primary-300'>
                      When and where
                    </h3>
                    <p>
                      Wednesday, April 22, 9:30 PM - 12:00 AM PT
                      <br />
                      Hakkasan Nightclub, MGM Grand, Las Vegas
                    </p>
                    <h3 className='!-mb-6 font-semibold text-primary-300'>
                      Ready to Party?
                    </h3>
                    <p>
                      Fill out the form to be notified as soon as registration
                      opens. Registration will be first-come-first-serve and
                      capacity is limited.
                    </p>
                    <p>
                      Trust us - your future self will thank you when you're
                      dropping it low while discussing columnar storage with
                      fellow data enthusiasts. Some combinations just work.
                    </p>
                  </SuiText>
                </div>
                <div className='mx-auto w-full max-w-lg flex-1 space-y-10 lg:mr-0'>
                
                  <div>
                    <CUICard>
                      <CUICard.Body className='p-4 lg:p-6'>
                        {!formSuccess && (
                          <>
                            <div className='mb-6 space-y-2 text-center'>
                              <SuiTitle type='h3'>
                                Get notified when registration opens
                              </SuiTitle>
                            </div>
                            <MarketoForm
                              formId='1127'
                              onLoad={() => setFormLoaded(true)}
                              submitButtonLabel='Save the date'
                              clearbitTracking={true}
                              onSuccess={() => {
                                setFormSuccess(true)

                                // Delay needed to allow the ref to update before scrolling
                                window.setTimeout(() => {
                                  formSuccessRef.current?.scrollIntoView()
                                }, 10)
                              }}
                            />
                          </>
                        )}

                        {!formLoaded && (
                          <div className='text-center'>Loading form...</div>
                        )}

                        {formSuccess && (
                          <div ref={formSuccessRef}>
                            <div className='space-y-6 text-center'>
                              <CheckCircleIcon className='mx-auto !mt-4 h-16 w-16 stroke-1 text-primary-300' />
                              <p>
                                Thank you! We'll email you as soon as
                                registration opens.
                              </p>
                              <div>
                                <p className='mb-2 px-10 text-base font-semibold text-neutral-300'>
                                  Share with others
                                </p>
                                <div className='flex flex-wrap justify-center gap-4 text-neutral-0'>
                                  <CopyUrlButton />
                                  <SocialButton
                                    type='twitter'
                                    title='House Party with The Chainsmokers — Google Cloud Next 2026'
                                  />
                                  <SocialButton
                                    type='facebook'
                                    title='House Party with The Chainsmokers — Google Cloud Next 2026'
                                  />
                                  <SocialButton
                                    type='linkedin'
                                    title='House Party with The Chainsmokers — Google Cloud Next 2026'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CUICard.Body>
                    </CUICard>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section className='mx-auto max-w-screen-2xl px-4'>
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                <Image
                  src={image2}
                  width={1198 / 2}
                  height={966 / 2}
                  alt='House Party 2025'
                  className='mx-auto'
                />
                <Image
                  src={image1}
                  width={1166 / 2}
                  height={1016 / 2}
                  alt='House Party 2025'
                  className='mx-auto'
                />
                <Image
                  src={image3}
                  width={1122 / 2}
                  height={836 / 2}
                  alt='House Party 2025'
                  className='mx-auto'
                />
              </div>
            </section>

            {/* FAQs */}
            <section className='relative' id='faqs'>
              <div className='bg-shadow-element yellow-shadow align-shadow-right absolute right-0 h-full w-1/2 -translate-y-1/4' />
              <div className='section-container relative z-10'>
                <SuiTitle type='h2' className='text-center'>
                  We’re here to answer all your questions.
                </SuiTitle>

                <div className='mt-10 space-y-2.5'>
                  <Accordion
                    className='!space-y-3'
                    items={[
                      {
                        handle: 'What if I don’t know ClickHouse?',
                        content:
                          'No worries at all! We\'d still love to have you join the party. Since you\'re curious, ClickHouse is an open-source analytics database that’s super fast — like, "query billions of rows in milliseconds" fast. It is the real-time data warehouse for analytics. If you want to learn more, [join a training](/company/events?loc=houseparty&category=Live+Training#upcoming-events), peruse our [videos online](/videos?loc=houseparty), check out some [use cases](/use-cases?loc=houseparty) and [user stories](/user-stories?loc=houseparty), and get started with a [free trial](https://console.clickhouse.cloud/signUp?loc=houseparty-faq) of ClickHouse Cloud (it’s ClickHouse, we just run it for you).'
                      },
                      {
                        handle: 'What should I wear?',
                        content:
                          'We’re all about keeping it chill. Think casual, cool, and comfortable—something you can dance in. But hey, if you’ve got a sparkly outfit you’ve been dying to wear, this is Vegas after all. Go ahead and shine!'
                      },
                      {
                        handle: 'Will there be food and drinks?',
                        content:
                          'We’ve got you covered with a selection of drinks from an open bar throughout the evening. There is no food at the venue.'
                      },
                      {
                        handle: 'Can I bring a friend (or two, or three)?',
                        content:
                          'Yes, please invite your friends but note that everyone must register to receive a QR code. Each person will need to present their QR code to enter the event.'
                      },
                      {
                        handle: 'What if I don’t know anyone?',
                        content:
                          'Perfect! This is the best place to meet some awesome new people. Besides, you know ClickHouse and that’s an amazing way to make new friends.'
                      },
                      {
                        handle:
                          'Is a party at a club in Vegas during a tech conference safe?',
                        content:
                          'We are working with venue staff and security to create a safe event for everyone. We will be enforcing a [Code of Conduct](/events-code-of-conduct) at the event with a monitored email where attendees can report any issues should they arise.'
                      }
                    ].map(({ handle, content }) => ({
                      handle,
                      content: (
                        <SuiText className='max-w-3xl'>
                          <Markdown>{content}</Markdown>
                        </SuiText>
                      ),
                      className: '!bg-neutral-725 !border-neutral-725'
                    }))}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}
