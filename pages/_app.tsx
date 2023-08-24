import '../styles/globals.scss'
import '../styles/highlightjs.scss'
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
      </Head>
      <main className={`${inter.variable} font-inter ${inconsolata.variable}`}>
        <SnackbarContextProvider>
          <div className='flex min-h-screen flex-col'>
            <Component {...pageProps} />
          </div>
        </SnackbarContextProvider>
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
      <Script id='google-tag-manager' strategy='lazyOnload'>
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${gtmId}');
      `}
      </Script>

      <Script id='drift-script' src='/drift.js' type='text/javascript' async />
    </>
  )
}

export default MyApp
