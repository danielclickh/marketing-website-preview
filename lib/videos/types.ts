export type VideoCategory = string

export interface Video {
  provider: 'youtube' | 'vimeo',
  id: string,
  slug: string,
  title: string,
  subTitle?: string,
  description: string,
  thumbnail: string,
  categories: VideoCategory[]
}
