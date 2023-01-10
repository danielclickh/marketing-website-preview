'use client'

import Aos from 'aos'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect } from 'react'
import { SnackbarContextProvider } from '../sui'
import { AnalyticsProvider } from './Analytics'

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    setTimeout(() => {
      Aos.init()
      Aos.refresh()
    }, 50)
  }, [])

  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <SnackbarContextProvider>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  )
}
