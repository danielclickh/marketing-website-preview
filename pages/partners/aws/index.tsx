import { ExternalLinkIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'
import Layout from '../../../components/Layout'
import { SuiButton, SuiCard, SuiText, SuiTitle } from '../../../components/sui'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { CommonProps } from '../../../types/homepage'

const highlights = [
  {
    title: 'Available on AWS Marketplace',
    description:
      'Add a ClickHouse Cloud subscription to your AWS account for simple billing and vendor management. Both development and Production services are available, with transparent pricing that is simply added to your monthly AWS bill.',
    href: 'https://aws.amazon.com/marketplace/pp/prodview-jettukeanwrfc',
    target: '_blank',
    buttonText: 'Start a trial'
  },
  {
    title: 'Secure. Verified. Compliant',
    description:
      'ClickHouse has been independently audited and awarded SOC 2 Type II compliance and is recognised by AWS as Qualified Software. ClickHouse cloud is serverless, simple and secure. To learn more, visit our trust centre.',
    href: 'https://trust.clickhouse.com/',
    target: '_blank',
    buttonText: 'Learn more'
  },
  {
    title: 'Learn ClickHouse on AWS',
    description:
      'Visit the ClickHouse Academy to find self-paced and live training that will help you to get the best from ClickHouse Cloud. All types are available exclusively on AWS.',
    href: '/learn',
    target: '_blank',
    buttonText: 'Learn more'
  }
]

const btnText = 'ClickHouse on AWS Marketplace'
const title = ''
const description = `The fastest and most resource-efficient analytical database, ClickHouse, is now available as a service on AWS. ClickHouse Cloud on AWS allows you to experience the speed and scalability of the fastest OLAP database on earth without any need to manage the infrastructure.

ClickHouse has been reviewed by AWS and is an official AWS Partner, and ClickHouse Cloud is Qualified Software on AWS.
`

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'AWS | ClickHouse'
        },
        ...commonProps
      }
    }
  }

function PartnersPage({ seo, footerData }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo}>
      <div className='pt-20 md:pt-30'>
        <div className='min-h-screen pb-10 md:pb-20 mx-10 '>
          <div className='flex flex-col md:flex-row-reverse w-full mx-auto gap-20 mb-20 md:mb-36 justify-center items-center'>
            <Image
              src='/images/aws-partner.svg'
              width='240'
              height='240'
              alt='aws partner'
            />
            <div className='flex flex-col items-center max-w-screen-md md:items-start'>
              <SuiTitle
                type='h1'
                color='primary'
                weight='bold'
                className='md:!text-6xl pb-6'>
                ClickHouse Cloud on AWS
              </SuiTitle>
              <SuiText
                size='base'
                weight='medium'
                color='secondary'
                className='max-w-3xl pb-10 whitespace-pre-wrap'>
                {description}
              </SuiText>
              <SuiButton
                type='primary'
                size='lg'
                path='https://aws.amazon.com/marketplace/pp/prodview-jettukeanwrfc'>
                {btnText}
                <ExternalLinkIcon width='24' height='24' />
              </SuiButton>
            </div>
          </div>

          <div className='flex flex-col md:flex-row container mx-auto justify-evenly max-w-7xl px-8 2xl:px-0 mb-16 gap-4'>
            {highlights.map((highlight) => (
              <SuiCard
                key={highlight.title}
                title={highlight.title}
                description={highlight.description}
                buttonTitle={highlight.buttonText}
                buttonPath={highlight.href}
                className='h-auto md:w-1/3'
                color='empty'
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PartnersPage
