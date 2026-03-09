import { HomepageCustomerStories } from './homepage'
import { CommonProps } from './homepage'
import { SeoMetadata, StrapiImageType } from '@/lib/api/strapi/types'
import { EntryBlogPost } from '@/types/strapi'

interface Painpoint {
  Title: string
  Description: string
  Proofpoint: string
  customer: {
    description: string | undefined
    logo: StrapiImageType
  }
}

export interface RepeatableContent {
  SectionTitle: string
  Category: string
  Footer: string
  Description: string
  customContent: [
    {
      Title: string
      Description: string
      href: string
      Image: StrapiImageType
      Category: string
      Footer: string
    }
  ]
  RelatedBlogs: [
    {
      blog_posts: Array<EntryBlogPost>
    }
  ]
}

export interface BigNumber {
  Number: string
  Text: string
}

export interface ComparisonPage {
  Title: string
  image: StrapiImageType
  HeroDescription: string
  painpoint: Array<Painpoint>
  formTitle: string
  customerStories: HomepageCustomerStories
  painpointsTitle: string
  painpointsIcon: StrapiImageType
  testimonialsTitle: string
  testimonialsIcon: StrapiImageType
  Testimonials: [
    {
      Title: string
      Description: string
      href: string
      logo: StrapiImageType
    }
  ]
  Content: [RepeatableContent]
  BigNumbers: [BigNumber]
  slug: string
  seo: CommonProps['seo']
}

export interface ComparisonProps extends CommonProps {
  seo?: SeoMetadata
  comparison: ComparisonPage
}
