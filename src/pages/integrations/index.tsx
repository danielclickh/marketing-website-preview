'use client'

import CategorySelector from '@/components/CategorySelector'
import GetStartedFree from '@/components/GetStartedFree'
import IntegrationTile from '@/components/IntegrationTile'
import IntegrationsClickPipesPromo from '@/components/IntegrationsClickPipesPromo'
import Layout from '@/components/Layout'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import { fetchAll } from '@/lib/api/strapi'
import { useGalaxyOnPage } from '@/lib/galaxy/galaxy'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { slugify, upperCaseFirst } from '@/lib/utils/strings'
import {
  Integration,
  IntegrationGroup,
  IntegrationsPageProps
} from '@/types/integrations'
import type { InferGetStaticPropsType } from 'next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'

export const categoryContentMap: Array<
  Pick<IntegrationGroup, 'key' | 'label' | 'description' | 'slug'>
> = [
  {
    key: 'CLICKPIPES',
    label: 'ClickPipes',
    description:
      'ClickPipes is an integration engine that makes ingesting massive volumes of data from a diverse set of sources as simple as clicking a few buttons.',
    slug: 'clickpipes'
  },
  {
    key: 'DATA_INGESTION',
    label: 'Data ingestion',
    description:
      'Streamline your data pipelines with ClickHouse! Seamless integrations ensure efficient ingestion, optimizing real-time analytics.',
    slug: 'data-ingestion'
  },
  {
    key: 'DATA_VISUALIZATION',
    label: 'Data visualization',
    description:
      'Illuminate your data stories! ClickHouse integrations enhance visualization, making insights more vivid & actionable.',
    slug: 'data-visualization'
  },
  {
    key: 'DATA_TRANSFORMATION',
    label: 'Data transformation',
    description: '',
    slug: 'data-transformation'
  },
  {
    key: 'SQL_CLIENT',
    label: 'SQL client',
    description:
      'Harness the power of SQL with ClickHouse! Integrated clients enable swift queries, delivering instant, precise results.',
    slug: 'sql-client'
  },
  {
    key: 'LANGUAGE_CLIENT',
    label: 'Language client',
    description:
      "Code in your comfort zone! ClickHouse's language client integrations make data access fluent across multiple programming languages.",
    slug: 'language-client'
  },
  {
    key: 'AI_ML',
    label: 'AI/ML',
    description: '',
    slug: 'ai-ml'
  }
]

export async function getStaticProps() {
  const integrations: Integration[] = await fetchAll('integrations', {
    sort: ['name:ASC'],
    populate: ['logo', 'logo_dark']
  })

  const integrationGroups = groupIntegrations(integrations)

  const props: IntegrationsPageProps = {
    title: 'Integrations',
    seo: {
      title: 'ClickHouse Integrations',
      description:
        'ClickHouse offers over 100 integrations across categories like language clients, data ingestion, SQL clients, and data visualization. Enhance your data workflows effortlessly.',
      path: '/integrations',
      image: [{ url: '/images/integrations_social_share.png' }]
    },
    integrationGroups,
    ...(await getCommonProps())
  }

  return {
    props
  }
}

