import { ReactNode } from 'react'
import { StrapiImageType } from '../lib/api/strapi/types'
import { CommonProps } from './homepage'
import { SeoMetadata } from '../lib/api/strapi/types'
import { HomepageCustomerStories } from '../types/homepage'
import { BlogPost as BlogPostType, BlogProps } from '../types/blogs'

interface Painpoint {
  Title: string
  Description: string
  Proofpoint: string
  customer: {
    description: string | undefined
    logo: StrapiImageType
  }
}

interface RepeatableContent {
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
      blog_posts: Array<BlogPostType>
    }
  ]
}

interface ComparisonPage {
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
}

export interface ComparisonProps extends CommonProps {
  seo?: SeoMetadata
  comparison: ComparisonPage
}
