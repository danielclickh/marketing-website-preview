import { GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import Link from 'next/link'
import GetStartedFree from '../../../components/GetStartedFree'
import IntegrationSupportPill from '../../../components/IntegrationSupportPill'
import Layout from '../../../components/Layout'
import Markdown from '../../../components/Markdown'
import { getNewsLetterData } from '../../../components/NewsLetter/getNewsLetterData'
import { SuiText, SuiTitle } from '../../../components/sui'
import { findAll, getPathsValues } from '../../../lib/api/strapi'
import { SeoMetadata, StrapiImageType } from '../../../lib/api/strapi/types'
import { getCommonProps } from '../../../lib/utils/getCommonProps'
import {
  NOT_FOUND_FALLBACK,
  REVALIDATE_SECONDS
} from '../../../lib/utils/revalidationConfig'
import { CommonProps, ParamsType } from '../../../types/homepage'

interface IntegrationProps extends CommonProps {
  seo?: SeoMetadata
  integration: {
    name: string
    shortDescription: string
    category: string
    supportLevel: string
    website: string | null
    readiness: string | null
    logo: StrapiImageType
    logo_dark: StrapiImageType | null
    summary: string
    summaryv2: string | null
    about: string | null
    aboutv2: string | null
    changelog: string | null
    changelogv2: string | null
  }
}

export async function getStaticPaths() {
  return {
    paths: await getPathsValues('integrations', {
      fields: ['slug']
    }),
    fallback: NOT_FOUND_FALLBACK
  }
}

export const getStaticProps: GetStaticProps<IntegrationProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType
    const { data } = await findAll('integrations', {
      filters: {
        slug: {
          $eq: slug
        }
      },
      populate: ['logo', 'logo_dark'],
      fields: [
        'name',
        'shortDescription',
        'category',
        'supportLevel',
        'website',
        'readiness',
        'summary',
        'summaryv2',
        'about',
        'aboutv2',
        'changelog',
        'changelogv2'
      ],
      pagination: { limit: 1 }
    })
    if (!data?.[0]) {
      return {
        notFound: true,
        revalidate: REVALIDATE_SECONDS
      }
    }

    const integration = data[0]

    const seo = integration.seo || {
      title: `Integrating ClickHouse with ${integration.name}`,
      description: integration.shortDescription
    }

    seo.path = `/integrations/${slug}`

    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    return {
      props: {
        integration,
        seo,
        newsLetterData,
        ...commonData
      },
      revalidate: REVALIDATE_SECONDS
    }
  }

export default function IntegrationPage({
  seo,
  headerData,
  footerData,
  integration
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='bg-grid py-20'>
        <div className='section-container max-w-[800px]'>
          <Link
            href={'/integrations'}
            className='flex items-center gap-2 font-bold text-primary-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M10.1 19.15 3.35 12.4a.56.56 0 0 1 0-.8l6.75-6.75a.56.56 0 0 1 .8.8l-5.8 5.79h15.15a.56.56 0 1 1 0 1.12H5.11l5.79 5.8a.56.56 0 0 1-.8.79Z'
              />
            </svg>
            <span>Back to integrations</span>
          </Link>
          <div className='my-5'>
            <SuiTitle type='h1'>{integration.name}</SuiTitle>
          </div>
          <div className='flex flex-wrap gap-2'>
            <IntegrationSupportPill label={integration.supportLevel} />
            {integration.readiness && (
              <IntegrationSupportPill label={integration.readiness} />
            )}
          </div>
        </div>
      </div>
      <div className='section-container max-w-[800px]'>
        <Markdown
          components={
            {
              'vertical-stepper-without-label': ({
                children,
                ...props
              }: React.HTMLProps<any>) => {
                return <ul className='!ml-0 space-y-2 !p-0'>{children}</ul>
              },
              'vertical-stepper-without-label-step': ({
                children,
                ...props
              }: React.HTMLProps<any>) => {
                return (
                  <li className='flex gap-4'>
                    <div className='flex flex-shrink-0 flex-grow-0 flex-col items-center'>
                      <div className='z-10 mt-1 h-4 w-4 flex-shrink-0 flex-grow-0 rounded-full bg-white'></div>
                      <div className='-mt-3 h-full w-0.5 rounded-t-full bg-neutral-600'></div>
                    </div>
                    <div className='flex-1 pb-4'>{children}</div>
                  </li>
                )
              }
            } as any
          }>
          {integration.summaryv2 || integration.summary}
        </Markdown>
      </div>
      <div className='section-container my-32'>
        <GetStartedFree
          href='https://clickhouse.cloud/signUp?loc=integrations'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </div>
    </Layout>
  )
}
