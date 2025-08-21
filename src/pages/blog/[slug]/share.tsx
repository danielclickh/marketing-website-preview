import SeoContainer from '@/components/SeoContainer'
import {
  findAll,
  getProxiedMediaUrl,
  getStagingOnlyFilters
} from '@/lib/api/strapi'
import { SeoMetadata } from '@/lib/api/strapi/types'
import { generateBlogArticleSchema } from '@/lib/schema'
import { ParamsType } from '@/types/homepage'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const BOT_UA =
  /(Twitterbot|Slackbot|facebookexternalhit|LinkedInBot|Discordbot|WhatsApp|TelegramBot|Google-InspectionTool)/i

// This will run on the server at request time
export const getServerSideProps = (async ({ req, params }) => {
  const ua = req.headers['user-agent'] || ''
  const isBot = BOT_UA.test(ua)
  const { slug } = params as ParamsType
  const { data } = await findAll('blog-posts', {
    filters: {
      slug: {
        $eq: slug
      },
      $or: getStagingOnlyFilters()
    },
    populate: ['thumbnailPng'],
    pagination: { limit: 1 }
  })

  const blog = data?.[0]

  if (!blog) {
    return {
      notFound: true
    }
  } else if (blog?.category === 'Japanese') {
    return {
      redirect: {
        destination: `/jp/blog/${slug}`,
        permanent: true
      }
    }
  }

  // Humans go to the real blog post
  if (!isBot) {
    return {
      redirect: {
        destination: `/blog/${slug}`,
        permanent: false
      }
    }
  }

  // Bots: pass post data down so we can render meta tags
  return {
    props: {
      seo: {
        title: `Sharing: ${blog.title}`,
        description: blog.shortDescription,
        type: 'article',
        siteName: 'ClickHouse',
        image: [blog.thumbnailPng],
        path: blog.canonical_url ? blog.canonical_url : `/blog/${slug}`,
        keywords: blog?.keywords || '',
        schema: generateBlogArticleSchema({
          title: blog.title,
          description: blog.shortDescription,
          imageUrl: getProxiedMediaUrl(blog.thumbnailPng.url),
          authorName: blog?.author?.name ? blog.author.name : 'ClickHouse Team',
          publishedDate: blog.publishedAt,
          modifiedDate: blog.updatedAt
        })
      }
    }
  }
}) satisfies GetServerSideProps<{ seo: SeoMetadata }>

export default function SharePage({
  seo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <SeoContainer {...seo} />
}
