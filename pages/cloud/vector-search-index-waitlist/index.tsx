import { GetStaticProps } from 'next'
import { useRef, useState } from 'react'
import GrowingCommunity from '../../../components/GrowingCommunity'
import HRSeparator from '../../../components/HRSeparator'
import Layout from '../../../components/Layout'
import MarketoForm from '../../../components/MarketoForm'
import { SuiTitle } from '../../../components/sui'
import { useGalaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'Cloud Vector Search Index Waitlist',
          description: '',
          path: '/cloud/vector-search-index-waitlist'
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
  useGalaxyOnPage('cloudVectorSearchIndexWaitlistPage')

  const formSuccessRef = useRef<HTMLDivElement | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
          <div className='mx-auto flex flex-col pt-6 text-center'>
            <SuiTitle type='h1' className='mb-4'>
              Join The Waitlist
            </SuiTitle>
            {/*<div className='max-w-3xl text-neutral-200'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores aut ducimus nam nobis nulla obcaecati odio quibusdam
              repellendus totam. Ducimus eaque excepturi fuga illum incidunt
              labore nisi rem suscipit tenetur.
            </div>*/}
          </div>
          <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 pb-8 pt-14 text-center md:bg-no-repeat 2xl:px-0'>
            <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
              {!formSuccess && (
                <MarketoForm
                  formId={'1299'}
                  clearbitTracking={true}
                  onLoad={() => {
                    setFormLoaded(true)
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

              {!formLoaded && (
                <div className='text-center'>Loading form...</div>
              )}

              {formSuccess && (
                <div ref={formSuccessRef}>
                  <h3 className='text-center text-2xl font-bold'>
                    Thank you for your submission!
                  </h3>
                  <p className='mt-2 text-center text-neutral-200'>
                    We will be in touch soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <GrowingCommunity />
    </Layout>
  )
}
