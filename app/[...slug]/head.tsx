import { findAll } from '../../lib/api/strapi'
import SeoContainer from '../../components/SeoContainer'
import { ParamsType } from './types'

export default async function Head({
  params: { slug }
}: {
  params: ParamsType
}) {
  const { data } = await findAll('rich-content-pages', {
    filters: {
      $or: [
        {
          url: {
            $eq: `/${slug.join('/')}`
          }
        },
        {
          url: {
            $eq: `/${slug.join('/')}/`
          }
        }
      ]
    },
    fields: ['title']
  })

  return (
    <SeoContainer title={data[0]?.title} type='website' siteName='ClickHouse' />
  )
}
