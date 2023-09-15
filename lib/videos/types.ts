export type VideoCategory = string

export interface Video {
  type: 'youtube' | 'vimeo',
  id: string,
  title: string,
  subTitle?: string,
  description: string,
  thumbnail: string,
  categories: VideoCategory[]
}
