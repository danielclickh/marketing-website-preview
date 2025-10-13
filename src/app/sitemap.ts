import buildItems from '@/../public/indexedStaticPages.json'
import { pages as learnPages } from '@/data/learn'
import {
  fetchAll,
  getStagingOnlyFilters,
  getUnlistedFilters
} from '@/lib/api/strapi'
import { getEngineeringResources } from '@/lib/engineering-resources'
import {
  applyLangPath,
  defaultLanguage,
  getPathLang,
  removeLangPath
} from '@/lib/utils/internationalisation'
import { getVideos } from '@/lib/videos'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteURL = 'https://clickhouse.com'

  const stagingOnlyFilters = getStagingOnlyFilters()

  const blogPostsRequest = fetchAll('blog-posts', {
    sort: ['date:DESC', 'publishedAt:DESC'],
    fields: [
      'createdAt',
      'updatedAt',
      'publishedAt',
      'slug',
      'date',
      'category'
    ],
    filters: { $or: stagingOnlyFilters }
  })

  const eventsRequest = fetchAll('events', {
    sort: ['localDatetime:DESC'],
    filters: {
      $and: [
        {
          $or: stagingOnlyFilters
        },
        {
          $or: getUnlistedFilters()
        }
      ]
    }
  })

  const comparisonsRequest = fetchAll('comparisons', {
    sort: ['publishedAt:DESC'],
    fields: ['Title', 'slug', 'updatedAt']
  })

  const richTextPagesRequest = fetchAll('rich-content-pages', {
    sort: ['publishedAt:DESC'],
    fields: ['url', 'updatedAt', 'publishedAt']
  })

  const integrationsRequest = fetchAll('integrations', {
    filters: {
      // Integrations with `openInNewWindow` set to true are excluded from the query.
      // This is because they link off externally. See the IntegrationTile component.
      $or: [
        {
          openInNewWindow: {
            $eq: false
          }
        },
        {
          openInNewWindow: {
            $null: true
          }
        }
      ]
    }
  })

  const [
    videos,
    engineeringResources,
    blogPosts,
    events,
    comparisons,
    richTextPages,
    integrations
  ] = await Promise.all([
    getVideos(),
    getEngineeringResources(),
    blogPostsRequest,
    eventsRequest,
    comparisonsRequest,
    richTextPagesRequest,
    integrationsRequest
  ])

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${siteURL}` },
    {
      url: `${siteURL}/clickhouse`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/clickhouse`
        }
      }
    },
    {
      url: `${siteURL}/blog`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/blog`
        }
      }
    },
    {
      url: `${siteURL}/cloud`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/cloud`
        }
      }
    },
    {
      url: `${siteURL}/cloud/clickpipes`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/cloud/clickpipes`
        }
      }
    },
    {
      url: `${siteURL}/company/our-story`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/company/our-story`
        }
      }
    },
    {
      url: `${siteURL}/company/contact`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/company/contact`
        }
      }
    },
    {
      url: `${siteURL}/comparison/bigquery`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/comparison/bigquery`
        }
      }
    },
    {
      url: `${siteURL}/comparison/redshift`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/comparison/redshift`
        }
      }
    },
    {
      url: `${siteURL}/comparison/snowflake`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/comparison/snowflake`
        }
      }
    },
    {
      url: `${siteURL}/demos`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/demos`
        }
      }
    },
    {
      url: `${siteURL}/integrations`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/integrations`
        }
      }
    },
    {
      url: `${siteURL}/pricing`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/pricing`
        }
      }
    },
    {
      url: `${siteURL}/pricing/contact`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/pricing/contact`
        }
      }
    },
    {
      url: `${siteURL}/use-cases/business-intelligence`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/use-cases/business-intelligence`
        }
      }
    },
    {
      url: `${siteURL}/use-cases/machine-learning-and-data-science`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/use-cases/machine-learning-and-data-science`
        }
      }
    },
    {
      url: `${siteURL}/use-cases/real-time-analytics`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/use-cases/real-time-analytics`
        }
      }
    },
    {
      url: `${siteURL}/use-cases/observability`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/use-cases/observability`
        }
      }
    },
    {
      url: `${siteURL}/videos`,
      alternates: {
        languages: {
          ja: `${siteURL}/jp/videos`
        }
      }
    }
  ]

  const cmsUrls: MetadataRoute.Sitemap = [
    ...blogPosts.map((post) => {
      const prefix = post.category === 'Japanese' ? '/jp' : ''
      return {
        url: `${siteURL}${prefix}/blog/${post.slug}`,
        lastModifiedAt: new Date(post.updatedAt)
      }
    }),
    ...events.map((post) => {
      return {
        url: `${siteURL}/company/events/${post.slug}`,
        lastModifiedAt: new Date(post.updatedAt)
      }
    }),
    ...comparisons.map((post) => {
      return {
        url: `${siteURL}/comparison/${post.slug}`,
        lastModifiedAt: new Date(post.updatedAt),
        alternates: {
          languages: {
            ja: `${siteURL}/jp/comparison/${post.slug}`
          }
        }
      }
    }),
    ...richTextPages.map((post) => {
      const uri = post.url.replace(/^\/+/, '').replace(/\/+$/, '')
      return {
        url: `${siteURL}/${uri}`,
        lastModifiedAt: new Date(post.updatedAt)
      }
    }),
    ...engineeringResources.map((post) => {
      return {
        url: `${siteURL}/engineering-resources/${post.slug}`,
        lastModifiedAt: post.lastUpdated ? new Date(post.lastUpdated) : null
      }
    }),
    ...videos.map((post) => {
      return {
        url: `${siteURL}/videos/${post.slug}`,
        alternates: {
          languages: {
            ja: `${siteURL}/jp/videos/${post.slug}`
          }
        }
      }
    }),
    ...integrations.map((post) => {
      return {
        url: `${siteURL}/integrations/${post.slug}`,
        lastModifiedAt: new Date(post.updatedAt),
        alternates: {
          languages: {
            ja: `${siteURL}/jp/integrations/${post.slug}`
          }
        }
      }
    }),
    ...learnPages
      .filter((item) => {
        return !item.comingSoon
      })
      .map((item) => {
        return {
          url: `${siteURL}/learn/${item.slug}`
        }
      })
  ]

  let combined: MetadataRoute.Sitemap = [...staticUrls, ...cmsUrls]

  // Add items from our build step
  try {
    if (buildItems && Array.isArray(buildItems)) {
      const i18nItems: typeof buildItems = []

      buildItems.forEach((item) => {
        if (item && item?.attributes?.path) {
          const path = item.attributes.path
          const lang = getPathLang(path)
          // Skip internationalised items, these get merged further down
          if (lang && lang !== defaultLanguage) {
            i18nItems.push(item)
          } else {
            const url = `${siteURL}${path}`
            const found = combined.find((el) => el.url === url)
            if (!found) {
              combined.push({
                url
              })
            }
          }
        }
      })

      // Merge internationalised urls with hreflang
      i18nItems.forEach((item) => {
        const path = item.attributes.path
        const lang = getPathLang(item.attributes.path)
        if (lang) {
          const url = `${siteURL}${path}`
          const defaultLangPath = `${siteURL}${applyLangPath(removeLangPath(path, lang), defaultLanguage)}`
          const defaultLangEntry = combined.find(
            (el) => el.url === defaultLangPath
          )
          // Merge with default language entry
          if (defaultLangEntry) {
            if (!defaultLangEntry?.alternates) {
              defaultLangEntry.alternates = {}
            }
            if (!defaultLangEntry.alternates?.languages) {
              defaultLangEntry.alternates.languages = {}
            }

            defaultLangEntry.alternates.languages[lang] = url
          }

          // Unable to merge, create it's own entry
          else {
            combined.push({
              url
            })
          }
        }
      })
    }
  } catch (e) {
    console.error(e)
  }

  return combined
}
