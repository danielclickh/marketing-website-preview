'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { SnackbarContextProvider } from '../sui/client'

export function Providers({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <SnackbarContextProvider>
        {children}
      </SnackbarContextProvider>
    </ThemeProvider>
  )
}
