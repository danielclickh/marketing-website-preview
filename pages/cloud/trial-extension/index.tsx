import { SuiText, SuiTitle } from '../../../components/sui'
import { findOne } from '../../../lib/api/strapi'
import GrowingCommunity from '../../../components/GrowingCommunity'
import ContactForm from '../../../components/ContactForm'
import { GetStaticProps } from 'next'
import { ContactProps } from '../../../types/contact'
import Layout from '../../../components/Layout'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import HRSeparator from '../../../components/HRSeparator'
import { galaxyOnPage } from '../../../lib/galaxy/galaxy'
import MarketoForm from '../../../components/MarketoForm'
import { useRouter } from 'next/router'
import Head from 'next/head'

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
          title: 'Extend your ClickHouse Cloud trial',
          path: '/cloud/trial-extension'
        },
        ...commonProps
      }
    }
  }

export default function TrialExtensionPage({
  footerData,
  headerData,
  seo
}: ContactProps) {
  const router = useRouter()
  const { orgId, email } = router.query

  galaxyOnPage('trialExtensionPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <Head>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='pt-10'>
        <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
          <div className='mx-auto mb-10 pt-10 text-center text-neutral-100 lg:pt-20'>
            <SuiTitle type='h1'>Extend your ClickHouse Cloud trial</SuiTitle>
            <div className='mx-auto mt-6 max-w-3xl text-neutral-200'>
              Fill in the form below, and we'll let you know once your trial is
              extended.
            </div>
          </div>

          <div className='container mx-auto flex flex-col bg-opacity-10 px-8 pb-8 pt-14 text-center md:bg-no-repeat 2xl:px-0'>
            <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
              <MarketoForm
                formId={'1211'}
                onLoad={(formObject) => {
                  // Set field values
                  formObject.setValues({
                    miscBlankField14: orgId || '',
                    Email: email || '',
                    programmessagefull: `Please extend my trial for org ID ${orgId}`
                  })
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <GrowingCommunity />
    </Layout>
  )
}
