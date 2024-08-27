import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRef, useState } from 'react'
import Layout from '../../../components/Layout'
import MarketoForm from '../../../components/MarketoForm'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import { galaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'
import Image from 'next/image'
import imageHero from './hero.png'
import imageTexture from './texture.png'
import imageTicket from './ticket.png'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const data = await findOne('contact-us', {
      populate: ['hero', 'hero.contactForm', 'seo', 'seo.image']
    })

    const commonProps = await getCommonProps()

    return {
      props: {
        ...data.hero,
        seo: {
          title: 'House Party with The Chainsmokers',
          description:
            "Hey, you! Yes, you — the one who’s ready to take a break from all the conference sessions and tech talk. We know you’ve been soaking in all the brilliance (and sales pitches) of AWS re:Invent, but now it’s time to let loose, have fun, and show off the dance moves you've been hiding.",
          path: '/houseparty/vegas-2024'
          //image: [{ url: '' }]
        },
        ...commonProps
      }
    }
  }

export default function Page({ footerData, headerData, seo }: CommonProps) {
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
              className='block h-auto w-full'
            />

            {/* Form section */}
            <div className='py-20'>
              <div className='section-container flex flex-col gap-20 lg:flex-row'>
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
                <div className='w-full flex-shrink-0 rounded-lg bg-[#D6D6D6] bg-opacity-50 p-8 lg:max-w-lg'>
                  {!formLoaded && (
                    <div className='flex min-h-[640px] items-center justify-center text-center'>
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
                    <div ref={formSuccessRef} className='text-center'>
                      <h3 className='text-2xl font-bold'>
                        Thank you for your submission!
                      </h3>
                      <p className='mt-2 text-neutral-200'>
                        We'll be in touch to let you know if a ticket becomes
                        available.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* What's going on */}
            <div className='py-20'>
              <div className='section-container flex flex-col gap-20 lg:flex-row'>
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
                    waves. For more info, check the FAQs below.
                  </SuiText>
                  <SuiText>
                    Trust us, future you will be thanking present you for making
                    this happen. Prepare to make some memories, start a few
                    dance battles, and take a #SELFIE. See you there!
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
