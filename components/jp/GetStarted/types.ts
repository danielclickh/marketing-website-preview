import { StrapiButton } from '../../../lib/api/strapi/types'

export interface GettingStartedPlatform {
  id: number
  name: string
  instructions: string
}
export interface GettingStartedData {
  platforms: Array<GettingStartedPlatform>
}
