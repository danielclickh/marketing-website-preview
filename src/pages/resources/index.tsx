import StrapiResourceCard from '@/components-cleaned/StrapiResourceCard'
import Layout from '@/components/Layout'
import LinkWithArrow from '@/components/LinkWithArrow'
import { SuiTitle } from '@/components/sui'
import { resourceCategoriesService, resourcesService } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource, EntryResourceCategory } from '@/types/strapi'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export interface Props extends CommonProps {
  categories: Array<EntryResourceCategory>
  resources: Record<EntryResourceCategory['id'], Array<EntryResource>>
}

export const getStaticProps = (async ({ params }) => {
  const commonProps = await getCommonProps()
  const categories = await resourceCategoriesService.findAll({
    sort: ['name:ASC']
  })

  const resources: Props['resources'] = {}

  for (const category of categories) {
    resources[category.id] = await resourcesService.findMany({
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
                <SuiTitle type='h2'>{category.name}</SuiTitle>
                <LinkWithArrow
                  href={`/resources/${category.slug}`}
                  className='font-bold text-primary-300'>
                  View all
                </LinkWithArrow>
              </div>
              <ul className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
                {catResources.map((resource) => {
                  return (
                    <li key={resource.id}>
                      <StrapiResourceCard entry={resource} />
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
