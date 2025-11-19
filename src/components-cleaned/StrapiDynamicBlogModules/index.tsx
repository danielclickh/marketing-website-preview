import BlogModulesCodeBlock, {
  blogModulesCodeBlockMarkdown
} from '@/components-cleaned/BlogModulesCodeBlock'
import BlogModulesCta, {
  blogModulesCtaMarkdown
} from '@/components-cleaned/BlogModulesCta'
import BlogModulesFaqs, {
  blogModulesFaqsMarkdown
} from '@/components-cleaned/BlogModulesFaqs'
import BlogModulesImageGallery, {
  blogModulesImageGalleryMarkdown
} from '@/components-cleaned/BlogModulesImageGallery'
import BlogModulesMarkdown, {
  blogModulesMarkdownMarkdown
} from '@/components-cleaned/BlogModulesMarkdown'
import BlogModulesMarketoForm from '@/components-cleaned/BlogModulesMarketoForm'
import BlogModulesSummary, {
  blogModulesSummaryMarkdown
} from '@/components-cleaned/BlogModulesSummary'
import BlogModulesVideo, {
  blogModulesVideoMarkdown
} from '@/components-cleaned/BlogModulesVideo'
import BlogModulesYoutubeVideo, {
  blogModulesYoutubeVideoMarkdown
} from '@/components-cleaned/BlogModulesYoutubeVideo'
import { camel, pascal } from '@/lib/utils/strings'
import { DynamicComponent } from '@/types/strapi'
import { Attributes } from 'react'

// Would love to dynamically import components like `<StrapiDynamicComponent />` does
// but this doesn't render in SSG meaning it's bad for SEO.
// Instead, we define a registry of components so they get rendered at build.
const REGISTRY: Record<string, React.ComponentType<any>> = {
  BlogModulesCodeBlock,
  BlogModulesCta,
  BlogModulesFaqs,
  BlogModulesMarkdown,
  BlogModulesMarketoForm,
  BlogModulesSummary,
  BlogModulesVideo,
  BlogModulesYoutubeVideo,
  BlogModulesImageGallery
}

const MARKDOWN_REGISTRY: Record<string, (props: any) => string> = {
  blogModulesCodeBlockMarkdown,
  blogModulesCtaMarkdown,
  blogModulesFaqsMarkdown,
  blogModulesMarkdownMarkdown,
  blogModulesSummaryMarkdown,
  blogModulesVideoMarkdown,
  blogModulesYoutubeVideoMarkdown,
  blogModulesImageGalleryMarkdown
}

export type StrapiDynamicBlogModulesProps = DynamicComponent & {
  [prop: string]: any
}

export default function StrapiDynamicBlogModules({
  __component,
  ...data
}: StrapiDynamicBlogModulesProps): null | React.ReactElement {
  const componentName = pascal(__component)
  if (componentName in REGISTRY) {
    const Component = REGISTRY[componentName]
    return <Component {...(data as Attributes)} />
  }
  return null
}

export function strapiDynamicBlogModulesMarkdown({
  __component,
  ...data
}: StrapiDynamicBlogModulesProps) {
  const componentName = `${camel(__component)}Markdown`
  if (componentName in MARKDOWN_REGISTRY) {
    return MARKDOWN_REGISTRY[componentName](data)
  }
  return null
}
