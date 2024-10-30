import { BlogPost } from './blogs'
import { CommonProps, NewsLetterData } from './homepage'

export interface BlogProps extends BlogPost, CommonProps {
  content: string
  otherBlogs: BlogPost[]
  newsLetterData: NewsLetterData
  ShowCloudCTAHeader: boolean | null
  ShowCloudCTAFooter: boolean | null
  CloudCTAFooter: string
  CloudCTAHeader: string
  readingTime: number
}
