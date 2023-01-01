import SeoContainer from '../../../components/SeoContainer'
import { findHeader } from '../../../lib/api/strapi'

export default async function Head() {
  const data = await findHeader('news-and-event')
  return <SeoContainer {...data} />
}
