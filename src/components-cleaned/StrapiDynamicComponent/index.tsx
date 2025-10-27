import { pascal } from '@/lib/utils/strings'
import { DynamicComponent } from '@/types/strapi'
import dynamic from 'next/dynamic'
import { Attributes, ReactElement } from 'react'

export type StrapiDynamicComponentProps = DynamicComponent & {
  [prop: string]: any
}

export default function StrapiDynamicComponent({
  __component,
  ...data
}: StrapiDynamicComponentProps): ReactElement {
  const componentName = pascal(__component)
  const Component = dynamic(() => import(`../${componentName}`), {
    ssr: true
  })
  return <Component {...(data as Attributes)} />
}
