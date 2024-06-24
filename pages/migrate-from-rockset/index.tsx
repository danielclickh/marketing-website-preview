import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRef, useState } from 'react'
import GrowingCommunity from '../../components/GrowingCommunity'
import HRSeparator from '../../components/HRSeparator'
import Layout from '../../components/Layout'
import Markdown from '../../components/Markdown'
import MarketoForm from '../../components/MarketoForm'
import { findOne } from '../../lib/api/strapi'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { ContactProps } from '../../types/contact'

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
          title: 'Migrate from Rockset to ClickHouse',
          description:
            "At ClickHouse, we're not going anywhere. Looking for help with your migration? Get in touch!",
          path: '/migrate-from-rockset'
          // image: [{ url: '/images/air-gapped-og.png' }]
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

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='pt-10'>
          <div className='mx-auto flex w-full max-w-7xl flex-col px-4 pt-24 sm:px-8 2xl:px-0'>
            <div className='event-container mx-auto block w-full lg:flex lg:items-start lg:justify-between'>
              <div className='mb-16 mr-0 flex-auto lg:mb-0 lg:mr-16 lg:max-w-2xl'>
                <div className='section_metadata '>
                  <h1 className='mb-8 font-basier text-4xl font-semibold leading-tight md:text-5.5xl'>
                    Migrating from{' '}
                    <span className='text-[#E5C3FF]'>[Rockset]</span> to
                    ClickHouse
                  </h1>
                  <h2 className='mb-6 font-basier text-2xl font-semibold leading-tight text-neutral-200'>
                    At ClickHouse, we're not going anywhere. Looking for help
                    with your migration? Get in touch!
                  </h2>
                  <div className='mx-auto mb-6 max-w-2xl text-neutral-200'>
                    <div className='prose prose-neutral'>
                      <p>Text</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ml-auto w-full lg:max-w-lg'>
                <div className='w-full rounded-lg border border-neutral-800 bg-neutral-900 p-8 shadow-card duration-300 ease-in-out'>
                  {!formLoaded && (
                    <div className='text-center'>Loading form...</div>
                  )}
                  {!formSuccess && (
                    <MarketoForm
                      formId='1156'
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
                      <h3 className='text-2xl font-bold'>Thank you!</h3>
                      <p className='mt-2 text-neutral-200'>
                        We'll be in touch.
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
