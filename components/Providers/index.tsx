'use client'

import Aos from 'aos'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect } from 'react'
import { SnackbarContextProvider } from '../sui/client'
import { AnalyticsProvider } from './Analytics'
import useNavigationEvent from './useNavigationEvent'

export function Providers({ children }: { children: ReactNode }) {
  useNavigationEvent()
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
