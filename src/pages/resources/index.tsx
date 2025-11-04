import Layout from '@/components/Layout'
import { SuiSearchField, SuiTitle } from '@/components/sui'
import { resourcesController } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource } from '@/types/strapi'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

export interface Props extends CommonProps {
  resources: Array<EntryResource>
}

export const getServerSideProps = (async ({ req, params }) => {
  const commonProps = await getCommonProps()
  const resources = await resourcesController.findAll({
    populate: 'deep'
  })
  return {
    props: {
      ...commonProps,
      resources
    }
  }
}) satisfies GetServerSideProps<Props>

export default function RsourcesPage({
  resources,
  ...commonProps
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout {...commonProps}>
      <div className='bg-grid'>
        <div className='section-container py-16 md:py-20'>
          <SuiTitle type='h1' className='mb-12'>
            ClickHouse Resources
          </SuiTitle>

          <SuiSearchField
            placeholder='Search by title or keyword...'
            htmlFor='search'
            className='max-w-[300px]'
            value={''}
            onChange={console.log}
          />

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
