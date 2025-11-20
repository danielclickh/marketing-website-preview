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
      total: number
    }
  }
}

type ApiKey<T> = Extract<keyof T, string>

type ApiFilterTopOperators = '$or' | '$and' | '$not'

type ApiAttributeOperators =
  | '$eq'
  | '$eqi'
  | '$ne'
  | '$nei'
  | '$lt'
  | '$lte'
  | '$gt'
  | '$gte'
  | '$in'
  | '$notIn'
  | '$contains'
  | '$notContains'
  | '$containsi'
  | '$notContainsi'
  | '$null'
  | '$notNull'
  | '$between'
  | '$startsWith'
  | '$startsWithi'
  | '$endsWith'
  | '$endsWithi'

type ApiFilterOperators = ApiFilterTopOperators | ApiAttributeOperators

// Value-level operators for a single attribute
type AttributeFilter<T> =
  | T
  | {
      [Op in ApiAttributeOperators]?: T
    }

// Core: field filters, recursive for object / relation types
type ApiFieldFilter<T> = {
  [K in ApiKey<T>]?: T[K] extends (infer R)[] // array relation
    ? ApiFilters<R> | AttributeFilter<R>
    : T[K] extends object // single relation / nested object
      ? ApiFilters<T[K]> | AttributeFilter<T[K]>
      : AttributeFilter<T[K]> // primitive field
}

// Top-level + logical operators
export type ApiFilters<T> = ApiFieldFilter<T> & {
  $and?: ApiFilters<T>[]
  $or?: ApiFilters<T>[]
  $not?: ApiFilters<T>[]
}

type PopulateLeaf<T> =
  | true
  | ApiKey<T>[]
  | {
      populate?: PopulateParam<any>
      fields?: string[] | '*'
    }

export type PopulateParam<T> =
  | '*'
  | 'deep'
  | ApiKey<T>[]
  | {
      [K in ApiKey<T>]?: PopulateLeaf<any>
    }

export interface ApiRequestParams<T> {
  filters?: ApiFilters<T>
  populate?: PopulateParam<T> // add | 'deep' if you rely on the plugin
  fields?: Array<ApiKey<T>> | '*'
  sort?:
    | ApiKey<T>
    | `${ApiKey<T>}:${'ASC' | 'DESC'}`
    | Array<ApiKey<T> | `${ApiKey<T>}:${'ASC' | 'DESC'}`>
  pagination?:
    | {
        page?: number
        pageSize?: number
        withCount?: boolean
      }
    | {
        start?: number
        limit?: number
        withCount?: boolean
      }
  publicationState?: 'live' | 'preview'
  locale?: string | string[]
  [key: string]: unknown
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
  | BlogModuleYoutubeVideo

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
  displayType: 'Simple' | 'Accordion'
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

export interface BlogModuleYoutubeVideo extends DynamicComponent {
  __component: 'blog-modules.youtube-video'
  videoId: string
}

export interface BlogModuleImageGallery extends DynamicComponent {
  __component: 'blog-modules.image-gallery'
  images: Array<EntryImage>
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
  profileLink: null | string
}

export interface ComponentEventHostedByItem {
  name: string
  role: string
  avatarPng: null | EntryImage
}

export interface ComponentEventHostedBy {
  title: string
  hosts: Array<ComponentEventHostedByItem>
}

export interface ComponentEventAgendaItem {
  time: string
  topic: string
}

export interface ComponentEventAgenda {
  title: string
  items: Array<ComponentEventAgendaItem>
}

export interface ComponentEventLocation {
  city: string
  country: string
}

export interface ComponentEventForm {
  submitButtonLabel: string
  type: 'recordedGatedContent' | 'eventRegistration'
  SuccessMessage: null | string
  stripeBuyButtonId: null | `buy_btn_${string}`
  marketoFormId: null | string
  disabled: null | boolean
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

export interface EntryEvent extends Entry {
  title: string
  slug: string
  localDatetime: string
  StagingOnly: boolean
  thumbnailPng: null | EntryImage
  shortDescription: null | string
  richDescription: null | string
  featured: boolean
  unlisted: null | boolean
  category: string
  location: ComponentEventLocation
  hostedBy: null | ComponentEventHostedBy
  agenda: null | ComponentEventAgenda
  form: null | ComponentEventForm
  eventVideoUrl: null | string
  recordedVimeoUrl: null | string
}
