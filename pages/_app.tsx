import '../styles/globals.scss'
import '../styles/highlightjs.scss'
import React from 'react'
import { Inter } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
import { SnackbarContextProvider } from '../components/sui'
import { AppProps } from 'next/app'
import Script from 'next/script'
import SegmentScript from '../components/SegmentScript'

const gtmId = process.env.NEXT_PUBLIC_GTM ?? 'GTM-P52RCTZ'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false,
  fallback: ['sans-serif']
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${inter.variable} font-inter`}>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <SnackbarContextProvider>
            <div className='flex flex-col min-h-screen'>
              <Component {...pageProps} />
            </div>
          </SnackbarContextProvider>
        </ThemeProvider>
      </main>
      <SegmentScript />
      {/* CookiePro Cookies Consent Notice start for clickhouse.com */}
      <Script
        id='otSdkStub-script'
        src='https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js'
        charSet='UTF-8'
        type='text/javascript'
        data-domain-script={`dedccc4b-7ab2-47de-935c-073b23b1d9b7${
          process.env.NEXT_IS_PROD === 'true' ? '' : '-test'
        }`}
        strategy='lazyOnload'
      />
      <Script
        id='cookie-consent'
        type='text/javascript'>{`function OptanonWrapper() {}`}</Script>

      {/* CookiePro Cookies Consent Notice start for clickhouse.com */}
      <Script
        id='stripmkttok-script'
        src='https://discover.clickhouse.com/js/stripmkttok.js'
        type='text/javascript'
        async
      />

      {/* Google Analytics for clickhouse.com */}

      <Script
        id='gtm-script'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
        type='text/javascript'
        strategy='lazyOnload'
      />
      <Script id='ga-script' type='text/javascript'>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtmId}', {
              page_path: window.location.pathname,
            });
          `}</Script>

      {/* Google Analytics clickhouse.com */}
    </>
  )
}

export default MyApp
