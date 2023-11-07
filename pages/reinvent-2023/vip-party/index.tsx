import { findOne } from '../../../lib/api/strapi'
import GrowingCommunity from '../../../components/GrowingCommunity'
import Markdown from '../../../components/Markdown'
import { GetStaticProps } from 'next'
import { ContactProps } from '../../../types/contact'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import HRSeparator from '../../../components/HRSeparator'
import MarketoForm from '../../../components/MarketoForm'
import { useRef, useState } from 'react'
import Script from 'next/script'
import { ChatIcon } from '@heroicons/react/solid'

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
          title:
            'AWS re:Invent 2023 After Hours Networking Reception - ClickHouse',
          description:
            'Your VIP Pass to ClickHouse’s re:Invent Reception Awaits!',
          path: '/reinvent-2023/vip-party'
        },
        ...commonProps
      }
    }
  }

interface ContactPageProps {
  contactForm: {
    disclaimer: string
  }
  footerData: ContactProps['footerData']
  headerData: ContactProps['headerData']
  seo: ContactProps['seo']
}

export default function ReinventPage({
  contactForm,
  footerData,
  headerData,
  seo
}: ContactPageProps) {
  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <>
      <Layout footerData={footerData} seo={seo} headerData={headerData}>
        <div className='pt-10'>
          <div className='max-w74xl container mx-auto flex flex-col px-8 2xl:px-0'>
            <div
              className='mx-auto flex flex-col pt-6 text-center'
              id='pricing-contact-form'>
              <h1 className='mb-6 text-center font-basier text-5.5xl font-semibold leading-tight text-neutral-200'>
                AWS re:Invent 2023
                <br />
                After Hours Networking Reception
              </h1>
              <div className='mx-auto mb-6 max-w-2xl text-neutral-200'>
                Spaces are filling up fast, and we're quickly running out of VIP
                passes for the After Hours Networking Reception hosted at{' '}
                <strong>
                  Hakkasan, MGM Grand, Las Vegas, on November 29, from 6 PM to 8
                  PM.
                </strong>
              </div>
            </div>
            <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 pt-14 pb-8 text-center md:bg-no-repeat 2xl:px-0'>
              <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
                {!formSuccess && (
                  <MarketoForm
                    formId='1101'
                    onLoad={() => {
                      setFormLoaded(true)

                      var pollForDefinition = function (
                        scope: any,
                        varname: any,
                        callback: any
                      ) {
                        if (typeof scope[varname] !== 'undefined') {
                          return callback()
                        }
                        var interval = setInterval(function () {
                          if (typeof scope[varname] !== 'undefined') {
                            clearInterval(interval)
                            callback()
                          }
                        }, 250)
                      }
                      var script = document.createElement('script')
                      script.src =
                        'https://marketo.clearbit.com/assets/v1/marketo/forms.js'
                      script.async = true
                      script.setAttribute(
                        'data-clearbit-publishable-key',
                        'pk_25c26e54fda4158b4189447198378375'
                      )
                      script.onerror = function (e) {
                        pollForDefinition(window, 'MktoForms2', function () {
                          window.MktoForms2.whenReady(function (form) {
                            form.setValues({
                              clearbitFormStatus:
                                'Clearbit Form JS unable to load'
                            })
                          })
                        })
                      }

                      document.querySelector('head')?.appendChild(script)
                    }}
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

                {formLoaded && !formSuccess && (
                  <div className='disclaimer-text text-center text-sm font-medium text-neutral-200'>
                    <Markdown>{contactForm.disclaimer}</Markdown>
                  </div>
                )}

                {!formLoaded && (
                  <div className='text-center'>Loading form...</div>
                )}

                {formSuccess && (
                  <div ref={formSuccessRef} className='text-center'>
                    <h3 className='text-2xl font-bold'>
                      You're on the waitlist!
                    </h3>
                    <p className='mt-2 text-neutral-200'>
                      One of the team will be in touch to let you know if a VIP
                      pass becomes available.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <HRSeparator className='my-24' />
        <GrowingCommunity />
        <Script id='clearbitFormStatus'>
          {`

                          `}
        </Script>
      </Layout>
    </>
  )
}
