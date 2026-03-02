// -----
// Core
// -----

export interface ApiResponse<TData = any> {
  data: TData
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

// Helpers: primitives + arrays
type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | Date
type IsPrimitive<T> = T extends Primitive ? true : false
type UnwrapArray<T> = T extends (infer R)[] ? R : T
type NN<T> = NonNullable<T> // <— IMPORTANT for optional/nullable relations

// Fixed-depth dot-path keys
type PrevDepth = [never, 0, 1, 2, 3, 4, 5, 6]
type Join<K, P> = K extends string
  ? P extends string
    ? `${K}.${P}`
    : never
  : never

/**
 * Dot paths for ALL keys (for fields/sort):
 * - handles nullable/optional nested objects
 */
export type DotPath<T, D extends number = 4> = [D] extends [never]
  ? never
  : NN<T> extends object
    ? {
        [K in Extract<keyof NN<T>, string>]:
          | K
          | (NN<NN<T>[K]> extends any[]
              ? IsPrimitive<UnwrapArray<NN<NN<T>[K]>>> extends true
                ? never
                : Join<K, DotPath<UnwrapArray<NN<NN<T>[K]>>, PrevDepth[D]>>
              : IsPrimitive<NN<NN<T>[K]>> extends true
                ? never
                : NN<NN<T>[K]> extends object
                  ? Join<K, DotPath<NN<NN<T>[K]>, PrevDepth[D]>>
                  : never)
      }[Extract<keyof NN<T>, string>]
    : never

/**
 * Dot paths for POPULATE:
 * - only allows keys that are actually "populatable" (objects/relations)
 * - handles nullable/optional relations (e.g. null | EntryImage)
 */
type PopulatableObject<T> =
  IsPrimitive<NN<T>> extends true
    ? never
    : NN<T> extends any[]
      ? PopulatableObject<UnwrapArray<NN<T>>>
      : NN<T> extends object
        ? NN<T>
        : never

export type PopulatePath<T, D extends number = 4> = [D] extends [never]
  ? never
  : PopulatableObject<T> extends never
    ? never
    : {
        [K in Extract<keyof NN<T>, string>]: PopulatableObject<
          NN<T>[K]
        > extends never
          ? never
          : K | Join<K, PopulatePath<UnwrapArray<NN<NN<T>[K]>>, PrevDepth[D]>>
      }[Extract<keyof NN<T>, string>]

type ApiFilterTopOperators = '$or' | '$and' | '$not'

type ApiScalarOperators =
  | '$eq'
  | '$eqi'
  | '$ne'
  | '$nei'
  | '$lt'
  | '$lte'
  | '$gt'
  | '$gte'
  | '$contains'
  | '$notContains'
  | '$containsi'
  | '$notContainsi'
  | '$startsWith'
  | '$startsWithi'
  | '$endsWith'
  | '$endsWithi'

type ApiArrayOperators = '$in' | '$notIn'
type ApiNullOperators = '$null' | '$notNull'
type ApiBetweenOperator = '$between'

type ScalarAttributeFilter<T> =
  | T
  | ({
      [K in ApiScalarOperators]?: T
    } & {
      [K in ApiArrayOperators]?: T[]
    } & {
      [K in ApiBetweenOperator]?: [T, T]
    } & {
      [K in ApiNullOperators]?: boolean
    })

type FieldFilter<V> =
  // arrays of relations
  V extends any[]
    ? ApiFilters<UnwrapArray<V>>
    : // objects / relations
      V extends object
      ? IsPrimitive<V> extends true
        ? ScalarAttributeFilter<V> // Date counts as scalar
        : ApiFilters<V>
      : // primitives
        ScalarAttributeFilter<V>

type ApiFieldFilter<T> = {
  [K in ApiKey<T>]?: FieldFilter<T[K]>
}

export type ApiFilters<T> = ApiFieldFilter<T> & {
  $and?: ApiFilters<T>[]
  $or?: ApiFilters<T>[]
  $not?: ApiFilters<T>[]
}

// Populate param
type PopulateObjectForm<T> = {
  [K in Extract<keyof NN<T>, string>]?:
    | true
    | PopulateObjectForm<UnwrapArray<NN<NN<T>[K]>>>
    | { fields?: string[] | '*'; populate?: any }
}

export type PopulateParam<T> =
  | '*'
  | 'deep'
  | false
  | PopulatePath<T>[]
  | PopulateObjectForm<T>

// fields + sort with dot paths
type SortDirection = 'ASC' | 'DESC'

export type SortParam<T> =
  | DotPath<T>
  | `${DotPath<T>}:${SortDirection}`
  | Array<DotPath<T> | `${DotPath<T>}:${SortDirection}`>

export interface ApiRequestParams<T> {
  filters?: ApiFilters<T>
  populate?: PopulateParam<T>
  fields?: Array<DotPath<T>> | '*'
  sort?: SortParam<T>
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

export interface EntryVideo extends EntryMedia {
  mime: `video/${string}`
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
  | BlogModuleImageGallery

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
// Page modules
// -----

export type PageModules =
  | PageModuleMarkdown
  | PageModuleWaitlistForm
  | PageModuleCtaBlock
  | PageModuleFaqs

export interface PageModuleMarkdown extends DynamicComponent {
  __component: 'page-modules.markdown'
  body: string
  headingAnchorLinks: boolean
}

export interface PageModuleWaitlistForm extends DynamicComponent {
  __component: 'page-modules.waitlist-form'
  introduction: string | null
  formIntroduction: string | null
  marketoFormId: string
  formButtonLabel: string | null
  formSuccessMessage: string
  formSuccessRedirect: string | null
  showPrivacyPolicy: boolean
}

export interface PageModuleCtaBlock extends DynamicComponent {
  __component: 'page-modules.cta-block'
  content: string
  primary: ComponentLink
  secondary: null | ComponentLink
}

export interface PageModuleFaqs extends DynamicComponent {
  __component: 'page-modules.faqs'
  content: string
  items: Array<{ question: string; answer: string }>
}

export interface PageModuleStandardCards extends DynamicComponent {
  __component: 'page-modules.standard-cards'
  introduction: string | null
  columns: 'Two' | 'Three' | 'Four'
  items: Array<ComponentStandardCard>
}

export interface PageModuleLegal extends DynamicComponent {
  __component: 'page-modules.legal'
  body: string
}

// -----
// Components
// -----

export interface ComponentLink {
  text: string
  href: string
  target: '_blank' | '_self'
}

export interface ComponentStandardCard {
  image: null | EntryImage
  icon: null | EntryImage
  title: null | string
  description: null | string
  link: null | ComponentLink
}

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
  name: null | string
  avatarPng: null | Array<EntryImage>
  profileLink: null | string
  profiles: Array<EntryAuthor>
}

export interface ComponentPromotion {
  title: string
  description: string
  image: EntryImage
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

export interface ComponentOpenhouseCard {
  title: string
  content: string
  icon: any
}

export interface ComponentOpenhouseVideo {
  title: string
  youtubeId: string
}

export interface ComponentOpenhouseDayAgenda {
  time: null | string
  title: string
  description: null | string
  speakers: Array<EntryOpenhouseSpeaker>
}

export interface ComponentOpenhouseDay {
  date: string
  description: string
  agenda: Array<ComponentOpenhouseDayAgenda>
  useAmericanDateFormat: boolean
}

export interface ComponentOpenhouseFaq {
  question: string
  answer: string
}

export interface ComponentOpenhouseLogo {
  logo: EntryImage
  width: 'Small (1/4)' | 'Medium (1/3)' | 'Large (1/2)' | 'Full (1/1)'
}

// -----
// Content types
// -----

export interface EntryTag extends Entry {
  name: string
  slug: string
}

export interface EntryResourceCategory extends Entry {
  name: string
  slug: string
  heading: null | string
  seo: ComponentSeo
  requiresThumbnail: boolean
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
  thumbnail: null | EntryImage
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

export interface EntryMarketingVideoCategory extends Entry {
  CategoryName: string
}

export interface EntryMarketingVideo extends Entry {
  Title: string
  Slug: string
  VideoDate: string
  VideoID: string
  Description: string | null
  RelatedVideos: Array<EntryMarketingVideo>
  categories: Array<EntryMarketingVideoCategory>
  IntroText: null | string
  seo: null | {
    title: null | string
    description: null | string
    image: null | EntryImage
  }
  tags: Array<EntryTag>
  promotion: null | ComponentPromotion
}

export interface EntryPage extends Entry {
  title: string
  path: string
  sections: Array<PageModules>
  seo: ComponentSeo
}

export interface EntryBlogPost extends Entry {
  category:
    | 'Company and culture'
    | 'Community'
    | 'Engineering'
    | 'Product'
    | 'User stories'
    | 'Japanese'
  title: string
  shortDescription: string
  content: null | string
  author: null | ComponentAuthor
  thumbnailPng: EntryImage
  slug: string
  date: string
  keywords: null | string
  StagingOnly: boolean
  ShowCloudCTAHeader: boolean | null
  ShowCloudCTAFooter: boolean | null
  reading_time: number
  reading_time_override: number | null
  theme:
    | 'ClickHouse Journey'
    | 'Cloud Announcement'
    | 'Competitive Comparisons'
    | 'Customer Story'
    | 'Feature Deep-dive'
    | 'Guest Post'
    | 'Guide'
    | 'Integrations'
    | 'Meetup Report'
    | 'Newsletter'
    | 'Release Post'
    | 'Thought Leadership'
  use_case:
    | 'Business Intelligence'
    | 'Core'
    | 'Logs, Metrics, & Traces'
    | 'ML & GenAI'
    | 'N/A'
    | 'Real-time Analytics'
  canonical_url: null | string
  table_contents_headers: null | string
  promotion: ComponentPromotion
  enableSidebarGlobalCta: null | boolean
  sections: Array<BlogModules>
  ListOnBlogs: null | boolean
  tags?: Array<EntryTag>
}

export interface EntryAuthor extends Entry {
  name: string
  slug: string
  title: null | string
  description: null | string
  avatar: EntryImage
  linkedinUrl: null | string
  twitterUrl: null | string
  githubUrl: null | string
  instagramUrl: null | string
  websiteUrl: null | string
}

export interface EntryGlobalAnnouncement extends Entry {
  text: string
  url: string
  country: string | null
}

export interface EntryOpenhouseSpeaker extends Entry {
  name: string
  title: string
  headshot: EntryImage
  logo: null | EntryImage
}

export interface EntryOpenhouse extends Entry {
  slug: string
  heading: string
  strapline: string
  startDate: string
  endDate: string
  applyToSpeakLink: string | null
  gallery: Array<EntryImage | EntryVideo>
  cards: Array<ComponentOpenhouseCard>
  videos: Array<ComponentOpenhouseVideo>
  days: Array<ComponentOpenhouseDay>
  featuredSpeakers: Array<EntryOpenhouseSpeaker>
  speakers: Array<EntryOpenhouseSpeaker>
  locationAddress: string
  locationImage: EntryImage
  faqs: Array<ComponentOpenhouseFaq>
  logos: Array<ComponentOpenhouseLogo>
  marketoFormId: string
  speakersIntro: string
  faqsIntro: string
  seo: null | ComponentSeo
  registerLabel: string
  listOnMainPage: boolean
  template: 'Y2025' | 'Y2026'
}
