import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import PillFilters from '@/components-cleaned/PillFilters'
import Layout from '@/components/Layout'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import {
  resourceCategoriesController,
  resourcesController,
  seoFieldToNextComponentProps
} from '@/lib/api/strapi'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource, EntryResourceCategory } from '@/types/strapi'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export async function getStaticPaths() {
  const categories = await resourceCategoriesController.findAll({
    fields: ['slug'],
    populate: []
  })

  return {
    paths: categories.map((post) => ({
      params: { category: post.slug }
    })),
    fallback: 'blocking'
  }
}

export interface Props extends CommonProps {
  categories: Array<EntryResourceCategory>
  category: EntryResourceCategory
  resources: Array<EntryResource>
}

export const getStaticProps = (async ({ params }) => {
  const categorySlug =
    typeof params?.category === 'string' ? params.category : null

  if (!categorySlug) {
    return {
      notFound: true
    }
  }

  const categories = await resourceCategoriesController.findAll({
    sort: ['name:ASC']
  })
  const category = categories.find((cat) => cat.slug === categorySlug)

  if (!category) {
    return {
      notFound: true
    }
  }

  const [commonProps, resources] = await Promise.all([
    getCommonProps(),
    resourcesController.findAll({
      sort: ['publishedAt:DESC'],
      filters: {
        category: {
          slug: category.slug
        }
      }
    })
  ])

  return {
    props: {
      ...commonProps,
      categories,
      category,
      resources,
      seo: seoFieldToNextComponentProps(category.seo, {
        title: `${category.heading || category.name} | ClickHouse Resource Hub`,
        path: '/resources'
      })
    }
  }
}) satisfies GetStaticProps<Props>

export default function ResourcesCategoryPage({
  categories,
  category,
  resources,
  ...commonProps
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [search, setSearch] = useState('')

  const filteredResources = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return resources.filter((resource) => {
      const inTitle = resource.title.toLowerCase().includes(searchTerm)
      const inExcerpt = resource.excerpt.toLowerCase().includes(searchTerm)
      return inTitle || inExcerpt
    })
  }, [search, resources])

  return (
    <Layout {...commonProps}>
      <div className='bg-grid'>
        <div className='section-container py-16 md:py-20'>
          <Breadcrumbs>
            <Breadcrumbs.Link href='/resources'>Resources</Breadcrumbs.Link>
            <Breadcrumbs.Item>{category.name}</Breadcrumbs.Item>
          </Breadcrumbs>
          <SuiTitle type='h1' className='mb-12'>
            {category.heading || category.name}
          </SuiTitle>

          <div className='flex-col items-center lg:flex lg:flex-row lg:justify-between lg:space-x-24'>
            <SuiSearchField
              placeholder='Search by title or keyword...'
              htmlFor='search'
              className='mb-6 max-w-sm lg:mb-0 lg:flex-1'
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
            {categories.length > 1 && (
              <nav className='ml-auto'>
                <PillFilters
                  options={[
                    {
                      kind: 'link',
                      label: 'View all',
                      href: '/resources'
                    },
                    ...categories.map((item) => ({
                      kind: 'link' as const,
                      label: item.name,
                      href: `/resources/${item.slug}`,
                      active: item.id === category.id
                    }))
                  ]}
                />
              </nav>
            )}
          </div>

          <hr className='my-6 h-px border-0 bg-white/20' />

          {filteredResources.length > 0 ? (
            <ul className='space-y-10'>
              {filteredResources.map((resource, resourceIndex) => {
                return (
                  <li className='relative space-y-4' key={resourceIndex}>
                    <SuiTitle type='h2' className='!text-xl'>
                      <Link
                        href={`/resources/${resource.category.slug}/${resource.slug}`}
                        className='text-primary-300 hover:underline'>
                        <span className='absolute inset-0' />
                        {resource.title}
                      </Link>
                    </SuiTitle>
                    <p className='mt-2 text-neutral-200'>{resource.excerpt}</p>
                    {(resource.author || resource.date) && (
                      <p className='text-sm text-neutral-200'>
                        {[
                          resource.author?.name,
                          resource?.date
                            ? `${resource.dateLabel ? `${resource.dateLabel}: ` : ''}${convertDateToString(resource.date)}`
                            : null
                        ]
                          .filter(Boolean)
                          .join(' • ')}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className='mt-16 text-center'>
              {search && resources.length
                ? `No results found. Try a broader or different search term.`
                : 'No resources available at the moment. Please check back soon.'}
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}
