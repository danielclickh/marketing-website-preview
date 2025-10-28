import SimpleCtaCard from '@/components-cleaned/SimpleCtaCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { camel, slugify } from '@/lib/utils/strings'
import { BlogModuleCta } from '@/types/strapi'
import React from 'react'

export default function BlogModulesCta({
  id,
  title,
  description,
  url,
  label
}: BlogModuleCta) {
  const domId = slugify(`blog cta ${id} ${title} ${label}`)

  // Automatically apply `?loc=` param
  try {
    const urlObj = new URL(url)
    let changed = false
    if (!urlObj.searchParams.has('loc')) {
      urlObj.searchParams.set('loc', domId)
      changed = true
    }
    if (!urlObj.searchParams.has('utm_blogctaid')) {
      urlObj.searchParams.set('utm_blogctaid', String(id))
      changed = true
    }
    if (changed) {
      url = urlObj.toString()
    }
  } catch (e) {
    // Silence...
  }
  return (
    <SimpleCtaCard
      id={domId}
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
