import React from 'react'
import ComparisonTable from '../../../components/ComparisonTable'
import { findAll } from '../../../lib/api/strapi'
import { galaxyOnPage } from '../../../lib/galaxy/galaxy'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../../lib/utils/revalidationConfig'
import { ComparisonPage, ComparisonProps } from '../../../types/comparisons'
import Layout from '../../../components/Layout'

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

  const comparison = data[0]

  const seo = comparison.seo
  if (seo) seo.path = `/comparison/${comparison.slug}`

  const props: ComparisonProps = {
    comparison,
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
  comparison
}: ComparisonProps) {
  galaxyOnPage(`${comparison.slug}ComparisonPage`)
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='mx-auto max-w-[1010px]'>
        <ComparisonTable
          columns={[
            { heading: 'ClickHouse', rowIcon: <YesIcon />, highlight: true },
            { heading: 'BigQuery', rowIcon: <NoIcon /> }
          ]}
          rows={[
            {
              heading: 'Line 1',
              values: ['Yes', 'No']
            },
            {
              heading: 'Line 2',
              values: ['Yes', 'Maybe']
            }
          ]}
        />
      </div>
    </Layout>
  )
}
