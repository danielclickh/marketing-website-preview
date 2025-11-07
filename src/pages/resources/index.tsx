import { CUICard } from '@/components/ClickUI'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiTitle } from '@/components/sui'
import {
  resourceCategoriesController,
  resourcesController
} from '@/lib/api/strapi'
import { convertDateToString } from '@/lib/utils/dateUtils'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource, EntryResourceCategory } from '@/types/strapi'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

export interface Props extends CommonProps {
  categories: Array<EntryResourceCategory>
  resources: Record<EntryResourceCategory['id'], Array<EntryResource>>
}

export const getStaticProps = (async ({ params }) => {
  const commonProps = await getCommonProps()
  const categories = await resourceCategoriesController.findAll({
    sort: ['name:ASC']
  })

  const resources: Props['resources'] = {}

  for (const category of categories) {
    resources[category.id] = await resourcesController.findSome({
      sort: ['publishedAt:DESC'],
      filters: {
        category: {
          id: {
            $eq: category.id
          }
        }
      },
      pagination: {
        limit: 3
      }
    })
  }

  return {
    props: {
      ...commonProps,
      categories,
      resources,
      seo: {
        title: 'ClickHouse Resource Hub',
        path: '/resources'
      }
    }
  }
}) satisfies GetStaticProps<Props>

export default function RsourcesPage({
  resources,
  categories,
  ...commonProps
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout {...commonProps}>
      <div className='space-y-16 bg-grid py-16 md:space-y-20 md:py-20'>
        <section className='section-container'>
          <SuiTitle type='h1' className='mb-12'>
            Resource hub
          </SuiTitle>
          <hr className='my-6 h-px border-0 bg-white/20' />
        </section>

        {categories.map((category) => {
          const catResources = resources[category.id]
          if (!catResources.length) return null
          return (
            <section key={category.id} className='section-container'>
              <div className='mb-6 flex flex-col gap-x-6 gap-y-2 lg:flex-row lg:items-end lg:justify-between'>
                <SuiTitle type='h2'>
                  {category.heading || category.name}
                </SuiTitle>
                <LinkWithArrow
                  href={`/resources/${category.slug}`}
                  className='font-bold text-primary-300'>
                  View all
                </LinkWithArrow>
              </div>
              <ul className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                {catResources.map((resource) => {
                  return (
                    <li key={resource.id}>
                      <CUICard className='relative p-6'>
                        <CUICard.Header className='mb-4'>
                          <SuiTitle type='h3'>
                            <Link
                              href={`/resources/${resource.category.slug}/${resource.slug}`}
                              className='text-primary-300 hover:underline'>
                              <span className='absolute inset-0' />
                              {resource.title}
                            </Link>
                          </SuiTitle>
                          {(resource.author || resource.date) && (
                            <p className='mt-2 text-sm text-neutral-200'>
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
                        </CUICard.Header>
                        <CUICard.Body className='mb-auto'>
                          <p className='text-neutral-200'>{resource.excerpt}</p>
                        </CUICard.Body>
                      </CUICard>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </Layout>
  )
}
