import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import ResourcesArchive from '@/components-cleaned/ResourcesArchive'
import Layout from '@/components/Layout'
import { SuiTitle } from '@/components/sui'
import {
  resourceCategoriesController,
  resourcesController,
  seoFieldToNextComponentProps
} from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource, EntryResourceCategory } from '@/types/strapi'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

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

          <ResourcesArchive
            resources={resources}
            categories={categories}
            activeCategory={category}
          />
        </div>
      </div>
    </Layout>
  )
}
