import React, { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { withPasswordProtect } from '@storyofams/next-password-protect'
import AOS from 'aos'

import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-out-cubic', // default easing for AOS animations
      once: true
    })
    AOS.refresh()
  }, [])

  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(MyApp, {})
  : MyApp
