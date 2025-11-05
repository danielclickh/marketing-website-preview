// -----
// Core
// -----

export interface ApiResponse {
  data: any
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      tota: number
    }
  }
}

export interface ApiRequestParams {
  filters?: Record<any, any> | any
  populate?: Array<string> | any
  fields?: Array<string> | any
  sort?: Array<string> | any
  pagination?:
    | {
        page?: number
        pageSize?: number
        withCount?: boolean
      }
    | { start?: number; limit?: number; withCount?: boolean }
  publicationState?: string
  [key: string]: any
}

export interface DynamicComponent {
  id: number
  __component: string
}

export interface Entry {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface EntryMedia extends Entry {
  name: string
  alternativeText: null | string
  caption: null | string
  width: null | number
  height: null | number
  ext: string
  hash: string
  mime: string
  url: string
}

export interface EntryImage extends EntryMedia {
  formats: null | Record<string, EntryImage>
}

// -----
// Blog modules
// -----

export type BlogModules =
  | BlogModuleMarketoForm
  | BlogModuleCta
  | BlogModuleMarkdown
  | BlogModuleVideo
  | BlogModuleFaqs
  | BlogModuleSummary
  | BlogModuleCodeBlock

export interface BlogModuleMarketoForm extends DynamicComponent {
  __component: 'blog-modules.marketo-form'
  title: string
  description: string
  formId: string
  successMessage: string
  successRedirect: string | null
  showPrivacyPolicy: boolean
}

export interface BlogModuleCta extends DynamicComponent {
  __component: 'blog-modules.cta'
  title: string
  description: string
  url: string
  label: string
}

export interface BlogModuleMarkdown extends DynamicComponent {
  __component: 'blog-modules.markdown'
  body: string
}

export interface BlogModuleVideo extends DynamicComponent {
  __component: 'blog-modules.video'
  sources: Array<EntryMedia>
  placeholder: EntryImage | null
  autoplay: boolean
  muted: boolean
  loop: boolean
  controls: boolean
}

export interface BlogModuleFaqs extends DynamicComponent {
  __component: 'blog-modules.faqs'
  title: string | null
  items: Array<{ question: string; answer: string }>
}

export interface BlogModuleSummary extends DynamicComponent {
  __component: 'blog-modules.summary'
  title: string
  summary: string
}

export interface BlogModuleCodeBlock extends DynamicComponent {
  __component: 'blog-modules.code-block'
  language: string
  runnable: boolean
  playLink: string
  code: string
}

// -----
// Components
// -----

export interface ComponentSeo {
  title: null | string
  keywords: null | string
  description: null | string
  image: null | EntryImage
  schema: null | Record<any, unknown>
  canonicalUrl: null | string
  noindex: boolean
  nofollow: boolean
  robots: null | string
}

export interface ComponentAuthor {
  name: string
  avatarPng: Array<EntryImage>
}

// -----
// Content types
// -----

export interface EntryResourceCategory extends Entry {
  name: string
  slug: string
  heading: null | string
  seo: ComponentSeo
}

export interface EntryResource extends Entry {
  title: string
  slug: string
  thumbnail: EntryImage
  date: null | string
  dateLabel: null | string
  excerpt: string
  content: null | string
  stagingOnly: boolean
  author: null | ComponentAuthor
  tocSelectors: string
  sections: Array<BlogModules>
  seo: ComponentSeo
  category: EntryResourceCategory
}
