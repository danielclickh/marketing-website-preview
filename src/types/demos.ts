import { StrapiImageType } from '@/lib/api/strapi/types'

export type Demo = {
  id: number
  Title: string
  Description: string
  Link: string
  LinkText: null | string
  LinkType: '_blank' | '_self'
  Image: null | StrapiImageType
  GitHubLink: null | string
  External: boolean
  Content: string
  ListOnDemos: boolean
}
