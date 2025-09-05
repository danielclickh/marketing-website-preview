import imageTexture from './assets/background.png'
import heroText from './assets/hero-text.svg'
import image1 from './assets/image-1.png'
import image2 from './assets/image-2.png'
import image3 from './assets/image-3.png'
import socialImage from './assets/social.png'
import Layout from '@/components/Layout'
import Markdown from '@/components/Markdown'
import { SuiText, SuiTitle } from '@/components/sui'
import { findAll, getUnlistedFilters } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { EventType } from '@/types/events'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import React, { useRef, useState } from 'react'

interface PageProps extends CommonProps {
  recentEvents: Array<EventType>
}

export const getStaticProps: GetStaticProps<PageProps> =
  async function getStaticProps() {
    const { data: recentEvents }: { data: PageProps['recentEvents'] } =
      await findAll('events', {
        filters: {
          $and: [
            {
              localDatetime: {
                $gte: new Date().toISOString()
              }
            },
            {
              $or: getUnlistedFilters()
            }
          ]
        },
        sort: ['localDatetime:ASC'],
        populate: ['thumbnailPng', 'location'],
        pagination: { limit: 3 }
      })

    const commonProps = await getCommonProps()

    return {
      props: {
        seo: {
          title: 'House Party, The SQL with The Chainsmokers 2025',
          description:
            'Ready to trade dashboards for dance floors? Join us in Vegas during AWS re:Invent for House Party, The SQL with The Chainsmokers 2025. Step away from the tech talk, grab a drink, and get ready for a night of music, energy, and unforgettable vibes.',
          path: '/houseparty/the-sql',
          image: [{ url: socialImage.src }]
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
  useGalaxyOnPage('reinvent2025AncillaryPage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='relative bg-[#010203]'>
          {/* Background texture */}
          <Image
            src={imageTexture}
            width={1966}
            height={4096}
            alt=''
            className='pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25'
          />

          <div className='relative z-10'>
            {/* Form section */}
            <section className='section-container py-10 lg:py-20'>
              <div className='flex flex-col gap-12 lg:flex-row lg:justify-between'>
                <div className='mx-auto max-w-xl flex-1 space-y-12 lg:ml-0'>
                  <SuiTitle type='h1' weight='bold'>
                    House Party, <br />
                    The SQL
                    <br />
                    <Image
                      src={heroText}
                      width={375}
                      height={202}
                      alt="Featuring The Chainsmokers! Welcome back to house party! This time, it's the SQL"
                      className='mt-2'
                    />
                  </SuiTitle>
                  <SuiText className='space-y-6 lg:text-xl'>
                    <p className='font-semibold'>
                      You've survived another day of AWS re:Invent sessions and
                      vendor demos. Time to trade your conference badge for some
                      good vibes and join the party.
                    </p>
                  </SuiText>
                  <Link
                    href='https://luma.com/event/evt-okMsbH8gdBGotLV'
                    target='_blank'
                    data-luma-action='checkout'
                    data-luma-event-id='evt-okMsbH8gdBGotLV'
                    className='block w-full rounded-full bg-primary-300 px-4 py-3 text-center text-lg font-bold text-primary-900 transition-colors hover:bg-primary-400'>
                    Register for Event
                  </Link>
                  <Script
                    id='luma-checkout'
                    src='https://embed.lu.ma/checkout-button.js'
                  />
                  <SuiText className='space-y-6 lg:text-xl'>
                    <h3 className='!-mb-6 font-semibold text-primary-300'>
                      What’s going down
                    </h3>
                    <p>
                      You + ClickHouse + The Chainsmokers = House Party. Where
                      database engineers become dance floor legends.
                    </p>
                    <p>
                      We’re bringing the Chainsmokers back to Intrigue for
                      another epic night of music, food, and drink.
                    </p>
                    <h3 className='!-mb-6 font-semibold text-primary-300'>
                      When and where
                    </h3>
                    <p>
                      Tuesday, December 2, 9:00 PM - 12:00 AM PT
                      <br />
                      Intrigue Nightclub, The Wynn, Las Vegas
                    </p>
                    <h3 className='!-mb-6 font-semibold text-primary-300'>
                      Ready to Party?
                    </h3>
                    <p>
                      The SQL awaits. The Chainsmokers are ready. The only
                      question is: Are you?
                    </p>
                    <p>
                      RSVP to get your free ticket. You'll need to show your
                      Luma ticket QR code to get access to the event. Entry will
                      be first-come-first-serve.
                    </p>
                    <p>
                      Trust us - your future self will thank you when you're
                      dropping it low while discussing columnar storage with
                      fellow data enthusiasts. Some combinations just work.
                    </p>
                  </SuiText>
                </div>
                <div className='mx-auto max-w-lg flex-1 space-y-10 lg:mr-0'>
                  <Image
                    src={image1}
                    width={1166 / 2}
                    height={1016 / 2}
                    alt='House Party 2024'
                  />
                  <Image
                    src={image2}
                    width={1198 / 2}
                    height={966 / 2}
                    alt='House Party 2024'
                  />
                  <Image
                    src={image3}
                    width={1122 / 2}
                    height={836 / 2}
                    alt='House Party 2024'
                  />
                </div>
              </div>
            </section>

            {/* FAQs */}
            <div className='relative py-10 lg:py-20' id='faqs'>
              <div className='bg-shadow-element yellow-shadow align-shadow-right absolute right-0 h-full w-1/2 -translate-y-1/4' />
              <div className='section-container relative z-10'>
                <SuiTitle type='h2' className='text-center'>
                  We’re here to answer all your questions.
                </SuiTitle>

                <div className='mt-10 space-y-2.5'>
                  {[
                    {
                      title: 'When will I find out if I’m in?',
                      content:
                        'We are rolling tickets out in waves weekly. There is limited space in the venue and the waitlist is already filling up quickly. As we receive confirmation of attendance, we will release tickets in waves weekly starting September 19. Keep an eye on your registered email for the tickets and then make sure to share to your favorite social network.'
                    },
                    {
                      title: 'What if I don’t know ClickHouse?',
                      content:
                        'No worries at all! That is something we specialize in, and we help people learn. Since you\'re curious, ClickHouse is an open-source analytics database that’s super fast — like, "query billions of rows in milliseconds" fast. It is the real-time data warehouse for analytics. If you want to learn more, [join a training](/company/events?loc=houseparty&category=Live+Training#upcoming-events), peruse our [videos online](/videos?loc=houseparty), check out some [use cases](/use-cases?loc=houseparty) and [user stories](/user-stories?loc=houseparty), and get started with a [free trial](https://console.clickhouse.cloud/signUp?loc=houseparty-faq) of ClickHouse Cloud (it’s ClickHouse, we just run it for you).'
                    },
                    {
                      title: 'What should I wear?',
                      content:
                        'We’re all about keeping it chill. Think casual, cool, and comfortable—something you can dance in. But hey, if you’ve got a sparkly outfit you’ve been dying to wear, this is Vegas after all. Go ahead and shine!'
                    },
                    {
                      title: 'Do I know The Chainsmokers?',
                      content:
                        'Yes. You do. I almost guarantee that if you hit up their discography on your favorite streaming service. You will know at least 2 or 3.'
                    },
                    {
                      title: 'Will there be food and drinks?',
                      content:
                        'We’ve got you covered with a selection of drinks from an open bar throughout the evening. There is no food at the venue so…you know…get dinner first.'
                    },
                    {
                      title: 'Can I bring a friend (or two, or three)?',
                      content:
                        'You can request an extra +1 ticket. It’s never fun to go to a party alone. We wouldn’t want anyone to miss out on the fun because, well, FOMO is real. Do note, you will be responsible for ensuring your +1 has read the Code of Conduct.'
                    },
                    {
                      title: 'What if I don’t know anyone?',
                      content:
                        'Perfect! This is the best place to meet some awesome new people. Besides, you know ClickHouse and that’s an amazing way to make new friends.'
                    },
                    {
                      title:
                        'Is a party at a club in Vegas during a tech conference safe?',
                      content:
                        'To be serious for a moment. A Code of Conduct governs the evening and we are working closely with venue staff and security. Please ensure you are familiar with the [Code of Conduct](/events-code-of-conduct) and prepared to report issues should they arise.'
                    }
                  ].map((faq, index) => {
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
