import Layout from '@/components/Layout'
import { resourcesController } from '@/lib/api/strapi'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { EntryResource } from '@/types/strapi'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export interface Props extends CommonProps {
  resources: Array<EntryResource>
}

export const getServerSideProps = (async ({ req, params }) => {
  const commonProps = await getCommonProps()
  const resources = await resourcesController.findAll()
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
      <div className='section-container'>
        <pre>{JSON.stringify(resources, null, 2)}</pre>
      </div>
    </Layout>
  )
}
