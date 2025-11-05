import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import ResourcesArchive from '@/components-cleaned/ResourcesArchive'
import Layout from '@/components/Layout'
import { SuiTitle } from '@/components/sui'
import {
  resourceCategoriesController,
  resourcesController
} from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource, EntryResourceCategory } from '@/types/strapi'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export interface Props extends CommonProps {
  categories: Array<EntryResourceCategory>
  resources: Array<EntryResource>
}

export const getStaticProps = (async ({ params }) => {
  const commonProps = await getCommonProps()
  const categories = await resourceCategoriesController.findAll({
    sort: ['name:ASC']
  })
  const resources = await resourcesController.findAll({
    sort: ['publishedAt:DESC']
  })
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
      <div className='bg-grid'>
        <div className='section-container py-16 md:py-20'>
          <Breadcrumbs>
            <Breadcrumbs.Item>Resources</Breadcrumbs.Item>
          </Breadcrumbs>
          <SuiTitle type='h1' className='mb-12'>
            Resource Hub
          </SuiTitle>

          <ResourcesArchive resources={resources} categories={categories} />
        </div>
      </div>
    </Layout>
  )
}
