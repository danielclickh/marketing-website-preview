import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import PillFilters from '@/components-cleaned/PillFilters'
import ResourcesArchive from '@/components-cleaned/ResourcesArchive'
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
  resources: Array<EntryResource>
}

export const getServerSideProps = (async ({ req, params }) => {
  const commonProps = await getCommonProps()
  const categories = await resourceCategoriesController.findAll()
  const resources = await resourcesController.findAll()
  return {
    props: {
      ...commonProps,
      categories,
      resources
    }
  }
}) satisfies GetServerSideProps<Props>

export default function RsourcesPage({
  resources,
  categories,
  ...commonProps
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
