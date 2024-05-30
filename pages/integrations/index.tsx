import type { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import CategorySelector from '../../components/CategorySelector'
import GetStartedFree from '../../components/GetStartedFree'
import IntegrationTile from '../../components/IntegrationTile'
import Layout from '../../components/Layout'
import { SuiSearchField, SuiTitle } from '../../components/sui'
import { fetchAll } from '../../lib/api/strapi'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { getCommonProps } from '../../lib/utils/getCommonProps'
import { REVALIDATE_SECONDS } from '../../lib/utils/revalidationConfig'
import { CommonProps } from '../../types/homepage'

interface Integration {
  name: string
  slug: string
  logo: StrapiImageType
  logo_dark: StrapiImageType | null
  category: string
  website: string | null
  readiness: string | null
}

interface IntegrationGroup {
  label: string
  description?: string
  slug: string
  integrations: Array<Integration>
}

interface IntegrationsPageProps extends CommonProps {
  title: string
  integrationGroups: Array<IntegrationGroup>
}

export async function getStaticProps() {
  const data = await fetchAll('integrations', {
    sort: ['name:ASC'],
    populate: ['logo', 'logo_dark'],
    fields: ['name', 'slug', 'category', 'website', 'readiness']
  })

  // Divide the integrations into groups.
  // Groups that have no integrations are removed.
  const integrationGroups: Array<IntegrationGroup> = [
    {
      label: 'ClickPipes',
      description:
        'ClickPipes is an integration engine that makes ingesting massive volumes of data from a diverse set of sources as simple as clicking a few buttons.',
      slug: 'clickpipes',
      integrations: data.filter((item) => item.category === 'CLICKPIPES')
    },
    {
      label: 'Data ingestion',
      description:
        'Streamline your data pipelines with ClickHouse! Seamless integrations ensure efficient ingestion, optimizing real-time analytics.',
      slug: 'data-ingestion',
      integrations: data.filter((item) => item.category === 'DATA_INGESTION')
    },
    {
      label: 'Data visualization',
      description:
        'Illuminate your data stories! ClickHouse integrations enhance visualization, making insights more vivid & actionable.',
      slug: 'data-visualization',
      integrations: data.filter(
        (item) => item.category === 'DATA_VISUALIZATION'
      )
    },
    {
      label: 'Data transformation',
      description: '',
      slug: 'data-transformation',
      integrations: data.filter(
        (item) => item.category === 'DATA_TRANSFORMATION'
      )
    },
    {
      label: 'SQL client',
      description:
        'Harness the power of SQL with ClickHouse! Integrated clients enable swift queries, delivering instant, precise results.',
      slug: 'sql-client',
      integrations: data.filter((item) => item.category === 'SQL_CLIENT')
    },
    {
      label: 'Language client',
      description:
        "Code in your comfort zone! ClickHouse's language client integrations make data access fluent across multiple programming languages.",
      slug: 'language-client',
      integrations: data.filter((item) => item.category === 'LANGUAGE_CLIENT')
    }
  ].filter((group) => group.integrations.length)

  const props: IntegrationsPageProps = {
    title: 'Integrations',
    seo: {
      title: 'ClickHouse Integrations',
      description: '',
      path: '/integrations'
    },
    integrationGroups,
    ...(await getCommonProps())
  }

  return {
    props,
    revalidate: REVALIDATE_SECONDS
  }
}

export default function IntegrationsPage({
  title,
  integrationGroups,
  seo,
  headerData,
  footerData
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)

  const searchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

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

  const categoryList = [
    {
      text: 'All',
      selected: !category,
      onClick() {
        setCategory(null)
      }
    },
    ...integrationGroups.map((group) => {
      return {
        text: group.label,
        selected: group.slug === category,
        onClick() {
          setCategory(group.slug)
        }
      }
    })
  ]

  const getCategory = (categorySlug: string): IntegrationGroup | undefined => {
    return integrationGroups.find((group) => group.slug === categorySlug)
  }

  // Load values from query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const urlCategory = queryParams.get('category')
    const urlSearch = queryParams.get('search')

    // Check the url category is valid using the `getCategory` function
    if (
      urlCategory &&
      String(urlCategory).trim().length &&
      getCategory(String(urlCategory).trim())
    ) {
      setCategory(urlCategory)
    }

    // Check the search query is not empty
    if (urlSearch && String(urlSearch).trim().length) {
      setSearch(urlSearch)
    }
  }, [router])

  // Update query string values
  useEffect(() => {
    const queryParams = []

    if (category && getCategory(category)) {
      queryParams.push(`category=${encodeURIComponent(category)}`)
    }

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`)
    }

    if (queryParams.length) {
      router.push('/integrations?' + queryParams.join('&'), undefined, {
        shallow: true
      })
    } else {
      router.push('/integrations', undefined, { shallow: true })
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

      <div className='container mx-auto mb-20 max-w-7xl space-y-20 px-8 2xl:px-0'>
        <div className='flex-col items-center'>
          <SuiSearchField
            placeholder='Search by integration...'
            htmlFor='search'
            className='mx-auto mb-6 md:max-w-md lg:mb-8'
            value={search || ''}
            onChange={searchChange}
          />
          <CategorySelector options={categoryList} />
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
                {group.integrations.map((integration) => (
                  <IntegrationTile key={integration.slug} {...integration} />
                ))}
              </div>
            </div>
          )
        })}

        {!groups.length && (
          <p className='mt-12 mb-20 w-full text-center'>
            {search ? `No search results for "${search}"` : 'No results'}
            {category && getCategory(category)
              ? ` in ${getCategory(category)?.label}`
              : ''}
          </p>
        )}

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
