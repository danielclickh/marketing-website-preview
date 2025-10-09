import logo from './assets/logo.svg'
import { CUIButton, CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiText, SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { ExternalLink } from 'lucide-react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
        <div className='mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:mt-24'>
          <CUICard className='!justify-start p-8 text-center'>
            <CUICard.Header className='mb-6'>
              <SuiTitle type='h3'>Pay as you go</SuiTitle>
            </CUICard.Header>
            <CUICard.Body className='mb-6'>
              <SuiText className='space-y-6 text-neutral-200'>
                <p>
                  Pay only for what you use with flexible, on-demand billing
                  through AWS Marketplace. Scale up or down as needed with no
                  upfront commitment or minimum spend requirements.
                </p>
                <p>Includes a free trial with $300 in credits.</p>
              </SuiText>
            </CUICard.Body>
            <CUICard.Footer className='mt-auto'>
              <CUIButton
                href='https://aws.amazon.com/marketplace/pp/prodview-jettukeanwrfc'
                type='primary'
                className='mx-auto'>
                Start free trial on AWS Marketplace
                <ExternalLink width={14} height={14} className='ml-2 inline' />
              </CUIButton>
            </CUICard.Footer>
          </CUICard>
          <CUICard className='!justify-start p-8 text-center'>
            <CUICard.Header className='mb-6'>
              <SuiTitle type='h3'>Commited contract</SuiTitle>
            </CUICard.Header>
            <CUICard.Body className='mb-6'>
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
            <CUICard.Footer className='mt-auto'>
              <Link
                href='#'
                className='inline-flex h-10 items-center whitespace-nowrap text-sm text-primary-300 hover:underline'>
                Committed plans on AWS Marketplace
                <ExternalLink width={14} height={14} className='ml-2 inline' />
              </Link>
            </CUICard.Footer>
          </CUICard>
        </div>
      </section>

      {/* Features */}
      <section className='bg-neutral-700 py-16 lg:py-24'>
        <div className='section-container grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-3'>
          <CUICard className='relative !justify-start overflow-hidden !bg-neutral-900/80 p-8 text-center'>
            <div className='absolute inset-x-0 top-0 h-1 bg-primary-300' />
            <CUICard.Header className='mb-6'>
              <SuiTitle type='h3'>Available on AWS Marketplace</SuiTitle>
            </CUICard.Header>
            <CUICard.Body className='mb-6'>
              <SuiText className='space-y-6 text-neutral-200'>
                <p>
                  Streamline billing and vendor management by adding ClickHouse
                  Cloud to your AWS account. Transparent pricing consolidated
                  directly into your monthly AWS bill.
                </p>
              </SuiText>
            </CUICard.Body>
            <CUICard.Footer className='mt-auto'>
              <LinkWithArrow
                href='#'
                className='text-primary-300 hover:underline'>
                Start a free trial
              </LinkWithArrow>
            </CUICard.Footer>
          </CUICard>
          <CUICard className='relative !justify-start overflow-hidden !bg-neutral-900/80 p-8 text-center'>
            <div className='absolute inset-x-0 top-0 h-1 bg-primary-300' />
            <CUICard.Header className='mb-6'>
              <SuiTitle type='h3'>Secure. Verified. Compliant</SuiTitle>
            </CUICard.Header>
            <CUICard.Body className='mb-6'>
              <SuiText className='space-y-6 text-neutral-200'>
                <p>
                  ClickHouse has been independently audited and awarded SOC 2
                  Type II compliance and ISO 27001 certification, and is
                  recognized by AWS as Qualified Software. ClickHouse Cloud is
                  serverless, simple, and secure.
                </p>
              </SuiText>
            </CUICard.Body>
            <CUICard.Footer className='mt-auto'>
              <LinkWithArrow
                href='#'
                className='text-primary-300 hover:underline'>
                Visit our trust center
              </LinkWithArrow>
            </CUICard.Footer>
          </CUICard>
          <CUICard className='relative !justify-start overflow-hidden !bg-neutral-900/80 p-8 text-center'>
            <div className='absolute inset-x-0 top-0 h-1 bg-primary-300' />
            <CUICard.Header className='mb-6'>
              <SuiTitle type='h3'>Learn ClickHouse on AWS</SuiTitle>
            </CUICard.Header>
            <CUICard.Body className='mb-6'>
              <SuiText className='space-y-6 text-neutral-200'>
                <p>
                  Visit the ClickHouse Academy to find self-paced and live
                  training that will help you to get the best from ClickHouse
                  Cloud. All types are available exclusively on AWS.
                </p>
              </SuiText>
            </CUICard.Body>
            <CUICard.Footer className='mt-auto'>
              <LinkWithArrow
                href='#'
                className='text-primary-300 hover:underline'>
                ClickHouse training
              </LinkWithArrow>
            </CUICard.Footer>
          </CUICard>
        </div>
      </section>
    </Layout>
  )
}
