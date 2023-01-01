import SeoContainer from '../../components/SeoContainer'
import { findHeader } from '../../lib/api/strapi'

export default async function Head() {
  const data = await findHeader('pricing')
  return <SeoContainer {...data} />
}
