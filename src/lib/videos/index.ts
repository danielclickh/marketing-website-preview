import { findAll } from '../api/strapi'
import { slugify } from '../utils/strings'
import { Video, VideoCategoryRecord } from './types'
import { StrapiImageProps } from '@/components/StrapiElements/types'

type StrapiItem = {
  id: number
  Slug: string
  VideoID: string
  Title?: null | string
  IntroText?: null | string
  Description?: null | string
  categories?: Array<{ CategoryName: string }>
  RelatedVideos?: Array<StrapiItem>
  VideoDate?: null | string
  seo: null | {
    title?: null | string
    description?: null | string
    image?: null | StrapiImageProps
  }
  publishedAt: string
  updatedAt: string
  language: 'English' | 'Japanese'
}

export async function getVideos(): Promise<Video[]> {
  const response = await findAll('marketing-videos', {
    sort: ['VideoDate:DESC', 'publishedAt:DESC'],
    populate: ['categories', 'RelatedVideos', 'seo', 'seo.image']
  })

  const data = response.data as Array<StrapiItem>

  return data.map((item) => {
    let thumbnail = `https://img.youtube.com/vi/${item.VideoID}/maxresdefault.jpg`

    let seo: Video['seo'] = {
      title: item?.seo?.title || `${item.Title} | ClickHouse Videos`,
      description: item?.seo?.description || item.Description || ''
    }

    if (item?.seo?.image) {
      seo.image = [item.seo.image]

      // Social image overrides thumbnail
      thumbnail = item.seo.image.url
    } else {
      seo.imageUrl = thumbnail
    }

    const date = item?.VideoDate || item.publishedAt

    return {
      id: item.id,
      slug: item.Slug,
      title: item.Title || '',
      subTitle: item?.IntroText || null,
      description: item.Description || null,
      date,
      thumbnail,
      embed: `<iframe src="https://www.youtube-nocookie.com/embed/${item.VideoID}?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>`,
      categories: item.categories?.map((cat) => cat.CategoryName) || [],
      related: item.RelatedVideos?.map((cat) => cat.id) || [],
      seo: seo,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      language: item.language
    } satisfies Video
  })
}

export async function getVideo(slug: string): Promise<Video | null> {
  return (await getVideos()).find((video) => video.slug === slug) || null
}

export async function getCategories(): Promise<VideoCategoryRecord> {
  const categories = new Map()

  ;(await getVideos())
    .flatMap((video) => video.categories)
    .sort((a, b) => a.localeCompare(b))
    .forEach((category) => {
      categories.set(slugify(category), category)
    })

  return Object.fromEntries(categories.entries())
}
