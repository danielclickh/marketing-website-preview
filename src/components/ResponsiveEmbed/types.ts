import { ReactNode } from 'react'

interface ResponsiveEmbedBaseProps {
  ratio?: string
  lazyLoad?: boolean
  requiresConsent?: boolean
}

interface ResponsiveEmebedHtmlProps extends ResponsiveEmbedBaseProps {
  html: string
  children?: never
}

interface ResponsiveEmebedChildrenProps extends ResponsiveEmbedBaseProps {
  html?: never
  children: ReactNode
}

export type ResponsiveEmbedProps =
  | ResponsiveEmebedHtmlProps
  | ResponsiveEmebedChildrenProps
