import SeoContainer from '@/components/SeoContainer'
import { blogService, getProxiedMediaUrl } from '@/lib/api/strapi'
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

  const blog = await blogService.findOne({
    filters: {
      slug: {
        $eq: slug
      }
    },
    populate: ['thumbnailPng']
  })

  if (!blog) {
    return {
      notFound: true
    }
  } else if (blog.category === 'Japanese') {
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
        title: blog.title,
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
