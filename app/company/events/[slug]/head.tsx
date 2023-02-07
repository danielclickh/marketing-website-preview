import { findAll } from '../../../../lib/api/strapi'
import SeoContainer from '../../../../components/SeoContainer'
import { PageProps } from './types'

export default async function Head({ params: { slug } }: PageProps) {
  const { data } = await findAll('events', {
    filters: {
      slug: {
        $eq: slug
      }
    },
    sort: ['localDatetime:DESC'],
    fields: ['title', 'shortDescription'],
    populate: ['thumbnailPng']
  })

  if (!data[0]) {
    return null
  }

  return (
    <SeoContainer
      title={data[0].title}
      description={data[0].shortDescription}
      image={[data[0].thumbnailPng]}
      type='website'
      siteName='ClickHouse'
    />
  )
}
