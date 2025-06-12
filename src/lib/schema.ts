import logo from '@/../public/favicons/web-app-manifest-192x192.png'
import { absoluteUrl } from '@/lib/next'
import {
  WithContext,
  WebSite,
  Organization,
  CollectionPage,
  BlogPosting,
  Event,
  VideoObject,
  SoftwareApplication,
  Article,
  ContactPage,
  WebPage,
  Product
} from 'schema-dts'

const defaultOrganization: Organization = {
  '@type': 'Organization',
  name: 'ClickHouse',
  url: absoluteUrl('/'),
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(logo.src)
  }
}

export const generateHomepageSchema = (): WithContext<WebSite> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ClickHouse',
  url: absoluteUrl('/')
})

export const generateBlogArchiveSchema = ({
  path
}: {
  path: string
}): WithContext<CollectionPage> => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Blog',
  url: absoluteUrl(path),
  mainEntity: {
    '@type': 'Blog',
    name: 'Blog'
  }
})

export const generateBlogArticleSchema = ({
  title,
  description,
  imageUrl,
  authorName,
  publishedDate,
  modifiedDate
}: {
  title: string
  description: string
  imageUrl: string
  authorName: string
  publishedDate: string
  modifiedDate: string
}): WithContext<BlogPosting> => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  image: imageUrl,
  author: {
    '@type': 'Person',
    name: authorName
  },
  publisher: defaultOrganization,
  datePublished: publishedDate,
  dateModified: modifiedDate
})

export const generateEventsArchiveSchema = ({
  path
}: {
  path: string
}): WithContext<CollectionPage> => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Events',
  url: absoluteUrl(path)
})

export const generateInnerEventSchema = ({
  name,
  description,
  startDate,
  imageUrl,
  path,
  locationCity,
  locationCountry
}: {
  name: string
  description: string
  startDate: string
  imageUrl: string
  path: string
  locationCity: string
  locationCountry: string
}): WithContext<Event> => {
  const virtualTypes = ['online', 'virtual']
  const isVirtual =
    virtualTypes.includes(locationCity.trim().toLowerCase()) ||
    virtualTypes.includes(locationCountry.trim().toLowerCase())

  const location: Event['location'] = isVirtual
    ? {
        '@type': 'VirtualLocation',
        url: absoluteUrl(path)
      }
    : {
        '@type': 'Place',
        name: `${locationCity},  ${locationCountry}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: `${locationCity}, ${locationCountry}`
        }
      }

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    startDate,
    //eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: imageUrl,
    description,
    organizer: defaultOrganization,
    location
  }
}

export const generateVideosArchiveSchema = ({
  path
}: {
  path: string
}): WithContext<CollectionPage> => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Videos',
  url: absoluteUrl(path)
})

export const generateVideoObjectSchema = ({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl
}: {
  title: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl: string
  embedUrl: string
}): WithContext<VideoObject> => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: title,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl
})

// @todo
export const generateProductIntegrationSchema = ({
  name,
  description
}: {
  name: string
  description: string
}): WithContext<SoftwareApplication> => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  operatingSystem: 'Cloud',
  applicationCategory: 'BusinessApplication',
  description,
  publisher: defaultOrganization
})

// @todo
export const generateComparisonSchema = ({
  title,
  description,
  features
}: {
  title: string
  description: string
  features: string[]
}): WithContext<Article> => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  publisher: defaultOrganization,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: features.map((feature, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: feature
    }))
  }
})

// @todo
export const generateContactPageSchema = ({
  path
}: {
  path: string
}): WithContext<ContactPage> => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Us',
  url: absoluteUrl(path)
})

// @todo
export const generatePricingPageSchema = ({
  path,
  description
}: {
  path: string
  description: string
}): WithContext<WebPage> => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Pricing',
  url: absoluteUrl(path),
  description
})

// @todo
export const generateUseCaseSchema = ({
  title,
  description
}: {
  title: string
  description: string
}): WithContext<Article> => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  publisher: defaultOrganization
})
