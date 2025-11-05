import Breadcrumbs from '@/components-cleaned/Breadcrumbs'
import Layout from '@/components/Layout'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import {
  resourceCategoriesController,
  resourcesController
} from '@/lib/api/strapi'
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

          <div className='flex items-center gap-6'>
            <SuiSearchField
              placeholder='Search by title or keyword...'
              htmlFor='search'
              className='max-w-[300px]'
              value={''}
              onChange={console.log}
            />
            <nav>
              <ul className='flex gap-2'>
                {categories.map((category, categoryIndex) => {
                  return (
                    <li key={categoryIndex}>
                      <Link
                        href={`/resources/${category.slug}`}
                        className='inline-block rounded-full border border-neutral-600 px-3 py-1 hover:border-primary-300'>
                        {category.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <hr className='my-6 h-px border-0 bg-white/20' />

          {resources.map((resource, resourceIndex) => {
            return (
              <div className='my-10' key={resourceIndex}>
                <SuiTitle type='h2' className='!text-xl'>
                  <Link
                    href={`/resources/${resource.categories[0].slug}/${resource.slug}`}
                    className='text-primary-300 hover:underline'>
                    {resource.title}
                  </Link>
                </SuiTitle>
                <div className='mt-2 text-neutral-200'>{resource.excerpt}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
