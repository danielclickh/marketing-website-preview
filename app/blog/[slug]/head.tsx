import SeoContainer from '../../../components/SeoContainer'
import { findAll } from '../../../lib/api/strapi'

export default async function Head({ params }: { params: { slug: string } }) {
  const blogsParams = {
    filters: {
      slug: {
        $eq: params.slug
      }
    },
    populate: ['author', 'author.avatarPng', 'thumbnailPng'],
    pagination: { limit: 1 }
  }
  const { data } = await findAll('blog-posts', blogsParams)
  const blog = {
    title: data[0].title,
    keywords: data[0].keywords,
    description: data[0].shortDescription,
    type: 'article',
    siteName: 'ClickHouse',
    image: data[0].thumbnailPng
  }
  return <SeoContainer {...blog} />
}
