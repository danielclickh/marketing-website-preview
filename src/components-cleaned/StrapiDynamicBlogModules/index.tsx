import BlogModulesCodeBlock from '@/components-cleaned/BlogModulesCodeBlock'
import BlogModulesCta from '@/components-cleaned/BlogModulesCta'
import BlogModulesFaqs from '@/components-cleaned/BlogModulesFaqs'
import BlogModulesMarkdown from '@/components-cleaned/BlogModulesMarkdown'
import BlogModulesMarketoForm from '@/components-cleaned/BlogModulesMarketoForm'
import BlogModulesSummary from '@/components-cleaned/BlogModulesSummary'
import BlogModulesVideo from '@/components-cleaned/BlogModulesVideo'
import { pascal } from '@/lib/utils/strings'
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
  BlogModulesVideo
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
