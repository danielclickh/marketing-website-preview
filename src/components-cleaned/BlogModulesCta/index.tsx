import SimpleCtaCard from '@/components-cleaned/SimpleCtaCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { camel, slugify } from '@/lib/utils/strings'
import { BlogModuleCta } from '@/types/strapi'
import React from 'react'

export default function BlogModulesCta({
  title,
  description,
  url,
  label
}: BlogModuleCta) {
  // Automatically apply `?loc=` param
  try {
    const urlObj = new URL(url)
    if (!urlObj.searchParams.has('loc')) {
      urlObj.searchParams.set('loc', slugify(`blog cta ${title} ${label}`))
      url = urlObj.toString()
    }
  } catch (e) {
    // Silence...
  }
  return (
    <SimpleCtaCard
      className='toc-ignore'
      galaxyEventName={`blogCta.${camel(title)}.${camel(label)}`}
      link={{
        href: url,
        text: label
      }}>
      <SuiTitle type='h3' className='mb-2.5'>
        {title}
      </SuiTitle>
      <SuiText size='sm' weight='medium' color='secondary'>
        {description}
      </SuiText>
    </SimpleCtaCard>
  )
}
