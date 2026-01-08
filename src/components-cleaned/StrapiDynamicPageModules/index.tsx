import PageModulesCtaBlock from '@/components-cleaned/PageModulesCtaBlock'
import PageModulesFaqs from '@/components-cleaned/PageModulesFaqs'
import PageModulesMarkdown from '@/components-cleaned/PageModulesMarkdown'
import PageModulesStandardCards from '@/components-cleaned/PageModulesStandardCards'
import PageModulesWaitlistForm from '@/components-cleaned/PageModulesWaitlistForm'
import { pascal } from '@/lib/utils/strings'
import { DynamicComponent } from '@/types/strapi'
import { Attributes } from 'react'

// Would love to dynamically import components like `<StrapiDynamicComponent />` does
// but this doesn't render in SSG meaning it's bad for SEO.
// Instead, we define a registry of components so they get rendered at build.
const REGISTRY: Record<string, React.ComponentType<any>> = {
  PageModulesMarkdown,
  PageModulesWaitlistForm,
  PageModulesCtaBlock,
  PageModulesFaqs,
  PageModulesStandardCards
}

export type StrapiDynamicBlogModulesProps = DynamicComponent & {
  [prop: string]: any
}

export default function StrapiDynamicPageModules({
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
