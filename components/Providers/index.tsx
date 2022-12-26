'use client'

import Aos from 'aos'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect } from 'react'
import { SnackbarContextProvider } from '../sui'
import { AnalyticsProvider } from './Analytics'

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    Aos.init({
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-out-cubic', // default easing for AOS animations
      once: true
    })
    Aos.refresh()
  }, [])

  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <SnackbarContextProvider>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  )
}