export default function IntegrationsPage({
  title,
  integrationGroups,
  seo,
  headerData,
  footerData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useGalaxyOnPage('integrationsPage')

  const router = useRouter()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(null)
    setSearch(e.target.value)
  }

  const groups = (() => {
    let categoryGroups = structuredClone(integrationGroups)

    // Filter groups by category
    if (category) {
      categoryGroups = categoryGroups.filter((group) => {
        return group.slug === category
      })
    }

    // Filter integrations by search term
    if (search) {
      categoryGroups = categoryGroups.map((group) => {
        group.integrations = group.integrations.filter((integration) => {
          return integration.name
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        })
        return group
      })
    }

    // Remove groups that have no integrations
    return categoryGroups.filter((group) => {
      return group.integrations.length
    })
  })()

  const categoryList = integrationGroups
    .map((group) => {
      return {
        text: group.label,
        selected: group.slug === category,
        onClick() {
          setSearch(null)
          setCategory(group.slug)
        }
      }
    })
    .sort((a, b) => {
      return a.text.localeCompare(b.text)
    })

  const getCategory = (categorySlug: string): IntegrationGroup | undefined => {
    return integrationGroups.find((group) => group.slug === categorySlug)
  }

  // Load values from query string
  useEffect(() => {
    if (router.isReady) {
      const urlCategory = searchParams?.get('category')
      const urlSearch = searchParams?.get('search')

      if (urlCategory && getCategory(urlCategory)) setCategory(urlCategory)
      if (urlSearch) setSearch(urlSearch)
    }
  }, [router.isReady])

  // Update query string values
  useEffect(() => {
    if (router.isReady) {
      let hasChanged = false
      const newSearchParams = new URLSearchParams(
        Array.from(searchParams?.entries() || [])
      )

      if (category && getCategory(category)) {
        if (category !== searchParams?.get('category')) {
          newSearchParams.set('category', category)
          hasChanged = true
        }
      } else {
        newSearchParams.delete('category')
        hasChanged = true
      }

      if (search) {
        if (search !== searchParams?.get('search')) {
          newSearchParams.set('search', search)
          hasChanged = true
        }
      } else {
        newSearchParams.delete('search')
        hasChanged = true
      }

      if (hasChanged) {
        const newQueryString = newSearchParams.toString()

        if (newQueryString.length) {
          router.push(`/integrations?${newQueryString}`, undefined, {
            shallow: true
          })
        } else {
          router.push('/integrations', undefined, { shallow: true })
        }
      }
    }
  }, [category, search])

  return (
    <Layout footerData={footerData} seo={seo} headerData={headerData}>
      <div className='bg-grid py-10 text-center text-neutral-100 md:py-16 lg:py-20'>
        <div className='container mx-auto max-w-7xl px-8 2xl:px-0'>
          <SuiTitle type='h1'>{title}</SuiTitle>
          <p className='mt-6 text-lg'>
            Connect the tools and services that you love with ClickHouse.
          </p>
        </div>
      </div>

      <div className='mb-12 bg-grid pb-12'>
        <div className='mx-auto max-w-7xl'>
          <IntegrationsClickPipesPromo />
        </div>
      </div>

      <div className='container mx-auto mb-20 max-w-7xl space-y-20 px-8 2xl:px-0'>
        <div className='flex-col items-center'>
          <SuiSearchField
            placeholder='Search by integration...'
            htmlFor='search'
            className='mx-auto mb-6 md:max-w-md lg:mb-8'
            value={search || ''}
            onChange={searchChange}
          />
          <div className='mx-auto max-w-3xl'>
            <CategorySelector
              options={[
                {
                  text: 'All',
                  selected: !category,
                  onClick() {
                    setCategory(null)
                    setSearch(null)
                  }
                },
                ...categoryList
              ]}
            />
          </div>
        </div>

        {groups.map((group) => {
          return (
            <div key={group.slug}>
              <SuiTitle type='h3' className='mb-3'>
                {group.label}
              </SuiTitle>
              {group.description && (
                <p className='text-sm'>{group.description}</p>
              )}
              <div className='mt-6 grid grid-cols-2 justify-center gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
                {group.integrations.map((integration, index) => (
                  <IntegrationTile key={index} {...integration} />
                ))}
              </div>
            </div>
          )
        })}

        {!groups.length && (
          <p className='mb-20 mt-12 w-full text-center'>
            {search ? `No search results for "${search}"` : 'No results'}
            {category && getCategory(category)
              ? ` in ${getCategory(category)?.label}`
              : ''}
          </p>
        )}

        <GetStartedFree
          href='https://console.clickhouse.cloud/signUp?loc=integrations'
          textBefore='Get started with ClickHouse'
          textSlanted='Cloud'
          textAfter='for free'
        />
      </div>
    </Layout>
  )
}

function groupIntegrations(
  integrations: Array<Integration>
): Array<IntegrationGroup> {
  let groups: Array<IntegrationGroup> = []

  // Merge the content map values
  categoryContentMap.forEach((category) => {
    groups.push({
      ...category,
      integrations: []
    })
  })

  // Create groups that don't exist already
  integrations.forEach((integration) => {
    let group = groups.find((row) => row.key === integration.category)

    if (!group) {
      // Create a label from the category key
      let label = integration.category.replaceAll('_', ' ').toLocaleLowerCase()
      label = upperCaseFirst(label)

      group = {
        key: integration.category,
        label: label,
        slug: slugify(integration.category),
        integrations: []
      }

      groups.push(group)
    }

    group.integrations.push(integration)
  })

  // Groups that have no integrations are removed.
  return groups.filter((group) => group.integrations.length)
}
