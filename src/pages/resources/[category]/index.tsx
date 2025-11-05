import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import PillFilters from '@/components-cleaned/PillFilters'
import Layout from '@/components/Layout'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import {
  resourceCategoriesController,
  resourcesController
} from '@/lib/api/strapi'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource, EntryResourceCategory } from '@/types/strapi'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export interface Props extends CommonProps {
  categories: Array<EntryResourceCategory>
  category: EntryResourceCategory
  resources: Array<EntryResource>
}

export const getServerSideProps = (async ({ req, params }) => {
  const categorySlug =
    typeof params?.category === 'string' ? params.category : null

  if (!categorySlug) {
    return {
      notFound: true
    }
  }

  const categories = await resourceCategoriesController.findAll()
  const category = categories.find((cat) => cat.slug === categorySlug)

  if (!category) {
    return {
      notFound: true
    }
  }

  const commonProps = await getCommonProps()
  const resources = await resourcesController.findAll({
    filters: {
      category: {
        slug: category.slug
      }
    }
  })
  return {
    props: {
      ...commonProps,
      categories,
      category,
      resources
    }
  }
}) satisfies GetServerSideProps<Props>

export default function ResourcesCategoryPage({
  categories,
  category,
  resources,
  ...commonProps
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

          <div className='flex items-center gap-6'>
            <SuiSearchField
              placeholder='Search by title or keyword...'
              htmlFor='search'
              className='max-w-[300px]'
              value={''}
              onChange={console.log}
            />
            {categories.length > 1 && (
              <nav>
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

          <ul className='space-y-10'>
            {resources.map((resource, resourceIndex) => {
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
                          ? convertDateToString(resource.date)
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
        </div>
      </div>
    </Layout>
  )
}
