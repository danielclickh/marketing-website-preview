import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CUIButton } from '../../../components/ClickUI'
import ComparisonTable from '../../../components/ComparisonTable'
import HomepageSectionTrustedByAlt from '../../../components/HomepageSectionTrustedByAlt'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findAll, findOne } from '../../../lib/api/strapi'
import { galaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { ComparisonPage, ComparisonProps } from '../../../types/comparisons'
import Layout from '../../../components/Layout'
import { HomepageCustomerStories } from '../../../types/homepage'
import logos from './logos.png'
import iconDevelopers from './icon-developers.svg'

export interface BigQueryPageProps extends ComparisonProps {
  customerStories: HomepageCustomerStories
}

export async function getStaticProps() {
  const { data }: { data: ComparisonPage[] } = await findAll('comparisons', {
    filters: {
      slug: {
        $eq: 'bigquery'
      }
    },
    populate: ['seo']
  })

  if (!data?.[0]) {
    return {
      notFound: true,
      revalidate: REVALIDATE_SECONDS
    }
  }

  const { customerStories } = await findOne('homepage', {
    populate: [
      'customerStories',
      'customerStories.*',
      'customerStories.logos.*',
      'customerStories.logos.darkLogoPng'
    ]
  })

  const comparison = data[0]

  const seo = comparison.seo
  if (seo) seo.path = `/comparison/${comparison.slug}`

  const props: BigQueryPageProps = {
    comparison,
    customerStories,
    seo,
    ...(await getCommonProps())
  }

  return {
    props,
    revalidate: REVALIDATE_SECONDS
  }
}

function YesIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-primary'
      width='16'
      height='16'
      fill='none'
      viewBox='0 0 16 16'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M13.3337 4.33331 6.00033 11.6666 2.66699 8.33331'
      />
    </svg>
  )
}

function NoIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-[#FFBABA]'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='m8 8 8 8m0-8-8 8'
      />
    </svg>
  )
}

export default function BigQueryPage({
  footerData,
  headerData,
  seo,
  comparison,
  customerStories
}: BigQueryPageProps) {
  galaxyOnPage(`${comparison.slug}ComparisonPage`)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='container mx-auto my-16 flex max-w-7xl flex-col items-center gap-x-6 px-8 md:flex-row 2xl:px-0'>
        <div className='mx-auto grid max-w-[800px] grid-cols-1 gap-6 text-center lg:mx-0 lg:text-left'>
          <div>
            <span className='inline-block rounded-full border border-primary-500 bg-primary-700 px-4 py-1 text-xs text-primary-300'>
              Comparisons
            </span>
          </div>
          <SuiTitle type='h1' weight='bold'>
            ClickHouse <span className='text-primary-300'>vs</span> BigQuery
          </SuiTitle>

          <Image
            src={logos}
            alt='ClickHouse vs BigQuery'
            width={240}
            height={245}
            className='mx-auto lg:hidden'
          />

          <SuiText className='sm:text-xl'>
            BigQuery handles ad-hoc queries and smaller data volumes
            effectively, but scaling turns cost and performance management into
            a significant challenge. Read more below to learn about how
            ClickHouse and BigQuery compare in cost, performance, and with
            supported features.
          </SuiText>
          <div className='mt-6 flex flex-col gap-4 sm:mx-auto sm:max-w-[523px] sm:flex-row lg:mx-0'>
            <CUIButton
              type='primary'
              size='lg'
              weight='semibold'
              href='#'
              linkClass='flex-1 w-full'
              className='w-full'>
              Get personalized support
            </CUIButton>
            <CUIButton
              type='secondary'
              size='lg'
              weight='semibold'
              href='#'
              linkClass='flex-1 w-full'
              className='w-full'>
              Start a free 30-day trial
            </CUIButton>
          </div>
          <SuiText className='text-sm'>
            Read our comprehensive guide about{' '}
            <Link href='#' className='text-primary-300'>
              migrating from ClickHouse to BigQuery
            </Link>
          </SuiText>
        </div>
        <Image
          src={logos}
          alt='ClickHouse vs BigQuery'
          width={240}
          height={245}
          className='mx-auto hidden lg:block'
        />
      </div>
      <div className='container mx-auto my-16 max-w-7xl px-8 2xl:px-0'>
        <ComparisonTable
          columns={[
            {
              heading: 'ClickHouse',
              width: '45%',
              rowIcon: <YesIcon />,
              highlight: true
            },
            {
              heading: 'BigQuery',
              width: '35%',
              rowIcon: <NoIcon />
            }
          ]}
          rows={[
            {
              heading: 'Fast and efficient',
              values: [
                'Up to **95% faster** querying speeds and 60% less storage space required.',
                'Slower querying speeds and requires more storage.'
              ]
            },
            {
              heading: 'Cost-effective',
              values: [
                'Up to **100x** more cost-effective.',
                'More costly for BigQuery for analytics workloads.'
              ]
            },
            {
              heading: 'Modern SQL',
              values: [
                'Standard SQL enhanced with numerous **extensions and improvements** (e.g. lambda functions and higher-order functions), that make analytical tasks very user-friendly.',
                'Support for only standard SQL can make analytics more complex.'
              ]
            },
            {
              heading: 'Easy data analytics',
              values: [
                '**150+ pre-built aggregation functions** plus powerful aggregation combinators, fully vectorized and parallelized.\n\n**1300+ data processing functions** for domains like mathematics, geo, machine learning, time series, and more.',
                'Requires writing more complex SQL due to its limited set of aggregate and regular data processing functions.'
              ]
            },
            {
              heading: 'Rich data type support',
              values: [
                'Advanced data types like JSON, maps, and arrays plus over **80 array functions** for modeling and solving a wide range of problems simply and intuitively.',
                'Support for limited number of data types including only 8 array functions.'
              ]
            },
            {
              heading: 'World class\ninteroperability',
              values: [
                'Native support fo reading data in over **90 file formats** from most data sources which makes it easy to analyze data regardless of its shape and location. ',
                'Limited interoperability. Supports only 5 file formats and 19 data sources.'
              ]
            }
          ]}
        />
      </div>
      <HomepageSectionTrustedByAlt
        className='!my-24'
        heading='Trusted by'
        customerStories={customerStories}
      />
      <div className='container mx-auto my-16 max-w-7xl px-8 2xl:px-0'>
        <div className='flex flex-col items-center gap-6 text-center'>
          <Image src={iconDevelopers} alt='Icon' width={72} height={72} />
          <SuiTitle type='h2'>Why developers choose ClickHouse</SuiTitle>
        </div>
      </div>
    </Layout>
  )
}
