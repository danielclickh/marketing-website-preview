import '../styles/globals.scss'
import '../styles/highlightjs.scss'
import '../styles/securiti-cookie-banner.scss'
import React from 'react'
import { Inconsolata, Inter } from 'next/font/google'
import { SnackbarContextProvider } from '../components/sui'
import { AppProps } from 'next/app'
import Script from 'next/script'
import SegmentScript from '../components/SegmentScript'
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
        {/* Securiti.ai Cookie Blocker - required for GDPR compliance */}
        <Script
          type='text/javascript'
          src='https://cdn-prod.securiti.ai/consent/auto_blocking/8555e54b-cd0b-45d7-9c1c-e9e088bf774a/e058d040-977c-4594-aa2c-84b844ce5cf0.js'
        />
        {/* Securiti.ai Cookie Blocker end */}
        {/* Securiti.ai Cookie Banner */}
        {/*-- After adding this script, call setConsentBannerParams({uuid: <unique id> }) to set unique ID for a customer. --*/}
        <Script
          defer
          data-strict-csp
          src='https://cdn-prod.securiti.ai/consent/cookie-consent-sdk-strict-csp.js'
          data-tenant-uuid='8555e54b-cd0b-45d7-9c1c-e9e088bf774a'
          data-domain-uuid='e058d040-977c-4594-aa2c-84b844ce5cf0'
          data-backend-url='https://app.securiti.ai'
          id='securiti-ai-script'
          type='text/javascript'
          strategy='afterInteractive'
        />
        {/* Securiti.ai Cookie Banner */}
      </Head>
      <main className={`${inter.variable} font-inter ${inconsolata.variable}`}>
        <SnackbarContextProvider>
          <div className='flex min-h-screen flex-col'>
            <Component {...pageProps} />
          </div>
        </SnackbarContextProvider>
      </main>
      <SegmentScript />
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
    </>
  )
}

export default MyApp
