export type VideoCategory = string

export interface Video {
  slug: string,
  title: string,
  subTitle?: string,
  description: string,
  thumbnail: string,
  socialImage?: string,
  embed: string,
  categories: VideoCategory[]
}
