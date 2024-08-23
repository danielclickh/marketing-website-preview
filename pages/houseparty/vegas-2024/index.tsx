import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRef, useState } from 'react'
import AirGappedIcon from '../../../components/AirGapped/AirGappedIcon'
import GrowingCommunity from '../../../components/GrowingCommunity'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import MarketoForm from '../../../components/MarketoForm'
import { findOne } from '../../../lib/api/strapi'
import { galaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { ContactProps } from '../../../types/contact'

interface DriftAPI {
  startInteraction: (options: { interactionId: number }) => void
}

interface DriftWindow extends Window {
  drift: {
    api: DriftAPI
  }
}

// Tell TypeScript that when we reference `window`, we mean the extended type with `drift` on it
declare var window: DriftWindow

export const getStaticProps: GetStaticProps<ContactProps> =
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
          path: '/houseparty/vegas-2024',
          image: [{ url: '/images/air-gapped-og-v2.png' }]
        },
        ...commonProps
      }
    }
  }

interface PageProps {
  contactForm: {
    disclaimer: string
  }
  footerData: ContactProps['footerData']
  headerData: ContactProps['headerData']
  seo: ContactProps['seo']
}

export default function Page({
  contactForm,
  footerData,
  headerData,
  seo
}: PageProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  galaxyOnPage('reinvent2024AncillaryPage')

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='relative overflow-hidden bg-primary-300 px-4 py-12 pt-14 sm:px-8 md:py-24 2xl:px-0'>
          <div className='mx-auto max-w-7xl'>
            <div className='flex items-center'>
              <div>
                <h1 className='mb-8 font-basier text-4xl font-semibold leading-tight text-[#1C1B1A] md:text-5.5xl'>
                  House Party with The Chainsmokers
                </h1>
                <h2 className='mb-6 max-w-xl font-basier text-[18px] font-semibold leading-tight text-[#1C1B1A]'>
                  Tuesday, December 3, 2024
                  <br /> 9:00 PM - 12:00 AM PST | Las Vegas
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pt-12 sm:px-8 2xl:px-0'>
            <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
              <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
                <div className='section_metadata '>
                  <div className='mx-auto mb-6 max-w-2xl text-neutral-200'>
                    <div className='prose prose-neutral'>
                      <p>
                        Hey, you! Yes, you — the one who’s ready to take a break
                        from all the conference sessions and tech talk. We know
                        you’ve been soaking in all the brilliance (and sales
                        pitches) of AWS re:Invent, but now it’s time to let
                        loose, have fun, and show off the dance moves you've
                        been hiding. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='z-10 ml-auto w-full md:-mt-20 lg:max-w-lg'>
                <div className='w-full rounded-lg border border-neutral-800 bg-neutral-900 p-8 shadow-card duration-300 ease-in-out'>
                  {!formLoaded && (
                    <div className='text-center'>Loading form...</div>
                  )}

                  {!formSuccess && (
                    <MarketoForm
                      formId='1258'
                      disclaimer={contactForm.disclaimer}
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
          </div>
        </div>
        <HRSeparator className='my-24' />
        <GrowingCommunity />
      </Layout>
    </>
  )
}
