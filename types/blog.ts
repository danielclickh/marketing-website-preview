import { SeoMetadata } from '../lib/api/strapi/types'
import { CommonProps, NewsLetterData } from './homepage'
import { BlogPost } from './blogs'

export interface BlogProps extends BlogPost, CommonProps {
  content: string
  otherBlogs: BlogPost[]
  newsLetterData: NewsLetterData
}
