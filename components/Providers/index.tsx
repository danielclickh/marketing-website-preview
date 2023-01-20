'use client'

import Aos from 'aos'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { SnackbarContextProvider } from '../sui/client'
import { AnalyticsProvider } from './Analytics'

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    setTimeout(() => {
      Aos.init()
      Aos.refresh()
    }, 50)
  }, [])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <SnackbarContextProvider>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </SnackbarContextProvider>
    </ThemeProvider>
  )
}
