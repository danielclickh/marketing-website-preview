import logo from './assets/logo.svg'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { GetStaticProps } from 'next'
import Image from 'next/image'

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'ClickHouse Cloud on AWS | ClickHouse',
          path: '/partners/aws'
        },
        ...commonProps
      }
    }
  }

export default function PartnersPage({
  seo,
  headerData,
  footerData
}: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='section-container my-16 lg:my-24'>
        <div className='mx-auto max-w-4xl space-y-6 text-center'>
          <Image
            src={logo}
            width={220}
            height={96}
            alt='ClickHouse + AWS'
            className='mx-auto block'
          />
          <SuiTitle type='h1'>ClickHouse Cloud on AWS</SuiTitle>
          <SuiText size='lg' className='text-neutral-200'>
            Experience ClickHouse, the fastest analytical database, as a fully
            managed service on AWS. Get unmatched speed and scalability without
            infrastructure management.{' '}
          </SuiText>
        </div>
      </section>
    </Layout>
  )
}
