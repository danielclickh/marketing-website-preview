import { StrapiButton } from '../../lib/api/strapi/types'

interface GettingStartedPlatform {
  id: number
  name: string
  instructions: string
}
export interface GettingStartedData {
  pretitle: string
  title: string
  description: string
  descriptionRichText: string
  quickStartButton: StrapiButton
  cloudButton: StrapiButton
  platforms: Array<GettingStartedPlatform>
  bottomText: string
}
