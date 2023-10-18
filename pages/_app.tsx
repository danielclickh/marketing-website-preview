import '../styles/globals.scss'
import '../styles/highlightjs.scss'
import '../styles/securiti-cookie-banner.scss'
import '../styles/securiti-overrides.scss'
import React from 'react'
import { Inconsolata, Inter } from 'next/font/google'
import { SnackbarContextProvider } from '../components/sui'
import { AppProps } from 'next/app'
import Script from 'next/script'
import SegmentScript from '../components/SegmentScript'
import UTMPersist from '../components/UTMPersist'
import Head from 'next/head'

const gtmId = process.env.NEXT_PUBLIC_GTM ?? 'GTM-P52RCTZ'

const inter = Inter({
  subsets: [],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false,
  fallback: ['sans-serif']
})

const inconsolata = Inconsolata({
  subsets: [],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inconsolata',
  adjustFontFallback: false,
  fallback: []
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
      </Head>
      <main className={`${inter.variable} font-inter ${inconsolata.variable}`}>
        <SnackbarContextProvider>
          <div className='flex min-h-screen flex-col'>
            <Component {...pageProps} />
          </div>
        </SnackbarContextProvider>
      </main>
      <UTMPersist />
      <Script
        id='stripmkttok-script'
        src='https://discover.clickhouse.com/js/stripmkttok.js'
        type='text/javascript'
        async
      />

      {/* Google Analytics for clickhouse.com */}
      <Script id='google-tag-manager' strategy='lazyOnload'>
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${gtmId}');
      `}
      </Script>

      {/* Securiti.ai Cookie Banner - first is produciton mode, second is dev */}
      {process.env.NEXT_IS_PROD ? (
        // THIS IS PRODUCTION
        <Script
          defer
          data-strict-csp
          data-skip-css='false'
          src='https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-loader-strict-csp.js'
          data-tenant-uuid='8555e54b-cd0b-45d7-9c1c-e9e088bf774a'
          data-domain-uuid='e058d040-977c-4594-aa2c-84b844ce5cf0'
          data-backend-url='https://app.securiti.ai'
          onReady={() => {
            const cookieSettingsButton = document.querySelector(
              '#cookie-settings-button'
            )
            cookieSettingsButton?.classList.remove('hidden')
            cookieSettingsButton?.classList.add('cmp-revoke-consent')
          }}
        />
      ) : (
        // THIS IS DEV/LOCAL
        <Script
          defer
          data-skip-css='true'
          data-strict-csp
          src='https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-loader-strict-csp.js'
          data-tenant-uuid='8555e54b-cd0b-45d7-9c1c-e9e088bf774a'
          data-domain-uuid='14707cc7-31e6-41e7-931b-9afd9b578e61'
          data-backend-url='https://app.securiti.ai'
          onReady={() => {
            console.log('Cookie banner in dev mode')

            const cookieSettingsButton = document.querySelector(
              '#cookie-settings-button'
            )
            cookieSettingsButton?.classList.remove('hidden')
            cookieSettingsButton?.classList.add('cmp-revoke-consent')
          }}
        />
      )}

      {/* Securiti.ai Cookie Banner */}
    </>
  )
}

export default MyApp
