'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { SnackbarContextProvider } from '../sui/client'
import { AnalyticsProvider } from './Analytics'

export function Providers({
  children,
  writeKey
}: {
  children: ReactNode
  writeKey: string
}) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <SnackbarContextProvider>
        <AnalyticsProvider writeKey={writeKey}>{children}</AnalyticsProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  )
}
