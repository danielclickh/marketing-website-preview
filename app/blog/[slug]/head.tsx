import SeoContainer from '../../../components/SeoContainer'

export default async function Head({ params }: { params: { slug: string } }) {
  return <SeoContainer requestString={`blog/${params.slug}`} />
}
