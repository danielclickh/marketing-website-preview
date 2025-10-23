import SimpleCtaCard from '@/components-cleaned/SimpleCtaCard'
import { SuiText, SuiTitle } from '@/components/sui'
import { BlogModuleCta } from '@/types/strapi'
import React from 'react'

export default function BlogModulesCta({
  title,
  description,
  url,
  label
}: BlogModuleCta) {
  return (
    <SimpleCtaCard
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
