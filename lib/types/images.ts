export interface BaseStrapiImage {
  hash: string
  url: string
}

export interface StrapiImage extends BaseStrapiImage {
  formats?: Record<string, BaseStrapiImage>
}
