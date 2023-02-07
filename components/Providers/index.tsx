'use client'

import Aos from 'aos'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect } from 'react'
import { SnackbarContextProvider } from '../sui/client'
import { AnalyticsProvider } from './Analytics'

export function Providers({
  children,
  writeKey
}: {
  children: ReactNode
  writeKey: string
}) {
  useEffect(() => {
    setTimeout(() => {
      Aos.init()
      Aos.refresh()
    }, 50)
  }, [])

  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <SnackbarContextProvider>
        <AnalyticsProvider writeKey={writeKey}>{children}</AnalyticsProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  )
}
