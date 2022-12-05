export interface BlogPost {
  id: number
  category: string
  title: string
  shortDescription: string
  content: string
  author: BlogPostAuthor
  thumbnailPng: StrapiImage
  publishedAt: string
  slug?: string
  date?: string
  keywords?: string
}

export interface BlogPostListProps {
  blogs: BlogPost[]
  selectedCategory: string
  searchText: string
}
