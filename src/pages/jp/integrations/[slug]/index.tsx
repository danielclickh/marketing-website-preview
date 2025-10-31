import IntegrationPill from '@/components/IntegrationPill'
import IntegrationTile from '@/components/IntegrationTile'
import Markdown from '@/components/Markdown'
import { getNewsLetterData } from '@/components/NewsLetter/getNewsLetterData'
import { StrapiImage } from '@/components/StrapiElements'
import GetStartedFree from '@/components/jp/GetStartedFree'
import Layout from '@/components/jp/Layout'
import { SuiTitle } from '@/components/sui'
import { findAll, getPathsValues } from '@/lib/api/strapi'
import { SeoMetadata, StrapiImageType } from '@/lib/api/strapi/types'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps, ParamsType } from '@/types/homepage'
import { Integration } from '@/types/integrations'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import React from 'react'

interface IntegrationPageProps extends CommonProps {
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
  similar: Array<Integration>
}

export async function getStaticPaths() {
  return {
    paths: await getPathsValues('integrations', {
      filters: {
        // Integrations with `openInNewWindow` set to true are excluded from the query.
        // This is because they link off externally. See the IntegrationTile component.
        $or: [
          {
            openInNewWindow: {
              $eq: false
            }
          },
          {
            openInNewWindow: {
              $null: true
            }
          }
        ]
      },
      fields: ['slug'],
      publicationState: 'preview'
    }),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<IntegrationPageProps> =
  async function getStaticProps({ params }) {
    const { slug } = params as ParamsType
    const { data } = await findAll('integrations', {
      filters: {
        slug: {
          $eq: slug
        }
      },
      populate: ['logo', 'logo_dark'],
      pagination: { limit: 1 }
    })

    if (!data?.[0]) {
      return {
        notFound: true
      }
    }

    const integration = data[0]

    const similarByCategory = await findAll('integrations', {
      filters: {
        slug: {
          $ne: slug
        },
        category: {
          $eq: integration.category
        }
      },
      populate: ['logo', 'logo_dark'],
      pagination: { limit: 5 }
    })

    let similar: Array<Integration> = [...similarByCategory.data]

    if (similar.length < 5) {
      const similarAtRandom = await findAll('integrations', {
        filters: {
          slug: {
            $ne: slug
          },
          id: {
            $notIn: similar.map((item) => item.id)
          }
        },
        populate: ['logo', 'logo_dark'],
        pagination: { limit: 5 - similar.length }
      })

      similar = similar.concat(...similarAtRandom.data)
    }

    const seo = integration.seo || {
      title: `Integrating ClickHouse with ${integration.name}`,
      description: integration.shortDescription
    }

    seo.locale = 'ja_JP'
    seo.path = `/jp/integrations/${slug}`
    seo.languages = ['en', 'ja']

    const commonData = await getCommonProps()
    const newsLetterData = await getNewsLetterData()
    return {
      props: {
        integration,
        similar,
        seo,
        newsLetterData,
        ...commonData
      }
    }
  }

export default function IntegrationPage({
  seo,
  headerData,
  footerData,
  integration,
  similar
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const integrationLogo = integration.logo_dark || integration.logo
  useGalaxyOnPage('integrationPage')
  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='bg-grid py-12 md:py-20'>
        <div className='section-container max-w-[800px]'>
          <Link
            href={'/jp/integrations'}
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
          <div className='my-5 flex items-center gap-6'>
            {!!integrationLogo && (
              <div className='flex h-20 w-20 flex-shrink-0 items-center justify-center'>
                <StrapiImage
                  {...integrationLogo}
                  sizes='medium'
                  alt={integration.name}
                  className='aspect-square h-auto w-full object-contain'
                />
              </div>
            )}
            <SuiTitle type='h1'>{integration.name}</SuiTitle>
          </div>
          <div className='flex flex-wrap gap-2'>
            <IntegrationPill label={integration.supportLevel} />
            {integration.readiness && (
              <IntegrationPill label={integration.readiness} />
            )}
          </div>
        </div>
      </div>
      <div className='section-container my-8 max-w-[800px] md:my-16'>
        <Markdown
          className='rich-text-content'
          components={
            {
              'vertical-stepper-without-label': ({
                children,
                ...props
              }: React.HTMLProps<any>) => {
                return <ul className='!ml-0 space-y-1 !p-0'>{children}</ul>
              },
              'vertical-stepper-without-label-step': ({
                children,
                ...props
              }: React.HTMLProps<any>) => {
                return (
                  <li className='group flex gap-4'>
                    <div className='flex flex-shrink-0 flex-grow-0 flex-col items-center'>
                      <div className='z-10 mt-1 h-4 w-4 flex-shrink-0 flex-grow-0 rounded-full bg-white'></div>
                      <div className='-mt-3 h-full w-0.5 rounded-t-full bg-neutral-600 group-last:hidden'></div>
                    </div>
                    <div className='flex-1 pb-4'>{children}</div>
                  </li>
                )
              }
            } as any
          }>
          {integration.summaryv2 || integration.summary || ''}
        </Markdown>

        {similar.length && (
          <>
            <SuiTitle type='h2' className='mt-8 md:mt-16'>
              Other integrations
            </SuiTitle>
            <div className='mt-6 grid grid-cols-2 justify-center gap-3 sm:grid-cols-3 md:grid-cols-5'>
              {similar.map((integration, index) => (
                <IntegrationTile key={index} {...integration} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className='section-container my-16 md:my-32'>
        <GetStartedFree href='https://console.clickhouse.cloud/signUp?loc=integrations' />
      </div>
    </Layout>
  )
}
