import { BlogPost } from './blogs'
import { CommonProps, NewsLetterData } from './homepage'
import { StrapiImageType } from '@/lib/api/strapi/types'

export interface BlogProps extends BlogPost, CommonProps {
  content: string
  otherBlogs: BlogPost[]
  newsLetterData: NewsLetterData
  ShowCloudCTAHeader: boolean | null
  ShowCloudCTAFooter: boolean | null
  CloudCTAFooter: string
  CloudCTAHeader: string
  reading_time: number
  reading_time_override: null | number
  table_contents_headers: string
  promotion?: {
    title: string
    description: string
    image: StrapiImageType
  }
  enableSidebarGlobalCta: boolean
  globalCta?: null | {
    content: string
    link: {
      href: string
      text: string
      target: '_self' | '_blank'
    }
  }
}
