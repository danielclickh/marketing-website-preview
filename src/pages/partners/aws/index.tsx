import logo from './assets/logo.svg'
import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { ExternalLink } from 'lucide-react'
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
          <span className='inline-block rounded-full border border-primary-500 bg-primary-700 px-4 py-1 text-xs text-primary-300'>
            Official AWS Partners
          </span>
          <SuiTitle type='h1'>ClickHouse Cloud on AWS</SuiTitle>
          <SuiText size='lg' className='text-neutral-200'>
            Experience ClickHouse, the fastest analytical database, as a fully
            managed service on AWS. Get unmatched speed and scalability without
            infrastructure management.{' '}
          </SuiText>
        </div>
        <div className='mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-6 lg:mt-24 lg:grid-cols-2'>
          <CUICard className='p-8 text-center'>
            <CUICard.Header className='mb-6'>
              <SuiTitle type='h3'>Pay as you go</SuiTitle>
            </CUICard.Header>
            <CUICard.Body>
              <SuiText className='space-y-6 text-neutral-200'>
                <p>
                  Pay only for what you use with flexible, on-demand billing
                  through AWS Marketplace. Scale up or down as needed with no
                  upfront commitment or minimum spend requirements.
                </p>
                <p>Includes a free trial with $300 in credits.</p>
              </SuiText>
            </CUICard.Body>
            <CUICard.Footer className='mt-6'>
              <CUIButton
                type='primary'
                className='mx-auto'
                iconRight={<ExternalLink width={14} height={14} />}>
                Start free trial on AWS Marketplace
              </CUIButton>
            </CUICard.Footer>
          </CUICard>
          <CUICard className='p-8 text-center'>
            <CUICard.Header className='mb-6'>
              <SuiTitle type='h3'>Commited contract</SuiTitle>
            </CUICard.Header>
            <CUICard.Body>
              <SuiText className='space-y-6 text-neutral-200'>
                <p>
                  Commit to a specific spend amount over 12 months for
                  streamlined AWS Marketplace billing.
                </p>
                <p>
                  Choose from preset amounts or customize your commitment to
                  match your expected usage.
                </p>
              </SuiText>
            </CUICard.Body>
          </CUICard>
        </div>
      </section>
    </Layout>
  )
}
