import { findAll } from '../api/strapi'
import { Video, VideoCategory, VideoCategoryMap } from './types'
import { slugify } from '../utils/strings'

type StrapiItem = {
  id: number
  Slug: string
  VideoID: string
  Title?: null | string
  SubTitle?: null | string
  Description?: null | string
  Categories?: Array<{ CategoryName: string }>
  RelatedVideos?: Array<StrapiItem>
}

export async function getVideos(): Promise<Video[]> {
  const response = await findAll('marketing-videos', {
    populate: ['Categories']
  })

  const data = response.data as Array<StrapiItem>

  return data.map((item) => {
    return {
      slug: item.Slug,
      title: item.Title,
      subTitle: item?.SubTitle || null,
      description: item.Description,
      thumbnail: `https://img.youtube.com/vi/${item.VideoID}/maxresdefault.jpg`,
      embed: `<iframe src="https://www.youtube-nocookie.com/embed/${item.VideoID}?rel=0&autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>`,
      categories: item.Categories?.map((cat) => cat.CategoryName) || []
    } as Video
  })
}

export async function getVideo(slug: string): Promise<Video | null> {
  return (await getVideos()).find((video) => video.slug === slug) || null
}

export async function getCategories(): Promise<VideoCategoryMap> {
  const categories = new Map()

  ;(await getVideos())
    .flatMap((video) => video.categories)
    .forEach((category) => {
      categories.set(slugify(category), category)
    })

  return categories
}

export async function getCategory(slug: string): Promise<VideoCategory | null> {
  return (await getCategories()).get(slug) || null
}
