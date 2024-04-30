export type VideoCategory = string

export type VideoCategoryMap = Map<string, VideoCategory>
export type VideoCategoryRecord = Record<string, VideoCategory>

export interface Video {
  slug: string
  title: string
  subTitle?: string
  description: string
  thumbnail: string
  socialImage?: string
  embed: string
  categories: VideoCategory[]
}
