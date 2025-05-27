import ContactForm from '@/components/ContactForm'
import GrowingCommunity from '@/components/GrowingCommunity'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import { SuiTitle } from '@/components/sui'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          type: 'website',
          title: 'Get a demo of ClickHouse Cloud',
          description:
            'Tell us about your use case and get a tailored demo of ClickHouse Cloud for your business.',
          path: '/company/request-demo'
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
  useGalaxyOnPage('requestDemoPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
          <div className='mx-auto flex flex-col pt-6 text-center'>
            <SuiTitle type='h1' className='mb-4'>
              Get a demo of ClickHouse Cloud
            </SuiTitle>
            <div className='mx-auto max-w-3xl text-neutral-200'>
              Tell us about your use case and get a tailored demo of ClickHouse
              Cloud for your business.
            </div>
          </div>
          <div className='container mx-auto flex max-w-7xl flex-col bg-opacity-10 px-8 pb-8 pt-14 text-center md:bg-no-repeat 2xl:px-0'>
            <div className='w-full space-y-5 self-center text-left md:max-w-screen-sm'>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <HRSeparator className='my-24' />
      <GrowingCommunity />
    </Layout>
  )
}
