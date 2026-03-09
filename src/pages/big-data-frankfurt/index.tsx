import ContactForm from '@/components/ContactForm'
import GrowingCommunity from '@/components/GrowingCommunity'
import HRSeparator from '@/components/HRSeparator'
import Layout from '@/components/Layout'
import { SuiTitle } from '@/components/sui'
import { findOne } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { ContactProps } from '@/types/contact'
import { GetStaticProps } from 'next'

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
          title: 'Big Data & AI World - Frankfurt - Contact Us',
          description:
            'We are delighted to be at the Big Data & AI World Frankfurt to meet with ClickHouse users in the area. If you want to setup a dedicated time to share your story, get architecture advice, or learn more about ClickHouse in a dedicated conversation fill in the form and one of our team will be in touch.',
          path: '/big-data-frankfurt'
        },
        ...commonProps
      }
    }
  }

export default function ContactPage({ headerData, seo }: ContactProps) {
  return (
    <Layout seo={seo} headerData={headerData}>
      <div className='pt-10'>
        <div className='container mx-auto flex flex-col px-8 2xl:px-0'>
          <div className='mx-auto flex flex-col pt-6 text-center'>
            <SuiTitle type='h1' className='mb-4'>
              Big Data &amp; AI World Frankfurt
            </SuiTitle>

            <div className='mx-auto max-w-3xl text-neutral-200'>
              <p>
                We are delighted to be at the Big Data & AI World Frankfurt to
                meet with ClickHouse users in the area. If you want to setup a
                dedicated time to share your story, get architecture advice, or
                learn more about ClickHouse in a dedicated conversation fill in
                the form and one of our team will be in touch.
              </p>
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
