import { CUICard } from '@/components/ClickUI'
import DotsContainer from '@/components/DotsContainer'
import Layout from '@/components/Layout'
import MarketoForm from '@/components/MarketoForm'
import { SuiText, SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title:
            'ClickStack is now available in private preview on ClickHouse Cloud',
          description:
            'ClickStack is now in ClickHouse Cloud in private preview, sign up now to get on the waitlist.',
          path: '/cloud/hyperdx-waitlist'
        },
        ...commonProps
      }
    }
  }

export default function ContactPage({
  footerData,
  headerData,
  seo
}: CommonProps) {
  useGalaxyOnPage('cloudHyperdxWaitlistPage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <DotsContainer>
        <div className='mx-auto w-full lg:max-w-4xl'>
          <div className='mb-16 text-center'>
            <SuiTitle type='h1' className='md:!text-5xl'>
              ClickStack is now available in private preview on ClickHouse Cloud
            </SuiTitle>
          </div>
          <div className='mx-auto lg:max-w-xl'>
            <CUICard className='bg-neutral-900/80'>
              <CUICard.Body className='p-4 lg:p-6'>
                {!formSuccess && (
                  <>
                    <div className='mb-8 mt-4 space-y-4 text-center lg:mb-12 lg:mt-4'>
                      <SuiTitle type='h2' className='text-2xl'>
                        Join the waitlist
                      </SuiTitle>
                      <SuiText>
                        <span className='opacity-70'>
                          ClickStack is now available in ClickHouse Cloud
                          (Private Preview)!
                          <br /> To join the waitlist, simply answer the
                          questions below.
                        </span>
                      </SuiText>
                    </div>
                    <MarketoForm
                      formId={'1405'}
                      clearbitTracking={true}
                      onLoad={() => {
                        setFormLoaded(true)
                      }}
                      onSuccess={() => {
                        setFormSuccess(true)
                        // Delay needed to allow the ref to update before scrolling
                        setTimeout(() => {
                          formSuccessRef.current?.scrollIntoView()
                        }, 10)

                        return false // Stops page from reloading
                      }}
                    />
                  </>
                )}

                {!formLoaded && (
                  <div className='text-center'>Loading form...</div>
                )}

                {formSuccess && (
                  <div
                    ref={formSuccessRef}
                    className='flex flex-col items-center py-10 lg:py-20'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='52'
                      height='52'
                      fill='none'
                      viewBox='0 0 52 52'>
                      <path
                        stroke='#CCFFD0'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='3'
                        d='M26 50v0A24 24 0 0 1 2 26v0A24 24 0 0 1 26 2v0a24 24 0 0 1 24 24v0a24 24 0 0 1-24 24Z'
                        clipRule='evenodd'
                      />
                      <path
                        stroke='#CCFFD0'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='3'
                        d='M36.7 20.7 23.3 34l-8-8'
                      />
                    </svg>
                    <h3 className='mb-4 mt-8 text-center text-2xl font-bold'>
                      You’ve been added to the waitlist!
                    </h3>
                    <p className='mt-2 text-center text-neutral-200'>
                      Thank you for your interest in HyperDX ClickHouse Cloud
                      integration.
                      <br />
                      We’ll be in touch soon.
                    </p>
                  </div>
                )}
              </CUICard.Body>
            </CUICard>
          </div>
        </div>
      </DotsContainer>
    </Layout>
  )
}
