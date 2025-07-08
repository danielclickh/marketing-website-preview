import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
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
          path: '/industries/cybersecurity',
          title: 'ClickHouse for cybersecurity',
          description: 'ClickHouse is the database for cybersecurity'
        },
        ...commonProps
      }
    }
  }

export default function GamingIndustryPage({
  seo,
  headerData,
  footerData
}: CommonProps) {
  useGalaxyOnPage('cybersecurityIndustryPage')

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='section-container flex items-center justify-between'>
        <div>
          <p className='font-bold text-primary-300'>
            Industries / Cybersecurity
          </p>
          <SuiTitle type='h1'>ClickHouse for Cybersecurity</SuiTitle>
          <SuiText size='lg' className='text-neutral-200'>
            Ingest millions of rows per second. Handle the most heavily
            concurrent workloads. All without compromising query speed.
          </SuiText>
        </div>
        <div></div>
      </section>

      {/* Videos */}
      <section></section>

      {/* Features */}
      <section></section>

      {/* Testimonials */}
      <section></section>

      {/* Features */}
      <section></section>

      {/* Get started */}
      <section></section>
    </Layout>
  )
}
