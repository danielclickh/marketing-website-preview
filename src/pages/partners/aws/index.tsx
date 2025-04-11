import Layout from '@/components/Layout'
import { SuiButton, SuiCard, SuiText, SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Image from 'next/image'

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
const description = `The fastest and most resource-efficient analytical database, ClickHouse, is now available as a service on AWS. ClickHouse Cloud on AWS allows you to experience the speed and scalability of the fastest OLAP database on earth without any need to manage the infrastructure.

ClickHouse has been reviewed by AWS and is an official AWS Partner, and ClickHouse Cloud is Qualified Software on AWS.
`

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'AWS | ClickHouse',
          path: '/partners/aws'
        },
        ...commonProps
      }
    }
  }

function PartnersPage({ seo, headerData, footerData }: CommonProps) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='pt-20 md:pt-30'>
        <div className='mx-10 min-h-screen pb-10 md:pb-20'>
          <div className='mx-auto mb-20 flex w-full flex-col items-center justify-center gap-20 md:mb-36 md:flex-row-reverse'>
            <Image
              src='/images/aws-partner.svg'
              width='240'
              height='240'
              alt='aws partner'
              loading='eager'
              priority
            />
            <div className='flex max-w-screen-md flex-col items-center md:items-start'>
              <SuiTitle
                type='h1'
                color='primary'
                weight='bold'
                className='pb-6 md:!text-6xl'>
                ClickHouse Cloud on AWS
              </SuiTitle>
              <SuiText
                size='base'
                weight='medium'
                color='secondary'
                className='max-w-3xl whitespace-pre-wrap pb-10'>
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

          <div className='container mx-auto mb-16 flex max-w-7xl flex-col justify-evenly gap-4 px-8 md:flex-row 2xl:px-0'>
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
